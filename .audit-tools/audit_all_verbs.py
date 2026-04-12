#!/opt/homebrew/bin/python3
"""Audit all conjugations used by the project against Wiktionary Spanish tables."""

from __future__ import annotations

import json
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
APP_JS = ROOT / "app.js"
VERBS_JS = ROOT / "verbs-data.js"
NODE_BIN = "/Users/francesliang/.workbuddy/binaries/node/versions/22.12.0/bin/node"
USER_AGENT = "Mozilla/5.0 (WorkBuddy conjugation audit)"
MAX_WORKERS = 1
HTTP_RETRY_ATTEMPTS = 5
CACHE_DIR = ROOT / ".audit-tools" / "wiktionary-cache"

STANDARD_PRONOUNS = ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ustedes"]
IMPERATIVE_PRONOUNS = ["tú", "usted", "nosotros", "vosotros", "ustedes"]
REFLEXIVE_PRONOUNS = {
    "yo": "me",
    "tú": "te",
    "él/ella/usted": "se",
    "nosotros": "nos",
    "vosotros": "os",
    "ellos/ustedes": "se",
}
TARGET_TENSES = [
    "presente",
    "preterito",
    "imperfecto",
    "futuro",
    "condicional",
    "subjuntivo",
    "subjuntivo_imperfecto",
    "presente_perfecto",
    "pluscuamperfecto",
    "futuro_perfecto",
    "condicional_perfecto",
    "subjuntivo_perfecto",
    "imperativo",
]
TENSE_LABELS = {
    "presente": "现在时",
    "preterito": "简单过去时",
    "imperfecto": "过去未完成时",
    "futuro": "将来时",
    "condicional": "条件式",
    "subjuntivo": "虚拟式现在时",
    "subjuntivo_imperfecto": "虚拟式过去未完成时",
    "presente_perfecto": "现在完成时",
    "pluscuamperfecto": "过去完成时",
    "futuro_perfecto": "将来完成时",
    "condicional_perfecto": "条件式完成时",
    "subjuntivo_perfecto": "虚拟式现在完成时",
    "imperativo": "命令式",
}
COMPOUND_TENSE_SOURCES = {
    "presente_perfecto": "presente",
    "pluscuamperfecto": "imperfecto",
    "futuro_perfecto": "futuro",
    "condicional_perfecto": "condicional",
    "subjuntivo_perfecto": "subjuntivo",
}


class CellTableParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.rows: list[list[str]] = []
        self.current_row: list[str] | None = None
        self.current_cell: list[str] | None = None
        self.sup_depth = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag == "tr":
            self.current_row = []
        elif tag in {"td", "th"} and self.current_row is not None:
            self.current_cell = []
        elif tag == "br" and self.current_cell is not None:
            self.current_cell.append("\n")
        elif tag == "sup":
            self.sup_depth += 1

    def handle_endtag(self, tag: str) -> None:
        if tag in {"td", "th"} and self.current_row is not None and self.current_cell is not None:
            raw = "".join(self.current_cell)
            cleaned = self._clean_cell(raw)
            self.current_row.append(cleaned)
            self.current_cell = None
        elif tag == "tr" and self.current_row is not None:
            self.rows.append(self.current_row)
            self.current_row = None
        elif tag == "sup" and self.sup_depth > 0:
            self.sup_depth -= 1

    def handle_data(self, data: str) -> None:
        if self.current_cell is not None and self.sup_depth == 0:
            self.current_cell.append(data)

    @staticmethod
    def _clean_cell(value: str) -> str:
        value = value.replace("\xa0", " ")
        lines = []
        for line in value.split("\n"):
            line = re.sub(r"\s+", " ", line).strip()
            if line:
                lines.append(line)
        return "\n".join(lines)


@dataclass
class VerbReference:
    verb: str
    participle: str | None
    simple_forms: dict[str, list[str]]


