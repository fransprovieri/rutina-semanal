// Contenido del desafío: plan, menú, recetas, entreno y lista del súper.
// Editá este archivo para cambiar platos, cantidades o ejercicios.

window.DATA = {
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
    { id: 'entreno', titulo: 'Entreno del día', detalle: 'Correr lun · mié · vie. Fuerza mar · jue · sáb. Domingo libre.' },
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
    { hora: '18:30', titulo: 'Entreno', detalle: 'Fuerza o correr, 15 min.', tipo: 'movimiento' },
    { hora: '20:30', titulo: 'Cena', detalle: 'Última comida del día.', tipo: 'comida' },
    { hora: '21:00', titulo: 'Caminata post-cena', detalle: '10–15 min. Después, la cocina cierra.', tipo: 'movimiento' },
    { hora: '22:30', titulo: 'Pantallas afuera', detalle: 'Leer, música, dejar listo el día siguiente.', tipo: 'descanso' },
    { hora: '23:30', titulo: 'A dormir', detalle: '8 horas hasta el despertador.', tipo: 'descanso' }
  ],

  // 0 = domingo ... 6 = sábado (como Date.getDay())
  menu: {
    1: { almuerzo: 'bowl', cena: 'bife' },
    2: { almuerzo: 'wrap', cena: 'merluza' },
    3: { almuerzo: 'bowl', cena: 'cerdo' },
    4: { almuerzo: 'cerdo-sobra', cena: 'milanesas' },
    5: { almuerzo: 'wrap-sobra', cena: 'bolognesa' },
    6: { almuerzo: 'tortilla', cena: 'hamburguesas' },
    0: { almuerzo: 'libre', cena: 'mealprep' }
  },

  entreno: { 1: 'correr', 2: 'fuerza', 3: 'correr', 4: 'fuerza', 5: 'correr', 6: 'fuerza', 0: 'libre' },

  recetas: {
    'desayuno-a': {
      nombre: 'Desayuno A · Huevos revueltos con tostada',
      tipo: 'Desayuno', tiempo: '10 min',
      ingredientes: ['5–6 huevos', '2 rebanadas de pan', 'Manteca (1 pulgar cada uno)', 'Sal y pimienta', 'Café o mate'],
      pasos: [
        'Poné a tostar el pan.',
        'Batí los huevos con una pizca de sal.',
        'Sartén a fuego medio-bajo con un poco de manteca. Volcá los huevos y movelos despacio con espátula.',
        'Sacalos cuando todavía estén un poco húmedos: se terminan de hacer solos en el plato.',
        'Tostada con manteca, y listo.'
      ]
    },
    'desayuno-b': {
      nombre: 'Desayuno B · Tostada con dulce, yogur y huevo duro',
      tipo: 'Desayuno', tiempo: '5 min',
      ingredientes: ['2 rebanadas de pan', 'Manteca y dulce de arándanos', '2 yogures naturales sin azúcar', '2 huevos duros (del meal prep)', 'Café o mate'],
      pasos: [
        'Tostá el pan y untalo con manteca y una capa fina de dulce.',
        'Un yogur natural y un huevo duro cada uno.',
        'Tip: si el yogur te resulta ácido, sumale unas rodajas de banana o canela.'
      ]
    },
    mealprep: {
      nombre: 'Meal prep del domingo',
      tipo: 'Preparación', tiempo: '1 h 15 min',
      intro: 'Deja listos los almuerzos de lunes a miércoles y los huevos de los desayunos. Todo entra en la heladera hasta el miércoles.',
      ingredientes: [
        '1 kg de pollo (pechuga o muslo deshuesado)',
        '400 g de arroz (crudo)',
        '1 calabaza o zapallo anco',
        '3 zanahorias',
        '2 cebollas',
        '2 morrones',
        '2 papas o 1 batata (la parte de carbo de la bandeja)',
        '6 huevos',
        'Aceite de oliva, sal, pimienta, pimentón dulce, orégano, ajo, 1 limón'
      ],
      pasos: [
        '0:00 · Prendé el horno a 200 °C. Poné a hervir agua para los huevos.',
        '0:05 · Marinada del pollo: aceite, jugo de limón, ajo picado, pimentón, orégano, sal y pimienta. Mezclalo con el pollo en una fuente.',
        '0:10 · Cortá la calabaza, zanahoria, cebolla, morrón y papa en cubos parecidos (2–3 cm). Regla: 1 parte de papa, 3 partes del resto. Aceite, sal y pimienta, todo en una bandeja en una sola capa.',
        '0:15 · Las dos bandejas al horno: pollo arriba, verduras abajo.',
        '0:15 · Huevos al agua hirviendo, 10 minutos exactos. Después a agua fría.',
        '0:20 · Arroz: 400 g en olla con el doble de agua y sal. Hervor, tapá, fuego mínimo 15 min.',
        '0:35 · Dá vuelta las verduras.',
        '0:45 · Pollo listo cuando el jugo sale transparente (unos 30–35 min). Sacalo y dejalo reposar 5 min antes de cortar en tiras.',
        '0:50 · Verduras listas cuando están doradas y blandas. Si falta, 10 min más.',
        '1:00 · Dejá enfriar todo y guardalo en tuppers separados: pollo, arroz, verduras, huevos con cáscara.',
        'Guardado: hasta 3–4 días en la heladera. El pollo que no se use el miércoles, al freezer.'
      ]
    },
    bowl: {
      nombre: 'Bowl de pollo, arroz y verduras al horno',
      tipo: 'Almuerzo', tiempo: '5 min (con meal prep)',
      ingredientes: ['Pollo del meal prep (1–2 palmas c/u)', 'Arroz (1 puño c/u)', 'Verduras al horno (2 puños c/u)', 'Opcional: 1 tomate, limón, aceite de oliva'],
      pasos: [
        'Armá cada bowl con la regla de la mano: medio bowl de verdura, un cuarto de pollo, un cuarto de arroz.',
        'Calentá 2 minutos en el microondas.',
        'Terminalo con un chorrito de aceite de oliva y limón. Comé primero verdura y pollo.'
      ]
    },
    bife: {
      nombre: 'Bife a la plancha con puré de calabaza y brócoli',
      tipo: 'Cena', tiempo: '25 min',
      ingredientes: ['500 g de bife (nalga, cuadril o bife de chorizo)', '½ calabaza', '1 brócoli', 'Manteca, sal, pimienta, nuez moscada'],
      pasos: [
        'Pelá y cortá la calabaza en cubos. Hervila 15 min (o microondas tapada 10 min) hasta que esté blanda.',
        'Brócoli en ramitos: 4–5 min al vapor o hervido, que quede verde.',
        'Pisá la calabaza con un poco de manteca, sal y nuez moscada.',
        'Plancha o sartén bien caliente. Bifes secos con papel, sal y a la plancha: 3–4 min por lado para jugoso.',
        'Dejá reposar la carne 3 min antes de cortar.'
      ]
    },
    wrap: {
      nombre: 'Wraps de carne picada',
      tipo: 'Almuerzo', tiempo: '20 min',
      intro: 'Hacé el relleno para dos días: la mitad hoy, la otra mitad se guarda para el viernes.',
      ingredientes: ['600 g de carne picada magra', '1 cebolla', '1 morrón', '1 zanahoria rallada', '8 tortillas (4 hoy, 4 el viernes)', '150 g de queso cremoso', 'Lechuga y tomate', 'Pimentón dulce, comino (opcional), sal'],
      pasos: [
        'Picá la cebolla y el morrón chico. Rallá la zanahoria (no se nota y suma verdura).',
        'Sartén con un poco de aceite: cebolla y morrón 5 min.',
        'Sumá la carne, desarmala con cuchara y cociná 8–10 min hasta que se dore. Agregá la zanahoria, pimentón y sal.',
        'Separá la mitad en un tupper para el viernes.',
        'Calentá las tortillas en sartén seca 20 s por lado. Rellená con carne, un poco de queso, lechuga y tomate. Enrollá y a comer.'
      ]
    },
    'wrap-sobra': {
      nombre: 'Wraps de carne picada (relleno del martes)',
      tipo: 'Almuerzo', tiempo: '5 min',
      ingredientes: ['Relleno guardado del martes', '4 tortillas', 'Queso, lechuga y tomate'],
      pasos: ['Calentá el relleno en sartén o microondas.', 'Tortillas 20 s por lado en sartén seca.', 'Armá y enrollá igual que el martes.']
    },
    merluza: {
      nombre: 'Merluza al horno con papas y zapallitos',
      tipo: 'Cena', tiempo: '35 min',
      ingredientes: ['500 g de filet de merluza', '2 papas medianas', '3 zapallitos', '1 limón', 'Ajo, perejil, aceite de oliva, sal, pimienta'],
      pasos: [
        'Horno a 200 °C. Papas en rodajas finas (½ cm) con aceite y sal en una fuente: 15 min solas.',
        'Zapallitos en medias lunas.',
        'Sacá la fuente, agregá los zapallitos y poné los filetes arriba. Ajo picado, limón, aceite, sal y pimienta.',
        '12–15 min más: el pescado está cuando se separa en lascas con un tenedor.',
        'Perejil por arriba al servir.'
      ]
    },
    cerdo: {
      nombre: 'Lomo de cerdo al horno con batata y zanahoria',
      tipo: 'Cena', tiempo: '45 min',
      intro: 'Hacé el doble: la mitad es el almuerzo del jueves.',
      ingredientes: ['800 g de lomo de cerdo', '2 batatas', '4 zanahorias', '1 cebolla', 'Mostaza (1 cda), ajo, romero u orégano, aceite, sal, pimienta'],
      pasos: [
        'Horno a 200 °C.',
        'Batata y zanahoria en bastones, cebolla en gajos. Aceite y sal en una fuente.',
        'Untá el lomo con mostaza, ajo, hierbas, sal y pimienta. Sellalo 2 min por lado en sartén bien caliente (opcional, pero queda mucho más rico).',
        'Lomo arriba de las verduras, al horno 25–30 min. Está listo cuando adentro queda apenas rosado (63 °C si tenés termómetro).',
        'Reposo 5 min, cortá en medallones. Guardá la mitad para mañana.'
      ]
    },
    'cerdo-sobra': {
      nombre: 'Lomo de cerdo con batata (lo del miércoles)',
      tipo: 'Almuerzo', tiempo: '5 min',
      ingredientes: ['Lomo y verduras guardadas del miércoles', 'Opcional: tomate en rodajas'],
      pasos: ['Calentá en microondas tapado 2–3 min (o en sartén con una cucharada de agua para que no se seque).', 'Regla del plato: si te falta verdura, sumá tomate.']
    },
    milanesas: {
      nombre: 'Milanesas de pollo al horno con puré mixto',
      tipo: 'Cena', tiempo: '40 min',
      ingredientes: ['600 g de pechuga de pollo', '2 huevos', 'Pan rallado (1 taza)', 'Ajo, perejil, sal', '2 papas', '½ calabaza', 'Manteca, sal, nuez moscada', '2 tomates'],
      pasos: [
        'Horno a 200 °C. Fuente con un poco de aceite.',
        'Cortá las pechugas en filetes finos (o pedilas fileteadas en la carnicería).',
        'Batí los huevos con ajo, perejil y sal. Pasá cada filete por huevo y después por pan rallado.',
        'Al horno 10 min, dá vuelta y 8–10 min más hasta que estén doradas.',
        'Mientras tanto: papa y calabaza en cubos, hervidas juntas 15 min. Pisá con manteca, sal y nuez moscada.',
        'Servilas con tomate en rodajas.'
      ]
    },
    bolognesa: {
      nombre: 'Fideos con bolognesa mitad carne, mitad lentejas',
      tipo: 'Cena', tiempo: '35 min',
      intro: 'Las legumbres de la semana, escondidas en la salsa.',
      ingredientes: ['300 g de carne picada magra', '1 lata de lentejas (o 150 g secas ya cocidas)', '250 g de fideos (1 puño c/u)', '1 cebolla', '1 zanahoria y 1 zapallito rallados', '1 caja de puré de tomate', 'Ajo, orégano, sal, queso rallado'],
      pasos: [
        'Picá la cebolla y el ajo. Rallá la zanahoria y el zapallito.',
        'Sartén con aceite: cebolla 5 min, después la carne hasta que se dore.',
        'Sumá zanahoria, zapallito y las lentejas enjuagadas. 2 minutos.',
        'Puré de tomate, orégano, sal y medio vaso de agua. Fuego bajo 15 min.',
        'Mientras, hervé los fideos. Medida: 125 g por persona en crudo.',
        'Plato: mucha salsa, fideos medidos, queso rallado.'
      ]
    },
    tortilla: {
      nombre: 'Tortilla de papa y espinaca al horno',
      tipo: 'Almuerzo', tiempo: '40 min',
      ingredientes: ['6 huevos', '2 papas', '1 atado de espinaca (o ½ bolsa congelada)', '1 cebolla', '50 g de queso rallado', 'Sal, pimienta, aceite', 'Tomate para acompañar'],
      pasos: [
        'Horno a 180 °C. Papas en cubos chicos, hervidas 8 min.',
        'Cebolla en sartén 5 min, sumá la espinaca hasta que se achique. Si es congelada, escurrila bien.',
        'Batí los huevos con queso, sal y pimienta. Mezclá con la papa, la cebolla y la espinaca.',
        'Fuente aceitada, al horno 20–25 min hasta que el centro esté firme.',
        'Cortá en 4: dos porciones hoy, dos para picar otro día. Con tomate.'
      ]
    },
    hamburguesas: {
      nombre: 'Hamburguesas caseras al plato con verduras al horno',
      tipo: 'Cena', tiempo: '35 min',
      ingredientes: ['400 g de carne picada', '1 huevo (opcional)', 'Sal, pimienta, ajo en polvo', '2 rodajas de queso', 'Verduras para el horno: zapallo, zanahoria, cebolla, morrón y 1 papa', 'Lechuga y tomate'],
      pasos: [
        'Horno a 200 °C. Verduras en cubos con aceite y sal, 30 min (1 parte papa, 3 partes el resto).',
        'Mezclá la carne con sal, pimienta y ajo. Formá 2–4 medallones de 2 cm, con un hueco en el centro para que no se inflen.',
        'Plancha muy caliente: 3–4 min por lado. Queso arriba el último minuto.',
        'Al plato con las verduras, lechuga y tomate. Sin pan es la versión del desafío; si van con pan, que sea el puño de carbo y se saca la papa.'
      ]
    },
    libre: {
      nombre: 'Almuerzo libre',
      tipo: 'Almuerzo', tiempo: '—',
      ingredientes: [],
      pasos: ['Lo que quieran, respetando la regla del plato: media verdura, un cuarto de proteína, un cuarto de carbos.', 'Sin bebidas con azúcar ni alcohol.']
    }
  },

  fuerza: {
    calentamiento: { nombre: 'Soga suave', segundos: 120, tip: 'Saltos chicos con los dos pies.' },
    ejercicios: [
      { nombre: 'Sentadilla goblet', tip: 'Kettlebell de 8 kg contra el pecho. Bajá con la espalda recta.' },
      { nombre: 'Remo con banda', tip: 'Anclada a la puerta (bien cerrada). Codos hacia atrás, apretá la espalda.' },
      { nombre: 'Peso muerto rumano', tip: 'Kettlebell. Cadera hacia atrás, rodillas apenas flexionadas, espalda recta.' },
      { nombre: 'Flexiones', tip: 'Con rodillas apoyadas si hace falta.' },
      { nombre: 'Press de hombros', tip: 'Mancuernas de 3 kg. Muchas reps, sin arquear la espalda.' },
      { nombre: 'Estocadas hacia atrás', tip: 'Una mancuerna en cada mano, alternando piernas.' }
    ],
    vueltas: 2,
    final: [
      { nombre: 'Plancha', segundos: 30, tip: 'Cuerpo recto, abdomen apretado.' },
      { nombre: 'Soga', segundos: 30, tip: '¡Último esfuerzo!' }
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
    { cat: 'Proteínas', items: ['Pollo (pechuga o muslo deshuesado) · 1,6 kg', 'Carne picada magra · 1,3 kg', 'Bife (nalga, cuadril o bife de chorizo) · 500 g', 'Lomo de cerdo · 800 g', 'Merluza en filet · 500 g', 'Huevos · 1 maple de 30', 'Lentejas · 1 paquete chico o 2 latas'] },
    { cat: 'Lácteos', items: ['Yogur natural sin azúcar · 8 potes', 'Queso cremoso o de barra · 400 g', 'Manteca', 'Queso rallado'] },
    { cat: 'Carbohidratos', items: ['Arroz · 1 kg', 'Papa · 1,5 kg', 'Batata · 1 kg', 'Fideos · 500 g', 'Tortillas para wraps · 8', 'Pan rallado'] },
    { cat: 'Verduras', items: ['Calabaza o zapallo anco · 2', 'Zanahoria · 1 kg', 'Cebolla · 1,5 kg', 'Morrón · 4', 'Zapallitos · 1 kg', 'Brócoli · 2', 'Espinaca · 1 atado o bolsa congelada', 'Tomate · 1 kg', 'Lechuga · 1', 'Ajo', 'Limones · 2'] },
    { cat: 'Despensa', items: ['Puré de tomate · 2 cajas', 'Aceite de oliva', 'Sal y pimienta', 'Orégano y pimentón dulce', 'Mostaza', 'Nuez moscada', 'Yerba y café', 'Dulce de arándanos'] }
  ]
};
