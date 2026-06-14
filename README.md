# rotteperdute-site

Sito di **Rotte Perdute Traduzioni** — casa editrice indipendente che traduce
in italiano opere mai pubblicate prima. Realizzato con [Astro](https://astro.build/)
e Tailwind CSS v4.

## Sviluppo

```sh
npm install        # installa le dipendenze
npm run dev        # server di sviluppo su http://localhost:4321
npm run build      # genera il sito statico in ./dist
npm run preview    # anteprima locale della build
```

## Aggiungere un libro

Crea un file Markdown in `src/content/libri/<slug>.md`. Lo `slug` (nome file)
diventa l'URL: `/libri/<slug>`. Vedi i titoli esistenti come riferimento; lo
schema dei campi è definito in `src/content.config.ts`. Le copertine vanno in
`public/immagini/copertine/`.

Campi obbligatori: `titolo`, `autore`, `copertina`. Tutto il resto
(`lingua`, `paese`, `anno`, `traduttore`, `cartaceo`, `ebook`, ...) è
opzionale e compare solo se valorizzato. Imposta `inEvidenza: true` per
mostrarlo in homepage e `ordine` (numero più alto = più in alto) per
ordinarlo nel catalogo.
