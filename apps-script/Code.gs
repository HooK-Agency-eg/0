/**
 * Hook backend on Google Apps Script + Google Sheets.
 * Steps: see README.md in this folder.
 */
const ADMIN_USER = 'mido';
const ADMIN_EMAIL = 'mm.Mido1270@gmail.com';
const ADMIN_PW = 'CHANGE_ME';      // type your password here, run setup() once, then put CHANGE_ME back
const ROUNDS = 400, TZ = 'Africa/Cairo';
const COLS = ['work', 'clients', 'products'], CATS = ['Design', 'Content', 'Media Buying'];
const SEED = {"work": [{"id": "w1", "cat": "Design", "name": {"en": "JMG Real Estate", "ar": "JMG Real Estate"}, "desc": {"en": "Designs that bring properties to life: social graphics, ads, brochures, site maps and branding that sells the lifestyle before the unit.", "ar": "تصاميم بتخلّي العقار يتكلم: جرافيك سوشيال وإعلانات وبروشورات وخرايط مواقع وهوية بتبيع الحياة اللي حواليك قبل الوحدة."}, "img": "img/jmg-design.jpg"}, {"id": "w2", "cat": "Design", "name": {"en": "M.A Express", "ar": "M.A Express"}, "desc": {"en": "Designs that deliver confidence: branded packaging, truck graphics, social visuals and ads for a shipping company.", "ar": "تصاميم بتبني الثقة: تغليف بهوية الشركة وجرافيك للعربيات وتصاميم سوشيال وإعلانات لشركة شحن."}, "img": "img/ma-design.jpg"}, {"id": "w3", "cat": "Design", "name": {"en": "Lumière Candles", "ar": "Lumière Candles"}, "desc": {"en": "Warm designs for warm moments: packaging, labels and social content for handmade candles.", "ar": "تصاميم دافية للحظات دافية: تغليف وستيكرات ومحتوى سوشيال لشموع هاند ميد."}, "img": "img/lumiere-design.jpg"}, {"id": "w4", "cat": "Content", "name": {"en": "Global Premier Properties", "ar": "Global Premier Properties"}, "desc": {"en": "Real estate content that sells before the site is built, from ad creatives to brand storytelling.", "ar": "محتوى عقاري بيبيع قبل ما المشروع يتبني، من الإعلانات لحكاية البراند."}, "img": "img/gpp-content.jpg"}, {"id": "w5", "cat": "Content", "name": {"en": "BestRate", "ar": "BestRate"}, "desc": {"en": "Content for the shipping industry: social posts and ad copy that highlight speed, safety and trust.", "ar": "محتوى لشركات الشحن: بوستات وإعلانات بتوضّح السرعة والأمان والثقة."}, "img": "img/bestrate-content.jpg"}, {"id": "w6", "cat": "Content", "name": {"en": "Silsal Corporation", "ar": "مؤسسة سلسال"}, "desc": {"en": "Persuasive content for postgraduate courses and executive diplomas.", "ar": "محتوى مقنع لبرامج الدراسات العليا والدبلومات التنفيذية."}, "img": "img/silsal-content.jpg"}, {"id": "w7", "cat": "Media Buying", "name": {"en": "JMG Real Estate", "ar": "JMG Real Estate"}, "desc": {"en": "Meta Ads and Google Display campaigns for qualified buyers. Two projects delivered 253 and 158 conversations.", "ar": "حملات ميتا وجوجل ديسبلاي بتوصل لمشترين جادين. مشروعين جابوا 253 و158 محادثة."}, "img": "img/jmg-media.jpg"}, {"id": "w8", "cat": "Media Buying", "name": {"en": "The Act of Teaching", "ar": "The Act of Teaching"}, "desc": {"en": "Ad campaigns for online courses: 362 conversations at 4.56 EGP per conversation.", "ar": "حملات إعلانية لكورسات أونلاين: 362 محادثة بتكلفة 4.56 ج.م للمحادثة."}, "img": "img/education-media.jpg"}], "clients": [{"id": "c1", "name": "Al-Malak", "logo": "logos/almalak.png"}, {"id": "c2", "name": "Holybelly", "logo": "logos/holybelly.png"}, {"id": "c3", "name": "2B Studio", "logo": "logos/2b-studio.png"}, {"id": "c4", "name": "BestRate", "logo": "logos/bestrate.png"}, {"id": "c5", "name": "JMG Real Estate", "logo": "logos/jmg.png"}, {"id": "c6", "name": "Silsal Corporation", "logo": "logos/silsal.png"}, {"id": "c7", "name": "Charly", "logo": "logos/charly.png"}, {"id": "c8", "name": "Bucharest Black", "logo": "logos/bucharest-black.png"}, {"id": "c9", "name": "Levai & Loris", "logo": "logos/levai-loris.png"}, {"id": "c10", "name": "Gramophone Co-Working Space", "logo": "logos/gramophone.png"}, {"id": "c11", "name": "M.A Express", "logo": "logos/ma-express.png"}, {"id": "c12", "name": "Global Premier Properties", "logo": "logos/gpp.png"}, {"id": "c13", "name": "The Act of Teaching", "logo": "logos/act-of-teaching.png"}, {"id": "c14", "name": "Lumière", "logo": "logos/lumiere.png"}], "products": [{"id": "p1", "name": {"en": "Social Media Starter", "ar": "باقة السوشيال الأساسية"}, "price": 3500, "per": {"en": "month", "ar": "في الشهر"}, "tag": {"en": "Social media", "ar": "سوشيال ميديا"}, "items": [{"en": "12 designed posts", "ar": "12 بوست مصمم"}, {"en": "4 stories", "ar": "4 ستوريز"}, {"en": "Basic community replies", "ar": "ردود أساسية على الكومنتات والرسايل"}]}, {"id": "p2", "name": {"en": "Social Media Growth", "ar": "باقة السوشيال للنمو"}, "price": 6500, "per": {"en": "month", "ar": "في الشهر"}, "tag": {"en": "Social media", "ar": "سوشيال ميديا"}, "items": [{"en": "20 designed posts", "ar": "20 بوست مصمم"}, {"en": "8 videos or reels", "ar": "8 فيديوهات أو ريلز"}, {"en": "Full community management", "ar": "إدارة كاملة للكومنتات والرسايل"}, {"en": "Monthly report", "ar": "تقرير شهري"}]}, {"id": "p3", "name": {"en": "Brand Identity", "ar": "الهوية البصرية"}, "price": 8000, "per": {"en": "one time", "ar": "مرة واحدة"}, "tag": {"en": "Branding", "ar": "هوية"}, "items": [{"en": "Logo and color palette", "ar": "لوجو وألوان البراند"}, {"en": "Typography", "ar": "خطوط البراند"}, {"en": "Social media templates", "ar": "قوالب سوشيال ميديا"}]}, {"id": "p4", "name": {"en": "Ads Management", "ar": "إدارة الإعلانات"}, "price": 4000, "per": {"en": "month + ad spend", "ar": "في الشهر + ميزانية الإعلان"}, "tag": {"en": "Media buying", "ar": "شراء إعلانات"}, "items": [{"en": "Meta Ads campaigns", "ar": "حملات ميتا"}, {"en": "Audience targeting", "ar": "استهداف الجمهور"}, {"en": "Weekly optimization", "ar": "تحسين أسبوعي"}]}, {"id": "p5", "name": {"en": "Content Pack", "ar": "باقة المحتوى"}, "price": 2500, "per": {"en": "one time", "ar": "مرة واحدة"}, "tag": {"en": "Content", "ar": "محتوى"}, "items": [{"en": "15 written posts", "ar": "15 بوست مكتوب"}, {"en": "Ad copy variations", "ar": "كذا نسخة للإعلان الواحد"}, {"en": "Brand voice guide", "ar": "دليل أسلوب كلام البراند"}]}, {"id": "p6", "name": {"en": "Full Launch Bundle", "ar": "باقة الإطلاق الكاملة"}, "price": 15000, "per": {"en": "one time", "ar": "مرة واحدة"}, "tag": {"en": "Bundle", "ar": "باقة شاملة"}, "items": [{"en": "Brand identity", "ar": "هوية بصرية"}, {"en": "1 month of social media", "ar": "شهر سوشيال ميديا"}, {"en": "1 month of ads management", "ar": "شهر إدارة إعلانات"}]}], "buttons": {"hero1": {"label": {"en": "Start a project", "ar": "ابدأ مشروعك"}, "href": "contact.html"}, "hero2": {"label": {"en": "See our work", "ar": "شوف أعمالنا"}, "href": "portfolio.html"}, "workAll": {"label": {"en": "View all work", "ar": "شوف كل الأعمال"}, "href": "portfolio.html"}, "cta": {"label": {"en": "Contact us", "ar": "كلمنا"}, "href": "contact.html"}, "servicesShop": {"label": {"en": "Browse packages in the shop", "ar": "شوف الباقات في المتجر"}, "href": "shop.html"}}, "contact": {"email": "mm.Mido1270@gmail.com", "whatsapp": "201120767519"}};

