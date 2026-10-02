/* ═══════════════════════════════════════════
   noggi — Mixed Media Visions
   Interactions & rendering
═══════════════════════════════════════════ */

/* FIREFOX-FIX: Firefox stellt beim Neuladen die alte Scroll-Position wieder her
   (aggressiver als Chrome). Bei der 500vh-Tunnel-Buehne landet die Seite dann
   mitten/am Ende des Tunnels -> Tunnel "rast von selbst durch". Wir schalten die
   automatische Wiederherstellung ab und erzwingen beim Laden die Position ganz oben. */
if('scrollRestoration' in history){ try{ history.scrollRestoration='manual'; }catch(e){} }
(function(){
  // Nur wenn KEIN echtes Sprungziel in der URL steht (ausser #debug), nach oben.
  const h=location.hash;
  const jump=h && h!=='#debug' && h!=='#home';
  if(!jump){
    window.scrollTo(0,0);
    // Firefox setzt die Position teils erst NACH dem Load-Event -> nachfassen.
    window.addEventListener('load',()=>{ if(!location.hash||location.hash==='#debug') window.scrollTo(0,0); });
    window.addEventListener('pageshow',(e)=>{ if(e.persisted && (!location.hash||location.hash==='#debug')) window.scrollTo(0,0); });
  }
})();

const isTouch = window.matchMedia('(hover:none)').matches || window.innerWidth <= 768;

/* ─── LOGO (inline SVG, theme-aware via fill swap) ─── */
const LOGO_PATHS = '<path d="M726.37,254.68c.35,3.17.58,12.46.38,24.96.38,42.32-30.12,76.42-73.43,76.51-32.06.07-60.29-19.53-70.65-50.19-.61-1.8.72-3.67,2.62-3.72l14.21-.39c1.17-.03,2.26.64,2.7,1.72,6.53,15.83,19.89,27.22,34.69,31.67,18.99,5.72,37.89,1.42,51.93-11.08,11.88-10.58,19.05-25.79,18.98-41.53l-.09-18.75c-16.53,17.39-38.2,25.31-61.32,23.39-28.74-2.39-53.15-20.73-62.67-48.13-8.55-24.61-3.47-51.25,12.94-71.31,15.77-19.28,40.84-29.51,66.7-26.37,28.22,3.42,52.33,21.95,61.21,49.23.58,1.79-.73,3.64-2.61,3.7l-14.14.48c-1.19.04-2.26-.68-2.73-1.78-6.09-14.52-17.16-24.92-32.07-30.3-27.8-10.04-58.34,3.22-69.92,30.03-11.52,26.68-.43,58.59,26.54,71.35,23.56,11.15,51.11,4.3,66.77-16.48l-15.51-16.02c-1.08-1.11-1.06-2.88.03-3.98l9.53-9.51c1.11-1.11,2.92-1.1,4.02.02,15.28,15.14,26.31,26.38,28.45,28.84.33.37,1.45,1.58,2.32,3.51.62,1.37.93,2.73,1.09,4.16Z"/><path d="M549.39,254.67c.35,3.17.58,12.46.38,24.96.38,42.32-30.12,76.42-73.43,76.51-32.06.07-60.29-19.53-70.65-50.19-.61-1.8.72-3.67,2.62-3.72l14.21-.39c1.17-.03,2.26.64,2.7,1.72,6.53,15.83,19.89,27.22,34.69,31.67,18.99,5.72,37.89,1.42,51.93-11.08,11.88-10.58,19.05-25.79,18.98-41.53l-.09-18.75c-16.53,17.4-38.2,25.31-61.32,23.39-28.74-2.39-53.15-20.73-62.67-48.13-8.55-24.61-3.47-51.25,12.94-71.31,15.77-19.28,40.84-29.51,66.7-26.37,28.22,3.42,52.33,21.95,61.21,49.23.58,1.79-.73,3.64-2.61,3.7l-14.14.48c-1.19.04-2.26-.68-2.73-1.78-6.09-14.52-17.16-24.92-32.07-30.3-27.8-10.04-58.34,3.22-69.92,30.03-11.52,26.68-.43,58.59,26.54,71.35,23.56,11.15,51.11,4.3,66.77-16.48l-15.51-16.02c-1.08-1.11-1.06-2.88.03-3.98l9.53-9.51c1.11-1.11,2.92-1.1,4.02.02,15.28,15.14,26.31,26.38,28.45,28.84.33.37,1.45,1.58,2.32,3.51.62,1.37.93,2.73,1.09,4.16Z"/><path d="M372.9,213.35c0,40.86-33.12,73.98-73.98,73.98s-73.98-33.12-73.98-73.98,33.12-73.98,73.98-73.98,73.98,33.12,73.98,73.98ZM354.3,213.35c0-30.6-24.8-55.4-55.4-55.4s-55.4,24.8-55.4,55.4,24.8,55.4,55.4,55.4,55.4-24.8,55.4-55.4Z"/><rect x="756.51" y="142.01" width="21.36" height="145.26" rx="2.83" ry="2.83"/><path d="M195.67,207.84v76.65c0,1.72-1.51,3.09-3.37,3.09h-15.62c-.94,0-1.77-.34-2.39-.9,0,0-.83-.77-.98-2.19-.2-1.7-.2-31.63-.06-72.8v-.04c0-.75.01-1.49.01-2.25v-.17c-.09-26.82-24-48.54-53.46-48.54-17.23,0-31.71,7.68-41.24,18.61-7.61,8.71-12.05,19.49-12.23,30.11.01,24.9.03,49.81.04,74.71,0,.59-.11,1.53-.76,2.26-1.03,1.15-2.83,1.12-3.74,1.11-3.1-.04-7.58,0-13.23,0-.34-.04-1.47-.2-2.44-1.11-.92-.88-1.13-1.9-1.18-2.24v-76.65c0-.88.02-1.77.05-2.64v-.02c1.54-35.91,33.91-64.58,73.63-64.58,3.49,0,6.92.22,10.28.66,36.47,3.13,65.19,30.5,66.64,64.28v.02c.03.88.05,1.77.05,2.64Z"/>';
function logoSVG(extraClass){
  return `<svg class="logo-svg ${extraClass||''}" viewBox="36.50 63.50 759.50 301.50" xmlns="http://www.w3.org/2000/svg"><g fill="#0a0a0a">${LOGO_PATHS}</g><circle cx="767.19" cy="91.89" r="24.38" fill="#6f00ff"/></svg>`;
}
function logoSVGLight(){
  return `<svg class="logo-svg" viewBox="36.50 63.50 759.50 301.50" xmlns="http://www.w3.org/2000/svg"><g fill="#EFEBE6">${LOGO_PATHS}</g><circle cx="767.19" cy="91.89" r="24.38" fill="#6f00ff"/></svg>`;
}

