
(function(){
  const DEFAULT_LANG = 'en'; // default as requested
  const STORAGE_KEY = 'site_lang';
  const htmlEl = document.documentElement;
  const bodyEl = document.body;
  const toggleBtn = document.getElementById('langToggle');

  function setDir(lang){
    if(lang === 'ar'){
      htmlEl.lang = 'ar';
      htmlEl.dir = 'rtl';
      bodyEl.classList.add('rtl');
    } else {
      htmlEl.lang = 'en';
      htmlEl.dir = 'ltr';
      bodyEl.classList.remove('rtl');
    }
  }

  async function loadLang(lang){
    try{
      const res = await fetch(`assets/i18n/${lang}.json`, {cache:'no-store'});
      const dict = await res.json();
      // apply translations
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = key.split('.').reduce((o,k)=> (o||{})[k], dict);
        if(typeof val === 'string'){
          if(el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea'){
            el.setAttribute('placeholder', val);
          }else{
            el.textContent = val;
          }
        }
      });
      setDir(lang);
    }catch(e){
      console.error('i18n load error', e);
    }
  }

  function getLang(){
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }
  function setLang(lang){
    localStorage.setItem(STORAGE_KEY, lang);
    loadLang(lang);
  }

  // init
  const initLang = getLang();
  loadLang(initLang);

  // toggle
  if(toggleBtn){
    toggleBtn.addEventListener('click', function(){
      const current = getLang();
      const next = current === 'en' ? 'ar' : 'en';
      setLang(next);
    });
  }
})();
