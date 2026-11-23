// Guías visuales de los ejercicios: figuras simples en SVG con dos posiciones
// (inicio y final) que se alternan. Vista de costado, mirando a la derecha.
(() => {
  const P = {
    // Poses: h cabeza, n cuello, p cadera, k/f rodilla y pie, e/a codo y mano. 1 = lado de adelante, 2 = de atrás.
    pie: { h: [60, 16], n: [60, 26], p: [60, 54], k1: [62, 74], f1: [61, 94], k2: [58, 74], f2: [57, 94] }
  };
  const L = (a, b, cls = '') => `<line ${cls} x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
  const kb = (x, y) => `<g class="eq"><circle cx="${x}" cy="${y + 2}" r="5.5"/><path d="M${x - 3.5} ${y - 2} q3.5 -6 7 0" fill="none" stroke-width="2.5"/></g>`;
  const mancuerna = (x, y) => `<g class="eq"><line x1="${x - 5}" y1="${y}" x2="${x + 5}" y2="${y}" stroke-width="3"/><line x1="${x - 5}" y1="${y - 3.5}" x2="${x - 5}" y2="${y + 3.5}" stroke-width="3.5"/><line x1="${x + 5}" y1="${y - 3.5}" x2="${x + 5}" y2="${y + 3.5}" stroke-width="3.5"/></g>`;

  function cuerpo(q, extra = '') {
    const s = Object.assign({}, P.pie, q);
    return `<g class="back">${L(s.p, s.k2)}${L(s.k2, s.f2)}${s.e2 ? L(s.n, s.e2) + L(s.e2, s.a2) : ''}</g>
      ${L(s.n, s.p)}${L(s.p, s.k1)}${L(s.k1, s.f1)}${s.e1 ? L(s.n, s.e1) + L(s.e1, s.a1) : ''}
      <circle class="head" cx="${s.h[0]}" cy="${s.h[1]}" r="7"/>${extra}`;
  }

  const brazosCostado = { e1: [62, 40], a1: [62, 56], e2: [58, 40], a2: [58, 56] };

  const FIGS = {
    goblet: [
      cuerpo({ e1: [68, 40], a1: [64, 32], e2: [53, 40], a2: [57, 32] }, kb(61, 32)),
      cuerpo({ h: [64, 36], n: [60, 45], p: [46, 66], k1: [66, 70], f1: [62, 94], k2: [63, 72], f2: [58, 94], e1: [70, 57], a1: [67, 50], e2: [61, 58], a2: [62, 50] }, kb(66, 50))
    ],
    remo: [
      cuerpo({ h: [55, 19], n: [56, 29], p: [52, 57], k1: [57, 76], f1: [55, 94], k2: [51, 76], f2: [49, 94], e1: [74, 44], a1: [92, 47], e2: [73, 46], a2: [91, 49] },
        '<rect class="door" x="106" y="8" width="6" height="86" rx="1"/><line class="band" x1="92" y1="47" x2="106" y2="47"/>'),
      cuerpo({ h: [55, 19], n: [56, 29], p: [52, 57], k1: [57, 76], f1: [55, 94], k2: [51, 76], f2: [49, 94], e1: [42, 44], a1: [62, 47], e2: [44, 46], a2: [62, 49] },
        '<rect class="door" x="106" y="8" width="6" height="86" rx="1"/><line class="band" x1="62" y1="47" x2="106" y2="47"/>')
    ],
    rumano: [
      cuerpo(brazosCostado, kb(60, 61)),
      cuerpo({ h: [88, 40], n: [78, 44], p: [50, 56], k1: [56, 75], f1: [57, 94], k2: [54, 75], f2: [53, 94], e1: [79, 58], a1: [77, 70], e2: [75, 58], a2: [73, 70] }, kb(75, 75))
    ],
    flexion: [
      cuerpo({ h: [33, 64], n: [42, 68], p: [72, 80], k1: [88, 86], f1: [104, 92], k2: [88, 87], f2: [104, 93], e1: [42, 80], a1: [42, 93], e2: [44, 80], a2: [44, 93] }),
      cuerpo({ h: [32, 80], n: [42, 83], p: [72, 86], k1: [88, 89], f1: [104, 92], k2: [88, 90], f2: [104, 93], e1: [54, 79], a1: [44, 93], e2: [56, 80], a2: [46, 93] })
    ],
    press: [
      cuerpo({ e1: [70, 36], a1: [67, 24], e2: [51, 36], a2: [54, 24] }, mancuerna(67, 24) + mancuerna(54, 24)),
      cuerpo({ e1: [67, 14], a1: [65, 4], e2: [54, 14], a2: [56, 4] }, mancuerna(65, 4) + mancuerna(56, 4))
    ],
    estocada: [
      cuerpo(brazosCostado, mancuerna(62, 58) + mancuerna(58, 58)),
      cuerpo({ h: [58, 30], n: [58, 40], p: [58, 66], k1: [72, 72], f1: [72, 94], k2: [50, 88], f2: [37, 92], e1: [60, 54], a1: [60, 70], e2: [56, 54], a2: [56, 70] }, mancuerna(60, 72) + mancuerna(56, 72))
    ],
    plancha: [
      cuerpo({ h: [35, 68], n: [44, 72], p: [72, 80], k1: [88, 86], f1: [104, 92], k2: [88, 87], f2: [104, 93], e1: [44, 92], a1: [58, 92], e2: [46, 92], a2: [60, 92] })
    ],
    soga: [
      cuerpo({ h: [60, 18], n: [60, 28], p: [60, 56], k1: [61, 74], f1: [61, 91], k2: [59, 74], f2: [58, 91], e1: [68, 44], a1: [73, 54], e2: [52, 44], a2: [47, 54] },
        '<path class="rope" d="M47 54 Q60 130 73 54"/>'),
      cuerpo({ h: [60, 12], n: [60, 22], p: [60, 50], k1: [62, 68], f1: [61, 84], k2: [58, 68], f2: [58, 84], e1: [68, 38], a1: [73, 48], e2: [52, 38], a2: [47, 48] },
        '<path class="rope" d="M47 48 Q60 -44 73 48"/>')
    ]
  };

  window.figura = (id, cls = '') => {
    const f = FIGS[id];
    if (!f) return '';
    const anim = f.length > 1;
    return `<svg class="fig ${cls} ${anim ? 'anim' : ''}" viewBox="0 0 120 100" role="img" aria-label="Guía del ejercicio">
      <line class="ground" x1="6" y1="96" x2="114" y2="96"/>
      <g class="pA">${f[0]}</g>${anim ? `<g class="pB">${f[1]}</g>` : ''}</svg>`;
  };
})();
