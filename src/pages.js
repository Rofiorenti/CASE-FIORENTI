/* ════════════════════════════════════════════════════════════════
   pages.js — contenuto specifico di ogni pagina (il chrome arriva da render.js)
   Ogni funzione restituisce { headMeta parziale, body, active, book }.
   ════════════════════════════════════════════════════════════════ */

const R = require('./render');
const { site, ui, properties, files, abs, absImg, langSwitchHref, lightbox } = R;

const night = (lang) => (lang === 'it' ? 'notte' : 'night');
const discover = (lang) => (lang === 'it' ? 'Scopri' : 'Discover');

/* hreflang condiviso per le pagine indicizzate */
function hreflangFor(pageId) {
  const f = files[pageId];
  return {
    it: f.it === 'index.html' ? site.domain + '/' : abs(f.it),
    en: f.en === 'index.html' ? site.domain + '/en/' : abs('en/' + f.en),
    xdefault: f.it === 'index.html' ? site.domain + '/' : abs(f.it),
  };
}

/* ── HOME ── */
function indexPage(ctx) {
  const { lang, assetPrefix } = ctx;
  const t = ui[lang];
  const copy = {
    it: {
      heroH1: 'Appartamenti Fiorenti – Affitti brevi di lusso a Milano',
      tagline: "Tre residenze d'autore nel cuore di Milano",
      cta: 'Scopri le residenze',
      philEyebrow: 'La nostra filosofia',
      philH2: 'Non affittiamo appartamenti.<br>Offriamo un modo di vivere Milano.',
      philP: "Ogni residenza è curata nei minimi dettagli: dai materiali agli arredi, dalla biancheria alla luce naturale. Tre caratteri diversi, un'unica cura costante.",
      residences: 'Le Residenze',
    },
    en: {
      heroH1: 'Appartamenti Fiorenti – Luxury Short-Term Rentals in Milan',
      tagline: 'Three signature residences in the heart of Milan',
      cta: 'Discover the residences',
      philEyebrow: 'Our philosophy',
      philH2: "We don't rent apartments.<br>We offer a way to live Milan.",
      philP: 'Every residence is crafted down to the last detail: from materials to furnishings, from linen to natural light. Three distinct characters, one constant care.',
      residences: 'The Residences',
    },
  }[lang];

  const cards = properties
    .map(
      (p) => `    <article class="pc">
      <a class="pc-link" href="${p.id}.html">
        <div class="pc-vis"><img src="${assetPrefix}immagini/${p.ogImg}" alt="${p.name}" loading="lazy"><div class="pc-badge">${t.prop.available}</div><div class="pc-name-ov">${p.nameBr}</div></div>
        <div class="pc-body">
          <p class="pc-code">${p.code} &middot; ${t.city}</p>
          <p class="pc-desc">${p.cardDesc[lang]}</p>
          <div class="pc-meta">
            <div><p class="pc-ml">${t.prop.guests}</p><p class="pc-mv">${p.guests}</p></div>
            <div><p class="pc-ml">${t.prop.rooms}</p><p class="pc-mv">${p.rooms}</p></div>
            <div><p class="pc-ml">${t.prop.checkin}</p><p class="pc-mv">${p.checkin}</p></div>
            <div><p class="pc-ml">${t.prop.from}</p><p class="pc-mv">&euro;${p.price}/${night(lang)}</p></div>
          </div>
          <p class="pc-cin">${t.prop.cin} ${p.cin}</p>
        </div>
      </a>
      <div class="pc-ctas">
        <a class="btn-outline" href="${p.id}.html" style="font-size:.62rem">${discover(lang)} &rarr;</a>
        <button class="btn-primary" style="font-size:.62rem" data-action="book" data-prop="${p.id}">${t.nav.book}</button>
      </div>
    </article>`
    )
    .join('\n');

  const body = `<section class="hero-index">
  <div class="hero-bg-idx" id="heroBg" style="background-image:url('${assetPrefix}immagini/img_02.jpg')"></div>
  <div class="hero-dots-idx" id="heroDots"></div>
  <div class="hero-content-idx">
    <h1 class="sr-only">${copy.heroH1}</h1>
    <img src="${assetPrefix}immagini/img_01.webp" alt="Appartamenti Fiorenti" class="hero-logo-lg">
    <p class="hero-tagline">${copy.tagline}</p>
    <div class="hero-ctas">
      <a href="#residenze" class="btn-primary">${copy.cta}</a>
    </div>
  </div>
</section>
<div class="divider">&#10022; &#10022; &#10022;</div>
<section class="intro-sec">
  <p class="section-eyebrow">${copy.philEyebrow}</p>
  <h2>${copy.philH2}</h2>
  <p>${copy.philP}</p>
</section>
<section class="props-sec" id="residenze">
  <p class="section-eyebrow" style="margin-bottom:3rem">${copy.residences}</p>
  <div class="props-grid">
${cards}
  </div>
</section>`;

  const homeUrl = lang === 'it' ? site.domain + '/' : site.domain + '/en/';
  return {
    active: 'index',
    book: { type: 'selector' },
    body,
    headMeta: {
      title: lang === 'it'
        ? 'Appartamenti Fiorenti Milano – Affitti Brevi di Lusso senza Commissioni'
        : 'Appartamenti Fiorenti Milan – Luxury Short-Term Rentals, No Commission',
      description: lang === 'it'
        ? "Tre residenze d'autore nel cuore di Milano. Prenota direttamente senza commissioni: Casa di Ringhiera ai Navigli, Dimora sul Canale, Dimora Vertigo vicino al Duomo."
        : 'Three signature residences in the heart of Milan. Book directly with no commissions: Casa di Ringhiera, Dimora sul Canale near Navigli, Dimora Vertigo near the Duomo.',
      og: {
        title: lang === 'it'
          ? "Appartamenti Fiorenti · Milano – Tre Residenze d'Autore"
          : 'Appartamenti Fiorenti · Milan – Three Signature Residences',
        description: lang === 'it'
          ? "Tre residenze d'autore nel cuore di Milano. Prenota direttamente senza commissioni."
          : 'Three signature residences in the heart of Milan. Book directly with no commissions.',
        image: absImg('img_02.jpg'),
        type: 'website',
        url: homeUrl,
        locale: t.ogLocale,
        localeAlt: t.ogLocaleAlt,
      },
      canonical: homeUrl,
      hreflang: hreflangFor('index'),
      preloadImg: 'img_02.jpg',
      jsonld: R.indexJsonLd(lang),
    },
  };
}