/* ---------- sheets ---------- */
function sheet_(n) { const ss = SpreadsheetApp.getActiveSpreadsheet(); return ss.getSheetByName(n) || ss.insertSheet(n); }
function rows_(n) { const s = sheet_(n), r = s.getLastRow(); return r < 2 ? [] : s.getRange(2, 1, r - 1, s.getLastColumn()).getValues(); }
function rowOf_(n, id) { const r = rows_(n); for (let i = 0; i < r.length; i++) if (String(r[i][0]) === String(id)) return i + 2; return 0; }
function list_(c) { return rows_(c).map(r => JSON.parse(r[1])); }
function put_(c, it) { const row = rowOf_(c, it.id), v = [[it.id, JSON.stringify(it)]]; if (row) sheet_(c).getRange(row, 1, 1, 2).setValues(v); else sheet_(c).appendRow(v[0]); }
function cfg_(k) { const r = rows_('config'); for (let i = 0; i < r.length; i++) if (r[i][0] === k) return JSON.parse(r[i][1]); return null; }
function setCfg_(k, v) { const row = rowOf_('config', k), a = [[k, JSON.stringify(v)]]; if (row) sheet_('config').getRange(row, 1, 1, 2).setValues(a); else sheet_('config').appendRow(a[0]); }
function content_() {
  const c = CacheService.getScriptCache(), k = c.get('content'); if (k) return JSON.parse(k);
  const d = { work: list_('work'), clients: list_('clients'), products: list_('products'), buttons: cfg_('buttons'), contact: cfg_('contact') };
  try { c.put('content', JSON.stringify(d), 300); } catch (e) {} return d;
}
function lock_(fn) { const l = LockService.getScriptLock(); l.waitLock(20000); try { return fn(); } finally { l.releaseLock(); } }
function day_(d) { return Utilities.formatDate(d || new Date(), TZ, 'yyyy-MM-dd'); }

