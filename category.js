/* ═══════════════════════════════════════════
   noggi — Category subpage renderer
   Reads window.__NOGGI_CAT__ (slug) + content.json
═══════════════════════════════════════════ */
const isTouch = window.matchMedia('(hover:none)').matches || window.innerWidth <= 768;

const LOGO_PATHS = '<path d="M726.37,254.68c.35,3.17.58,12.46.38,24.96.38,42.32-30.12,76.42-73.43,76.51-32.06.07-60.29-19.53-70.65-50.19-.61-1.8.72-3.67,2.62-3.72l14.21-.39c1.17-.03,2.26.64,2.7,1.72,6.53,15.83,19.89,27.22,34.69,31.67,18.99,5.72,37.89,1.42,51.93-11.08,11.88-10.58,19.05-25.79,18.98-41.53l-.09-18.75c-16.53,17.39-38.2,25.31-61.32,23.39-28.74-2.39-53.15-20.73-62.67-48.13-8.55-24.61-3.47-51.25,12.94-71.31,15.77-19.28,40.84-29.51,66.7-26.37,28.22,3.42,52.33,21.95,61.21,49.23.58,1.79-.73,3.64-2.61,3.7l-14.14.48c-1.19.04-2.26-.68-2.73-1.78-6.09-14.52-17.16-24.92-32.07-30.3-27.8-10.04-58.34,3.22-69.92,30.03-11.52,26.68-.43,58.59,26.54,71.35,23.56,11.15,51.11,4.3,66.77-16.48l-15.51-16.02c-1.08-1.11-1.06-2.88.03-3.98l9.53-9.51c1.11-1.11,2.92-1.1,4.02.02,15.28,15.14,26.31,26.38,28.45,28.84.33.37,1.45,1.58,2.32,3.51.62,1.37.93,2.73,1.09,4.16Z"/><path d="M549.39,254.67c.35,3.17.58,12.46.38,24.96.38,42.32-30.12,76.42-73.43,76.51-32.06.07-60.29-19.53-70.65-50.19-.61-1.8.72-3.67,2.62-3.72l14.21-.39c1.17-.03,2.26.64,2.7,1.72,6.53,15.83,19.89,27.22,34.69,31.67,18.99,5.72,37.89,1.42,51.93-11.08,11.88-10.58,19.05-25.79,18.98-41.53l-.09-18.75c-16.53,17.4-38.2,25.31-61.32,23.39-28.74-2.39-53.15-20.73-62.67-48.13-8.55-24.61-3.47-51.25,12.94-71.31,15.77-19.28,40.84-29.51,66.7-26.37,28.22,3.42,52.33,21.95,61.21,49.23.58,1.79-.73,3.64-2.61,3.7l-14.14.48c-1.19.04-2.26-.68-2.73-1.78-6.09-14.52-17.16-24.92-32.07-30.3-27.8-10.04-58.34,3.22-69.92,30.03-11.52,26.68-.43,58.59,26.54,71.35,23.56,11.15,51.11,4.3,66.77-16.48l-15.51-16.02c-1.08-1.11-1.06-2.88.03-3.98l9.53-9.51c1.11-1.11,2.92-1.1,4.02.02,15.28,15.14,26.31,26.38,28.45,28.84.33.37,1.45,1.58,2.32,3.51.62,1.37.93,2.73,1.09,4.16Z"/><path d="M372.9,213.35c0,40.86-33.12,73.98-73.98,73.98s-73.98-33.12-73.98-73.98,33.12-73.98,73.98-73.98,73.98,33.12,73.98,73.98ZM354.3,213.35c0-30.6-24.8-55.4-55.4-55.4s-55.4,24.8-55.4,55.4,24.8,55.4,55.4,55.4,55.4-24.8,55.4-55.4Z"/><rect x="756.51" y="142.01" width="21.36" height="145.26" rx="2.83" ry="2.83"/><path d="M195.67,207.84v76.65c0,1.72-1.51,3.09-3.37,3.09h-15.62c-.94,0-1.77-.34-2.39-.9,0,0-.83-.77-.98-2.19-.2-1.7-.2-31.63-.06-72.8v-.04c0-.75.01-1.49.01-2.25v-.17c-.09-26.82-24-48.54-53.46-48.54-17.23,0-31.71,7.68-41.24,18.61-7.61,8.71-12.05,19.49-12.23,30.11.01,24.9.03,49.81.04,74.71,0,.59-.11,1.53-.76,2.26-1.03,1.15-2.83,1.12-3.74,1.11-3.1-.04-7.58,0-13.23,0-.34-.04-1.47-.2-2.44-1.11-.92-.88-1.13-1.9-1.18-2.24v-76.65c0-.88.02-1.77.05-2.64v-.02c1.54-35.91,33.91-64.58,73.63-64.58,3.49,0,6.92.22,10.28.66,36.47,3.13,65.19,30.5,66.64,64.28v.02c.03.88.05,1.77.05,2.64Z"/>';
function logoSVG(){return `<svg class="logo-svg" viewBox="36.50 63.50 759.50 301.50" xmlns="http://www.w3.org/2000/svg"><g fill="#0a0a0a">${LOGO_PATHS}</g><circle cx="767.19" cy="91.89" r="24.38" fill="#6f00ff"/></svg>`;}
function logoSVGLight(){return `<svg class="logo-svg" viewBox="36.50 63.50 759.50 301.50" xmlns="http://www.w3.org/2000/svg"><g fill="#EFEBE6">${LOGO_PATHS}</g><circle cx="767.19" cy="91.89" r="24.38" fill="#6f00ff"/></svg>`;}
const ICONS = {
  insta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 0 1 6.9 12.6l-.3.5.7 2.6-2.6-.7-.5.3A8.2 8.2 0 1 1 12 3.8zm-3 3.5c-.2 0-.5 0-.7.4-.2.4-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.8 4.3 3.8 2.1.8 2.5.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.7-.3s-1.1-.5-1.3-.6c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1s-1-.4-1.8-1.1c-.7-.6-1.1-1.3-1.3-1.5-.1-.2 0-.4.1-.5l.4-.4.3-.5v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-5.7-7-11a7 7 0 0 1 14 0c0 5.3-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  arrow: '<svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  back: '<svg viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
};