/* ── PAGINA RESIDENZA ── */
function propertyPage(p, ctx) {
  const { lang, assetPrefix } = ctx;
  const t = ui[lang];

  const thumbs = p.gallery
    .map((g, i) => {
      const alt = `${p.name} – ${t.prop.photo} ${i + 1}`;
      const lazy = i === 0 ? '' : ' loading="lazy"';
      const activeCls = i === 0 ? ' active' : '';
      return `  <button class="gallery-thumb${activeCls}" data-action="lb-open" data-lb="${i}" aria-label="${alt}"><img src="${assetPrefix}immagini/${g}" alt="${alt}"${lazy}></button>`;
    })
    .join('\n');

  const galleryJson = JSON.stringify(p.gallery.map((g) => assetPrefix + 'immagini/' + g));
  const intro = p.intro[lang].map((x) => `    <p>${x}</p>`).join('\n');
  const amenities = p.amenities[lang].map((a) => `<div class="amenity">${a}</div>`).join('');

  const body = `<section class="prop-hero">
  <img src="${assetPrefix}immagini/${p.heroImg}" alt="${p.name}" class="prop-hero-img" fetchpriority="high">
  <div class="prop-hero-overlay"></div>
  <div class="prop-hero-title">
    <p class="prop-hero-eyebrow">${p.code} &middot; ${t.city}</p>
    <h1 class="prop-hero-name">${p.name}</h1>
  </div>
</section>
<div class="gallery-strip" data-gallery='${galleryJson}'>
${thumbs}
</div>
<div class="prop-content">
  <div class="prop-main">
    <p class="section-eyebrow">${p.code}</p>
    <h2>${t.h2Designed}</h2>
${intro}
    <div class="amenities">
      <h3>${t.prop.amenities}</h3>
      <div class="amenities-grid">${amenities}</div>
    </div>
    <div style="margin-top:2.5rem;display:flex;gap:1rem;flex-wrap:wrap">
      <button class="btn-primary" data-action="book" data-prop="${p.id}">${t.prop.bookNow}</button>
      <a href="index.html" class="btn-outline">${t.prop.others}</a>
    </div>
  </div>
  <aside class="prop-sidebar">
    <div class="booking-card">
      <p class="bc-title">${p.name}</p>
      <p class="bc-sub">${t.prop.directBooking}</p>
      <p class="bc-cin">${t.prop.cin} ${p.cin}</p>
      <div class="bc-meta">
        <div><p class="bc-m-label">${t.prop.guests}</p><p class="bc-m-val">${p.guests}</p></div>
        <div><p class="bc-m-label">${t.prop.rooms}</p><p class="bc-m-val">${p.bcRooms[lang]}</p></div>
        <div><p class="bc-m-label">${t.prop.checkin}</p><p class="bc-m-val">${p.checkin}</p></div>
        <div><p class="bc-m-label">${t.prop.from}</p><p class="bc-m-val">&euro;${p.price}/${night(lang)}</p></div>
      </div>
      <button class="btn-primary bc-btn" data-action="book" data-prop="${p.id}">${t.prop.checkAvail}</button>
      <p class="bc-note">${t.prop.note}</p>
    </div>
  </aside>
</div>
${lightbox({ lang })}`;

  const url = lang === 'it' ? abs(p.id + '.html') : abs('en/' + p.id + '.html');
  return {
    active: p.id,
    book: { type: 'prop', id: p.id },
    body,
    headMeta: {
      title: p.title[lang],
      description: p.metaDesc[lang],
      og: {
        title: p.ogTitle[lang],
        description: p.ogDesc[lang],
        image: absImg(p.ogImg),
        type: 'place',
        url,
        locale: t.ogLocale,
        localeAlt: t.ogLocaleAlt,
      },
      canonical: url,
      hreflang: hreflangFor(p.id),
      preloadImg: p.heroImg,
      jsonld: R.propertyJsonLd(p, lang),
    },
  };
}

