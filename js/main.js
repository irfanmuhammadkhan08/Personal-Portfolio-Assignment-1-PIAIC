/* ============================================================
   main.js — Immersive 3D Portfolio
   Irfan Muhammad Khan — AI Developer & Problem Solver
   Three.js neural network + cinematic animations
   ============================================================ */
'use strict';

const IS_MOBILE = window.innerWidth < 768;
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   LOADER
   ============================================================ */
function initLoader() {
  const loader = document.getElementById('loader');
  const fill   = document.getElementById('loader-fill');
  if (!loader || !fill) return;

  let progress = 0;
  const target  = 100;
  const duration = 1600; // ms
  const start    = performance.now();

  function updateFill(ts) {
    const elapsed  = ts - start;
    const pct      = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - pct, 3);
    progress       = ease * target;
    fill.style.width = progress + '%';

    if (pct < 1) {
      requestAnimationFrame(updateFill);
    } else {
      // Fade out loader
      loader.style.transition = 'opacity 0.5s ease';
      loader.style.opacity    = '0';
      setTimeout(() => {
        loader.style.display = 'none';
        triggerHeroReveal();
      }, 500);
    }
  }

  requestAnimationFrame(updateFill);
}

/* ============================================================
   HERO REVEAL — staggered entrance animations
   ============================================================ */
