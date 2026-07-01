/* ── Appartamenti Fiorenti · shared.js ──
   Modale prenotazione, lightbox, navigazione.
   Nessun handler inline: tutto via delegazione su [data-action] (compatibile con CSP).
   Il catalogo (chiavi Vikey, nomi) arriva da catalog.js → window.FIORENTI. */
(function () {
  'use strict';

  var lang = document.documentElement.lang === 'en' ? 'en' : 'it';
  var APT_WORD = lang === 'en' ? 'Apartment' : 'Appartamento';
  var catalog = (window.FIORENTI && window.FIORENTI.props) || {};
  var VIKEY_SRC = 'https://storage.googleapis.com/vikey-widgets/bookingengine/vikey-booking-engine-widget.js';

  var lastFocused = null;

  function overlay() { return document.getElementById('modalOverlay'); }

  /* ── Modale prenotazione ── */
  function loadVikeyWidget() {
    var old = document.getElementById('vikeyScript');
    if (old) old.remove();
    var s = document.createElement('script');
    s.id = 'vikeyScript';
    s.src = VIKEY_SRC;
    s.async = true;
    document.body.appendChild(s);
  }

  function setLabel(id) {
    var m = document.querySelector('#modalOverlay .modal');
    if (m) m.setAttribute('aria-labelledby', id);
  }

  function showStep(step) {
    var s1 = document.getElementById('modalStep1');
    var s2 = document.getElementById('modalStep2');
    if (s1) s1.style.display = step === 1 ? 'block' : 'none';
    if (s2) s2.style.display = step === 2 ? 'block' : 'none';
  }

  function openOverlay(labelId) {
    lastFocused = document.activeElement;
    setLabel(labelId);
    overlay().classList.add('open');
    document.body.style.overflow = 'hidden';
    var close = document.querySelector('.modal-close');
    if (close) setTimeout(function () { close.focus(); }, 50);
  }

  function openModal(id) {
    var p = catalog[id];
    if (!p) return;
    document.getElementById('modalCode').textContent = p.code + ' · ' + APT_WORD;
    document.getElementById('modalTitle').textContent = p.name;
    document.getElementById('modalWidget').innerHTML =
      '<div class="vikey-booking-engine-widget" data-client-key="' + p.vikey +
      '" data-vikey-language="' + lang + '" data-vikey-widget-width="100%"></div>';
    loadVikeyWidget();
    showStep(2);
    openOverlay('modalTitle');
  }

  function openSelector() {
    showStep(1);
    openOverlay('modalStep1Title');
  }

  function backToSelector() {
    showStep(1);
    setLabel('modalStep1Title');
    var first = document.querySelector('#modalStep1 .prop-sel-btn');
    if (first) first.focus();
  }

  function closeModalDirect() {
    overlay().classList.remove('open');
    var w = document.getElementById('modalWidget');
    if (w) w.innerHTML = '';
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
    lastFocused = null;
  }

  /* esposte: main.js ne avvolge alcune per le animazioni */
  window.openModal = openModal;
  window.openSelector = openSelector;
  window.closeModalDirect = closeModalDirect;

  /* ── Dropdown "Dimore" (mobile) ── */
  function toggleDimore(btn) {
    var menu = btn.nextElementSibling;
    var isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      document.addEventListener('click', function onDoc(e) {
        if (!btn.parentElement.contains(e.target)) {
          menu.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          document.removeEventListener('click', onDoc);
        }
      });
    }
  }

  /* ── Lightbox galleria ── */
  var gallImgs = [];
  var lbIdx = 0;

  function readGallery() {
    var strip = document.querySelector('.gallery-strip');
    if (strip && strip.dataset.gallery) {
      try { gallImgs = JSON.parse(strip.dataset.gallery); } catch (e) { gallImgs = []; }
    }
  }
  function updateStrip() {
    document.querySelectorAll('.gallery-thumb').forEach(function (el, i) {
      el.classList.toggle('active', i === lbIdx);
    });
  }
  function openLb(i) {
    if (!gallImgs.length) return;
    lastFocused = document.activeElement;
    lbIdx = i;
    var lb = document.getElementById('lb');
    lb.classList.add('open');
    document.getElementById('lbImg').src = gallImgs[i];
    document.body.style.overflow = 'hidden';
    var close = lb.querySelector('.lb-close');
    if (close) close.focus();
    updateStrip();
  }
  function closeLb() {
    document.getElementById('lb').classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
    lastFocused = null;
  }
  function lbNext() { lbIdx = (lbIdx + 1) % gallImgs.length; document.getElementById('lbImg').src = gallImgs[lbIdx]; updateStrip(); }
  function lbPrev() { lbIdx = (lbIdx - 1 + gallImgs.length) % gallImgs.length; document.getElementById('lbImg').src = gallImgs[lbIdx]; updateStrip(); }

  /* ── Delegazione eventi (sostituisce tutti gli onclick inline) ── */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var action = el.dataset.action;

    // gli sfondi chiudono solo se si clicca proprio lo sfondo, non i figli
    if ((action === 'modal-overlay' || action === 'lb-overlay') && e.target !== el) return;

    switch (action) {
      case 'book': e.preventDefault(); window.openModal(el.dataset.prop); break;
      case 'book-selector': e.preventDefault(); window.openSelector(); break;
      case 'select-prop': window.openModal(el.dataset.prop); break;
      case 'modal-back': backToSelector(); break;
      case 'modal-close':
      case 'modal-overlay': window.closeModalDirect(); break;
      case 'toggle-dimore': toggleDimore(el); break;
      case 'lb-open': openLb(parseInt(el.dataset.lb, 10) || 0); break;
      case 'lb-close':
      case 'lb-overlay': closeLb(); break;
      case 'lb-prev': lbPrev(); break;
      case 'lb-next': lbNext(); break;
    }
  });

  /* ── Tastiera: focus-trap dei dialog + scorciatoie ── */
  function focusables(container) {
    return Array.prototype.slice.call(container.querySelectorAll(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )).filter(function (el) { return el.offsetParent !== null; });
  }
  function trap(container, e) {
    if (!container || e.key !== 'Tab') return;
    var f = focusables(container);
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  document.addEventListener('keydown', function (e) {
    var lb = document.getElementById('lb');
    var lbOpen = lb && lb.classList.contains('open');
    var ov = overlay();
    var modalOpen = ov && ov.classList.contains('open');

    if (lbOpen) {
      if (e.key === 'ArrowRight') lbNext();
      else if (e.key === 'ArrowLeft') lbPrev();
      else if (e.key === 'Escape') { e.stopImmediatePropagation(); closeLb(); }
      else if (e.key === 'Tab') trap(lb, e);
      return;
    }
    if (modalOpen) {
      if (e.key === 'Escape') window.closeModalDirect();
      else if (e.key === 'Tab') trap(ov.querySelector('.modal'), e);
    }
  });

  /* ── Init ── */
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', readGallery);
  else readGallery();
})();
