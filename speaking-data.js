// 口语挑战话题 - 日常挑战优先复用按场景组织的口语对话，B2 考试题保留独立题型
// 类型: daily - 日常对话, b2_describe - B2描述题, b2_opinion - B2观点题, b2_compare - B2比较题

const dailySpeakingScenePlan = [
    { scenario: "daily", templateIndex: 0 },
    { scenario: "daily", templateIndex: 1 },
    { scenario: "daily", templateIndex: 2 },
    { scenario: "restaurant", templateIndex: 0 },
    { scenario: "restaurant", templateIndex: 1 },
    { scenario: "restaurant", templateIndex: 2 },
    { scenario: "travel", templateIndex: 0 },
    { scenario: "travel", templateIndex: 1 },
    { scenario: "travel", templateIndex: 2 },
    { scenario: "travel", templateIndex: 3 },
    { scenario: "work", templateIndex: 0 },
    { scenario: "work", templateIndex: 1 },
    { scenario: "work", templateIndex: 2 },
    { scenario: "work", templateIndex: 3 },
    { scenario: "shopping", templateIndex: 0 },
    { scenario: "shopping", templateIndex: 1 },
    { scenario: "shopping", templateIndex: 2 },
    { scenario: "shopping", templateIndex: 3 },
    { scenario: "doctor", templateIndex: 0 },
    { scenario: "doctor", templateIndex: 1 },
    { scenario: "doctor", templateIndex: 2 },
    { scenario: "doctor", templateIndex: 3 },
    { scenario: "bank", templateIndex: 0 },
    { scenario: "bank", templateIndex: 1 },
    { scenario: "school", templateIndex: 0 },
    { scenario: "school", templateIndex: 1 },
    { scenario: "hotel", templateIndex: 0 },
    { scenario: "hotel", templateIndex: 1 },
    { scenario: "phone", templateIndex: 0 },
    { scenario: "emergency", templateIndex: 0 }
];

const speakingHintStopwords = new Set([
    "a", "al", "algo", "alguna", "alguno", "algunas", "algunos", "como", "con", "contra", "cual", "cuando", "cuanto", "de", "del", "desde", "donde", "dos", "el", "ella", "ellas", "ellos", "en", "entre", "era", "eran", "eres", "es", "esa", "ese", "eso", "esta", "estaba", "estado", "estamos", "estar", "estoy", "ha", "han", "hasta", "hay", "la", "las", "le", "les", "lo", "los", "más", "me", "mi", "mis", "muy", "no", "nos", "o", "os", "para", "pero", "por", "porque", "que", "qué", "se", "si", "sí", "sin", "sobre", "su", "sus", "te", "tengo", "tiene", "tienen", "todo", "una", "uno", "unos", "usted", "ustedes", "voy", "ya", "yo"
]);

function extractHintWords(text, limit = 3) {
    const matches = String(text || "").toLowerCase().match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/g) || [];
    const words = [];

    matches.forEach(token => {
        if (token.length < 3 || speakingHintStopwords.has(token) || words.includes(token)) {
            return;
        }
        words.push(token);
    });

    if (words.length === 0) {
        return matches.slice(0, limit);
    }

    return words.slice(0, limit);
}

function buildExerciseHint(line) {
    const hintWords = extractHintWords(line?.es, 3);
    return hintWords.join(", ") || "respuesta completa";
}

function selectExerciseLines(lines, count = 5) {
    const safeLines = Array.isArray(lines)
        ? lines.filter(line => line && line.es && line.zh)
        : [];

    if (safeLines.length <= count) {
        return safeLines.slice(0, count);
    }

    const richLines = safeLines.filter(line => String(line.es || "").trim().split(/\s+/).length >= 6);
    const source = richLines.length >= count ? richLines : safeLines;

    if (source.length <= count) {
        return source.slice(0, count);
    }

    const selected = [];
    const usedIndexes = new Set();

    for (let i = 0; i < count; i += 1) {
        let targetIndex = Math.round(i * (source.length - 1) / (count - 1));

        while (usedIndexes.has(targetIndex) && targetIndex < source.length - 1) {
            targetIndex += 1;
        }
        while (usedIndexes.has(targetIndex) && targetIndex > 0) {
            targetIndex -= 1;
        }

        usedIndexes.add(targetIndex);
        selected.push(source[targetIndex]);
    }

    return selected;
}

