// freeside frontend — native Web Components, no framework, no build step.
//
// Views (client-routed):
//   /                 -> #book      DM "run-from-the-page" adventure (full detail)
//                     -> #sessions  DM game-session console (reveal + party tracker)
//   /play/<id>        -> minimal player view: revealed content as name + image only
//
// EVERYTHING on the book is rendered from D1 (via /api). The card layouts mirror
// the original React components (Character/Location/Dungeon/StatBlock); ids use
// the same reading-order numbering the React app showed (L#, C#, D#).

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------
function sheet(css) {
  const s = new CSSStyleSheet();
  s.replaceSync(css);
  return s;
}
const esc = (s) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

async function api(path, opts) {
  const res = await fetch(`/api${path}`, { headers: { 'content-type': 'application/json' }, ...opts });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw Object.assign(new Error(body.error || `HTTP ${res.status}`), { status: res.status, body });
  }
  return res.json();
}

/** D&D ability modifier, matching the original `getAttrBonus`: 16 -> "+3", 8 -> "-1". */
const attrBonus = (score) => {
  const b = Math.floor((Number(score) - 10) / 2);
  return b > 0 ? `+${b}` : `${b}`;
};
const titleCase = (v) => String(v ?? '').replace(/([a-z])([A-Z])/g, '$1 $2');
const cap = (v) => { const s = String(v ?? ''); return s.charAt(0).toUpperCase() + s.slice(1); };

/** <img> that hides itself if the art file is missing. */
const art = (src, cls) =>
  src ? `<img class="${cls}" src="${esc(src)}" alt="" onerror="this.style.display='none'" />` : '';

// ---------------------------------------------------------------------------
// shared component styles (mirrors the original React CSS), scoped via shadow DOM
// ---------------------------------------------------------------------------
const baseStyles = sheet(`
  :host { display: block; color: #1b140d; font-family: 'Cormorant Garamond', Georgia, serif; }
  .page {
    position: relative;
    background: #fff; border: 1px solid #cdbb95; border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.35);
    width: 13cm; max-width: 94vw; margin: 10px; padding: 0 10px 12px;
    overflow: hidden; font-size: 11px; line-height: 1.3;
  }
  /* header: id + page on both sides, name centered (the React layout) */
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-top: 0; font-size: 14pt; padding: 5px 0; }
  .idContainer { display: flex; flex-direction: column; align-items: center; width: 60px; }
  .idContainer.left { align-items: flex-start; }
  .idContainer.right { align-items: flex-end; }
  .nameBlock { flex: 1; display: flex; flex-direction: column; align-items: center; }
  .name { font-family: 'Cinzel Decorative', serif; font-size: 12pt; text-align: center; }
  .subtitle { font-size: 10pt; color: #5b4632; text-align: center; }
  .id { font-weight: 700; font-size: 12pt; }
  .id.loc { color: #1d4e89; }
  .id.char { color: #2f7d32; }
  .id.dungeon { color: #7a2d12; }
  .pageNumber { font-size: 12pt; color: #9b8a6a; }
  .notesCallout { background: #ececec; padding: 5px; text-align: center; font-style: italic; }
  .splash { width: 100%; height: 188px; object-fit: cover; display: block; }
  .mapImage { width: 100%; display: block; }

  table { width: 100%; border-spacing: 0; border-collapse: separate; margin-top: 10px; }
  th { text-align: left; font-weight: 600; font-size: 10pt; padding: 2px 3px; }
  td { padding: 3px; vertical-align: top; }
  .stripeFirst td:first-child { text-transform: capitalize; }

  /* coloured blocks, as in the original */
  .brownBlock td { background: bisque; border-bottom: 1px dotted #fff; }
  .blueBlock td { background: #cce6ff; border-bottom: 1px dotted #fff; }
  .greyBlock td { background: #e7e7e7; border-bottom: 1px dotted #fff; }
  .brownBlock th, .blueBlock th, .greyBlock th { text-decoration: underline; }
  .dialogue td { vertical-align: top; }
  .dialogue td.dtype { width: 80px; font-weight: 700; white-space: nowrap; }
  .dialogue td div { margin-bottom: 4px; }
  .dialogue .none { color: #9b8a6a; font-style: italic; }

  .boldText { font-weight: 700; }
  .greenText { color: #2f7d32; }
  .xref { cursor: pointer; text-decoration: underline; }
  .xref:hover { opacity: 0.7; }
  .right { text-align: right; }
  .flexEven { display: flex; width: 100%; }
  .flexEven div { width: 33%; text-align: center; }

  /* StatBlock */
  .StatBlock { background: #e7e7e7; margin-top: 5px; }
  .StatBlock .flex { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
  .portrait { flex: 0 0 75px; width: 75px; height: 100px; object-fit: cover; background: #d8cdb3; }
  .combatStats td, .basicStats td, .skills td { padding: 1px 3px; }
  /* the three stat tables share the remaining width evenly */
  .combatStats, .basicStats, .skills { flex: 1 1 0; width: auto; margin-top: 0; }
  .StatBlock tbody tr:nth-child(odd) td { background: #f5f2f2; }
  .combatActions th { text-decoration: underline; }
  h3 { margin: 8px 0 0; font-size: 12px; }
  .rooms { padding: 8px 4px; }
  .roomItem { margin-bottom: 6px; }
  .roomItemHeader { display: flex; gap: 6px; font-weight: 700; }

  /* DM edit affordance (kept unobtrusive) */
  .editbtn { position: absolute; top: 8px; right: 8px; z-index: 2; opacity: 0; pointer-events: none; transition: opacity 0.15s; font: inherit; cursor: pointer; border: 1px solid #7a2d12; background: #fff; color: #7a2d12; border-radius: 4px; padding: 0 6px; font-size: 10px; }
  .page:hover .editbtn { opacity: 1; pointer-events: auto; }
  .editbtn:hover { background: #7a2d12; color: #fff; }
  form.edit { margin-top: 8px; display: grid; gap: 5px; background: #f6efe0; padding: 8px; border-radius: 4px; }
  form.edit label { font-size: 10px; color: #5b4632; display: grid; gap: 2px; }
  form.edit input, form.edit textarea { font: inherit; font-size: 11px; border: 1px solid #cdbb95; border-radius: 3px; padding: 3px; }
  form.edit .row { display: flex; gap: 6px; }
  form.edit button { font: inherit; cursor: pointer; border-radius: 3px; padding: 3px 9px; border: 1px solid #7a2d12; background: #fff; }
  form.edit button.primary { background: #7a2d12; color: #fff; }
`);
const adopt = (root) => { root.adoptedStyleSheets = [baseStyles]; };

