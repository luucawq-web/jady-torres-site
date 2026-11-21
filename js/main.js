/* Jady Torres — experiência principal */
{
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const WHATS = 'https://wa.me/message/WZYAGXBBEI6EK1';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isDesktop = () => matchMedia('(min-width: 900px)').matches;
  const store = {
    get(k){ try { return sessionStorage.getItem(k); } catch(e){ return null; } },
    set(k,v){ try { sessionStorage.setItem(k,v); } catch(e){} }
  };
  /* fotos: aparecem com fade assim que carregam */
  const markLoaded = root => $$('.cmp img, .shot__img img', root).forEach(img => {
    const on = () => { img.classList.add('ok'); img.parentNode.classList.add('ready'); };
    img.complete && img.naturalWidth ? on() : img.addEventListener('load', on, { once: true });
  });
  markLoaded(document);
  window.__markLoaded = markLoaded;
  const intro = $('#intro');
  const hd = $('#hd');
  const tabbar = $('.tabbar');
  window.__glz = [];

  /* ---------------- procedimentos (conteúdo) ---------------- */
  const PROCS = [
    { group:'Manchas · Linha Porcelana' },
    { id:'pp', star:true, name:'Pele de Porcelana', tag:'Manchas, melasma e sardas no rosto', img:'assets/img/proc-pele-de-porcelana.webp',
      desc:'O método autoral de Jady Torres para manchas faciais, melasma e sardas. É aplicado em etapas, com ativos profissionais, uma fase de renovação da pele e acompanhamento durante todo o processo.',
      meta:'Presencial no RioMar Trade Center ou em Condado.', more:{label:'Conhecer o método', href:'#porcelana'} },
    { id:'corpo', name:'Pele de Porcelana Corporal', tag:'Manchas no corpo', img:'assets/img/proc-corporal.webp',
      desc:'A proposta do método aplicada às manchas do corpo, como as das costas, para uniformizar o tom da pele.',
      meta:'As áreas tratadas são definidas na avaliação.' },
    { id:'intimo', name:'Pele de Porcelana Íntimo', tag:'Clareamento da região íntima', img:'',
      desc:'Protocolo para manchas escuras da região íntima, para uma pele mais uniforme, com acompanhamento durante o processo.',
      meta:'Atendimento reservado, com indicação definida na avaliação.' },
    { id:'bumbum', name:'Bumbum de Porcelana', tag:'Manchas, foliculite e marcas de atrito', img:'assets/img/proc-bumbum.webp',
      desc:'Tratamento para manchas, foliculite e marcas de atrito no bumbum, para uma pele mais lisa e uniforme.',
      meta:'Indicação definida na avaliação.' },
    { id:'kit', name:'Kit Pele de Porcelana', tag:'Em casa · envio para todo o Brasil', img:'assets/img/proc-kit.webp',
      desc:'O método em cinco passos para fazer em casa, com orientação e acompanhamento por chamada de vídeo.',
      meta:'Disponibilidade e condições informadas pela equipe.' },
    { group:'Rosto e pele' },
    { id:'limpeza', name:'Limpeza de Pele Profunda Skin Glow', tag:'Limpeza profunda e luminosidade', img:'',
      desc:'Limpeza de pele profunda que higieniza, remove impurezas e devolve luminosidade à pele.',
      meta:'Frequência indicada na avaliação.' },
    { id:'koreana', name:'Koreana Glow', tag:'Ritual facial 5 em 1', img:'',
      desc:'Protocolo inspirado nos rituais de beleza coreanos que higieniza, refina, bioestimula, ilumina e renova a pele, para um efeito de pele luminosa e uniforme.',
      meta:'Realizado na clínica.' },
    { id:'micro', name:'Microderme', tag:'Cicatrizes de acne e outras cicatrizes', img:'assets/img/proc-microderme.webp',
      desc:'Protocolo focado na regeneração da pele para suavizar cicatrizes de acne e outras marcas, com pele mais lisa e uniforme.',
      meta:'Número de sessões definido na avaliação.' },
    { id:'sinal', name:'Remoção de Sinal', tag:'Sinais na pele', img:'',
      desc:'Remoção de sinais da pele, com avaliação prévia de cada caso.',
      meta:'Indicação definida na avaliação.' },
    { id:'lift', name:'Porcelana Lift', tag:'Flacidez do pescoço', img:'assets/img/proc-porcelana-lift.webp',
      desc:'Procedimento sem cortes que estimula a produção natural de colágeno para firmar a pele do pescoço e suavizar as rugas da região.',
      meta:'Indicação definida na avaliação.' },
    { id:'blefaro', name:'Blefaroplastia sem corte', tag:'Pálpebras caídas', img:'assets/img/proc-blefaroplastia.webp',
      desc:'Procedimento minimamente invasivo, sem cortes e sem cicatrizes, que estimula o colágeno para reduzir a flacidez das pálpebras.',
      meta:'Indicação definida na avaliação.' },
    { group:'Lábios' },
    { id:'lips', name:'Micropigmentação Labial', tag:'Lips Glow', img:'assets/img/proc-lips-glow.webp',
      desc:'Micropigmentação para lábios com cor mais viva e definida, com a técnica Lips Glow. A durabilidade informada pela profissional é de 2 a 4 anos.',
      meta:'A durabilidade varia conforme a pele e os cuidados.' },
    { id:'neutra', name:'Neutralização Labial', tag:'Lábios escurecidos', img:'assets/img/proc-neutralizacao-labial.webp',
      desc:'Suaviza a pigmentação escura dos lábios e realça a cor natural, com resultado sutil.',
      meta:'Indicação definida na avaliação.' },
    { group:'Sobrancelhas' },
    { id:'nano', name:'Micropigmentação de Sobrancelhas', tag:'NanoBrown · fios ultrarrealistas', img:'',
      desc:'Micropigmentação com a técnica NanoBrown: fios finos e detalhados que se misturam às sobrancelhas naturais, para corrigir falhas e realçar o olhar sem aspecto carregado.',
      meta:'Número de sessões definido na avaliação.' },
    { id:'color', name:'Color Brown', tag:'Cor e desenho das sobrancelhas', img:'',
      desc:'Técnica Color Brown para realçar a cor e o desenho das sobrancelhas.',
      meta:'Indicação definida na avaliação.' },
    { id:'brown', name:'Brown Up', tag:'Laminação de sobrancelhas', img:'',
      desc:'Remodela e alinha os fios para sobrancelhas mais cheias e organizadas. O efeito informado é de 4 a 6 semanas.',
      meta:'Indicação definida na avaliação.' }
  ];
  const imgOk = {};
  const probe = src => new Promise(res => { const i = new Image(); i.onload = () => res(true); i.onerror = () => res(false); i.src = src; });
  const exists = src => location.protocol.startsWith('http') ? fetch(src, { method: 'HEAD' }).then(r => r.ok && !/text\/html/.test(r.headers.get('content-type') || '')).catch(() => probe(src)) : probe(src);

  const list = $('#procList');
  list.innerHTML = PROCS.map(p => p.group ? `<li class="proc__group" aria-hidden="false"><span>${p.group}</span></li>` : `
    <li class="pr${p.star ? ' is-star' : ''}" data-id="${p.id}">
      <button class="pr__btn" type="button" aria-expanded="false" aria-controls="pr-${p.id}">
        <span class="pr__name">${p.name}</span>
        <span class="pr__tag"><span class="pr__tagT">${p.tag}</span><span class="pr__plus" aria-hidden="true"></span></span>
      </button>
      <div class="pr__body" id="pr-${p.id}" role="region" aria-label="${p.name}">
        <div class="pr__bodyIn"><div class="pr__grid">
          <div class="pr__img${p.img ? '' : ' is-empty'}">${p.img ? `<img src="${p.img}" alt="${p.name}" loading="lazy" decoding="async" onerror="this.parentNode.classList.add('is-empty')">` : ''}<span class="pr__imgT">${p.name}</span></div>
          <div class="pr__txt">
            <p>${p.desc}</p>
            <p class="pr__meta">${p.tag} · ${p.meta}</p>
            <div class="pr__acts">
              <a class="btn btn--ink" href="${WHATS}" target="_blank" rel="noopener">Agendar avaliação</a>
              ${p.more ? `<a class="btn btn--line" href="${p.more.href}">${p.more.label}</a>`
                       : `<a class="btn btn--line" href="${WHATS}" target="_blank" rel="noopener">Pedir informações</a>`}
            </div>
          </div>
        </div></div>
      </div>
    </li>`).join('');
  const whenNear = (el, fn) => {
    if (!el) return fn();
    let fired = false;
    const check = () => {
      if (fired || el.getBoundingClientRect().top > innerHeight + 1400) return;
      fired = true; removeEventListener('scroll', check); fn();
    };
    addEventListener('scroll', check, { passive: true });
    check();
  };
  whenNear($('#porcelana'), () => PROCS.filter(p => p.img).forEach(p => probe(p.img).then(ok => imgOk[p.id] = ok)));

  $$('.pr__btn', list).forEach(btn => btn.addEventListener('click', () => {
    const li = btn.closest('.pr');
    const open = !li.classList.contains('is-open');
    $$('.pr.is-open', list).forEach(o => { if (o !== li) { o.classList.remove('is-open'); $('.pr__btn', o).setAttribute('aria-expanded', 'false'); } });
    li.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    setTimeout(() => window.ScrollTrigger && ScrollTrigger.refresh(), 850);
  }));

  /* ---------------- antes e depois (só aparece com fotos autorizadas) ---------------- */
  const BA_LABELS = { 7: '3 anos depois' };
  whenNear($('#estudio'), async () => {
    const pairs = [];
    /* quantidade de pares em assets/resultados (antes-N.webp + depois-N.webp) */
    const BA_COUNT = 10;
    for (let k = 1; k <= BA_COUNT; k++) pairs.push([`assets/resultados/antes-${k}.webp`, `assets/resultados/depois-${k}.webp`]);
    if (!pairs.length) return;
    $('#baGrid').innerHTML = pairs.map(([a, d], i) => `
      <div class="cmp">
        <img src="${a}" alt="Antes do tratamento, paciente ${i + 1}" decoding="async">
        <img class="cmp__after" src="${d}" alt="Depois do tratamento, paciente ${i + 1}" decoding="async">
        <span class="cmp__bar"></span><span class="cmp__knob" aria-hidden="true">⟷</span>
        <span class="cmp__tag cmp__tag--a">Antes</span><span class="cmp__tag cmp__tag--b">${BA_LABELS[i + 1] || 'Depois'}</span>
        <input type="range" min="0" max="100" value="50" aria-label="Comparar antes e depois, paciente ${i + 1}">
      </div>`).join('');
    $$('.cmp input').forEach(r => r.addEventListener('input', () => r.parentNode.style.setProperty('--x', r.value + '%')));
    const g = $('#baGrid');
    $$('.ba__nav button').forEach(b => b.addEventListener('click', () => {
      const step = (g.firstElementChild?.offsetWidth || 300) + 20;
      g.scrollBy({ left: b.dataset.dir === 'next' ? step : -step, behavior: reduce ? 'auto' : 'smooth' });
    }));
    $('#ba').hidden = false;
    window.__markLoaded && window.__markLoaded($('#baGrid'));
    $$('#baGrid img').forEach(img => img.addEventListener('error', () => img.closest('.cmp')?.remove(), { once: true }));
    window.ScrollTrigger && ScrollTrigger.refresh();
  });

  /* ---------------- sem GSAP: experiência estática completa ---------------- */
  if (!window.gsap || !window.ScrollTrigger) {
    intro.classList.add('is-done');
    tabbar.classList.add('is-in');
    document.documentElement.classList.add('no-motion');
  } else {

  gsap.registerPlugin(ScrollTrigger);

  /* ---------------- rolagem suave ---------------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollToTarget = (hash) => {
    const el = hash === '#topo' ? 0 : $(hash);
    if (el === null) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.6, offset: 0 });
    else if (el === 0) scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const h = a.getAttribute('href');
    if (h.length < 2) return;
    e.preventDefault();
    if (document.body.classList.contains('menu-open')) { closeMenu(() => scrollToTarget(h)); }
    else scrollToTarget(h);
  });

  /* ---------------- abertura ---------------- */
  const heroLines = $$('.hero__l > span');
  const hdMono = $('#hdMono');
  const playIntro = () => {
    const done = () => { intro.classList.add('is-done'); tabbar.classList.add('is-in'); };
    const seen = document.documentElement.classList.contains('intro-seen');
    try { localStorage.setItem('jt-intro', '1'); } catch (e) {}
    store.set('jt-intro', '1');
    if (seen || reduce) { done(); return; }
    intro.addEventListener('animationend', e => { if (e.target === intro) done(); });
    setTimeout(done, 1600);
    const skip = () => { intro.style.animation = 'introOut .2s ease forwards'; };
    $('.intro__skip').addEventListener('click', skip);
    intro.addEventListener('click', e => { if (e.target === intro) skip(); });
  };
  /* o retrato pode já ter carregado antes deste script */
  { const i = $('.hero__pic--a img'); if (i && i.complete && i.naturalWidth) $('#heroPics').classList.add('is-loaded'); }

  /* ---------------- cabeçalho ---------------- */
  const monoProg = $('.mono__prog');
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => monoProg.style.strokeDashoffset = (138.2 * (1 - s.progress)).toFixed(2) });
  ScrollTrigger.create({ start: () => innerHeight * .6, end: 'max', toggleClass: { targets: hd, className: 'is-docked' } });
  let heroDark = false;
  const darkSecs = $$('.edu, .book, .ft' + (reduce ? ', .hero' : ''));
  const paintHd = () => {
    const over = darkSecs.some(sec => { const r = sec.getBoundingClientRect(); return r.top <= 44 && r.bottom > 44; });
    hd.classList.toggle('on-dark', over || heroDark);
  };
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: paintHd, onRefresh: paintHd });

  /* ---------------- menu ---------------- */
  const menu = $('#menu');
  const toggles = [$('#menuBtn'), ...$$('[data-menu-toggle]')];
  let lastFocus = null, menuTl = null;
  const openMenu = () => {
    lastFocus = document.activeElement;
    menu.hidden = false;
    document.body.classList.add('menu-open');
    toggles.forEach(t => t.setAttribute('aria-expanded', 'true'));
    lenis && lenis.stop();
    const btn = toggles.find(t => t.offsetParent) || toggles[0];
    const r = btn.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    menuTl && menuTl.kill();
    menuTl = gsap.timeline();
    menuTl.fromTo('.menu__bg', { clipPath: `circle(0px at ${cx}px ${cy}px)` }, { clipPath: `circle(${Math.hypot(innerWidth, innerHeight)}px at ${cx}px ${cy}px)`, duration: reduce ? .01 : .9, ease: 'expo.inOut' })
      .fromTo('.menu__links a span', { yPercent: 110 }, { yPercent: 0, duration: reduce ? .01 : .9, ease: 'expo.out', stagger: .05 }, reduce ? 0 : .35)
      .fromTo('.menu__aside > div', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .6, stagger: .08 }, reduce ? 0 : .55);
    setTimeout(() => { const f = $('.menu__links a'); f && f.focus({ preventScroll: true }); }, reduce ? 0 : 450);
  };
  const closeMenu = (after) => {
    toggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
    menuTl && menuTl.kill();
    gsap.timeline({ onComplete: () => {
      menu.hidden = true; document.body.classList.remove('menu-open'); lenis && lenis.start();
      if (typeof after === 'function') after(); else if (lastFocus) lastFocus.focus({ preventScroll: true });
    } })
      .to('.menu__links a span', { yPercent: -110, duration: reduce ? .01 : .45, ease: 'power3.in', stagger: .03 })
      .to('.menu__aside > div', { opacity: 0, duration: .25 }, 0)
      .to('.menu__bg', { clipPath: 'circle(0px at 50% 0%)', duration: reduce ? .01 : .7, ease: 'expo.inOut' }, reduce ? 0 : .2);
  };
  toggles.forEach(t => t.addEventListener('click', () => menu.hidden ? openMenu() : closeMenu()));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) closeMenu();
    if (e.key === 'Tab' && !menu.hidden) {
      const f = [...$$('a,button', menu), ...toggles.filter(t => t.offsetParent)];
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ---------------- hero: retratos controlados pela rolagem ---------------- */
  const hero = $('.hero');

  const mm = gsap.matchMedia();
  mm.add({ d: '(min-width: 900px)', m: '(max-width: 899px)', rm: '(prefers-reduced-motion: reduce)' }, (ctx) => {
    const { d, rm } = ctx.conditions;
    if (rm) return;
    const tl = gsap.timeline({ defaults: { ease: 'none' } });
    gsap.set('#heroPics', { transformOrigin: '50% 100%' });
    tl.fromTo('#heroPics', { scale: .9, y: d ? 24 : 30 }, { scale: 1, y: 0, duration: .6, ease: 'power1.inOut' }, 0)
      .fromTo('.hero__glow', { scale: .75, opacity: .55 }, { scale: 1.15, opacity: 1, duration: .7 }, 0)
      .to('.hero__l--1', { xPercent: -30, opacity: 0, duration: .32 }, .04)
      .to('.hero__l--2', { xPercent: -20, opacity: 0, duration: .32 }, .08)
      .to('.hero__l--3', { yPercent: -60, opacity: 0, duration: .32 }, .12)
      .to(['.hero__sign', '.hero__cue'], { opacity: 0, duration: .1 }, 0)
      .to('.hero__pic--a', { opacity: 0, duration: .22, ease: 'power1.inOut' }, .4)
      .fromTo('.hero__pic--b', { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: .26, ease: 'power1.inOut' }, .38)
      .fromTo('.hero__over--a', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .15, ease: 'power2.out' }, .5)
      .fromTo('.hero__over--b', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .12, ease: 'power2.out' }, .7)
      .to({}, { duration: .1 });
    ScrollTrigger.create({
      trigger: hero, start: 'top top', end: 'bottom bottom', animation: tl, scrub: d ? .6 : .3,
    });
  });

  /* ---------------- estúdio ---------------- */
  const track = $('#studioTrack');
  mm.add({ d: '(min-width: 900px) and (prefers-reduced-motion: no-preference)', m: '(max-width: 899px) and (prefers-reduced-motion: no-preference)' }, (ctx) => {
    if (ctx.conditions.d) {
      const dist = () => Math.max(0, track.scrollWidth - innerWidth);
      const move = gsap.to(track, { x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: '.studio__pin', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } });
      $$('.shot', track).forEach(s => {
        gsap.fromTo($('.shot__img', s), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
          scrollTrigger: { trigger: s, containerAnimation: move, start: 'left 95%', end: 'left 55%', scrub: true } });
        gsap.fromTo($('.shot__img > *', s), { xPercent: -7 }, { xPercent: 7, ease: 'none',
          scrollTrigger: { trigger: s, containerAnimation: move, start: 'left right', end: 'right left', scrub: true } });
      });
      $$('.studio__note, .studio__end', track).forEach(n => gsap.from(n.children, { opacity: 0, y: 40, stagger: .08, ease: 'none',
        scrollTrigger: { trigger: n, containerAnimation: move, start: 'left 90%', end: 'left 60%', scrub: true } }));
    } else {
      $$('.shot', track).forEach(s => {
        gsap.fromTo($('.shot__img', s), { clipPath: 'inset(0% 50% 0% 50%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: s, start: 'top 85%' } });
        gsap.fromTo($('.shot__img > *', s), { scale: 1.35 }, { scale: 1.12, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: s, start: 'top 85%' } });
      });
      $$('.studio__intro, .studio__note, .studio__end').forEach(n => gsap.from(n.children, { opacity: 0, y: 30, duration: 1, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: n, start: 'top 85%' } }));
    }
  });
  const sv = $('.shot video');
  if (sv) {
    const vio = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { if (sv.preload === 'none') { sv.preload = 'auto'; sv.load(); } if (!reduce) sv.play().catch(() => {}); }
      else sv.pause();
    }), { rootMargin: '200px' });
    vio.observe(sv);
  }

  /* ---------------- Pele de Porcelana ---------------- */
  const ppGL = new PorcelainGL($('#ppGL'), { palette: ['#FBF8F5', '#F2E5DF', '#E3C7BD'], still: reduce, observe: $('.pp') });
  window.__glz.push(ppGL); ppGL.start();
  ScrollTrigger.create({ trigger: '.pp', start: 'top bottom', end: 'bottom top', onUpdate: s => ppGL.set(s.progress), onToggle: s => $('#ppGL').classList.toggle('is-on', s.isActive) });

  $$('.pp__row').forEach((row, r) => {
    row.innerHTML = [...row.textContent].map((c, i) => c === ' ' ? ' ' : `<span class="ch" style="animation-delay:${(i * .07 + r * .25).toFixed(2)}s">${c}</span>`).join('');
  });
  if (!reduce) {
    gsap.timeline({ scrollTrigger: { trigger: '.pp__open', start: 'top 65%' } })
      .from('.pp__kicker', { opacity: 0, y: 20, duration: 1, ease: 'power3.out' })
      .from('.pp__row .ch', { opacity: 0, yPercent: 40, filter: 'blur(14px)', duration: 1.4, ease: 'expo.out', stagger: { each: .045, from: 'center' } }, .1)
      .from('.pp__sub', { opacity: 0, y: 20, duration: 1, ease: 'power3.out' }, .8);
    gsap.to('.pp__title', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '.pp__open', start: 'top top', end: 'bottom top', scrub: true } });
  }

  const steps = $$('.dish__steps li');
  mm.add({ d: '(min-width: 900px) and (prefers-reduced-motion: no-preference)', m: '(max-width: 899px) and (prefers-reduced-motion: no-preference)' }, (ctx) => {
    if (ctx.conditions.d) {
      gsap.to('.dish__ring circle', { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.pp__texts', start: 'top center', end: 'bottom center', scrub: true } });
      gsap.fromTo('#dish', { '--a': '0deg', rotate: -8, scale: .92 }, { '--a': '300deg', rotate: 8, scale: 1, ease: 'none', scrollTrigger: { trigger: '.pp__chapters', start: 'top bottom', end: 'bottom top', scrub: true } });
      $$('.chap').forEach((c, i) => {
        ScrollTrigger.create({ trigger: c, start: 'top center', end: 'bottom center',
          onToggle: s => { if (s.isActive) steps.forEach((li, j) => li.classList.toggle('on', j === i)); } });
        gsap.from(c.children, { opacity: 0, y: 50, stagger: .08, ease: 'none', scrollTrigger: { trigger: c, start: 'top 85%', end: 'top 45%', scrub: true } });
      });
    } else {
      $$('.chap').forEach(c => gsap.from(c.children, { opacity: 0, y: 30, duration: 1, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 80%' } }));
    }
    /* etapas */
    const path = $('.steps__path path');
    if (ctx.conditions.d && path) {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      const st = gsap.timeline({ scrollTrigger: { trigger: '#steps', start: 'top 70%', end: 'bottom 75%', scrub: .5 } });
      st.to(path, { strokeDashoffset: 0, duration: 1, ease: 'none' }, 0);
      $$('.steps__list li').forEach((li, i) => {
        st.from($('.steps__dot', li), { scale: 0, duration: .08 }, i * .18)
          .from([...li.children].slice(1), { opacity: 0, y: 26, duration: .14, stagger: .03 }, i * .18 + .03);
      });
    } else {
      $$('.steps__list li').forEach(li => gsap.from(li, { opacity: 0, x: -20, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: li, start: 'top 85%' } }));
      gsap.fromTo('.steps__list', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', ease: 'none', scrollTrigger: { trigger: '.steps__list', start: 'top 80%', end: 'bottom 70%', scrub: true } });
    }
    /* ciclo */
    const n = $('#cycleN'); const obj = { v: 0 };
    gsap.timeline({ scrollTrigger: { trigger: '#cycle', start: 'top 80%', end: 'center 50%', scrub: .4 } })
      .fromTo('.cycle__arc', { strokeDashoffset: 628.3 }, { strokeDashoffset: 0, ease: 'none' }, 0)
      .fromTo(obj, { v: 1 }, { v: 15, ease: 'none', onUpdate: () => n.textContent = Math.round(obj.v) }, 0);
    gsap.from('.cycle__txt > *', { opacity: 0, y: 30, stagger: .1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '#cycle', start: 'top 65%' } });
    gsap.from('.pp__cta > *', { opacity: 0, y: 40, stagger: .1, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.pp__cta', start: 'top 75%' } });
  });

  /* botões magnéticos */
  if (finePointer && !reduce) $$('.btn--mag').forEach(b => {
    const xTo = gsap.quickTo(b, 'x', { duration: .6, ease: 'power3' }), yTo = gsap.quickTo(b, 'y', { duration: .6, ease: 'power3' });
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * .3); yTo((e.clientY - r.top - r.height / 2) * .4); });
    b.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });

  /* ---------------- procedimentos ---------------- */
  if (!reduce) {
    gsap.from('.proc__head > *', { opacity: 0, y: 40, stagger: .1, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.proc__head', start: 'top 80%' } });
    gsap.from('.pr', { opacity: 0, yPercent: 60, stagger: .08, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '#procList', start: 'top 85%' } });
  }
  if (finePointer && !reduce) {
    const fl = $('.proc__float'), flIn = $('.proc__floatIn');
    const fx = gsap.quickTo(fl, 'x', { duration: .7, ease: 'power3' }), fy = gsap.quickTo(fl, 'y', { duration: .7, ease: 'power3' });
    let shown = false;
    const show = (on) => { if (on === shown) return; shown = on; gsap.to(fl, { opacity: on ? 1 : 0, scale: on ? 1 : .8, duration: .5, ease: 'power3.out' }); };
    $$('.pr__btn', list).forEach(btn => {
      const p = PROCS.find(x => x.id === btn.closest('.pr').dataset.id);
      btn.addEventListener('click', () => show(false));
      btn.addEventListener('pointerenter', () => {
        if (btn.closest('.pr').classList.contains('is-open')) return;
        if (!p.img || imgOk[p.id] === false) return show(false);
        flIn.style.backgroundImage = `url("${p.img}")`; flIn.textContent = '';
        show(true);
      });
      btn.addEventListener('pointerleave', () => show(false));
    });
    list.addEventListener('pointermove', e => { fx(e.clientX + 190); fy(e.clientY); });
  }

  /* ---------------- formação ---------------- */
  if (!reduce) {
    const t = $('.edu__t');
    t.innerHTML = t.innerHTML.replace(/(<em>.*<\/em>)|([^\s<]+)/g, (m) => `<span style="display:inline-block">${m}</span>`);
    gsap.from('.edu__t > span', { opacity: 0, rotateX: -80, yPercent: 60, transformOrigin: '50% 100%', stagger: .08, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.edu', start: 'top 70%' } });
    gsap.from(['.edu .label', '.edu__in > p:not(.label)', '.edu .btn'], { opacity: 0, y: 20, stagger: .1, duration: 1, delay: .3, scrollTrigger: { trigger: '.edu', start: 'top 70%' } });
  }

  /* ---------------- instagram: letreiro com velocidade da rolagem ---------------- */
  const marq = gsap.to('.ig__track', { xPercent: -50, ease: 'none', duration: 30, repeat: -1 });
  if (reduce) marq.pause();
  else ScrollTrigger.create({ trigger: '.ig', start: 'top bottom', end: 'bottom top',
    onUpdate: s => { const v = gsap.utils.clamp(-6, 6, s.getVelocity() / 300); gsap.to(marq, { timeScale: (v < 0 ? -1 : 1) * (1 + Math.abs(v)), duration: .2, overwrite: true, onComplete: () => gsap.to(marq, { timeScale: v < 0 ? -1 : 1, duration: 1.2 }) }); } });

  /* ---------------- agendar + rodapé ---------------- */
  if (!reduce) {
    gsap.from('.book__lead > *', { opacity: 0, y: 50, stagger: .1, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.book', start: 'top 70%' } });
    gsap.from('.place', { opacity: 0, x: 60, stagger: .1, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.book__places', start: 'top 80%' } });
    gsap.from('.ft__word span', { yPercent: 110, stagger: .045, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.ft__word', start: 'top 92%' } });
  }

  /* ---------------- cursor ---------------- */
  if (finePointer && !reduce) {
    const c = $('.cursor'), cl = $('.cursor__label');
    const cx = gsap.quickTo(c, 'x', { duration: .25, ease: 'power3' }), cy = gsap.quickTo(c, 'y', { duration: .25, ease: 'power3' });
    addEventListener('pointermove', e => { cx(e.clientX); cy(e.clientY); c.style.opacity = 1; }, { passive: true });
    document.addEventListener('pointerover', e => {
      const t = e.target.closest('[data-cursor]');
      c.classList.toggle('is-big', !!t);
      cl.textContent = t ? t.dataset.cursor : '';
    });
    document.addEventListener('pointerleave', () => c.style.opacity = 0);
  }

  /* ---------------- start ---------------- */
  playIntro();
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh());
  }
}
