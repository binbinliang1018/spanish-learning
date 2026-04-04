// 西班牙语学习应用主逻辑

// ============ 状态管理 ============
let currentVerb = null;
let currentTense = null;
let currentAnswers = {};
let progress = JSON.parse(localStorage.getItem('spanishProgress')) || {
    totalVerbs: 0,
    correctCount: 0,
    totalAttempts: 0,
    streakDays: 0,
    lastStudyDate: null,
    practicedVerbs: {},
    tenseStats: {}
};

// 每日练习状态
let dailyState = JSON.parse(localStorage.getItem('dailyPractice')) || {
    currentIndex: 0,
    verbs: [],
    results: [], // 每个动词的练习结果
    isActive: false,
    date: null
};

// 错题重练状态
let reviewState = JSON.parse(localStorage.getItem('reviewPractice')) || {
    wrongVerbs: [], // 存储做错的动词记录 {verb, tense, attempts, lastWrongDate}
    currentIndex: 0,
    currentVerbs: [], // 当前正在复习的动词列表
    isActive: false
};

const DAILY_VERB_COUNT = 10;

// ============ 初始化 ============
document.addEventListener('DOMContentLoaded', () => {
    initDate();
    initTabs();
    initDailyPractice();
    initReviewPractice();
    initVerbPractice();
    initSpeakingPractice();
    initProgress();
    updateStreak();
});

function initDate() {
    const dateEl = document.getElementById('currentDate');
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    dateEl.textContent = new Date().toLocaleDateString('zh-CN', options);
}

function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            if (tabId === 'progress') {
                updateProgressDisplay();
            }
        });
    });
}

// ============ 每日练习 ============
function initDailyPractice() {
    document.getElementById('dailyStartBtn').addEventListener('click', startDailyPractice);
    document.getElementById('dailyCheckBtn').addEventListener('click', checkDailyAnswer);
    document.getElementById('dailyShowAnswerBtn').addEventListener('click', showDailyAnswer);
    document.getElementById('dailyRestartBtn').addEventListener('click', startDailyPractice);
    document.getElementById('dailyNextBtn').addEventListener('click', goToNextDailyVerb);
    
    // 检查是否有进行中的每日练习
    const today = new Date().toDateString();
    if (dailyState.date === today && dailyState.isActive) {
        restoreDailyPractice();
    } else if (dailyState.date === today && dailyState.currentIndex >= DAILY_VERB_COUNT) {
        showDailySummary();
    }
}

// 所有时态列表
const ALL_TENSES = [
    'presente', 'preterito', 'imperfecto', 'futuro', 'condicional',
    'subjuntivo', 'subjuntivo_imperfecto', 'presente_perfecto', 'pluscuamperfecto',
    'futuro_perfecto', 'condicional_perfecto', 'subjuntivo_perfecto', 'imperativo'
];

function startDailyPractice() {
    const today = new Date().toDateString();
    
    // 分离不规则动词和规则动词
    const irregularVerbs = verbsData.filter(v => v.type === 'irregular');
    const regularVerbs = verbsData.filter(v => v.type !== 'irregular');
    
    // 随机选择3个不规则动词
    const shuffledIrregular = [...irregularVerbs].sort(() => 0.5 - Math.random());
    const selectedIrregular = shuffledIrregular.slice(0, 3);
    
    // 随机选择7个规则动词
    const shuffledRegular = [...regularVerbs].sort(() => 0.5 - Math.random());
    const selectedRegular = shuffledRegular.slice(0, 7);
    
    // 合并并打乱顺序
    const selectedVerbs = [...selectedIrregular, ...selectedRegular].sort(() => 0.5 - Math.random());
    
    dailyState = {
        currentIndex: 0,
        verbs: selectedVerbs.map(v => v.inf),
        results: [],
        isActive: true,
        date: today
    };
    
    saveDailyState();
    
    // 重置UI
    document.getElementById('dailySummary').style.display = 'none';
    document.getElementById('dailyStartBtn').style.display = 'none';
    document.getElementById('dailyCheckBtn').disabled = false;
    document.getElementById('dailyShowAnswerBtn').disabled = false;
    
    loadDailyVerb();
}

function restoreDailyPractice() {
    document.getElementById('dailyStartBtn').style.display = 'none';
    document.getElementById('dailyCheckBtn').disabled = false;
    document.getElementById('dailyShowAnswerBtn').disabled = false;
    loadDailyVerb();
}

