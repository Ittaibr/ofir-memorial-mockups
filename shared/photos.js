/* Synthetic stand-in photographs for the mockups. NOT real photos of Ofir.
   Each is an SVG data-URI "scene" with its own aspect ratio, so layouts can be judged
   with natural, uncropped proportions. Replace with real photos in the build.
   Usage: window.OFIR.photos (array), window.OFIR.byId('p03').src */
(function () {
  var PAL = [
    ['#cfd8c4', '#8d9c72', '#56663a', '#f1ead6'], // olive afternoon
    ['#e6d8c0', '#b9a07a', '#7c6a4a', '#f7efdc'], // warm sand
    ['#c9d6dc', '#8fa7b0', '#4f6a74', '#eef1ee'], // sea morning
    ['#e9d3bf', '#c79a74', '#8a5a3a', '#faf0e2'], // evening light
    ['#d6dccb', '#a3b08a', '#66784a', '#f3f1e4'], // spring field
    ['#dcd3c6', '#a89a86', '#6b5f50', '#f4efe6']  // stone
  ];
  function scene(kind, w, h, pi, tag) {
    var p = PAL[pi % PAL.length], W = 600, H = Math.round(600 * h / w), s = [];
    s.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid slice">');
    s.push('<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + p[3] + '"/><stop offset="1" stop-color="' + p[0] + '"/></linearGradient>' +
      '<filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="' + (pi + 3) + '"/><feColorMatrix values="0 0 0 0 .3 0 0 0 0 .3 0 0 0 0 .25 0 0 0 .07 0"/></filter></defs>');
    s.push('<rect width="' + W + '" height="' + H + '" fill="url(#g)"/>');
    var hz = H * 0.58;
    if (kind === 'hills' || kind === 'trail') {
      s.push('<circle cx="' + W * 0.72 + '" cy="' + H * 0.28 + '" r="' + W * 0.06 + '" fill="' + p[3] + '" opacity=".9"/>');
      s.push('<path d="M0 ' + hz + ' Q ' + W * 0.25 + ' ' + (hz - H * 0.16) + ' ' + W * 0.5 + ' ' + (hz - H * 0.04) + ' T ' + W + ' ' + (hz - H * 0.1) + ' V ' + H + ' H0Z" fill="' + p[1] + '"/>');
      s.push('<path d="M0 ' + (hz + H * 0.1) + ' Q ' + W * 0.4 + ' ' + (hz - H * 0.02) + ' ' + W + ' ' + (hz + H * 0.08) + ' V ' + H + ' H0Z" fill="' + p[2] + '"/>');
      if (kind === 'trail') s.push('<path d="M' + W * 0.42 + ' ' + H + ' Q ' + W * 0.5 + ' ' + (hz + H * 0.15) + ' ' + W * 0.56 + ' ' + (hz + H * 0.03) + '" stroke="' + p[3] + '" stroke-width="' + W * 0.03 + '" fill="none" opacity=".7" stroke-linecap="round"/>');
    } else if (kind === 'sea') {
      s.push('<rect y="' + hz + '" width="' + W + '" height="' + (H - hz) + '" fill="' + p[1] + '"/>');
      s.push('<rect y="' + (hz + H * 0.12) + '" width="' + W + '" height="' + (H - hz) + '" fill="' + p[2] + '" opacity=".55"/>');
      s.push('<circle cx="' + W * 0.3 + '" cy="' + H * 0.3 + '" r="' + W * 0.05 + '" fill="' + p[3] + '"/>');
      s.push('<path d="M' + W * 0.2 + ' ' + (hz + 14) + ' h' + W * 0.2 + ' M' + W * 0.5 + ' ' + (hz + 34) + ' h' + W * 0.28 + '" stroke="' + p[3] + '" stroke-width="3" opacity=".6" stroke-linecap="round"/>');
    } else if (kind === 'table') {
      s.push('<rect y="' + H * 0.55 + '" width="' + W + '" height="' + H * 0.45 + '" fill="' + p[2] + '"/>');
      s.push('<rect y="' + H * 0.55 + '" width="' + W + '" height="6" fill="' + p[3] + '" opacity=".5"/>');
      [0.2, 0.45, 0.7].forEach(function (x, i) {
        s.push('<ellipse cx="' + W * x + '" cy="' + H * 0.7 + '" rx="' + W * 0.09 + '" ry="' + H * 0.05 + '" fill="' + p[3] + '"/>');
        s.push('<circle cx="' + W * x + '" cy="' + (H * 0.36 + i * 6) + '" r="' + W * 0.045 + '" fill="' + p[1] + '"/>');
        s.push('<path d="M' + (W * x - W * 0.085) + ' ' + H * 0.58 + ' q ' + W * 0.085 + ' -' + H * 0.2 + ' ' + W * 0.17 + ' 0z" fill="' + p[1] + '"/>');
      });
      s.push('<circle cx="' + W * 0.88 + '" cy="' + H * 0.2 + '" r="' + W * 0.07 + '" fill="' + p[3] + '" opacity=".75"/>');
    } else if (kind === 'group') {
      s.push('<rect y="' + H * 0.7 + '" width="' + W + '" height="' + H * 0.3 + '" fill="' + p[1] + '"/>');
      [0.18, 0.34, 0.5, 0.66, 0.82].forEach(function (x, i) {
        var hh = H * (0.34 + (i % 3) * 0.03), cx = W * x;
        s.push('<circle cx="' + cx + '" cy="' + (H * 0.7 - hh) + '" r="' + W * 0.04 + '" fill="' + p[2 - (i % 2)] + '"/>');
        s.push('<path d="M' + (cx - W * 0.06) + ' ' + H * 0.82 + ' V' + (H * 0.7 - hh * 0.55) + ' q ' + W * 0.06 + ' -' + H * 0.06 + ' ' + W * 0.12 + ' 0 V' + H * 0.82 + 'z" fill="' + p[2 - (i % 2)] + '" opacity=".9"/>');
      });
    } else { // portrait
      s.push('<circle cx="' + W * 0.5 + '" cy="' + H * 0.4 + '" r="' + W * 0.17 + '" fill="' + p[2] + '"/>');
      s.push('<path d="M' + W * 0.14 + ' ' + H + ' Q ' + W * 0.14 + ' ' + H * 0.68 + ' ' + W * 0.5 + ' ' + H * 0.66 + ' Q ' + W * 0.86 + ' ' + H * 0.68 + ' ' + W * 0.86 + ' ' + H + 'z" fill="' + p[2] + '"/>');
      s.push('<circle cx="' + W * 0.5 + '" cy="' + H * 0.4 + '" r="' + W * 0.17 + '" fill="none" stroke="' + p[3] + '" stroke-width="3" opacity=".25"/>');
    }
    s.push('<rect width="' + W + '" height="' + H + '" filter="url(#n)"/>');
    s.push('<text x="' + (W - 14) + '" y="' + (H - 14) + '" text-anchor="end" font-family="sans-serif" font-size="15" fill="#22261f" opacity=".45">תמונה לדוגמה</text>');
    s.push('</svg>');
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s.join(''));
  }
  // id, kind, w, h (aspect), palette, caption, by, period, year
  var RAW = [
    ['p01', 'portrait', 4, 5, 0, 'אופיר', 'המשפחה', 'recent', 2023],
    ['p02', 'sea', 3, 2, 2, 'הים בבוקר, שבת אחת באוגוסט', 'דנה', 'trips', 2016],
    ['p03', 'trail', 4, 3, 4, 'שביל שהוא תמיד ידע איך לקצר', 'יובל', 'trips', 2018],
    ['p04', 'table', 3, 2, 3, 'שולחן ארוך, כולם צוחקים', 'סבתא רחל', 'childhood', 2001],
    ['p05', 'group', 4, 3, 1, 'הפלוגה, יום האחרון', 'רועי', 'army', 2011],
    ['p06', 'hills', 16, 9, 0, 'הנוף שהוא אהב', 'נועה', 'trips', 2019],
    ['p07', 'portrait', 3, 4, 1, 'בן שש, בלי נעליים', 'אמא', 'childhood', 1998],
    ['p08', 'sea', 1, 1, 2, 'אחרי הגלישה', 'איתי', 'trips', 2014],
    ['p09', 'trail', 2, 3, 5, 'בדרך למעלה', 'מיכל', 'trips', 2020],
    ['p10', 'table', 4, 3, 0, 'ארוחת שישי', 'גלית', 'recent', 2022],
    ['p11', 'group', 3, 2, 3, 'החבר׳ה מהשכונה', 'איתי', 'childhood', 2004],
    ['p12', 'hills', 4, 5, 4, 'צעד אחרי צעד', 'דנה', 'recent', 2023],
    ['q01', 'sea', 3, 2, 1, 'ממתין לאישור', 'נועה', 'trips', 2017],
    ['q02', 'portrait', 4, 5, 3, 'ממתין לאישור', 'רועי', 'army', 2010],
    ['q03', 'table', 3, 2, 5, 'ממתין לאישור', 'מיכל', 'recent', 2021]
  ];
  var photos = RAW.map(function (r) {
    return { id: r[0], kind: r[1], w: r[2], h: r[3], ratio: r[2] / r[3], src: scene(r[1], r[2], r[3], r[4]), caption: r[5], by: r[6], period: r[7], year: r[8], pending: r[0][0] === 'q' };
  });
  window.OFIR = window.OFIR || {};
  window.OFIR.photos = photos;
  window.OFIR.approved = photos.filter(function (p) { return !p.pending; });
  window.OFIR.pending = photos.filter(function (p) { return p.pending; });
  window.OFIR.byId = function (id) { return photos.filter(function (p) { return p.id === id; })[0]; };
  window.OFIR.scene = scene; // for building a fresh "just chosen" preview in upload demos
})();
