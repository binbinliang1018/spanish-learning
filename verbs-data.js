// 西班牙语动词数据 - B2级别常用动词
const verbsData = [
    // 常用动词
    { inf: "ser", meaning: "是（本质）", type: "irregular" },
    { inf: "estar", meaning: "是（状态）/在", type: "irregular" },
    { inf: "tener", meaning: "有", type: "irregular" },
    { inf: "hacer", meaning: "做/制造", type: "irregular" },
    { inf: "decir", meaning: "说", type: "irregular" },
    { inf: "ir", meaning: "去", type: "irregular" },
    { inf: "ver", meaning: "看", type: "irregular" },
    { inf: "dar", meaning: "给", type: "irregular" },
    { inf: "saber", meaning: "知道", type: "irregular" },
    { inf: "conocer", meaning: "认识/了解", type: "irregular" },
    { inf: "poder", meaning: "能够", type: "irregular" },
    { inf: "querer", meaning: "想要/爱", type: "irregular" },
    { inf: "venir", meaning: "来", type: "irregular" },
    { inf: "poner", meaning: "放置", type: "irregular" },
    { inf: "salir", meaning: "出去", type: "irregular" },
    { inf: "traer", meaning: "带来", type: "irregular" },
    { inf: "oír", meaning: "听", type: "irregular" },
    { inf: "venir", meaning: "来", type: "irregular" },
    
    // AR动词
    { inf: "hablar", meaning: "说话", type: "ar" },
    { inf: "trabajar", meaning: "工作", type: "ar" },
    { inf: "estudiar", meaning: "学习", type: "ar" },
    { inf: "comprar", meaning: "买", type: "ar" },
    { inf: "pagar", meaning: "支付", type: "ar" },
    { inf: "llegar", meaning: "到达", type: "ar" },
    { inf: "buscar", meaning: "寻找", type: "ar" },
    { inf: "empezar", meaning: "开始", type: "ar" },
    { inf: "pensar", meaning: "思考", type: "ar" },
    { inf: "entrar", meaning: "进入", type: "ar" },
    { inf: "ayudar", meaning: "帮助", type: "ar" },
    { inf: "necesitar", meaning: "需要", type: "ar" },
    { inf: "esperar", meaning: "等待/希望", type: "ar" },
    { inf: "llamar", meaning: "叫/打电话", type: "ar" },
    { inf: "usar", meaning: "使用", type: "ar" },
    { inf: "crear", meaning: "创造", type: "ar" },
    { inf: "mandar", meaning: "发送/命令", type: "ar" },
    { inf: "dejar", meaning: "离开/让", type: "ar" },
    { inf: "gastar", meaning: "花费", type: "ar" },
    { inf: "enviar", meaning: "发送", type: "ar" },
    { inf: "viajar", meaning: "旅行", type: "ar" },
    { inf: "cambiar", meaning: "改变", type: "ar" },
    { inf: "olvidar", meaning: "忘记", type: "ar" },
    { inf: "terminar", meaning: "结束", type: "ar" },
    { inf: "aceptar", meaning: "接受", type: "ar" },
    { inf: "mirar", meaning: "看", type: "ar" },
    { inf: "tocar", meaning: "触摸/演奏", type: "ar" },
    { inf: "practicar", meaning: "练习", type: "ar" },
    { inf: "explicar", meaning: "解释", type: "ar" },
    { inf: "descansar", meaning: "休息", type: "ar" },
    { inf: "guardar", meaning: "保存/保管", type: "ar" },
    { inf: "bajar", meaning: "下去", type: "ar" },
    { inf: "contar", meaning: "讲述/数", type: "ar" },
    { inf: "gustar", meaning: "喜欢/使喜欢", type: "ar" },
    { inf: "faltar", meaning: "缺少", type: "ar" },
    { inf: "llevar", meaning: "带/穿", type: "ar" },
    { inf: "pasar", meaning: "度过/经过", type: "ar" },
    { inf: "apagar", meaning: "关闭", type: "ar" },
    { inf: "cocinar", meaning: "烹饪", type: "ar" },
    { inf: "deshacer", meaning: "拆除/撤销", type: "ar" },
    { inf: "escuchar", meaning: "听", type: "ar" },
    { inf: "ganar", meaning: "赢/赚", type: "ar" },
    { inf: "encontrar", meaning: "找到", type: "ar" },
    { inf: "despertar", meaning: "唤醒", type: "ar" },
    { inf: "devolver", meaning: "归还", type: "irregular" },
    { inf: "volver", meaning: "返回", type: "irregular" },
    { inf: "sostener", meaning: "支撑/持有", type: "irregular" },
    { inf: "compartir", meaning: "分享", type: "ir" },
    { inf: "ofrecer", meaning: "提供", type: "er" },
    { inf: "creer", meaning: "相信", type: "er" },
    { inf: "quedar", meaning: "剩下/留下", type: "ar" },
    { inf: "parecer", meaning: "似乎/觉得", type: "er" },
    { inf: "recordar", meaning: "记得", type: "ar" },
    { inf: "disfrutar", meaning: "享受", type: "ar" },
    { inf: "mostrar", meaning: "展示", type: "ar" },
    { inf: "preguntar", meaning: "问", type: "ar" },
    { inf: "preparar", meaning: "准备", type: "ar" },
    { inf: "intentar", meaning: "尝试", type: "ar" },
    { inf: "sacar", meaning: "取出", type: "ar" },
    { inf: "juntar", meaning: "聚集/收集", type: "ar" },
    { inf: "echar", meaning: "扔/放", type: "ar" },
    { inf: "rechazar", meaning: "拒绝", type: "ar" },
    { inf: "tratar", meaning: "尝试/对待", type: "ar" },
    { inf: "lograr", meaning: "达到/实现", type: "ar" },
    { inf: "saludar", meaning: "打招呼", type: "ar" },
    { inf: "invitar", meaning: "邀请", type: "ar" },
    { inf: "quitar", meaning: "去除/脱掉", type: "ar" },
    { inf: "solicitar", meaning: "申请", type: "ar" },
    { inf: "prestar", meaning: "借出", type: "ar" },
    { inf: "regresar", meaning: "返回", type: "ar" },
    { inf: "acercar", meaning: "靠近", type: "ar" },
    { inf: "cazar", meaning: "狩猎", type: "ar" },
    { inf: "cojer", meaning: "拿/取", type: "ar" },
    { inf: "hervir", meaning: "煮沸", type: "ir" },
    { inf: "imprimir", meaning: "打印", type: "ir" },
    { inf: "dudar", meaning: "怀疑", type: "ar" },
    
    // ER动词
    { inf: "comer", meaning: "吃", type: "er" },
    { inf: "beber", meaning: "喝", type: "er" },
    { inf: "aprender", meaning: "学习", type: "er" },
    { inf: "comprender", meaning: "理解", type: "er" },
    { inf: "vender", meaning: "卖", type: "er" },
    { inf: "correr", meaning: "跑", type: "er" },
    { inf: "responder", meaning: "回答", type: "er" },
    { inf: "deber", meaning: "应该/欠", type: "er" },
    { inf: "meter", meaning: "放入", type: "er" },
    { inf: "romper", meaning: "打破", type: "er" },
    { inf: "temer", meaning: "害怕", type: "er" },
    { inf: "esconder", meaning: "隐藏", type: "er" },
    { inf: "prometer", meaning: "承诺", type: "er" },
    { inf: "sorprender", meaning: "使惊讶", type: "er" },
    { inf: "encender", meaning: "打开/点燃", type: "er" },
    { inf: "defender", meaning: "保卫", type: "er" },
    { inf: "perder", meaning: "丢失", type: "er" },
    { inf: "entender", meaning: "理解", type: "er" },
    { inf: "querer", meaning: "想要", type: "er" },
    
    // IR动词
    { inf: "vivir", meaning: "生活/住", type: "ir" },
    { inf: "escribir", meaning: "写", type: "ir" },
    { inf: "abrir", meaning: "打开", type: "ir" },
    { inf: "recibir", meaning: "收到", type: "ir" },
    { inf: "subir", meaning: "上去", type: "ir" },
    { inf: "describir", meaning: "描述", type: "ir" },
    { inf: "decidir", meaning: "决定", type: "ir" },
    { inf: "discutir", meaning: "讨论", type: "ir" },
    { inf: "cumplir", meaning: "实现/遵守", type: "ir" },
    { inf: "unir", meaning: "联合", type: "ir" },
    { inf: "sufrir", meaning: "遭受", type: "ir" },
    { inf: "permitir", meaning: "允许", type: "ir" },
    { inf: "servir", meaning: "服务", type: "ir" },
    { inf: "vestir", meaning: "穿衣", type: "ir" },
    { inf: "dormir", meaning: "睡觉", type: "ir" },
    { inf: "morir", meaning: "死", type: "ir" },
    { inf: "pedir", meaning: "请求", type: "ir" },
    { inf: "repetir", meaning: "重复", type: "ir" },
    { inf: "seguir", meaning: "跟随", type: "ir" },
    { inf: "conseguir", meaning: "获得", type: "ir" },
    { inf: "elegir", meaning: "选择", type: "ir" },
    { inf: "corregir", meaning: "纠正", type: "ir" },
    { inf: "sentir", meaning: "感觉", type: "ir" },
    { inf: "mentir", meaning: "说谎", type: "ir" },
    { inf: "preferir", meaning: "更喜欢", type: "ir" },
    { inf: "sugerir", meaning: "建议", type: "ir" },
    { inf: "reír", meaning: "笑", type: "ir" },
    { inf: "sonreír", meaning: "微笑", type: "ir" },
    { inf: "freír", meaning: "油炸", type: "ir" },
    
    // 常用短语动词/复杂动词
    { inf: "acordarse", meaning: "记得", type: "reflexive" },
    { inf: "olvidarse", meaning: "忘记", type: "reflexive" },
    { inf: "levantarse", meaning: "起床", type: "reflexive" },
    { inf: "acostarse", meaning: "躺下/睡觉", type: "reflexive" },
    { inf: "vestirse", meaning: "穿衣服", type: "reflexive" },
    { inf: "ducharse", meaning: "淋浴", type: "reflexive" },
    { inf: "lavarse", meaning: "洗", type: "reflexive" },
    { inf: "peinarse", meaning: "梳头", type: "reflexive" },
    { inf: "sentarse", meaning: "坐下", type: "reflexive" },
    { inf: "quedarse", meaning: "留下", type: "reflexive" },
    { inf: "irse", meaning: "离开", type: "reflexive" },
    { inf: "ponerse", meaning: "穿上/变得", type: "reflexive" },
    { inf: "hacerse", meaning: "成为", type: "reflexive" },
    { inf: "volverse", meaning: "变成", type: "reflexive" },
    { inf: "convertirse", meaning: "转变为", type: "reflexive" },
    { inf: "darse cuenta", meaning: "意识到", type: "reflexive" },
    { inf: "preocuparse", meaning: "担心", type: "reflexive" },
    { inf: "enfadarse", meaning: "生气", type: "reflexive" },
    { inf: "alegrarse", meaning: "高兴", type: "reflexive" },
    { inf: "sorprenderse", meaning: "惊讶", type: "reflexive" },
    { inf: "interesarse", meaning: "感兴趣", type: "reflexive" },
    { inf: "aburrirse", meaning: "无聊", type: "reflexive" },
    { inf: "divertirse", meaning: "玩得开心", type: "reflexive" },
    { inf: "enfermarse", meaning: "生病", type: "reflexive" },
    { inf: "mejorarse", meaning: "好转", type: "reflexive" },
    { inf: "casarse", meaning: "结婚", type: "reflexive" },
    { inf: "divorciarse", meaning: "离婚", type: "reflexive" },
    { inf: "enamorarse", meaning: "爱上", type: "reflexive" },
    { inf: "reunirse", meaning: "聚会", type: "reflexive" },
    { inf: "encontrarse", meaning: "相遇/感觉", type: "reflexive" },
    { inf: "llamarse", meaning: "名叫", type: "reflexive" },
    { inf: "parecerse", meaning: "相像", type: "reflexive" },
    { inf: "atreverse", meaning: "敢于", type: "reflexive" },
    { inf: "quejarse", meaning: "抱怨", type: "reflexive" },
    { inf: "arrepentirse", meaning: "后悔", type: "reflexive" },
    { inf: "jactarse", meaning: "吹嘘", type: "reflexive" },
    { inf: "fijarse", meaning: "注意", type: "reflexive" },
    { inf: "acercarse", meaning: "靠近", type: "reflexive" },
    { inf: "alejarse", meaning: "远离", type: "reflexive" },
    { inf: "despedirse", meaning: "告别", type: "reflexive" },
    { inf: "despertarse", meaning: "醒来", type: "reflexive" },
    { inf: "desayunarse", meaning: "吃早餐", type: "reflexive" },
    { inf: "desvestirse", meaning: "脱衣服", type: "reflexive" },
    { inf: "acabarse", meaning: "用完/结束", type: "reflexive" },
    { inf: "terminarse", meaning: "结束", type: "reflexive" },
    { inf: "romperse", meaning: "破碎", type: "reflexive" },
    { inf: "caerse", meaning: "摔倒", type: "reflexive" },
    { inf: "morirse", meaning: "死去", type: "reflexive" },
    { inf: "nacer", meaning: "出生", type: "irregular" },
    { inf: "crecer", meaning: "成长", type: "er" },
    { inf: "aparecer", meaning: "出现", type: "er" },
    { inf: "desaparecer", meaning: "消失", type: "er" },
    { inf: "conducir", meaning: "驾驶", type: "irregular" },
    { inf: "producir", meaning: "生产", type: "irregular" },
    { inf: "traducir", meaning: "翻译", type: "irregular" },
    { inf: "introducir", meaning: "介绍/引入", type: "irregular" },
    { inf: "reducir", meaning: "减少", type: "irregular" },
    { inf: "construir", meaning: "建造", type: "irregular" },
    { inf: "destruir", meaning: "摧毁", type: "irregular" },
    { inf: "incluir", meaning: "包括", type: "irregular" },
    { inf: "concluir", meaning: "结束", type: "irregular" },
    { inf: "huir", meaning: "逃跑", type: "irregular" },
    { inf: "oír", meaning: "听见", type: "irregular" },
    { inf: "caer", meaning: "落下", type: "irregular" },
    { inf: "roer", meaning: "啃", type: "irregular" },
    { inf: "tañer", meaning: "弹奏", type: "irregular" },
    { inf: "valer", meaning: "价值", type: "irregular" },
    { inf: "soler", meaning: "通常", type: "irregular" },
    { inf: "jugar", meaning: "玩", type: "irregular" },
    { inf: "mover", meaning: "移动", type: "irregular" },
    { inf: "doler", meaning: "疼痛", type: "irregular" },
    { inf: "llover", meaning: "下雨", type: "irregular" },
    { inf: "nevar", meaning: "下雪", type: "irregular" },
    { inf: "tronar", meaning: "打雷", type: "irregular" },
    { inf: "relampaguear", meaning: "闪电", type: "irregular" }
];

// 时态定义
const tenses = {
    presente: {
        name: "现在时 (Presente)",
        pronouns: ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ustedes"],
        rule: "-ar: o/as/a/amos/áis/an  |  -er/ir: o/es/e/imos/ís/en"
    },
    preterito: {
        name: "简单过去时 (Pretérito Indefinido)",
        pronouns: ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ustedes"],
        rule: "-ar: é/aste/ó/amos/asteis/aron  |  -er/ir: í/iste/ió/imos/isteis/ieron"
    },
    imperfecto: {
        name: "过去未完成时 (Pretérito Imperfecto)",
        pronouns: ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ustedes"],
        rule: "-ar: aba/abas/aba/ábamos/abais/aban  |  -er/ir: ía/ías/ía/íamos/íais/ían"
    },
    futuro: {
        name: "简单将来时 (Futuro Simple)",
        pronouns: ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ustedes"],
        rule: "原形 + é/ás/á/emos/éis/án"
    },
    condicional: {
        name: "条件式简单时 (Condicional Simple)",
        pronouns: ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ustedes"],
        rule: "原形 + ía/ías/ía/íamos/íais/ían"
    },
    subjuntivo: {
        name: "虚拟式现在时 (Presente de Subjuntivo)",
        pronouns: ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ustedes"],
        rule: "-ar: e/es/e/emos/éis/en  |  -er/ir: a/as/a/amos/áis/an"
    },
    subjuntivo_imperfecto: {
        name: "虚拟式过去未完成时 (Imperfecto de Subjuntivo)",
        pronouns: ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ustedes"],
        rule: "-ar: ara/aras/ara/áramos/arais/aran  |  -er/ir: iera/ieras/iera/iéramos/ierais/ieran"
    },
    presente_perfecto: {
        name: "现在完成时 (Pretérito Perfecto)",
        pronouns: ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ustedes"],
        rule: "haber现在时 + 过去分词(-ar→ado, -er/ir→ido)"
    },
    pluscuamperfecto: {
        name: "过去完成时 (Pretérito Pluscuamperfecto)",
        pronouns: ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ustedes"],
        rule: "haber过去未完成时 + 过去分词"
    },
    futuro_perfecto: {
        name: "将来完成时 (Futuro Perfecto)",
        pronouns: ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ustedes"],
        rule: "haber将来时 + 过去分词"
    },
    condicional_perfecto: {
        name: "条件式完成时 (Condicional Compuesto)",
        pronouns: ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ustedes"],
        rule: "haber条件式 + 过去分词"
    },
    subjuntivo_perfecto: {
        name: "虚拟式现在完成时 (Pretérito Perfecto de Subjuntivo)",
        pronouns: ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ustedes"],
        rule: "haber虚拟式现在时 + 过去分词"
    },
    imperativo: {
        name: "命令式 (Imperativo)",
        pronouns: ["tú", "usted", "nosotros", "vosotros", "ustedes"],
        rule: "-ar: a/e/emos/ad/en  |  -er: e/a/amos/ed/an  |  -ir: e/a/amos/id/an"
    }
};

