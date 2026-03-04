/* ═══════════════════════════════════════════════════════════
   VibeCR Monitor — Landing Page Interactivity
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  /* ── 1. Demo Marquee Data ────────────────────────────── */
  const demoProjects = [
    { name: "Agent Eval Benchmark", papers: 42, steps: 18 },
    { name: "Secure Skill Supply Chain", papers: 27, steps: 12 },
    { name: "Synthetic Reasoning Traces", papers: 56, steps: 34 },
    { name: "Adversarial Code Auditing", papers: 19, steps: 8 },
    { name: "Multimodal Reward Models", papers: 88, steps: 45 },
    { name: "Distributed RAG Caching", papers: 33, steps: 22 },
    { name: "Interpretability Constellation", papers: 104, steps: 60 },
    { name: "On-device Speculative Decoding", papers: 15, steps: 9 },
    { name: "Automated Literature Triage", papers: 210, steps: 14 },
    { name: "Neurosymbolic Verification", papers: 47, steps: 19 },
    { name: "Vibe Research Methodology", papers: 12, steps: 6 },
    { name: "LLM Hallucination Detection", papers: 76, steps: 28 },
    { name: "Sparse Autoencoder Circuits", papers: 65, steps: 31 },
    { name: "Code Repair Agent Eval", papers: 39, steps: 17 },
    { name: "Data Contamination Probes", papers: 52, steps: 25 },
    { name: "Long-Context Memory Tasks", papers: 81, steps: 40 },
    { name: "Prompt Engineering Catalog", papers: 110, steps: 55 },
    { name: "Bias Auditing Toolkit", papers: 44, steps: 21 },
    { name: "Knowledge Distillation Pipeline", papers: 29, steps: 11 },
    { name: "Uncertainty Quantification", papers: 58, steps: 24 }
  ];

  const marqueeTrack = $('#marquee-track');
  if (marqueeTrack) {
    // Generate items
    const generateItems = () => demoProjects.map(p => `
      <span class="marquee-item">
        <strong>${p.name}</strong>
        <span class="dot">•</span>
        <span class="muted">${p.papers} papers</span>
        <span class="dot">•</span>
        <span class="muted">${p.steps} steps</span>
      </span>
    `).join('');
    
    // Duplicate 3 times for seamless scrolling
    marqueeTrack.innerHTML = generateItems() + generateItems() + generateItems();
  }

  /* ── 2. Sticky Nav Shadow ────────────────────────────── */
  const nav = $('nav.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
        nav.style.background = 'rgba(5, 5, 8, 0.95)';
      } else {
        nav.style.boxShadow = 'none';
        nav.style.background = 'rgba(5, 5, 8, 0.85)';
      }
    }, { passive: true });
  }

  /* ── 3. Mobile Nav Toggle ────────────────────────────── */
  const mobileToggle = $('.nav-mobile-toggle');
  const navLinks = $('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });
    // Close on click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.textContent = '☰';
      });
    });
  }

  /* ── 4. Scroll Reveal (IntersectionObserver) ─────────── */
  function initRevealObserver() {
    const revealEls = $$('.reveal:not(.visible)');
    if (!revealEls.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => obs.observe(el));
  }
  
  // Disable if prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    initRevealObserver();
  } else {
    $$('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ── 5. Nav Section Highlighting ─────────────────────── */
  const sections = $$('section[id]');
  const navAnchors = $$('.nav-links a[href^="#"]');

  function updateActive() {
    let current = '';
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos && (sec.offsetTop + sec.offsetHeight) > scrollPos) {
        current = sec.getAttribute('id');
      }
    });

    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
      if (a.getAttribute('href') === `#${current}`) {
        a.style.color = 'var(--text)';
      } else {
        a.style.color = '';
      }
    });
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  /* ── 6. FAQ Toggle ───────────────────────────────────── */
  document.addEventListener('click', (e) => {
    const q = e.target.closest('.faq-q');
    if (!q) return;
    const item = q.parentElement;
    
    // Close others
    $$('.faq-item.open').forEach(other => {
      if (other !== item) other.classList.remove('open');
    });
    
    item.classList.toggle('open');
  });

});
