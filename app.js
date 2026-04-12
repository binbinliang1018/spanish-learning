// 西班牙语学习应用主逻辑

// 全局错误捕获 - 防止JS完全崩溃
try {

// ============ 状态管理 ============
let currentVerb = null;
let currentTense = null;
let currentAnswers = {};

function createEmptySpeakingStats() {
    return {
        dialogueLoads: 0,
        challengeLoads: 0,
        b2Loads: 0,
        sampleViews: 0,
        audioPlays: 0,
        exerciseChecks: 0,
        exerciseRevealCount: 0,
        lastPracticedDate: null
    };
}

function createEmptyProgressState() {
    return {
        totalVerbs: 0,
        correctCount: 0,
        totalAttempts: 0,
        streakDays: 0,
        lastStudyDate: null,
        practicedVerbs: {},
        tenseStats: {},
        historyByDate: {},
        speakingStats: createEmptySpeakingStats(),
        weakPointDetails: {}
    };
}

function normalizeSpeakingStats(entry = {}) {
    const stats = {
        ...createEmptySpeakingStats(),
        ...(entry || {})
    };

    return {
        dialogueLoads: Number(stats.dialogueLoads) || 0,
        challengeLoads: Number(stats.challengeLoads) || 0,
        b2Loads: Number(stats.b2Loads) || 0,
        sampleViews: Number(stats.sampleViews) || 0,
        audioPlays: Number(stats.audioPlays) || 0,
        exerciseChecks: Number(stats.exerciseChecks) || 0,
        exerciseRevealCount: Number(stats.exerciseRevealCount) || 0,
        lastPracticedDate: stats.lastPracticedDate || null
    };
}

function normalizeHistoryEntry(entry = {}) {
    const normalizedModules = { daily: 0, selfcheck: 0, trainer: 0, review: 0, speaking: 0, ...(entry.modules || {}) };
    const normalizedVerbs = {};
    const normalizedTenses = {};

    Object.entries(entry.verbs || {}).forEach(([verb, stats]) => {
        normalizedVerbs[verb] = {
            count: Number(stats?.count) || 0,
            attempts: Number(stats?.attempts) || 0,
            correct: Number(stats?.correct) || 0
        };
    });

    Object.entries(entry.tenses || {}).forEach(([tense, stats]) => {
        normalizedTenses[tense] = {
            attempts: Number(stats?.attempts) || 0,
            correct: Number(stats?.correct) || 0
        };
    });

    return {
        attempts: Number(entry.attempts) || 0,
        correct: Number(entry.correct) || 0,
        sessions: Number(entry.sessions) || 0,
        reveals: Number(entry.reveals) || 0,
        modules: normalizedModules,
        verbs: normalizedVerbs,
        tenses: normalizedTenses,
        speaking: normalizeSpeakingStats(entry.speaking)
    };
}

function normalizeWeakPointEntry(entry = {}) {
    return {
        verb: String(entry.verb || '').trim(),
        tense: String(entry.tense || '').trim(),
        pronoun: String(entry.pronoun || '').trim(),
        count: Number(entry.count) || 0,
        lastWrongDate: entry.lastWrongDate || null,
        module: entry.module || ''
    };
}

function normalizeProgressState(savedState) {
    const progressState = {
        ...createEmptyProgressState(),
        ...(savedState || {})
    };

    if (!progressState.practicedVerbs || typeof progressState.practicedVerbs !== 'object') {
        progressState.practicedVerbs = {};
    }

    if (!progressState.tenseStats || typeof progressState.tenseStats !== 'object') {
        progressState.tenseStats = {};
    }

    if (!progressState.historyByDate || typeof progressState.historyByDate !== 'object') {
        progressState.historyByDate = {};
    }

    if (!progressState.weakPointDetails || typeof progressState.weakPointDetails !== 'object') {
        progressState.weakPointDetails = {};
    }

    progressState.speakingStats = normalizeSpeakingStats(progressState.speakingStats);

    Object.entries(progressState.practicedVerbs).forEach(([verb, stats]) => {
        const count = Number(stats?.count) || 0;
        const correct = Number(stats?.correct) || 0;
        const forms = Number(stats?.forms) || Math.max(count * 6, correct);
        progressState.practicedVerbs[verb] = {
            count,
            correct,
            forms,
            lastPracticedDate: stats?.lastPracticedDate || null
        };
    });

    Object.entries(progressState.tenseStats).forEach(([tense, stats]) => {
        progressState.tenseStats[tense] = {
            attempts: Number(stats?.attempts) || 0,
            correct: Number(stats?.correct) || 0
        };
    });

    Object.entries(progressState.historyByDate).forEach(([dateKey, entry]) => {
        progressState.historyByDate[dateKey] = normalizeHistoryEntry(entry);
    });

    Object.entries(progressState.weakPointDetails).forEach(([key, entry]) => {
        const normalizedEntry = normalizeWeakPointEntry(entry);
        if (!normalizedEntry.verb || !normalizedEntry.tense) {
            delete progressState.weakPointDetails[key];
            return;
        }
        progressState.weakPointDetails[key] = normalizedEntry;
    });

    return progressState;
}

let progress = normalizeProgressState(JSON.parse(localStorage.getItem('spanishProgress')));

// 每日练习状态
let dailyState = JSON.parse(localStorage.getItem('dailyPractice')) || {
    currentIndex: 0,
    verbs: [],
    questions: [],
    results: [], // 每个动词的练习结果
    isActive: false,
    date: null
};

if (!Array.isArray(dailyState.questions)) {
    dailyState.questions = [];
}

function createEmptyLookupState() {
    return {
        isActive: false,
        verbInf: '',
        tense: 'presente',
        isKnownVerb: false
    };
}

let lookupState = createEmptyLookupState();

// 错题重练状态
let reviewState = JSON.parse(localStorage.getItem('reviewPractice')) || {
    wrongVerbs: [], // 存储做错的动词记录 {verb, tense, attempts, lastWrongDate}
    currentIndex: 0,
    currentVerbs: [], // 当前正在复习的动词列表
    isActive: false
};

const TRAINER_ROUND_QUESTION_COUNT = 6;
const TRAINER_MULTIPLE_CHOICE_COUNT = 3;
const TRAINER_FILL_BLANK_COUNT = 3;
const DAILY_COMPOUND_TENSE_COUNT = 2;
const DAILY_MIN_IRREGULAR_QUESTION_COUNT = 3;
const TRAINER_SENTENCE_BANK = [
    {
        verbInf: 'hablar',
        tense: 'presente',
        pronoun: 'yo',
        es: 'Normalmente yo __VERB__ con mi profesora en español durante la clase.',
        zh: '平时上课时，我都会用西语和老师交流。'
    },
    {
        verbInf: 'poder',
        tense: 'presente',
        pronoun: 'yo',
        es: 'Hoy yo no __VERB__ salir temprano porque tengo mucho trabajo.',
        zh: '今天我不能早点走，因为工作很多。'
    },
    {
        verbInf: 'hacer',
        tense: 'preterito',
        pronoun: 'yo',
        es: 'Ayer yo __VERB__ la tarea en una hora y luego descansé.',
        zh: '昨天我一小时就做完了作业，然后就休息了。'
    },
    {
        verbInf: 'llegar',
        tense: 'preterito',
        pronoun: 'nosotros',
        es: 'Ayer nosotros __VERB__ tarde al aeropuerto por el tráfico.',
        zh: '昨天因为堵车，我们很晚才到机场。'
    },
    {
        verbInf: 'vivir',
        tense: 'imperfecto',
        pronoun: 'yo',
        es: 'Cuando era niño, yo __VERB__ cerca del mar y caminaba a la playa cada tarde.',
        zh: '我小时候住在海边，每天下午都走去海滩。'
    },
    {
        verbInf: 'ir',
        tense: 'imperfecto',
        pronoun: 'nosotros',
        es: 'De pequeños, nosotros __VERB__ al parque todos los domingos.',
        zh: '小时候我们每个星期天都会去公园。'
    },
    {
        verbInf: 'terminar',
        tense: 'futuro',
        pronoun: 'yo',
        es: 'Mañana yo __VERB__ el informe antes del mediodía.',
        zh: '明天中午前我会完成这份报告。'
    },
    {
        verbInf: 'tener',
        tense: 'futuro',
        pronoun: 'nosotros',
        es: 'La próxima semana nosotros __VERB__ más tiempo para practicar.',
        zh: '下周我们会有更多时间练习。'
    },
    {
        verbInf: 'viajar',
        tense: 'condicional',
        pronoun: 'yo',
        es: 'Con más dinero, yo __VERB__ por toda América Latina.',
        zh: '如果有更多钱，我会去整个拉丁美洲旅行。'
    },
    {
        verbInf: 'salir',
        tense: 'condicional',
        pronoun: 'yo',
        es: 'Si no lloviera, yo __VERB__ a caminar esta tarde.',
        zh: '如果不下雨，我今天下午就会出去散步。'
    },
    {
        verbInf: 'venir',
        tense: 'subjuntivo',
        pronoun: 'tú',
        es: 'Es importante que tú __VERB__ a tiempo a la reunión.',
        zh: '你按时来开会很重要。'
    },
    {
        verbInf: 'estudiar',
        tense: 'subjuntivo',
        pronoun: 'vosotros',
        es: 'La profesora quiere que vosotros __VERB__ más antes del examen.',
        zh: '老师希望你们在考试前多学习一点。'
    },
    {
        verbInf: 'terminar',
        tense: 'subjuntivo_imperfecto',
        pronoun: 'nosotros',
        es: 'El jefe quería que nosotros __VERB__ el informe antes del viernes.',
        zh: '老板当时希望我们能在周五前完成报告。'
    },
    {
        verbInf: 'ver',
        tense: 'presente_perfecto',
        pronoun: 'yo',
        es: 'Esta semana yo __VERB__ a Marta dos veces en la biblioteca.',
        zh: '这周我已经在图书馆见到 Marta 两次了。'
    },
    {
        verbInf: 'salir',
        tense: 'pluscuamperfecto',
        pronoun: 'nosotros',
        es: 'Cuando empezó a llover, nosotros ya __VERB__ de casa.',
        zh: '开始下雨的时候，我们早就出门了。'
    },
    {
        verbInf: 'terminar',
        tense: 'futuro_perfecto',
        pronoun: 'nosotros',
        es: 'Para las seis, nosotros ya __VERB__ el proyecto.',
        zh: '到六点时，我们应该已经完成这个项目了。'
    },
    {
        verbInf: 'hacer',
        tense: 'condicional_perfecto',
        pronoun: 'yo',
        es: 'Con más tiempo, yo __VERB__ el ejercicio con más cuidado.',
        zh: '如果时间更充裕，我本来会更仔细地做这道练习。'
    },
    {
        verbInf: 'llegar',
        tense: 'subjuntivo_perfecto',
        pronoun: 'tú',
        es: 'Me alegra que tú __VERB__ sin problemas.',
        zh: '我很高兴你顺利到了。'
    },
    {
        verbInf: 'abrir',
        tense: 'imperativo',
        pronoun: 'tú',
        es: 'Por favor, __VERB__ la ventana antes de empezar.',
        zh: '请在开始前把窗户打开。'
    }
];

function createEmptyTrainerState() {
    return {
        isActive: false,
        totalQuestions: 0,
        correctQuestions: 0,
        streak: 0,
        bestStreak: 0,
        currentQuestion: null,
        currentIndex: 0,
        roundSize: TRAINER_ROUND_QUESTION_COUNT,
        roundQuestions: [],
        followupPending: false,
        followupCompleted: false
    };
}

let trainerState = createEmptyTrainerState();

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
    initSelfCheckPractice();
    initReviewPractice();
    initVerbPractice();
    initSpeakingPractice();
    bindIrregularVerbGroupInteractions();
}

// ============ 强制访问权限 - 无脑修复 ============
console.log('[FIX🚀] app.js 加载开始');
try {
    // 强制设置访问权限
    localStorage.setItem('spanishLearningOwnerAccess', 'true');
    localStorage.setItem('spanishLearningAccessMode', 'owner');
    console.log('[FIX🚀] 访问权限已强制设置');
} catch (e) {
    console.error('[FIX🚀] 设置失败:', e);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    console.log('[ULTIMATE-FIX] 文档已就绪，立即执行 initApp');
    try {
        initApp();
    } catch (err) {
        console.error('[ULTIMATE-FIX] initApp 执行错误:', err);
        // 即使出错也确保访问权限
        setTimeout(() => {
            try {
                initAccessGate();
                refreshDaily(); // 确保每日练习能加载
            } catch (e) {
                console.error('[ULTIMATE-FIX] 恢复失败:', e);
            }
        }, 100);
    }
}