// header block: id + page on the left, name centered, id + page on the right
const headerHtml = (idClass, idText, name, page, sub) => {
  // id on the left, page number on the right.
  const left = `<div class="idContainer left"><div class="id ${idClass}">${esc(idText)}</div></div>`;
  const right = `<div class="idContainer right"><div class="pageNumber">p. ${esc(page ?? '')}</div></div>`;
  const nameBlock = `<div class="nameBlock"><div class="name">${esc(name)}</div>${sub ? `<div class="subtitle">${sub}</div>` : ''}</div>`;
  return `<div class="header">${left}${nameBlock}${right}</div>`;
};

const noneRow = `<tr><td colspan="20">None.</td></tr>`;

// Fixed-order dialogue categories: [stored type, display label].
const DIALOGUE_CATS = [
  ['flavor', 'Flavor'],
  ['opportunity', 'Quest'],
  ['lead', 'Lead'],
  ['perspective', 'Perspective'],
  ['clue', 'Clue'],
];

// ---------------------------------------------------------------------------
// <freeside-statblock> — image + Combat / Stats / Skills tables + Combat Actions
// (mirrors the original StatBlock.tsx; all values from D1)
// ---------------------------------------------------------------------------
class StatBlock extends HTMLElement {
  set data(v) { this._d = v; this.render(); }
  connectedCallback() { if (!this.shadowRoot) this.attachShadow({ mode: 'open' }); adopt(this.shadowRoot); this.render(); }
  render() {
    if (!this.shadowRoot || !this._d) return;
    const it = this._d;
    const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    const skills = [...(it.skills || [])].sort();
    const pad = Math.max(0, 4 - skills.length);
    this.shadowRoot.innerHTML = `
      <div class="StatBlock">
        <div class="flex">
          ${art(it.image, 'portrait')}
          <table class="combatStats">
            <thead><tr><th colspan="2">Combat</th></tr></thead>
            <tbody>
              <tr><td><strong>Armor Class</strong></td><td class="right"><strong>${esc(it.armorClass)}</strong></td></tr>
              <tr><td>Hit Points</td><td class="right">${esc(it.hitPoints)}</td></tr>
              <tr><td>Move</td><td class="right">${esc(it.speed)}</td></tr>
              <tr><td>Initiative</td><td class="right">${attrBonus(it.dexterity)}</td></tr>
              <tr><td>Pass. Pers.</td><td class="right">${esc(it.passivePerception)}</td></tr>
              <tr><td>Chal. Rating</td><td class="right">${esc(it.challengeRating)}</td></tr>
            </tbody>
          </table>
          <table class="basicStats">
            <thead><tr><th>Stat</th><th class="right"></th><th class="right"></th><th class="right">Sv</th></tr></thead>
            <tbody>
              ${abilities.map((a) => `
                <tr><td>${a.slice(0, 3)}.</td><td class="right">${esc(it[a])}</td>
                <td class="right">${attrBonus(it[a])}</td>
                <td class="right">${attrBonus(Number(it[a]) + Number(it.proficiencyBonus || 0))}</td></tr>`).join('')}
            </tbody>
          </table>
          <table class="skills">
            <thead><tr><th>Skill</th><th></th></tr></thead>
            <tbody>
              <tr><td>Prof. Bonus</td><td class="right">+${esc(it.proficiencyBonus)}</td></tr>
              ${skills.map((s) => `<tr><td>${esc(titleCase(s))}</td><td class="right">+${esc(it.proficiencyBonus)}</td></tr>`).join('')}
              ${Array(pad).fill(0).map(() => `<tr><td>-</td><td></td></tr>`).join('')}
              <tr><td colspan="2">${[it.race, it.alignment].filter(Boolean).map(esc).join(' · ')}</td></tr>
            </tbody>
          </table>
        </div>
        ${it.attack ? `
          <table class="combatActions">
            <thead><tr><th colspan="2">Combat Actions + Abilities</th></tr></thead>
            <tbody><tr>
              <td>${esc(it.attack.description || 'Attack')}</td>
              <td>Melee Weapon Attack, <strong>+${esc(it.attack.bonus)} to hit</strong>, ${esc(it.attack.range)}ft reach, ${esc(it.attack.damage)} damage</td>
            </tr></tbody>
          </table>` : ''}
      </div>`;
  }
}
customElements.define('freeside-statblock', StatBlock);

