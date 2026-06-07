/* =============================================================
   LOGIQUE DE L'APPLICATION (navigation, menu, chatbot, calendrier, rendu)
   Utilise les données globales définies dans data.js (chargé avant).
   ============================================================= */

  let history = ['home'];
  function nav(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (history[history.length-1] !== id) history.push(id);
    window.scrollTo({ top: 0 });
  }
  function back() { history.pop(); nav(history.pop() || 'home'); }

  function openMenu() { document.getElementById('menuOverlay').classList.remove('hidden'); }
  function closeMenu() { document.getElementById('menuOverlay').classList.add('hidden'); }
  function goNav(id) { closeMenu(); nav(id); }
  function goConnexion() { closeMenu(); nav('connexion'); }

  function toggleChip(el, color) {
    const active = el.dataset.active === '1';
    el.dataset.active = active ? '0' : '1';
    el.classList.toggle('bg-panel2', active);
    if (color === 'blue') {
      el.classList.toggle('bg-white', !active);
      el.classList.toggle('text-blue', !active);
      el.classList.toggle('border-blue', !active);
    } else {
      el.classList.toggle('bg-red', !active);
      el.classList.toggle('text-white', !active);
      el.classList.toggle('border-red', !active);
    }
  }

  function setBoite(i) {
    const m = document.getElementById('btnManuelle'), a = document.getElementById('btnAuto');
    if (i === 0) {
      m.className = 'boite-btn py-3 rounded-xl bg-red text-white flex items-center justify-center gap-2 transition font-bold';
      a.className = 'boite-btn py-3 rounded-xl text-blue-light flex items-center justify-center gap-2 transition font-bold';
    } else {
      m.className = 'boite-btn py-3 rounded-xl text-white/60 flex items-center justify-center gap-2 transition font-bold';
      a.className = 'boite-btn py-3 rounded-xl bg-blue text-white flex items-center justify-center gap-2 transition font-bold';
    }
  }

  function toast(msg) {
    const t = document.getElementById('toast');
    t.innerHTML = '<svg viewBox="0 0 24 24" class="w-5 h-5 text-red" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>' + msg;
    t.classList.remove('hidden'); t.classList.add('toast');
    clearTimeout(window._tt);
    window._tt = setTimeout(() => { t.classList.add('hidden'); t.classList.remove('toast'); }, 3000);
  }

  // Moniteurs (démo) — sans note chiffrée

  function renderResults() {
    document.getElementById('resultsList').innerHTML = moniteurs.map(m => {
      const auto = m.boite === 'Auto';
      const badge = auto
        ? '<span class="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue text-white">🅰️ Auto</span>'
        : '<span class="text-[11px] font-bold px-2.5 py-1 rounded-full bg-red/15 text-red border border-red/30">⚙️ Manuelle</span>';
      return `
      <button onclick="nav('profil')" class="text-left bg-panel border border-white/10 rounded-2xl p-5 hover:border-red/50 hover:-translate-y-1 transition flex gap-4">
        <div class="shrink-0 w-16 h-16 rounded-2xl ${auto?'bg-blue/15 border-blue/30 text-blue-light':'bg-red/15 border-red/30 text-red'} border grid place-items-center font-display font-extrabold text-3xl">${m.i}</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <div>
              <h3 class="font-display font-extrabold uppercase text-lg leading-tight tracking-tight">${m.n}</h3>
              <p class="text-white/50 text-sm flex items-center gap-1">
                <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.5"/></svg>${m.v}
              </p>
            </div>
            <span class="font-display font-extrabold text-xl text-red shrink-0">${m.prix}€<span class="text-xs font-bold text-white/40">/h</span></span>
          </div>
          <div class="flex flex-wrap items-center gap-1.5 mt-3">
            ${badge}
            <span class="text-[11px] font-bold px-2.5 py-1 rounded-full bg-dispo/15 text-dispo">● ${m.dispo} dispo</span>
          </div>
        </div>
      </button>`;
    }).join('');
  }

  const jours = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
  const heures = ['8h','9h','10h','11h','12h','14h','15h','16h','17h','18h','19h'];
  function seedStatus(j,h){
    if (j===6) return 0;
    if (h===4) return 0;
    const r = (j*7 + h*3) % 5;
    if (r===0) return 2;
    if (r===1 || r===4) return 0;
    return 1;
  }
  const palette = {
    0:'bg-indispo/30 text-white/30 cursor-not-allowed',
    1:'bg-dispo/20 text-dispo border border-dispo/40 hover:bg-dispo/30 cursor-pointer',
    2:'bg-reserve/20 text-reserve border border-reserve/40 cursor-not-allowed line-through'
  };
  const labelStatus = {0:'—',1:'Libre',2:'Pris'};
  function renderCalendar() {
    let html = '<div class="grid" style="grid-template-columns:54px repeat(7,1fr);gap:6px">';
    html += '<div></div>';
    jours.forEach(j => html += `<div class="text-center text-xs font-bold text-white/50 pb-1">${j}</div>`);
    heures.forEach((h,hi) => {
      html += `<div class="text-xs font-bold text-white/40 flex items-center justify-end pr-1">${h}</div>`;
      jours.forEach((j,ji) => {
        const st = seedStatus(ji,hi);
        const onclick = st===1 ? `onclick="reserve(this,'${j}','${h}')"` : '';
        html += `<div ${onclick} class="slot rounded-lg py-2 text-center text-[11px] font-bold ${palette[st]}">${labelStatus[st]}</div>`;
      });
    });
    html += '</div>';
    document.getElementById('calendar').innerHTML = html;
  }
  function reserve(el, j, h) {
    el.className = 'slot rounded-lg py-2 text-center text-[11px] font-bold ' + palette[2];
    el.textContent = 'Pris'; el.removeAttribute('onclick');
    toast(`Créneau ${j} ${h} sélectionné — connectez-vous pour confirmer`);
  }

  renderResults();
  renderCalendar();

  /* ---------- AIDE : onglets élève / moniteur ---------- */

  let aideTab = 'eleve';
  function setAideTab(i) {
    aideTab = i === 0 ? 'eleve' : 'moniteur';
    const e = document.getElementById('aideTabEleve'), m = document.getElementById('aideTabMoniteur');
    e.className = 'py-3 rounded-xl transition ' + (i===0 ? 'bg-red text-white font-bold' : 'text-white/60 font-bold');
    m.className = 'py-3 rounded-xl transition ' + (i===1 ? 'bg-red text-white font-bold' : 'text-white/60 font-bold');
    renderAide();
  }
  function renderAide() {
    document.getElementById('aideCards').innerHTML = aideContent[aideTab].map(x => {
      const tile = x.c === 'blue' ? 'bg-blue/15 text-blue-light border-blue/30' : 'bg-red/15 text-red border-red/30';
      return `<button onclick="toast('Article : ${x.t} (démo)')" class="text-left bg-panel border border-white/10 rounded-2xl p-5 hover:border-red/50 hover:-translate-y-1 transition flex gap-4">
        <div class="shrink-0 w-12 h-12 rounded-xl border grid place-items-center ${tile}"><svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"><path d="${x.ic}"/></svg></div>
        <div><h3 class="font-extrabold">${x.t}</h3><p class="text-white/50 text-sm mt-0.5">${x.d}</p></div>
      </button>`;
    }).join('');
    document.getElementById('faqList').innerHTML = faqContent[aideTab].map((q,i) => `
      <div class="bg-panel border border-white/10 rounded-2xl overflow-hidden">
        <button onclick="toggleFaq(${i})" class="w-full flex items-center justify-between gap-3 p-4 text-left font-bold hover:text-red transition">
          <span>${q[0]}</span>
          <svg id="faqIco${i}" viewBox="0 0 24 24" class="w-5 h-5 shrink-0 text-white/40 transition-transform" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div id="faqAns${i}" class="hidden px-4 pb-4 text-sm text-white/60 leading-relaxed">${q[1]}</div>
      </div>`).join('');
  }
  function toggleFaq(i) {
    document.getElementById('faqAns'+i).classList.toggle('hidden');
    document.getElementById('faqIco'+i).classList.toggle('rotate-180');
  }

  /* ---------- Parrainage : copier ---------- */
  function copier(txt) {
    if (navigator.clipboard) navigator.clipboard.writeText(txt).catch(()=>{});
    toast('Copié : ' + txt);
  }

  /* ---------- Chatbot ---------- */
  function toggleChat() { document.getElementById('chatPanel').classList.toggle('hidden'); }
  function chatAsk(q) {
    const body = document.getElementById('chatBody');
    const rep = {
      'Comment réserver ?': 'Ouvrez la fiche d\'un moniteur, cliquez sur un créneau vert puis confirmez. Simple comme bonjour 🚗',
      'Annuler une leçon': 'Vous pouvez annuler jusqu\'à 24 h avant depuis votre espace, sans frais.',
      'Parler à un humain': 'Pas de souci — utilisez le formulaire « Contactez le support » dans la page Aide, on répond sous 24 h.'
    }[q] || 'Je note votre question, un conseiller vous répondra.';
    body.innerHTML += `<div class="bg-red text-white rounded-2xl rounded-tr-sm p-3 text-sm max-w-[85%] ml-auto">${q}</div>`;
    setTimeout(() => {
      body.innerHTML += `<div class="bg-panel2 rounded-2xl rounded-tl-sm p-3 text-sm text-white/85 max-w-[85%]">${rep}</div>`;
      body.scrollTop = body.scrollHeight;
    }, 450);
    body.scrollTop = body.scrollHeight;
  }

  renderAide();
