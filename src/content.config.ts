import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Un punto vendita (store) con logo opzionale.
 * Se `logo` manca, il template mostra il `nome` testuale.
 */
const store = z.object({
  nome: z.string(),
  url: z.string().url(),
  logo: z.string().optional(),
});

/**
 * Collezione "libri" — scalabile oltre la letteratura brasiliana.
 * Tutti i campi descrittivi extra (lingua, paese, anno...) sono opzionali
 * e vengono mostrati solo se presenti, così l'aggiunta di un libro
 * richiede il minimo indispensabile.
 */
const libri = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/libri' }),
  schema: z.object({
    titolo: z.string(),
    autore: z.string(),
    traduttore: z.string().optional(),
    titoloOriginale: z.string().optional(),
    anno: z.number().optional(),
    lingua: z.string().optional(),
    paese: z.string().optional(),
    collana: z.string().optional(),
    pagine: z.number().optional(),
    isbn: z.string().optional(),
    copertina: z.string(),
    estratto: z.string().optional(),
    inEvidenza: z.boolean().default(false),
    ordine: z.number().default(0),
    cartaceo: z.array(store).default([]),
    ebook: z.array(store).default([]),
  }),
});

export const collections = { libri };
