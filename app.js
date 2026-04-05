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

const TRAINER_SPRINT_SECONDS = 90;
let trainerTimer = null;
let trainerSettings = JSON.parse(localStorage.getItem('verbTrainerSettings')) || {
    mode: 'mixed',
    tense: 'random',
    verb: 'random',
    irregularOnly: false
};

let trainerState = {
    isActive: false,
    totalQuestions: 0,
    correctForms: 0,
    totalForms: 0,
    streak: 0,
    bestStreak: 0,
    wrongAnswers: [],
    timeLeft: TRAINER_SPRINT_SECONDS,
    currentQuestion: null,
    focusVerb: null
};

const DAILY_VERB_COUNT = 10;
const ACCESS_CODE_STORAGE_KEY = 'spanishLearningApprovedCode';
const ACCESS_OWNER_STORAGE_KEY = 'spanishLearningOwnerAccess';
const ACCESS_CONFIG = {
    approvalEmail: 'binbinliang1018@hotmail.com',
    approvedCodes: [
        'amigo-b2-2026'
    ]
};

// ============ 初始化 ============
function initApp() {
    initAccessGate();
    initDate();
    initTabs();
    initDailyPractice();
    initReviewPractice();
    initVerbPractice();
    initSpeakingPractice();
    initProgress();
    updateStreak();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp()
}

function initAccessGate() {
    bindAccessGateEvents();
    refreshAccessGate();
}

function isAccessApproved() {
    const storedCode = localStorage.getItem(ACCESS_CODE_STORAGE_KEY);
    return Boolean(storedCode && ACCESS_CONFIG.approvedCodes.includes(storedCode));
}

function isOwnerAccessEnabled() {
    return localStorage.getItem(ACCESS_OWNER_STORAGE_KEY) === 'true';
}

function getAccessMode() {
    if (isOwnerAccessEnabled()) {
        return 'owner';
    }

    if (isAccessApproved()) {
        return 'approved';
    }

    return 'locked';
}

function hasUnlockedAccess() {
    return getAccessMode() !== 'locked';
}

function focusAccessGate() {
    const gate = document.getElementById('accessGate');
    if (gate) {
        gate.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showLockedAccessPrompt(message = '请先在每日练习底部输入访问码，或由 Frances 本人直接进入；解锁后即可使用全部模块。') {
    setActiveTab('daily');
    showAccessGateResult(message, 'error');
    focusAccessGate();
}

function bindAccessGateEvents() {
    const emailBtn = document.getElementById('requestEmailBtn');
    const whatsappBtn = document.getElementById('requestWhatsappBtn');
    const unlockBtn = document.getElementById('unlockAccessBtn');
    const ownerBtn = document.getElementById('ownerDirectAccessBtn');
    const clearBtn = document.getElementById('clearAccessBtn');
    const codeInput = document.getElementById('accessCodeInput');

    if (emailBtn) {
        emailBtn.addEventListener('click', () => sendAccessRequest('email'));
    }

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => sendAccessRequest('whatsapp'));
    }

    if (unlockBtn) {
        unlockBtn.addEventListener('click', unlockApprovedAccess);
    }

    if (ownerBtn) {
        ownerBtn.addEventListener('click', enableOwnerAccess);
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', clearApprovedAccess);
    }

    if (codeInput) {
        codeInput.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                unlockApprovedAccess();
            }
        });
    }
}

function buildAccessRequestData() {
    const name = document.getElementById('requestName').value.trim();
    const contact = document.getElementById('requestContact').value.trim();
    const reason = document.getElementById('requestReason').value.trim();

    if (!name || !contact || !reason) {
        showAccessGateResult('请先填写姓名、联系方式和使用原因，再发送申请。', 'error');
        return null;
    }

    return { name, contact, reason };
}

function buildAccessRequestMessage() {
    const formData = buildAccessRequestData();
    if (!formData) return null;

    const { name, contact, reason } = formData;
    const currentUrl = window.location.href;

    return `你好 Frances，我想申请使用你的西语练习网页。\n\n姓名/昵称：${name}\n联系方式：${contact}\n使用原因：${reason}\n当前页面：${currentUrl}\n\n如果你同意，请把访问码发给我。谢谢！`;
}

