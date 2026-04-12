/**
 * DELE B2 写作训练题库
 * 
 * Tarea 1: Expresión e interacción escritas (书信/邮件)
 *   - 提供一段背景材料（新闻/博客/公告），写一封正式或半正式信件
 *   - 字数要求: 150-180词
 *   - 建议用时: 40分钟
 * 
 * Tarea 2: Expresión escrita (文章表达) —— 二选一
 *   - 选项A: Artículo de opinión / Texto discursivo（议论文）
 *   - 选项B: Texto narrativo/descriptivo 或 Reseña（叙述/描述/评论）
 *   - 字数要求: 150-180词
 *   - 建议用时: 40分钟
 */

const WRITING_TOPICS = {
  tarea1: [
    {
      id: "t1_01",
      theme: "过度旅游",
      themeEs: "Turismo masivo",
      backgroundText: `Has leído el siguiente artículo en el periódico local de tu ciudad:

"El turismo masivo amenaza la calidad de vida de los residentes

En los últimos años, el número de turistas en nuestra ciudad ha aumentado un 40%. Los vecinos del centro histórico se quejan del ruido, la suciedad y la dificultad para aparcar. Muchos negocios tradicionales han cerrado para dar paso a tiendas de souvenirs y restaurantes para turistas. El precio de los alquileres se ha disparado, lo que obliga a muchas familias a abandonar el barrio donde han vivido toda su vida. Las autoridades municipales estudian medidas para limitar el acceso de visitantes a determinadas zonas."`,
      instructions: [
        "Preséntate e indica dónde vives.",
        "Explica cómo te afecta personalmente el turismo masivo.",
        "Propón al menos dos medidas concretas para mejorar la situación.",
        "Despídete de forma adecuada."
      ],
      recipient: "el director del periódico local (Sr. García)",
      letterType: "carta formal",
      wordCount: "entre 150 y 180 palabras",
      keywords: ["turismo masivo", "calidad de vida", "medidas", "vecinos", "proponer", "limitar", "regular", "centro histórico"],
      grammarPoints: [
        { label: "条件句（表建议）", es: "Condicional para sugerencias", example: "Sería conveniente que se limitara el número de visitantes..." },
        { label: "虚拟式现在时（要求/建议）", es: "Presente de subjuntivo (ruego/sugerencia)", example: "Le pido que tome medidas urgentes para..." },
        { label: "正式信件格式", es: "Fórmulas epistolares formales", example: "Me dirijo a usted para... / En espera de su respuesta, le saluda atentamente..." },
        { label: "连接词（表原因和结果）", es: "Conectores causales y consecutivos", example: "Debido a esto... / Como consecuencia de ello..." }
      ],
      tenses: ["Presente de indicativo", "Pretérito perfecto", "Condicional simple", "Presente de subjuntivo"],
      tip: "信件结构：称呼 → 自我介绍+目的 → 问题描述+个人影响 → 具体建议 → 正式告别"
    },
    {
      id: "t1_02",
      theme: "远程工作政策",
      themeEs: "Teletrabajo",
      backgroundText: `Has visto este anuncio en la web de tu empresa:

"COMUNICADO DE DIRECCIÓN

A partir del próximo mes, la empresa modificará su política de teletrabajo. Los empleados que actualmente trabajan tres días desde casa deberán volver a la oficina cinco días a la semana. La dirección considera que la presencia física favorece la comunicación entre equipos y mejora la productividad. Los empleados con hijos menores de 12 años podrán solicitar una excepción mediante un formulario disponible en Recursos Humanos. El plazo para presentar alegaciones es de 15 días."`,
      instructions: [
        "Explica tu situación personal y cómo te afecta esta medida.",
        "Argumenta los beneficios del teletrabajo tanto para los empleados como para la empresa.",
        "Propón una solución alternativa que sea beneficiosa para ambas partes.",
        "Solicita una reunión para tratar el tema."
      ],
      recipient: "la directora de Recursos Humanos (Sra. Martínez)",
      letterType: "correo electrónico formal",
      wordCount: "entre 150 y 180 palabras",
      keywords: ["teletrabajo", "productividad", "conciliación", "flexibilidad", "proponer", "argumentar", "alternativa", "beneficios"],
      grammarPoints: [
        { label: "虚拟式（间接引语/陈述/建议）", es: "Subjuntivo en oraciones sustantivas", example: "Considero que sería más eficiente que se permitiera..." },
        { label: "条件句（表假设）", es: "Oraciones condicionales", example: "Si se mantuviera el teletrabajo tres días, la productividad mejoraría..." },
        { label: "正式邮件开头结尾", es: "Registro formal de correo electrónico", example: "Me pongo en contacto con usted para... / Quedo a su disposición para..." },
        { label: "关系从句（解释说明）", es: "Oraciones de relativo", example: "...una medida que afecta a todos los empleados que trabajan en remoto." }
      ],
      tenses: ["Presente de indicativo", "Pretérito imperfecto de subjuntivo", "Condicional simple", "Infinitivo"],
      tip: "要展示批判性思维：承认公司的出发点是好的，然后提出有理有据的反驳和替代方案"
    },
    {
      id: "t1_03",
      theme: "社区噪音问题",
      themeEs: "Contaminación acústica",
      backgroundText: `Has leído esta carta de un vecino en el tablón de anuncios de tu edificio:

"Estimados vecinos:

Como muchos ya sabéis, en los últimos meses han abierto tres bares con terraza en nuestra calle. El ruido hasta las 3 de la mañana hace imposible dormir. He hablado con el Ayuntamiento pero me dicen que los locales tienen los permisos en regla. Creo que deberíamos unirnos como vecinos y presentar una queja formal. ¿Hay alguien más interesado en participar? Os espero el sábado a las 11h en el portal.
— Miguel (3ºB)"`,
      instructions: [
        "Explica tu propia experiencia con el problema del ruido.",
        "Muestra tu apoyo a la iniciativa de Miguel y justifica por qué.",
        "Propón acciones adicionales que se podrían tomar.",
        "Confirma tu asistencia a la reunión."
      ],
      recipient: "Miguel (vecino del 3ºB)",
      letterType: "correo electrónico informal",
      wordCount: "entre 150 y 180 palabras",
      keywords: ["ruido", "queja", "vecinos", "derechos", "Ayuntamiento", "apoyar", "proponer", "unirse"],
      grammarPoints: [
        { label: "半正式/非正式信件格式", es: "Registro informal o semiformal", example: "Querido Miguel, / Un abrazo, / Cuídate," },
        { label: "虚拟式（表意愿/情感）", es: "Subjuntivo para expresar voluntad y emoción", example: "Me alegra que hayas tomado la iniciativa... / Espero que podamos conseguir..." },
        { label: "表达同意和支持的连接词", es: "Expresar acuerdo y apoyo", example: "Tienes toda la razón en que... / Comparto totalmente tu opinión sobre..." },
        { label: "将来时（表计划）", es: "Futuro para planes y compromisos", example: "Asistiré a la reunión del sábado y traeré..." }
      ],
      tenses: ["Presente de indicativo", "Pretérito perfecto", "Presente de subjuntivo", "Futuro simple"],
      tip: "注意语域：对邻居可以用半正式口吻，不需要太正式，但也要避免太口语化"
    },
    {
      id: "t1_04",
      theme: "学校政策变化",
      themeEs: "Cambios en la política educativa",
      backgroundText: `Has leído esta noticia en la web del colegio de tu hijo:

"El centro educativo comunica que a partir del próximo curso se suprimirán las clases de música y arte en los últimos cursos de primaria, con el objetivo de dedicar más tiempo a matemáticas y lengua, áreas en las que los alumnos muestran mayores dificultades. Esta medida afectará a unos 200 alumnos de 5º y 6º de primaria. Los padres y madres interesados pueden enviar sus comentarios a la dirección del centro antes del 30 de este mes."`,
      instructions: [
        "Explica tu relación con el centro (padre/madre/tutor) y por qué te preocupa la medida.",
        "Argumenta la importancia de la educación artística para el desarrollo integral del niño.",
        "Propón alternativas que permitan mantener estas asignaturas.",
        "Solicita que se reconsidere la decisión."
      ],
      recipient: "la directora del centro educativo",
      letterType: "carta formal",
      wordCount: "entre 150 y 180 palabras",
      keywords: ["educación artística", "desarrollo integral", "creatividad", "reconsiderar", "alternativas", "preocupación", "argumentar"],
      grammarPoints: [
        { label: "虚拟式现在时（请求重新考虑）", es: "Subjuntivo para pedir que se reconsidering", example: "Les ruego que reconsideren esta decisión antes de..." },
        { label: "虚拟式（表达担忧和情感）", es: "Subjuntivo con verbos de emoción", example: "Me preocupa que esta medida perjudique el desarrollo de los alumnos..." },
        { label: "将来时（预测后果）", es: "Futuro para predecir consecuencias", example: "Si se eliminan estas asignaturas, los alumnos perderán..." },
        { label: "正式信件惯用语", es: "Fórmulas formales epistolares", example: "En espera de una respuesta favorable, reciba un cordial saludo." }
      ],
      tenses: ["Presente de indicativo", "Presente de subjuntivo", "Futuro simple", "Condicional simple"],
      tip: "关键是平衡：既要表达关切，又要提出建设性意见，避免纯粹批评"
    },
    {
      id: "t1_05",
      theme: "健康与工作生活平衡",
      themeEs: "Salud laboral y equilibrio vida-trabajo",
      backgroundText: `Has leído este post en el blog de salud de tu empresa:

"Resultados de la encuesta de bienestar laboral

El 67% de los empleados declara sentirse estresado frecuentemente. El 45% afirma no tener tiempo suficiente para el ejercicio físico. El 38% indica que el trabajo afecta negativamente a su vida familiar. Desde el departamento de Recursos Humanos queremos conocer vuestras propuestas para mejorar el bienestar en el trabajo. Todas las sugerencias serán tenidas en cuenta para el nuevo Plan de Bienestar Laboral 2026."`,
      instructions: [
        "Describe tu situación personal en relación con el estrés laboral.",
        "Analiza las causas principales del estrés en tu entorno de trabajo.",
        "Propón tres medidas concretas que la empresa podría implementar.",
        "Expresa tu disposición a participar en iniciativas de bienestar."
      ],
      recipient: "el departamento de Recursos Humanos",
      letterType: "correo electrónico semiformel",
      wordCount: "entre 150 y 180 palabras",
      keywords: ["bienestar", "estrés laboral", "medidas", "equilibrio", "proponer", "mejorar", "implementar", "conciliación"],
      grammarPoints: [
        { label: "虚拟式（表目的）", es: "Subjuntivo en oraciones finales (para que)", example: "Propongo que se creen espacios de descanso para que los empleados puedan desconectar..." },
        { label: "条件句（表假设和结果）", es: "Oraciones condicionales (si + subjuntivo)", example: "Si se redujeran las horas extra, el nivel de estrés disminuiría..." },
        { label: "表达统计数据", es: "Expresar y comentar datos estadísticos", example: "Según los datos, más de la mitad de los trabajadores... / Las cifras muestran que..." },
        { label: "被动态（描述政策）", es: "Pasiva refleja y pasiva con ser", example: "Se deberían establecer... / Deberían ser implementadas..." }
      ],
      tenses: ["Presente de indicativo", "Pretérito perfecto", "Condicional simple", "Pretérito imperfecto de subjuntivo"],
      tip: "用具体数据和个人经历相结合的方式论证，会使建议更有说服力"
    },
    {
      id: "t1_06",
      theme: "城市绿化与环境",
      themeEs: "Medio ambiente urbano",
      backgroundText: `Has visto esta convocatoria en la web del Ayuntamiento:

"CONVOCATORIA DE PARTICIPACIÓN CIUDADANA

El Ayuntamiento está elaborando el Plan Verde 2027, que incluirá medidas para mejorar los espacios verdes y reducir la contaminación en la ciudad. Queremos conocer la opinión de los ciudadanos: ¿qué medidas son prioritarias? ¿qué cambios notáis en vuestro barrio? Podéis enviar vuestras propuestas y experiencias a participacion@ayuntamiento.es antes del 15 del próximo mes."`,
      instructions: [
        "Preséntate y explica en qué barrio vives.",
        "Describe los problemas ambientales que observas en tu zona.",
        "Propón medidas concretas y realistas para el Plan Verde.",
        "Ofrécete a participar en alguna iniciativa ciudadana."
      ],
      recipient: "el Ayuntamiento (Área de Participación Ciudadana)",
      letterType: "correo electrónico formal",
      wordCount: "entre 150 y 180 palabras",
      keywords: ["contaminación", "espacios verdes", "sostenibilidad", "medidas", "proponer", "ciudadanos", "barrio", "mejora"],
      grammarPoints: [
        { label: "虚拟式（表目的）", es: "Oraciones finales con subjuntivo", example: "Sería fundamental crear más zonas verdes para que los vecinos puedan disfrutar..." },
        { label: "条件句（表假设建议）", es: "Condicional para sugerencias hipotéticas", example: "Sería muy beneficioso que se instalaran más contenedores de reciclaje en..." },
        { label: "正式行政邮件格式", es: "Registro administrativo formal", example: "Me dirijo a ustedes en calidad de ciudadana residente en... / Quedo a su disposición para cualquier consulta." },
        { label: "列举和顺序连接词", es: "Conectores de enumeración y orden", example: "En primer lugar... / Asimismo... / Por último..." }
      ],
      tenses: ["Presente de indicativo", "Condicional simple", "Presente de subjuntivo", "Pretérito imperfecto"],
      tip: "给政府机构写信时，语气要礼貌但坚定，建议要具体可操作"
    }
  ],

  tarea2: {
    opinion: [
      {
        id: "t2_op_01",
        subtype: "opinion",
        subtypeLabel: "议论文 / Artículo de opinión",
        theme: "社交媒体与青少年心理健康",
        themeEs: "Redes sociales y salud mental de los jóvenes",
        prompt: `Escribe un artículo de opinión para una revista juvenil sobre el siguiente tema:

**¿Las redes sociales son más perjudiciales que beneficiosas para la salud mental de los adolescentes?**

Expresa tu opinión de manera clara y justificada.`,
        instructions: [
          "Introduce el tema con una frase impactante o una estadística.",
          "Expón tu opinión principal sobre el impacto de las redes sociales.",
          "Desarrolla al menos dos argumentos con ejemplos concretos.",
          "Reconoce brevemente la postura contraria (contraargumento).",
          "Concluye reafirmando tu posición con una reflexión final."
        ],
        wordCount: "entre 150 y 180 palabras",
        keywords: ["redes sociales", "salud mental", "adicción", "autoestima", "comparación social", "regulación", "beneficios", "perjuicios"],
        grammarPoints: [
          { label: "表达个人观点", es: "Expresar opinión personal", example: "En mi opinión... / Desde mi punto de vista... / Considero que..." },
          { label: "让步转折连接词", es: "Conectores concesivos y adversativos", example: "Aunque hay quienes defienden que... / Si bien es cierto que..., no podemos ignorar que..." },
          { label: "虚拟式（间接引语）", es: "Subjuntivo en oraciones sustantivas", example: "Es fundamental que los jóvenes aprendan a usar las redes de forma responsable." },
          { label: "泛指表达（客观陈述）", es: "Expresiones impersonales y generalizadoras", example: "Se ha demostrado que... / Los estudios indican que... / Es bien sabido que..." }
        ],
        tenses: ["Presente de indicativo", "Pretérito perfecto", "Presente de subjuntivo", "Condicional simple"],
        structure: "引言（1-2句）→ 论点1+例子 → 论点2+例子 → 反驳对立观点 → 结论",
        tip: "议论文要有明确的立场，避免模棱两可；每个论点需要具体例证"
      },
      {
        id: "t2_op_02",
        subtype: "opinion",
        subtypeLabel: "议论文 / Artículo de opinión",
        theme: "人工智能与就业",
        themeEs: "Inteligencia artificial y empleo",
        prompt: `Escribe un artículo de opinión para un periódico digital sobre el siguiente tema:

**La inteligencia artificial: ¿una amenaza para el empleo o una oportunidad de transformación laboral?**

Expresa y defiende tu posición personal.`,
        instructions: [
          "Presenta el debate actual sobre la IA y el mercado laboral.",
          "Define claramente tu postura (amenaza u oportunidad, o posición matizada).",
          "Desarrolla dos o tres argumentos con ejemplos específicos de sectores o empleos.",
          "Menciona las responsabilidades de gobiernos y empresas.",
          "Concluye con una propuesta o reflexión prospectiva."
        ],
        wordCount: "entre 150 y 180 palabras",
        keywords: ["inteligencia artificial", "empleo", "automatización", "reconversión", "habilidades", "transformación", "futuro laboral"],
        grammarPoints: [
          { label: "将来时（预测和推测）", es: "Futuro de predicción e hipótesis", example: "En los próximos años, la IA sustituirá numerosos puestos de trabajo, aunque..." },
          { label: "虚拟式（表必要性）", es: "Subjuntivo con necesidad e impersonales", example: "Es imprescindible que los gobiernos inviertan en programas de reciclaje profesional." },
          { label: "让步从句", es: "Oraciones concesivas (aunque + subjuntivo/indicativo)", example: "Aunque la IA elimine empleos rutinarios, también creará nuevas profesiones..." },
          { label: "添加和对比连接词", es: "Conectores aditivos y contrastivos", example: "Además de esto... / Sin embargo... / No obstante... / Por otro lado..." }
        ],
        tenses: ["Presente de indicativo", "Futuro simple", "Presente de subjuntivo", "Pretérito perfecto"],
        structure: "现象引入 → 观点陈述 → 论据1（威胁角度）→ 论据2（机遇角度）→ 责任归属 → 结论",
        tip: "这类辩证题最好展示你能权衡两面，然后给出有见解的结论"
      },
      {
        id: "t2_op_03",
        subtype: "opinion",
        subtypeLabel: "议论文 / Artículo de opinión",
        theme: "城市化与乡村生活",
        themeEs: "Urbanización vs. vida rural",
        prompt: `Escribe un artículo de opinión para una revista de sociedad sobre:

**¿Deberíamos potenciar la vida en los pueblos como alternativa a las grandes ciudades saturadas?**

Justifica tu posición con argumentos concretos.`,
        instructions: [
          "Contextualiza el problema de la despoblación rural y la saturación urbana.",
          "Expón tu tesis con claridad.",
          "Argumenta a favor de potenciar la vida en los pueblos (o en contra, si prefieres).",
          "Aborda los obstáculos reales y cómo superarlos.",
          "Propón medidas a nivel de políticas públicas y termina con una conclusión motivadora."
        ],
        wordCount: "entre 150 y 180 palabras",
        keywords: ["despoblación", "calidad de vida", "infraestructuras", "teletrabajo", "políticas públicas", "sostenibilidad", "migración", "incentivos"],
        grammarPoints: [
          { label: "条件句（表改革方案）", es: "Condicionales para proponer reformas", example: "Si el gobierno ofreciera incentivos fiscales, más familias considerarían mudarse al campo." },
          { label: "虚拟式（时间从句/结果）", es: "Subjuntivo en oraciones temporales y finales", example: "Cuando se mejoren las conexiones de internet, trabajar desde un pueblo será igual de viable." },
          { label: "对比连接词", es: "Contraste y oposición", example: "Frente a la masificación de las ciudades... / A diferencia de... / En contraste con..." },
          { label: "列举三点论", es: "Enumerar y desarrollar tres argumentos", example: "En primer lugar... / En segundo lugar... / Finalmente..." }
        ],
        tenses: ["Presente de indicativo", "Condicional simple", "Pretérito imperfecto de subjuntivo", "Futuro simple"],
        structure: "问题背景（1-2句）→ 鲜明立场 → 论据1 → 论据2 → 障碍+解决方案 → 结论号召",
        tip: "要提出可操作的具体政策建议，而不只是说'政府应该做点什么'"
      },
      {
        id: "t2_op_04",
        subtype: "opinion",
        subtypeLabel: "议论文 / Artículo de opinión",
        theme: "电影与流媒体",
        themeEs: "Cine en sala vs. plataformas digitales",
        prompt: `Escribe un artículo de opinión para una revista cultural:

**¿El cine en sala tiene futuro frente al auge de las plataformas de streaming?**

Argumenta tu posición de forma reflexiva.`,
        instructions: [
          "Abre con una imagen o anécdota que sitúe al lector.",
          "Expón la situación actual del cine y las plataformas.",
          "Defiende si el cine en sala tiene un valor único o si está condenado a desaparecer.",
          "Aporta al menos dos razones o ejemplos concretos.",
          "Cierra con una reflexión sobre el futuro de la cultura cinematográfica."
        ],
        wordCount: "entre 150 y 180 palabras",
        keywords: ["streaming", "cine", "experiencia", "pantalla grande", "plataformas", "industria cultural", "audiencia", "futuro"],
        grammarPoints: [
          { label: "虚拟式（表怀疑/不确定）", es: "Subjuntivo en expresiones de duda", example: "No creo que el cine vaya a desaparecer, aunque sí cambiará su papel..." },
          { label: "感官描写和比较", es: "Descripción sensorial y comparativas", example: "La experiencia de ver una película en una gran pantalla es muy diferente a verla en casa, ya que..." },
          { label: "将来时（预测）", es: "Futuro para hacer predicciones", example: "El cine coexistirá con las plataformas, pero ocupará un nicho más exclusivo..." },
          { label: "文化议题常用搭配", es: "Vocabulario cultural", example: "valor añadido / obra cinematográfica / experiencia inmersiva / industria audiovisual" }
        ],
        tenses: ["Presente de indicativo", "Futuro simple", "Presente de subjuntivo", "Pretérito indefinido"],
        structure: "开场画面 → 现状概述 → 我的立场 → 论据1 → 论据2 → 未来展望",
        tip: "可以用个人观影经历作为开头，让文章更生动，再过渡到有说服力的论点"
      }
    ],
    narrative: [
      {
        id: "t2_na_01",
        subtype: "narrative",
        subtypeLabel: "叙述文 / Texto narrativo",
        theme: "一次改变了我的旅行",
        themeEs: "Un viaje que me cambió",
        prompt: `Escribe un texto narrativo para un blog de viajes:

**Escribe sobre un viaje o una experiencia en el extranjero (real o imaginaria) que haya cambiado tu forma de ver el mundo.**`,
        instructions: [
          "Sitúa al lector en el momento y lugar del viaje.",
          "Describe qué ocurrió y cómo te hizo sentir.",
          "Explica qué aprendiste o cómo cambió tu perspectiva.",
          "Usa detalles sensoriales y concretos para hacer la narración vívida.",
          "Termina con una reflexión sobre el impacto duradero de esa experiencia."
        ],
        wordCount: "entre 150 y 180 palabras",
        keywords: ["aventura", "descubrimiento", "perspectiva", "cultura", "experiencia", "aprendizaje", "sorprender", "transformar"],
        grammarPoints: [
          { label: "过去不定过去时 vs. 未完成过去时对比", es: "Indefinido vs. Imperfecto narrativo", example: "Cuando llegué a la ciudad (indefinido, acción), las calles estaban llenas de vida (imperfecto, descripción)..." },
          { label: "感官描写词汇", es: "Vocabulario sensorial", example: "El aroma a especias, el bullicio del mercado, la calidez del sol en la piel..." },
          { label: "过去完成时（表先后顺序）", es: "Pretérito pluscuamperfecto (acción anterior)", example: "Nunca había visto tanta diversidad cultural en un mismo lugar." },
          { label: "反思性表达", es: "Expresiones reflexivas y de cambio", example: "A partir de ese momento, empecé a ver las cosas de otra manera... / Aquella experiencia me hizo comprender que..." }
        ],
        tenses: ["Pretérito indefinido", "Pretérito imperfecto", "Pretérito pluscuamperfecto", "Presente de indicativo"],
        structure: "情境设定（时间+地点）→ 主要事件 → 情感/反应 → 转折点 → 结论/反思",
        tip: "叙述文要'show, don't tell'：用具体细节展示情感，而不是直接说'我很感动'"
      },
      {
        id: "t2_na_02",
        subtype: "narrative",
        subtypeLabel: "叙述文 / Texto narrativo",
        theme: "一个令人难忘的错误",
        themeEs: "Un error que nunca olvidaré",
        prompt: `Escribe una entrada de blog personal:

**Cuenta una anécdota en la que cometiste un error significativo y lo que aprendiste de él.**

La historia puede ser real o inventada.`,
        instructions: [
          "Introduce la situación con un arranque llamativo.",
          "Narra los hechos de forma ordenada pero dinámica.",
          "Describe tus pensamientos y sentimientos durante el error.",
          "Explica las consecuencias y cómo lo resolviste.",
          "Termina con la lección aprendida."
        ],
        wordCount: "entre 150 y 180 palabras",
        keywords: ["error", "consecuencias", "lección", "responsabilidad", "solucionar", "aprender", "arrepentirse", "superar"],
        grammarPoints: [
          { label: "过去叙事时态对比", es: "Contraste de tiempos pasados narrativos", example: "Cuando llegué a la reunión (indefinido), me di cuenta de que había olvidado (pluscuamperfecto) todos los documentos." },
          { label: "表达遗憾和后悔", es: "Expresar arrepentimiento", example: "Ojalá hubiera revisado... / Ojalá lo hubiera hecho de otra manera..." },
          { label: "连续动作叙述", es: "Narración de acciones en secuencia", example: "Primero..., luego..., a continuación..., finalmente..." },
          { label: "语气副词和感叹", es: "Adverbios de modo e interjecciones narrativas", example: "De repente... / Para mi sorpresa... / Afortunadamente... / Por suerte..." }
        ],
        tenses: ["Pretérito indefinido", "Pretérito imperfecto", "Pretérito pluscuamperfecto", "Pretérito imperfecto de subjuntivo (ojálá)"],
        structure: "引人入胜的开头 → 背景描述 → 错误发生 → 后果+情感 → 解决/反思",
        tip: "'Ojalá + pluscuamperfecto de subjuntivo' 是B2关键语法，叙述后悔时用它分数会高"
      },
      {
        id: "t2_na_03",
        subtype: "narrative",
        subtypeLabel: "评论文 / Reseña",
        theme: "推荐一本书或一部电影",
        themeEs: "Reseña de un libro o película",
        prompt: `Escribe una reseña para una web cultural:

**Recomienda (o critica) una película, serie o libro que hayas disfrutado (u odiado) recientemente.**

Tu reseña debe convencer al lector para verla o leerla (o para evitarla).`,
        instructions: [
          "Presenta el título, autor/director y género de forma atractiva.",
          "Resume brevemente la trama sin revelar el final (spoilers).",
          "Destaca los aspectos más positivos (o negativos).",
          "Menciona a qué tipo de público le puede gustar.",
          "Cierra con una valoración clara y una recomendación."
        ],
        wordCount: "entre 150 y 180 palabras",
        keywords: ["argumento", "protagonista", "guion", "banda sonora", "género", "recomendar", "valorar", "narración"],
        grammarPoints: [
          { label: "虚拟式（评价性从句）", es: "Subjuntivo en valoraciones", example: "Lo que más me sorprendió fue que el protagonista fuera tan complejo y contradictorio." },
          { label: "评价形容词+比较级", es: "Adjetivos valorativos y comparativos", example: "La fotografía es tan impresionante como el guion / mucho mejor que..." },
          { label: "被动态和非人称结构", es: "Pasiva refleja en crítica cultural", example: "La novela se ambienta en... / Se trata de una historia que..." },
          { label: "直接引语（有时用于点评）", es: "Estilo directo e indirecto", example: "Como afirma el autor: '...' / El director declaró que quería explorar..." }
        ],
        tenses: ["Presente de indicativo", "Pretérito indefinido", "Pretérito imperfecto", "Presente de subjuntivo"],
        structure: "标题+作者+类型介绍 → 简短情节摘要 → 优/缺点分析 → 目标受众 → 推荐评分",
        tip: "不要只写'很好看'，要用具体的场景、角色、情节细节来支撑你的评价"
      }
    ]
  }
};

