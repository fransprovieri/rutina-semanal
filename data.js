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
  cenas: ['bife', 'merluza', 'salteado', 'fajitas', 'pollo-plancha', 'fideos-brocoli'],
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
      ingredientes: ['1 kg de pollo (pechuga o muslo)', '200 g de arroz crudo (o del arroz del domingo)', '1 calabaza chica, 2 zanahorias, 1 cebolla, 1 morrón', '1 papa o 1 batata', 'Aceite, limón, ajo, pimentón, orégano, sal'],
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
      ingredientes: ['300 g de carne picada magra (2 porciones)', '1 cebolla, 1 morrón, 1 zanahoria rallada', 'Tortillas (2 por porción)', 'Queso cremoso, lechuga y tomate', 'Pimentón dulce, sal'],
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
      nombre: 'Milanesas de pollo al horno con puré',
      tipo: 'Almuerzo', tiempo: '40 min en tanda',
      intro: 'Con milanesas ya empanadas de la carnicería: van del freezer al horno sin descongelar (sumá 5 min).',
      ingredientes: ['800 g de milanesas de pollo', '2 papas y ½ calabaza para el puré', 'Manteca, nuez moscada, sal'],
      pasos: [
        'Horno a 200 °C en fuente aceitada: 10 min, vuelta y 8–10 min más.',
        'Puré: papa y calabaza en cubos, hervidas 15 min, pisadas con manteca, sal y nuez moscada.',
        'Porcioná milanesa + puré en tuppers. Fría también va bien en un sándwich con tomate.'
      ]
    },
    tarta: {
      nombre: 'Tarta de acelga, cebolla y queso',
      tipo: 'Almuerzo', tiempo: '1 h en tanda',
      intro: 'Rinde 6 porciones. 4 días en heladera o freezer en porciones.',
      ingredientes: ['1 paquete de tapas de tarta (2 tapas)', '2 atados de acelga (solo las hojas, picadas)', '2 cebollas', '4 huevos', '200 g de queso cremoso en cubos', '50 g de queso rallado', 'Sal, pimienta, nuez moscada'],
      pasos: [
        'Horno a 200 °C. Cebolla picada en sartén 8 min.',
        'Sumá la acelga picada y cociná 5 min hasta que se achique. Escurrila bien apretando (si queda agua, la tarta se humedece).',
        'Mezclá con los huevos batidos, los dos quesos, sal, pimienta y nuez moscada.',
        'Una tapa en la tartera, el relleno, la otra tapa arriba. Repulgá los bordes y pinchá la tapa.',
        'Al horno 35–40 min, hasta que esté dorada. Enfriá y cortá en 6.'
      ]
    },
    pastel: {
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
      nombre: 'Platito de Jaz (varias cositas)',
      tipo: 'Almuerzo', tiempo: '5 min con todo listo',
      intro: 'Elegí 4 o 5 cositas de las que quedaron listas el domingo. Con legumbres cuenta como su ensalada de la semana.',
      ingredientes: ['Legumbres: lentejas o porotos (½ taza)', 'Zanahoria rallada o en bastones', 'Tomates cherry', 'Huevo duro', 'Palta (cortada en el momento, con limón)', 'Extras: pollo en tiras, queso en cubos, arroz, choclo'],
      pasos: [
        'Combinación 1: lentejas + zanahoria rallada + cherrys + huevo duro + palta.',
        'Combinación 2: porotos + pollo en tiras + cherrys + queso en cubos + choclo.',
        'Combinación 3: arroz + huevo duro + palta + zanahoria en bastones + porotos.',
        'Aliño aparte en un frasquito: aceite de oliva, limón y sal (así no se humedece).'
      ]
    },
    'ensalada-fran': {
      nombre: 'Ensalada simple (para sumar a cualquier almuerzo)',
      tipo: 'Almuerzo', tiempo: '3 min',
      intro: 'Al costado de cualquier almuerzo. Meta: 2 veces por semana.',
      ingredientes: ['Lechuga lavada', 'Tomate', 'Zanahoria rallada', 'Huevo duro (opcional)', 'Aceite, limón y sal'],
      pasos: ['Todo ya está listo del domingo: armala en el plato y condimentá en el momento.']
    },

    // ---------- Cenas rápidas ----------
    bife: {
      foto: { img: 'https://images.unsplash.com/photo-1644704265419-96ddaf628e71?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&q=70', id: '7WJV-SDSj6c', autor: 'Clark Douglas' },
      nombre: 'Bife a la plancha con puré de calabaza y brócoli',
      tipo: 'Cena', tiempo: '20 min',
      intro: 'Del freezer: bolsa de bifes (a la heladera la noche anterior), calabaza en cubos y brócoli.',
      ingredientes: ['Bifes: 400 g en total', 'Calabaza en cubos', 'Brócoli', 'Manteca, sal, pimienta, nuez moscada'],
      pasos: [
        'Calabaza congelada: microondas tapada 8–10 min. Pisala con manteca, sal y nuez moscada.',
        'Brócoli congelado: 4 min al vapor o en sartén con un poco de agua.',
        'Plancha bien caliente: bifes secos con papel, sal, 3–4 min por lado.',
        'Reposo 3 min antes de cortar.'
      ]
    },
    merluza: {
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
    'fideos-brocoli': {
      nombre: 'Fideos con brócoli y pollo',
      tipo: 'Cena', tiempo: '20 min',
      intro: 'Del freezer: cubos de pollo y brócoli.',
      ingredientes: ['250 g de fideos cortos', '1 brócoli (o 1 bolsa congelada)', '300 g de pollo en cubos', '2 dientes de ajo', 'Aceite de oliva, queso rallado, limón, sal'],
      pasos: [
        'Hervé los fideos. En los últimos 3 minutos sumá el brócoli a la misma olla.',
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

  super: [
    { cat: 'Proteínas', items: ['Pechuga de pollo · 1,7 kg — bowls y cenas', 'Milanesas de pollo ya empanadas · 800 g', 'Carne picada magra · 1,2 kg — wraps, pastel y bolognesa', 'Bife o carne para tiras · 800 g', 'Lomo de cerdo · 600 g', 'Milanesas de merluza · 500 g', 'Huevos · 1 maple de 30', 'Lentejas · 1 lata', 'Porotos · 1 lata'] },
    { cat: 'Lácteos', items: ['Yogur natural sin azúcar · 8 potes', 'Queso cremoso o de barra · 500 g', 'Queso rallado', 'Manteca'] },
    { cat: 'Carbohidratos', items: ['Arroz · 1 kg', 'Papa · 2 kg', 'Batata · 1 kg', 'Fideos · 1 kg (largos y cortos)', 'Tortillas · 16', 'Tapas de tarta · 1 paquete', 'Choclo · 1 lata (platitos)'] },
    { cat: 'Verduras', items: ['Calabaza o zapallo anco · 2', 'Zanahoria · 1,5 kg', 'Cebolla · 2 kg', 'Morrón · 5', 'Zapallitos · 1 kg', 'Brócoli · 3', 'Acelga · 2 atados (ya tienen)', 'Tomate · 1 kg', 'Tomates cherry · 2 bandejas', 'Lechuga · 1', 'Palta · 3', 'Ajo', 'Limones · 3'] },
    { cat: 'Despensa', items: ['Bolsas tipo zip para freezer', 'Tuppers individuales · 8–10', 'Film y papel aluminio', 'Puré de tomate · 1 caja', 'Salsa de soja', 'Mostaza', 'Aceite de oliva', 'Sal, pimienta, orégano, pimentón dulce, nuez moscada', 'Yerba, café y dulce de arándanos'] }
  ]
};