function triggerHeroReveal() {
  if (REDUCED_MOTION) return;

  const els = [
    '.hero-badge',
    '.hero-title',
    '.hero-subtitle',
    '.hero-description',
    '.hero-cta',
    '.hero-stats',
    '.hero-visual'
  ];

  els.forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity   = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.08}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`;
    requestAnimationFrame(() => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    });
  });
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
function initCustomCursor() {
  if (IS_MOBILE || REDUCED_MOTION) return;

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;
  let rafId;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animateCursor() {
    // Dot: instant
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';

    // Ring: smooth lag
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';

    rafId = requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover states
  const interactives = 'a, button, .project-card, .skill-card, .contact-method, .filter-btn, .tech-tag';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactives)) ring.classList.add('hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactives)) ring.classList.remove('hover');
  });
  document.addEventListener('mousedown', () => ring.classList.add('clicking'));
  document.addEventListener('mouseup',   () => ring.classList.remove('clicking'));
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
}

/* ============================================================
   THREE.JS NEURAL NETWORK BACKGROUND
   ============================================================ */
function initNeuralNetwork() {
  if (typeof THREE === 'undefined') return;
  if (REDUCED_MOTION) return;

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const W = () => canvas.parentElement.offsetWidth || window.innerWidth;
  const H = () => canvas.parentElement.offsetHeight || window.innerHeight;

  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(60, W() / H(), 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !IS_MOBILE });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, IS_MOBILE ? 1 : 1.5));
  renderer.setSize(W(), H());

  // ── Particle count based on device ──
  const PC = IS_MOBILE ? 50 : 120;
  const CONNECT_DIST = IS_MOBILE ? 9 : 13;

  const positions  = new Float32Array(PC * 3);
  const velocities = [];

  for (let i = 0; i < PC; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    velocities.push(
      (Math.random() - 0.5) * 0.025,
      (Math.random() - 0.5) * 0.025,
      (Math.random() - 0.5) * 0.012
    );
  }

  // Points (nodes)
  const ptGeo = new THREE.BufferGeometry();
  ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const ptMat = new THREE.PointsMaterial({
    color: 0x00d4ff, size: IS_MOBILE ? 0.25 : 0.35,
    transparent: true, opacity: 0.85,
    blending: THREE.AdditiveBlending, sizeAttenuation: true
  });

  const points = new THREE.Points(ptGeo, ptMat);
  scene.add(points);

  // Lines (connections)
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x00d4ff, transparent: true, opacity: 0.12,
    blending: THREE.AdditiveBlending
  });
  let linesMesh = null;

  function updateConnections() {
    const pos  = ptGeo.attributes.position.array;
    const verts = [];

    for (let i = 0; i < PC; i++) {
      for (let j = i + 1; j < PC; j++) {
        const dx = pos[i*3]   - pos[j*3];
        const dy = pos[i*3+1] - pos[j*3+1];
        const dz = pos[i*3+2] - pos[j*3+2];
        const d  = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (d < CONNECT_DIST) {
          verts.push(pos[i*3], pos[i*3+1], pos[i*3+2]);
          verts.push(pos[j*3], pos[j*3+1], pos[j*3+2]);
        }
      }
    }

    if (linesMesh) { scene.remove(linesMesh); linesMesh.geometry.dispose(); }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
    linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(linesMesh);
  }

  // ── Mouse parallax ──
  let mouseX = 0, mouseY = 0;
  let targetRX = 0, targetRY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    targetRY =  mouseX * 0.25;
    targetRX = -mouseY * 0.15;
  }, { passive: true });

  // ── Animation loop ──
  let frame = 0;
  function animate() {
    requestAnimationFrame(animate);
    frame++;

    const pos = ptGeo.attributes.position.array;
    for (let i = 0; i < PC; i++) {
      pos[i*3]     += velocities[i*3];
      pos[i*3 + 1] += velocities[i*3 + 1];
      pos[i*3 + 2] += velocities[i*3 + 2];

      if (Math.abs(pos[i*3])     > 30) velocities[i*3]     *= -1;
      if (Math.abs(pos[i*3+1])   > 20) velocities[i*3 + 1] *= -1;
      if (Math.abs(pos[i*3+2])   > 15) velocities[i*3 + 2] *= -1;
    }
    ptGeo.attributes.position.needsUpdate = true;

    if (frame % (IS_MOBILE ? 5 : 3) === 0) updateConnections();

    // Smooth camera rotation
    scene.rotation.y += (targetRY - scene.rotation.y) * 0.025;
    scene.rotation.x += (targetRX - scene.rotation.x) * 0.025;

    renderer.render(scene, camera);
  }
  animate();

  // ── Resize ──
  window.addEventListener('resize', () => {
    camera.aspect = W() / H();
    camera.updateProjectionMatrix();
    renderer.setSize(W(), H());
  }, { passive: true });
}

/* ============================================================
   NAVBAR
   ============================================================ */
function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    let active = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) active = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + active);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  if (!hamburger || !navMenu) return;

  const close = () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('active');
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navMenu.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', close));
  document.addEventListener('keydown',  e => { if (e.key === 'Escape') close(); });
  document.addEventListener('click', e => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) close();
  });
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    bar.style.width = ((h.scrollTop || document.body.scrollTop) / (h.scrollHeight - h.clientHeight) * 100) + '%';
  }, { passive: true });
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================================================
   TYPING EFFECT
   ============================================================ */
function initTypingEffect() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = [
    'Agentic AI Systems',
    'Intelligent Chatbots',
    'LLM-Powered Apps',
    'Multi-Agent Workflows',
    'RAG Pipelines',
    'Prompt Engineering',
    'AI Automation'
  ];

  let pi = 0, ci = 0, deleting = false, delay = 120;

  const type = () => {
    const phrase = phrases[pi];
    if (deleting) {
      el.textContent = phrase.substring(0, ci - 1);
      ci--; delay = 55;
    } else {
      el.textContent = phrase.substring(0, ci + 1);
      ci++; delay = 120;
    }

    if (!deleting && ci === phrase.length) { delay = 2200; deleting = true; }
    else if (deleting && ci === 0)         { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }

    setTimeout(type, delay);
  };

  setTimeout(type, 900);
}

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-count'));
      const start  = performance.now();
      const dur    = 1800;

      const step = ts => {
        const t = Math.min((ts - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.floor(ease * target);
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };

      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ============================================================
   SKILL BARS
   ============================================================ */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-progress[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.getAttribute('data-width') + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => observer.observe(b));
}

/* ============================================================
   SCROLL-TRIGGERED REVEAL ANIMATIONS
   ============================================================ */
function initScrollReveal() {
  // Generic reveal elements
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

  // Skill cards stagger
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const idx = Array.from(entry.target.parentElement.children).indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 80);
        skillObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.skill-card').forEach(el => skillObs.observe(el));

  // Timeline items
  const timelineObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const idx = Array.from(entry.target.parentElement.children).indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 120);
        timelineObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.timeline-item').forEach(el => timelineObs.observe(el));
}

/* ============================================================
   PROJECT CARD 3D TILT EFFECT
   ============================================================ */
function initProjectCardTilt() {
  if (IS_MOBILE || REDUCED_MOTION) return;

  const applyTilt = card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;

      card.style.transform = `perspective(900px) rotateX(${y * -10}deg) rotateY(${x * 10}deg) scale(1.02)`;

      const glow = card.querySelector('.card-glow');
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(0,212,255,0.1), transparent 60%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
      const glow = card.querySelector('.card-glow');
      if (glow) glow.style.background = '';
    });
  };

  // Apply to existing and future cards
  document.querySelectorAll('.project-card').forEach(applyTilt);

  // MutationObserver for dynamically added cards
  const gridEl = document.getElementById('projects-grid');
  if (gridEl) {
    new MutationObserver(muts => {
      muts.forEach(m => m.addedNodes.forEach(n => {
        if (n.nodeType === 1 && n.classList.contains('project-card')) applyTilt(n);
      }));
    }).observe(gridEl, { childList: true });
  }
}

/* ============================================================
   PROJECT FILTERS
   ============================================================ */
function initProjectFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', function () {
      btns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');
      document.querySelectorAll('.project-card').forEach((card, i) => {
        const cat  = card.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;

        if (show) {
          card.classList.remove('hidden');
          card.style.opacity   = '0';
          card.style.transform = 'translateY(24px) scale(0.97)';
          setTimeout(() => {
            card.classList.add('visible');
            card.style.opacity   = '';
            card.style.transform = '';
          }, i * 60);
        } else {
          card.classList.add('hidden');
          card.classList.remove('visible');
        }
      });
    });
  });
}

/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */
const Toast = (() => {
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };

  function show(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fas ${icons[type]} toast-icon ${type}" aria-hidden="true"></i>
      <span class="toast-message">${message}</span>
      <button class="toast-close" aria-label="Dismiss"><i class="fas fa-times" aria-hidden="true"></i></button>
    `;

    const close = () => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    };

    toast.querySelector('.toast-close').addEventListener('click', close);
    container.appendChild(toast);
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
    if (duration > 0) setTimeout(close, duration);
  }

  return { show };
})();

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const msgInput = document.getElementById('message');
  const charEl   = document.getElementById('char-count');
  const MAX      = 1000;

  if (msgInput && charEl) {
    msgInput.addEventListener('input', () => {
      const len = msgInput.value.length;
      charEl.textContent = `${len} / ${MAX}`;
      charEl.style.color = len > MAX * 0.9 ? (len >= MAX ? 'var(--color-error)' : 'var(--color-warning)') : '';
      if (len > MAX) msgInput.value = msgInput.value.substring(0, MAX);
    });
  }

  const required = form.querySelectorAll('input[required], textarea[required]');
  required.forEach(inp => {
    inp.addEventListener('blur',  () => validate(inp));
    inp.addEventListener('input', () => clearErr(inp));
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    let ok = true;
    required.forEach(inp => { if (!validate(inp)) ok = false; });
    if (!ok) { Toast.show('Please fix the errors before submitting.', 'error'); return; }
    await submitForm();
  });

  function validate(field) {
    const val = field.value.trim();
    clearErr(field);
    if (field.required && !val) { showErr(field, `${getLabel(field)} is required.`); return false; }
    if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { showErr(field, 'Please enter a valid email address.'); return false; }
    const min = parseInt(field.getAttribute('minlength'));
    if (min && val.length < min) { showErr(field, `${getLabel(field)} must be at least ${min} characters.`); return false; }
    if (val) field.classList.add('valid');
    return true;
  }

  function showErr(field, msg) {
    field.classList.add('error'); field.classList.remove('valid');
    field.setAttribute('aria-invalid', 'true');
    let el = field.closest('.form-group')?.querySelector('.error-message');
    if (!el) { el = document.createElement('span'); el.className = 'error-message'; field.closest('.form-group')?.appendChild(el); }
    el.textContent = msg;
  }

  function clearErr(field) {
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
    field.closest('.form-group')?.querySelector('.error-message')?.remove();
  }

  function getLabel(field) {
    const lbl = form.querySelector(`label[for="${field.id}"]`);
    return lbl ? lbl.textContent.replace(/[*()optional]/gi, '').trim() : 'This field';
  }

  async function submitForm() {
    const btn    = document.getElementById('submit-btn');
    const text   = btn?.querySelector('.btn-text');
    const loader = btn?.querySelector('.btn-loader');
    if (btn) { btn.disabled = true; text && (text.style.display = 'none'); loader && (loader.style.display = 'inline-flex'); }

    await new Promise(r => setTimeout(r, 1800));

    form.reset();
    if (charEl) charEl.textContent = `0 / ${MAX}`;
    form.querySelectorAll('.valid').forEach(el => el.classList.remove('valid'));
    if (btn) { btn.disabled = false; text && (text.style.display = ''); loader && (loader.style.display = 'none'); }

    Toast.show("Message sent! I'll get back to you soon.", 'success', 5000);
  }
}

/* ============================================================
   FOOTER YEAR
   ============================================================ */
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   INIT ALL
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCustomCursor();
  initNeuralNetwork();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initScrollProgress();
  initBackToTop();
  initTypingEffect();
  initCounters();
  initSkillBars();
  initScrollReveal();
  initProjectCardTilt();
  initProjectFilters();
  initContactForm();
  initFooterYear();
});
