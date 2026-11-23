// Sincronización entre dispositivos con Firebase Firestore.
// Todos los que usan el mismo "código" ven y editan los mismos datos, en tiempo real.
// Se comparte: fecha de inicio, checklists, medidas y lista del súper.
// No se comparte: quién está usando la app (Fran/Jazmín) ni la pestaña abierta.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  initializeFirestore, persistentLocalCache, doc, onSnapshot, setDoc, updateDoc, FieldPath
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const APP = window.APP;
const cfg = window.FIREBASE_CONFIG;
const SHARED = ['start', 'checks', 'medidas', 'super', 'extras'];

let db = null, ref = null, unsub = null, ready = false;

function setStatus(st) { APP.syncStatus = st; APP.rerender(); }

function connect() {
  if (unsub) { unsub(); unsub = null; }
  ready = false;
  const code = APP.state.syncCode;
  if (!cfg || !code) { setStatus(cfg ? 'sin-codigo' : 'sin-config'); return; }
  if (!db) {
    const app = initializeApp(cfg);
    try { db = initializeFirestore(app, { localCache: persistentLocalCache() }); }
    catch (e) { db = initializeFirestore(app, {}); }
  }
  ref = doc(db, 'rutinas', code);
  setStatus('conectando');
  let primera = true;
  unsub = onSnapshot(ref, (snap) => {
    const S = APP.state;
    if (!snap.exists()) {
      // Código nuevo: subimos lo que hay en este dispositivo
      const data = {};
      SHARED.forEach((k) => { data[k] = S[k] ?? null; });
      setDoc(ref, data).then(() => { ready = true; flush(); setStatus('ok'); }).catch(err);
      return;
    }
    const remoto = snap.data();
    if (primera) {
      primera = false;
      // Primera vez: sumar lo que este dispositivo tenía y la nube no
      const faltan = [];
      for (const [u, dias] of Object.entries(S.checks || {})) {
        for (const [f, c] of Object.entries(dias)) {
          if (!(remoto.checks && remoto.checks[u] && remoto.checks[u][f])) faltan.push([['checks', u, f], c]);
        }
      }
      for (const [u, m] of Object.entries(S.medidas || {})) {
        if (!(remoto.medidas && remoto.medidas[u])) faltan.push([['medidas', u], m]);
      }
      for (const [k, v] of Object.entries(S.super || {})) {
        if (v && !(remoto.super && k in remoto.super)) faltan.push([['super', k], v]);
      }
      if (!remoto.start && S.start) faltan.push([['start'], S.start]);
      faltan.forEach(([p, v]) => APP.queue.push([p, v]));
    }
    SHARED.forEach((k) => { if (k in remoto) S[k] = remoto[k] ?? (k === 'extras' ? [] : k === 'start' ? null : {}); });
    APP.saveLocal();
    ready = true;
    flush();
    setStatus(snap.metadata.fromCache ? 'offline' : 'ok');
  }, err);
}

function err(e) {
  console.warn('sync', e);
  setStatus(e && e.code === 'permission-denied' ? 'denegado' : 'error');
}

function flush() {
  if (!ready || !ref) return;
  while (APP.queue.length) {
    const [path, value] = APP.queue.shift();
    updateDoc(ref, new FieldPath(...path), value === undefined ? null : value).catch(err);
  }
}

window.SYNC = { connect, flush };
connect();
