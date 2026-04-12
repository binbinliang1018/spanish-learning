# 全量动词变位审计报告

- 动词条目数：171
- 去重后动词数：168
- 已比对变位格数：12936
- 发现错误格数：559
- 存在错误的动词数：44

## 重复动词条目

- `querer` 出现 2 次
- `venir` 出现 2 次
- `oír` 出现 2 次

## 错误明细

### acercarse

- **简单过去时**
  - `yo`：当前 `me acercé` → 应为 `me acerqué`
- **虚拟式现在时**
  - `yo`：当前 `me acerce` → 应为 `me acerque`
  - `tú`：当前 `te acerces` → 应为 `te acerques`
  - `él/ella/usted`：当前 `se acerce` → 应为 `se acerque`
  - `nosotros`：当前 `nos acercemos` → 应为 `nos acerquemos`
  - `vosotros`：当前 `os acercéis` → 应为 `os acerquéis`
  - `ellos/ustedes`：当前 `se acercen` → 应为 `se acerquen`
- **命令式**
  - `usted`：当前 `acercese` → 应为 `acerquese`
  - `nosotros`：当前 `acercemonos` → 应为 `acerquemonos`
  - `ustedes`：当前 `acercense` → 应为 `acerquense`

### acordarse

- **命令式**
  - `tú`：当前 `acuérdate` → 应为 `acuerdate`
  - `usted`：当前 `acuérdese` → 应为 `acuerdese`
  - `nosotros`：当前 `acordémonos` → 应为 `acordemonos`
  - `ustedes`：当前 `acuérdense` → 应为 `acuerdense`

### acostarse

- **命令式**
  - `tú`：当前 `acuéstate` → 应为 `acuestate`
  - `usted`：当前 `acuéstese` → 应为 `acuestese`
  - `nosotros`：当前 `acostémonos` → 应为 `acostemonos`
  - `ustedes`：当前 `acuéstense` → 应为 `acuestense`

### arrepentirse

- **虚拟式过去未完成时**
  - `yo`：当前 `me arrepentiera` → 应为 `me arrepintiera`
  - `tú`：当前 `te arrepentieras` → 应为 `te arrepintieras`
  - `él/ella/usted`：当前 `se arrepentiera` → 应为 `se arrepintiera`
  - `nosotros`：当前 `nos arrepentiéramos` → 应为 `nos arrepintiéramos`
  - `vosotros`：当前 `os arrepentierais` → 应为 `os arrepintierais`
  - `ellos/ustedes`：当前 `se arrepentieran` → 应为 `se arrepintieran`

### buscar

- **简单过去时**
  - `yo`：当前 `buscé` → 应为 `busqué`
- **虚拟式现在时**
  - `yo`：当前 `busce` → 应为 `busque`
  - `tú`：当前 `busces` → 应为 `busques`
  - `él/ella/usted`：当前 `busce` → 应为 `busque`
  - `nosotros`：当前 `buscemos` → 应为 `busquemos`
  - `vosotros`：当前 `buscéis` → 应为 `busquéis`
  - `ellos/ustedes`：当前 `buscen` → 应为 `busquen`
- **命令式**
  - `usted`：当前 `busce` → 应为 `busque`
  - `nosotros`：当前 `buscemos` → 应为 `busquemos`
  - `ustedes`：当前 `buscen` → 应为 `busquen`

### caer

- **现在完成时**
  - `yo`：当前 `he caido` → 应为 `he caído`
  - `tú`：当前 `has caido` → 应为 `has caído`
  - `él/ella/usted`：当前 `ha caido` → 应为 `ha caído`
  - `nosotros`：当前 `hemos caido` → 应为 `hemos caído`
  - `vosotros`：当前 `habéis caido` → 应为 `habéis caído`
  - `ellos/ustedes`：当前 `han caido` → 应为 `han caído`
- **过去完成时**
  - `yo`：当前 `había caido` → 应为 `había caído`
  - `tú`：当前 `habías caido` → 应为 `habías caído`
  - `él/ella/usted`：当前 `había caido` → 应为 `había caído`
  - `nosotros`：当前 `habíamos caido` → 应为 `habíamos caído`
  - `vosotros`：当前 `habíais caido` → 应为 `habíais caído`
  - `ellos/ustedes`：当前 `habían caido` → 应为 `habían caído`
- **将来完成时**
  - `yo`：当前 `habré caido` → 应为 `habré caído`
  - `tú`：当前 `habrás caido` → 应为 `habrás caído`
  - `él/ella/usted`：当前 `habrá caido` → 应为 `habrá caído`
  - `nosotros`：当前 `habremos caido` → 应为 `habremos caído`
  - `vosotros`：当前 `habréis caido` → 应为 `habréis caído`
  - `ellos/ustedes`：当前 `habrán caido` → 应为 `habrán caído`
- **条件式完成时**
  - `yo`：当前 `habría caido` → 应为 `habría caído`
  - `tú`：当前 `habrías caido` → 应为 `habrías caído`
  - `él/ella/usted`：当前 `habría caido` → 应为 `habría caído`
  - `nosotros`：当前 `habríamos caido` → 应为 `habríamos caído`
  - `vosotros`：当前 `habríais caido` → 应为 `habríais caído`
  - `ellos/ustedes`：当前 `habrían caido` → 应为 `habrían caído`
- **虚拟式现在完成时**
  - `yo`：当前 `haya caido` → 应为 `haya caído`
  - `tú`：当前 `hayas caido` → 应为 `hayas caído`
  - `él/ella/usted`：当前 `haya caido` → 应为 `haya caído`
  - `nosotros`：当前 `hayamos caido` → 应为 `hayamos caído`
  - `vosotros`：当前 `hayáis caido` → 应为 `hayáis caído`
  - `ellos/ustedes`：当前 `hayan caido` → 应为 `hayan caído`

### caerse