/* ---------- users and tokens ---------- */
function secret_() { return PropertiesService.getScriptProperties().getProperty('SECRET'); }
function sig_(s) { return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(s, secret_())); }
function same_(a, b) { if (a.length !== b.length) return false; let x = 0; for (let i = 0; i < a.length; i++) x |= a.charCodeAt(i) ^ b.charCodeAt(i); return x === 0; }
function hashPw_(pw, salt) { let h = pw + salt; for (let i = 0; i < ROUNDS; i++) h = Utilities.base64Encode(Utilities.computeHmacSha256Signature(h, salt + pw)); return 'h:' + h; }
function mkTok_(u) { const p = u.id + '.' + (Date.now() + 14 * 864e5) + '.' + (u.role === 'admin' ? 'a' : 'u'); return p + '.' + sig_(p); }
function claims_(t) { const a = String(t || '').split('.'); if (a.length !== 4 || !same_(sig_(a.slice(0, 3).join('.')), a[3]) || +a[1] < Date.now()) return null; return { uid: a[0], r: a[2] }; }
function userObj_(r) { return { id: String(r[0]), username: String(r[1]), email: String(r[2]), role: String(r[3]), salt: String(r[4]), hash: String(r[5]), at: String(r[6]) }; }
function users_() { return rows_('users').map(userObj_); }
function userFromTok_(t) { const c = claims_(t); if (!c) return null; return users_().filter(u => u.id === c.uid)[0] || null; }
function pub_(u) { return u ? { username: u.username, email: u.email, role: u.role } : null; }
function addUser_(username, email, pw, role) {
  const salt = Utilities.getUuid(), u = { id: 'u' + Utilities.getUuid().replace(/-/g, '').slice(0, 8), username: username, email: email, role: role };
  sheet_('users').appendRow([u.id, username, email, role, salt, hashPw_(pw, salt), new Date().toISOString()]); return u;
}
function limited_(key, max, secs) { const c = CacheService.getScriptCache(), n = (+c.get(key) || 0) + 1; c.put(key, String(n), secs); return n > max; }