// 评分维度（官方 DELE B2 标准）
const SCORING_CRITERIA = [
  {
    id: "cumplimiento",
    label: "任务完成度",
    labelEs: "Cumplimiento de la tarea",
    weight: 25,
    description: "是否回应了所有指令要点，内容是否与主题相关，字数是否符合要求",
    levels: {
      excellent: "完整覆盖所有要点，内容紧扣主题，字数达标",
      good: "覆盖大部分要点，轻微偏题或字数略有不足",
      adequate: "只覆盖部分要点，有明显偏题或字数严重不足",
      poor: "几乎未完成任务要求"
    }
  },
  {
    id: "coherencia",
    label: "连贯与衔接",
    labelEs: "Coherencia y cohesión",
    weight: 25,
    description: "段落结构是否清晰，连接词使用是否恰当，逻辑是否顺畅",
    levels: {
      excellent: "结构清晰，连接词丰富且恰当，读来流畅自然",
      good: "整体连贯，偶有连接词缺失或使用不当",
      adequate: "连贯性一般，多处缺乏过渡或逻辑跳跃",
      poor: "结构混乱，难以跟随逻辑"
    }
  },
  {
    id: "lexico",
    label: "词汇丰富度",
    labelEs: "Riqueza léxica",
    weight: 25,
    description: "词汇量是否丰富，用词是否精准，是否避免了重复",
    levels: {
      excellent: "词汇丰富且精准，充分展现B2+水平，无明显重复",
      good: "词汇较丰富，偶有用词不够精准或重复",
      adequate: "词汇较贫乏，多处重复，明显低于B2要求",
      poor: "词汇非常有限，大量重复"
    }
  },
  {
    id: "gramatica",
    label: "语法正确性与多样性",
    labelEs: "Corrección y variedad gramatical",
    weight: 25,
    description: "语法是否正确，是否使用了多样的句式和时态",
    levels: {
      excellent: "语法几乎无误，句式多样，时态使用准确且有变化",
      good: "少量语法错误，句式有一定变化",
      adequate: "语法错误较多，句式单一，时态使用有明显问题",
      poor: "语法错误严重，影响理解"
    }
  }
];

