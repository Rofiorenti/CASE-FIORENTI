/* ── Appartamenti Fiorenti · main.js ── */

/* ── 1. PAGE TRANSITION (fade-out on navigate) ── */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-ready');
});

document.querySelectorAll('a[href]').forEach(a => {
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
  a.addEventListener('click', e => {
    e.preventDefault();
    document.body.classList.remove('page-ready');
    setTimeout(() => { window.location.href = href; }, 320);
  });
});

/* ── 2. NAVBAR SCROLL BEHAVIOUR ── */
const nav = document.querySelector('.site-nav');
if (nav) {
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (y > 80) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
    // hide on scroll down, show on scroll up
    if (y > lastY + 8 && y > 160) {
      nav.classList.add('nav-hidden');
    } else if (y < lastY - 4) {
      nav.classList.remove('nav-hidden');
    }
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── 3. SMOOTH HERO CROSSFADE ── */
const heroBg = document.getElementById('heroBg');
if (heroBg) {
  // Create a second layer for crossfade
  const heroBg2 = heroBg.cloneNode(false);
  heroBg2.id = 'heroBg2';
  heroBg2.style.opacity = '0';
  heroBg2.style.transition = 'opacity .9s ease';
  heroBg.parentElement.insertBefore(heroBg2, heroBg.nextSibling);

  const imgBase = window.location.pathname.includes('/en/') ? '../immagini/' : 'immagini/';
  const imgs = [imgBase+"img_02.jpg", imgBase+"img_03.jpg", imgBase+"img_04.jpg"];
  let idx = 0;
  let busy = false;

  const heroDots = document.getElementById('heroDots');

  function buildDots() {
    if (!heroDots) return;
    heroDots.innerHTML = '';
    imgs.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'hdot' + (i === idx ? ' active' : '');
      d.onclick = () => goTo(i);
      heroDots.appendChild(d);
    });
  }

  function goTo(next) {
    if (busy || next === idx) return;
    busy = true;
    const nextImg = imgs[next];
    heroBg2.style.backgroundImage = `url(${nextImg})`;
    heroBg2.style.backgroundSize = 'cover';
    heroBg2.style.backgroundPosition = 'center';
    heroBg2.style.filter = heroBg.style.filter || 'brightness(.22) saturate(.6)';
    heroBg2.style.opacity = '1';
    setTimeout(() => {
      heroBg.style.backgroundImage = `url(${nextImg})`;
      heroBg2.style.opacity = '0';
      idx = next;
      buildDots();
      busy = false;
    }, 950);
  }

  buildDots();
  const timer = setInterval(() => goTo((idx + 1) % imgs.length), 5000);

  // override the old inline dots onclick
  if (heroDots) heroDots.addEventListener('click', () => clearInterval(timer));
}

/* ── 4. PARALLAX on hero bg ── */
const heroBgEl = document.getElementById('heroBg');
const heroBg2El = document.getElementById('heroBg2');
if (heroBgEl) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const shift = `center ${50 + y * 0.02}%`;
    heroBgEl.style.backgroundPosition = shift;
    if (heroBg2El) heroBg2El.style.backgroundPosition = shift;
  }, { passive: true });
}

/* ── 5. PROP HERO PARALLAX ── */
const propHeroImg = document.querySelector('.prop-hero-img');
if (propHeroImg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    propHeroImg.style.transform = `translateY(${y * 0.25}px)`;
  }, { passive: true });
}

/* ── 6. INTERSECTION OBSERVER — scroll-reveal ── */
const revealEls = document.querySelectorAll(
  '.intro-sec, .props-grid .pc, .prop-main h2, .prop-main p, .amenities, .booking-card, .section-eyebrow, .divider, .footer-logo, .footer-note'
);

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  el.classList.add('will-reveal');
  // stagger cards
  if (el.classList.contains('pc')) {
    el.style.transitionDelay = `${(Array.from(el.parentElement.children).indexOf(el)) * 120}ms`;
  }
  revealObs.observe(el);
});

/* ── 7. SMOOTH SCROLL for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── 8. GALLERY STRIP active on scroll ── */
const galleryImgs = document.querySelectorAll('.gallery-strip img');
if (galleryImgs.length) {
  const galleryObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('strip-visible');
    });
  }, { threshold: 0.5 });
  galleryImgs.forEach((img, i) => {
    img.style.transitionDelay = `${i * 60}ms`;
    img.classList.add('strip-hidden');
    galleryObs.observe(img);
  });
}

/* ── 9. MODAL animation improvements ── */
const modalOverlay = document.getElementById('modalOverlay');
if (modalOverlay) {
  const modal = modalOverlay.querySelector('.modal');
  if (modal) {
    const origOpen = window.openModal;
    const origClose = window.closeModalDirect;

    if (origOpen) {
      window.openModal = function(id) {
        origOpen(id);
        modal.classList.add('modal-slide-in');
        setTimeout(() => modal.classList.remove('modal-slide-in'), 400);
      };
    }
    if (origClose) {
      window.closeModalDirect = function() {
        modal.classList.add('modal-slide-out');
        setTimeout(() => {
          origClose();
          modal.classList.remove('modal-slide-out');
        }, 280);
      };
    }
  }
}

/* ── 10. BOOKING CARD subtle entrance ── */
const bcBtn = document.querySelector('.bc-btn');
if (bcBtn) {
  bcBtn.addEventListener('mouseenter', () => {
    bcBtn.style.letterSpacing = '.25em';
  });
  bcBtn.addEventListener('mouseleave', () => {
    bcBtn.style.letterSpacing = '.2em';
  });
}