// ---------------------------------------------------------------------------
// <freeside-character> — mirrors Character.tsx
// ---------------------------------------------------------------------------
class CharacterCard extends HTMLElement {
  set data(v) { this._d = v; this.render(); }
  connectedCallback() { if (!this.shadowRoot) this.attachShadow({ mode: 'open' }); adopt(this.shadowRoot); this.render(); }
  render() {
    if (!this.shadowRoot || !this._d) return;
    const c = this._d;
    this.shadowRoot.innerHTML = `
      <div class="page" data-testid="character" data-name="${esc(c.name)}">
        ${headerHtml('char', `C${c.id}`, `${c.name}, ${c.title}`, c.page)}
        <freeside-statblock></freeside-statblock>
        <table class="brownBlock stripeFirst">
          <thead><tr><th colspan="2">Descriptions</th></tr></thead>
          <tbody>
            <tr><td>Inspiration</td><td class="boldText flexEven">${(c.roleplayInspiration || '').split(',').map((n) => `<div>${esc(n.trim())}</div>`).join('')}</td></tr>
            <tr><td>Description</td><td>${esc(c.visualDescription)}</td></tr>
            <tr><td>Detail</td><td>${esc(c.detailOne)}</td></tr>
          </tbody>
        </table>
        <table class="blueBlock dialogue">
          <thead><tr><th colspan="2">Dialogue</th></tr></thead>
          <tbody>${DIALOGUE_CATS.map(([key, label]) => {
            const lines = (c.dialogue || []).filter((d) => d.type === key);
            return `<tr><td class="dtype">${label}</td><td>${lines.length ? lines.map((d) => `<div>"${esc(d.text)}"</div>`).join('') : '<span class="none">none</span>'}</td></tr>`;
          }).join('')}</tbody>
        </table>
      </div>`;
    this.shadowRoot.querySelector('freeside-statblock').data = c;
  }
}
customElements.define('freeside-character', CharacterCard);