// 各任务类型的评分提示词模板
function buildScoringPrompt(taskType, taskData, userText) {
  const criteriaText = SCORING_CRITERIA.map(c => 
    `- **${c.label}**（${c.labelEs}）：${c.description}`
  ).join('\n');

  const taskContext = taskType === 'tarea1' 
    ? `这是DELE B2写作任务1（Tarea 1：Expresión e interacción escritas）：
背景材料：${taskData.backgroundText}
写作要求：
${taskData.instructions.map((ins, i) => `${i+1}. ${ins}`).join('\n')}
信件类型：${taskData.letterType}
收信人：${taskData.recipient}
字数要求：${taskData.wordCount}`
    : `这是DELE B2写作任务2（Tarea 2：Expresión escrita）：
题目类型：${taskData.subtypeLabel}
写作主题：${taskData.themeEs}
题目说明：${taskData.prompt}
写作要求：
${taskData.instructions.map((ins, i) => `${i+1}. ${ins}`).join('\n')}
字数要求：${taskData.wordCount}`;

  return `你是一位专业的DELE B2西班牙语写作考试评分老师，精通塞万提斯学院官方评分标准。请对以下学生作文进行详细批改并提供满分范文。

## 题目信息
${taskContext}

## 学生作文
${userText}

## 评分标准（官方DELE B2标准，每项满分25分，共100分）
${criteriaText}

## 输出要求
请严格按以下格式输出，每个标题和段落都要有，西语内容保留西语：

### 📊 综合评分
| 评分维度 | 分数(/25) | 简评 |
|---------|----------|------|
| 任务完成度 | X/25 | 一句具体评价 |
| 连贯与衔接 | X/25 | 一句具体评价 |
| 词汇丰富度 | X/25 | 一句具体评价 |
| 语法正确性 | X/25 | 一句具体评价 |
| **总分** | **X/100** | |

### ✅ 亮点（2-3条）
列出写得好的地方，直接引用原文句子举例。

### 🔧 需要改进（3-5条）
每条格式：
**问题**：引用原文句子
**说明**：错误类型（语法/词汇/逻辑/格式）及原因
**修改**：给出改写后的西语句子

### 📝 字数与格式评估
说明字数是否符合要求（${taskData.wordCount}），格式是否完整。

### 🏆 满分范文（B2水平示范）
用西班牙语写一篇针对本题的满分示范作文，字数严格控制在${taskData.wordCount}范围内。范文应展示B2水平的词汇多样性、语法复杂性和文体规范，完整覆盖所有写作要求。在范文结束后，用中文简要标注范文中使用的2-3个亮点语法结构。`;
}

// 工具函数
function getRandomTopic(type, subtype) {
  if (type === 'tarea1') {
    const topics = WRITING_TOPICS.tarea1;
    return topics[Math.floor(Math.random() * topics.length)];
  } else if (type === 'tarea2') {
    const pool = subtype === 'opinion' 
      ? WRITING_TOPICS.tarea2.opinion 
      : WRITING_TOPICS.tarea2.narrative;
    return pool[Math.floor(Math.random() * pool.length)];
  }
}

function getAllTarea2Topics() {
  return [
    ...WRITING_TOPICS.tarea2.opinion,
    ...WRITING_TOPICS.tarea2.narrative
  ];
}