// 各时态的不规则动词列表（仅列出动词原形，不列出具体变位）
const irregularVerbsByTense = {
    // 现在时：yo特殊、词干变化（e→ie/o→ue/e→i/u→ue）、正字法变化（-zco/-go/-oy）
    presente: [
        // yo 特殊形式
        "ser", "estar", "ir", "dar", "saber", "haber",
        // -go/-igo/-zco 等 yo 特殊
        "tener", "venir", "hacer", "decir", "poner", "salir", "traer", "oír", "ver",
        "conocer", "nacer", "caer", "valer",
        "conducir", "producir", "traducir", "introducir", "reducir",
        // -uir 插 y
        "construir", "destruir", "incluir", "concluir", "huir",
        // o→ue
        "poder", "dormir", "morir", "mover", "doler", "soler", "jugar",
        "acostarse",
        // e→ie
        "querer", "venir", "sentir", "mentir", "preferir", "sugerir", "divertirse", "arrepentirse",
        "encender", "defender", "perder", "entender", "pensar", "empezar", "sentarse",
        // e→i
        "pedir", "repetir", "servir", "vestir", "seguir", "conseguir", "elegir", "corregir",
        "reír", "sonreír", "freír", "despedirse",
        // 杂项
        "roer", "tañer"
    ],
    preterito: [
        // 词根完全改变（fui/hice/dije/tuve等）
        "ser", "ir", "dar", "ver", "hacer", "decir", "estar", "tener", "venir",
        "poder", "poner", "saber", "querer", "traer",
        // -ducir 词根变 duj-
        "conducir", "traducir", "producir", "introducir", "reducir",
        // oír / caer / roer：yo/él 带重音或 y 变化
        "oír", "caer", "roer",
        // o→u / e→i（第三人称词干变化）
        "dormir", "morir", "pedir", "repetir", "servir", "vestir",
        "sentir", "mentir", "preferir", "sugerir",
        "seguir", "conseguir", "elegir", "corregir",
        "reír", "sonreír", "freír",
        // jugar：jugué yo（正字法）
        "jugar",
        // -uir 第三人称 y
        "construir", "destruir", "incluir", "concluir", "huir"
    ],
    imperfecto: [
        // 过去未完成时只有三个真正不规则
        "ser", "ir", "ver"
    ],
    futuro: [
        // 词根收缩或替换
        "decir", "hacer", "poder", "poner", "querer", "saber", "salir", "tener", "venir",
        "caber", "haber", "valer"
    ],
    condicional: [
        "decir", "hacer", "poder", "poner", "querer", "saber", "salir", "tener", "venir",
        "caber", "haber", "valer"
    ],
    // 虚拟式现在时：yo → subj. 基于 yo presente（go→ga, zco→zca, -uir→ya, 词干变化等）
    subjuntivo: [
        "ser", "estar", "ir", "dar", "saber", "haber",
        "tener", "venir", "hacer", "decir", "poner", "salir", "traer", "oír", "ver",
        "conocer", "nacer", "caer", "valer",
        "conducir", "producir", "traducir", "introducir", "reducir",
        "construir", "destruir", "incluir", "concluir", "huir",
        "poder", "querer",
        "dormir", "morir", "mover", "doler", "soler", "jugar",
        "sentir", "mentir", "preferir", "sugerir",
        "pedir", "repetir", "servir", "vestir", "seguir", "conseguir", "elegir", "corregir",
        "reír", "sonreír", "freír",
        "encender", "defender", "perder", "entender", "pensar", "empezar",
        "roer", "tañer"
    ],
    // 虚拟式过去未完成时：基于简单过去ellos词根
    subjuntivo_imperfecto: [
        "ser", "ir", "ver", "decir", "hacer", "poder", "poner", "querer", "saber",
        "salir", "tener", "venir", "traer", "oír", "dar", "estar",
        "conducir", "producir", "traducir", "introducir", "reducir",
        "construir", "destruir", "incluir", "concluir", "huir",
        "dormir", "morir", "pedir", "repetir", "servir", "vestir",
        "sentir", "mentir", "preferir", "sugerir",
        "seguir", "conseguir", "elegir", "corregir",
        "reír", "sonreír", "freír", "caer", "roer", "jugar"
    ],
    presente_perfecto: ["abrir", "cubrir", "decir", "describir", "escribir", "hacer", "morir", "poner", "resolver", "romper", "ver", "volver"],
    pluscuamperfecto: ["abrir", "cubrir", "decir", "describir", "escribir", "hacer", "morir", "poner", "resolver", "romper", "ver", "volver"],
    futuro_perfecto: ["abrir", "cubrir", "decir", "describir", "escribir", "hacer", "morir", "poner", "resolver", "romper", "ver", "volver"],
    condicional_perfecto: ["abrir", "cubrir", "decir", "describir", "escribir", "hacer", "morir", "poner", "resolver", "romper", "ver", "volver"],
    subjuntivo_perfecto: ["abrir", "cubrir", "decir", "describir", "escribir", "hacer", "morir", "poner", "resolver", "romper", "ver", "volver"],
    imperativo: [
        "ser", "estar", "ir", "saber", "dar", "decir", "hacer", "poner", "salir",
        "tener", "venir", "oír", "ver", "valer",
        "conocer", "nacer", "caer",
        "conducir", "producir", "traducir", "introducir", "reducir",
        "construir", "destruir", "incluir", "concluir", "huir",
        "dormir", "morir", "mover", "doler", "jugar",
        "pedir", "repetir", "servir", "vestir", "seguir", "conseguir", "elegir", "corregir",
        "sentir", "mentir", "preferir", "sugerir",
        "reír", "sonreír", "freír",
        "encender", "defender", "perder", "entender", "pensar", "empezar",
        "roer", "tañer"
    ]
};

const futureConditionalIrregularGroups = [
    {
        id: "br_group",
        label: "-ber 结尾动词：caber / haber / saber",
        rule: "这三词按原形都属于 -er 动词；若细分词尾，可一起记成 -ber 结尾。到将来时和条件式时，再分别改用 cabr-, habr-, sabr- 这组不规则词干接词尾。",
        verbs: ["caber", "haber", "saber"]
    },
    {
        id: "dr_group",
        label: "poner / salir / tener / venir / valer（缩干组）",
        rule: "这组原形在将来时和条件式里都会收缩成 -dr- 词干：pondr-, saldr-, tendr-, vendr-, valdr-，再接完整词尾。",
        verbs: ["poner", "salir", "tener", "venir", "valer"]
    },
    {
        id: "dir_group",
        label: "decir（将来/条件式缩干）",
        rule: "decir 在这两个时态里去掉 e 和 c，改用 dir- 再接词尾。",
        verbs: ["decir"]
    },
    {
        id: "har_group",
        label: "hacer（将来/条件式缩干）",
        rule: "hacer 在这两个时态里去掉 ce，改用 har- 再接词尾。",
        verbs: ["hacer"]
    },
    {
        id: "podr_group",
        label: "poder（将来/条件式缩干）",
        rule: "poder 在这两个时态里改用 podr- 再接词尾。",
        verbs: ["poder"]
    },
    {
        id: "querr_group",
        label: "querer（将来/条件式缩干）",
        rule: "querer 在这两个时态里改用 querr- 再接词尾。",
        verbs: ["querer"]
    }
];

const compoundParticipleGroups = [
    {
        id: "abierto_group",
        label: "-brir 结尾动词",
        rule: "abrir, cubrir 这组按原形 -brir 来记；过去分词不用规则 -ido，而是 abierto, cubierto。",
        verbs: ["abrir", "cubrir"]
    },
    {
        id: "cho_group",
        label: "decir / hacer（高频特例）",
        rule: "这两个高频动词各自单独记；过去分词分别是 dicho, hecho。",
        verbs: ["decir", "hacer"]
    },
    {
        id: "escrito_group",
        label: "-scribir / -cribir 类动词",
        rule: "escribir, describir 这组按原形词干来记；过去分词分别是 escrito, descrito。",
        verbs: ["escribir", "describir"]
    },
    {
        id: "puesto_group",
        label: "poner",
        rule: "poner 的过去分词直接记作 puesto。",
        verbs: ["poner"]
    },
    {
        id: "vuelto_group",
        label: "-olver 结尾动词",
        rule: "volver, resolver 这组按原形 -olver 来记；过去分词分别是 vuelto, resuelto。",
        verbs: ["volver", "resolver"]
    },
    {
        id: "roto_group",
        label: "romper",
        rule: "romper 的过去分词直接记作 roto。",
        verbs: ["romper"]
    },
    {
        id: "muerto_group",
        label: "morir",
        rule: "morir 的过去分词直接记作 muerto。",
        verbs: ["morir"]
    },
    {
        id: "visto_group",
        label: "ver",
        rule: "ver 的过去分词直接记作 visto。",
        verbs: ["ver"]
    }
];

const irregularVerbGroupsByTense = {
    presente: [
        {
            id: "core_irregular",
            label: "整组特记：ser / estar / ir / dar / haber / saber",
            rule: "这些动词没有单一可套用的原形词干规律，最好整组记忆：soy, estás, voy, doy, he, sé...",
            verbs: ["ser", "estar", "ir", "dar", "haber", "saber"]
        },
        {
            id: "yo_go",
            label: "现在时 yo 为 -go/-igo 的动词",
            rule: "原形常见是 tener, venir, hacer, decir, poner, salir 一类；只有 yo 改成 -go/-igo，其余人称大体沿原词干：tengo, vengo, hago, digo, pongo, salgo, traigo, oigo, valgo, caigo。",
            verbs: ["tener", "venir", "hacer", "decir", "poner", "salir", "traer", "oír", "valer", "caer"]
        },
        {
            id: "yo_zco",
            label: "元音 + -cer/-cir / -ducir 类",
            rule: "这组按原形词尾来记：元音 + cer/cir 或 -ducir；现在时 yo 变成 -zco：conozco, nazco, conduzco...",
            verbs: ["conocer", "nacer", "conducir", "producir", "traducir", "introducir", "reducir"]
        },
        {
            id: "uir_y",
            label: "-uir 结尾动词",
            rule: "construir, destruir, incluir, concluir, huir 这组都按原形 -uir 来记；除 nosotros/vosotros 外，词干和词尾之间插 y：construyo, construyes, construye, construyen。",
            verbs: ["construir", "destruir", "incluir", "concluir", "huir"]
        },
        {
            id: "stem_o_ue",
            label: "原形词干含 o / u 的重读变化动词",
            rule: "这组按原形词干里的 o / u 来记；重读位常变 ue，nosotros/vosotros 通常回到原词干：puedo, duermes, juegan。",
            verbs: ["poder", "dormir", "morir", "mover", "doler", "soler", "jugar", "acostarse"]
        },
        {
            id: "stem_e_ie",
            label: "原形词干含 e 的 ie 变化动词",
            rule: "这组按原形词干里的 e 来记；重读位常变 ie，nosotros/vosotros 通常回到原词干：quiero, sientes, prefieren。",
            verbs: ["querer", "sentir", "mentir", "preferir", "sugerir", "divertirse", "arrepentirse", "encender", "defender", "perder", "entender", "pensar", "empezar", "sentarse"]
        },
        {
            id: "stem_e_i",
            label: "原形词干含 e 的 i 变化动词",
            rule: "这组按原形词干里的 e 来记；重读位直接变 i：pido, repites, sirve, eliges。",
            verbs: ["pedir", "repetir", "servir", "vestir", "seguir", "conseguir", "elegir", "corregir", "despedirse"]
        },
        {
            id: "misc_hiato",
            label: "以 -eír 结尾及少数单词特例",
            rule: "reír, sonreír, freír 这组要注意弱元音重读与重音符号：río, sonríes；ver, roer, tañer 则更适合按单词单独记忆。",
            verbs: ["reír", "sonreír", "freír", "ver", "roer", "tañer"]
        }
    ],
    preterito: [
        {
            id: "ser_ir_same",
            label: "ser / ir（简单过去时同形）",
            rule: "ser 和 ir 的简单过去时完全相同：fui, fuiste, fue, fuimos, fuisteis, fueron。",
            verbs: ["ser", "ir"]
        },
        {
            id: "dar_group",
            label: "dar",
            rule: "dar 用 di, diste, dio, dimos, disteis, dieron，没有重音符号。",
            verbs: ["dar"]
        },
        {
            id: "ver_group",
            label: "ver",
            rule: "ver 用 vi, viste, vio, vimos, visteis, vieron，也没有重音符号。",
            verbs: ["ver"]
        },
        {
            id: "hacer_group",
            label: "hacer",
            rule: "hacer 的简单过去时多数人称用 hic-，但 él/ella/usted 是 hizo。",
            verbs: ["hacer"]
        },
        {
            id: "decir_traer_j",
            label: "decir / traer（第 3 复数用 -eron）",
            rule: "这两个动词按原形整组记：decir 用 dij-，traer 用 traj-；第 3 人称复数都用 -eron，不是 -ieron。",
            verbs: ["decir", "traer"]
        },
        {
            id: "estar_group",
            label: "estar",
            rule: "estar 的简单过去时词干改成 estuv-，再接强变化过去时词尾。",
            verbs: ["estar"]
        },
        {
            id: "tener_group",
            label: "tener",
            rule: "tener 的简单过去时词干改成 tuv-，再接强变化过去时词尾。",
            verbs: ["tener"]
        },
        {
            id: "venir_group",
            label: "venir",
            rule: "venir 的简单过去时词干改成 vin-，再接强变化过去时词尾。",
            verbs: ["venir"]
        },
        {
            id: "poder_group",
            label: "poder",
            rule: "poder 的简单过去时词干改成 pud-，再接强变化过去时词尾。",
            verbs: ["poder"]
        },
        {
            id: "poner_group",
            label: "poner",
            rule: "poner 的简单过去时词干改成 pus-，再接强变化过去时词尾。",
            verbs: ["poner"]
        },
        {
            id: "saber_group",
            label: "saber",
            rule: "saber 的简单过去时词干改成 sup-，再接强变化过去时词尾。",
            verbs: ["saber"]
        },
        {
            id: "querer_group",
            label: "querer",
            rule: "querer 的简单过去时词干改成 quis-，再接强变化过去时词尾。",
            verbs: ["querer"]
        },
        {
            id: "haber_group",
            label: "haber",
            rule: "haber 的简单过去时词干改成 hub-，再接强变化过去时词尾。",
            verbs: ["haber"]
        },
        {
            id: "ducir_group",
            label: "-ducir 结尾动词",
            rule: "这组按原形 -ducir 来记；先去掉 c 再变成 j 词干，第 3 人称复数同样用 -eron。",
            verbs: ["conducir", "traducir", "producir", "introducir", "reducir"]
        },
        {
            id: "hiato_y_group",
            label: "词干末尾是元音的 -er/-ir 动词",
            rule: "oír, caer, roer, reír 一类原形词干末尾已有元音，简单过去时第 3 人称常写成 oyó/oyeron, cayó/cayeron, rio/rieron 等。",
            verbs: ["oír", "caer", "roer", "reír", "sonreír", "freír"]
        },
        {
            id: "third_person_stem_change",
            label: "词干变化 -ir 动词",
            rule: "原形本来就是 o→ue / e→ie / e→i 一类的 -ir 动词，在简单过去时只把词干变化保留到第 3 人称：durmió/durmieron, pidió/pidieron, sintió/sintieron。",
            verbs: ["dormir", "morir", "pedir", "repetir", "servir", "vestir", "sentir", "mentir", "preferir", "sugerir", "seguir", "conseguir", "elegir", "corregir"]
        },
        {
            id: "jugar_group",
            label: "jugar（保音拼写）",
            rule: "为了保持 g 的发音，yo 形式写成 jugué；其余人称按普通 -ar 过去时。",
            verbs: ["jugar"]
        },
        {
            id: "uir_y_group",
            label: "-uir 结尾动词",
            rule: "construir, destruir, incluir, concluir, huir 这组按原形 -uir 来记；第 3 人称常见 y：construyó, construyeron。",
            verbs: ["construir", "destruir", "incluir", "concluir", "huir"]
        }
    ],
    imperfecto: [
        {
            id: "ser_group",
            label: "ser：era-",
            rule: "ser 的过去未完成时单独记：era, eras, era, éramos, erais, eran。",
            verbs: ["ser"]
        },
        {
            id: "ir_group",
            label: "ir：iba-",
            rule: "ir 的过去未完成时单独记：iba, ibas, iba, íbamos, ibais, iban。",
            verbs: ["ir"]
        },
        {
            id: "ver_group",
            label: "ver：veía-",
            rule: "ver 的过去未完成时单独记：veía, veías, veía, veíamos, veíais, veían。",
            verbs: ["ver"]
        }
    ],
    futuro: futureConditionalIrregularGroups,
    condicional: futureConditionalIrregularGroups,
    subjuntivo: [
        {
            id: "core_subj",
            label: "整组特记：ser / estar / ir / dar / haber / saber",
            rule: "ser, estar, ir, dar, haber, saber 的虚拟式现在时最好整组记忆：sea, esté, vaya, dé, haya, sepa。",
            verbs: ["ser", "estar", "ir", "dar", "haber", "saber"]
        },
        {
            id: "ga_group",
            label: "现在时 yo 为 -go/-igo 的动词",
            rule: "这组按原形来记，再借现在时 yo 形式去掉 -o，得到 tenga, venga, haga, diga, ponga, salga, traiga, oiga, caiga, valga。",
            verbs: ["tener", "venir", "hacer", "decir", "poner", "salir", "traer", "oír", "caer", "valer"]
        },
        {
            id: "zca_group",
            label: "元音 + -cer/-cir / -ducir 类",
            rule: "conocer, nacer, -ducir 一类按原形词尾来记；从 conozco / nazco / conduzco 出发，虚拟式基底变成 -zca。",
            verbs: ["conocer", "nacer", "conducir", "producir", "traducir", "introducir", "reducir"]
        },
        {
            id: "ya_group",
            label: "-uir 结尾动词",
            rule: "construir, destruir, incluir, concluir, huir 这组按原形 -uir 来记；虚拟式现在时得到 construya, destruya, incluya...",
            verbs: ["construir", "destruir", "incluir", "concluir", "huir"]
        },
        {
            id: "o_ue_group",
            label: "原形词干含 o / u 的重读变化动词",
            rule: "这组按原形词干里的 o / u 来记；重读位保持词干变化：pueda, duerma, muera, mueva, duela, suela, juegue；nosotros/vosotros 常回到原词干。",
            verbs: ["poder", "dormir", "morir", "mover", "doler", "soler", "jugar"]
        },
        {
            id: "e_ie_group",
            label: "原形词干含 e 的 ie 变化动词",
            rule: "这组按原形词干里的 e 来记；重读位 e 变 ie：quiera, sienta, mienta, prefiera, sugiera, encienda, piense；nosotros/vosotros 常回到原词干。",
            verbs: ["querer", "sentir", "mentir", "preferir", "sugerir", "encender", "defender", "perder", "entender", "pensar", "empezar"]
        },
        {
            id: "e_i_group",
            label: "原形词干含 e 的 i 变化动词",
            rule: "这组按原形词干里的 e 来记；重读位 e 变 i：pida, repita, sirva, vista, siga, consiga, elija, corrija。",
            verbs: ["pedir", "repetir", "servir", "vestir", "seguir", "conseguir", "elegir", "corregir", "reír", "sonreír", "freír"]
        },
        {
            id: "misc_group",
            label: "ver / roer / tañer 等单词特例",
            rule: "ver → vea，roer → roa，tañer → taña；这类更适合按单词记忆。",
            verbs: ["ver", "roer", "tañer"]
        }
    ],
    subjuntivo_imperfecto: [
        {
            id: "ser_ir_same",
            label: "ser / ir（简单过去时同形组）",
            rule: "ser 和 ir 先记简单过去时 fueron；虚拟式过去未完成时都从 fue- 再接 ra/ras/ra/ramos/rais/ran。",
            verbs: ["ser", "ir"]
        },
        {
            id: "dar_ver_group",
            label: "dar / ver",
            rule: "dar, ver 先记简单过去时 dieron / vieron；再去掉 -ron，就得到 diera / viera 这一组。",
            verbs: ["dar", "ver"]
        },
        {
            id: "hacer_group",
            label: "hacer",
            rule: "虚拟式过去未完成时直接从 hicieron 去掉 -ron：hiciera, hicieras...",
            verbs: ["hacer"]
        },
        {
            id: "decir_group",
            label: "decir",
            rule: "先记简单过去时 dijeron，去掉 -ron 后得到 dije-，再接 -ra 系列词尾。",
            verbs: ["decir"]
        },
        {
            id: "estar_group",
            label: "estar",
            rule: "先记简单过去时 estuvieron，去掉 -ron 后得到 estuvie-，再接 -ra 系列词尾。",
            verbs: ["estar"]
        },
        {
            id: "tener_group",
            label: "tener",
            rule: "先记简单过去时 tuvieron，去掉 -ron 后得到 tuvie-，再接 -ra 系列词尾。",
            verbs: ["tener"]
        },
        {
            id: "venir_group",
            label: "venir",
            rule: "先记简单过去时 vinieron，去掉 -ron 后得到 vinie-，再接 -ra 系列词尾。",
            verbs: ["venir"]
        },
        {
            id: "poder_group",
            label: "poder",
            rule: "先记简单过去时 pudieron，去掉 -ron 后得到 pudie-，再接 -ra 系列词尾。",
            verbs: ["poder"]
        },
        {
            id: "poner_group",
            label: "poner",
            rule: "先记简单过去时 pusieron，去掉 -ron 后得到 pusie-，再接 -ra 系列词尾。",
            verbs: ["poner"]
        },
        {
            id: "saber_group",
            label: "saber",
            rule: "先记简单过去时 supieron，去掉 -ron 后得到 supie-，再接 -ra 系列词尾。",
            verbs: ["saber"]
        },
        {
            id: "querer_group",
            label: "querer",
            rule: "先记简单过去时 quisieron，去掉 -ron 后得到 quisie-，再接 -ra 系列词尾。",
            verbs: ["querer"]
        },
        {
            id: "salir_group",
            label: "salir",
            rule: "先记简单过去时 salieron，去掉 -ron 后得到 salie-，再接 -ra 系列词尾。",
            verbs: ["salir"]
        },
        {
            id: "traer_ducir_group",
            label: "traer / -ducir 结尾动词",
            rule: "traer 与 -ducir 一类先记简单过去时 trajeron, produjeron, condujeron，再去掉 -ron 得到 traje-/produje-/conduje-。",
            verbs: ["traer", "conducir", "producir", "traducir", "introducir", "reducir"]
        },
        {
            id: "y_group",
            label: "词干末尾是元音的 -er/-ir 与 -uir 动词",
            rule: "oír, caer, roer 以及 construir, destruir, incluir, concluir, huir 这组先看 oyeron, cayeron, construyeron，再去掉 -ron 得到 oye-/caye-/construye-。",
            verbs: ["oír", "caer", "roer", "construir", "destruir", "incluir", "concluir", "huir"]
        },
        {
            id: "third_person_stem_change",
            label: "词干变化 -ir 动词",
            rule: "dormir, pedir, sentir 等原形本来就是词干变化 -ir 动词；先从 durmieron, pidieron, sintieron 出发，再去掉 -ron 得到 durmie-, pidie-, sintie-。",
            verbs: ["dormir", "morir", "pedir", "repetir", "servir", "vestir", "sentir", "mentir", "preferir", "sugerir", "seguir", "conseguir", "elegir", "corregir"]
        },
        {
            id: "hiato_group",
            label: "以 -eír 结尾的动词",
            rule: "reír, sonreír, freír 这组先从 rieron, sonrieron, frieron 去掉 -ron，得到 rie-/sonrie-/frie-，再接 -ra 系列词尾。",
            verbs: ["reír", "sonreír", "freír"]
        },
        {
            id: "jugar_group",
            label: "jugar",
            rule: "虚拟式过去未完成时直接根据 jugaron 去掉 -ron，得到 jugara 这一组。",
            verbs: ["jugar"]
        }
    ],
    presente_perfecto: compoundParticipleGroups,
    pluscuamperfecto: compoundParticipleGroups,
    futuro_perfecto: compoundParticipleGroups,
    condicional_perfecto: compoundParticipleGroups,
    subjuntivo_perfecto: compoundParticipleGroups,
    imperativo: [
        {
            id: "special_tu",
            label: "肯定 tú 特别命令",
            rule: "这些高频动词的肯定 tú 形式要单独记：sé, ve, sabe, da, di, haz, pon, sal, ten, ven。",
            verbs: ["ser", "ir", "saber", "dar", "decir", "hacer", "poner", "salir", "tener", "venir"]
        },
        {
            id: "ga_group",
            label: "现在时 yo 为 -go/-igo 的动词",
            rule: "这组按原形来记；在命令式的 usted / nosotros / ustedes 中常沿用虚拟式现在时基底：haga, diga, ponga, salga, tenga, venga, oiga, valga, caiga。",
            verbs: ["hacer", "decir", "poner", "salir", "tener", "venir", "oír", "valer", "caer"]
        },
        {
            id: "zca_group",
            label: "元音 + -cer/-cir / -ducir 类",
            rule: "conocer, nacer, -ducir 一类按原形词尾来记；在 usted / nosotros / ustedes 中沿用 conozca / nazca / conduzca 这一组。",
            verbs: ["conocer", "nacer", "conducir", "producir", "traducir", "introducir", "reducir"]
        },
        {
            id: "ya_group",
            label: "-uir 结尾动词",
            rule: "construir, destruir, incluir, concluir, huir 这组按原形 -uir 来记；在命令式的 usted / nosotros / ustedes 中沿用 construya, incluya 这一组。",
            verbs: ["construir", "destruir", "incluir", "concluir", "huir"]
        },
        {
            id: "o_ue_group",
            label: "原形词干含 o / u 的重读变化动词",
            rule: "肯定 tú/usted/ustedes 常保留这组的词干变化：duerme, duerma, duerman；部分 -ir 动词在 nosotros 里还会出现 o→u。",
            verbs: ["dormir", "morir", "mover", "doler", "jugar"]
        },
        {
            id: "e_ie_group",
            label: "原形词干含 e 的 ie 变化动词",
            rule: "肯定 tú/usted/ustedes 常保留 e→ie：siente, piense, prefiera；nosotros 通常跟虚拟式现在时走。",
            verbs: ["sentir", "mentir", "preferir", "sugerir", "encender", "defender", "perder", "entender", "pensar", "empezar"]
        },
        {
            id: "e_i_group",
            label: "原形词干含 e 的 i 变化动词",
            rule: "肯定 tú/usted/ustedes 常保留 e→i：pide, sirva, elige；nosotros 同样参考虚拟式现在时。",
            verbs: ["pedir", "repetir", "servir", "vestir", "seguir", "conseguir", "elegir", "corregir", "reír", "sonreír", "freír"]
        },
        {
            id: "misc_group",
            label: "其他常见特例",
            rule: "estar, ver, roer, tañer 等更适合直接记具体命令式；vosotros 形式多数仍是原形去 -r 加 d。",
            verbs: ["estar", "ver", "roer", "tañer"]
        }
    ]
};