- **现在完成时**
  - `yo`：当前 `me he caido` → 应为 `me he caído`
  - `tú`：当前 `te has caido` → 应为 `te has caído`
  - `él/ella/usted`：当前 `se ha caido` → 应为 `se ha caído`
  - `nosotros`：当前 `nos hemos caido` → 应为 `nos hemos caído`
  - `vosotros`：当前 `os habéis caido` → 应为 `os habéis caído`
  - `ellos/ustedes`：当前 `se han caido` → 应为 `se han caído`
- **过去完成时**
  - `yo`：当前 `me había caido` → 应为 `me había caído`
  - `tú`：当前 `te habías caido` → 应为 `te habías caído`
  - `él/ella/usted`：当前 `se había caido` → 应为 `se había caído`
  - `nosotros`：当前 `nos habíamos caido` → 应为 `nos habíamos caído`
  - `vosotros`：当前 `os habíais caido` → 应为 `os habíais caído`
  - `ellos/ustedes`：当前 `se habían caido` → 应为 `se habían caído`
- **将来完成时**
  - `yo`：当前 `me habré caido` → 应为 `me habré caído`
  - `tú`：当前 `te habrás caido` → 应为 `te habrás caído`
  - `él/ella/usted`：当前 `se habrá caido` → 应为 `se habrá caído`
  - `nosotros`：当前 `nos habremos caido` → 应为 `nos habremos caído`
  - `vosotros`：当前 `os habréis caido` → 应为 `os habréis caído`
  - `ellos/ustedes`：当前 `se habrán caido` → 应为 `se habrán caído`
- **条件式完成时**
  - `yo`：当前 `me habría caido` → 应为 `me habría caído`
  - `tú`：当前 `te habrías caido` → 应为 `te habrías caído`
  - `él/ella/usted`：当前 `se habría caido` → 应为 `se habría caído`
  - `nosotros`：当前 `nos habríamos caido` → 应为 `nos habríamos caído`
  - `vosotros`：当前 `os habríais caido` → 应为 `os habríais caído`
  - `ellos/ustedes`：当前 `se habrían caido` → 应为 `se habrían caído`
- **虚拟式现在完成时**
  - `yo`：当前 `me haya caido` → 应为 `me haya caído`
  - `tú`：当前 `te hayas caido` → 应为 `te hayas caído`
  - `él/ella/usted`：当前 `se haya caido` → 应为 `se haya caído`
  - `nosotros`：当前 `nos hayamos caido` → 应为 `nos hayamos caído`
  - `vosotros`：当前 `os hayáis caido` → 应为 `os hayáis caído`
  - `ellos/ustedes`：当前 `se hayan caido` → 应为 `se hayan caído`
- **命令式**
  - `tú`：当前 `cáete` → 应为 `caete`
  - `usted`：当前 `cáigase` → 应为 `caigase`
  - `nosotros`：当前 `caigámonos` → 应为 `caigamonos`
  - `ustedes`：当前 `cáiganse` → 应为 `caiganse`

### convertirse

- **现在时**
  - `yo`：当前 `me converto` → 应为 `me convierto`
  - `tú`：当前 `te convertes` → 应为 `te conviertes`
  - `él/ella/usted`：当前 `se converte` → 应为 `se convierte`
  - `ellos/ustedes`：当前 `se converten` → 应为 `se convierten`
- **简单过去时**
  - `él/ella/usted`：当前 `se convertió` → 应为 `se convirtió`
  - `ellos/ustedes`：当前 `se convertieron` → 应为 `se convirtieron`
- **虚拟式现在时**
  - `yo`：当前 `me converta` → 应为 `me convierta`
  - `tú`：当前 `te convertas` → 应为 `te conviertas`
  - `él/ella/usted`：当前 `se converta` → 应为 `se convierta`
  - `nosotros`：当前 `nos convertamos` → 应为 `nos convirtamos`
  - `vosotros`：当前 `os convertáis` → 应为 `os convirtáis`
  - `ellos/ustedes`：当前 `se convertan` → 应为 `se conviertan`
- **虚拟式过去未完成时**
  - `yo`：当前 `me convertiera` → 应为 `me convirtiera`
  - `tú`：当前 `te convertieras` → 应为 `te convirtieras`
  - `él/ella/usted`：当前 `se convertiera` → 应为 `se convirtiera`
  - `nosotros`：当前 `nos convertiéramos` → 应为 `nos convirtiéramos`
  - `vosotros`：当前 `os convertierais` → 应为 `os convirtierais`
  - `ellos/ustedes`：当前 `se convertieran` → 应为 `se convirtieran`
- **命令式**
  - `tú`：当前 `convertete` → 应为 `conviertete`
  - `usted`：当前 `convertase` → 应为 `conviertase`
  - `nosotros`：当前 `convertamonos` → 应为 `convirtamonos`
  - `ustedes`：当前 `convertanse` → 应为 `conviertanse`

### despedirse

- **虚拟式过去未完成时**
  - `yo`：当前 `me despediera` → 应为 `me despidiera`
  - `tú`：当前 `te despedieras` → 应为 `te despidieras`
  - `él/ella/usted`：当前 `se despediera` → 应为 `se despidiera`
  - `nosotros`：当前 `nos despediéramos` → 应为 `nos despidiéramos`
  - `vosotros`：当前 `os despedierais` → 应为 `os despidierais`
  - `ellos/ustedes`：当前 `se despedieran` → 应为 `se despidieran`
- **命令式**
  - `tú`：当前 `despídete` → 应为 `despidete`
  - `usted`：当前 `despídase` → 应为 `despidase`
  - `nosotros`：当前 `despidámonos` → 应为 `despidamonos`
  - `vosotros`：当前 `despedíos` → 应为 `despedios`
  - `ustedes`：当前 `despídanse` → 应为 `despidanse`

### despertarse