function loadDailyVerb() {
    // 使用所有时态
    const selectedTenses = ALL_TENSES;
    
    // 获取当前动词
    const verbInf = dailyState.verbs[dailyState.currentIndex];
    currentVerb = verbsData.find(v => v.inf === verbInf);
    
    // 随机选择时态
    currentTense = selectedTenses[Math.floor(Math.random() * selectedTenses.length)];
    
    // 更新进度显示
    document.getElementById('dailyCurrent').textContent = dailyState.currentIndex + 1;
    document.getElementById('dailyTotal').textContent = DAILY_VERB_COUNT;
    document.getElementById('dailyProgressBar').style.width = 
        ((dailyState.currentIndex / DAILY_VERB_COUNT) * 100) + '%';
    
    // 更新状态文本 - 显示编号
    document.getElementById('dailyStatus').textContent = 
        `第 ${dailyState.currentIndex + 1}/${DAILY_VERB_COUNT} 题`;
    
    // 更新动词显示 - 添加编号
    document.getElementById('dailyVerbInfinitive').textContent = 
        `[${dailyState.currentIndex + 1}] ${currentVerb.inf}`;
    document.getElementById('dailyVerbMeaning').textContent = currentVerb.meaning;
    document.getElementById('dailyVerbTense').textContent = tenses[currentTense].name;
    
    // 生成输入框
    const grid = document.getElementById('dailyConjugationGrid');
    grid.innerHTML = '';
    
    tenses[currentTense].pronouns.forEach((pronoun) => {
        const item = document.createElement('div');
        item.className = 'conjugation-item';
        item.innerHTML = `
            <label>${pronoun}</label>
            <input type="text" data-pronoun="${pronoun}" placeholder="变位形式..." autocomplete="off">
        `;
        grid.appendChild(item);
    });
    
    // 清空结果
    const result = document.getElementById('dailyResult');
    result.className = 'result';
    result.innerHTML = '';
    
    // 重置按钮状态
    document.getElementById('dailyCheckBtn').disabled = false;
    document.getElementById('dailyShowAnswerBtn').disabled = false;
    document.getElementById('dailyCheckBtn').style.display = 'inline-block';
    document.getElementById('dailyShowAnswerBtn').style.display = 'inline-block';
    document.getElementById('dailyNextBtn').style.display = 'none';
}

function checkDailyAnswer() {
    const inputs = document.querySelectorAll('#dailyConjugationGrid input');
    let correct = 0;
    let total = inputs.length;
    let hasError = false;

    inputs.forEach(input => {
        const pronoun = input.dataset.pronoun;
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = conjugateVerb(currentVerb.inf, currentTense, pronoun);

        input.disabled = true;
        
        if (userAnswer === correctAnswer) {
            input.classList.add('correct');
            correct++;
        } else {
            input.classList.add('incorrect');
            input.value = `${userAnswer} → ${correctAnswer}`;
            hasError = true;
        }
    });

    // 更新进度统计
    progress.totalAttempts += total;
    progress.correctCount += correct;
    progress.totalVerbs++;
    
    if (!progress.practicedVerbs[currentVerb.inf]) {
        progress.practicedVerbs[currentVerb.inf] = { count: 0, correct: 0 };
    }
    progress.practicedVerbs[currentVerb.inf].count++;
    progress.practicedVerbs[currentVerb.inf].correct += correct;

    if (!progress.tenseStats[currentTense]) {
        progress.tenseStats[currentTense] = { attempts: 0, correct: 0 };
    }
    progress.tenseStats[currentTense].attempts += total;
    progress.tenseStats[currentTense].correct += correct;

    saveProgress();

    // 显示结果
    const result = document.getElementById('dailyResult');
    
    // 记录结果
    const isCorrect = (correct === total);
    dailyState.results.push({
        verb: currentVerb.inf,
        correct: isCorrect,
        attempts: 1,
        tense: currentTense
    });
    saveDailyState();
    
    // 隐藏检查/显示答案按钮，显示下一题按钮
    document.getElementById('dailyCheckBtn').style.display = 'none';
    document.getElementById('dailyShowAnswerBtn').style.display = 'none';
    document.getElementById('dailyNextBtn').style.display = 'inline-block';
    
    if (isCorrect) {
        // 全对
        result.className = 'result show success';
        result.innerHTML = `<strong>🎉 全对！</strong> ${correct}/${total} 正确<br>点击"下一题"继续`;
    } else {
        // 有错误，记录到错题本
        result.className = 'result show error';
        result.innerHTML = `<strong>❌ 有错误</strong> ${correct}/${total} 正确<br>该题已记录到错题本，稍后可去"错题重练"模块复习。<br>点击"下一题"继续`;
        
        // 保存到错题本
        saveWrongVerbsToReview();
    }
}

function goToNextDailyVerb() {
    dailyState.currentIndex++;
    saveDailyState();
    
    // 恢复按钮显示
    document.getElementById('dailyCheckBtn').style.display = 'inline-block';
    document.getElementById('dailyShowAnswerBtn').style.display = 'inline-block';
    document.getElementById('dailyNextBtn').style.display = 'none';
    
    if (dailyState.currentIndex >= DAILY_VERB_COUNT) {
        completeDailyPractice();
    } else {
        loadDailyVerb();
    }
}

function showDailyAnswer() {
    const inputs = document.querySelectorAll('#dailyConjugationGrid input');
    
    inputs.forEach(input => {
        const pronoun = input.dataset.pronoun;
        input.value = conjugateVerb(currentVerb.inf, currentTense, pronoun);
        input.disabled = true;
        input.classList.add('incorrect');
    });
    
    // 记录结果
    dailyState.results.push({
        verb: currentVerb.inf,
        correct: false,
        attempts: 1,
        tense: currentTense
    });
    saveDailyState();
    
    // 保存到错题本
    saveWrongVerbsToReview();
    
    // 隐藏检查/显示答案按钮，显示下一题按钮
    document.getElementById('dailyCheckBtn').style.display = 'none';
    document.getElementById('dailyShowAnswerBtn').style.display = 'none';
    document.getElementById('dailyNextBtn').style.display = 'inline-block';
    
    const result = document.getElementById('dailyResult');
    result.className = 'result show error';
    result.innerHTML = '<strong>💡 已显示答案</strong><br>该题已记录到错题本，稍后可去"错题重练"模块复习。<br>点击"下一题"继续';
}

