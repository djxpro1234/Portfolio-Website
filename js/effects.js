/**
 * Advanced Visual Effects
 * - Scroll fade-in (Intersection Observer)
 * - Particle constellation background
 * - 3D tilt on hover
 * - Custom cursor
 */

// === 1. Scroll Fade-In ===
(function initFadeIn() {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        fadeObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
})();

// === 2. Particle Constellation Background ===
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;
  const isMobile = window.innerWidth < 768;
  const COUNT = isMobile ? 25 : 60;
  const MAX_DIST = isMobile ? 90 : 120;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const color = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    const rgb = color || '164 230 255';

    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${rgb} / 0.6)`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x;
        const dy = p.y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgb(${rgb} / ${0.15 * (1 - dist / MAX_DIST)})`;
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); });
})();

// === 3. 3D Tilt on Hover ===
document.querySelectorAll('[data-tilt]').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)';
  });
});

// === 4. Custom Cursor ===
(function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.append(cursor, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function animate() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    cursor.style.transform = `translate(${mx}px, ${my}px)`;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(animate);
  })();

  document.querySelectorAll('a, button, [data-tilt]').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
  });
})();