function buildChallengeHint(exercises, fallbackHint = "hablar, responder, completar") {
    const words = [];

    exercises.forEach(exercise => {
        extractHintWords(exercise?.es, 2).forEach(word => {
            if (!words.includes(word)) {
                words.push(word);
            }
        });
    });

    return words.slice(0, 6).join(", ") || fallbackHint;
}

function buildDailyChallengesFromDialogues() {
    if (typeof dialogueScenarios === "undefined" || !dialogueScenarios) {
        console.warn("dialogueScenarios 尚未加载，今日口语挑战将为空");
        return [];
    }

    return dailySpeakingScenePlan.map((plan, index) => {
        const scenarioData = dialogueScenarios[plan.scenario];
        const template = scenarioData?.templates?.[plan.templateIndex];

        if (!scenarioData || !template) {
            console.warn("缺少口语场景配置:", plan);
            return null;
        }

        const exercises = selectExerciseLines(template.lines).map(line => ({
            zh: line.zh,
            es: line.es,
            hint: buildExerciseHint(line)
        }));

        return {
            topic: `💬 场景${index + 1}：${scenarioData.name} · 对话${plan.templateIndex + 1}`,
            hint: buildChallengeHint(exercises),
            sample: template.lines.map(line => line.es).join(" "),
            exercises
        };
    }).filter(Boolean);
}

const dailySpeakingChallenges = buildDailyChallengesFromDialogues();