// ---------------------------------------------------------------------------
// <freeside-location> — mirrors Location.tsx (incl. both M:N tables), DM edit
// ---------------------------------------------------------------------------
class LocationCard extends HTMLElement {
  set data(v) { this._d = v; this.render(); }
  set editable(v) { this._editable = v; }
  connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    adopt(this.shadowRoot);
    // Cross-reference clicks (Named NPCs / Connected Locations) → ask the book to scroll.
    this.shadowRoot.addEventListener('click', (e) => {
      const x = e.target.closest && e.target.closest('.xref');
      if (!x) return;
      this.dispatchEvent(new CustomEvent('book-scroll', { detail: { target: x.dataset.target }, bubbles: true, composed: true }));
    });
    this.render();
  }
  render() {
    if (!this.shadowRoot || !this._d) return;
    const l = this._d;
    const descRows = ['exterior', 'interior', 'crowd', 'detailOne', 'detailTwo']
      .map((k) => `<tr><td>${esc(titleCase(cap(k)))}</td><td>${esc(l[k])}</td></tr>`).join('');
    this.shadowRoot.innerHTML = `
      <div class="page" data-testid="location" data-name="${esc(l.name)}">
        ${headerHtml('loc', `L${l.id}`, l.name, l.page)}
        ${this._editable ? `<button class="editbtn" id="edit">✎ Edit</button>` : ''}
        ${art(l.image, 'splash')}
        <table class="brownBlock stripeFirst">
          <thead><tr><th colspan="20">Descriptions</th></tr></thead>
          <tbody>
            <tr><td>Inspiration</td><td class="boldText flexEven">${(l.inspiration || '').split(',').slice(0, 2).map((n) => `<div>${esc(n.trim())}</div>`).join('')}</td></tr>
            ${descRows}
          </tbody>
        </table>
        <table class="blueBlock">
          <thead><tr><th colspan="20">Events</th></tr></thead>
          <tbody>${(l.events || []).map((e, i) => `<tr><td>${i + 1}.</td><td colspan="2">${esc(e)}</td></tr>`).join('') || noneRow}</tbody>
        </table>
        <table class="greyBlock">
          <thead><tr><th colspan="20">Random NPCs</th></tr></thead>
          <tbody>${(l.randomNpcs || []).slice(0, 2).map((n) => `<tr><td colspan="3">${esc(n.name)}, ${esc(n.race)}, ${esc(n.job)}: "${esc(n.dialogue)}"</td></tr>`).join('') || noneRow}</tbody>
        </table>
        <table class="greyBlock">
          <thead><tr><th colspan="20">Named NPC's</th></tr></thead>
          <tbody>${(l.characters || []).map((ch) => `<tr><td class="greenText boldText"><span class="xref" data-target="C${esc(ch.id)}">C${esc(ch.id)}</span></td><td>${esc(ch.name)},<br>${esc(ch.title)}</td><td>${esc(ch.description)}</td></tr>`).join('') || noneRow}</tbody>
        </table>
        <table class="greyBlock">
          <thead><tr><th colspan="20">Connected Locations</th></tr></thead>
          <tbody>${(l.connections || []).map((cn) => `<tr><td class="boldText" style="color:#1d4e89"><span class="xref" data-target="L${esc(cn.id)}">L${esc(cn.id)}</span></td><td>${esc(cn.name)}</td><td>${esc(cn.exterior)}</td></tr>`).join('') || noneRow}</tbody>
        </table>
        <div id="editpanel"></div>
      </div>`;
    const editBtn = this.shadowRoot.querySelector('#edit');
    if (editBtn) editBtn.addEventListener('click', () => this.renderEditor());
  }
  renderEditor() {
    const l = this._d;
    const panel = this.shadowRoot.querySelector('#editpanel');
    panel.innerHTML = `
      <form class="edit" id="f">
        <label>Name<input name="name" value="${esc(l.name)}" /></label>
        <label>Crowd<textarea name="crowd" rows="2">${esc(l.crowd)}</textarea></label>
        <label>Exterior<textarea name="exterior" rows="2">${esc(l.exterior)}</textarea></label>
        <label>Interior<textarea name="interior" rows="2">${esc(l.interior)}</textarea></label>
        <label>DM notes<textarea name="dmNotes" rows="2">${esc(l.dmNotes)}</textarea></label>
        <div class="row"><button type="submit" class="primary">Save</button><button type="button" id="cancel">Cancel</button></div>
      </form>`;
    panel.querySelector('#cancel').addEventListener('click', () => (panel.innerHTML = ''));
    panel.querySelector('#f').addEventListener('submit', async (e) => {
      e.preventDefault();
      const body = Object.fromEntries(new FormData(e.target).entries());
      const { location } = await api(`/locations/${l.id}`, { method: 'PUT', body: JSON.stringify(body) });
      this._d = location;
      this.render();
    });
  }
}
customElements.define('freeside-location', LocationCard);

