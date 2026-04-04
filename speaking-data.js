// 口语挑战话题 - 每天一个场景，包含参考口语和互动练习
// 类型: daily - 日常对话, b2_describe - B2描述题, b2_opinion - B2观点题, b2_compare - B2比较题
const speakingChallenges = [
    {
        topic: "🌅 场景1：早晨起床后的日常",
        hint: "despertarse, levantarse, ducharse, desayunar, prisa, temprano",
        sample: "Me despierto a las siete de la mañana cuando suena el despertador. Primero me quedo en la cama unos minutos pensando en el día que me espera. Luego me levanto y voy directo al baño a lavarme la cara. Me ducho con agua tibia porque me gusta empezar el día fresco y despejado. Después me cepillo los dientes y me afeito la barba con cuidado. Me visto rápidamente porque siempre tengo prisa por la mañana. Desayuno café con tostadas mientras reviso las noticias en el móvil. A las ocho menos cuarto salgo de casa para ir al trabajo. Normalmente voy andando hasta la parada del autobús que está a dos calles.",
        exercises: [
            { zh: "我七点起床", es: "Me despierto a las siete", hint: "despertarse" },
            { zh: "我先去洗澡", es: "Primero me ducho", hint: "ducharse" },
            { zh: "我喜欢用温水洗澡", es: "Me ducho con agua tibia", hint: "agua tibia" },
            { zh: "我吃早餐", es: "Desayuno", hint: "desayunar" },
            { zh: "我总是很匆忙", es: "Siempre tengo prisa", hint: "tener prisa" }
        ]
    },
    {
        topic: "☕ 场景2：在咖啡厅点咖啡",
        hint: "café, cortado, solo, con leche, azúcar, para llevar, terraza",
        sample: "Buenos días. Buenos días, ¿qué van a tomar? Me pone un café cortado, por favor. ¿Lo quiere con azúcar? No, sin azúcar, gracias. ¿Para tomar aquí o para llevar? Para tomar en la terraza, si hay sitio. Claro, ahora se lo llevo. ¿Me puede traer también un croissant de mantequilla? Sí, enseguida se lo traigo. ¿Algo más para acompañar? Sí, un vaso de agua fresca, por favor. Son cuatro euros con cincuenta en total. Aquí tiene cinco euros. Gracias, le devuelvo cincuenta céntimos. Que aproveche mucho.",
        exercises: [
            { zh: "我要一杯咖啡", es: "Me pone un café", hint: "poner" },
            { zh: "不加糖", es: "Sin azúcar", hint: "azúcar" },
            { zh: "在这里喝", es: "Para tomar aquí", hint: "tomar aquí" },
            { zh: "外带", es: "Para llevar", hint: "para llevar" },
            { zh: "请给我一个牛角包", es: "Me puede traer un croissant", hint: "traer" }
        ]
    },
    {
        topic: "🛒 场景3：在超市购物",
        hint: "supermercado, lista, fruta, verdura, carne, pescado, oferta, carrito",
        sample: "Voy al supermercado a comprar lo de la semana para la casa. Necesito fruta fresca: manzanas, plátanos y naranjas para hacer zumo natural. En la sección de verduras cojo tomates, lechuga y pimientos para la ensalada de cada día. La carne de pollo está en oferta especial, me llevo dos paquetes para congelar. ¿Dónde está el arroz? Ah, en el pasillo tres, junto a las legumbres y pasta. También necesito leche, huevos y yogures para los desayunos. Voy a coger un helado de chocolate de postre para el fin de semana. En la caja me dicen que hoy hay descuento del veinte por ciento en el pan. Perfecto, me llevo una barra de pan recién hecho.",
        exercises: [
            { zh: "我去超市买东西", es: "Voy al supermercado a comprar", hint: "supermercado" },
            { zh: "我需要新鲜水果", es: "Necesito fruta fresca", hint: "fruta fresca" },
            { zh: "鸡肉在打折", es: "La carne de pollo está en oferta", hint: "estar en oferta" },
            { zh: "在过道三", es: "En el pasillo tres", hint: "pasillo" },
            { zh: "我要冷冻起来", es: "Para congelar", hint: "congelar" }
        ]
    },
    {
        topic: "🍽️ 场景4：邀请朋友来家里吃饭",
        hint: "invitar, cenar, cocinar, receta, postre, traer, vino, preparar",
        sample: "¿Te apetece venir a cenar a casa el sábado por la noche? Me encantaría, gracias por invitarme, eres muy amable. ¿Qué vamos a comer? Tengo mucha curiosidad. Voy a preparar paella de marisco, es mi especialidad y sale muy buena. ¡Qué bien, me encanta la paella española! ¿Puedo traer algo para ayudar? Sí, si quieres trae un postre dulce o una botella de vino tinto. Perfecto, llevaré tarta de queso que hace mi madre, es deliciosa. ¿A qué hora quedamos entonces? Sobre las nueve de la noche, ¿te viene bien? Vale, llegaré un poco antes para ayudarte con los preparativos. Genial, así podemos tomar una copa de vino antes de cenar juntos.",
        exercises: [
            { zh: "你想来我家吃晚饭吗", es: "¿Te apetece venir a cenar a casa?", hint: "apetecer" },
            { zh: "我要做海鲜饭", es: "Voy a preparar paella de marisco", hint: "preparar" },
            { zh: "谢谢你的邀请", es: "Gracias por invitarme", hint: "invitar" },
            { zh: "我带一瓶红酒", es: "Llevaré una botella de vino", hint: "llevar" },
            { zh: "我们可以喝一杯", es: "Podemos tomar una copa", hint: "tomar una copa" }
        ]
    },
    {
        topic: "📞 场景5：打电话预约医生",
        hint: "cita, médico, dolor, resfriado, fiebre, urgencia, mañana, tarde",
        sample: "Buenos días, querría pedir cita con el doctor García para hoy o mañana. ¿Es para algo urgente que no puede esperar? Tengo dolor de cabeza muy fuerte y fiebre alta desde ayer por la tarde. Entiendo, parece que tiene un resfriado fuerte o quizás gripe. ¿Le viene bien mañana por la mañana a primera hora? Sí, perfecto, ¿a qué hora sería exactamente? A las diez de la mañana en punto, consulta número tres, no llegue tarde. Vale, allí estaré con todos mis síntomas anotados. Lleve la tarjeta sanitaria y el historial médico si lo tiene a mano. Gracias por su ayuda, hasta mañana entonces. Hasta mañana, que se mejore y descanse mucho hoy.",
        exercises: [
            { zh: "我想预约医生", es: "Querría pedir cita con el médico", hint: "pedir cita" },
            { zh: "我头疼", es: "Tengo dolor de cabeza", hint: "dolor de cabeza" },
            { zh: "从昨天开始", es: "Desde ayer", hint: "desde" },
            { zh: "明天上午可以吗", es: "¿Le viene bien mañana por la mañana?", hint: "venir bien" },
            { zh: "请带上医保卡", es: "Lleve la tarjeta sanitaria", hint: "tarjeta sanitaria" }
        ]
    },
    {
        topic: "🚇 场景6：在地铁里问路",
        hint: "metro, línea, estación, correspondencia, dirección, bajar, salida",
        sample: "Disculpe, ¿cómo llego a la estación de Atocha desde aquí? Tome la línea uno dirección Valdecarros, es la más rápida. ¿Debo hacer transbordo en alguna estación intermedia? No, es directo, no tiene que cambiar de tren en ningún sitio. ¿Cuántas paradas son hasta llegar a mi destino? Son cuatro paradas en total, unos diez minutos. Baje en la tercera parada y allí está Atocha justo al salir. Muchas gracias por su ayuda, es mi primera vez en Madrid. De nada, que tenga buen día y no se pierda por la ciudad. ¿Y esta línea va también al aeropuerto directamente? No, para el aeropuerto tiene que tomar la línea ocho en la próxima estación allí.",
        exercises: [
            { zh: "我怎么去阿托查车站", es: "¿Cómo llego a la estación de Atocha?", hint: "llegar" },
            { zh: "坐一号线", es: "Tome la línea uno", hint: "línea" },
            { zh: "需要换乘吗", es: "¿Debo hacer transbordo?", hint: "transbordo" },
            { zh: "在第三站下车", es: "Baje en la tercera parada", hint: "bajar" },
            { zh: "不用换车", es: "No tiene que cambiar", hint: "cambiar" }
        ]
    },
    {
        topic: "🏋️ 场景7：在健身房",
        hint: "gimnasio, ejercicio, máquina, pesas, entrenar, sudar, ducha",
        sample: "Voy al gimnasio tres veces por semana para mantenerme en forma y saludable. Primero hago cardio en la cinta durante veinte minutos para calentar bien el cuerpo. Luego uso las máquinas para trabajar los brazos y las piernas con peso moderado. A veces levanto pesas libres en la zona de musculación con ayuda del entrenador. Termino con abdominales y estiramientos para evitar lesiones musculares. Después me ducho con agua fría y me voy a casa contento. Me siento muy bien después de entrenar, tengo mucha energía durante todo el día. El entrenador me ha recomendado hacer más ejercicio cardiovascular para la resistencia.",
        exercises: [
            { zh: "我每周去三次健身房", es: "Voy al gimnasio tres veces por semana", hint: "tres veces por semana" },
            { zh: "我先做有氧运动", es: "Primero hago cardio", hint: "cardio" },
            { zh: "举重", es: "Levanto pesas", hint: "levantar pesas" },
            { zh: "锻炼后我感觉很好", es: "Me siento muy bien después de entrenar", hint: "sentirse" },
            { zh: "为了保持健康", es: "Para mantenerme en forma", hint: "mantenerse en forma" }
        ]
    },
    {
        topic: "🎬 场景8：谈论昨晚看的电影",
        hint: "película, cine, actor, argumento, aburrido, emocionante, recomendar",
        sample: "¿Has visto la película que dieron anoche en la televisión nacional? Sí, la vi hasta el final aunque estaba cansado. ¿Qué te pareció en general la película? La verdad es que me aburrió un poco durante algunas partes lentas. El argumento era muy predecible y los actores no me convencieron del todo en sus papeles. Yo pensaba que sería mucho mejor por las críticas que había leído antes. ¿Tú la recomendarías a otros amigos? No mucho, hay mejores opciones en ese género cinematográfico. A mí me gustan más las películas de acción con más ritmo y efectos especiales. ¿Has visto alguna buena últimamente que me recomiendes? Sí, te recomiendo la última de Almodóvar, es excelente y emotiva.",
        exercises: [
            { zh: "你觉得怎么样", es: "¿Qué te pareció?", hint: "parecer" },
            { zh: "我觉得有点无聊", es: "Me aburrió un poco", hint: "aburrir" },
            { zh: "剧情很老套", es: "El argumento era predecible", hint: "argumento" },
            { zh: "你推荐吗", es: "¿La recomendarías?", hint: "recomendar" },
            { zh: "我更喜欢动作片", es: "Me gustan más las películas de acción", hint: "gustar más" }
        ]
    },
    {
        topic: "🌧️ 场景9：谈论天气",
        hint: "lluvia, sol, frío, calor, paraguas, temperatura, primavera, otoño",
        sample: "¡Qué día más gris hace hoy en la ciudad! Sí, parece que va a llover en cualquier momento del día. ¿Llevas paraguas contigo en el bolso? No, se me ha olvidado en casa otra vez como siempre. Deberías comprar uno pequeño, está a punto de llover según el pronóstico. Tienes razón, el cielo está muy negro y hay nubes oscuras. Odio los días de lluvia, me ponen de mal humor y melancolía. A mí no me molesta tanto, me gusta el olor a tierra mojada después. ¿Qué temperatura hace ahora mismo? Unos quince grados centígrados, no hace mucho frío todavía. Por suerte, mañana dice que hará sol y subirán las temperaturas.",
        exercises: [
            { zh: "今天天气真阴沉", es: "Qué día más gris hace hoy", hint: "gris" },
            { zh: "好像要下雨了", es: "Parece que va a llover", hint: "parecer" },
            { zh: "我忘带伞了", es: "Se me ha olvidado el paraguas", hint: "olvidarse" },
            { zh: "你带伞了吗", es: "¿Llevas paraguas?", hint: "llevar" },
            { zh: "明天会出太阳", es: "Mañana hará sol", hint: "hacer sol" }
        ]
    },
    {
        topic: "👔 场景10：面试工作",
        hint: "entrevista, currículum, experiencia, cualidades, salario, disponibilidad, incorporación",
        sample: "Buenos días, pase y siéntese, por favor, cómodamente. Gracias por recibirme en su oficina hoy. Traigo mi currículum actualizado con toda mi información reciente. Perfecto, lo revisaré detenidamente en unos momentos. Cuénteme sobre su experiencia laboral anterior en otros trabajos. He trabajado cinco años en marketing digital en una multinacional importante. Muy bien, ¿qué cualidades cree que puede aportar a nuestro equipo de trabajo? Soy muy organizado y me gusta trabajar en equipo con otros compañeros. Excelente cualidad. ¿Cuándo podría incorporarse si le contratamos para el puesto? En dos semanas como máximo, si es necesario antes lo puedo hacer. Bien, hablemos ahora del salario y los beneficios sociales de la empresa.",
        exercises: [
            { zh: "请进坐", es: "Pase y siéntese", hint: "pasar, sentarse" },
            { zh: "我带了简历", es: "Traigo mi currículum", hint: "traer" },
            { zh: "我在跨国公司工作了五年", es: "He trabajado cinco años en una multinacional", hint: "multinacional" },
            { zh: "我两周后可以入职", es: "En dos semanas podría incorporarme", hint: "incorporarse" },
            { zh: "谈谈薪资", es: "Hablemos del salario", hint: "salario" }
        ]
    },
    {
        topic: "✈️ 场景11：在机场办理登机",
        hint: "vuelo, billete, pasaporte, equipaje, facturar, puerta, embarque, asiento",
        sample: "Buenos días, mi vuelo es el tres cero cinco con destino a París. ¿Tiene el billete y el pasaporte en regla? Sí, aquí los tiene, son documentos válidos. ¿Va a facturar alguna maleta en bodega? Sí, esta de aquí y la otra maleta grande también. Tiene exceso de peso de cinco kilos, tiene que pagar treinta euros más. De acuerdo, no hay problema, aquí está mi tarjeta de crédito. Pase a dejarlas en la cinta de equipajes de allí al fondo. Su vuelo embarca en la puerta doce a las diez y media. Muchas gracias por su atención. ¿Puedo llevar este equipaje de mano pequeño? Sí, ese está bien dentro del límite permitido. Que tenga un buen vuelo y buen viaje.",
        exercises: [
            { zh: "我的航班是305", es: "Mi vuelo es el tres cero cinco", hint: "vuelo" },
            { zh: "我要托运行李", es: "Voy a facturar maleta", hint: "facturar" },
            { zh: "超重了", es: "Tiene exceso de peso", hint: "exceso de peso" },
            { zh: "在12号登机口", es: "En la puerta doce", hint: "puerta" },
            { zh: "手提行李", es: "Equipaje de mano", hint: "equipaje de mano" }
        ]
    },
    {
        topic: "🏠 场景12：描述你的家",
        hint: "piso, habitaciones, salón, cocina, balcón, luminoso, cómodo, vecinos",
        sample: "Vivo en un piso de tres habitaciones en el centro de la ciudad desde hace años. El salón es muy luminoso porque da al sur y tiene ventanas grandes que dan a la calle. La cocina es pequeña pero funcional, tiene todo lo necesario para cocinar bien. Tenemos un balcón donde desayunamos en verano cuando hace buen tiempo y sol. Los vecinos son tranquilos y respetuosos, casi no se les oye por las noches. El edificio tiene ascensor moderno y portero automático de seguridad. Me gusta mucho mi casa porque es muy acogedora y está bien comunicada con transporte público. El alquiler es caro pero vale la pena por la ubicación céntrica y los servicios.",
        exercises: [
            { zh: "我住在市中心", es: "Vivo en el centro de la ciudad", hint: "centro" },
            { zh: "客厅很明亮", es: "El salón es muy luminoso", hint: "luminoso" },
            { zh: "朝南", es: "Da al sur", hint: "dar al sur" },
            { zh: "邻居很安静", es: "Los vecinos son tranquilos", hint: "vecinos" },
            { zh: "虽然贵但值得", es: "Es caro pero vale la pena", hint: "vale la pena" }
        ]
    },
    {
        topic: "📚 场景13：在图书馆",
        hint: "biblioteca, libro, préstamo, devolver, silencio, estudiar, mesa, ordenador",
        sample: "Voy a la biblioteca municipal a estudiar porque en casa me distraigo con el móvil y la televisión. Necesito un sitio con silencio absoluto para concentrarme en los exámenes finales. A veces cojo libros en préstamo para investigar temas de mis trabajos universitarios. Tengo que devolverlos en quince días o me ponen una multa por retraso. También uso los ordenadores públicos para buscar información en internet de fuentes fiables. Es un buen sitio para estudiar porque el ambiente es muy tranquilo y hay poco ruido. Hay salas de estudio individual y también mesas grandes para grupos de estudiantes. Los fines de semana está muy llena de estudiantes preparando exámenes.",
        exercises: [
            { zh: "我去图书馆学习", es: "Voy a la biblioteca a estudiar", hint: "biblioteca" },
            { zh: "在家我会分心", es: "En casa me distraigo", hint: "distraerse" },
            { zh: "借书", es: "Cojo libros en préstamo", hint: "préstamo" },
            { zh: "十五天内归还", es: "Devolverlos en quince días", hint: "devolver" },
            { zh: "氛围很安静", es: "El ambiente es tranquilo", hint: "ambiente" }
        ]
    },
    {
        topic: "🎂 场景14：生日派对",
        hint: "cumpleaños, fiesta, regalo, pastel, velas, soplar, celebrar, invitados",
        sample: "¡Feliz cumpleaños! Muchas felicidades en tu día especial. Pasa y siéntate con nosotros, te estábamos esperando. Muchas gracias por venir a celebrarlo conmigo, me hace mucha ilusión. Te he traído este regalo envuelto, espero que te guste mucho. ¡Qué detalle más bonito y elegante! Muchas gracias de corazón. ¿Quieres que abra la caja ahora delante de todos? Sí, por favor, a ver si te gusta lo que he elegido. Me encanta, justo lo que quería, muchísimas gracias de verdad. Vamos a cantarte las mañanitas y a soplar las velas del pastel juntos. Espera un momento, primero tengo que pedir un deseo en secreto. ¡Que cumplas muchos más años felices! Brindemos todos por el cumpleañero.",
        exercises: [
            { zh: "生日快乐", es: "Feliz cumpleaños", hint: "cumpleaños" },
            { zh: "我给你带了礼物", es: "Te he traído este regalo", hint: "regalo" },
            { zh: "正是我想要的", es: "Justo lo que quería", hint: "justo" },
            { zh: "吹蜡烛", es: "Soplar las velas", hint: "velas" },
            { zh: "许个愿", es: "Pedir un deseo", hint: "deseo" }
        ]
    },
    {
        topic: "🚗 场景15：谈论交通工具",
        hint: "coche, autobús, bicicleta, conducir, aparcar, atasco, transporte público",
        sample: "¿Cómo vas normalmente al trabajo cada día? Normalmente voy en autobús porque es más barato y práctico. ¿No tienes coche propio para desplazarte? Sí, lo tengo, pero aparcar en el centro es imposible y muy caro cada día. Y además hay mucho tráfico por la mañana, siempre hay atascos largos en las horas pico. Tienes toda la razón, el transporte público es más práctico en la ciudad grande. Además, es más ecológico y no contamina tanto el aire que respiramos. Totalmente de acuerdo contigo, y puedo leer durante el viaje en el bus. Yo en cambio prefiero ir en bicicleta cuando hace buen tiempo y no llueve.",
        exercises: [
            { zh: "我坐公交上班", es: "Voy en autobús al trabajo", hint: "autobús" },
            { zh: "市中心停车很难", es: "Aparcar en el centro es imposible", hint: "aparcar" },
            { zh: "早上堵车", es: "Hay mucho tráfico por la mañana", hint: "tráfico" },
            { zh: "更环保", es: "Es más ecológico", hint: "ecológico" },
            { zh: "我同意", es: "Totalmente de acuerdo", hint: "de acuerdo" }
        ]
    },
    {
        topic: "🍕 场景16：点外卖",
        hint: "pedir, domicilio, pizza, hamburguesa, repartidor, dirección, teléfono, pago",
        sample: "¿Te apetece pedir comida a domicilio esta noche para cenar? Sí, no tengo ganas de cocinar nada hoy, estoy cansado. ¿Qué te gustaría comer, pizza o hamburguesa? Pizza, por favor, con pepperoni y champiñones que me encantan. Vale, llamo yo al restaurante que está cerca. Buenos días, quiero pedir una pizza mediana de pepperoni para llevar. ¿A qué dirección la llevamos? Calle Alcalá, número cincuenta, segundo derecha, timbre tres. Son quince euros con noventa céntimos en total. Pago en efectivo cuando llegue el repartidor a la puerta. Perfecto, llegará en unos treinta minutos aproximadamente. Gracias por la rapidez, hasta luego.",
        exercises: [
            { zh: "我不想做饭", es: "No tengo ganas de cocinar", hint: "tener ganas" },
            { zh: "点外卖", es: "Pedir comida a domicilio", hint: "a domicilio" },
            { zh: "中号披萨", es: "Una pizza mediana", hint: "mediano" },
            { zh: "现金支付", es: "Pago en efectivo", hint: "efectivo" },
            { zh: "大约30分钟", es: "En unos treinta minutos", hint: "unos" }
        ]
    },
    {
        topic: "💼 场景17：抱怨服务质量",
        hint: "queja, servicio, atención, reclamar, insatisfacción, solución, manager, compensación",
        sample: "Disculpe, quisiera hacer una queja formal sobre el servicio recibido. ¿Qué ha pasado exactamente? Cuénteme todos los detalles. Hemos esperado más de cuarenta minutos y la comida todavía no llega a nuestra mesa. El servicio ha sido muy lento y la atención del camarero bastante fría y desagradable. Lo siento mucho, se nos ha hecho tarde en la cocina con los pedidos. Esto no es aceptable, estamos muy insatisfechos con la experiencia. ¿Puedo hablar con el encargado o el manager del restaurante? Claro, ahora lo llamo enseguida para que hable con usted. Queremos ofrecerle un descuento del veinte por ciento como compensación por las molestias. Eso está mejor, pero espero que mejoren el servicio para la próxima vez que vengamos.",
        exercises: [
            { zh: "我要投诉", es: "Quisiera hacer una queja", hint: "queja" },
            { zh: "服务太慢了", es: "El servicio ha sido muy lento", hint: "servicio" },
            { zh: "我们很不满意", es: "Estamos muy insatisfechos", hint: "insatisfecho" },
            { zh: "我要找经理", es: "Quiero hablar con el manager", hint: "manager" },
            { zh: "作为补偿", es: "Como compensación", hint: "compensación" }
        ]
    },
    {
        topic: "🏥 场景18：在药店买药",
        hint: "farmacia, receta, pastillas, jarabe, dosis, síntomas, alergia, genérico",
        sample: "Buenos días, tengo esta receta del médico para que me la preparen. Un momento, se la preparo enseguida con los medicamentos indicados. ¿Tiene alergia a algún medicamento que yo sepa? No, que yo sepa, no soy alérgico a nada. Tome una pastilla cada ocho horas durante cinco días seguidos. ¿Tiene que ser de marca o vale el genérico más barato? El genérico es más barato y es igual de efectivo que el original. ¿Tiene algo también para el dolor de cabeza que me molesta? Sí, este jarabe es muy efectivo para los resfriados y dolores. ¿Cuáles son los síntomas principales que tiene ahora? Tengo tos seca y me duele mucho la garganta al tragar.",
        exercises: [
            { zh: "我有医生处方", es: "Tengo esta receta del médico", hint: "receta" },
            { zh: "你对药物过敏吗", es: "¿Tiene alergia a algún medicamento?", hint: "alergia" },
            { zh: "每8小时一片", es: "Una pastilla cada ocho horas", hint: "pastilla" },
            { zh: "仿制药更便宜", es: "El genérico es más barato", hint: "genérico" },
            { zh: "我咳嗽嗓子疼", es: "Tengo tos y me duele la garganta", hint: "tos, garganta" }
        ]
    },
    {
        topic: "🎓 场景19：谈论学习经历",
        hint: "universidad, carrera, asignatura, examen, aprobar, suspender, titulación, prácticas",
        sample: "¿Qué estudiaste en la universidad hace años? Estudié la carrera de Derecho en la Universidad de Madrid. ¿Te gustaban todas las asignaturas que tenías? Algunas eran interesantes como Derecho Penal, pero otras eran muy aburridas y teóricas. ¿Te costó mucho aprobar los exámenes finales? Los exámenes finales fueron difíciles, pero al final lo conseguí con esfuerzo. ¿Suspendiste alguna vez alguna materia? Sí, una vez suspendí Derecho Civil pero lo recuperé en septiembre. ¿Hiciste prácticas en algún sitio de abogados? Sí, en un bufete de abogados durante seis meses muy intensos. ¿Ya tienes la titulación oficial? Sí, me gradué el año pasado con buena nota media.",
        exercises: [
            { zh: "我学法律", es: "Estudié la carrera de Derecho", hint: "carrera" },
            { zh: "有的课很有趣", es: "Algunas eran interesantes", hint: "algunas" },
            { zh: "考试很难", es: "Los exámenes fueron difíciles", hint: "examen" },
            { zh: "我挂科了", es: "Suspendí", hint: "suspender" },
            { zh: "我在律师事务所实习", es: "Hice prácticas en un bufete", hint: "prácticas" }
        ]
    },
    {
        topic: "🌴 场景20：计划假期",
        hint: "vacaciones, playa, montaña, reservar, hotel, vuelo, equipaje, guía",
        sample: "¿Ya tienes planeadas las vacaciones de verano para este año? Sí, voy a la Costa Brava con toda mi familia en julio. ¿Has reservado ya el hotel o apartamento? Sí, un apartamento cerca de la playa con piscina comunitaria. ¿Vais en coche particular o en avión? Iremos en coche, son solo cuatro horas desde Barcelona hasta allí. Suena genial, me encanta esa zona del Mediterráneo. Sí, tengo muchas ganas de descansar y tomar el sol en la playa. ¿Llevaréis mucho equipaje para tanto tiempo? Sí, somos cuatro personas con maletas grandes para quince días. ¿Has mirado algún restaurante recomendado por internet? Sí, he comprado una guía de la zona con buenas recomendaciones.",
        exercises: [
            { zh: "你计划好假期了吗", es: "¿Tienes planeadas las vacaciones?", hint: "planear" },
            { zh: "我预订了酒店", es: "He reservado el hotel", hint: "reservar" },
            { zh: "开车去四小时", es: "Son cuatro horas en coche", hint: "en coche" },
            { zh: "我想休息晒太阳", es: "Tengo ganas de descansar y tomar el sol", hint: "tomar el sol" },
            { zh: "我买了旅游指南", es: "He comprado una guía", hint: "guía" }
        ]
    },
    {
        topic: "🐕 场景21：谈论宠物",
        hint: "perro, gato, mascota, pasear, veterinario, comida, cuidar, compañía",
        sample: "¿Tienes alguna mascota en casa actualmente? Sí, tengo un perro que se llama Max y tiene tres años. ¿Qué raza es exactamente? Es un labrador retriever, es muy cariñoso y juguetón con todos. ¿Lo sacas a pasear mucho por el barrio? Sí, lo saco tres veces al día por el parque cercano a casa. Debe ser mucho trabajo cuidar de un perro todos los días. Sí, pero me da mucha compañía y alegría en casa cuando estoy solo. ¿Va alguna vez al veterinario para revisiones? Sí, cada año para las vacunas y revisiones generales de salud. ¿Come pienso industrial o comida casera preparada? Come pienso especial para razas grandes de buena calidad. Los animales son geniales, yo prefiero los gatos porque son más independientes y limpios.",
        exercises: [
            { zh: "你有宠物吗", es: "¿Tienes alguna mascota?", hint: "mascota" },
            { zh: "它是拉布拉多", es: "Es un labrador", hint: "labrador" },
            { zh: "我每天遛三次", es: "Lo saco tres veces al día", hint: "sacar" },
            { zh: "它给我很多陪伴", es: "Me da mucha compañía", hint: "compañía" },
            { zh: "每年去兽医那里", es: "Cada año al veterinario", hint: "veterinario" }
        ]
    },
    {
        topic: "📱 场景22：手机出问题",
        hint: "móvil, pantalla, roto, batería, cargar, arreglar, garantía, técnico",
        sample: "Se me ha roto la pantalla del móvil, se me cayó ayer al suelo. ¿Todavía funciona bien a pesar de las grietas? Sí, pero es difícil ver bien por las grietas que cubren toda la pantalla. ¿Lo has llevado ya a arreglar a alguna tienda? Voy a llevarlo mañana a una tienda de reparaciones del centro. ¿Está todavía en garantía del fabricante? No, lo compré hace dos años así que ya no cubre la garantía. Va a ser caro entonces arreglarlo en una tienda oficial. Lo sé, pero no tengo otra opción, necesito el teléfono para trabajar. ¿Cuánto cuesta aproximadamente la reparación? Me han dicho que unos cien euros más o menos dependiendo del daño. Mientras tanto, ¿tienes otro móvil para usar temporalmente? Sí, tengo uno viejo que puedo usar hasta que arreglen el principal.",
        exercises: [
            { zh: "我手机屏幕碎了", es: "Se me ha roto la pantalla", hint: "pantalla" },
            { zh: "昨天摔了", es: "Se me cayó ayer", hint: "caerse" },
            { zh: "还在保修期内吗", es: "¿Está en garantía?", hint: "garantía" },
            { zh: "我两年前买的", es: "Lo compré hace dos años", hint: "hace" },
            { zh: "修理要100欧", es: "Unos cien euros", hint: "unos" }
        ]
    },
    {
        topic: "🎵 场景23：谈论音乐",
        hint: "música, canción, cantante, grupo, concierto, escuchar, playlist, Spotify",
        sample: "¿Qué tipo de música te gusta escuchar normalmente? Me gusta casi de todo, pero sobre todo pop y rock internacional. ¿Tienes algún cantante favorito que sigas? Me encanta Shakira, tiene una voz increíble y muy característica. ¿Has ido a algún concierto recientemente por aquí? Sí, fui a ver a Coldplay el mes pasado en el estadio olímpico. ¡Qué envidia! Me hubiera gustado ir yo también a ese concierto. ¿Fue bueno el concierto en vivo? Fue increíble, el mejor concierto de mi vida sin duda alguna. ¿Usas Spotify para escuchar música en streaming? Sí, tengo una playlist para cada momento del día y estado de ánimo. Yo prefiero escuchar música en vinilo tradicional, tiene otro sonido más cálido. ¿Tienes una colección de discos de vinilo en casa? Sí, tengo más de cien vinilos de diferentes épocas y estilos musicales.",
        exercises: [
            { zh: "你喜欢什么音乐", es: "¿Qué tipo de música te gusta?", hint: "tipo de música" },
            { zh: "我喜欢流行和摇滚", es: "Me gusta pop y rock", hint: "gustar" },
            { zh: "我上个月去了演唱会", es: "Fui a un concierto el mes pasado", hint: "concierto" },
            { zh: "太羡慕了", es: "Qué envidia", hint: "envidia" },
            { zh: "我用Spotify", es: "Uso Spotify", hint: "usar" }
        ]
    },
    {
        topic: "🍳 场景24：学习做饭",
        hint: "cocinar, receta, ingrediente, horno, sartén, probar, sabroso, quemado",
        sample: "Estoy aprendiendo a cocinar paella española tradicional de Valencia. ¿Te sale buena ya después de practicar? La primera vez me quedó cruda y sin sabor, fue un desastre. ¿Y ahora después de practicar varias veces más? Cada vez sale mejor, ya casi está perfecta y sabrosa. ¿Sigues una receta específica de algún libro? Sí, la receta tradicional de mi abuela valenciana que es la mejor. Debe ser auténtica entonces si es de una abuela de allí. Sí, tiene un sabor especial que no se encuentra en los restaurantes comerciales. ¿Qué ingredientes lleva exactamente la receta? Lleva arroz, pollo, conejo, judías verdes y azafrán de buena calidad. ¿Es difícil de hacer para principiantes? No es fácil, hay que controlar bien el fuego para que no se queme el arroz de abajo.",
        exercises: [
            { zh: "我在学做海鲜饭", es: "Estoy aprendiendo a cocinar paella", hint: "aprender a" },
            { zh: "第一次没煮熟", es: "La primera vez me quedó cruda", hint: "crudo" },
            { zh: "我奶奶的菜谱", es: "La receta de mi abuela", hint: "receta" },
            { zh: "味道很特别", es: "Tiene un sabor especial", hint: "sabor" },
            { zh: "别烧焦了", es: "Para que no se queme", hint: "quemarse" }
        ]
    },
    {
        topic: "🌳 场景25：在公园",
        hint: "parque, paseo, banco, árbol, naturaleza, relajarse, correr, picnic",
        sample: "Me encanta venir a este parque los fines de semana para desconectar. Sí, es un lugar muy tranquilo y bonito para pasear y pensar. ¿Vienes a menudo por aquí a caminar? Casi todos los días a dar un paseo después de cenar con mi perro. Es bueno para despejar la mente y hacer ejercicio suave al aire libre. Totalmente de acuerdo, el aire es más puro que en el centro de la ciudad. A veces traigo un libro y leo sentado en un banco a la sombra de los árboles. Qué envidia, yo debería hacer lo mismo en vez de mirar el móvil constantemente. También hay gente que viene a correr por las mañanas muy temprano. Sí, y los domingos familias haciendo picnic en el césped con niños jugando.",
        exercises: [
            { zh: "我喜欢来这个公园", es: "Me encanta venir a este parque", hint: "encantar" },
            { zh: "每天来散步", es: "Vengo a dar un paseo", hint: "paseo" },
            { zh: "清醒头脑", es: "Despejar la mente", hint: "despejar" },
            { zh: "坐在长椅上看书", es: "Leo sentado en un banco", hint: "banco" },
            { zh: "家庭野餐", es: "Familias haciendo picnic", hint: "picnic" }
        ]
    },
    {
        topic: "📰 场景26：谈论新闻",
        hint: "noticias, periódico, televisión, actualidad, política, economía, escándalo, informarse",
        sample: "¿Has visto las noticias de hoy en la televisión por la mañana? Sí, he leído el periódico digital por la mañana mientras desayunaba. ¿Qué te ha llamado más la atención de las noticias? Lo de la subida de precios de la luz y el gas natural preocupa mucho. Es preocupante, afecta a muchas familias con ingresos modestos y fijos. Sí, todo está más caro últimamente, la inflación sube mucho. ¿Cómo te informas normalmente de la actualidad? Por internet principalmente, y a veces la radio en el coche. Yo prefiero los periódicos en papel los domingos para leer con calma. ¿Sigues la política actual de cerca? Sí, aunque últimamente hay demasiados escándalos de corrupción. Es cierto, la política está muy polarizada ahora entre diferentes ideologías.",
        exercises: [
            { zh: "你看今天的新闻了吗", es: "¿Has visto las noticias de hoy?", hint: "noticias" },
            { zh: "我早上看了报纸", es: "He leído el periódico por la mañana", hint: "periódico" },
            { zh: "电费上涨了", es: "La subida de precios de la luz", hint: "subida" },
            { zh: "最近丑闻太多了", es: "Hay demasiados escándalos", hint: "escándalo" },
            { zh: "政治很两极化", es: "La política está polarizada", hint: "polarizado" }
        ]
    },
    {
        topic: "👨‍👩‍👧‍👦 场景27：家庭聚会",
        hint: "familia, reunión, abuelos, primos, tíos, celebrar, recordar, tradición",
        sample: "Este fin de semana tenemos reunión familiar en casa de mis padres como cada mes. ¿Quién viene a la reunión de toda la familia? Viene toda la familia extendida: abuelos, tíos, primos y sus hijos pequeños. ¡Qué bien, será una fiesta grande con tanta gente! Sí, somos más de veinte personas en total contando a todos. ¿Dónde quedan exactamente para comer juntos? En el pueblo donde crecí, a una hora en coche de la ciudad. Mi madre cocina para un ejército, hace comida tradicional de siempre. Me encantan estas reuniones familiares, es bonito estar todos juntos. Sí, podemos recordar viejos tiempos y ver a los niños jugar en el jardín. ¿Habéis mantenido las tradiciones familiares con el tiempo? Sí, cada año celebramos así las fiestas importantes en familia unida.",
        exercises: [
            { zh: "我们有家庭聚会", es: "Tenemos reunión familiar", hint: "reunión" },
            { zh: "爷爷奶奶叔叔阿姨都来", es: "Abuelos, tíos, primos", hint: "familiares" },
            { zh: "我们有20多人", es: "Somos más de veinte personas", hint: "más de" },
            { zh: "回忆旧时光", es: "Recordar viejos tiempos", hint: "recordar" },
            { zh: "保持家庭传统", es: "Mantenemos las tradiciones", hint: "tradición" }
        ]
    },
    {
        topic: "💇 场景28：在理发店",
        hint: "peluquería, cortar, pelo, estilo, tinte, champú, secador, cita",
        sample: "Buenos días, tengo cita a las cuatro con María la peluquera. Pase y siéntese en esta silla, por favor, enseguida la atiendo. ¿Qué se va a hacer hoy en el pelo? Quiero cortarme el pelo y un poco de tinte para cubrir las canas que me salen. ¿Cuánto se lo quiere cortar exactamente? Unos cinco centímetros, solo las puntas dañadas para quitar el encrespamiento. ¿Y el color del tinte qué tono prefiere? Quiero un tono más claro que el actual, un castaño claro natural. ¿Quiere que le lave el pelo primero antes de cortar? Sí, por favor, con champú hidratante para cabellos secos. ¿Le aplico también acondicionador al final del lavado? Sí, mi pelo está muy seco últimamente por el frío del invierno. Perfecto, enseguida empezamos con el corte y luego el color.",
        exercises: [
            { zh: "我四点有预约", es: "Tengo cita a las cuatro", hint: "cita" },
            { zh: "我想剪头发", es: "Quiero cortarme el pelo", hint: "cortarse el pelo" },
            { zh: "染个颜色遮白发", es: "Tinte para cubrir las canas", hint: "tinte, canas" },
            { zh: "剪5厘米", es: "Unos cinco centímetros", hint: "centímetro" },
            { zh: "用保湿洗发水", es: "Con champú hidratante", hint: "champú" }
        ]
    },
    {
        topic: "🚲 场景29：自行车坏了",
        hint: "bicicleta, pinchazo, rueda, cadena, taller, arreglar, herramienta, pedalear",
        sample: "Se me ha pinchado la rueda trasera de la bici al pasar por una zona con cristales. ¿Tienes cámara de repuesto para cambiarla tú mismo? No, no llevo herramientas ni repuestos en la mochila hoy. Necesito ir al taller de bicicletas que hay cerca de aquí a dos calles. ¿Sabes si es caro arreglar un pinchazo simple? No mucho, unos quince euros más o menos por el trabajo y la pieza. Voy a llevarla ahora mismo porque la necesito mañana para ir al trabajo. ¿Quieres que te acompañe al taller con la bici? Gracias, no hace falta, está aquí al lado y puedo ir solo. También me dijeron que la cadena está desgastada y necesita cambio pronto. Entonces te costará un poco más la reparación total. Sí, pero es necesario cambiarla para seguridad al pedalear.",
        exercises: [
            { zh: "我自行车后轮爆胎了", es: "Se me ha pinchado la rueda trasera", hint: "pincharse" },
            { zh: "我没有备胎", es: "No tengo cámara de repuesto", hint: "repuesto" },
            { zh: "去修车店", es: "Ir al taller", hint: "taller" },
            { zh: "大约15欧", es: "Unos quince euros", hint: "unos" },
            { zh: "链条磨损了", es: "La cadena está desgastada", hint: "desgastado" }
        ]
    },
    {
        topic: "🎁 场景30：挑选礼物",
        hint: "regalo, cumpleaños, sorpresa, envolver, tarjeta, difícil, acertar, original",
        sample: "No sé qué regalarle a mi madre para su cumpleaños, es muy difícil elegir. ¿Cuándo es su cumpleaños exactamente? El mes que viene, el día quince de mayo. ¿Qué le gusta hacer a ella en su tiempo libre? Le encanta leer novelas románticas y cuidar su jardín de flores. ¿Y si le compras un libro de jardinería con fotos bonitas? Buena idea, es algo original y práctico para ella. O una maceta bonita con una planta especial que no tenga. Voy a mirar en esa librería de la esquina que tiene buena selección. También puedes escribirle una tarjeta bonita con un mensaje personal. Sí, eso siempre le emociona mucho y guarda todas las tarjetas. ¿Lo envuelves en la tienda o lo haces tú? Sí, tienen servicio de envoltorio gratuito con papel bonito. Perfecto, seguro que aciertas con ese regalo pensado con cariño.",
        exercises: [
            { zh: "我不知道给我妈买什么礼物", es: "No sé qué regalarle a mi madre", hint: "regalar" },
            { zh: "她喜欢看书和园艺", es: "Le encanta leer y el jardín", hint: "encantar" },
            { zh: "买本园艺书", es: "Un libro de jardinería", hint: "jardinería" },
            { zh: "写张卡片", es: "Escribirle una tarjeta", hint: "tarjeta" },
            { zh: "免费包装", es: "Envoltorio gratuito", hint: "envoltorio" }
        ]
    },
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
    // B2 观点题 - 表达观点
    {
        topic: "💭 B2观点：远程工作的利弊",
        type: "b2_opinion",
        hint: "teletrabajo, ventajas, inconvenientes, productividad, conciliación, aislamiento",
        sample: "En mi opinión, el teletrabajo es una modalidad laboral que presenta tanto ventajas como inconvenientes que debemos analizar detenidamente. Por un lado, ofrece una mayor flexibilidad horaria y permite conciliar mejor la vida personal y profesional. Los trabajadores ahorran tiempo en desplazamientos y pueden organizar su jornada de forma más eficiente. Sin embargo, también tiene aspectos negativos que no podemos ignorar. El aislamiento social puede afectar la salud mental de algunas personas, y la falta de separación entre el espacio laboral y el hogar dificulta desconectar. Además, no todos los puestos de trabajo son aptos para esta modalidad. Personalmente, creo que lo ideal sería un modelo híbrido que combine días presenciales con días de teletrabajo, aprovechando lo mejor de ambos sistemas. Así se mantendría el contacto humano necesario sin renunciar a la flexibilidad.",
        exercises: [
            { zh: "在我看来", es: "En mi opinión", hint: "opinión" },
            { zh: "既有优点也有缺点", es: "Presenta tanto ventajas como inconvenientes", hint: "ventajas e inconvenientes" },
            { zh: "一方面", es: "Por un lado", hint: "por un lado" },
            { zh: "然而", es: "Sin embargo", hint: "sin embargo" },
            { zh: "我个人认为", es: "Personalmente, creo que", hint: "personalmente" }
        ]
    },
    {
        topic: "💭 B2观点：社交媒体对年轻人的影响",
        type: "b2_opinion",
        hint: "redes sociales, jóvenes, influencia, adicción, comunicación, privacidad, autenticidad",
        sample: "Considero que las redes sociales han transformado radicalmente la forma en que los jóvenes se relacionan e interactúan con el mundo. Es evidente que estos plataformas ofrecen beneficios importantes, como la posibilidad de mantener contacto con amigos de otros países y acceder a información instantánea. No obstante, también plantean serios problemas que no debemos subestimar. La presión por mantener una imagen perfecta puede generar ansiedad y baja autoestima. Muchos jóvenes se vuelven adictos a la validación a través de likes y comentarios, perdiendo la autenticidad en sus relaciones. Además, la exposición constante de datos personales plantea riesgos para la privacidad. Estoy convencido de que es fundamental educar a los jóvenes en un uso responsable y crítico de estas herramientas. Las redes deben ser un complemento de la vida real, no un sustituto de las relaciones presenciales genuinas.",
        exercises: [
            { zh: "我认为", es: "Considero que", hint: "considerar" },
            { zh: "显然", es: "Es evidente que", hint: "evidente" },
            { zh: "然而", es: "No obstante", hint: "no obstante" },
            { zh: "不应低估", es: "No debemos subestimar", hint: "subestimar" },
            { zh: "我确信", es: "Estoy convencido de que", hint: "convencido" }
        ]
    },
    {
        topic: "💭 B2观点：学习外语的重要性",
        type: "b2_opinion",
        hint: "idiomas, aprendizaje, comunicación, oportunidades laborales, cultura, mentalidad",
        sample: "Desde mi punto de vista, aprender idiomas extranjeros es una de las inversiones más valiosas que una persona puede hacer en su desarrollo personal y profesional. En primer lugar, hablar varios idiomas abre puertas en el mercado laboral globalizado actual. Las empresas valoran cada vez más a candidatos multilingües que puedan comunicarse con clientes internacionales. Por otro lado, estudiar un idioma immerge al alumno en una nueva cultura, ampliando su visión del mundo y fomentando la tolerancia. También se ha demostrado que el aprendizaje de idiomas mejora la capacidad cognitiva y la memoria. Aunque requiere tiempo y esfuerzo constante, los beneficios a largo plazo superan con creces las dificultades iniciales. En definitiva, dominar idiomas no es solo una habilidad práctica, sino una herramienta que enriquece la vida de múltiples formas y conecta a las personas más allá de las fronteras.",
        exercises: [
            { zh: "从我的观点看", es: "Desde mi punto de vista", hint: "punto de vista" },
            { zh: "打开大门", es: "Abre puertas", hint: "abrir puertas" },
            { zh: "另一方面", es: "Por otro lado", hint: "por otro lado" },
            { zh: "尽管需要时间和努力", es: "Aunque requiere tiempo y esfuerzo", hint: "requerir" },
            { zh: "总而言之", es: "En definitiva", hint: "en definitiva" }
        ]
    },
    // B2 比较题
    {
        topic: "⚖️ B2比较：城市生活 vs 乡村生活",
        type: "b2_compare",
        hint: "comparar, ciudad, campo, tranquilidad, servicios, ritmo, comunidad",
        sample: "Vivir en la ciudad y vivir en el campo son experiencias radicalmente diferentes, cada una con sus propias ventajas e inconvenientes. En cuanto a la ciudad, destaca la amplia oferta de servicios como hospitales, universidades y centros culturales. El transporte público suele ser eficiente y las oportunidades laborales son mayores. Sin embargo, el ritmo de vida es estresante y el coste de vida considerablemente más alto. Por el contrario, el campo ofrece una calidad de vida superior en términos de tranquilidad y contacto con la naturaleza. La comunidad es más cohesionada y se conocen todos los vecinos. Aunque los servicios básicos pueden estar a kilómetros de distancia. Personalmente, prefiero la ciudad durante la juventud para aprovechar las oportunidades profesionales, pero me gustaría mudarme al campo en la jubilación para disfrutar de la paz que ofrece.",
        exercises: [
            { zh: "关于城市", es: "En cuanto a la ciudad", hint: "en cuanto a" },
            { zh: "另一方面", es: "Por el contrario", hint: "por el contrario" },
            { zh: "生活节奏压力大", es: "El ritmo de vida es estresante", hint: "ritmo de vida" },
            { zh: "社区更加团结", es: "La comunidad es más cohesionada", hint: "cohesionada" },
            { zh: "就我个人而言", es: "Personalmente", hint: "personalmente" }
        ]
    },
    {
        topic: "⚖️ B2比较：传统购物 vs 网上购物",
        type: "b2_compare",
        hint: "compras, tradicional, online, comodidad, experiencia, inmediato, devolución",
        sample: "Las compras tradicionales en tiendas físicas y las compras online tienen características muy distintas que atraen a diferentes tipos de consumidores. Las tiendas físicas ofrecen una experiencia sensorial completa: puedes tocar los productos, probarte la ropa y llevarte la compra inmediatamente. Además, el trato personalizado con los dependientes puede ser muy valioso. En cambio, las compras online destacan por la comodidad de hacer pedidos desde casa a cualquier hora del día. Los precios suelen ser más competitivos y la variedad de productos es prácticamente ilimitada. El principal inconveniente es la espera hasta la entrega y la dificultad para hacer devoluciones. Aunque ambas modalidades coexistirán en el futuro, observo una tendencia clara hacia el comercio electrónico, especialmente entre las generaciones más jóvenes que priorizan la conveniencia sobre la experiencia tradicional de compra.",
        exercises: [
            { zh: "实体店提供", es: "Las tiendas físicas ofrecen", hint: "tiendas físicas" },
            { zh: "相反", es: "En cambio", hint: "en cambio" },
            { zh: "价格通常更有竞争力", es: "Los precios suelen ser más competitivos", hint: "competitivo" },
            { zh: "主要缺点", es: "El principal inconveniente", hint: "inconveniente" },
            { zh: "我观察到明显的趋势", es: "Observo una tendencia clara", hint: "tendencia" }
        ]
    }
];

// 每日推荐场景（30天循环）
function getDailyScenario() {
    // 检查 speakingChallenges 是否已加载
    if (typeof speakingChallenges === 'undefined' || !speakingChallenges || speakingChallenges.length === 0) {
        console.log('speakingChallenges 尚未加载');
        return null;
    }
    
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const index = dayOfYear % speakingChallenges.length;
    return speakingChallenges[index];
}
