/* Shared sample content + filter engine for the three "long table with filters" mockups.
   ALL NAMES, TEXTS, YEARS AND WORKPLACES ARE PLACEHOLDERS. Real copy comes from the family.
   own  = supplied by the family   ("מהמשפחה")
   pick = a contributor's item the family chose to feature ("נבחר ע״י המשפחה")
   none = a contributor's item */
(function () {
  var O = window.OFIR;
  var facets = {
    period: { label: 'תקופה', all: 'כל התקופות', opts: [
      { id: 'childhood', label: 'ילדות' }, { id: 'youth', label: 'נעורים' }, { id: 'army', label: 'צבא' },
      { id: 'studies', label: 'לימודים' }, { id: 'work', label: 'עבודה' }, { id: 'recent', label: 'השנים האחרונות' }] },
    workplace: { label: 'מקום עבודה', all: 'כל מקומות העבודה', opts: [
      { id: 'w1', label: 'מקום עבודה א׳' }, { id: 'w2', label: 'מקום עבודה ב׳' }, { id: 'w3', label: 'מקום עבודה ג׳' }] },
    relation: { label: 'קרבה', all: 'כולם', opts: [
      { id: 'family', label: 'משפחה' }, { id: 'friends', label: 'חברים' }, { id: 'hobbies', label: 'תחביבים' }] }
  };
  var years = { childhood: '1998–2004', youth: '2005–2008', army: '2009–2012', studies: '2013–2016', work: '2017–2021', recent: '2022–2023' };

  function P(id, by, period, relation, year, o) { o = o || {}; o.id = 'i-' + id + '-' + year; o.type = 'photo'; o.photo = id; o.by = by; o.period = period; o.relation = relation; o.year = year; return o; }
  function W(by, period, relation, year, text, o) { o = o || {}; o.id = 'w-' + by + '-' + year; o.type = 'words'; o.by = by; o.period = period; o.relation = relation; o.year = year; o.text = text; return o; }
  function C(period, year, title, text) { return { id: 'c-' + period, type: 'chapter', own: 'own', period: period, relation: null, workplace: null, year: year, title: title, text: text }; }

  var items = [
    C('childhood', 1998, 'ילדות', 'גדל בבית עם חצר גדולה ושולחן ארוך. תמיד היה מי שהביא את כולם לאותו צחוק.'),
    P('p07', 'אמא', 'childhood', 'family', 1998, { own: 'own' }),
    P('p04', 'סבתא רחל', 'childhood', 'family', 2001, { text: 'היה נכנס למטבח, מרים מכסה של סיר, ואומר "זה מריח כמו ילדות".' }),
    W('יואב', 'childhood', 'friends', 2003, 'בכיתה ג׳ הוא חילק את הסנדוויץ׳ שלו לכל השולחן ונשאר רעב. זה היה הוא.'),
    P('p11', 'איתי', 'childhood', 'friends', 2004),
    C('youth', 2005, 'נעורים', 'שנים של ים, חברים ושביל קצר יותר מכל מפה.'),
    P('p08', 'איתי', 'youth', 'hobbies', 2007, { pick: true }),
    W('דנה', 'youth', 'hobbies', 2008, 'הוא לימד אותי לחכות לגל הנכון. לא רק בים.'),
    C('army', 2009, 'צבא', 'שם למד שלהיות חבר זה לא מה שאומרים, אלא מי שבא כשצריך.'),
    P('p05', 'רועי', 'army', 'friends', 2011),
    W('רועי', 'army', 'friends', 2012, 'הוא היה זה שתמיד שאל "אתה בסדר?" ושם לב לתשובה.'),
    C('studies', 2013, 'לימודים', 'ספרים שלא נפתחו, ושיחות עד הבוקר שדווקא נשארו.'),
    P('p02', 'דנה', 'studies', 'hobbies', 2016, { pick: true }),
    W('מיכל', 'studies', 'friends', 2015, 'הוא ישב איתי לילה שלם לפני בחינה. הוא עבר אותי בציון.'),
    C('work', 2017, 'עבודה', 'עבד ברצינות, צחק ברצינות עוד יותר. אנשים הרגישו שהוא רואה אותם.'),
    W('נועה', 'work', 'friends', 2017, 'ביום הראשון שלי הוא הראה לי איפה הקפה הטוב ואיפה לא כדאי לשבת. זה היה כל הכיוון שהייתי צריכה.', { workplace: 'w1' }),
    P('p03', 'יובל', 'work', 'friends', 2018, { workplace: 'w2', text: 'יום שדה של הצוות. הוא קיצר לנו כל שביל.' }),
    W('עמית', 'work', 'friends', 2019, 'לא הכרתי אותו הרבה זמן, אבל מספיק כדי לדעת שהוא היה מהאנשים הנדירים.', { workplace: 'w2' }),
    P('p09', 'מיכל', 'work', 'hobbies', 2020, { workplace: 'w1' }),
    W('גלית', 'work', 'friends', 2021, 'בכל ישיבה הוא היה מוצא את המשפט שמרגיע את החדר.', { workplace: 'w3' }),
    C('recent', 2022, 'השנים האחרונות', 'ארוחות שישי, שיחות ארוכות, והקשבה שאי אפשר לשכוח.'),
    P('p10', 'המשפחה', 'recent', 'family', 2022, { own: 'own' }),
    W('סבתא רחל', 'recent', 'family', 2022, 'הנכד שלי. אני עוד שומעת אותו.'),
    P('p06', 'נועה', 'recent', 'hobbies', 2023, { pick: true }),
    P('p12', 'דנה', 'recent', 'hobbies', 2023)
  ];
  items.forEach(function (it) {
    it.workplace = it.workplace || null;
    if (it.type === 'photo') { var p = O.byId(it.photo); it.src = p.src; it.ratio = p.ratio; it.caption = p.caption; if (it.own === 'own') it.by = 'המשפחה'; }
    it.own = it.own || (it.pick ? 'pick' : null);
  });

  var sel = { period: {}, workplace: {}, relation: {} }, subs = [];
  function has(f) { return Object.keys(sel[f]).length > 0; }
  function ok(it, skip) {
    if (it.type === 'chapter') { return (skip === 'period' || !has('period') || sel.period[it.period]) && !has('workplace') && !has('relation'); }
    return Object.keys(facets).every(function (f) { return f === skip || !has(f) || (it[f] && sel[f][it[f]]); });
  }
  var LT = window.LT = {
    facets: facets, years: years, items: items, sel: sel,
    visible: function () { return items.filter(function (i) { return ok(i); }); },
    content: function () { return items.filter(function (i) { return i.type !== 'chapter'; }); },
    visibleContent: function () { return items.filter(function (i) { return i.type !== 'chapter' && ok(i); }); },
    /* faceted count: how many contributions would match if this option were switched on */
    count: function (f, id) { return items.filter(function (i) { return i.type !== 'chapter' && ok(i, f) && i[f] === id; }).length; },
    active: function () { var a = []; Object.keys(facets).forEach(function (f) { facets[f].opts.forEach(function (o) { if (sel[f][o.id]) a.push({ facet: f, id: o.id, label: o.label }); }); }); return a; },
    toggle: function (f, id) { if (sel[f][id]) delete sel[f][id]; else sel[f][id] = 1; emit(); },
    only: function (f, id) { Object.keys(sel[f]).forEach(function (k) { delete sel[f][k]; }); if (id) sel[f][id] = 1; emit(); },
    clear: function () { Object.keys(sel).forEach(function (f) { sel[f] = {}; }); emit(); },
    onChange: function (fn) { subs.push(fn); },
    label: function (f, id) { return facets[f].opts.filter(function (o) { return o.id === id; })[0].label; },
    esc: function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  };
  function emit() { subs.forEach(function (fn) { fn(); }); }

  var ICONS = {
    leaf: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19c3-5 6-8 10-10"/>',
    pick: '<path d="M12 4l2.4 5 5.4.7-4 3.8 1 5.4L12 16.2 7.2 18.9l1-5.4-4-3.8 5.4-.7z"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    chev: '<path d="M6 9l6 6 6-6"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    chat: '<path d="M5 6h14v9H10l-4 3v-3H5z"/>'
  };
  LT.icon = function (n) { return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + ICONS[n] + '</svg>'; };

  /* the provenance marker. Same words and same icon on every variant. */
  LT.src = function (it) {
    var e = LT.esc;
    if (it.own) {
      var t = it.type === 'chapter' || it.type === 'words' ? 'נכתב ע״י המשפחה' : 'תמונה מהמשפחה';
      return '<span class="src own">' + LT.icon('leaf') + t + '</span>';
    }
    if (it.pick) return '<span class="src pick">' + LT.icon('pick') + 'נבחר ע״י המשפחה</span><span class="by">מאת <b>' + e(it.by) + '</b></span>';
    return '<span class="by">מאת <b>' + e(it.by) + '</b></span>';
  };
  LT.tags = function (it) {
    var t = [];
    if (it.period) t.push(['period', it.period]);
    if (it.workplace) t.push(['workplace', it.workplace]);
    if (it.relation) t.push(['relation', it.relation]);
    return t;
  };
  LT.fig = function (it, cls) {
    var e = LT.esc, alt = (it.caption || 'תמונה של אופיר') + ', מאת ' + it.by + ', תמונה לדוגמה';
    return '<figure class="print ' + (cls || '') + '" style="--r:' + it.ratio.toFixed(3) + '"><img src="' + it.src + '" alt="' + e(alt) + '" loading="lazy" width="600" height="' + Math.round(600 / it.ratio) + '"><figcaption>' + (it.caption ? '<span class="cap">' + e(it.caption) + '</span>' : '') + '<span class="cr">' + LT.src(it) + ' · <bdi>' + it.year + '</bdi></span></figcaption></figure>';
  };
  LT.say = function (n, total) {
    if (n === 0) return 'אין כאן עדיין זיכרונות בשילוב הזה';
    return n === total ? 'כל ' + total + ' הזיכרונות' : n + ' מתוך ' + total + ' זיכרונות';
  };
})();

/* the strip toggle and the one-line explanation on every legend */
(function () {
  function init() {
    var p = document.querySelector('.proof');
    if (p) {
      p.insertAdjacentHTML('beforeend', '<label class="anno-toggle"><input type="checkbox" checked> הצגת הערות עיצוב</label>');
      p.querySelector('input').addEventListener('change', function () { document.documentElement.classList.toggle('hide-anno', !this.checked); });
    }
    document.querySelectorAll('.legend').forEach(function (l) { l.insertAdjacentHTML('afterbegin', '<strong class="anno-note">הערות עיצוב להבנת ההצעה בלבד, לא חלק מהאתר:</strong>'); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
