/* ════════════════════════════════════════════════════════════════
   data.js — FONTE UNICA DI VERITÀ del sito
   Prezzi, capienze, CIN, chiavi Vikey, testi e traduzioni stanno SOLO qui.
   Le pagine HTML vengono generate da build.js a partire da questi dati.
   ════════════════════════════════════════════════════════════════ */

const site = {
  domain: 'https://casefiorenti.it',
  name: 'Appartamenti Fiorenti',
  email: 'info@casefiorenti.it',
  year: 2026,
};

/* Stringhe d'interfaccia (chrome) per lingua */
const ui = {
  it: {
    code: 'it',
    ogLocale: 'it_IT',
    ogLocaleAlt: 'en_GB',
    city: 'Milano',
    nav:    { home: 'Home', dimore: 'Dimore', book: 'Prenota' },
    footer: { rights: 'Tutti i diritti riservati', home: 'Home', contact: 'Contatti', privacy: 'Privacy Policy', cookie: 'Cookie Policy' },
    modal:  { eyebrow: 'Prenota', question: 'Quale residenza ti interessa?', back: 'Cambia residenza' },
    prop: {
      guests: 'Ospiti', rooms: 'Camere', checkin: 'Check-in', from: 'Da',
      amenities: 'Dotazioni', bookNow: 'Prenota ora', checkAvail: 'Verifica disponibilità',
      others: 'Altre residenze', directBooking: 'Prenotazione diretta · No commissioni',
      note: 'Pagamento sicuro · Cancellazione flessibile<br>Assistenza 24/7',
      photo: 'foto', galleryAria: 'Galleria immagini', available: 'Disponibile', cin: 'CIN',
    },
    h2Designed: 'Una residenza pensata<br>per chi vive Milano davvero.',
    // unità ("camera"/"camere") per il selettore di prenotazione
    roomWord: (n) => (n === 1 ? 'camera' : 'camere'),
    guestWord: 'ospiti',
  },
  en: {
    code: 'en',
    ogLocale: 'en_GB',
    ogLocaleAlt: 'it_IT',
    city: 'Milan',
    nav:    { home: 'Home', dimore: 'Residences', book: 'Book' },
    footer: { rights: 'All rights reserved', home: 'Home', contact: 'Contact', privacy: 'Privacy Policy', cookie: 'Cookie Policy' },
    modal:  { eyebrow: 'Book', question: 'Which residence are you interested in?', back: 'Change residence' },
    prop: {
      guests: 'Guests', rooms: 'Rooms', checkin: 'Check-in', from: 'From',
      amenities: 'Amenities', bookNow: 'Book now', checkAvail: 'Check availability',
      others: 'Other residences', directBooking: 'Direct booking · No commissions',
      note: 'Secure payment · Flexible cancellation<br>24/7 support',
      photo: 'photo', galleryAria: 'Image gallery', available: 'Available', cin: 'CIN',
    },
    h2Designed: 'A residence designed<br>for those who truly live Milan.',
    roomWord: (n) => (n === 1 ? 'room' : 'rooms'),
    guestWord: 'guests',
  },
};

