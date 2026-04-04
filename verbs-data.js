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

// 对话场景数据
const dialogueScenarios = {
    daily: {
        name: "日常生活",
        dialogues: [
            [
                { speaker: "A", es: "¡Buenos días! ¿Cómo estás?", zh: "早上好！你好吗？" },
                { speaker: "B", es: "Muy bien, gracias. ¿Y tú?", zh: "很好，谢谢。你呢？" },
                { speaker: "A", es: "Estoy cansado, anoche dormí poco.", zh: "我很累，昨晚睡得很少。" },
                { speaker: "B", es: "Lo siento. ¿Quieres un café?", zh: "抱歉。你想来杯咖啡吗？" }
            ],
            [
                { speaker: "A", es: "¿Qué planes tienes para el fin de semana?", zh: "你周末有什么计划？" },
                { speaker: "B", es: "Pienso ir al cine. ¿Te apetece venir?", zh: "我想去看电影。你想来吗？" },
                { speaker: "A", es: "¡Me encantaría! ¿Qué película quieres ver?", zh: "我很乐意！你想看什么电影？" },
                { speaker: "B", es: "Hay una comedia nueva que dicen que es muy buena.", zh: "有一部新喜剧，听说很不错。" }
            ],
            [
                { speaker: "A", es: "¿Has visto mis llaves? No las encuentro.", zh: "你看到我的钥匙了吗？我找不到。" },
                { speaker: "B", es: "¿Las dejaste en la mesa de la cocina?", zh: "你放在厨房桌子上了吗？" },
                { speaker: "A", es: "Ah, ¡sí! Allí están. Gracias.", zh: "啊，是的！在那儿。谢谢。" },
                { speaker: "B", es: "De nada. Siempre las olvidas en el mismo sitio.", zh: "不客气。你总是忘在同一个地方。" }
            ],
            [
                { speaker: "María", es: "¡Hola Carlos! Hace tiempo que no te veo.", zh: "嗨卡洛斯！好久不见了。" },
                { speaker: "Carlos", es: "¡María! Qué alegría verte. ¿Cómo te va la vida?", zh: "玛丽亚！见到你真高兴。最近怎么样？" },
                { speaker: "María", es: "Bastante bien. Acabo de cambiar de trabajo.", zh: "挺好的。我刚换了工作。" },
                { speaker: "Carlos", es: "¡Enhorabuena! Cuéntame, ¿en qué sector trabajas ahora?", zh: "恭喜！告诉我，你现在在什么行业工作？" },
                { speaker: "María", es: "En tecnología. Es un ambiente muy dinámico.", zh: "在科技行业。环境很有活力。" },
                { speaker: "Carlos", es: "Me alegro mucho por ti. Tenemos que celebrarlo.", zh: "真为你高兴。我们得庆祝一下。" }
            ],
            [
                { speaker: "Padre", es: "Hijo, ¿ya has hecho los deberes?", zh: "儿子，你做完作业了吗？" },
                { speaker: "Hijo", es: "Casi, solo me falta un ejercicio de matemáticas.", zh: "差不多了，只剩一道数学题。" },
                { speaker: "Padre", es: "¿Necesitas ayuda?", zh: "需要帮助吗？" },
                { speaker: "Hijo", es: "Sí, no entiendo este problema de ecuaciones.", zh: "是的，我不懂这道方程题。" },
                { speaker: "Padre", es: "Vale, déjame ver. Primero debes despejar la x.", zh: "好的，让我看看。首先你要解出x。" },
                { speaker: "Hijo", es: "Ah, ya veo. Es más fácil de lo que parecía.", zh: "啊，我明白了。比看起来简单多了。" }
            ],
            [
                { speaker: "Vecino A", es: "Perdone, ¿podría bajar un poco la música?", zh: "不好意思，能把音乐关小一点吗？" },
                { speaker: "Vecino B", es: "Oh, lo siento mucho. No me había dado cuenta.", zh: "哦，非常抱歉。我没意识到。" },
                { speaker: "Vecino A", es: "No se preocupe. Es que tengo que levantarme temprano mañana.", zh: "没关系。只是我明天要早起。" },
                { speaker: "Vecino B", es: "Por supuesto, la bajo enseguida. Disculpe las molestias.", zh: "当然，我马上关小。抱歉打扰到您。" },
                { speaker: "Vecino A", es: "Gracias por su comprensión. Buenas noches.", zh: "谢谢您的理解。晚安。" }
            ],
            [
                { speaker: "Amigo A", es: "¿Te apetece salir a cenar esta noche?", zh: "今晚想出去吃晚饭吗？" },
                { speaker: "Amigo B", es: "Me encantaría, pero tengo una cita con el dentista.", zh: "我很想去，但我约了牙医。" },
                { speaker: "Amigo A", es: "¡Qué pena! ¿Qué tal mañana entonces?", zh: "真遗憾！那明天怎么样？" },
                { speaker: "Amigo B", es: "Mañana sí puedo. ¿Conoces algún sitio nuevo?", zh: "明天可以。你知道什么新地方吗？" },
                { speaker: "Amigo A", es: "Sí, han abierto un italiano en la plaza que dicen que está muy bien.", zh: "知道，广场上新开了一家意大利餐厅，听说很不错。" },
                { speaker: "Amigo B", es: "Perfecto, quedamos allí a las nueve.", zh: "完美，我们九点在那儿见。" }
            ],
            [
                { speaker: "Ana", es: "¿Cómo fue tu viaje a Barcelona?", zh: "你的巴塞罗那之旅怎么样？" },
                { speaker: "Luis", es: "¡Increíble! La Sagrada Familia es impresionante.", zh: "太棒了！圣家堂令人印象深刻。" },
                { speaker: "Ana", es: "¿Visitaste también el Parque Güell?", zh: "你也去了桂尔公园吗？" },
                { speaker: "Luis", es: "Sí, aunque había mucha gente. Es mejor ir temprano.", zh: "去了，虽然人很多。最好早点去。" },
                { speaker: "Ana", es: "¿Y la comida?", zh: "食物呢？" },
                { speaker: "Luis", es: "Deliciosa. Probé la paella y las tapas. Todo estaba buenísimo.", zh: "很美味。我尝了海鲜饭和塔帕斯。都很好吃。" }
            ],
            [
                { speaker: "Pepa", es: "¿Has visto el tiempo que hace? Parece que va a llover.", zh: "你看到天气了吗？好像要下雨了。" },
                { speaker: "Juan", es: "Sí, el cielo está muy gris. Deberías llevar paraguas.", zh: "是的，天空很灰。你应该带伞。" },
                { speaker: "Pepa", es: "No tengo ninguno. ¿Me prestas el tuyo?", zh: "我没有伞。能借你的吗？" },
                { speaker: "Juan", es: "Lo siento, pero yo también lo necesito. Hay una tienda en la esquina.", zh: "抱歉，但我也需要。拐角处有一家商店。" },
                { speaker: "Pepa", es: "Tienes razón, iré a comprar uno. Gracias de todos modos.", zh: "你说得对，我去买一把。还是谢谢你。" }
            ]
        ]
    },
    restaurant: {
        name: "餐厅点餐",
        dialogues: [
            [
                { speaker: "Camarero", es: "Buenas tardes. ¿Tienen reserva?", zh: "下午好。你们有预约吗？" },
                { speaker: "Cliente", es: "No, ¿hay mesa para dos?", zh: "没有，有两人桌吗？" },
                { speaker: "Camarero", es: "Sí, por supuesto. Síganme, por favor.", zh: "有的，当然。请跟我来。" },
                { speaker: "Camarero", es: "Aquí tienen la carta. ¿Quieren algo de beber?", zh: "这是菜单。你们想喝点什么？" },
                { speaker: "Cliente", es: "Una botella de agua, por favor.", zh: "请给我一瓶水。" }
            ],
            [
                { speaker: "Camarero", es: "¿Ya saben qué van a pedir?", zh: "你们已经知道要点什么了吗？" },
                { speaker: "Cliente", es: "Sí, de primero quiero la ensalada mixta.", zh: "是的，第一道菜我要混合沙拉。" },
                { speaker: "Camarero", es: "¿Y de segundo?", zh: "第二道菜呢？" },
                { speaker: "Cliente", es: "El pollo asado con patatas, por favor.", zh: "请给我烤鸡配土豆。" },
                { speaker: "Camarero", es: "Muy bien. ¿Algo más?", zh: "好的。还要别的吗？" }
            ],
            [
                { speaker: "Cliente", es: "Perdone, la cuenta, por favor.", zh: "打扰一下，请结账。" },
                { speaker: "Camarero", es: "Enseguida. ¿Todo estuvo bien?", zh: "马上。一切都还好吗？" },
                { speaker: "Cliente", es: "Sí, todo delicioso. Muchas gracias.", zh: "是的，都很美味。非常感谢。" },
                { speaker: "Camarero", es: "Ha sido un placer. Vuelvan pronto.", zh: "很荣幸。欢迎下次光临。" }
            ],
            [
                { speaker: "Cliente", es: "Disculpe, esta carne no está bien hecha. La pedí bien hecha.", zh: "打扰一下，这肉没熟透。我要的是全熟的。" },
                { speaker: "Camarero", es: "Lo siento mucho. Se la llevo a la cocina enseguida.", zh: "非常抱歉。我马上拿去厨房。" },
                { speaker: "Cliente", es: "Gracias. También hace falta más pan en la mesa.", zh: "谢谢。桌上还需要更多面包。" },
                { speaker: "Camarero", es: "Por supuesto. Le traigo más pan y la carne bien hecha en un momento.", zh: "当然。我马上给您拿更多面包和全熟的肉。" },
                { speaker: "Cliente", es: "Perfecto, gracias por su atención.", zh: "完美，谢谢您的服务。" }
            ],
            [
                { speaker: "Camarero", es: "¿Les gustaría ver la carta de vinos?", zh: "你们想看酒单吗？" },
                { speaker: "Cliente", es: "Sí, por favor. ¿Qué nos recomienda?", zh: "是的，请。您推荐什么？" },
                { speaker: "Camarero", es: "Este Rioja es excelente y combina bien con la carne.", zh: "这款里奥哈很棒，和肉很配。" },
                { speaker: "Cliente", es: "Suena bien. Traiga una botella.", zh: "听起来不错。来一瓶吧。" },
                { speaker: "Camarero", es: "Muy bien. ¿La abro ahora o prefieren esperar?", zh: "好的。我现在打开还是等一会儿？" },
                { speaker: "Cliente", es: "Ahora está bien, gracias.", zh: "现在开吧，谢谢。" }
            ],
            [
                { speaker: "Cliente", es: "¿Tienen opciones vegetarianas?", zh: "你们有素食选项吗？" },
                { speaker: "Camarero", es: "Sí, tenemos risotto de verduras y pasta con salsa de tomate casera.", zh: "有，我们有蔬菜烩饭和自制番茄酱意面。" },
                { speaker: "Cliente", es: "¿El risotto lleva queso? Soy intolerante a la lactosa.", zh: "烩饭里有奶酪吗？我乳糖不耐受。" },
                { speaker: "Camarero", es: "Normalmente sí, pero podemos prepararlo sin queso.", zh: "通常有，但我们可以不加奶酪做。" },
                { speaker: "Cliente", es: "Perfecto, entonces tomo el risotto. Y de beber, un zumo de naranja natural.", zh: "完美，那我要烩饭。喝的我要鲜榨橙汁。" }
            ],
            [
                { speaker: "Camarero", es: "¿Han decidido ya?", zh: "你们决定好了吗？" },
                { speaker: "Cliente A", es: "Yo quiero la sopa del día para empezar.", zh: "我要例汤做前菜。" },
                { speaker: "Camarero", es: "Hoy tenemos sopa de marisco. ¿Le parece bien?", zh: "今天有海鲜汤。可以吗？" },
                { speaker: "Cliente A", es: "Sí, perfecto. Y de segundo, el pescado a la plancha.", zh: "可以，完美。第二道菜我要烤鱼片。" },
                { speaker: "Cliente B", es: "Yo tomaré directamente el segundo. La paella para dos personas.", zh: "我直接要第二道菜。两人份海鲜饭。" },
                { speaker: "Camarero", es: "Excelente elección. La paella tarda unos veinte minutos. ¿Les importa esperar?", zh: "很好的选择。海鲜饭需要大约二十分钟。介意等吗？" },
                { speaker: "Cliente B", es: "No hay problema. Tenemos tiempo.", zh: "没问题。我们有时间。" }
            ],
            [
                { speaker: "Cliente", es: "La comida estaba excelente. ¿Tienen postres caseros?", zh: "食物很棒。你们有自制甜点吗？" },
                { speaker: "Camarero", es: "Sí, el tiramisú y la tarta de queso son caseros.", zh: "有，提拉米苏和芝士蛋糕是自制的。" },
                { speaker: "Cliente", es: "Me llevo el tiramisú. Y un café solo, por favor.", zh: "我要提拉米苏。还有一杯浓缩咖啡，谢谢。" },
                { speaker: "Camarero", es: "¿Lo quiere con o sin azúcar?", zh: "您要加糖还是不加糖？" },
                { speaker: "Cliente", es: "Sin azúcar, gracias. Y la cuenta cuando pueda.", zh: "不加糖，谢谢。还有请结账。" }
            ]
        ]
    },
    travel: {
        name: "旅行问路",
        dialogues: [
            [
                { speaker: "Turista", es: "Disculpe, ¿dónde está la estación de tren?", zh: "打扰一下，火车站在哪里？" },
                { speaker: "Local", es: "Está a unos diez minutos caminando.", zh: "走路大约十分钟。" },
                { speaker: "Turista", es: "¿Puede indicarme cómo llegar?", zh: "您能告诉我怎么走吗？" },
                { speaker: "Local", es: "Siga todo recto y gire a la izquierda en el semáforo.", zh: "一直往前走，在红绿灯处左转。" }
            ],
            [
                { speaker: "Turista", es: "¿Hay un supermercado cerca de aquí?", zh: "这附近有超市吗？" },
                { speaker: "Local", es: "Sí, hay uno en la esquina de la siguiente calle.", zh: "有，在下一条街拐角处有一家。" },
                { speaker: "Turista", es: "¿Está abierto ahora?", zh: "现在开门吗？" },
                { speaker: "Local", es: "Sí, cierran a las diez de la noche.", zh: "开的，他们晚上十点关门。" }
            ],
            [
                { speaker: "Recepcionista", es: "¿En qué puedo ayudarle?", zh: "有什么可以帮您的？" },
                { speaker: "Huésped", es: "Me gustaría información sobre las excursiones.", zh: "我想了解一下短途旅行的信息。" },
                { speaker: "Recepcionista", es: "Tenemos varias opciones. ¿Prefiere la montaña o la playa?", zh: "我们有几个选择。您喜欢山区还是海滩？" },
                { speaker: "Huésped", es: "La montaña, por favor. Me encanta hacer senderismo.", zh: "山区，谢谢。我喜欢徒步旅行。" }
            ],
            [
                { speaker: "Turista", es: "Perdone, ¿cómo puedo llegar al museo del Prado?", zh: "打扰一下，我怎么去普拉多博物馆？" },
                { speaker: "Local", es: "Puede ir en metro. La parada más cercana es Banco de España.", zh: "您可以坐地铁。最近的站是西班牙银行。" },
                { speaker: "Turista", es: "¿Y desde aquí dónde está la parada de metro?", zh: "那从这里地铁站在哪里？" },
                { speaker: "Local", es: "Siga recto dos calles y verá la entrada a su derecha.", zh: "直走两条街，您会看到入口在右边。" },
                { speaker: "Turista", es: "Muchas gracias. ¿Sabe cuánto cuesta la entrada al museo?", zh: "非常感谢。您知道博物馆门票多少钱吗？" },
                { speaker: "Local", es: "Cuesta quince euros, pero es gratis por la tarde.", zh: "十五欧元，但下午免费。" }
            ],
            [
                { speaker: "Agente", es: "¿En qué puedo ayudarle?", zh: "有什么可以帮您的？" },
                { speaker: "Viajero", es: "Quiero comprar un billete de ida y vuelta a Sevilla.", zh: "我想买一张往返塞维利亚的票。" },
                { speaker: "Agente", es: "¿Para qué fecha?", zh: "什么日期？" },
                { speaker: "Viajero", es: "El próximo viernes por la mañana, y vuelvo el domingo por la tarde.", zh: "下周五上午去，周日下午回。" },
                { speaker: "Agente", es: "Tenemos un tren a las nueve de la mañana. ¿Le vale?", zh: "我们有一班上午九点的火车。可以吗？" },
                { speaker: "Viajero", es: "Perfecto. ¿Cuánto cuesta?", zh: "完美。多少钱？" },
                { speaker: "Agente", es: "Ochenta euros en total. ¿Ventana o pasillo?", zh: "总共八十欧元。靠窗还是靠过道？" }
            ],
            [
                { speaker: "Taxista", es: "¿Adónde quiere ir?", zh: "您想去哪里？" },
                { speaker: "Pasajero", es: "Al aeropuerto, por favor. Terminal dos.", zh: "请去机场。二号航站楼。" },
                { speaker: "Taxista", es: "Muy bien. ¿Tiene prisa?", zh: "好的。您赶时间吗？" },
                { speaker: "Pasajero", es: "Sí, mi vuelo sale en dos horas.", zh: "是的，我的航班两小时后起飞。" },
                { speaker: "Taxista", es: "No se preocupe, llegaremos con tiempo. Son unos treinta minutos.", zh: "别担心，我们会准时到达。大约三十分钟。" },
                { speaker: "Pasajero", es: "Perfecto. ¿Aceptan tarjeta de crédito?", zh: "完美。你们收信用卡吗？" },
                { speaker: "Taxista", es: "Sí, claro. También puede pagar en efectivo si prefiere.", zh: "是的，当然。如果您愿意也可以付现金。" }
            ],
            [
                { speaker: "Turista", es: "Disculpe, ¿dónde puedo cambiar dinero?", zh: "打扰一下，我在哪里可以换钱？" },
                { speaker: "Local", es: "Hay una casa de cambio en la plaza principal.", zh: "主广场有一家兑换处。" },
                { speaker: "Turista", es: "¿Sabe si tienen buen tipo de cambio?", zh: "您知道汇率好吗？" },
                { speaker: "Local", es: "Más o menos. También puede sacar dinero del cajero automático.", zh: "还行。您也可以从自动取款机取钱。" },
                { speaker: "Turista", es: "Es buena idea. ¿Hay algún cajero cerca?", zh: "好主意。附近有取款机吗？" },
                { speaker: "Local", es: "Sí, en el banco de la esquina hay uno.", zh: "有，拐角处的银行有一台。" }
            ],
            [
                { speaker: "Guía", es: "Bienvenidos a la Alhambra. La visita dura aproximadamente tres horas.", zh: "欢迎来到阿尔罕布拉宫。参观大约需要三小时。" },
                { speaker: "Turista", es: "¿Podemos entrar a los Palacios Nazaríes?", zh: "我们可以进入纳塞瑞斯宫殿吗？" },
                { speaker: "Guía", es: "Sí, pero necesitan reserva con antelación. ¿Tienen los tickets?", zh: "可以，但需要提前预订。你们有票吗？" },
                { speaker: "Turista", es: "Sí, los compré online. Aquí están.", zh: "有，我在网上买的。在这儿。" },
                { speaker: "Guía", es: "Perfecto. Síganme, por favor. Empezaremos por el Generalife.", zh: "完美。请跟我来。我们从赫内拉利费宫开始。" },
                { speaker: "Turista", es: "¿Podemos hacer fotos dentro?", zh: "我们可以在里面拍照吗？" },
                { speaker: "Guía", es: "Sí, sin flash. Y no toquen las paredes, por favor.", zh: "可以，不要开闪光灯。还有请不要碰墙壁。" }
            ],
            [
                { speaker: "Recepcionista", es: "Buenos días. ¿Tiene reserva?", zh: "早上好。您有预订吗？" },
                { speaker: "Huésped", es: "Sí, a nombre de García. Dos noches.", zh: "有，姓加西亚。两晚。" },
                { speaker: "Recepcionista", es: "Un momento, por favor. Sí, aquí está. Habitación tres cero cinco.", zh: "请稍等。是的，在这儿。305房间。" },
                { speaker: "Huésped", es: "¿El desayuno está incluido?", zh: "含早餐吗？" },
                { speaker: "Recepcionista", es: "Sí, de siete a diez en el comedor del primer piso.", zh: "含，七点到十点在一楼餐厅。" },
                { speaker: "Huésped", es: "¿Hay wifi gratis?", zh: "有免费wifi吗？" },
                { speaker: "Recepcionista", es: "Sí, la contraseña está en la tarjeta de la habitación.", zh: "有，密码在房卡上。" }
            ]
        ]
    },
    work: {
        name: "工作场景",
        dialogues: [
            [
                { speaker: "Jefe", es: "¿Podemos hablar un momento?", zh: "我们能谈一下吗？" },
                { speaker: "Empleado", es: "Claro, ¿pasa algo?", zh: "当然，有什么事吗？" },
                { speaker: "Jefe", es: "El proyecto va con retraso. ¿Qué ha pasado?", zh: "项目延期了。发生了什么？" },
                { speaker: "Empleado", es: "Hubo problemas técnicos, pero ya están solucionados.", zh: "出现了技术问题，但已经解决了。" }
            ],
            [
                { speaker: "A", es: "¿Has terminado el informe?", zh: "你完成报告了吗？" },
                { speaker: "B", es: "Casi, me falta revisar los últimos datos.", zh: "差不多，还需要检查最后的数据。" },
                { speaker: "A", es: "Necesito que lo tengas listo para mañana.", zh: "我需要你明天之前准备好。" },
                { speaker: "B", es: "No se preocupe, lo tendré hecho esta tarde.", zh: "别担心，我今天下午就能完成。" }
            ],
            [
                { speaker: "Cliente", es: "Quisiera solicitar una reunión para la próxima semana.", zh: "我想申请下周开个会。" },
                { speaker: "Secretaria", es: "Por supuesto. ¿Qué día le viene mejor?", zh: "当然。您哪天方便？" },
                { speaker: "Cliente", es: "El martes o el miércoles por la mañana.", zh: "周二或周三上午。" },
                { speaker: "Secretaria", es: "Voy a consultar la agenda y le llamo.", zh: "我查一下日程然后给您打电话。" }
            ],
            [
                { speaker: "Gerente", es: "Necesito que prepares una presentación para el cliente.", zh: "我需要你为客户准备一份演示文稿。" },
                { speaker: "Empleado", es: "¿Sobre qué tema en concreto?", zh: "具体什么主题？" },
                { speaker: "Gerente", es: "Sobre los resultados del último trimestre y las proyecciones.", zh: "关于上一季度的业绩和预测。" },
                { speaker: "Empleado", es: "¿Cuándo la necesita?", zh: "您什么时候需要？" },
                { speaker: "Gerente", es: "Para el viernes a primera hora. ¿Te da tiempo?", zh: "周五一大早。时间够吗？" },
                { speaker: "Empleado", es: "Sí, sin problema. ¿Cuántas diapositivas quiere aproximadamente?", zh: "够，没问题。您大概需要多少张幻灯片？" },
                { speaker: "Gerente", es: "Unas quince o veinte. Y incluye gráficos, por favor.", zh: "大约十五到二十张。请包含图表。" }
            ],
            [
                { speaker: "Compañero A", es: "¿Has oído que hay cambios en la organización?", zh: "你听说组织架构有变动吗？" },
                { speaker: "Compañero B", es: "Sí, me han dicho que fusionan dos departamentos.", zh: "听说了，他们说两个部门要合并。" },
                { speaker: "Compañero A", es: "¿Sabes si habrá despidos?", zh: "你知道会裁员吗？" },
                { speaker: "Compañero B", es: "No lo sé, pero la dirección dice que no por ahora.", zh: "不知道，但管理层说暂时不会。" },
                { speaker: "Compañero A", es: "Espero que sea cierto. Estoy un poco preocupado.", zh: "希望是真的。我有点担心。" },
                { speaker: "Compañero B", es: "Tranquilo, tu trabajo es muy valorado.", zh: "放心，你的工作很受重视。" }
            ],
            [
                { speaker: "Candidato", es: "Buenos días. Vengo a la entrevista de trabajo.", zh: "早上好。我来参加工作面试。" },
                { speaker: "Entrevistador", es: "Pase, por favor. Soy el director de recursos humanos.", zh: "请进。我是人力资源总监。" },
                { speaker: "Candidato", es: "Mucho gusto. Le traigo mi currículum.", zh: "很高兴见到您。我带来了我的简历。" },
                { speaker: "Entrevistador", es: "Gracias. Cuénteme, ¿por qué quiere trabajar aquí?", zh: "谢谢。告诉我，您为什么想在这里工作？" },
                { speaker: "Candidato", es: "Me interesa mucho el sector y creo que puedo aportar valor.", zh: "我对这个行业很感兴趣，而且我认为我能带来价值。" },
                { speaker: "Entrevistador", es: "Muy bien. Hablemos de su experiencia previa.", zh: "很好。我们来谈谈您之前的经验。" }
            ],
            [
                { speaker: "Jefe", es: "Felicitaciones por el trabajo en el proyecto de ayer.", zh: "恭喜您昨天在项目上的工作。" },
                { speaker: "Empleado", es: "Gracias. Fue un esfuerzo de equipo.", zh: "谢谢。这是团队努力的结果。" },
                { speaker: "Jefe", es: "El cliente quedó muy satisfecho. Quiere seguir trabajando con nosotros.", zh: "客户非常满意。想继续和我们合作。" },
                { speaker: "Empleado", es: "Me alegro mucho. ¿Sabemos ya los detalles del nuevo contrato?", zh: "我很高兴。我们知道新合同的细节了吗？" },
                { speaker: "Jefe", es: "Todavía no, pero la semana que viene tenemos reunión.", zh: "还没有，但下周我们有会议。" },
                { speaker: "Empleado", es: "Perfecto. Estoy disponible cuando me necesite.", zh: "完美。需要我的时候我都在。" }
            ],
            [
                { speaker: "Colega A", es: "¿Puedes ayudarme con este problema del Excel?", zh: "你能帮我解决这个Excel问题吗？" },
                { speaker: "Colega B", es: "Claro, ¿qué te pasa?", zh: "当然，怎么了？" },
                { speaker: "Colega A", es: "No consigo que la fórmula funcione correctamente.", zh: "我无法让公式正常工作。" },
                { speaker: "Colega B", es: "Déjame ver. Ah, te falta un paréntesis aquí.", zh: "让我看看。啊，这里少了一个括号。" },
                { speaker: "Colega A", es: "¡Tienes razón! Muchas gracias, me estaba volviendo loco.", zh: "你说得对！非常感谢，我都快疯了。" },
                { speaker: "Colega B", es: "De nada. Si tienes más dudas, ya sabes dónde estoy.", zh: "不客气。如果还有问题，你知道我在哪儿。" }
            ]
        ]
    },
    shopping: {
        name: "购物",
        dialogues: [
            [
                { speaker: "Cliente", es: "¿Me puede ayudar? Busco un regalo para mi madre.", zh: "您能帮我吗？我在给我妈妈找礼物。" },
                { speaker: "Vendedor", es: "Claro. ¿Qué le gusta a ella?", zh: "当然。她喜欢什么？" },
                { speaker: "Cliente", es: "Le encanta leer y hacer manualidades.", zh: "她喜欢阅读和做手工。" },
                { speaker: "Vendedor", es: "Tenemos libros de arte y kits de manualidades.", zh: "我们有艺术书籍和手工套装。" }
            ],
            [
                { speaker: "Cliente", es: "¿Puedo probarme estos pantalones?", zh: "我能试穿这条裤子吗？" },
                { speaker: "Vendedor", es: "Sí, los probadores están al fondo a la derecha.", zh: "可以，试衣间在右边尽头。" },
                { speaker: "Cliente", es: "¿Tienen una talla más grande?", zh: "有大一号的吗？" },
                { speaker: "Vendedor", es: "Voy a buscarla. Un momento, por favor.", zh: "我去找一下。请稍等。" }
            ],
            [
                { speaker: "Cliente", es: "¿Está en oferta este abrigo?", zh: "这件大衣打折吗？" },
                { speaker: "Vendedor", es: "Sí, tiene un descuento del treinta por ciento.", zh: "是的，打七折。" },
                { speaker: "Cliente", es: "Perfecto, me lo llevo.", zh: "太好了，我买了。" },
                { speaker: "Vendedor", es: "¿Paga en efectivo o con tarjeta?", zh: "您付现金还是刷卡？" }
            ],
            [
                { speaker: "Cliente", es: "¿Tienen este modelo en color azul?", zh: "这个款式有蓝色的吗？" },
                { speaker: "Vendedor", es: "Lo siento, solo nos queda en negro y gris.", zh: "抱歉，我们只有黑色和灰色的了。" },
                { speaker: "Cliente", es: "Qué pena. ¿Van a tener más existencias pronto?", zh: "真遗憾。你们很快会补货吗？" },
                { speaker: "Vendedor", es: "Esperamos recibir más la semana que viene.", zh: "我们预计下周会到货。" },
                { speaker: "Cliente", es: "¿Puedo dejar mi teléfono para que me avisen?", zh: "我能留下电话让你们通知我吗？" },
                { speaker: "Vendedor", es: "Por supuesto. Déjeme sus datos y le llamamos.", zh: "当然。请留下您的信息，我们会打电话给您。" }
            ],
            [
                { speaker: "Cliente", es: "Quisiera devolver esta camisa. No es la talla correcta.", zh: "我想退这件衬衫。尺码不对。" },
                { speaker: "Vendedor", es: "¿Tiene el ticket de compra?", zh: "您有购物小票吗？" },
                { speaker: "Cliente", es: "Sí, aquí lo tengo. La compré hace tres días.", zh: "有，在这儿。我三天前买的。" },
                { speaker: "Vendedor", es: "Perfecto. ¿Prefiere el reembolso o el cambio por otra talla?", zh: "完美。您想要退款还是换别的尺码？" },
                { speaker: "Cliente", es: "Me gustaría cambiarla por una talla más grande.", zh: "我想换大一号。" },
                { speaker: "Vendedor", es: "Voy a comprobar si tenemos stock. Un momento.", zh: "我去检查一下有没有库存。稍等。" }
            ],
            [
                { speaker: "Cliente", es: "¿Cuánto cuesta este reloj? No tiene precio.", zh: "这个手表多少钱？没有标价。" },
                { speaker: "Vendedor", es: "Cuesta ciento veinte euros.", zh: "一百二十欧元。" },
                { speaker: "Cliente", es: "¿Tiene garantía?", zh: "有保修吗？" },
                { speaker: "Vendedor", es: "Sí, dos años. Y incluye la pila de repuesto.", zh: "有，两年。还包括备用电池。" },
                { speaker: "Cliente", es: "Me lo quedo. ¿Me lo puede envolver para regalo?", zh: "我买了。能帮我包成礼物吗？" },
                { speaker: "Vendedor", es: "Claro, sin problema. ¿Quiere incluir una tarjeta?", zh: "当然，没问题。要包含贺卡吗？" }
            ],
            [
                { speaker: "Cliente", es: "Estoy buscando zapatos para correr.", zh: "我在找跑鞋。" },
                { speaker: "Vendedor", es: "¿Para qué tipo de superficie? ¿Asfalto o montaña?", zh: "什么类型的地面？柏油路还是山地？" },
                { speaker: "Cliente", es: "Principalmente asfalto. Hago unos diez kilómetros al día.", zh: "主要是柏油路。我每天跑大约十公里。" },
                { speaker: "Vendedor", es: "Le recomiendo este modelo. Tiene buena amortiguación.", zh: "我推荐这款。缓冲很好。" },
                { speaker: "Cliente", es: "¿Puedo probármelos? Uso la cuarenta y dos.", zh: "我能试穿吗？我穿42码。" },
                { speaker: "Vendedor", es: "Sí, aquí tiene. Puede caminar un poco para ver si le resultan cómodos.", zh: "可以，给您。您可以走几步看看是否舒服。" }
            ],
            [
                { speaker: "Cajero", es: "¿Tiene tarjeta de fidelidad?", zh: "您有会员卡吗？" },
                { speaker: "Cliente", es: "No, pero me gustaría hacer una.", zh: "没有，但我想办一张。" },
                { speaker: "Cajero", es: "Muy bien. Solo necesito su DNI y un número de teléfono.", zh: "好的。我只需要您的身份证和电话号码。" },
                { speaker: "Cliente", es: "Aquí tiene. ¿Qué beneficios tiene la tarjeta?", zh: "给您。会员卡有什么优惠？" },
                { speaker: "Cajero", es: "Acumula puntos con cada compra y tiene descuentos especiales.", zh: "每次购物积分，还有特别折扣。" },
                { speaker: "Cliente", es: "Perfecto. ¿Cuánto es en total?", zh: "完美。总共多少钱？" },
                { speaker: "Cajero", es: "Sesenta y cinco euros con el descuento de bienvenida aplicado.", zh: "应用欢迎折扣后六十五欧元。" }
            ]
        ]
    },
    doctor: {
        name: "看病就医",
        dialogues: [
            [
                { speaker: "Doctor", es: "¿Qué síntomas tiene?", zh: "您有什么症状？" },
                { speaker: "Paciente", es: "Tengo fiebre y me duele mucho la garganta.", zh: "我发烧了，喉咙很痛。" },
                { speaker: "Doctor", es: "Voy a examinarle. Abra la boca, por favor.", zh: "我检查一下。请张开嘴。" },
                { speaker: "Doctor", es: "Tiene una infección. Le receto antibióticos.", zh: "您有感染。我给您开抗生素。" }
            ],
            [
                { speaker: "Paciente", es: "Me he torcido el tobillo.", zh: "我扭伤了脚踝。" },
                { speaker: "Doctor", es: "¿Puede moverlo?", zh: "您能活动吗？" },
                { speaker: "Paciente", es: "Con dificultad. Duele mucho.", zh: "有点困难。很痛。" },
                { speaker: "Doctor", es: "Necesita una radiografía para descartar una fractura.", zh: "您需要拍X光片排除骨折。" }
            ],
            [
                { speaker: "Farmacéutico", es: "¿Tiene la receta?", zh: "您有处方吗？" },
                { speaker: "Cliente", es: "Sí, aquí la tiene.", zh: "有，给您。" },
                { speaker: "Farmacéutico", es: "Tome una pastilla cada ocho horas.", zh: "每八小时吃一片。" },
                { speaker: "Cliente", es: "¿Tiene algún efecto secundario?", zh: "有什么副作用吗？" }
            ],
            [
                { speaker: "Recepcionista", es: "¿Tiene cita previa?", zh: "您有预约吗？" },
                { speaker: "Paciente", es: "No, es urgente. Me siento muy mal.", zh: "没有，很紧急。我感觉很不舒服。" },
                { speaker: "Recepcionista", es: "Voy a ver si el doctor puede atenderle. ¿Su nombre?", zh: "我看看医生能不能接待您。您叫什么名字？" },
                { speaker: "Paciente", es: "Juan Martínez. Tengo dolor de cabeza muy fuerte.", zh: "胡安·马丁内斯。我头痛很厉害。" },
                { speaker: "Recepcionista", es: "Espere un momento, por favor. Hay una cancelación en quince minutos.", zh: "请稍等。十五分钟后有一个取消的预约。" },
                { speaker: "Paciente", es: "Gracias. ¿Debo esperar aquí?", zh: "谢谢。我需要在这里等吗？" }
            ],
            [
                { speaker: "Doctor", es: "¿Desde cuándo tiene estos dolores de estómago?", zh: "您胃痛多久了？" },
                { speaker: "Paciente", es: "Desde hace una semana más o menos.", zh: "大约一周了。" },
                { speaker: "Doctor", es: "¿Ha cambiado algo en su alimentación?", zh: "您的饮食有什么变化吗？" },
                { speaker: "Paciente", es: "He estado comiendo mucha comida picante últimamente.", zh: "最近我吃了很多辛辣食物。" },
                { speaker: "Doctor", es: "Eso puede ser la causa. Le voy a hacer unas pruebas para descartar otras cosas.", zh: "那可能是原因。我要给您做一些检查排除其他问题。" },
                { speaker: "Paciente", es: "¿Debo venir en ayunas?", zh: "我需要空腹来吗？" },
                { speaker: "Doctor", es: "Sí, por favor. Venga mañana a primera hora.", zh: "是的，请。明天一大早来。" }
            ],
            [
                { speaker: "Enfermera", es: "Voy a tomarle la tensión. ¿Se ha medicado hoy?", zh: "我要量您的血压。您今天吃药了吗？" },
                { speaker: "Paciente", es: "Sí, tomé la pastilla de la mañana.", zh: "吃了，我吃了早上的药。" },
                { speaker: "Enfermera", es: "La tensión está un poco alta. ¿Ha estado estresado?", zh: "血压有点高。您压力大吗？" },
                { speaker: "Paciente", es: "Sí, he tenido mucho trabajo últimamente.", zh: "是的，最近工作很多。" },
                { speaker: "Enfermera", es: "Debe intentar relajarse más. El estrés afecta la presión.", zh: "您应该尽量多放松。压力会影响血压。" },
                { speaker: "Paciente", es: "Tiene razón. Voy a intentar hacer ejercicio.", zh: "您说得对。我会尝试锻炼。" }
            ],
            [
                { speaker: "Doctor", es: "Los resultados de su análisis de sangre son normales.", zh: "您的血液检查结果正常。" },
                { speaker: "Paciente", es: "¡Qué alivio! ¿Y el colesterol?", zh: "松了口气！胆固醇呢？" },
                { speaker: "Doctor", es: "Está un poco elevado. Debe cuidar su dieta.", zh: "有点高。您需要注意饮食。" },
                { speaker: "Paciente", es: "¿Debo eliminar completamente los huevos?", zh: "我需要完全不吃鸡蛋吗？" },
                { speaker: "Doctor", es: "No es necesario, pero reduzca las grasas saturadas.", zh: "没必要，但减少饱和脂肪。" },
                { speaker: "Paciente", es: "Entendido. ¿Cuándo debo volver?", zh: "明白了。我什么时候需要再来？" },
                { speaker: "Doctor", es: "Dentro de seis meses para un control de rutina.", zh: "六个月后做常规检查。" }
            ],
            [
                { speaker: "Paciente", es: "Doctor, llevo meses sintiéndome muy cansado.", zh: "医生，我几个月来一直感觉很累。" },
                { speaker: "Doctor", es: "¿Duerme bien por las noches?", zh: "您晚上睡得好吗？" },
                { speaker: "Paciente", es: "No, me cuesta mucho conciliar el sueño.", zh: "不好，我很难入睡。" },
                { speaker: "Doctor", es: "¿Ha tenido situaciones estresantes últimamente?", zh: "最近有压力大的情况吗？" },
                { speaker: "Paciente", es: "Sí, he pasado por una situación familiar difícil.", zh: "有，我经历了一段困难的家庭情况。" },
                { speaker: "Doctor", es: "Entiendo. Le voy a derivar a un especialista. También le recomiendo hacer ejercicio suave.", zh: "我理解。我会把您转给专科医生。我还建议您做轻度运动。" }
            ]
        ]
    },
    bank: {
        name: "银行服务",
        dialogues: [
            [
                { speaker: "Cliente", es: "Quisiera abrir una cuenta corriente.", zh: "我想开一个活期账户。" },
                { speaker: "Empleado", es: "Por supuesto. ¿Tiene usted DNI o NIE?", zh: "当然。您有身份证或外国人身份证吗？" },
                { speaker: "Cliente", es: "Sí, aquí lo tengo. ¿Qué documentación más necesito?", zh: "有，在这儿。我还需要什么文件？" },
                { speaker: "Empleado", es: "Un justificante de domicilio y su nómina o contrato de trabajo.", zh: "居住证明和您的工资单或工作合同。" },
                { speaker: "Cliente", es: "Perfecto, aquí tiene todo.", zh: "完美，给您所有文件。" },
                { speaker: "Empleado", es: "Muy bien. En unos minutos tendrá su cuenta activa.", zh: "很好。几分钟后您的账户就会激活。" }
            ],
            [
                { speaker: "Cliente", es: "Necesito hacer una transferencia internacional.", zh: "我需要做一笔国际转账。" },
                { speaker: "Empleado", es: "¿A qué país quiere enviar el dinero?", zh: "您想把钱寄到哪个国家？" },
                { speaker: "Cliente", es: "A China. Es para mi familia.", zh: "到中国。是给我家人的。" },
                { speaker: "Empleado", es: "Necesitamos los datos del banco receptor y el IBAN.", zh: "我们需要收款银行的信息和IBAN。" },
                { speaker: "Cliente", es: "Aquí tengo los datos. ¿Cuánto tarda en llegar?", zh: "我有信息。多久能到账？" },
                { speaker: "Empleado", es: "Unos tres días laborables. La comisión es del uno por ciento.", zh: "大约三个工作日。手续费是百分之一。" }
            ],
            [
                { speaker: "Cliente", es: "He perdido mi tarjeta de crédito. ¿Qué debo hacer?", zh: "我丢了信用卡。我该怎么办？" },
                { speaker: "Empleado", es: "Primero debemos bloquearla por seguridad. ¿Recuerda el número?", zh: "首先为了安全我们要冻结它。您记得卡号吗？" },
                { speaker: "Cliente", es: "No, pero tengo el DNI.", zh: "不记得，但我有身份证。" },
                { speaker: "Empleado", es: "Con eso es suficiente. Voy a bloquearla ahora mismo.", zh: "那就够了。我现在就冻结。" },
                { speaker: "Cliente", es: "¿Puedo solicitar una nueva?", zh: "我能申请一张新卡吗？" },
                { speaker: "Empleado", es: "Sí, le llegará a su domicilio en una semana.", zh: "可以，一周内会寄到您家。" }
            ],
            [
                { speaker: "Cliente", es: "Quiero solicitar un préstamo para comprar un coche.", zh: "我想申请贷款买车。" },
                { speaker: "Empleado", es: "¿De cuánto dinero necesita?", zh: "您需要多少钱？" },
                { speaker: "Cliente", es: "Unos quince mil euros.", zh: "大约一万五千欧元。" },
                { speaker: "Empleado", es: "¿A qué plazo le gustaría devolverlo?", zh: "您想多长时间还清？" },
                { speaker: "Cliente", es: "En cinco años si es posible.", zh: "如果可能的话五年。" },
                { speaker: "Empleado", es: "Voy a calcularle las cuotas. ¿Tiene nómina fija?", zh: "我来算一下分期付款。您有固定工资吗？" },
                { speaker: "Cliente", es: "Sí, trabajo en una empresa desde hace tres años.", zh: "有，我在一家公司工作三年了。" }
            ],
            [
                { speaker: "Cliente", es: "¿Puedo consultar el saldo de mi cuenta?", zh: "我能查一下账户余额吗？" },
                { speaker: "Empleado", es: "Claro, ¿tiene su tarjeta?", zh: "当然，您有卡吗？" },
                { speaker: "Cliente", es: "Sí, aquí la tengo.", zh: "有，在这儿。" },
                { speaker: "Empleado", es: "Su saldo actual es de dos mil trescientos euros.", zh: "您目前的余额是两千三百欧元。" },
                { speaker: "Cliente", es: "¿Ha entrado ya la nómina de este mes?", zh: "这个月的工资已经到账了吗？" },
                { speaker: "Empleado", es: "Sí, entró ayer. Mil ochocientos euros.", zh: "是的，昨天到账了。一千八百欧元。" }
            ],
            [
                { speaker: "Cliente", es: "Me gustaría contratar un seguro de hogar.", zh: "我想买一份房屋保险。" },
                { speaker: "Empleado", es: "¿Es propietario o inquilino?", zh: "您是业主还是租客？" },
                { speaker: "Cliente", es: "Soy propietario. El piso es de ochenta metros.", zh: "我是业主。公寓八十平米。" },
                { speaker: "Empleado", es: "Tenemos varias opciones. ¿Quiere cobertura contra robos?", zh: "我们有几个选择。您要防盗险吗？" },
                { speaker: "Cliente", es: "Sí, por favor. También contra incendios e inundaciones.", zh: "是的，请。还有火灾和洪水险。" },
                { speaker: "Empleado", es: "Le preparo un presupuesto. ¿Tiene algún siniestro previo?", zh: "我给您准备报价。您之前有出过险吗？" }
            ]
        ]
    },
    school: {
        name: "学校生活",
        dialogues: [
            [
                { speaker: "Profesor", es: "Buenos días, clase. Hoy vamos a hablar de historia.", zh: "早上好，同学们。今天我们要讲历史。" },
                { speaker: "Alumno", es: "Profesor, ¿qué época vamos a estudiar?", zh: "老师，我们要学哪个时期？" },
                { speaker: "Profesor", es: "El Siglo de Oro español. Es muy interesante.", zh: "西班牙黄金时代。非常有趣。" },
                { speaker: "Alumno", es: "¿Tendremos que memorizar fechas?", zh: "我们需要记日期吗？" },
                { speaker: "Profesor", es: "Algunas importantes, pero lo fundamental es entender el contexto.", zh: "一些重要的，但关键是理解背景。" }
            ],
            [
                { speaker: "Alumno", es: "Perdone, ¿puede explicarme este ejercicio de nuevo?", zh: "打扰一下，您能再给我解释这道题吗？" },
                { speaker: "Profesor", es: "Claro. ¿En qué parte tienes dudas?", zh: "当然。你哪部分有疑问？" },
                { speaker: "Alumno", es: "No entiendo cómo se resuelve la segunda parte.", zh: "我不懂第二部分怎么解。" },
                { speaker: "Profesor", es: "Mira, primero debes aplicar esta fórmula.", zh: "看，首先你要应用这个公式。" },
                { speaker: "Alumno", es: "Ah, ya veo. Muchas gracias, profesor.", zh: "啊，我明白了。非常感谢，老师。" },
                { speaker: "Profesor", es: "De nada. Si tienes más dudas, ven en horario de tutorías.", zh: "不客气。如果还有疑问，辅导时间来找我。" }
            ],
            [
                { speaker: "Padre", es: "¿Cómo va mi hijo en clase?", zh: "我儿子在班上怎么样？" },
                { speaker: "Profesor", es: "Tiene mucha capacidad, pero le falta esfuerzo.", zh: "他很有能力，但缺少努力。" },
                { speaker: "Padre", es: "¿Está entregando los deberes a tiempo?", zh: "他按时交作业吗？" },
                { speaker: "Profesor", es: "A veces los entrega tarde. Debe organizarse mejor.", zh: "有时会晚交。他需要更好地安排时间。" },
                { speaker: "Padre", es: "Hablaré con él en casa. ¿Qué asignaturas le cuestan más?", zh: "我会在家和他谈谈。哪些科目对他来说比较难？" },
                { speaker: "Profesor", es: "Principalmente matemáticas. Podría apuntarse a clases de refuerzo.", zh: "主要是数学。他可以报名参加补习班。" }
            ],
            [
                { speaker: "Estudiante A", es: "¿Has estudiado para el examen de mañana?", zh: "你准备明天的考试了吗？" },
                { speaker: "Estudiante B", es: "Estoy muy nervioso. No sé si lo aprobaré.", zh: "我很紧张。不知道能不能及格。" },
                { speaker: "Estudiante A", es: "Tranquilo, si has hecho los ejercicios, saldrá bien.", zh: "放心，如果你做了练习，会顺利的。" },
                { speaker: "Estudiante B", es: "Espero que sí. ¿Quieres repasar juntos esta tarde?", zh: "希望如此。你今天下午想一起复习吗？" },
                { speaker: "Estudiante A", es: "Vale, quedamos en la biblioteca a las cinco.", zh: "好，我们五点在图书馆见。" },
                { speaker: "Estudiante B", es: "Perfecto. Llevo los apuntes y tú los ejercicios.", zh: "完美。我带笔记你带练习题。" }
            ],
            [
                { speaker: "Secretario", es: "¿En qué puedo ayudarle?", zh: "有什么可以帮您的？" },
                { speaker: "Padre", es: "Quiero matricular a mi hija en este colegio.", zh: "我想给我女儿在这所学校报名。" },
                { speaker: "Secretario", es: "Muy bien. ¿Tiene la documentación necesaria?", zh: "好的。您有必要的文件吗？" },
                { speaker: "Padre", es: "Sí, el libro de familia y el certificado de vacunas.", zh: "有，户口本和疫苗接种证明。" },
                { speaker: "Secretario", es: "Perfecto. Rellene este formulario y le daremos cita para la entrevista.", zh: "完美。请填写这张表格，我们会给您安排面试。" },
                { speaker: "Padre", es: "¿Cuándo sabremos si hay plaza disponible?", zh: "我们什么时候知道有没有名额？" },
                { speaker: "Secretario", es: "Le llamaremos en dos semanas como máximo.", zh: "最多两周后我们会打电话给您。" }
            ],
            [
                { speaker: "Profesor", es: "Atención, chicos. Mañana tenemos una excursión al museo.", zh: "注意，同学们。明天我们去博物馆郊游。" },
                { speaker: "Alumno", es: "¿A qué hora salimos?", zh: "我们几点出发？" },
                { speaker: "Profesor", es: "A las nueve en punto. No lleguéis tarde.", zh: "九点整。不要迟到。" },
                { speaker: "Alumno", es: "¿Necesitamos llevar algo?", zh: "我们需要带什么吗？" },
                { speaker: "Profesor", es: "Un cuaderno para apuntar y algo de comer. El almuerzo no está incluido.", zh: "一个笔记本记东西和一些吃的。午餐不包括在内。" },
                { speaker: "Alumno", es: "¿Podemos hacer fotos dentro del museo?", zh: "我们可以在博物馆里拍照吗？" },
                { speaker: "Profesor", es: "Sí, pero sin flash. Y respetad las obras de arte.", zh: "可以，但不要开闪光灯。而且要尊重艺术品。" }
            ]
        ]
    },
    hotel: {
        name: "酒店住宿",
        dialogues: [
            [
                { speaker: "Recepcionista", es: "Bienvenido al Hotel Plaza. ¿Tiene reserva?", zh: "欢迎来到广场酒店。您有预订吗？" },
                { speaker: "Huésped", es: "Sí, a nombre de López. Dos noches.", zh: "有，姓洛佩斯。两晚。" },
                { speaker: "Recepcionista", es: "Perfecto. Su habitación es la tres catorce.", zh: "完美。您的房间是314。" },
                { speaker: "Huésped", es: "¿Incluye desayuno?", zh: "含早餐吗？" },
                { speaker: "Recepcionista", es: "Sí, buffet libre de siete a diez.", zh: "含，七点到十点是自助早餐。" },
                { speaker: "Huésped", es: "¿Hay wifi en la habitación?", zh: "房间里有wifi吗？" },
                { speaker: "Recepcionista", es: "Sí, gratis. La contraseña está en la mesilla.", zh: "有，免费的。密码在床头柜上。" }
            ],
            [
                { speaker: "Huésped", es: "Buenas noches. Mi habitación no tiene agua caliente.", zh: "晚上好。我的房间没有热水。" },
                { speaker: "Recepcionista", es: "Lo siento mucho. ¿Qué número de habitación?", zh: "非常抱歉。几号房间？" },
                { speaker: "Huésped", es: "La doscientos cinco.", zh: "205。" },
                { speaker: "Recepcionista", es: "Voy a enviar al técnico inmediatamente.", zh: "我马上派技术员去。" },
                { speaker: "Huésped", es: "Gracias. También necesito toallas limpias.", zh: "谢谢。我还需要干净的毛巾。" },
                { speaker: "Recepcionista", es: "Las subo enseguida. Disculpe las molestias.", zh: "马上给您送上去。抱歉给您带来不便。" }
            ],
            [
                { speaker: "Huésped", es: "¿A qué hora debo dejar la habitación?", zh: "我需要在几点退房？" },
                { speaker: "Recepcionista", es: "El check-out es a las doce del mediodía.", zh: "退房时间是中午十二点。" },
                { speaker: "Huésped", es: "¿Puedo hacer late check-out? Mi vuelo sale por la tarde.", zh: "我能延迟退房吗？我的航班是下午的。" },
                { speaker: "Recepcionista", es: "Depende de la disponibilidad. ¿Hasta qué hora necesita?", zh: "取决于是否有空房。您需要到几点？" },
                { speaker: "Huésped", es: "¿Sería posible hasta las dos?", zh: "两点可以吗？" },
                { speaker: "Recepcionista", es: "Sí, sin problema. No hay nueva reserva para esa habitación.", zh: "可以，没问题。那个房间没有新预订。" }
            ],
            [
                { speaker: "Huésped", es: "¿El hotel tiene gimnasio?", zh: "酒店有健身房吗？" },
                { speaker: "Recepcionista", es: "Sí, en la planta menos uno. Abre las veinticuatro horas.", zh: "有，在负一楼。24小时开放。" },
                { speaker: "Huésped", es: "¿Hay que pagar aparte?", zh: "需要另外付费吗？" },
                { speaker: "Recepcionista", es: "No, es gratuito para los huéspedes.", zh: "不用，对住客免费。" },
                { speaker: "Huésped", es: "Perfecto. ¿Y la piscina?", zh: "完美。游泳池呢？" },
                { speaker: "Recepcionista", es: "Está en la azotea. Cierra a las ocho de la tarde.", zh: "在屋顶。晚上八点关闭。" }
            ],
            [
                { speaker: "Huésped", es: "Quisiera reservar una mesa en el restaurante para esta noche.", zh: "我想预订今晚餐厅的座位。" },
                { speaker: "Recepcionista", es: "¿Para cuántas personas?", zh: "几位？" },
                { speaker: "Huésped", es: "Para cuatro. Somos dos adultos y dos niños.", zh: "四位。两个大人和两个小孩。" },
                { speaker: "Recepcionista", es: "¿A qué hora les viene bien?", zh: "几点方便？" },
                { speaker: "Huésped", es: "Sobre las nueve. ¿Tienen menú infantil?", zh: "大约九点。有儿童菜单吗？" },
                { speaker: "Recepcionista", es: "Sí, con varias opciones. Les preparo la mesa doce.", zh: "有，有好几种选择。我给您准备12号桌。" }
            ],
            [
                { speaker: "Recepcionista", es: "¿Ha disfrutado de su estancia?", zh: "您住得愉快吗？" },
                { speaker: "Huésped", es: "Sí, mucho. El servicio ha sido excelente.", zh: "是的，很愉快。服务非常好。" },
                { speaker: "Recepcionista", es: "Me alegro. ¿Necesita taxi para el aeropuerto?", zh: "很高兴。您需要出租车去机场吗？" },
                { speaker: "Huésped", es: "Sí, por favor. Mi vuelo sale a las tres.", zh: "是的，请。我的航班三点起飞。" },
                { speaker: "Recepcionista", es: "Lo llamo para dentro de una hora. ¿Le ha gustado la habitación?", zh: "我安排一小时后的车。您喜欢房间吗？" },
                { speaker: "Huésped", es: "Mucho, especialmente las vistas al mar.", zh: "很喜欢，尤其是海景。" }
            ]
        ]
    },
    phone: {
        name: "电话沟通",
        dialogues: [
            [
                { speaker: "A", es: "¿Diga?", zh: "喂？" },
                { speaker: "B", es: "Buenos días, ¿podría hablar con el señor García?", zh: "早上好，我能和加西亚先生通话吗？" },
                { speaker: "A", es: "De parte de quién?", zh: "请问您是哪位？" },
                { speaker: "B", es: "Soy Ana Martínez de la empresa Consultores.", zh: "我是咨询公司的安娜·马丁内斯。" },
                { speaker: "A", es: "Un momento, por favor. Voy a ver si está disponible.", zh: "请稍等。我看看他是否有空。" },
                { speaker: "B", es: "Gracias, no tengo prisa.", zh: "谢谢，我不着急。" }
            ],
            [
                { speaker: "Cliente", es: "Llamo para confirmar mi cita de mañana.", zh: "我打电话确认明天的预约。" },
                { speaker: "Recepcionista", es: "¿A qué hora tenía la cita?", zh: "您的预约是几点？" },
                { speaker: "Cliente", es: "A las once de la mañana con el doctor Ruiz.", zh: "上午十一点和鲁伊斯医生。" },
                { speaker: "Recepcionista", es: "Sí, aquí está confirmada. Llegue quince minutos antes.", zh: "是的，已确认。请提前十五分钟到。" },
                { speaker: "Cliente", es: "Perfecto. Si no puedo ir, ¿les aviso?", zh: "完美。如果我去不了，需要通知你们吗？" },
                { speaker: "Recepcionista", es: "Sí, por favor. Con veinticuatro horas de antelación.", zh: "是的，请提前二十四小时通知。" }
            ],
            [
                { speaker: "Técnico", es: "Buenos días, soy del servicio técnico. ¿Tiene problemas con el internet?", zh: "早上好，我是技术人员。您的网络有问题吗？" },
                { speaker: "Cliente", es: "Sí, se corta constantemente desde ayer.", zh: "是的，从昨天开始经常断网。" },
                { speaker: "Técnico", es: "Voy a hacer unas pruebas. ¿Está usted en casa ahora?", zh: "我要做一些测试。您现在在家吗？" },
                { speaker: "Cliente", es: "Sí, estoy trabajando desde casa.", zh: "在，我在家工作。" },
                { speaker: "Técnico", es: "Perfecto. Voy a reiniciar su router desde aquí.", zh: "完美。我从这里重启您的路由器。" },
                { speaker: "Cliente", es: "Gracias. Espero que se solucione.", zh: "谢谢。希望能解决。" }
            ],
            [
                { speaker: "Vendedor", es: "Buenas tardes, le llamo de la compañía eléctrica.", zh: "下午好，我是电力公司的。" },
                { speaker: "Cliente", es: "No estoy interesado, gracias.", zh: "我不感兴趣，谢谢。" },
                { speaker: "Vendedor", es: "Solo le llevará un minuto. Tenemos una oferta especial.", zh: "只需要一分钟。我们有特别优惠。" },
                { speaker: "Cliente", es: "De verdad, no me interesa. Por favor, no me vuelva a llamar.", zh: "真的，我不感兴趣。请不要再给我打电话了。" },
                { speaker: "Vendedor", es: "Lo siento por la molestia. Que tenga un buen día.", zh: "抱歉打扰。祝您有美好的一天。" }
            ],
            [
                { speaker: "Hijo", es: "Mamá, te llamo para decirte que llegaré tarde.", zh: "妈，我打电话告诉你我会晚到。" },
                { speaker: "Madre", es: "¿Qué pasa? ¿Estás bien?", zh: "怎么了？你还好吗？" },
                { speaker: "Hijo", es: "Sí, es que el tren va con retraso.", zh: "没事，是火车晚点了。" },
                { speaker: "Madre", es: "¿Cuánto tiempo?", zh: "多久？" },
                { speaker: "Hijo", es: "Unos treinta minutos. No esperes con la cena.", zh: "大约三十分钟。不用等我吃晚饭。" },
                { speaker: "Madre", es: "Vale, no te preocupes. Llega con cuidado.", zh: "好，别担心。小心点回来。" }
            ],
            [
                { speaker: "Secretaria", es: "¿Diga?", zh: "喂？" },
                { speaker: "Cliente", es: "Soy Juan Pérez. Me han dicho que me llamarían sobre mi solicitud.", zh: "我是胡安·佩雷斯。他们告诉我你们会打电话通知我申请的事。" },
                { speaker: "Secretaria", es: "Un momento, consulto. Sí, su solicitud ha sido aprobada.", zh: "稍等，我查一下。是的，您的申请已获批准。" },
                { speaker: "Cliente", es: "¡Excelente noticia! ¿Qué debo hacer ahora?", zh: "好消息！我现在需要做什么？" },
                { speaker: "Secretaria", es: "Pase por la oficina a recoger la documentación.", zh: "请来办公室领取文件。" },
                { speaker: "Cliente", es: "Perfecto. Iré mañana por la mañana. Gracias.", zh: "完美。我明天上午去。谢谢。" }
            ]
        ]
    },
    emergency: {
        name: "紧急情况",
        dialogues: [
            [
                { speaker: "Operador", es: "Servicio de emergencias, ¿qué ocurre?", zh: "紧急服务，发生什么事了？" },
                { speaker: "Ciudadano", es: "¡Hay un incendio en mi edificio!", zh: "我的大楼着火了！" },
                { speaker: "Operador", es: "Calme. ¿Cuál es su dirección?", zh: "冷静。您的地址是什么？" },
                { speaker: "Ciudadano", es: "Calle Mayor, número veinticinco, tercero izquierda.", zh: "马约尔街25号，三楼左边。" },
                { speaker: "Operador", es: "¿Hay personas atrapadas?", zh: "有人被困吗？" },
                { speaker: "Ciudadano", es: "No lo sé, creo que todos hemos salido.", zh: "不知道，我想我们都出来了。" },
                { speaker: "Operador", es: "Ya enviamos a los bomberos. Manténgase alejado del edificio.", zh: "我们已派消防员去。请远离大楼。" }
            ],
            [
                { speaker: "Operador", es: "Policía municipal, dígame.", zh: "市警察局，请讲。" },
                { speaker: "Ciudadano", es: "Quiero denunciar un robo en mi casa.", zh: "我要报案家里被盗了。" },
                { speaker: "Operador", es: "¿Cuándo ocurrió?", zh: "什么时候发生的？" },
                { speaker: "Ciudadano", es: "He llegado ahora y la puerta está forzada.", zh: "我刚到家，门被撬了。" },
                { speaker: "Operador", es: "¿Está seguro de que no hay nadie dentro?", zh: "您确定里面没人吗？" },
                { speaker: "Ciudadano", es: "No me he atrevido a entrar.", zh: "我不敢进去。" },
                { speaker: "Operador", es: "No entre. Enviamos una patrulla inmediatamente.", zh: "不要进去。我们马上派巡逻车去。" }
            ],
            [
                { speaker: "Operador", es: "Servicio de ambulancias, ¿qué necesita?", zh: "救护车服务，您需要什么？" },
                { speaker: "Ciudadano", es: "Mi abuelo se ha desmayado y no responde.", zh: "我爷爷晕倒了，没有反应。" },
                { speaker: "Operador", es: "¿Respira?", zh: "他在呼吸吗？" },
                { speaker: "Ciudadano", es: "Sí, pero está muy pálido.", zh: "是的，但他脸色很苍白。" },
                { speaker: "Operador", es: "¿Tiene pulso?", zh: "有脉搏吗？" },
                { speaker: "Ciudadano", es: "Sí, es débil pero lo tiene.", zh: "有，很弱但是有。" },
                { speaker: "Operador", es: "No lo mueva. La ambulancia llegará en diez minutos.", zh: "不要移动他。救护车十分钟内到。" }
            ],
            [
                { speaker: "Operador", es: "¿Emergencias?", zh: "紧急情况？" },
                { speaker: "Ciudadano", es: "¡He tenido un accidente de coche!", zh: "我出车祸了！" },
                { speaker: "Operador", es: "¿Hay heridos?", zh: "有人受伤吗？" },
                { speaker: "Ciudadano", es: "Sí, la otra conductora está sangrando de la cabeza.", zh: "有，另一位女司机头在流血。" },
                { speaker: "Operador", es: "¿Dónde está ubicado?", zh: "您在哪里？" },
                { speaker: "Ciudadano", es: "En la carretera nacional cinco, kilómetro cincuenta.", zh: "在5号国道，50公里处。" },
                { speaker: "Operador", es: "¿Ha puesto el triángulo de emergencia?", zh: "您放紧急三角牌了吗？" },
                { speaker: "Ciudadano", es: "Sí, y estoy fuera del coche.", zh: "放了，我在车外。" }
            ],
            [
                { speaker: "Operador", es: "Bomberos, dígame.", zh: "消防队，请讲。" },
                { speaker: "Ciudadano", es: "Hay un gato atrapado en un árbol muy alto.", zh: "有只猫被困在很高的树上。" },
                { speaker: "Operador", es: "Señor, esto no es una emergencia. Los gatos suelen bajar solos.", zh: "先生，这不是紧急情况。猫通常会自己下来。" },
                { speaker: "Ciudadano", es: "Lleva allí tres días y mañana llueve.", zh: "它在那儿三天了，明天下雨。" },
                { speaker: "Operador", es: "Entiendo su preocupación, pero no podemos intervenir.", zh: "我理解您的担心，但我们不能介入。" },
                { speaker: "Ciudadano", es: "¿Podría recomendarme a alguien que pueda ayudar?", zh: "您能推荐能帮忙的人吗？" }
            ],
            [
                { speaker: "Operador", es: "Teléfono de la esperanza, dígame.", zh: "希望热线，请讲。" },
                { speaker: "Llamante", es: "No sé qué hacer. Me siento muy solo.", zh: "我不知道该怎么办。我感觉很孤独。" },
                { speaker: "Operador", es: "Estoy aquí para escucharle. Cuénteme qué le pasa.", zh: "我在这里听您讲。告诉我您怎么了。" },
                { speaker: "Llamante", es: "He perdido mi trabajo y no tengo a nadie.", zh: "我丢了工作，没有人可以依靠。" },
                { speaker: "Operador", es: "Lo siento mucho. Es normal sentirse así en su situación.", zh: "非常抱歉。在您的情况下有这种感觉是正常的。" },
                { speaker: "Llamante", es: "¿Cree que las cosas mejorarán?", zh: "您觉得事情会好转吗？" },
                { speaker: "Operador", es: "Sí, y hay recursos que pueden ayudarle. No está solo.", zh: "会的，而且有资源可以帮助您。您不是一个人。" }
            ]
        ]
    }
};

