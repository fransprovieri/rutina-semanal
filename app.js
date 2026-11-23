(() => {
  const D = window.DATA;
  const KEY = 'rutina-semanal-v1';
  const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const DIAS_CORTOS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const ORDEN_SEMANA = [1, 2, 3, 4, 5, 6, 0];

  // ---------- Estado ----------
  const defaults = () => ({ user: 'fran', start: null, checks: {}, medidas: {}, super: {}, extras: [], tab: 'hoy', syncCode: null, comidas: [], cocinado: {} });
  let S;
  try { S = Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { S = defaults(); }
  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify(S)); }
    catch (e) {
      // Si no entra (fotos), se guarda sin fotos: igual quedan en la nube si está sincronizado
      try { localStorage.setItem(KEY, JSON.stringify(Object.assign({}, S, { comidas: (S.comidas || []).map((c) => Object.assign({}, c, { foto: null })) }))); } catch (e2) { /* sin almacenamiento */ }
    }
  };

  // ---------- Sincronización (ver sync.js) ----------
  let pendingRender = false;
  window.APP = {
    get state() { return S; },
    queue: [],
    syncStatus: 'sin-config',
    saveLocal: () => save(),
    rerender: () => {
      const a = document.activeElement;
      if (a && a.tagName === 'INPUT' && document.getElementById('app').contains(a)) { pendingRender = true; return; }
      render();
    }
  };
  document.addEventListener('focusout', () => { if (pendingRender) { pendingRender = false; setTimeout(render, 0); } });
  const push = (path, value) => { window.APP.queue.push([path, value]); if (window.SYNC) window.SYNC.flush(); };
  const pushTodo = () => { ['start', 'checks', 'medidas', 'super', 'extras', 'cocinado'].forEach((k) => push([k], S[k])); (S.comidas || []).forEach((c) => push(['__comida'], c)); };
  const nuevoCodigo = () => {
    const abc = 'abcdefghjkmnpqrstuvwxyz23456789';
    const r = crypto.getRandomValues(new Uint8Array(20));
    return Array.from(r, (x) => abc[x % abc.length]).join('').match(/.{4}/g).join('-');
  };

  // UI temporal (no se guarda)
  const UI = { fecha: null, comidasVista: 'almuerzos', recetaPasos: {}, superConfirm: false };

  // ---------- Fechas ----------
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return iso(d); };
  const hoy = () => iso(new Date());
  const diaDesafio = (s) => S.start ? Math.round((parse(s) - parse(S.start)) / 86400000) + 1 : null;
  const fechaLarga = (s) => { const d = parse(s); return `${DIAS[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`; };
  UI.fecha = hoy();

  // ---------- Helpers ----------
  const $ = (sel) => document.querySelector(sel);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const icon = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',
    chev: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    hoy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12l3 3 5-6"/></svg>',
    comidas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="13" r="7"/><path d="M12 6v7l4 2"/></svg>',
    entreno: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10v4M6 7v10M18 7v10M21 10v4M6 12h12"/></svg>',
    super: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.5 11h11L21 7H7"/><circle cx="9" cy="19" r="1.5"/><circle cx="18" cy="19" r="1.5"/></svg>',
    progreso: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>'
  };
  const tipoColor = { comida: 'var(--orange)', movimiento: 'var(--green)', descanso: 'var(--blue)', trabajo: 'var(--grey)' };

  const userChecks = (u, f) => ((S.checks[u] = S.checks[u] || {})[f] = S.checks[u][f] || {});
  const peekChecks = (u, f) => (S.checks[u] && S.checks[u][f]) || {};
  const hechos = (c) => D.habitos.filter((h) => h.tipo === 'numero' ? Number(c[h.id]) > 0 : c[h.id]).length;
  const desayunoDe = (f) => { const n = diaDesafio(f) || parse(f).getDate(); return n % 2 === 1 ? 'desayuno-a' : 'desayuno-b'; };
  const semana2 = () => { const n = diaDesafio(hoy()); return n !== null && n > 7; };

  let toastT;
  const toast = (msg) => {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 1800);
  };

  const foto = (r, w) => r.foto ? `${r.foto.img}&w=${w}` : null;
  const thumb = (r) => r.foto ? `<img class="thumb" src="${foto(r, 160)}" alt="" loading="lazy">` : '<span class="thumb ph"></span>';

  const fotoComida = (c) => c.foto ? `<img class="thumb" src="${c.foto}" alt="">` : (c.receta && D.recetas[c.receta] ? thumb(D.recetas[c.receta]) : '<span class="thumb ph"></span>');
  const semanaDe = (f) => { const off = (parse(f).getDay() + 6) % 7; const ini = addDays(f, -off); return Array.from({ length: 7 }, (_, i) => addDays(ini, i)); };
  const ensaladasSemana = (u, f) => { const sem = semanaDe(f); return (S.comidas || []).filter((c) => c.user === u && sem.includes(c.fecha) && c.ensalada).length; };
  const haceDias = (id) => { const d = (S.cocinado || {})[id]; return d ? Math.round((parse(hoy()) - parse(d)) / 86400000) : null; };
  const badgeListo = (id) => { const n = haceDias(id); return n !== null && n <= 4 ? `<span class="tag green">${n === 0 ? 'Cocinado hoy' : 'Cocinado hace ' + n + ' d'}</span>` : ''; };

  // ---------- Porciones ----------
  // Las cantidades de data.js son estándar; se muestran multiplicadas por D.porcion (0,7 = porciones chicas)
  const NO_ESCALAR = /tapa|paquete|maple|lata|caja|diente|limón|limones|tupper|bolsa|cda|frasco/i;
  const frac = (x) => { const e = Math.floor(x), r = x - e; const f = r >= 0.5 ? '½' : ''; return e === 0 ? (f || '½') : e + (f ? ' ' + f : ''); };
  const contar = (n) => { const x = n * D.porcion; return x >= 2.75 ? String(Math.round(x)) : frac(Math.round(x * 2) / 2); };
  const peso = (n, u) => {
    let g = parseFloat(String(n).replace(',', '.')) * (u === 'kg' ? 1000 : 1) * D.porcion;
    if (g >= 1000) return (Math.round(g / 100) / 10).toString().replace('.', ',') + ' kg';
    g = g >= 200 ? Math.round(g / 50) * 50 : Math.round(g / 10) * 10;
    return g + ' g';
  };
  const escalar = (t) => {
    if (!D.porcion || D.porcion === 1) return t;
    let out = t.replace(/(\d+(?:,\d+)?)\s?(kg|g)\b/g, (_, n, u) => peso(n, u));
    if (NO_ESCALAR.test(t)) return out;
    out = out.replace(/^(\d+)(?=\s+(?!(?:kg|g)\b)[a-záéíóúñ])/i, (m, n) => (+n >= 2 ? contar(+n) : m));
    out = out.replace(/·\s(\d+)(?=\s|$)(?!\s*(kg|g)\b)/, (m, n) => (+n >= 2 ? '· ' + contar(+n) : m));
    return out;
  };

  // Dos columnas en escritorio; en el celular se apilan
  const cols = (izq, der) => `<div class="cols"><div class="col">${izq}</div><div class="col">${der}</div></div>`;

  // ---------- Vistas ----------
  function vistaHoy() {
    const f = UI.fecha;
    const d = parse(f).getDay();
    const n = diaDesafio(f);
    const c = peekChecks(S.user, f);
    const nombre = D.usuarios.find((u) => u.id === S.user).nombre;
    const hello = `<div class="hello"><h1>hola, <em>${esc(nombre.toLowerCase())}</em></h1><p>${esc(fechaLarga(f))}${f === hoy() ? ' · hoy' : ''}</p></div>`;
    let hero;
    if (!S.start) {
      hero = `<div class="card hero">
        <h2><em>desafío</em> 14 días</h2>
        <p class="muted">Elegí el día 1. Lo pueden cambiar después en Progreso.</p>
        <div class="field"><input type="date" id="startInput" value="${hoy()}" aria-label="Fecha de inicio"></div>
        <button class="btn" data-action="setStart">Empezar</button>
      </div>`;
    } else {
      const nn = Math.max(0, Math.min(14, n));
      const label = n < 1 ? `faltan ${1 - n} día${1 - n === 1 ? '' : 's'}` : n > 14 ? 'terminado' : `${n} <span class="muted" style="font-size:22px">de 14</span>`;
      hero = `<div class="card hero">
        <div class="hero-day">
          <h2 style="white-space:nowrap"><em>día</em> ${label}</h2>
          <div class="datenav">
            <button class="icon-btn" data-action="prevDay" aria-label="Día anterior">${icon.left}</button>
            <button class="icon-btn" data-action="nextDay" aria-label="Día siguiente">${icon.right}</button>
          </div>
        </div>
        <p style="font-size:17px"><b style="font-weight:500">${Math.round(nn / 14 * 100)}%</b> <span class="muted">del desafío completado</span></p>
        <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="14" aria-valuenow="${nn}"><div style="width:${nn / 14 * 100}%"></div></div>
        <div class="kv"><span>Termina</span><span>${esc(fechaLarga(addDays(S.start, 13)))}</span></div>
        <div class="hr"></div>
        ${f !== hoy() ? `<button class="link-row" data-action="goToday">Volver a hoy ${icon.chev}</button>` : `<button class="link-row" data-tab="progreso">Progreso y medidas ${icon.chev}</button>`}
      </div>`;
    }

    const delDia = (S.comidas || []).filter((x) => x.user === S.user && x.fecha === f).sort((a, b) => a.ts - b.ts);
    const ens = D.ensaladas[S.user];
    const filasComida = delDia.length ? delDia.map((x) => `<div class="row">${fotoComida(x)}
        <span class="grow"><span class="sub">${x.tipo === 'cena' ? 'Cena' : 'Almuerzo'}${x.ensalada ? ' · con ensalada' : ''}</span><b>${esc(x.receta && D.recetas[x.receta] ? D.recetas[x.receta].nombre : x.texto || 'Comida')}</b>${x.receta && x.texto ? `<span class="sub">${esc(x.texto)}</span>` : ''}</span>
        <button class="icon-btn" data-action="comidaDel" data-id="${x.id}" aria-label="Borrar">${icon.close}</button></div>`).join('')
      : '<div class="row"><span class="grow"><span class="sub">Todavía no registraste nada. Es opcional: sirve para acordarse qué funcionó.</span></span></div>';

    const e = D.entreno[S.user][d];
    const otro = D.usuarios.find((u) => u.id !== S.user);
    const juntos = e !== 'libre' && e !== 'pilates' && D.entreno[otro.id][d] === e ? ` <span class="tag green">Con ${esc(otro.nombre)}</span>` : '';
    let entreno;
    if (e === 'fuerza') {
      entreno = `<div class="card" style="display:flex;flex-direction:column;gap:10px">
        <div><b style="font-size:17px">Fuerza · 15 min</b>${juntos}<p class="muted small">Calentamiento, 2 vueltas de 6 ejercicios y final. ${semana2() ? '45/15 s' : '40/20 s'}.</p></div>
        <button class="btn green" data-action="startTimer">Empezar circuito con timer</button></div>`;
    } else if (e === 'correr') {
      entreno = `<div class="card"><b style="font-size:17px">Correr · 15 min</b>${juntos}<p class="muted small">${esc(D.correr.tips[0])}</p></div>`;
    } else if (e === 'pilates') {
      entreno = `<div class="card"><b style="font-size:17px">Pilates</b><p class="muted small">Tu clase de hoy es tu entrenamiento del día. Tildalo en el checklist cuando vuelvas.</p></div>`;
    } else {
      entreno = `<div class="card"><b style="font-size:17px">Día libre</b><p class="muted small">Caminata tranquila si tenés ganas. Hoy toca preparar la comida de la semana.</p></div>`;
    }

    const items = D.habitos.map((h) => {
      if (h.tipo === 'numero') {
        return `<div class="row"><span class="grow"><b>${esc(h.titulo)}</b><span class="sub">${esc(h.detalle)}</span></span>
          <input class="num" type="number" inputmode="numeric" min="0" step="100" placeholder="0" value="${c[h.id] || ''}" data-num="${h.id}" aria-label="${esc(h.titulo)}"></div>`;
      }
      const on = !!c[h.id];
      return `<button class="row check ${on ? 'on' : ''}" data-action="toggle" data-id="${h.id}" aria-pressed="${on}">
        <span class="box">${icon.check}</span>
        <span class="grow"><b>${esc(h.titulo)}</b><span class="sub">${esc(h.detalle)}</span></span></button>`;
    }).join('');

    const energia = [1, 2, 3, 4, 5].map((v) => `<button data-action="energia" data-v="${v}" aria-pressed="${c.energia === v}" aria-label="Energía ${v}">${v}</button>`).join('');

    const sched = D.horario.map((h) => `<div><span class="t">${h.hora}</span><span class="c" style="background:${tipoColor[h.tipo]}"></span><span><b>${esc(h.titulo)}</b> <span class="muted">· ${esc(h.detalle)}</span></span></div>`).join('');

    return cols(`<div style="order:1">${hello}</div><div style="order:2;margin-bottom:18px">${hero}</div>
      <div class="section" style="order:4">
        <div class="section-title"><h2>Comidas</h2><span>Ensalada cruda: ${ensaladasSemana(S.user, f)}/${ens.meta} esta semana</span></div>
        <div class="group">${filasComida}</div>
        <div class="btn-row"><button class="btn" data-action="registrar" data-tipo="almuerzo">+ Almuerzo</button><button class="btn" data-action="registrar" data-tipo="cena">+ Cena</button></div>
        <button class="link-row" data-tab="comidas" style="padding:0 6px">Ver opciones de la semana ${icon.chev}</button>
      </div>
      <div class="section" style="order:5">
        <div class="section-title"><h2>Entrenamiento</h2></div>
        ${entreno}
      </div>
      <details class="card" style="order:6"><summary>Cómo se ve el día ${icon.chev}</summary><div class="sched">${sched}</div></details>`,
      `<div class="section" style="order:3">
        <div class="section-title"><h2>Checklist</h2><span>${hechos(c)}/${D.habitos.length}</span></div>
        <div class="group">${items}
          <div class="row"><span class="box" style="border-style:dashed"></span><span class="grow"><b>Energía</b><span class="sub">Del 1 al 5, ¿cómo te sentiste hoy?</span></span></div>
          <div class="scale-row"><div class="scale">${energia}</div></div>
        </div>
      </div>`);
  }

  function vistaComidas() {
    const v = ['almuerzos', 'cenas', 'prep'].includes(UI.comidasVista) ? UI.comidasVista : 'almuerzos';
    const seg = `<div class="seg" role="group" aria-label="Vista">
      <button data-action="cv" data-v="almuerzos" aria-pressed="${v === 'almuerzos'}">Almuerzos</button>
      <button data-action="cv" data-v="cenas" aria-pressed="${v === 'cenas'}">Cenas</button>
      <button data-action="cv" data-v="prep" aria-pressed="${v === 'prep'}">Preparación</button></div>`;
    const fila = (id) => { const r = D.recetas[id]; return `<button class="row" data-action="receta" data-id="${id}">${thumb(r)}<span class="grow"><b>${esc(r.nombre)}</b><span class="sub">${esc(r.tiempo)}</span></span>${badgeListo(id)}<span class="chev">${icon.chev}</span></button>`; };
    let body;
    if (v === 'almuerzos') {
      const orden = [S.user, ...D.usuarios.map((u) => u.id).filter((u) => u !== S.user)];
      body = `<p class="muted small" style="padding:0 6px">Comidas que se cocinan en tanda y quedan en tuppers. Cada día elegís la que tengas ganas.</p>` +
        orden.map((u) => {
          const nom = D.usuarios.find((x) => x.id === u).nombre;
          const e = D.ensaladas[u];
          return `<div class="section-title" style="padding-top:8px"><h2 style="font-size:19px">De ${esc(nom)}</h2><span>Ensalada cruda ${e.meta} por semana</span></div>
            <div class="group flat">${D.almuerzos[u].filter((id) => !(D.sinStock || []).includes(id)).map(fila).join('')}${u === 'fran' ? fila('ensalada-fran') : ''}</div>`;
        }).join('') +
        ((D.sinStock || []).length ? `<div class="section-title" style="padding-top:8px"><h2 style="font-size:19px">Sin ingredientes esta semana</h2><span>Para la próxima compra</span></div><div class="group flat" style="opacity:0.6">${D.sinStock.map(fila).join('')}</div>` : '') +
        `<div class="section-title" style="padding-top:8px"><h2 style="font-size:19px">Desayunos</h2></div><div class="group flat">${D.desayunos.map(fila).join('')}</div>`;
    } else if (v === 'cenas') {
      body = `<p class="muted small" style="padding:0 6px">Los ingredientes quedan cortados y porcionados (freezer y heladera). A la noche elegís una y se cocina en 15–30 min.</p>
        <div class="group flat">${D.cenas.map(fila).join('')}</div>`;
    } else {
      body = `<button class="row card dark" data-action="receta" data-id="mealprep" style="padding:20px 24px">
          <span class="grow"><span class="eyebrow"><em style="font-size:18px;color:var(--ink)">domingo</em></span><b>${esc(D.recetas.mealprep.nombre)}</b><span class="sub">${esc(D.recetas.mealprep.tiempo)} · deja todo listo para elegir</span></span><span class="chev">${icon.chev}</span></button>
        <div class="days-grid">${D.guardado.map((g) => `<div class="card" style="display:flex;flex-direction:column;gap:8px"><div class="day-head" style="padding:0"><h3>${esc(g.titulo)}</h3>${g.dura ? `<span class="tag">${esc(g.dura)}</span>` : ''}</div><ul class="ing">${g.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>`).join('')}</div>`;
    }
    return `<div class="section"><div class="section-title"><h2>Comidas</h2></div>${seg}${body}</div>
      <div class="card" style="display:flex;gap:16px;align-items:center">
        <div class="plate" role="img" aria-label="Plato: mitad verdura, un cuarto proteína, un cuarto carbohidratos"></div>
        <div class="legend"><b>La regla del plato</b>
          <span><i style="background:#3F8A5F"></i>Verdura · 2 puños</span>
          <span><i style="background:#B04A15"></i>Proteína · 1–2 palmas</span>
          <span><i style="background:#E0B44C"></i>Carbos · 1 puño</span>
          <span class="muted small">Grasa · 1 pulgar. Verdura primero.</span></div>
      </div>`;
  }

  function vistaEntreno() {
    const F = D.fuerza;
    const w = semana2() ? 45 : 40, r = 60 - w;
    const ej = F.ejercicios.map((e, i) => `<div class="row"><span class="fig-box">${figura(e.fig)}</span><span class="grow"><b>${esc(e.nombre)}</b><span class="sub">${esc(e.tip)}</span></span></div>`).join('');
    const hd = parse(hoy()).getDay();
    const LET = { fuerza: 'F', correr: 'C', pilates: 'P', libre: '–' };
    const NOM = { fuerza: 'Fuerza', correr: 'Correr', pilates: 'Pilates', libre: 'Libre' };
    let sem = '<div class="wk2"><span></span>' + ORDEN_SEMANA.map((d) => `<span class="wk-lbl ${d === hd ? 'is-today' : ''}">${DIAS_CORTOS[d][0]}</span>`).join('');
    D.usuarios.forEach((u) => {
      sem += `<span class="wk-name">${esc(u.nombre)}</span>` + ORDEN_SEMANA.map((d) => { const e = D.entreno[u.id][d]; return `<span class="wk-cell ${d === hd ? 'is-today' : ''}"><span class="wk-dot ${e}" title="${NOM[e]}" aria-label="${esc(u.nombre)}, ${DIAS[d]}: ${NOM[e]}">${LET[e]}</span></span>`; }).join('');
    });
    sem += '<span class="wk-name small muted">Juntos</span>' + ORDEN_SEMANA.map((d) => { const a1 = D.entreno.fran[d], a2 = D.entreno.jazmin[d]; return `<span class="wk-cell">${a1 === a2 && a1 !== 'libre' ? '<span class="wk-juntos" aria-label="Juntos">●</span>' : ''}</span>`; }).join('') + '</div>';
    const semana = `<div class="section"><div class="section-title"><h2>La semana</h2></div>
        <div class="card">${sem}
          <div class="wk-legend"><span><i class="wk-dot fuerza">F</i>Fuerza</span><span><i class="wk-dot correr">C</i>Correr</span><span><i class="wk-dot pilates">P</i>Pilates</span><span><i class="wk-dot libre">–</i>Libre</span></div></div></div>`;
    return cols(semana + `<div class="section">
        <div class="section-title"><h2>Fuerza · 15 min</h2><span>${w}/${r} s</span></div>
        <div class="card"><b>Cómo es</b><p class="muted" style="margin-top:4px">2 min de ${esc(F.calentamiento.nombre.toLowerCase())} → ${F.vueltas} vueltas de los 6 ejercicios (${w} s de trabajo, ${r} s de descanso) → 30 s de plancha y 30 s de soga.</p></div>
        <div class="group">${ej}</div>
        <p class="muted small" style="padding:0 6px">${esc(F.progresion)}</p>
        <button class="btn green" data-action="startTimer">Empezar circuito con timer</button>
      </div>`, `<div class="section">
        <div class="section-title"><h2>Correr · ${esc(D.correr.duracion)}</h2></div>
        <div class="group flat">${D.correr.tips.map((t) => `<div class="row"><span class="grow"><span style="font-size:16px">${esc(t)}</span></span></div>`).join('')}</div>
      </div>`);
  }

  function vistaSuper() {
    const total = D.super.reduce((a, c) => a + c.items.length, 0) + S.extras.length;
    const marcados = Object.values(S.super).filter(Boolean).length;
    const item = (key, txt, extra) => {
      const on = !!S.super[key];
      const b = `<button class="row check ${on ? 'on' : ''}" data-action="superToggle" data-key="${esc(key)}" aria-pressed="${on}" style="min-height:56px">
          <span class="box">${icon.check}</span><span class="grow"><b style="font-size:16px">${esc(txt)}</b></span></button>`;
      return extra ? `<div class="row" style="padding:0 16px 0 0">${b}<button class="icon-btn" data-action="superDel" data-key="${esc(key)}" aria-label="Borrar ${esc(txt)}">${icon.close}</button></div>` : b;
    };
    const cats = D.super.map((c) => `<div class="super-cat"><h3>${esc(c.cat)}</h3><div class="group">${c.items.map((t) => item(c.cat + '|' + t, t)).join('')}</div></div>`).join('');
    const extras = S.extras.length ? `<div class="super-cat"><h3>Agregados</h3><div class="group">${S.extras.map((t) => item('extra|' + t, t, true)).join('')}</div></div>` : '';
    return `<div class="section">
        <div class="section-title"><h2>Lo que hay</h2><span>${marcados}/${total}</span></div>
        <p class="muted small">${esc(D.superNota || '')}</p>
        <form class="add" data-form="addItem"><input name="item" placeholder="Agregar algo…" aria-label="Agregar a la lista" autocomplete="off"><button class="btn" type="submit">Agregar</button></form>
        <div class="super-grid">${cats}${extras}</div>
        <button class="btn ghost" data-action="superReset">${UI.superConfirm ? 'Tocá de nuevo para confirmar' : 'Desmarcar todo (nueva semana)'}</button>
      </div>`;
  }

  function vistaProgreso() {
    const u = S.user;
    const md = S.medidas[u] || {};
    const meta = md.altura ? (md.altura / 2).toFixed(1) : '—';
    const dif = md.c1 && md.c14 ? (md.c14 - md.c1).toFixed(1) : null;
    const ratio = (md.c14 || md.c1) && md.altura ? ((md.c14 || md.c1) / md.altura).toFixed(2) : null;

    let grid = '<p class="muted small">Elegí la fecha de inicio para ver la grilla.</p>';
    if (S.start) {
      const nHoy = diaDesafio(hoy());
      let g = '<div class="pgrid"><span></span>' + Array.from({ length: 14 }, (_, i) => `<span class="h">${i + 1}</span>`).join('');
      D.usuarios.forEach((us) => {
        g += `<span class="name">${esc(us.nombre)}</span>`;
        for (let i = 0; i < 14; i++) {
          const f = addDays(S.start, i);
          const h = hechos(peekChecks(us.id, f));
          const lvl = h === 0 ? '' : h <= 3 ? 'l1' : h <= 5 ? 'l2' : 'l3';
          g += `<button class="dot ${lvl} ${i + 1 === nHoy ? 'now' : ''}" data-action="goDate" data-date="${f}" aria-label="${esc(us.nombre)}, día ${i + 1}: ${h} de ${D.habitos.length}"></button>`;
        }
      });
      grid = g + '</div><p class="muted small">Más oscuro = más hábitos cumplidos. Tocá un día para completarlo.</p>';
    }

    const habitos = D.habitos.map((h, i) => `<div class="row"><span class="tag green">${i + 1}</span><span class="grow"><b>${esc(h.titulo)}</b><span class="sub">${esc(h.detalle)}</span></span></div>`).join('');
    const nombre = D.usuarios.find((x) => x.id === u).nombre;

    return cols(`<div class="card dark" style="display:flex;flex-direction:column;gap:8px;margin-bottom:22px">
        <span class="eyebrow"><em style="font-size:20px;color:var(--ink)">el objetivo</em></span><h2 style="font-size:28px">${esc(D.objetivo.titulo)}</h2>
        <p class="muted">${esc(D.objetivo.texto)}</p><p><b>Meta:</b> ${esc(D.objetivo.meta)}</p></div>
      <div class="section"><div class="section-title"><h2>Los 14 días</h2></div><div class="card">${grid}</div></div>
      <div class="section">
        <div class="section-title"><h2>Medidas de ${esc(nombre)}</h2></div>
        <div class="card" style="display:flex;flex-direction:column;gap:12px">
          <p class="muted small">En ayunas, relajado, cinta entre la última costilla y la cadera. Siempre en el mismo lugar.</p>
          <div class="grid2">
            <div class="field"><label for="m-altura">Altura (cm)</label><input id="m-altura" type="number" inputmode="decimal" data-med="altura" value="${md.altura || ''}"></div>
            <div class="stat"><span class="small muted">Meta de cintura</span><strong>${meta}${md.altura ? ' cm' : ''}</strong></div>
            <div class="field"><label for="m-c1">Cintura día 1 (cm)</label><input id="m-c1" type="number" inputmode="decimal" step="0.1" data-med="c1" value="${md.c1 || ''}"></div>
            <div class="field"><label for="m-c14">Cintura día 14 (cm)</label><input id="m-c14" type="number" inputmode="decimal" step="0.1" data-med="c14" value="${md.c14 || ''}"></div>
          </div>
          ${dif !== null ? `<div class="stat"><span class="small muted">Diferencia</span><strong>${dif > 0 ? '+' : ''}${dif} cm</strong></div>` : ''}
          ${ratio ? `<p class="small">Cintura / altura: <b>${ratio}</b> ${ratio < 0.5 ? '· por debajo de 0,5 ✓' : '· la meta es menos de 0,5'}</p>` : ''}
        </div>
      </div>
`, `<div class="section"><div class="section-title"><h2>Los 7 hábitos</h2></div><div class="group">${habitos}</div></div>
      ${vistaSync()}
      <div class="section"><div class="section-title"><h2>Ajustes</h2></div>
        <div class="card" style="display:flex;flex-direction:column;gap:10px">
          <div class="field"><label for="startEdit">Fecha del día 1</label><input id="startEdit" type="date" value="${S.start || ''}" data-action-change="startEdit"></div>
          <p class="muted small">Además de la nube, todo queda guardado en este dispositivo. Las actualizaciones de la app no lo borran.</p>
          <p class="muted small">Foto del fondo: <a href="https://unsplash.com/photos/WVtzXcZbGpI" target="_blank" rel="noopener" style="color:inherit">yujeong Huh en Unsplash</a>.</p>
          <div class="btn-row"><button class="btn ghost" data-action="exportar">Guardar copia</button>
            <label class="btn ghost" style="display:flex;align-items:center;justify-content:center;cursor:pointer">Restaurar copia<input type="file" accept="application/json,.json" data-import hidden></label></div>
        </div></div>`);
  }

  function vistaSync() {
    const st = window.APP.syncStatus;
    const estados = { ok: 'Sincronizado', offline: 'Sin conexión: se sube cuando vuelva internet', conectando: 'Conectando…', error: 'Error al sincronizar', denegado: 'Firebase rechazó el acceso: revisá las reglas', 'sin-codigo': '', 'sin-config': '' };
    let body;
    if (st === 'sin-config') {
      body = '<p class="muted small">Falta conectar Firebase. Cuando esté, acá vas a poder compartir los datos con Jazmín y entre tus dispositivos.</p>';
    } else if (!S.syncCode) {
      body = `<p class="muted small">Creá un código en un dispositivo y pegalo en los demás (y en el teléfono de Jazmín). Todos los que tengan el mismo código ven lo mismo.</p>
        <button class="btn" data-action="syncNuevo">Crear código nuevo</button>
        <div class="field"><label for="syncInput">O pegá un código que ya tengan</label><input id="syncInput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="xxxx-xxxx-xxxx-xxxx-xxxx"></div>
        <button class="btn ghost" data-action="syncUnir">Conectar</button>`;
    } else {
      body = `<div class="kv"><span>Estado</span><span>${esc(estados[st] || st)}</span></div>
        ${(st === 'error' || st === 'denegado') && window.APP.syncError ? `<p class="muted small">Detalle: ${esc(window.APP.syncError)}</p>` : ''}
        <div class="field"><label>Código (compartilo solo con Jazmín)</label><input readonly value="${esc(S.syncCode)}" onclick="this.select()"></div>
        <div class="btn-row"><button class="btn" data-action="syncCopiar">Copiar código</button><button class="btn ghost" data-action="syncSalir">Desconectar</button></div>`;
    }
    return `<div class="section"><div class="section-title"><h2>Sincronizar</h2></div><div class="card" style="display:flex;flex-direction:column;gap:12px">${body}</div></div>`;
  }

  // ---------- Receta ----------
  function abrirReceta(id) {
    const r = D.recetas[id];
    if (!r) return;
    const done = UI.recetaPasos[id] || {};
    const back = document.createElement('div');
    back.className = 'sheet-back';
    back.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="rt">
      <div class="sheet-head"><div><span class="eyebrow">${esc(r.tipo)} · ${esc(r.tiempo)}</span><h2 id="rt">${esc(r.nombre)}</h2></div>
        <button class="icon-btn" data-close aria-label="Cerrar">${icon.close}</button></div>
      ${r.foto ? `<figure class="hero-img"><img src="${foto(r, 900)}" alt="${esc(r.nombre)}"><figcaption>Foto: <a href="https://unsplash.com/photos/${r.foto.id}?utm_source=rutina_semanal&utm_medium=referral" target="_blank" rel="noopener">${esc(r.foto.autor)}</a> en <a href="https://unsplash.com/?utm_source=rutina_semanal&utm_medium=referral" target="_blank" rel="noopener">Unsplash</a> · de referencia</figcaption></figure>` : ''}
      ${r.intro ? `<p class="muted">${esc(r.intro)}</p>` : ''}
      ${r.ingredientes.length ? `<div class="card"><b>Ingredientes (para dos${r.tipo === 'Desayuno' ? '' : ', porciones chicas'})</b><ul class="ing" style="margin-top:8px">${r.ingredientes.map((i) => `<li>${esc(r.tipo === 'Desayuno' ? i : escalar(i))}</li>`).join('')}</ul></div>` : ''}
      <div><b>Paso a paso</b> <span class="muted small">· tocá un paso para tacharlo</span></div>
      <ol class="steps">${r.pasos.map((p, i) => `<li class="${done[i] ? 'done' : ''}" data-step="${i}" tabindex="0">${esc(p)}</li>`).join('')}</ol>
      ${r.tipo === 'Almuerzo' || r.tipo === 'Cena' ? `<button class="btn" data-cocinado>${haceDias(id) === 0 ? 'Cocinado hoy ✓' : 'Lo cocinamos hoy'}</button>
        <p class="muted small" style="text-align:center">${S.cocinado && S.cocinado[id] ? 'Última vez: ' + esc(fechaLarga(S.cocinado[id])) : 'Todavía no lo cocinaron'}</p>` : ''}
    </div>`;
    const cerrar = () => { back.remove(); document.body.style.overflow = ''; };
    back.addEventListener('click', (ev) => {
      if (ev.target === back || ev.target.closest('[data-close]')) return cerrar();
      if (ev.target.closest('[data-cocinado]')) {
        S.cocinado = S.cocinado || {}; S.cocinado[id] = hoy(); push(['cocinado', id], hoy()); save(); render();
        ev.target.closest('[data-cocinado]').textContent = 'Cocinado hoy ✓'; const nx = ev.target.closest('[data-cocinado]').nextElementSibling; if (nx) nx.textContent = 'Última vez: ' + fechaLarga(hoy()); return;
      }
      const li = ev.target.closest('[data-step]');
      if (li) { const i = li.dataset.step; done[i] = !done[i]; UI.recetaPasos[id] = done; li.classList.toggle('done', !!done[i]); }
    });
    document.body.appendChild(back);
    document.body.style.overflow = 'hidden';
    back.querySelector('[data-close]').focus();
  }

  // ---------- Registrar comida ----------
  function achicarFoto(file) {
    return new Promise((ok, mal) => {
      const img = new Image();
      img.onload = () => {
        const max = 520, k = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(img.src); ok(c.toDataURL('image/jpeg', 0.62));
      };
      img.onerror = mal; img.src = URL.createObjectURL(file);
    });
  }
  function abrirRegistro(tipo) {
    const ops = tipo === 'cena' ? D.cenas : D.almuerzos[S.user];
    let elegida = null, foto = null;
    const back = document.createElement('div');
    back.className = 'sheet-back';
    back.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="rg">
      <div class="sheet-head"><div><span class="eyebrow">${esc(fechaLarga(UI.fecha))} · ${esc(D.usuarios.find((u) => u.id === S.user).nombre)}</span><h2 id="rg">¿Qué ${tipo === 'cena' ? 'cenaste' : 'almorzaste'}?</h2></div>
        <button class="icon-btn" data-close aria-label="Cerrar">${icon.close}</button></div>
      <div class="group flat">${ops.map((id) => `<button class="row opt" data-rid="${id}" aria-pressed="false">${thumb(D.recetas[id])}<span class="grow"><b>${esc(D.recetas[id].nombre)}</b></span><span class="box">${icon.check}</span></button>`).join('')}</div>
      <div class="field"><label for="rgTexto">Otra cosa o una nota (opcional)</label><input id="rgTexto" placeholder="Ej: comimos afuera, sushi"></div>
      <button class="row check" data-ens aria-pressed="false" style="border-radius:22px;background:rgba(255,255,255,0.55)"><span class="box">${icon.check}</span><span class="grow"><b>Con ensalada cruda</b><span class="sub">Cuenta para la meta de la semana (${D.ensaladas[S.user].meta})</span></span></button>
      <label class="btn ghost" style="display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer"><span data-fotolbl>Agregar foto (opcional)</span><input type="file" accept="image/*" data-foto hidden></label>
      <img data-prev alt="" style="display:none;width:100%;border-radius:22px">
      <button class="btn" data-guardar>Guardar</button>
    </div>`;
    const cerrar = () => { back.remove(); document.body.style.overflow = ''; };
    const ens = back.querySelector('[data-ens]');
    const setEns = (on) => { ens.classList.toggle('on', on); ens.setAttribute('aria-pressed', on); };
    back.addEventListener('click', (ev) => {
      if (ev.target === back || ev.target.closest('[data-close]')) return cerrar();
      const o = ev.target.closest('[data-rid]');
      if (o) {
        elegida = elegida === o.dataset.rid ? null : o.dataset.rid;
        back.querySelectorAll('[data-rid]').forEach((b) => { const on = b.dataset.rid === elegida; b.classList.toggle('check', true); b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
        if (elegida === 'platito' || elegida === 'ensalada-fran') setEns(true);
        return;
      }
      if (ev.target.closest('[data-ens]')) { setEns(!ens.classList.contains('on')); return; }
      if (ev.target.closest('[data-guardar]')) {
        const texto = back.querySelector('#rgTexto').value.trim();
        if (!elegida && !texto && !foto) { toast('Elegí una opción, escribí algo o subí una foto'); return; }
        const c = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), fecha: UI.fecha, user: S.user, tipo, receta: elegida, texto, ensalada: ens.classList.contains('on'), foto, ts: Date.now() };
        S.comidas = S.comidas || []; S.comidas.push(c); push(['__comida'], c); save(); cerrar(); render(); toast('Guardado');
      }
    });
    back.querySelector('[data-foto]').addEventListener('change', (ev) => {
      const f = ev.target.files[0]; if (!f) return;
      back.querySelector('[data-fotolbl]').textContent = 'Procesando…';
      achicarFoto(f).then((url) => { foto = url; const p = back.querySelector('[data-prev]'); p.src = url; p.style.display = 'block'; back.querySelector('[data-fotolbl]').textContent = 'Cambiar foto'; })
        .catch(() => { back.querySelector('[data-fotolbl]').textContent = 'No se pudo leer la foto'; });
    });
    document.body.appendChild(back);
    document.body.style.overflow = 'hidden';
  }

  // ---------- Timer ----------
  let T = null;
  function secuencia() {
    const F = D.fuerza;
    const w = semana2() ? 45 : 40, r = 60 - w;
    const seq = [{ fase: 'Calentamiento', nombre: F.calentamiento.nombre, tip: F.calentamiento.tip, s: F.calentamiento.segundos, tipo: 'work', fig: F.calentamiento.fig }];
    for (let v = 1; v <= F.vueltas; v++) {
      F.ejercicios.forEach((e, i) => {
        seq.push({ fase: `Vuelta ${v} de ${F.vueltas} · ${i + 1}/${F.ejercicios.length}`, nombre: e.nombre, tip: e.tip, s: w, tipo: 'work', fig: e.fig });
        seq.push({ fase: 'Descanso', nombre: 'Respirá', tip: '', s: r, tipo: 'rest' });
      });
    }
    seq.pop();
    seq.push({ fase: 'Descanso', nombre: 'Respirá', tip: '', s: r, tipo: 'rest' });
    F.final.forEach((e) => seq.push({ fase: 'Final', nombre: e.nombre, tip: e.tip, s: e.segundos, tipo: 'work', fig: e.fig }));
    return seq;
  }
  let actx;
  const beep = (freq = 880, dur = 0.12) => {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator(), g = actx.createGain();
      o.frequency.value = freq; o.connect(g); g.connect(actx.destination);
      g.gain.setValueAtTime(0.25, actx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur);
      o.start(); o.stop(actx.currentTime + dur);
    } catch (e) { /* sin audio */ }
  };
  function startTimer() {
    const seq = secuencia();
    T = { seq, i: 0, left: seq[0].s, paused: false, el: document.createElement('div'), wake: null };
    T.el.className = 'timer';
    T.el.setAttribute('role', 'dialog');
    T.el.setAttribute('aria-label', 'Timer del circuito');
    document.body.appendChild(T.el);
    document.body.style.overflow = 'hidden';
    try { if (navigator.wakeLock) navigator.wakeLock.request('screen').then((w) => { if (T) T.wake = w; }).catch(() => {}); } catch (e) { /* nada */ }
    beep(660);
    T.tick = setInterval(() => {
      if (!T || T.paused) return;
      T.left--;
      if (T.left > 0 && T.left <= 3) beep(660, 0.08);
      if (T.left <= 0) {
        T.i++;
        if (T.i >= T.seq.length) return terminarTimer(true);
        T.left = T.seq[T.i].s;
        beep(T.seq[T.i].tipo === 'work' ? 990 : 520, 0.25);
      }
      pintarTimer();
    }, 1000);
    pintarTimer();
  }
  function pintarTimer() {
    const cur = T.seq[T.i], next = T.seq[T.i + 1];
    const mm = Math.floor(T.left / 60), ss = String(T.left % 60).padStart(2, '0');
    const total = T.seq.reduce((a, s) => a + s.s, 0);
    const done = T.seq.slice(0, T.i).reduce((a, s) => a + s.s, 0) + (cur.s - T.left);
    T.el.className = 'timer ' + cur.tipo;
    T.el.innerHTML = `<div class="timer-top"><span>${Math.round(done / total * 100)}%</span>
        <button class="icon-btn" data-t="stop" aria-label="Terminar">${icon.close}</button></div>
      <div class="timer-main"><span class="phase">${esc(cur.fase)}</span>
        ${cur.tipo === 'rest' && next && next.fig ? `<div class="timer-fig dim">${figura(next.fig)}</div>` : cur.fig ? `<div class="timer-fig">${figura(cur.fig)}</div>` : ''}
        <h2>${esc(cur.nombre)}</h2>
        <div class="count" aria-live="off">${mm > 0 ? mm + ':' + ss : T.left}</div>
        ${cur.tip ? `<p>${esc(cur.tip)}</p>` : ''}</div>
      <div class="next">${next ? 'Sigue: <b>' + esc(next.nombre) + '</b>' : 'Último ejercicio'}</div>
      <div class="btn-row"><button class="btn light" data-t="pause">${T.paused ? 'Seguir' : 'Pausa'}</button><button class="btn" data-t="skip">Saltar</button></div>`;
  }
  function terminarTimer(completo) {
    if (!T) return;
    clearInterval(T.tick);
    try { if (T.wake) T.wake.release(); } catch (e) { /* nada */ }
    T.el.remove(); T = null;
    document.body.style.overflow = '';
    if (completo) {
      const cd = userChecks(S.user, hoy()); cd.entreno = true; push(['checks', S.user, hoy()], cd); save();
      beep(990, 0.3); setTimeout(() => beep(1320, 0.4), 250);
      toast('¡Circuito completo! Entreno tildado.');
      render();
    }
  }
  document.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-t]');
    if (!b || !T) return;
    if (b.dataset.t === 'stop') terminarTimer(false);
    else if (b.dataset.t === 'pause') { T.paused = !T.paused; pintarTimer(); }
    else if (b.dataset.t === 'skip') { T.left = 1; T.paused = false; }
  });

  // ---------- Render ----------
  const TABS = [['hoy', 'Hoy'], ['comidas', 'Comidas'], ['entreno', 'Entrenamiento'], ['super', 'Súper'], ['progreso', 'Progreso']];
  function render() {
    const vistas = { hoy: vistaHoy, comidas: vistaComidas, entreno: vistaEntreno, super: vistaSuper, progreso: vistaProgreso };
    const users = D.usuarios.map((u) => `<button data-action="user" data-id="${u.id}" aria-pressed="${S.user === u.id}">${esc(u.nombre)}</button>`).join('');
    const ini = D.usuarios.find((u) => u.id === S.user).nombre[0];
    $('#app').innerHTML = `<header class="top"><div class="users" role="group" aria-label="Quién usa la app">${users}</div><div class="avatar" aria-hidden="true">${esc(ini)}</div></header>
      <main>${vistas[S.tab]()}</main>`;
    $('#nav').innerHTML = `<div class="nav-in"><div class="brand">rutina <em>semanal</em></div>${TABS.map(([id, l]) => `<button data-tab="${id}" ${S.tab === id ? 'aria-current="page"' : ''}>${icon[id]}<span>${l}</span></button>`).join('')}</div>`;
  }

  // ---------- Eventos ----------
  document.addEventListener('click', (ev) => {
    const tab = ev.target.closest('[data-tab]');
    if (tab) { S.tab = tab.dataset.tab; UI.superConfirm = false; save(); render(); window.scrollTo(0, 0); return; }
    const el = ev.target.closest('[data-action]');
    if (!el || el.closest('.sheet') || el.closest('.timer')) return;
    const a = el.dataset.action;
    if (a === 'user') { S.user = el.dataset.id; }
    else if (a === 'setStart') { S.start = $('#startInput').value || hoy(); UI.fecha = hoy(); push(['start'], S.start); toast('¡Arrancó el desafío!'); }
    else if (a === 'prevDay') { UI.fecha = addDays(UI.fecha, -1); }
    else if (a === 'nextDay') { UI.fecha = addDays(UI.fecha, 1); }
    else if (a === 'goToday') { UI.fecha = hoy(); }
    else if (a === 'goDate') { UI.fecha = el.dataset.date; S.tab = 'hoy'; window.scrollTo(0, 0); }
    else if (a === 'toggle') { const c = userChecks(S.user, UI.fecha); c[el.dataset.id] = !c[el.dataset.id]; push(['checks', S.user, UI.fecha], c); }
    else if (a === 'energia') { const c = userChecks(S.user, UI.fecha); const v = Number(el.dataset.v); c.energia = c.energia === v ? null : v; push(['checks', S.user, UI.fecha], c); }
    else if (a === 'receta') { return abrirReceta(el.dataset.id); }
    else if (a === 'registrar') { return abrirRegistro(el.dataset.tipo); }
    else if (a === 'comidaDel') { const id = el.dataset.id; S.comidas = (S.comidas || []).filter((c) => c.id !== id); push(['__comidaDel'], id); }
    else if (a === 'startTimer') { return startTimer(); }
    else if (a === 'cv') { UI.comidasVista = el.dataset.v; }
    else if (a === 'superToggle') { S.super[el.dataset.key] = !S.super[el.dataset.key]; push(['super', el.dataset.key], S.super[el.dataset.key]); }
    else if (a === 'superDel') { const k = el.dataset.key; S.extras = S.extras.filter((t) => 'extra|' + t !== k); S.super[k] = false; push(['extras'], S.extras); push(['super', k], false); }
    else if (a === 'syncNuevo') { S.syncCode = nuevoCodigo(); save(); if (window.SYNC) window.SYNC.connect(); }
    else if (a === 'syncUnir') {
      const v = ($('#syncInput').value || '').trim().toLowerCase().replace(/\s+/g, '');
      if (v.length < 16) { toast('Ese código es muy corto'); return; }
      S.syncCode = v; save(); if (window.SYNC) window.SYNC.connect();
    }
    else if (a === 'syncCopiar') { try { navigator.clipboard.writeText(S.syncCode); toast('Código copiado'); } catch (e) { /* nada */ } return; }
    else if (a === 'syncSalir') { S.syncCode = null; save(); if (window.SYNC) window.SYNC.connect(); }
    else if (a === 'exportar') {
      const blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' });
      const file = new File([blob], `rutina-semanal-${hoy()}.json`, { type: 'application/json' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) { navigator.share({ files: [file] }).catch(() => {}); }
      else { const a2 = document.createElement('a'); a2.href = URL.createObjectURL(blob); a2.download = file.name; a2.click(); setTimeout(() => URL.revokeObjectURL(a2.href), 1000); }
      return;
    }
    else if (a === 'superReset') {
      if (!UI.superConfirm) { UI.superConfirm = true; setTimeout(() => { UI.superConfirm = false; if (S.tab === 'super') render(); }, 3000); }
      else { S.super = {}; UI.superConfirm = false; push(['super'], {}); toast('Lista desmarcada'); }
    }
    else return;
    save(); render();
  });

  document.addEventListener('change', (ev) => {
    const t = ev.target;
    if (t.dataset.num) { const c = userChecks(S.user, UI.fecha); c[t.dataset.num] = Number(t.value) || 0; push(['checks', S.user, UI.fecha], c); save(); render(); }
    else if (t.dataset.med) { const m = (S.medidas[S.user] = S.medidas[S.user] || {}); m[t.dataset.med] = Number(t.value) || null; push(['medidas', S.user], m); save(); render(); }
    else if (t.dataset.actionChange === 'startEdit') { S.start = t.value || null; push(['start'], S.start); save(); render(); }
    else if (t.matches('[data-import]') && t.files[0]) {
      t.files[0].text().then((txt) => {
        const d = JSON.parse(txt);
        if (!d || typeof d !== 'object' || !('checks' in d)) throw new Error('formato');
        const code = S.syncCode; S = Object.assign(defaults(), d, { syncCode: code }); pushTodo(); save(); render(); toast('Copia restaurada');
      }).catch(() => toast('Ese archivo no es una copia válida'));
    }
  });

  document.addEventListener('submit', (ev) => {
    const f = ev.target.closest('[data-form="addItem"]');
    if (!f) return;
    ev.preventDefault();
    const v = f.item.value.trim();
    if (v && !S.extras.includes(v)) { S.extras.push(v); push(['extras'], S.extras); save(); render(); }
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') { const s = $('.sheet-back'); if (s) { s.remove(); document.body.style.overflow = ''; } }
    if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.matches && ev.target.matches('[data-step]')) { ev.preventDefault(); ev.target.click(); }
  });

  render();

  // Pedir que el navegador no borre los datos por falta de espacio
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { /* nada */ }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then((r) => r.update()).catch(() => {}); });
    // Cuando se instala una versión nueva, recarga una vez para mostrarla
    let recargado = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (!recargado) { recargado = true; location.reload(); } });
  }
})();