/* Catalogo residenze */
const properties = [
  {
    id: 'vv14',
    code: 'VV14',
    name: 'Casa di Ringhiera',
    nameBr: 'Casa di<br>Ringhiera',
    price: 224,
    guests: 6,
    rooms: 2,
    bcRooms: { it: '2', en: '2' },
    checkin: '15:00',
    cin: 'IT015146C2POBM556W',
    vikey: 'rQcVj7dswRB0atMM8aXaqZnKJjsRdDVrx384GCmFqt4',
    heroImg: 'img_02.jpg',
    ogImg: 'img_02.jpg',
    gallery: ['img_02.jpg', 'img_17.jpg', 'img_18.jpg', 'img_19.jpg', 'img_20.jpg', 'img_21.jpg', 'img_22.jpg', 'img_23.jpg', 'img_24.jpg'],
    jsonImages: ['img_02.jpg', 'img_17.jpg', 'img_18.jpg'],
    title: {
      it: 'Casa di Ringhiera – Appartamento Milano 6 Ospiti | Appartamenti Fiorenti',
      en: 'Casa di Ringhiera – Milan Apartment 6 Guests | Appartamenti Fiorenti',
    },
    metaDesc: {
      it: 'Casa di Ringhiera (VV14): appartamento milanese con soffitti alti, pavimenti originali e cortile silenzioso. Fino a 6 ospiti, 2 camere. Prenota direttamente senza commissioni.',
      en: 'Casa di Ringhiera (VV14): authentic Milanese apartment with high ceilings, original floors and a silent courtyard. Up to 6 guests, 2 bedrooms. Book directly with no commissions.',
    },
    ogTitle: {
      it: 'Casa di Ringhiera · VV14 – Appartamento Milano 6 Ospiti',
      en: 'Casa di Ringhiera · VV14 – Milan Apartment up to 6 Guests',
    },
    ogDesc: {
      it: "L'anima autentica di Milano. Soffitti alti, pavimenti originali e il cortile silenzioso che solo gli edifici di ringhiera sanno offrire.",
      en: 'The authentic Milanese soul. High ceilings, original floors and the silent courtyard that only ringhiera buildings can offer.',
    },
    pageJsonDesc: {
      it: "L'anima milanese autentica. Soffitti alti, pavimenti originali e il cortile silenzioso che solo gli edifici di ringhiera sanno offrire. Fino a 6 ospiti, 2 camere.",
      en: 'Authentic Milanese apartment with high ceilings, original floors and a silent courtyard. Up to 6 guests, 2 bedrooms. Direct booking with no commissions.',
    },
    indexJsonDesc: {
      it: "L'anima milanese autentica. Soffitti alti, pavimenti originali e il cortile silenzioso che solo gli edifici di ringhiera sanno offrire.",
      en: 'The authentic Milanese soul. High ceilings, original floors and the silent courtyard that only ringhiera buildings can offer.',
    },
    cardDesc: {
      it: "L'anima milanese autentica. Soffitti alti, pavimenti originali e il cortile silenzioso che solo gli edifici di ringhiera sanno offrire.",
      en: 'The authentic Milanese soul. High ceilings, original floors and the silent courtyard that only ringhiera buildings can offer.',
    },
    intro: {
      it: [
        "L'edificio di ringhiera è l'anima di Milano che non si mostra ai turisti: cortili silenziosi, ballatoi in ferro battuto, soffitti con altezze che le costruzioni moderne non osano più replicare.",
        'Casa di Ringhiera porta tutto questo dentro un appartamento moderno e confortevole, con pavimenti originali restaurati, doppia camera, cucina attrezzata e un silenzio inaspettato per essere in piena città.',
      ],
      en: [
        'The ringhiera building is the soul of Milan that tourists never see: silent courtyards, wrought-iron balconies, ceilings at heights modern construction no longer dares to replicate.',
        'Casa di Ringhiera brings all of this into a modern, comfortable apartment — restored original floors, two bedrooms, a fully equipped kitchen and an unexpected quiet for being right in the city.',
      ],
    },
    amenities: {
      it: ['Wi-Fi fibra ottica', 'Cucina completamente attrezzata', '1 letto matrimoniale', '2 letti singoli (trasformabili)', '1 divano letto', 'Lavatrice', 'Aria condizionata', 'Smart TV', 'Biancheria premium', 'Check-in autonomo (24h)', 'Parcheggio nelle vicinanze'],
      en: ['Fibre-optic Wi-Fi', 'Fully equipped kitchen', '1 double bed', '2 single beds (convertible)', '1 sofa bed', 'Washing machine', 'Air conditioning', 'Smart TV', 'Premium linen', 'Self check-in (24h)', 'Nearby parking'],
    },
    schemaAmenities: {
      it: ['Wi-Fi fibra ottica', 'Aria condizionata', 'Cucina attrezzata', 'Lavatrice', 'Smart TV', 'Check-in autonomo 24h'],
      en: ['Fibre-optic Wi-Fi', 'Air conditioning', 'Fully equipped kitchen', 'Washing machine', 'Smart TV', 'Self check-in 24h'],
    },
  },

  {
    id: 'c3a',
    code: 'C3A',
    name: 'Dimora sul Canale',
    nameBr: 'Dimora<br>sul Canale',
    price: 438,
    guests: 8,
    rooms: 4,
    bcRooms: { it: '4', en: '4' },
    checkin: '15:00',
    cin: 'IT015146C2L8X2HZJ2',
    vikey: 'rQcVj7dswRB0atMM8aXaqZnKJ2cfUVNDx384GCmFqt4',
    heroImg: 'img_03.jpg',
    ogImg: 'img_03.jpg',
    gallery: ['img_03.jpg', 'img_05.jpg', 'img_06.jpg', 'img_07.jpg', 'img_08.jpg', 'img_09.jpg', 'img_10.jpg', 'img_11.jpg'],
    jsonImages: ['img_03.jpg', 'img_05.jpg', 'img_06.jpg'],
    title: {
      it: 'Dimora sul Canale – Appartamento Navigli Milano 8 Ospiti | Appartamenti Fiorenti',
      en: 'Dimora sul Canale – Navigli Milan Apartment 8 Guests | Appartamenti Fiorenti',
    },
    metaDesc: {
      it: 'Dimora sul Canale (C3A): appartamento luminoso ai Navigli, Milano. Fino a 8 ospiti, 4 camere matrimoniali, vista sul canale. Prenota direttamente senza commissioni.',
      en: 'Dimora sul Canale (C3A): bright apartment in the Navigli district, Milan. Up to 8 guests, 4 double bedrooms, canal view. Book directly with no commissions.',
    },
    ogTitle: {
      it: 'Dimora sul Canale · C3A – Appartamento Navigli Milano 8 Ospiti',
      en: 'Dimora sul Canale · C3A – Navigli Milan Apartment up to 8 Guests',
    },
    ogDesc: {
      it: 'Navigli, aperitivi e vita di quartiere. Un appartamento luminoso a pochi passi dalla movida più autentica di Milano.',
      en: "Navigli, aperitivos and neighbourhood life. A bright apartment steps away from the city's most authentic atmosphere.",
    },
    pageJsonDesc: {
      it: 'Appartamento luminoso ai Navigli, Milano. Fino a 8 ospiti, 4 camere matrimoniali, vista sul canale. Prenotazione diretta senza commissioni.',
      en: 'Bright apartment in the Navigli district, Milan. Up to 8 guests, 4 double bedrooms, canal view. Direct booking with no commissions.',
    },
    indexJsonDesc: {
      it: 'Navigli, aperitivi e vita di quartiere. Un appartamento luminoso a pochi passi dalla movida più autentica della città.',
      en: "Navigli, aperitivos and neighbourhood life. A bright apartment steps away from Milan's most authentic atmosphere.",
    },
    cardDesc: {
      it: 'Navigli, aperitivi e vita di quartiere. Un appartamento luminoso a pochi passi dalla movida più autentica della città.',
      en: "Navigli, aperitivos and neighbourhood life. A bright apartment steps away from the city's most authentic atmosphere.",
    },
    intro: {
      it: [
        "I Navigli sono il quartiere dove Milano si scioglie: mercati, gallerie, aperitivi al tramonto sull'acqua. Dimora sul Canale è immersa in questo ritmo, a pochi passi da tutto.",
        'Quattro camere da letto matrimoniali, tutte climatizzate: due con bagno en-suite privato, due che condividono un bagno comune. Ideale per famiglie numerose, gruppi di amici o due coppie che viaggiano insieme.',
      ],
      en: [
        'The Navigli district is where Milan unwinds: markets, galleries, sunset aperitivos on the water. Dimora sul Canale sits at the heart of this rhythm, steps away from everything.',
        'Four double bedrooms, all air-conditioned: two with private en-suite bathrooms, two sharing a common bathroom. Perfect for large families, groups of friends or two couples travelling together.',
      ],
    },
    amenities: {
      it: ['Wi-Fi fibra ottica', 'Cucina completamente attrezzata', '4 letti matrimoniali', '2 bagni en-suite', '1 bagno condiviso (x2 camere)', 'Lavatrice', 'Aria condizionata', 'Smart TV', 'Biancheria premium', 'Check-in autonomo (24h)', 'Vista sul canale'],
      en: ['Fibre-optic Wi-Fi', 'Fully equipped kitchen', '4 double beds', '2 en-suite bathrooms', '1 shared bathroom (x2 rooms)', 'Washing machine', 'Air conditioning', 'Smart TV', 'Premium linen', 'Self check-in (24h)', 'Canal view'],
    },
    schemaAmenities: {
      it: ['Wi-Fi fibra ottica', 'Aria condizionata', 'Cucina attrezzata', 'Lavatrice', 'Smart TV', 'Vista sul canale', '2 bagni en-suite'],
      en: ['Fibre-optic Wi-Fi', 'Air conditioning', 'Fully equipped kitchen', 'Washing machine', 'Smart TV', 'Canal view', '2 en-suite bathrooms'],
    },
  },

  {
    id: 'da23',
    code: 'DA23',
    name: 'Dimora Vertigo',
    nameBr: 'Dimora<br>Vertigo',
    price: 216,
    guests: 6,
    rooms: 1,
    bcRooms: { it: '1 + 2 soggiorni', en: '1 + 2 living' },
    checkin: '14:00',
    cin: 'IT015146C2N23WNVKF',
    vikey: 'rQcVj7dswRB0atMM8aXaqZy_JxxjTzRJx384GCmFqt4',
    heroImg: 'img_04.jpg',
    ogImg: 'img_04.jpg',
    gallery: ['img_04.jpg', 'img_12.jpg', 'img_13.jpg', 'img_14.jpg', 'img_15.jpg', 'img_16.jpg'],
    jsonImages: ['img_04.jpg', 'img_12.jpg', 'img_13.jpg'],
    title: {
      it: 'Dimora Vertigo – Appartamento Centro Milano vicino Duomo | Appartamenti Fiorenti',
      en: 'Dimora Vertigo – Central Milan Apartment near Duomo | Appartamenti Fiorenti',
    },
    metaDesc: {
      it: 'Dimora Vertigo (DA23): appartamento con design unico nel cuore di Milano, a pochi minuti dal Duomo. Fino a 6 ospiti. Prenota direttamente senza commissioni.',
      en: 'Dimora Vertigo (DA23): apartment with unique design in central Milan, minutes from the Duomo. Up to 6 guests. Book directly with no commissions.',
    },
    ogTitle: {
      it: 'Dimora Vertigo · DA23 – Appartamento Centro Milano vicino al Duomo',
      en: 'Dimora Vertigo · DA23 – Central Milan Apartment near the Duomo',
    },
    ogDesc: {
      it: 'Prospettive inaspettate nel cuore di Milano. Un appartamento che gioca con altezze e profondità, vicino ai monumenti iconici.',
      en: 'Unexpected perspectives in the heart of Milan. An apartment that plays with heights and depths, close to iconic landmarks.',
    },
    pageJsonDesc: {
      it: 'Appartamento con design unico nel cuore di Milano, a pochi minuti dal Duomo. Fino a 6 ospiti. Prenotazione diretta senza commissioni.',
      en: 'Apartment with unique design in central Milan, minutes from the Duomo. Up to 6 guests. Direct booking with no commissions.',
    },
    indexJsonDesc: {
      it: 'Prospettive inaspettate nel cuore di Milano. Un appartamento vicino ai monumenti iconici.',
      en: 'Unexpected perspectives in the heart of Milan. An apartment close to iconic landmarks.',
    },
    cardDesc: {
      it: 'Prospettive inaspettate nel cuore di Milano. Un appartamento che gioca con altezze e profondità, vicino ai monumenti iconici.',
      en: 'Unexpected perspectives in the heart of Milan. An apartment that plays with heights and depths, close to iconic landmarks.',
    },
    intro: {
      it: [
        'Il nome non è casuale: Dimora Vertigo gioca con le prospettive. Le altezze dei soffitti, i corridoi, la luce che entra da angolazioni inaspettate — ogni stanza ha qualcosa da scoprire.',
        "Posizione centrale, a pochi minuti a piedi dal Duomo e dalla vita commerciale e culturale del cuore di Milano. L'appartamento ospita fino a sei ospiti grazie a una camera da letto matrimoniale e due comode aree notte con divani letto.",
      ],
      en: [
        'The name is no accident: Dimora Vertigo plays with perspectives. The ceiling heights, the corridors, the light entering from unexpected angles — every room has something to discover.',
        'A central location, just minutes on foot from the Duomo and the commercial and cultural heart of Milan. The apartment sleeps up to six guests across one bedroom and quality finishes throughout.',
      ],
    },
    amenities: {
      it: ['Wi-Fi fibra ottica', 'Cucina completamente attrezzata', '1 letto matrimoniale', '2 divani letto', 'Lavatrice', 'Aria condizionata', 'Smart TV', 'Biancheria premium', 'Check-in autonomo (24h)', 'Posizione centralissima'],
      en: ['Fibre-optic Wi-Fi', 'Fully equipped kitchen', '1 double bed', '2 sofa beds', 'Washing machine', 'Air conditioning', 'Smart TV', 'Premium linen', 'Self check-in (24h)', 'Central location'],
    },
    schemaAmenities: {
      it: ['Wi-Fi fibra ottica', 'Aria condizionata', 'Cucina attrezzata', 'Lavatrice', 'Smart TV', 'Posizione centralissima', 'Check-in autonomo 24h'],
      en: ['Fibre-optic Wi-Fi', 'Air conditioning', 'Fully equipped kitchen', 'Washing machine', 'Smart TV', 'Central location', 'Self check-in 24h'],
    },
  },
];

/* Mappa pagina → nome file per lingua (per lo switch lingua e i link) */
const files = {
  index:    { it: 'index.html',        en: 'index.html' },
  vv14:     { it: 'vv14.html',         en: 'vv14.html' },
  c3a:      { it: 'c3a.html',          en: 'c3a.html' },
  da23:     { it: 'da23.html',         en: 'da23.html' },
  contatti: { it: 'contatti.html',     en: 'contact.html' },
  privacy:  { it: 'privacy.html',      en: 'privacy.html' },
  cookie:   { it: 'cookie-policy.html', en: 'cookie-policy.html' },
  notfound: { it: '404.html',          en: null },
};

module.exports = { site, ui, properties, files };