// ---------------------------------------------------------------------------
// <freeside-dungeon> — mirrors Dungeon.tsx (map page + text page; NO room events)
// ---------------------------------------------------------------------------
class DungeonCard extends HTMLElement {
  set data(v) { this._d = v; this.render(); }
  connectedCallback() { if (!this.shadowRoot) this.attachShadow({ mode: 'open' }); adopt(this.shadowRoot); this.render(); }
  render() {
    if (!this.shadowRoot || !this._d) return;
    const d = this._d;
    this.shadowRoot.innerHTML = `
      <div class="page" data-testid="dungeon" data-name="${esc(d.title)}">
        ${headerHtml('dungeon', `D${d.id}`, d.title, d.page)}
        ${d.dmNotes ? `<div class="notesCallout">${esc(d.dmNotes)}</div>` : ''}
        ${art(d.image, 'mapImage')}
        <div class="rooms">
          ${(d.rooms || []).map((r) => `
            <div class="roomItem">
              <div class="roomItemHeader"><div>${esc(r.num)}.</div><div>${esc(r.title)}</div></div>
              <div>${esc(r.description)}</div>
            </div>`).join('')}
        </div>
        <table class="blueBlock stripeFirst">
          <thead><tr><th colspan="2">Misc.</th></tr></thead>
          <tbody>${(d.misc || []).map((m) => `<tr><td>${esc(titleCase(m.key))}</td><td>${esc(m.value)}</td></tr>`).join('') || noneRow}</tbody>
        </table>
        <div id="monsters"></div>
      </div>`;
    const mount = this.shadowRoot.querySelector('#monsters');
    (d.monsters || []).forEach((m) => {
      const wrap = document.createElement('div');
      wrap.innerHTML = `<h3>${esc(m.name)}</h3>`;
      const sb = document.createElement('freeside-statblock');
      wrap.appendChild(sb);
      mount.appendChild(wrap);
      sb.data = m;
    });
  }
}
customElements.define('freeside-dungeon', DungeonCard);