/* ─── ICONS ─── */
const ICONS = {
  insta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 0 1 6.9 12.6l-.3.5.7 2.6-2.6-.7-.5.3A8.2 8.2 0 1 1 12 3.8zm-3 3.5c-.2 0-.5 0-.7.4-.2.4-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.8 4.3 3.8 2.1.8 2.5.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.7-.3s-1.1-.5-1.3-.6c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1s-1-.4-1.8-1.1c-.7-.6-1.1-1.3-1.3-1.5-.1-.2 0-.4.1-.5l.4-.4.3-.5v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-5.7-7-11a7 7 0 0 1 14 0c0 5.3-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  arrow: '<svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
};

/* ─── RENDER CONTENT FROM JSON ─── */
async function loadContent() {
  let data;
  if(location.protocol==='file:'&&window.__NOGGI_CONTENT__) data=window.__NOGGI_CONTENT__;
  // 3 Versuche: faengt fehlgeschlagene Erst-Requests nach frischem Deploy ab
  for(let i=0;i<3 && !data;i++){
    try {
      const res = await fetch('content.json', i===2?{cache:'no-store'}:undefined);
      if(!res.ok) throw new Error('HTTP '+res.status);
      data = await res.json();
    } catch (e) {
      if(i===2) console.error('content.json nicht ladbar:', e);
      else await new Promise(r=>setTimeout(r,600));
    }
  }
  if (!data) data = window.__NOGGI_CONTENT__;
  if (!data) return;
  // KRITISCH: Tunnel (initAssemble) liest wormMedia aus window.__NOGGI_CONTENT__ —
  // auf dem Live-Deploy kommt der Inhalt per fetch, also hier bereitstellen,
  // BEVOR render() -> initInteractions() -> initAssemble() läuft.
  if(!window.__NOGGI_CONTENT__) window.__NOGGI_CONTENT__=data;
  render(data);
  initInteractions();
  initFxaParallax();
}

function render(d) {
  // TICKER — each word wrapped, dot via ::after for exact spacing
  const tickerItem = d.ticker.map(t => `<span class="tw">${t}</span>`).join('');
  document.querySelectorAll('.ticker-t').forEach(t => {
    t.innerHTML = `<div class="ti">${tickerItem}</div><div class="ti">${tickerItem}</div>`;
  });

  // WORK (category cards → subpages)
  const workGrid = document.getElementById('workGrid');
  if (workGrid) {
    const workItems = d.work || d.categories.map(c=>({title:c.name,img:c.cover,link:c.slug+'.html',count:(c.projects||[]).length}));
    workGrid.innerHTML = workItems.map(w => {
      return `
      <a href="${w.link}" class="wc">
        <div class="wc-imgs">
          <img class="wc-img base" src="${w.img}" alt="${w.title}" loading="lazy">
        </div>
        <div class="wc-glow"></div>
        <div class="wc-overlay"></div>
        <div class="wc-content">
          <h3 class="wc-title">${w.title}</h3>
          <div class="wc-cta">Ansehen ${ICONS.arrow}</div>
        </div>
      </a>`;}).join('');
  }

  // (Drag-to-explore section removed)


  // STATS
  const statsEl = document.getElementById('stats');
  if (statsEl) {
    statsEl.innerHTML = d.stats.map((s,i) => `
      <div class="sc rv ${i>0?'d'+i:''}"><div class="sc-num">${s.num}</div><div class="sc-label">${s.label}</div></div>`).join('');
  }

  // SERVICES / DISCIPLINES — aufklappbar: Klick/Tap zeigt die ausführliche Beschreibung
  const svcList = document.getElementById('svcList');
  if (svcList) {
    const svcLink = {
      'Graphic Design':'graphic-design.html','Editorial Design':'editorial-design.html',
      'Motion Design':'motion.html','Animation':'animation.html',
      'KI & Experimental':'ki-experimental.html','VJ & Live Visuals':'vj-sets.html',
      'Illustration':'illustration.html'
    };
    svcList.innerHTML = d.disciplines.map((s,i) => {
      const href = svcLink[s.name];
      const moreLink = href ? `<a class="svc-link" href="${href}">${s.name} ansehen ${ICONS.arrow}</a>` : '';
      const detailHtml = Array.isArray(s.detailBullets)
        ? `<ul class="svc-bullets">${s.detailBullets.map(b=>`<li><strong>${b.l}</strong> ${b.t}</li>`).join('')}</ul>`
        : (s.detail||s.desc);
      return `
      <li class="svc-item rv">
        <button class="svc-head" type="button" aria-expanded="false" aria-controls="svcd-${i}">
          <div class="svc-row"><span class="svc-n">${s.num}</span><span class="svc-name">${s.name}</span><span class="svc-toggle" aria-hidden="true"></span></div>
          <div class="svc-desc">${s.desc}</div>
        </button>
        <div class="svc-detail" id="svcd-${i}"><div class="svc-detail-inner">${detailHtml}${moreLink}</div></div>
      </li>`;}).join('');
  }

  // PROCESS
  const procGrid = document.getElementById('procGrid');
  if (procGrid && d.process) {
    procGrid.innerHTML = d.process.steps.map((s,i)=>`
      <div class="proc-card rv ${i>0?'d'+Math.min(i,3):''}">
        <div class="proc-num">${s.num}</div>
        <div class="proc-line"></div>
        <h3 class="proc-title">${s.title}</h3>
        <p class="proc-desc">${s.desc}</p>
      </div>`).join('');
  }

  // ABOUT
  const aboutImg = document.getElementById('aboutImg');
  if (aboutImg) aboutImg.src = d.about.img;
  const aboutTag = document.getElementById('aboutTag');
  if (aboutTag) aboutTag.textContent = d.about.tagOnImage;
  const aboutName = document.getElementById('aboutName');
  if (aboutName) aboutName.innerHTML = `${d.about.nameLines[0]}<br><em>${d.about.nameLines[1]}</em>`;
  const aboutParas = document.getElementById('aboutParas');
  if (aboutParas) aboutParas.innerHTML = d.about.paragraphs.map(p=>`<p class="about-para">${p}</p>`).join('');
  const aboutTags = document.getElementById('aboutTags');
  if (aboutTags) {
    // Tags verlinken auf die aktuellen Kategorieseiten dieser Site
    const linkFor = (name)=>{
      const map = {
        'Graphic Design':'graphic-design.html',
        'Editorial Design':'editorial-design.html',
        'Motion Design':'motion.html',
        'Animation':'animation.html',
        'KI & Experimental':'ki-experimental.html',
        'VJ & Live Visuals':'vj-sets.html',
        'Illustration':'illustration.html'
      };
      return map[name] || 'index.html#work';
    };
    aboutTags.innerHTML = d.about.tags.map(t=>`<a href="${linkFor(t)}" class="atag">${t}</a>`).join('');
  }

  // CONTACT META (menu + footer) — icons + links
  const c = d.contact;
  const menuMeta = document.getElementById('menuMeta');
  if (menuMeta) menuMeta.innerHTML = `
    <a href="mailto:${c.email}">${ICONS.mail}${c.email}</a>
    <a href="${c.whatsapp}" target="_blank" rel="noopener">${ICONS.wa}${c.whatsappLabel}</a>
    <a href="${c.instagram}" target="_blank" rel="noopener">${ICONS.insta}${c.instagramHandle}</a>
    <span>${ICONS.pin}${d.brand.location}</span>`;
  const footMeta = document.getElementById('footMeta');
  if (footMeta) footMeta.innerHTML = `
    <a href="mailto:${c.email}">${ICONS.mail}${c.email}</a>
    <a href="${c.instagram}" target="_blank" rel="noopener">${ICONS.insta}${c.instagramHandle}</a>
    <a href="${c.whatsapp}" target="_blank" rel="noopener">${ICONS.wa}${c.whatsappLabel}</a>
    <span class="addr">${ICONS.pin}${d.brand.location}</span>`;

  // CTA buttons icons
  const ctaSub = document.getElementById('ctaSub');
  if (ctaSub && d.cta) ctaSub.innerHTML = d.cta.sub;
  const ctaRow = document.getElementById('ctaRow');
  if (ctaRow) ctaRow.innerHTML = `
    <a href="mailto:${c.email}" class="btn-primary"><span>Let's Work Together ${ICONS.arrow}</span></a>
    <a href="${c.instagram}" target="_blank" rel="noopener" class="btn-ghost">${ICONS.insta}${c.instagramHandle}</a>
    <a href="${c.whatsapp}" target="_blank" rel="noopener" class="btn-ghost">${ICONS.wa}WhatsApp</a>`;

  // links in footer nav legal
  const impr = document.getElementById('lnkImpressum');
  if (impr) impr.href = c.impressum;
  const agb = document.getElementById('lnkAgb');
  if (agb) agb.href = c.agb;
  // work "all work"
  const allWork = document.getElementById('allWork');
  if (allWork) allWork.innerHTML = `All Work ${ICONS.arrow}`;

  // LOGOS — nav (theme-aware), footer (light), intro (light)
  const navLogo = document.getElementById('navLogo');
  if (navLogo){ navLogo.innerHTML = logoSVG(); navLogo.setAttribute('href','index.html'); }
  const footLogo = document.getElementById('footLogo');
  if (footLogo){ footLogo.innerHTML = logoSVGLight(); footLogo.setAttribute('href','index.html'); }
  const introLogo = document.getElementById('introLogo');
  if (introLogo) introLogo.innerHTML = logoSVGLight();
}

