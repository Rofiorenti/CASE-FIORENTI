/* ════════════════════════════════════════════════════════════════
   render.js — componenti condivisi (nav, footer, modal, head, JSON-LD)
   Un'unica definizione per chrome ripetuto su tutte le pagine.
   ════════════════════════════════════════════════════════════════ */

const { site, ui, properties, files } = require('./data');

const byId = (id) => properties.find((p) => p.id === id);

/* URL assoluti (canonical / og / hreflang / JSON-LD) */
const abs = (path) => site.domain + '/' + path.replace(/^\//, '');
const absImg = (name) => site.domain + '/immagini/' + name;

/* href dello switch di lingua: punta alla pagina equivalente nell'altra lingua */
function langSwitchHref(pageId, lang) {
  const f = files[pageId];
  return lang === 'it' ? 'en/' + f.en : '../' + f.it;
}

/* Link <head> condivisi (favicon, preconnect, font Google, CSS) */
function commonHead(assetPrefix) {
  return `<link rel="icon" href="${assetPrefix}immagini/img_01.webp" type="image/webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Lora:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap">
<link rel="stylesheet" href="${assetPrefix}stile.css">`;
}

/* <head> completo. I campi opzionali (og, canonical, hreflang…) compaiono solo se passati. */
function head(m) {
  const lines = [];
  lines.push('<meta charset="UTF-8">');
  lines.push('<meta name="viewport" content="width=device-width,initial-scale=1.0">');
  lines.push(`<title>${m.title}</title>`);
  if (m.description) lines.push(`<meta name="description" content="${m.description}">`);
  if (m.robots) lines.push(`<meta name="robots" content="${m.robots}">`);
  if (m.og) {
    const o = m.og;
    lines.push(`<meta property="og:title" content="${o.title}">`);
    lines.push(`<meta property="og:description" content="${o.description}">`);
    lines.push(`<meta property="og:image" content="${o.image}">`);
    lines.push(`<meta property="og:type" content="${o.type}">`);
    lines.push(`<meta property="og:url" content="${o.url}">`);
    lines.push(`<meta property="og:locale" content="${o.locale}">`);
    lines.push(`<meta property="og:locale:alternate" content="${o.localeAlt}">`);
  }
  if (m.canonical) lines.push(`<link rel="canonical" href="${m.canonical}">`);
  if (m.hreflang) {
    lines.push(`<link rel="alternate" hreflang="it" href="${m.hreflang.it}">`);
    lines.push(`<link rel="alternate" hreflang="en" href="${m.hreflang.en}">`);
    lines.push(`<link rel="alternate" hreflang="x-default" href="${m.hreflang.xdefault}">`);
  }
  lines.push(commonHead(m.assetPrefix));
  if (m.preloadImg) lines.push(`<link rel="preload" as="image" href="${m.assetPrefix}immagini/${m.preloadImg}">`);
  if (m.extraHead) lines.push(m.extraHead);
  if (m.jsonld) lines.push(`<script type="application/ld+json">\n${m.jsonld}\n</script>`);
  return lines.join('\n');
}

/* Navigazione */
function nav({ lang, active, book }) {
  const t = ui[lang];
  const isActive = (id) => (active === id ? ' class="active"' : '');
  const propLinks = (extraActive) =>
    properties
      .map((p) => `<a href="${p.id}.html" data-page="${p.id}"${isActive(p.id)}>${p.name}</a>`)
      .join('\n        ');

  const bookBtn =
    book && book.type === 'prop'
      ? `<button class="nav-book" data-action="book" data-prop="${book.id}">${t.nav.book}</button>`
      : `<button class="nav-book" data-action="book-selector">${t.nav.book}</button>`;

  const langSwitch =
    lang === 'it'
      ? `<span class="nav-lang-opt active">IT</span>
      <span class="nav-lang-sep">|</span>
      <a href="${book.langHref}" class="nav-lang-opt" aria-label="English version">EN</a>`
      : `<a href="${book.langHref}" class="nav-lang-opt" aria-label="Versione italiana">IT</a>
      <span class="nav-lang-sep">|</span>
      <span class="nav-lang-opt active">EN</span>`;

  return `<nav class="site-nav">
  <a href="index.html" class="nav-logo"><img src="${book.assetPrefix}immagini/img_01.webp" alt="Appartamenti Fiorenti"></a>
  <div class="nav-links">
    <a href="index.html" data-page="index"${isActive('index')}>${t.nav.home}</a>
    ${propLinks()}
  </div>
  <div class="nav-right">
    <div class="nav-dimore">
      <button class="nav-dimore-btn" data-action="toggle-dimore" aria-expanded="false" aria-controls="navDimoreMenu">
        ${t.nav.dimore} <span class="nav-dimore-arrow"><span></span><span></span><span></span></span>
      </button>
      <div class="nav-dimore-menu" id="navDimoreMenu">
        ${propLinks()}
      </div>
    </div>
    <div class="nav-lang">
      ${langSwitch}
    </div>
    ${bookBtn}
  </div>
</nav>`;
}

/* Footer */
function footer({ lang, assetPrefix }) {
  const t = ui[lang];
  const contactFile = files.contatti[lang];
  const privacyFile = files.privacy[lang];
  const cookieFile = files.cookie[lang];
  return `<footer class="site-footer">
  <div class="footer-logo"><img src="${assetPrefix}immagini/img_01.webp" alt="Appartamenti Fiorenti" loading="lazy"></div>
  <p class="footer-note">${t.city} &middot; ${site.name} &copy; ${site.year} &middot; ${t.footer.rights}</p>
  <div class="footer-links">
    <a href="index.html">${t.footer.home}</a>
    <a href="vv14.html">Casa di Ringhiera</a>
    <a href="c3a.html">Dimora sul Canale</a>
    <a href="da23.html">Dimora Vertigo</a>
  </div>
  <div class="footer-legal">
    <a href="${contactFile}">${t.footer.contact}</a>
    <a href="${privacyFile}">${t.footer.privacy}</a>
    <a href="${cookieFile}">${t.footer.cookie}</a>
  </div>
</footer>`;
}

/* Modale di prenotazione (2 step: selettore residenza → widget Vikey) — unica per tutte le pagine */
function modal({ lang }) {
  const t = ui[lang];
  const selButtons = properties
    .map(
      (p) => `        <button class="prop-sel-btn" data-action="select-prop" data-prop="${p.id}">
          <span class="psel-code">${p.code}</span>
          <span class="psel-name">${p.name}</span>
          <span class="psel-detail">${p.rooms} ${t.roomWord(p.rooms)} &middot; ${p.guests} ${t.guestWord}</span>
          <span class="psel-arrow">&#8250;</span>
        </button>`
    )
    .join('\n');

  return `<div class="modal-overlay" id="modalOverlay" data-action="modal-overlay">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalStep1Title">
    <button class="modal-close" data-action="modal-close" aria-label="Chiudi">&#10005;</button>

    <!-- STEP 1: selezione residenza -->
    <div id="modalStep1">
      <p class="modal-eyebrow">${t.modal.eyebrow}</p>
      <h3 class="modal-title" id="modalStep1Title" style="margin-bottom:1.75rem">${t.modal.question}</h3>
      <div class="prop-selector">
${selButtons}
      </div>
    </div>

    <!-- STEP 2: widget Vikey -->
    <div id="modalStep2" style="display:none">
      <button class="modal-back" data-action="modal-back">&#8592; ${t.modal.back}</button>
      <p class="modal-eyebrow" id="modalCode"></p>
      <h3 class="modal-title" id="modalTitle"></h3>
      <div class="modal-widget" id="modalWidget"></div>
    </div>
  </div>
</div>`;
}

/* Lightbox galleria (solo pagine residenza) */
function lightbox({ lang }) {
  const t = ui[lang];
  return `<div class="lightbox" id="lb" role="dialog" aria-modal="true" aria-label="${t.prop.galleryAria}" data-action="lb-overlay">
  <button class="lb-close" data-action="lb-close" aria-label="Chiudi">&#10005;</button>
  <button class="lb-prev" data-action="lb-prev" aria-label="Precedente">&#8249;</button>
  <img id="lbImg" src="" alt="">
  <button class="lb-next" data-action="lb-next" aria-label="Successiva">&#8250;</button>
</div>`;
}

/* Script di chiusura + FAB mobile */
function scripts({ assetPrefix, book }) {
  const t = ui[book.lang];
  const fab =
    book.type === 'prop'
      ? `<button class="book-fab" data-action="book" data-prop="${book.id}">&#8594; ${t.nav.book}</button>`
      : `<button class="book-fab" data-action="book-selector">&#8594; ${t.nav.book}</button>`;
  return `<script src="${assetPrefix}catalog.js"></script>
<script src="${assetPrefix}shared.js"></script>
${fab}
<script src="${assetPrefix}main.js"></script>`;
}

/* Catalogo lato browser (chiavi Vikey + nomi) — generato da data.js, una sola fonte */
function clientCatalog() {
  const props = {};
  properties.forEach((p) => {
    props[p.id] = { code: p.code, name: p.name, vikey: p.vikey };
  });
  const payload = { order: properties.map((p) => p.id), props };
  return '/* GENERATO da build.js — non modificare a mano. Fonte: src/data.js */\n'
    + 'window.FIORENTI=' + JSON.stringify(payload) + ';\n';
}

/* JSON-LD pagina indice (LodgingBusiness + 3 Apartment) */
function indexJsonLd(lang) {
  const t = ui[lang];
  const homeUrl = lang === 'it' ? site.domain + '/' : site.domain + '/en/';
  const propUrl = (p) => (lang === 'it' ? abs(p.id + '.html') : abs('en/' + p.id + '.html'));
  const places = properties.map((p) => ({
    '@type': 'Apartment',
    name: p.name,
    description: p.indexJsonDesc[lang],
    url: propUrl(p),
    image: absImg(p.ogImg),
    occupancy: { '@type': 'QuantitativeValue', maxValue: p.guests },
    numberOfRooms: p.rooms,
    address: { '@type': 'PostalAddress', addressLocality: t.city, addressCountry: 'IT' },
  }));
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: site.name,
    description:
      lang === 'it'
        ? "Tre residenze d'autore nel cuore di Milano per affitti brevi. Prenotazione diretta senza commissioni."
        : 'Three signature residences in the heart of Milan for short-term rentals. Direct booking with no commissions.',
    url: homeUrl,
    image: absImg('img_02.jpg'),
    address: { '@type': 'PostalAddress', addressLocality: t.city, addressRegion: 'MI', addressCountry: 'IT' },
    inLanguage: ['it', 'en'],
    containsPlace: places,
  };
  return JSON.stringify(obj, null, 2);
}