// ---------------------------------------------------------------------------
// <freeside-book> — the DM run-from-the-page adventure (all pages, full detail)
// ---------------------------------------------------------------------------
class Book extends HTMLElement {
  set editable(v) { this._editable = v; }
  connectedCallback() { if (!this.shadowRoot) this.attachShadow({ mode: 'open' }); this.load(); }
  async load() {
    this.shadowRoot.adoptedStyleSheets = [baseStyles, sheet(`.grid{display:flex;flex-wrap:wrap;justify-content:center}.grid>*{scroll-margin-top:64px}.loading{color:#e9dec2;text-align:center;padding:1rem}`)];
    this.shadowRoot.innerHTML = `<div class="loading">Opening the adventure…</div><div class="grid"></div>`;
    let data;
    try { data = await api('/adventure'); }
    catch (e) { this.shadowRoot.querySelector('.loading').textContent = e.status === 404 ? 'Adventure not seeded yet — run `npm run db:seed:local`.' : 'Failed to load.'; return; }
    this.shadowRoot.querySelector('.loading').remove();
    const grid = this.shadowRoot.querySelector('.grid');
    const tag = { location: 'freeside-location', character: 'freeside-character', dungeon: 'freeside-dungeon' };
    const path = { location: 'locations', character: 'characters', dungeon: 'dungeons' };
    const key = { location: 'location', character: 'character', dungeon: 'dungeon' };
    const prefix = { location: 'L', character: 'C', dungeon: 'D' };
    // Scroll to a cross-referenced card (Named NPC / Connected Location).
    this.shadowRoot.addEventListener('book-scroll', (e) => {
      const t = this.shadowRoot.getElementById(e.detail.target);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    const entities = await Promise.all(
      data.pages.map((p) => api(`/${path[p.kind]}/${p.refId}`).then((r) => r[key[p.kind]]).catch(() => null)),
    );
    data.pages.forEach((p, i) => {
      if (!entities[i]) return;
      const el = document.createElement(tag[p.kind]);
      el.id = `${prefix[p.kind]}${p.refId}`;
      if (p.kind === 'location') el.editable = this._editable;
      grid.appendChild(el);
      el.data = entities[i];
    });
  }
}
customElements.define('freeside-book', Book);

// ---------------------------------------------------------------------------
// <freeside-sessions> — DM game-session console (reveal toggles + party tracker)
// ---------------------------------------------------------------------------
class Sessions extends HTMLElement {
  connectedCallback() { if (!this.shadowRoot) this.attachShadow({ mode: 'open' }); this.shadowRoot.adoptedStyleSheets = [sheet(SESSION_CSS)]; this.load(); }
  async load() {
    this.shadowRoot.innerHTML = `<div class="panel"><h2>Game sessions</h2><div id="list">Loading…</div>
      <form id="new"><input name="name" placeholder="New session name" required /><button class="primary">Create</button></form>
      <div id="detail"></div></div>`;
    this.shadowRoot.querySelector('#new').addEventListener('submit', async (e) => {
      e.preventDefault();
      await api('/games', { method: 'POST', body: JSON.stringify({ name: new FormData(e.target).get('name') }) });
      e.target.reset();
      this.refreshList();
    });
    this.refreshList();
  }
  async refreshList() {
    const { sessions } = await api('/games');
    const list = this.shadowRoot.querySelector('#list');
    if (!sessions.length) { list.innerHTML = '<p class="label">No sessions yet.</p>'; return; }
    list.innerHTML = sessions.map((s) => `<div class="srow"><button data-open="${esc(s.id)}">${esc(s.name)}</button>
      <a href="/play/${esc(s.id)}" target="_blank" class="label">player link ↗</a></div>`).join('');
    list.querySelectorAll('[data-open]').forEach((b) => b.addEventListener('click', () => this.openSession(b.dataset.open)));
  }
  async openSession(id) {
    const [{ session, reveals, party }, adv] = await Promise.all([api(`/games/${id}`), api('/adventure')]);
    const revealed = new Set(reveals.map((r) => `${r.kind}:${r.refId}`));
    const detail = this.shadowRoot.querySelector('#detail');
    const labels = { location: 'L', character: 'C', dungeon: 'D' };
    detail.innerHTML = `
      <h3>${esc(session.name)} <a class="label" href="/play/${esc(id)}" target="_blank">open player view ↗</a></h3>
      <div class="sectionTitle">Reveal content to players</div>
      <div class="reveals">${adv.pages.map((p) => {
        const k = `${p.kind}:${p.refId}`;
        return `<label class="rev"><input type="checkbox" data-kind="${p.kind}" data-ref="${p.refId}" ${revealed.has(k) ? 'checked' : ''}/> ${labels[p.kind]}${p.refId} ${p.kind}</label>`;
      }).join('')}</div>
      <div class="sectionTitle">Party</div>
      <div id="party"></div>
      <form id="addp"><input name="playerName" placeholder="Add player" required /><input name="maxHp" type="number" placeholder="HP" style="width:5rem"/><button class="primary">Add</button></form>`;
    detail.querySelectorAll('.rev input').forEach((cb) => cb.addEventListener('change', async () => {
      const route = cb.checked ? 'reveal' : 'unreveal';
      await api(`/games/${id}/${route}`, { method: 'POST', body: JSON.stringify({ kind: cb.dataset.kind, refId: Number(cb.dataset.ref) }) });
    }));
    const renderParty = (members) => {
      const p = detail.querySelector('#party');
      p.innerHTML = members.length ? members.map((m) => `<div class="srow">${esc(m.playerName)} — HP
        <input type="number" value="${esc(m.currentHp ?? m.maxHp ?? '')}" data-hp="${esc(m.id)}" style="width:4rem"/> / ${esc(m.maxHp ?? '?')}
        <button data-del="${esc(m.id)}">✕</button></div>`).join('') : '<p class="label">No players.</p>';
      p.querySelectorAll('[data-hp]').forEach((inp) => inp.addEventListener('change', () =>
        api(`/games/${id}/party/${inp.dataset.hp}`, { method: 'PUT', body: JSON.stringify({ currentHp: Number(inp.value) }) })));
      p.querySelectorAll('[data-del]').forEach((b) => b.addEventListener('click', async () => {
        await api(`/games/${id}/party/${b.dataset.del}`, { method: 'DELETE' });
        const { party } = await api(`/games/${id}`); renderParty(party);
      }));
    };
    renderParty(party);
    detail.querySelector('#addp').addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      await api(`/games/${id}/party`, { method: 'POST', body: JSON.stringify({ playerName: fd.get('playerName'), maxHp: Number(fd.get('maxHp')) || null, currentHp: Number(fd.get('maxHp')) || null }) });
      e.target.reset();
      const { party } = await api(`/games/${id}`); renderParty(party);
    });
  }
}
const SESSION_CSS = `
  :host { display:block; color:#1b140d; font-family:'Cormorant Garamond',Georgia,serif; }
  .panel { background: #fbf6e9; border-radius: 8px; padding: 16px; max-width: 720px; margin: 0 auto; }
  h2, h3 { font-family: 'Cinzel Decorative', serif; color: #7a2d12; }
  .sectionTitle { margin-top: 10px; font-weight: 700; color: #7a2d12; border-bottom: 1px solid #cdbb95; }
  .srow { display: flex; align-items: center; gap: 8px; padding: 3px 0; }
  .srow button { font: inherit; cursor: pointer; border: 1px solid #cdbb95; background: #f1e2c6; border-radius: 5px; padding: 3px 9px; }
  form { display: flex; gap: 6px; margin: 10px 0; }
  input { font: inherit; border: 1px solid #cdbb95; border-radius: 5px; padding: 4px 7px; }
  button.primary { background: #7a2d12; color: #fbf6e9; border: none; border-radius: 5px; padding: 4px 12px; cursor: pointer; }
  .reveals { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 2px; max-height: 240px; overflow: auto; border: 1px solid #cdbb95; border-radius: 6px; padding: 6px; }
  .rev { font-size: 12px; text-transform: capitalize; }
  a { color: #1d4e89; }
  .label { color: #5b4632; font-style: italic; }
`;
customElements.define('freeside-sessions', Sessions);