function completeDailyPractice() {
    dailyState.isActive = false;
    saveDailyState();
    showDailySummary();
}

function showDailySummary() {
    document.getElementById('dailyVerbInfinitive').textContent = '今日挑战完成！';
    document.getElementById('dailyVerbMeaning').textContent = '';
    document.getElementById('dailyVerbTense').textContent = '';
    document.getElementById('dailyConjugationGrid').innerHTML = '';
    document.getElementById('dailyResult').innerHTML = '';
    document.getElementById('dailyCheckBtn').disabled = true;
    document.getElementById('dailyShowAnswerBtn').disabled = true;
    document.getElementById('dailyStatus').textContent = '太棒了！明天继续加油！';
    
    // 统计结果
    const correctOnFirstTry = dailyState.results.filter(r => r.correct).length;
    const neededRetry = dailyState.results.filter(r => !r.correct).length;
    
    document.getElementById('dailyCorrectCount').textContent = correctOnFirstTry;
    document.getElementById('dailyRetryCount').textContent = neededRetry;
    
    document.getElementById('dailySummary').style.display = 'block';
    
    // 将做错的动词添加到错题本
    saveWrongVerbsToReview();
}

// 将做错的动词保存到错题本
function saveWrongVerbsToReview() {
    const wrongResults = dailyState.results.filter(r => !r.correct);
    const today = new Date().toDateString();
    
    wrongResults.forEach(result => {
        // 检查是否已存在
        const existingIndex = reviewState.wrongVerbs.findIndex(w => 
            w.verb === result.verb && w.tense === result.tense
        );
        
        if (existingIndex >= 0) {
            // 更新现有记录
            reviewState.wrongVerbs[existingIndex].attempts++;
            reviewState.wrongVerbs[existingIndex].lastWrongDate = today;
        } else {
            // 添加新记录
            reviewState.wrongVerbs.push({
                verb: result.verb,
                tense: result.tense,
                attempts: 1,
                lastWrongDate: today
            });
        }
    });
    
    saveReviewState();
}

function saveReviewState() {
    localStorage.setItem('reviewPractice', JSON.stringify(reviewState));
}

function saveDailyState() {
    localStorage.setItem('dailyPractice', JSON.stringify(dailyState));
}

// ============ 动词变位练习（已合并到每日练习） ============
function initVerbPractice() {
    // 已合并到每日练习模式
}