/* ─── INTERACTIONS ─── */
function initInteractions() {
  // CURSOR
  if (!isTouch) {
    const cur = document.getElementById('cur'), cur2 = document.getElementById('cur2');
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove', e=>{mx=e.clientX;my=e.clientY});
    (function loop(){
      const tf='translate3d('+mx+'px,'+my+'px,0) translate(-50%,-50%)';
      cur.style.transform=tf;cur2.style.transform=tf;
      requestAnimationFrame(loop);
    })();
    const hoverEls = document.querySelectorAll('a,button,.wc,.atag,.about-visual');
    hoverEls.forEach(el=>{
      el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));
      el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'));
    });
  }

  // BURGER
  const burger=document.getElementById('burger'), menu=document.getElementById('menu');
  burger.addEventListener('click',()=>{
    const o=menu.classList.toggle('open');
    burger.classList.toggle('open');
    document.body.classList.toggle('menu-open',o);
    document.body.style.overflow=o?'hidden':'';
  });
  document.querySelectorAll('.ml').forEach(a=>a.addEventListener('click',()=>{
    menu.classList.remove('open');burger.classList.remove('open');document.body.classList.remove('menu-open');document.body.style.overflow='';
  }));

  // LEISTUNGEN — Desktop: Hover klappt auf; Touch: Tap klappt auf/zu
  const svcHover = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  document.querySelectorAll('.svc-item').forEach(item=>{
    const head=item.querySelector('.svc-head');
    if(!head) return;
    const setOpen=(o)=>{ item.classList.toggle('open',o); head.setAttribute('aria-expanded',o?'true':'false'); };
    if(svcHover){
      item.addEventListener('mouseenter',()=>setOpen(true));
      item.addEventListener('mouseleave',()=>setOpen(false));
      head.addEventListener('focus',()=>setOpen(true));
      head.addEventListener('blur',()=>setOpen(false));
    } else {
      head.addEventListener('click',()=>setOpen(!item.classList.contains('open')));
    }
  });

  // NAV + DARK MODE on scroll (desktop only; mobile is always dark via CSS + class)
  document.body.classList.add('dark');
  function onScroll(){
    document.getElementById('nav').classList.toggle('sc',window.scrollY>60);
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  // REVEAL
  const obs=new IntersectionObserver(en=>{
    en.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')});
  },{threshold:.06,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.rv').forEach(el=>obs.observe(el));
  // re-observe dynamically added .rv
  setTimeout(()=>document.querySelectorAll('.rv:not(.in)').forEach(el=>obs.observe(el)),100);

  // (Drag scroll handler removed with the section)


  // INTRO + LOADER — only on first visit this session; on back-navigation / re-entry skip it
  window.skipIntro = skipIntro;
  const introSeen = sessionStorage.getItem('noggiIntroSeen');
  if(introSeen){
    // Remove loader + intro immediately, jump to requested section if hash present
    const loaderEl=document.getElementById('loader'); if(loaderEl) loaderEl.remove();
    const viEl=document.getElementById('vi'); if(viEl) viEl.remove();
    document.body.style.overflow='';
    if(location.hash){
      const t=document.querySelector(location.hash);
      if(t) requestAnimationFrame(()=>t.scrollIntoView({behavior:'auto',block:'start'}));
    }
  } else {
    document.body.style.overflow='hidden';
    runLoader();
    sessionStorage.setItem('noggiIntroSeen','1');
  }

  // CANVAS BG + 3D DROP
  initBgCanvas();
  initAssemble();
}

function skipIntro(){
  document.body.style.overflow='';
  const vi=document.getElementById('vi');
  if(!vi)return;
  vi.classList.add('done');
  document.body.style.overflow='';
  setTimeout(()=>vi.remove(),1000);
  if(location.hash){
    const t=document.querySelector(location.hash);
    if(t) requestAnimationFrame(()=>t.scrollIntoView({behavior:'auto',block:'start'}));
  }
}

/* ─── LOADER + INTRO run concurrently (3s), then → mainpage ─── */
function runLoader(){
  const loader=document.getElementById('loader');
  const fill=document.getElementById('loaderFill');
  const pct=document.getElementById('loaderPct');
  const DURATION=1400;
  const start=performance.now();
  document.body.style.overflow='hidden';

  function frame(now){
    let p=Math.min(100,((now-start)/DURATION)*100);
    // ease-out so it feels natural
    const eased=Math.min(100, (1-Math.pow(1-p/100,2))*100);
    if(fill)fill.style.width=eased+'%';
    if(pct)pct.textContent=Math.round(eased)+'%';
    if(p<100){
      requestAnimationFrame(frame);
    } else {
      // bar full → fade loader AND intro together → mainpage
      if(loader){loader.classList.add('done');setTimeout(()=>loader.remove(),700);}
      skipIntro();
    }
  }
  requestAnimationFrame(frame);
}

/* ─── BACKGROUND CANVAS (full-page, faster, clearly behind) ─── */
function initBgCanvas(){
  const canvas=document.getElementById('bgCanvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  let W,H,DPR;
  function resize(){
    DPR=Math.min(window.devicePixelRatio||1,2);
    W=window.innerWidth;H=window.innerHeight;
    canvas.width=W*DPR;canvas.height=H*DPR;
    canvas.style.width=W+'px';canvas.style.height=H+'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }
  resize();window.addEventListener('resize',resize);

  function blob(cx,cy,rx,ry,pts,phase,tt){
    ctx.beginPath();
    for(let i=0;i<=pts;i++){
      const a=(i/pts)*Math.PI*2;
      const n=Math.sin(a*3+tt+phase)*.14+Math.sin(a*5+tt*1.5+phase)*.08+Math.sin(a*7+tt*.9+phase)*.05;
      const bx=cx+(rx*(1+n))*Math.cos(a), by=cy+(ry*(1+n))*Math.sin(a);
      i===0?ctx.moveTo(bx,by):ctx.lineTo(bx,by);
    }
    ctx.closePath();
  }
  const pts=[
    {x:.2,y:.32,rx:.3,ry:.28,phase:0,speed:1},
    {x:.78,y:.5,rx:.2,ry:.24,phase:2.2,speed:1.35},
    {x:.5,y:.78,rx:.16,ry:.18,phase:4.5,speed:1.7},
    {x:.62,y:.18,rx:.12,ry:.14,phase:1.1,speed:1.5}
  ];
  const floaters=[];
  for(let i=0;i<11;i++)floaters.push({x:Math.random(),y:Math.random(),dx:.5+Math.random()*.8,dy:.5+Math.random()*.8,ph:Math.random()*6});

  let t=0,_last=0;
  function draw(now){
    requestAnimationFrame(draw);
    if(document.hidden) return;            // im Hintergrund-Tab nicht zeichnen
    if(now-_last<33) return;               // ~30fps reicht, halbiert die Last
    _last=now;
    ctx.clearRect(0,0,W,H);
    t+=.028; // an 30fps angepasst
    const dark=document.body.classList.contains('dark');
    // Auf Hochkant-Screens Blob-Hoehe an der BREITE orientieren, sonst verzerren sie nach oben
    const RH=H>W?W*1.15:H;
    const base='123,47,255';
    const fillMul=dark?1.4:1.1, strokeMul=dark?1.2:1.5;
    pts.forEach((s,i)=>{
      blob(W*s.x,H*s.y,W*s.rx,RH*s.ry,80,s.phase,t*s.speed);
      const g=ctx.createRadialGradient(W*s.x,H*s.y,0,W*s.x,H*s.y,W*s.rx);
      const a=(i===0?.11:i===1?.08:.06)*fillMul;
      g.addColorStop(0,`rgba(${base},${a})`);g.addColorStop(1,`rgba(${base},0)`);
      ctx.fillStyle=g;ctx.fill();
      blob(W*s.x,H*s.y,W*s.rx,RH*s.ry,80,s.phase,t*s.speed);
      const sa=(i===0?.34:i===1?.26:.2)*strokeMul;
      ctx.strokeStyle=`rgba(${base},${sa})`;ctx.lineWidth=i===0?2.4:1.7;ctx.stroke();
      blob(W*s.x,H*s.y,W*s.rx*.82,RH*s.ry*.82,80,s.phase+.35,t*s.speed);
      ctx.strokeStyle=`rgba(${base},${sa*.5})`;ctx.lineWidth=1.1;ctx.stroke();
    });
    floaters.forEach((f,i)=>{
      const fx=W*(f.x+Math.sin(t*f.dx+f.ph)*.05), fy=H*(f.y+Math.cos(t*f.dy+f.ph)*.05);
      const r=1.8+Math.sin(t*1.3+i)*.9;
      ctx.beginPath();ctx.arc(fx,fy,r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${base},${(.3+Math.sin(t+i)*.16)*strokeMul})`;ctx.fill();
      floaters.slice(i+1).forEach((q)=>{
        const qx=W*(q.x+Math.sin(t*q.dx+q.ph)*.05), qy=H*(q.y+Math.cos(t*q.dy+q.ph)*.05);
        const d=Math.hypot(fx-qx,fy-qy);
        if(d<W*.2){ctx.beginPath();ctx.moveTo(fx,fy);ctx.lineTo(qx,qy);ctx.strokeStyle=`rgba(${base},${.12*(1-d/(W*.2))*strokeMul})`;ctx.lineWidth=1.1;ctx.stroke()}
      });
    });
  }
  requestAnimationFrame(draw);
}

/* ─── 3D MELTING DROP — scroll-controlled growth, hero only ─── */
/* ─── PARTIKEL-ASSEMBLE — Wortmarke setzt sich beim Scrollen zusammen ─── */
/* ─── HERO-MARKE — baut sich beim Laden auf, zerfällt beim Scrollen (Lando/Lusion-Stil) ─── */
/* ─── 3D-HERO + WURMLOCH — Objekt setzt sich aus Scherben zusammen, Tunnel-Flug zu den Visuals ─── */
/* ─── WURMLOCH-OPENER — Flug durch den Tunnel in die Website, am Ende der i-Punkt ─── */
function initAssemble(){
  const canvas=document.getElementById('asmCanvas'); if(!canvas) return;
  const stage=document.getElementById('home'); if(!stage) return;
  if(typeof THREE==='undefined') return;
  const DPR=Math.min(window.devicePixelRatio||1,2);
  const clamp=(v,a,b)=>v<a?a:(v>b?b:v);
  let W=window.innerWidth,H=window.innerHeight;
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  renderer.setPixelRatio(DPR);renderer.setSize(W,H);renderer.setClearColor(0x000000,0);
  let mx=0,my=0;
  window.addEventListener('mousemove',e=>{mx=e.clientX/W*2-1;my=e.clientY/H*2-1},{passive:true});

  const scene=new THREE.Scene();
  scene.fog=new THREE.Fog(0x070709,3,12.5);
  const cam=new THREE.PerspectiveCamera(72,W/H,.1,60);

  // weiche runde Leucht-Textur (statt Quadraten)
  function glowTex(){
    // 8px echter Transparenz-Rand: verhindert die sichtbare Sprite-Kante am i-Punkt
    const c=document.createElement('canvas');c.width=c.height=128;
    const g=c.getContext('2d');
    const gr=g.createRadialGradient(64,64,0,64,64,56);
    gr.addColorStop(0,'rgba(255,255,255,1)');
    gr.addColorStop(.3,'rgba(255,255,255,.72)');
    gr.addColorStop(.62,'rgba(255,255,255,.26)');
    gr.addColorStop(1,'rgba(255,255,255,0)');
    g.fillStyle=gr;g.fillRect(0,0,128,128);
    return new THREE.CanvasTexture(c);
  }
  const spr=glowTex();
  // abgerundete Ecken für Bildkarten
  function softAlpha(){
    const c=document.createElement('canvas');c.width=512;c.height=384;
    const g=c.getContext('2d');
    g.fillStyle='#000';g.fillRect(0,0,512,384);
    g.save();g.translate(256,192);g.scale(1,.75);
    const gr=g.createRadialGradient(0,0,90,0,0,238);
    gr.addColorStop(0,'#fff');gr.addColorStop(.5,'#fff');gr.addColorStop(1,'rgba(255,255,255,0)');
    g.fillStyle=gr;g.fillRect(-256,-340,512,680);g.restore();
    return new THREE.CanvasTexture(c);
  }
  const alphaTex=softAlpha();
  // Oval-Form (Querformat) mit definierter weicher Kante für Video-Stationen.
  // three r128 wendet repeat/offset der map AUCH auf die alphaMap an —
  // deshalb wird das Oval in den Subbereich gezeichnet, der gesampelt wird (Kompensation).
  function eggAlpha(rx,ry,ox,oy,portrait){
    rx=rx||1;ry=ry||1;ox=ox||0;oy=oy||0;
    const Wc=portrait?384:512, Hc=portrait?512:384;
    const c=document.createElement('canvas');c.width=Wc;c.height=Hc;
    const g=c.getContext('2d');
    g.fillStyle='#000';g.fillRect(0,0,Wc,Hc);
    // Subrect in Canvas-Koordinaten (v-Achse gespiegelt)
    const sx=ox*Wc, sw=rx*Wc, sy=(1-(oy+ry))*Hc, sh=ry*Hc;
    g.save();g.translate(sx+sw/2,sy+sh/2);
    if(portrait)g.scale(.74*sw/Wc,sh/Hc); else g.scale(sw/Wc,.74*sh/Hc);
    const gr=g.createRadialGradient(0,0,130,0,0,244);
    gr.addColorStop(0,'#fff');gr.addColorStop(.8,'#fff');gr.addColorStop(1,'rgba(255,255,255,0)');
    g.fillStyle=gr;g.fillRect(-Wc*3,-Hc*3,Wc*6,Hc*6);g.restore();
    return new THREE.CanvasTexture(c);
  }

  const pts=[];const LEN=44;
  for(let i=0;i<=12;i++){
    pts.push(new THREE.Vector3(Math.sin(i*.9)*1.0,Math.cos(i*.7)*.65,-i*(LEN/12)));
  }
  const curve=new THREE.CatmullRomCurve3(pts);
  // organisches Liniennetz
  const tubeMat=new THREE.MeshBasicMaterial({color:0x2a1060,wireframe:true,transparent:true,opacity:0,depthWrite:false});
  scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve,isTouch?70:110,3.1,14,false),tubeMat));
  // Ringe aus weichen Leuchtpunkten statt durchgezogener Linien
  const ringMat=new THREE.PointsMaterial({color:0x9B5FFF,size:.085,map:spr,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending});
  {const NR=isTouch?22:34, DOTS=48, up=new THREE.Vector3(0,1,0);
   const rp=new Float32Array(NR*DOTS*3); let k=0;
   for(let i=0;i<NR;i++){
     const t=i/(NR-1), c=curve.getPointAt(t), tan=curve.getTangentAt(t);
     const n1=new THREE.Vector3().crossVectors(tan,up).normalize();
     const n2=new THREE.Vector3().crossVectors(tan,n1).normalize();
     const ph=i*0.7;
     for(let d=0;d<DOTS;d++){
       const a=ph+d/DOTS*6.28318;
       const rr=3.05+Math.sin(a*3+i)*0.05;
       rp[k++]=c.x+(Math.cos(a)*n1.x+Math.sin(a)*n2.x)*rr;
       rp[k++]=c.y+(Math.cos(a)*n1.y+Math.sin(a)*n2.y)*rr;
       rp[k++]=c.z+(Math.cos(a)*n1.z+Math.sin(a)*n2.z)*rr;
     }
   }
   const rg=new THREE.BufferGeometry();rg.setAttribute('position',new THREE.BufferAttribute(rp,3));
   scene.add(new THREE.Points(rg,ringMat));}
  // runde, weiche Partikel
  {const NP=isTouch?350:750;const pp=new Float32Array(NP*3);
   for(let i=0;i<NP;i++){
     const t=Math.random(); const c=curve.getPointAt(t);
     const a=Math.random()*6.283,rr=.6+Math.random()*2.3;
     pp[i*3]=c.x+Math.cos(a)*rr;pp[i*3+1]=c.y+Math.sin(a)*rr;pp[i*3+2]=c.z+(Math.random()-.5)*1.5;
   }
   const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pp,3));
   scene.add(new THREE.Points(pg,new THREE.PointsMaterial({color:0x9B5FFF,size:.12,map:spr,transparent:true,opacity:.9,depthWrite:false,blending:THREE.AdditiveBlending})));}
  // Stationen: Bilder, Video-Screens und 3D-Slot, weiche Kanten
  const cardMats=[]; const cardMeshes=[]; const wormVids=[]; let modelT=.48;
  const media=(window.__NOGGI_CONTENT__&&window.__NOGGI_CONTENT__.wormMedia)||
    ((window.__NOGGI_CONTENT__&&window.__NOGGI_CONTENT__.wormImages)||[]).map(s=>({type:'img',src:s}));
  const tl=new THREE.TextureLoader();
  // Disziplin-Label unter der Station (DM Mono, Nummer lila)
  const labelMats=[];
  function makeLabel(m,wdt,hgt,idx,txt){
    const build=()=>{
      const c=document.createElement('canvas');c.width=1024;c.height=120;
      const g=c.getContext('2d');
      g.textBaseline='middle';
      try{g.letterSpacing='8px';}catch(e){}
      g.font='500 56px "DM Mono",monospace';
      const tx=(txt||'').toUpperCase();
      const tw=g.measureText(tx).width;
      g.fillStyle='#EFEBE6';g.fillText(tx,(1024-tw)/2,64);
      const tex=new THREE.CanvasTexture(c);
      tex.minFilter=THREE.LinearFilter;
      const lw=Math.min(Math.max(wdt*.95,2.0),3.0), lh=lw*120/1024;
      // Sprite statt Plane: bleibt IMMER exakt waagrecht zum Bildschirm (nichts Schiefes)
      const lm=new THREE.SpriteMaterial({map:tex,transparent:true,opacity:0,depthWrite:false,depthTest:false});
      const p=new THREE.Sprite(lm);
      p.scale.set(lw,lh,1);
      p.position.set(0,-hgt/2-.28,0);
      m.add(p);
      m.userData.lbl=lm;
    };
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(build);else build();
  }
  function placeCard(tex,ar,t,side,shape,idx,label){
    let hgt,wdt,off,amap;
    const MOB=isTouch||W<768;
    if(shape==='oval'||shape==='oval-hoch'){
      const P=shape==='oval-hoch';
      // Oval quer (16:10-nah, kaum Crop) oder hochkant (Ausschnitt mittig)
      if(P){ hgt=MOB?2.75:3.5; wdt=hgt*.74; }
      else { hgt=MOB?2.35:3.0; wdt=hgt*1.55; }
      const target=wdt/hgt;
      let rx=1,ry=1,ox=0,oy=0;
      if(ar>target){ rx=target/ar; ox=(1-rx)/2; }
      else { ry=ar/target; oy=(1-ry)/2; }
      tex.repeat.set(rx,ry); tex.offset.set(ox,oy);
      amap=eggAlpha(rx,ry,ox,oy,P);
      off=P?(MOB?1.05:1.3):(MOB?1.2:1.55);
    } else {
      hgt=ar<1?(MOB?2.5:3.1):(MOB?2.0:2.5); wdt=Math.min(hgt*ar,MOB?3.2:4.1); amap=alphaTex;
      off=(MOB?.85:1.05)+wdt*.20;
    }
    const cm=new THREE.MeshBasicMaterial({map:tex,alphaMap:amap,transparent:true,opacity:0,depthWrite:false});
    cardMats.push(cm);
    const m=new THREE.Mesh(new THREE.PlaneGeometry(wdt,hgt),cm);
    const c=curve.getPointAt(t), tan=curve.getTangentAt(t);
    const n=new THREE.Vector3(-tan.z,0,tan.x).normalize();
    m.position.copy(c).addScaledVector(n,side*off).add(new THREE.Vector3(0,(side>0?.18:-.14),0));
    m.lookAt(m.position.clone().sub(tan));
    m.rotateY(side*(shape==='oval'?-.16:-.14));
    m.userData={by:m.position.y,ph:t*37,sp:.55+((t*13)%1)*.3,ct:t};
    if(label)makeLabel(m,wdt,hgt,idx,label);
    cardMeshes.push(m);
    scene.add(m);
  }
  media.forEach((item,i)=>{
    const t=.14+i*(0.64/Math.max(1,media.length-1));
    const side=i%2?1:-1;
    if(item.type==='3d'){ modelT=t; return; }
    if(item.type==='vid'){
      const v=document.createElement('video');
      v.muted=true;v.loop=true;v.autoplay=true;v.playsInline=true;
      v.setAttribute('playsinline','');v.setAttribute('muted','');
      const toURL=(u,mt)=>{
        if(u&&u.slice(0,5)==='data:'){
          try{
            const b64=u.slice(u.indexOf(',')+1);
            const bin=atob(b64);const u8=new Uint8Array(bin.length);
            for(let k=0;k<bin.length;k++)u8[k]=bin.charCodeAt(k);
            return URL.createObjectURL(new Blob([u8],{type:mt}));
          }catch(e){return u;}
        }
        return u;
      };
      [[item.src,'video/mp4'],[item.alt,'video/webm']].forEach(([u,mt])=>{
        if(!u)return;
        const sc=document.createElement('source');
        sc.src=toURL(u,mt);sc.type=mt;v.appendChild(sc);
      });
      v.load();
      v.addEventListener('loadedmetadata',()=>{
        const tex=new THREE.VideoTexture(v);
        tex.minFilter=THREE.LinearFilter;tex.magFilter=THREE.LinearFilter;
        placeCard(tex,v.videoWidth/v.videoHeight,t,side,item.shape,i,item.label);
        v.play().catch(()=>{});
      });
      wormVids.push(v);
      return;
    }
    tl.load(item.src,tex=>{
      placeCard(tex,tex.image.width/tex.image.height,t,side,item.shape,i,item.label);
    });
  });
  // Autoplay-Fallback: erste Interaktion startet alle Videos
  window.__worm={cardMats,cardMeshes,wormVids,media};window.__wormDbg=()=>({tube:tubeMat.opacity,ring:ringMat.opacity,cur:window.__cur});
  const kick=()=>wormVids.forEach(v=>v.play().catch(()=>{}));
  window.addEventListener('scroll',kick,{once:true,passive:true});
  window.addEventListener('pointerdown',kick,{once:true,passive:true});
  // Echtes 3D-Objekt (Meshy: Blumen-Porträt) im Tunnel
  const wormMats=[]; let wormObj=null;
  const modelSrc=(window.__NOGGI_CONTENT__&&window.__NOGGI_CONTENT__.wormModel)||null;
  if(modelSrc&&THREE.GLTFLoader){
    new THREE.GLTFLoader().load(modelSrc,g=>{
      const o=g.scene;
      o.traverse(n=>{
        if(n.isMesh&&n.material){
          n.material.transparent=true;n.material.opacity=0;
          if(n.material.map)n.material.map.encoding=THREE.LinearEncoding;
          n.material.needsUpdate=true;
          wormMats.push(n.material);
        }
      });
      const box=new THREE.Box3().setFromObject(o);
      const size=box.getSize(new THREE.Vector3());
      o.scale.setScalar(1.65/Math.max(size.x,size.y,size.z));
      box.setFromObject(o);
      const ctr=box.getCenter(new THREE.Vector3());
      o.position.sub(ctr);
      const grp=new THREE.Group();grp.add(o);
      const t=modelT, c=curve.getPointAt(t), tan=curve.getTangentAt(t);
      const n2=new THREE.Vector3(-tan.z,0,tan.x).normalize();
      grp.position.copy(c).addScaledVector(n2,1.05).add(new THREE.Vector3(0,-.15,0));
      grp.userData.by=grp.position.y;scene.add(grp);wormObj=grp;
    },undefined,()=>{});
  }
  // Ziel: der glühende i-Punkt am Tunnelende — kein harter Ball,
  // sondern Lichtquelle, in die man am Ende richtig eintaucht
  const endP=curve.getPointAt(1);
  const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:spr,color:0x7B2FFF,transparent:true,opacity:.9,depthWrite:false,depthTest:false,blending:THREE.AdditiveBlending,fog:false}));
  glow.scale.set(3.4,3.4,1);glow.position.copy(endP);scene.add(glow);
  const halo=new THREE.Sprite(new THREE.SpriteMaterial({map:spr,color:0x9B5FFF,transparent:true,opacity:.35,depthWrite:false,depthTest:false,blending:THREE.AdditiveBlending,fog:false}));
  halo.scale.set(7.5,7.5,1);halo.position.copy(endP);scene.add(halo);
  // Flut: füllt am Ende den Bildschirm mit Marken-Violett und beruhigt
  // sich dann Richtung Seiten-Dunkel — nahtloser Übergang zum Hero
  const floodC1=new THREE.Color(0x7B2FFF), floodC2=new THREE.Color(0x150a26);
  const flood=new THREE.Sprite(new THREE.SpriteMaterial({map:spr,color:0x7B2FFF,transparent:true,opacity:0,depthWrite:false,depthTest:false,fog:false}));
  flood.scale.set(40,40,1);flood.renderOrder=999;scene.add(flood);
  // Wortmarke am Tunneleingang: man fliegt durch sie hindurch
  function wmTexture(){
    // Symmetrisches Padding: i-Punkt-Glow hat Luft UND das Logo bleibt exakt
    // zentriert auf der Plane (einseitiges Padding = linkslastiges Logo!)
    const c=document.createElement('canvas');c.width=1620;c.height=744;
    const g=c.getContext('2d');
    const sc=1520/759.5;
    g.setTransform(sc,0,0,sc,-36.5*sc+50,-63.5*sc+70);
    g.fillStyle='#EFEBE6';
    [...LOGO_PATHS.matchAll(/<path d="([^"]+)"/g)].forEach(m=>g.fill(new Path2D(m[1])));
    const rm2=LOGO_PATHS.match(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)" rx="([\d.]+)"/);
    if(rm2){g.beginPath();
      if(g.roundRect)g.roundRect(+rm2[1],+rm2[2],+rm2[3],+rm2[4],+rm2[5]);
      else g.rect(+rm2[1],+rm2[2],+rm2[3],+rm2[4]);
      g.fill();}
    g.shadowColor='rgba(123,47,255,.9)';g.shadowBlur=46;
    g.fillStyle='#6F00FF';g.beginPath();g.arc(767.19,91.89,24.38,0,6.283);g.fill();
    return new THREE.CanvasTexture(c);
  }
  const WM_T=0.052;
  const wmMat=new THREE.MeshBasicMaterial({map:wmTexture(),transparent:true,opacity:1,depthWrite:false});
  {// exakt mittig und GERADE vor der Startkamera (kein Tangenten-Kippen)
   const c0=curve.getPointAt(0), l0=curve.getPointAt(.045);
   const dir0=l0.clone().sub(c0).normalize();
   // Breite an den sichtbaren Bereich anpassen: mobil kein Überstand über den Rand
   const visW=2*2.3*Math.tan(cam.fov*Math.PI/360)*(W/H);
   const wmW=Math.min(3.0,visW*.84)*(1620/1520);
   const wmp=new THREE.Mesh(new THREE.PlaneGeometry(wmW,wmW*744/1620),wmMat);
   wmp.position.copy(c0).addScaledVector(dir0,2.3);
   wmp.lookAt(c0);
   scene.add(wmp);}

  let tPrev=0,introStart=-1,cur=0,smx=0,smy=0;
  const hintEl=document.querySelector('.asm-hint');
  function introVisible(){
    const l=document.getElementById('loader');
    return l&&!l.classList.contains('done');
  }
  function resize(){
    W=window.innerWidth;H=window.innerHeight;
    renderer.setSize(W,H);cam.aspect=W/H;cam.updateProjectionMatrix();
  }
  let rto;window.addEventListener('resize',()=>{clearTimeout(rto);rto=setTimeout(resize,150)});
  function draw(t){
    requestAnimationFrame(draw);
    if(document.hidden)return;
    if(t-tPrev<15)return;
    const dt=Math.min((t-tPrev)/1000,.08);tPrev=t;
    const r=stage.getBoundingClientRect();
    if(r.bottom<H*0.1){ if(canvas.style.display!=='none')canvas.style.display='none'; return; }
    if(canvas.style.display==='none')canvas.style.display='';
    if(introStart<0){ if(introVisible()){renderer.clear();return;} introStart=t; }
    const tt=t*.001;
    const ss=x=>{x=clamp(x,0,1);return x*x*(3-2*x)};
    const enter=ss(clamp((t-introStart)/1100,0,1));
    // Schutz + robuste Berechnung. Firefox und Chrome messen vh und rect.top
    // leicht unterschiedlich; ausserdem kann die Buehne beim Loader (overflow:hidden)
    // kurz eine falsche Hoehe melden. Darum: Fortschritt aus der DOKUMENT-Scrollhoehe.
    const doc=document.documentElement;
    const maxScroll=(doc.scrollHeight||0)-H;
    const scrolled=window.scrollY||window.pageYOffset||0;
    // Anteil der Buehne am gesamten Dokument (die Buehne steht ganz oben)
    const stageScroll=r.height-H;                 // scrollbare Strecke innerhalb der Buehne
    if(stageScroll<H*0.5 || maxScroll<=0){ renderer.render(scene,cam); return; }
    const wp=clamp(scrolled/stageScroll,0,1);
    const ramp=ss(clamp(wp/0.09,0,1));
    for(let i=0;i<wormMats.length;i++) wormMats[i].opacity=ramp;
    if(wormObj){wormObj.rotation.y=tt*.4;wormObj.position.y=wormObj.userData.by+Math.sin(tt*.8)*.06;}
    const target=clamp(wp*.9,0,.905);
    const k=1-Math.exp(-dt*2.6), km=1-Math.exp(-dt*3.5);
    cur+=(target-cur)*k;window.__cur=cur;

    smx+=(mx-smx)*km; smy+=(my-smy)*km;
    const sf=.25+.75*ramp; // am Start kaum Parallaxe -> Wortmarke bleibt exakt gerade
    const c=curve.getPointAt(cur), lk=curve.getPointAt(Math.min(cur+.045,1));
    cam.position.set(c.x+smx*.22*sf+Math.sin(tt*.5)*.03*sf, c.y-smy*.18*sf+Math.cos(tt*.42)*.025*sf, c.z);
    cam.lookAt(lk);
    if(hintEl)hintEl.style.opacity=(enter*(1-ss(clamp(wp/0.05,0,1)))).toFixed(3);
    // Stationen schweben sanft + blenden weich aus, kurz bevor man sie passiert
    for(let i=0;i<cardMeshes.length;i++){
      const cm=cardMeshes[i], u=cm.userData;
      cm.position.y=u.by+Math.sin(tt*u.sp+u.ph)*.055;
      const fadeAt=(isTouch||W<768)?.032:.018, fadeLen=(isTouch||W<768)?.05:.042;
      const passFade=ss(clamp((u.ct-cur-fadeAt)/fadeLen,0,1));
      cm.material.opacity=.96*ramp*passFade;
      if(u.lbl)u.lbl.opacity=.92*ramp*passFade;
    }
    const dWm=WM_T-cur;
    wmMat.opacity=ss(clamp((dWm-.006)/.028,0,1))*enter;
    const pulse=.8+.2*Math.sin(tt*2.2);
    const prox=ss(clamp((cur-.62)/.24,0,1));
    glow.material.opacity=(.6+.4*prox)*pulse;
    const gs=3.2*(1+prox*2.2)*pulse;
    glow.scale.set(gs,gs,1);
    const hs=7.5*(1+prox*2.0);
    halo.material.opacity=.3+.45*prox;
    halo.scale.set(hs,hs,1);
    // Eintauchen: Licht flutet den Bildschirm, beruhigt sich dann in Seiten-Dunkel
    const dive=ss(clamp((cur-.78)/.115,0,1));
    const settle=ss(clamp((cur-.862)/.034,0,1));
    ringMat.opacity=.75*ramp*(1-dive*.9); tubeMat.opacity=.2*ramp*(1-dive);
    glow.material.opacity=glow.material.opacity*(1-settle*.9);
    halo.material.opacity=halo.material.opacity*(1-settle*.85);
    if(dive>0){
      const fwd=lk.clone().sub(c).normalize();
      flood.position.copy(cam.position).addScaledVector(fwd,2.2);
      flood.material.opacity=dive;
      flood.material.color.copy(floodC1).lerp(floodC2,settle);
    } else flood.material.opacity=0;
    const fadeOut=ss(clamp((r.bottom-H*0.12)/(H*0.45),0,1));
    canvas.style.opacity=enter*fadeOut;
    // Hintergrund-Netz taucht mit ins Licht (kommt nach dem Tunnel zurück)
    const bgc=document.getElementById('bgCanvas');
    if(bgc)bgc.style.opacity=String(1-dive*fadeOut);
    renderer.render(scene,cam);
  }
  requestAnimationFrame(draw);
}

/* boot */
loadContent();

/* wip banner close */
document.documentElement.classList.add('fxa'); /* OPTION-A: diese Zeile löschen = alles zurückgebaut */
document.addEventListener('DOMContentLoaded',function(){
  var banner=document.getElementById('wip-banner');
  var btn=document.getElementById('wipClose');
  var SEEN='noggiAstroSeen';
  if(!banner) return;
  if(sessionStorage.getItem(SEEN)){ banner.style.display='none'; return; }  // einmal pro Besuch
  sessionStorage.setItem(SEEN,'1');
  if(btn){
    btn.addEventListener('click',function(e){
      e.stopPropagation();
      banner.classList.add('wip-hidden');
      btn.blur();
      document.body.classList.remove('hov');
    },true);
  }
  // faded nach 5s von allein sanft aus
  setTimeout(function(){ banner.classList.add('wip-hidden'); },5000);
});


/* OPTION-A: Hintergrund-Parallax Startseite (Rückbau über fxa-Zeile) */
function initFxaParallax(){
  if(!document.documentElement.classList.contains('fxa'))return;
  if(window.matchMedia('(hover:none)').matches||window.innerWidth<=768)return;
  if(window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const bg=document.getElementById('bgCanvas');
  const blobs=Array.from(document.querySelectorAll('.about-blob'));
  if(bg){bg.style.willChange='transform';}
  const root=document.documentElement;
  (function loop(){
    const sy=window.scrollY;
    if(bg)bg.style.transform='translateY('+(sy*0.04)+'px) scale(1.06)';
    blobs.forEach((b,i)=>{b.style.transform='translateY('+(sy*(0.06+i*0.03))+'px)';});
    // Glow pulsiert sanft mit der Scroll-Position
    const g=0.18+Math.abs(Math.sin(sy*0.0011))*0.5;
    root.style.setProperty('--fxa-glow',g.toFixed(3));
    requestAnimationFrame(loop);
  })();
  // Work-Cards: dezenter 3D-Tilt zum Cursor (usta-Stil)
  document.querySelectorAll('.wc').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width-.5, py=(e.clientY-r.top)/r.height-.5;
      card.style.transform='translateY(-6px) perspective(900px) rotateX('+(-py*5)+'deg) rotateY('+(px*5)+'deg)';
    });
    card.addEventListener('mouseleave',()=>{card.style.transform='';});
  });
}