- **命令式**
  - `tú`：当前 `despiértate` → 应为 `despiertate`
  - `usted`：当前 `despiértese` → 应为 `despiertese`
  - `nosotros`：当前 `despertémonos` → 应为 `despertemonos`
  - `ustedes`：当前 `despiértense` → 应为 `despiertense`

### desvestirse

- **现在时**
  - `yo`：当前 `me desvesto` → 应为 `me desvisto`
  - `tú`：当前 `te desvestes` → 应为 `te desvistes`
  - `él/ella/usted`：当前 `se desveste` → 应为 `se desviste`
  - `ellos/ustedes`：当前 `se desvesten` → 应为 `se desvisten`
- **简单过去时**
  - `él/ella/usted`：当前 `se desvestió` → 应为 `se desvistió`
  - `ellos/ustedes`：当前 `se desvestieron` → 应为 `se desvistieron`
- **虚拟式现在时**
  - `yo`：当前 `me desvesta` → 应为 `me desvista`
  - `tú`：当前 `te desvestas` → 应为 `te desvistas`
  - `él/ella/usted`：当前 `se desvesta` → 应为 `se desvista`
  - `nosotros`：当前 `nos desvestamos` → 应为 `nos desvistamos`
  - `vosotros`：当前 `os desvestáis` → 应为 `os desvistáis`
  - `ellos/ustedes`：当前 `se desvestan` → 应为 `se desvistan`
- **虚拟式过去未完成时**
  - `yo`：当前 `me desvestiera` → 应为 `me desvistiera`
  - `tú`：当前 `te desvestieras` → 应为 `te desvistieras`
  - `él/ella/usted`：当前 `se desvestiera` → 应为 `se desvistiera`
  - `nosotros`：当前 `nos desvestiéramos` → 应为 `nos desvistiéramos`
  - `vosotros`：当前 `os desvestierais` → 应为 `os desvistierais`
  - `ellos/ustedes`：当前 `se desvestieran` → 应为 `se desvistieran`
- **命令式**
  - `tú`：当前 `desvestete` → 应为 `desvistete`
  - `usted`：当前 `desvestase` → 应为 `desvistase`
  - `nosotros`：当前 `desvestamonos` → 应为 `desvistamonos`
  - `ustedes`：当前 `desvestanse` → 应为 `desvistanse`

### divertirse

- **虚拟式过去未完成时**
  - `yo`：当前 `me divertiera` → 应为 `me divirtiera`
  - `tú`：当前 `te divertieras` → 应为 `te divirtieras`
  - `él/ella/usted`：当前 `se divertiera` → 应为 `se divirtiera`
  - `nosotros`：当前 `nos divertiéramos` → 应为 `nos divirtiéramos`
  - `vosotros`：当前 `os divertierais` → 应为 `os divirtierais`
  - `ellos/ustedes`：当前 `se divertieran` → 应为 `se divirtieran`
- **命令式**
  - `tú`：当前 `diviértete` → 应为 `diviertete`
  - `usted`：当前 `diviértase` → 应为 `diviertase`
  - `nosotros`：当前 `divirtámonos` → 应为 `divirtamonos`
  - `vosotros`：当前 `divertíos` → 应为 `divertios`
  - `ustedes`：当前 `diviértanse` → 应为 `diviertanse`

### encontrarse

- **命令式**
  - `tú`：当前 `encuéntrate` → 应为 `encuentrate`
  - `usted`：当前 `encuéntrese` → 应为 `encuentrese`
  - `nosotros`：当前 `encontrémonos` → 应为 `encontremonos`
  - `ustedes`：当前 `encuéntren` → 应为 `encuentrense`

### enviar

- **现在时**
  - `yo`：当前 `envio` → 应为 `envío`
  - `tú`：当前 `envias` → 应为 `envías`
  - `él/ella/usted`：当前 `envia` → 应为 `envía`
  - `ellos/ustedes`：当前 `envian` → 应为 `envían`
- **虚拟式现在时**
  - `yo`：当前 `envie` → 应为 `envíe`
  - `tú`：当前 `envies` → 应为 `envíes`
  - `él/ella/usted`：当前 `envie` → 应为 `envíe`
  - `ellos/ustedes`：当前 `envien` → 应为 `envíen`
- **命令式**
  - `tú`：当前 `envia` → 应为 `envía`
  - `usted`：当前 `envie` → 应为 `envíe`
  - `ustedes`：当前 `envien` → 应为 `envíen`

### explicar

- **简单过去时**
  - `yo`：当前 `explicé` → 应为 `expliqué`
- **虚拟式现在时**
  - `yo`：当前 `explice` → 应为 `explique`
  - `tú`：当前 `explices` → 应为 `expliques`
  - `él/ella/usted`：当前 `explice` → 应为 `explique`
  - `nosotros`：当前 `explicemos` → 应为 `expliquemos`
  - `vosotros`：当前 `explicéis` → 应为 `expliquéis`
  - `ellos/ustedes`：当前 `explicen` → 应为 `expliquen`
- **命令式**
  - `usted`：当前 `explice` → 应为 `explique`
  - `nosotros`：当前 `explicemos` → 应为 `expliquemos`
  - `ustedes`：当前 `explicen` → 应为 `expliquen`

### freír

- **简单过去时**
  - `él/ella/usted`：当前 `frió` → 应为 `frio`
- **虚拟式现在时**
  - `vosotros`：当前 `friáis` → 应为 `friais`
- **现在完成时**
  - `yo`：当前 `he freido` → 应为 `he freído`
  - `tú`：当前 `has freido` → 应为 `has freído`
  - `él/ella/usted`：当前 `ha freido` → 应为 `ha freído`
  - `nosotros`：当前 `hemos freido` → 应为 `hemos freído`
  - `vosotros`：当前 `habéis freido` → 应为 `habéis freído`
  - `ellos/ustedes`：当前 `han freido` → 应为 `han freído`