function conjugateVerb(infinitive, tense, pronoun) {
    // 处理代词式动词 (以 -se 结尾，如 enfadarse, levantarse)
    let baseVerb = infinitive;
    let isReflexive = false;
    
    if (infinitive.endsWith('se')) {
        isReflexive = true;
        baseVerb = infinitive.slice(0, -2); // 去掉 'se'
    }
    
    const stem = baseVerb.slice(0, -2);
    const ending = baseVerb.slice(-2);
    
    // 代词式动词的代词
    const reflexivePronouns = {
        'yo': 'me',
        'tú': 'te',
        'él/ella/usted': 'se',
        'nosotros': 'nos',
        'vosotros': 'os',
        'ellos/ustedes': 'se'
    };
    
    // 复合时态的助动词 haber 变位
    const haberConjugations = {
        'presente_perfecto': ['he', 'has', 'ha', 'hemos', 'habéis', 'han'],
        'pluscuamperfecto': ['había', 'habías', 'había', 'habíamos', 'habíais', 'habían'],
        'futuro_perfecto': ['habré', 'habrás', 'habrá', 'habremos', 'habréis', 'habrán'],
        'condicional_perfecto': ['habría', 'habrías', 'habría', 'habríamos', 'habríais', 'habrían'],
        'subjuntivo_perfecto': ['haya', 'hayas', 'haya', 'hayamos', 'hayáis', 'hayan']
    };
    
    // 过去分词
    function getPastParticiple(verb) {
        const verbStem = verb.slice(0, -2);
        const verbEnding = verb.slice(-2);
        if (verbEnding === 'ar') return verbStem + 'ado';
        return verbStem + 'ido';
    }
    
    // 处理复合时态
    if (['presente_perfecto', 'pluscuamperfecto', 'futuro_perfecto', 'condicional_perfecto', 'subjuntivo_perfecto'].includes(tense)) {
        const pronounIndex = ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ustedes'].indexOf(pronoun);
        const haberForm = haberConjugations[tense][pronounIndex];
        const participle = getPastParticiple(baseVerb);
        
        if (isReflexive) {
            return `${reflexivePronouns[pronoun]} ${haberForm} ${participle}`;
        }
        return `${haberForm} ${participle}`;
    }
    
    // 虚拟式过去未完成时
    if (tense === 'subjuntivo_imperfecto') {
        const pronounIndex = ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ustedes'].indexOf(pronoun);
        const subjEndings = {
            'ar': ['ara', 'aras', 'ara', 'áramos', 'arais', 'aran'],
            'er': ['iera', 'ieras', 'iera', 'iéramos', 'ierais', 'ieran'],
            'ir': ['iera', 'ieras', 'iera', 'iéramos', 'ierais', 'ieran']
        };
        const conjugated = stem + subjEndings[ending][pronounIndex];
        return isReflexive ? `${reflexivePronouns[pronoun]} ${conjugated}` : conjugated;
    }
    
    // 命令式
    if (tense === 'imperativo') {
        const imperativoPronouns = ['tú', 'usted', 'nosotros', 'vosotros', 'ustedes'];
        const pronounIndex = imperativoPronouns.indexOf(pronoun);
        if (pronounIndex === -1) return 'N/A'; // yo 没有命令式
        
        const imperativoEndings = {
            'ar': ['a', 'e', 'emos', 'ad', 'en'],
            'er': ['e', 'a', 'amos', 'ed', 'an'],
            'ir': ['e', 'a', 'amos', 'id', 'an']
        };
        const conjugated = stem + imperativoEndings[ending][pronounIndex];
        return isReflexive ? `${conjugated} ${reflexivePronouns[pronoun]}` : conjugated;
    }
    
    // 不规则动词特殊处理
    const irregulars = {
        'ser': {
            'presente': ['soy', 'eres', 'es', 'somos', 'sois', 'son'],
            'preterito': ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
            'imperfecto': ['era', 'eras', 'era', 'éramos', 'erais', 'eran'],
            'futuro': ['seré', 'serás', 'será', 'seremos', 'seréis', 'serán'],
            'condicional': ['sería', 'serías', 'sería', 'seríamos', 'seríais', 'serían'],
            'subjuntivo': ['sea', 'seas', 'sea', 'seamos', 'seáis', 'sean']
        },
        'estar': {
            'presente': ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'],
            'preterito': ['estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron'],
            'imperfecto': ['estaba', 'estabas', 'estaba', 'estábamos', 'estabais', 'estaban'],
            'futuro': ['estaré', 'estarás', 'estará', 'estaremos', 'estaréis', 'estarán'],
            'condicional': ['estaría', 'estarías', 'estaría', 'estaríamos', 'estaríais', 'estarían'],
            'subjuntivo': ['esté', 'estés', 'esté', 'estemos', 'estéis', 'estén']
        },
        'tener': {
            'presente': ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'],
            'preterito': ['tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvisteis', 'tuvieron'],
            'imperfecto': ['tenía', 'tenías', 'tenía', 'teníamos', 'teníais', 'tenían'],
            'futuro': ['tendré', 'tendrás', 'tendrá', 'tendremos', 'tendréis', 'tendrán'],
            'condicional': ['tendría', 'tendrías', 'tendría', 'tendríamos', 'tendríais', 'tendrían'],
            'subjuntivo': ['tenga', 'tengas', 'tenga', 'tengamos', 'tengáis', 'tengan']
        },
        'hacer': {
            'presente': ['hago', 'haces', 'hace', 'hacemos', 'hacéis', 'hacen'],
            'preterito': ['hice', 'hiciste', 'hizo', 'hicimos', 'hicisteis', 'hicieron'],
            'imperfecto': ['hacía', 'hacías', 'hacía', 'hacíamos', 'hacíais', 'hacían'],
            'futuro': ['haré', 'harás', 'hará', 'haremos', 'haréis', 'harán'],
            'condicional': ['haría', 'harías', 'haría', 'haríamos', 'haríais', 'harían'],
            'subjuntivo': ['haga', 'hagas', 'haga', 'hagamos', 'hagáis', 'hagan']
        },
        'decir': {
            'presente': ['digo', 'dices', 'dice', 'decimos', 'decís', 'dicen'],
            'preterito': ['dije', 'dijiste', 'dijo', 'dijimos', 'dijisteis', 'dijeron'],
            'imperfecto': ['decía', 'decías', 'decía', 'decíamos', 'decíais', 'decían'],
            'futuro': ['diré', 'dirás', 'dirá', 'diremos', 'diréis', 'dirán'],
            'condicional': ['diría', 'dirías', 'diría', 'diríamos', 'diríais', 'dirían'],
            'subjuntivo': ['diga', 'digas', 'diga', 'digamos', 'digáis', 'digan']
        },
        'ir': {
            'presente': ['voy', 'vas', 'va', 'vamos', 'vais', 'van'],
            'preterito': ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
            'imperfecto': ['iba', 'ibas', 'iba', 'íbamos', 'ibais', 'iban'],
            'futuro': ['iré', 'irás', 'irá', 'iremos', 'iréis', 'irán'],
            'condicional': ['iría', 'irías', 'iría', 'iríamos', 'iríais', 'irían'],
            'subjuntivo': ['vaya', 'vayas', 'vaya', 'vayamos', 'vayáis', 'vayan']
        },
        'ver': {
            'presente': ['veo', 'ves', 've', 'vemos', 'veis', 'ven'],
            'preterito': ['vi', 'viste', 'vio', 'vimos', 'visteis', 'vieron'],
            'imperfecto': ['veía', 'veías', 'veía', 'veíamos', 'veíais', 'veían'],
            'futuro': ['veré', 'verás', 'verá', 'veremos', 'veréis', 'verán'],
            'condicional': ['vería', 'verías', 'vería', 'veríamos', 'veríais', 'verían'],
            'subjuntivo': ['vea', 'veas', 'vea', 'veamos', 'veáis', 'vean']
        },
        'dar': {
            'presente': ['doy', 'das', 'da', 'damos', 'dais', 'dan'],
            'preterito': ['di', 'diste', 'dio', 'dimos', 'disteis', 'dieron'],
            'imperfecto': ['daba', 'dabas', 'daba', 'dábamos', 'dabais', 'daban'],
            'futuro': ['daré', 'darás', 'dará', 'daremos', 'daréis', 'darán'],
            'condicional': ['daría', 'darías', 'daría', 'daríamos', 'daríais', 'darían'],
            'subjuntivo': ['dé', 'des', 'dé', 'demos', 'deis', 'den']
        },
        'saber': {
            'presente': ['sé', 'sabes', 'sabe', 'sabemos', 'sabéis', 'saben'],
            'preterito': ['supe', 'supiste', 'supo', 'supimos', 'supisteis', 'supieron'],
            'imperfecto': ['sabía', 'sabías', 'sabía', 'sabíamos', 'sabíais', 'sabían'],
            'futuro': ['sabré', 'sabrás', 'sabrá', 'sabremos', 'sabréis', 'sabrán'],
            'condicional': ['sabría', 'sabrías', 'sabría', 'sabríamos', 'sabríais', 'sabrían'],
            'subjuntivo': ['sepa', 'sepas', 'sepa', 'sepamos', 'sepáis', 'sepan']
        },
        'poder': {
            'presente': ['puedo', 'puedes', 'puede', 'podemos', 'podéis', 'pueden'],
            'preterito': ['pude', 'pudiste', 'pudo', 'pudimos', 'pudisteis', 'pudieron'],
            'imperfecto': ['podía', 'podías', 'podía', 'podíamos', 'podíais', 'podían'],
            'futuro': ['podré', 'podrás', 'podrá', 'podremos', 'podréis', 'podrán'],
            'condicional': ['podría', 'podrías', 'podría', 'podríamos', 'podríais', 'podrían'],
            'subjuntivo': ['pueda', 'puedas', 'pueda', 'podamos', 'podáis', 'puedan']
        },
        'querer': {
            'presente': ['quiero', 'quieres', 'quiere', 'queremos', 'queréis', 'quieren'],
            'preterito': ['quise', 'quisiste', 'quiso', 'quisimos', 'quisisteis', 'quisieron'],
            'imperfecto': ['quería', 'querías', 'quería', 'queríamos', 'queríais', 'querían'],
            'futuro': ['querré', 'querrás', 'querrá', 'querremos', 'querréis', 'querrán'],
            'condicional': ['querría', 'querrías', 'querría', 'querríamos', 'querríais', 'querrían'],
            'subjuntivo': ['quiera', 'quieras', 'quiera', 'queramos', 'queráis', 'quieran']
        },
        'venir': {
            'presente': ['vengo', 'vienes', 'viene', 'venimos', 'venís', 'vienen'],
            'preterito': ['vine', 'viniste', 'vino', 'vinimos', 'vinisteis', 'vinieron'],
            'imperfecto': ['venía', 'venías', 'venía', 'veníamos', 'veníais', 'venían'],
            'futuro': ['vendré', 'vendrás', 'vendrá', 'vendremos', 'vendréis', 'vendrán'],
            'condicional': ['vendría', 'vendrías', 'vendría', 'vendríamos', 'vendríais', 'vendrían'],
            'subjuntivo': ['venga', 'vengas', 'venga', 'vengamos', 'vengáis', 'vengan']
        },
        'poner': {
            'presente': ['pongo', 'pones', 'pone', 'ponemos', 'ponéis', 'ponen'],
            'preterito': ['puse', 'pusiste', 'puso', 'pusimos', 'pusisteis', 'pusieron'],
            'imperfecto': ['ponía', 'ponías', 'ponía', 'poníamos', 'poníais', 'ponían'],
            'futuro': ['pondré', 'pondrás', 'pondrá', 'pondremos', 'pondréis', 'pondrán'],
            'condicional': ['pondría', 'pondrías', 'pondría', 'pondríamos', 'pondríais', 'pondrían'],
            'subjuntivo': ['ponga', 'pongas', 'ponga', 'pongamos', 'pongáis', 'pongan']
        },
        'salir': {
            'presente': ['salgo', 'sales', 'sale', 'salimos', 'salís', 'salen'],
            'preterito': ['salí', 'saliste', 'salió', 'salimos', 'salisteis', 'salieron'],
            'imperfecto': ['salía', 'salías', 'salía', 'salíamos', 'salíais', 'salían'],
            'futuro': ['saldré', 'saldrás', 'saldrá', 'saldremos', 'saldréis', 'saldrán'],
            'condicional': ['saldría', 'saldrías', 'saldría', 'saldríamos', 'saldríais', 'saldrían'],
            'subjuntivo': ['salga', 'salgas', 'salga', 'salgamos', 'salgáis', 'salgan']
        },
        'traer': {
            'presente': ['traigo', 'traes', 'trae', 'traemos', 'traéis', 'traen'],
            'preterito': ['traje', 'trajiste', 'trajo', 'trajimos', 'trajisteis', 'trajeron'],
            'imperfecto': ['traía', 'traías', 'traía', 'traíamos', 'traíais', 'traían'],
            'futuro': ['traeré', 'traerás', 'traerá', 'traeremos', 'traeréis', 'traerán'],
            'condicional': ['traería', 'traerías', 'traería', 'traeríamos', 'traeríais', 'traerían'],
            'subjuntivo': ['traiga', 'traigas', 'traiga', 'traigamos', 'traigáis', 'traigan']
        },
        'oír': {
            'presente': ['oigo', 'oyes', 'oye', 'oímos', 'oís', 'oyen'],
            'preterito': ['oí', 'oíste', 'oyó', 'oímos', 'oísteis', 'oyeron'],
            'imperfecto': ['oía', 'oías', 'oía', 'oíamos', 'oíais', 'oían'],
            'futuro': ['oiré', 'oirás', 'oirá', 'oiremos', 'oiréis', 'oirán'],
            'condicional': ['oiría', 'oirías', 'oiría', 'oiríamos', 'oiríais', 'oirían'],
            'subjuntivo': ['oiga', 'oigas', 'oiga', 'oigamos', 'oigáis', 'oigan']
        }
    };

    // 检查不规则动词（检查原形和去掉 se 的形式）
    const verbToCheck = isReflexive ? baseVerb : infinitive;
    if (irregulars[verbToCheck] && irregulars[verbToCheck][tense]) {
        const pronounIndex = ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ustedes'].indexOf(pronoun);
        const conjugated = irregulars[verbToCheck][tense][pronounIndex];
        return isReflexive ? `${reflexivePronouns[pronoun]} ${conjugated}` : conjugated;
    }

    // 规则变位
    const endings = {
        'ar': {
            'presente': ['o', 'as', 'a', 'amos', 'áis', 'an'],
            'preterito': ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
            'imperfecto': ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'],
            'futuro': ['é', 'ás', 'á', 'emos', 'éis', 'án'],
            'condicional': ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
            'subjuntivo': ['e', 'es', 'e', 'emos', 'éis', 'en']
        },
        'er': {
            'presente': ['o', 'es', 'e', 'emos', 'éis', 'en'],
            'preterito': ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
            'imperfecto': ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
            'futuro': ['é', 'ás', 'á', 'emos', 'éis', 'án'],
            'condicional': ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
            'subjuntivo': ['a', 'as', 'a', 'amos', 'áis', 'an']
        },
        'ir': {
            'presente': ['o', 'es', 'e', 'imos', 'ís', 'en'],
            'preterito': ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
            'imperfecto': ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
            'futuro': ['é', 'ás', 'á', 'emos', 'éis', 'án'],
            'condicional': ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
            'subjuntivo': ['a', 'as', 'a', 'amos', 'áis', 'an']
        }
    };

    const pronounIndex = ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ustedes'].indexOf(pronoun);
    
    let conjugated;
    
    // 将来时和条件式使用原形动词 + 词尾
    if (tense === 'futuro' || tense === 'condicional') {
        conjugated = baseVerb + endings[ending][tense][pronounIndex];
    } else {
        // 其他时态使用词干 + 词尾
        conjugated = stem + endings[ending][tense][pronounIndex];
    }
    
    // 如果是代词式动词，添加相应的代词
    if (isReflexive) {
        return `${reflexivePronouns[pronoun]} ${conjugated}`;
    }
    
    return conjugated;
}