async function load(){
  let d = window.__NOGGI_CONTENT__ || null;
  if(!d){
    try { d = await (await fetch('content.json')).json(); }
    catch(e){ d = null; }
  }
  if(!d){ console.warn('noggi: no content'); return; }
  try {
    const slug = window.__NOGGI_CAT__;
    const cat = d.categories.find(c=>c.slug===slug);
    render(d, cat);
  } catch(err){ console.error('noggi render error:', err); }
}

function render(d, cat){
  // logos
  const navLogo=document.getElementById('navLogo'); if(navLogo){ navLogo.innerHTML=logoSVG(); navLogo.setAttribute('href','index.html'); }
  const footLogo=document.getElementById('footLogo'); if(footLogo){ footLogo.innerHTML=logoSVGLight(); footLogo.setAttribute('href','index.html'); }

  // contact in footer
  const c=d.contact;
  const footMeta=document.getElementById('footMeta');
  if(footMeta) footMeta.innerHTML=`
    <a href="mailto:${c.email}">${ICONS.mail}${c.email}</a>
    <a href="${c.instagram}" target="_blank" rel="noopener">${ICONS.insta}${c.instagramHandle}</a>
    <a href="${c.whatsapp}" target="_blank" rel="noopener">${ICONS.wa}${c.whatsappLabel}</a>
    <span class="addr">${ICONS.pin}${d.brand.location}</span>`;
  const impr=document.getElementById('lnkImpressum'); if(impr) impr.href=c.impressum;
  const agb=document.getElementById('lnkAgb'); if(agb) agb.href=c.agb;

  if(!cat){ document.getElementById('catTitle').textContent='Kategorie nicht gefunden'; return; }

  // header
  document.title = `${cat.name} \u2014 noggi`;
  document.getElementById('catEyebrow').textContent = 'Work';
  document.getElementById('catTitle').textContent = cat.name;
  document.getElementById('catIntro').innerHTML = cat.intro;
  if(cat.note){
    const intro=document.getElementById('catIntro');
    const note=document.createElement('div');
    note.className='cat-note';
    note.innerHTML='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg><span>'+cat.note+'</span><span class="cat-note-eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>';
    intro.parentNode.insertBefore(note, intro.nextSibling);
  }
  const back=document.getElementById('backLink');
  if(back) back.innerHTML=`${ICONS.back} Zurück zur Übersicht`;

  const grid=document.getElementById('projGrid');

  // ── Fullscreen-Scroll Layout (Lusion-Stil) ──
  if(cat.projects && cat.projects.length && cat.layout==='fullscroll'){
    renderFullscroll(cat.projects, grid, cat.slug);
    initUI();
    return;
  }

  // ── Unterkategorien-Übersicht ──
  if(cat.subcategories && cat.subcategories.length && d.categories){
    grid.className='subcat-grid';
    const subs = cat.subcategories.map(slug=>d.categories.find(c=>c.slug===slug)).filter(Boolean);
    grid.innerHTML = subs.map((sub,i)=>`
      <a href="${sub.slug}.html" class="subcat-card">
        <div class="subcat-img">
          <img src="${sub.cover}" alt="${sub.name}" loading="lazy">
        </div>
        <div class="subcat-overlay"></div>
        <div class="subcat-info">
          <span class="subcat-num">0${i+1}</span>
          <h2 class="subcat-title">${sub.name}</h2>
          <p class="subcat-intro">${sub.intro||''}</p>
          <span class="subcat-cta">Ansehen ${ICONS.arrow}</span>
        </div>
      </a>`).join('');
    initUI();
    return;
  }

  // ── Projekte-Liste ──────────────────────────────────────────
  if(cat.projects && cat.projects.length){
    grid.className='proj-cards';
    // Subkategorien gruppieren
    let lastSubcat='';
    grid.innerHTML = cat.projects.map((p,i)=>{
      const fit = p.fit==='contain' ? 'fit-contain' : 'fit-cover';
      const subcat = p.subcat||'';
      let subcatHtml='';
      if(subcat && subcat!==lastSubcat){
        subcatHtml=`<div class="proj-subcat">${subcat}</div>`;
        lastSubcat=subcat;
      }
      const toolsHtml = p.tools&&p.tools.length
        ? `<div class="pcard-tools"><span class="pcard-tools-label">Verwendete Programme</span>${p.tools.map(t=>`<span class="pcard-tool">${t}</span>`).join('')}</div>`
        : '';
      const descHtml = p.desc
        ? `<p class="pcard-desc">${p.desc.replace(/<br><br>/g,' ').replace(/<[^>]+>/g,'')}</p>`
        : '';
      return `${subcatHtml}
      <button class="pcard ${fit}" data-proj="${i}">
        <div class="pcard-img"><img src="${p.img}" alt="${p.title}" loading="lazy"></div>
        <div class="pcard-info">
          ${p.role?`<span class="pcard-role">${p.role}</span>`:''}
          <h2 class="pcard-title">${p.title}</h2>
          ${descHtml}
          ${toolsHtml}
          <span class="pcard-cta">Ansehen ${ICONS.arrow}</span>
        </div>
      </button>`;
    }).join('');
    setupDetail(cat.projects);
  } else {
    grid.className='proj-cards';
    grid.innerHTML = `<div class="proj-empty"><p>Diese Kategorie wird gerade bef\u00fcllt.</p><a href="index.html#work" class="btn-ghost">${ICONS.back} Zur \u00dcbersicht</a></div>`;
  }

  initUI();
}