- **过去完成时**
  - `yo`：当前 `había freido` → 应为 `había freído`
  - `tú`：当前 `habías freido` → 应为 `habías freído`
  - `él/ella/usted`：当前 `había freido` → 应为 `había freído`
  - `nosotros`：当前 `habíamos freido` → 应为 `habíamos freído`
  - `vosotros`：当前 `habíais freido` → 应为 `habíais freído`
  - `ellos/ustedes`：当前 `habían freido` → 应为 `habían freído`
- **将来完成时**
  - `yo`：当前 `habré freido` → 应为 `habré freído`
  - `tú`：当前 `habrás freido` → 应为 `habrás freído`
  - `él/ella/usted`：当前 `habrá freido` → 应为 `habrá freído`
  - `nosotros`：当前 `habremos freido` → 应为 `habremos freído`
  - `vosotros`：当前 `habréis freido` → 应为 `habréis freído`
  - `ellos/ustedes`：当前 `habrán freido` → 应为 `habrán freído`
- **条件式完成时**
  - `yo`：当前 `habría freido` → 应为 `habría freído`
  - `tú`：当前 `habrías freido` → 应为 `habrías freído`
  - `él/ella/usted`：当前 `habría freido` → 应为 `habría freído`
  - `nosotros`：当前 `habríamos freido` → 应为 `habríamos freído`
  - `vosotros`：当前 `habríais freido` → 应为 `habríais freído`
  - `ellos/ustedes`：当前 `habrían freido` → 应为 `habrían freído`
- **虚拟式现在完成时**
  - `yo`：当前 `haya freido` → 应为 `haya freído`
  - `tú`：当前 `hayas freido` → 应为 `hayas freído`
  - `él/ella/usted`：当前 `haya freido` → 应为 `haya freído`
  - `nosotros`：当前 `hayamos freido` → 应为 `hayamos freído`
  - `vosotros`：当前 `hayáis freido` → 应为 `hayáis freído`
  - `ellos/ustedes`：当前 `hayan freido` → 应为 `hayan freído`

### hacerse

- **命令式**
  - `usted`：当前 `hágase` → 应为 `hagase`
  - `nosotros`：当前 `hagámonos` → 应为 `hagamonos`
  - `ustedes`：当前 `háganse` → 应为 `haganse`

### huir

- **现在时**
  - `vosotros`：当前 `huís` → 应为 `huis`
- **简单过去时**
  - `yo`：当前 `huí` → 应为 `hui`

### ir

- **命令式**
  - `nosotros`：当前 `vayamos` → 应为 `vamos`

### irse

- **命令式**
  - `usted`：当前 `váyase` → 应为 `vayase`
  - `nosotros`：当前 `vámonos` → 应为 `vamonos`
  - `vosotros`：当前 `idos` → 应为 `ios`
  - `ustedes`：当前 `váyanse` → 应为 `vayanse`

### llegar

- **简单过去时**
  - `yo`：当前 `llegé` → 应为 `llegué`
- **虚拟式现在时**
  - `yo`：当前 `llege` → 应为 `llegue`
  - `tú`：当前 `lleges` → 应为 `llegues`
  - `él/ella/usted`：当前 `llege` → 应为 `llegue`
  - `nosotros`：当前 `llegemos` → 应为 `lleguemos`
  - `vosotros`：当前 `llegéis` → 应为 `lleguéis`
  - `ellos/ustedes`：当前 `llegen` → 应为 `lleguen`
- **命令式**
  - `usted`：当前 `llege` → 应为 `llegue`
  - `nosotros`：当前 `llegemos` → 应为 `lleguemos`
  - `ustedes`：当前 `llegen` → 应为 `lleguen`

### llover

- **虚拟式过去未完成时**
  - `yo`：当前 `llovra` → 应为 `N/A`
  - `tú`：当前 `llovras` → 应为 `N/A`
  - `él/ella/usted`：当前 `llovra` → 应为 `lloviera`
  - `nosotros`：当前 `llóvramos` → 应为 `N/A`
  - `vosotros`：当前 `llovrais` → 应为 `N/A`
  - `ellos/ustedes`：当前 `llovran` → 应为 `N/A`
- **命令式**
  - `tú`：当前 `llove` → 应为 `N/A`
  - `usted`：当前 `llova` → 应为 `N/A`
  - `nosotros`：当前 `llovamos` → 应为 `N/A`
  - `vosotros`：当前 `lloved` → 应为 `N/A`
  - `ustedes`：当前 `llovan` → 应为 `N/A`

### morirse

- **命令式**
  - `tú`：当前 `muérete` → 应为 `muerete`
  - `usted`：当前 `muérase` → 应为 `muerase`
  - `nosotros`：当前 `murámonos` → 应为 `muramonos`
  - `vosotros`：当前 `moríos` → 应为 `morios`
  - `ustedes`：当前 `muéranse` → 应为 `mueranse`

### nevar

- **现在时**
  - `yo`：当前 `N/A` → 应为 `nievo`
  - `tú`：当前 `N/A` → 应为 `nievas`
  - `nosotros`：当前 `N/A` → 应为 `nevamos`
  - `vosotros`：当前 `N/A` → 应为 `neváis`
  - `ellos/ustedes`：当前 `N/A` → 应为 `nievan`
- **简单过去时**
  - `yo`：当前 `N/A` → 应为 `nevé`
  - `tú`：当前 `N/A` → 应为 `nevaste`
  - `nosotros`：当前 `N/A` → 应为 `nevamos`
  - `vosotros`：当前 `N/A` → 应为 `nevasteis`
  - `ellos/ustedes`：当前 `N/A` → 应为 `nevaron`
- **过去未完成时**
  - `yo`：当前 `N/A` → 应为 `nevaba`
  - `tú`：当前 `N/A` → 应为 `nevabas`
  - `nosotros`：当前 `N/A` → 应为 `nevábamos`
  - `vosotros`：当前 `N/A` → 应为 `nevabais`
  - `ellos/ustedes`：当前 `N/A` → 应为 `nevaban`