// ============ 口语练习 ============
function initSpeakingPractice() {
    loadNewDialogue();
    loadNewChallenge();

    document.getElementById('scenarioSelect').addEventListener('change', loadNewDialogue);
    document.getElementById('newDialogueBtn').addEventListener('click', loadNewDialogue);
    document.getElementById('newChallengeBtn').addEventListener('click', loadNewChallenge);
    document.getElementById('speakAllBtn').addEventListener('click', speakAll);
}

function loadNewDialogue() {
    const scenario = document.getElementById('scenarioSelect').value;
    const dialogues = dialogueScenarios[scenario].dialogues;
    const dialogue = dialogues[Math.floor(Math.random() * dialogues.length)];

    const container = document.getElementById('dialogueContainer');
    container.innerHTML = '';

    dialogue.forEach((line, index) => {
        const lineEl = document.createElement('div');
        lineEl.className = `dialogue-line user-${line.speaker === 'A' || line.speaker === 'Cliente' || line.speaker === 'Turista' || line.speaker === 'Paciente' ? 'a' : 'b'}`;
        lineEl.innerHTML = `
            <span class="speaker">${line.speaker}</span>
            <div class="text">
                <div class="spanish">${line.es}</div>
                <div class="chinese">${line.zh}</div>
            </div>
            <button class="speak-btn" onclick="speakLine('${line.es.replace(/'/g, "\\'")}')">🔊</button>
        `;
        container.appendChild(lineEl);
    });
}