function renderFullscroll(projects, container, slug){
  container.className='hs-wrap';
  container.innerHTML='';

  // Lusion-Stil: grosser Kategorie-Titel als Kapitelstart
  const pageTitle=document.querySelector('.cat-head h1');
  if(pageTitle){
    const hero=document.createElement('div');
    hero.className='cat-hero';
    const words=pageTitle.textContent.trim().split(/\s+/).map((w,wi)=>`<span class="chw" style="transition-delay:${.08+wi*.09}s">${w}</span>`).join(' ');
    hero.innerHTML=`<h2 class="cat-hero-title">${words}</h2>`;
    requestAnimationFrame(()=>requestAnimationFrame(()=>hero.classList.add('ch-in')));
    container.appendChild(hero);
  }

  projects.forEach((p,i)=>{
    const imgs=((p.gallery&&p.gallery.length)?p.gallery:[p.img]).filter(Boolean);
    const posters=((p.posters&&p.posters.length)?p.posters:[]).filter(Boolean);
    const videos=(p.videos&&p.videos.length)?p.videos:(p.vimeo?[p.vimeo]:[]);

    const section=document.createElement('section');
    section.className='hs-project msnry '+(p.stack?'stack ':'')+(p.fit==='contain'?'fit-contain':'fit-cover');

    const playSvg='<svg viewBox="0 0 24 24" fill="none"><path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor"/></svg>';
    const arAttr=p.videoAspect?` data-ar="${p.videoAspect}"`:'';
    const videoTiles=videos.map((vurl,vi)=>`<div class="hs-tile hs-slide-poster" data-vimeo="${vurl}"${arAttr}>${posters.length?`<img src="${posters[Math.min(vi,posters.length-1)]}" alt="${p.title}" class="hs-poster-bg">`:''}<div class="hs-poster-veil"></div><button class="hs-play" aria-label="Video abspielen">${playSvg}</button></div>`).join('');
    // Optionale feste Reihen-Aufteilung der Galerie (content.json: galleryRows, z.B. [2,3])
    const rowEnds=new Set();
    if(Array.isArray(p.galleryRows)&&p.galleryRows.length){ let acc=0; p.galleryRows.forEach(nn=>{ acc+=nn; rowEnds.add(acc-1); }); }
    const imgTiles=imgs.map((src,j)=>{
      const isVideo=src.endsWith('.mp4')||src.endsWith('.webm');
      let tile;
      if(isVideo){
        tile=`<div class="hs-tile"><video src="${src}" muted loop playsinline preload="none" data-lazyvideo></video></div>`;
      } else {
        tile=`<div class="hs-tile hs-img-tile"><img src="${src}" alt="${p.title}" loading="${i===0&&j===0?'eager':'lazy'}"></div>`;
      }
      if(rowEnds.has(j)&&j<imgs.length-1) tile+='<div class="jrow-break" aria-hidden="true"></div>';
      return tile;
    }).join('');

    let gridHTML;
    if(p.logoGroups&&p.logoGroups.length){
      gridHTML='<div class="hs-grid hs-logos">'+p.logoGroups.map(group=>
        '<div class="logo-row">'+group.map(src=>`<div class="logo-cell"><img src="${src}" alt="${p.title}" loading="lazy"></div>`).join('')+'</div>'
      ).join('')+'</div>';
    } else {
      const dAttr=(p.mediaMax?` data-media-max="${p.mediaMax}"`:'')+(p.mediaAlign?` data-media-align="${p.mediaAlign}"`:'')+(p.gallerySingleFull?` data-single-full="1"`:'')+(Array.isArray(p.galleryRowScale)?` data-row-scale='${JSON.stringify(p.galleryRowScale)}'`:'');
      gridHTML=`<div class="hs-grid"${dAttr}>${videoTiles}${imgTiles}</div>`;
    }

    section.innerHTML=`
      <div class="hs-head">
        <span class="hs-num">0${i+1}</span>
        ${p.role?`<span class="hs-role">${p.role}</span>`:''}
        <h2 class="hs-title">${p.title}</h2>
        <p class="hs-desc">${p.desc||''}</p>
      </div>
      ${gridHTML}`;
    container.appendChild(section);
  });

  // Back-to-Overview-Link am Ende (damit man nicht hochscrollen muss)
  const backBottom=document.createElement('div');
  backBottom.className='hs-back-bottom';
  const parentHref=(slug||'').startsWith('gd-')?'graphic-design.html':(slug||'').startsWith('ed-')?'editorial-design.html':(slug||'').startsWith('md-')?'motion.html':'index.html#work';
  backBottom.innerHTML=`<a href="${parentHref}" class="cat-back cat-back-bottom">${ICONS.back} Zurück zur Übersicht</a>`;
  container.appendChild(backBottom);

  setupDetail(projects);
  initLightbox();
  initVideoOverlay();
  initLazyVideos();
  initVimeoPosters();
  initMagnetic();
  initFxaParallax();
  addScrollHint();
  addPeekLabels();
  layoutAllGrids();
  initLoopsToast();
}

function addScrollHint(){ /* kein Hint nötig */ }

