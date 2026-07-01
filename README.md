# Appartamenti Fiorenti — sito

Sito statico bilingue (IT/EN) per affitti brevi, ospitato su GitHub Pages.

## Come modificare il sito

**Non modificare i file `.html`: sono generati.** Le pagine HTML vengono
prodotte da un piccolo generatore in `src/`. Si modificano i sorgenti e si
rilancia il build.

### Build

```bash
node build.js
```

Nessuna dipendenza da installare (solo Node.js). Il comando rigenera tutti gli
`.html` (radice + `en/`) e `catalog.js`, poi si committano i file generati.

### Dove sta cosa

| File | Contenuto |
|------|-----------|
| `src/data.js`   | **Fonte unica**: prezzi, ospiti, camere, CIN, chiavi Vikey, testi e traduzioni delle residenze |
| `src/render.js` | Componenti condivisi: `nav`, `footer`, modale, `<head>`, JSON-LD, `catalog.js` |
| `src/pages.js`  | Contenuto specifico di ogni pagina (home, residenza, contatti, privacy, cookie, 404) |
| `build.js`      | Genera tutti gli `.html` + `catalog.js` |
| `stile.css`, `shared.js`, `main.js` | Asset statici condivisi (modificabili direttamente) |

Esempi:
- Cambiare un prezzo o un CIN → `src/data.js`, poi `node build.js`.
- Cambiare una voce di menu o il footer → `src/render.js`, poi `node build.js`.
- Aggiungere una residenza → nuovo oggetto in `properties` (`src/data.js`) +
  una riga nella mappa `files`, poi `node build.js`.

### Note tecniche

- **Nessun handler inline**: tutti gli eventi passano per delegazione su
  attributi `data-action` (compatibile con una Content-Security-Policy severa).
- **Modale unica** a 2 step (selettore → widget Vikey) su tutte le pagine.
- **Form contatti**: invio via `mailto:` (nessun backend, nessun servizio terzo).
- `catalog.js` è generato da `src/data.js`: contiene solo i dati che servono al
  browser (chiavi Vikey pubbliche + nomi). Non modificarlo a mano.