function loadNewChallenge() {
    const challenge = speakingChallenges[Math.floor(Math.random() * speakingChallenges.length)];
    document.querySelector('.challenge-topic').textContent = challenge.topic;
    document.querySelector('.challenge-hint').textContent = `尝试使用：${challenge.hint}`;
}

function speakLine(text) {
    if ('speechSynthesis' in window) {
        // 取消之前的语音
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    } else {
        alert('您的浏览器不支持语音朗读功能');
    }
}

function speakAll() {
    const spanishTexts = document.querySelectorAll('.dialogue-line .spanish');
    let index = 0;

    function speakNext() {
        if (index < spanishTexts.length) {
            const text = spanishTexts[index].textContent;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-ES';
            utterance.rate = 0.9;
            utterance.onend = () => {
                index++;
                setTimeout(speakNext, 500);
            };
            window.speechSynthesis.speak(utterance);
        }
    }

    window.speechSynthesis.cancel();
    speakNext();
}

// ============ 进度管理 ============
function initProgress() {
    document.getElementById('resetProgressBtn').addEventListener('click', () => {
        if (confirm('确定要重置所有学习进度吗？此操作不可撤销。')) {
            progress = {
                totalVerbs: 0,
                correctCount: 0,
                totalAttempts: 0,
                streakDays: 0,
                lastStudyDate: null,
                practicedVerbs: {},
                tenseStats: {}
            };
            saveProgress();
            updateProgressDisplay();
        }
    });
}