// ---------------------------------------------------------------------------
// <freeside-play> — minimal player view: revealed content as name + image ONLY
// ---------------------------------------------------------------------------
class Play extends HTMLElement {
  connectedCallback() { if (!this.shadowRoot) this.attachShadow({ mode: 'open' }); this.shadowRoot.adoptedStyleSheets = [sheet(PLAY_CSS)]; this.load(); }
  async load() {
    const id = location.pathname.split('/')[2];
    let data;
    try { data = await api(`/play/${id}`); }
    catch { this.shadowRoot.innerHTML = `<div class="empty">This session link isn’t valid.</div>`; return; }
    const render = (d) => {
      this.shadowRoot.innerHTML = `
        <div class="wrap">
          <h1>${esc(d.adventureTitle || 'Adventure')}</h1>
          <p class="sub">${esc(d.session.name)}</p>
          ${d.reveals.length ? `<div class="grid">${d.reveals.map((e) => `
            <figure class="card">
              ${e.image ? `<img src="${esc(e.image)}" alt="" onerror="this.style.visibility='hidden'"/>` : '<div class="noimg"></div>'}
              <figcaption>${esc(e.name)}</figcaption>
            </figure>`).join('')}</div>`
            : `<div class="empty">Nothing revealed yet. Your DM will share locations and faces as you discover them.</div>`}
        </div>`;
    };
    render(data);
    this._poll = setInterval(async () => { try { render(await api(`/play/${id}`)); } catch {} }, 5000);
  }
  disconnectedCallback() { clearInterval(this._poll); }
}
const PLAY_CSS = `
  :host { display: block; }
  .wrap { max-width: 900px; margin: 0 auto; text-align: center; color: #f0e3c8; font-family: 'Cormorant Garamond', Georgia, serif; }
  h1 { font-family: 'Cinzel Decorative', serif; }
  .sub { color: #d8c39c; margin-top: -0.5rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; margin-top: 1rem; }
  .card { margin: 0; background: #1b140d; border: 1px solid #6b4a2b; border-radius: 10px; overflow: hidden; }
  .card img, .card .noimg { width: 100%; height: 200px; object-fit: cover; background: #2c2419; display: block; }
  figcaption { font-family: 'Cinzel Decorative', serif; padding: 10px; font-size: 1.05rem; }
  .empty { color: #d8c39c; padding: 3rem 1rem; font-size: 1.1rem; }
`;
customElements.define('freeside-play', Play);