/* JSON-LD pagina residenza (Apartment) */
function propertyJsonLd(p, lang) {
  const t = ui[lang];
  const url = lang === 'it' ? abs(p.id + '.html') : abs('en/' + p.id + '.html');
  const homeUrl = lang === 'it' ? site.domain + '/' : site.domain + '/en/';
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'Apartment',
    name: p.name,
    description: p.pageJsonDesc[lang],
    url,
    identifier: p.cin,
    image: p.jsonImages.map(absImg),
    address: { '@type': 'PostalAddress', addressLocality: t.city, addressRegion: 'MI', addressCountry: 'IT' },
    occupancy: { '@type': 'QuantitativeValue', maxValue: p.guests },
    numberOfRooms: p.rooms,
    amenityFeature: p.schemaAmenities[lang].map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
    containedInPlace: { '@type': 'LodgingBusiness', name: site.name, url: homeUrl },
  };
  return JSON.stringify(obj, null, 2);
}

/* Documento completo */
function layout({ lang, headMeta, body, active, book }) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
${head(headMeta)}
</head>
<body>
${nav({ lang, active, book })}

${body}
${footer({ lang, assetPrefix: book.assetPrefix })}
${modal({ lang })}
${scripts({ assetPrefix: book.assetPrefix, book })}
</body>
</html>`;
}

module.exports = {
  site, ui, properties, files, byId,
  abs, absImg, langSwitchHref,
  head, nav, footer, modal, lightbox, scripts, clientCatalog,
  indexJsonLd, propertyJsonLd, layout,
};