/* ─── UNIFORM GRID: gleichmässige, bündige Kacheln wie bei Studio-Portfolios ─── */
function tileAspect(t){
  if(t.dataset.ar) return parseFloat(t.dataset.ar);
  const pb=t.querySelector('.hs-poster-bg'); if(pb&&pb.naturalWidth) return pb.naturalWidth/pb.naturalHeight;
  const im=t.querySelector('.hs-img-tile img, img:not(.hs-poster-bg)'); if(im&&im.naturalWidth) return im.naturalWidth/im.naturalHeight;
  const vd=t.querySelector('video'); if(vd&&vd.videoWidth) return vd.videoWidth/vd.videoHeight;
  return t.classList.contains('hs-slide-poster')?(16/9):null;
}
function layoutGrid(grid){
  if(grid.classList.contains('hs-logos')) return;            // Logos separat (layoutLogos)
  const proj=grid.closest('.hs-project');
  const tiles=Array.from(grid.children).filter(c=>c.classList.contains('hs-tile'));
  if(!tiles.length) return;
  const stack=proj&&proj.classList.contains('stack');
  const w=window.innerWidth;
  const clearTile=t=>{ t.style.width=''; t.style.height=''; t.style.flex=''; };
  if(stack||w<=768){
    grid.className='hs-grid '+(stack?'jg-block jg-stack':'jg-block');
    tiles.forEach(t=>{ clearTile(t); const ar=tileAspect(t);
      t.style.aspectRatio=(t.classList.contains('hs-slide-poster')?(ar||16/9):''); });
    return;
  }
  const n=tiles.length;
  let sum=0,cnt=0; tiles.forEach(t=>{const a=tileAspect(t); if(a){sum+=a;cnt++;}});
  const avg=cnt?sum/cnt:(16/9);
  // Einzelnes Medium: echtes Format, gross, mittig
  if(n===1){
    const a=tileAspect(tiles[0])||avg;
    const mmaxRaw=grid.dataset.mediaMax || (a<0.85?'720px':(a<1.1?'1000px':'1280px'));
    const bleedMode=(mmaxRaw==='bleed')?'bleed':(mmaxRaw==='bleed-right')?'bleed-right':''; // viewport-breit
    grid.className='hs-grid uni one'+(bleedMode?(' '+bleedMode):(grid.dataset.mediaAlign==='left'?' align-left':''));
    grid.style.setProperty('--cols',1);
    grid.style.setProperty('--cell-ar', a);
    if(bleedMode) grid.style.removeProperty('--one-max');
    else grid.style.setProperty('--one-max', mmaxRaw);
    tiles.forEach(t=>{ clearTile(t); t.style.aspectRatio=''; });
    return;
  }
  // Reine Bild-Galerien (Poster, Editorial): KEIN Beschnitt -> justierte Reihen (gleiche Höhe, volle Breite)
  const hasVideo=tiles.some(t=>t.classList.contains('hs-slide-poster')||t.querySelector('video'));
  if(!hasVideo){
    grid.className='hs-grid jrows';
    grid.style.removeProperty('--cols'); grid.style.removeProperty('--cell-ar'); grid.style.removeProperty('--one-max');
    const W=grid.clientWidth, gap=16, targetH=360;
    if(!W){ tiles.forEach(clearTile); return; }
    // Feste Reihen, wenn jrow-break-Marker vorhanden sind (content.json: galleryRows)
    if(grid.querySelector('.jrow-break')){
      const groups=[]; let cur=[];
      Array.from(grid.children).forEach(c=>{
        if(c.classList.contains('jrow-break')){ if(cur.length){groups.push(cur);cur=[];} }
        else if(c.classList.contains('hs-tile')){ cur.push(c); }
      });
      if(cur.length) groups.push(cur);
      const singleFull = grid.dataset.singleFull==='1';
      let rowScale=[]; try{ rowScale=JSON.parse(grid.dataset.rowScale||'[]'); }catch(_){ rowScale=[]; }
      groups.forEach((rw,ri)=>{
        rw.forEach(t=>{ t.__ar=tileAspect(t)||1.4; });
        const arSum=rw.reduce((s,t)=>s+t.__ar,0)||1;
        let h=(W-gap*(rw.length-1))/arSum;          // Reihe füllt die volle Breite
        if(rw.length===1) h=Math.min(h, singleFull?Math.round(window.innerHeight*0.78):targetH*1.25);
        const sc=(typeof rowScale[ri]==='number'&&rowScale[ri]>0&&rowScale[ri]<=1)?rowScale[ri]:1;
        if(sc<1) h=Math.round(h*sc);               // Reihe gezielt verkleinern (content.json: galleryRowScale)
        let rowW=gap*(rw.length-1);
        rw.forEach(t=>{ const tw=Math.round(h*t.__ar); rowW+=tw; t.style.flex='0 0 auto'; t.style.margin='0'; t.style.height=Math.round(h)+'px'; t.style.width=tw+'px'; t.style.aspectRatio=''; });
        if(rowW < W-2){ rw[0].style.marginLeft='auto'; rw[rw.length-1].style.marginRight='auto'; } // schmalere Reihe (Einzelbild/skaliert) mittig
      });
      return;
    }
    let row=[],arSum=0;
    const flush=(last)=>{
      if(!row.length) return;
      let h=(W-gap*(row.length-1))/arSum;
      if(last){ const natW=arSum*targetH+gap*(row.length-1); h = natW>=W*0.7 ? Math.min(h,targetH*1.35) : targetH; }
      row.forEach(t=>{ t.style.flex='0 0 auto'; t.style.height=Math.round(h)+'px'; t.style.width=Math.round(h*t.__ar)+'px'; t.style.aspectRatio=''; });
      row=[]; arSum=0;
    };
    tiles.forEach(t=>{ const a=tileAspect(t)||1.4; t.__ar=a; arSum+=a; row.push(t); if(arSum*targetH+gap*(row.length-1)>=W) flush(false); });
    flush(true);
    return;
  }
  // Video-Projekte: grosses gleichmässiges Grid
  const cellAr = avg>1.2?'16 / 9' : (avg<0.82?'3 / 4':'1 / 1');
  const cols = avg<0.82 ? Math.min(3,n) : Math.min(2,n);
  grid.className='hs-grid uni';
  grid.style.removeProperty('--one-max');
  grid.style.setProperty('--cols',cols);
  grid.style.setProperty('--cell-ar',cellAr);
  tiles.forEach(t=>{ clearTile(t); t.style.aspectRatio=''; });
}
/* Logos: jede Marken-Reihe auf gleiche Höhe bringen (hoch + quer auf eine Linie, kein grosser Abstand) */
function layoutLogos(){
  const mobile=window.innerWidth<=768;
  document.querySelectorAll('.hs-grid.hs-logos').forEach(g=>{
    const W=g.clientWidth, gap=18;
    g.querySelectorAll('.logo-row').forEach(row=>{
      const cells=Array.from(row.children);
      if(mobile){ cells.forEach(c=>{c.style.width='';c.style.height='';}); return; }
      let arSum=0,ok=true; const ars=[];
      cells.forEach(c=>{ const im=c.querySelector('img'); const a=(im&&im.naturalWidth)?im.naturalWidth/im.naturalHeight:null; if(!a)ok=false; ars.push(a); if(a)arSum+=a; });
      if(!ok||!arSum||!W) return;
      const h=(W-gap*(cells.length-1))/arSum;
      cells.forEach((c,i)=>{ c.style.flex='0 0 auto'; c.style.height=Math.round(h)+'px'; c.style.width=Math.round(h*ars[i])+'px'; });
    });
  });
}
function layoutAllGrids(){ document.querySelectorAll('.hs-grid').forEach(layoutGrid); layoutLogos(); }
let _ljt; function scheduleLayout(){ clearTimeout(_ljt); _ljt=setTimeout(layoutAllGrids,60); }
window.addEventListener('resize',scheduleLayout,{passive:true});
window.addEventListener('load',scheduleLayout);
document.addEventListener('load',e=>{ if(e.target&&e.target.tagName==='IMG'){ const t=e.target.closest('.hs-tile'); if(t&&!t.dataset.ar&&e.target.naturalWidth) t.dataset.ar=e.target.naturalWidth/e.target.naturalHeight; scheduleLayout(); } },true);

