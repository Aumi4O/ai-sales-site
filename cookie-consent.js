(function(){
  const KEY = "cookieConsent.v1";
  function save(state){ try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){} }
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)||"{}"); }catch(e){ return {}; } }
  function style(){
    const css = `#cc-banner{position:fixed;inset:auto 0 0 0;z-index:9999;background:#111;color:#fff;padding:14px}#cc-banner .cc-wrap{max-width:1100px;margin:0 auto;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
    #cc-banner p{margin:0;flex:1 1 400px;font-size:14px;color:#eee}
    #cc-banner button{background:#fff;color:#111;border:0;border-radius:10px;padding:10px 14px;font-weight:600;cursor:pointer}
    #cc-banner button.cc-secondary{background:transparent;color:#fff;border:1px solid #fff}
    #cc-modal{position:fixed;inset:0;background:rgba(0,0,0,.6);display:none;z-index:10000}
    #cc-modal .box{background:#fff;color:#0b0b0b;max-width:560px;margin:8vh auto;padding:20px;border-radius:12px}
    #cc-modal h3{margin:0 0 8px}
    #cc-modal label{display:flex;align-items:center;gap:10px;margin:10px 0}
    #cc-modal .row{display:flex;gap:10px;justify-content:flex-end;margin-top:10px}`;
    const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
  }
  function banner(){
    const b = document.createElement('div'); b.id = 'cc-banner';
    b.innerHTML = `<div class="cc-wrap"><p>We use cookies to run our site, improve performance, personalize content, and measure ads. See our <a href="cookie-policy.html" style="color:#9cf">Cookie Policy</a>.</p>
    <div><button id="cc-accept">Accept all</button> <button class="cc-secondary" id="cc-reject">Reject non‑essential</button> <button class="cc-secondary" id="cc-manage">Manage preferences</button></div></div>`;
    document.body.appendChild(b);
    document.getElementById('cc-accept').onclick = ()=>{ save({essential:true,analytics:true,ads:true,ts:Date.now()}); b.remove(); };
    document.getElementById('cc-reject').onclick = ()=>{ save({essential:true,analytics:false,ads:false,ts:Date.now()}); b.remove(); };
    document.getElementById('cc-manage').onclick = ()=>{ modal(true); };
  }
  function modal(open){
    let m = document.getElementById('cc-modal');
    const state = Object.assign({essential:true,analytics:false,ads:false}, load());
    if(!m){
      m = document.createElement('div'); m.id='cc-modal';
      m.innerHTML = `<div class="box"><h3>Cookie Preferences</h3>
      <label><input type="checkbox" checked disabled> Strictly necessary (always on)</label>
      <label><input id="cc-ana" type="checkbox" ${state.analytics?"checked":""}> Performance & Analytics</label>
      <label><input id="cc-ads" type="checkbox" ${state.ads?"checked":""}> Advertising / Retargeting</label>
      <div class="row"><button id="cc-save">Save</button> <button class="cc-secondary" id="cc-close">Cancel</button></div></div>`;
      document.body.appendChild(m);
      document.getElementById('cc-close').onclick = ()=>{ m.style.display='none'; };
      document.getElementById('cc-save').onclick = ()=>{
        const next = { essential:true, analytics: document.getElementById('cc-ana').checked, ads: document.getElementById('cc-ads').checked, ts: Date.now() };
        save(next); m.style.display='none';
      };
    }
    m.style.display = open? 'block':'none';
    window.cookieConsent = { open: ()=>modal(true), state: load() };
  }
  document.addEventListener('DOMContentLoaded', function(){
    style(); const s = load(); if(!('analytics' in s) || !('ads' in s)) banner();
  });
})();