/* ── CONTATTI (con form mailto) ── */
function contattiPage(ctx) {
  const { lang } = ctx;
  const c = {
    it: {
      title: 'Contatti – Appartamenti Fiorenti Milano',
      desc: 'Contatta Appartamenti Fiorenti per informazioni sulle residenze a Milano. Rispondiamo entro 24 ore.',
      eyebrow: 'Siamo qui', h1: 'Contatti', sub: 'Rispondiamo a tutte le richieste entro 24 ore',
      emailH: 'Email', emailP: 'Per informazioni sulle residenze, disponibilità o qualsiasi domanda:',
      bookH: 'Prenotazioni dirette', bookP: 'Puoi prenotare direttamente dal sito senza commissioni usando il pulsante <strong>Prenota</strong> su ogni pagina residenza.',
      supportH: 'Assistenza durante il soggiorno', supportP: 'Gli ospiti ricevono i contatti di assistenza diretta al momento del check-in. Supporto disponibile 24/7.',
      whereH: 'Dove siamo', whereP: "Le nostre residenze si trovano tutte a Milano, in quartieri centrali. I dettagli dell'indirizzo esatto vengono comunicati dopo la conferma della prenotazione.",
      note: 'Per richieste di prenotazione di gruppo, soggiorni superiori a 30 giorni o collaborazioni commerciali, scrivici specificando le tue esigenze.',
      formH: 'Scrivici', fName: 'Nome', fMsg: 'Messaggio', fSend: 'Invia messaggio',
      fHint: 'Premendo invio si aprirà il tuo programma di posta con il messaggio già pronto per info@casefiorenti.it.',
    },
    en: {
      title: 'Contact – Appartamenti Fiorenti Milan',
      desc: 'Contact Appartamenti Fiorenti for information about our Milan residences. We reply within 24 hours.',
      eyebrow: 'Get in touch', h1: 'Contact', sub: 'We reply to all enquiries within 24 hours',
      emailH: 'Email', emailP: 'For information about our residences, availability or any other question:',
      bookH: 'Direct bookings', bookP: 'You can book directly on our site with no commissions using the <strong>Book</strong> button on any residence page.',
      supportH: 'Support during your stay', supportP: 'Guests receive direct support contacts at check-in. Assistance available 24/7.',
      whereH: 'Where we are', whereP: 'All our residences are located in Milan, in central neighbourhoods. The exact address is provided after booking confirmation.',
      note: 'For group booking requests, stays longer than 30 days, or commercial partnerships, please write to us with your specific requirements.',
      formH: 'Write to us', fName: 'Name', fMsg: 'Message', fSend: 'Send message',
      fHint: 'When you press send, your email app will open with the message ready for info@casefiorenti.it.',
    },
  }[lang];

  const extraHead = `<style>
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;margin-top:2.5rem}
.contact-block h3{font-family:var(--serif);font-size:1.2rem;font-weight:400;margin-bottom:.75rem;color:var(--ink)}
.contact-block p{font-size:.95rem;color:#41524A;line-height:1.85}
.contact-block a{color:var(--terra);text-decoration:underline}
.contact-divider{height:1px;background:rgba(94,122,107,.15);margin:2.5rem 0}
.contact-note{font-family:var(--sans);font-size:.78rem;letter-spacing:.04em;color:var(--ash);font-style:italic}
.cf-heading{font-family:var(--serif);font-size:1.4rem;font-weight:400;margin:0 0 1.25rem;color:var(--ink)}
.contact-form{display:flex;flex-direction:column;gap:1rem;max-width:560px}
.cf-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.cf-field{display:flex;flex-direction:column;gap:.35rem}
.cf-field span{font-family:var(--sans);font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;color:var(--ash)}
.cf-field input,.cf-field textarea{font-family:var(--body);font-size:.95rem;color:var(--ink);background:#fff;border:1px solid rgba(94,122,107,.3);padding:.7rem .85rem;width:100%}
.cf-field input:focus,.cf-field textarea:focus{outline:2px solid var(--terra);outline-offset:1px;border-color:var(--terra)}
.cf-field textarea{resize:vertical;min-height:120px}
.contact-form .btn-primary{align-self:flex-start;border:none}
.cf-hint{font-family:var(--sans);font-size:.7rem;color:var(--ash);line-height:1.6}
.cf-error{font-family:var(--sans);font-size:.78rem;color:var(--terra);margin:0}
@media(max-width:640px){.contact-grid{grid-template-columns:1fr}.cf-row{grid-template-columns:1fr}}
</style>`;

  const body = `<div class="static-hero">
  <p class="section-eyebrow" style="justify-content:center">${c.eyebrow}</p>
  <h1>${c.h1}</h1>
  <p>${c.sub}</p>
</div>

<div class="static-body">
  <div class="contact-grid">
    <div class="contact-block">
      <h3>${c.emailH}</h3>
      <p>${c.emailP}<br>
      <a href="mailto:${site.email}">${site.email}</a></p>
    </div>
    <div class="contact-block">
      <h3>${c.bookH}</h3>
      <p>${c.bookP}</p>
    </div>
    <div class="contact-block">
      <h3>${c.supportH}</h3>
      <p>${c.supportP}</p>
    </div>
    <div class="contact-block">
      <h3>${c.whereH}</h3>
      <p>${c.whereP}</p>
    </div>
  </div>

  <div class="contact-divider"></div>

  <h2 class="cf-heading">${c.formH}</h2>
  <form id="contactForm" class="contact-form" novalidate>
    <div class="cf-row">
      <label class="cf-field">
        <span>${c.fName}</span>
        <input type="text" name="name" required autocomplete="name">
      </label>
      <label class="cf-field">
        <span>Email</span>
        <input type="email" name="email" required autocomplete="email">
      </label>
    </div>
    <label class="cf-field">
      <span>${c.fMsg}</span>
      <textarea name="message" rows="5" required></textarea>
    </label>
    <p class="cf-error" id="cfError" role="alert" hidden></p>
    <button type="submit" class="btn-primary">${c.fSend}</button>
    <p class="cf-hint">${c.fHint}</p>
  </form>

  <div class="contact-divider"></div>

  <p class="contact-note">${c.note}</p>
</div>`;

  return {
    active: null,
    book: { type: 'selector' },
    body,
    headMeta: { title: c.title, description: c.desc, robots: 'noindex,follow', extraHead },
  };
}