/* ---------- validation ---------- */
const S = (v, n) => String(v == null ? '' : v).trim().slice(0, n || 300);
const LS = (o, n) => ({ en: S(o && o.en, n), ar: S(o && o.ar, n) });
function href_(h) { h = S(h, 300); return /^\s*(javascript|data|vbscript):/i.test(h) ? '#' : h; }
function img_(p) { p = S(p, 200); return (/^(img|logos|uploads)\/[\w.\-]+$/.test(p) || /^https:\/\/lh3\.googleusercontent\.com\/d\/[\w\-]+$/.test(p)) ? p : ''; }
function digits_(v) { let d = String(v || '').replace(/\D/g, ''); if (/^0\d{10}$/.test(d)) d = '20' + d.slice(1); return d; }
const clean = {
  work: b => ({ cat: CATS.indexOf(b.cat) >= 0 ? b.cat : 'Design', name: LS(b.name, 100), desc: LS(b.desc, 600), img: img_(b.img) }),
  clients: b => ({ name: S(b.name, 80), logo: img_(b.logo) }),
  products: b => ({ name: LS(b.name, 100), price: Math.max(0, Math.min(1e7, Number(b.price) || 0)), per: LS(b.per, 60), tag: LS(b.tag, 60), items: (Array.isArray(b.items) ? b.items : []).slice(0, 12).map(i => LS(i, 100)) })
};
const named_ = c => typeof c.name === 'string' ? !!c.name : !!(c.name.en || c.name.ar);
const R = (s, d, x) => { const o = { s: s, d: d }; if (x) for (const k in x) o[k] = x[k]; return o; };