// ---------------------------------------------------------------------------
// <freeside-app> — router + nav + auth gate
// ---------------------------------------------------------------------------
class App extends HTMLElement {
  async connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [sheet(`:host{display:block}.gate{color:#e9dec2;text-align:center;padding:2rem;font-family:'Cormorant Garamond',Georgia,serif}.gate a,.gate button{display:inline-block;margin:6px;padding:8px 16px;background:#3a2817;color:#f0e3c8;border-radius:6px;text-decoration:none;border:1px solid #6b4a2b;font:inherit;cursor:pointer}`)];
    if (location.pathname.startsWith('/play/')) { this.shadowRoot.innerHTML = '<freeside-play></freeside-play>'; return; }
    this.me = await api('/me').catch(() => ({ user: null, devLogin: false }));
    this.renderUserSlot();
    window.addEventListener('hashchange', () => this.route());
    this.route();
  }
  renderUserSlot() {
    const slot = document.getElementById('userslot');
    if (!slot) return;
    if (this.me.user) {
      slot.innerHTML = `${this.me.user.picture ? `<img src="${esc(this.me.user.picture)}"/>` : ''}<span>${esc(this.me.user.name)}</span><button id="logout">Sign out</button>`;
      slot.querySelector('#logout').addEventListener('click', async () => { await fetch('/auth/logout', { method: 'POST' }); location.reload(); });
    } else {
      slot.innerHTML = `<a href="/auth/google/login">Sign in</a>`;
    }
  }
  route() {
    const hash = location.hash.replace('#', '') || 'book';
    document.querySelectorAll('.topnav a').forEach((a) => a.classList.toggle('active', a.dataset.nav === hash));
    if (hash === 'sessions') {
      if (!this.me.user) { this.shadowRoot.innerHTML = this.gate('Sign in to run game sessions.'); return; }
      this.shadowRoot.innerHTML = '<freeside-sessions></freeside-sessions>';
    } else {
      this.shadowRoot.innerHTML = '<freeside-book></freeside-book>';
      this.shadowRoot.querySelector('freeside-book').editable = !!this.me.user;
      if (this.me.user) this.maybeClaim();
    }
  }
  async maybeClaim() { try { await api('/adventure/claim', { method: 'POST' }); } catch {} }
  gate(msg) {
    const dev = this.me.devLogin ? `<button id="dev">Dev login</button>` : '';
    return `<div class="gate"><p>${esc(msg)}</p><a href="/auth/google/login">Sign in with Google</a><a href="/auth/discord/login">Sign in with Discord</a>${dev}</div>`;
  }
}
customElements.define('freeside-app', App);

// Dev-login delegation (the button lives inside shadow roots that re-render).
document.addEventListener('click', async (e) => {
  if (e.composedPath().some((n) => n.id === 'dev')) {
    await fetch('/auth/dev-login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
    location.reload();
  }
});