- **将来时**
  - `yo`：当前 `N/A` → 应为 `nevaré`
  - `tú`：当前 `N/A` → 应为 `nevarás`
  - `nosotros`：当前 `N/A` → 应为 `nevaremos`
  - `vosotros`：当前 `N/A` → 应为 `nevaréis`
  - `ellos/ustedes`：当前 `N/A` → 应为 `nevarán`
- **条件式**
  - `yo`：当前 `N/A` → 应为 `nevaría`
  - `tú`：当前 `N/A` → 应为 `nevarías`
  - `nosotros`：当前 `N/A` → 应为 `nevaríamos`
  - `vosotros`：当前 `N/A` → 应为 `nevaríais`
  - `ellos/ustedes`：当前 `N/A` → 应为 `nevarían`
- **虚拟式现在时**
  - `yo`：当前 `N/A` → 应为 `nieve`
  - `tú`：当前 `N/A` → 应为 `nieves`
  - `nosotros`：当前 `N/A` → 应为 `nevemos`
  - `vosotros`：当前 `N/A` → 应为 `nevéis`
  - `ellos/ustedes`：当前 `N/A` → 应为 `nieven`
- **虚拟式过去未完成时**
  - `yo`：当前 `nevra` → 应为 `nevara`
  - `tú`：当前 `nevras` → 应为 `nevaras`
  - `él/ella/usted`：当前 `nevra` → 应为 `nevara`
  - `nosotros`：当前 `névramos` → 应为 `neváramos`
  - `vosotros`：当前 `nevrais` → 应为 `nevarais`
  - `ellos/ustedes`：当前 `nevran` → 应为 `nevaran`
- **命令式**
  - `tú`：当前 `neva` → 应为 `nieva`
  - `usted`：当前 `neve` → 应为 `nieve`
  - `ustedes`：当前 `neven` → 应为 `nieven`

### oír

- **现在完成时**
  - `yo`：当前 `he oido` → 应为 `he oído`
  - `tú`：当前 `has oido` → 应为 `has oído`
  - `él/ella/usted`：当前 `ha oido` → 应为 `ha oído`
  - `nosotros`：当前 `hemos oido` → 应为 `hemos oído`
  - `vosotros`：当前 `habéis oido` → 应为 `habéis oído`
  - `ellos/ustedes`：当前 `han oido` → 应为 `han oído`
- **过去完成时**
  - `yo`：当前 `había oido` → 应为 `había oído`
  - `tú`：当前 `habías oido` → 应为 `habías oído`
  - `él/ella/usted`：当前 `había oido` → 应为 `había oído`
  - `nosotros`：当前 `habíamos oido` → 应为 `habíamos oído`
  - `vosotros`：当前 `habíais oido` → 应为 `habíais oído`
  - `ellos/ustedes`：当前 `habían oido` → 应为 `habían oído`
- **将来完成时**
  - `yo`：当前 `habré oido` → 应为 `habré oído`
  - `tú`：当前 `habrás oido` → 应为 `habrás oído`
  - `él/ella/usted`：当前 `habrá oido` → 应为 `habrá oído`
  - `nosotros`：当前 `habremos oido` → 应为 `habremos oído`
  - `vosotros`：当前 `habréis oido` → 应为 `habréis oído`
  - `ellos/ustedes`：当前 `habrán oido` → 应为 `habrán oído`
- **条件式完成时**
  - `yo`：当前 `habría oido` → 应为 `habría oído`
  - `tú`：当前 `habrías oido` → 应为 `habrías oído`
  - `él/ella/usted`：当前 `habría oido` → 应为 `habría oído`
  - `nosotros`：当前 `habríamos oido` → 应为 `habríamos oído`
  - `vosotros`：当前 `habríais oido` → 应为 `habríais oído`
  - `ellos/ustedes`：当前 `habrían oido` → 应为 `habrían oído`
- **虚拟式现在完成时**
  - `yo`：当前 `haya oido` → 应为 `haya oído`
  - `tú`：当前 `hayas oido` → 应为 `hayas oído`
  - `él/ella/usted`：当前 `haya oido` → 应为 `haya oído`
  - `nosotros`：当前 `hayamos oido` → 应为 `hayamos oído`
  - `vosotros`：当前 `hayáis oido` → 应为 `hayáis oído`
  - `ellos/ustedes`：当前 `hayan oido` → 应为 `hayan oído`

### pagar

- **简单过去时**
  - `yo`：当前 `pagé` → 应为 `pagué`
- **虚拟式现在时**
  - `yo`：当前 `page` → 应为 `pague`
  - `tú`：当前 `pages` → 应为 `pagues`
  - `él/ella/usted`：当前 `page` → 应为 `pague`
  - `nosotros`：当前 `pagemos` → 应为 `paguemos`
  - `vosotros`：当前 `pagéis` → 应为 `paguéis`
  - `ellos/ustedes`：当前 `pagen` → 应为 `paguen`
- **命令式**
  - `usted`：当前 `page` → 应为 `pague`
  - `nosotros`：当前 `pagemos` → 应为 `paguemos`
  - `ustedes`：当前 `pagen` → 应为 `paguen`

### parecerse

- **现在时**
  - `yo`：当前 `me pareco` → 应为 `me parezco`
- **虚拟式现在时**
  - `yo`：当前 `me pareca` → 应为 `me parezca`
  - `tú`：当前 `te parecas` → 应为 `te parezcas`
  - `él/ella/usted`：当前 `se pareca` → 应为 `se parezca`
  - `nosotros`：当前 `nos parecamos` → 应为 `nos parezcamos`
  - `vosotros`：当前 `os parecáis` → 应为 `os parezcáis`
  - `ellos/ustedes`：当前 `se parecan` → 应为 `se parezcan`