def run_current_engine_export() -> dict[str, Any]:
    script = r'''
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const appPath = process.argv[1];
const verbsPath = process.argv[2];
const targetTenses = JSON.parse(process.argv[3]);
const standardPronouns = JSON.parse(process.argv[4]);
const imperativePronouns = JSON.parse(process.argv[5]);

function extractFunction(source, name) {
  const token = `function ${name}(`;
  const start = source.indexOf(token);
  if (start === -1) {
    throw new Error(`Missing function: ${name}`);
  }
  let braceStart = source.indexOf("{", start);
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escape = false;
  for (let i = braceStart; i < source.length; i++) {
    const ch = source[i];
    const prev = i > 0 ? source[i - 1] : "";
    if (escape) {
      escape = false;
      continue;
    }
    if ((inSingle || inDouble || inTemplate) && ch === "\\") {
      escape = true;
      continue;
    }
    if (!inDouble && !inTemplate && ch === "'" && prev !== "\\") {
      inSingle = !inSingle;
      continue;
    }
    if (!inSingle && !inTemplate && ch === '"' && prev !== "\\") {
      inDouble = !inDouble;
      continue;
    }
    if (!inSingle && !inDouble && ch === "`" && prev !== "\\") {
      inTemplate = !inTemplate;
      continue;
    }
    if (inSingle || inDouble || inTemplate) {
      continue;
    }
    if (ch === "{") {
      depth += 1;
    } else if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(start, i + 1);
      }
    }
  }
  throw new Error(`Unclosed function: ${name}`);
}

function extractConst(source, name) {
  const token = `const ${name} =`;
  const start = source.indexOf(token);
  if (start === -1) {
    throw new Error(`Missing const: ${name}`);
  }
  let i = start + token.length;
  while (i < source.length && /\s/.test(source[i])) i += 1;
  const open = source[i];
  const matching = {"[": "]", "{": "}"}[open];
  if (!matching) {
    throw new Error(`Unsupported const initializer for ${name}`);
  }
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escape = false;
  for (; i < source.length; i++) {
    const ch = source[i];
    const prev = i > 0 ? source[i - 1] : "";
    if (escape) {
      escape = false;
      continue;
    }
    if ((inSingle || inDouble || inTemplate) && ch === "\\") {
      escape = true;
      continue;
    }
    if (!inDouble && !inTemplate && ch === "'" && prev !== "\\") {
      inSingle = !inSingle;
      continue;
    }
    if (!inSingle && !inTemplate && ch === '"' && prev !== "\\") {
      inDouble = !inDouble;
      continue;
    }
    if (!inSingle && !inDouble && ch === "`" && prev !== "\\") {
      inTemplate = !inTemplate;
      continue;
    }
    if (inSingle || inDouble || inTemplate) {
      continue;
    }
    if (ch === open) {
      depth += 1;
    } else if (ch === matching) {
      depth -= 1;
      if (depth === 0) {
        let end = i + 1;
        while (end < source.length && /\s/.test(source[end])) end += 1;
        if (source[end] === ";") end += 1;
        return source.slice(start, end);
      }
    }
  }
  throw new Error(`Unclosed const: ${name}`);
}

const appSource = fs.readFileSync(appPath, "utf8");
const verbsSource = fs.readFileSync(verbsPath, "utf8");
const bundle = [
  extractConst(verbsSource, "verbsData"),
  extractConst(appSource, "COMPOUND_TENSES"),
  extractConst(appSource, "STANDARD_PRONOUNS"),
  extractConst(appSource, "HABER_CONJUGATIONS"),
  extractFunction(appSource, "normalizeVerbKey"),
  extractFunction(appSource, "conjugateVerb"),
  "globalThis.__auditExports = { verbsData, COMPOUND_TENSES, STANDARD_PRONOUNS, HABER_CONJUGATIONS, normalizeVerbKey, conjugateVerb };",
].join("\n\n");

const context = {};
vm.createContext(context);
vm.runInContext(bundle, context);

const exportsRef = context.__auditExports;
const verbs = exportsRef.verbsData.map(item => item.inf);
const duplicates = Object.entries(verbs.reduce((acc, verb) => {
  acc[verb] = (acc[verb] || 0) + 1;
  return acc;
}, {})).filter(([, count]) => count > 1).map(([verb, count]) => ({ verb, count }));

const forms = {};
for (const verb of verbs) {
  if (!forms[verb]) {
    forms[verb] = {};
  }
  for (const tense of targetTenses) {
    const pronouns = tense === "imperativo" ? imperativePronouns : standardPronouns;
    forms[verb][tense] = pronouns.map(pronoun => exportsRef.conjugateVerb(verb, tense, pronoun));
  }
}

process.stdout.write(JSON.stringify({ verbs, duplicates, forms }));
'''

    completed = subprocess.run(
        [
            NODE_BIN,
            "-e",
            script,
            str(APP_JS),
            str(VERBS_JS),
            json.dumps(TARGET_TENSES, ensure_ascii=False),
            json.dumps(STANDARD_PRONOUNS, ensure_ascii=False),
            json.dumps(IMPERATIVE_PRONOUNS, ensure_ascii=False),
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(completed.stdout)


def http_get(url: str) -> bytes:
    last_error: Exception | None = None
    for attempt in range(HTTP_RETRY_ATTEMPTS):
        request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                return response.read()
        except Exception as exc:  # noqa: BLE001
            last_error = exc
            status_code = getattr(exc, "code", None)
            should_retry = status_code in {429, 500, 502, 503, 504} or status_code is None
            if not should_retry or attempt == HTTP_RETRY_ATTEMPTS - 1:
                raise
            time.sleep(1.5 * (attempt + 1))
    if last_error is not None:
        raise last_error
    raise RuntimeError("HTTP request failed without an exception")


def extract_spanish_conjugation_table(html_text: str) -> str:
    try:
        spanish_start = html_text.index('id="Spanish"')
    except ValueError as exc:
        raise ValueError("Missing Spanish section") from exc

    spanish_chunk = html_text[spanish_start:]
    match = re.search(r'id="Conjugation(?:_[^"]+)?"', spanish_chunk)
    if not match:
        raise ValueError("Missing Spanish conjugation section")
    table_chunk = spanish_chunk[match.start():]
    table_start = table_chunk.find("<table")
    table_end = table_chunk.find("</table>")
    if table_start == -1 or table_end == -1:
        raise ValueError("Missing conjugation table")
    return table_chunk[table_start:table_end + len("</table>")]


def primary_form(cell: str) -> str:
    if not cell:
        return ""
    lines = [line.strip() for line in cell.split("\n") if line.strip()]
    if not lines:
        return ""
    value = lines[0]
    value = value.split(", ")[0]
    value = value.replace("—", "N/A")
    return value


def parse_reference_rows(rows: list[list[str]], verb: str) -> VerbReference:
    simple_forms: dict[str, list[str]] = {}
    participle: str | None = None
    section: str | None = None

    indicative_keys = {
        "present": "indicative_present",
        "imperfect": "indicative_imperfect",
        "preterite": "indicative_preterite",
        "future": "indicative_future",
        "conditional": "indicative_conditional",
    }
    subjunctive_keys = {
        "present": "subjunctive_present",
        "imperfect (ra)": "subjunctive_imperfect_ra",
    }

    for row in rows:
        if not row:
            continue
        head = row[0].replace("\n", " ").strip().lower()

        if head == "singular" and participle is None and len(row) >= 2:
            participle = primary_form(row[1])
            continue

        if head == "indicative":
            section = "indicative"
            continue
        if head == "subjunctive":
            section = "subjunctive"
            continue
        if head == "imperative":
            section = "imperative"
            continue

        if section == "indicative" and head in indicative_keys:
            simple_forms[indicative_keys[head]] = [primary_form(cell) for cell in row[1:7]]
            continue

        if section == "subjunctive" and head in subjunctive_keys:
            simple_forms[subjunctive_keys[head]] = [primary_form(cell) for cell in row[1:7]]
            continue

        if section == "imperative" and head == "affirmative":
            simple_forms["imperative_affirmative"] = [primary_form(cell) for cell in row[2:7]]
            continue

    if participle is None:
        raise ValueError(f"Failed to parse past participle for {verb}")

    required_keys = {
        "indicative_present",
        "indicative_imperfect",
        "indicative_preterite",
        "indicative_future",
        "indicative_conditional",
        "subjunctive_present",
        "subjunctive_imperfect_ra",
        "imperative_affirmative",
    }
    missing_keys = sorted(required_keys - set(simple_forms))
    if missing_keys:
        raise ValueError(f"Missing rows for {verb}: {', '.join(missing_keys)}")

    return VerbReference(verb=verb, participle=participle, simple_forms=simple_forms)


def reference_lookup_candidates(verb: str) -> list[str]:
    parts = str(verb or "").split()
    head = parts[0] if parts else ""
    candidates: list[str] = []
    if head.endswith("se") and len(head) > 2:
        candidates.append(head[:-2])
    candidates.append(verb)
    deduped: list[str] = []
    seen: set[str] = set()
    for candidate in candidates:
        if candidate not in seen:
            deduped.append(candidate)
            seen.add(candidate)
    return deduped


def fetch_reference(verb: str) -> VerbReference:
    last_error: Exception | None = None
    for candidate in reference_lookup_candidates(verb):
        try:
            cache_key = urllib.parse.quote(candidate, safe="")
            cache_path = CACHE_DIR / f"{cache_key}.json"
            if cache_path.exists():
                payload = json.loads(cache_path.read_text(encoding="utf-8"))
            else:
                url = (
                    "https://en.wiktionary.org/w/api.php?action=parse&prop=text&formatversion=2&format=json&page="
                    + cache_key
                )
                time.sleep(0.2)
                payload = json.loads(http_get(url).decode("utf-8"))
                CACHE_DIR.mkdir(parents=True, exist_ok=True)
                cache_path.write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")
            if "parse" not in payload or "text" not in payload["parse"]:
                raise ValueError(f"No parse payload for {candidate}: {payload}")
            table_html = extract_spanish_conjugation_table(payload["parse"]["text"])
            parser = CellTableParser()
            parser.feed(table_html)
            return parse_reference_rows(parser.rows, verb)
        except Exception as exc:  # noqa: BLE001
            last_error = exc
    if last_error is not None:
        raise last_error
    raise RuntimeError(f"Unable to fetch reference for {verb}")


def build_expected_dataset(reference: VerbReference, haber_forms: dict[str, list[str]]) -> dict[str, list[str]]:
    expected = {
        "presente": reference.simple_forms["indicative_present"],
        "imperfecto": reference.simple_forms["indicative_imperfect"],
        "preterito": reference.simple_forms["indicative_preterite"],
        "futuro": reference.simple_forms["indicative_future"],
        "condicional": reference.simple_forms["indicative_conditional"],
        "subjuntivo": reference.simple_forms["subjunctive_present"],
        "subjuntivo_imperfecto": reference.simple_forms["subjunctive_imperfect_ra"],
        "imperativo": reference.simple_forms["imperative_affirmative"],
    }

    participle = reference.participle or ""
    verb_parts = str(reference.verb or "").split()
    head_verb = verb_parts[0] if verb_parts else ""
    verb_tail = " ".join(verb_parts[1:])
    is_reflexive = head_verb.endswith("se")

    def append_tail(form: str) -> str:
        return f"{form} {verb_tail}".strip() if verb_tail else form

    for compound_tense, aux_tense in COMPOUND_TENSE_SOURCES.items():
        compound_forms = []
        for pronoun, haber_form in zip(STANDARD_PRONOUNS, haber_forms[aux_tense]):
            if is_reflexive:
                compound_forms.append(f"{REFLEXIVE_PRONOUNS[pronoun]} {haber_form} {participle}")
            else:
                compound_forms.append(f"{haber_form} {participle}")
        expected[compound_tense] = compound_forms

    if is_reflexive:
        reflexive_prefixes = tuple(f"{value} " for value in set(REFLEXIVE_PRONOUNS.values()))
        simple_forms_already_reflexive = any(
            normalize_for_compare(form).startswith(reflexive_prefixes)
            for form in expected["presente"]
        )
        if not simple_forms_already_reflexive:
            for tense in [
                "presente",
                "preterito",
                "imperfecto",
                "futuro",
                "condicional",
                "subjuntivo",
                "subjuntivo_imperfecto",
            ]:
                expected[tense] = [
                    f"{REFLEXIVE_PRONOUNS[pronoun]} {form}"
                    for pronoun, form in zip(STANDARD_PRONOUNS, expected[tense])
                ]

        imperative_suffixes = {
            "tú": "te",
            "usted": "se",
            "nosotros": "nos",
            "vosotros": "os",
            "ustedes": "se",
        }
        imperative_already_reflexive = all(
            normalize_for_compare(form).endswith(imperative_suffixes[pronoun])
            for pronoun, form in zip(IMPERATIVE_PRONOUNS, expected["imperativo"])
        )
        if not imperative_already_reflexive:
            reflexive_imperative = []
            for pronoun, base_form in zip(IMPERATIVE_PRONOUNS, expected["imperativo"]):
                suffix = imperative_suffixes[pronoun]
                if pronoun == "nosotros":
                    reflexive_imperative.append(f"{base_form.removesuffix('s')}{suffix}")
                elif pronoun == "vosotros":
                    reflexive_imperative.append(f"{base_form.removesuffix('d')}{suffix}")
                else:
                    reflexive_imperative.append(f"{base_form}{suffix}")
            expected["imperativo"] = reflexive_imperative

    for tense, forms in list(expected.items()):
        expected[tense] = [append_tail(form) for form in forms]

    return expected


def collect_references_full(verbs: list[str]) -> tuple[dict[str, VerbReference], dict[str, str]]:
    references: dict[str, VerbReference] = {}
    errors: dict[str, str] = {}
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_map = {executor.submit(fetch_reference, verb): verb for verb in sorted(set(verbs))}
        for future in as_completed(future_map):
            verb = future_map[future]
            try:
                references[verb] = future.result()
            except Exception as exc:  # noqa: BLE001
                errors[verb] = str(exc)
    return references, errors


def compare_forms(current: dict[str, list[str]], expected: dict[str, list[str]]) -> list[dict[str, Any]]:
    mismatches: list[dict[str, Any]] = []
    for tense in TARGET_TENSES:
        current_forms = current[tense]
        expected_forms = expected[tense]
        pronouns = IMPERATIVE_PRONOUNS if tense == "imperativo" else STANDARD_PRONOUNS
        for pronoun, current_form, expected_form in zip(pronouns, current_forms, expected_forms):
            if normalize_for_compare(current_form) != normalize_for_compare(expected_form):
                mismatches.append(
                    {
                        "tense": tense,
                        "pronoun": pronoun,
                        "current": current_form,
                        "expected": expected_form,
                    }
                )
    return mismatches


def normalize_for_compare(value: str) -> str:
    value = re.sub(r"\s+", " ", str(value or "").strip())
    if value == "—":
        return "N/A"
    return value


def build_report(current_export: dict[str, Any], reference_map: dict[str, VerbReference], errors: dict[str, str]) -> dict[str, Any]:
    if "haber" in reference_map:
        haber_ref = reference_map["haber"]
        haber_forms = {
            "presente": haber_ref.simple_forms["indicative_present"],
            "imperfecto": haber_ref.simple_forms["indicative_imperfect"],
            "futuro": haber_ref.simple_forms["indicative_future"],
            "condicional": haber_ref.simple_forms["indicative_conditional"],
            "subjuntivo": haber_ref.simple_forms["subjunctive_present"],
        }
    else:
        haber_forms = {
            "presente": ["he", "has", "ha", "hemos", "habéis", "han"],
            "imperfecto": ["había", "habías", "había", "habíamos", "habíais", "habían"],
            "futuro": ["habré", "habrás", "habrá", "habremos", "habréis", "habrán"],
            "condicional": ["habría", "habrías", "habría", "habríamos", "habríais", "habrían"],
            "subjuntivo": ["haya", "hayas", "haya", "hayamos", "hayáis", "hayan"],
        }

    verb_results = []
    total_checked_forms = 0
    total_mismatches = 0

    for verb in sorted(set(current_export["verbs"])):
        if verb not in reference_map:
            verb_results.append(
                {
                    "verb": verb,
                    "status": "reference_error",
                    "error": errors.get(verb, "Missing reference"),
                    "mismatches": [],
                }
            )
            continue

        reference = reference_map[verb]
        expected = build_expected_dataset(reference, haber_forms)
        current = current_export["forms"][verb]
        mismatches = compare_forms(current, expected)
        total_checked_forms += sum(len(current[tense]) for tense in TARGET_TENSES)
        total_mismatches += len(mismatches)
        verb_results.append(
            {
                "verb": verb,
                "status": "ok" if not mismatches else "mismatch",
                "mismatches": mismatches,
                "participle": reference.participle,
            }
        )

    mismatch_verbs = [item for item in verb_results if item["status"] == "mismatch"]
    return {
        "summary": {
            "verbEntryCount": len(current_export["verbs"]),
            "uniqueVerbCount": len(set(current_export["verbs"])),
            "duplicateEntries": current_export["duplicates"],
            "referenceErrors": errors,
            "checkedForms": total_checked_forms,
            "mismatchCount": total_mismatches,
            "verbsWithMismatchCount": len(mismatch_verbs),
        },
        "results": verb_results,
    }


def build_markdown(report: dict[str, Any]) -> str:
    summary = report["summary"]
    mismatch_items = [item for item in report["results"] if item["status"] == "mismatch"]
    reference_errors = [item for item in report["results"] if item["status"] == "reference_error"]

    lines = [
        "# 全量动词变位审计报告",
        "",
        f"- 动词条目数：{summary['verbEntryCount']}",
        f"- 去重后动词数：{summary['uniqueVerbCount']}",
        f"- 已比对变位格数：{summary['checkedForms']}",
        f"- 发现错误格数：{summary['mismatchCount']}",
        f"- 存在错误的动词数：{summary['verbsWithMismatchCount']}",
        "",
    ]

    duplicates = summary.get("duplicateEntries") or []
    if duplicates:
        lines.extend([
            "## 重复动词条目",
            "",
        ])
        for item in duplicates:
            lines.append(f"- `{item['verb']}` 出现 {item['count']} 次")
        lines.append("")

    if reference_errors:
        lines.extend(["## 参考源抓取失败", ""])
        for item in reference_errors:
            lines.append(f"- `{item['verb']}`：{item['error']}")
        lines.append("")

    lines.extend(["## 错误明细", ""])
    if not mismatch_items:
        lines.append("未发现与 Wiktionary 参考表不一致的变位。")
        lines.append("")
        return "\n".join(lines)

    for item in mismatch_items:
        lines.append(f"### {item['verb']}")
        lines.append("")
        grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
        for mismatch in item["mismatches"]:
            grouped[mismatch["tense"]].append(mismatch)
        for tense in TARGET_TENSES:
            bucket = grouped.get(tense)
            if not bucket:
                continue
            lines.append(f"- **{TENSE_LABELS[tense]}**")
            for mismatch in bucket:
                lines.append(
                    f"  - `{mismatch['pronoun']}`：当前 `{mismatch['current']}` → 应为 `{mismatch['expected']}`"
                )
        lines.append("")

    return "\n".join(lines)


def main() -> int:
    output_json = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / ".audit-tools" / "conjugation-audit.json"
    output_md = Path(sys.argv[2]) if len(sys.argv) > 2 else ROOT / ".audit-tools" / "conjugation-audit.md"

    current_export = run_current_engine_export()
    reference_verbs = sorted(set(current_export["verbs"]) | {"haber"})
    reference_map, errors = collect_references_full(reference_verbs)
    report = build_report(current_export, reference_map, errors)
    output_json.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    output_md.write_text(build_markdown(report), encoding="utf-8")

    summary = report["summary"]
    print(json.dumps({
        "json": str(output_json),
        "md": str(output_md),
        "summary": summary,
    }, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