/* ── PRIVACY ── */
function privacyPage(ctx) {
  const { lang } = ctx;
  const body = lang === 'it' ? privacyBodyIt() : privacyBodyEn();
  return {
    active: null,
    book: { type: 'selector' },
    headMeta: { title: 'Privacy Policy – Appartamenti Fiorenti', robots: 'noindex,follow' },
    body,
  };
}

function privacyBodyIt() {
  return `<div class="static-hero">
  <p class="section-eyebrow" style="justify-content:center">Informativa</p>
  <h1>Privacy Policy</h1>
  <p>Informativa sul trattamento dei dati personali ai sensi del GDPR (Reg. UE 2016/679)</p>
</div>

<div class="static-body">
  <p class="last-update">Ultimo aggiornamento: giugno 2026</p>

  <h2>1. Titolare del trattamento</h2>
  <p>Titolare del trattamento è <strong>Appartamenti Fiorenti</strong>, con sede a Milano (MI), Italia. Per qualsiasi richiesta relativa ai tuoi dati personali puoi contattarci all'indirizzo: <a href="mailto:${site.email}">${site.email}</a>.</p>

  <h2>2. Dati raccolti e finalità</h2>
  <p>Il sito <strong>casefiorenti.it</strong> raccoglie dati personali nelle seguenti situazioni:</p>
  <ul>
    <li><strong>Prenotazione diretta:</strong> quando utilizzi il widget di prenotazione Vikey, i dati che inserisci (nome, email, date di soggiorno, informazioni di pagamento) sono trattati da Vikey S.r.l. in qualità di titolare autonomo. Consulta la privacy policy di Vikey per i dettagli.</li>
    <li><strong>Contatto via email:</strong> se ci scrivi all'indirizzo indicato nella pagina Contatti, tratteremo i tuoi dati (nome, email, contenuto del messaggio) esclusivamente per risponderti.</li>
    <li><strong>Dati di navigazione:</strong> il server web acquisisce automaticamente l'indirizzo IP e le informazioni di accesso alle pagine a fini di sicurezza e diagnosi tecnica. Questi dati non sono associati a persone identificate.</li>
  </ul>

  <h2>3. Google Fonts</h2>
  <p>Questo sito utilizza Google Fonts, un servizio di Google LLC. Quando visiti una pagina, il tuo browser effettua una richiesta ai server di Google per scaricare i caratteri tipografici: in questo processo viene trasmesso l'indirizzo IP dell'utente. La base giuridica è il legittimo interesse a garantire una resa grafica coerente del sito. Maggiori informazioni: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>.</p>

  <h2>4. Base giuridica del trattamento</h2>
  <ul>
    <li>Esecuzione di un contratto (prenotazione): art. 6 par. 1 lett. b GDPR</li>
    <li>Legittimo interesse tecnico e di sicurezza: art. 6 par. 1 lett. f GDPR</li>
    <li>Consenso (ove richiesto): art. 6 par. 1 lett. a GDPR</li>
  </ul>

  <h2>5. Conservazione dei dati</h2>
  <p>I dati di contatto sono conservati per il tempo strettamente necessario a gestire la richiesta e, se applicabile, a ottemperare agli obblighi di legge (es. contabilità: 10 anni). I log tecnici vengono eliminati entro 30 giorni.</p>

  <h2>6. Diritti dell'interessato</h2>
  <p>Puoi esercitare in qualsiasi momento i seguenti diritti inviando una richiesta a <a href="mailto:${site.email}">${site.email}</a>:</p>
  <ul>
    <li>Accesso ai dati che ti riguardano</li>
    <li>Rettifica di dati inesatti</li>
    <li>Cancellazione («diritto all'oblio»)</li>
    <li>Limitazione del trattamento</li>
    <li>Portabilità dei dati</li>
    <li>Opposizione al trattamento</li>
    <li>Revoca del consenso (senza pregiudizio per il trattamento svolto in precedenza)</li>
  </ul>
  <p>Hai inoltre il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener">garanteprivacy.it</a>).</p>

  <h2>7. Trasferimento dei dati</h2>
  <p>I dati non sono trasferiti a paesi terzi al di fuori dello Spazio Economico Europeo, salvo quanto indicato al punto 3 relativamente a Google LLC (con adeguate garanzie ai sensi del GDPR).</p>

  <h2>8. Modifiche</h2>
  <p>Questa informativa può essere aggiornata periodicamente. La versione aggiornata è sempre disponibile a questa pagina con la data di ultima revisione.</p>
</div>`;
}