/* ─── LOOPS-FIGUR: Astronaut sitzt in der Loops-Sektion, taucht beim Scrollen auf, reagiert auf Hover ─── */
var ASTRO_SVG='<svg class="lf-svg" viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><ellipse cx="30" cy="48" rx="14" ry="16" fill="#1a0a2e"/><ellipse cx="30" cy="48" rx="12" ry="14" fill="#2d1060" opacity=".8"/><circle cx="30" cy="26" r="15" fill="#1a0a2e"/><circle cx="30" cy="26" r="13" fill="#0d0020"/><ellipse cx="30" cy="27" rx="9" ry="8" fill="#7B2FFF" opacity=".35"/><ellipse cx="30" cy="27" rx="9" ry="8" fill="none" stroke="#7B2FFF" stroke-width="1.2"/><circle cx="26" cy="26" r="2.5" fill="#7B2FFF" opacity=".9"/><circle cx="34" cy="26" r="2.5" fill="#7B2FFF" opacity=".9"/><circle cx="26.8" cy="25.2" r="1" fill="#fff" opacity=".7"/><circle cx="34.8" cy="25.2" r="1" fill="#fff" opacity=".7"/><ellipse cx="17" cy="44" rx="5" ry="7" fill="#2d1060"/><ellipse cx="43" cy="44" rx="5" ry="7" fill="#2d1060"/><rect x="8" y="46" width="9" height="4" rx="2" fill="#1a0a2e" transform="rotate(15,8,48)"/><rect x="43" y="46" width="9" height="4" rx="2" fill="#1a0a2e" transform="rotate(-15,52,48)"/><circle cx="10" cy="54" r="3.5" fill="#7B2FFF" opacity=".8"/><circle cx="50" cy="54" r="3.5" fill="#7B2FFF" opacity=".8"/><rect x="22" y="62" width="7" height="11" rx="3.5" fill="#1a0a2e"/><rect x="31" y="62" width="7" height="11" rx="3.5" fill="#1a0a2e"/><ellipse cx="25.5" cy="73" rx="6" ry="3.5" fill="#7B2FFF" opacity=".7"/><ellipse cx="34.5" cy="73" rx="6" ry="3.5" fill="#7B2FFF" opacity=".7"/><line x1="30" y1="11" x2="30" y2="6" stroke="#7B2FFF" stroke-width="1.2"/><circle cx="30" cy="5" r="2" fill="#7B2FFF" opacity=".9"/><circle cx="30" cy="5" r="3.5" fill="#7B2FFF" opacity=".2"/></svg>';
function initLoopsToast(){
  if((window.__NOGGI_CAT__||'')!=='vj-sets') return;
  const sections=Array.from(document.querySelectorAll('.hs-project'));
  if(!sections.length) return;
  // Die Loops sind das Projekt "Visuals"; Fallback: Sektion mit den meisten Video-Postern
  let section=sections.find(s=>{ const t=s.querySelector('.hs-title'); return t && /visuals/i.test(t.textContent); });
  if(!section){
    section=sections.slice().sort((a,b)=>b.querySelectorAll('.hs-slide-poster').length-a.querySelectorAll('.hs-slide-poster').length)[0];
  }
  if(!section) return;
  const head=section.querySelector('.hs-head');
  if(!head || head.querySelector('.loops-figure')) return;
  section.classList.add('has-loops-figure');
  const msg='Mit Ton erleben: Die Visuals reagieren auf Sound und bewegen sich im Rhythmus der Musik.';
  // Kopf-Inhalt in eine Textspalte packen, Astronaut + Ton-Hinweis daneben stellen
  const txt=document.createElement('div'); txt.className='lf-head-text';
  while(head.firstChild) txt.appendChild(head.firstChild);
  const fig=document.createElement('div');
  fig.className='loops-figure';
  fig.innerHTML='<div class="lf-bubble">'+msg+'</div>'+ASTRO_SVG;
  head.classList.add('lf-head');
  head.appendChild(txt);
  head.appendChild(fig);
}

function addPeekLabels(){
  // Ein \u2193-Pfeil pro Projekt (ausser letztem) — gleiche Optik wie Carousel-Pfeile
  const sections=Array.from(document.querySelectorAll('.hs-project'));
  sections.forEach((section,i)=>{
    if(i>=sections.length-1) return;
    const next=sections[i+1];
    const inner=section.querySelector('.hs-row')||section.querySelector('.hs-inner');
    if(!inner) return;
    const wrap=document.createElement('button');
    wrap.className='next-proj-btn';
    wrap.setAttribute('aria-label','Zum n\u00e4chsten Projekt');
    wrap.innerHTML='<span class="npb-circle">&#8595;</span><span class="npb-label">N\u00e4chstes Projekt</span>';
    wrap.addEventListener('click',()=>next.scrollIntoView({behavior:'smooth',block:'start'}));
    inner.insertAdjacentElement('afterend',wrap);
  });
}

