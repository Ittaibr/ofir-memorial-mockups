/* Sample content for the mockups. ALL OF IT IS PLACEHOLDER (names, dates, words).
   Real copy comes from the family. Hebrew, RTL. */
(function () {
  window.OFIR = window.OFIR || {};
  window.OFIR.person = {
    name: 'אופיר',
    dates: '19XX – 20XX',                       // placeholder, render inside <bdi dir="ltr">
    bio: 'אח, חבר, בן אדם שידע להקשיב. מי שהיה איתו בחדר, הרגיש שהוא היחיד שם.',
    count: 86
  };
  window.OFIR.periods = [
    { id: 'all', label: 'הכול' }, { id: 'childhood', label: 'ילדות' },
    { id: 'army', label: 'צבא' }, { id: 'trips', label: 'טיולים' }, { id: 'recent', label: 'השנים האחרונות' }
  ];
  window.OFIR.chapters = [
    { year: 1998, title: 'ילדות', text: 'גדל בבית עם חצר גדולה ושולחן ארוך. תמיד היה מי שמביא את כולם לאותו צחוק.' },
    { year: 2009, title: 'צבא', text: 'שם למד שלהיות חבר זה לא מה שאומרים, אלא מי שבא כשצריך.' },
    { year: 2014, title: 'דרכים', text: 'טיולים, ים, שבילים שאף אחד לא סימן. הוא סימן אותם לכולנו.' },
    { year: 2022, title: 'בית', text: 'ארוחות שישי, שיחות ארוכות, והקשבה שאי אפשר לשכוח.' }
  ];
  // Messages: approved wall. kind 'family' = reply from the family.
  window.OFIR.messages = [
    { id: 'm1', name: 'דנה', time: 'לפני יומיים', text: 'אני זוכרת איך הוא הגיע בלי להודיע, עם עוגה קנויה ובדיחה גרועה, ופתאום היה חג. אני מרגישה את החסר שלו בכל שישי.', photo: 'p02' },
    { id: 'm2', name: 'יובל', time: 'לפני יומיים', text: 'הוא קיצר לנו כל שביל, ואף פעם לא הגענו מוקדם. תמיד הגענו יחד.' },
    { id: 'm3', name: 'המשפחה', family: true, time: 'אתמול', text: 'תודה לכל מי ששלח תמונה ומילה. אנחנו קוראים הכול, שוב ושוב.' },
    { id: 'm4', name: 'סבתא רחל', time: 'אתמול', text: 'הנכד שלי. היה נכנס למטבח, מרים מכסה של סיר, ואומר "זה מריח כמו ילדות". אני עוד שומעת אותו.', photo: 'p04' },
    { id: 'm5', name: 'רועי', time: 'לפני שעה', text: 'בצבא הוא היה זה שתמיד שאל "אתה בסדר?" ושם לב לתשובה. חיים שלמים לקחתי ממנו את זה.' },
    { id: 'm6', name: 'נועה', time: 'לפני שעה', text: 'בתמונה הזאת הוא לא יודע שמצלמים אותו. כך הוא נראה כשהוא מאושר.', photo: 'p06' }
  ];
  // Pending items (admin queue sample). Mix of photo-only, photo+words, words-only.
  window.OFIR.queue = [
    { id: 'q-1', name: 'נועה', time: 'לפני 12 דקות', photos: ['q01'], text: 'היום הזה בחוף. הוא אמר שאנחנו מאחרים, ואז ישב איתנו עד השקיעה.' },
    { id: 'q-2', name: 'רועי', time: 'לפני שעה', photos: ['q02'], text: '' },
    { id: 'q-3', name: 'מיכל', time: 'לפני 3 שעות', photos: ['q03', 'p10'], text: 'ארוחת שישי אחרונה אצלנו. אני שמחה שצילמתי.' },
    { id: 'q-4', name: 'עמית', time: 'אתמול', photos: [], text: 'לא הכרתי אותו הרבה זמן, אבל מספיק כדי לדעת שהוא היה מהאנשים הנדירים שמחזירים לך את האמון בבני אדם.' }
  ];
  window.OFIR.copy = {
    waiting: 'ממתין לאישור המשפחה · רק את/ה רואה',
    thanks: 'קיבלנו. תודה ששיתפתם.',
    send: 'לשלוח למשפחה',
    share: 'לשתף זיכרון',
    leaveWord: 'להשאיר מילה',
    show: 'להציג באתר',
    hide: 'לא להציג'
  };
})();
