/* ── Appartamenti Fiorenti · shared.js ── */

const _lang = document.documentElement.lang === 'en' ? 'en' : 'it';

const VIKEY_KEYS = {
  vv14: 'rQcVj7dswRB0atMM8aXaqZnKJjsRdDVrx384GCmFqt4',
  c3a:  'rQcVj7dswRB0atMM8aXaqZnKJ2cfUVNDx384GCmFqt4',
  da23: 'rQcVj7dswRB0atMM8aXaqZy_JxxjTzRJx384GCmFqt4'
};

const PROP_NAMES = _lang === 'en'
  ? { vv14: ['VV14 · Apartment', 'Casa di Ringhiera'], c3a: ['C3A · Apartment', 'Dimora sul Canale'], da23: ['DA23 · Apartment', 'Dimora Vertigo'] }
  : { vv14: ['VV14 · Appartamento', 'Casa di Ringhiera'], c3a: ['C3A · Appartamento', 'Dimora sul Canale'], da23: ['DA23 · Appartamento', 'Dimora Vertigo'] };

function loadVikeyWidget() {
  var old = document.getElementById('vikeyScript');
  if (old) old.remove();
  var s = document.createElement('script');
  s.id = 'vikeyScript';
  s.src = 'https://storage.googleapis.com/vikey-widgets/bookingengine/vikey-booking-engine-widget.js';
  s.async = true;
  document.body.appendChild(s);
}

function openModal(id) {
  const [code, name] = PROP_NAMES[id];
  document.getElementById('modalCode').textContent = code;
  document.getElementById('modalTitle').textContent = name;
  document.getElementById('modalWidget').innerHTML =
    '<div class="vikey-booking-engine-widget" data-client-key="' + VIKEY_KEYS[id] +
    '" data-vikey-language="' + _lang + '" data-vikey-widget-width="100%"></div>';
  loadVikeyWidget();
  const step1 = document.getElementById('modalStep1');
  const step2 = document.getElementById('modalStep2');
  if (step1) step1.style.display = 'none';
  if (step2) step2.style.display = 'block';
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  const closeBtn = document.querySelector('.modal-close');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
}

function closeModalDirect() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.getElementById('modalWidget').innerHTML = '';
  document.body.style.overflow = '';
}

function closeModal(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModalDirect();
}

function openSelector() {
  const step1 = document.getElementById('modalStep1');
  const step2 = document.getElementById('modalStep2');
  if (step1) step1.style.display = 'block';
  if (step2) step2.style.display = 'none';
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  const closeBtn = document.querySelector('.modal-close');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
}

function selectProp(id) {
  const step1 = document.getElementById('modalStep1');
  const step2 = document.getElementById('modalStep2');
  if (step1) step1.style.display = 'none';
  if (step2) step2.style.display = 'block';
  openModal(id);
}

function backToSelector() {
  const step1 = document.getElementById('modalStep1');
  const step2 = document.getElementById('modalStep2');
  if (step1) step1.style.display = 'block';
  if (step2) step2.style.display = 'none';
}

function toggleDimore(btn) {
  var menu = btn.nextElementSibling;
  var isOpen = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
  if (isOpen) {
    document.addEventListener('click', function closeDimore(e) {
      if (!btn.parentElement.contains(e.target)) {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', closeDimore);
      }
    });
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModalDirect();
});

/* ── Lightbox (property pages only — requires gallImgs and lbIdx to be declared inline) ── */
function openLb(i) {
  if (typeof gallImgs === 'undefined') return;
  lbIdx = i;
  const lb = document.getElementById('lb');
  lb.classList.add('open');
  document.getElementById('lbImg').src = gallImgs[i];
  document.body.style.overflow = 'hidden';
  const closeBtn = lb.querySelector('.lb-close');
  if (closeBtn) closeBtn.focus();
  updateStrip();
}

function closeLb() {
  document.getElementById('lb').classList.remove('open');
  document.body.style.overflow = '';
}

function lbNext() {
  lbIdx = (lbIdx + 1) % gallImgs.length;
  document.getElementById('lbImg').src = gallImgs[lbIdx];
  updateStrip();
}

function lbPrev() {
  lbIdx = (lbIdx - 1 + gallImgs.length) % gallImgs.length;
  document.getElementById('lbImg').src = gallImgs[lbIdx];
  updateStrip();
}

function updateStrip() {
  document.querySelectorAll('.gallery-strip img').forEach((el, i) => el.classList.toggle('active', i === lbIdx));
}

document.addEventListener('keydown', e => {
  const lb = document.getElementById('lb');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'ArrowRight') lbNext();
  if (e.key === 'ArrowLeft') lbPrev();
  if (e.key === 'Escape') { e.stopImmediatePropagation(); closeLb(); }
});

/* ── Gallery strip keyboard support ── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery-strip img').forEach(img => {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
  });
});

document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.closest && e.target.closest('.gallery-strip')) {
    e.preventDefault();
    e.target.click();
  }
});