function initLightbox(){
  // Lightbox-Container erstellen
  let lb = document.getElementById('lb-overlay');
  if(!lb){
    lb = document.createElement('div');
    lb.id = 'lb-overlay';
    lb.className = 'lb-overlay';
    lb.innerHTML = `
      <button class="lb-close" id="lbClose">&times;</button>
      <button class="lb-nav lb-prev" id="lbPrev">&#8592;</button>
      <img id="lbImg" src="" alt="">
      <button class="lb-nav lb-next" id="lbNext">&#8594;</button>`;
    document.body.appendChild(lb);
  }

  const lbImg = lb.querySelector('#lbImg');
  const lbClose = lb.querySelector('#lbClose');
  const lbPrev = lb.querySelector('#lbPrev');
  const lbNext = lb.querySelector('#lbNext');
  let imgs = []; let idx = 0;

  function open(allImgs, startIdx){
    imgs = allImgs; idx = startIdx;
    lbImg.src = imgs[idx];
    lb.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
    lbPrev.style.display = imgs.length > 1 ? '' : 'none';
    lbNext.style.display = imgs.length > 1 ? '' : 'none';
  }
  function close(){
    lb.classList.remove('lb-open');
    document.body.style.overflow = '';
  }
  function prev(){ idx = (idx - 1 + imgs.length) % imgs.length; lbImg.src = imgs[idx]; }
  function next(){ idx = (idx + 1) % imgs.length; lbImg.src = imgs[idx]; }

  lbClose.addEventListener('click', close);
  lb.addEventListener('click', e => { if(e.target === lb) close(); });
  lbPrev.addEventListener('click', e => { e.stopPropagation(); prev(); });
  lbNext.addEventListener('click', e => { e.stopPropagation(); next(); });
  document.addEventListener('keydown', e => {
    if(!lb.classList.contains('lb-open')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowLeft') prev();
    if(e.key === 'ArrowRight') next();
  });

  // Bild-Kacheln öffnen die Lightbox (alle Geräte; Videos sind ausgenommen)
  document.querySelectorAll('.hs-project').forEach(section => {
    const imgEls = section.querySelectorAll('.hs-tile img:not(.hs-poster-bg), .hs-logos .logo-cell img');
    const allSrcs = Array.from(imgEls).map(i => i.getAttribute('src'));
    imgEls.forEach((img, i) => {
      const tile = img.closest('.hs-tile') || img.closest('.logo-cell');
      const target = tile || img;
      if(tile) tile.classList.add('hs-zoomable');
      target.addEventListener('click', e => {
        e.stopPropagation();
        open(allSrcs, i);
      });
    });
  });
}

function initTextReveal(){
  // Scroll-basiert statt IntersectionObserver (sticky-kompatibel)
  const sections=document.querySelectorAll('.hs-project');
  if(!sections.length) return;
  function checkReveal(){
    sections.forEach(section=>{
      const inner=section.querySelector('.hs-inner');
      if(!inner) return;
      const rect=section.getBoundingClientRect();
      // Sichtbar wenn Section oben im Viewport angekommen ist
      if(rect.top < window.innerHeight*0.85 && rect.bottom > 0){
        inner.classList.add('hs-visible');
      }
    });
  }
  window.addEventListener('scroll',checkReveal,{passive:true});
  checkReveal(); // sofort prüfen
}

function initHorizontalScroll(){
  const sections=document.querySelectorAll('.hs-project');
  if(!sections.length) return;

  sections.forEach((section)=>{
    const track=section.querySelector('.hs-track');
    const counter=section.querySelector('.hs-counter span');
    const right=section.querySelector('.hs-right');
    if(!track||!right) return;

    const slides=track.querySelectorAll('.hs-slide');
    const count=slides.length;
    let idx=0;
    if(count<=1) return;

    // Pfeil-Buttons erzeugen — als Control-Bar UNTERHALB des Bildes (kein Overlap)
    const btnPrev=document.createElement('button');
    btnPrev.className='hs-arr hs-arr-prev';
    btnPrev.innerHTML='&#8592;';
    btnPrev.setAttribute('aria-label','Vorheriges Bild');

    const btnNext=document.createElement('button');
    btnNext.className='hs-arr hs-arr-next';
    btnNext.innerHTML='&#8594;';
    btnNext.setAttribute('aria-label','Nächstes Bild');

    // Pfeile platzieren: Desktop = neben der Box; Touch (iPad/mobil) = Overlay direkt auf dem Bild
    const inner=section.querySelector('.hs-inner');
    const row=document.createElement('div');
    row.className='hs-row';
    inner.parentNode.insertBefore(row,inner);
    row.appendChild(inner);
    if(isTouch){
      btnPrev.classList.add('hs-arr-overlay');
      btnNext.classList.add('hs-arr-overlay');
      right.appendChild(btnPrev);
      right.appendChild(btnNext);
    } else {
      row.insertBefore(btnPrev,inner);
      row.appendChild(btnNext);
    }

    function goTo(n){
      idx=Math.max(0,Math.min(count-1,n));
      const slideW=right.offsetWidth;
      track.style.transition='transform .5s cubic-bezier(.16,1,.3,1)';
      track.style.transform=`translateX(${-idx*slideW}px)`;
      if(counter) counter.textContent=idx+1;
      btnPrev.style.opacity=idx===0?'0.25':'1';
      btnPrev.style.pointerEvents=idx===0?'none':'';
      btnNext.style.opacity=idx===count-1?'0.25':'1';
      btnNext.style.pointerEvents=idx===count-1?'none':'';
    }

    btnPrev.addEventListener('click',e=>{e.stopPropagation();goTo(idx-1);});
    btnNext.addEventListener('click',e=>{e.stopPropagation();goTo(idx+1);});

    // Keyboard-Navigation wenn Section im Viewport
    document.addEventListener('keydown',e=>{
      const rect=section.getBoundingClientRect();
      if(rect.top>window.innerHeight||rect.bottom<0) return;
      if(e.key==='ArrowRight') goTo(idx+1);
      if(e.key==='ArrowLeft') goTo(idx-1);
    });

    // Resize: Position neu berechnen
    window.addEventListener('resize',()=>{
      track.style.transition='none';
      const slideW=right.offsetWidth;
      track.style.transform=`translateX(${-idx*slideW}px)`;
    });

    // Touch-Swipe (iPad + mobil): horizontal wischen blättert
    let sx=0,sy=0,swMoved=false,swActive=false;
    track.addEventListener('touchstart',e=>{
      if(e.touches.length!==1)return;
      sx=e.touches[0].clientX;sy=e.touches[0].clientY;swMoved=false;swActive=true;
    },{passive:true});
    track.addEventListener('touchmove',e=>{
      if(!swActive)return;
      const dx=e.touches[0].clientX-sx, dy=e.touches[0].clientY-sy;
      if(Math.abs(dx)>8&&Math.abs(dx)>Math.abs(dy)) swMoved=true;
    },{passive:true});
    track.addEventListener('touchend',e=>{
      if(!swActive)return;swActive=false;
      const t=e.changedTouches[0];
      const dx=t.clientX-sx, dy=t.clientY-sy;
      if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)) goTo(dx<0?idx+1:idx-1);
    },{passive:true});
    // Wisch nicht als Bild-Klick (Lightbox) werten
    track.addEventListener('click',e=>{ if(swMoved){e.stopPropagation();e.preventDefault();swMoved=false;} },true);

    goTo(0);
  });
}