function saveProgress() {
    localStorage.setItem('spanishProgress', JSON.stringify(progress));
}

function updateStreak() {
    const today = new Date().toDateString();
    const lastDate = progress.lastStudyDate;

    if (lastDate) {
        const last = new Date(lastDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate - last) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            // 今天已经学习过
        } else if (diffDays === 1) {
            // 连续学习
            progress.streakDays++;
        } else {
            // 中断
            progress.streakDays = 1;
        }
    } else {
        progress.streakDays = 1;
    }

    progress.lastStudyDate = today;
    saveProgress();
}

function updateProgressDisplay() {
    document.getElementById('totalVerbs').textContent = progress.totalVerbs;
    
    const rate = progress.totalAttempts > 0 
        ? Math.round((progress.correctCount / progress.totalAttempts) * 100) 
        : 0;
    document.getElementById('correctRate').textContent = rate + '%';
    
    document.getElementById('streakDays').textContent = progress.streakDays;
    document.getElementById('totalTime').textContent = Math.round(progress.totalVerbs * 2); // 估算时间

    // 已练习动词列表
    const verbList = document.getElementById('practicedVerbs');
    const verbs = Object.entries(progress.practicedVerbs);
    
    if (verbs.length === 0) {
        verbList.innerHTML = '<p class="empty">还没有练习记录，开始你的第一节课吧！</p>';
    } else {
        verbList.innerHTML = verbs.map(([verb, stats]) => {
            const accuracy = Math.round((stats.correct / (stats.count * 6)) * 100);
            const className = accuracy >= 80 ? 'mastered' : 'practicing';
            return `<span class="verb-tag ${className}">${verb} (${accuracy}%)</span>`;
        }).join('');
    }

    // 弱项分析
    const weakPoints = document.getElementById('weakPoints');
    const tenseStats = Object.entries(progress.tenseStats);
    
    if (tenseStats.length === 0) {
        weakPoints.innerHTML = '<p>练习更多动词后，这里会显示你需要加强的时态。</p>';
    } else {
        weakPoints.innerHTML = tenseStats.map(([tense, stats]) => {
            const accuracy = Math.round((stats.correct / stats.attempts) * 100);
            const className = accuracy < 60 ? 'low' : '';
            return `
                <div class="tense-weakness">
                    <span>${tenses[tense].name}</span>
                    <div class="progress-bar">
                        <div class="progress-fill ${className}" style="width: ${accuracy}%"></div>
                    </div>
                    <span>${accuracy}%</span>
                </div>
            `;
        }).join('');
    }
}

// ============ 错题重练模块 ============
function initReviewPractice() {
    renderWrongVerbsList();
    
    document.getElementById('reviewCheckBtn').addEventListener('click', checkReviewAnswer);
    document.getElementById('reviewShowAnswerBtn').addEventListener('click', showReviewAnswer);
    document.getElementById('reviewBackBtn').addEventListener('click', backToReviewList);
}

// 渲染错题列表
function renderWrongVerbsList() {
    const wrongCount = reviewState.wrongVerbs.length;
    document.getElementById('wrongCount').textContent = wrongCount;
    
    const listContainer = document.getElementById('wrongVerbsList');
    
    if (wrongCount === 0) {
        listContainer.innerHTML = '<p class="empty">🎉 太棒了！你没有错题需要复习。</p>';
        return;
    }
    
    listContainer.innerHTML = reviewState.wrongVerbs.map((item, index) => {
        const verbData = verbsData.find(v => v.inf === item.verb);
        const tenseName = tenses[item.tense]?.name || item.tense;
        return `
            <div class="wrong-verb-item">
                <div class="wrong-verb-info">
                    <span class="wrong-verb-name">${item.verb}</span>
                    <span class="wrong-verb-meaning">${verbData?.meaning || ''}</span>
                    <span class="wrong-verb-tense">${tenseName}</span>
                    <span class="wrong-verb-attempts">错 ${item.attempts} 次</span>
                </div>
                <button class="btn btn-primary btn-small" onclick="startReviewPractice(${index})">开始复习</button>
            </div>
        `;
    }).join('');
}

// 开始复习特定错题
function startReviewPractice(index) {
    const wrongItem = reviewState.wrongVerbs[index];
    if (!wrongItem) return;
    
    // 设置当前复习状态 - 只复习选中的这一个动词
    reviewState.currentVerbs = [wrongItem];
    reviewState.currentIndex = 0;
    reviewState.isActive = true;
    saveReviewState();
    
    // 显示练习区域，隐藏列表
    document.getElementById('wrongVerbsList').style.display = 'none';
    document.getElementById('reviewStats').style.display = 'none';
    document.querySelector('.review-desc').style.display = 'none';
    document.getElementById('reviewPracticeArea').style.display = 'block';
    
    loadReviewVerb();
}

