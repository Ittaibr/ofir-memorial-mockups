/* The long table, round 2: one engine shared by the three variants.
   Site (filters from variant A), contributing (composer + "waiting" state), admin (queue with tags,
   order, highlight, hidden, undo), and a full-screen photo viewer.
   ALL NAMES, TEXTS, YEARS AND WORKPLACES ARE PLACEHOLDERS. Real content comes from the family. */
(function () {
  var O = window.OFIR;
  var qs = function (s, r) { return (r || document).querySelector(s); };
  var qsa = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var ICONS = {
    chev: '<path d="M6 9l6 6 6-6"/>', x: '<path d="M6 6l12 12M18 6L6 18"/>', plus: '<path d="M12 5v14M5 12h14"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    down: '<path d="M12 5v14M6 13l6 6 6-6"/>', wide: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    prev: '<path d="M9 6l6 6-6 6"/>', next: '<path d="M15 6l-6 6 6 6"/>', leaf: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19c3-5 6-8 10-10"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', hide: '<path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4M6.2 6.2C3.6 8 2 12 2 12s3.6 7 10 7a9.6 9.6 0 0 0 4.2-.9"/>'
  };
  function ic(n) { return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + ICONS[n] + '</svg>'; }

  /* ---------------- data ---------------- */
  var F = {
    period: { label: 'תקופה', opts: [['childhood', 'ילדות'], ['youth', 'נעורים'], ['army', 'צבא'], ['studies', 'לימודים'], ['work', 'עבודה'], ['recent', 'השנים האחרונות']] },
    workplace: { label: 'מקום עבודה', note: 'שמות לדוגמה. המשפחה תזין את האמיתיים.', opts: [['w1', 'מקום עבודה א׳'], ['w2', 'מקום עבודה ב׳'], ['w3', 'מקום עבודה ג׳']] },
    relation: { label: 'קרבה', opts: [['family', 'משפחה'], ['friends', 'חברים'], ['hobbies', 'תחביבים']] }
  };
  var ORDER = ['period', 'workplace', 'relation'];
  var YEARS = { childhood: '1998–2004', youth: '2005–2008', army: '2009–2012', studies: '2013–2016', work: '2017–2021', recent: '2022–2023' };
  function label(f, id) { var o = F[f].opts.filter(function (x) { return x[0] === id; })[0]; return o ? o[1] : ''; }
  function photo(id, by) { var p = O.byId(id); return { src: p.src, ratio: p.ratio, caption: p.pending ? '' : p.caption, by: by || p.by }; }

  var seq = 0;
  function I(o) { o.id = o.id || 'it' + (++seq); o.status = o.status || 'live'; o.photos = o.photos || []; o.workplace = o.workplace || null; return o; }
  function P(id, by, period, relation, year, o) { o = o || {}; o.photos = [photo(id, by)]; o.by = by; o.period = period; o.relation = relation; o.year = year; return I(o); }
  function W(by, period, relation, year, text, o) { o = o || {}; o.by = by; o.period = period; o.relation = relation; o.year = year; o.text = text; return I(o); }
  function C(period, title, text) { return I({ chapter: true, own: true, period: period, relation: null, title: title, text: text }); }

  var table = [
    C('childhood', 'ילדות', 'גדל בבית עם חצר גדולה ושולחן ארוך. תמיד היה מי שהביא את כולם לאותו צחוק.'),
    P('p07', 'המשפחה', 'childhood', 'family', 1998, { own: true }),
    P('p04', 'סבתא רחל', 'childhood', 'family', 2001, { text: 'היה נכנס למטבח, מרים מכסה של סיר, ואומר "זה מריח כמו ילדות".' }),
    W('יואב', 'childhood', 'friends', 2003, 'בכיתה ג׳ הוא חילק את הסנדוויץ׳ שלו לכל השולחן ונשאר רעב. זה היה הוא.'),
    P('p11', 'איתי', 'childhood', 'friends', 2004),
    C('youth', 'נעורים', 'שנים של ים, חברים ושביל קצר יותר מכל מפה.'),
    P('p08', 'איתי', 'youth', 'hobbies', 2007, { pick: true }),
    W('דנה', 'youth', 'hobbies', 2008, 'הוא לימד אותי לחכות לגל הנכון. לא רק בים.'),
    C('army', 'צבא', 'שם למד שלהיות חבר זה לא מה שאומרים, אלא מי שבא כשצריך.'),
    P('p05', 'רועי', 'army', 'friends', 2011, { wide: true }),
    W('רועי', 'army', 'friends', 2012, 'הוא היה זה שתמיד שאל "אתה בסדר?" ושם לב לתשובה.'),
    C('studies', 'לימודים', 'ספרים שלא נפתחו, ושיחות עד הבוקר שדווקא נשארו.'),
    P('p02', 'דנה', 'studies', 'hobbies', 2016, { pick: true }),
    W('מיכל', 'studies', 'friends', 2015, 'הוא ישב איתי לילה שלם לפני בחינה. הוא עבר אותי בציון.'),
    C('work', 'עבודה', 'עבד ברצינות, צחק ברצינות עוד יותר. אנשים הרגישו שהוא רואה אותם.'),
    W('נועה', 'work', 'friends', 2017, 'ביום הראשון שלי הוא הראה לי איפה הקפה הטוב ואיפה לא כדאי לשבת. זה היה כל הכיוון שהייתי צריכה.', { workplace: 'w1' }),
    P('p03', 'יובל', 'work', 'friends', 2018, { workplace: 'w2', text: 'יום שדה של הצוות. הוא קיצר לנו כל שביל.' }),
    W('עמית', 'work', 'friends', 2019, 'לא הכרתי אותו הרבה זמן, אבל מספיק כדי לדעת שהוא היה מהאנשים הנדירים.', { workplace: 'w2' }),
    P('p09', 'מיכל', 'work', 'hobbies', 2020, { workplace: 'w1' }),
    W('גלית', 'work', 'friends', 2021, 'בכל ישיבה הוא היה מוצא את המשפט שמרגיע את החדר.', { workplace: 'w3' }),
    C('recent', 'השנים האחרונות', 'ארוחות שישי, שיחות ארוכות, והקשבה שאי אפשר לשכוח.'),
    P('p10', 'המשפחה', 'recent', 'family', 2022, { own: true }),
    W('סבתא רחל', 'recent', 'family', 2022, 'הנכד שלי. אני עוד שומעת אותו.'),
    P('p06', 'נועה', 'recent', 'hobbies', 2023, { pick: true, wide: true }),
    P('p12', 'דנה', 'recent', 'hobbies', 2023)
  ];
  O.queue.forEach(function (q) {
    table.push(I({ status: 'queue', by: q.name, time: q.time, text: q.text, period: null, relation: null, photos: q.photos.map(function (id) { return photo(id, q.name); }) }));
  });
  function byId(id) { return table.filter(function (e) { return e.id === id; })[0]; }

  /* ---------------- filters ---------------- */
  var sel = { period: {}, workplace: {}, relation: {} }, subs = [];
  function has(f) { return Object.keys(sel[f]).length > 0; }
  function anyFilter() { return ORDER.some(has); }
  function ok(it, skip) {
    if (it.status === 'pending') return true;              // your own item: always where you left it
    if (it.status !== 'live') return false;
    if (it.chapter) return (skip === 'period' || !has('period') || sel.period[it.period]) && !has('workplace') && !has('relation');
    return ORDER.every(function (f) { return f === skip || !has(f) || (it[f] && sel[f][it[f]]); });
  }
  function content() { return table.filter(function (i) { return i.status === 'live' && !i.chapter; }); }
  function count(f, id) { return content().filter(function (i) { return ok(i, f) && i[f] === id; }).length; }
  function active() { var a = []; ORDER.forEach(function (f) { F[f].opts.forEach(function (o) { if (sel[f][o[0]]) a.push({ f: f, id: o[0], label: o[1] }); }); }); return a; }
  function emit() { subs.forEach(function (fn) { fn(); }); }
  function toggle(f, id) { if (sel[f][id]) delete sel[f][id]; else sel[f][id] = 1; emit(); }
  function only(f, id) { sel[f] = {}; if (id) sel[f][id] = 1; emit(); }
  function clearAll() { ORDER.forEach(function (f) { sel[f] = {}; }); emit(); }

  /* ---------------- pieces ---------------- */
  function anno(it) {
    if (it.own) return '<span class="src">' + ic('leaf') + (it.chapter || !it.photos.length ? 'נכתב ע״י המשפחה' : 'תמונה מהמשפחה') + '</span>';
    if (it.pick) return '<span class="src">' + ic('leaf') + 'נבחר ע״י המשפחה</span>';
    return '';
  }
  function who(it) { return it.mine ? 'אתם' : it.by; }
  function credit(it) {
    var when = it.status === 'pending' ? 'עכשיו' : (it.year ? '<bdi>' + it.year + '</bdi>' : esc(it.time || ''));
    return '<span class="credit">' + (it.own ? 'מהמשפחה' : 'מאת <b dir="auto">' + esc(who(it)) + '</b>') + ' · ' + when + '</span>' + anno(it);
  }
  function fig(p, it, k) {
    var alt = (p.caption || 'תמונה של אופיר') + ', מאת ' + p.by + ', תמונה לדוגמה';
    return '<figure class="print"><button type="button" class="open-photo" data-item="' + it.id + '" data-k="' + k + '" aria-label="לפתוח את התמונה במסך מלא"><img src="' + p.src + '" alt="' + esc(alt) + '" width="600" height="' + Math.round(600 / p.ratio) + '" loading="lazy" decoding="async"></button>' +
      (p.caption ? '<figcaption dir="auto">' + esc(p.caption) + '</figcaption>' : '') + '</figure>';
  }
  var WAIT = 'ממתין לאישור המשפחה · רק את/ה רואה';
  function entry(it, i) {
    var side = i % 2 ? 'b' : 'a', pend = it.status === 'pending';
    if (it.chapter) {
      return '<article class="entry chapter" data-id="' + it.id + '"><h3>' + esc(it.title) + ' <bdi class="yrs">' + YEARS[it.period] + '</bdi></h3><p dir="auto">' + esc(it.text) + '</p>' + anno(it) + '</article>';
    }
    var wait = pend ? '<p class="waitnote">' + ic('clock') + WAIT + '</p>' : '';
    if (it.photos.length) {
      var n = it.photos.length, cls = 'entry prints ' + side + (it.text ? ' has-text' : '') + (it.wide && n === 1 ? ' wide' : '') + (n === 1 && !it.wide && it.photos[0].ratio < 1 ? ' tall' : '') + (n > 1 ? ' group' : '') + (pend ? ' pending' : '');
      var words = it.text ? '<blockquote class="quote" dir="auto">' + esc(it.text) + '</blockquote>' : '';
      return '<article class="' + cls + '" data-id="' + it.id + '"><div class="inner"><div class="figs">' + it.photos.map(function (p, k) { return fig(p, it, k); }).join('') + '</div><div class="meta">' + words + '<p class="by">' + credit(it) + '</p>' + wait + '</div></div></article>';
    }
    return '<article class="entry words ' + side + (pend ? ' pending' : '') + '" data-id="' + it.id + '"><blockquote class="quote" dir="auto">' + esc(it.text) + '</blockquote><p class="by">' + credit(it) + '</p>' + wait + '</article>';
  }

  /* ---------------- site ---------------- */
  var cfg = {}, cOpen = false, cAfter = null, files = [], lastName = '', firstRender = true;
  var composer;

  function slot(after) {
    return '<div class="slotwrap" data-after="' + after + '"><button type="button" class="slot"><span class="plus">' + ic('plus') + '</span><strong>להוסיף כאן תמונה או מילה</strong><small>המשפחה עוברת על כל דבר לפני שהוא מופיע</small></button></div>';
  }
  function renderTable() {
    var el = qs('#table'), vis = table.filter(function (i) { return ok(i); }), html = '', liveN = 0, i = 0;
    var n = vis.filter(function (x) { return !x.chapter && x.status === 'live'; }).length;
    if (composer.parentNode) composer.parentNode.removeChild(composer);
    if (!n && anyFilter()) {
      el.innerHTML = '<div class="empty"><strong>אין כאן עדיין זיכרונות בשילוב הזה.</strong><p>אפשר להסיר מסנן, או להיות הראשונים להוסיף.</p><div class="row"><button type="button" class="pill" data-clear>להציג את כל השולחן</button></div></div>';
    } else {
      vis.forEach(function (it, k) {
        html += entry(it, i++);
        if (!it.chapter && it.status === 'live') liveN++;
        var next = vis[k + 1];
        if (!anyFilter() && liveN && liveN % 6 === 0 && it.status === 'live' && !(next && next.status === 'pending')) { html += slot(it.id); liveN = 0.5; }
      });
      if (!anyFilter()) html += slot(vis.length ? vis[vis.length - 1].id : '');
      el.innerHTML = html;
    }
    var wraps = qsa('.slotwrap', el);
    if (cOpen) {
      var w = wraps.filter(function (x) { return x.dataset.after === cAfter; })[0] || wraps[wraps.length - 1];
      if (w) { cAfter = w.dataset.after; w.classList.add('open'); w.appendChild(composer); composer.hidden = false; }
    } else composer.hidden = true;
    if (!firstRender) { el.classList.remove('settle'); void el.offsetWidth; el.classList.add('settle'); }
    firstRender = false;
  }
  function renderBar() {
    ORDER.forEach(function (f) {
      var g = qs('.fgroup[data-f="' + f + '"]'); if (!g) return;
      var k = Object.keys(sel[f]).length;
      qs('.fbtn', g).classList.toggle('on', !!k);
      F[f].opts.forEach(function (o) {
        var c = qs('[data-id="' + o[0] + '"]', g), n = count(f, o[0]);
        c.setAttribute('aria-pressed', !!sel[f][o[0]]); c.classList.toggle('zero', !n);
      });
    });
    qsa('.door').forEach(function (d) {
      d.setAttribute('aria-pressed', !!sel.relation[d.dataset.rel]);
    });
    var a = active(), row2 = qs('#factive');
    if (row2) row2.innerHTML = a.length
      ? a.map(function (x) { return '<button type="button" class="chip x" data-f="' + x.f + '" data-id="' + x.id + '" aria-label="להסיר את הסינון ' + x.label + '">' + x.label + ic('x') + '</button>'; }).join('') + '<button type="button" class="textbtn" data-clear>ניקוי</button>'
      : '<span class="fhint">' + (cfg.hint || 'כל השולחן. אפשר לצמצם לפי תקופה, מקום עבודה וקרבה.') + '</span>';
  }

  var open = null;
  function buildBar() {
    var r = qs('#fbtns'); if (!r) return;
    r.innerHTML = ORDER.map(function (f) {
      return '<div class="fgroup" data-f="' + f + '"><button type="button" class="fbtn" aria-expanded="false" aria-controls="sh-' + f + '"><span>' + F[f].label + '</span>' + ic('chev') + '</button>' +
        '<div class="sheet" id="sh-' + f + '" role="group" aria-label="' + F[f].label + '" hidden><span class="grab"></span><h2>' + F[f].label + '</h2><p class="sub">' + (F[f].note ? F[f].note + ' ' : '') + 'אפשר לבחור כמה.</p><div class="opts">' +
        F[f].opts.map(function (o) { return '<button type="button" class="chip" data-id="' + o[0] + '" aria-pressed="false">' + o[1] + '</button>'; }).join('') +
        '</div><div class="foot"><button type="button" class="textbtn" data-fclear>ניקוי</button><button type="button" class="pill" data-done>הצגה</button></div></div></div>';
    }).join('');
    function setOpen(f) {
      open = f;
      qsa('.fgroup').forEach(function (g) { var on = g.dataset.f === f; qs('.fbtn', g).setAttribute('aria-expanded', on); qs('.sheet', g).hidden = !on; });
      qs('#scrim').hidden = !f;
      if (f) setTimeout(function () { qs('#sh-' + f + ' .chip').focus({ preventScroll: true }); }, 0);
    }
    r.addEventListener('click', function (e) {
      var g = e.target.closest('.fgroup'); if (!g) return; var f = g.dataset.f;
      if (e.target.closest('.fbtn')) return setOpen(open === f ? null : f);
      var c = e.target.closest('.chip'); if (c) return toggle(f, c.dataset.id);
      if (e.target.closest('[data-fclear]')) return only(f, null);
      if (e.target.closest('[data-done]')) { setOpen(null); qs('.fbtn', g).focus(); }
    });
    qs('#scrim').addEventListener('click', function () { setOpen(null); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) { var f = open; setOpen(null); qs('.fgroup[data-f="' + f + '"] .fbtn').focus(); } });
    var d = qs('#doors');
    if (d) {
      d.innerHTML = F.relation.opts.map(function (o) {
        return '<button type="button" class="door" data-rel="' + o[0] + '" aria-pressed="false"><img src="' + O.byId(cfg.doors[o[0]]).src + '" alt="" loading="lazy"><span class="door-t">' + o[1] + '</span></button>';
      }).join('');
      d.addEventListener('click', function (e) {
        var b = e.target.closest('.door'); if (!b) return;
        var on = b.getAttribute('aria-pressed') === 'true';
        only('relation', on ? null : b.dataset.rel);
        if (!on) qs('#fbar').scrollIntoView({ block: 'start' });
      });
    }
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-clear]')) { clearAll(); return; }
    var x = e.target.closest('#factive .chip'); if (x) toggle(x.dataset.f, x.dataset.id);
  });

  /* ---------------- composer ---------------- */
  function buildComposer() {
    composer = document.createElement('div');
    composer.className = 'composer'; composer.hidden = true;
    composer.innerHTML =
      '<form id="cform" novalidate><h2>להוסיף לשולחן</h2>' +
      '<div class="c-prev" id="prev"></div>' +
      '<label class="pickbtn" for="pick"><span class="plus">' + ic('plus') + '</span><span id="pickLbl">לבחור תמונות מהטלפון</span></label>' +
      '<input class="vh" type="file" id="pick" accept="image/*" multiple>' +
      '<div class="field"><label for="nm">השם שלכם</label><input id="nm" type="text" autocomplete="name" dir="auto" aria-describedby="nmErr"><p class="err" id="nmErr" role="alert" hidden>נשמח לדעת מי שלח/ה. מה השם שלכם?</p></div>' +
      '<div class="field"><label for="tx">כמה מילים <small>(לא חובה)</small></label><textarea id="tx" dir="auto" rows="4" placeholder="כתבו מילה לאופיר…"></textarea></div>' +
      '<p class="err" id="emptyErr" role="alert" hidden>אפשר לשלוח תמונה, מילים, או את שתיהן.</p>' +
      '<p class="waitnote">' + ic('clock') + 'המשפחה עוברת על כל דבר לפני שהוא מופיע באתר. עד אז רק את/ה רואה אותו כאן.</p>' +
      '<div class="c-actions"><button type="submit" class="pill">לשלוח למשפחה</button><button type="button" class="textbtn" id="cancel">לא עכשיו</button></div></form>' +
      '<div class="thanks" id="thanks" hidden><h2>קיבלנו. תודה ששיתפתם.</h2><p>מה ששלחתם מונח על השולחן ומחכה למשפחה. רק את/ה רואה אותו עכשיו.</p><div class="row"><button type="button" class="pill" id="more">לשתף עוד</button><button type="button" class="textbtn" id="done">לחזור לשולחן</button></div></div>';
    var pick = qs('#pick', composer), prev = qs('#prev', composer), nm = qs('#nm', composer), tx = qs('#tx', composer);
    function drawPrev() {
      prev.innerHTML = '';
      files.forEach(function (f, i) {
        var d = document.createElement('div'); d.className = 'pv';
        var img = document.createElement('img'); img.alt = 'תמונה שבחרתם'; img.src = f.url; d.appendChild(img);
        d.insertAdjacentHTML('beforeend', '<button type="button" class="rm">להסיר</button>'); img.onload = function () { f.ratio = img.naturalWidth / img.naturalHeight || 1.33; };
        qs('.rm', d).addEventListener('click', function () { files.splice(i, 1); drawPrev(); });
        prev.appendChild(d);
      });
      composer.classList.toggle('has-files', files.length > 0);
      qs('#pickLbl', composer).textContent = files.length ? 'עוד תמונות' : 'לבחור תמונות מהטלפון';
    }
    function nameErr(on) { qs('#nmErr', composer).hidden = !on; if (on) nm.setAttribute('aria-invalid', 'true'); else nm.removeAttribute('aria-invalid'); }
    pick.addEventListener('change', function () { Array.prototype.forEach.call(pick.files, function (f) { files.push({ url: URL.createObjectURL(f), ratio: 1.33 }); }); pick.value = ''; drawPrev(); qs('#emptyErr', composer).hidden = true; });
    nm.addEventListener('input', function () { if (nm.value.trim()) nameErr(false); });
    qs('#cform', composer).addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = nm.value.trim(), text = tx.value.trim();
      if (!name) { nameErr(true); nm.focus(); return; }
      if (!files.length && !text) { qs('#emptyErr', composer).hidden = false; return; }
      lastName = name;
      var it = I({ status: 'pending', mine: true, by: name, text: text, photos: files.map(function (f) { return { src: f.url, ratio: f.ratio, caption: '', by: name }; }) });
      var idx = table.indexOf(byId(cAfter)); idx = idx < 0 ? table.length - 1 : idx;
      while (table[idx + 1] && table[idx + 1].status === 'pending') idx++;
      table.splice(idx + 1, 0, it);
      files = []; drawPrev(); tx.value = '';
      qs('#cform', composer).hidden = true; qs('#thanks', composer).hidden = false;
      renderTable(); renderAdmin();
      var node = qs('[data-id="' + it.id + '"]'); if (node) node.scrollIntoView({ block: 'center' });
      qs('#more', composer).focus({ preventScroll: true });
    });
    function reset() { files = []; drawPrev(); tx.value = ''; qs('#cform', composer).hidden = false; qs('#thanks', composer).hidden = true; nameErr(false); qs('#emptyErr', composer).hidden = true; }
    qs('#more', composer).addEventListener('click', function () { reset(); pick.click(); });
    qs('#done', composer).addEventListener('click', closeComposer);
    qs('#cancel', composer).addEventListener('click', closeComposer);
    composer.openFresh = function () { if (!qs('#thanks', composer).hidden) reset(); if (!nm.value && lastName) nm.value = lastName; };
  }
  function openComposer(after) {
    if (anyFilter()) { ORDER.forEach(function (f) { sel[f] = {}; }); renderBar(); }
    composer.openFresh(); cOpen = true; cAfter = after; renderTable();
    var w = qs('.slotwrap.open'); if (w) w.scrollIntoView({ block: 'start' });
    var p = qs('.pickbtn', composer); if (p) p.focus({ preventScroll: true });
  }
  function closeComposer() { cOpen = false; renderTable(); }
  function nearestSlot() { var ws = qsa('.slotwrap'), t = ws.filter(function (w) { return w.getBoundingClientRect().top > 100; })[0] || ws[ws.length - 1]; return t ? t.dataset.after : null; }

  /* ---------------- viewer ---------------- */
  var vList = [], vAt = 0;
  function buildViewer() {
    var v = document.createElement('div');
    v.className = 'viewer'; v.id = 'viewer'; v.hidden = true; v.setAttribute('role', 'dialog'); v.setAttribute('aria-modal', 'true'); v.setAttribute('aria-label', 'תמונה במסך מלא');
    v.innerHTML = '<button type="button" class="v-close" aria-label="לסגור">' + ic('x') + '</button><figure><figcaption></figcaption></figure>' +
      '<div class="v-nav"><button type="button" class="v-prev" aria-label="התמונה הקודמת">' + ic('prev') + '</button><span class="v-pos"></span><button type="button" class="v-next" aria-label="התמונה הבאה">' + ic('next') + '</button></div>';
    document.body.appendChild(v);
    function show() {
      var x = vList[vAt], im = qs('img', v) || qs('figure', v).insertBefore(document.createElement('img'), qs('figcaption', v)); im.src = x.p.src; im.alt = (x.p.caption || 'תמונה של אופיר') + ', תמונה לדוגמה';
      qs('figcaption', v).innerHTML = (x.p.caption ? '<span dir="auto">' + esc(x.p.caption) + '</span>' : '') + '<span class="credit">' + (x.it.own ? 'מהמשפחה' : 'מאת <b dir="auto">' + esc(who(x.it)) + '</b>') + (x.it.year ? ' · <bdi>' + x.it.year + '</bdi>' : '') + '</span>';
      qs('.v-pos', v).textContent = (vAt + 1) + ' / ' + vList.length;
    }
    var last;
    v.openAt = function (itemId, k) {
      vList = []; table.filter(function (i) { return ok(i); }).forEach(function (it) { it.photos.forEach(function (p) { vList.push({ p: p, it: it }); }); });
      vAt = Math.max(0, vList.findIndex(function (x) { return x.it.id === itemId && x.it.photos.indexOf(x.p) === +k; }));
      last = document.activeElement; v.hidden = false; document.documentElement.classList.add('locked'); show(); qs('.v-close', v).focus();
    };
    function close() { v.hidden = true; document.documentElement.classList.remove('locked'); if (last) last.focus({ preventScroll: true }); }
    function step(d) { vAt = (vAt + d + vList.length) % vList.length; show(); }
    qs('.v-close', v).onclick = close; qs('.v-prev', v).onclick = function () { step(-1); }; qs('.v-next', v).onclick = function () { step(1); };
    document.addEventListener('keydown', function (e) {
      if (v.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(1);   // RTL: left is forward
      if (e.key === 'ArrowRight') step(-1);
      if (e.key === 'Tab') { var b = qsa('button', v), i = b.indexOf(document.activeElement); if (e.shiftKey && i <= 0) { b[b.length - 1].focus(); e.preventDefault(); } else if (!e.shiftKey && i === b.length - 1) { b[0].focus(); e.preventDefault(); } }
    });
    var sx = null;
    v.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    v.addEventListener('touchend', function (e) { if (sx == null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) step(dx > 0 ? 1 : -1); sx = null; });
    return v;
  }

  /* ---------------- admin ---------------- */
  var tab = 'queue', tagDraft = {};
  var tt = null, undoFn = null;
  function toast(m, undo) {
    qs('#toastMsg').textContent = m; undoFn = undo; qs('#toast').hidden = false;
    clearTimeout(tt); tt = setTimeout(function () { qs('#toast').hidden = true; undoFn = null; }, 5000);
  }
  function act(msg, fn, focusSel) {
    var snap = table.map(function (e) { return Object.assign({}, e); });
    fn(); renderTable(); renderBar(); renderAdmin();
    if (focusSel) { var b = qs(focusSel); if (b && !b.disabled) b.focus({ preventScroll: true }); }
    toast(msg, function () { table = snap; renderTable(); renderBar(); renderAdmin(); });
  }
  function what(e) {
    if (e.chapter) return 'פסקה של המשפחה: ' + e.title;
    if (!e.photos.length) return 'מילים של ' + who(e);
    return (e.photos.length > 1 ? e.photos.length + ' תמונות של ' : 'תמונה של ') + who(e);
  }
  function thumb(e) { return e.photos.length ? '<img class="thumb" src="' + e.photos[0].src + '" alt="">' : '<span class="thumb words-thumb" aria-hidden="true">״</span>'; }
  function renderAdmin() {
    var box = qs('#adminBody'); if (!box) return;
    var q = table.filter(function (e) { return e.status === 'queue' || e.status === 'pending'; });
    var live = table.filter(function (e) { return e.status === 'live'; });
    var hidden = table.filter(function (e) { return e.status === 'hidden'; });
    qsa('.atab').forEach(function (b) {
      b.setAttribute('aria-selected', b.dataset.tab === tab);
      var n = { queue: q.length, live: live.length, hidden: hidden.length }[b.dataset.tab];
      qs('.atab-n', b).textContent = n;
    });
    if (tab === 'queue') {
      if (!q.length) { box.innerHTML = '<div class="empty"><strong>אין זיכרונות שממתינים. הכול באתר.</strong></div>'; return; }
      var e = q[0], d = tagDraft[e.id] || (tagDraft[e.id] = { period: e.period, workplace: e.workplace, relation: e.relation });
      box.innerHTML = '<p class="a-sub">' + (q.length === 1 ? 'נשאר אחד.' : 'נשארו ' + q.length + '. אחד בכל פעם.') + '</p>' +
        '<article class="qcard">' + (e.photos.length ? '<div class="q-figs">' + e.photos.map(function (p) { return '<img src="' + p.src + '" alt="תמונה שנשלחה, תמונה לדוגמה">'; }).join('') + '</div>' : '') +
        (e.text ? '<p class="q-words" dir="auto">' + esc(e.text) + '</p>' : '') +
        '<p class="q-who">מאת <b dir="auto">' + esc(who(e)) + '</b> · ' + esc(e.time || 'עכשיו') + '</p>' +
        '<div class="q-tags"><p class="q-tags-h">איפה זה יופיע בסינון <small>(לא חובה)</small></p>' + ORDER.map(function (f) {
          return '<div class="q-tag" role="group" aria-label="' + F[f].label + '"><span>' + F[f].label + '</span><div class="opts">' + F[f].opts.map(function (o) { return '<button type="button" class="chip sm" data-tf="' + f + '" data-tid="' + o[0] + '" aria-pressed="' + (d[f] === o[0]) + '">' + o[1] + '</button>'; }).join('') + '</div></div>';
        }).join('') + '</div>' +
        '<div class="q-acts"><button type="button" class="big yes" data-q="yes">להציג באתר</button><button type="button" class="big no" data-q="no">לא להציג</button></div></article>';
      return;
    }
    var list = tab === 'live' ? live : hidden;
    if (!list.length) { box.innerHTML = '<div class="empty"><strong>' + (tab === 'hidden' ? 'אין כאן כלום. מה שלא מוצג נשמר כאן ואפשר להחזיר.' : 'עוד אין כלום באתר.') + '</strong></div>'; return; }
    box.innerHTML = (tab === 'live' ? '<p class="a-sub">הסדר כאן הוא הסדר באתר. להבליט פירושו תמונה ברוחב מלא.</p>' : '<p class="a-sub">מה שלא הוצג נשמר כאן. אפשר להחזיר בכל רגע.</p>') +
      '<ol class="arows">' + list.map(function (x, i) {
        var tags = ORDER.filter(function (f) { return x[f]; }).map(function (f) { return label(f, x[f]); }).join(' · ');
        var btns = tab === 'live'
          ? '<button type="button" class="sm" data-a="up" data-id="' + x.id + '"' + (i === 0 ? ' disabled' : '') + '>' + ic('up') + 'להקדים</button>' +
            '<button type="button" class="sm" data-a="down" data-id="' + x.id + '"' + (i === list.length - 1 ? ' disabled' : '') + '>' + ic('down') + 'לאחר</button>' +
            (x.photos.length === 1 ? '<button type="button" class="sm" data-a="wide" data-id="' + x.id + '" aria-pressed="' + !!x.wide + '">' + ic('wide') + (x.wide ? 'מובלט' : 'להבליט') + '</button>' : '') +
            (x.chapter ? '' : '<button type="button" class="sm" data-a="hide" data-id="' + x.id + '">' + ic('hide') + 'להסתיר</button>')
          : '<button type="button" class="sm" data-a="restore" data-id="' + x.id + '">' + ic('eye') + 'להחזיר לאתר</button>';
        return '<li class="arow">' + thumb(x) + '<div class="a-what"><p class="a-lbl" dir="auto">' + esc(what(x)) + '</p>' + (x.text && !x.chapter ? '<p class="a-snip" dir="auto">' + esc(x.text) + '</p>' : '') + (tags ? '<p class="a-tags">' + tags + '</p>' : '') + '</div><div class="a-btns">' + btns + '</div></li>';
      }).join('') + '</ol>';
  }
  function buildAdmin() {
    var a = qs('#admin'); if (!a) return;
    a.innerHTML = '<div class="wrap"><h1>ניהול</h1><p class="a-lead">כאן רק מחליטים. כל החלטה אפשר לבטל תוך כמה שניות.</p>' +
      '<div class="atabs" role="tablist" aria-label="ניהול">' + [['queue', 'ממתינים'], ['live', 'באתר'], ['hidden', 'מוסתרים']].map(function (t) { return '<button type="button" role="tab" class="atab" data-tab="' + t[0] + '" aria-selected="false">' + t[1] + ' <span class="atab-n"></span></button>'; }).join('') + '</div>' +
      '<div id="adminBody" role="tabpanel"></div></div>';
    a.addEventListener('click', function (ev) {
      var t = ev.target.closest('.atab'); if (t) { tab = t.dataset.tab; renderAdmin(); return; }
      var tg = ev.target.closest('[data-tf]');
      if (tg) { var e0 = table.filter(function (e) { return e.status === 'queue' || e.status === 'pending'; })[0], d = tagDraft[e0.id]; d[tg.dataset.tf] = d[tg.dataset.tf] === tg.dataset.tid ? null : tg.dataset.tid; renderAdmin(); qs('[data-tf="' + tg.dataset.tf + '"][data-tid="' + tg.dataset.tid + '"]').focus(); return; }
      var q = ev.target.closest('[data-q]');
      if (q) {
        var e = table.filter(function (x) { return x.status === 'queue' || x.status === 'pending'; })[0], id = e.id;
        if (q.dataset.q === 'yes') act('הוצג באתר', function () {
          var x = byId(id), dd = tagDraft[id] || {};
          x.period = dd.period; x.workplace = dd.workplace; x.relation = dd.relation; x.status = 'live'; x.mine = false; x.time = null;
          // place it in its period, after the last item of that period
          table.splice(table.indexOf(x), 1);
          var at = -1; table.forEach(function (y, k) { if (y.status === 'live' && y.period === x.period) at = k; });
          table.splice(at < 0 ? table.length : at + 1, 0, x);
        }, '[data-q="yes"]');
        else act('לא יוצג באתר. אפשר להחזיר מ״מוסתרים״.', function () { byId(id).status = 'hidden'; }, '[data-q="yes"]');
        return;
      }
      var b = ev.target.closest('[data-a]'); if (!b || b.disabled) return;
      var x = byId(b.dataset.id), a2 = b.dataset.a, sel2 = '[data-a="' + a2 + '"][data-id="' + x.id + '"]';
      if (a2 === 'wide') return act(x.wide ? 'חזר לגודל רגיל' : 'התמונה תוצג ברוחב מלא', function () { x.wide = !x.wide; }, sel2);
      if (a2 === 'hide') return act('הוסתר מהאתר', function () { x.status = 'hidden'; });
      if (a2 === 'restore') return act('הוחזר לאתר', function () { x.status = 'live'; });
      act(a2 === 'up' ? 'הוקדם' : 'אוחר', function () {
        var li = table.map(function (e, k) { return e.status === 'live' ? k : -1; }).filter(function (k) { return k >= 0; });
        var cur = table.indexOf(x), pos = li.indexOf(cur), tgt = li[pos + (a2 === 'up' ? -1 : 1)];
        if (tgt == null) return; var t2 = table[cur]; table[cur] = table[tgt]; table[tgt] = t2;
      }, sel2);
    });
  }

  /* ---------------- mockup strip: modes + design-note toggle ---------------- */
  function buildStrip() {
    var s = qs('.proof'); if (!s) return;
    s.innerHTML = '<span class="proof-t">' + esc(cfg.name) + ' · כל התוכן לדוגמה</span>' +
      '<div class="modes" role="group" aria-label="תצוגת עיצוב">' + [['site', 'האתר'], ['share', 'לשתף'], ['admin', 'ניהול']].map(function (m) { return '<button type="button" data-mode="' + m[0] + '" aria-pressed="' + (m[0] === 'site') + '">' + m[1] + '</button>'; }).join('') + '</div>' +
      '<label class="anno-toggle"><input type="checkbox" checked> הערות עיצוב</label><a href="index.html">כל ההצעות</a>';
    qs('input', s).addEventListener('change', function () { document.documentElement.classList.toggle('hide-anno', !this.checked); });
    qsa('[data-mode]', s).forEach(function (b) { b.addEventListener('click', function () { setMode(b.dataset.mode); }); });
  }
  function setMode(m) {
    qsa('.proof [data-mode]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.mode === m); });
    var admin = m === 'admin';
    qs('#site').hidden = admin; qs('#admin').hidden = !admin; document.body.dataset.view = admin ? 'admin' : 'site';
    window.scrollTo(0, 0);
    if (admin) { renderAdmin(); return; }
    if (m === 'share') openComposer(qsa('.slotwrap')[0] ? qsa('.slotwrap')[0].dataset.after : null);
    else if (cOpen) closeComposer();
  }

  /* ---------------- boot ---------------- */
  window.LongTable = {
    boot: function (c) {
      cfg = c || {};
      qsa('[data-photo]').forEach(function (el) {   // stand-in photographs in the page shell
        var p = O.byId(el.dataset.photo), im = document.createElement('img');
        im.src = p.src; im.alt = el.dataset.alt || ''; im.width = 600; im.height = Math.round(600 / p.ratio); im.className = el.className;
        el.replaceWith(im);
      });
      document.body.insertAdjacentHTML('beforeend', '<div class="scrim" id="scrim" hidden></div><div class="toast" id="toast" role="status" aria-live="polite" hidden><span id="toastMsg"></span><button type="button" id="toastUndo">ביטול</button></div>');
      qs('#toastUndo').addEventListener('click', function () { if (undoFn) undoFn(); clearTimeout(tt); qs('#toast').hidden = true; undoFn = null; });
      buildStrip(); buildComposer(); buildBar(); buildAdmin(); var v = buildViewer();
      qs('#table').addEventListener('click', function (e) {
        var s = e.target.closest('.slot'); if (s) return openComposer(s.parentNode.dataset.after);
        var p = e.target.closest('.open-photo'); if (p) v.openAt(p.dataset.item, p.dataset.k);
      });
      qsa('[data-share]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); openComposer(nearestSlot()); }); });
      subs.push(function () { renderBar(); renderTable(); });
      renderBar(); renderTable(); renderAdmin();
    },
    photo: function (id) { return O.byId(id).src; },
    icon: ic
  };
})();