// 口语挑战话题
const speakingChallenges = [
    { topic: "描述你的一天", hint: "hoy, primero, luego, después, finalmente, porque, aunque" },
    { topic: "谈论你最喜欢的电影", hint: "película, director, actor, argumento, recomendar, emocionante" },
    { topic: "描述你的家乡", hint: "ciudad, pueblo, naturaleza, gente, comida típica, tradiciones" },
    { topic: "谈论你的工作经历", hint: "trabajar, empresa, compañeros, responsabilidades, experiencia" },
    { topic: "描述一次旅行经历", hint: "viaje, destino, hotel, impresiones, inolvidable, recomendar" },
    { topic: "谈论你的爱好", hint: "pasatiempo, tiempo libre, practicar, disfrutar, desde hace" },
    { topic: "描述你理想的家", hint: "casa, habitaciones, ubicación, jardín, soñar con" },
    { topic: "谈论环保问题", hint: "medio ambiente, contaminación, reciclar, soluciones, responsabilidad" },
    { topic: "描述一个难忘的人", hint: "conocer, personalidad, influencia, admirar, ejemplo" },
    { topic: "谈论科技对生活的影响", hint: "tecnología, internet, ventajas, desventajas, cambiar" },
    { topic: "描述你的学习计划", hint: "objetivos, esfuerzo, dedicar, conseguir, futuro" },
    { topic: "谈论健康生活方式", hint: "ejercicio, dieta, equilibrio, importancia, mantenerse" },
    { topic: "描述一个节日庆典", hint: "celebrar, tradición, familia, comida, especial" },
    { topic: "谈论学习西班牙语的原因", hint: "idioma, cultura, viajar, trabajo, apasionar" },
    { topic: "描述你未来的计划", hint: "próximos años, esperar, gustaría, si pudiera" }
];