function sendAccessRequest(channel) {
    const message = buildAccessRequestMessage();
    if (!message) return;

    if (channel === 'email') {
        const subject = '申请使用西语练习网页';
        const emailUrl = `mailto:${ACCESS_CONFIG.approvalEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        showAccessGateResult('正在为你打开邮件草稿；如果浏览器没有自动唤起邮件应用，请刷新后重试，或直接把申请发送到 binbinliang1018@hotmail.com。', 'success');
        setTimeout(() => {
            window.location.href = emailUrl;
        }, 80);
        return;
    }

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    showAccessGateResult('正在尝试打开 WhatsApp 申请文案；如果没有自动跳转，请允许浏览器弹窗后再试一次。', 'success');
    setTimeout(() => {
        const popup = window.open(whatsappUrl, '_blank', 'noopener');
        if (!popup) {
            showAccessGateResult('浏览器拦截了 WhatsApp 弹窗，请允许弹窗后重试。', 'error');
        }
    }, 80);
}

function enableOwnerAccess() {
    localStorage.setItem(ACCESS_OWNER_STORAGE_KEY, 'true');
    refreshAccessGate();
    showAccessGateResult('已切换为 Frances 本机使用模式，全部模块现在都可以使用。', 'success');

    const appShell = document.getElementById('appShell');
    if (appShell) {
        appShell.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function unlockApprovedAccess() {
    const codeInput = document.getElementById('accessCodeInput');
    const code = codeInput.value.trim();

    if (!code) {
        showAccessGateResult('先输入 Frances 发给你的访问码。', 'error');
        return;
    }

    if (!ACCESS_CONFIG.approvedCodes.includes(code)) {
        showAccessGateResult('访问码不正确，请确认是不是复制错了，或者联系 Frances 重新获取。', 'error');
        return;
    }

    localStorage.removeItem(ACCESS_OWNER_STORAGE_KEY);
    localStorage.setItem(ACCESS_CODE_STORAGE_KEY, code);
    refreshAccessGate();
    showAccessGateResult('访问已开启，全部模块现在都可以使用。', 'success');

    const appShell = document.getElementById('appShell');
    if (appShell) {
        appShell.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function clearApprovedAccess() {
    localStorage.removeItem(ACCESS_CODE_STORAGE_KEY);
    localStorage.removeItem(ACCESS_OWNER_STORAGE_KEY);
    const codeInput = document.getElementById('accessCodeInput');
    if (codeInput) {
        codeInput.value = '';
    }
    refreshAccessGate();
    showAccessGateResult('本机访问权限已清除，当前设备需要重新申请、输入访问码，或由 Frances 本人再次直接进入。', 'success');
    focusAccessGate();
}

function refreshAccessGate() {
    const gate = document.getElementById('accessGate');
    const appShell = document.getElementById('appShell');
    const approvedBanner = document.getElementById('accessApprovedBanner');
    const approvedText = document.getElementById('accessApprovedText');
    const dailyMode = document.querySelector('#daily .daily-mode');
    const nonDailyTabs = document.querySelectorAll('.tab-btn:not([data-tab="daily"])');
    const accessMode = getAccessMode();
    const isUnlocked = accessMode !== 'locked';

    if (gate) {
        gate.style.display = isUnlocked ? 'none' : 'block';
    }

    if (appShell) {
        appShell.classList.toggle('app-shell--locked', !isUnlocked);
    }

    if (dailyMode) {
        dailyMode.inert = !isUnlocked;
        dailyMode.setAttribute('aria-hidden', String(!isUnlocked));
    }

    nonDailyTabs.forEach(btn => {
        btn.disabled = !isUnlocked;
        btn.setAttribute('aria-disabled', String(!isUnlocked));
    });

    if (approvedBanner) {
        approvedBanner.style.display = isUnlocked ? 'flex' : 'none';
    }

    if (approvedText) {
        approvedText.textContent = accessMode === 'owner'
            ? '✅ 当前设备已启用 Frances 本机直通'
            : '✅ 当前设备已通过 Frances 审批';
    }

    if (!isUnlocked) {
        setActiveTab('daily');
    }
}

function showAccessGateResult(message, type = 'success') {
    const result = document.getElementById('accessGateResult');
    if (!result) return;

    result.className = `result show ${type}`;
    result.textContent = message;
}

function initDate() {
    const dateEl = document.getElementById('currentDate');
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    dateEl.textContent = new Date().toLocaleDateString('zh-CN', options);
}

function applyActiveTab(tabId) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    tabContents.forEach(c => c.classList.toggle('active', c.id === tabId));

    if (tabId === 'progress') {
        updateProgressDisplay();
    } else if (tabId === 'review') {
        reviewState = JSON.parse(localStorage.getItem('reviewPractice')) || {
            wrongVerbs: [],
            currentIndex: 0,
            currentVerbs: [],
            isActive: false
        };
        renderWrongVerbsList();
    }
}

function setActiveTab(tabId) {
    if (!hasUnlockedAccess() && tabId !== 'daily') {
        applyActiveTab('daily');
        return false;
    }

    applyActiveTab(tabId);
    return true;
}

function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            const switched = setActiveTab(tabId);

            if (!switched) {
                showLockedAccessPrompt();
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

const COMPOUND_TENSES = [
    'presente_perfecto',
    'pluscuamperfecto',
    'futuro_perfecto',
    'condicional_perfecto',
    'subjuntivo_perfecto'
];

const DERIVED_FORM_TENSES = [...COMPOUND_TENSES];

function normalizeVerbKey(value) {
    return String(value || '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/se$/, '');
}

function isDerivedFormTense(tense) {
    return DERIVED_FORM_TENSES.includes(tense);
}

function isVerbIrregularInCurrentTense(verb, tense) {
    if (!verb || !tense || isDerivedFormTense(tense)) {
        return false;
    }

    const verbKey = normalizeVerbKey(typeof verb === 'string' ? verb : verb.inf);
    const irregularList = irregularVerbsByTense[tense] || [];

    return irregularList.some(item => normalizeVerbKey(item) === verbKey);
}

function getVerbTypeLabel(verb, tense) {
    if (!verb) {
        return '';
    }

    const infinitive = typeof verb === 'string' ? verb : verb.inf;
    const labels = [];

    if ((typeof verb === 'object' && verb.type === 'reflexive') || String(infinitive || '').endsWith('se')) {
        labels.push('【代词式】');
    }

    if (isVerbIrregularInCurrentTense(verb, tense)) {
        labels.push('【本时态不规则】');
    }

    return labels.join(' ');
}

function getIrregularListLabel(tense) {
    if (isDerivedFormTense(tense)) {
        return '该时态涉及的常见特殊过去分词（不计入“不规则动词”筛选）';
    }
    return '该时态不规则动词';
}

function startDailyPractice() {
    if (!hasUnlockedAccess()) {
        showLockedAccessPrompt('请先在每日练习底部完成申请并解锁；解锁后才能开始每日练习。');
        return;
    }

    const today = new Date().toDateString();
    
    // 分离不规则动词和规则动词
    const irregularVerbs = verbsData.filter(v => v.type === 'irregular');
    const regularVerbs = verbsData.filter(v => v.type !== 'irregular');
    
    // 随机选择4个不规则动词（至少4个）
    const shuffledIrregular = [...irregularVerbs].sort(() => 0.5 - Math.random());
    const selectedIrregular = shuffledIrregular.slice(0, 4);
    
    // 随机选择6个规则动词
    const shuffledRegular = [...regularVerbs].sort(() => 0.5 - Math.random());
    const selectedRegular = shuffledRegular.slice(0, 6);
    
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
    
    // 更新动词显示 - 按当前时态显示标签
    const verbType = getVerbTypeLabel(currentVerb, currentTense);
    document.getElementById('dailyVerbInfinitive').textContent = 
        `[${dailyState.currentIndex + 1}] ${currentVerb.inf}${verbType ? ` ${verbType}` : ''}`;
    document.getElementById('dailyVerbMeaning').textContent = currentVerb.meaning;
    document.getElementById('dailyVerbTense').textContent = tenses[currentTense].name;
    
    // 显示时态规则和不规则动词列表
    const tenseInfo = tenses[currentTense];
    const ruleBox = document.getElementById('dailyTenseRuleBox');
    
    let ruleHTML = `<div class="tense-rule"><strong>变位规则：</strong>${tenseInfo.rule || '无'}</div>`;
    
    // 添加该时态的不规则动词列表
    const irregularList = irregularVerbsByTense[currentTense];
    if (irregularList && irregularList.length > 0) {
        ruleHTML += `<div class="irregular-verbs"><strong>${getIrregularListLabel(currentTense)}：</strong>${irregularList.join(', ')}</div>`;
    }
    
    ruleBox.innerHTML = ruleHTML;
    
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
    if (!hasUnlockedAccess()) {
        showLockedAccessPrompt('请先在每日练习底部完成申请并解锁；解锁后才能检查答案。');
        return;
    }

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
    if (!hasUnlockedAccess()) {
        showLockedAccessPrompt('请先在每日练习底部完成申请并解锁；解锁后才能继续下一题。');
        return;
    }

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
    if (!hasUnlockedAccess()) {
        showLockedAccessPrompt('请先在每日练习底部完成申请并解锁；解锁后才能查看答案。');
        return;
    }

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

// ============ 动词变位训练营 ============
function initVerbPractice() {
    populateTrainerOptions();
    restoreTrainerSettings();
    bindTrainerEvents();
    updateTrainerModeNote();
    updateTrainerStats();
    renderTrainerMistakes();
    resetTrainerDisplay();
}

function getUniqueVerbs() {
    const uniqueMap = new Map();

    verbsData.forEach(verb => {
        if (!uniqueMap.has(verb.inf)) {
            uniqueMap.set(verb.inf, verb);
        }
    });

    return Array.from(uniqueMap.values());
}

function populateTrainerOptions() {
    const tenseSelect = document.getElementById('trainerTenseSelect');
    const verbSelect = document.getElementById('trainerVerbSelect');

    if (!tenseSelect || !verbSelect) return;

    tenseSelect.innerHTML = `
        <option value="random">随机时态</option>
        ${ALL_TENSES.map(tense => `<option value="${tense}">${tenses[tense].name}</option>`).join('')}
    `;

    const verbOptions = getUniqueVerbs()
        .sort((a, b) => a.inf.localeCompare(b.inf, 'es'))
        .map(verb => `<option value="${verb.inf}">${verb.inf} · ${verb.meaning}</option>`)
        .join('');

    verbSelect.innerHTML = `
        <option value="random">随机动词</option>
        ${verbOptions}
    `;
}

function restoreTrainerSettings() {
    const modeSelect = document.getElementById('trainerModeSelect');
    const tenseSelect = document.getElementById('trainerTenseSelect');
    const verbSelect = document.getElementById('trainerVerbSelect');
    const irregularOnly = document.getElementById('trainerIrregularOnly');

    if (!modeSelect || !tenseSelect || !verbSelect || !irregularOnly) return;

    modeSelect.value = trainerSettings.mode || 'mixed';
    tenseSelect.value = trainerSettings.tense || 'random';
    verbSelect.value = trainerSettings.verb || 'random';
    irregularOnly.checked = Boolean(trainerSettings.irregularOnly);
}

function saveTrainerSettings() {
    localStorage.setItem('verbTrainerSettings', JSON.stringify(trainerSettings));
}

function syncTrainerSettingsFromControls() {
    const modeSelect = document.getElementById('trainerModeSelect');
    const tenseSelect = document.getElementById('trainerTenseSelect');
    const verbSelect = document.getElementById('trainerVerbSelect');
    const irregularOnly = document.getElementById('trainerIrregularOnly');

    trainerSettings = {
        mode: modeSelect.value,
        tense: tenseSelect.value,
        verb: verbSelect.value,
        irregularOnly: irregularOnly.checked
    };

    saveTrainerSettings();
    updateTrainerModeNote();
    updateTrainerStats();
}

function bindTrainerEvents() {
    const modeSelect = document.getElementById('trainerModeSelect');
    const tenseSelect = document.getElementById('trainerTenseSelect');
    const verbSelect = document.getElementById('trainerVerbSelect');
    const irregularOnly = document.getElementById('trainerIrregularOnly');
    const startBtn = document.getElementById('trainerStartBtn');
    const checkBtn = document.getElementById('trainerCheckBtn');
    const showAnswerBtn = document.getElementById('trainerShowAnswerBtn');
    const nextBtn = document.getElementById('trainerNextBtn');
    const resetBtn = document.getElementById('trainerResetBtn');

    [modeSelect, tenseSelect, verbSelect, irregularOnly].forEach(control => {
        control.addEventListener('change', syncTrainerSettingsFromControls);
    });

    document.querySelectorAll('.trainer-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => applyTrainerPreset(btn.dataset.preset));
    });

    startBtn.addEventListener('click', startTrainerSession);
    checkBtn.addEventListener('click', checkTrainerAnswer);
    showAnswerBtn.addEventListener('click', showTrainerAnswer);
    nextBtn.addEventListener('click', loadTrainerQuestion);
    resetBtn.addEventListener('click', resetTrainerSession);
}

function applyTrainerPreset(preset) {
    const modeSelect = document.getElementById('trainerModeSelect');
    const tenseSelect = document.getElementById('trainerTenseSelect');
    const verbSelect = document.getElementById('trainerVerbSelect');
    const irregularOnly = document.getElementById('trainerIrregularOnly');

    if (preset === 'quick') {
        modeSelect.value = 'mixed';
        tenseSelect.value = 'random';
        verbSelect.value = 'random';
        irregularOnly.checked = false;
    } else if (preset === 'irregular') {
        modeSelect.value = 'mixed';
        tenseSelect.value = 'random';
        verbSelect.value = 'random';
        irregularOnly.checked = true;
    } else if (preset === 'focus') {
        modeSelect.value = 'focus';
        tenseSelect.value = 'random';
        irregularOnly.checked = false;
    }

    syncTrainerSettingsFromControls();
}

function setTrainerControlsDisabled(disabled) {
    ['trainerModeSelect', 'trainerTenseSelect', 'trainerVerbSelect', 'trainerIrregularOnly'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.disabled = disabled;
    });

    document.querySelectorAll('.trainer-preset-btn').forEach(btn => {
        btn.disabled = disabled;
    });
}

function updateTrainerModeNote() {
    const noteEl = document.getElementById('trainerModeNote');
    if (!noteEl) return;

    const notes = {
        mixed: '随机快练：随机动词 + 随机/指定时态，适合每天 3–5 分钟保持手感。',
        focus: '专项攻克：锁定一个动词连续刷，专门解决你总是卡壳的那个词。',
        sprint: '90秒冲刺：限时连续作答，用高压回忆把动词变位练成肌肉记忆。'
    };

    let message = notes[trainerSettings.mode] || notes.mixed;
    if (trainerSettings.irregularOnly) {
        message += ' 当前已启用“只练核心不规则动词（不含过去分词/gerundio类形式）”。';
    }
    if (trainerSettings.verb !== 'random') {
        message += ` 当前锁定动词：${trainerSettings.verb}。`;
    }
    if (trainerSettings.tense !== 'random') {
        message += ` 当前锁定时态：${tenses[trainerSettings.tense].name}。`;
    }

    noteEl.textContent = message;
}

function resetTrainerDisplay() {
    const grid = document.getElementById('trainerConjugationGrid');
    const result = document.getElementById('trainerResult');
    const ruleBox = document.getElementById('trainerTenseRuleBox');
    const exampleBox = document.getElementById('trainerExampleBox');
    const checkBtn = document.getElementById('trainerCheckBtn');
    const showAnswerBtn = document.getElementById('trainerShowAnswerBtn');
    const nextBtn = document.getElementById('trainerNextBtn');
    const startBtn = document.getElementById('trainerStartBtn');

    document.getElementById('trainerVerbInfinitive').textContent = '准备开始训练';
    document.getElementById('trainerVerbMeaning').textContent = '选择模式后点击开始';
    document.getElementById('trainerVerbTense').textContent = trainerSettings.tense === 'random' ? '随机时态' : tenses[trainerSettings.tense].name;

    grid.innerHTML = '';
    result.className = 'result';
    result.innerHTML = '';
    ruleBox.innerHTML = '<div class="tense-rule"><strong>训练提示：</strong>选择模式、时态与动词后开始训练；答完会自动统计本轮正确率与错题。</div>';
    exampleBox.innerHTML = `
        <h3>💬 语境例句</h3>
        <p class="trainer-example-es">开始训练后，这里会给你一个对应时态的小例句。</p>
        <p class="trainer-example-zh">例句会帮你把“理解 + 练习”放在一起。</p>
    `;

    checkBtn.disabled = true;
    showAnswerBtn.disabled = true;
    nextBtn.style.display = 'none';
    startBtn.textContent = '开始训练';
}

function resetTrainerSession() {
    clearInterval(trainerTimer);
    trainerTimer = null;

    trainerState = {
        isActive: false,
        totalQuestions: 0,
        correctForms: 0,
        totalForms: 0,
        streak: 0,
        bestStreak: 0,
        wrongAnswers: [],
        timeLeft: TRAINER_SPRINT_SECONDS,
        currentQuestion: null,
        focusVerb: null
    };

    setTrainerControlsDisabled(false);
    updateTrainerStats();
    renderTrainerMistakes();
    resetTrainerDisplay();
}

function startTrainerSession() {
    const verbPool = getTrainerVerbPool();
    const result = document.getElementById('trainerResult');

    if (verbPool.length === 0) {
        result.className = 'result show error';
        result.innerHTML = trainerSettings.irregularOnly
            ? '当前筛选条件下没有符合该时态的核心不规则动词，请取消“只练核心不规则动词”或更换时态/动词。'
            : '当前筛选条件下没有可练习动词，请更换时态或指定动词。';
        return;
    }

    resetTrainerSession();
    trainerState.isActive = true;

    if (trainerSettings.mode === 'focus') {
        trainerState.focusVerb = trainerSettings.verb !== 'random'
            ? findTrainerVerb(trainerSettings.verb)
            : pickRandomItem(verbPool);
    }

    setTrainerControlsDisabled(true);
    document.getElementById('trainerStartBtn').textContent = '重新开始';

    if (trainerSettings.mode === 'sprint') {
        startTrainerTimer();
    }

    loadTrainerQuestion();
}

function startTrainerTimer() {
    clearInterval(trainerTimer);
    trainerState.timeLeft = TRAINER_SPRINT_SECONDS;
    updateTrainerStats();

    trainerTimer = setInterval(() => {
        trainerState.timeLeft -= 1;

        if (trainerState.timeLeft <= 0) {
            trainerState.timeLeft = 0;
            updateTrainerStats();
            endTrainerSession(true);
            return;
        }

        updateTrainerStats();
    }, 1000);
}

function endTrainerSession(isTimeout = false) {
    clearInterval(trainerTimer);
    trainerTimer = null;
    trainerState.isActive = false;

    setTrainerControlsDisabled(false);
    disableTrainerInputs();

    document.getElementById('trainerCheckBtn').disabled = true;
    document.getElementById('trainerShowAnswerBtn').disabled = true;
    document.getElementById('trainerNextBtn').style.display = 'none';

    const accuracy = trainerState.totalForms > 0
        ? Math.round((trainerState.correctForms / trainerState.totalForms) * 100)
        : 0;

    const result = document.getElementById('trainerResult');
    result.className = 'result show success';
    result.innerHTML = `
        <strong>${isTimeout ? '⏰ 冲刺结束！' : '本轮训练结束！'}</strong><br>
        共完成 ${trainerState.totalQuestions} 题，正确率 ${accuracy}% ，最高连对 ${trainerState.bestStreak} 题。
    `;
}

function getTrainerAvailableTenses(verb, preferredTense = trainerSettings.tense) {
    const candidateTenses = preferredTense !== 'random' ? [preferredTense] : [...ALL_TENSES];

    if (!trainerSettings.irregularOnly) {
        return candidateTenses;
    }

    return candidateTenses.filter(tense => isVerbIrregularInCurrentTense(verb, tense));
}

function getTrainerVerbPool(preferredTense = trainerSettings.tense) {
    let pool = getUniqueVerbs();

    if (trainerSettings.verb !== 'random') {
        pool = pool.filter(verb => verb.inf === trainerSettings.verb);
    }

    if (trainerSettings.irregularOnly) {
        pool = pool.filter(verb => getTrainerAvailableTenses(verb, preferredTense).length > 0);
    }

    return pool;
}

function findTrainerVerb(infinitive) {
    return getUniqueVerbs().find(verb => verb.inf === infinitive) || null;
}

function pickRandomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function buildTrainerQuestion() {
    const verbPool = getTrainerVerbPool();
    let verb = null;

    if (trainerSettings.mode === 'focus') {
        const preferredVerb = trainerState.focusVerb || (trainerSettings.verb !== 'random' ? findTrainerVerb(trainerSettings.verb) : null);
        if (preferredVerb && getTrainerAvailableTenses(preferredVerb).length > 0) {
            verb = preferredVerb;
        } else {
            verb = pickRandomItem(verbPool);
            if (verb) {
                trainerState.focusVerb = verb;
            }
        }
    } else if (trainerSettings.verb !== 'random') {
        const preferredVerb = findTrainerVerb(trainerSettings.verb);
        if (preferredVerb && getTrainerAvailableTenses(preferredVerb).length > 0) {
            verb = preferredVerb;
        }
    }

    if (!verb) {
        verb = pickRandomItem(verbPool);
    }

    if (!verb) {
        return null;
    }

    const availableTenses = getTrainerAvailableTenses(verb);
    if (availableTenses.length === 0) {
        return null;
    }

    const tense = pickRandomItem(availableTenses);
    return { verb, tense };
}

function loadTrainerQuestion() {
    if (!trainerState.isActive) return;

    const question = buildTrainerQuestion();
    if (!question) {
        const result = document.getElementById('trainerResult');
        result.className = 'result show error';
        result.innerHTML = '当前筛选条件下没有可生成的题目，请调整时态或关闭“只练核心不规则动词”。';
        return;
    }

    trainerState.currentQuestion = question;
    renderTrainerQuestion(question);

    const result = document.getElementById('trainerResult');
    result.className = 'result';
    result.innerHTML = '';

    document.getElementById('trainerCheckBtn').disabled = false;
    document.getElementById('trainerShowAnswerBtn').disabled = false;
    document.getElementById('trainerNextBtn').style.display = 'none';

    const firstInput = document.querySelector('#trainerConjugationGrid input');
    if (firstInput) firstInput.focus();
}

function renderTrainerQuestion(question) {
    const { verb, tense } = question;
    const verbType = getVerbTypeLabel(verb, tense);

    document.getElementById('trainerVerbInfinitive').textContent = `${verb.inf}${verbType ? ` ${verbType}` : ''}`;
    document.getElementById('trainerVerbMeaning').textContent = verb.meaning;
    document.getElementById('trainerVerbTense').textContent = tenses[tense].name;

    renderTrainerRuleBox(tense);
    renderTrainerExample(question);

    const grid = document.getElementById('trainerConjugationGrid');
    grid.innerHTML = '';

    tenses[tense].pronouns.forEach(pronoun => {
        const item = document.createElement('div');
        item.className = 'conjugation-item';
        item.innerHTML = `
            <label>${pronoun}</label>
            <input type="text" data-pronoun="${pronoun}" placeholder="变位形式..." autocomplete="off">
        `;
        grid.appendChild(item);
    });
}

function renderTrainerRuleBox(tense) {
    const tenseInfo = tenses[tense];
    const irregularList = irregularVerbsByTense[tense] || [];
    const modeLabel = getTrainerModeLabel(trainerSettings.mode);
    let html = `<div class="tense-rule"><strong>变位规则：</strong>${tenseInfo.rule || '无'}</div>`;
    html += `<div class="tense-rule"><strong>当前模式：</strong>${modeLabel}</div>`;

    if (irregularList.length > 0) {
        html += `<div class="irregular-verbs"><strong>${getIrregularListLabel(tense)}：</strong>${irregularList.join(', ')}</div>`;
    }

    document.getElementById('trainerTenseRuleBox').innerHTML = html;
}

function getTrainerModeLabel(mode) {
    const labels = {
        mixed: '随机快练',
        focus: '专项攻克',
        sprint: '90秒冲刺'
    };

    return labels[mode] || labels.mixed;
}

function renderTrainerExample(question) {
    const example = buildTrainerExample(question);
    document.getElementById('trainerExampleBox').innerHTML = `
        <h3>💬 语境例句</h3>
        <p class="trainer-example-es">${example.es}</p>
        <p class="trainer-example-zh">${example.zh}</p>
    `;
}

function buildTrainerExample({ verb, tense }) {
    const firstPronoun = tenses[tense].pronouns[0];
    const yoForm = conjugateVerb(verb.inf, tense, firstPronoun);
    const imperativeForm = conjugateVerb(verb.inf, 'imperativo', 'tú');

    const examples = {
        presente: {
            es: `Hoy <strong>${yoForm}</strong> con más confianza que antes.`,
            zh: `现在时常放在“今天/平时”的语境里：今天我更自然地“${verb.meaning}”。`
        },
        preterito: {
            es: `Ayer <strong>${yoForm}</strong> una vez y ya quedó hecho.`,
            zh: '简单过去时强调动作已经发生并结束。'
        },
        imperfecto: {
            es: `Antes <strong>${yoForm}</strong> con frecuencia cuando tenía más tiempo.`,
            zh: '过去未完成时适合表达过去经常做、正在进行或背景描述。'
        },
        futuro: {
            es: `Mañana <strong>${yoForm}</strong> con más calma.`,
            zh: '将来时适合表达计划、打算或预测。'
        },
        condicional: {
            es: `En tu lugar, <strong>${yoForm}</strong> de otra manera.`,
            zh: '条件式常见于“如果……我会……”的表达。'
        },
        subjuntivo: {
            es: `Es importante que <strong>${yoForm}</strong> mejor cada día.`,
            zh: '虚拟式现在时常见于希望、要求、建议、必要性等句型。'
        },
        subjuntivo_imperfecto: {
            es: `Si fuera necesario, quería que <strong>${yoForm}</strong> con más cuidado.`,
            zh: '虚拟式过去未完成时多用于假设、条件或从句。'
        },
        presente_perfecto: {
            es: `Esta semana <strong>${yoForm}</strong> varias veces.`,
            zh: '现在完成时连接过去动作与现在结果。'
        },
        pluscuamperfecto: {
            es: `Cuando llegaste, <strong>${yoForm}</strong> antes.`,
            zh: '过去完成时表示“在过去另一动作之前已经完成”。'
        },
        futuro_perfecto: {
            es: `Para mañana, <strong>${yoForm}</strong> todo lo necesario.`,
            zh: '将来完成时表示“到某个未来时间之前已经完成”。'
        },
        condicional_perfecto: {
            es: `Con más tiempo, <strong>${yoForm}</strong> mejor.`,
            zh: '条件完成时表示“本来会已经……”。'
        },
        subjuntivo_perfecto: {
            es: `Me alegra que <strong>${yoForm}</strong> tanto esta semana.`,
            zh: '虚拟式完成时常用于对已完成动作的情绪和评价。'
        },
        imperativo: {
            es: `<strong>${imperativeForm}</strong> ahora mismo y repítelo en voz alta.`,
            zh: '命令式适合“现在就去做”的即时指令。'
        }
    };

    return examples[tense] || {
        es: `Hoy <strong>${yoForm}</strong> con más soltura.`,
        zh: `把这个时态放进句子里，会更容易形成长期记忆。`
    };
}

function normalizeTrainerAnswer(text) {
    return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

function stripSpanishAccents(text) {
    return text
        .replace(/[áàâä]/g, 'a')
        .replace(/[éèêë]/g, 'e')
        .replace(/[íìîï]/g, 'i')
        .replace(/[óòôö]/g, 'o')
        .replace(/[úùûü]/g, 'u');
}

function compareTrainerAnswer(userAnswer, correctAnswer) {
    const normalizedUser = normalizeTrainerAnswer(userAnswer);
    const normalizedCorrect = normalizeTrainerAnswer(correctAnswer);

    if (normalizedUser === normalizedCorrect) {
        return { isCorrect: true, accentOnly: false };
    }

    if (stripSpanishAccents(normalizedUser) === stripSpanishAccents(normalizedCorrect)) {
        return { isCorrect: true, accentOnly: true };
    }

    return { isCorrect: false, accentOnly: false };
}

function checkTrainerAnswer() {
    if (!trainerState.isActive || !trainerState.currentQuestion) return;

    const inputs = document.querySelectorAll('#trainerConjugationGrid input');
    let correct = 0;
    let accentOnlyCount = 0;
    const total = inputs.length;

    inputs.forEach(input => {
        const pronoun = input.dataset.pronoun;
        const userAnswer = input.value.trim();
        const correctAnswer = conjugateVerb(trainerState.currentQuestion.verb.inf, trainerState.currentQuestion.tense, pronoun);
        const comparison = compareTrainerAnswer(userAnswer, correctAnswer);

        input.disabled = true;

        if (comparison.isCorrect) {
            correct++;
            if (comparison.accentOnly) {
                accentOnlyCount++;
                input.classList.add('almost');
            } else {
                input.classList.add('correct');
            }
        } else {
            input.classList.add('incorrect');
            input.value = `${userAnswer || '（空）'} → ${correctAnswer}`;
        }
    });

    finishTrainerQuestion(correct, total, accentOnlyCount, false);
}

function showTrainerAnswer() {
    if (!trainerState.isActive || !trainerState.currentQuestion) return;

    const inputs = document.querySelectorAll('#trainerConjugationGrid input');
    const total = inputs.length;

    inputs.forEach(input => {
        const pronoun = input.dataset.pronoun;
        input.value = conjugateVerb(trainerState.currentQuestion.verb.inf, trainerState.currentQuestion.tense, pronoun);
        input.disabled = true;
        input.classList.add('incorrect');
    });

    finishTrainerQuestion(0, total, 0, true);
}

function finishTrainerQuestion(correct, total, accentOnlyCount = 0, usedAnswerKey = false) {
    const { verb, tense } = trainerState.currentQuestion;
    const allCorrect = correct === total;

    trainerState.totalQuestions++;
    trainerState.correctForms += correct;
    trainerState.totalForms += total;
    trainerState.streak = allCorrect ? trainerState.streak + 1 : 0;
    trainerState.bestStreak = Math.max(trainerState.bestStreak, trainerState.streak);

    recordPracticeProgress(verb.inf, tense, correct, total);
    updateTrainerStats();

    const result = document.getElementById('trainerResult');
    document.getElementById('trainerCheckBtn').disabled = true;
    document.getElementById('trainerShowAnswerBtn').disabled = true;

    if (allCorrect) {
        result.className = 'result show success';
        result.innerHTML = `
            <strong>🎉 全对！</strong> ${correct}/${total} 正确
            ${accentOnlyCount > 0 ? `<br>其中 ${accentOnlyCount} 个答案只差重音符号，已经算对，但下次尽量写完整。` : ''}
        `;
    } else {
        result.className = 'result show error';
        result.innerHTML = usedAnswerKey
            ? '<strong>💡 已显示答案</strong><br>这题已记入本轮薄弱点，也同步加入错题重练。'
            : `<strong>❌ 继续加强</strong> ${correct}/${total} 正确<br>这题已记入本轮薄弱点，也同步加入错题重练。`;

        recordTrainerMistake(verb, tense, correct, total, usedAnswerKey);
        addWrongVerbToReview(verb.inf, tense);
    }

    if (trainerSettings.mode === 'sprint' && trainerState.timeLeft <= 0) {
        endTrainerSession(true);
        return;
    }

    document.getElementById('trainerNextBtn').style.display = 'inline-block';
}

function recordTrainerMistake(verb, tense, correct, total, usedAnswerKey) {
    trainerState.wrongAnswers.unshift({
        verb: verb.inf,
        tense,
        score: `${correct}/${total}`,
        usedAnswerKey
    });

    trainerState.wrongAnswers = trainerState.wrongAnswers.slice(0, 8);
    renderTrainerMistakes();
}

function renderTrainerMistakes() {
    const container = document.getElementById('trainerMistakesList');
    if (!container) return;

    if (trainerState.wrongAnswers.length === 0) {
        container.innerHTML = '<p class="empty">还没有错题记录，开始一轮看看你的薄弱环节。</p>';
        return;
    }

    container.innerHTML = trainerState.wrongAnswers.map(item => `
        <span class="trainer-mistake-item">
            <strong>${item.verb}</strong>
            <span>${tenses[item.tense].name}</span>
            <span>${item.usedAnswerKey ? '已看答案' : item.score}</span>
        </span>
    `).join('');
}

function updateTrainerStats() {
    const questionEl = document.getElementById('trainerQuestionsStat');
    const accuracyEl = document.getElementById('trainerAccuracyStat');
    const streakEl = document.getElementById('trainerStreakStat');
    const timerEl = document.getElementById('trainerTimerStat');

    if (!questionEl || !accuracyEl || !streakEl || !timerEl) return;

    const accuracy = trainerState.totalForms > 0
        ? Math.round((trainerState.correctForms / trainerState.totalForms) * 100)
        : 0;

    questionEl.textContent = trainerState.totalQuestions;
    accuracyEl.textContent = `${accuracy}%`;
    streakEl.textContent = trainerState.streak;

    if (trainerSettings.mode === 'sprint') {
        timerEl.textContent = trainerState.isActive ? formatTrainerTime(trainerState.timeLeft) : '90秒';
    } else if (trainerSettings.mode === 'focus') {
        timerEl.textContent = '专项';
    } else {
        timerEl.textContent = '不限时';
    }
}

function formatTrainerTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(1, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
}

function disableTrainerInputs() {
    document.querySelectorAll('#trainerConjugationGrid input').forEach(input => {
        input.disabled = true;
    });
}

function recordPracticeProgress(verbInf, tense, correct, total) {
    progress.totalAttempts += total;
    progress.correctCount += correct;
    progress.totalVerbs++;

    if (!progress.practicedVerbs[verbInf]) {
        progress.practicedVerbs[verbInf] = { count: 0, correct: 0, forms: 0 };
    }

    progress.practicedVerbs[verbInf].count++;
    progress.practicedVerbs[verbInf].correct += correct;
    progress.practicedVerbs[verbInf].forms = (progress.practicedVerbs[verbInf].forms || 0) + total;

    if (!progress.tenseStats[tense]) {
        progress.tenseStats[tense] = { attempts: 0, correct: 0 };
    }

    progress.tenseStats[tense].attempts += total;
    progress.tenseStats[tense].correct += correct;

    saveProgress();
}

function addWrongVerbToReview(verb, tense) {
    const today = new Date().toDateString();
    const existingIndex = reviewState.wrongVerbs.findIndex(item => item.verb === verb && item.tense === tense);

    if (existingIndex >= 0) {
        reviewState.wrongVerbs[existingIndex].attempts++;
        reviewState.wrongVerbs[existingIndex].lastWrongDate = today;
    } else {
        reviewState.wrongVerbs.push({
            verb,
            tense,
            attempts: 1,
            lastWrongDate: today
        });
    }

    saveReviewState();
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
        const irregularParticiples = {
            abrir: 'abierto',
            cubrir: 'cubierto',
            decir: 'dicho',
            describir: 'descrito',
            escribir: 'escrito',
            hacer: 'hecho',
            morir: 'muerto',
            poner: 'puesto',
            resolver: 'resuelto',
            romper: 'roto',
            ver: 'visto',
            volver: 'vuelto'
        };

        const normalizedVerb = normalizeVerbKey(verb);
        if (irregularParticiples[normalizedVerb]) {
            return irregularParticiples[normalizedVerb];
        }

        const verbStem = verb.slice(0, -2);
        const verbEnding = verb.slice(-2);
        if (verbEnding === 'ar') return verbStem + 'ado';
        return verbStem + 'ido';
    }
    
    // 处理复合时态
    if (COMPOUND_TENSES.includes(tense)) {
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
        const subjEndings = ['ra', 'ras', 'ra', 'ramos', 'rais', 'ran'];
        const ellosPreterito = conjugateVerb(baseVerb, 'preterito', 'ellos/ustedes');
        const subjStem = typeof ellosPreterito === 'string' && ellosPreterito.endsWith('ron')
            ? ellosPreterito.slice(0, -3)
            : stem;
        const accentMap = {
            a: 'á',
            e: 'é',
            i: 'í',
            o: 'ó',
            u: 'ú'
        };
        const accentedStem = subjStem.replace(/[aeiou](?=[^aeiou]*$)/, vowel => accentMap[vowel] || vowel);
        const baseForForm = pronoun === 'nosotros' ? accentedStem : subjStem;
        const conjugated = baseForForm + subjEndings[pronounIndex];
        return isReflexive ? `${reflexivePronouns[pronoun]} ${conjugated}` : conjugated;
    }
    
    // ============ 完整不规则动词表（含命令式）============
    const irregulars = {
        'ser': {
            'presente': ['soy', 'eres', 'es', 'somos', 'sois', 'son'],
            'preterito': ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
            'imperfecto': ['era', 'eras', 'era', 'éramos', 'erais', 'eran'],
            'futuro': ['seré', 'serás', 'será', 'seremos', 'seréis', 'serán'],
            'condicional': ['sería', 'serías', 'sería', 'seríamos', 'seríais', 'serían'],
            'subjuntivo': ['sea', 'seas', 'sea', 'seamos', 'seáis', 'sean'],
            'imperativo': ['sé', 'sea', 'seamos', 'sed', 'sean']
        },
        'estar': {
            'presente': ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'],
            'preterito': ['estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron'],
            'imperfecto': ['estaba', 'estabas', 'estaba', 'estábamos', 'estabais', 'estaban'],
            'futuro': ['estaré', 'estarás', 'estará', 'estaremos', 'estaréis', 'estarán'],
            'condicional': ['estaría', 'estarías', 'estaría', 'estaríamos', 'estaríais', 'estarían'],
            'subjuntivo': ['esté', 'estés', 'esté', 'estemos', 'estéis', 'estén'],
            'imperativo': ['está', 'esté', 'estemos', 'estad', 'estén']
        },
        'tener': {
            'presente': ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'],
            'preterito': ['tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvisteis', 'tuvieron'],
            'imperfecto': ['tenía', 'tenías', 'tenía', 'teníamos', 'teníais', 'tenían'],
            'futuro': ['tendré', 'tendrás', 'tendrá', 'tendremos', 'tendréis', 'tendrán'],
            'condicional': ['tendría', 'tendrías', 'tendría', 'tendríamos', 'tendríais', 'tendrían'],
            'subjuntivo': ['tenga', 'tengas', 'tenga', 'tengamos', 'tengáis', 'tengan'],
            'imperativo': ['ten', 'tenga', 'tengamos', 'tened', 'tengan']
        },
        'hacer': {
            'presente': ['hago', 'haces', 'hace', 'hacemos', 'hacéis', 'hacen'],
            'preterito': ['hice', 'hiciste', 'hizo', 'hicimos', 'hicisteis', 'hicieron'],
            'imperfecto': ['hacía', 'hacías', 'hacía', 'hacíamos', 'hacíais', 'hacían'],
            'futuro': ['haré', 'harás', 'hará', 'haremos', 'haréis', 'harán'],
            'condicional': ['haría', 'harías', 'haría', 'haríamos', 'haríais', 'harían'],
            'subjuntivo': ['haga', 'hagas', 'haga', 'hagamos', 'hagáis', 'hagan'],
            'imperativo': ['haz', 'haga', 'hagamos', 'haced', 'hagan']
        },
        'decir': {
            'presente': ['digo', 'dices', 'dice', 'decimos', 'decís', 'dicen'],
            'preterito': ['dije', 'dijiste', 'dijo', 'dijimos', 'dijisteis', 'dijeron'],
            'imperfecto': ['decía', 'decías', 'decía', 'decíamos', 'decíais', 'decían'],
            'futuro': ['diré', 'dirás', 'dirá', 'diremos', 'diréis', 'dirán'],
            'condicional': ['diría', 'dirías', 'diría', 'diríamos', 'diríais', 'dirían'],
            'subjuntivo': ['diga', 'digas', 'diga', 'digamos', 'digáis', 'digan'],
            'imperativo': ['di', 'diga', 'digamos', 'decid', 'digan']
        },
        'ir': {
            'presente': ['voy', 'vas', 'va', 'vamos', 'vais', 'van'],
            'preterito': ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
            'imperfecto': ['iba', 'ibas', 'iba', 'íbamos', 'ibais', 'iban'],
            'futuro': ['iré', 'irás', 'irá', 'iremos', 'iréis', 'irán'],
            'condicional': ['iría', 'irías', 'iría', 'iríamos', 'iríais', 'irían'],
            'subjuntivo': ['vaya', 'vayas', 'vaya', 'vayamos', 'vayáis', 'vayan'],
            'imperativo': ['ve', 'vaya', 'vayamos', 'id', 'vayan']
        },
        'ver': {
            'presente': ['veo', 'ves', 've', 'vemos', 'veis', 'ven'],
            'preterito': ['vi', 'viste', 'vio', 'vimos', 'visteis', 'vieron'],
            'imperfecto': ['veía', 'veías', 'veía', 'veíamos', 'veíais', 'veían'],
            'futuro': ['veré', 'verás', 'verá', 'veremos', 'veréis', 'verán'],
            'condicional': ['vería', 'verías', 'vería', 'veríamos', 'veríais', 'verían'],
            'subjuntivo': ['vea', 'veas', 'vea', 'veamos', 'veáis', 'vean'],
            'imperativo': ['ve', 'vea', 'veamos', 'ved', 'vean']
        },
        'dar': {
            'presente': ['doy', 'das', 'da', 'damos', 'dais', 'dan'],
            'preterito': ['di', 'diste', 'dio', 'dimos', 'disteis', 'dieron'],
            'imperfecto': ['daba', 'dabas', 'daba', 'dábamos', 'dabais', 'daban'],
            'futuro': ['daré', 'darás', 'dará', 'daremos', 'daréis', 'darán'],
            'condicional': ['daría', 'darías', 'daría', 'daríamos', 'daríais', 'darían'],
            'subjuntivo': ['dé', 'des', 'dé', 'demos', 'deis', 'den'],
            'imperativo': ['da', 'dé', 'demos', 'dad', 'den']
        },
        'saber': {
            'presente': ['sé', 'sabes', 'sabe', 'sabemos', 'sabéis', 'saben'],
            'preterito': ['supe', 'supiste', 'supo', 'supimos', 'supisteis', 'supieron'],
            'imperfecto': ['sabía', 'sabías', 'sabía', 'sabíamos', 'sabíais', 'sabían'],
            'futuro': ['sabré', 'sabrás', 'sabrá', 'sabremos', 'sabréis', 'sabrán'],
            'condicional': ['sabría', 'sabrías', 'sabría', 'sabríamos', 'sabríais', 'sabrían'],
            'subjuntivo': ['sepa', 'sepas', 'sepa', 'sepamos', 'sepáis', 'sepan'],
            'imperativo': ['sabe', 'sepa', 'sepamos', 'sabed', 'sepan']
        },
        'poder': {
            'presente': ['puedo', 'puedes', 'puede', 'podemos', 'podéis', 'pueden'],
            'preterito': ['pude', 'pudiste', 'pudo', 'pudimos', 'pudisteis', 'pudieron'],
            'imperfecto': ['podía', 'podías', 'podía', 'podíamos', 'podíais', 'podían'],
            'futuro': ['podré', 'podrás', 'podrá', 'podremos', 'podréis', 'podrán'],
            'condicional': ['podría', 'podrías', 'podría', 'podríamos', 'podríais', 'podrían'],
            'subjuntivo': ['pueda', 'puedas', 'pueda', 'podamos', 'podáis', 'puedan'],
            'imperativo': ['puede', 'pueda', 'podamos', 'poded', 'puedan']
        },
        'querer': {
            'presente': ['quiero', 'quieres', 'quiere', 'queremos', 'queréis', 'quieren'],
            'preterito': ['quise', 'quisiste', 'quiso', 'quisimos', 'quisisteis', 'quisieron'],
            'imperfecto': ['quería', 'querías', 'quería', 'queríamos', 'queríais', 'querían'],
            'futuro': ['querré', 'querrás', 'querrá', 'querremos', 'querréis', 'querrán'],
            'condicional': ['querría', 'querrías', 'querría', 'querríamos', 'querríais', 'querrían'],
            'subjuntivo': ['quiera', 'quieras', 'quiera', 'queramos', 'queráis', 'quieran'],
            'imperativo': ['quiere', 'quiera', 'queramos', 'quered', 'quieran']
        },
        'venir': {
            'presente': ['vengo', 'vienes', 'viene', 'venimos', 'venís', 'vienen'],
            'preterito': ['vine', 'viniste', 'vino', 'vinimos', 'vinisteis', 'vinieron'],
            'imperfecto': ['venía', 'venías', 'venía', 'veníamos', 'veníais', 'venían'],
            'futuro': ['vendré', 'vendrás', 'vendrá', 'vendremos', 'vendréis', 'vendrán'],
            'condicional': ['vendría', 'vendrías', 'vendría', 'vendríamos', 'vendríais', 'vendrían'],
            'subjuntivo': ['venga', 'vengas', 'venga', 'vengamos', 'vengáis', 'vengan'],
            'imperativo': ['ven', 'venga', 'vengamos', 'venid', 'vengan']
        },
        'poner': {
            'presente': ['pongo', 'pones', 'pone', 'ponemos', 'ponéis', 'ponen'],
            'preterito': ['puse', 'pusiste', 'puso', 'pusimos', 'pusisteis', 'pusieron'],
            'imperfecto': ['ponía', 'ponías', 'ponía', 'poníamos', 'poníais', 'ponían'],
            'futuro': ['pondré', 'pondrás', 'pondrá', 'pondremos', 'pondréis', 'pondrán'],
            'condicional': ['pondría', 'pondrías', 'pondría', 'pondríamos', 'pondríais', 'pondrían'],
            'subjuntivo': ['ponga', 'pongas', 'ponga', 'pongamos', 'pongáis', 'pongan'],
            'imperativo': ['pon', 'ponga', 'pongamos', 'poned', 'pongan']
        },
        'salir': {
            'presente': ['salgo', 'sales', 'sale', 'salimos', 'salís', 'salen'],
            'preterito': ['salí', 'saliste', 'salió', 'salimos', 'salisteis', 'salieron'],
            'imperfecto': ['salía', 'salías', 'salía', 'salíamos', 'salíais', 'salían'],
            'futuro': ['saldré', 'saldrás', 'saldrá', 'saldremos', 'saldréis', 'saldrán'],
            'condicional': ['saldría', 'saldrías', 'saldría', 'saldríamos', 'saldríais', 'saldrían'],
            'subjuntivo': ['salga', 'salgas', 'salga', 'salgamos', 'salgáis', 'salgan'],
            'imperativo': ['sal', 'salga', 'salgamos', 'salid', 'salgan']
        },
        'traer': {
            'presente': ['traigo', 'traes', 'trae', 'traemos', 'traéis', 'traen'],
            'preterito': ['traje', 'trajiste', 'trajo', 'trajimos', 'trajisteis', 'trajeron'],
            'imperfecto': ['traía', 'traías', 'traía', 'traíamos', 'traíais', 'traían'],
            'futuro': ['traeré', 'traerás', 'traerá', 'traeremos', 'traeréis', 'traerán'],
            'condicional': ['traería', 'traerías', 'traería', 'traeríamos', 'traeríais', 'traerían'],
            'subjuntivo': ['traiga', 'traigas', 'traiga', 'traigamos', 'traigáis', 'traigan'],
            'imperativo': ['trae', 'traiga', 'traigamos', 'traed', 'traigan']
        },
        'oír': {
            'presente': ['oigo', 'oyes', 'oye', 'oímos', 'oís', 'oyen'],
            'preterito': ['oí', 'oíste', 'oyó', 'oímos', 'oísteis', 'oyeron'],
            'imperfecto': ['oía', 'oías', 'oía', 'oíamos', 'oíais', 'oían'],
            'futuro': ['oiré', 'oirás', 'oirá', 'oiremos', 'oiréis', 'oirán'],
            'condicional': ['oiría', 'oirías', 'oiría', 'oiríamos', 'oiríais', 'oirían'],
            'subjuntivo': ['oiga', 'oigas', 'oiga', 'oigamos', 'oigáis', 'oigan'],
            'imperativo': ['oye', 'oiga', 'oigamos', 'oíd', 'oigan']
        },
        'valer': {
            'presente': ['valgo', 'vales', 'vale', 'valemos', 'valéis', 'valen'],
            'preterito': ['valí', 'valiste', 'valió', 'valimos', 'valisteis', 'valieron'],
            'imperfecto': ['valía', 'valías', 'valía', 'valíamos', 'valíais', 'valían'],
            'futuro': ['valdré', 'valdrás', 'valdrá', 'valdremos', 'valdréis', 'valdrán'],
            'condicional': ['valdría', 'valdrías', 'valdría', 'valdríamos', 'valdríais', 'valdrían'],
            'subjuntivo': ['valga', 'valgas', 'valga', 'valgamos', 'valgáis', 'valgan'],
            'imperativo': ['val', 'valga', 'valgamos', 'valed', 'valgan']
        },
        'soler': {
            // 缺陷动词，仅现在时和过去未完成时常用
            'presente': ['suelo', 'sueles', 'suele', 'solemos', 'soléis', 'suelen'],
            'imperfecto': ['solía', 'solías', 'solía', 'solíamos', 'solíais', 'solían'],
            'subjuntivo': ['suela', 'suelas', 'suela', 'solamos', 'soláis', 'suelan']
        },
        'jugar': {
            'presente': ['juego', 'juegas', 'juega', 'jugamos', 'jugáis', 'juegan'],
            'preterito': ['jugué', 'jugaste', 'jugó', 'jugamos', 'jugasteis', 'jugaron'],
            'imperfecto': ['jugaba', 'jugabas', 'jugaba', 'jugábamos', 'jugabais', 'jugaban'],
            'futuro': ['jugaré', 'jugarás', 'jugará', 'jugaremos', 'jugaréis', 'jugarán'],
            'condicional': ['jugaría', 'jugarías', 'jugaría', 'jugaríamos', 'jugaríais', 'jugarían'],
            'subjuntivo': ['juegue', 'juegues', 'juegue', 'juguemos', 'juguéis', 'jueguen'],
            'imperativo': ['juega', 'juegue', 'juguemos', 'jugad', 'jueguen']
        },
        'dormir': {
            'presente': ['duermo', 'duermes', 'duerme', 'dormimos', 'dormís', 'duermen'],
            'preterito': ['dormí', 'dormiste', 'durmió', 'dormimos', 'dormisteis', 'durmieron'],
            'imperfecto': ['dormía', 'dormías', 'dormía', 'dormíamos', 'dormíais', 'dormían'],
            'futuro': ['dormiré', 'dormirás', 'dormirá', 'dormiremos', 'dormiréis', 'dormirán'],
            'condicional': ['dormiría', 'dormirías', 'dormiría', 'dormiríamos', 'dormiríais', 'dormirían'],
            'subjuntivo': ['duerma', 'duermas', 'duerma', 'durmamos', 'durmáis', 'duerman'],
            'imperativo': ['duerme', 'duerma', 'durmamos', 'dormid', 'duerman']
        },
        'morir': {
            'presente': ['muero', 'mueres', 'muere', 'morimos', 'morís', 'mueren'],
            'preterito': ['morí', 'moriste', 'murió', 'morimos', 'moristeis', 'murieron'],
            'imperfecto': ['moría', 'morías', 'moría', 'moríamos', 'moríais', 'morían'],
            'futuro': ['moriré', 'morirás', 'morirá', 'moriremos', 'moriréis', 'morirán'],
            'condicional': ['moriría', 'morirías', 'moriría', 'moriríamos', 'moriríais', 'morirían'],
            'subjuntivo': ['muera', 'mueras', 'muera', 'muramos', 'muráis', 'mueran'],
            'imperativo': ['muere', 'muera', 'muramos', 'morid', 'mueran']
        },
        'pedir': {
            'presente': ['pido', 'pides', 'pide', 'pedimos', 'pedís', 'piden'],
            'preterito': ['pedí', 'pediste', 'pidió', 'pedimos', 'pedisteis', 'pidieron'],
            'imperfecto': ['pedía', 'pedías', 'pedía', 'pedíamos', 'pedíais', 'pedían'],
            'futuro': ['pediré', 'pedirás', 'pedirá', 'pediremos', 'pediréis', 'pedirán'],
            'condicional': ['pediría', 'pedirías', 'pediría', 'pediríamos', 'pediríais', 'pedirían'],
            'subjuntivo': ['pida', 'pidas', 'pida', 'pidamos', 'pidáis', 'pidan'],
            'imperativo': ['pide', 'pida', 'pidamos', 'pedid', 'pidan']
        },
        'repetir': {
            'presente': ['repito', 'repites', 'repite', 'repetimos', 'repetís', 'repiten'],
            'preterito': ['repetí', 'repetiste', 'repitió', 'repetimos', 'repetisteis', 'repitieron'],
            'imperfecto': ['repetía', 'repetías', 'repetía', 'repetíamos', 'repetíais', 'repetían'],
            'futuro': ['repetiré', 'repetirás', 'repetirá', 'repetiremos', 'repetiréis', 'repetirán'],
            'condicional': ['repetiría', 'repetirías', 'repetiría', 'repetiríamos', 'repetiríais', 'repetirían'],
            'subjuntivo': ['repita', 'repitas', 'repita', 'repitamos', 'repitáis', 'repitan'],
            'imperativo': ['repite', 'repita', 'repitamos', 'repetid', 'repitan']
        },
        'servir': {
            'presente': ['sirvo', 'sirves', 'sirve', 'servimos', 'servís', 'sirven'],
            'preterito': ['serví', 'serviste', 'sirvió', 'servimos', 'servisteis', 'sirvieron'],
            'imperfecto': ['servía', 'servías', 'servía', 'servíamos', 'servíais', 'servían'],
            'futuro': ['serviré', 'servirás', 'servirá', 'serviremos', 'serviréis', 'servirán'],
            'condicional': ['serviría', 'servirías', 'serviría', 'serviríamos', 'serviríais', 'servirían'],
            'subjuntivo': ['sirva', 'sirvas', 'sirva', 'sirvamos', 'sirváis', 'sirvan'],
            'imperativo': ['sirve', 'sirva', 'sirvamos', 'servid', 'sirvan']
        },
        'vestir': {
            'presente': ['visto', 'vistes', 'viste', 'vestimos', 'vestís', 'visten'],
            'preterito': ['vestí', 'vestiste', 'vistió', 'vestimos', 'vestisteis', 'vistieron'],
            'imperfecto': ['vestía', 'vestías', 'vestía', 'vestíamos', 'vestíais', 'vestían'],
            'futuro': ['vestiré', 'vestirás', 'vestirá', 'vestiremos', 'vestiréis', 'vestirán'],
            'condicional': ['vestiría', 'vestirías', 'vestiría', 'vestiríamos', 'vestiríais', 'vestirían'],
            'subjuntivo': ['vista', 'vistas', 'vista', 'vistamos', 'vistáis', 'vistan'],
            'imperativo': ['viste', 'vista', 'vistamos', 'vestid', 'vistan']
        },
        'sentir': {
            'presente': ['siento', 'sientes', 'siente', 'sentimos', 'sentís', 'sienten'],
            'preterito': ['sentí', 'sentiste', 'sintió', 'sentimos', 'sentisteis', 'sintieron'],
            'imperfecto': ['sentía', 'sentías', 'sentía', 'sentíamos', 'sentíais', 'sentían'],
            'futuro': ['sentiré', 'sentirás', 'sentirá', 'sentiremos', 'sentiréis', 'sentirán'],
            'condicional': ['sentiría', 'sentirías', 'sentiría', 'sentiríamos', 'sentiríais', 'sentirían'],
            'subjuntivo': ['sienta', 'sientas', 'sienta', 'sintamos', 'sintáis', 'sientan'],
            'imperativo': ['siente', 'sienta', 'sintamos', 'sentid', 'sientan']
        },
        'mentir': {
            'presente': ['miento', 'mientes', 'miente', 'mentimos', 'mentís', 'mienten'],
            'preterito': ['mentí', 'mentiste', 'mintió', 'mentimos', 'mentisteis', 'mintieron'],
            'imperfecto': ['mentía', 'mentías', 'mentía', 'mentíamos', 'mentíais', 'mentían'],
            'futuro': ['mentiré', 'mentirás', 'mentirá', 'mentiremos', 'mentiréis', 'mentirán'],
            'condicional': ['mentiría', 'mentirías', 'mentiría', 'mentiríamos', 'mentiríais', 'mentirían'],
            'subjuntivo': ['mienta', 'mientas', 'mienta', 'mintamos', 'mintáis', 'mientan'],
            'imperativo': ['miente', 'mienta', 'mintamos', 'mentid', 'mientan']
        },
        'preferir': {
            'presente': ['prefiero', 'prefieres', 'prefiere', 'preferimos', 'preferís', 'prefieren'],
            'preterito': ['preferí', 'preferiste', 'prefirió', 'preferimos', 'preferisteis', 'prefirieron'],
            'imperfecto': ['prefería', 'preferías', 'prefería', 'preferiamos', 'preferíais', 'preferían'],
            'futuro': ['preferiré', 'preferirás', 'preferirá', 'preferiremos', 'preferiréis', 'preferirán'],
            'condicional': ['preferiría', 'preferirías', 'preferiría', 'preferiríamos', 'preferiríais', 'preferirían'],
            'subjuntivo': ['prefiera', 'prefieras', 'prefiera', 'prefiramos', 'prefiráis', 'prefieran'],
            'imperativo': ['prefiere', 'prefiera', 'prefiramos', 'preferid', 'prefieran']
        },
        'sugerir': {
            'presente': ['sugiero', 'sugieres', 'sugiere', 'sugerimos', 'sugerís', 'sugieren'],
            'preterito': ['sugerí', 'sugeriste', 'sugirió', 'sugerimos', 'sugeristeis', 'sugirieron'],
            'imperfecto': ['sugería', 'sugerías', 'sugería', 'sugeriamos', 'sugeríais', 'sugerían'],
            'futuro': ['sugeriré', 'sugerirás', 'sugerirá', 'sugeriremos', 'sugeriréis', 'sugerirán'],
            'condicional': ['sugeriría', 'sugerirías', 'sugeriría', 'sugeriríamos', 'sugeriríais', 'sugerirían'],
            'subjuntivo': ['sugiera', 'sugieras', 'sugiera', 'sugiramos', 'sugiráis', 'sugieran'],
            'imperativo': ['sugiere', 'sugiera', 'sugiramos', 'sugerid', 'sugieran']
        },
        'seguir': {
            'presente': ['sigo', 'sigues', 'sigue', 'seguimos', 'seguís', 'siguen'],
            'preterito': ['seguí', 'seguiste', 'siguió', 'seguimos', 'seguisteis', 'siguieron'],
            'imperfecto': ['seguía', 'seguías', 'seguía', 'seguíamos', 'seguíais', 'seguían'],
            'futuro': ['seguiré', 'seguirás', 'seguirá', 'seguiremos', 'seguiréis', 'seguirán'],
            'condicional': ['seguiría', 'seguirías', 'seguiría', 'seguiríamos', 'seguiríais', 'seguirían'],
            'subjuntivo': ['siga', 'sigas', 'siga', 'sigamos', 'sigáis', 'sigan'],
            'imperativo': ['sigue', 'siga', 'sigamos', 'seguid', 'sigan']
        },
        'conseguir': {
            'presente': ['consigo', 'consigues', 'consigue', 'conseguimos', 'conseguís', 'consiguen'],
            'preterito': ['conseguí', 'conseguiste', 'consiguió', 'conseguimos', 'conseguisteis', 'consiguieron'],
            'imperfecto': ['conseguía', 'conseguías', 'conseguía', 'conseguíamos', 'conseguíais', 'conseguían'],
            'futuro': ['conseguiré', 'conseguirás', 'conseguirá', 'conseguiremos', 'conseguiréis', 'conseguirán'],
            'condicional': ['conseguiría', 'conseguirías', 'conseguiría', 'conseguiríamos', 'conseguiríais', 'conseguirían'],
            'subjuntivo': ['consiga', 'consigas', 'consiga', 'consigamos', 'consigáis', 'consigan'],
            'imperativo': ['consigue', 'consiga', 'consigamos', 'conseguid', 'consigan']
        },
        'elegir': {
            'presente': ['elijo', 'eliges', 'elige', 'elegimos', 'elegís', 'eligen'],
            'preterito': ['elegí', 'elegiste', 'eligió', 'elegimos', 'elegisteis', 'eligieron'],
            'imperfecto': ['elegía', 'elegías', 'elegía', 'elegíamos', 'elegíais', 'elegían'],
            'futuro': ['elegiré', 'elegirás', 'elegirá', 'elegiremos', 'elegiréis', 'elegirán'],
            'condicional': ['elegiría', 'elegirías', 'elegiría', 'elegiríamos', 'elegiríais', 'elegirían'],
            'subjuntivo': ['elija', 'elijas', 'elija', 'elijamos', 'elijáis', 'elijan'],
            'imperativo': ['elige', 'elija', 'elijamos', 'elegid', 'elijan']
        },
        'corregir': {
            'presente': ['corrijo', 'corriges', 'corrige', 'corregimos', 'corregís', 'corrigen'],
            'preterito': ['corregí', 'corregiste', 'corrigió', 'corregimos', 'corregisteis', 'corrigieron'],
            'imperfecto': ['corregía', 'corregías', 'corregía', 'corregíamos', 'corregíais', 'corregían'],
            'futuro': ['corregiré', 'corregirás', 'corregirá', 'corregiremos', 'corregiréis', 'corregirán'],
            'condicional': ['corregiría', 'corregirías', 'corregiría', 'corregiríamos', 'corregiríais', 'corregirían'],
            'subjuntivo': ['corrija', 'corrijas', 'corrija', 'corrijamos', 'corrijáis', 'corrijan'],
            'imperativo': ['corrige', 'corrija', 'corrijamos', 'corregid', 'corrijan']
        },
        'reír': {
            'presente': ['río', 'ríes', 'ríe', 'reímos', 'reís', 'ríen'],
            'preterito': ['reí', 'reíste', 'rió', 'reímos', 'reísteis', 'rieron'],
            'imperfecto': ['reía', 'reías', 'reía', 'reíamos', 'reíais', 'reían'],
            'futuro': ['reiré', 'reirás', 'reirá', 'reiremos', 'reiréis', 'reirán'],
            'condicional': ['reiría', 'reirías', 'reiría', 'reiríamos', 'reiríais', 'reirían'],
            'subjuntivo': ['ría', 'rías', 'ría', 'riamos', 'riáis', 'rían'],
            'imperativo': ['ríe', 'ría', 'riamos', 'reíd', 'rían']
        },
        'sonreír': {
            'presente': ['sonrío', 'sonríes', 'sonríe', 'sonreímos', 'sonreís', 'sonríen'],
            'preterito': ['sonreí', 'sonreíste', 'sonrió', 'sonreímos', 'sonreísteis', 'sonrieron'],
            'imperfecto': ['sonreía', 'sonreías', 'sonreía', 'sonreíamos', 'sonreíais', 'sonreían'],
            'futuro': ['sonreiré', 'sonreirás', 'sonreirá', 'sonreiremos', 'sonreiréis', 'sonreirán'],
            'condicional': ['sonreiría', 'sonreirías', 'sonreiría', 'sonreiríamos', 'sonreiríais', 'sonreirían'],
            'subjuntivo': ['sonría', 'sonrías', 'sonría', 'sonriamos', 'sonriáis', 'sonrían'],
            'imperativo': ['sonríe', 'sonría', 'sonriamos', 'sonreíd', 'sonrían']
        },
        'freír': {
            'presente': ['frío', 'fríes', 'fríe', 'freímos', 'freís', 'fríen'],
            'preterito': ['freí', 'freíste', 'frió', 'freímos', 'freísteis', 'frieron'],
            'imperfecto': ['freía', 'freías', 'freía', 'freíamos', 'freíais', 'freían'],
            'futuro': ['freiré', 'freirás', 'freirá', 'freiremos', 'freiréis', 'freirán'],
            'condicional': ['freiría', 'freirías', 'freiría', 'freiríamos', 'freiríais', 'freirían'],
            'subjuntivo': ['fría', 'frías', 'fría', 'friamos', 'friáis', 'frían'],
            'imperativo': ['fríe', 'fría', 'friamos', 'freíd', 'frían']
        },
        'mover': {
            'presente': ['muevo', 'mueves', 'mueve', 'movemos', 'movéis', 'mueven'],
            'preterito': ['moví', 'moviste', 'movió', 'movimos', 'movisteis', 'movieron'],
            'imperfecto': ['movía', 'movías', 'movía', 'movíamos', 'movíais', 'movían'],
            'futuro': ['moveré', 'moverás', 'moverá', 'moveremos', 'moveréis', 'moverán'],
            'condicional': ['movería', 'moverías', 'movería', 'moveríamos', 'moveríais', 'moverían'],
            'subjuntivo': ['mueva', 'muevas', 'mueva', 'movamos', 'mováis', 'muevan'],
            'imperativo': ['mueve', 'mueva', 'movamos', 'moved', 'muevan']
        },
        'doler': {
            // 主要以第三人称使用（duele/duelen）
            'presente': ['duelo', 'dueles', 'duele', 'dolemos', 'doléis', 'duelen'],
            'preterito': ['dolí', 'doliste', 'dolió', 'dolimos', 'dolisteis', 'dolieron'],
            'imperfecto': ['dolía', 'dolías', 'dolía', 'dolíamos', 'dolíais', 'dolían'],
            'futuro': ['doleré', 'dolerás', 'dolerá', 'doleremos', 'doleréis', 'dolerán'],
            'condicional': ['dolería', 'dolerías', 'dolería', 'doleríamos', 'doleríais', 'dolerían'],
            'subjuntivo': ['duela', 'duelas', 'duela', 'dolamos', 'doláis', 'duelan'],
            'imperativo': ['duele', 'duela', 'dolamos', 'doled', 'duelan']
        },
        'conocer': {
            'presente': ['conozco', 'conoces', 'conoce', 'conocemos', 'conocéis', 'conocen'],
            'preterito': ['conocí', 'conociste', 'conoció', 'conocimos', 'conocisteis', 'conocieron'],
            'imperfecto': ['conocía', 'conocías', 'conocía', 'conocíamos', 'conocíais', 'conocían'],
            'futuro': ['conoceré', 'conocerás', 'conocerá', 'conoceremos', 'conoceréis', 'conocerán'],
            'condicional': ['conocería', 'conocerías', 'conocería', 'conoceríamos', 'conoceríais', 'conocerían'],
            'subjuntivo': ['conozca', 'conozcas', 'conozca', 'conozcamos', 'conozcáis', 'conozcan'],
            'imperativo': ['conoce', 'conozca', 'conozcamos', 'conoced', 'conozcan']
        },
        'nacer': {
            'presente': ['nazco', 'naces', 'nace', 'nacemos', 'nacéis', 'nacen'],
            'preterito': ['nací', 'naciste', 'nació', 'nacimos', 'nacisteis', 'nacieron'],
            'imperfecto': ['nacía', 'nacías', 'nacía', 'nacíamos', 'nacíais', 'nacían'],
            'futuro': ['naceré', 'nacerás', 'nacerá', 'naceremos', 'naceréis', 'nacerán'],
            'condicional': ['nacería', 'nacerías', 'nacería', 'naceríamos', 'naceríais', 'nacerían'],
            'subjuntivo': ['nazca', 'nazcas', 'nazca', 'nazcamos', 'nazcáis', 'nazcan'],
            'imperativo': ['nace', 'nazca', 'nazcamos', 'naced', 'nazcan']
        },
        'conducir': {
            'presente': ['conduzco', 'conduces', 'conduce', 'conducimos', 'conducís', 'conducen'],
            'preterito': ['conduje', 'condujiste', 'condujo', 'condujimos', 'condujisteis', 'condujeron'],
            'imperfecto': ['conducía', 'conducías', 'conducía', 'conducíamos', 'conducíais', 'conducían'],
            'futuro': ['conduciré', 'conducirás', 'conducirá', 'conduciremos', 'conduciréis', 'conducirán'],
            'condicional': ['conduciría', 'conducirías', 'conduciría', 'conduciríamos', 'conduciríais', 'conducirían'],
            'subjuntivo': ['conduzca', 'conduzcas', 'conduzca', 'conduzcamos', 'conduzcáis', 'conduzcan'],
            'imperativo': ['conduce', 'conduzca', 'conduzcamos', 'conducid', 'conduzcan']
        },
        'producir': {
            'presente': ['produzco', 'produces', 'produce', 'producimos', 'producís', 'producen'],
            'preterito': ['produje', 'produjiste', 'produjo', 'produjimos', 'produjisteis', 'produjeron'],
            'imperfecto': ['producía', 'producías', 'producía', 'producíamos', 'producíais', 'producían'],
            'futuro': ['produciré', 'producirás', 'producirá', 'produciremos', 'produciréis', 'producirán'],
            'condicional': ['produciría', 'producirías', 'produciría', 'produciríamos', 'produciríais', 'producirían'],
            'subjuntivo': ['produzca', 'produzcas', 'produzca', 'produzcamos', 'produzcáis', 'produzcan'],
            'imperativo': ['produce', 'produzca', 'produzcamos', 'producid', 'produzcan']
        },
        'traducir': {
            'presente': ['traduzco', 'traduces', 'traduce', 'traducimos', 'traducís', 'traducen'],
            'preterito': ['traduje', 'tradujiste', 'tradujo', 'tradujimos', 'tradujisteis', 'tradujeron'],
            'imperfecto': ['traducía', 'traducías', 'traducía', 'traducíamos', 'traducíais', 'traducían'],
            'futuro': ['traduciré', 'traducirás', 'traducirá', 'traduciremos', 'traduciréis', 'traducirán'],
            'condicional': ['traduciría', 'traducirías', 'traduciría', 'traduciríamos', 'traduciríais', 'traducirían'],
            'subjuntivo': ['traduzca', 'traduzcas', 'traduzca', 'traduzcamos', 'traduzcáis', 'traduzcan'],
            'imperativo': ['traduce', 'traduzca', 'traduzcamos', 'traducid', 'traduzcan']
        },
        'introducir': {
            'presente': ['introduzco', 'introduces', 'introduce', 'introducimos', 'introducís', 'introducen'],
            'preterito': ['introduje', 'introdujiste', 'introdujo', 'introdujimos', 'introdujisteis', 'introdujeron'],
            'imperfecto': ['introducía', 'introducías', 'introducía', 'introducíamos', 'introducíais', 'introducían'],
            'futuro': ['introduciré', 'introducirás', 'introducirá', 'introduciremos', 'introduciréis', 'introducirán'],
            'condicional': ['introduciría', 'introducirías', 'introduciría', 'introduciríamos', 'introduciríais', 'introducirían'],
            'subjuntivo': ['introduzca', 'introduzcas', 'introduzca', 'introduzcamos', 'introduzcáis', 'introduzcan'],
            'imperativo': ['introduce', 'introduzca', 'introduzcamos', 'introducid', 'introduzcan']
        },
        'reducir': {
            'presente': ['reduzco', 'reduces', 'reduce', 'reducimos', 'reducís', 'reducen'],
            'preterito': ['reduje', 'redujiste', 'redujo', 'redujimos', 'redujisteis', 'redujeron'],
            'imperfecto': ['reducía', 'reducías', 'reducía', 'reducíamos', 'reducíais', 'reducían'],
            'futuro': ['reduciré', 'reducirás', 'reducirá', 'reduciremos', 'reduciréis', 'reducirán'],
            'condicional': ['reduciría', 'reducirías', 'reduciría', 'reduciríamos', 'reduciríais', 'reducirían'],
            'subjuntivo': ['reduzca', 'reduzcas', 'reduzca', 'reduzcamos', 'reduzcáis', 'reduzcan'],
            'imperativo': ['reduce', 'reduzca', 'reduzcamos', 'reducid', 'reduzcan']
        },
        'construir': {
            'presente': ['construyo', 'construyes', 'construye', 'construimos', 'construís', 'construyen'],
            'preterito': ['construí', 'construiste', 'construyó', 'construimos', 'construisteis', 'construyeron'],
            'imperfecto': ['construía', 'construías', 'construía', 'construíamos', 'construíais', 'construían'],
            'futuro': ['construiré', 'construirás', 'construirá', 'construiremos', 'construiréis', 'construirán'],
            'condicional': ['construiría', 'construirías', 'construiría', 'construiríamos', 'construiríais', 'construirían'],
            'subjuntivo': ['construya', 'construyas', 'construya', 'construyamos', 'construyáis', 'construyan'],
            'imperativo': ['construye', 'construya', 'construyamos', 'construid', 'construyan']
        },
        'destruir': {
            'presente': ['destruyo', 'destruyes', 'destruye', 'destruimos', 'destruís', 'destruyen'],
            'preterito': ['destruí', 'destruiste', 'destruyó', 'destruimos', 'destruisteis', 'destruyeron'],
            'imperfecto': ['destruía', 'destruías', 'destruía', 'destruíamos', 'destruíais', 'destruían'],
            'futuro': ['destruiré', 'destruirás', 'destruirá', 'destruiremos', 'destruiréis', 'destruirán'],
            'condicional': ['destruiría', 'destruirías', 'destruiría', 'destruiríamos', 'destruiríais', 'destruirían'],
            'subjuntivo': ['destruya', 'destruyas', 'destruya', 'destruyamos', 'destruyáis', 'destruyan'],
            'imperativo': ['destruye', 'destruya', 'destruyamos', 'destruid', 'destruyan']
        },
        'incluir': {
            'presente': ['incluyo', 'incluyes', 'incluye', 'incluimos', 'incluís', 'incluyen'],
            'preterito': ['incluí', 'incluiste', 'incluyó', 'incluimos', 'incluisteis', 'incluyeron'],
            'imperfecto': ['incluía', 'incluías', 'incluía', 'incluíamos', 'incluíais', 'incluían'],
            'futuro': ['incluiré', 'incluirás', 'incluirá', 'incluiremos', 'incluiréis', 'incluirán'],
            'condicional': ['incluiría', 'incluirías', 'incluiría', 'incluiríamos', 'incluiríais', 'incluirían'],
            'subjuntivo': ['incluya', 'incluyas', 'incluya', 'incluyamos', 'incluyáis', 'incluyan'],
            'imperativo': ['incluye', 'incluya', 'incluyamos', 'incluid', 'incluyan']
        },
        'concluir': {
            'presente': ['concluyo', 'concluyes', 'concluye', 'concluimos', 'concluís', 'concluyen'],
            'preterito': ['concluí', 'concluiste', 'concluyó', 'concluimos', 'concluisteis', 'concluyeron'],
            'imperfecto': ['concluía', 'concluías', 'concluía', 'concluíamos', 'concluíais', 'concluían'],
            'futuro': ['concluiré', 'concluirás', 'concluirá', 'concluiremos', 'concluiréis', 'concluirán'],
            'condicional': ['concluiría', 'concluirías', 'concluiría', 'concluiríamos', 'concluiríais', 'concluirían'],
            'subjuntivo': ['concluya', 'concluyas', 'concluya', 'concluyamos', 'concluyáis', 'concluyan'],
            'imperativo': ['concluye', 'concluya', 'concluyamos', 'concluid', 'concluyan']
        },
        'huir': {
            'presente': ['huyo', 'huyes', 'huye', 'huimos', 'huís', 'huyen'],
            'preterito': ['huí', 'huiste', 'huyó', 'huimos', 'huisteis', 'huyeron'],
            'imperfecto': ['huía', 'huías', 'huía', 'huíamos', 'huíais', 'huían'],
            'futuro': ['huiré', 'huirás', 'huirá', 'huiremos', 'huiréis', 'huirán'],
            'condicional': ['huiría', 'huirías', 'huiría', 'huiríamos', 'huiríais', 'huirían'],
            'subjuntivo': ['huya', 'huyas', 'huya', 'huyamos', 'huyáis', 'huyan'],
            'imperativo': ['huye', 'huya', 'huyamos', 'huid', 'huyan']
        },
        'caer': {
            'presente': ['caigo', 'caes', 'cae', 'caemos', 'caéis', 'caen'],
            'preterito': ['caí', 'caíste', 'cayó', 'caímos', 'caísteis', 'cayeron'],
            'imperfecto': ['caía', 'caías', 'caía', 'caíamos', 'caíais', 'caían'],
            'futuro': ['caeré', 'caerás', 'caerá', 'caeremos', 'caeréis', 'caerán'],
            'condicional': ['caería', 'caerías', 'caería', 'caeríamos', 'caeríais', 'caerían'],
            'subjuntivo': ['caiga', 'caigas', 'caiga', 'caigamos', 'caigáis', 'caigan'],
            'imperativo': ['cae', 'caiga', 'caigamos', 'caed', 'caigan']
        },
        'roer': {
            'presente': ['roo', 'roes', 'roe', 'roemos', 'roéis', 'roen'],
            'preterito': ['roí', 'roíste', 'royó', 'roímos', 'roísteis', 'royeron'],
            'imperfecto': ['roía', 'roías', 'roía', 'roíamos', 'roíais', 'roían'],
            'futuro': ['roeré', 'roerás', 'roerá', 'roeremos', 'roeréis', 'roerán'],
            'condicional': ['roería', 'roerías', 'roería', 'roeríamos', 'roeríais', 'roerían'],
            'subjuntivo': ['roa', 'roas', 'roa', 'roamos', 'roáis', 'roan'],
            'imperativo': ['roe', 'roa', 'roamos', 'roed', 'roan']
        },
        'tañer': {
            'presente': ['taño', 'tañes', 'tañe', 'tañemos', 'tañéis', 'tañen'],
            'preterito': ['tañí', 'tañiste', 'tañó', 'tañimos', 'tañisteis', 'tañeron'],
            'imperfecto': ['tañía', 'tañías', 'tañía', 'tañíamos', 'tañíais', 'tañían'],
            'futuro': ['tañeré', 'tañerás', 'tañerá', 'tañeremos', 'tañeréis', 'tañerán'],
            'condicional': ['tañería', 'tañerías', 'tañería', 'tañeríamos', 'tañeríais', 'tañerían'],
            'subjuntivo': ['taña', 'tañas', 'taña', 'tañamos', 'tañáis', 'tañan'],
            'imperativo': ['tañe', 'taña', 'tañamos', 'tañed', 'tañan']
        },
        // 气象动词（缺陷动词，一般只用第三人称单数）
        'llover': {
            'presente': ['N/A', 'N/A', 'llueve', 'N/A', 'N/A', 'N/A'],
            'preterito': ['N/A', 'N/A', 'llovió', 'N/A', 'N/A', 'N/A'],
            'imperfecto': ['N/A', 'N/A', 'llovía', 'N/A', 'N/A', 'N/A'],
            'futuro': ['N/A', 'N/A', 'lloverá', 'N/A', 'N/A', 'N/A'],
            'condicional': ['N/A', 'N/A', 'llovería', 'N/A', 'N/A', 'N/A'],
            'subjuntivo': ['N/A', 'N/A', 'llueva', 'N/A', 'N/A', 'N/A']
        },
        'nevar': {
            'presente': ['N/A', 'N/A', 'nieva', 'N/A', 'N/A', 'N/A'],
            'preterito': ['N/A', 'N/A', 'nevó', 'N/A', 'N/A', 'N/A'],
            'imperfecto': ['N/A', 'N/A', 'nevaba', 'N/A', 'N/A', 'N/A'],
            'futuro': ['N/A', 'N/A', 'nevará', 'N/A', 'N/A', 'N/A'],
            'condicional': ['N/A', 'N/A', 'nevaría', 'N/A', 'N/A', 'N/A'],
            'subjuntivo': ['N/A', 'N/A', 'nieve', 'N/A', 'N/A', 'N/A']
        },
        'tronar': {
            'presente': ['N/A', 'N/A', 'truena', 'N/A', 'N/A', 'N/A'],
            'preterito': ['N/A', 'N/A', 'tronó', 'N/A', 'N/A', 'N/A'],
            'imperfecto': ['N/A', 'N/A', 'tronaba', 'N/A', 'N/A', 'N/A'],
            'futuro': ['N/A', 'N/A', 'tronará', 'N/A', 'N/A', 'N/A'],
            'condicional': ['N/A', 'N/A', 'tronaría', 'N/A', 'N/A', 'N/A'],
            'subjuntivo': ['N/A', 'N/A', 'truene', 'N/A', 'N/A', 'N/A']
        },
        // 词干变化 e→ie：encender, defender, perder, entender (también crecer/aparecer en presente)
        'encender': {
            'presente': ['enciendo', 'enciendes', 'enciende', 'encendemos', 'encendéis', 'encienden'],
            'preterito': ['encendí', 'encendiste', 'encendió', 'encendimos', 'encendisteis', 'encendieron'],
            'imperfecto': ['encendía', 'encendías', 'encendía', 'encendíamos', 'encendíais', 'encendían'],
            'futuro': ['encenderé', 'encenderás', 'encenderá', 'encenderemos', 'encenderéis', 'encenderán'],
            'condicional': ['encendería', 'encenderías', 'encendería', 'encenderíamos', 'encenderíais', 'encenderían'],
            'subjuntivo': ['encienda', 'enciendas', 'encienda', 'encendamos', 'encendáis', 'enciendan'],
            'imperativo': ['enciende', 'encienda', 'encendamos', 'encended', 'enciendan']
        },
        'defender': {
            'presente': ['defiendo', 'defiendes', 'defiende', 'defendemos', 'defendéis', 'defienden'],
            'preterito': ['defendí', 'defendiste', 'defendió', 'defendimos', 'defendisteis', 'defendieron'],
            'imperfecto': ['defendía', 'defendías', 'defendía', 'defendíamos', 'defendíais', 'defendían'],
            'futuro': ['defenderé', 'defenderás', 'defenderá', 'defenderemos', 'defenderéis', 'defenderán'],
            'condicional': ['defendería', 'defenderías', 'defendería', 'defenderíamos', 'defenderíais', 'defenderían'],
            'subjuntivo': ['defienda', 'defiendas', 'defienda', 'defendamos', 'defendáis', 'defiendan'],
            'imperativo': ['defiende', 'defienda', 'defendamos', 'defended', 'defiendan']
        },
        'perder': {
            'presente': ['pierdo', 'pierdes', 'pierde', 'perdemos', 'perdéis', 'pierden'],
            'preterito': ['perdí', 'perdiste', 'perdió', 'perdimos', 'perdisteis', 'perdieron'],
            'imperfecto': ['perdía', 'perdías', 'perdía', 'perdíamos', 'perdíais', 'perdían'],
            'futuro': ['perderé', 'perderás', 'perderá', 'perderemos', 'perderéis', 'perderán'],
            'condicional': ['perdería', 'perderías', 'perdería', 'perderíamos', 'perderíais', 'perderían'],
            'subjuntivo': ['pierda', 'pierdas', 'pierda', 'perdamos', 'perdáis', 'pierdan'],
            'imperativo': ['pierde', 'pierda', 'perdamos', 'perded', 'pierdan']
        },
        'entender': {
            'presente': ['entiendo', 'entiendes', 'entiende', 'entendemos', 'entendéis', 'entienden'],
            'preterito': ['entendí', 'entendiste', 'entendió', 'entendimos', 'entendisteis', 'entendieron'],
            'imperfecto': ['entendía', 'entendías', 'entendía', 'entendíamos', 'entendíais', 'entendían'],
            'futuro': ['entenderé', 'entenderás', 'entenderá', 'entenderemos', 'entenderéis', 'entenderán'],
            'condicional': ['entendería', 'entenderías', 'entendería', 'entenderíamos', 'entenderíais', 'entenderían'],
            'subjuntivo': ['entienda', 'entiendas', 'entienda', 'entendamos', 'entendáis', 'entiendan'],
            'imperativo': ['entiende', 'entienda', 'entendamos', 'entended', 'entiendan']
        },
        // pensar/empezar e→ie (ar)
        'pensar': {
            'presente': ['pienso', 'piensas', 'piensa', 'pensamos', 'pensáis', 'piensan'],
            'preterito': ['pensé', 'pensaste', 'pensó', 'pensamos', 'pensasteis', 'pensaron'],
            'imperfecto': ['pensaba', 'pensabas', 'pensaba', 'pensábamos', 'pensabais', 'pensaban'],
            'futuro': ['pensaré', 'pensarás', 'pensará', 'pensaremos', 'pensaréis', 'pensarán'],
            'condicional': ['pensaría', 'pensarías', 'pensaría', 'pensaríamos', 'pensaríais', 'pensarían'],
            'subjuntivo': ['piense', 'pienses', 'piense', 'pensemos', 'penséis', 'piensen'],
            'imperativo': ['piensa', 'piense', 'pensemos', 'pensad', 'piensen']
        },
        'empezar': {
            'presente': ['empiezo', 'empiezas', 'empieza', 'empezamos', 'empezáis', 'empiezan'],
            'preterito': ['empecé', 'empezaste', 'empezó', 'empezamos', 'empezasteis', 'empezaron'],
            'imperfecto': ['empezaba', 'empezabas', 'empezaba', 'empezábamos', 'empezabais', 'empezaban'],
            'futuro': ['empezaré', 'empezarás', 'empezará', 'empezaremos', 'empezaréis', 'empezarán'],
            'condicional': ['empezaría', 'empezarías', 'empezaría', 'empezaríamos', 'empezaríais', 'empezarían'],
            'subjuntivo': ['empiece', 'empieces', 'empiece', 'empecemos', 'empecéis', 'empiecen'],
            'imperativo': ['empieza', 'empiece', 'empecemos', 'empezad', 'empiecen']
        },
        // acordarse/acostarse o→ue
        'acostarse': {
            'presente': ['me acuesto', 'te acuestas', 'se acuesta', 'nos acostamos', 'os acostáis', 'se acuestan'],
            'preterito': ['me acosté', 'te acostaste', 'se acostó', 'nos acostamos', 'os acostasteis', 'se acostaron'],
            'imperfecto': ['me acostaba', 'te acostabas', 'se acostaba', 'nos acostábamos', 'os acostabais', 'se acostaban'],
            'futuro': ['me acostaré', 'te acostarás', 'se acostará', 'nos acostaremos', 'os acostaréis', 'se acostarán'],
            'condicional': ['me acostaría', 'te acostarías', 'se acostaría', 'nos acostaríamos', 'os acostaríais', 'se acostarían'],
            'subjuntivo': ['me acueste', 'te acuestes', 'se acueste', 'nos acostemos', 'os acostéis', 'se acuesten'],
            'imperativo': ['acuéstate', 'acuéstese', 'acostémonos', 'acostaos', 'acuéstense']
        },
        'acordarse': {
            'presente': ['me acuerdo', 'te acuerdas', 'se acuerda', 'nos acordamos', 'os acordáis', 'se acuerdan'],
            'preterito': ['me acordé', 'te acordaste', 'se acordó', 'nos acordamos', 'os acordasteis', 'se acordaron'],
            'imperfecto': ['me acordaba', 'te acordabas', 'se acordaba', 'nos acordábamos', 'os acordabais', 'se acordaban'],
            'futuro': ['me acordaré', 'te acordarás', 'se acordará', 'nos acordaremos', 'os acordaréis', 'se acordarán'],
            'condicional': ['me acordaría', 'te acordarías', 'se acordaría', 'nos acordaríamos', 'os acordaríais', 'se acordarían'],
            'subjuntivo': ['me acuerde', 'te acuerdes', 'se acuerde', 'nos acordemos', 'os acordéis', 'se acuerden'],
            'imperativo': ['acuérdate', 'acuérdese', 'acordémonos', 'acordaos', 'acuérdense']
        },
        // sentarse e→ie
        'sentarse': {
            'presente': ['me siento', 'te sientas', 'se sienta', 'nos sentamos', 'os sentáis', 'se sientan'],
            'preterito': ['me senté', 'te sentaste', 'se sentó', 'nos sentamos', 'os sentasteis', 'se sentaron'],
            'imperfecto': ['me sentaba', 'te sentabas', 'se sentaba', 'nos sentábamos', 'os sentabais', 'se sentaban'],
            'futuro': ['me sentaré', 'te sentarás', 'se sentará', 'nos sentaremos', 'os sentaréis', 'se sentarán'],
            'condicional': ['me sentaría', 'te sentarías', 'se sentaría', 'nos sentaríamos', 'os sentaríais', 'se sentarían'],
            'subjuntivo': ['me siente', 'te sientes', 'se siente', 'nos sentemos', 'os sentéis', 'se sienten'],
            'imperativo': ['siéntate', 'siéntese', 'sentémonos', 'sentaos', 'siéntense']
        },
        // vestirse / despedirse / divertirse / arrepentirse e→i
        'despedirse': {
            'presente': ['me despido', 'te despides', 'se despide', 'nos despedimos', 'os despedís', 'se despiden'],
            'preterito': ['me despedí', 'te despediste', 'se despidió', 'nos despedimos', 'os despedisteis', 'se despidieron'],
            'imperfecto': ['me despedía', 'te despedías', 'se despedía', 'nos despedíamos', 'os despedíais', 'se despedían'],
            'futuro': ['me despediré', 'te despedirás', 'se despedirá', 'nos despediremos', 'os despediréis', 'se despedirán'],
            'condicional': ['me despediría', 'te despedirías', 'se despediría', 'nos despediríamos', 'os despediríais', 'se despedirían'],
            'subjuntivo': ['me despida', 'te despidas', 'se despida', 'nos despidamos', 'os despidáis', 'se despidan'],
            'imperativo': ['despídete', 'despídase', 'despidámonos', 'despedíos', 'despídanse']
        },
        'divertirse': {
            'presente': ['me divierto', 'te diviertes', 'se divierte', 'nos divertimos', 'os divertís', 'se divierten'],
            'preterito': ['me divertí', 'te divertiste', 'se divirtió', 'nos divertimos', 'os divertisteis', 'se divirtieron'],
            'imperfecto': ['me divertía', 'te divertías', 'se divertía', 'nos divertíamos', 'os divertíais', 'se divertían'],
            'futuro': ['me divertiré', 'te divertirás', 'se divertirá', 'nos divertiremos', 'os divertiréis', 'se divertirán'],
            'condicional': ['me divertiría', 'te divertirías', 'se divertiría', 'nos divertiríamos', 'os divertiríais', 'se divertirían'],
            'subjuntivo': ['me divierta', 'te diviertas', 'se divierta', 'nos divirtamos', 'os divirtáis', 'se diviertan'],
            'imperativo': ['diviértete', 'diviértase', 'divirtámonos', 'divertíos', 'diviértanse']
        },
        'arrepentirse': {
            'presente': ['me arrepiento', 'te arrepientes', 'se arrepiente', 'nos arrepentimos', 'os arrepentís', 'se arrepienten'],
            'preterito': ['me arrepentí', 'te arrepentiste', 'se arrepintió', 'nos arrepentimos', 'os arrepentisteis', 'se arrepintieron'],
            'imperfecto': ['me arrepentía', 'te arrepentías', 'se arrepentía', 'nos arrepentíamos', 'os arrepentíais', 'se arrepentían'],
            'futuro': ['me arrepentiré', 'te arrepentirás', 'se arrepentirá', 'nos arrepentiremos', 'os arrepentiréis', 'se arrepentirán'],
            'condicional': ['me arrepentiría', 'te arrepentirías', 'se arrepentiría', 'nos arrepentiríamos', 'os arrepentiríais', 'se arrepentirían'],
            'subjuntivo': ['me arrepienta', 'te arrepientas', 'se arrepienta', 'nos arrepintamos', 'os arrepintáis', 'se arrepientan'],
            'imperativo': ['arrepiéntete', 'arrepiéntase', 'arrepintámonos', 'arrepentíos', 'arrepiéntanse']
        },
        // haber — 助动词，完整不规则变位
        'haber': {
            'presente': ['he', 'has', 'ha', 'hemos', 'habéis', 'han'],
            'preterito': ['hube', 'hubiste', 'hubo', 'hubimos', 'hubisteis', 'hubieron'],
            'imperfecto': ['había', 'habías', 'había', 'habíamos', 'habíais', 'habían'],
            'futuro': ['habré', 'habrás', 'habrá', 'habremos', 'habréis', 'habrán'],
            'condicional': ['habría', 'habrías', 'habría', 'habríamos', 'habríais', 'habrían'],
            'subjuntivo': ['haya', 'hayas', 'haya', 'hayamos', 'hayáis', 'hayan'],
            'imperativo': ['he', 'haya', 'hayamos', 'habed', 'hayan']
        },
        // volver o→ue
        'volver': {
            'presente': ['vuelvo', 'vuelves', 'vuelve', 'volvemos', 'volvéis', 'vuelven'],
            'preterito': ['volví', 'volviste', 'volvió', 'volvimos', 'volvisteis', 'volvieron'],
            'imperfecto': ['volvía', 'volvías', 'volvía', 'volvíamos', 'volvíais', 'volvían'],
            'futuro': ['volveré', 'volverás', 'volverá', 'volveremos', 'volveréis', 'volverán'],
            'condicional': ['volvería', 'volverías', 'volvería', 'volveríamos', 'volveríais', 'volverían'],
            'subjuntivo': ['vuelva', 'vuelvas', 'vuelva', 'volvamos', 'volváis', 'vuelvan'],
            'imperativo': ['vuelve', 'vuelva', 'volvamos', 'volved', 'vuelvan']
        },
        // volverse o→ue (代词式)
        'volverse': {
            'presente': ['me vuelvo', 'te vuelves', 'se vuelve', 'nos volvemos', 'os volvéis', 'se vuelven'],
            'preterito': ['me volví', 'te volviste', 'se volvió', 'nos volvimos', 'os volvisteis', 'se volvieron'],
            'imperfecto': ['me volvía', 'te volvías', 'se volvía', 'nos volvíamos', 'os volvíais', 'se volvían'],
            'futuro': ['me volveré', 'te volverás', 'se volverá', 'nos volveremos', 'os volveréis', 'se volverán'],
            'condicional': ['me volvería', 'te volverías', 'se volvería', 'nos volveríamos', 'os volveríais', 'se volverían'],
            'subjuntivo': ['me vuelva', 'te vuelvas', 'se vuelva', 'nos volvamos', 'os volváis', 'se vuelvan'],
            'imperativo': ['vuélvete', 'vuélvase', 'volvamos', 'volveos', 'vuélvanse']
        },
        // encontrar o→ue
        'encontrar': {
            'presente': ['encuentro', 'encuentras', 'encuentra', 'encontramos', 'encontráis', 'encuentran'],
            'preterito': ['encontré', 'encontraste', 'encontró', 'encontramos', 'encontrasteis', 'encontraron'],
            'imperfecto': ['encontraba', 'encontrabas', 'encontraba', 'encontrábamos', 'encontrabais', 'encontraban'],
            'futuro': ['encontraré', 'encontrarás', 'encontrará', 'encontraremos', 'encontraréis', 'encontrarán'],
            'condicional': ['encontraría', 'encontrarías', 'encontraría', 'encontraríamos', 'encontraríais', 'encontrarían'],
            'subjuntivo': ['encuentre', 'encuentres', 'encuentre', 'encontremos', 'encontréis', 'encuentren'],
            'imperativo': ['encuentra', 'encuentre', 'encontremos', 'encontrad', 'encuentren']
        },
        // encontrarse o→ue (代词式)
        'encontrarse': {
            'presente': ['me encuentro', 'te encuentras', 'se encuentra', 'nos encontramos', 'os encontráis', 'se encuentran'],
            'preterito': ['me encontré', 'te encontraste', 'se encontró', 'nos encontramos', 'os encontrasteis', 'se encontraron'],
            'imperfecto': ['me encontraba', 'te encontrabas', 'se encontraba', 'nos encontrábamos', 'os encontrabais', 'se encontraban'],
            'futuro': ['me encontraré', 'te encontrarás', 'se encontrará', 'nos encontraremos', 'os encontraréis', 'se encontrarán'],
            'condicional': ['me encontraría', 'te encontrarías', 'se encontraría', 'nos encontraríamos', 'os encontraríais', 'se encontrarían'],
            'subjuntivo': ['me encuentre', 'te encuentres', 'se encuentre', 'nos encontremos', 'os encontréis', 'se encuentren'],
            'imperativo': ['encuéntrate', 'encuéntrese', 'encontrémonos', 'encontraos', 'encuéntren']
        },
        // despertar e→ie
        'despertar': {
            'presente': ['despierto', 'despiertas', 'despierta', 'despertamos', 'despertáis', 'despiertan'],
            'preterito': ['desperté', 'despertaste', 'despertó', 'despertamos', 'despertasteis', 'despertaron'],
            'imperfecto': ['despertaba', 'despertabas', 'despertaba', 'despertábamos', 'despertabais', 'despertaban'],
            'futuro': ['despertaré', 'despertarás', 'despertará', 'despertaremos', 'despertaréis', 'despertarán'],
            'condicional': ['despertaría', 'despertarías', 'despertaría', 'despertaríamos', 'despertaríais', 'despertarían'],
            'subjuntivo': ['despierte', 'despiertes', 'despierte', 'despertemos', 'despertéis', 'despierten'],
            'imperativo': ['despierta', 'despierte', 'despertemos', 'despertad', 'despierten']
        },
        // despertarse e→ie (代词式)
        'despertarse': {
            'presente': ['me despierto', 'te despiertas', 'se despierta', 'nos despertamos', 'os despertáis', 'se despiertan'],
            'preterito': ['me desperté', 'te despertaste', 'se despertó', 'nos despertamos', 'os despertasteis', 'se despertaron'],
            'imperfecto': ['me despertaba', 'te despertabas', 'se despertaba', 'nos despertábamos', 'os despertabais', 'se despertaban'],
            'futuro': ['me despertaré', 'te despertarás', 'se despertará', 'nos despertaremos', 'os despertaréis', 'se despertarán'],
            'condicional': ['me despertaría', 'te despertarías', 'se despertaría', 'nos despertaríamos', 'os despertaríais', 'se despertarían'],
            'subjuntivo': ['me despierte', 'te despiertes', 'se despierte', 'nos despertemos', 'os despertéis', 'se despierten'],
            'imperativo': ['despiértate', 'despiértese', 'despertémonos', 'despertaos', 'despiértense']
        },
        // morirse o→ue (代词式)
        'morirse': {
            'presente': ['me muero', 'te mueres', 'se muere', 'nos morimos', 'os morís', 'se mueren'],
            'preterito': ['me morí', 'te moriste', 'se murió', 'nos morimos', 'os moristeis', 'se murieron'],
            'imperfecto': ['me moría', 'te morías', 'se moría', 'nos moríamos', 'os moríais', 'se morían'],
            'futuro': ['me moriré', 'te morirás', 'se morirá', 'nos moriremos', 'os moriréis', 'se morirán'],
            'condicional': ['me moriría', 'te morirías', 'se moriría', 'nos moriríamos', 'os moriríais', 'se morirían'],
            'subjuntivo': ['me muera', 'te mueras', 'se muera', 'nos muramos', 'os muráis', 'se mueran'],
            'imperativo': ['muérete', 'muérase', 'murámonos', 'moríos', 'muéranse']
        },
        // caerse（代词式）— caer 基础+代词
        'caerse': {
            'presente': ['me caigo', 'te caes', 'se cae', 'nos caemos', 'os caéis', 'se caen'],
            'preterito': ['me caí', 'te caíste', 'se cayó', 'nos caímos', 'os caísteis', 'se cayeron'],
            'imperfecto': ['me caía', 'te caías', 'se caía', 'nos caíamos', 'os caíais', 'se caían'],
            'futuro': ['me caeré', 'te caerás', 'se caerá', 'nos caeremos', 'os caeréis', 'se caerán'],
            'condicional': ['me caería', 'te caerías', 'se caería', 'nos caeríamos', 'os caeríais', 'se caerían'],
            'subjuntivo': ['me caiga', 'te caigas', 'se caiga', 'nos caigamos', 'os caigáis', 'se caigan'],
            'imperativo': ['cáete', 'cáigase', 'caigámonos', 'caeos', 'cáiganse']
        },
        // irse（代词式 ir）
        'irse': {
            'presente': ['me voy', 'te vas', 'se va', 'nos vamos', 'os vais', 'se van'],
            'preterito': ['me fui', 'te fuiste', 'se fue', 'nos fuimos', 'os fuisteis', 'se fueron'],
            'imperfecto': ['me iba', 'te ibas', 'se iba', 'nos íbamos', 'os ibais', 'se iban'],
            'futuro': ['me iré', 'te irás', 'se irá', 'nos iremos', 'os iréis', 'se irán'],
            'condicional': ['me iría', 'te irías', 'se iría', 'nos iríamos', 'os iríais', 'se irían'],
            'subjuntivo': ['me vaya', 'te vayas', 'se vaya', 'nos vayamos', 'os vayáis', 'se vayan'],
            'imperativo': ['vete', 'váyase', 'vámonos', 'idos', 'váyanse']
        },
        // ponerse（代词式 poner）
        'ponerse': {
            'presente': ['me pongo', 'te pones', 'se pone', 'nos ponemos', 'os ponéis', 'se ponen'],
            'preterito': ['me puse', 'te pusiste', 'se puso', 'nos pusimos', 'os pusisteis', 'se pusieron'],
            'imperfecto': ['me ponía', 'te ponías', 'se ponía', 'nos poníamos', 'os poníais', 'se ponían'],
            'futuro': ['me pondré', 'te pondrás', 'se pondrá', 'nos pondremos', 'os pondréis', 'se pondrán'],
            'condicional': ['me pondría', 'te pondrías', 'se pondría', 'nos pondríamos', 'os pondríais', 'se pondrían'],
            'subjuntivo': ['me ponga', 'te pongas', 'se ponga', 'nos pongamos', 'os pongáis', 'se pongan'],
            'imperativo': ['ponte', 'póngase', 'pongámonos', 'poneos', 'pónganse']
        },
        // hacerse（代词式 hacer）
        'hacerse': {
            'presente': ['me hago', 'te haces', 'se hace', 'nos hacemos', 'os hacéis', 'se hacen'],
            'preterito': ['me hice', 'te hiciste', 'se hizo', 'nos hicimos', 'os hicisteis', 'se hicieron'],
            'imperfecto': ['me hacía', 'te hacías', 'se hacía', 'nos hacíamos', 'os hacíais', 'se hacían'],
            'futuro': ['me haré', 'te harás', 'se hará', 'nos haremos', 'os haréis', 'se harán'],
            'condicional': ['me haría', 'te harías', 'se haría', 'nos haríamos', 'os haríais', 'se harían'],
            'subjuntivo': ['me haga', 'te hagas', 'se haga', 'nos hagamos', 'os hagáis', 'se hagan'],
            'imperativo': ['hazte', 'hágase', 'hagámonos', 'haceos', 'háganse']
        },
        // reunirse — 重音变化（reún-）
        'reunirse': {
            'presente': ['me reúno', 'te reúnes', 'se reúne', 'nos reunimos', 'os reunís', 'se reúnen'],
            'preterito': ['me reuní', 'te reuniste', 'se reunió', 'nos reunimos', 'os reunisteis', 'se reunieron'],
            'imperfecto': ['me reunía', 'te reunías', 'se reunía', 'nos reuníamos', 'os reuníais', 'se reunían'],
            'futuro': ['me reuniré', 'te reunirás', 'se reunirá', 'nos reuniremos', 'os reuniréis', 'se reunirán'],
            'condicional': ['me reuniría', 'te reunirías', 'se reuniría', 'nos reuniríamos', 'os reuniríais', 'se reunirían'],
            'subjuntivo': ['me reúna', 'te reúnas', 'se reúna', 'nos reunamos', 'os reunáis', 'se reúnan'],
            'imperativo': ['reúnete', 'reúnase', 'reunámonos', 'reuníos', 'reúnanse']
        },
        // vestirse e→i (代词式)
        'vestirse': {
            'presente': ['me visto', 'te vistes', 'se viste', 'nos vestimos', 'os vestís', 'se visten'],
            'preterito': ['me vestí', 'te vestiste', 'se vistió', 'nos vestimos', 'os vestisteis', 'se vistieron'],
            'imperfecto': ['me vestía', 'te vestías', 'se vestía', 'nos vestíamos', 'os vestíais', 'se vestían'],
            'futuro': ['me vestiré', 'te vestirás', 'se vestirá', 'nos vestiremos', 'os vestiréis', 'se vestirán'],
            'condicional': ['me vestiría', 'te vestirías', 'se vestiría', 'nos vestiríamos', 'os vestiríais', 'se vestirían'],
            'subjuntivo': ['me vista', 'te vistas', 'se vista', 'nos vistamos', 'os vistáis', 'se vistan'],
            'imperativo': ['vístete', 'vístase', 'vistámonos', 'vestíos', 'vístanse']
        }
    };

    // 检查不规则动词时的查找顺序：
    //   1. 完整原形（含se，如 acostarse）
    //   2. 去se的词根（如 acostar → 但此时需要加代词前缀）
    //   3. 非代词式时直接用 infinitive
    function lookupIrregular(tense, pronounIndex) {
        // 优先查含 se 的完整原形（表里的值已经包含代词前缀）
        if (isReflexive && irregulars[infinitive] && irregulars[infinitive][tense]) {
            return irregulars[infinitive][tense][pronounIndex];
        }
        // 再查去掉 se 的词根，需要加代词前缀
        const base = isReflexive ? baseVerb : infinitive;
        if (irregulars[base] && irregulars[base][tense]) {
            const conjugated = irregulars[base][tense][pronounIndex];
            if (isReflexive) {
                return `${reflexivePronouns[pronoun]} ${conjugated}`;
            }
            return conjugated;
        }
        return null;
    }

    // 命令式：先查完整不规则表
    if (tense === 'imperativo') {
        const imperativoPronouns = ['tú', 'usted', 'nosotros', 'vosotros', 'ustedes'];
        const impIdx = imperativoPronouns.indexOf(pronoun);
        if (impIdx === -1) return 'N/A'; // yo 没有命令式

        const found = lookupIrregular('imperativo', impIdx);
        if (found !== null) return found;

        // 规则命令式：tú=3sg presente, usted/nosotros/ustedes=subjuntivo, vosotros=-d
        const imperativoEndings = {
            'ar': ['a', 'e', 'emos', 'ad', 'en'],
            'er': ['e', 'a', 'amos', 'ed', 'an'],
            'ir': ['e', 'a', 'amos', 'id', 'an']
        };
        const conjugated = stem + imperativoEndings[ending][impIdx];
        return isReflexive ? `${conjugated} ${reflexivePronouns[pronoun]}` : conjugated;
    }

    // 其他时态：查不规则表
    const pronounIndex = ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ustedes'].indexOf(pronoun);
    const found = lookupIrregular(tense, pronounIndex);
    if (found !== null) {
        return found;
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
let currentChallenge = null;
let currentDialogueData = [];
let currentB2Challenge = null;

function initSpeakingPractice() {
    // 先绑定所有事件监听器，确保按钮始终可用
    const scenarioSelect = document.getElementById('scenarioSelect');
    const newDialogueBtn = document.getElementById('newDialogueBtn');
    const newChallengeBtn = document.getElementById('newChallengeBtn');
    const showSampleBtn = document.getElementById('showSampleBtn');
    const b2TypeSelect = document.getElementById('b2TypeSelect');
    const newB2ChallengeBtn = document.getElementById('newB2ChallengeBtn');
    const showB2SampleBtn = document.getElementById('showB2SampleBtn');
    const speakB2Btn = document.getElementById('speakB2Btn');
    
    if (scenarioSelect) scenarioSelect.addEventListener('change', loadNewDialogue);
    if (newDialogueBtn) newDialogueBtn.addEventListener('click', loadNewDialogue);
    if (newChallengeBtn) newChallengeBtn.addEventListener('click', loadNewChallenge);
    if (showSampleBtn) showSampleBtn.addEventListener('click', showSampleAnswer);
    
    // B2 题型事件
    if (b2TypeSelect) b2TypeSelect.addEventListener('change', loadB2Challenge);
    if (newB2ChallengeBtn) newB2ChallengeBtn.addEventListener('click', loadB2Challenge);
    if (showB2SampleBtn) showB2SampleBtn.addEventListener('click', showB2SampleAnswer);
    if (speakB2Btn) speakB2Btn.addEventListener('click', speakB2Sample);
    
    // 然后加载初始内容（使用 try-catch 防止出错影响事件绑定）
    try {
        loadNewDialogue();
    } catch (e) {
        console.error('loadNewDialogue 出错:', e);
    }
    
    try {
        loadDailyChallenge();
    } catch (e) {
        console.error('loadDailyChallenge 出错:', e);
    }
    
    try {
        loadB2Challenge();
    } catch (e) {
        console.error('loadB2Challenge 出错:', e);
    }
}

function loadNewDialogue() {
    const scenario = document.getElementById('scenarioSelect').value;
    const scenarioData = dialogueScenarios[scenario];
    
    // 检查 scenarioData 是否存在
    if (!scenarioData) {
        console.error('找不到场景数据:', scenario);
        return;
    }
    
    // 检查是新的模板格式还是旧的静态格式
    let dialogue;
    if (scenarioData.templates) {
        // 新格式：从模板中随机选择一个
        const template = scenarioData.templates[Math.floor(Math.random() * scenarioData.templates.length)];
        dialogue = template.lines.map((line, index) => ({
            speaker: template.speakers[index % template.speakers.length],
            es: line.es,
            zh: line.zh
        }));
    } else {
        // 旧格式：直接选择对话
        const dialogues = scenarioData.dialogues;
        dialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
    }
    
    // 保存当前对话数据
    currentDialogueData = dialogue;

    const container = document.getElementById('dialogueContainer');
    
    // 构建对话行，每行带朗读按钮
    let dialogueHTML = '<div class="dialogue-lines">';
    
    dialogue.forEach((line, index) => {
        const isFemale = ['A', 'Cliente', 'Turista', 'Paciente', 'María', 'Vecino A', 'Ana', 'Padre', 'Amigo A', 'Pepa', 'Hija', 'Vecina', 'Camarera', 'Recepcionista', 'Doctora', 'Enfermera', 'Profesora', 'Cajera', 'Dependienta', 'Amiga', 'Madre', 'Novia', 'Esposa', 'Abuela', 'Tía', 'Suegra'].some(n => line.speaker.includes(n));
        const speakerClass = isFemale ? 'speaker' : 'speaker speaker-b';
        
        dialogueHTML += `
            <div class="dialogue-line-item" data-zh="${line.zh.replace(/"/g, '&quot;')}">
                <button type="button" class="speak-line-btn" data-text="${encodeURIComponent(line.es)}" title="朗读">🔊</button>
                <span class="${speakerClass}">${line.speaker}:</span>
                <span class="dialogue-es">${line.es}</span>
                <span class="translation">(${line.zh})</span>
            </div>
        `;
    });
    
    dialogueHTML += '</div>';
    
    container.innerHTML = dialogueHTML;

    bindSpeakLineButtons(container);

    // 添加右键翻译功能
    addRightClickTranslation();
}

function speakSpanishText(text, options = {}) {
    if (!text) return false;

    const rate = options.rate ?? 0.9;
    const pitch = options.pitch ?? 1;
    const volume = options.volume ?? 1;
    const responsiveVoiceName = options.responsiveVoiceName || 'Spanish Latin American Female';

    try {
        if ('speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined') {
            const synth = window.speechSynthesis;
            synth.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-ES';
            utterance.rate = rate;
            utterance.pitch = pitch;
            utterance.volume = volume;

            if (typeof synth.getVoices === 'function') {
                const voices = synth.getVoices();
                const spanishVoice = voices.find(voice => /^es([-_].+)?$/i.test(voice.lang))
                    || voices.find(voice => /spanish|español/i.test(voice.name));
                if (spanishVoice) {
                    utterance.voice = spanishVoice;
                }
            }

            synth.speak(utterance);
            return true;
        }
    } catch (error) {
        console.warn('浏览器语音朗读失败，尝试回退到 ResponsiveVoice：', error);
    }

    try {
        if (typeof responsiveVoice !== 'undefined' && typeof responsiveVoice.speak === 'function') {
            responsiveVoice.cancel();
            responsiveVoice.speak(text, responsiveVoiceName, {
                rate,
                pitch,
                volume
            });
            return true;
        }
    } catch (error) {
        console.warn('ResponsiveVoice 朗读失败：', error);
    }

    alert('当前浏览器暂时无法朗读，请换一个浏览器再试。');
    return false;
}

// 只用女声朗读
function speakLineFemale(text) {
    speakSpanishText(text, {
        rate: 0.9,
        pitch: 1.05,
        volume: 1,
        responsiveVoiceName: 'Spanish Latin American Female'
    });
}

function bindSpeakLineButtons(container) {
    const root = container || document.getElementById('dialogueContainer');
    if (!root) return;

    root.querySelectorAll('.speak-line-btn').forEach(btn => {
        btn.removeEventListener('click', handleSpeakButtonClick);
        btn.addEventListener('click', handleSpeakButtonClick);
    });
}

function handleSpeakButtonClick(e) {
    const speakBtn = e.currentTarget;
    if (!speakBtn) return;

    e.preventDefault();
    e.stopPropagation();

    speakBtn.classList.remove('is-speaking');
    void speakBtn.offsetWidth;
    speakBtn.classList.add('is-speaking');
    setTimeout(() => speakBtn.classList.remove('is-speaking'), 480);

    const encodedText = speakBtn.dataset.text || '';
    const text = encodedText ? decodeURIComponent(encodedText) : '';
    speakLineFemale(text);
}

function bindDialogueInteractions() {
    const container = document.getElementById('dialogueContainer');
    if (!container) return;

    container.removeEventListener('contextmenu', handleRightClick);
    container.addEventListener('contextmenu', handleRightClick);
}

// 添加右键翻译功能
function addRightClickTranslation() {
    bindDialogueInteractions();
}

function handleRightClick(e) {
    // 获取选中的文本
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    // 获取点击的对话行
    const lineItem = e.target.closest('.dialogue-line-item');
    
    // 如果没有点击到对话行，不处理
    if (!lineItem) return;
    
    // 如果用户选中了文本，不阻止默认菜单，让 macOS 自带翻译功能可用
    if (selectedText) {
        return; // 允许系统默认右键菜单（包含翻译选项）
    }
    
    // 只在对话区域内且没有选中文本时，阻止默认菜单并显示整句翻译
    e.preventDefault();
    
    // 移除旧的提示框
    const oldTooltip = document.getElementById('translation-tooltip');
    if (oldTooltip) oldTooltip.remove();
    
    // 没有选中文字，使用整行的翻译
    const translation = lineItem.getAttribute('data-zh');
    
    if (!translation) return;
    
    // 创建提示框
    const tooltip = document.createElement('div');
    tooltip.id = 'translation-tooltip';
    tooltip.textContent = translation;
    tooltip.style.cssText = `
        position: fixed;
        background: #333;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        left: ${e.clientX}px;
        top: ${e.clientY}px;
    `;
    
    document.body.appendChild(tooltip);
    
    // 点击其他地方关闭
    setTimeout(() => {
        document.addEventListener('click', function closeTooltip() {
            tooltip.remove();
            document.removeEventListener('click', closeTooltip);
        }, { once: true });
    }, 100);
}

// 加载每日推荐场景
function loadDailyChallenge() {
    currentChallenge = getDailyScenario();
    if (!currentChallenge) {
        console.log('无法加载每日挑战');
        return;
    }
    displayChallenge(currentChallenge);
    // 隐藏参考口语
    document.getElementById('sampleAnswerBox').style.display = 'none';
    document.getElementById('showSampleBtn').textContent = '查看参考口语';
    document.getElementById('showSampleBtn').style.display = 'inline-block';
}

// 加载随机新话题
function loadNewChallenge() {
    // 检查 speakingChallenges 是否已加载
    if (typeof speakingChallenges === 'undefined' || !speakingChallenges || speakingChallenges.length === 0) {
        console.log('speakingChallenges 尚未加载');
        return;
    }
    
    let newChallenge;
    do {
        newChallenge = speakingChallenges[Math.floor(Math.random() * speakingChallenges.length)];
    } while (newChallenge === currentChallenge);
    currentChallenge = newChallenge;
    displayChallenge(currentChallenge);
    // 隐藏参考口语
    document.getElementById('sampleAnswerBox').style.display = 'none';
    document.getElementById('showSampleBtn').textContent = '查看参考口语';
    document.getElementById('showSampleBtn').style.display = 'inline-block';
}

// 显示挑战内容
function displayChallenge(challenge) {
    if (!challenge) {
        console.error('challenge 为空');
        return;
    }
    
    // 使用更精确的选择器，选择今日口语挑战框中的元素
    const topicEl = document.querySelector('#speakingChallenge .challenge-topic');
    const hintEl = document.querySelector('#speakingChallenge .challenge-hint');
    const sampleEl = document.querySelector('#sampleAnswerBox .sample-text');
    
    if (topicEl) topicEl.textContent = challenge.topic;
    if (hintEl) hintEl.textContent = `关键词：${challenge.hint}`;
    if (sampleEl) sampleEl.textContent = challenge.sample;
    
    // 渲染互动练习
    if (challenge.exercises) {
        renderExercises(challenge.exercises);
    }
}

// 渲染互动练习
function renderExercises(exercises) {
    let container = document.getElementById('exerciseContainer');
    if (!container) {
        // 如果不存在，创建容器
        const challengeBox = document.getElementById('speakingChallenge');
        container = document.createElement('div');
        container.id = 'exerciseContainer';
        container.className = 'exercise-container';
        challengeBox.appendChild(container);
    }
    
    container.innerHTML = '<h4>✏️ 互动练习：看中文，写西语</h4>';
    
    exercises.forEach((ex, index) => {
        const exerciseEl = document.createElement('div');
        exerciseEl.className = 'exercise-item';
        exerciseEl.innerHTML = `
            <div class="exercise-zh">${index + 1}. ${ex.zh}</div>
            <div class="exercise-hint">提示词：${ex.hint}</div>
            <div class="exercise-input-group">
                <input type="text" class="exercise-input" id="exercise-${index}" placeholder="输入西语..." autocomplete="off">
                <button class="btn btn-small" onclick="checkExercise(${index}, '${ex.es.replace(/'/g, "\\'")}')">检查</button>
                <button class="btn btn-small btn-secondary" onclick="showExerciseAnswer(${index}, '${ex.es.replace(/'/g, "\\'")}')">显示答案</button>
            </div>
            <div class="exercise-feedback" id="feedback-${index}"></div>
        `;
        container.appendChild(exerciseEl);
    });
}

// 检查练习答案
function checkExercise(index, correctAnswer) {
    const input = document.getElementById(`exercise-${index}`);
    const feedback = document.getElementById(`feedback-${index}`);
    const userAnswer = input.value.trim().toLowerCase();
    const correct = correctAnswer.toLowerCase();
    
    if (userAnswer === '') {
        feedback.innerHTML = '<span class="feedback-hint">请输入答案</span>';
        return;
    }
    
    if (userAnswer === correct) {
        feedback.innerHTML = '<span class="feedback-correct">✅ 正确！</span>';
        input.classList.add('correct');
        input.classList.remove('incorrect');
    } else {
        feedback.innerHTML = '<span class="feedback-wrong">❌ 不正确，再试试</span>';
        input.classList.add('incorrect');
        input.classList.remove('correct');
    }
}

// 显示练习答案
function showExerciseAnswer(index, answer) {
    const input = document.getElementById(`exercise-${index}`);
    const feedback = document.getElementById(`feedback-${index}`);
    input.value = answer;
    feedback.innerHTML = '<span class="feedback-answer">💡 答案：' + answer + '</span>';
    input.classList.remove('incorrect');
}

// 显示/隐藏参考口语
function showSampleAnswer() {
    const sampleBox = document.getElementById('sampleAnswerBox');
    const btn = document.getElementById('showSampleBtn');
    if (sampleBox.style.display === 'none') {
        sampleBox.style.display = 'block';
        btn.textContent = '隐藏参考口语';
    } else {
        sampleBox.style.display = 'none';
        btn.textContent = '查看参考口语';
    }
}

// 根据名字判断性别
function getGenderByName(name) {
    const femaleNames = ['María', 'Ana', 'Pepa', 'Vecina', 'Camarera', 'Recepcionista', 'Doctora', 'Enfermera', 'Profesora', 'Cajera', 'Dependienta', 'Vecino A', 'Amiga', 'Madre', 'Hija', 'Novia', 'Esposa', 'Abuela', 'Tía', 'Suegra'];
    const maleNames = ['Carlos', 'Luis', 'Pedro', 'Juan', 'Miguel', 'Antonio', 'José', 'Francisco', 'Manuel', 'Javier', 'David', 'Daniel', 'Alejandro', 'Pablo', 'Sergio', 'Andrés', 'Fernando', 'Jorge', 'Alberto', 'Vecino B', 'Camarero', 'Recepcionista', 'Doctor', 'Enfermero', 'Profesor', 'Cajero', 'Dependiente', 'Amigo', 'Padre', 'Hijo', 'Novio', 'Esposo', 'Abuelo', 'Tío', 'Suegro'];
    
    if (femaleNames.some(n => name.includes(n))) return 'female';
    if (maleNames.some(n => name.includes(n))) return 'male';
    return 'unknown';
}

// 获取西班牙语音色
let cachedVoices = null;

function loadVoices() {
    if (!cachedVoices) {
        cachedVoices = window.speechSynthesis.getVoices();
    }
    return cachedVoices;
}

// 在 voiceschanged 事件中更新缓存
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        cachedVoices = window.speechSynthesis.getVoices();
    };
}

function getSpanishVoice(gender) {
    const voices = loadVoices();
    // 优先选择西班牙语声音
    const spanishVoices = voices.filter(v => v.lang.startsWith('es'));
    
    if (spanishVoices.length === 0) return null;
    
    // 根据性别选择声音 - 优先选择更高质量的声音
    if (gender === 'female') {
        // 选择女声 - 优先选择更自然的音色（Google/Microsoft的高质量声音）
        const femaleVoice = spanishVoices.find(v => 
            /monica|helena|laura|paulina|carmen|isabella|elena|sabina|sofia|valentina|camila/i.test(v.name)
        ) || spanishVoices.find(v => v.name.includes('Google') || v.name.includes('Microsoft'));
        return femaleVoice || spanishVoices[0];
    } else if (gender === 'male') {
        // 选择男声 - 优先选择更自然的音色
        const maleVoice = spanishVoices.find(v => 
            /diego|carlos|antonio|roberto|juan|miguel|luis|pedro|jorge|mateo|alejandro/i.test(v.name)
        ) || spanishVoices.find(v => v.name.includes('Google') || v.name.includes('Microsoft'));
        // 如果找不到特定男声，使用第二个声音（通常是男声）
        return maleVoice || spanishVoices[1] || spanishVoices[0];
    }
    
    // 默认返回第一个高质量声音
    return spanishVoices.find(v => v.name.includes('Google') || v.name.includes('Microsoft')) || spanishVoices[0];
}

function speakLine(text, speakerName) {
    // 使用 ResponsiveVoice 获得更自然的语音
    if (typeof responsiveVoice !== 'undefined') {
        // 取消之前的语音
        responsiveVoice.cancel();
        
        // 根据说话人性别选择声音
        const gender = speakerName ? getGenderByName(speakerName) : 'unknown';
        
        // 选择声音：Spanish Female 或 Spanish Male
        let voice = 'Spanish Latin American Female'; // 默认女声
        if (gender === 'male') {
            voice = 'Spanish Latin American Male';
        }
        
        // 使用 ResponsiveVoice 播放
        responsiveVoice.speak(text, voice, {
            rate: 0.9,
            pitch: 1,
            volume: 1
        });
    } else if ('speechSynthesis' in window) {
        // 备用：使用浏览器原生 TTS
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 1.0;
        
        const gender = speakerName ? getGenderByName(speakerName) : 'unknown';
        const voice = getSpanishVoice(gender);
        if (voice) {
            utterance.voice = voice;
        }
        
        if (gender === 'female') {
            utterance.pitch = 1.1;
        } else if (gender === 'male') {
            utterance.pitch = 0.9;
        } else {
            utterance.pitch = 1;
        }
        
        window.speechSynthesis.speak(utterance);
    } else {
        alert('您的浏览器不支持语音朗读功能');
    }
}

function speakAll() {
    if (currentDialogueData.length === 0) return;
    
    let index = 0;

    function speakNext() {
        if (index < currentDialogueData.length) {
            const line = currentDialogueData[index];
            
            // 使用 ResponsiveVoice
            if (typeof responsiveVoice !== 'undefined') {
                const gender = getGenderByName(line.speaker);
                let voice = 'Spanish Latin American Female';
                if (gender === 'male') {
                    voice = 'Spanish Latin American Male';
                }
                
                responsiveVoice.speak(line.es, voice, {
                    rate: 0.9,
                    pitch: 1,
                    volume: 1,
                    onend: () => {
                        index++;
                        setTimeout(speakNext, 100);
                    }
                });
            } else if ('speechSynthesis' in window) {
                // 备用方案
                const utterance = new SpeechSynthesisUtterance(line.es);
                utterance.lang = 'es-ES';
                utterance.rate = 1.0;
                
                const gender = getGenderByName(line.speaker);
                const voice = getSpanishVoice(gender);
                if (voice) {
                    utterance.voice = voice;
                }
                
                if (gender === 'female') {
                    utterance.pitch = 1.1;
                } else if (gender === 'male') {
                    utterance.pitch = 0.9;
                } else {
                    utterance.pitch = 1;
                }
                
                utterance.onend = () => {
                    index++;
                    setTimeout(speakNext, 150);
                };
                window.speechSynthesis.speak(utterance);
            }
        }
    }

    if (typeof responsiveVoice !== 'undefined') {
        responsiveVoice.cancel();
    } else {
        window.speechSynthesis.cancel();
    }
    speakNext();
}

// ============ B2 口语考试功能 ============
function loadB2Challenge() {
    // 检查 speakingChallenges 是否已加载
    if (typeof speakingChallenges === 'undefined' || !speakingChallenges || speakingChallenges.length === 0) {
        console.log('speakingChallenges 尚未加载');
        return;
    }
    
    const typeSelect = document.getElementById('b2TypeSelect');
    if (!typeSelect) return;
    
    const type = typeSelect.value;
    
    // 根据类型筛选题目
    let filteredChallenges;
    if (type === 'all') {
        filteredChallenges = speakingChallenges.filter(c => c.type && c.type.startsWith('b2_'));
    } else {
        filteredChallenges = speakingChallenges.filter(c => c.type === type);
    }
    
    if (filteredChallenges.length === 0) {
        filteredChallenges = speakingChallenges.filter(c => c.type && c.type.startsWith('b2_'));
    }
    
    if (filteredChallenges.length === 0) {
        console.log('没有找到 B2 题型');
        return;
    }
    
    // 随机选择一个题目
    let newChallenge;
    do {
        newChallenge = filteredChallenges[Math.floor(Math.random() * filteredChallenges.length)];
    } while (newChallenge === currentB2Challenge && filteredChallenges.length > 1);
    
    currentB2Challenge = newChallenge;
    
    // 显示题目
    const topicEl = document.querySelector('#b2ChallengeBox .challenge-topic');
    const hintEl = document.querySelector('#b2ChallengeBox .challenge-hint');
    
    if (topicEl) topicEl.textContent = currentB2Challenge.topic;
    if (hintEl) hintEl.textContent = `关键词：${currentB2Challenge.hint}`;
    
    // 隐藏参考范文
    const sampleBox = document.getElementById('b2SampleAnswerBox');
    const showBtn = document.getElementById('showB2SampleBtn');
    if (sampleBox) sampleBox.style.display = 'none';
    if (showBtn) showBtn.textContent = '查看参考范文';
}

function showB2SampleAnswer() {
    if (!currentB2Challenge) return;
    
    const sampleBox = document.getElementById('b2SampleAnswerBox');
    const btn = document.getElementById('showB2SampleBtn');
    
    if (!sampleBox || !btn) return;
    
    if (sampleBox.style.display === 'none') {
        const sampleText = document.querySelector('#b2SampleAnswerBox .sample-text');
        if (sampleText) sampleText.textContent = currentB2Challenge.sample;
        sampleBox.style.display = 'block';
        btn.textContent = '隐藏参考范文';
    } else {
        sampleBox.style.display = 'none';
        btn.textContent = '查看参考范文';
    }
}

function speakB2Sample() {
    if (!currentB2Challenge || !currentB2Challenge.sample) {
        console.log('没有可朗读的内容');
        return;
    }

    speakSpanishText(currentB2Challenge.sample, {
        rate: 0.85,
        pitch: 1,
        volume: 1,
        responsiveVoiceName: 'Spanish Latin American Female'
    });
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
            const totalForms = stats.forms || (stats.count * 6);
            const accuracy = totalForms > 0 ? Math.round((stats.correct / totalForms) * 100) : 0;
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
    const verbType = getVerbTypeLabel(currentVerb, currentTense);
    document.getElementById('reviewVerbInfinitive').textContent = `${currentVerb.inf}${verbType ? ` ${verbType}` : ''}`;
    document.getElementById('reviewVerbMeaning').textContent = currentVerb.meaning;
    document.getElementById('reviewVerbTense').textContent = tenses[currentTense].name;
    
    // 显示时态规则和不规则动词列表
    const tenseInfo = tenses[currentTense];
    const ruleBox = document.getElementById('reviewTenseRuleBox');
    
    let ruleHTML = `<div class="tense-rule"><strong>变位规则：</strong>${tenseInfo.rule || '无'}</div>`;
    
    // 添加该时态的不规则动词列表
    const irregularList = irregularVerbsByTense[currentTense];
    if (irregularList && irregularList.length > 0) {
        ruleHTML += `<div class="irregular-verbs"><strong>${getIrregularListLabel(currentTense)}：</strong>${irregularList.join(', ')}</div>`;
    }
    
    ruleBox.innerHTML = ruleHTML;
    
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
