/* ── Starfield Canvas ─────────────────────────────────────────── */
function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let stars = [];
  const STAR_COUNT = 180;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    buildStars();
  }

  function buildStars() {
    stars = Array.from({ length: STAR_COUNT }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      r:       Math.random() * 1.2 + 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      speed:   Math.random() * 0.008 + 0.002,
      phase:   Math.random() * Math.PI * 2,
    }));
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame += 0.012;

    for (const s of stars) {
      const twinkle = s.opacity + Math.sin(frame * s.speed * 60 + s.phase) * 0.15;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 240, 230, ${Math.max(0, twinkle)})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
}

/* ── Scroll Progress Bar ──────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ── Header scroll state ──────────────────────────────────────── */
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── Active Nav Link ──────────────────────────────────────────── */
function initActiveNav() {
  const sections = ['about', 'projects', 'tools'];
  const navLinks  = document.querySelectorAll('nav[aria-label] a[data-nav]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`nav a[data-nav="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

/* ── Smooth Scroll ────────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── Scroll-in animations ─────────────────────────────────────── */
function initFadeUps() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.card, .about-quote, .about-body p, .stat, .chip, .tool-category').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });
}

/* ── Planet Easter Egg ────────────────────────────────────────── */
function initMarsEgg() {
  const trigger = document.getElementById('mars-trigger');
  const modal   = document.getElementById('mars-modal');
  if (!trigger || !modal) return;

  trigger.addEventListener('click', () => {
    modal.classList.add('active');
    modal.removeAttribute('aria-hidden');
    setTimeout(() => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }, 3500);
  });

  modal.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  });
}

/* ── Init ─────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initScrollProgress();
  initHeader();
  initActiveNav();
  initSmoothScroll();
  initFadeUps();
  initMarsEgg();
});