/* ---------- entry points ---------- */
function doGet() { return ContentService.createTextOutput(JSON.stringify({ ok: 1, service: 'hook' })).setMimeType(ContentService.MimeType.JSON); }
function doPost(e) {
  let out;
  try { out = route_(JSON.parse(e.postData.contents)); } catch (err) { out = R(500, { error: 'Server error' }); }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
function route_(q) {
  const p = String(q.route || ''), b = q.body || {}, tok = q.token || '';
  ensure_();
  if (p === '/api/content') return R(200, content_());
  if (p === '/api/me') return R(200, { user: pub_(userFromTok_(tok)) });
  if (p === '/api/logout') return R(200, { ok: 1 });
  if (p === '/api/track') {
    const c = claims_(tok); if (c && c.r === 'a') return R(200, { ok: 1 });
    const vid = S(b.vid, 40).replace(/[^\w]/g, '');
    if (b.k === 'visit') { let pg = S(b.p, 80).replace(/[^\w\-.\/]/g, ''); if (!pg || pg === '/') pg = '/index.html'; pg = pg.replace(/^\/.*\/(?=[^\/]+$)/, '/'); sheet_('events').appendRow([day_(), 'visit', pg, vid]); }
    else if (b.k === 'view' && list_('work').some(w => w.id === b.id)) sheet_('events').appendRow([day_(), 'view', S(b.id, 20), vid]);
    return R(200, { ok: 1 });
  }
  if (p === '/api/register') {
    if (limited_('reg', 40, 3600)) return R(429, { error: 'Too many attempts, try later' });
    const username = S(b.username, 24), email = S(b.email, 120).toLowerCase(), pw = String(b.password || '');
    if (!/^[A-Za-z0-9_]{3,24}$/.test(username)) return R(400, { error: 'Username: 3-24 letters, numbers or _' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return R(400, { error: 'Invalid email' });
    if (pw.length < 8 || pw.length > 100) return R(400, { error: 'Password must be at least 8 characters' });
    return lock_(() => {
      if (users_().some(u => u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === email)) return R(409, { error: 'Username or email already used' });
      const u = addUser_(username, email, pw, 'user'); return R(200, { user: pub_(u) }, { token: mkTok_(u) });
    });
  }
  if (p === '/api/login') {
    const id = S(b.id, 120).toLowerCase();
    if (limited_('log:' + id.replace(/[^\w@.]/g, '').slice(0, 80), 8, 900) || limited_('logall', 200, 900)) return R(429, { error: 'Too many attempts, wait 15 minutes' });
    const u = users_().filter(x => x.username.toLowerCase() === id || x.email.toLowerCase() === id)[0];
    if (!u || !same_(hashPw_(String(b.password || ''), u.salt), u.hash)) return R(401, { error: 'Wrong username/email or password' });
    return R(200, { user: pub_(u) }, { token: mkTok_(u) });
  }
  if (p === '/api/order') {
    if (limited_('ord', 60, 3600)) return R(429, { error: 'Too many orders' });
    const prods = list_('products'), items = [], me = userFromTok_(tok);
    (Array.isArray(b.items) ? b.items : []).slice(0, 20).forEach(i => { const pr = prods.filter(x => x.id === i.id)[0], q = Math.max(1, Math.min(99, parseInt(i.q) || 1)); if (pr) items.push({ id: pr.id, name: pr.name.en || pr.name.ar, q: q, price: pr.price }); });
    if (!items.length) return R(400, { error: 'empty' });
    const id = 'o' + Utilities.getUuid().replace(/-/g, '').slice(0, 8), total = items.reduce((a, i) => a + i.q * i.price, 0);
    sheet_('orders').appendRow([id, new Date().toISOString(), me ? me.username : '', JSON.stringify(items), total, 'new']); return R(200, { ok: 1, id: id });
  }
  if (p.indexOf('/api/admin/') === 0) {
    const me = userFromTok_(tok); if (!me || me.role !== 'admin') return R(401, { error: 'Admin only' });
    return p === '/api/admin/stats' ? R(200, stats_()) : lock_(() => admin_(p, String(q.method || 'GET'), b, me));
  }
  return R(404, { error: 'Not found' });
}

/* ---------- admin ---------- */
function admin_(p, m, b, me) {
  const cache = CacheService.getScriptCache(); let r;
  if (p === '/api/admin/password' && m === 'POST') {
    const u = users_().filter(x => x.id === me.id)[0];
    if (!same_(hashPw_(String(b.old || ''), u.salt), u.hash)) return R(400, { error: 'Current password is wrong' });
    const n = String(b.new || ''); if (n.length < 8) return R(400, { error: 'New password must be at least 8 characters' });
    const salt = Utilities.getUuid(); sheet_('users').getRange(rowOf_('users', u.id), 5, 1, 2).setValues([[salt, hashPw_(n, salt)]]); return R(200, { ok: 1 });
  }
  if (p === '/api/admin/upload' && m === 'POST') {
    const b64 = String(b.b64 || ''); if (!b64 || b64.length > 7e6) return R(400, { error: 'Only PNG, JPG or WEBP images' });
    const by = Utilities.base64Decode(b64); let mime = '', ext = '';
    if (by[0] === -119 && by[1] === 80 && by[2] === 78 && by[3] === 71) { mime = 'image/png'; ext = 'png'; }
    else if (by[0] === -1 && by[1] === -40 && by[2] === -1) { mime = 'image/jpeg'; ext = 'jpg'; }
    else if (by[0] === 82 && by[1] === 73 && by[2] === 70 && by[3] === 70 && by[8] === 87 && by[9] === 69 && by[10] === 66 && by[11] === 80) { mime = 'image/webp'; ext = 'webp'; }
    if (!mime) return R(400, { error: 'Only PNG, JPG or WEBP images' });
    const it = DriveApp.getFoldersByName('Hook uploads'), folder = it.hasNext() ? it.next() : DriveApp.createFolder('Hook uploads');
    const f = folder.createFile(Utilities.newBlob(by, mime, Utilities.getUuid() + '.' + ext)); f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return R(200, { path: 'https://lh3.googleusercontent.com/d/' + f.getId() });
  }
  if ((r = p.match(/^\/api\/admin\/(work|clients|products)(?:\/(\w+))?$/))) {
    const col = r[1], id = r[2];
    if (m === 'POST' && !id) {
      const c = clean[col](b); if (!named_(c)) return R(400, { error: 'Name is required' });
      if (col !== 'products' && !(c.img || c.logo)) return R(400, { error: 'Image is required' });
      const it = Object.assign({ id: col[0] + Utilities.getUuid().replace(/-/g, '').slice(0, 8) }, c); put_(col, it); cache.remove('content'); return R(200, it);
    }
    const cur = list_(col).filter(x => x.id === id)[0]; if (!cur) return R(404, { error: 'Not found' });
    if (m === 'PUT') {
      const c = clean[col](b); if (!named_(c)) return R(400, { error: 'Name is required' });
      if (!c.img) delete c.img; if (!c.logo) delete c.logo;
      const it = Object.assign(cur, c); put_(col, it); cache.remove('content'); return R(200, it);
    }
    if (m === 'DELETE') { sheet_(col).deleteRow(rowOf_(col, id)); cache.remove('content'); return R(200, { ok: 1 }); }
  }
  if ((r = p.match(/^\/api\/admin\/buttons\/(\w+)$/)) && m === 'PUT') {
    const btn = cfg_('buttons') || {}; if (!btn[r[1]]) return R(404, { error: 'Not found' });
    btn[r[1]] = { label: LS(b.label, 60), href: href_(b.href) }; setCfg_('buttons', btn); cache.remove('content'); return R(200, btn[r[1]]);
  }
  if (p === '/api/admin/contact' && m === 'PUT') {
    const email = S(b.email, 120), wa = digits_(b.whatsapp);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return R(400, { error: 'Invalid email' });
    if (wa.length < 8 || wa.length > 15) return R(400, { error: 'Invalid WhatsApp number' });
    setCfg_('contact', { email: email, whatsapp: wa }); cache.remove('content'); return R(200, { email: email, whatsapp: wa });
  }
  if ((r = p.match(/^\/api\/admin\/orders\/(\w+)$/)) && m === 'PATCH') {
    const row = rowOf_('orders', r[1]);
    if (!row || ['new', 'confirmed', 'done', 'cancelled'].indexOf(b.status) < 0) return R(400, { error: 'Bad request' });
    sheet_('orders').getRange(row, 6).setValue(b.status); return R(200, { ok: 1 });
  }
  return R(404, { error: 'Not found' });
}

function stats_() {
  const ev = rows_('events'), today = day_(), days = [], dmap = {}, pages = {}, views = {}, uv = {};
  let visits = 0;
  ev.forEach(e => {
    const d = String(e[0]).slice(0, 10), t = e[1], a = String(e[2]), v = String(e[3]);
    if (t === 'visit') { visits++; dmap[d] = (dmap[d] || 0) + 1; pages[a] = (pages[a] || 0) + 1; if (v) uv[v] = 1; }
    else if (t === 'view') views[a] = (views[a] || 0) + 1;
  });
  for (let i = 13; i >= 0; i--) { const d = day_(new Date(Date.now() - i * 864e5)); days.push({ d: d, n: dmap[d] || 0 }); }
  const orders = rows_('orders').map(r => ({ id: String(r[0]), at: String(r[1]), user: String(r[2]) || null, items: JSON.parse(r[3]), total: +r[4], status: String(r[5]) })).reverse();
  const sales = {}; let revenue = 0;
  orders.filter(o => o.status !== 'cancelled').forEach(o => { revenue += o.total; o.items.forEach(i => { const s = sales[i.id] || (sales[i.id] = { id: i.id, name: i.name, qty: 0, revenue: 0 }); s.qty += i.q; s.revenue += i.q * i.price; }); });
  const work = list_('work'), users = users_();
  return {
    visits: visits, today: dmap[today] || 0, week: days.slice(-7).reduce((a, x) => a + x.n, 0), unique: Object.keys(uv).length, days: days,
    pages: Object.keys(pages).map(k => ({ p: k, n: pages[k] })).sort((a, b) => b.n - a.n),
    topWork: work.map(w => ({ id: w.id, name: w.name.en || w.name.ar, views: views[w.id] || 0 })).sort((a, b) => b.views - a.views),
    topProducts: Object.keys(sales).map(k => sales[k]).sort((a, b) => b.qty - a.qty), revenue: revenue,
    accounts: users.length, users: users.map(u => ({ username: u.username, email: u.email, role: u.role, at: u.at })),
    orders: orders.slice(0, 100), counts: { work: work.length, clients: list_('clients').length, products: list_('products').length }
  };
}

/* ---------- run these from the editor ---------- */
function init_() {
  const heads = { work: ['id', 'json'], clients: ['id', 'json'], products: ['id', 'json'], config: ['key', 'json'], users: ['id', 'username', 'email', 'role', 'salt', 'hash', 'at'], orders: ['id', 'at', 'user', 'items', 'total', 'status'], events: ['day', 'type', 'a', 'vid'] };
  Object.keys(heads).forEach(n => { const s = sheet_(n); if (s.getLastRow() === 0) { s.appendRow(heads[n]); s.setFrozenRows(1); } });
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('SECRET')) props.setProperty('SECRET', Utilities.getUuid() + Utilities.getUuid());
  COLS.forEach(c => { if (rows_(c).length === 0) SEED[c].forEach(it => put_(c, it)); });
  if (!cfg_('buttons')) setCfg_('buttons', SEED.buttons);
  if (!cfg_('contact')) setCfg_('contact', SEED.contact);
  CacheService.getScriptCache().remove('content');
}
function ensure_() {
  if (PropertiesService.getScriptProperties().getProperty('SECRET') && cfg_('contact')) return;
  lock_(() => { if (!PropertiesService.getScriptProperties().getProperty('SECRET') || !cfg_('contact')) init_(); });
}
function setup() {
  init_();
  if (!users_().some(u => u.role === 'admin')) {
    if (ADMIN_PW === 'CHANGE_ME') throw new Error('Type your password in ADMIN_PW at the top first');
    addUser_(ADMIN_USER, ADMIN_EMAIL, ADMIN_PW, 'admin');
  }
  return 'Setup done';
}
function resetAdmin() {
  if (ADMIN_PW === 'CHANGE_ME') throw new Error('Type your password in ADMIN_PW at the top first');
  const a = users_().filter(u => u.role === 'admin')[0], salt = Utilities.getUuid();
  sheet_('users').getRange(rowOf_('users', a.id), 5, 1, 2).setValues([[salt, hashPw_(ADMIN_PW, salt)]]); return 'Admin password reset';
}
