
(function(){
const DEFAULT='en';const KEY='site_lang';const toggle=document.getElementById('langToggle');
async function load(l){
  try{
    const r=await fetch('assets/i18n/'+l+'.json');const j=await r.json();
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const k=el.getAttribute('data-i18n'); const v=k.split('.').reduce((o,i)=>(o||{})[i],j);
      if(typeof v==='string') el.textContent=v;
    });
    document.documentElement.lang=(l==='ar'?'ar':'en'); document.documentElement.dir=(l==='ar'?'rtl':'ltr');
  }catch(e){console.error(e)}
}
function get(){return localStorage.getItem(KEY)||DEFAULT}
function set(l){localStorage.setItem(KEY,l);load(l)}
load(get()); if(toggle) toggle.addEventListener('click',()=>set(get()==='en'?'ar':'en'));
})();