// 对话场景数据 - 动态生成器
const dialogueScenarios = {
    daily: {
        name: "日常生活",
        templates: [
            {
                speakers: ["María", "Carlos"],
                lines: [
                    { es: "¡Hola Carlos! Hace tiempo que no te veo. ¿Cómo has estado?", zh: "嗨卡洛斯！好久不见了。你最近怎么样？" },
                    { es: "¡María! Qué alegría verte. La verdad es que he estado muy ocupado con el trabajo últimamente.", zh: "玛丽亚！见到你真高兴。说实话最近工作很忙。" },
                    { es: "¿Sí? ¿En qué estás trabajando ahora?", zh: "是吗？你现在在做什么工作？" },
                    { es: "Acabo de cambiar de trabajo. Ahora estoy en una empresa de tecnología.", zh: "我刚换了工作。现在在一家科技公司。" },
                    { es: "¡Enhorabuena! Cuéntame, ¿en qué sector exactamente?", zh: "恭喜！告诉我，具体在什么行业？" },
                    { es: "En desarrollo de software. Es un ambiente muy dinámico y creativo.", zh: "软件开发。环境很有活力和创意。" },
                    { es: "Suena interesante. ¿Te gusta el nuevo trabajo?", zh: "听起来很有趣。你喜欢新工作吗？" },
                    { es: "Mucho, aunque al principio me costó adaptarme a los nuevos compañeros.", zh: "很喜欢，虽然一开始适应新同事有点难。" },
                    { es: "Me imagino. Pero seguro que ahora ya te has acostumbrado.", zh: "我能想象。但肯定现在你已经习惯了。" },
                    { es: "Sí, totalmente. De hecho, este fin de semana quedan todos para cenar. ¿Te apetece venir?", zh: "是的，完全习惯了。其实这周末大家约好一起吃饭。你想来吗？" },
                    { es: "¡Me encantaría! ¿Dónde y a qué hora?", zh: "我很乐意！在哪里几点？" },
                    { es: "En el restaurante italiano de la plaza, a las nueve. Tenemos que celebrar mi nuevo trabajo.", zh: "在广场那家意大利餐厅，九点。我们得庆祝我的新工作。" }
                ]
            },
            {
                speakers: ["Vecino A", "Vecino B"],
                lines: [
                    { es: "Perdone, ¿podría bajar un poco la música? Es que tengo que levantarme muy temprano mañana.", zh: "不好意思，能把音乐关小一点吗？我明天要很早起床。" },
                    { es: "Oh, lo siento mucho. No me había dado cuenta de que se oía tanto.", zh: "哦，非常抱歉。我没意识到声音这么大。" },
                    { es: "No se preocupe, le agradezco que lo entienda. Es que tengo una reunión importante a las ocho.", zh: "没关系，谢谢您的理解。我八点有个重要会议。" },
                    { es: "Por supuesto, la bajo enseguida. Disculpe las molestias. ¿Trabaja usted en el centro?", zh: "当然，我马上关小。抱歉打扰到您。您在市中心工作吗？" },
                    { es: "Sí, en una consultora de marketing. Y usted, ¿trabaja por aquí cerca?", zh: "是的，在一家营销咨询公司。您呢，在这附近工作吗？" },
                    { es: "No, yo trabajo desde casa. Soy diseñador gráfico y hago proyectos freelance.", zh: "不，我在家工作。我是平面设计师，做自由职业项目。" },
                    { es: "¡Qué interesante! Debe ser muy práctico no tener que desplazarse todos los días.", zh: "真有趣！不用每天通勤一定很方便。" },
                    { es: "Sí, aunque a veces echo de menos la compañía de los compañeros de oficina.", zh: "是的，虽然有时会想念办公室同事的陪伴。" },
                    { es: "Lo entiendo perfectamente. Bueno, le dejo descansar. Otra vez disculpe por la música.", zh: "我完全理解。好了，不打扰您休息了。再次为音乐的事道歉。" },
                    { es: "No hay de qué, de verdad. Que descanse y mucha suerte en su reunión de mañana.", zh: "没关系，真的。您休息好，明天会议顺利。" },
                    { es: "Muchas gracias. Buenas noches.", zh: "非常感谢。晚安。" },
                    { es: "Buenas noches.", zh: "晚安。" }
                ]
            },
            {
                speakers: ["Ana", "Luis"],
                lines: [
                    { es: "¡Hola Luis! ¿Cómo fue tu viaje a Barcelona? Me tienes intrigada.", zh: "嗨路易斯！你的巴塞罗那之旅怎么样？我很好奇。" },
                    { es: "¡Fue increíble, Ana! Barcelona es una ciudad maravillosa con mucho que ver.", zh: "太棒了，安娜！巴塞罗那是个美妙的城市，有很多可看的东西。" },
                    { es: "¿Visitaste la Sagrada Familia? Siempre he querido ir.", zh: "你去圣家堂了吗？我一直想去。" },
                    { es: "¡Claro que sí! Es impresionante, mucho más bonita en persona que en las fotos.", zh: "当然去了！令人印象深刻，比照片上漂亮多了。" },
                    { es: "¿Y qué me dices del Parque Güell? También es muy famoso.", zh: "桂尔公园呢？也很有名。" },
                    { es: "Sí, también lo visité, aunque había muchísima gente. Te recomiendo ir temprano por la mañana.", zh: "是的，也去了，虽然人超级多。我建议你早上去。" },
                    { es: "Lo tendré en cuenta. ¿Y la comida? La gastronomía catalana es deliciosa.", zh: "我会记住的。食物呢？加泰罗尼亚美食很美味。" },
                    { es: "Deliciosa es poco. Probé la paella, las tapas, el pan con tomate... Todo estaba buenísimo.", zh: "美味都不足以形容。我尝了海鲜饭、塔帕斯、番茄面包...都超好吃。" },
                    { es: "¡Me estás haciendo salivar! ¿Dónde comiste tan bien?", zh: "你说得我都流口水了！你在哪里吃得这么好？" },
                    { es: "En un restaurante local que me recomendó el dueño del hotel. No era turístico en absoluto.", zh: "在一家酒店老板推荐的当地餐厅。一点都不游客化。" },
                    { es: "Perfecto, así me gusta. Tendré que pedirte la dirección cuando vaya.", zh: "完美，我就喜欢这样。我去的时候得跟你要地址。" },
                    { es: "Por supuesto, te paso toda la información. De verdad que lo disfrutarás mucho.", zh: "当然，我把所有信息发给你。你真的会很享受的。" }
                ]
            },
            {
                speakers: ["Padre", "Hijo"],
                lines: [
                    { es: "Hijo, ¿ya has hecho los deberes de hoy? Es importante no dejarlo para el último momento.", zh: "儿子，你做完今天的作业了吗？重要的是不要拖到最后一刻。" },
                    { es: "Casi, papá. Solo me falta un ejercicio de matemáticas que no entiendo muy bien.", zh: "差不多了，爸爸。只剩一道数学题，我不太懂。" },
                    { es: "¿Necesitas que te ayude? Aunque hace años que no hago ecuaciones.", zh: "需要我帮你吗？虽然我很多年没做方程了。" },
                    { es: "Sí, por favor. No entiendo cómo despejar la x en este problema.", zh: "是的，请帮我。我不懂这道题怎么解出x。" },
                    { es: "Vale, déjame ver. Primero debes pasar todos los números al otro lado cambiando el signo.", zh: "好的，让我看看。首先你要把所有数字移到另一边，改变符号。" },
                    { es: "¿Así? ¿Y luego qué hago?", zh: "这样吗？然后怎么做？" },
                    { es: "Luego divides ambos lados entre el coeficiente de la x. ¿Lo ves?", zh: "然后两边同时除以x的系数。明白了吗？" },
                    { es: "¡Ah, ya veo! Es más fácil de lo que parecía. Gracias, papá.", zh: "啊，我明白了！比看起来简单多了。谢谢爸爸。" },
                    { es: "De nada. ¿Y cómo van las demás asignaturas? ¿Todo bien?", zh: "不客气。其他科目怎么样？都好吗？" },
                    { es: "Bien, bien. Historia y lengua las llevo muy bien. Lo único difícil es matemáticas.", zh: "好的，好的。历史和语文我学得很好。唯一难的是数学。" },
                    { es: "Eso es normal. Cada uno tiene sus fortalezas. Si necesitas más ayuda, me dices.", zh: "这很正常。每个人都有自己的强项。如果需要更多帮助，告诉我。" },
                    { es: "Gracias, papá. Eres el mejor.", zh: "谢谢爸爸。你最棒了。" }
                ]
            },
            {
                speakers: ["Amigo A", "Amigo B"],
                lines: [
                    { es: "¿Te apetece salir a cenar esta noche? Hace tiempo que no quedamos.", zh: "今晚想出去吃晚饭吗？我们好久没聚了。" },
                    { es: "Me encantaría, pero tengo una cita con el dentista a las siete. Me duele mucho una muela.", zh: "我很想去，但我七点约了牙医。我一颗牙很疼。" },
                    { es: "¡Qué pena! Espero que no sea nada grave. ¿Qué tal mañana entonces?", zh: "真遗憾！希望不严重。那明天怎么样？" },
                    { es: "Mañana sí puedo. ¿Conoces algún sitio nuevo y bueno por el centro?", zh: "明天可以。你知道市中心有什么新的好地方吗？" },
                    { es: "Sí, han abierto un italiano en la plaza mayor que dicen que está muy bien y no es caro.", zh: "知道，大广场上新开了一家意大利餐厅，听说很不错而且不贵。" },
                    { es: "Perfecto, me apetece mucho comer pasta. ¿Quedamos allí a las nueve?", zh: "完美，我很想吃意面。我们九点在那儿见？" },
                    { es: "Vale, a las nueve. ¿Llamo a Pedro y a Laura para que vengan también?", zh: "好，九点。我叫佩德罗和劳拉也来吗？" },
                    { es: "Buena idea, así somos cuatro y podemos probar más platos diferentes.", zh: "好主意，这样我们四个人可以尝更多不同的菜。" },
                    { es: "Exacto. Les escribo ahora mismo. ¿Tienes alguna preferencia de plato?", zh: "没错。我现在就给他们发消息。你有什么想吃的菜吗？" },
                    { es: "No sé, lo que sea. Aunque me apetece mucho una pizza de cuatro quesos.", zh: "不知道，什么都行。虽然我很想吃四喜披萨。" },
                    { es: "¡A mí también! Y de postre tiramisú. Me estoy poniendo hambriento solo de pensarlo.", zh: "我也是！还有甜点吃提拉米苏。光是想想我就饿了。" },
                    { es: "Ja, ja, yo también. Bueno, nos vemos mañana a las nueve entonces. ¡Que te vaya bien con el dentista!", zh: "哈哈，我也是。好，那我们明天九点见。祝你牙医那里顺利！" }
                ]
            },
            {
                speakers: ["Pepa", "Juan"],
                lines: [
                    { es: "¿Has visto el tiempo que hace? Parece que va a llover en cualquier momento.", zh: "你看到天气了吗？好像随时要下雨。" },
                    { es: "Sí, el cielo está muy gris y hay muchas nubes negras. Deberías llevar paraguas si sales.", zh: "是的，天空很灰，有很多乌云。如果你出去应该带伞。" },
                    { es: "No tengo ninguno en casa. ¿Me prestas el tuyo? Te lo devuelvo mañana.", zh: "我家没有伞。能借你的吗？明天还你。" },
                    { es: "Lo siento, pero yo también lo necesito porque tengo que ir a la oficina. Hay una tienda en la esquina.", zh: "抱歉，但我也需要，因为我要去办公室。拐角处有一家商店。" },
                    { es: "Tienes razón, iré a comprar uno. Aunque seguro que cuesta el triple por ser de emergencia.", zh: "你说得对，我去买一把。虽然肯定因为是应急的贵三倍。" },
                    { es: "Ja, ja, probablemente. Pero mejor eso que empaparse. ¿Adónde tienes que ir?", zh: "哈哈，可能吧。但总比淋湿好。你要去哪里？" },
                    { es: "Tengo que ir al supermercado a comprar algo para cenar. No hay nada en la nevera.", zh: "我得去超市买点晚餐的东西。冰箱里什么都没有了。" },
                    { es: "¿Y si pedimos comida a domicilio? Así no te mojas y descansas un poco.", zh: "我们点外卖怎么样？这样你不会淋湿还能休息一下。" },
                    { es: "No es mala idea, pero quería hacer algo casero y saludable. Llevo toda la semana comiendo fuera.", zh: "不是坏主意，但我想做点家常健康的。我整个星期都在外面吃。" },
                    { es: "Entonces cómprate el paraguas y corre al supermercado antes de que empiece a llover.", zh: "那就买把伞，在下雨前跑去超市。" },
                    { es: "Sí, voy ahora mismo. Gracias por el consejo de todos modos.", zh: "好，我现在就去。还是谢谢你的建议。" },
                    { es: "De nada. Y si llueve mucho, llámame y te recojo en coche. No quiero que te enfermes.", zh: "不客气。如果下大雨，打电话给我，我开车去接你。我不想你生病。" }
                ]
            }
        ]
    },
    restaurant: {
        name: "餐厅点餐",
        templates: [
            {
                speakers: ["Camarero", "Cliente"],
                lines: [
                    { es: "Buenas tardes. Bienvenidos al restaurante La Plaza. ¿Tienen reserva?", zh: "下午好。欢迎来到拉普拉萨餐厅。你们有预约吗？" },
                    { es: "No, no tenemos reserva. ¿Hay mesa disponible para dos personas?", zh: "没有，我们没有预约。有两人桌吗？" },
                    { es: "Sí, por supuesto. Síganme, por favor. Les llevo a una mesa junto a la ventana.", zh: "有的，当然。请跟我来。我带你们去靠窗的桌子。" },
                    { es: "Perfecto, gracias. Aquí se ve muy bien.", zh: "完美，谢谢。这里看起来很不错。" },
                    { es: "Aquí tienen la carta. Les dejo unos minutos para que elijan. ¿Quieren algo de beber mientras tanto?", zh: "这是菜单。我给你们几分钟选择。这期间想喝点什么吗？" },
                    { es: "Una botella de agua, por favor. Y también nos gustaría ver la carta de vinos.", zh: "请给我一瓶水。还有我们想看酒单。" },
                    { es: "Enseguida se la traigo. Tenemos un Rioja excelente que combina muy bien con la carne.", zh: "马上给您拿来。我们有一款里奥哈很棒，和肉很配。" },
                    { es: "Suena bien. Traiga una botella. ¿La abre ahora o esperamos?", zh: "听起来不错。来一瓶吧。现在打开还是等一会儿？" },
                    { es: "Como prefieran. Cuando estén listos para pedir, me avisan.", zh: "随您喜欢。准备好点菜时告诉我。" },
                    { es: "Gracias. Vamos a mirar la carta y en un momento le llamamos.", zh: "谢谢。我们看菜单，一会儿叫您。" },
                    { es: "De acuerdo. Les dejo unos minutos.", zh: "好的。我给你们几分钟。" },
                    { es: "Perdone, ya estamos listos para pedir.", zh: "打扰一下，我们准备好点菜了。" }
                ]
            },
            {
                speakers: ["Cliente", "Camarero"],
                lines: [
                    { es: "Disculpe, esta carne no está bien hecha. La pedí bien hecha y está casi cruda.", zh: "打扰一下，这肉没熟透。我要的是全熟的，但这几乎是生的。" },
                    { es: "Lo siento mucho, señor. Se la llevo a la cocina enseguida para que la hagan de nuevo.", zh: "非常抱歉，先生。我马上拿去厨房让他们重新做。" },
                    { es: "Gracias. También hace falta más pan en la mesa, si no es molestia.", zh: "谢谢。桌上还需要更多面包，如果不麻烦的话。" },
                    { es: "Por supuesto, enseguida le traigo más pan calentito. ¿Algo más que necesite?", zh: "当然，马上给您拿热面包。还需要别的吗？" },
                    { es: "No, por ahora eso es todo. ¿Cuánto tardará la carne?", zh: "不，目前就这些。肉要等多久？" },
                    { es: "Unos diez minutos más o menos. Le traigo el pan ahora mismo.", zh: "大约十分钟左右。我现在就给您拿面包。" },
                    { es: "Perfecto, gracias por su atención y disculpe las molestias.", zh: "完美，谢谢您的服务，抱歉给您添麻烦了。" },
                    { es: "No se preocupe, es nuestro trabajo. Enseguida vuelvo con su carne bien hecha.", zh: "别担心，这是我们的工作。马上给您拿全熟的肉回来。" },
                    { es: "Ah, y también me gustaría otro vaso de agua, por favor.", zh: "啊，还有我想要另一杯水，谢谢。" },
                    { es: "Claro que sí. Con hielo o sin hielo?", zh: "当然。加冰还是不加冰？" },
                    { es: "Con hielo, gracias.", zh: "加冰，谢谢。" },
                    { es: "Enseguida se lo traigo todo.", zh: "马上给您拿来所有东西。" }
                ]
            },
            {
                speakers: ["Camarero", "Cliente A", "Cliente B"],
                lines: [
                    { es: "Buenas noches. ¿Han decidido ya qué van a pedir?", zh: "晚上好。你们已经决定好要点什么了吗？" },
                    { es: "Sí, de primero quiero la sopa del día para empezar.", zh: "是的，第一道菜我要例汤做前菜。" },
                    { es: "Hoy tenemos sopa de marisco fresquísima. ¿Le parece bien?", zh: "今天有非常新鲜的海鲜汤。可以吗？" },
                    { es: "Sí, perfecto. Y de segundo, el pescado a la plancha con verduras.", zh: "可以，完美。第二道菜我要烤鱼片配蔬菜。" },
                    { es: "Excelente elección. ¿Y para el caballero?", zh: "很好的选择。那这位先生呢？" },
                    { es: "Yo tomaré directamente el segundo plato. La paella para dos personas, por favor.", zh: "我直接要第二道菜。两人份海鲜饭，谢谢。" },
                    { es: "Muy bien. La paella tarda unos veinte minutos en prepararse. ¿Les importa esperar?", zh: "好的。海鲜饭需要大约二十分钟准备。介意等吗？" },
                    { es: "No hay problema. Tenemos tiempo y nos apetece disfrutar de la cena sin prisa.", zh: "没问题。我们有时间，我们想慢慢享受晚餐。" },
                    { es: "Perfecto. ¿Algo de beber? Tenemos una selección de vinos de la casa muy buena.", zh: "完美。喝点什么吗？我们有很好的自家精选葡萄酒。" },
                    { es: "Una botella de vino tinto, por favor. El que usted recomiende.", zh: "请给我一瓶红酒。您推荐哪款就要哪款。" },
                    { es: "Les recomiendo el Ribera del Duero. Es un vino robusto que va muy bien con la paella.", zh: "我推荐杜罗河岸。这是一款浓郁的红酒，和海鲜饭很配。" },
                    { es: "Perfecto, traiga ese. Gracias.", zh: "完美，就要那个。谢谢。" }
                ]
            }
        ]
    },
    travel: {
        name: "旅行问路",
        templates: [
            {
                speakers: ["Turista", "Local"],
                lines: [
                    { es: "Disculpe, ¿podría ayudarme? Estoy buscando la estación de tren y me he perdido.", zh: "打扰一下，您能帮我吗？我在找火车站，我迷路了。" },
                    { es: "Claro, con gusto. La estación está a unos diez minutos caminando desde aquí.", zh: "当然，很乐意。火车站从这儿走路大约十分钟。" },
                    { es: "¿Podría indicarme cómo llegar? No conozco bien la ciudad.", zh: "您能告诉我怎么走吗？我不太熟悉这座城市。" },
                    { es: "Siga todo recto por esta calle hasta llegar al semáforo grande.", zh: "沿着这条街一直往前走，直到到达那个大红绿灯。" },
                    { es: "¿Y luego qué hago? ¿Giro a la izquierda o a la derecha?", zh: "然后怎么做？我左转还是右转？" },
                    { es: "Gire a la izquierda y verá la estación al final de la calle, a mano derecha.", zh: "左转，您会看到火车站在街尽头，右手边。" },
                    { es: "Muchas gracias. ¿Sabe si hay señales en inglés también?", zh: "非常感谢。您知道也有英文标识吗？" },
                    { es: "Sí, en la estación principal todo está señalizado en varios idiomas.", zh: "是的，在主站所有东西都用多种语言标识。" },
                    { es: "Perfecto. ¿Hay algún lugar cerca donde pueda tomar un café mientras espero?", zh: "完美。附近有什么地方可以让我边等边喝咖啡吗？" },
                    { es: "Sí, justo enfrente de la estación hay una cafetería muy buena.", zh: "有，就在火车站对面有一家很好的咖啡馆。" },
                    { es: "¡Excelente! Muchas gracias por su ayuda. Ha sido muy amable.", zh: "太棒了！非常感谢您的帮助。您真好。" },
                    { es: "De nada. Que tenga un buen viaje y disfrute de su estancia.", zh: "不客气。祝您旅途愉快，住得开心。" }
                ]
            },
            {
                speakers: ["Recepcionista", "Huésped"],
                lines: [
                    { es: "Buenos días. ¿En qué puedo ayudarle?", zh: "早上好。有什么可以帮您的？" },
                    { es: "Buenos días. Me gustaría información sobre las excursiones que ofrece el hotel.", zh: "早上好。我想了解一下酒店提供的短途旅行信息。" },
                    { es: "Por supuesto. Tenemos varias opciones disponibles. ¿Prefiere la montaña o la playa?", zh: "当然。我们有几个可选方案。您喜欢山区还是海滩？" },
                    { es: "La montaña, por favor. Me encanta hacer senderismo y estar en contacto con la naturaleza.", zh: "山区，谢谢。我喜欢徒步旅行，喜欢亲近大自然。" },
                    { es: "Excelente elección. Tenemos una excursión al Parque Nacional que sale mañana a las ocho.", zh: "很好的选择。我们有一个去国家公园的旅行，明天八点出发。" },
                    { es: "¿Cuánto dura la excursión y qué incluye?", zh: "旅行多长时间，包含什么？" },
                    { es: "Dura todo el día, aproximadamente ocho horas. Incluye transporte, guía y almuerzo.", zh: "一整天，大约八小时。包含交通、导游和午餐。" },
                    { es: "¿Cuánto cuesta por persona? Somos dos adultos y un niño.", zh: "每人多少钱？我们是两个大人和一个小孩。" },
                    { es: "Son sesenta euros por adulto y treinta por el niño. Los niños menores de cinco años gratis.", zh: "大人六十欧元，小孩三十。五岁以下儿童免费。" },
                    { es: "Mi hijo tiene seis años. ¿Hay descuento para niños de esa edad?", zh: "我儿子六岁。那个年龄的儿童有折扣吗？" },
                    { es: "Sí, los niños de seis a doce años tienen un descuento del cincuenta por ciento.", zh: "有，六到十二岁的儿童有五折优惠。" },
                    { es: "Perfecto. ¿Puedo reservar ahora mismo?", zh: "完美。我现在可以预订吗？" }
                ]
            },
            {
                speakers: ["Agente", "Viajero"],
                lines: [
                    { es: "Buenos días. ¿En qué puedo ayudarle?", zh: "早上好。有什么可以帮您的？" },
                    { es: "Buenos días. Quiero comprar un billete de ida y vuelta a Sevilla para el próximo fin de semana.", zh: "早上好。我想买一张下周末往返塞维利亚的票。" },
                    { es: "¿Para qué fecha exactamente? Tenemos varios horarios disponibles.", zh: "具体什么日期？我们有几个班次可选。" },
                    { es: "El próximo viernes por la mañana, y vuelvo el domingo por la tarde.", zh: "下周五上午去，周日下午回。" },
                    { es: "Tenemos un tren a las nueve de la mañana que llega a Sevilla a las doce. ¿Le vale?", zh: "我们有一班上午九点的火车，十二点到达塞维利亚。可以吗？" },
                    { es: "Sí, ese horario me viene perfecto. ¿Y el domingo para volver?", zh: "可以，那个时间对我很合适。周日回来呢？" },
                    { es: "Para el domingo tenemos salidas a las cinco y a las ocho de la tarde.", zh: "周日我们有下午五点和八点出发的班次。" },
                    { es: "Mejor el de las cinco. ¿Cuánto cuesta en total?", zh: "五点的好。总共多少钱？" },
                    { es: "Ochenta euros en total para ida y vuelta. ¿Prefiere ventana o pasillo?", zh: "往返总共八十欧元。您喜欢靠窗还是靠过道？" },
                    { es: "Ventana, por favor. ¿Puedo pagar con tarjeta?", zh: "靠窗，谢谢。我可以刷卡吗？" },
                    { es: "Sí, claro. Aceptamos todas las tarjetas principales. ¿Necesita factura?", zh: "是的，当然。我们接受所有主流信用卡。您需要发票吗？" },
                    { es: "Sí, por favor. Es para un viaje de trabajo.", zh: "是的，请。这是出差用的。" }
                ]
            },
            {
                speakers: ["Taxista", "Pasajero"],
                lines: [
                    { es: "Buenas tardes. ¿Adónde quiere ir?", zh: "下午好。您想去哪里？" },
                    { es: "Al aeropuerto, por favor. Terminal dos. Tengo un vuelo internacional.", zh: "请去机场。二号航站楼。我有一个国际航班。" },
                    { es: "Muy bien. ¿Tiene prisa o tenemos tiempo de sobra?", zh: "好的。您赶时间还是我们有充足时间？" },
                    { es: "Sí, mi vuelo sale en dos horas y debo facturar una hora antes.", zh: "是的，我的航班两小时后起飞，我需要提前一小时办理登机手续。" },
                    { es: "No se preocupe, llegaremos con tiempo de sobra. Son unos treinta minutos en condiciones normales.", zh: "别担心，我们会提前到达。正常情况下大约三十分钟。" },
                    { es: "Perfecto. ¿Hay mucho tráfico a esta hora?", zh: "完美。这个时间交通多吗？" },
                    { es: "Ahora está tranquilo. El tráfico pesado suele ser por la mañana temprano y por la tarde.", zh: "现在还好。交通拥堵通常是在清晨和下午。" },
                    { es: "Menos mal. ¿Aceptan tarjeta de crédito o debo pagar en efectivo?", zh: "还好。你们收信用卡还是我必须付现金？" },
                    { es: "Sí, claro que aceptamos tarjeta. También puede pagar en efectivo si lo prefiere.", zh: "是的，当然收卡。如果您愿意也可以付现金。" },
                    { es: "Prefiero pagar con tarjeta. ¿Puedo pedirle un recibo?", zh: "我更喜欢刷卡。能请您给我一张收据吗？" },
                    { es: "Por supuesto. ¿Necesita factura completa con sus datos?", zh: "当然。您需要带您信息的完整发票吗？" },
                    { es: "Sí, por favor. Aquí tiene mi tarjeta de visita con los datos de la empresa.", zh: "是的，请。给您我的名片，上面有公司信息。" }
                ]
            },
            {
                speakers: ["Guía", "Turista"],
                lines: [
                    { es: "Bienvenidos a la Alhambra. Mi nombre es Carmen y seré su guía durante esta visita.", zh: "欢迎来到阿尔罕布拉宫。我叫卡门，将是您这次参观的导游。" },
                    { es: "Mucho gusto, Carmen. ¿Cuánto dura aproximadamente la visita?", zh: "很高兴见到您，卡门。参观大约需要多长时间？" },
                    { es: "La visita completa dura aproximadamente tres horas. Recorreremos los principales monumentos.", zh: "完整参观大约需要三小时。我们会游览主要 monuments。" },
                    { es: "¿Podemos entrar a los Palacios Nazaríes? He oído que son impresionantes.", zh: "我们可以进入纳塞瑞斯宫殿吗？我听说很壮观。" },
                    { es: "Sí, pero necesitan reserva con antelación porque el aforo es limitado. ¿Tienen los tickets?", zh: "可以，但需要提前预订，因为容量有限。你们有票吗？" },
                    { es: "Sí, los compré online hace dos semanas. Aquí están en el móvil.", zh: "有，我两周前在网上买的。在手机里。" },
                    { es: "Perfecto. Síganme, por favor. Empezaremos por el Generalife, que era el palacio de verano.", zh: "完美。请跟我来。我们从赫内拉利费宫开始，那是夏宫。" },
                    { es: "¿Podemos hacer fotos dentro de los palacios?", zh: "我们可以在宫殿里面拍照吗？" },
                    { es: "Sí, pueden hacer fotos, pero sin flash para no dañar las pinturas y decoraciones.", zh: "可以拍照，但不要开闪光灯，以免损坏画作和装饰。" },
                    { es: "Entendido. ¿Y tocar las paredes? Algunos lugares lo permiten.", zh: "明白。那摸墙壁呢？有些地方允许。" },
                    { es: "No, por favor, no toquen las paredes ni las fuentes. Es muy importante preservar este patrimonio.", zh: "不，请不要碰墙壁和喷泉。保护这份遗产非常重要。" },
                    { es: "Por supuesto, lo entiendo perfectamente. Gracias por la información.", zh: "当然，我完全理解。谢谢您的讲解。" }
                ]
            }
        ]
    },
    work: {
        name: "工作场景",
        templates: [
            {
                speakers: ["Gerente", "Empleado"],
                lines: [
                    { es: "Carlos, ¿podemos hablar un momento en mi despacho?", zh: "卡洛斯，我们能在我办公室谈一下吗？" },
                    { es: "Claro, jefe. ¿Pasa algo? Espero que no sea ningún problema.", zh: "当然，老板。有什么事吗？希望不是什么问题。" },
                    { es: "El proyecto del cliente va con retraso. ¿Qué ha pasado exactamente?", zh: "客户的项目延期了。到底发生了什么？" },
                    { es: "Hubo algunos problemas técnicos inesperados con el servidor, pero ya están solucionados.", zh: "服务器出现了一些意外的技术问题，但已经解决了。" },
                    { es: "¿Cuándo podremos entregarlo? El cliente está presionando mucho.", zh: "我们什么时候能交付？客户催得很紧。" },
                    { es: "Necesitamos dos días más para hacer las pruebas finales y corregir los últimos bugs.", zh: "我们还需要两天做最终测试和修复最后的bug。" },
                    { es: "Vale, pero no podemos retrasarnos más. ¿Necesitas más recursos o apoyo del equipo?", zh: "好，但我们不能再拖延了。你需要更多资源或团队支持吗？" },
                    { es: "Creo que con dos personas más podríamos terminar mañana mismo.", zh: "我想再要两个人，我们明天就能完成。" },
                    { es: "Perfecto, te asigno a María y a Pedro para que te ayuden esta tarde.", zh: "完美，我安排玛丽亚和佩德罗今天下午帮你。" },
                    { es: "¡Genial! Con su ayuda seguro que lo terminamos a tiempo.", zh: "太好了！有他们的帮助我们肯定能按时完成。" },
                    { es: "Manténme informado del progreso cada dos horas, por favor.", zh: "请每两小时向我汇报进度。" },
                    { es: "Por supuesto, jefe. Le enviaré actualizaciones por correo.", zh: "当然，老板。我会通过邮件发更新。" }
                ]
            },
            {
                speakers: ["Entrevistador", "Candidato"],
                lines: [
                    { es: "Buenos días. Pase, por favor. Soy el director de recursos humanos, me llamo Laura.", zh: "早上好。请进。我是人力资源总监，我叫劳拉。" },
                    { es: "Mucho gusto, señora. Vengo a la entrevista para el puesto de marketing.", zh: "很高兴见到您，女士。我来参加市场部的面试。" },
                    { es: "Sí, efectivamente. He recibido su currículum. Cuénteme, ¿por qué quiere trabajar en nuestra empresa?", zh: "是的，没错。我收到了您的简历。告诉我，您为什么想在我们公司工作？" },
                { es: "Me interesa mucho el sector tecnológico y creo que puedo aportar valor con mi experiencia internacional.", zh: "我对科技行业很感兴趣，而且我认为我能用国际经验带来价值。" },
                    { es: "Muy bien. Hablemos de su experiencia previa. ¿Cuánto tiempo estuvo en su último trabajo?", zh: "很好。我们来谈谈您之前的经验。您上一份工作做了多久？" },
                    { es: "Estuve tres años como coordinador de marketing en una multinacional.", zh: "我在一家跨国公司做了三年市场协调员。" },
                    { es: "¿Y por qué decidió dejar esa empresa?", zh: "那您为什么决定离开那家公司？" },
                    { es: "Busco nuevos retos profesionales y su empresa tiene una excelente reputación en el sector.", zh: "我在寻找新的职业挑战，而且贵公司在行业内有很好的声誉。" },
                    { es: "Excelente respuesta. ¿Tiene alguna pregunta sobre el puesto o la empresa?", zh: "回答得很好。您对这个职位或公司有什么问题吗？" },
                    { es: "Sí, ¿podría contarme más sobre el equipo con el que trabajaría?", zh: "有，您能多告诉我一些我要合作的团队吗？" },
                    { es: "Por supuesto. Somos un equipo joven y dinámico de ocho personas.", zh: "当然。我们是一个年轻有活力的八人团队。" },
                    { es: "Suena muy interesante. Estoy muy motivado para unirme al equipo.", zh: "听起来很有趣。我非常期待加入团队。" }
                ]
            },
            {
                speakers: ["Compañero A", "Compañero B"],
                lines: [
                    { es: "¿Has oído los rumores sobre los cambios en la organización?", zh: "你听说组织架构变动的传闻了吗？" },
                    { es: "Sí, me han dicho que van a fusionar dos departamentos el mes que viene.", zh: "听说了，他们说下个月要合并两个部门。" },
                    { es: "¿Sabes si habrá despidos o reestructuración de personal?", zh: "你知道会裁员或重组人员吗？" },
                    { es: "No lo sé con certeza, pero la dirección dice que no habrá despidos por ahora.", zh: "我不确定，但管理层说暂时不会裁员。" },
                    { es: "Espero que sea cierto. Estoy un poco preocupado por mi puesto.", zh: "希望是真的。我有点担心我的职位。" },
                    { es: "Tranquilo, tu trabajo es muy valorado por la empresa. Llevas cinco años aquí.", zh: "放心，你的工作很受公司重视。你在这儿五年了。" },
                    { es: "Es verdad, pero nunca se sabe en estos tiempos de crisis económica.", zh: "确实，但在这种经济危机时期谁也说不准。" },
                    { es: "Tienes razón, pero creo que nuestra empresa está en buena posición.", zh: "你说得对，但我认为我们公司处境不错。" },
                    { es: "¿Sabes cuándo anunciarán oficialmente los cambios?", zh: "你知道他们什么时候正式宣布变动吗？" },
                    { es: "Creo que será la semana que viene en la reunión general.", zh: "我想是下周在全体会议上。" },
                    { es: "Vale, entonces esperaré a ver qué pasa antes de preocuparme más.", zh: "好，那我就等看看会发生什么，不再多担心了。" },
                    { es: "Esa es la actitud. Seguro que todo sale bien.", zh: "这才是正确的态度。肯定一切都会好的。" }
                ]
            },
            {
                speakers: ["Jefe", "Empleado"],
                lines: [
                    { es: "Ana, felicitaciones por el excelente trabajo en el proyecto de ayer.", zh: "安娜，恭喜您昨天在项目上的出色工作。" },
                    { es: "Muchas gracias, jefe. Fue realmente un esfuerzo de todo el equipo.", zh: "非常感谢，老板。这真的是整个团队努力的结果。" },
                    { es: "El cliente quedó muy satisfecho con los resultados. Quiere seguir trabajando con nosotros.", zh: "客户对结果非常满意。想继续和我们合作。" },
                    { es: "¡Me alegro mucho de oír eso! ¿Sabemos ya los detalles del nuevo contrato?", zh: "很高兴听到这个消息！我们知道新合同的细节了吗？" },
                    { es: "Todavía no, pero la semana que viene tenemos una reunión para negociar los términos.", zh: "还没有，但下周我们有个会议来协商条款。" },
                    { es: "Perfecto. Estoy disponible cuando me necesite para preparar la propuesta.", zh: "完美。需要我准备提案的时候我随时都在。" },
                    { es: "Me vendría bien que prepararas un presupuesto preliminar para el lunes.", zh: "我需要你周一前准备一份初步预算。" },
                    { es: "Sin problema. ¿Tiene alguna idea del alcance que quiere el cliente?", zh: "没问题。您知道客户想要什么范围的吗？" },
                    { es: "Quiere ampliar el proyecto al doble de lo que tenemos ahora.", zh: "他想把项目扩大到现在的两倍。" },
                    { es: "Entendido. Prepararé varias opciones con diferentes rangos de precios.", zh: "明白。我会准备几个不同价格范围的选项。" },
                    { es: "Excelente. Eso es justo lo que necesitamos para la negociación.", zh: "太好了。这正是我们谈判需要的。" },
                    { es: "Me pongo a ello enseguida. Le tendré todo listo para el viernes.", zh: "我马上开始。周五前我会把所有东西准备好。" }
                ]
            },
            {
                speakers: ["Secretaria", "Cliente"],
                lines: [
                    { es: "Buenos días, empresa Martínez. ¿En qué puedo ayudarle?", zh: "早上好，马丁内斯公司。有什么可以帮您的？" },
                    { es: "Buenos días. Quisiera solicitar una reunión con el director comercial para la próxima semana.", zh: "早上好。我想申请下周和商业总监开个会。" },
                    { es: "Por supuesto. ¿Qué día le vendría mejor? Tenemos disponibilidad de lunes a jueves.", zh: "当然。您哪天方便？我们周一到周四都有空。" },
                    { es: "El martes o el miércoles por la mañana me irían bien.", zh: "周二或周三上午对我合适。" },
                    { es: "Voy a consultar la agenda del señor López. Un momento, por favor.", zh: "我查一下洛佩斯先生的日程。请稍等。" },
                    { es: "Gracias, no tengo prisa. Puedo esperar.", zh: "谢谢，我不着急。我可以等。" },
                    { es: "¿Le parece bien el martes a las diez de la mañana?", zh: "周二上午十点您看可以吗？" },
                    { es: "Sí, perfecto. ¿Debo llevar algún documento en especial?", zh: "可以，完美。我需要带什么特殊文件吗？" },
                    { es: "Si tiene alguna propuesta escrita o presupuesto, sería de gran ayuda.", zh: "如果您有任何书面提案或预算，会很有帮助。" },
                    { es: "Sí, prepararé una presentación con nuestra propuesta de colaboración.", zh: "有，我会准备一份我们合作提案的演示文稿。" },
                    { es: "Excelente. Le enviaré una confirmación por correo con todos los detalles.", zh: "太好了。我会通过邮件发确认函给您，包含所有细节。" },
                    { es: "Muchas gracias. Quedo a la espera de su correo. Hasta el martes.", zh: "非常感谢。我等您的邮件。周二见。" }
                ]
            }
        ]
    },
    shopping: {
        name: "购物",
        templates: [
            {
                speakers: ["Cliente", "Vendedor"],
                lines: [
                    { es: "Buenos días. ¿Me podría ayudar? Estoy buscando un regalo especial para el cumpleaños de mi madre.", zh: "早上好。您能帮我吗？我在给我妈妈找一份特别的生日礼物。" },
                    { es: "¡Por supuesto! Con mucho gusto le ayudo. ¿Qué le gusta hacer a su madre en su tiempo libre?", zh: "当然！很乐意帮您。您妈妈空闲时间喜欢做什么？" },
                    { es: "A ella le encanta leer novelas históricas y también le gusta mucho hacer manualidades en casa.", zh: "她喜欢读历史小说，也很喜欢在家做手工。" },
                    { es: "Qué interesante. Tenemos una selección excelente de libros de arte e historia, y también kits de manualidades.", zh: "真有趣。我们有精选的艺术和历史书籍，还有手工套装。" },
                    { es: "¿Podría mostrarme algunas opciones? Mi presupuesto es de unos cincuenta euros.", zh: "您能给我看一些选择吗？我的预算大约五十欧元。" },
                    { es: "Con ese presupuesto tiene muchas posibilidades. Mire, este kit de acuarelas es muy popular.", zh: "有这个预算您有很多选择。看，这套水彩画具很受欢迎。" },
                    { es: "Es muy bonito. ¿Incluye instrucciones para principiantes? Mi madre está empezando.", zh: "很漂亮。包含初学者说明吗？我妈妈刚开始学。" },
                    { es: "Sí, viene con un libro de técnicas básicas y vídeos online. Es perfecto para empezar.", zh: "是的，带有基础技巧书和在线视频。非常适合初学者。" },
                    { es: "Perfecto. ¿Me lo puede envolver para regalo con papel bonito?", zh: "完美。您能帮我用漂亮的纸包成礼物吗？" },
                    { es: "Claro que sí, sin ningún coste adicional. ¿Quiere que incluya una tarjeta de felicitación?", zh: "当然可以，不额外收费。您要包含贺卡吗？" },
                    { es: "Sí, por favor. Escriba 'Para la mejor madre del mundo, con todo mi cariño'.", zh: "是的，请。写上'给世界上最好的妈妈，献上我所有的爱'。" },
                    { es: "Qué bonito mensaje. Enseguida se lo preparo todo. Serán cuarenta y cinco euros en total.", zh: "多美的信息。我马上给您准备一切。总共四十五欧元。" }
                ]
            },
            {
                speakers: ["Cliente", "Vendedor"],
                lines: [
                    { es: "Disculpe, ¿podría ayudarme? Estoy buscando unos zapatos para correr.", zh: "打扰一下，您能帮我吗？我在找跑鞋。" },
                    { es: "Claro que sí. ¿Para qué tipo de superficie principalmente? ¿Asfalto o montaña?", zh: "当然可以。主要什么类型的地面？柏油路还是山地？" },
                    { es: "Principalmente asfalto en la ciudad. Hago unos diez kilómetros al día por el parque.", zh: "主要是城市柏油路。我每天在公园跑大约十公里。" },
                    { es: "Entiendo. Para esa distancia diaria necesita buena amortiguación. Le recomiendo este modelo.", zh: "明白。对于每天这个距离，您需要好的缓冲。我推荐这款。" },
                    { es: "¿Son muy ligeros? No me gusta sentir peso en los pies cuando corro.", zh: "很轻吗？我跑步时不喜欢感觉脚上有重量。" },
                    { es: "Sí, son ultraligeros y transpirables. Tienen muy buenas opiniones de otros corredores.", zh: "是的，超轻透气。其他跑步者评价很好。" },
                    { es: "Me gustan. ¿Puedo probármelos? Uso la talla cuarenta y dos.", zh: "我喜欢。我能试穿吗？我穿42码。" },
                    { es: "Sí, aquí tiene. Puede caminar un poco por la tienda para ver si le resultan cómodos.", zh: "可以，给您。您可以在店里走几步看看是否舒服。" },
                    { es: "¿Tienen alguna política de devolución si no me quedan bien después de correr?", zh: "如果跑步后不合适，你们有什么退货政策？" },
                    { es: "Sí, tiene treinta días para devolverlos si no está satisfecho, incluso usándolos.", zh: "有，您有三十天退货时间，如果不满意，即使穿过了也可以退。" },
                    { es: "Excelente. Me los quedo entonces. ¿Cuánto cuestan?", zh: "太好了。那我买了。多少钱？" },
                    { es: "Cuestan ochenta y cinco euros. ¿Paga en efectivo o con tarjeta?", zh: "八十五欧元。您付现金还是刷卡？" }
                ]
            },
            {
                speakers: ["Cliente", "Vendedor"],
                lines: [
                    { es: "Buenas tardes. Quisiera devolver esta camisa que compré hace unos días.", zh: "下午好。我想退这件我几天前买的衬衫。" },
                    { es: "Lo siento que no le haya gustado. ¿Tiene el ticket de compra o la factura?", zh: "抱歉您不喜欢。您有购物小票或发票吗？" },
                    { es: "Sí, aquí lo tengo. La compré el martes pasado, hace tres días exactamente.", zh: "有，在这儿。我上周二买的，正好三天前。" },
                    { es: "Perfecto, está dentro del plazo de devolución. ¿Cuál es el problema con la camisa?", zh: "完美，在退货期限内。衬衫有什么问题？" },
                    { es: "No es la talla correcta. Me queda un poco pequeña de hombros.", zh: "尺码不对。我穿肩膀有点紧。" },
                    { es: "Entiendo. ¿Prefiere el reembolso completo o le gustaría cambiarla por otra talla?", zh: "明白。您想要全额退款还是想换别的尺码？" },
                    { es: "Me gustaría cambiarla por una talla más grande si la tienen disponible.", zh: "如果有货的话，我想换大一号。" },
                    { es: "Voy a comprobar si tenemos stock. Un momento, por favor. Consulto el sistema.", zh: "我去检查一下有没有库存。稍等。我查一下系统。" },
                    { es: "Sí, tenemos la talla grande en el almacén. ¿Quiere que se la reserve?", zh: "有，我们仓库有大号。您要我帮您预留吗？" },
                    { es: "Sí, por favor. ¿Cuándo podría recogerla?", zh: "是的，请。我什么时候可以来取？" },
                    { es: "Mañana mismo podrá recogerla. Le enviaremos un mensaje cuando esté lista.", zh: "明天就可以取。准备好后我们会给您发消息。" },
                    { es: "Perfecto. Muchas gracias por su ayuda y paciencia.", zh: "完美。非常感谢您的帮助和耐心。" }
                ]
            },
            {
                speakers: ["Cajero", "Cliente"],
                lines: [
                    { es: "Buenas tardes. ¿Tiene tarjeta de fidelidad de nuestra tienda?", zh: "下午好。您有我们店的会员卡吗？" },
                    { es: "No, la verdad es que no. Pero me gustaría hacer una si es posible.", zh: "没有，说实话没有。但如果可能的话我想办一张。" },
                    { es: "¡Excelente! Es muy fácil. Solo necesito su DNI y un número de teléfono móvil.", zh: "太好了！很简单。我只需要您的身份证和手机号码。" },
                    { es: "Aquí tiene mi DNI. Mi número es el seis cuatro siete, ocho nueve cero, cinco seis.", zh: "给您我的身份证。我的号码是647-890-56。" },
                    { es: "Gracias. ¿Me permite su dirección de correo electrónico también?", zh: "谢谢。您也能给我您的电子邮箱地址吗？" },
                    { es: "Sí, es maria punto garcía arroba email punto com.", zh: "可以，是maria.garcia@email.com。" },
                    { es: "Perfecto. Ya está registrada. ¿Sabe qué beneficios tiene la tarjeta?", zh: "完美。已经注册好了。您知道会员卡有什么优惠吗？" },
                    { es: "No estoy segura. ¿Me puede explicar las ventajas?", zh: "不太确定。您能给我解释一下好处吗？" },
                    { es: "Acumula puntos con cada compra, tiene descuentos especiales y acceso a ventas exclusivas.", zh: "每次购物积分，有特别折扣，还能参加独家促销。" },
                    { es: "Suena muy bien. ¿Cuánto es el total de hoy con el descuento de la tarjeta?", zh: "听起来很好。今天用会员卡折扣后总共多少钱？" },
                    { es: "Hoy tiene un descuento de bienvenida del quince por ciento. Son sesenta y cinco euros en total.", zh: "今天您有百分之十五的欢迎折扣。总共六十五欧元。" },
                    { es: "Perfecto. Aquí tiene mi tarjeta de crédito. Gracias por la información.", zh: "完美。给您我的信用卡。谢谢您的讲解。" }
                ]
            },
            {
                speakers: ["Cliente", "Vendedor"],
                lines: [
                    { es: "Disculpe, este abrigo me gusta mucho, pero no tiene etiqueta de precio.", zh: "打扰一下，这件大衣我很喜欢，但没有价格标签。" },
                    { es: "Déjeme comprobarlo. Este modelo es de la nueva colección de invierno.", zh: "让我查一下。这款是冬季新款。" },
                    { es: "¿Está en oferta o tiene algún descuento?", zh: "打折吗或有什么折扣吗？" },
                    { es: "Sí, tiene un descuento del treinta por ciento por ser de la temporada pasada.", zh: "有，因为是上一季的，打七折。" },
                    { es: "¡Qué bien! ¿Cuánto cuesta entonces?", zh: "太好了！那多少钱？" },
                    { es: "El precio original es de doscientos euros, pero con el descuento se queda en ciento cuarenta.", zh: "原价两百欧元，但打折后一百四十。" },
                    { es: "Me parece un buen precio. ¿Tienen este modelo en color azul marino?", zh: "我觉得价格不错。这款有海军蓝的吗？" },
                    { es: "Lo siento, solo nos queda en negro y en gris oscuro. El azul se agotó la semana pasada.", zh: "抱歉，我们只有黑色和深灰色了。蓝色上周卖完了。" },
                    { es: "Qué pena. ¿Van a tener más existencias del azul próximamente?", zh: "真遗憾。你们很快会补蓝色货吗？" },
                    { es: "No creo, era una edición limitada. Pero el negro es muy elegante y combina con todo.", zh: "应该不会，那是限量版。但黑色很优雅，百搭。" },
                    { es: "Tiene razón. Me llevo el negro entonces. ¿Me lo puede guardar mientras sigo mirando?", zh: "您说得对。那我买黑色。您能帮我留着，我继续逛逛吗？" },
                    { es: "Por supuesto. Le dejo el abrigo en la cabina de probadores con su nombre.", zh: "当然。我把大衣放在试衣间，写上您的名字。" }
                ]
            }
        ]
    },
    doctor: {
        name: "看病就医",
        templates: [
            {
                speakers: ["Doctor", "Paciente"],
                lines: [
                    { es: "Buenos días, señora. ¿Qué síntomas tiene? Cuénteme qué le pasa.", zh: "早上好，女士。您有什么症状？告诉我您怎么了。" },
                    { es: "Buenos días, doctor. Tengo fiebre desde ayer y me duele mucho la garganta al tragar.", zh: "早上好，医生。我从昨天开始发烧，吞咽时喉咙很痛。" },
                    { es: "¿Ha medido la temperatura? ¿Sabe cuánto tiene aproximadamente?", zh: "您量体温了吗？知道大概多少度吗？" },
                    { es: "Sí, esta mañana tenía treinta y ocho con cinco grados.", zh: "量了，今天早上38.5度。" },
                    { es: "Voy a examinarle. Abra la boca, por favor, y diga 'aaaa'.", zh: "我检查一下。请张开嘴，说'啊'。" },
                    { es: "Aaaa... ¿Ve algo raro, doctor?", zh: "啊...看到什么异常吗，医生？" },
                    { es: "Tiene la garganta muy roja e inflamada. Parece que tiene una infección bacteriana.", zh: "您的喉咙很红很肿。看起来您有细菌感染。" },
                    { es: "¿Es grave, doctor? ¿Necesito antibióticos?", zh: "严重吗，医生？我需要抗生素吗？" },
                    { es: "No es grave, pero sí necesita antibióticos. Le receto amoxicilina por siete días.", zh: "不严重，但确实需要抗生素。我给您开阿莫西林，吃七天。" },
                    { es: "¿Cómo debo tomarlos? ¿Antes o después de las comidas?", zh: "我应该怎么吃？饭前还是饭后？" },
                    { es: "Una pastilla cada ocho horas, preferiblemente después de comer para proteger el estómago.", zh: "每八小时一片，最好饭后吃以保护胃。" },
                    { es: "Perfecto. Muchas gracias, doctor. ¿Debo volver para revisión?", zh: "完美。非常感谢，医生。我需要回来复查吗？" }
                ]
            },
            {
                speakers: ["Doctor", "Paciente"],
                lines: [
                    { es: "Buenas tardes. Veo en su historial que tiene dolores de estómago. ¿Desde cuándo?", zh: "下午好。我在您的病历上看到您胃痛。多久了？" },
                    { es: "Desde hace una semana más o menos. Al principio eran leves, pero ahora son más intensos.", zh: "大约一周了。一开始是轻微的，但现在更剧烈了。" },
                    { es: "¿Ha cambiado algo en su alimentación recientemente?", zh: "您最近饮食有什么变化吗？" },
                    { es: "Sí, he estado comiendo mucha comida picante y tomando bastante café.", zh: "有，我吃了很多辛辣食物，还喝了很多咖啡。" },
                    { es: "Eso puede ser la causa. La comida picante irrita el estómago y el café aumenta la acidez.", zh: "那可能是原因。辛辣食物刺激胃，咖啡增加酸度。" },
                    { es: "¿Debería dejar de tomar café por completo, doctor?", zh: "我应该完全停止喝咖啡吗，医生？" },
                    { es: "No es necesario eliminarlo, pero reduzca la cantidad. Máximo dos tazas al día.", zh: "没必要完全戒掉，但减少量。最多一天两杯。" },
                    { es: "Entendido. ¿Necesito hacer alguna prueba médica?", zh: "明白。我需要做什么医学检查吗？" },
                    { es: "Sí, le voy a hacer unas pruebas para descartar otras cosas como úlcera o gastritis.", zh: "是的，我要给您做一些检查排除其他问题，比如溃疡或胃炎。" },
                    { es: "¿Debo venir en ayunas para las pruebas?", zh: "我需要空腹来做检查吗？" },
                    { es: "Sí, por favor. Venga mañana a primera hora, sin haber desayunado ni tomado medicinas.", zh: "是的，请。明天一大早来，不要吃早餐也不要吃药。" },
                    { es: "Perfecto. Gracias por su atención, doctor. Me siento más tranquilo ahora.", zh: "完美。谢谢您的诊治，医生。我现在感觉更放心了。" }
                ]
            },
            {
                speakers: ["Enfermera", "Paciente"],
                lines: [
                    { es: "Buenos días, don José. Voy a tomarle la tensión arterial antes de que entre el doctor.", zh: "早上好，何塞先生。在医生进来之前我要量您的血压。" },
                    { es: "Buenos días. ¿Se ha medicado hoy con las pastillas de la tensión?", zh: "早上好。您今天吃了降压药吗？" },
                    { es: "Sí, tomé la pastilla de la mañana como siempre, hace un par de horas.", zh: "吃了，像往常一样吃了早上的药，两小时前。" },
                    { es: "Vale, déjeme ponerle el brazalete. Relájese y respire normalmente.", zh: "好，让我给您绑上袖带。放松，正常呼吸。" },
                    { es: "¿Qué tal está la tensión? Espero que esté mejor que la última vez.", zh: "血压怎么样？希望比上次好。" },
                    { es: "La tensión está un poco alta todavía. Catorce sobre nueve. ¿Ha estado estresado últimamente?", zh: "血压还是有点高。140/90。最近压力大吗？" },
                    { es: "Sí, la verdad es que he tenido mucho trabajo y algunos problemas familiares.", zh: "是的，说实话最近工作很多，还有一些家庭问题。" },
                    { es: "El estrés afecta mucho la presión arterial. Debe intentar relajarse más.", zh: "压力很影响血压。您应该尽量多放松。" },
                    { es: "Tiene razón. Voy a intentar hacer ejercicio y meditar un poco cada día.", zh: "您说得对。我会尝试每天锻炼和冥想一会儿。" },
                    { es: "Esa es una excelente idea. El ejercicio moderado ayuda mucho a controlar la tensión.", zh: "这是个好主意。适度运动对控制血压很有帮助。" },
                    { es: "¿Debo cambiar algo en la medicación o sigo igual?", zh: "我需要改变药物还是继续一样吃？" },
                    { es: "Eso lo decidirá el doctor cuando revise los resultados. Ahora le toca a él.", zh: "那要等医生看结果后决定。现在轮到他了。" }
                ]
            },
            {
                speakers: ["Farmacéutico", "Cliente"],
                lines: [
                    { es: "Buenos días. ¿En qué puedo ayudarle? ¿Tiene alguna receta médica?", zh: "早上好。有什么可以帮您的？您有处方吗？" },
                    { es: "Sí, buenos días. Aquí tiene la receta del doctor. Son para mi hijo que tiene tos.", zh: "有，早上好。给您医生的处方。是给我咳嗽的儿子的。" },
                    { es: "Veo que son antibióticos y un jarabe para la tos. ¿Su hijo tiene fiebre también?", zh: "我看到是抗生素和止咳糖浆。您儿子也发烧吗？" },
                    { es: "Sí, ha tenido fiebre durante dos días, pero el doctor dice que es una infección leve.", zh: "是的，烧了两天了，但医生说只是轻微感染。" },
                    { es: "Muy bien. Para los antibióticos, dé una cucharada cada ocho horas después de comer.", zh: "很好。抗生素的话，每八小时饭后给一汤匙。" },
                    { es: "¿Y el jarabe para la tos? ¿Cuánto debo darle?", zh: "那止咳糖浆呢？我应该给多少？" },
                    { es: "Dos cucharaditas tres veces al día. No más de seis al día en total.", zh: "一天三次，每次两茶匙。总共一天不超过六茶匙。" },
                    { es: "¿Tiene algún efecto secundario del que deba preocuparme?", zh: "有什么我应该担心的副作用吗？" },
                    { es: "Puede causar algo de sueño, así que mejor darlo por la noche antes de dormir.", zh: "可能会引起一些嗜睡，所以最好晚上睡前给。" },
                    { es: "Entendido. ¿Cuánto cuesta todo? ¿Aceptan tarjeta de crédito?", zh: "明白。总共多少钱？你们收信用卡吗？" },
                    { es: "Son veintitrés euros con cincuenta céntimos. Sí, aceptamos todas las tarjetas.", zh: "二十三欧元五十欧分。是的，我们接受所有卡。" },
                    { es: "Perfecto. Aquí tiene. Muchas gracias por la información.", zh: "完美。给您。非常感谢您的讲解。" }
                ]
            },
            {
                speakers: ["Recepcionista", "Paciente"],
                lines: [
                    { es: "Buenos días. Bienvenido a la clínica San José. ¿Tiene cita previa?", zh: "早上好。欢迎来到圣何塞诊所。您有预约吗？" },
                    { es: "No, la verdad es que no tengo cita. Es urgente, me siento muy mal.", zh: "没有，说实话我没有预约。很紧急，我感觉很不舒服。" },
                    { es: "Entiendo. Voy a ver si el doctor puede atenderle entre paciente y paciente.", zh: "明白。我看看医生能不能在病人之间接待您。" },
                    { es: "Muchas gracias. Tengo dolor de cabeza muy fuerte y mareos desde esta mañana.", zh: "非常感谢。我从今天早上开始头痛很厉害，还头晕。" },
                    { es: "¿Su nombre, por favor? Y ¿tiene tarjeta sanitaria?", zh: "请问您叫什么名字？您有医保卡吗？" },
                    { es: "Me llamo Juan Martínez García. Sí, aquí tengo la tarjeta sanitaria.", zh: "我叫胡安·马丁内斯·加西亚。有，这是我的医保卡。" },
                    { es: "Gracias. Espere un momento, por favor. Hay una cancelación en quince minutos.", zh: "谢谢。请稍等。十五分钟后有一个取消的预约。" },
                    { es: "¡Qué suerte! ¿Debo esperar aquí en la sala o hay algún sitio específico?", zh: "真幸运！我需要在这里大厅等还是有特定地方？" },
                    { es: "Puede esperar en la sala de espera. Allí tiene revistas y agua.", zh: "您可以在候诊室等。那里有杂志和水。" },
                    { es: "Perfecto. ¿El doctor es puntual o suele retrasarse?", zh: "完美。医生准时吗还是通常会迟到？" },
                    { es: "Generalmente es muy puntual. Le llamaremos por su nombre cuando le toque.", zh: "通常很准时。轮到您时我们会叫您的名字。" },
                    { es: "Muchas gracias por su ayuda. Esperaré aquí sentado.", zh: "非常感谢您的帮助。我坐在这儿等。" }
                ]
            }
        ]
    },
    bank: {
        name: "银行服务",
        templates: [
            {
                speakers: ["Cliente", "Empleado"],
                lines: [
                    { es: "Buenos días. Quisiera abrir una cuenta corriente, por favor.", zh: "早上好。我想开一个活期账户，谢谢。" },
                    { es: "Por supuesto, con gusto le ayudo. ¿Tiene usted DNI o NIE en regla?", zh: "当然，很乐意帮您。您有有效的身份证或外国人身份证吗？" },
                    { es: "Sí, aquí lo tengo. Es el DNI español. ¿Qué documentación más necesito?", zh: "有，在这儿。是西班牙身份证。我还需要什么文件？" },
                    { es: "Necesitamos un justificante de domicilio reciente y su nómina o contrato de trabajo.", zh: "我们需要近期的居住证明和您的工资单或工作合同。" },
                    { es: "Perfecto, aquí tiene todo. Traje la factura de la luz de este mes y mi contrato indefinido.", zh: "完美，给您所有文件。我带了这个月的电费单和我的无固定期限合同。" },
                    { es: "Muy bien, todo parece correcto. ¿Quiere una tarjeta de débito asociada a la cuenta?", zh: "很好，看起来都没问题。您想要一张关联账户的借记卡吗？" },
                    { es: "Sí, por favor. ¿Tiene algún coste adicional la tarjeta?", zh: "是的，请。卡有额外费用吗？" },
                    { es: "No, la tarjeta básica es gratuita. La cuenta también es sin comisiones si domicilia la nómina.", zh: "没有，基础卡是免费的。如果您工资直接存入，账户也免手续费。" },
                    { es: "Perfecto, así lo haré. ¿Cuándo estará activa la cuenta?", zh: "完美，我会那样做。账户什么时候激活？" },
                    { es: "En unos minutos tendrá su cuenta activa y podrá usarla inmediatamente.", zh: "几分钟后您的账户就会激活，可以立即使用。" },
                    { es: "Excelente. ¿Puedo configurar la banca online hoy mismo?", zh: "太好了。我今天可以设置网上银行吗？" },
                    { es: "Sí, le daremos de alta en el sistema y recibirá las claves por correo en veinticuatro horas.", zh: "可以，我们会在系统中给您注册，24小时内您会收到密码邮件。" }
                ]
            },
            {
                speakers: ["Cliente", "Empleado"],
                lines: [
                    { es: "Hola, buenos días. Necesito hacer una transferencia internacional urgente.", zh: "您好，早上好。我需要做一笔紧急国际转账。" },
                    { es: "Por supuesto. ¿A qué país quiere enviar el dinero?", zh: "当然。您想把钱寄到哪个国家？" },
                    { es: "A China. Es para mi familia que vive en Beijing. Es bastante urgente.", zh: "到中国。是给我住在北京的家人。很急。" },
                    { es: "Entiendo. Necesitamos los datos completos del banco receptor y el número de cuenta o IBAN.", zh: "明白。我们需要收款银行的完整信息和账号或IBAN。" },
                    { es: "Aquí tengo todos los datos escritos. El banco es el Bank of China.", zh: "我有所有手写信息。银行是中国银行。" },
                    { es: "Perfecto. ¿Cuánto dinero quiere transferir?", zh: "完美。您想转多少钱？" },
                    { es: "Dos mil euros. ¿Cuánto tarda en llegar a China?", zh: "两千欧元。多久能到中国？" },
                    { es: "Unos tres días laborables si todo está correcto. La comisión es del uno por ciento.", zh: "如果一切正常大约三个工作日。手续费是百分之一。" },
                    { es: "¿Y el tipo de cambio? ¿Es el del día de la transferencia?", zh: "那汇率呢？是转账当天的吗？" },
                    { es: "Sí, aplicamos el tipo de cambio vigente en el momento de procesar la operación.", zh: "是的，我们使用处理交易时的现行汇率。" },
                    { es: "Perfecto. Procedamos entonces. Aquí tiene mi identificación.", zh: "完美。那我们开始吧。给您我的身份证明。" },
                    { es: "Muy bien. Rellene este formulario y enseguida procesamos la transferencia.", zh: "很好。请填写这张表格，我们马上处理转账。" }
                ]
            },
            {
                speakers: ["Cliente", "Empleado"],
                lines: [
                    { es: "Buenos días. Tengo un problema urgente. He perdido mi tarjeta de crédito.", zh: "早上好。我有个紧急问题。我丢了信用卡。" },
                    { es: "Lo siento mucho. Primero debemos bloquearla por seguridad. ¿Recuerda el número de la tarjeta?", zh: "非常抱歉。首先为了安全我们要冻结它。您记得卡号吗？" },
                    { es: "No, la verdad es que no lo recuerdo, pero tengo mi DNI aquí.", zh: "不，说实话不记得了，但我有身份证。" },
                    { es: "Con eso es suficiente. Voy a buscar su cuenta y bloquearla ahora mismo.", zh: "那就够了。我去查您的账户，马上冻结。" },
                    { es: "Gracias. ¿Alguien podría usarla si la han encontrado?", zh: "谢谢。如果有人捡到了能用吗？" },
                    { es: "No se preocupe, una vez bloqueada nadie puede usarla. Ya está anulada en el sistema.", zh: "别担心，一旦冻结没人能用。系统中已经作废了。" },
                    { es: "¡Qué alivio! ¿Puedo solicitar una nueva tarjeta de inmediato?", zh: "松了口气！我可以马上申请新卡吗？" },
                    { es: "Sí, por supuesto. Le preparo la solicitud ahora mismo. ¿La quiere con el mismo límite?", zh: "是的，当然。我现在就给您准备申请。您要同样额度的吗？" },
                    { es: "Sí, el mismo límite está bien. ¿Cuánto tarda en llegar?", zh: "是的，同样额度就行。多久能到？" },
                    { es: "Le llegará a su domicilio en una semana aproximadamente.", zh: "大约一周内会寄到您家。" },
                    { es: "¿Y mientras tanto puedo usar la banca online para hacer compras?", zh: "那 meantime 我能用网上银行购物吗？" },
                    { es: "Sí, puede usar la tarjeta virtual de su app móvil mientras espera la física.", zh: "可以，您可以用手机应用的虚拟卡，等实体卡。" }
                ]
            },
            {
                speakers: ["Cliente", "Empleado"],
                lines: [
                    { es: "Hola, buenas tardes. Quiero solicitar un préstamo personal para comprar un coche.", zh: "您好，下午好。我想申请个人贷款买车。" },
                    { es: "Por supuesto. ¿De cuánto dinero necesita exactamente?", zh: "当然。您确切需要多少钱？" },
                    { es: "Unos quince mil euros sería suficiente para el coche que tengo en mente.", zh: "大约一万五千欧元，够买我想的那辆车了。" },
                    { es: "Entiendo. ¿A qué plazo le gustaría devolver el préstamo?", zh: "明白。您想多长时间还清贷款？" },
                    { es: "En cinco años si es posible. ¿Qué interés tendría?", zh: "如果可能的话五年。利率是多少？" },
                    { es: "Voy a calcularle las cuotas. Depende de su perfil crediticio. ¿Tiene nómina fija?", zh: "我来算一下分期付款。取决于您的信用状况。您有固定工资吗？" },
                    { es: "Sí, trabajo en una empresa desde hace tres años con contrato indefinido.", zh: "有，我在一家公司工作三年了，无固定期限合同。" },
                    { es: "Excelente. Eso es favorable. ¿Tiene alguna otra deuda pendiente?", zh: "太好了。这很有利。您有其他未还债务吗？" },
                    { es: "No, no tengo ninguna deuda. Mi única tarjeta está al día siempre.", zh: "没有，我没有任何债务。我唯一的信用卡总是按时还款。" },
                    { es: "Perfecto. Con estos datos podemos ofrecerle un interés del seis por ciento anual.", zh: "完美。根据这些信息我们可以给您年利率百分之六。" },
                    { es: "¿Y cuál sería la cuota mensual aproximada?", zh: "那大概每月分期付款多少？" },
                    { es: "Serían unos doscientos noventa euros al mes durante cinco años.", zh: "五年内每月大约二百九十欧元。" }
                ]
            }
        ]
    },
    school: {
        name: "学校生活",
        templates: [
            {
                speakers: ["Profesor", "Alumno"],
                lines: [
                    { es: "Buenos días, clase. Hoy vamos a hablar de un tema muy interesante de historia de España.", zh: "早上好，同学们。今天我们要讲一个西班牙历史中非常有趣的话题。" },
                    { es: "Buenos días, profesor. ¿Qué época histórica vamos a estudiar hoy?", zh: "早上好，老师。我们今天要学哪个历史时期？" },
                    { es: "Vamos a estudiar el Siglo de Oro español, que fue un período de gran esplendor cultural.", zh: "我们要学西班牙黄金时代，那是一个文化繁荣的时期。" },
                    { es: "¿Tendremos que memorizar muchas fechas para el examen?", zh: "我们需要为考试记很多日期吗？" },
                    { es: "Algunas fechas importantes sí, pero lo fundamental es entender el contexto histórico y social.", zh: "一些重要日期是的，但关键是理解历史和社会背景。" },
                    { es: "¿Qué autores importantes escribieron durante esa época?", zh: "那个时期有哪些重要作家？" },
                    { es: "Escribieron Cervantes, autor del Quijote, y Lope de Vega, un gran dramaturgo.", zh: "有写《堂吉诃德》的塞万提斯，还有伟大的剧作家洛佩·德·维加。" },
                    { es: "¡Qué interesante! Me encanta leer literatura clásica española.", zh: "真有趣！我喜欢读西班牙古典文学。" },
                    { es: "Me alegro de oír eso. Para la próxima clase, lean los poemas que os he mandado.", zh: "很高兴听到这个。下节课前，读我发给你们的诗歌。" },
                    { es: "Sí, profesor. Los leeré este fin de semana.", zh: "好的，老师。我这周末会读。" },
                    { es: "Perfecto. También preparad alguna pregunta sobre el tema para discutir en clase.", zh: "完美。也准备一些关于这个话题的问题，课堂上讨论。" },
                    { es: "Entendido, profesor. Gracias por la clase de hoy.", zh: "明白，老师。谢谢今天的课。" }
                ]
            },
            {
                speakers: ["Alumno", "Profesor"],
                lines: [
                    { es: "Perdone, profesor. ¿Podría explicarme este ejercicio de matemáticas de nuevo?", zh: "打扰一下，老师。您能再给我解释这道数学题吗？" },
                    { es: "Claro, con gusto. ¿En qué parte exactamente tienes dudas?", zh: "当然，很乐意。你具体哪部分有疑问？" },
                    { es: "No entiendo cómo se resuelve la segunda parte de la ecuación.", zh: "我不懂方程的第二部分怎么解。" },
                    { es: "Mira, primero debes aplicar esta fórmula y luego despejar la variable x.", zh: "看，首先你要应用这个公式，然后解出变量x。" },
                    { es: "¿Así? ¿Primero multiplico ambos lados por dos?", zh: "这样吗？我先把两边乘以二？" },
                    { es: "Exacto. Luego restas el número que está sumando y divides por el coeficiente.", zh: "没错。然后减去加着的那个数，再除以系数。" },
                    { es: "¡Ah, ya veo! Es más fácil de lo que parecía.", zh: "啊，我明白了！比看起来简单多了。" },
                    { es: "Exacto. La clave es seguir los pasos metódicamente sin saltarse ninguno.", zh: "没错。关键是按部就班，不要跳过任何步骤。" },
                    { es: "Muchas gracias, profesor. Ahora lo entiendo mucho mejor.", zh: "非常感谢，老师。现在理解好多了。" },
                    { es: "De nada. Si tienes más dudas, ven en horario de tutorías esta tarde.", zh: "不客气。如果还有疑问，今天下午辅导时间来找我。" },
                    { es: "¿A qué hora son las tutorías?", zh: "辅导时间是几点？" },
                    { es: "De cuatro a seis de la tarde. No hace falta cita previa.", zh: "下午四点到六点。不需要预约。" }
                ]
            },
            {
                speakers: ["Padre", "Profesor"],
                lines: [
                    { es: "Buenas tardes, profesor. ¿Podemos hablar un momento sobre mi hijo?", zh: "下午好，老师。我们能谈谈我儿子吗？" },
                    { es: "Por supuesto, pase. ¿Cómo va su hijo en clase últimamente?", zh: "当然，请进。您儿子最近在班上怎么样？" },
                    { es: "Eso es precisamente lo que quería preguntarle. ¿Cómo va en las asignaturas?", zh: "这正是我想问的。他各科怎么样？" },
                    { es: "Su hijo tiene mucha capacidad, pero le falta un poco más de esfuerzo y constancia.", zh: "您儿子很有能力，但缺少更多努力和坚持。" },
                    { es: "¿Está entregando los deberes a tiempo? En casa dice que sí.", zh: "他按时交作业吗？在家他说是的。" },
                    { es: "A veces los entrega tarde o incompletos. Debe organizarse mejor con el tiempo.", zh: "有时会晚交或不完整。他需要更好地安排时间。" },
                    { es: "Hablaré con él en casa. ¿Qué asignaturas le cuestan más trabajo?", zh: "我会在家和他谈谈。哪些科目对他来说比较难？" },
                    { es: "Principalmente matemáticas y física. Podría apuntarse a clases de refuerzo extracurriculares.", zh: "主要是数学和物理。他可以报名参加课外补习班。" },
                    { es: "¿El colegio ofrece esas clases de refuerzo?", zh: "学校提供这些补习班吗？" },
                    { es: "Sí, los martes y jueves por la tarde. Son gratuitas para los alumnos.", zh: "是的，周二和周四下午。对学生免费。" },
                    { es: "Perfecto. Lo apuntaré entonces. Muchas gracias por su tiempo.", zh: "完美。那我给他报名。非常感谢您的时间。" },
                    { es: "De nada. Estoy seguro de que con un poco más de esfuerzo mejorará mucho.", zh: "不客气。我相信再多一点努力他会进步很多。" }
                ]
            },
            {
                speakers: ["Estudiante A", "Estudiante B"],
                lines: [
                    { es: "¿Has estudiado ya para el examen de historia de mañana?", zh: "你准备明天的历史考试了吗？" },
                    { es: "Estoy muy nervioso, la verdad. No sé si voy a aprobar este examen.", zh: "说实话我很紧张。不知道这次考试能不能及格。" },
                    { es: "Tranquilo, si has hecho los ejercicios que mandó el profesor, seguro que sale bien.", zh: "放心，如果你做了老师布置的练习，肯定能考好。" },
                    { es: "Espero que tengas razón. ¿Quieres repasar juntos esta tarde?", zh: "希望你是对的。你今天下午想一起复习吗？" },
                    { es: "Vale, me parece buena idea. ¿Quedamos en la biblioteca a las cinco?", zh: "好，我觉得是好主意。我们五点在图书馆见？" },
                    { es: "Perfecto. Llevo mis apuntes y tú los ejercicios resueltos.", zh: "完美。我带笔记你带练习题答案。" },
                    { es: "Trato hecho. ¿Crees que el profesor nos preguntará sobre el Siglo de Oro?", zh: "成交。你觉得老师会考我们黄金时代吗？" },
                    { es: "Seguro, es el tema más importante del trimestre. Hay que estudiarlo bien.", zh: "肯定，这是本学期最重要的话题。要好好学。" },
                    { es: "Tienes razón. También deberíamos repasar las fechas de las batallas importantes.", zh: "你说得对。我们还应该复习重要战役的日期。" },
                    { es: "Sí, y los nombres de los reyes de esa época. El profesor siempre pregunta eso.", zh: "是的，还有那个时期的国王名字。老师总是问这个。" },
                    { es: "Genial. Nos vemos a las cinco entonces. ¡Gracias por tu ayuda!", zh: "太好了。那我们五点见。谢谢你的帮助！" },
                    { es: "De nada. ¡Suerte con el examen! Seguro que lo aprobamos los dos.", zh: "不客气。考试好运！肯定我们俩都能及格。" }
                ]
            }
        ]
    },
    hotel: {
        name: "酒店住宿",
        templates: [
            {
                speakers: ["Recepcionista", "Huésped"],
                lines: [
                    { es: "¡Bienvenido al Hotel Plaza! ¿En qué puedo ayudarle?", zh: "欢迎来到广场酒店！有什么可以帮您的？" },
                    { es: "Buenas tardes. Tengo una reserva a nombre de López. Dos noches.", zh: "下午好。我有预订，姓洛佩斯。两晚。" },
                    { es: "Un momento, por favor. Déjeme consultar en el sistema. Sí, aquí está su reserva.", zh: "请稍等。让我在系统中查一下。是的，您的预订在这儿。" },
                    { es: "Perfecto. ¿En qué planta está la habitación?", zh: "完美。房间在几楼？" },
                    { es: "Su habitación es la tres catorce, en el tercer piso con vistas al jardín.", zh: "您的房间是314，在三楼，可以看到花园。" },
                    { es: "Excelente. ¿El desayuno está incluido en el precio de la habitación?", zh: "太好了。房价含早餐吗？" },
                    { es: "Sí, incluye desayuno buffet libre de siete a diez de la mañana en el comedor principal.", zh: "是的，包含早上七点到十点在主餐厅的自助早餐。" },
                    { es: "Genial. ¿Hay wifi gratuito en la habitación? Lo necesito para trabajar.", zh: "太好了。房间里有免费wifi吗？我需要工作。" },
                    { es: "Sí, el wifi es gratuito en todo el hotel. La contraseña está en la tarjeta de la habitación.", zh: "是的，整个酒店都有免费wifi。密码在房卡上。" },
                    { es: "Perfecto. ¿A qué hora es el check-out?", zh: "完美。退房时间是几点？" },
                    { es: "El check-out es a las doce del mediodía. Si necesita más tiempo, avísenos.", zh: "退房时间是中午十二点。如果您需要更多时间，请告诉我们。" },
                    { es: "Muchas gracias. ¿Me puede dar la llave de la habitación?", zh: "非常感谢。您能给我房间钥匙吗？" }
                ]
            },
            {
                speakers: ["Huésped", "Recepcionista"],
                lines: [
                    { es: "Buenas noches. Disculpe las molestias, pero mi habitación no tiene agua caliente.", zh: "晚上好。抱歉打扰，但我的房间没有热水。" },
                    { es: "Lo siento mucho por el inconveniente. ¿Me dice qué número de habitación es?", zh: "非常抱歉给您带来不便。请告诉我房间号？" },
                    { es: "Es la habitación doscientos cinco, en el segundo piso.", zh: "是205房间，在二楼。" },
                    { es: "Voy a enviar al técnico de mantenimiento inmediatamente a revisar el problema.", zh: "我马上派维修技术员去检查问题。" },
                    { es: "Gracias. También necesito unas toallas limpias, si es posible.", zh: "谢谢。如果可能的话，我还需要几条干净的毛巾。" },
                    { es: "Por supuesto. Las subo enseguida junto con el técnico. Disculpe nuevamente.", zh: "当然。我会和技术员一起送上去。再次抱歉。" },
                    { es: "No se preocupe. Ah, y el aire acondicionado tampoco funciona muy bien.", zh: "没关系。啊，空调也不太好用。" },
                    { es: "Anoto también lo del aire acondicionado. Lo revisarán todo ahora mismo.", zh: "我也记下空调的问题。他们马上会检查所有东西。" },
                    { es: "Perfecto. ¿Cuánto tardarán en arreglarlo todo?", zh: "完美。修好所有东西要多久？" },
                    { es: "El técnico debería tardar unos veinte minutos como máximo.", zh: "技术员应该最多二十分钟。" },
                    { es: "Vale, esperaré en la habitación entonces. Gracias por su rapidez.", zh: "好，那我就在房间等。谢谢您的快速响应。" },
                    { es: "De nada. Si necesita cualquier otra cosa, no dude en llamar a recepción.", zh: "不客气。如果您需要其他任何东西，请随时打电话给前台。" }
                ]
            },
            {
                speakers: ["Huésped", "Recepcionista"],
                lines: [
                    { es: "Buenos días. Quisiera hacer el check-out, pero tengo una pregunta antes.", zh: "早上好。我想退房，但之前有个问题。" },
                    { es: "Buenos días. Por supuesto, dígame. ¿En qué puedo ayudarle?", zh: "早上好。当然，请说。有什么可以帮您的？" },
                    { es: "Mi vuelo sale a las cinco de la tarde. ¿Sería posible hacer late check-out?", zh: "我的航班下午五点起飞。可以延迟退房吗？" },
                    { es: "Depende de la disponibilidad del día. ¿Hasta qué hora necesitaría la habitación?", zh: "取决于当天的空房情况。您需要房间到几点？" },
                    { es: "¿Sería posible hasta las dos de la tarde? Así podría descansar un poco más.", zh: "下午两点可以吗？这样我可以多休息一会儿。" },
                    { es: "Déjeme consultar. Sí, sin problema. No hay nueva reserva para esa habitación hoy.", zh: "让我查一下。可以，没问题。那个房间今天没有新预订。" },
                    { es: "¡Excelente! ¿Tiene algún coste adicional?", zh: "太好了！有额外费用吗？" },
                    { es: "Hasta las dos no hay coste. Después de las dos sería media tarifa.", zh: "两点前没有费用。两点后是半价。" },
                    { es: "Perfecto, me viene genial. También quería preguntar si pueden guardar mi equipaje.", zh: "完美，对我很合适。我还想问你们能不能寄存行李。" },
                    { es: "Sí, tenemos consigna gratuita para los huéspedes. Se lo guardamos hasta que vuelva.", zh: "是的，我们有免费行李寄存处。我们帮您保管到您回来。" },
                    { es: "Muchas gracias. El servicio ha sido excelente durante toda mi estancia.", zh: "非常感谢。我住期间服务一直很好。" },
                    { es: "Me alegra mucho oír eso. Esperamos verle de nuevo en su próxima visita.", zh: "很高兴听到这个。希望您下次再来。" }
                ]
            },
            {
                speakers: ["Huésped", "Recepcionista"],
                lines: [
                    { es: "Hola, buenos días. ¿El hotel tiene gimnasio para los huéspedes?", zh: "您好，早上好。酒店有客人用的健身房吗？" },
                    { es: "Sí, por supuesto. Está en la planta menos uno, junto al spa.", zh: "是的，当然。在负一楼，水疗中心旁边。" },
                    { es: "¿Está incluido en el precio de la habitación o hay que pagar aparte?", zh: "包含在房价里还是需要另外付费？" },
                    { es: "No, es completamente gratuito para todos los huéspedes del hotel.", zh: "不，对酒店所有客人完全免费。" },
                    { es: "¡Genial! ¿A qué hora abre y cierra?", zh: "太好了！几点开门关门？" },
                    { es: "Abre las veinticuatro horas, todos los días de la semana. Tiene acceso con su tarjeta de habitación.", zh: "24小时开放，一周七天。用您的房卡可以进入。" },
                    { es: "Perfecto. ¿Y qué me dice de la piscina? ¿También es gratuita?", zh: "完美。那游泳池呢？也免费吗？" },
                    { es: "Sí, la piscina también es gratuita. Está en la azotea con vistas panorámicas.", zh: "是的，游泳池也免费。在屋顶，有全景视野。" },
                    { es: "Suena maravilloso. ¿A qué hora cierra la piscina?", zh: "听起来很棒。游泳池几点关闭？" },
                    { es: "Cierra a las ocho de la tarde en invierno y a las nueve en verano.", zh: "冬天晚上八点关闭，夏天九点。" },
                    { es: "Voy a subir ahora mismo entonces. Muchas gracias por la información.", zh: "那我马上去。非常感谢您的信息。" },
                    { es: "De nada. Disfrute de las instalaciones y de su estancia.", zh: "不客气。享受设施和您的住宿。" }
                ]
            }
        ]
    },
    phone: {
        name: "电话沟通",
        templates: [
            {
                speakers: ["Recepcionista", "Llamante"],
                lines: [
                    { es: "¿Diga? Buenos días, empresa García e Hijos. ¿En qué puedo ayudarle?", zh: "喂？早上好，加西亚父子公司。有什么可以帮您的？" },
                    { es: "Buenos días. ¿Podría hablar con el señor García, por favor?", zh: "早上好。我能和加西亚先生通话吗？" },
                    { es: "De parte de quién, por favor?", zh: "请问您是哪位？" },
                    { es: "Soy Ana Martínez de la empresa Consultores Asociados. Es sobre el proyecto nuevo.", zh: "我是联合咨询公司的安娜·马丁内斯。是关于新项目的。" },
                    { es: "Un momento, por favor. Voy a ver si el señor García está disponible en este momento.", zh: "请稍等。我看看加西亚先生现在是否有空。" },
                    { es: "Gracias, no tengo prisa. Puedo esperar.", zh: "谢谢，我不着急。我可以等。" },
                    { es: "Lo siento, pero el señor García está en una reunión importante ahora mismo.", zh: "抱歉，但加西亚先生现在正在开重要会议。" },
                    { es: "Entiendo. ¿Podría dejarle un mensaje o mejor llamo más tarde?", zh: "明白。我能给他留个口信还是晚点再打比较好？" },
                    { es: "Puedo transferirle a su buzón de voz si lo prefiere, o llamarle dentro de una hora.", zh: "如果您愿意我可以转接到他的语音信箱，或者一小时后再打。" },
                    { es: "Prefiero llamar dentro de una hora. ¿A qué hora termina su reunión aproximadamente?", zh: "我更想一小时后再打。他的会议大概几点结束？" },
                    { es: "La reunión debería terminar sobre las doce. Puede llamar a esa hora sin problema.", zh: "会议应该在十二点左右结束。那时打没问题。" },
                    { es: "Perfecto. Llamaré a las doce entonces. Muchas gracias por su ayuda.", zh: "完美。那我十二点打。非常感谢您的帮助。" }
                ]
            },
            {
                speakers: ["Recepcionista", "Paciente"],
                lines: [
                    { es: "Buenos días, Clínica Dental Sonrisa. ¿En qué puedo ayudarle?", zh: "早上好，微笑牙科诊所。有什么可以帮您的？" },
                    { es: "Buenos días. Llamo para confirmar mi cita médica de mañana.", zh: "早上好。我打电话确认明天的医疗预约。" },
                    { es: "Por supuesto. ¿Me puede decir su nombre completo, por favor?", zh: "当然。您能告诉我您的全名吗？" },
                    { es: "Sí, soy María López García. Tengo cita con el doctor Ruiz.", zh: "是的，我是玛丽亚·洛佩斯·加西亚。我和鲁伊斯医生有约。" },
                    { es: "Un momento, consulto la agenda. Sí, aquí está su cita confirmada a las once de la mañana.", zh: "稍等，我查一下日程。是的，您的预约已确认，上午十一点。" },
                    { es: "Perfecto. ¿Debo llegar antes de la hora?", zh: "完美。我需要提前到吗？" },
                    { es: "Sí, por favor llegue quince minutos antes para hacer el papeleo si es necesario.", zh: "是的，请提前十五分钟到，如果需要的话办手续。" },
                    { es: "Entendido. Si por algún motivo no puedo ir, ¿les aviso con antelación?", zh: "明白。如果因为某种原因我去不了，需要提前通知你们吗？" },
                    { es: "Sí, por favor. Con veinticuatro horas de antelación como mínimo para poder reorganizar.", zh: "是的，请。至少提前二十四小时，以便我们重新安排。" },
                    { es: "Por supuesto, lo haré. ¿Puedo cambiar la cita si surge algún imprevisto?", zh: "当然，我会的。如果有突发情况我可以改预约吗？" },
                    { es: "Sí, puede llamarnos para cambiarla. Tenemos flexibilidad en los horarios.", zh: "可以，您可以打电话改。我们的时间比较灵活。" },
                    { es: "Excelente. Muchas gracias. Nos vemos mañana a las once.", zh: "太好了。非常感谢。明天十一点见。" }
                ]
            },
            {
                speakers: ["Técnico", "Cliente"],
                lines: [
                    { es: "Buenos días, soy Carlos del servicio técnico de Telefónica. ¿Hablo con el señor Martínez?", zh: "早上好，我是电信公司的技术员卡洛斯。是马丁内斯先生吗？" },
                    { es: "Sí, soy yo. Gracias por llamar. Sí, tengo problemas graves con el internet.", zh: "是的，是我。谢谢您的来电。是的，我的网络有严重问题。" },
                    { es: "Me han informado de que se corta constantemente desde ayer. ¿Es correcto?", zh: "我被告知从昨天开始经常断网。对吗？" },
                    { es: "Sí, exacto. Se corta cada diez minutos y es imposible trabajar así desde casa.", zh: "是的，没错。每十分钟断一次，这样在家工作根本不可能。" },
                    { es: "Lo siento mucho por las molestias. Voy a hacer unas pruebas remotas. ¿Está usted en casa ahora?", zh: "非常抱歉给您带来不便。我要做一些远程测试。您现在在家吗？" },
                    { es: "Sí, estoy en casa trabajando. Puede hacer las pruebas cuando quiera.", zh: "是的，我在家工作。您随时可以测试。" },
                    { es: "Perfecto. Voy a reiniciar su router desde aquí. Notará que se corta un momento.", zh: "完美。我从这里重启您的路由器。您会注意到会断一会儿。" },
                    { es: "Vale, lo entiendo. ¿Esto solucionará el problema definitivamente?", zh: "好，明白。这会彻底解决问题吗？" },
                    { es: "Espero que sí. Si el problema persiste, enviaré a un técnico a su domicilio mañana.", zh: "希望如此。如果问题持续，我明天派技术员去您家。" },
                    { es: "Gracias. Espero que con el reinicio se solucione. Es urgente para mi trabajo.", zh: "谢谢。希望重启能解决。这对我的工作很紧急。" },
                    { es: "Entiendo perfectamente. El reinicio debería tardar unos dos minutos. Manténgase al teléfono.", zh: "我完全理解。重启应该需要大约两分钟。请保持电话畅通。" },
                    { es: "Perfecto. Estoy aquí esperando. Muchas gracias por su ayuda.", zh: "完美。我在这儿等着。非常感谢您的帮助。" }
                ]
            },
            {
                speakers: ["Hijo", "Madre"],
                lines: [
                    { es: "Hola mamá, soy yo. Te llamo para decirte que voy a llegar tarde a casa.", zh: "嗨妈，是我。我打电话告诉你我会晚到家。" },
                    { es: "¿Qué pasa, hijo? ¿Estás bien? ¿Te ha pasado algo?", zh: "怎么了，儿子？你还好吗？出什么事了吗？" },
                    { es: "Sí, sí, estoy bien. No te preocupes. Es que el tren va con mucho retraso.", zh: "没事，没事，我很好。别担心。是火车晚点很严重。" },
                    { es: "¿Cuánto tiempo de retraso tiene el tren? ¿Sabes algo?", zh: "火车晚点多久？你知道吗？" },
                    { es: "Unos treinta minutos, me han dicho. Parece que hay problemas en la vía.", zh: "大约三十分钟，他们告诉我。好像是轨道有问题。" },
                    { es: "Vaya, qué mala suerte. ¿Has cenado ya o vas a cenar en casa?", zh: "哎呀，真倒霉。你吃过晚饭了吗还是回家吃？" },
                    { es: "No esperes con la cena por mí. Cenaré algo ligero por el camino.", zh: "不用等我吃晚饭。我会在路上吃点清淡的。" },
                    { es: "¿Estás seguro? Puedo dejarte algo preparado para cuando llegues.", zh: "你确定吗？我可以给你留点吃的，你回来吃。" },
                    { es: "No te preocupes, mamá. Compraré un bocadillo en la estación.", zh: "别担心，妈。我会在车站买个三明治。" },
                    { es: "Vale, como quieras. Llega con cuidado y avísame cuando estés en el tren.", zh: "好，随你。小心点回来，上火车了告诉我。" },
                    { es: "Lo haré. Gracias por preocuparte. Nos vemos en un rato.", zh: "我会的。谢谢你的关心。一会儿见。" },
                    { es: "Hasta luego, hijo. Cuídate mucho.", zh: "再见，儿子。多保重。" }
                ]
            }
        ]
    },
    emergency: {
        name: "紧急情况",
        templates: [
            {
                speakers: ["Operador", "Ciudadano"],
                lines: [
                    { es: "Servicio de emergencias uno uno dos. ¿Qué ocurre? Dígame su emergencia.", zh: "紧急服务112。发生什么事了？告诉我您的紧急情况。" },
                    { es: "¡Ayuda, por favor! ¡Hay un incendio en mi edificio de viviendas!", zh: "请帮帮我！我的住宅楼着火了！" },
                    { es: "Calme, señor. Necesito que me dé su dirección exacta para enviar ayuda.", zh: "冷静，先生。我需要您给我确切地址以便派救援。" },
                    { es: "Estoy en la Calle Mayor, número veinticinco, piso tercero, puerta izquierda.", zh: "我在马约尔街25号，三楼，左边门。" },
                    { es: "¿Hay personas atrapadas dentro del edificio o en su vivienda?", zh: "楼里或您家里有被困的人吗？" },
                    { es: "No lo sé con certeza, creo que todos los vecinos hemos salido, pero no estoy seguro.", zh: "我不确定，我想所有邻居都出来了，但不确定。" },
                    { es: "Ya enviamos a los bomberos y ambulancias a su ubicación. Manténgase alejado del edificio.", zh: "我们已派消防员和救护车去您的位置。请远离大楼。" },
                    { es: "Sí, estoy en la calle. El humo es muy denso y negro. ¿Tardan mucho?", zh: "是的，我在街上。烟很浓很黑。他们要很久吗？" },
                    { es: "Llegarán en unos cinco minutos. No intente entrar de nuevo por ningún motivo.", zh: "大约五分钟后到。无论如何不要试图再进去。" },
                    { es: "Entendido. Hay una anciana en el segundo piso que vive sola. ¿Pueden comprobar?", zh: "明白。二楼有一位独居老人。他们能检查一下吗？" },
                    { es: "Anoto la información. Los bomberos revisarán todas las viviendas al llegar.", zh: "我记下信息。消防员到达后会检查所有住宅。" },
                    { es: "Gracias. Estoy muy asustado. Espero que todo salga bien.", zh: "谢谢。我很害怕。希望一切顺利。" }
                ]
            },
            {
                speakers: ["Operador", "Ciudadano"],
                lines: [
                    { es: "Policía municipal, dígame. ¿Cuál es su emergencia?", zh: "市警察局，请讲。您的紧急情况是什么？" },
                    { es: "Quiero denunciar un robo en mi casa. He llegado hace unos minutos y la puerta está forzada.", zh: "我要报案家里被盗了。我几分钟前到家，门被撬了。" },
                    { es: "¿Está seguro de que no hay nadie dentro de la vivienda en este momento?", zh: "您确定现在屋里没人吗？" },
                    { es: "No me he atrevido a entrar. He visto la puerta abierta y he llamado inmediatamente.", zh: "我不敢进去。我看到门开着就立即打电话了。" },
                    { es: "Muy bien, no entre bajo ningún concepto. Enviamos una patrulla inmediatamente.", zh: "很好，无论如何不要进去。我们马上派巡逻车去。" },
                    { es: "Gracias. Estoy muy nervioso. ¿Tardan mucho en llegar?", zh: "谢谢。我很紧张。他们要很久到吗？" },
                    { es: "Deberían estar allí en unos diez minutos. ¿Puede ver la vivienda desde donde está?", zh: "他们应该大约十分钟后到。您从那儿能看到住宅吗？" },
                    { es: "Sí, estoy justo enfrente en la calle. No veo movimiento dentro.", zh: "能，我就在街对面。没看到里面有动静。" },
                    { es: "Perfecto. Mantenga la calma y espere a la patrulla. No toque nada en la puerta.", zh: "完美。保持冷静等巡逻车。不要碰门上的任何东西。" },
                    { es: "Entendido. ¿Debería llamar también a mi compañía de seguros?", zh: "明白。我还应该打给我的保险公司吗？" },
                    { es: "Sí, puede hacerlo, pero primero espere a que la policía tome el informe del robo.", zh: "可以，但先等警察做好盗窃报告。" },
                    { es: "Vale, haré eso. Gracias por su ayuda.", zh: "好，我会的。谢谢您的帮助。" }
                ]
            },
            {
                speakers: ["Operador", "Ciudadano"],
                lines: [
                    { es: "Servicio de ambulancias de emergencias. ¿Qué necesita? Dígame la situación.", zh: "紧急救护车服务。您需要什么？告诉我情况。" },
                    { es: "Por favor, necesito una ambulancia urgente. Mi abuelo se ha desmayado y no responde.", zh: "请，我需要紧急救护车。我爷爷晕倒了，没有反应。" },
                    { es: "Voy a ayudarle. Primero, ¿está seguro de que su abuelo está respirando?", zh: "我来帮您。首先，您确定您爷爷在呼吸吗？" },
                    { es: "Sí, respira, pero está muy pálido y no reacciona cuando le hablo.", zh: "是的，在呼吸，但他脸色很苍白，和他说话没反应。" },
                    { es: "¿Siente pulso? Ponga dos dedos en su cuello o muñeca.", zh: "有脉搏吗？把两根手指放在他脖子或手腕上。" },
                    { es: "Sí, tiene pulso, pero es muy débil y lento. Me estoy muy preocupado.", zh: "有，有脉搏，但很弱很慢。我很担心。" },
                    { es: "No lo mueva de la posición en la que está. La ambulancia llegará en unos diez minutos.", zh: "不要移动他现在的位置。救护车大约十分钟后到。" },
                    { es: "¿Debería ponerle algo debajo de la cabeza o taparle con una manta?", zh: "我应该在他头下垫点东西或用毯子盖吗？" },
                    { es: "Sí, puede ponerle una almohada suave bajo la cabeza y una manta ligera si tiene frío.", zh: "可以，可以在头下放一个软枕头，如果冷的话可以盖条薄毯。" },
                    { es: "Vale, lo hago ahora mismo. ¿Debo darle agua o algo?", zh: "好，我现在就做。我应该给他水什么的吗？" },
                    { es: "No, no le dé nada de comer ni beber hasta que lleguen los médicos. Manténgase tranquilo.", zh: "不，在医生到之前不要给他任何吃的喝的。保持冷静。" },
                    { es: "Entendido. Gracias por su ayuda. Espero que lleguen pronto.", zh: "明白。谢谢您的帮助。希望他们快点到。" }
                ]
            },
            {
                speakers: ["Operador", "Ciudadano"],
                lines: [
                    { es: "Servicio de emergencias. ¿Es una emergencia médica, de policía o bomberos?", zh: "紧急服务。是医疗、警察还是消防紧急情况？" },
                    { es: "¡He tenido un accidente de coche en la carretera! Necesito ayuda urgente.", zh: "我在公路上出车祸了！需要紧急救援。" },
                    { es: "¿Hay personas heridas? Necesito saber el estado de los ocupantes.", zh: "有人受伤吗？我需要知道乘客状况。" },
                    { es: "Sí, la otra conductora está sangrando de la cabeza y se queja de dolor en el pecho.", zh: "有，另一位女司机头在流血，还说胸口疼。" },
                    { es: "¿Dónde está ubicado exactamente? Necesito la carretera y el punto kilométrico.", zh: "您确切在哪里？我需要公路和公里数。" },
                    { es: "Estoy en la carretera nacional cinco, a la altura del kilómetro cincuenta, sentido Madrid.", zh: "我在5号国道，50公里处，往马德里方向。" },
                    { es: "¿Ha puesto el triángulo de emergencia y está fuera del coche?", zh: "您放紧急三角牌了吗？在车外吗？" },
                    { es: "Sí, he puesto los triángulos a cincuenta metros y estoy fuera del coche, en la cuneta.", zh: "放了，我在五十米处放了三角牌，在车外，在路肩上。" },
                    { es: "Muy bien hecho. Enviamos ambulancia, policía y grúa a su ubicación inmediatamente.", zh: "做得很好。我们立即派救护车、警车和拖车去您的位置。" },
                    { es: "Gracias. La otra conductora está consciente pero muy asustada.", zh: "谢谢。另一位女司机有意识但很害怕。" },
                    { es: "Intente mantenerla tranquila y no la mueva si tiene dolor. La ambulancia llegará pronto.", zh: "尽量让她保持冷静，如果疼的话不要移动她。救护车马上到。" },
                    { es: "Lo haré. Gracias por su ayuda.", zh: "我会的。谢谢您的帮助。" }
                ]
            }
        ]
    }
};