- **命令式**
  - `usted`：当前 `parecase` → 应为 `parezcase`
  - `nosotros`：当前 `parecamonos` → 应为 `parezcamonos`
  - `ustedes`：当前 `parecanse` → 应为 `parezcanse`

### ponerse

- **命令式**
  - `usted`：当前 `póngase` → 应为 `pongase`
  - `nosotros`：当前 `pongámonos` → 应为 `pongamonos`
  - `ustedes`：当前 `pónganse` → 应为 `ponganse`

### practicar

- **简单过去时**
  - `yo`：当前 `practicé` → 应为 `practiqué`
- **虚拟式现在时**
  - `yo`：当前 `practice` → 应为 `practique`
  - `tú`：当前 `practices` → 应为 `practiques`
  - `él/ella/usted`：当前 `practice` → 应为 `practique`
  - `nosotros`：当前 `practicemos` → 应为 `practiquemos`
  - `vosotros`：当前 `practicéis` → 应为 `practiquéis`
  - `ellos/ustedes`：当前 `practicen` → 应为 `practiquen`
- **命令式**
  - `usted`：当前 `practice` → 应为 `practique`
  - `nosotros`：当前 `practicemos` → 应为 `practiquemos`
  - `ustedes`：当前 `practicen` → 应为 `practiquen`

### preferir

- **过去未完成时**
  - `nosotros`：当前 `preferiamos` → 应为 `preferíamos`

### quejarse

- **命令式**
  - `tú`：当前 `quejate` → 应为 `quéjate`
  - `usted`：当前 `quejese` → 应为 `quéjese`
  - `nosotros`：当前 `quejemonos` → 应为 `quejémonos`
  - `ustedes`：当前 `quejense` → 应为 `quéjense`

### reunirse

- **命令式**
  - `nosotros`：当前 `reunámonos` → 应为 `reunamonos`
  - `vosotros`：当前 `reuníos` → 应为 `reunios`

### reír

- **简单过去时**
  - `él/ella/usted`：当前 `rió` → 应为 `rio`
- **虚拟式现在时**
  - `vosotros`：当前 `riáis` → 应为 `riais`
- **现在完成时**
  - `yo`：当前 `he reido` → 应为 `he reído`
  - `tú`：当前 `has reido` → 应为 `has reído`
  - `él/ella/usted`：当前 `ha reido` → 应为 `ha reído`
  - `nosotros`：当前 `hemos reido` → 应为 `hemos reído`
  - `vosotros`：当前 `habéis reido` → 应为 `habéis reído`
  - `ellos/ustedes`：当前 `han reido` → 应为 `han reído`
- **过去完成时**
  - `yo`：当前 `había reido` → 应为 `había reído`
  - `tú`：当前 `habías reido` → 应为 `habías reído`
  - `él/ella/usted`：当前 `había reido` → 应为 `había reído`
  - `nosotros`：当前 `habíamos reido` → 应为 `habíamos reído`
  - `vosotros`：当前 `habíais reido` → 应为 `habíais reído`
  - `ellos/ustedes`：当前 `habían reido` → 应为 `habían reído`
- **将来完成时**
  - `yo`：当前 `habré reido` → 应为 `habré reído`
  - `tú`：当前 `habrás reido` → 应为 `habrás reído`
  - `él/ella/usted`：当前 `habrá reido` → 应为 `habrá reído`
  - `nosotros`：当前 `habremos reido` → 应为 `habremos reído`
  - `vosotros`：当前 `habréis reido` → 应为 `habréis reído`
  - `ellos/ustedes`：当前 `habrán reido` → 应为 `habrán reído`
- **条件式完成时**
  - `yo`：当前 `habría reido` → 应为 `habría reído`
  - `tú`：当前 `habrías reido` → 应为 `habrías reído`
  - `él/ella/usted`：当前 `habría reido` → 应为 `habría reído`
  - `nosotros`：当前 `habríamos reido` → 应为 `habríamos reído`
  - `vosotros`：当前 `habríais reido` → 应为 `habríais reído`
  - `ellos/ustedes`：当前 `habrían reido` → 应为 `habrían reído`
- **虚拟式现在完成时**
  - `yo`：当前 `haya reido` → 应为 `haya reído`
  - `tú`：当前 `hayas reido` → 应为 `hayas reído`
  - `él/ella/usted`：当前 `haya reido` → 应为 `haya reído`
  - `nosotros`：当前 `hayamos reido` → 应为 `hayamos reído`
  - `vosotros`：当前 `hayáis reido` → 应为 `hayáis reído`
  - `ellos/ustedes`：当前 `hayan reido` → 应为 `hayan reído`

### roer

- **现在完成时**
  - `yo`：当前 `he roido` → 应为 `he roído`
  - `tú`：当前 `has roido` → 应为 `has roído`
  - `él/ella/usted`：当前 `ha roido` → 应为 `ha roído`
  - `nosotros`：当前 `hemos roido` → 应为 `hemos roído`
  - `vosotros`：当前 `habéis roido` → 应为 `habéis roído`
  - `ellos/ustedes`：当前 `han roido` → 应为 `han roído`
- **过去完成时**
  - `yo`：当前 `había roido` → 应为 `había roído`
  - `tú`：当前 `habías roido` → 应为 `habías roído`
  - `él/ella/usted`：当前 `había roido` → 应为 `había roído`
  - `nosotros`：当前 `habíamos roido` → 应为 `habíamos roído`
  - `vosotros`：当前 `habíais roido` → 应为 `habíais roído`
  - `ellos/ustedes`：当前 `habían roido` → 应为 `habían roído`
- **将来完成时**
  - `yo`：当前 `habré roido` → 应为 `habré roído`
  - `tú`：当前 `habrás roido` → 应为 `habrás roído`
  - `él/ella/usted`：当前 `habrá roido` → 应为 `habrá roído`
  - `nosotros`：当前 `habremos roido` → 应为 `habremos roído`
  - `vosotros`：当前 `habréis roido` → 应为 `habréis roído`
  - `ellos/ustedes`：当前 `habrán roido` → 应为 `habrán roído`