const b2SpeakingChallenges = [
    // ========== B2 口语考试题型 ==========
    // B2 描述题 - 描述图片/场景
    {
        topic: "🖼️ B2描述：描述一个繁忙的市场",
        type: "b2_describe",
        hint: "bullicio, puestos, vendedores, clientes, frutas, verduras, negociar, ambiente",
        sample: "En la imagen se puede observar un mercado tradicional muy animado y lleno de vida. En el centro del cuadro hay varios puestos de frutas y verduras frescas, dispuestas de forma ordenada y colorida. Los vendedores están atendiendo a los clientes con amabilidad, explicando los precios y la calidad de sus productos. Se ve a una señora mayor que está negociando el precio de unas naranjas con el frutero. En el fondo, se distinguen más puestos con diferentes tipos de mercancías. El ambiente es bullicioso pero agradable, con conversaciones y risas de fondo. La gente va de un lado a otro con sus bolsas de la compra. Es una escena típica de la vida cotidiana en muchas ciudades españolas, donde la gente prefiere comprar productos frescos directamente a los productores.",
        exercises: [
            { zh: "在图片中我们可以看到", es: "En la imagen se puede observar", hint: "observar" },
            { zh: "在画面中央", es: "En el centro del cuadro", hint: "centro del cuadro" },
            { zh: "背景中可以看到", es: "En el fondo se distinguen", hint: "distinguir" },
            { zh: "氛围热闹", es: "El ambiente es bullicioso", hint: "bullicioso" },
            { zh: "典型的日常生活场景", es: "Una escena típica de la vida cotidiana", hint: "vida cotidiana" }
        ]
    },
    {
        topic: "🖼️ B2描述：描述一个家庭聚餐",
        type: "b2_describe",
        hint: "reunión, familiares, mesa, conversación, celebración, unión, tradición",
        sample: "La fotografía muestra una reunión familiar alrededor de una mesa llena de platos típicos. Se trata de una celebración especial, posiblemente un cumpleaños o una festividad importante. Los familiares están sentados compartiendo comida y conversaciones animadas. En la mesa se ven platos tradicionales como paella, jamón y diferentes ensaladas. Los abuelos ocupan los extremos de la mesa, como es tradición en muchas familias españolas. Los niños están sentados junto a sus padres, algunos de ellos jugando con sus móviles. Se percibe un ambiente cálido y acogedor, con risas y gestos de cariño entre los presentes. Esta escena refleja la importancia de la familia en la cultura española, donde las comidas compartidas son momentos sagrados para fortalecer los lazos familiares.",
        exercises: [
            { zh: "照片展示了", es: "La fotografía muestra", hint: "mostrar" },
            { zh: "这是一个特别的庆祝活动", es: "Se trata de una celebración especial", hint: "se trata de" },
            { zh: "围坐在桌旁", es: "Están sentados alrededor de una mesa", hint: "alrededor de" },
            { zh: "感受到温暖友好的氛围", es: "Se percibe un ambiente cálido y acogedor", hint: "percibir" },
            { zh: "反映了家庭的重要性", es: "Refleja la importancia de la familia", hint: "reflejar" }
        ]
    },
    {
        topic: "🖼️ B2描述：描述一个公园场景",
        type: "b2_describe",
        hint: "vegetación, bancos, pasear, relajarse, naturaleza, ocio, estaciones",
        sample: "En esta imagen se aprecia un parque urbano en pleno día de primavera. Los árboles están en plena floración, con hojas verdes y algunas flores de colores. En primer plano, hay varios bancos de madera donde la gente está descansando y disfrutando del buen tiempo. Se ve a una pareja de ancianos paseando tranquilamente por los senderos empedrados. Un grupo de jóvenes está sentado en el césped, probablemente estudiantes que aprovechan para estudiar al aire libre. En el fondo se distingue un estanque con patos nadando tranquilamente. El cielo está despejado y azul, lo que invita a permanecer al aire libre. Este tipo de espacios verdes son fundamentales en las ciudades porque ofrecen un respiro de la vida urbana y permiten a los ciudadanos conectar con la naturaleza sin salir de la ciudad.",
        exercises: [
            { zh: "在前景中", es: "En primer plano", hint: "primer plano" },
            { zh: "树木正在盛开", es: "Los árboles están en plena floración", hint: "floración" },
            { zh: "享受好天气", es: "Disfrutando del buen tiempo", hint: "disfrutar" },
            { zh: "在背景中可以看到", es: "En el fondo se distingue", hint: "distinguir" },
            { zh: "提供城市生活的喘息", es: "Ofrecen un respiro de la vida urbana", hint: "respiro" }
        ]
    },
    // B2 任务3 - 基于调查/数据表达观点
    {
        topic: "📊 B2任务3：根据远程办公调查发表看法",
        type: "b2_opinion",
        hint: "encuesta, porcentaje, teletrabajo, conciliación, productividad, aislamiento",
        sample: "Según la encuesta, el 62% de los trabajadores valora sobre todo la flexibilidad horaria del teletrabajo, mientras que un 24% destaca el ahorro de tiempo en desplazamientos. Sin embargo, también llama la atención que casi un tercio de los encuestados mencione el aislamiento como principal inconveniente. A mi juicio, estos datos demuestran que el teletrabajo funciona mejor cuando existe un equilibrio entre autonomía y contacto presencial. En mi experiencia, trabajar desde casa puede mejorar la concentración, pero solo si la empresa establece objetivos claros y espacios reales de colaboración. Por eso, considero que el modelo híbrido sigue siendo la opción más razonable, ya que combina productividad, conciliación y relación humana.",
        exercises: [
            { zh: "根据调查", es: "Según la encuesta", hint: "encuesta", minWords: 6 },
            { zh: "最引人注意的是", es: "Llama la atención que", hint: "llamar la atención", minWords: 7 },
            { zh: "这些数据表明", es: "Estos datos demuestran que", hint: "datos, demostrar", minWords: 7 },
            { zh: "依我看", es: "A mi juicio", hint: "juicio", minWords: 6 },
            { zh: "我认为混合模式更合理", es: "Considero que el modelo híbrido es más razonable", hint: "modelo híbrido", minWords: 9 }
        ]
    },
    {
        topic: "📊 B2任务3：根据青少年社交媒体使用数据发表看法",
        type: "b2_opinion",
        hint: "estadísticas, adolescentes, redes sociales, autoestima, privacidad, uso responsable",
        sample: "Las estadísticas indican que más del 70% de los adolescentes consulta las redes sociales varias veces al día, y un 41% reconoce que le cuesta desconectar del móvil antes de dormir. A partir de estos datos, se puede afirmar que las redes forman parte central de la vida cotidiana juvenil. No obstante, no todo es negativo: también facilitan el acceso a información, creatividad y comunicación inmediata. El problema surge cuando el uso deja de ser consciente y empieza a afectar al descanso, a la autoestima o a la privacidad. En mi opinión, la solución no consiste en prohibir estas plataformas, sino en enseñar a utilizarlas con sentido crítico y con límites claros.",
        exercises: [
            { zh: "统计数据显示", es: "Las estadísticas indican que", hint: "estadísticas", minWords: 7 },
            { zh: "从这些数据可以看出", es: "A partir de estos datos, se puede afirmar que", hint: "a partir de", minWords: 10 },
            { zh: "并非一切都是负面的", es: "No todo es negativo", hint: "negativo", minWords: 6 },
            { zh: "问题在于", es: "El problema surge cuando", hint: "problema, surgir", minWords: 7 },
            { zh: "解决办法不是禁止，而是教育", es: "La solución no consiste en prohibir, sino en educar", hint: "solución, prohibir", minWords: 10 }
        ]
    },
    {
        topic: "📊 B2任务3：根据外语学习动机统计发表看法",
        type: "b2_opinion",
        hint: "gráfico, idiomas, empleo, viajes, cultura, motivación, esfuerzo constante",
        sample: "El gráfico muestra que la razón más frecuente para aprender idiomas es mejorar las oportunidades laborales, seguida muy de cerca por el deseo de viajar y comunicarse mejor en el extranjero. En cambio, un porcentaje menor afirma estudiar lenguas por interés puramente cultural o académico. A mí me parece lógico que el trabajo ocupe el primer lugar, porque vivimos en un mercado cada vez más internacional. Sin embargo, reducir el aprendizaje de idiomas a una ventaja profesional sería un error. Aprender otra lengua también cambia la manera de pensar, amplía la visión del mundo y obliga a desarrollar paciencia y constancia. Por eso, creo que la motivación más sólida es la que combina utilidad práctica con curiosidad personal.",
        exercises: [
            { zh: "图表显示", es: "El gráfico muestra que", hint: "gráfico", minWords: 7 },
            { zh: "紧随其后的是", es: "Seguida muy de cerca por", hint: "seguir de cerca", minWords: 7 },
            { zh: "在我看来这很合理", es: "A mí me parece lógico", hint: "parecer lógico", minWords: 7 },
            { zh: "把语言学习只当作职业优势是错误的", es: "Reducir el aprendizaje de idiomas a una ventaja profesional sería un error", hint: "reducir, error", minWords: 12 },
            { zh: "最稳固的动机是实用和兴趣并存", es: "La motivación más sólida combina utilidad práctica y curiosidad personal", hint: "motivación", minWords: 11 }
        ]
    },
    // B2 任务1 - 协商/互动讨论
    {
        topic: "🤝 B2任务1：和同伴协商周末环保活动方案",
        type: "b2_interaction",
        hint: "propuesta, voluntariado, limpieza, presupuesto, barrio, ponerse de acuerdo",
        sample: "Si te parece, podríamos organizar una actividad de voluntariado el sábado por la mañana en lugar de hacerla por la tarde, porque así evitamos el calor y la gente participa con más energía. Yo propondría combinar una limpieza del parque con una recogida de ropa usada para una asociación del barrio. La idea me parece viable siempre que controlemos bien el presupuesto y pidamos permiso al ayuntamiento con antelación. También convendría repartir tareas: una persona puede encargarse de la difusión en redes y otra del material necesario. En resumen, creo que esta opción es útil, realista y beneficiosa para el barrio, así que yo la apoyaría.",
        exercises: [
            { zh: "如果你觉得可以，我们可以周六上午组织活动", es: "Si te parece, podríamos organizar la actividad el sábado por la mañana", hint: "si te parece, podríamos", minWords: 11 },
            { zh: "我建议把公园清洁和旧衣回收结合起来", es: "Yo propondría combinar la limpieza del parque con una recogida de ropa usada", hint: "proponer, combinar", minWords: 12 },
            { zh: "只要我们控制预算，这个想法就是可行的", es: "La idea es viable siempre que controlemos bien el presupuesto", hint: "viable, presupuesto", minWords: 11 },
            { zh: "最好提前分配任务", es: "También convendría repartir tareas con antelación", hint: "convendría", minWords: 8 },
            { zh: "总之我支持这个方案", es: "En resumen, yo apoyaría esta propuesta", hint: "en resumen", minWords: 7 }
        ]
    },
    {
        topic: "🤝 B2任务1：和同学商量班级文化参观安排",
        type: "b2_interaction",
        hint: "visita cultural, museo, horario, entradas, transporte, acuerdo final",
        sample: "Yo elegiría el museo de historia contemporánea porque ofrece una visita guiada en español y, además, está bien conectado por metro. No obstante, entiendo que algunos prefieran el centro de arte moderno, ya que resulta más dinámico para nuestro grupo. Quizá la mejor solución sea visitar el museo por la mañana y dejar la tarde libre para comentar la exposición en una cafetería cercana. De ese modo, aprovechamos mejor el tiempo y evitamos gastar demasiado en transporte. Si todos estamos de acuerdo, podríamos reservar las entradas hoy mismo para conseguir descuento de grupo.",
        exercises: [
            { zh: "我会选当代历史博物馆，因为交通方便", es: "Yo elegiría el museo de historia contemporánea porque está bien comunicado", hint: "elegir, comunicado", minWords: 10 },
            { zh: "我理解有人更喜欢现代艺术中心", es: "Entiendo que algunos prefieran el centro de arte moderno", hint: "entender, preferir", minWords: 9 },
            { zh: "最好的办法可能是上午参观、下午讨论", es: "Quizá la mejor solución sea hacer la visita por la mañana y comentar después", hint: "quizá, solución", minWords: 12 },
            { zh: "这样我们能更好利用时间并少花交通费", es: "De ese modo, aprovechamos mejor el tiempo y gastamos menos en transporte", hint: "de ese modo", minWords: 12 },
            { zh: "如果大家同意，我们今天就订票", es: "Si todos estamos de acuerdo, podríamos reservar las entradas hoy mismo", hint: "estar de acuerdo", minWords: 11 }
        ]
    },
    {
        topic: "🤝 B2任务1：和同事决定团队健康计划",
        type: "b2_interaction",
        hint: "empresa, bienestar, actividad física, horario, participación, propuesta final",
        sample: "Personalmente, descartaría imponer un único plan para todo el equipo, porque no todos tienen el mismo horario ni las mismas necesidades físicas. En su lugar, ofrecería dos opciones: una pausa activa breve durante la jornada y un taller semanal de hábitos saludables después del trabajo. Me parece importante que la participación sea voluntaria, ya que así aumentan la motivación y el compromiso real. Además, podríamos evaluar la propuesta al cabo de un mes para ver qué actividad funciona mejor. Si te convence esta idea, la presentamos al responsable de recursos humanos como una propuesta flexible y fácil de aplicar.",
        exercises: [
            { zh: "我不会强制所有人参加同一个计划", es: "Descartaría imponer un único plan para todo el equipo", hint: "descartar, imponer", minWords: 11 },
            { zh: "我会提供两个选择", es: "En su lugar, ofrecería dos opciones", hint: "ofrecer opciones", minWords: 7 },
            { zh: "参与最好是自愿的", es: "Me parece importante que la participación sea voluntaria", hint: "voluntaria", minWords: 9 },
            { zh: "一个月后我们可以评估效果", es: "Podríamos evaluar la propuesta al cabo de un mes", hint: "evaluar", minWords: 10 },
            { zh: "如果你也同意，我们就把方案交给人事", es: "Si te convence la idea, se la presentamos a recursos humanos", hint: "convencer, recursos humanos", minWords: 11 }
        ]
    }
];

const speakingChallenges = [...dailySpeakingChallenges, ...b2SpeakingChallenges];

// 每日推荐场景（按已配置的日常场景循环）
function getDailyScenario() {
    // 检查 speakingChallenges 是否已加载
    if (typeof speakingChallenges === "undefined" || !speakingChallenges || speakingChallenges.length === 0) {
        console.log("speakingChallenges 尚未加载");
        return null;
    }

    const dailyChallenges = speakingChallenges.filter(item => !item.type || !String(item.type).startsWith("b2_"));
    if (dailyChallenges.length === 0) {
        console.log("没有可用的日常口语挑战");
        return null;
    }

    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const index = dayOfYear % dailyChallenges.length;
    return dailyChallenges[index];
}
