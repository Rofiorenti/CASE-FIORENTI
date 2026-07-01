#!/usr/bin/env node
/* ════════════════════════════════════════════════════════════════
   build.js — generatore statico, ZERO dipendenze (solo Node core).
   Assembla le pagine HTML da src/data.js + src/render.js + src/pages.js.

   Uso:   node build.js
   Output: tutti i file *.html alla radice e in en/ (HTML statico, SEO intatta).
   I sorgenti da modificare sono in src/ — NON modificare gli .html generati.
   ════════════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');
const R = require('./src/render');
const P = require('./src/pages');
const { properties, files, langSwitchHref } = R;

const ROOT = __dirname;
const LANGS = ['it', 'en'];

let count = 0;
function write(relPath, html) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html + '\n', 'utf8');
  count++;
  console.log('  ✓ ' + relPath);
}

function assemble(pageId, lang, page) {
  if (typeof page.body !== 'string') {
    throw new Error(`Pagina "${pageId}" (${lang}): manca il campo "body".`);
  }
  const assetPrefix = lang === 'it' ? '' : '../';
  let langHref = pageId === 'notfound' ? 'en/index.html' : langSwitchHref(pageId, lang);
  const book = Object.assign({}, page.book, { assetPrefix, lang, langHref });
  const headMeta = Object.assign({}, page.headMeta, { lang, assetPrefix });
  return R.layout({ lang, headMeta, body: page.body, active: page.active, book });
}

function buildLang(lang) {
  const assetPrefix = lang === 'it' ? '' : '../';
  const ctx = { lang, assetPrefix };
  const dir = lang === 'it' ? '.' : 'en';
  const out = (pageId, file) => path.join(dir, file);

  write(out('index', files.index[lang]), assemble('index', lang, P.indexPage(ctx)));

  for (const p of properties) {
    write(out(p.id, files[p.id][lang]), assemble(p.id, lang, P.propertyPage(p, ctx)));
  }

  write(out('contatti', files.contatti[lang]), assemble('contatti', lang, P.contattiPage(ctx)));
  write(out('privacy', files.privacy[lang]), assemble('privacy', lang, P.privacyPage(ctx)));
  write(out('cookie', files.cookie[lang]), assemble('cookie', lang, P.cookiePage(ctx)));
}

console.log('Building Appartamenti Fiorenti …');

// catalogo lato browser (chiavi Vikey + nomi), generato dall'unica fonte src/data.js
fs.writeFileSync(path.join(ROOT, 'catalog.js'), R.clientCatalog(), 'utf8');
console.log('  ✓ catalog.js');

for (const lang of LANGS) buildLang(lang);

// 404 solo alla radice (GitHub Pages), solo in italiano
write(files.notfound.it, assemble('notfound', 'it', P.notfoundPage()));

console.log(`\nDone. ${count} pagine generate.`);