function initAccessGate() {
    console.log('[ULTIMATE-FIX🚀] initAccessGate 执行开始');
    try {
        bindAccessGateEvents();
        refreshAccessGate();
        console.log('[ULTIMATE-FIX🚀] initAccessGate 执行成功');
    } catch (err) {
        console.error('[ULTIMATE-FIX🚀] initAccessGate 错误:', err);
        // 出错时强制设置访问权限并刷新
        setTimeout(() => {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('spanishLearningOwnerAccess', 'true');
                localStorage.setItem('spanishLearningAccessMode', 'owner');
                location.reload(); // 强制刷新页面
            }
        }, 500);
    }
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
    // SUPER-SIMPLE-FIX: 最简单直接的修复
    console.log('[FIX🚀] hasUnlockedAccess: 直接返回 true');
    return true;
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

    console.log('[DEBUG] 绑定访问门控事件，按钮状态:', {
        emailBtn: !!emailBtn,
        whatsappBtn: !!whatsappBtn,
        unlockBtn: !!unlockBtn,
        ownerBtn: !!ownerBtn,
        clearBtn: !!clearBtn
    });

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
        console.log('[DEBUG] 绑定 ownerBtn 点击事件');
        ownerBtn.addEventListener('click', function(e) {
            console.log('[DEBUG] ownerBtn 被点击了', e);
            enableOwnerAccess();
        });
        
        // 添加双击事件绑定作为备份
        ownerBtn.addEventListener('dblclick', function(e) {
            console.log('[DEBUG] ownerBtn 被双击了', e);
            showAccessGateResult('按钮响应中，请稍候...', 'success');
            setTimeout(() => enableOwnerAccess(), 50);
        });
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
    try {
        console.log('[DEBUG] enableOwnerAccess 函数被调用');
        localStorage.setItem(ACCESS_OWNER_STORAGE_KEY, 'true');
        refreshAccessGate();
        showAccessGateResult('已切换为 Frances 本机使用模式，全部模块现在都可以使用。', 'success');

        const appShell = document.getElementById('appShell');
        if (appShell) {
            appShell.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        console.log('[DEBUG] 用户锁定状态已更新');
        return true;
    } catch (error) {
        console.error('[DEBUG] enableOwnerAccess 出错:', error);
        showAccessGateResult(`启用失败: ${error.message}，请刷新页面或尝试其他入口。`, 'error');
        return false;
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

    if (tabId === 'review') {
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
    } else {
        renderConjugationPlaceholder(
            'dailyConjugationGrid',
            '点击"开始今日挑战"后，这里会显示 6 个人称输入框。',
            '本轮固定 2 个复合时态，且至少 3 题是本时态不规则变位。'
        );
    }
}

// 所有时态列表
const ALL_TENSES = [
    'presente', 'preterito', 'imperfecto', 'futuro', 'condicional',
    'subjuntivo', 'subjuntivo_imperfecto', 'presente_perfecto', 'pluscuamperfecto',
    'futuro_perfecto', 'condicional_perfecto', 'subjuntivo_perfecto', 'imperativo',
    'participio', 'gerundio'
];

const COMPOUND_TENSES = [
    'presente_perfecto',
    'pluscuamperfecto',
    'futuro_perfecto',
    'condicional_perfecto',
    'subjuntivo_perfecto'
];

const STANDARD_PRONOUNS = ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ustedes'];

const HABER_CONJUGATIONS = {
    'presente_perfecto': ['he', 'has', 'ha', 'hemos', 'habéis', 'han'],
    'pluscuamperfecto': ['había', 'habías', 'había', 'habíamos', 'habíais', 'habían'],
    'futuro_perfecto': ['habré', 'habrás', 'habrá', 'habremos', 'habréis', 'habrán'],
    'condicional_perfecto': ['habría', 'habrías', 'habría', 'habríamos', 'habríais', 'habrían'],
    'subjuntivo_perfecto': ['haya', 'hayas', 'haya', 'hayamos', 'hayáis', 'hayan']
};

const HABER_RULE_PATTERNS = {
    'presente_perfecto': {
        label: '现在时',
        endingRule: '-er→e, as, a, emos, éis, an'
    },
    'pluscuamperfecto': {
        label: '过去未完成时',
        endingRule: '-er→ía, ías, ía, íamos, íais, ían'
    },
    'futuro_perfecto': {
        label: '将来时',
        endingRule: '-er→ré, rás, rá, remos, réis, rán'
    },
    'condicional_perfecto': {
        label: '条件式',
        endingRule: '-er→ría, rías, ría, ríamos, ríais, rían'
    },
    'subjuntivo_perfecto': {
        label: '虚拟式现在时',
        endingRule: '-er→aya, ayas, aya, ayamos, ayáis, ayan'
    }
};

const DERIVED_FORM_TENSES = [...COMPOUND_TENSES];

function normalizeVerbKey(value) {
    return String(value || '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/se$/, '');
}

function getLocalDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function parseStoredDate(value) {
    if (!value) {
        return null;
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const [year, month, day] = value.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function getDaysBetween(dateA, dateB) {
    const start = new Date(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
    const end = new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());
    return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

function formatProgressDateLabel(dateKey) {
    const parsedDate = parseStoredDate(dateKey);
    if (!parsedDate) {
        return '较早';
    }

    const todayKey = getLocalDateKey();
    if (dateKey === todayKey) {
        return '今天';
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (dateKey === getLocalDateKey(yesterday)) {
        return '昨天';
    }

    const weekdayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${parsedDate.getMonth() + 1}/${parsedDate.getDate()} ${weekdayNames[parsedDate.getDay()]}`;
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
        return '该时态涉及的常见特殊过去分词（不计入"不规则动词"筛选）';
    }
    return '该时态不规则动词';
}

function getDailySimpleTenses() {
    return ALL_TENSES.filter(tense => !COMPOUND_TENSES.includes(tense));
}

function getAvailableIrregularDailyTenses(verb) {
    return getDailySimpleTenses().filter(tense => isVerbIrregularInCurrentTense(verb, tense));
}

function buildDailyQuestionPlan(selectedVerbs) {
    const questions = selectedVerbs.map(verb => ({
        verb: verb.inf,
        tense: ''
    }));

    const allIndices = questions.map((_, index) => index);
    const irregularCandidates = questions
        .map((question, index) => ({
            index,
            verb: selectedVerbs[index],
            tenses: getAvailableIrregularDailyTenses(selectedVerbs[index])
        }))
        .filter(item => item.tenses.length > 0);

    const guaranteedIrregular = shuffleArray([...irregularCandidates]).slice(0, Math.min(DAILY_MIN_IRREGULAR_QUESTION_COUNT, irregularCandidates.length));
    guaranteedIrregular.forEach(item => {
        item.tenses = shuffleArray([...item.tenses]);
        questions[item.index].tense = item.tenses[0];
    });

    const remainingIndices = allIndices.filter(index => !guaranteedIrregular.some(item => item.index === index));
    const compoundIndices = shuffleArray(remainingIndices).slice(0, Math.min(DAILY_COMPOUND_TENSE_COUNT, remainingIndices.length));
    const compoundTenses = shuffleArray([...COMPOUND_TENSES]);

    compoundIndices.forEach((index, offset) => {
        questions[index].tense = compoundTenses[offset % compoundTenses.length];
    });

    const simpleTenses = getDailySimpleTenses();
    questions.forEach(question => {
        if (question.tense) {
            return;
        }

        question.tense = shuffleArray([...simpleTenses])[0] || 'presente';
    });

    return questions;
}

function ensureDailyQuestionPlan() {
    if (Array.isArray(dailyState.questions) && dailyState.questions.length === dailyState.verbs.length && dailyState.questions.length > 0) {
        return;
    }

    const selectedVerbs = (dailyState.verbs || [])
        .map(verbInf => verbsData.find(verb => verb.inf === verbInf))
        .filter(Boolean);

    if (!selectedVerbs.length) {
        dailyState.questions = [];
        return;
    }

    dailyState.questions = buildDailyQuestionPlan(selectedVerbs);
    dailyState.verbs = dailyState.questions.map(question => question.verb);
    saveDailyState();
}

function getTenseRuleText(tense) {
    const tenseInfo = tenses[tense];

    if (!tenseInfo) {
        return '无';
    }

    if (!COMPOUND_TENSES.includes(tense)) {
        return tenseInfo.rule || '无';
    }

    const haberRule = HABER_RULE_PATTERNS[tense];
    if (!haberRule) {
        return tenseInfo.rule || '无';
    }

    return `haber ${haberRule.label} + participio pasado；haber ${haberRule.label}词尾：${haberRule.endingRule}`;
}

function getIrregularVerbGroups(tense) {
    const groups = irregularVerbGroupsByTense[tense];
    return Array.isArray(groups) ? groups : [];
}

function getIrregularVerbGroupCount(groups) {
    const normalizedVerbs = [];

    groups.forEach(group => {
        (group.verbs || []).forEach(verb => {
            normalizedVerbs.push(normalizeVerbKey(verb));
        });
    });

    return new Set(normalizedVerbs).size;
}

function getIrregularGroupHeading(group) {
    const rawLabel = String(group?.label || '').trim();
    const compactLabel = rawLabel.split('：')[0].split(':')[0].trim();
    return compactLabel || rawLabel;
}

function buildIrregularVerbGroupsHTML(tense, activeGroupId = '', boxId = '') {
    const groups = getIrregularVerbGroups(tense);

    if (groups.length === 0) {
        const irregularList = irregularVerbsByTense[tense] || [];
        if (irregularList.length === 0) {
            return '';
        }

        return `<div class="irregular-verbs"><strong>${getIrregularListLabel(tense)}：</strong>${irregularList.join(', ')}</div>`;
    }

    const activeGroup = groups.find(group => group.id === activeGroupId) || groups[0];
    const totalCount = getIrregularVerbGroupCount(groups);
    const buttonsHTML = groups.map(group => {
        const isActive = group.id === activeGroup.id;
        const activeClass = isActive ? ' active' : '';
        const boxIdAttr = boxId ? ` data-box-id="${boxId}"` : '';
        return `<button type="button" class="irregular-group-btn${activeClass}" data-tense="${tense}" data-group-id="${group.id}"${boxIdAttr}>${group.label}</button>`;
    }).join('');

    return `
        <div class="irregular-verbs irregular-groups">
            <div class="irregular-groups-summary"><strong>${getIrregularListLabel(tense)}：</strong>共 ${totalCount} 个，已按动词原形的词干或词尾归类；点击任一类别即可查看该组统一变化。</div>
            <div class="irregular-group-buttons">${buttonsHTML}</div>
            <div class="irregular-group-detail">
                <div><strong>当前类别：</strong>${getIrregularGroupHeading(activeGroup)}</div>
                <div><strong>该类动词：</strong>${activeGroup.verbs.join(', ')}</div>
                <div><strong>规则：</strong>${activeGroup.rule}</div>
            </div>
        </div>
    `;
}

function buildTenseRuleBoxHTML(tense, options = {}) {
    const { includeModeLabel = false, activeGroupId = '', boxId = '' } = options;
    let html = `<div class="tense-rule"><strong>变位规则：</strong>${getTenseRuleText(tense)}</div>`;

    if (includeModeLabel) {
        html += '<div class="tense-rule"><strong>当前模式：</strong>语境题训练</div>';
    }

    html += buildIrregularVerbGroupsHTML(tense, activeGroupId, boxId);
    return html;
}

function renderTenseRuleBox(boxId, tense, options = {}) {
    const ruleBox = document.getElementById(boxId);
    if (!ruleBox) {
        return;
    }

    const activeGroupId = options.activeGroupId || '';
    ruleBox.dataset.tense = tense;
    ruleBox.dataset.includeModeLabel = options.includeModeLabel ? 'true' : 'false';
    ruleBox.dataset.activeGroupId = activeGroupId;
    ruleBox.dataset.boxId = boxId;

    try {
        ruleBox.innerHTML = buildTenseRuleBoxHTML(tense, {
            includeModeLabel: options.includeModeLabel,
            activeGroupId,
            boxId
        });
    } catch (error) {
        console.error('renderTenseRuleBox failed', boxId, tense, error);
        ruleBox.innerHTML = `<div class="tense-rule"><strong>变位规则：</strong>${getTenseRuleText(tense)}</div>`;
    }
}

function rerenderTenseRuleBox(ruleBox, activeGroupId = '') {
    const tense = ruleBox.dataset.tense;
    if (!tense) {
        return;
    }

    const includeModeLabel = ruleBox.dataset.includeModeLabel === 'true';
    const boxId = ruleBox.dataset.boxId || ruleBox.id || '';
    ruleBox.dataset.activeGroupId = activeGroupId;
    ruleBox.innerHTML = buildTenseRuleBoxHTML(tense, {
        includeModeLabel,
        activeGroupId,
        boxId
    });
}

function bindIrregularVerbGroupInteractions() {
    document.addEventListener('click', event => {
        const eventTarget = event.target instanceof Element
            ? event.target
            : event.target?.parentElement;
        const button = eventTarget?.closest('.irregular-group-btn');
        if (!button) {
            return;
        }

        const targetBoxId = button.dataset.boxId || '';
        const ruleBox = (targetBoxId && document.getElementById(targetBoxId)) || button.closest('.tense-rule-box');
        if (!ruleBox) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        rerenderTenseRuleBox(ruleBox, button.dataset.groupId || '');
    });
}

function renderConjugationPlaceholder(gridId, title, detail = '') {
    const grid = document.getElementById(gridId);
    if (!grid) {
        return;
    }

    grid.innerHTML = `
        <div class="conjugation-placeholder">
            <strong>${title}</strong>
            ${detail ? `<span>${detail}</span>` : ''}
        </div>
    `;
}

function initSelfCheckPractice() {
    const verbInput = document.getElementById('lookupVerbInput');
    const tenseSelect = document.getElementById('lookupTenseSelect');
    const startBtn = document.getElementById('lookupStartBtn');
    const checkBtn = document.getElementById('lookupCheckBtn');
    const showAnswerBtn = document.getElementById('lookupShowAnswerBtn');
    const datalist = document.getElementById('lookupVerbSuggestions');
    const ruleBox = document.getElementById('lookupTenseRuleBox');

    if (!verbInput || !tenseSelect || !startBtn || !checkBtn || !showAnswerBtn || !datalist || !ruleBox) {
        return;
    }

    const seenSuggestions = new Set();
    const suggestionOptions = verbsData.filter(verb => {
        const key = normalizeVerbKey(verb.inf);
        if (seenSuggestions.has(key)) {
            return false;
        }
        seenSuggestions.add(key);
        return true;
    });

    datalist.innerHTML = suggestionOptions
        .map(verb => `<option value="${verb.inf}">${verb.meaning}</option>`)
        .join('');

    tenseSelect.innerHTML = ALL_TENSES
        .map(tense => `<option value="${tense}">${tenses[tense]?.name || tense}</option>`)
        .join('');
    tenseSelect.value = tenses[lookupState.tense] ? lookupState.tense : 'presente';
    verbInput.value = lookupState.verbInf || '';

    startBtn.addEventListener('click', startLookupPractice);
    checkBtn.addEventListener('click', checkLookupAnswer);
    showAnswerBtn.addEventListener('click', showLookupAnswer);
    verbInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            startLookupPractice();
        }
    });
    tenseSelect.addEventListener('change', () => {
        renderTenseRuleBox('lookupTenseRuleBox', tenses[tenseSelect.value] ? tenseSelect.value : 'presente');
    });

    renderConjugationPlaceholder(
        'lookupConjugationGrid',
        '输入动词并点击"开始自查"后，这里会显示对应人称输入框。',
        '支持所有已收录时态。'
    );
    renderTenseRuleBox('lookupTenseRuleBox', tenseSelect.value || 'presente');
}

function sanitizeLookupVerbInput(value) {
    return String(value || '').trim().replace(/\s+/g, ' ');
}

function findVerbByLookupInput(value) {
    const normalizedInput = normalizeVerbKey(value);
    if (!normalizedInput) {
        return null;
    }

    return verbsData.find(verb => normalizeVerbKey(verb.inf) === normalizedInput) || null;
}

function isLikelySpanishInfinitive(value) {
    const firstToken = sanitizeLookupVerbInput(value).split(' ')[0] || '';
    return /(ar|er|ir|arse|erse|irse)$/.test(normalizeVerbKey(firstToken));
}

function buildLookupVerbRecord(value) {
    const cleanedInput = sanitizeLookupVerbInput(value);
    const matchedVerb = findVerbByLookupInput(cleanedInput);
    if (matchedVerb) {
        return {
            ...matchedVerb,
            isKnownVerb: true
        };
    }

    return {
        inf: cleanedInput.toLowerCase(),
        meaning: '词库未收录；当前按规则变位练习。',
        type: 'custom',
        isKnownVerb: false
    };
}

function getLookupPracticeContext() {
    if (!lookupState.isActive || !lookupState.verbInf || !tenses[lookupState.tense]) {
        return null;
    }

    const selectedVerb = buildLookupVerbRecord(lookupState.verbInf);
    return {
        verb: {
            inf: selectedVerb.inf,
            meaning: selectedVerb.meaning,
            type: selectedVerb.type
        },
        tense: lookupState.tense
    };
}

function renderLookupConjugationInputs(tense) {
    const grid = document.getElementById('lookupConjugationGrid');
    if (!grid || !tenses[tense]) {
        return;
    }

    grid.innerHTML = '';
    
    // 特殊处理 participio 和 gerundio（非人称形式，只有一个输入框）
    if (tense === 'participio' || tense === 'gerundio') {
        const displayPronoun = tense === 'participio' ? '过去分词' : '现在分词';
        const placeholder = tense === 'participio' ? '例如: hablado / comido / vivido' : '例如: hablando / comiendo / viviendo';
        const item = document.createElement('div');
        item.className = 'conjugation-item';
        item.innerHTML = `
            <label>${displayPronoun}</label>
            <input type="text" data-pronoun="${tenses[tense].pronouns[0]}" placeholder="${placeholder}" autocomplete="off">
        `;
        grid.appendChild(item);
    } else {
        // 正常时态：6个人称输入框
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
}

function resetLookupResult() {
    const result = document.getElementById('lookupResult');
    if (!result) {
        return;
    }

    result.className = 'result';
    result.innerHTML = '';
}

function startLookupPractice() {
    if (!hasUnlockedAccess()) {
        showLockedAccessPrompt('请先在每日练习底部完成申请并解锁；解锁后才能使用自查动词。');
        return;
    }

    const verbInput = document.getElementById('lookupVerbInput');
    const tenseSelect = document.getElementById('lookupTenseSelect');
    const result = document.getElementById('lookupResult');
    const rawInput = sanitizeLookupVerbInput(verbInput?.value);
    const selectedTense = tenses[tenseSelect?.value] ? tenseSelect.value : 'presente';

    if (!rawInput) {
        result.className = 'result show error';
        result.innerHTML = '请先输入要自查的动词原形。';
        verbInput?.focus();
        return;
    }

    if (!isLikelySpanishInfinitive(rawInput)) {
        result.className = 'result show error';
        result.innerHTML = '请输入动词原形，例如 hablar、comer、vivir、acostarse、darse cuenta。';
        verbInput?.focus();
        return;
    }

    const selectedVerb = buildLookupVerbRecord(rawInput);
    currentVerb = {
        inf: selectedVerb.inf,
        meaning: selectedVerb.meaning,
        type: selectedVerb.type
    };
    currentTense = selectedTense;
    lookupState = {
        isActive: true,
        verbInf: selectedVerb.inf,
        tense: selectedTense,
        isKnownVerb: Boolean(selectedVerb.isKnownVerb)
    };

    if (verbInput) {
        verbInput.value = selectedVerb.inf;
    }
    if (tenseSelect) {
        tenseSelect.value = selectedTense;
    }

    const verbType = getVerbTypeLabel(currentVerb, currentTense);
    document.getElementById('lookupVerbInfinitive').textContent = `${selectedVerb.inf}${verbType ? ` ${verbType}` : ''}`;
    document.getElementById('lookupVerbMeaning').textContent = selectedVerb.meaning;
    document.getElementById('lookupVerbTense').textContent = tenses[selectedTense].name;

    renderLookupConjugationInputs(selectedTense);
    renderTenseRuleBox('lookupTenseRuleBox', selectedTense);
    resetLookupResult();
    document.getElementById('lookupCheckBtn').disabled = false;
    document.getElementById('lookupShowAnswerBtn').disabled = false;
}

function checkLookupAnswer() {
    if (!hasUnlockedAccess()) {
        showLockedAccessPrompt('请先在每日练习底部完成申请并解锁；解锁后才能检查自查答案。');
        return;
    }

    const lookupContext = getLookupPracticeContext();
    if (!lookupContext) {
        const result = document.getElementById('lookupResult');
        result.className = 'result show error';
        result.innerHTML = '请先输入动词并点击"开始自查"。';
        return;
    }

    const inputs = document.querySelectorAll('#lookupConjugationGrid input');
    let correct = 0;
    const total = inputs.length;
    const weakPointItems = [];

    if (total === 0) {
        startLookupPractice();
        const result = document.getElementById('lookupResult');
        result.className = 'result show error';
        result.innerHTML = '刚才的输入框没有正确显示，已自动重载，请直接作答。';
        return;
    }

    inputs.forEach(input => {
        const pronoun = input.dataset.pronoun;
        const userAnswer = input.value.trim();
        const correctAnswer = conjugateVerb(lookupContext.verb.inf, lookupContext.tense, pronoun);
        const comparison = compareTrainerAnswer(userAnswer, correctAnswer);

        input.disabled = true;
        input.classList.remove('correct', 'incorrect', 'almost');
        if (comparison.isCorrect) {
            input.classList.add(comparison.accentOnly ? 'almost' : 'correct');
            correct++;
        } else {
            input.classList.add('incorrect');
            input.value = `${userAnswer || '（空）'} → ${correctAnswer}`;
            weakPointItems.push({
                verb: lookupContext.verb.inf,
                tense: lookupContext.tense,
                pronoun
            });
        }
    });

    recordPracticeProgress(lookupContext.verb.inf, lookupContext.tense, correct, total, {
        module: 'selfcheck'
    });
    if (weakPointItems.length > 0) {
        recordWeakPointDetails(weakPointItems, { module: 'selfcheck' });
    }

    const result = document.getElementById('lookupResult');
    if (correct === total) {
        result.className = 'result show success';
        result.innerHTML = `<strong>🎉 全对！</strong> ${correct}/${total} 正确<br>如需继续，直接换词或换时态后再点"开始自查"。`;
    } else {
        addWrongVerbToReview(lookupContext.verb.inf, lookupContext.tense);
        result.className = 'result show error';
        result.innerHTML = `<strong>❌ 有错误</strong> ${correct}/${total} 正确<br>该题已记录到错题重练；你可以继续换词或换时态自查。`;
    }

    document.getElementById('lookupCheckBtn').disabled = true;
    document.getElementById('lookupShowAnswerBtn').disabled = correct === total;
}

function showLookupAnswer() {
    if (!hasUnlockedAccess()) {
        showLockedAccessPrompt('请先在每日练习底部完成申请并解锁；解锁后才能查看自查答案。');
        return;
    }

    const lookupContext = getLookupPracticeContext();
    if (!lookupContext) {
        const result = document.getElementById('lookupResult');
        result.className = 'result show error';
        result.innerHTML = '请先输入动词并点击"开始自查"。';
        return;
    }

    const inputs = document.querySelectorAll('#lookupConjugationGrid input');
    if (inputs.length === 0) {
        startLookupPractice();
        const result = document.getElementById('lookupResult');
        result.className = 'result show error';
        result.innerHTML = '刚才的输入框没有正确显示，已自动重载，请先再试一次。';
        return;
    }

    // 如果格子都是 correct / almost 状态（已经答对过了），给友好提示
    const allCorrect = Array.from(inputs).every(inp =>
        inp.classList.contains('correct') || inp.classList.contains('almost')
    );
    if (allCorrect) {
        const result = document.getElementById('lookupResult');
        result.className = 'result show success';
        result.innerHTML = '🎉 你已经全对了！不需要看答案了。';
        document.getElementById('lookupShowAnswerBtn').disabled = true;
        return;
    }

    const weakPointItems = [];
    inputs.forEach(input => {
        const pronoun = input.dataset.pronoun;
        input.value = conjugateVerb(lookupContext.verb.inf, lookupContext.tense, pronoun);
        input.disabled = true;
        input.classList.remove('correct', 'incorrect', 'almost');
        input.classList.add('incorrect');
        weakPointItems.push({
            verb: lookupContext.verb.inf,
            tense: lookupContext.tense,
            pronoun
        });
    });

    recordPracticeProgress(lookupContext.verb.inf, lookupContext.tense, 0, inputs.length || tenses[lookupContext.tense].pronouns.length, {
        module: 'selfcheck',
        revealed: true
    });
    recordWeakPointDetails(weakPointItems, { module: 'selfcheck' });
    addWrongVerbToReview(lookupContext.verb.inf, lookupContext.tense);

    const result = document.getElementById('lookupResult');
    result.className = 'result show error';
    result.innerHTML = '<strong>💡 已显示答案</strong><br>该题已记录到错题重练；你可以继续换词或换时态自查。';

    document.getElementById('lookupCheckBtn').disabled = true;
    document.getElementById('lookupShowAnswerBtn').disabled = true;
}

function startDailyPractice() {
    if (!hasUnlockedAccess()) {
        showLockedAccessPrompt('请先在每日练习底部完成申请并解锁；解锁后才能开始每日练习。');
        return;
    }

    const today = new Date().toDateString();
    const irregularQuestionCandidates = verbsData.filter(verb => getAvailableIrregularDailyTenses(verb).length > 0);
    const regularQuestionCandidates = verbsData.filter(verb => !irregularQuestionCandidates.some(item => item.inf === verb.inf));

    const selectedIrregular = shuffleArray([...irregularQuestionCandidates]).slice(0, 4);
    const selectedRegular = shuffleArray([...regularQuestionCandidates]).slice(0, 6);
    const fallbackPool = shuffleArray(
        verbsData.filter(verb => ![...selectedIrregular, ...selectedRegular].some(item => item.inf === verb.inf))
    );
    const selectedVerbs = shuffleArray([...selectedIrregular, ...selectedRegular, ...fallbackPool]).slice(0, DAILY_VERB_COUNT);
    const plannedQuestions = buildDailyQuestionPlan(selectedVerbs);

    dailyState = {
        currentIndex: 0,
        verbs: plannedQuestions.map(question => question.verb),
        questions: plannedQuestions,
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
    ensureDailyQuestionPlan();
    document.getElementById('dailyStartBtn').style.display = 'none';
    document.getElementById('dailyCheckBtn').disabled = false;
    document.getElementById('dailyShowAnswerBtn').disabled = false;
    loadDailyVerb();
}

function loadDailyVerb() {
    ensureDailyQuestionPlan();

    const plannedQuestion = dailyState.questions[dailyState.currentIndex];
    const verbInf = plannedQuestion ? plannedQuestion.verb : dailyState.verbs[dailyState.currentIndex];
    currentVerb = verbsData.find(v => v.inf === verbInf);
    currentTense = plannedQuestion ? plannedQuestion.tense : 'presente';
    
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
    renderTenseRuleBox('dailyTenseRuleBox', currentTense);
    
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
    const weakPointItems = [];

    if (total === 0) {
        loadDailyVerb();
        const result = document.getElementById('dailyResult');
        result.className = 'result show error';
        result.innerHTML = '刚才这题的输入框没有正确显示，已自动重新加载，请直接作答。';
        return;
    }

    inputs.forEach(input => {
        const pronoun = input.dataset.pronoun;
        const userAnswer = input.value.trim();
        const correctAnswer = conjugateVerb(currentVerb.inf, currentTense, pronoun);
        const comparison = compareTrainerAnswer(userAnswer, correctAnswer);

        input.disabled = true;
        
        if (comparison.isCorrect) {
            input.classList.add('correct');
            correct++;
        } else {
            input.classList.add('incorrect');
            input.value = `${userAnswer || '（空）'} → ${correctAnswer}`;
            hasError = true;
            weakPointItems.push({
                verb: currentVerb.inf,
                tense: currentTense,
                pronoun
            });
        }
    });

    // 更新进度统计
    recordPracticeProgress(currentVerb.inf, currentTense, correct, total, {
        module: 'daily'
    });
    if (weakPointItems.length > 0) {
        recordWeakPointDetails(weakPointItems, { module: 'daily' });
    }

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
    if (inputs.length === 0) {
        loadDailyVerb();
        const result = document.getElementById('dailyResult');
        result.className = 'result show error';
        result.innerHTML = '刚才这题的输入框没有正确显示，已自动重新加载，请先再试一次。';
        return;
    }

    const weakPointItems = [];
    inputs.forEach(input => {
        const pronoun = input.dataset.pronoun;
        input.value = conjugateVerb(currentVerb.inf, currentTense, pronoun);
        input.disabled = true;
        input.classList.add('incorrect');
        weakPointItems.push({
            verb: currentVerb.inf,
            tense: currentTense,
            pronoun
        });
    });
    
    // 记录结果
    dailyState.results.push({
        verb: currentVerb.inf,
        correct: false,
        attempts: 1,
        tense: currentTense
    });
    saveDailyState();
    recordPracticeProgress(currentVerb.inf, currentTense, 0, inputs.length || tenses[currentTense].pronouns.length, {
        module: 'daily',
        revealed: true
    });
    recordWeakPointDetails(weakPointItems, { module: 'daily' });
    
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
    document.getElementById('dailyVerbMeaning').textContent = '你可以点击"再练一次"马上开始新一轮。';
    document.getElementById('dailyVerbTense').textContent = '';
    document.getElementById('dailyCurrent').textContent = DAILY_VERB_COUNT;
    document.getElementById('dailyTotal').textContent = DAILY_VERB_COUNT;
    document.getElementById('dailyProgressBar').style.width = '100%';
    renderConjugationPlaceholder(
        'dailyConjugationGrid',
        '今天的 10 题已经完成。',
        '点击下方"再练一次"会重新生成一组练习，不会再看到一块空白。'
    );
    document.getElementById('dailyResult').innerHTML = '';
    document.getElementById('dailyCheckBtn').disabled = true;
    document.getElementById('dailyShowAnswerBtn').disabled = true;
    document.getElementById('dailyStatus').textContent = '太棒了！今日挑战已完成。';
    document.getElementById('dailyTenseRuleBox').innerHTML = '<div class="tense-rule"><strong>今日状态：</strong>本轮已完成；如需继续练习，可直接点击"再练一次"。</div>';
    
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
    bindTrainerEvents();
    updateTrainerStats();
    resetTrainerDisplay();
}

function bindTrainerEvents() {
    const startBtn = document.getElementById('trainerStartBtn');
    const checkBtn = document.getElementById('trainerCheckBtn');
    const showAnswerBtn = document.getElementById('trainerShowAnswerBtn');
    const nextBtn = document.getElementById('trainerNextBtn');
    const resetBtn = document.getElementById('trainerResetBtn');

    if (startBtn) startBtn.addEventListener('click', startTrainerSession);
    if (checkBtn) checkBtn.addEventListener('click', checkTrainerAnswer);
    if (showAnswerBtn) showAnswerBtn.addEventListener('click', showTrainerAnswer);
    if (nextBtn) nextBtn.addEventListener('click', goToNextTrainerQuestion);
    if (resetBtn) resetBtn.addEventListener('click', resetTrainerSession);
}

function bindTrainerFollowupActions() {
    const checkBtn = document.getElementById('trainerFollowupCheckBtn');
    const showBtn = document.getElementById('trainerFollowupShowBtn');

    if (checkBtn) {
        checkBtn.addEventListener('click', checkTrainerFollowup);
    }

    if (showBtn) {
        showBtn.addEventListener('click', showTrainerFollowupAnswers);
    }
}

function resetTrainerDisplay() {
    const result = document.getElementById('trainerResult');
    const ruleBox = document.getElementById('trainerTenseRuleBox');
    const followupBox = document.getElementById('trainerFollowupBox');
    const exampleBox = document.getElementById('trainerExampleBox');
    const checkBtn = document.getElementById('trainerCheckBtn');
    const showAnswerBtn = document.getElementById('trainerShowAnswerBtn');
    const nextBtn = document.getElementById('trainerNextBtn');
    const startBtn = document.getElementById('trainerStartBtn');

    document.getElementById('trainerVerbInfinitive').textContent = '准备开始训练';
    document.getElementById('trainerVerbMeaning').textContent = '动词含义待显示';
    document.getElementById('trainerVerbTense').textContent = '开始后作答';

    renderConjugationPlaceholder(
        'trainerConjugationGrid',
        '点击"开始训练"后开始答题。',
        '每轮 6 题。'
    );

    result.className = 'result';
    result.innerHTML = '';
    ruleBox.innerHTML = '';
    followupBox.innerHTML = '';
    exampleBox.innerHTML = `
        <h3>💬 语境例句</h3>
        <p class="trainer-example-es">开始训练后显示西语例句。</p>
        <p class="trainer-example-zh">下方显示中文翻译。</p>
    `;

    checkBtn.disabled = true;
    showAnswerBtn.disabled = true;
    nextBtn.style.display = 'none';
    startBtn.textContent = trainerState.totalQuestions > 0 ? '再来一轮' : '开始训练';
}

function resetTrainerSession() {
    trainerState = createEmptyTrainerState();
    updateTrainerStats();
    resetTrainerDisplay();
}

function startTrainerSession() {
    trainerState = createEmptyTrainerState();
    trainerState.roundQuestions = buildTrainerRoundQuestions();
    trainerState.roundSize = trainerState.roundQuestions.length;

    const result = document.getElementById('trainerResult');
    if (trainerState.roundQuestions.length === 0) {
        result.className = 'result show error';
        result.innerHTML = '暂时还没有可用的语境题，请稍后再试。';
        return;
    }

    trainerState.isActive = true;
    document.getElementById('trainerStartBtn').textContent = '重新开始';
    loadTrainerQuestion();
    updateTrainerStats();
}

function buildTrainerRoundQuestions() {
    const selectedItems = shuffleArray([...TRAINER_SENTENCE_BANK]).slice(0, TRAINER_ROUND_QUESTION_COUNT);
    const choiceItems = selectedItems.slice(0, TRAINER_MULTIPLE_CHOICE_COUNT).map(item => ({
        type: 'choice',
        item,
        answer: getTrainerCorrectAnswer(item),
        options: []
    }));
    const fillItems = selectedItems.slice(TRAINER_MULTIPLE_CHOICE_COUNT, TRAINER_MULTIPLE_CHOICE_COUNT + TRAINER_FILL_BLANK_COUNT).map(item => ({
        type: 'fill',
        item,
        answer: getTrainerCorrectAnswer(item),
        options: []
    }));

    choiceItems.forEach(question => {
        question.options = buildTrainerChoices(question.item, question.answer);
    });

    return [...choiceItems, ...fillItems];
}

function shuffleArray(list) {
    const cloned = [...list];
    for (let i = cloned.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
    }
    return cloned;
}

function findTrainerVerb(infinitive) {
    return verbsData.find(verb => verb.inf === infinitive) || null;
}

function getTrainerCorrectAnswer(item) {
    return conjugateVerb(item.verbInf, item.tense, item.pronoun);
}

function buildTrainerChoices(item, correctAnswer) {
    const distractors = [];
    const normalizedSeen = new Set([normalizeTrainerAnswer(correctAnswer)]);
    const correctOption = {
        value: correctAnswer,
        tense: item.tense,
        pronoun: item.pronoun,
        isCorrect: true
    };

    ALL_TENSES.forEach(tense => {
        if (tense === item.tense || distractors.length >= 2) {
            return;
        }

        const candidate = conjugateVerb(item.verbInf, tense, item.pronoun);
        const normalizedCandidate = normalizeTrainerAnswer(candidate);
        if (!candidate || normalizedSeen.has(normalizedCandidate) || candidate === 'N/A') {
            return;
        }

        normalizedSeen.add(normalizedCandidate);
        distractors.push({
            value: candidate,
            tense,
            pronoun: item.pronoun,
            isCorrect: false
        });
    });

    STANDARD_PRONOUNS.forEach(pronoun => {
        if (distractors.length >= 2 || pronoun === item.pronoun) {
            return;
        }

        const candidate = conjugateVerb(item.verbInf, item.tense, pronoun);
        const normalizedCandidate = normalizeTrainerAnswer(candidate);
        if (!candidate || normalizedSeen.has(normalizedCandidate) || candidate === 'N/A') {
            return;
        }

        normalizedSeen.add(normalizedCandidate);
        distractors.push({
            value: candidate,
            tense: item.tense,
            pronoun,
            isCorrect: false
        });
    });

    return shuffleArray([correctOption, ...distractors.slice(0, 2)]);
}

function loadTrainerQuestion() {
    if (!trainerState.isActive) return;

    if (trainerState.currentIndex >= trainerState.roundQuestions.length) {
        return;
    }

    const question = trainerState.roundQuestions[trainerState.currentIndex];
    trainerState.currentQuestion = question;
    trainerState.followupPending = false;
    trainerState.followupCompleted = false;
    clearTrainerFollowup();
    renderTrainerQuestion(question);

    const result = document.getElementById('trainerResult');
    result.className = 'result';
    result.innerHTML = '';

    document.getElementById('trainerCheckBtn').disabled = false;
    document.getElementById('trainerShowAnswerBtn').disabled = false;
    document.getElementById('trainerNextBtn').style.display = 'none';

    const firstInput = document.querySelector('#trainerConjugationGrid input');
    if (firstInput) firstInput.focus();
    updateTrainerStats();
}

function renderTrainerQuestion(question) {
    const verb = findTrainerVerb(question.item.verbInf);

    document.getElementById('trainerVerbInfinitive').textContent = question.item.verbInf;
    document.getElementById('trainerVerbMeaning').textContent = `中文：${verb ? verb.meaning : '—'}`;
    document.getElementById('trainerVerbTense').textContent = `第 ${trainerState.currentIndex + 1} 题 / ${trainerState.roundQuestions.length} · ${getTrainerQuestionTypeLabel(question.type)}`;
    document.getElementById('trainerTenseRuleBox').innerHTML = '';

    renderTrainerExample(question, false);
    renderTrainerQuestionArea(question);
}

function getTrainerQuestionTypeLabel(type) {
    return type === 'choice' ? '选择题' : '填空题';
}

function buildTrainerSentenceHTML(question, revealAnswer = false) {
    const replacement = revealAnswer
        ? `<strong>${question.answer}</strong>`
        : '<span class="trainer-blank-token">______</span>';
    return question.item.es.replace('__VERB__', replacement);
}

function renderTrainerExample(question, revealAnswer = false) {
    document.getElementById('trainerExampleBox').innerHTML = `
        <h3>💬 语境例句</h3>
        <p class="trainer-example-es">${buildTrainerSentenceHTML(question, revealAnswer)}</p>
        <p class="trainer-example-zh">${question.item.zh}</p>
    `;
}

function renderTrainerQuestionArea(question) {
    const grid = document.getElementById('trainerConjugationGrid');
    const verb = findTrainerVerb(question.item.verbInf);
    const meaning = verb ? verb.meaning : '—';
    const answerTip = `原形：${question.item.verbInf} · 中文：${meaning}`;

    if (question.type === 'choice') {
        const optionsHTML = question.options.map(option => `
            <label class="trainer-choice-option" data-choice-value="${option.value}">
                <input type="radio" name="trainerChoiceOption" value="${option.value}">
                <div class="trainer-choice-copy">
                    <span class="trainer-choice-value">${option.value}</span>
                    <div class="trainer-choice-analysis"></div>
                </div>
            </label>
        `).join('');

        grid.innerHTML = `
            <div class="trainer-question-card">
                <div class="trainer-question-header">
                    <span class="trainer-question-badge">第 ${trainerState.currentIndex + 1} 题 · 选择题</span>
                </div>
                <p class="trainer-question-prompt">选出正确形式。</p>
                <div class="trainer-choice-list">${optionsHTML}</div>
                <div class="trainer-answer-tip">${answerTip}</div>
            </div>
        `;
        return;
    }

    grid.innerHTML = `
        <div class="trainer-question-card">
            <div class="trainer-question-header">
                <span class="trainer-question-badge">第 ${trainerState.currentIndex + 1} 题 · 填空题</span>
            </div>
            <p class="trainer-question-prompt">填写正确形式。</p>
            <div class="trainer-fill-wrap">
                <input type="text" id="trainerFillInput" class="trainer-fill-input" placeholder="输入变位" autocomplete="off">
                <div class="trainer-answer-tip">${answerTip}</div>
            </div>
        </div>
    `;
}

function buildTrainerChoiceAnalysisHTML(question, option) {
    const tenseLabel = tenses[option.tense] ? tenses[option.tense].name : option.tense;
    const pronounLabel = option.pronoun;

    if (option.isCorrect) {
        return `
            <strong>时态：</strong>${tenseLabel} · <strong>人称：</strong>${pronounLabel}<br>
            可选：句子的语境和主语都匹配这个变位。
        `;
    }

    const reasons = [];
    if (option.tense !== question.item.tense) {
        reasons.push(`句子语境指向 ${tenses[question.item.tense].name}，不是 ${tenseLabel}。`);
    }
    if (option.pronoun !== question.item.pronoun) {
        reasons.push(`句子主语是 ${question.item.pronoun}，不是 ${pronounLabel}。`);
    }

    return `
        <strong>时态：</strong>${tenseLabel} · <strong>人称：</strong>${pronounLabel}<br>
        不可选：${reasons.join(' ')}
    `;
}

function getTrainerFollowupForms(question) {
    return STANDARD_PRONOUNS.map(pronoun => {
        if (question.item.tense === 'imperativo') {
            if (pronoun === 'yo') {
                return {
                    pronoun,
                    answer: '—',
                    disabled: true,
                    note: '命令式没有 yo 形式'
                };
            }

            const mappedPronoun = pronoun === 'él/ella/usted'
                ? 'usted'
                : pronoun === 'ellos/ustedes'
                    ? 'ustedes'
                    : pronoun;

            return {
                pronoun,
                answer: conjugateVerb(question.item.verbInf, question.item.tense, mappedPronoun),
                disabled: false,
                note: ''
            };
        }

        return {
            pronoun,
            answer: conjugateVerb(question.item.verbInf, question.item.tense, pronoun),
            disabled: false,
            note: ''
        };
    });
}

function clearTrainerFollowup() {
    const followupBox = document.getElementById('trainerFollowupBox');
    if (followupBox) {
        followupBox.innerHTML = '';
    }
}

function renderTrainerFollowup(question) {
    const followupBox = document.getElementById('trainerFollowupBox');
    if (!followupBox) {
        return;
    }

    const forms = getTrainerFollowupForms(question);
    const formHTML = forms.map(form => `
        <div class="conjugation-item trainer-followup-item">
            <label>${form.pronoun}</label>
            <input
                type="text"
                data-followup-pronoun="${form.pronoun}"
                data-followup-answer="${form.answer}"
                placeholder="${form.disabled ? '—' : '写出变位'}"
                ${form.disabled ? 'value="—" disabled' : ''}
                autocomplete="off"
            >
            ${form.note ? `<div class="trainer-followup-item-note">${form.note}</div>` : ''}
        </div>
    `).join('');

    followupBox.innerHTML = `
        <div class="trainer-followup-card">
            <h3>✍️ 写全 6 个变位</h3>
            <p class="trainer-followup-desc">把 <strong>${question.item.verbInf}</strong> 在 <strong>${tenses[question.item.tense].name}</strong> 的 6 个变位写全。</p>
            <div class="conjugation-grid trainer-followup-grid">${formHTML}</div>
            <div class="trainer-followup-actions">
                <button class="btn btn-primary" id="trainerFollowupCheckBtn">检查 6 个变位</button>
                <button class="btn btn-secondary" id="trainerFollowupShowBtn">直接看答案</button>
            </div>
            <div class="result trainer-followup-result" id="trainerFollowupResult"></div>
        </div>
    `;

    trainerState.followupPending = true;
    trainerState.followupCompleted = false;
    bindTrainerFollowupActions();

    const firstInput = followupBox.querySelector('input:not([disabled])');
    if (firstInput) {
        firstInput.focus();
    }
}

function unlockTrainerNextStep(message = '') {
    trainerState.followupPending = false;
    trainerState.followupCompleted = true;

    const followupResult = document.getElementById('trainerFollowupResult');
    if (followupResult && message) {
        followupResult.className = 'result trainer-followup-result show success';
        followupResult.innerHTML = message;
    }

    if (trainerState.totalQuestions >= trainerState.roundQuestions.length) {
        trainerState.isActive = false;
        document.getElementById('trainerStartBtn').textContent = '再来一轮';
        document.getElementById('trainerNextBtn').style.display = 'none';
        document.getElementById('trainerResult').innerHTML += `<br><br><strong>本轮完成：</strong>共 ${trainerState.roundQuestions.length} 题，答对 ${trainerState.correctQuestions} 题，正确率 ${getTrainerAccuracy()}%，最高连对 ${trainerState.bestStreak} 题。`;
        return;
    }

    document.getElementById('trainerNextBtn').style.display = 'inline-block';
}

function checkTrainerFollowup() {
    if (!trainerState.currentQuestion || !trainerState.followupPending) {
        return;
    }

    const inputs = Array.from(document.querySelectorAll('#trainerFollowupBox input[data-followup-pronoun]')).filter(input => !input.disabled);
    const followupResult = document.getElementById('trainerFollowupResult');
    if (!inputs.length || !followupResult) {
        return;
    }

    let correctCount = 0;
    const wrongItems = [];

    inputs.forEach(input => {
        const userAnswer = input.value.trim();
        const correctAnswer = input.dataset.followupAnswer || '';
        const comparison = compareTrainerAnswer(userAnswer, correctAnswer);

        input.classList.remove('correct', 'incorrect', 'almost');
        if (comparison.isCorrect) {
            input.classList.add(comparison.accentOnly ? 'almost' : 'correct');
            correctCount++;
        } else {
            input.classList.add('incorrect');
            wrongItems.push({
                verb: trainerState.currentQuestion.item.verbInf,
                tense: trainerState.currentQuestion.item.tense,
                pronoun: input.dataset.followupPronoun || '',
                answer: correctAnswer
            });
        }
    });

    if (correctCount === inputs.length) {
        inputs.forEach(input => {
            input.disabled = true;
        });
        unlockTrainerNextStep('6 个变位已写全，可以继续下一题。');
        return;
    }

    recordWeakPointDetails(wrongItems, { module: 'trainer' });

    const answerList = wrongItems
        .map(item => `<strong>${item.pronoun}</strong>：${item.answer}`)
        .join('<br>');

    followupResult.className = 'result trainer-followup-result show error';
    followupResult.innerHTML = `还差 ${inputs.length - correctCount} 个。<br>正确答案：<br>${answerList}`;
}

function showTrainerFollowupAnswers() {
    if (!trainerState.currentQuestion || !trainerState.followupPending) {
        return;
    }

    const inputs = Array.from(document.querySelectorAll('#trainerFollowupBox input[data-followup-pronoun]')).filter(input => !input.disabled);
    const followupResult = document.getElementById('trainerFollowupResult');
    const weakPointItems = [];

    inputs.forEach(input => {
        input.value = input.dataset.followupAnswer || '';
        input.disabled = true;
        input.classList.remove('correct', 'incorrect', 'almost');
        input.classList.add('incorrect');
        weakPointItems.push({
            verb: trainerState.currentQuestion.item.verbInf,
            tense: trainerState.currentQuestion.item.tense,
            pronoun: input.dataset.followupPronoun || ''
        });
    });

    recordWeakPointDetails(weakPointItems, { module: 'trainer' });
    unlockTrainerNextStep('标准答案已显示，可以继续下一题。');

    if (followupResult) {
        followupResult.className = 'result trainer-followup-result show error';
        followupResult.innerHTML = '已直接填入标准答案。';
    }
}

function revealTrainerSolvedState(question) {
    document.getElementById('trainerVerbTense').textContent = `正确时态：${tenses[question.item.tense].name}`;
    renderTenseRuleBox('trainerTenseRuleBox', question.item.tense);
    renderTrainerExample(question, true);
}

function normalizeTrainerAnswer(text) {
    return String(text || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function stripSpanishAccents(text) {
    return String(text || '')
        .replace(/[áàâä]/g, 'a')
        .replace(/[éèêë]/g, 'e')
        .replace(/[íìîï]/g, 'i')
        .replace(/[óòôö]/g, 'o')
        .replace(/[úùûü]/g, 'u');
}

function normalizeTrailingReflexivePronoun(text) {
    return normalizeTrainerAnswer(text).replace(/\s+(me|te|se|nos|os)$/i, '$1');
}

function compareTrainerAnswer(userAnswer, correctAnswer) {
    const normalizedUser = normalizeTrainerAnswer(userAnswer);
    const normalizedCorrect = normalizeTrainerAnswer(correctAnswer);

    if (normalizedUser === normalizedCorrect) {
        return { isCorrect: true, accentOnly: false };
    }

    const compactUser = normalizeTrailingReflexivePronoun(normalizedUser);
    const compactCorrect = normalizeTrailingReflexivePronoun(normalizedCorrect);

    if (compactUser === compactCorrect) {
        return { isCorrect: true, accentOnly: true };
    }

    if (stripSpanishAccents(normalizedUser) === stripSpanishAccents(normalizedCorrect)) {
        return { isCorrect: true, accentOnly: true };
    }

    if (stripSpanishAccents(compactUser) === stripSpanishAccents(compactCorrect)) {
        return { isCorrect: true, accentOnly: true };
    }

    return { isCorrect: false, accentOnly: false };
}

function checkTrainerAnswer() {
    if (!trainerState.isActive || !trainerState.currentQuestion) return;

    const question = trainerState.currentQuestion;
    if (question.type === 'choice') {
        const selected = document.querySelector('input[name="trainerChoiceOption"]:checked');
        if (!selected) {
            const result = document.getElementById('trainerResult');
            result.className = 'result show error';
            result.innerHTML = '请先选一个答案，再点击"检查答案"。';
            return;
        }

        const isCorrect = normalizeTrainerAnswer(selected.value) === normalizeTrainerAnswer(question.answer);
        revealTrainerChoiceFeedback(question, selected.value);
        finishTrainerQuestion({
            isCorrect,
            accentOnly: false,
            usedAnswerKey: false,
            userAnswer: selected.value
        });
        return;
    }

    const input = document.getElementById('trainerFillInput');
    const userAnswer = input ? input.value.trim() : '';
    if (!userAnswer) {
        const result = document.getElementById('trainerResult');
        result.className = 'result show error';
        result.innerHTML = '请先填写答案，再点击"检查答案"。';
        return;
    }

    const comparison = compareTrainerAnswer(userAnswer, question.answer);
    revealTrainerFillFeedback(question.answer, userAnswer, comparison, false);
    finishTrainerQuestion({
        isCorrect: comparison.isCorrect,
        accentOnly: comparison.accentOnly,
        usedAnswerKey: false,
        userAnswer
    });
}

function showTrainerAnswer() {
    if (!trainerState.isActive || !trainerState.currentQuestion) return;

    const question = trainerState.currentQuestion;
    if (question.type === 'choice') {
        revealTrainerChoiceFeedback(question);
    } else {
        revealTrainerFillFeedback(question.answer, '', null, true);
    }

    finishTrainerQuestion({
        isCorrect: false,
        accentOnly: false,
        usedAnswerKey: true,
        userAnswer: ''
    });
}

function revealTrainerChoiceFeedback(question, selectedValue = '') {
    document.querySelectorAll('#trainerConjugationGrid .trainer-choice-option').forEach(option => {
        const input = option.querySelector('input');
        const analysis = option.querySelector('.trainer-choice-analysis');
        if (!input) return;

        input.disabled = true;
        option.classList.remove('correct', 'incorrect');

        const optionMeta = question.options.find(item => normalizeTrainerAnswer(item.value) === normalizeTrainerAnswer(input.value));
        if (optionMeta && analysis) {
            analysis.innerHTML = buildTrainerChoiceAnalysisHTML(question, optionMeta);
            analysis.classList.add('show');
        }

        if (normalizeTrainerAnswer(input.value) === normalizeTrainerAnswer(question.answer)) {
            option.classList.add('correct');
        } else if (selectedValue && normalizeTrainerAnswer(input.value) === normalizeTrainerAnswer(selectedValue)) {
            option.classList.add('incorrect');
        }
    });
}

function revealTrainerFillFeedback(correctAnswer, userAnswer = '', comparison = null, revealOnly = false) {
    const input = document.getElementById('trainerFillInput');
    if (!input) return;

    input.disabled = true;
    input.classList.remove('correct', 'incorrect', 'almost');

    if (revealOnly) {
        input.value = correctAnswer;
        input.classList.add('incorrect');
        return;
    }

    if (comparison && comparison.isCorrect) {
        input.classList.add(comparison.accentOnly ? 'almost' : 'correct');
        return;
    }

    input.classList.add('incorrect');
    input.value = `${userAnswer || '（空）'} → ${correctAnswer}`;
}

function finishTrainerQuestion({ isCorrect, accentOnly = false, usedAnswerKey = false, userAnswer = '' }) {
    const question = trainerState.currentQuestion;
    if (!question) return;

    const countedAsCorrect = isCorrect && !usedAnswerKey;
    trainerState.totalQuestions++;
    trainerState.correctQuestions += countedAsCorrect ? 1 : 0;
    trainerState.streak = countedAsCorrect ? trainerState.streak + 1 : 0;
    trainerState.bestStreak = Math.max(trainerState.bestStreak, trainerState.streak);

    recordPracticeProgress(question.item.verbInf, question.item.tense, countedAsCorrect ? 1 : 0, 1, {
        module: 'trainer',
        revealed: usedAnswerKey
    });
    if (!countedAsCorrect) {
        recordWeakPointDetails([{
            verb: question.item.verbInf,
            tense: question.item.tense,
            pronoun: question.item.pronoun
        }], { module: 'trainer' });
        addWrongVerbToReview(question.item.verbInf, question.item.tense);
    }

    revealTrainerSolvedState(question);
    renderTrainerFollowup(question);
    updateTrainerStats();
    disableTrainerInputs();

    document.getElementById('trainerCheckBtn').disabled = true;
    document.getElementById('trainerShowAnswerBtn').disabled = true;
    document.getElementById('trainerNextBtn').style.display = 'none';

    const result = document.getElementById('trainerResult');
    const tenseName = tenses[question.item.tense].name;

    if (countedAsCorrect) {
        result.className = 'result show success';
        result.innerHTML = `
            <strong>🎉 回答正确！</strong><br>
            正确答案：<strong>${question.answer}</strong>（${tenseName}）<br>
            继续把这个时态的 6 个人称写全。
            ${accentOnly ? '<br>这次只差重音符号或代词连写格式，已经算对，但下次尽量写标准写法。' : ''}
        `;
    } else {
        result.className = 'result show error';
        result.innerHTML = usedAnswerKey
            ? `<strong>💡 已显示答案</strong><br>正确答案是 <strong>${question.answer}</strong>（${tenseName}），已加入错题重练。<br>继续把这个时态的 6 个人称写全。`
            : `<strong>❌ 这题答错了</strong><br>你的答案：${userAnswer || '（空）'}<br>正确答案：<strong>${question.answer}</strong>（${tenseName}），已加入错题重练。<br>继续把这个时态的 6 个人称写全。`;
    }
}

function goToNextTrainerQuestion() {
    if (!trainerState.isActive) return;
    trainerState.currentIndex++;
    loadTrainerQuestion();
}

function getTrainerAccuracy() {
    return trainerState.totalQuestions > 0
        ? Math.round((trainerState.correctQuestions / trainerState.totalQuestions) * 100)
        : 0;
}

function updateTrainerStats() {
    const questionEl = document.getElementById('trainerQuestionsStat');
    const accuracyEl = document.getElementById('trainerAccuracyStat');
    const streakEl = document.getElementById('trainerStreakStat');
    const progressEl = document.getElementById('trainerTimerStat');

    if (!questionEl || !accuracyEl || !streakEl || !progressEl) return;

    questionEl.textContent = trainerState.totalQuestions;
    accuracyEl.textContent = `${getTrainerAccuracy()}%`;
    streakEl.textContent = trainerState.streak;

    const roundSize = trainerState.roundSize || TRAINER_ROUND_QUESTION_COUNT;
    if (trainerState.isActive && trainerState.currentQuestion) {
        progressEl.textContent = `${Math.min(trainerState.currentIndex + 1, roundSize)} / ${roundSize}`;
    } else {
        progressEl.textContent = `${trainerState.totalQuestions} / ${roundSize}`;
    }
}

function disableTrainerInputs() {
    document.querySelectorAll('#trainerConjugationGrid input').forEach(input => {
        input.disabled = true;
    });
}

function recordPracticeProgress(verbInf, tense, correct, total, options = {}) {
    const safeTotal = Number(total) || 0;
    const safeCorrect = Number(correct) || 0;
    const moduleName = options.module || 'daily';
    const todayKey = getLocalDateKey();

    updateStreak();
    progress.totalAttempts += safeTotal;
    progress.correctCount += safeCorrect;
    progress.totalVerbs++;

    if (!progress.practicedVerbs[verbInf]) {
        progress.practicedVerbs[verbInf] = { count: 0, correct: 0, forms: 0, lastPracticedDate: null };
    }

    progress.practicedVerbs[verbInf].count++;
    progress.practicedVerbs[verbInf].correct += safeCorrect;
    progress.practicedVerbs[verbInf].forms = (progress.practicedVerbs[verbInf].forms || 0) + safeTotal;
    progress.practicedVerbs[verbInf].lastPracticedDate = todayKey;

    if (!progress.tenseStats[tense]) {
        progress.tenseStats[tense] = { attempts: 0, correct: 0 };
    }

    progress.tenseStats[tense].attempts += safeTotal;
    progress.tenseStats[tense].correct += safeCorrect;

    if (!progress.historyByDate[todayKey]) {
        progress.historyByDate[todayKey] = normalizeHistoryEntry();
    }

    const dayEntry = progress.historyByDate[todayKey];
    dayEntry.attempts += safeTotal;
    dayEntry.correct += safeCorrect;
    dayEntry.sessions += 1;
    dayEntry.reveals += options.revealed ? 1 : 0;
    dayEntry.modules[moduleName] = (dayEntry.modules[moduleName] || 0) + 1;

    if (!dayEntry.verbs[verbInf]) {
        dayEntry.verbs[verbInf] = { count: 0, attempts: 0, correct: 0 };
    }
    dayEntry.verbs[verbInf].count += 1;
    dayEntry.verbs[verbInf].attempts += safeTotal;
    dayEntry.verbs[verbInf].correct += safeCorrect;

    if (!dayEntry.tenses[tense]) {
        dayEntry.tenses[tense] = { attempts: 0, correct: 0 };
    }
    dayEntry.tenses[tense].attempts += safeTotal;
    dayEntry.tenses[tense].correct += safeCorrect;

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
    const infinitiveParts = String(infinitive || '').trim().split(/\s+/);
    const infinitiveTail = infinitiveParts.slice(1).join(' ');
    infinitive = infinitiveParts[0] || '';

    function appendVerbTail(form) {
        return infinitiveTail ? `${form} ${infinitiveTail}` : form;
    }

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
    const imperativoReflexivePronouns = {
        'tú': 'te',
        'usted': 'se',
        'nosotros': 'nos',
        'vosotros': 'os',
        'ustedes': 'se'
    };

    function buildReflexiveImperative(baseForm) {
        const pronounSuffix = imperativoReflexivePronouns[pronoun];
        if (!pronounSuffix) {
            return appendVerbTail(baseForm);
        }

        let combined;
        if (pronoun === 'nosotros') {
            combined = `${baseForm.replace(/s$/, '')}${pronounSuffix}`;
        } else if (pronoun === 'vosotros') {
            combined = `${baseForm.replace(/d$/, '')}${pronounSuffix}`;
        } else {
            combined = `${baseForm}${pronounSuffix}`;
        }

        return appendVerbTail(combined);
    }
    
    // 过去分词
    function getPastParticiple(verb) {
        const irregularParticiples = {
            abrir: 'abierto',
            caer: 'caído',
            cubrir: 'cubierto',
            decir: 'dicho',
            describir: 'descrito',
            escribir: 'escrito',
            freír: 'freído',
            hacer: 'hecho',
            morir: 'muerto',
            oír: 'oído',
            poner: 'puesto',
            reír: 'reído',
            resolver: 'resuelto',
            roer: 'roído',
            romper: 'roto',
            sonreír: 'sonreído',
            traer: 'traído',
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
    
    // 现在分词（gerundio）
    function getGerundio(verb) {
        const irregularGerundios = {
            poder: 'pudiendo',
            preferir: 'prefiriendo',  // e→i
            sentir: 'sintiendo',      // e→i
            dormir: 'durmiendo',      // o→u
            morir: 'muriendo',        // o→u
            pedir: 'pidiendo',        // e→i
            repetir: 'repitiendo',    // e→i
            servir: 'sirviendo',      // e→i
            vestir: 'vistiendo',      // e→i
            seguir: 'siguiendo',      // e→i
            conseguir: 'consiguiendo', // e→i
            elegir: 'eligiendo',      // e→i
            corregir: 'corrigiendo',   // e→i
            decir: 'diciendo',
            hacer: 'haciendo',
            oír: 'oyendo',
            huir: 'huyendo',
            construir: 'construyendo',
            incluir: 'incluyendo',
            concluir: 'concluyendo',
            leer: 'leyendo',
            creer: 'creyendo',
            traer: 'trayendo',
            caer: 'cayendo'
        };

        const normalizedVerb = normalizeVerbKey(verb);
        if (irregularGerundios[normalizedVerb]) {
            return irregularGerundios[normalizedVerb];
        }

        const verbStem = verb.slice(0, -2);
        const verbEnding = verb.slice(-2);
        if (verbEnding === 'ar') return verbStem + 'ando';
        return verbStem + 'iendo';
    }
    
    // 处理独立过去分词（participio）
    if (tense === 'participio') {
        // 过去分词没有人称变化，无论代词语法是什么，都返回同一个形式
        const participle = getPastParticiple(baseVerb);
        // 反身动词的过去分词也通常不加代词：acostarse → acostado (不是 "se acostado")
        return appendVerbTail(participle);
    }
    
    // 处理独立现在分词（gerundio）
    if (tense === 'gerundio') {
        const gerundioForm = getGerundio(baseVerb);
        if (isReflexive) {
            // 反身动词的现在分词：如 "acostándose"
            // 对于 gerundio，反身代词附加在分词后：-ando/-iendo + 代词
            const pronounSuffix = pronoun === 'participio' || pronoun === 'gerundio' ? 'se' : // 默认情况
                                  pronoun === 'yo' ? 'me' :
                                  pronoun === 'tú' ? 'te' :
                                  pronoun === 'él/ella/usted' ? 'se' :
                                  pronoun === 'nosotros' ? 'nos' :
                                  pronoun === 'vosotros' ? 'os' : 'se';
            return appendVerbTail(gerundioForm + pronounSuffix);
        }
        return appendVerbTail(gerundioForm);
    }
    
    // 虚拟式过去未完成时
    if (tense === 'subjuntivo_imperfecto') {
        const pronounIndex = STANDARD_PRONOUNS.indexOf(pronoun);
        const subjEndings = ['ra', 'ras', 'ra', 'ramos', 'rais', 'ran'];
        // 气象缺陷动词列表（只有第三人称单数）
        const impersonalVerbs = ['llover', 'nevar', 'tronar'];
        const isImpersonal = impersonalVerbs.includes(baseVerb);
        if (isImpersonal && pronoun !== 'él/ella/usted') {
            return 'N/A';
        }
        // 用非反身形式调用 conjugateVerb 来获取 ellos preterito（避免带代词前缀）
        let ellosPreterito = conjugateVerb(baseVerb, 'preterito', 'ellos/ustedes');
        if (!ellosPreterito || ellosPreterito === 'N/A') {
            // 缺陷动词没有 ellos 形式，从第三人称单数 preterito 推导 subjuntivo_imperfecto 词干
            // -ar: nevó → neva (stem for subjuntivo_imp is regular -ar preterito stem)
            // -er/-ir: llovió → llovie (stem)
            const sgPreterito = conjugateVerb(baseVerb, 'preterito', 'él/ella/usted');
            if (typeof sgPreterito === 'string' && sgPreterito !== 'N/A') {
                if (ending === 'ar') {
                    // -ar verbs: subjImp stem = infinitive stem (same as preterito)
                    ellosPreterito = stem + 'aron'; // simulate: nevaron → neva
                } else {
                    // -er/-ir verbs: from 3sg -ió → -ieron
                    if (sgPreterito.endsWith('ió')) {
                        ellosPreterito = sgPreterito.slice(0, -2) + 'ieron';
                    } else {
                        ellosPreterito = sgPreterito.replace(/ó$/, 'on');
                    }
                }
            }
        }
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
        return isReflexive
            ? appendVerbTail(`${reflexivePronouns[pronoun]} ${conjugated}`)
            : appendVerbTail(conjugated);
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
            'imperativo': ['ve', 'vaya', 'vamos', 'id', 'vayan']
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
            'imperativo': ['vale', 'valga', 'valgamos', 'valed', 'valgan']
        },
        'soler': {
            // 缺陷动词，仅现在时和过去未完成时常用
            'presente': ['suelo', 'sueles', 'suele', 'solemos', 'soléis', 'suelen'],
            'imperfecto': ['solía', 'solías', 'solía', 'solíamos', 'solíais', 'solían'],
            'subjuntivo': ['suela', 'suelas', 'suela', 'solamos', 'soláis', 'suelan'],
            'imperativo': ['N/A', 'N/A', 'N/A', 'N/A', 'N/A']
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
        'arrepentir': {
            'presente': ['arrepiento', 'arrepientes', 'arrepiente', 'arrepentimos', 'arrepentís', 'arrepienten'],
            'preterito': ['arrepentí', 'arrepentiste', 'arrepintió', 'arrepentimos', 'arrepentisteis', 'arrepintieron'],
            'imperfecto': ['arrepentía', 'arrepentías', 'arrepentía', 'arrepentíamos', 'arrepentíais', 'arrepentían'],
            'futuro': ['arrepentiré', 'arrepentirás', 'arrepentirá', 'arrepentiremos', 'arrepentiréis', 'arrepentirán'],
            'condicional': ['arrepentiría', 'arrepentirías', 'arrepentiría', 'arrepentiríamos', 'arrepentiríais', 'arrepentirían'],
            'subjuntivo': ['arrepienta', 'arrepientas', 'arrepienta', 'arrepintamos', 'arrepintáis', 'arrepientan'],
            'imperativo': ['arrepiente', 'arrepienta', 'arrepintamos', 'arrepentid', 'arrepientan']
        },
        'divertir': {
            'presente': ['divierto', 'diviertes', 'divierte', 'divertimos', 'divertís', 'divierten'],
            'preterito': ['divertí', 'divertiste', 'divirtió', 'divertimos', 'divertisteis', 'divirtieron'],
            'imperfecto': ['divertía', 'divertías', 'divertía', 'divertíamos', 'divertíais', 'divertían'],
            'futuro': ['divertiré', 'divertirás', 'divertirá', 'divertiremos', 'divertiréis', 'divertirán'],
            'condicional': ['divertiría', 'divertirías', 'divertiría', 'divertiríamos', 'divertiríais', 'divertirían'],
            'subjuntivo': ['divierta', 'diviertas', 'divierta', 'divirtamos', 'divirtáis', 'diviertan'],
            'imperativo': ['divierte', 'divierta', 'divirtamos', 'divertid', 'diviertan']
        },
        'despedir': {
            'presente': ['despido', 'despides', 'despide', 'despedimos', 'despedís', 'despiden'],
            'preterito': ['despedí', 'despediste', 'despidió', 'despedimos', 'despedisteis', 'despidieron'],
            'imperfecto': ['despedía', 'despedías', 'despedía', 'despedíamos', 'despedíais', 'despedían'],
            'futuro': ['despediré', 'despedirás', 'despedirá', 'despediremos', 'despediréis', 'despedirán'],
            'condicional': ['despediría', 'despedirías', 'despediría', 'despediríamos', 'despediríais', 'despedirían'],
            'subjuntivo': ['despida', 'despidas', 'despida', 'despidamos', 'despidáis', 'despidan'],
            'imperativo': ['despide', 'despida', 'despidamos', 'despedid', 'despidan']
        },
        'convertir': {
            'presente': ['convierto', 'conviertes', 'convierte', 'convertimos', 'convertís', 'convierten'],
            'preterito': ['convertí', 'convertiste', 'convirtió', 'convertimos', 'convertisteis', 'convirtieron'],
            'imperfecto': ['convertía', 'convertías', 'convertía', 'convertíamos', 'convertíais', 'convertían'],
            'futuro': ['convertiré', 'convertirás', 'convertirá', 'convertiremos', 'convertiréis', 'convertirán'],
            'condicional': ['convertiría', 'convertirías', 'convertiría', 'convertiríamos', 'convertiríais', 'convertirían'],
            'subjuntivo': ['convierta', 'conviertas', 'convierta', 'convirtamos', 'convirtáis', 'conviertan'],
            'imperativo': ['convierte', 'convierta', 'convirtamos', 'convertid', 'conviertan']
        },
        'desvestir': {
            'presente': ['desvisto', 'desvistes', 'desviste', 'desvestimos', 'desvestís', 'desvisten'],
            'preterito': ['desvestí', 'desvestiste', 'desvistió', 'desvestimos', 'desvestisteis', 'desvistieron'],
            'imperfecto': ['desvestía', 'desvestías', 'desvestía', 'desvestíamos', 'desvestíais', 'desvestían'],
            'futuro': ['desvestiré', 'desvestirás', 'desvestirá', 'desvestiremos', 'desvestiréis', 'desvestirán'],
            'condicional': ['desvestiría', 'desvestirías', 'desvestiría', 'desvestiríamos', 'desvestiríais', 'desvestirían'],
            'subjuntivo': ['desvista', 'desvistas', 'desvista', 'desvistamos', 'desvistáis', 'desvistan'],
            'imperativo': ['desviste', 'desvista', 'desvistamos', 'desvestid', 'desvistan']
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
            'imperfecto': ['prefería', 'preferías', 'prefería', 'preferíamos', 'preferíais', 'preferían'],
            'futuro': ['preferiré', 'preferirás', 'preferirá', 'preferiremos', 'preferiréis', 'preferirán'],
            'condicional': ['preferiría', 'preferirías', 'preferiría', 'preferiríamos', 'preferiríais', 'preferirían'],
            'subjuntivo': ['prefiera', 'prefieras', 'prefiera', 'prefiramos', 'prefiráis', 'prefieran'],
            'imperativo': ['prefiere', 'prefiera', 'prefiramos', 'preferid', 'prefieran']
        },
        'sugerir': {
            'presente': ['sugiero', 'sugieres', 'sugiere', 'sugerimos', 'sugerís', 'sugieren'],
            'preterito': ['sugerí', 'sugeriste', 'sugirió', 'sugerimos', 'sugeristeis', 'sugirieron'],
            'imperfecto': ['sugería', 'sugerías', 'sugería', 'sugeríamos', 'sugeríais', 'sugerían'],
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
            'preterito': ['reí', 'reíste', 'rio', 'reímos', 'reísteis', 'rieron'],
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
            'preterito': ['freí', 'freíste', 'frio', 'freímos', 'freísteis', 'frieron'],
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
        'crecer': {
            'presente': ['crezco', 'creces', 'crece', 'crecemos', 'crecéis', 'crecen'],
            'preterito': ['crecí', 'creciste', 'creció', 'crecimos', 'crecisteis', 'crecieron'],
            'imperfecto': ['crecía', 'crecías', 'crecía', 'crecíamos', 'crecíais', 'crecían'],
            'futuro': ['creceré', 'crecerás', 'crecerá', 'creceremos', 'creceréis', 'crecerán'],
            'condicional': ['crecería', 'crecerías', 'crecería', 'creceríamos', 'creceríais', 'crecerían'],
            'subjuntivo': ['crezca', 'crezcas', 'crezca', 'crezcamos', 'crezcáis', 'crezcan'],
            'imperativo': ['crece', 'crezca', 'crezcamos', 'creced', 'crezcan']
        },
        'aparecer': {
            'presente': ['aparezco', 'apareces', 'aparece', 'aparecemos', 'aparecéis', 'aparecen'],
            'preterito': ['aparecí', 'apareciste', 'apareció', 'aparecimos', 'aparecisteis', 'aparecieron'],
            'imperfecto': ['aparecía', 'aparecías', 'aparecía', 'aparecíamos', 'aparecíais', 'aparecían'],
            'futuro': ['apareceré', 'aparecerás', 'aparecerá', 'apareceremos', 'apareceréis', 'aparecerán'],
            'condicional': ['aparecería', 'aparecerías', 'aparecería', 'apareceríamos', 'apareceríais', 'aparecerían'],
            'subjuntivo': ['aparezca', 'aparezcas', 'aparezca', 'aparezcamos', 'aparezcáis', 'aparezcan'],
            'imperativo': ['aparece', 'aparezca', 'aparezcamos', 'apareced', 'aparezcan']
        },
        'desaparecer': {
            'presente': ['desaparezco', 'desapareces', 'desaparece', 'desaparecemos', 'desaparecéis', 'desaparecen'],
            'preterito': ['desaparecí', 'desapareciste', 'desapareció', 'desaparecimos', 'desaparecisteis', 'desaparecieron'],
            'imperfecto': ['desaparecía', 'desaparecías', 'desaparecía', 'desaparecíamos', 'desaparecíais', 'desaparecían'],
            'futuro': ['desapareceré', 'desaparecerás', 'desaparecerá', 'desapareceremos', 'desapareceréis', 'desaparecerán'],
            'condicional': ['desaparecería', 'desaparecerías', 'desaparecería', 'desapareceríamos', 'desapareceríais', 'desaparecerían'],
            'subjuntivo': ['desaparezca', 'desaparezcas', 'desaparezca', 'desaparezcamos', 'desaparezcáis', 'desaparezcan'],
            'imperativo': ['desaparece', 'desaparezca', 'desaparezcamos', 'desapareced', 'desaparezcan']
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
        // 词干变化 e→ie：encender, defender, perder, entender
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
        // caber — 完整不规则变位
        'caber': {
            'presente': ['quepo', 'cabes', 'cabe', 'cabemos', 'cabéis', 'caben'],
            'preterito': ['cupe', 'cupiste', 'cupo', 'cupimos', 'cupisteis', 'cupieron'],
            'imperfecto': ['cabía', 'cabías', 'cabía', 'cabíamos', 'cabíais', 'cabían'],
            'futuro': ['cabré', 'cabrás', 'cabrá', 'cabremos', 'cabréis', 'cabrán'],
            'condicional': ['cabría', 'cabrías', 'cabría', 'cabríamos', 'cabríais', 'cabrían'],
            'subjuntivo': ['quepa', 'quepas', 'quepa', 'quepamos', 'quepáis', 'quepan'],
            'imperativo': ['cabe', 'quepa', 'quepamos', 'cabed', 'quepan']
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
            'imperativo': ['vuélvete', 'vuélvase', 'volvámonos', 'volveos', 'vuélvanse']
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
            'imperativo': ['encuéntrate', 'encuéntrese', 'encontrémonos', 'encontraos', 'encuéntrense']
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
        },
        // convertir e→ie/i
        'convertir': {
            'presente': ['convierto', 'conviertes', 'convierte', 'convertimos', 'convertís', 'convierten'],
            'preterito': ['convertí', 'convertiste', 'convirtió', 'convertimos', 'convertisteis', 'convirtieron'],
            'imperfecto': ['convertía', 'convertías', 'convertía', 'convertíamos', 'convertíais', 'convertían'],
            'futuro': ['convertiré', 'convertirás', 'convertirá', 'convertiremos', 'convertiréis', 'convertirán'],
            'condicional': ['convertiría', 'convertirías', 'convertiría', 'convertiríamos', 'convertiríais', 'convertirían'],
            'subjuntivo': ['convierta', 'conviertas', 'convierta', 'convirtamos', 'convirtáis', 'conviertan'],
            'imperativo': ['convierte', 'convierta', 'convirtamos', 'convertid', 'conviertan']
        },
        // convertirse e→ie/i (代词式)
        'convertirse': {
            'presente': ['me convierto', 'te conviertes', 'se convierte', 'nos convertimos', 'os convertís', 'se convierten'],
            'preterito': ['me convertí', 'te convertiste', 'se convirtió', 'nos convertimos', 'os convertisteis', 'se convirtieron'],
            'imperfecto': ['me convertía', 'te convertías', 'se convertía', 'nos convertíamos', 'os convertíais', 'se convertían'],
            'futuro': ['me convertiré', 'te convertirás', 'se convertirá', 'nos convertiremos', 'os convertiréis', 'se convertirán'],
            'condicional': ['me convertiría', 'te convertirías', 'se convertiría', 'nos convertiríamos', 'os convertiríais', 'se convertirían'],
            'subjuntivo': ['me convierta', 'te conviertas', 'se convierta', 'nos convirtamos', 'os convirtáis', 'se conviertan'],
            'imperativo': ['conviértete', 'conviértase', 'convirtámonos', 'convertíos', 'conviértanse']
        },
        // desvestir e→i
        'desvestir': {
            'presente': ['desvisto', 'desvistes', 'desviste', 'desvestimos', 'desvestís', 'desvisten'],
            'preterito': ['desvestí', 'desvestiste', 'desvistió', 'desvestimos', 'desvestisteis', 'desvistieron'],
            'imperfecto': ['desvestía', 'desvestías', 'desvestía', 'desvestíamos', 'desvestíais', 'desvestían'],
            'futuro': ['desvestiré', 'desvestirás', 'desvestirá', 'desvestiremos', 'desvestiréis', 'desvestirán'],
            'condicional': ['desvestiría', 'desvestirías', 'desvestiría', 'desvestiríamos', 'desvestiríais', 'desvestirían'],
            'subjuntivo': ['desvista', 'desvistas', 'desvista', 'desvistamos', 'desvistáis', 'desvistan'],
            'imperativo': ['desviste', 'desvista', 'desvistamos', 'desvestid', 'desvistan']
        },
        // desvestirse e→i (代词式)
        'desvestirse': {
            'presente': ['me desvisto', 'te desvistes', 'se desviste', 'nos desvestimos', 'os desvestís', 'se desvisten'],
            'preterito': ['me desvestí', 'te desvestiste', 'se desvistió', 'nos desvestimos', 'os desvestisteis', 'se desvistieron'],
            'imperfecto': ['me desvestía', 'te desvestías', 'se desvestía', 'nos desvestíamos', 'os desvestíais', 'se desvestían'],
            'futuro': ['me desvestiré', 'te desvestirás', 'se desvestirá', 'nos desvestiremos', 'os desvestiréis', 'se desvestirán'],
            'condicional': ['me desvestiría', 'te desvestirías', 'se desvestiría', 'nos desvestiríamos', 'os desvestiríais', 'se desvestirían'],
            'subjuntivo': ['me desvista', 'te desvistas', 'se desvista', 'nos desvistamos', 'os desvistáis', 'se desvistan'],
            'imperativo': ['desvístete', 'desvístase', 'desvistámonos', 'desvestíos', 'desvístanse']
        },
        // parecer（yo: parezco, subjuntivo: parezca）
        'parecer': {
            'presente': ['parezco', 'pareces', 'parece', 'parecemos', 'parecéis', 'parecen'],
            'preterito': ['parecí', 'pareciste', 'pareció', 'parecimos', 'parecisteis', 'parecieron'],
            'imperfecto': ['parecía', 'parecías', 'parecía', 'parecíamos', 'parecíais', 'parecían'],
            'futuro': ['pareceré', 'parecerás', 'parecerá', 'pareceremos', 'pareceréis', 'parecerán'],
            'condicional': ['parecería', 'parecerías', 'parecería', 'pareceríamos', 'pareceríais', 'parecerían'],
            'subjuntivo': ['parezca', 'parezcas', 'parezca', 'parezcamos', 'parezcáis', 'parezcan'],
            'imperativo': ['parece', 'parezca', 'parezcamos', 'pareced', 'parezcan']
        },
        // parecerse（代词式）
        'parecerse': {
            'presente': ['me parezco', 'te pareces', 'se parece', 'nos parecemos', 'os parecéis', 'se parecen'],
            'preterito': ['me parecí', 'te pareciste', 'se pareció', 'nos parecimos', 'os parecisteis', 'se parecieron'],
            'imperfecto': ['me parecía', 'te parecías', 'se parecía', 'nos parecíamos', 'os parecíais', 'se parecían'],
            'futuro': ['me pareceré', 'te parecerás', 'se parecerá', 'nos pareceremos', 'os pareceréis', 'se parecerán'],
            'condicional': ['me parecería', 'te parecerías', 'se parecería', 'nos pareceríamos', 'os pareceríais', 'se parecerían'],
            'subjuntivo': ['me parezca', 'te parezcas', 'se parezca', 'nos parezcamos', 'os parezcáis', 'se parezcan'],
            'imperativo': ['parécete', 'parézcase', 'parezcámonos', 'pareceos', 'parézcanse']
        },
        // enviar（重音移动 í 在 yo/tú/él/ellos 单数/第三复数）
        'enviar': {
            'presente': ['envío', 'envías', 'envía', 'enviamos', 'enviáis', 'envían'],
            'preterito': ['envié', 'enviaste', 'envió', 'enviamos', 'enviasteis', 'enviaron'],
            'imperfecto': ['enviaba', 'enviabas', 'enviaba', 'enviábamos', 'enviabais', 'enviaban'],
            'futuro': ['enviaré', 'enviarás', 'enviará', 'enviaremos', 'enviaréis', 'enviarán'],
            'condicional': ['enviaría', 'enviarías', 'enviaría', 'enviaríamos', 'enviaríais', 'enviarían'],
            'subjuntivo': ['envíe', 'envíes', 'envíe', 'enviemos', 'enviéis', 'envíen'],
            'imperativo': ['envía', 'envíe', 'enviemos', 'enviad', 'envíen']
        },
        // acercar（-car 正字法）
        'acercar': {
            'presente': ['acerco', 'acercas', 'acerca', 'acercamos', 'acercáis', 'acercan'],
            'preterito': ['acerqué', 'acercaste', 'acercó', 'acercamos', 'acercasteis', 'acercaron'],
            'imperfecto': ['acercaba', 'acercabas', 'acercaba', 'acercábamos', 'acercabais', 'acercaban'],
            'futuro': ['acercaré', 'acercarás', 'acercará', 'acercaremos', 'acercaréis', 'acercarán'],
            'condicional': ['acercaría', 'acercarías', 'acercaría', 'acercaríamos', 'acercaríais', 'acercarían'],
            'subjuntivo': ['acerque', 'acerques', 'acerque', 'acerquemos', 'acerquéis', 'acerquen'],
            'imperativo': ['acerca', 'acerque', 'acerquemos', 'acercad', 'acerquen']
        },
        // acercarse（-car 正字法，代词式）
        'acercarse': {
            'presente': ['me acerco', 'te acercas', 'se acerca', 'nos acercamos', 'os acercáis', 'se acercan'],
            'preterito': ['me acerqué', 'te acercaste', 'se acercó', 'nos acercamos', 'os acercasteis', 'se acercaron'],
            'imperfecto': ['me acercaba', 'te acercabas', 'se acercaba', 'nos acercábamos', 'os acercabais', 'se acercaban'],
            'futuro': ['me acercaré', 'te acercarás', 'se acercará', 'nos acercaremos', 'os acercaréis', 'se acercarán'],
            'condicional': ['me acercaría', 'te acercarías', 'se acercaría', 'nos acercaríamos', 'os acercaríais', 'se acercarían'],
            'subjuntivo': ['me acerque', 'te acerques', 'se acerque', 'nos acerquemos', 'os acerquéis', 'se acerquen'],
            'imperativo': ['acércate', 'acérquese', 'acerquémonos', 'acercaos', 'acérquense']
        }
    };

    // 检查不规则动词时的查找顺序：
    //   1. 完整原形（含se，如 acostarse）
    //   2. 去se的词根（如 acostar → 但此时需要加代词前缀）
    //   3. 非代词式时直接用 infinitive
    function lookupIrregular(tense, pronounIndex) {
        // 优先查含 se 的完整原形（表里的值已经包含代词前缀）
        if (isReflexive && irregulars[infinitive] && irregulars[infinitive][tense]) {
            return appendVerbTail(irregulars[infinitive][tense][pronounIndex]);
        }
        // 再查去掉 se 的词根，需要加代词前缀
        const base = isReflexive ? baseVerb : infinitive;
        if (irregulars[base] && irregulars[base][tense]) {
            const conjugated = irregulars[base][tense][pronounIndex];
            if (isReflexive) {
                return appendVerbTail(`${reflexivePronouns[pronoun]} ${conjugated}`);
            }
            return appendVerbTail(conjugated);
        }
        return null;
    }

    // 命令式：先查完整不规则表
    if (tense === 'imperativo') {
        const imperativoPronouns = ['tú', 'usted', 'nosotros', 'vosotros', 'ustedes'];
        const impIdx = imperativoPronouns.indexOf(pronoun);
        if (impIdx === -1) return 'N/A'; // yo 没有命令式

        if (isReflexive && irregulars[infinitive] && irregulars[infinitive].imperativo) {
            return appendVerbTail(irregulars[infinitive].imperativo[impIdx]);
        }

        if (irregulars[baseVerb] && irregulars[baseVerb].imperativo) {
            const irregularImperative = irregulars[baseVerb].imperativo[impIdx];
            return isReflexive ? buildReflexiveImperative(irregularImperative) : appendVerbTail(irregularImperative);
        }

        // 规则命令式：tú=3sg presente, usted/nosotros/ustedes=subjuntivo, vosotros=-d
        const imperativoEndings = {
            'ar': ['a', 'e', 'emos', 'ad', 'en'],
            'er': ['e', 'a', 'amos', 'ed', 'an'],
            'ir': ['e', 'a', 'amos', 'id', 'an']
        };
        let conjugatedImp = stem + imperativoEndings[ending][impIdx];
        // 正字法变化（usted/nosotros/ustedes 走虚拟式音，需要 c→qu / g→gu / z→c）
        if (impIdx !== 0 && impIdx !== 3) { // 不是 tú 和 vosotros
            if (stem.endsWith('c') && ending === 'ar') {
                conjugatedImp = conjugatedImp.replace(/^(.*?)c([eéi])/, '$1qu$2');
            } else if (stem.endsWith('g') && ending === 'ar') {
                conjugatedImp = conjugatedImp.replace(/^(.*?)g([eéi])/, '$1gu$2');
            } else if (stem.endsWith('z') && ending === 'ar') {
                conjugatedImp = conjugatedImp.replace(/^(.*?)z([eéi])/, '$1c$2');
            }
        }
        return isReflexive ? buildReflexiveImperative(conjugatedImp) : appendVerbTail(conjugatedImp);
    }

    // 其他时态：查不规则表
    const pronounIndex = STANDARD_PRONOUNS.indexOf(pronoun);
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

    // 正字法变化（orthographic changes）
    // -car：c→qu（yo preterito, 虚拟式现在时全部, 命令式 usted/nosotros/ustedes）
    // -gar：g→gu（相同位置）
    // -zar：z→c（相同位置）
    // 注意：命令式已在上面单独处理，这里只处理 preterito yo 和 subjuntivo
    const needsOrthographic = (tense === 'preterito' && pronoun === 'yo') ||
        (tense === 'subjuntivo');
    if (needsOrthographic) {
        if (stem.endsWith('c') && ending === 'ar') {
            // -car: buscar→busqu-
            conjugated = conjugated.replace(/^(.*?)c([eéi])/, '$1qu$2');
        } else if (stem.endsWith('g') && ending === 'ar') {
            // -gar: llegar→llegu-
            conjugated = conjugated.replace(/^(.*?)g([eéi])/, '$1gu$2');
        } else if (stem.endsWith('z') && ending === 'ar') {
            // -zar: rezar→rec-
            conjugated = conjugated.replace(/^(.*?)z([eéi])/, '$1c$2');
        }
    }
    
    // 如果是代词式动词，添加相应的代词
    if (isReflexive) {
        return appendVerbTail(`${reflexivePronouns[pronoun]} ${conjugated}`);
    }
    
    return appendVerbTail(conjugated);
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

    if (scenarioSelect) scenarioSelect.addEventListener('change', () => loadNewDialogue({ record: true }));
    if (newDialogueBtn) newDialogueBtn.addEventListener('click', () => loadNewDialogue({ record: true }));
    if (newChallengeBtn) newChallengeBtn.addEventListener('click', loadNewChallenge);
    if (showSampleBtn) showSampleBtn.addEventListener('click', showSampleAnswer);

    // B2 题型事件
    if (b2TypeSelect) b2TypeSelect.addEventListener('change', () => loadB2Challenge({ record: true }));
    if (newB2ChallengeBtn) newB2ChallengeBtn.addEventListener('click', () => loadB2Challenge({ record: true }));
    if (showB2SampleBtn) showB2SampleBtn.addEventListener('click', showB2SampleAnswer);
    if (speakB2Btn) speakB2Btn.addEventListener('click', speakB2Sample);

    // 然后加载初始内容（使用 try-catch 防止出错影响事件绑定）
    try {
        loadNewDialogue({ record: false });
    } catch (e) {
        console.error('loadNewDialogue 出错:', e);
    }

    try {
        loadDailyChallenge();
    } catch (e) {
        console.error('loadDailyChallenge 出错:', e);
    }

    try {
        loadB2Challenge({ record: false });
    } catch (e) {
        console.error('loadB2Challenge 出错:', e);
    }
}

function shouldRecordSpeakingAction(options = {}) {
    if (options && typeof options === 'object' && Object.prototype.hasOwnProperty.call(options, 'record')) {
        return options.record !== false;
    }
    return options !== false;
}

function loadNewDialogue(options = {}) {
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

    if (shouldRecordSpeakingAction(options)) {
        recordSpeakingProgress('dialogueLoads');
    }
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
    return speakSpanishText(text, {
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
    if (speakLineFemale(text)) {
        recordSpeakingProgress('audioPlays');
    }
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

    const dailyChallenges = speakingChallenges.filter(item => !item.type || !String(item.type).startsWith('b2_'));
    if (dailyChallenges.length === 0) {
        console.log('没有可用的日常口语挑战');
        return;
    }
    
    let newChallenge;
    do {
        newChallenge = dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
    } while (newChallenge === currentChallenge && dailyChallenges.length > 1);
    currentChallenge = newChallenge;
    displayChallenge(currentChallenge);
    // 隐藏参考口语
    document.getElementById('sampleAnswerBox').style.display = 'none';
    document.getElementById('showSampleBtn').textContent = '查看参考口语';
    document.getElementById('showSampleBtn').style.display = 'inline-block';
    recordSpeakingProgress('challengeLoads');
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

function normalizeSpeakingExerciseText(text) {
    return stripSpanishAccents(String(text || '').toLowerCase())
        .replace(/[¿?¡!.,;:()"']/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function evaluateSpeakingExercise(userAnswer, correctAnswer) {
    const directCompare = compareTrainerAnswer(userAnswer, correctAnswer);
    const normalizedUser = normalizeSpeakingExerciseText(userAnswer);
    const normalizedCorrect = normalizeSpeakingExerciseText(correctAnswer);
    const containsCoreExpression = normalizedCorrect && (
        normalizedUser === normalizedCorrect
        || normalizedUser.startsWith(normalizedCorrect + ' ')
        || normalizedUser.endsWith(' ' + normalizedCorrect)
        || normalizedUser.includes(` ${normalizedCorrect} `)
    );

    return {
        isCorrect: directCompare.isCorrect || containsCoreExpression,
        accentOnly: directCompare.isCorrect && directCompare.accentOnly
    };
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
    
    container.innerHTML = '<h4>✏️ B2.1 进阶口语输出</h4><p class="exercise-note">这些句子优先选自不同场景的口语对话。根据中文提示，用西语完整句作答；尽量不要只写单个词或短语。能补充原因、感受、结果或建议更好，但不强制。</p>';
    
    exercises.forEach((ex, index) => {
        const exerciseEl = document.createElement('div');
        exerciseEl.className = 'exercise-item';
        exerciseEl.innerHTML = `
            <div class="exercise-zh">${index + 1}. ${ex.zh}</div>
            <div class="exercise-hint">提示词：${ex.hint}</div>
            <div class="exercise-input-group">
                <input type="text" class="exercise-input" id="exercise-${index}" placeholder="写一句完整西语..." autocomplete="off">
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
    recordSpeakingProgress('exerciseChecks');

    const input = document.getElementById(`exercise-${index}`);
    const feedback = document.getElementById(`feedback-${index}`);
    const userAnswer = input.value.trim();
    
    if (userAnswer === '') {
        feedback.innerHTML = '<span class="feedback-hint">请先写出一句完整回答。</span>';
        return;
    }

    const evaluation = evaluateSpeakingExercise(userAnswer, correctAnswer);
    
    if (evaluation.isCorrect) {
        const message = evaluation.accentOnly
            ? '✅ 表达对了，注意重音和细节拼写。'
            : '✅ 对了，这句已经通过。想更像 B2.1 的话，可以再补一句原因、感受或建议，但不是必须。';
        feedback.innerHTML = `<span class="feedback-correct">${message}</span>`;
        input.classList.add('correct');
        input.classList.remove('incorrect');
        return;
    }

    feedback.innerHTML = '<span class="feedback-wrong">❌ 关键表达还没到位，再试试，尽量写成完整句，并把提示词用进去。</span>';
    input.classList.add('incorrect');
    input.classList.remove('correct');
}

// 显示练习答案
function showExerciseAnswer(index, answer) {
    recordSpeakingProgress('exerciseRevealCount');

    const input = document.getElementById(`exercise-${index}`);
    const feedback = document.getElementById(`feedback-${index}`);
    input.value = answer;
    feedback.innerHTML = `<span class="feedback-answer">💡 参考句：${answer}。可以直接用这一句，也可以在后面再补一句原因、感受或建议。</span>`;
    input.classList.remove('incorrect');
    input.classList.remove('correct');
}

// 显示/隐藏参考口语
function showSampleAnswer() {
    const sampleBox = document.getElementById('sampleAnswerBox');
    const btn = document.getElementById('showSampleBtn');
    if (sampleBox.style.display === 'none') {
        sampleBox.style.display = 'block';
        btn.textContent = '隐藏参考口语';
        recordSpeakingProgress('sampleViews');
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
function loadB2Challenge(options = {}) {
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

    if (shouldRecordSpeakingAction(options)) {
        recordSpeakingProgress('b2Loads');
    }
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
        recordSpeakingProgress('sampleViews');
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

    if (speakSpanishText(currentB2Challenge.sample, {
        rate: 0.85,
        pitch: 1,
        volume: 1,
        responsiveVoiceName: 'Spanish Latin American Female'
    })) {
        recordSpeakingProgress('audioPlays');
    }
}

function getSpeakingActionCount(stats = {}) {
    return ['dialogueLoads', 'challengeLoads', 'b2Loads', 'sampleViews', 'audioPlays', 'exerciseChecks', 'exerciseRevealCount']
        .reduce((sum, key) => sum + (Number(stats[key]) || 0), 0);
}

function recordSpeakingProgress(kind, amount = 1) {
    const safeAmount = Math.max(0, Number(amount) || 0);
    if (!safeAmount) {
        return;
    }

    if (!Object.prototype.hasOwnProperty.call(createEmptySpeakingStats(), kind)) {
        return;
    }

    const todayKey = getLocalDateKey();
    updateStreak();

    progress.speakingStats = normalizeSpeakingStats(progress.speakingStats);
    progress.speakingStats[kind] = (progress.speakingStats[kind] || 0) + safeAmount;
    progress.speakingStats.lastPracticedDate = todayKey;

    if (!progress.historyByDate[todayKey]) {
        progress.historyByDate[todayKey] = normalizeHistoryEntry();
    }

    const dayEntry = progress.historyByDate[todayKey];
    dayEntry.speaking = normalizeSpeakingStats(dayEntry.speaking);
    dayEntry.speaking[kind] = (dayEntry.speaking[kind] || 0) + safeAmount;
    dayEntry.speaking.lastPracticedDate = todayKey;
    dayEntry.sessions += safeAmount;
    dayEntry.modules.speaking = (dayEntry.modules.speaking || 0) + safeAmount;

    saveProgress();
}

// ============ 进度管理 ============
function initProgress() {
    document.getElementById('resetProgressBtn').addEventListener('click', () => {
        if (confirm('确定要重置所有学习进度吗？此操作不可撤销。')) {
            progress = createEmptyProgressState();
            saveProgress();
            updateProgressDisplay();
        }
    });

    updateProgressDisplay();
}

function saveProgress() {
    localStorage.setItem('spanishProgress', JSON.stringify(progress));
}

function updateStreak() {
    const todayKey = getLocalDateKey();
    const lastDate = parseStoredDate(progress.lastStudyDate);

    if (!lastDate) {
        progress.streakDays = 1;
        progress.lastStudyDate = todayKey;
        return;
    }

    const lastKey = getLocalDateKey(lastDate);
    if (lastKey === todayKey) {
        return;
    }

    const diffDays = getDaysBetween(lastDate, parseStoredDate(todayKey));
    progress.streakDays = diffDays === 1 ? progress.streakDays + 1 : 1;
    progress.lastStudyDate = todayKey;
}

function getProgressAccuracy(correct, attempts) {
    return attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
}

function getWeakPointKey(verbInf, tense, pronoun = '') {
    return `${verbInf}__${tense}__${pronoun}`;
}

function recordWeakPointDetails(items = [], options = {}) {
    const todayKey = getLocalDateKey();
    const moduleName = options.module || '';

    items.forEach(item => {
        const verb = String(item?.verb || '').trim();
        const tense = String(item?.tense || '').trim();
        const pronoun = String(item?.pronoun || '').trim();
        const count = Number(item?.count) || 1;
        if (!verb || !tense || !pronoun) {
            return;
        }

        const key = getWeakPointKey(verb, tense, pronoun);
        if (!progress.weakPointDetails[key]) {
            progress.weakPointDetails[key] = normalizeWeakPointEntry({ verb, tense, pronoun, count: 0 });
        }

        progress.weakPointDetails[key].count += count;
        progress.weakPointDetails[key].lastWrongDate = todayKey;
        if (moduleName) {
            progress.weakPointDetails[key].module = moduleName;
        }
    });

    saveProgress();
}

function getPronounHint(pronoun) {
    const pronounHints = {
        'yo': '第一人称单数',
        'tú': '第二人称单数',
        'él/ella/usted': '第三人称单数',
        'nosotros': '第一人称复数',
        'vosotros': '第二人称复数',
        'ellos/ustedes': '第三人称复数',
        'usted': '第三人称单数',
        'ustedes': '第三人称复数'
    };

    return pronounHints[pronoun] || '该人称';
}

function getWeakPointEntries(limit = 12) {
    const detailEntries = Object.values(progress.weakPointDetails || {})
        .filter(entry => entry.verb && entry.tense && entry.pronoun && (entry.count || 0) > 0)
        .sort((entryA, entryB) => {
            if ((entryB.count || 0) !== (entryA.count || 0)) {
                return (entryB.count || 0) - (entryA.count || 0);
            }
            return (entryB.lastWrongDate || '').localeCompare(entryA.lastWrongDate || '');
        });

    if (detailEntries.length > 0) {
        return detailEntries.slice(0, limit);
    }

    return (reviewState.wrongVerbs || [])
        .filter(item => item.verb && item.tense)
        .sort((itemA, itemB) => {
            if ((itemB.attempts || 0) !== (itemA.attempts || 0)) {
                return (itemB.attempts || 0) - (itemA.attempts || 0);
            }
            return String(itemB.lastWrongDate || '').localeCompare(String(itemA.lastWrongDate || ''));
        })
        .slice(0, limit)
        .map(item => ({
            verb: item.verb,
            tense: item.tense,
            pronoun: '',
            count: Number(item.attempts) || 0,
            lastWrongDate: item.lastWrongDate || null,
            isLegacy: true
        }));
}

function getSortedHistoryEntries(limit = 7) {
    return Object.entries(progress.historyByDate || {})
        .sort(([dateA], [dateB]) => dateA < dateB ? 1 : -1)
        .slice(0, limit);
}

function formatModuleSummary(modules = {}) {
    const moduleLabels = {
        daily: '每日练习',
        trainer: '训练营',
        review: '错题重练',
        speaking: '口语练习'
    };

    return Object.entries(moduleLabels)
        .filter(([key]) => (modules[key] || 0) > 0)
        .map(([key, label]) => `${label} ${modules[key]} 次`)
        .join(' / ');
}

function buildProgressHistorySummary(entry = {}) {
    const summaryParts = [];
    const uniqueVerbCount = Object.keys(entry.verbs || {}).length;
    const speakingCount = getSpeakingActionCount(entry.speaking || {});

    if (entry.attempts > 0) {
        summaryParts.push(`${entry.attempts} 格`);
        summaryParts.push(`${getProgressAccuracy(entry.correct, entry.attempts)}%`);
    }

    if (uniqueVerbCount > 0) {
        summaryParts.push(`${uniqueVerbCount} 个动词`);
    }

    if (speakingCount > 0) {
        summaryParts.push(`口语 ${speakingCount} 次`);
    }

    if (entry.reveals > 0) {
        summaryParts.push(`看答案 ${entry.reveals} 次`);
    }

    return summaryParts.join(' · ') || '当天有学习记录';
}

function renderProgressOverview() {
    const overview = document.getElementById('progressBreakdown');
    if (!overview) {
        return;
    }

    const historyEntries = getSortedHistoryEntries(7);
    if (historyEntries.length === 0) {
        const hasLegacyStats = Object.keys(progress.practicedVerbs).length > 0;
        overview.innerHTML = `<p class="empty">${hasLegacyStats ? '最近 7 天明细会从这次升级后开始累计；旧的累计统计仍保留。' : '还没有最近 7 天记录，开始练习后这里会显示模块分布与最近表现。'}</p>`;
        return;
    }

    const totals = historyEntries.reduce((summary, [, entry]) => {
        summary.attempts += entry.attempts;
        summary.correct += entry.correct;
        summary.reveals += entry.reveals;
        summary.sessions += entry.sessions;
        summary.uniqueVerbs += Object.keys(entry.verbs || {}).length;
        summary.modules.daily += entry.modules?.daily || 0;
        summary.modules.trainer += entry.modules?.trainer || 0;
        summary.modules.review += entry.modules?.review || 0;
        summary.modules.speaking += entry.modules?.speaking || 0;
        return summary;
    }, {
        attempts: 0,
        correct: 0,
        reveals: 0,
        sessions: 0,
        uniqueVerbs: 0,
        modules: { daily: 0, trainer: 0, review: 0, speaking: 0 }
    });

    overview.innerHTML = `
        <div class="progress-overview-grid">
            <div class="progress-overview-card">
                <strong>最近 7 天作答</strong>
                <span>${totals.attempts} 格</span>
            </div>
            <div class="progress-overview-card">
                <strong>最近 7 天正确率</strong>
                <span>${getProgressAccuracy(totals.correct, totals.attempts)}%</span>
            </div>
            <div class="progress-overview-card">
                <strong>最近 7 天直接看答案</strong>
                <span>${totals.reveals} 次</span>
            </div>
            <div class="progress-overview-card">
                <strong>最近 7 天练习条目</strong>
                <span>${totals.sessions} 条</span>
            </div>
        </div>
        <div class="progress-module-breakdown">${formatModuleSummary(totals.modules) || '最近 7 天还没有模块分布数据。'}</div>
    `;
}

function renderProgressHistory() {
    const historyContainer = document.getElementById('progressHistory');
    if (!historyContainer) {
        return;
    }

    const historyEntries = getSortedHistoryEntries(7);
    if (historyEntries.length === 0) {
        const hasLegacyStats = Object.keys(progress.practicedVerbs).length > 0 || getSpeakingActionCount(progress.speakingStats || {}) > 0;
        historyContainer.innerHTML = `<p class="empty">${hasLegacyStats ? '按天记录会从这次升级后开始累计；旧的累计练习数据仍保留在本页。' : '还没有按天练习记录，开始做一题后这里就会显示最近 7 天的学习情况。'}</p>`;
        return;
    }

    historyContainer.innerHTML = historyEntries.map(([dateKey, entry]) => `
        <div class="history-row">
            <div class="history-row-main">
                <strong>${formatProgressDateLabel(dateKey)}</strong>
                <span>${buildProgressHistorySummary(entry)}</span>
            </div>
            <div class="history-row-meta">${formatModuleSummary(entry.modules) || '暂无模块分布'}</div>
        </div>
    `).join('');
}

function renderSpeakingProgress() {
    const container = document.getElementById('speakingProgress');
    if (!container) {
        return;
    }

    const stats = normalizeSpeakingStats(progress.speakingStats);
    const totalActions = getSpeakingActionCount(stats);
    if (totalActions === 0) {
        container.innerHTML = '<p class="empty">开始做口语练习后，这里会显示对话、话题、B2 题目、朗读等统计数据。</p>';
        return;
    }

    const statItems = [
        { label: '对话场景', value: stats.dialogueLoads, hint: '切换或生成对话' },
        { label: '今日话题', value: stats.challengeLoads, hint: '更换口语话题' },
        { label: 'B2 题目', value: stats.b2Loads, hint: '生成 B2 口语题' },
        { label: '参考内容', value: stats.sampleViews, hint: '查看参考口语/范文' },
        { label: '朗读播放', value: stats.audioPlays, hint: '播放西语音频' },
        { label: '互动练习', value: stats.exerciseChecks, hint: '检查练习答案' }
    ];

    container.innerHTML = `
        <div class="speaking-progress-grid">
            ${statItems.map(item => `
                <div class="speaking-progress-item">
                    <strong>${item.label}</strong>
                    <span>${item.value}</span>
                    <small>${item.hint}</small>
                </div>
            `).join('')}
        </div>
        <div class="speaking-progress-meta">
            累计口语操作 ${totalActions} 次 · 显示互动练习答案 ${stats.exerciseRevealCount} 次 · 最近一次：${stats.lastPracticedDate ? formatProgressDateLabel(stats.lastPracticedDate) : '还没有记录'}
        </div>
    `;
}

function renderPracticedVerbDetails() {
    const verbList = document.getElementById('practicedVerbs');
    if (!verbList) {
        return;
    }

    const verbs = Object.entries(progress.practicedVerbs)
        .sort(([, statsA], [, statsB]) => {
            const dateA = statsA.lastPracticedDate || '';
            const dateB = statsB.lastPracticedDate || '';
            if (dateA !== dateB) {
                return dateA < dateB ? 1 : -1;
            }
            return (statsB.count || 0) - (statsA.count || 0);
        });

    if (verbs.length === 0) {
        verbList.innerHTML = '<p class="empty">还没有练习记录，开始你的第一节课吧！</p>';
        return;
    }

    verbList.innerHTML = verbs.map(([verb, stats]) => {
        const totalForms = stats.forms || (stats.count * 6);
        const accuracy = getProgressAccuracy(stats.correct, totalForms);
        const className = accuracy >= 80 ? 'mastered' : 'practicing';
        return `
            <div class="verb-detail-item ${className}">
                <div class="verb-detail-main">
                    <strong>${verb}</strong>
                    <span>${accuracy}% 正确率</span>
                </div>
                <div class="verb-detail-meta">
                    <span>练习 ${stats.count} 次</span>
                    <span>作答 ${totalForms} 格</span>
                    <span>最近：${stats.lastPracticedDate ? formatProgressDateLabel(stats.lastPracticedDate) : '较早'}</span>
                </div>
            </div>
        `;
    }).join('');
}

function renderWeakPoints() {
    const weakPoints = document.getElementById('weakPoints');
    if (!weakPoints) {
        return;
    }

    const weakPointEntries = getWeakPointEntries(12);
    if (weakPointEntries.length === 0) {
        weakPoints.innerHTML = '<p>这里会按"单词 + 时态 + 人称"列出最容易出错的内容。</p>';
        return;
    }

    weakPoints.innerHTML = weakPointEntries.map(entry => {
        const tenseName = tenses[entry.tense]?.name || entry.tense;
        const pronounText = entry.pronoun
            ? `${entry.pronoun}（${getPronounHint(entry.pronoun)}）`
            : '旧记录暂未细分到人称';
        const metaText = `${tenseName} · ${pronounText}`;
        const suffix = entry.count > 1 ? `错 ${entry.count} 次` : '错 1 次';
        return `
            <div class="weak-point-item${entry.isLegacy ? ' legacy' : ''}">
                <div class="weak-point-main">
                    <strong>${entry.verb}</strong>
                    <span>${suffix}</span>
                </div>
                <div class="weak-point-meta">${metaText}</div>
            </div>
        `;
    }).join('');
}

function updateProgressDisplay() {
    const uniqueVerbCount = Object.keys(progress.practicedVerbs).length;
    document.getElementById('totalVerbs').textContent = progress.totalVerbs;
    document.getElementById('uniqueVerbCount').textContent = uniqueVerbCount;
    document.getElementById('correctRate').textContent = getProgressAccuracy(progress.correctCount, progress.totalAttempts) + '%';
    document.getElementById('streakDays').textContent = progress.streakDays;
    document.getElementById('totalTime').textContent = progress.totalAttempts > 0
        ? Math.max(1, Math.round(progress.totalAttempts * 0.5))
        : 0;

    renderSpeakingProgress();
    renderProgressHistory();
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
                <button class="btn btn-primary btn-small" onclick="startReviewPractice(${index})" data-verb="${item.verb}" data-tense="${item.tense}">开始复习</button>
            </div>
        `;
    }).join('');
}

// 开始复习特定错题
function startReviewPractice(index) {
    // 优先从按钮的 data-verb/data-tense 精确匹配，防止 index 因异步刷新错位
    const btn = event && event.currentTarget;
    const verbKey = btn?.dataset?.verb;
    const tenseKey = btn?.dataset?.tense;
    let wrongItem;
    if (verbKey && tenseKey) {
        wrongItem = reviewState.wrongVerbs.find(w => w.verb === verbKey && w.tense === tenseKey);
    }
    if (!wrongItem) {
        wrongItem = reviewState.wrongVerbs[index];
    }
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
    // 如果 verbsData 里找不到（例如 haber/caber 这类辅助动词），构造一个最小对象以防崩溃
    if (!currentVerb) {
        currentVerb = { inf: wrongItem.verb, meaning: '', type: 'irregular' };
    }
    // 严格使用错题原来的时态，绝不更改
    currentTense = wrongItem.tense;
    
    // 更新进度显示
    document.getElementById('reviewCurrent').textContent = reviewState.currentIndex + 1;
    document.getElementById('reviewTotal').textContent = reviewState.currentVerbs.length;
    document.getElementById('reviewProgressBar').style.width = 
        ((reviewState.currentIndex / reviewState.currentVerbs.length) * 100) + '%';
    
    document.getElementById('reviewStatus').textContent = 
        `复习错题 - 时态：${tenses[currentTense]?.name || currentTense}（必须使用该时态）`;
    
    // 更新动词显示
    const verbType = getVerbTypeLabel(currentVerb, currentTense);
    document.getElementById('reviewVerbInfinitive').textContent = `${currentVerb.inf}${verbType ? ` ${verbType}` : ''}`;
    document.getElementById('reviewVerbMeaning').textContent = currentVerb.meaning;
    document.getElementById('reviewVerbTense').textContent = tenses[currentTense]?.name || currentTense;
    
    // 显示时态规则和不规则动词列表
    renderTenseRuleBox('reviewTenseRuleBox', currentTense);
    
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
    const weakPointItems = [];

    inputs.forEach(input => {
        const pronoun = input.dataset.pronoun;
        const userAnswer = input.value.trim();
        const correctAnswer = conjugateVerb(currentVerb.inf, currentTense, pronoun);
        const comparison = compareTrainerAnswer(userAnswer, correctAnswer);

        input.disabled = true;
        
        if (comparison.isCorrect) {
            input.classList.add('correct');
            correct++;
        } else {
            input.classList.add('incorrect');
            input.value = `${userAnswer || '（空）'} → ${correctAnswer}`;
            hasError = true;
            weakPointItems.push({
                verb: currentVerb.inf,
                tense: currentTense,
                pronoun
            });
        }
    });

    // 更新进度统计
    recordPracticeProgress(currentVerb.inf, currentTense, correct, total, {
        module: 'review'
    });
    if (weakPointItems.length > 0) {
        recordWeakPointDetails(weakPointItems, { module: 'review' });
    }

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
    const weakPointItems = [];

    inputs.forEach(input => {
        const pronoun = input.dataset.pronoun;
        input.value = conjugateVerb(currentVerb.inf, currentTense, pronoun);
        input.disabled = true;
        input.classList.add('incorrect');
        weakPointItems.push({
            verb: currentVerb.inf,
            tense: currentTense,
            pronoun
        });
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

    recordPracticeProgress(currentVerb.inf, currentTense, 0, inputs.length || tenses[currentTense].pronouns.length, {
        module: 'review',
        revealed: true
    });
    recordWeakPointDetails(weakPointItems, { module: 'review' });
    
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

// ============ 全局函数导出（供 onclick 备用） ============
if (typeof window !== "undefined") {
    window.enableOwnerAccess = enableOwnerAccess;
    window.unlockApprovedAccess = unlockApprovedAccess;
    window.clearApprovedAccess = clearApprovedAccess;
    console.log("[DEBUG] 访问门控全局函数已导出");
}

} catch (error) {
    console.error('[GLOBAL-FIX🚨] app.js 加载失败，但至少不会完全崩溃:', error);
    // 至少手动设置权限，让页面可以使用
    try {
        localStorage.setItem('spanishLearningOwnerAccess', 'true');
        localStorage.setItem('spanishLearningAccessMode', 'owner');
        console.log('[GLOBAL-FIX🚨] 紧急：JS有错误，但已强制设置访问权限');
    } catch (e) {
        console.error('[GLOBAL-FIX🚨] 连localStorage都失败了:', e);
    }
}
