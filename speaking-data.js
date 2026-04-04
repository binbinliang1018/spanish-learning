// 口语挑战话题 - 每天一个场景，包含参考口语
const speakingChallenges = [
    {
        topic: "🌅 场景1：早晨起床后的日常",
        hint: "despertarse, levantarse, ducharse, desayunar, prisa, temprano",
        sample: "Me despierto a las siete de la mañana. Primero me levanto y voy al baño. Me ducho con agua tibia porque me gusta empezar el día fresco. Luego me visto rápidamente porque tengo prisa. Desayuno café con tostadas mientras reviso el móvil. A las ocho salgo de casa para ir al trabajo."
    },
    {
        topic: "☕ 场景2：在咖啡厅点咖啡",
        hint: "café, cortado, solo, con leche, azúcar, para llevar, terraza",
        sample: "Buenos días. ¿Qué van a tomar? Me pone un café cortado, por favor. ¿Lo quiere con azúcar? No, sin azúcar, gracias. ¿Para tomar aquí o para llevar? Para tomar en la terraza, si hay sitio. Claro, ahora se lo llevo. ¿Me puede traer también un croissant? Sí, enseguida."
    },
    {
        topic: "🛒 场景3：在超市购物",
        hint: "supermercado, lista, fruta, verdura, carne, pescado, oferta, carrito",
        sample: "Voy al supermercado a comprar lo de la semana. Necesito fruta: manzanas, plátanos y naranjas. En la sección de verduras cojo tomates, lechuga y pimientos. La carne de pollo está en oferta, me llevo dos paquetes. ¿Dónde está el arroz? Ah, en el pasillo tres. También necesito leche y huevos."
    },
    {
        topic: "🍽️ 场景4：邀请朋友来家里吃饭",
        hint: "invitar, cenar, cocinar, receta, postre, traer, vino, preparar",
        sample: "¿Te apetece venir a cenar a casa el sábado? Me encantaría. ¿Qué vamos a comer? Voy a preparar paella, es mi especialidad. ¡Qué bien! ¿Puedo traer algo? Sí, si quieres trae un postre o una botella de vino. Perfecto, llevaré tarta de queso. ¿A qué hora quedamos? Sobre las nueve."
    },
    {
        topic: "📞 场景5：打电话预约医生",
        hint: "cita, médico, dolor, resfriado, fiebre, urgencia, mañana, tarde",
        sample: "Buenos días, querría pedir cita con el doctor. ¿Es urgente? Tengo dolor de cabeza y fiebre desde ayer. Entiendo. ¿Le viene bien mañana por la mañana? Sí, perfecto. A las diez, entonces. Gracias, hasta mañana."
    },
    {
        topic: "🚇 场景6：在地铁里问路",
        hint: "metro, línea, estación, correspondencia, dirección, bajar, salida",
        sample: "Disculpe, ¿cómo llego a la estación de Atocha? Tome la línea uno dirección Valdecarros. ¿Debo hacer transbordo? No, es directo. Baje en la tercera parada. Muchas gracias. De nada, que tenga buen día."
    },
    {
        topic: "🏋️ 场景7：在健身房",
        hint: "gimnasio, ejercicio, máquina, pesas, entrenar, sudar, ducha",
        sample: "Voy al gimnasio tres veces por semana. Primero hago cardio en la cinta durante veinte minutos. Luego uso las máquinas para trabajar los brazos y las piernas. A veces levanto pesas libres. Termino con abdominales. Después me ducho y me voy a casa. Me siento muy bien después de entrenar."
    },
    {
        topic: "🎬 场景8：谈论昨晚看的电影",
        hint: "película, cine, actor, argumento, aburrido, emocionante, recomendar",
        sample: "¿Has visto la película que dieron anoche en la tele? Sí, la vi. ¿Qué te pareció? La verdad es que me aburrió un poco. El argumento era predecible y los actores no convencían. Yo pensaba que sería mejor. ¿Tú la recomendarías? No mucho, hay mejores opciones."
    },
    {
        topic: "🌧️ 场景9：谈论天气",
        hint: "lluvia, sol, frío, calor, paraguas, temperatura, primavera, otoño",
        sample: "¡Qué día más gris! Sí, parece que va a llover. ¿Llevas paraguas? No, se me ha olvidado en casa. Deberías comprar uno, está a punto de llover. Tienes razón. Odio los días de lluvia. A mí no me molesta, me gusta el olor a tierra mojada."
    },
    {
        topic: "👔 场景10：面试工作",
        hint: "entrevista, currículum, experiencia, cualidades, salario, disponibilidad, incorporación",
        sample: "Buenos días, pase y siéntese. Gracias. Traigo mi currículum. Perfecto. Cuénteme sobre su experiencia laboral. He trabajado cinco años en marketing digital. Muy bien. ¿Cuándo podría incorporarse? En dos semanas, si es necesario. Excelente. Hablemos del salario."
    },
    {
        topic: "✈️ 场景11：在机场办理登机",
        hint: "vuelo, billete, pasaporte, equipaje, facturar, puerta, embarque, asiento",
        sample: "Buenos días, mi vuelo es el tres cero cinco a París. ¿Tiene el billete y el pasaporte? Sí, aquí los tiene. ¿Va a facturar maleta? Sí, esta de aquí. Pase a dejarla en la cinta. Su vuelo embarca en la puerta doce. Gracias."
    },
    {
        topic: "🏠 场景12：描述你的家",
        hint: "piso, habitaciones, salón, cocina, balcón, luminoso, cómodo, vecinos",
        sample: "Vivo en un piso de tres habitaciones en el centro. El salón es muy luminoso porque da al sur. La cocina es pequeña pero funcional. Tenemos un balcón donde desayunamos en verano. Los vecinos son tranquilos. Me gusta mucho mi casa, es muy acogedora."
    },
    {
        topic: "📚 场景13：在图书馆",
        hint: "biblioteca, libro, préstamo, devolver, silencio, estudiar, mesa, ordenador",
        sample: "Voy a la biblioteca a estudiar porque en casa me distraigo. Necesito un sitio con silencio. A veces cojo libros en préstamo. Tengo que devolverlos en quince días. También uso los ordenadores para buscar información. Es un buen sitio para concentrarse."
    },
    {
        topic: "🎂 场景14：生日派对",
        hint: "cumpleaños, fiesta, regalo, pastel, velas, soplar, celebrar, invitados",
        sample: "¡Feliz cumpleaños! Muchas gracias por venir. Te he traído este regalo. ¡Qué detalle! Muchas gracias. ¿Quieres que abra la caja? Sí, a ver si te gusta. Me encanta, justo lo que quería. Vamos a cantar y a soplar las velas."
    },
    {
        topic: "🚗 场景15：谈论交通工具",
        hint: "coche, autobús, bicicleta, conducir, aparcar, atasco, transporte público",
        sample: "¿Cómo vas al trabajo? Normalmente en autobús. ¿No tienes coche? Sí, pero aparcar en el centro es imposible. Y hay mucho tráfico por la mañana. Tienes razón. El transporte público es más práctico. Además, es más ecológico. Totalmente de acuerdo."
    },
    {
        topic: "🍕 场景16：点外卖",
        hint: "pedir, domicilio, pizza, hamburguesa, repartidor, dirección, teléfono, pago",
        sample: "¿Quieres pedir comida a domicilio? Sí, no tengo ganas de cocinar. ¿Pizza o hamburguesa? Pizza, por favor. Llamo yo. Buenos días, quiero pedir una pizza mediana de pepperoni. ¿A qué dirección? Calle Alcalá, número cincuenta. Son quince euros. Pago en efectivo."
    },
    {
        topic: "💼 场景17：抱怨服务质量",
        hint: "queja, servicio, atención, reclamar, insatisfacción, solución, manager, compensación",
        sample: "Disculpe, quisiera hacer una queja. ¿Qué ha pasado? El servicio ha sido muy lento y la comida estaba fría. Lo siento mucho. ¿Puedo hablar con el encargado? Claro, ahora lo llamo. Queremos ofrecerle un descuento como compensación."
    },
    {
        topic: "🏥 场景18：在药店买药",
        hint: "farmacia, receta, pastillas, jarabe, dosis, síntomas, alergia, genérico",
        sample: "Buenos días, tengo esta receta del médico. Un momento, la preparo. ¿Tiene alergia a algún medicamento? No, que yo sepa. Tome una pastilla cada ocho horas durante cinco días. ¿Tiene algo para el dolor de cabeza? Sí, este es muy efectivo."
    },
    {
        topic: "🎓 场景19：谈论学习经历",
        hint: "universidad, carrera, asignatura, examen, aprobar, suspender, titulación, prácticas",
        sample: "¿Qué estudiaste en la universidad? Estudié Derecho. ¿Te gustaba? Algunas asignaturas eran interesantes, otras muy aburridas. ¿Te costó aprobar? Los exámenes finales fueron difíciles, pero lo conseguí. ¿Hiciste prácticas? Sí, en un bufete de abogados."
    },
    {
        topic: "🌴 场景20：计划假期",
        hint: "vacaciones, playa, montaña, reservar, hotel, vuelo, equipaje, guía",
        sample: "¿Ya tienes planeadas las vacaciones? Sí, voy a la costa brava. ¿Has reservado hotel? Sí, un apartamento cerca de la playa. ¿Vas en coche o en avión? En coche, son solo cuatro horas. Suena genial. Sí, tengo muchas ganas de descansar."
    },
    {
        topic: "🐕 场景21：谈论宠物",
        hint: "perro, gato, mascota, pasear, veterinario, comida, cuidar, compañía",
        sample: "¿Tienes mascota? Sí, un perro que se llama Max. ¿Qué raza es? Es un labrador. ¿Lo sacas a pasear mucho? Sí, tres veces al día. Debe ser mucho trabajo. Sí, pero me da mucha compañía. Lo entiendo, los animales son geniales."
    },
    {
        topic: "📱 场景22：手机出问题",
        hint: "móvil, pantalla, roto, batería, cargar, arreglar, garantía, técnico",
        sample: "Se me ha roto la pantalla del móvil. ¿Todavía funciona? Sí, pero es difícil ver. ¿Lo has llevado a arreglar? Voy a llevarlo mañana. ¿Está en garantía? No, lo compré hace dos años. Va a ser caro entonces. Lo sé, pero no tengo opción."
    },
    {
        topic: "🎵 场景23：谈论音乐",
        hint: "música, canción, cantante, grupo, concierto, escuchar, playlist, Spotify",
        sample: "¿Qué tipo de música te gusta? Me gusta casi de todo, pero sobre todo pop y rock. ¿Has ido a algún concierto reciente? Sí, fui a ver a Coldplay el mes pasado. ¡Qué envidia! ¿Fue bueno? Increíble, el mejor concierto de mi vida."
    },
    {
        topic: "🍳 场景24：学习做饭",
        hint: "cocinar, receta, ingrediente, horno, sartén, probar, sabroso, quemado",
        sample: "Estoy aprendiendo a cocinar paella. ¿Te sale buena? La primera vez me quedó cruda. ¿Y ahora? Cada vez mejor. ¿Sigues una receta? Sí, la de mi abuela. Debe ser auténtica entonces. Sí, tiene un sabor especial."
    },
    {
        topic: "🌳 场景25：在公园",
        hint: "parque, paseo, banco, árbol, naturaleza, relajarse, correr, picnic",
        sample: "Me encanta venir a este parque. Sí, es muy tranquilo. ¿Vienes a menudo? Casi todos los días a dar un paseo. Es bueno para despejar la mente. Totalmente. A veces traigo un libro y leo en un banco. Qué envidia, yo debería hacer lo mismo."
    },
    {
        topic: "📰 场景26：谈论新闻",
        hint: "noticias, periódico, televisión, actualidad, política, economía, escándalo, informarse",
        sample: "¿Has visto las noticias de hoy? Sí, he leído el periódico por la mañana. ¿Qué te ha llamado más la atención? Lo de la subida de precios. Es preocupante. Sí, todo está más caro. ¿Cómo te informas normalmente? Por internet, principalmente."
    },
    {
        topic: "👨‍👩‍👧‍👦 场景27：家庭聚会",
        hint: "familia, reunión, abuelos, primos, tíos, celebrar, recordar, tradición",
        sample: "Este fin de semana tenemos reunión familiar. ¿Quién viene? Todos: abuelos, tíos, primos... ¡Qué bien! ¿Dónde quedan? En casa de mis padres. Mi madre cocina para un ejército. Me encantan estas reuniones. Sí, es bonito estar todos juntos."
    },
    {
        topic: "💇 场景28：在理发店",
        hint: "peluquería, cortar, pelo, estilo, tinte, champú, secador, cita",
        sample: "Buenos días, tengo cita a las cuatro. Pase, por favor. ¿Qué se va a hacer hoy? Quiero cortarme el pelo y un poco de tinte. ¿Cuánto se lo quiere cortar? Unos cinco centímetros. ¿Y el color? Más claro que el actual. Perfecto, empezamos."
    },
    {
        topic: "🚲 场景29：自行车坏了",
        hint: "bicicleta, pinchazo, rueda, cadena, taller, arreglar, herramienta, pedalear",
        sample: "Se me ha pinchado la rueda de la bici. ¿Tienes cámara de repuesto? No, necesito ir al taller. Hay uno cerca de aquí. ¿Sabes si es caro? No mucho, unos quince euros. Voy a llevarla ahora. ¿Quieres que te acompañe? Gracias, no hace falta."
    },
    {
        topic: "🎁 场景30：挑选礼物",
        hint: "regalo, cumpleaños, sorpresa, envolver, tarjeta, difícil, acertar, original",
        sample: "No sé qué regalarle a mi madre. ¿Cuándo es su cumpleaños? El mes que viene. ¿Qué le gusta? Le encanta leer y el jardín. ¿Y si le compras un libro de plantas? Buena idea. O una maceta bonita. Voy a mirar en esa librería."
    }
];

// 每日推荐场景（30天循环）
function getDailyScenario() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const index = dayOfYear % speakingChallenges.length;
    return speakingChallenges[index];
}
