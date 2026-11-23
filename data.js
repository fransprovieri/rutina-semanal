// Contenido del desafío: plan, menú, recetas, entreno y lista del súper.
// Editá este archivo para cambiar platos, cantidades o ejercicios.

window.DATA = {
  // Comen poquito: todas las cantidades se muestran al 70 %
  porcion: 0.7,

  usuarios: [
    { id: 'fran', nombre: 'Fran' },
    { id: 'jazmin', nombre: 'Jazmín' }
  ],

  objetivo: {
    titulo: 'Armar 7 hábitos en 14 días',
    texto: 'No es una dieta: es probar una rutina simple durante dos semanas y quedarse con lo que funcione. El progreso se mide con una cinta métrica, no con la balanza.',
    meta: 'Cintura por debajo de la mitad de tu altura (recomendación del NICE británico).'
  },

  habitos: [
    { id: 'liquidos', titulo: 'Nada de calorías líquidas', detalle: 'Agua, café y mate sin azúcar. Afuera gaseosas, jugos, bebidas energéticas y alcohol.' },
    { id: 'plato', titulo: 'Plato con la mano', detalle: 'Proteína 1–2 palmas · verdura 2 puños · carbos 1 puño · grasa 1 pulgar. Verdura y proteína primero, carbos al final.' },
    { id: 'caminata', titulo: 'Caminata post-cena', detalle: '10–15 min después de cenar. Después del almuerzo, con 5 min alcanza.' },
    { id: 'pasos', titulo: 'Pasos del día', detalle: 'Semana 1: tu promedio + 1.000. Semana 2: 7.000–8.000.', tipo: 'numero' },
    { id: 'entreno', titulo: 'Entrenamiento del día', detalle: 'Lo que te toca hoy (ver Entrenamiento).' },
    { id: 'sueno', titulo: 'Dormí 7–8 h', detalle: 'Despertador a la misma hora, luz natural al levantarte, pantallas afuera 1 h antes.' },
    { id: 'cocina', titulo: 'Cocina cerrada', detalle: 'Después de cenar no se come más.' }
  ],

  horario: [
    { hora: '07:30', titulo: 'Despertar, siempre a la misma hora', detalle: '5–10 min de luz natural y un vaso de agua.', tipo: 'descanso' },
    { hora: '08:00', titulo: 'Desayuno', detalle: 'Opción A o B, siempre con proteína.', tipo: 'comida' },
    { hora: '09:00', titulo: 'Bloque de trabajo', detalle: 'Cada hora, parate y movete 3–5 min.', tipo: 'trabajo' },
    { hora: '13:00', titulo: 'Almuerzo', detalle: 'Verdura y proteína primero, carbos al final.', tipo: 'comida' },
    { hora: '13:30', titulo: 'Caminata corta', detalle: '5 minutos alcanzan.', tipo: 'movimiento' },
    { hora: '14:00', titulo: 'Bloque de trabajo', detalle: 'Pausa de movimiento cada hora.', tipo: 'trabajo' },
    { hora: '18:30', titulo: 'Entrenamiento', detalle: 'Fuerza, correr o pilates.', tipo: 'movimiento' },
    { hora: '20:30', titulo: 'Cena', detalle: 'Última comida del día.', tipo: 'comida' },
    { hora: '21:00', titulo: 'Caminata post-cena', detalle: '10–15 min. Después, la cocina cierra.', tipo: 'movimiento' },
    { hora: '22:30', titulo: 'Pantallas afuera', detalle: 'Leer, música, dejar listo el día siguiente.', tipo: 'descanso' },
    { hora: '23:30', titulo: 'A dormir', detalle: '8 horas hasta el despertador.', tipo: 'descanso' }
  ],

  // 0 = domingo ... 6 = sábado. Los días que Jaz no tiene pilates entrenan juntos.
  entreno: {
    fran: { 1: 'correr', 2: 'fuerza', 3: 'correr', 4: 'fuerza', 5: 'correr', 6: 'fuerza', 0: 'libre' },
    jazmin: { 1: 'pilates', 2: 'fuerza', 3: 'pilates', 4: 'fuerza', 5: 'correr', 6: 'fuerza', 0: 'libre' }
  },

  // Nada es obligatorio: son listas para elegir día a día.
  // Almuerzos listos: se cocinan en tanda (domingo o la noche anterior) y se calientan.
  almuerzos: {
    fran: ['bowl', 'wrap', 'cerdo', 'milanesas', 'tarta', 'pastel', 'bolognesa'],
    jazmin: ['platito', 'pastel', 'bowl', 'milanesas', 'tarta']
  },
  // Ensalada cruda por semana (meta liviana, se cuenta al registrar la comida)
  ensaladas: {
    fran: { meta: 2, receta: 'ensalada-fran' },
    jazmin: { meta: 3, receta: 'platito' }
  },
  // Cenas rápidas: ingredientes cortados y porcionados; se cocinan en 15–25 min
  cenas: ['bife', 'merluza', 'salteado', 'fajitas', 'pollo-plancha', 'fideos-brocoli', 'milanesitas'],
  // Recetas sin ingredientes en casa esta semana (se muestran aparte, como "para la próxima compra")
  sinStock: ['cerdo', 'bolognesa'],
  desayunos: ['desayuno-a', 'desayuno-b'],

  // Guía de qué dejar en heladera y freezer
  guardado: [
    { titulo: 'Freezer · proteínas', dura: 'hasta 3 meses', items: [
      'Tiras de pollo en bolsas de 300 g (salteado, fajitas)',
      'Pechugas fileteadas en bolsas de 300 g (pollo a la plancha)',
      'Milanesas de pollo y de merluza, separadas con film',
      'Bifes en bolsas de 300 g · tiras de carne para salteado',
      'Cubos de pollo en bolsas de 200 g (fideos con brócoli)'
    ] },
    { titulo: 'Freezer · verduras', dura: 'hasta 2 meses', items: [
      'Mix para salteado: cebolla, morrón, zanahoria y zapallito en tiras',
      'Mix para fajitas: cebolla y morrón en tiras',
      'Brócoli en ramitos, blanqueado 2 min y bien seco',
      'Calabaza en cubos (para puré)',
      'Acelga: hojas picadas, blanqueadas 2 min y bien escurridas (en bollitos)'
    ] },
    { titulo: 'Heladera · listo para usar', dura: '3–4 días', items: [
      'Zanahoria en bastones y rallada',
      'Tomates cherry lavados · lechuga lavada y seca (con papel adentro)',
      'Huevos duros con cáscara',
      'Lentejas y porotos enjuagados, en tuppers',
      'Arroz cocido · almuerzos listos en tuppers individuales'
    ] },
    { titulo: 'Para descongelar', dura: '', items: [
      'Lo mejor: pasarlo del freezer a la heladera la noche anterior.',
      'Apuro: bolsa cerrada en un bol con agua fría, 20–30 min.',
      'Las tiras finas y los mix de verdura van directo a la sartén, sin descongelar.'
    ] }
  ],

  recetas: {
    mealprep: {
      foto: { img: 'https://images.unsplash.com/photo-1543353071-c953d88f7033?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: 'sosOqjx31Go', autor: 'Ella Olsson' },
      nombre: 'Preparación del domingo',
      tipo: 'Preparación', tiempo: '1 h 30 min',
      intro: 'Una sola sesión que deja todo listo para elegir en la semana. No hace falta hacerlo todo: elegí 2 o 3 almuerzos para cocinar en tanda y porcioná el resto para el freezer.',
      ingredientes: [
        'Lo que traigan del súper (ver lista)',
        'Bolsas tipo zip, tuppers individuales, film y marcador para fechar'
      ],
      pasos: [
        'Horno a 200 °C y agua a hervir (huevos y arroz).',
        'Huevos duros: 10 minutos exactos y a agua fría.',
        'Arroz: una tanda grande (300 g crudos).',
        'Elegí 2–3 almuerzos para cocinar en tanda (por ejemplo, bowl de pollo + pastel de papa + tarta) y metelos al horno mientras porcionás.',
        'Proteínas para las cenas: cortá tiras de pollo y carne, fileteá pechugas, empaná milanesas. Todo en bolsas porcionadas, aplanadas (se congelan y descongelan más rápido) y con fecha.',
        'Verduras: armá los mix de salteado y fajitas, blanqueá el brócoli 2 min, cortá calabaza en cubos. Lo que va al freezer, bien seco.',
        'Platitos de Jaz: zanahoria rallada y en bastones, cherrys lavados, legumbres enjuagadas en tuppers.',
        'Cuando los almuerzos se enfríen, porcioná en tuppers individuales: lo de lunes a miércoles a la heladera, el resto al freezer.',
        'Marcá en la app (en cada receta) lo que cocinaron, así saben qué hay listo.'
      ]
    },
    'desayuno-a': {
      foto: { img: 'https://images.unsplash.com/photo-1583552336796-531290f1fe2a?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: 'yPHKox1Quyw', autor: 'Alfredo Alvarado' },
      nombre: 'Huevos revueltos con tostada',
      tipo: 'Desayuno', tiempo: '10 min',
      ingredientes: ['5–6 huevos', '2 rebanadas de pan', 'Manteca (1 pulgar cada uno)', 'Sal y pimienta', 'Café o mate'],
      pasos: [
        'Poné a tostar el pan.',
        'Batí los huevos con una pizca de sal.',
        'Sartén a fuego medio-bajo con un poco de manteca. Volcá los huevos y movelos despacio con espátula.',
        'Sacalos cuando todavía estén un poco húmedos: se terminan de hacer solos en el plato.'
      ]
    },
    'desayuno-b': {
      foto: { img: 'https://images.unsplash.com/photo-1468577760773-139c2f1c335f?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: 'c69HK1HKHYs', autor: 'Jonathan Pielmayer' },
      nombre: 'Tostada con dulce, yogur y huevo duro',
      tipo: 'Desayuno', tiempo: '5 min',
      ingredientes: ['2 rebanadas de pan', 'Manteca y dulce de arándanos', '2 yogures naturales sin azúcar', '2 huevos duros (del domingo)', 'Café o mate'],
      pasos: [
        'Tostá el pan y untalo con manteca y una capa fina de dulce.',
        'Un yogur natural y un huevo duro cada uno.'
      ]
    },

    // ---------- Almuerzos listos ----------
    bowl: {
      foto: { img: 'https://images.unsplash.com/photo-1543353071-c953d88f7033?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: 'sosOqjx31Go', autor: 'Ella Olsson' },
      nombre: 'Bowl de pollo, arroz y verduras al horno',
      tipo: 'Almuerzo', tiempo: '50 min en tanda · 3 min para servir',
      intro: 'Rinde 4 bowls. Aguanta 4 días en heladera.',
      ingredientes: ['700 g de filet de pollo', '200 g de arroz crudo (o del arroz del domingo)', '1 calabaza chica, 2 zanahorias, 1 cebolla, 1 morrón', '1 papa o 1 batata', 'Aceite, limón, ajo, pimentón, orégano, sal'],
      pasos: [
        'Horno a 200 °C. Pollo con aceite, limón, ajo, pimentón, orégano y sal.',
        'Verduras en cubos parecidos (1 parte de papa, 3 del resto), en otra bandeja con aceite y sal.',
        'Las dos bandejas al horno 35 min. Dá vuelta las verduras a la mitad.',
        'Pollo en tiras. Armá 4 tuppers: medio de verdura, un cuarto de pollo, un cuarto de arroz.',
        'Para comer: 2–3 min de microondas y un chorrito de aceite y limón.'
      ]
    },
    wrap: {
      foto: { img: 'https://images.unsplash.com/photo-1719282431723-9d0f4370d4bc?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: 'xq04aTV-LVk', autor: 'Bayuaji Abiyu' },
      nombre: 'Wraps de carne picada',
      tipo: 'Almuerzo', tiempo: '20 min en tanda · 5 min para armar',
      intro: 'El relleno aguanta 3 días en heladera o se congela en porciones.',
      ingredientes: ['300 g de carne picada magra (2 porciones)', 'Mix congelado de cebolla y morrón (o 1 cebolla y 1 morrón), 1 zanahoria rallada', 'Rapiditas o tortillas (2 por porción)', 'Tomate y palta (o queso, si hay)', 'Pimentón dulce, sal'],
      pasos: [
        'Cebolla y morrón picados 5 min en sartén con un poco de aceite.',
        'Sumá la carne, desarmala y cociná 8–10 min. Agregá la zanahoria, pimentón y sal.',
        'Porcioná el relleno en tuppers.',
        'Para comer: calentá el relleno, tortillas 20 s por lado en sartén seca, armá con queso, lechuga y tomate.'
      ]
    },
    cerdo: {
      foto: { img: 'https://images.unsplash.com/photo-1579619002916-88cd4c81a70c?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: 'CzD0EHabuzE', autor: 'James Frewin' },
      nombre: 'Lomo de cerdo al horno con batata y zanahoria',
      tipo: 'Almuerzo', tiempo: '45 min en tanda',
      intro: 'Rinde 3 porciones. Ideal para hacer en una cena y llevar al día siguiente.',
      ingredientes: ['600 g de lomo de cerdo', '2 batatas', '3 zanahorias', '1 cebolla', 'Mostaza (1 cda), ajo, romero u orégano, aceite, sal, pimienta'],
      pasos: [
        'Horno a 200 °C. Batata y zanahoria en bastones, cebolla en gajos, con aceite y sal.',
        'Untá el lomo con mostaza, ajo, hierbas, sal y pimienta. Sellalo 2 min por lado en sartén bien caliente.',
        'Lomo arriba de las verduras, 25–30 min. Adentro tiene que quedar apenas rosado.',
        'Reposo 5 min, cortá en medallones y porcioná con las verduras.'
      ]
    },
    milanesas: {
      foto: { img: 'https://images.unsplash.com/photo-1599921841143-819065a55cc6?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: 'MyfbM2QYF4o', autor: 'Mark König' },
      nombre: 'Milanesas al horno con puré (pollo, ternera o cerdo)',
      tipo: 'Almuerzo', tiempo: '40 min en tanda',
      intro: 'Hay de pollo, de ternera y de cerdo: van del freezer al horno sin descongelar (sumá 5 min). También sirven de cena.',
      ingredientes: ['800 g de milanesas (pollo, ternera o cerdo)', 'Puré: 2 papas y ½ zapallo anco, o batata', 'Manteca, nuez moscada, sal'],
      pasos: [
        'Horno a 200 °C en fuente aceitada: 10 min, vuelta y 8–10 min más.',
        'Puré: papa y zapallo (o batata) en cubos, hervidos 15 min, pisados con manteca, sal y nuez moscada.',
        'Porcioná milanesa + puré en tuppers. Fría también va bien en un sándwich con tomate.'
      ]
    },
    tarta: {
      foto: { img: 'https://images.unsplash.com/photo-1633205772834-c0b9943c5a54?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: '_RHzESzFTH8', autor: 'Emma Shappley' },
      nombre: 'Tarta de acelga, cebolla y queso',
      tipo: 'Almuerzo', tiempo: '1 h en tanda',
      intro: 'Rinde 6 porciones. 4 días en heladera o freezer en porciones.',
      ingredientes: ['1 paquete de tapas pascualina (2 tapas)', 'Acelga congelada: ½ bolsa (o 2 atados frescos)', 'Cebolla picada congelada: 1 taza (o 2 cebollas)', '4 huevos', '100 g de queso rallado (si hay cremoso, sumá 150 g en cubos)', 'Sal, pimienta, nuez moscada'],
      pasos: [
        'Horno a 200 °C. Cebolla picada (puede ir congelada) en sartén 8 min.',
        'Sumá la acelga (congelada va directo) y cociná 5–8 min hasta que no quede agua. Escurrila bien apretando: si queda agua, la tarta se humedece.',
        'Mezclá con los huevos batidos, el queso, sal, pimienta y nuez moscada.',
        'Una tapa en la tartera, el relleno, la otra tapa arriba. Repulgá los bordes y pinchá la tapa.',
        'Al horno 35–40 min, hasta que esté dorada. Enfriá y cortá en 6.'
      ]
    },
    pastel: {
      foto: { img: 'https://images.unsplash.com/photo-1696935257293-9ec4f03074a1?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: 'LHr6EN-B8NQ', autor: 'The Fry Family Food Co.' },
      nombre: 'Pastel de papa con calabaza',
      tipo: 'Almuerzo', tiempo: '1 h en tanda',
      intro: 'Rinde 5–6 porciones. Se congela muy bien.',
      ingredientes: ['500 g de carne picada', '1 cebolla, 1 morrón, 1 zanahoria rallada', '1 kg de papa', '½ calabaza', 'Manteca, queso rallado', 'Pimentón dulce, comino (opcional), sal'],
      pasos: [
        'Papa y calabaza en cubos, hervidas juntas 20 min.',
        'Relleno: cebolla y morrón 5 min, carne 10 min, zanahoria, pimentón y sal.',
        'Pisá papa y calabaza con un poco de manteca y sal.',
        'En una fuente: relleno abajo, puré arriba, queso rallado.',
        'Horno fuerte (220 °C) 15 min para gratinar. Enfriá y porcioná.'
      ]
    },
    bolognesa: {
      foto: { img: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: 'sA3wymYqyaI', autor: 'Homescreenify' },
      nombre: 'Fideos con bolognesa',
      tipo: 'Almuerzo', tiempo: '35 min',
      intro: 'La salsa se hace en tanda y se congela en porciones; los fideos se hierven en el momento o se guardan cocidos 3 días.',
      ingredientes: ['400 g de carne picada magra', '1 cebolla', '1 zanahoria y 1 zapallito rallados', '1 caja de puré de tomate', 'Fideos (1 puño por porción)', 'Ajo, orégano, sal, queso rallado'],
      pasos: [
        'Cebolla y ajo picados 5 min, sumá la carne hasta que se dore.',
        'Zanahoria y zapallito rallados (se pierden en la salsa) 2 min.',
        'Puré de tomate, orégano, sal y medio vaso de agua. Fuego bajo 15 min.',
        'Porcioná la salsa. Fideos: 90 g en crudo por persona.'
      ]
    },
    platito: {
      foto: { img: 'https://images.unsplash.com/photo-1544857083-7ac978ef18cb?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: '4wuewdN4YNk', autor: 'Louis Hansel' },
      nombre: 'Platito de Jaz (varias cositas)',
      tipo: 'Almuerzo', tiempo: '5 min con todo listo',
      intro: 'Elegí 4 o 5 cositas de las que quedaron listas el domingo. Con legumbres cuenta como su ensalada de la semana.',
      ingredientes: ['Legumbres: lentejas o porotos (½ taza)', 'Zanahoria rallada o en bastones', 'Tomates cherry', 'Huevo duro', 'Palta (cortada en el momento, con limón)', 'Extras: atún, pollo en tiras, arroz, choclo, queso azul'],
      pasos: [
        'Combinación 1: lentejas + zanahoria rallada + cherrys + huevo duro + palta.',
        'Combinación 2: porotos + atún + cherrys + choclo + palta.',
        'Combinación 3: arroz + huevo duro + palta + zanahoria en bastones + porotos.',
        'Aliño aparte en un frasquito: aceite de oliva, limón y sal (así no se humedece).'
      ]
    },
    'ensalada-fran': {
      foto: { img: 'https://images.unsplash.com/photo-1720305284322-07b6f099395c?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: 'y-zLr_3U0Dw', autor: 'Rejoice Denhere' },
      nombre: 'Ensalada simple (para sumar a cualquier almuerzo)',
      tipo: 'Almuerzo', tiempo: '3 min',
      intro: 'Al costado de cualquier almuerzo. Meta: 2 veces por semana.',
      ingredientes: ['Tomate redondo o cherry', 'Zanahoria rallada', 'Palta', 'Huevo duro (opcional)', 'Lechuga si hay', 'Aceite, aceto o limón, y sal'],
      pasos: ['Todo ya está listo del domingo: armala en el plato y condimentá en el momento.']
    },

    // ---------- Cenas rápidas ----------
    bife: {
      foto: { img: 'https://images.unsplash.com/photo-1644704265419-96ddaf628e71?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: '7WJV-SDSj6c', autor: 'Clark Douglas' },
      nombre: 'Bife a la plancha con puré de zapallo y zapallitos',
      tipo: 'Cena', tiempo: '20 min',
      intro: 'Del freezer: bolsa de bifes (a la heladera la noche anterior) y zapallo en cubos.',
      ingredientes: ['Bifes: 400 g en total', 'Zapallo anco en cubos', '2 zapallitos (o brócoli, si hay)', 'Manteca, sal, pimienta, nuez moscada'],
      pasos: [
        'Calabaza congelada: microondas tapada 8–10 min. Pisala con manteca, sal y nuez moscada.',
        'Zapallitos en medias lunas, salteados 5 min con un poco de aceite y sal.',
        'Plancha bien caliente: bifes secos con papel, sal, 3–4 min por lado.',
        'Reposo 3 min antes de cortar.'
      ]
    },
    merluza: {
      foto: { img: 'https://images.unsplash.com/photo-1599921841143-819065a55cc6?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: 'MyfbM2QYF4o', autor: 'Mark König' },
      nombre: 'Milanesas de merluza al horno con papas y zapallitos',
      tipo: 'Cena', tiempo: '30 min',
      ingredientes: ['500 g de milanesas de merluza (pueden ir congeladas)', '2 papas', '2 zapallitos', '1 limón, aceite, sal'],
      pasos: [
        'Horno a 200 °C. Papas en rodajas finas con aceite y sal: 15 min solas.',
        'Sumá los zapallitos en medias lunas y las milanesas en una fuente aceitada al lado.',
        'Milanesas 8 min, vuelta y 8 min más (unos minutos extra si iban congeladas). Limón al servir.'
      ]
    },
    salteado: {
      foto: { img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: 'rQX9eVpSFz8', autor: 'Christopher Alvarenga' },
      nombre: 'Salteado de pollo o carne con verduras y arroz',
      tipo: 'Cena', tiempo: '15 min',
      intro: 'Del freezer: tiras de pollo o carne y el mix de salteado. El arroz, del domingo.',
      ingredientes: ['400 g de tiras de pollo o carne', '1 bolsa de mix de salteado (cebolla, morrón, zanahoria, zapallito)', '2 cdas de salsa de soja', '1 diente de ajo', 'Arroz cocido (1 puño c/u)'],
      pasos: [
        'Sartén o wok muy caliente con un poco de aceite. Tiras 4–5 min, hasta dorar. Sacalas.',
        'Verduras (pueden ir congeladas) 5 min a fuego fuerte, que queden crocantes.',
        'Volvé la carne, sumá ajo picado y la soja. 1 minuto.',
        'Al plato con el arroz calentado.'
      ]
    },
    fajitas: {
      foto: { img: 'https://images.unsplash.com/photo-1689773976415-293dd893f77e?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: 'G3hZMCdLUdw', autor: 'Thomas Park' },
      nombre: 'Fajitas de pollo con palta',
      tipo: 'Cena', tiempo: '20 min',
      intro: 'Del freezer: tiras de pollo y el mix de fajitas. Sin picante.',
      ingredientes: ['400 g de tiras de pollo', '1 bolsa de mix de fajitas (cebolla y morrón)', '6 tortillas', 'Queso cremoso', '1 palta, ½ limón', 'Pimentón dulce, comino (opcional), sal'],
      pasos: [
        'Pollo con pimentón, comino y sal. Sartén caliente 5–6 min, sacalo.',
        'Cebolla y morrón 5 min en la misma sartén. Volvé el pollo.',
        'Palta pisada con limón y sal.',
        'Tortillas calientes, relleno, queso y palta. La regla del plato: 2 fajitas cada uno.'
      ]
    },
    'pollo-plancha': {
      foto: { img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: 'mjcJ0FFgdWI', autor: 'Mark DeYoung' },
      nombre: 'Pollo a la plancha con puré de batata y verduras',
      tipo: 'Cena', tiempo: '20 min',
      intro: 'Del freezer: pechugas fileteadas (a la heladera la noche anterior) y mix de salteado.',
      ingredientes: ['Pechuga fileteada: 400 g', '2 batatas', '1 bolsa de mix de salteado', 'Limón, orégano, aceite, sal'],
      pasos: [
        'Batata en cubos: hervida 12 min o microondas tapada 8 min. Pisala con sal.',
        'Pechugas con limón, orégano y sal. Plancha caliente 3–4 min por lado.',
        'Verduras salteadas 6 min a fuego fuerte.'
      ]
    },
    milanesitas: {
      foto: { img: 'https://images.unsplash.com/photo-1757715376249-b2a3e943cdf5?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: 'Ipji1U9RY0k', autor: 'Zayed Ahmed Zadu' },
      nombre: 'Milanesitas del freezer con ensalada',
      tipo: 'Cena', tiempo: '20 min',
      intro: 'La cena de emergencia: las milanesitas de pollo o de merluza y acelga que hay en el freezer.',
      ingredientes: ['4 milanesitas (pollo o merluza y acelga)', 'Tomate, zanahoria rallada y palta', 'Aceite, aceto o limón, sal'],
      pasos: [
        'Horno a 200 °C, milanesitas congeladas en fuente aceitada: 10 min, vuelta y 8 min más.',
        'Mientras, ensalada de tomate, zanahoria y palta.',
        'Regla del plato: media ensalada, milanesitas como proteína.'
      ]
    },
    'fideos-brocoli': {
      foto: { img: 'https://images.unsplash.com/photo-1563072915-8201ebcf6047?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: '95oPiEhowMo', autor: 'Kimiya Oveisi' },
      nombre: 'Fideos con pollo y verduras',
      tipo: 'Cena', tiempo: '20 min',
      intro: 'Del freezer: cubos de pollo. Esta semana con zapallitos y el mix de morrón; cuando haya, brócoli.',
      ingredientes: ['250 g de fideos cortos', '2 zapallitos y ½ bolsa de mix de cebolla y morrón (o 1 brócoli)', '300 g de pollo en cubos', '2 dientes de ajo', 'Aceite de oliva, queso rallado, limón, sal'],
      pasos: [
        'Hervé los fideos. Si es brócoli, sumalo a la olla los últimos 3 minutos; si son zapallitos y morrón, salteálos en la sartén.',
        'Mientras, sartén con aceite: pollo 6–8 min hasta dorar, y el ajo picado el último minuto.',
        'Escurrí guardando un cucharón del agua. Mezclá todo con ese agua, aceite de oliva y queso rallado.',
        'Unas gotas de limón al servir.'
      ]
    }
  },

  fuerza: {
    calentamiento: { nombre: 'Soga suave', fig: 'soga', segundos: 120, tip: 'Saltos chicos con los dos pies.' },
    ejercicios: [
      { nombre: 'Sentadilla goblet', fig: 'goblet', tip: 'Kettlebell de 8 kg contra el pecho. Bajá con la espalda recta.' },
      { nombre: 'Remo con banda', fig: 'remo', tip: 'Anclada a la puerta (bien cerrada). Codos hacia atrás, apretá la espalda.' },
      { nombre: 'Peso muerto rumano', fig: 'rumano', tip: 'Kettlebell. Cadera hacia atrás, rodillas apenas flexionadas, espalda recta.' },
      { nombre: 'Flexiones', fig: 'flexion', tip: 'Con rodillas apoyadas si hace falta.' },
      { nombre: 'Press de hombros', fig: 'press', tip: 'Mancuernas de 3 kg. Muchas reps, sin arquear la espalda.' },
      { nombre: 'Estocadas hacia atrás', fig: 'estocada', tip: 'Una mancuerna en cada mano, alternando piernas.' }
    ],
    vueltas: 2,
    final: [
      { nombre: 'Plancha', fig: 'plancha', segundos: 30, tip: 'Cuerpo recto, abdomen apretado.' },
      { nombre: 'Soga', fig: 'soga', segundos: 30, tip: '¡Último esfuerzo!' }
    ],
    progresion: 'Semana 2: 45 s de trabajo y 15 s de descanso. Cuando el peso muerto salga cómodo, cambialo por swings.'
  },

  correr: {
    duracion: '15 min',
    tips: [
      'Ritmo en el que puedas hablar: si no podés decir una frase entera, bajá.',
      'Un día de los tres, si querés: 1 min rápido + 2 min suave, repetido 5 veces.',
      'Cuenta como entreno y suma un montón de pasos.'
    ]
  },

  // Inventario: lo que hay en casa (compra del 23/11 + freezer). Tildá lo que se va terminando.
  superNota: 'Compra del 23/11 y lo que ya había. Tildá lo que se va terminando; lo de "Falta comprar", al comprarlo.',
  super: [
    { cat: 'Falta comprar', items: ['Brócoli · 1–2 (fideos, bife)', 'Lechuga · 1 (ensaladas)', 'Queso cremoso · 200 g (tarta, fajitas)', 'Salsa de soja (si no hay, para el salteado)', 'Lomo de cerdo o puré de tomate, si quieren cerdo o bolognesa'] },
    { cat: 'Freezer', items: ['Milanesas de pollo · 475 g', 'Milanesas de ternera · 590 g', 'Milanesas de cerdo · 480 g', 'Milanesas de merluza · 2', 'Milanesitas: 2 de pollo y 2 de merluza y acelga', 'Acelga congelada · bolsa', 'Cebolla picada congelada · bolsa', 'Mix de cebolla y morrón congelado'] },
    { cat: 'Carne y pollo (porcionar al freezer)', items: ['Filet de pollo · 1 kg', 'Bife · 670 g', 'Carne picada · 785 g'] },
    { cat: 'Verdura y fruta', items: ['Zapallo anco · 1 kg', 'Batata · 580 g', 'Zanahoria · 770 g', 'Zapallitos · 680 g', 'Cebolla · 450 g', 'Morrón rojo · 1', 'Tomate · 700 g', 'Tomates cherry · 500 g', 'Paltas · 4', 'Limones', 'Uvas, melón y manzanas'] },
    { cat: 'Despensa y heladera', items: ['Huevos', 'Arroz', 'Papas', 'Fideos', 'Rapiditas · 2 paquetes', 'Tapas pascualina · 1', 'Lentejas · 1', 'Porotos colorados · 1', 'Choclo · 1 lata', 'Atún · 1 lata', 'Yogur griego · 3', 'Queso rallado', 'Queso azul', 'Aceto, mayonesa'] }
  ]
};
