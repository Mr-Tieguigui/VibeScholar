// ─── Resonance Landing Page — Interactivity ─────────────
document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.SITE_CONFIG || {};

  // ── Populate from config ──────────────────────────────
  if (cfg.productName) {
    document.getElementById('hero-title').textContent = cfg.productName;
    document.title = `${cfg.productName} — Research Execution Cockpit`;
  }
  if (cfg.tagline) {
    document.getElementById('hero-tagline').textContent = cfg.tagline;
  }
  if (cfg.appUrl) {
    document.getElementById('cta-app').href = cfg.appUrl;
  }
  if (cfg.githubUrl) {
    document.getElementById('nav-github').href = cfg.githubUrl;
    document.getElementById('footer-github').href = cfg.githubUrl;
  }

  // Stats
  if (cfg.stats) {
    const fmt = (n) => n >= 1000 ? n.toLocaleString() : String(n);
    const s = cfg.stats;
    if (s.projectsTracked) document.getElementById('stat-projects').textContent = fmt(s.projectsTracked);
    if (s.papersIndexed) document.getElementById('stat-papers').textContent = fmt(s.papersIndexed);
    if (s.executionSteps) document.getElementById('stat-steps').textContent = fmt(s.executionSteps);
    if (s.reportsGenerated) document.getElementById('stat-reports').textContent = fmt(s.reportsGenerated);
  }

  // ── FAQ toggle ────────────────────────────────────────
  document.querySelectorAll('.faq-q').forEach((q) => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      // Close others
      document.querySelectorAll('.faq-item.open').forEach((other) => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });

  // ── Scroll-triggered animations ───────────────────────
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  // Observe step cards and feature cards
  document.querySelectorAll('.step-card, .feature-card, .demo-card, .doc-link').forEach((el) => {
    // Remove animate-in if already applied in HTML (except hero)
    if (!el.closest('.hero')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
    }
    observer.observe(el);
  });

  // Override for observed elements
  const style = document.createElement('style');
  style.textContent = `
    .step-card.animate-in, .feature-card.animate-in, .demo-card.animate-in, .doc-link.animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
  `;
  document.head.appendChild(style);

  // ── Smooth active nav highlight ───────────────────────
  const sections = ['quickstart', 'features', 'demo', 'docs'];
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) {
        current = id;
      }
    }
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.style.color = 'var(--c-accent)';
        link.style.background = 'var(--c-accent-light)';
      } else {
        link.style.color = '';
        link.style.background = '';
      }
    });
  });

  // ── Animated stat counters ────────────────────────────
  let statsAnimated = false;
  const statsSection = document.getElementById('stats');
  const statsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateCounters();
        statsObserver.unobserve(statsSection);
      }
    },
    { threshold: 0.3 }
  );
  if (statsSection) statsObserver.observe(statsSection);

  function animateCounters() {
    document.querySelectorAll('.stat-number').forEach((el) => {
      const text = el.textContent.replace(/,/g, '');
      const target = parseInt(text, 10);
      if (isNaN(target)) return;
      const duration = 1200;
      const start = performance.now();
      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);
        el.textContent = current >= 1000 ? current.toLocaleString() : String(current);
        if (progress < 1) requestAnimationFrame(step);
      };
      el.textContent = '0';
      requestAnimationFrame(step);
    });
  }
});