function privacyBodyEn() {
  return `<div class="static-hero">
  <p class="section-eyebrow" style="justify-content:center">Legal</p>
  <h1>Privacy Policy</h1>
  <p>Information on the processing of personal data pursuant to the GDPR (EU Reg. 2016/679)</p>
</div>

<div class="static-body">
  <p class="last-update">Last updated: June 2026</p>

  <h2>1. Data Controller</h2>
  <p>The data controller is <strong>Appartamenti Fiorenti</strong>, based in Milan (MI), Italy. For any enquiry relating to your personal data, please contact us at: <a href="mailto:${site.email}">${site.email}</a>.</p>

  <h2>2. Data Collected and Purposes</h2>
  <p>The website <strong>casefiorenti.it</strong> collects personal data in the following situations:</p>
  <ul>
    <li><strong>Direct booking:</strong> when you use the Vikey booking widget, the data you enter (name, email, stay dates, payment information) are processed by Vikey S.r.l. as an independent data controller. Please refer to Vikey's privacy policy for details.</li>
    <li><strong>Email contact:</strong> if you write to us at the address shown on the Contact page, we will process your data (name, email, message content) solely to reply to your enquiry.</li>
    <li><strong>Browsing data:</strong> the web server automatically collects IP addresses and page-access logs for security and technical diagnostics. These data are not linked to identified individuals.</li>
  </ul>

  <h2>3. Google Fonts</h2>
  <p>This site uses Google Fonts, a service provided by Google LLC. When you visit a page, your browser sends a request to Google's servers to download the typefaces: in this process, your IP address is transmitted. The legal basis is our legitimate interest in maintaining a consistent visual presentation of the site. More information: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>.</p>

  <h2>4. Legal Basis for Processing</h2>
  <ul>
    <li>Performance of a contract (booking): Art. 6(1)(b) GDPR</li>
    <li>Legitimate technical and security interest: Art. 6(1)(f) GDPR</li>
    <li>Consent (where required): Art. 6(1)(a) GDPR</li>
  </ul>

  <h2>5. Data Retention</h2>
  <p>Contact data are retained for as long as strictly necessary to handle the request and, where applicable, to comply with legal obligations (e.g. accounting: 10 years). Technical logs are deleted within 30 days.</p>

  <h2>6. Your Rights</h2>
  <p>You may exercise the following rights at any time by sending a request to <a href="mailto:${site.email}">${site.email}</a>:</p>
  <ul>
    <li>Access to your data</li>
    <li>Rectification of inaccurate data</li>
    <li>Erasure ("right to be forgotten")</li>
    <li>Restriction of processing</li>
    <li>Data portability</li>
    <li>Objection to processing</li>
    <li>Withdrawal of consent (without prejudice to processing carried out beforehand)</li>
  </ul>
  <p>You also have the right to lodge a complaint with the Italian Data Protection Authority (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener">garanteprivacy.it</a>) or any EU supervisory authority.</p>

  <h2>7. International Transfers</h2>
  <p>Data are not transferred to countries outside the European Economic Area, except as noted in section 3 regarding Google LLC (with appropriate GDPR safeguards in place).</p>

  <h2>8. Changes</h2>
  <p>This policy may be updated periodically. The current version is always available on this page with the date of last revision.</p>
</div>`;
}