// 加载复习动词 - 严格保持原来的时态
function loadReviewVerb() {
    const wrongItem = reviewState.currentVerbs[reviewState.currentIndex];
    if (!wrongItem) return;
    
    currentVerb = verbsData.find(v => v.inf === wrongItem.verb);
    // 严格使用错题原来的时态，绝不更改
    currentTense = wrongItem.tense;
    
    // 更新进度显示
    document.getElementById('reviewCurrent').textContent = reviewState.currentIndex + 1;
    document.getElementById('reviewTotal').textContent = reviewState.currentVerbs.length;
    document.getElementById('reviewProgressBar').style.width = 
        ((reviewState.currentIndex / reviewState.currentVerbs.length) * 100) + '%';
    
    document.getElementById('reviewStatus').textContent = 
        `复习错题 - 时态：${tenses[currentTense].name}（必须使用该时态）`;
    
    // 更新动词显示
    document.getElementById('reviewVerbInfinitive').textContent = currentVerb.inf;
    document.getElementById('reviewVerbMeaning').textContent = currentVerb.meaning;
    document.getElementById('reviewVerbTense').textContent = tenses[currentTense].name;
    
    // 生成输入框
    const grid = document.getElementById('reviewConjugationGrid');
    grid.innerHTML = '';
    
    tenses[currentTense].pronouns.forEach((pronoun) => {
        const item = document.createElement('div');
        item.className = 'conjugation-item';
        item.innerHTML = `
            <label>${pronoun}</label>
            <input type="text" data-pronoun="${pronoun}" placeholder="变位形式..." autocomplete="off">
        `;
        grid.appendChild(item);
    });
    
    // 清空结果
    const result = document.getElementById('reviewResult');
    result.className = 'result';
    result.innerHTML = '';
    
    // 启用按钮
    document.getElementById('reviewCheckBtn').disabled = false;
    document.getElementById('reviewShowAnswerBtn').disabled = false;
}

// 检查复习答案
function checkReviewAnswer() {
    const inputs = document.querySelectorAll('#reviewConjugationGrid input');
    let correct = 0;
    let total = inputs.length;
    let hasError = false;

    inputs.forEach(input => {
        const pronoun = input.dataset.pronoun;
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = conjugateVerb(currentVerb.inf, currentTense, pronoun);

        input.disabled = true;
        
        if (userAnswer === correctAnswer) {
            input.classList.add('correct');
            correct++;
        } else {
            input.classList.add('incorrect');
            input.value = `${userAnswer} → ${correctAnswer}`;
            hasError = true;
        }
    });

    // 更新进度统计
    progress.totalAttempts += total;
    progress.correctCount += correct;
    saveProgress();

    // 显示结果
    const result = document.getElementById('reviewResult');
    
    if (correct === total) {
        // 全对 - 从错题本中移除
        result.className = 'result show success';
        result.innerHTML = `<strong>🎉 全对！</strong> ${correct}/${total} 正确<br>这个动词已从错题本中移除。`;
        
        // 从错题本中移除
        const wrongItem = reviewState.currentVerbs[reviewState.currentIndex];
        reviewState.wrongVerbs = reviewState.wrongVerbs.filter(w => 
            !(w.verb === wrongItem.verb && w.tense === wrongItem.tense)
        );
        saveReviewState();
        
        // 延迟后返回列表
        setTimeout(() => {
            backToReviewList();
        }, 2000);
    } else {
        // 有错误，增加错误次数
        result.className = 'result show error';
        result.innerHTML = `<strong>❌ 有错误</strong> ${correct}/${total} 正确<br>请重新练习，时态必须保持一致！`;
        
        // 增加错误次数
        const wrongItem = reviewState.currentVerbs[reviewState.currentIndex];
        const originalIndex = reviewState.wrongVerbs.findIndex(w => 
            w.verb === wrongItem.verb && w.tense === wrongItem.tense
        );
        if (originalIndex >= 0) {
            reviewState.wrongVerbs[originalIndex].attempts++;
            reviewState.wrongVerbs[originalIndex].lastWrongDate = new Date().toDateString();
            saveReviewState();
        }
        
        // 3秒后重新加载同一个动词 - 保持相同时态
        setTimeout(() => {
            loadReviewVerb();
        }, 3000);
    }
}

// 显示复习答案
function showReviewAnswer() {
    const inputs = document.querySelectorAll('#reviewConjugationGrid input');
    
    inputs.forEach(input => {
        const pronoun = input.dataset.pronoun;
        input.value = conjugateVerb(currentVerb.inf, currentTense, pronoun);
        input.disabled = true;
        input.classList.add('incorrect');
    });
    
    // 增加错误次数
    const wrongItem = reviewState.currentVerbs[reviewState.currentIndex];
    const originalIndex = reviewState.wrongVerbs.findIndex(w => 
        w.verb === wrongItem.verb && w.tense === wrongItem.tense
    );
    if (originalIndex >= 0) {
        reviewState.wrongVerbs[originalIndex].attempts++;
        reviewState.wrongVerbs[originalIndex].lastWrongDate = new Date().toDateString();
        saveReviewState();
    }
    
    const result = document.getElementById('reviewResult');
    result.className = 'result show error';
    result.innerHTML = '<strong>💡 已显示答案</strong><br>请重新练习，时态必须保持一致！';
    
    // 3秒后重新加载 - 保持相同时态
    setTimeout(() => {
        loadReviewVerb();
    }, 3000);
}

// 返回错题列表
function backToReviewList() {
    reviewState.isActive = false;
    reviewState.currentVerbs = [];
    reviewState.currentIndex = 0;
    saveReviewState();
    
    document.getElementById('wrongVerbsList').style.display = 'block';
    document.getElementById('reviewStats').style.display = 'block';
    document.querySelector('.review-desc').style.display = 'block';
    document.getElementById('reviewPracticeArea').style.display = 'none';
    
    renderWrongVerbsList();
}