- **条件式完成时**
  - `yo`：当前 `habría roido` → 应为 `habría roído`
  - `tú`：当前 `habrías roido` → 应为 `habrías roído`
  - `él/ella/usted`：当前 `habría roido` → 应为 `habría roído`
  - `nosotros`：当前 `habríamos roido` → 应为 `habríamos roído`
  - `vosotros`：当前 `habríais roido` → 应为 `habríais roído`
  - `ellos/ustedes`：当前 `habrían roido` → 应为 `habrían roído`
- **虚拟式现在完成时**
  - `yo`：当前 `haya roido` → 应为 `haya roído`
  - `tú`：当前 `hayas roido` → 应为 `hayas roído`
  - `él/ella/usted`：当前 `haya roido` → 应为 `haya roído`
  - `nosotros`：当前 `hayamos roido` → 应为 `hayamos roído`
  - `vosotros`：当前 `hayáis roido` → 应为 `hayáis roído`
  - `ellos/ustedes`：当前 `hayan roido` → 应为 `hayan roído`

### sentarse

- **命令式**
  - `tú`：当前 `siéntate` → 应为 `sientate`
  - `usted`：当前 `siéntese` → 应为 `sientese`
  - `nosotros`：当前 `sentémonos` → 应为 `sentemonos`
  - `ustedes`：当前 `siéntense` → 应为 `sientense`

### soler

- **命令式**
  - `tú`：当前 `sole` → 应为 `suele`
  - `usted`：当前 `sola` → 应为 `suela`
  - `ustedes`：当前 `solan` → 应为 `suelan`

### sonreír

- **现在完成时**
  - `yo`：当前 `he sonreido` → 应为 `he sonreído`
  - `tú`：当前 `has sonreido` → 应为 `has sonreído`
  - `él/ella/usted`：当前 `ha sonreido` → 应为 `ha sonreído`
  - `nosotros`：当前 `hemos sonreido` → 应为 `hemos sonreído`
  - `vosotros`：当前 `habéis sonreido` → 应为 `habéis sonreído`
  - `ellos/ustedes`：当前 `han sonreido` → 应为 `han sonreído`
- **过去完成时**
  - `yo`：当前 `había sonreido` → 应为 `había sonreído`
  - `tú`：当前 `habías sonreido` → 应为 `habías sonreído`
  - `él/ella/usted`：当前 `había sonreido` → 应为 `había sonreído`
  - `nosotros`：当前 `habíamos sonreido` → 应为 `habíamos sonreído`
  - `vosotros`：当前 `habíais sonreido` → 应为 `habíais sonreído`
  - `ellos/ustedes`：当前 `habían sonreido` → 应为 `habían sonreído`
- **将来完成时**
  - `yo`：当前 `habré sonreido` → 应为 `habré sonreído`
  - `tú`：当前 `habrás sonreido` → 应为 `habrás sonreído`
  - `él/ella/usted`：当前 `habrá sonreido` → 应为 `habrá sonreído`
  - `nosotros`：当前 `habremos sonreido` → 应为 `habremos sonreído`
  - `vosotros`：当前 `habréis sonreido` → 应为 `habréis sonreído`
  - `ellos/ustedes`：当前 `habrán sonreido` → 应为 `habrán sonreído`
- **条件式完成时**
  - `yo`：当前 `habría sonreido` → 应为 `habría sonreído`
  - `tú`：当前 `habrías sonreido` → 应为 `habrías sonreído`
  - `él/ella/usted`：当前 `habría sonreido` → 应为 `habría sonreído`
  - `nosotros`：当前 `habríamos sonreido` → 应为 `habríamos sonreído`
  - `vosotros`：当前 `habríais sonreido` → 应为 `habríais sonreído`
  - `ellos/ustedes`：当前 `habrían sonreido` → 应为 `habrían sonreído`
- **虚拟式现在完成时**
  - `yo`：当前 `haya sonreido` → 应为 `haya sonreído`
  - `tú`：当前 `hayas sonreido` → 应为 `hayas sonreído`
  - `él/ella/usted`：当前 `haya sonreido` → 应为 `haya sonreído`
  - `nosotros`：当前 `hayamos sonreido` → 应为 `hayamos sonreído`
  - `vosotros`：当前 `hayáis sonreido` → 应为 `hayáis sonreído`
  - `ellos/ustedes`：当前 `hayan sonreido` → 应为 `hayan sonreído`

### sugerir

- **过去未完成时**
  - `nosotros`：当前 `sugeriamos` → 应为 `sugeríamos`

### tocar

- **简单过去时**
  - `yo`：当前 `tocé` → 应为 `toqué`
- **虚拟式现在时**
  - `yo`：当前 `toce` → 应为 `toque`
  - `tú`：当前 `toces` → 应为 `toques`
  - `él/ella/usted`：当前 `toce` → 应为 `toque`
  - `nosotros`：当前 `tocemos` → 应为 `toquemos`
  - `vosotros`：当前 `tocéis` → 应为 `toquéis`
  - `ellos/ustedes`：当前 `tocen` → 应为 `toquen`
- **命令式**
  - `usted`：当前 `toce` → 应为 `toque`
  - `nosotros`：当前 `tocemos` → 应为 `toquemos`
  - `ustedes`：当前 `tocen` → 应为 `toquen`

### traer

- **现在完成时**
  - `yo`：当前 `he traido` → 应为 `he traído`
  - `tú`：当前 `has traido` → 应为 `has traído`
  - `él/ella/usted`：当前 `ha traido` → 应为 `ha traído`
  - `nosotros`：当前 `hemos traido` → 应为 `hemos traído`
  - `vosotros`：当前 `habéis traido` → 应为 `habéis traído`
  - `ellos/ustedes`：当前 `han traido` → 应为 `han traído`