/* ── COOKIE ── */
function cookiePage(ctx) {
  const { lang } = ctx;
  const body = lang === 'it' ? cookieBodyIt() : cookieBodyEn();
  return {
    active: null,
    book: { type: 'selector' },
    headMeta: { title: 'Cookie Policy – Appartamenti Fiorenti', robots: 'noindex,follow' },
    body,
  };
}

function cookieBodyIt() {
  return `<div class="static-hero">
  <p class="section-eyebrow" style="justify-content:center">Informativa</p>
  <h1>Cookie Policy</h1>
  <p>Informativa sull'uso dei cookie ai sensi del Provvedimento Garante Privacy e della Direttiva ePrivacy</p>
</div>

<div class="static-body">
  <p class="last-update">Ultimo aggiornamento: giugno 2026</p>

  <h2>Cosa sono i cookie</h2>
  <p>I cookie sono piccoli file di testo che i siti web salvano sul tuo dispositivo durante la navigazione. Possono essere «di prima parte» (impostati dal sito che stai visitando) o «di terza parte» (impostati da servizi esterni).</p>

  <h2>Cookie utilizzati da questo sito</h2>
  <p>Il sito <strong>casefiorenti.it</strong> utilizza esclusivamente:</p>

  <h2>Cookie tecnici strettamente necessari</h2>
  <p>Questi cookie sono indispensabili per il funzionamento del sito e non richiedono il tuo consenso. Non raccolgono informazioni per finalità di profilazione o marketing.</p>
  <ul>
    <li><strong>Sessione browser:</strong> cookie temporanei che il browser elimina automaticamente alla chiusura della finestra.</li>
  </ul>

  <h2>Cookie di terze parti</h2>
  <p>Il sito integra i seguenti servizi di terze parti che possono impostare cookie propri:</p>
  <ul>
    <li>
      <strong>Google Fonts</strong> (Google LLC) — utilizzato per il caricamento dei caratteri tipografici. Può comportare la trasmissione dell'indirizzo IP ai server di Google. Non imposta cookie di tracciamento nella configurazione attuale.
      Informativa: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>
    </li>
    <li>
      <strong>Vikey Booking Engine</strong> (Vikey S.r.l.) — il widget di prenotazione, attivato solo quando l'utente apre il modulo di prenotazione, può impostare cookie tecnici di sessione necessari al processo di prenotazione.
      Informativa: <a href="https://www.vikey.it/privacy" target="_blank" rel="noopener">vikey.it/privacy</a>
    </li>
  </ul>

  <h2>Cookie di profilazione e marketing</h2>
  <p>Questo sito <strong>non utilizza</strong> cookie di profilazione, remarketing o analisi del comportamento dell'utente (es. Google Analytics, Facebook Pixel o simili).</p>

  <h2>Come gestire i cookie</h2>
  <p>Puoi controllare e gestire i cookie dal menu delle impostazioni del tuo browser. Disabilitare i cookie tecnici può compromettere il corretto funzionamento del sito.</p>
  <ul>
    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Chrome</a></li>
    <li><a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox" target="_blank" rel="noopener">Firefox</a></li>
    <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a></li>
    <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener">Edge</a></li>
  </ul>

  <h2>Modifiche</h2>
  <p>Questa Cookie Policy può essere aggiornata periodicamente. La versione vigente è sempre disponibile a questa pagina con la data di ultima revisione. Per ulteriori informazioni consulta la nostra <a href="privacy.html">Privacy Policy</a>.</p>
</div>`;
}

