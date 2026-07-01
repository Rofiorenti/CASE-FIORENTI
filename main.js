/* ── Appartamenti Fiorenti · main.js ── */

/* ── 1. PAGE TRANSITION (fade-out on navigate) ── */
window.addEventListener('pageshow', (e) => {
  document.body.classList.remove('page-exit');
  if (e.persisted) {
    document.body.style.opacity = '1';
    document.body.style.transition = 'none';
    setTimeout(() => { document.body.style.transition = ''; }, 50);
  }
});

document.querySelectorAll('a[href]').forEach(a => {
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
  a.addEventListener('click', e => {
    e.preventDefault();
    document.body.classList.add('page-exit');
    if (window.heroTimer) clearInterval(window.heroTimer);
    // Navigate after one animation frame so page-exit renders,
    // then immediately — stays within Safari's user-gesture scope.
    requestAnimationFrame(() => { window.location.href = href; });
  });
});

/* ── 2. SCROLL: navbar + parallax in un solo handler batched via rAF ── */
const nav = document.querySelector('.site-nav');
const heroBgScroll = document.getElementById('heroBg');
const propHeroImg = document.querySelector('.prop-hero-img');
let lastY = 0;
let scrollTicking = false;

function onScrollFrame() {
  const y = window.scrollY;

  if (nav) {
    if (y > 80) nav.classList.add('nav-scrolled');
    else nav.classList.remove('nav-scrolled');
    // nascondi scendendo, mostra salendo
    if (y > lastY + 8 && y > 160) nav.classList.add('nav-hidden');
    else if (y < lastY - 4) nav.classList.remove('nav-hidden');
  }

  if (heroBgScroll) {
    const shift = `center ${50 + y * 0.02}%`;
    heroBgScroll.style.backgroundPosition = shift;
    const hb2 = document.getElementById('heroBg2');
    if (hb2) hb2.style.backgroundPosition = shift;
  }

  if (propHeroImg) {
    propHeroImg.style.transform = `translateY(${y * 0.25}px)`;
  }

  lastY = y;
  scrollTicking = false;
}

if (nav || heroBgScroll || propHeroImg) {
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(onScrollFrame);
    }
  }, { passive: true });
}

/* ── 3. SMOOTH HERO CROSSFADE (con pausa quando la tab non è visibile) ── */
const heroBg = document.getElementById('heroBg');
if (heroBg) {
  // Secondo livello per il crossfade
  const heroBg2 = heroBg.cloneNode(false);
  heroBg2.id = 'heroBg2';
  heroBg2.style.opacity = '0';
  heroBg2.style.transition = 'opacity .9s ease';
  heroBg.parentElement.insertBefore(heroBg2, heroBg.nextSibling);

  const imgBase = window.location.pathname.includes('/en/') ? '../immagini/' : 'immagini/';
  const imgs = [imgBase + 'img_02.jpg', imgBase + 'img_03.jpg', imgBase + 'img_04.jpg'];
  let idx = 0;
  let busy = false;

  const heroDots = document.getElementById('heroDots');

  function buildDots() {
    if (!heroDots) return;
    heroDots.innerHTML = '';
    imgs.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'hdot' + (i === idx ? ' active' : '');
      d.setAttribute('role', 'button');
      d.setAttribute('tabindex', '0');
      d.setAttribute('aria-label', 'Immagine ' + (i + 1));
      d.addEventListener('click', () => { stop(); goTo(i); });
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

  function start() {
    if (!window.heroTimer) {
      window.heroTimer = setInterval(() => goTo((idx + 1) % imgs.length), 5000);
    }
  }
  function stop() {
    if (window.heroTimer) {
      clearInterval(window.heroTimer);
      window.heroTimer = null;
    }
  }

  buildDots();
  start();

  // Pausa l'autoplay quando la scheda non è in primo piano (risparmio risorse)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });
}

/* ── 4. INTERSECTION OBSERVER — scroll-reveal ── */
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

revealEls.forEach((el) => {
  el.classList.add('will-reveal');
  // stagger delle card
  if (el.classList.contains('pc')) {
    el.style.transitionDelay = `${(Array.from(el.parentElement.children).indexOf(el)) * 120}ms`;
  }
  revealObs.observe(el);
});

/* ── 5. SMOOTH SCROLL per i link àncora ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── 6. GALLERY STRIP — reveal progressivo dei thumbnail ── */
const galleryThumbs = document.querySelectorAll('.gallery-thumb');
if (galleryThumbs.length) {
  const galleryObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('strip-visible'); galleryObs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  galleryThumbs.forEach((el, i) => {
    el.style.transitionDelay = `${i * 60}ms`;
    el.classList.add('strip-hidden');
    galleryObs.observe(el);
  });
}

/* ── 7. MODAL — animazioni di entrata/uscita (avvolge le funzioni di shared.js) ── */
const modalOverlay = document.getElementById('modalOverlay');
if (modalOverlay) {
  const modal = modalOverlay.querySelector('.modal');
  if (modal) {
    const _baseOpen = window.openModal;
    const _baseClose = window.closeModalDirect;

    if (typeof _baseOpen === 'function') {
      window.openModal = function (id) {
        _baseOpen(id);
        modal.classList.add('modal-slide-in');
        setTimeout(() => modal.classList.remove('modal-slide-in'), 400);
      };
    }
    if (typeof _baseClose === 'function') {
      window.closeModalDirect = function () {
        modal.classList.add('modal-slide-out');
        setTimeout(() => {
          _baseClose();
          modal.classList.remove('modal-slide-out');
        }, 280);
      };
    }
  }
}

/* ── 8. BOOKING CARD — entrata sottile sul bottone ── */
const bcBtn = document.querySelector('.bc-btn');
if (bcBtn) {
  bcBtn.addEventListener('mouseenter', () => { bcBtn.style.letterSpacing = '.25em'; });
  bcBtn.addEventListener('mouseleave', () => { bcBtn.style.letterSpacing = '.2em'; });
}

/* ── 9. CONTACT FORM — invio via mailto (nessun backend, nessun servizio terzo) ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const isIt = document.documentElement.lang !== 'en';
  const err = document.getElementById('cfError');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.elements['name'].value.trim();
    const email = contactForm.elements['email'].value.trim();
    const msg = contactForm.elements['message'].value.trim();
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

    if (!name || !email || !msg || !emailOk) {
      if (err) {
        err.textContent = isIt
          ? 'Compila tutti i campi con un indirizzo email valido.'
          : 'Please fill in all fields with a valid email address.';
        err.hidden = false;
      }
      return;
    }
    if (err) err.hidden = true;

    const subject = encodeURIComponent((isIt ? 'Richiesta informazioni' : 'Enquiry') + ' – ' + name);
    const body = encodeURIComponent(
      (isIt ? 'Nome' : 'Name') + ': ' + name + '\n' +
      'Email: ' + email + '\n\n' + msg
    );
    window.location.href = 'mailto:info@casefiorenti.it?subject=' + subject + '&body=' + body;
  });
}