- **过去完成时**
  - `yo`：当前 `había traido` → 应为 `había traído`
  - `tú`：当前 `habías traido` → 应为 `habías traído`
  - `él/ella/usted`：当前 `había traido` → 应为 `había traído`
  - `nosotros`：当前 `habíamos traido` → 应为 `habíamos traído`
  - `vosotros`：当前 `habíais traido` → 应为 `habíais traído`
  - `ellos/ustedes`：当前 `habían traido` → 应为 `habían traído`
- **将来完成时**
  - `yo`：当前 `habré traido` → 应为 `habré traído`
  - `tú`：当前 `habrás traido` → 应为 `habrás traído`
  - `él/ella/usted`：当前 `habrá traido` → 应为 `habrá traído`
  - `nosotros`：当前 `habremos traido` → 应为 `habremos traído`
  - `vosotros`：当前 `habréis traido` → 应为 `habréis traído`
  - `ellos/ustedes`：当前 `habrán traido` → 应为 `habrán traído`
- **条件式完成时**
  - `yo`：当前 `habría traido` → 应为 `habría traído`
  - `tú`：当前 `habrías traido` → 应为 `habrías traído`
  - `él/ella/usted`：当前 `habría traido` → 应为 `habría traído`
  - `nosotros`：当前 `habríamos traido` → 应为 `habríamos traído`
  - `vosotros`：当前 `habríais traido` → 应为 `habríais traído`
  - `ellos/ustedes`：当前 `habrían traido` → 应为 `habrían traído`
- **虚拟式现在完成时**
  - `yo`：当前 `haya traido` → 应为 `haya traído`
  - `tú`：当前 `hayas traido` → 应为 `hayas traído`
  - `él/ella/usted`：当前 `haya traido` → 应为 `haya traído`
  - `nosotros`：当前 `hayamos traido` → 应为 `hayamos traído`
  - `vosotros`：当前 `hayáis traido` → 应为 `hayáis traído`
  - `ellos/ustedes`：当前 `hayan traido` → 应为 `hayan traído`

### tronar

- **现在时**
  - `yo`：当前 `N/A` → 应为 `trueno`
  - `tú`：当前 `N/A` → 应为 `truenas`
  - `nosotros`：当前 `N/A` → 应为 `tronamos`
  - `vosotros`：当前 `N/A` → 应为 `tronáis`
  - `ellos/ustedes`：当前 `N/A` → 应为 `truenan`
- **简单过去时**
  - `yo`：当前 `N/A` → 应为 `troné`
  - `tú`：当前 `N/A` → 应为 `tronaste`
  - `nosotros`：当前 `N/A` → 应为 `tronamos`
  - `vosotros`：当前 `N/A` → 应为 `tronasteis`
  - `ellos/ustedes`：当前 `N/A` → 应为 `tronaron`
- **过去未完成时**
  - `yo`：当前 `N/A` → 应为 `tronaba`
  - `tú`：当前 `N/A` → 应为 `tronabas`
  - `nosotros`：当前 `N/A` → 应为 `tronábamos`
  - `vosotros`：当前 `N/A` → 应为 `tronabais`
  - `ellos/ustedes`：当前 `N/A` → 应为 `tronaban`
- **将来时**
  - `yo`：当前 `N/A` → 应为 `tronaré`
  - `tú`：当前 `N/A` → 应为 `tronarás`
  - `nosotros`：当前 `N/A` → 应为 `tronaremos`
  - `vosotros`：当前 `N/A` → 应为 `tronaréis`
  - `ellos/ustedes`：当前 `N/A` → 应为 `tronarán`
- **条件式**
  - `yo`：当前 `N/A` → 应为 `tronaría`
  - `tú`：当前 `N/A` → 应为 `tronarías`
  - `nosotros`：当前 `N/A` → 应为 `tronaríamos`
  - `vosotros`：当前 `N/A` → 应为 `tronaríais`
  - `ellos/ustedes`：当前 `N/A` → 应为 `tronarían`
- **虚拟式现在时**
  - `yo`：当前 `N/A` → 应为 `truene`
  - `tú`：当前 `N/A` → 应为 `truenes`
  - `nosotros`：当前 `N/A` → 应为 `tronemos`
  - `vosotros`：当前 `N/A` → 应为 `tronéis`
  - `ellos/ustedes`：当前 `N/A` → 应为 `truenen`
- **虚拟式过去未完成时**
  - `yo`：当前 `tronra` → 应为 `tronara`
  - `tú`：当前 `tronras` → 应为 `tronaras`
  - `él/ella/usted`：当前 `tronra` → 应为 `tronara`
  - `nosotros`：当前 `trónramos` → 应为 `tronáramos`
  - `vosotros`：当前 `tronrais` → 应为 `tronarais`
  - `ellos/ustedes`：当前 `tronran` → 应为 `tronaran`
- **命令式**
  - `tú`：当前 `trona` → 应为 `truena`
  - `usted`：当前 `trone` → 应为 `truene`
  - `ustedes`：当前 `tronen` → 应为 `truenen`

### valer

- **命令式**
  - `tú`：当前 `val` → 应为 `vale`

### vestirse

- **命令式**
  - `tú`：当前 `vístete` → 应为 `vistete`
  - `usted`：当前 `vístase` → 应为 `vistase`
  - `nosotros`：当前 `vistámonos` → 应为 `vistamonos`
  - `vosotros`：当前 `vestíos` → 应为 `vestios`
  - `ustedes`：当前 `vístanse` → 应为 `vistanse`

### volverse

- **命令式**
  - `tú`：当前 `vuélvete` → 应为 `vuelvete`
  - `usted`：当前 `vuélvase` → 应为 `vuelvase`
  - `nosotros`：当前 `volvamos` → 应为 `volvamonos`
  - `ustedes`：当前 `vuélvanse` → 应为 `vuelvanse`