function cookieBodyEn() {
  return `<div class="static-hero">
  <p class="section-eyebrow" style="justify-content:center">Legal</p>
  <h1>Cookie Policy</h1>
  <p>Information on the use of cookies pursuant to the ePrivacy Directive and GDPR</p>
</div>

<div class="static-body">
  <p class="last-update">Last updated: June 2026</p>

  <h2>What are cookies?</h2>
  <p>Cookies are small text files that websites store on your device while you browse. They can be "first-party" (set by the site you are visiting) or "third-party" (set by external services).</p>

  <h2>Cookies used by this site</h2>
  <p>The website <strong>casefiorenti.it</strong> uses only the following:</p>

  <h2>Strictly necessary technical cookies</h2>
  <p>These cookies are essential for the site to function and do not require your consent. They do not collect information for profiling or marketing purposes.</p>
  <ul>
    <li><strong>Session cookies:</strong> temporary cookies that your browser deletes automatically when you close the window.</li>
  </ul>

  <h2>Third-party cookies</h2>
  <p>The site integrates the following third-party services that may set their own cookies:</p>
  <ul>
    <li>
      <strong>Google Fonts</strong> (Google LLC) — used to load typefaces. May involve the transmission of your IP address to Google's servers. Does not set tracking cookies in the current configuration.
      Privacy policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>
    </li>
    <li>
      <strong>Vikey Booking Engine</strong> (Vikey S.r.l.) — the booking widget, activated only when the user opens the booking form, may set technical session cookies necessary for the booking process.
      Privacy policy: <a href="https://www.vikey.it/privacy" target="_blank" rel="noopener">vikey.it/privacy</a>
    </li>
  </ul>

  <h2>Profiling and marketing cookies</h2>
  <p>This site does <strong>not use</strong> profiling, remarketing, or behavioural analytics cookies (e.g. Google Analytics, Facebook Pixel, or similar).</p>

  <h2>How to manage cookies</h2>
  <p>You can control and manage cookies through your browser settings. Disabling technical cookies may affect the correct functioning of the site.</p>
  <ul>
    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Chrome</a></li>
    <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener">Firefox</a></li>
    <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a></li>
    <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener">Edge</a></li>
  </ul>

  <h2>Changes</h2>
  <p>This Cookie Policy may be updated periodically. The current version is always available on this page with the date of last revision. For more information, see our <a href="privacy.html">Privacy Policy</a>.</p>
</div>`;
}

/* ── 404 (solo IT, alla radice) ── */
function notfoundPage() {
  const body = `<div class="err-404">
  <div class="err-code">404</div>
  <h1>Pagina non trovata</h1>
  <p>La pagina che stai cercando non esiste o è stata spostata.</p>
  <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center">
    <a href="index.html" class="btn-primary">Torna alla home</a>
    <button class="btn-outline" data-action="book-selector">Prenota una residenza</button>
  </div>
</div>`;
  return {
    active: null,
    book: { type: 'selector' },
    headMeta: { title: 'Pagina non trovata – Appartamenti Fiorenti', robots: 'noindex,nofollow' },
    body,
  };
}

module.exports = { indexPage, propertyPage, contattiPage, privacyPage, cookiePage, notfoundPage };