function setupDetail(projects){
  let ov=document.getElementById('detail');
  if(!ov){
    ov=document.createElement('div'); ov.id='detail'; ov.className='detail';
    ov.innerHTML=`<button class="detail-close" id="detailClose" aria-label="Schliessen">&times;</button><div class="detail-scroll"><div class="detail-inner" id="detailInner"></div></div>`;
    document.body.appendChild(ov);
  }
  const inner=ov.querySelector('#detailInner');
  let isOpen=false;
  function open(p){
    if(isOpen) return;
    const imgs=(p.gallery&&p.gallery.length)?p.gallery:[p.img];
    const fit = p.fit==='contain' ? 'fit-contain' : 'fit-cover';
    inner.innerHTML=`
      <div class="detail-head">
        ${p.role?`<span class="detail-role">${p.role}</span>`:''}
        <h2 class="detail-title">${p.title}</h2>
        ${p.desc?`<div class="detail-desc">${p.desc}</div>`:''}
        ${p.tools&&p.tools.length?`<div class="detail-tools"><span class="detail-tools-label">Verwendete Programme</span><div class="detail-tools-list">${p.tools.map(t=>`<span class="tool">${t}</span>`).join('')}</div></div>`:''}
      </div>
      <div class="detail-images">${imgs.map(g=>`<div class="detail-img ${fit}"><img src="${g}" alt="${p.title}" loading="lazy"></div>`).join('')}</div>`;
    ov.classList.add('open'); document.body.style.overflow='hidden';
    ov.querySelector('.detail-scroll').scrollTop=0;
    isOpen=true;
  }
  function close(){
    if(!isOpen) return;
    ov.classList.remove('open'); document.body.style.overflow='';
    isOpen=false;
  }
  // Close-Button: einmalig binden
  const closeBtn=ov.querySelector('#detailClose')||ov.querySelector('.detail-close');
  if(closeBtn){ closeBtn.onclick=null; closeBtn.addEventListener('click',close,{capture:true}); }
  ov.addEventListener('click',(e)=>{ if(e.target===ov) close(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
  document.querySelectorAll('.pcard').forEach(el=>{
    el.addEventListener('click',()=>open(projects[+el.dataset.proj]));
  });
}

function initUI(){
  // cursor (desktop only)
  if(!isTouch){
    const cur=document.getElementById('cur'),cur2=document.getElementById('cur2');
    if(cur&&cur2){
      let mx=0,my=0,rx=0,ry=0;
      document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
      (function loop(){const tf='translate3d('+mx+'px,'+my+'px,0) translate(-50%,-50%)';cur.style.transform=tf;cur2.style.transform=tf;requestAnimationFrame(loop);})();
      document.querySelectorAll('a,button,.pcard').forEach(el=>{
        el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));
        el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'));
      });
    }
  }
  // reveal on scroll
  const obs=new IntersectionObserver(en=>en.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.04,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.rv').forEach(el=>obs.observe(el));
  // nav scrolled state
  const nav=document.getElementById('nav');
  if(nav) window.addEventListener('scroll',()=>{nav.classList.toggle('sc',window.scrollY>60);},{passive:true});
  // bg canvas
  try{ initBg(); }catch(e){}
}

function updateVideoPlaying(){
  var p=!!document.querySelector('.hs-slide-poster.hs-playing')
    ||!!document.querySelector('#vlb-overlay.vlb-open')
    ||Array.prototype.some.call(document.querySelectorAll('video[data-lazyvideo]'),function(v){return !v.paused&&!v.ended;});
  document.body.classList.toggle('video-playing',p);
}
window.__noggiUpdateVideoPlaying=updateVideoPlaying;
function initLazyVideos(){
  var vids=document.querySelectorAll('video[data-lazyvideo]'); if(!vids.length)return;
  var io=new IntersectionObserver(function(ents){ents.forEach(function(e){var v=e.target;
    if(e.isIntersecting){if(v.paused){var pr=v.play();if(pr&&pr.catch)pr.catch(function(){});}}
    else if(!v.paused){v.pause();}
    updateVideoPlaying();
  });},{threshold:.25});
  vids.forEach(function(v){ if(v.__lzo)return; v.__lzo=true; io.observe(v);
    v.addEventListener('play',updateVideoPlaying); v.addEventListener('pause',updateVideoPlaying); });
}

function initBg(){
  const canvas=document.getElementById('bgCanvas'); if(!canvas) return;
  const ctx=canvas.getContext('2d'); let W,H,DPR;
  function resize(){DPR=Math.min(window.devicePixelRatio||1,2);W=window.innerWidth;H=window.innerHeight;canvas.width=W*DPR;canvas.height=H*DPR;canvas.style.width=W+'px';canvas.style.height=H+'px';ctx.setTransform(DPR,0,0,DPR,0,0);}
  resize();window.addEventListener('resize',resize);
  function blob(cx,cy,rx,ry,pts,phase,tt){ctx.beginPath();for(let i=0;i<=pts;i++){const a=(i/pts)*Math.PI*2;const n=Math.sin(a*3+tt+phase)*.14+Math.sin(a*5+tt*1.5+phase)*.08;const bx=cx+(rx*(1+n))*Math.cos(a),by=cy+(ry*(1+n))*Math.sin(a);i===0?ctx.moveTo(bx,by):ctx.lineTo(bx,by);}ctx.closePath();}
  const pts=[{x:.2,y:.3,rx:.3,ry:.28,phase:0,speed:1},{x:.78,y:.55,rx:.2,ry:.24,phase:2.2,speed:1.35},{x:.5,y:.8,rx:.16,ry:.18,phase:4.5,speed:1.7}];
  let t=0,_last=0;
  function draw(now){
    requestAnimationFrame(draw);
    if(document.hidden||document.body.classList.contains('video-playing'))return; // bei laufendem Video pausieren -> kein Ruckeln
    if(now-_last<33)return;            // ~30fps reicht fuer die langsamen Blobs, halbiert die Last
    _last=now;
    ctx.clearRect(0,0,W,H);t+=.028;const base='123,47,255';
    pts.forEach((s,i)=>{blob(W*s.x,H*s.y,W*s.rx,H*s.ry,80,s.phase,t*s.speed);const g=ctx.createRadialGradient(W*s.x,H*s.y,0,W*s.x,H*s.y,W*s.rx);const a=(i===0?.11:.07)*1.4;g.addColorStop(0,`rgba(${base},${a})`);g.addColorStop(1,`rgba(${base},0)`);ctx.fillStyle=g;ctx.fill();blob(W*s.x,H*s.y,W*s.rx,H*s.ry,80,s.phase,t*s.speed);ctx.strokeStyle=`rgba(${base},${(i===0?.3:.2)})`;ctx.lineWidth=i===0?2.4:1.7;ctx.stroke();});
  }
  requestAnimationFrame(draw);
}

load();


/* ─── VIDEO-OVERLAY (Vimeo im Vollbild, lusion-Stil) ─── */
function initVideoOverlay(){
  let vlb=document.getElementById('vlb-overlay');
  if(!vlb){
    vlb=document.createElement('div');
    vlb.id='vlb-overlay';
    vlb.className='vlb-overlay';
    vlb.innerHTML='<button class="vlb-close" aria-label="Schliessen">&times;</button><div class="vlb-frame"></div>';
    document.body.appendChild(vlb);
  }
  const frame=vlb.querySelector('.vlb-frame');
  const closeBtn=vlb.querySelector('.vlb-close');
  function open(url){
    frame.innerHTML='<iframe src="'+url+'?autoplay=1&title=0&byline=0&portrait=0&color=7B2FFF" frameborder="0" allow="autoplay;fullscreen;picture-in-picture" allowfullscreen></iframe>';
    vlb.classList.add('vlb-open');
    document.body.style.overflow='hidden';
    updateVideoPlaying();
  }
  function close(){
    vlb.classList.remove('vlb-open');
    document.body.style.overflow='';
    updateVideoPlaying();
    setTimeout(()=>{frame.innerHTML='';},350); // Video stoppt beim Schliessen
  }
  closeBtn.addEventListener('click',close);
  vlb.addEventListener('click',e=>{if(e.target===vlb)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&vlb.classList.contains('vlb-open'))close();});
  document.querySelectorAll('.hs-slide-poster').forEach(slide=>{
    let posterHTML=slide.innerHTML;
    slide.__setPosterHTML=function(html){ posterHTML=html; };
    function bindPoster(){
      const btn=slide.querySelector('.hs-play');
      if(btn)btn.addEventListener('click',ev=>{ev.stopPropagation();playInline();});
    }
    function restorePoster(){
      slide.classList.remove('hs-playing');
      slide.innerHTML=posterHTML;
      bindPoster();
      updateVideoPlaying();
    }
    slide.__restorePoster=restorePoster;
    function playInline(){
      if(slide.classList.contains('hs-playing'))return;
      const url=slide.getAttribute('data-vimeo');
      if(!url)return;
      slide.classList.add('hs-playing');
      slide.innerHTML='<iframe src="'+url+'?autoplay=1&api=1&title=0&byline=0&portrait=0&color=7B2FFF" frameborder="0" allow="autoplay;fullscreen;picture-in-picture" allowfullscreen></iframe>'+
        '<button class="hs-expand" aria-label="Vollbild öffnen"><svg viewBox="0 0 24 24" fill="none"><path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>';
      const ex=slide.querySelector('.hs-expand');
      ex.addEventListener('click',ev=>{
        ev.stopPropagation();
        restorePoster();
        open(url);
      });
      updateVideoPlaying();
    }
    slide.addEventListener('click',e=>{
      e.stopPropagation();
      playInline();
    });
    bindPoster();
  });

  // Vimeo: wenn ein Inline-Video zu Ende ist, wieder Poster + Play zeigen (keine Vorschläge)
  if(!window.__noggiVimeoEnd){
    window.__noggiVimeoEnd=true;
    window.addEventListener('message',function(e){
      if(typeof e.origin!=='string'||e.origin.indexOf('vimeo.com')<0)return;
      let data; try{data=typeof e.data==='string'?JSON.parse(e.data):e.data;}catch(_){return;}
      if(!data||!data.event)return;
      if(data.event==='ready'){
        try{e.source.postMessage(JSON.stringify({method:'addEventListener',value:'finish'}),'*');}catch(_){}
        try{e.source.postMessage(JSON.stringify({method:'addEventListener',value:'ended'}),'*');}catch(_){}
        return;
      }
      if(data.event==='finish'||data.event==='ended'){
        document.querySelectorAll('.hs-slide-poster.hs-playing').forEach(function(sl){
          const ifr=sl.querySelector('iframe');
          if(ifr&&ifr.contentWindow===e.source&&sl.__restorePoster)sl.__restorePoster();
        });
      }
    });
  }
}


/* ─── VIMEO-VORSCHAUBILD automatisch holen (nur wo kein eigenes Poster gesetzt ist) ─── */
function initVimeoPosters(){
  // Kacheln mit eigenem Poster: Format vom Bild übernehmen
  document.querySelectorAll('.hs-slide-poster > .hs-poster-bg').forEach(img=>{
    const slide=img.closest('.hs-slide-poster');
    const apply=()=>{ if(img.naturalWidth&&img.naturalHeight){ slide.dataset.ar=img.naturalWidth/img.naturalHeight; if(window.scheduleLayout)scheduleLayout(); } };
    if(img.complete) apply(); else img.addEventListener('load',apply,{once:true});
  });
  document.querySelectorAll('.hs-slide-poster').forEach(slide=>{
    if(slide.querySelector('.hs-poster-bg')) return;           // manuelles Poster vorhanden -> Vorrang
    const url=slide.getAttribute('data-vimeo')||'';
    const m=url.match(/video\/(\d+)/);
    if(!m) return;
    const id=m[1];
    fetch('https://vimeo.com/api/oembed.json?url=https://vimeo.com/'+id+'&width=640')
      .then(r=>r.ok?r.json():null)
      .then(data=>{
        if(!data) return;
        if(data.width&&data.height){ slide.dataset.ar=data.width/data.height; if(window.scheduleLayout)scheduleLayout(); }
        if(!data.thumbnail_url) return;
        if(slide.querySelector('.hs-poster-bg')) return;
        const img=document.createElement('img');
        img.className='hs-poster-bg'; img.alt=''; img.loading='lazy';
        img.src=data.thumbnail_url;
        slide.insertBefore(img, slide.firstChild);
        // damit das Poster nach dem Abspielen wieder erscheint
        if(slide.__setPosterHTML) slide.__setPosterHTML(slide.innerHTML);
      })
      .catch(()=>{});                                          // privat/nicht abrufbar -> Verlauf+Play bleibt
  });
}

/* ─── MAGNETISCHE BUTTONS (lusion-Stil, nur Desktop) ─── */
function initMagnetic(){
  if(window.matchMedia('(hover:none)').matches||window.innerWidth<=768)return;
  document.querySelectorAll('.hs-arr,.next-proj-btn,.hs-play,.cat-back').forEach(el=>{
    const base='';
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect();
      const dx=(e.clientX-(r.left+r.width/2))/r.width;
      const dy=(e.clientY-(r.top+r.height/2))/r.height;
      el.style.transform=base+'translate('+(dx*7)+'px,'+(dy*7)+'px)';
    });
    el.addEventListener('mouseleave',()=>{el.style.transform='';});
  });
}


/* OPTION-A: Hintergrund-Parallax (Rückbau über fxa-Zeile) */
function initFxaParallax(){
  if(!document.documentElement.classList.contains('fxa'))return;
  if(window.matchMedia('(hover:none)').matches||window.innerWidth<=768)return;
  if(window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const bg=document.getElementById('bgCanvas');
  if(bg){bg.style.willChange='transform';}
  (function loop(){
    const sy=window.scrollY;
    if(bg)bg.style.transform='translateY('+(sy*0.04)+'px) scale(1.06)';
    requestAnimationFrame(loop);
  })();
}
