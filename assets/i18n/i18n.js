
(function(){
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'site_lang';
  const htmlEl = document.documentElement;
  const bodyEl = document.body;
  const toggleBtn = document.getElementById('langToggle');

  function setDir(lang){
    if(lang === 'ar'){ htmlEl.lang='ar'; htmlEl.dir='rtl'; bodyEl.classList.add('rtl'); }
    else { htmlEl.lang='en'; htmlEl.dir='ltr'; bodyEl.classList.remove('rtl'); }
  }

  async function loadLang(lang){
    try{
      const res = await fetch(`assets/i18n/${lang}.json`, {cache:'no-store'});
      const dict = await res.json();
      document.querySelectorAll('[data-i18n]').forEach(el=>{
        const key = el.getAttribute('data-i18n');
        const val = key.split('.').reduce((o,k)=>(o||{})[k], dict);
        if(typeof val === 'string'){ el.textContent = val; }
      });
      setDir(lang);
    }catch(e){ console.error('i18n load error', e); }
  }

  function getLang(){ return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; }
  function setLang(lang){ localStorage.setItem(STORAGE_KEY, lang); loadLang(lang); }

  loadLang(getLang());
  if(toggleBtn){
    toggleBtn.addEventListener('click', ()=>{
      const next = (getLang()==='en') ? 'ar' : 'en';
      setLang(next);
    });
  }
})();