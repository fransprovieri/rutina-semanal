(() => {
  const D = window.DATA;
  const KEY = 'rutina-semanal-v1';
  const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const DIAS_CORTOS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const ORDEN_SEMANA = [1, 2, 3, 4, 5, 6, 0];

  // ---------- Estado ----------
  const defaults = () => ({ user: 'fran', start: null, checks: {}, medidas: {}, super: {}, extras: [], tab: 'hoy' });
  let S;
  try { S = Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { S = defaults(); }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* sin almacenamiento */ } };

  // UI temporal (no se guarda)
  const UI = { fecha: null, comidasVista: 'semana', recetaPasos: {}, superConfirm: false };

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

    const m = D.menu[d];
    const comida = (lbl, id) => {
      const r = D.recetas[id];
      return `<button class="row" data-action="receta" data-id="${id}">
        ${thumb(r)}
        <span class="grow"><span class="sub">${lbl}</span><b>${esc(r.nombre)}</b></span>
        <span class="chev">${icon.chev}</span></button>`;
    };

    const e = D.entreno[d];
    let entreno;
    if (e === 'fuerza') {
      entreno = `<div class="card" style="display:flex;flex-direction:column;gap:10px">
        <div><b style="font-size:17px">Fuerza · 15 min</b><p class="muted small">Calentamiento, 2 vueltas de 6 ejercicios y final. ${semana2() ? '45/15 s' : '40/20 s'}.</p></div>
        <button class="btn green" data-action="startTimer">Empezar circuito con timer</button></div>`;
    } else if (e === 'correr') {
      entreno = `<div class="card"><b style="font-size:17px">Correr · 15 min</b><p class="muted small">${esc(D.correr.tips[0])}</p></div>`;
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
        <div class="section-title"><h2>Comidas</h2><span>${DIAS[d]}</span></div>
        <div class="group">
        ${comida('Desayuno', desayunoDe(f))}
        ${comida('Almuerzo', m.almuerzo)}
        ${comida(m.cena === 'mealprep' ? 'Preparación' : 'Cena', m.cena)}
        </div>
      </div>
      <div class="section" style="order:5">
        <div class="section-title"><h2>Entreno</h2></div>
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
    const seg = `<div class="seg" role="group" aria-label="Vista">
      <button data-action="cv" data-v="semana" aria-pressed="${UI.comidasVista === 'semana'}">Semana</button>
      <button data-action="cv" data-v="recetas" aria-pressed="${UI.comidasVista === 'recetas'}">Recetas</button></div>`;
    let body;
    if (UI.comidasVista === 'semana') {
      const hd = parse(hoy()).getDay();
      body = `<button class="row card dark" data-action="receta" data-id="mealprep" style="padding:20px 24px">
          <span class="grow"><span class="eyebrow"><em style="font-size:18px;color:var(--ink)">domingo</em></span><b>Meal prep: pollo, arroz, verduras y huevos</b><span class="sub">1 h 15 min · resuelve lunes a miércoles</span></span><span class="chev">${icon.chev}</span></button>
        <div class="card" style="display:grid;gap:4px"><b>Desayunos</b>
          <button class="meal" data-action="receta" data-id="desayuno-a"><span class="lbl">Día impar</span><span>${esc(D.recetas['desayuno-a'].nombre.split('· ')[1])}</span>${icon.chev}</button>
          <button class="meal" data-action="receta" data-id="desayuno-b"><span class="lbl">Día par</span><span>${esc(D.recetas['desayuno-b'].nombre.split('· ')[1])}</span>${icon.chev}</button></div>` +
        '<div class="days-grid">' + ORDEN_SEMANA.map((d) => {
          const m = D.menu[d];
          return `<div class="card day ${d === hd ? 'today-mark' : ''}">
            <div class="day-head"><h3>${DIAS[d]}</h3>${d === hd ? '<span class="tag green">Hoy</span>' : ''}</div>
            <button class="meal" data-action="receta" data-id="${m.almuerzo}"><span class="lbl">Almuerzo</span><span>${esc(D.recetas[m.almuerzo].nombre)}</span>${icon.chev}</button>
            <button class="meal" data-action="receta" data-id="${m.cena}"><span class="lbl">${m.cena === 'mealprep' ? 'Prep' : 'Cena'}</span><span>${esc(D.recetas[m.cena].nombre)}</span>${icon.chev}</button>
          </div>`;
        }).join('') + '</div>';
    } else {
      const grupos = {};
      Object.entries(D.recetas).forEach(([id, r]) => { (grupos[r.tipo] = grupos[r.tipo] || []).push([id, r]); });
      body = ['Preparación', 'Desayuno', 'Almuerzo', 'Cena'].filter((g) => grupos[g]).map((g) =>
        `<div class="section-title" style="padding-top:6px"><h2 style="font-size:18px">${g}</h2></div><div class="group flat">` +
        grupos[g].map(([id, r]) => `<button class="row" data-action="receta" data-id="${id}">${thumb(r)}<span class="grow"><b>${esc(r.nombre)}</b><span class="sub">${esc(r.tiempo)}</span></span><span class="chev">${icon.chev}</span></button>`).join('') + '</div>'
      ).join('');
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
    const sem = ORDEN_SEMANA.map((d) => {
      const e = D.entreno[d];
      const letra = e === 'fuerza' ? 'F' : e === 'correr' ? 'C' : '–';
      const nombre = e === 'fuerza' ? 'Fuerza' : e === 'correr' ? 'Correr' : 'Libre';
      return `<div class="wk-day ${d === hd ? 'is-today' : ''}"><span class="wk-lbl">${DIAS_CORTOS[d][0]}</span><span class="wk-dot ${e}" title="${nombre}" aria-label="${DIAS[d]}: ${nombre}">${letra}</span></div>`;
    }).join('');
    const semana = `<div class="section"><div class="section-title"><h2>La semana</h2></div>
        <div class="card"><div class="wk">${sem}</div>
          <div class="wk-legend"><span><i class="wk-dot fuerza">F</i>Fuerza</span><span><i class="wk-dot correr">C</i>Correr</span><span><i class="wk-dot libre">–</i>Libre</span></div></div></div>`;
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
        <div class="section-title"><h2>Lista del súper</h2><span>${marcados}/${total}</span></div>
        <p class="muted small">Una semana, para dos. Tildá lo que ya tienen en casa o lo que ya está en el carrito.</p>
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
      <div class="section"><div class="section-title"><h2>Ajustes</h2></div>
        <div class="card" style="display:flex;flex-direction:column;gap:10px">
          <div class="field"><label for="startEdit">Fecha del día 1</label><input id="startEdit" type="date" value="${S.start || ''}" data-action-change="startEdit"></div>
          <p class="muted small">Todo se guarda en este dispositivo. Las actualizaciones de la app no lo borran; lo único que lo borra es eliminar el ícono de inicio o los datos de Safari.</p>
          <p class="muted small">Foto del fondo: <a href="https://unsplash.com/photos/WVtzXcZbGpI" target="_blank" rel="noopener" style="color:inherit">yujeong Huh en Unsplash</a>.</p>
          <div class="btn-row"><button class="btn ghost" data-action="exportar">Guardar copia</button>
            <label class="btn ghost" style="display:flex;align-items:center;justify-content:center;cursor:pointer">Restaurar copia<input type="file" accept="application/json,.json" data-import hidden></label></div>
        </div></div>`);
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
      ${r.ingredientes.length ? `<div class="card"><b>Ingredientes (para dos)</b><ul class="ing" style="margin-top:8px">${r.ingredientes.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>` : ''}
      <div><b>Paso a paso</b> <span class="muted small">· tocá un paso para tacharlo</span></div>
      <ol class="steps">${r.pasos.map((p, i) => `<li class="${done[i] ? 'done' : ''}" data-step="${i}" tabindex="0">${esc(p)}</li>`).join('')}</ol>
    </div>`;
    const cerrar = () => { back.remove(); document.body.style.overflow = ''; };
    back.addEventListener('click', (ev) => {
      if (ev.target === back || ev.target.closest('[data-close]')) return cerrar();
      const li = ev.target.closest('[data-step]');
      if (li) { const i = li.dataset.step; done[i] = !done[i]; UI.recetaPasos[id] = done; li.classList.toggle('done', !!done[i]); }
    });
    document.body.appendChild(back);
    document.body.style.overflow = 'hidden';
    back.querySelector('[data-close]').focus();
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
      userChecks(S.user, hoy()).entreno = true; save();
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
  const TABS = [['hoy', 'Hoy'], ['comidas', 'Comidas'], ['entreno', 'Entreno'], ['super', 'Súper'], ['progreso', 'Progreso']];
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
    else if (a === 'setStart') { S.start = $('#startInput').value || hoy(); UI.fecha = hoy(); toast('¡Arrancó el desafío!'); }
    else if (a === 'prevDay') { UI.fecha = addDays(UI.fecha, -1); }
    else if (a === 'nextDay') { UI.fecha = addDays(UI.fecha, 1); }
    else if (a === 'goToday') { UI.fecha = hoy(); }
    else if (a === 'goDate') { UI.fecha = el.dataset.date; S.tab = 'hoy'; window.scrollTo(0, 0); }
    else if (a === 'toggle') { const c = userChecks(S.user, UI.fecha); c[el.dataset.id] = !c[el.dataset.id]; }
    else if (a === 'energia') { const c = userChecks(S.user, UI.fecha); const v = Number(el.dataset.v); c.energia = c.energia === v ? undefined : v; }
    else if (a === 'receta') { return abrirReceta(el.dataset.id); }
    else if (a === 'startTimer') { return startTimer(); }
    else if (a === 'cv') { UI.comidasVista = el.dataset.v; }
    else if (a === 'superToggle') { S.super[el.dataset.key] = !S.super[el.dataset.key]; }
    else if (a === 'superDel') { const k = el.dataset.key; S.extras = S.extras.filter((t) => 'extra|' + t !== k); delete S.super[k]; }
    else if (a === 'exportar') {
      const blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' });
      const file = new File([blob], `rutina-semanal-${hoy()}.json`, { type: 'application/json' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) { navigator.share({ files: [file] }).catch(() => {}); }
      else { const a2 = document.createElement('a'); a2.href = URL.createObjectURL(blob); a2.download = file.name; a2.click(); setTimeout(() => URL.revokeObjectURL(a2.href), 1000); }
      return;
    }
    else if (a === 'superReset') {
      if (!UI.superConfirm) { UI.superConfirm = true; setTimeout(() => { UI.superConfirm = false; if (S.tab === 'super') render(); }, 3000); }
      else { S.super = {}; UI.superConfirm = false; toast('Lista desmarcada'); }
    }
    else return;
    save(); render();
  });

  document.addEventListener('change', (ev) => {
    const t = ev.target;
    if (t.dataset.num) { userChecks(S.user, UI.fecha)[t.dataset.num] = Number(t.value) || 0; save(); render(); }
    else if (t.dataset.med) { (S.medidas[S.user] = S.medidas[S.user] || {})[t.dataset.med] = Number(t.value) || null; save(); render(); }
    else if (t.dataset.actionChange === 'startEdit') { S.start = t.value || null; save(); render(); }
    else if (t.matches('[data-import]') && t.files[0]) {
      t.files[0].text().then((txt) => {
        const d = JSON.parse(txt);
        if (!d || typeof d !== 'object' || !('checks' in d)) throw new Error('formato');
        S = Object.assign(defaults(), d); save(); render(); toast('Copia restaurada');
      }).catch(() => toast('Ese archivo no es una copia válida'));
    }
  });

  document.addEventListener('submit', (ev) => {
    const f = ev.target.closest('[data-form="addItem"]');
    if (!f) return;
    ev.preventDefault();
    const v = f.item.value.trim();
    if (v && !S.extras.includes(v)) { S.extras.push(v); save(); render(); }
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
