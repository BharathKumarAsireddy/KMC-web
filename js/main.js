/* ============================================================
   KMC GROUPS PVT LTD — MAIN JAVASCRIPT
   ============================================================ */

'use strict';

/* ============================================================
   DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initDropdown();
  initScrollReveal();
  initCounters();
  initTestimonialCarousel();
  initProjectFilter();
  initHeroImageLoad();
  initBackToTop();
  initSmoothScroll();
  initActiveNavLink();
});

/* ============================================================
   NAVBAR — transparent on hero, solid on scroll
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const SCROLL_THRESHOLD = 60;

  function updateNavbar() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('navbar--solid');
      navbar.classList.remove('navbar--transparent');
    } else {
      navbar.classList.remove('navbar--solid');
      navbar.classList.add('navbar--transparent');
    }
  }

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });
}

/* ============================================================
   DROPDOWN — click toggle (works on both desktop & touch)
   ============================================================ */
function initDropdown() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-dropdown__trigger');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');

      // Close all dropdowns
      dropdowns.forEach(d => {
        d.classList.remove('open');
        const t = d.querySelector('.nav-dropdown__trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });

      // Toggle this one
      if (!isOpen) {
        dropdown.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    dropdowns.forEach(d => {
      d.classList.remove('open');
      const t = d.querySelector('.nav-dropdown__trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdowns.forEach(d => {
        d.classList.remove('open');
        const t = d.querySelector('.nav-dropdown__trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Mobile businesses sub-accordion
  const mobileGroupTrigger = document.querySelector('.mobile-menu__group-trigger');
  const mobileSubLinks     = document.querySelector('.mobile-menu__sub-links');

  if (mobileGroupTrigger && mobileSubLinks) {
    mobileGroupTrigger.addEventListener('click', () => {
      const isOpen = mobileGroupTrigger.classList.contains('open');
      mobileGroupTrigger.classList.toggle('open', !isOpen);
      mobileGroupTrigger.setAttribute('aria-expanded', (!isOpen).toString());
      mobileSubLinks.classList.toggle('open', !isOpen);
    });
  }
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const hamburger    = document.querySelector('.hamburger');
  const mobileMenu   = document.querySelector('.mobile-menu');
  const mobileLinks  = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');
  const body         = document.body;

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on backdrop click
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ============================================================
   SCROLL REVEAL — Intersection Observer
   ============================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px',
    }
  );

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   ANIMATED COUNTERS
   ============================================================ */
function initCounters() {
  const counterEls = document.querySelectorAll('[data-counter]');
  if (!counterEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counterEls.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target   = parseFloat(el.dataset.counter);
  const suffix   = el.dataset.suffix || '';
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
  const duration = 2000;
  const start    = performance.now();

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value    = easeOutQuart(progress) * target;

    el.textContent = (decimals > 0 ? value.toFixed(decimals) : Math.floor(value)) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = (decimals > 0 ? target.toFixed(decimals) : target) + suffix;
    }
  }

  requestAnimationFrame(update);
}

/* ============================================================
   TESTIMONIAL CAROUSEL
   ============================================================ */
function initTestimonialCarousel() {
  const track    = document.querySelector('.testimonials__track');
  const cards    = document.querySelectorAll('.testimonial-card');
  const dots     = document.querySelectorAll('.carousel-dot');
  const prevBtn  = document.querySelector('.carousel-btn--prev');
  const nextBtn  = document.querySelector('.carousel-btn--next');

  if (!track || !cards.length) return;

  let current   = 0;
  let autoTimer = null;
  const total   = cards.length;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    autoTimer = setInterval(next, 5000);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  // Controls
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
  });

  // Touch / Swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      stopAuto();
      if (diff > 0) next(); else prev();
      startAuto();
    }
  }, { passive: true });

  // Init
  goTo(0);
  startAuto();
}

/* ============================================================
   PROJECT FILTER
   ============================================================ */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      cards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
}

/* ============================================================
   HERO IMAGE ZOOM LOAD
   ============================================================ */
function initHeroImageLoad() {
  const heroImg = document.querySelector('.hero__img');
  if (!heroImg) return;

  if (heroImg.complete) {
    heroImg.classList.add('loaded');
  } else {
    heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
  }
}

/* ============================================================
   BACK TO TOP BUTTON
   ============================================================ */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   SMOOTH SCROLL for anchor links
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ============================================================
   ACTIVE NAV LINK on scroll
   ============================================================ */
function initActiveNavLink() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.35, rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'))}px 0px 0px 0px` }
  );

  sections.forEach(s => observer.observe(s));
}

/* ============================================================
   CONTACT FORM — basic client-side feedback
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Sending...';
    btn.disabled    = true;

    // Simulate send delay
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#2D6A4F';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled    = false;
        btn.style.background = '';
        form.reset();
      }, 3000);
    }, 1400);
  });
});

/* ============================================================
   NEWSLETTER FORM
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.querySelector('.footer__newsletter-form');
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = this.querySelector('input');
    const btn   = this.querySelector('button');

    btn.textContent = '✓';
    input.value     = '';
    input.placeholder = 'Thank you for subscribing!';

    setTimeout(() => {
      btn.textContent    = 'Subscribe';
      input.placeholder  = 'Enter your email';
    }, 3000);
  });
});
