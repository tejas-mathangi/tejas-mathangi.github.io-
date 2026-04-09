/* ===========================================================
   PORTFOLIO — script.js
   Nav behavior, mobile menu, smooth scroll, scroll animations
   =========================================================== */

(() => {
  'use strict';

  /* ── ELEMENTS ───────────────────────────────────────────── */
  const nav       = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  /* ── 1. STICKY NAV — add .scrolled class after 50px ───── */
  const SCROLL_THRESHOLD = 50;

  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // init on load

  /* ── 2. HAMBURGER MENU (≤640px) ────────────────────────── */
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // close menu on link click
  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ── 3. SCROLL ANIMATIONS (IntersectionObserver) ────────── */

  // Section-level fade-in
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(el => sectionObserver.observe(el));

  // Card-level staggered fade-in
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
  );

  document.querySelectorAll('.fade-in-card').forEach((el, i) => {
    // stagger each card by 80ms
    el.style.transitionDelay = `${i * 80}ms`;
    cardObserver.observe(el);
  });

})();
