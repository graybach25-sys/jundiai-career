# Novo Capítulo — Jundiaí

A warm, mobile-friendly career companion for **Andrea Bach**: explore a career change and look for work in **Jundiaí, São Paulo**, at an easy pace. Portuguese first, with a PT / EN toggle. No login.

Her answers stay on the phone (`localStorage`). When she chooses, she can save a currículo PDF and create a private link so Gray can open the same progress on another device.

## Run locally

```bash
npm install && npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other commands:

```bash
npm run lint
npm run build
npm start
```

Requires Node.js 20+.

## Salvar o currículo (PDF)

On **Currículo**, one tap on **Salvar currículo (PDF)** downloads a real PDF file (for example `Curriculo-Andrea.pdf`). No print dialog.

On a phone, **Enviar currículo** appears when the device can share files. She can send it to WhatsApp, email, or Arquivos.

The same save button is on the home screen after the profile has a name or experience. Início → the button is one tap.

## Compartilhar com o Gray

1. Tap **Compartilhar com Gray** (home or the Compartilhar page).
2. Tap **Criar link para meu marido**.

The page shows a short code and a link like `https://jundiai-career.vercel.app/ver/AB3K7PQM`. **Copiar link** copies it. **Enviar link** uses the phone share sheet when available. The address is also in a box she can press and hold.

Gray opens that link on any device. He sees her profile, map, currículo (with the same PDF button), LinkedIn drafts in Portuguese and English, plan, and saved jobs. The page is read-only. It is not the empty app.

After she edits something, she taps **Atualizar link** once. The same address shows the new version.

Creating or updating the link does **not** erase her phone. **Limpar dados** on this phone also leaves the last shared version in place until she taps **Atualizar link**.

The link is the password. Anyone with it can read the phone number, email, and notes she saved. Don’t post it publicly.

## Environment variable

| Name | Required in production | Purpose |
| --- | --- | --- |
| `BLOB_READ_WRITE_TOKEN` | Yes | Private [Vercel Blob](https://vercel.com/docs/vercel-blob) store that keeps each snapshot under a short code |

The store **jundiai-career-shares** (region `gru1`, access private) is already connected to the Vercel project **jundiai-career**. The token is set for Production, Preview, and Development.

Do not commit the token. `.env.example` only names the variable.

Without the token, a local `npm run dev` still works: snapshots are JSON files in `.data/shares/` (gitignored). On Vercel, a missing token makes **Criar link** fail with a plain retry message instead of saving data on a disk that disappears.

## Deploy

Production is [https://jundiai-career.vercel.app](https://jundiai-career.vercel.app).

1. Merge this pull request into `main`.
2. Vercel deploys that branch. The Blob token is already on the project, so no dashboard step is required for the share link.
3. On her phone, open the new site, tap **Compartilhar com Gray**, then **Criar link para meu marido**, and send Gray the link.

If production is still the previous deploy, the home screen on his computer stays empty until this branch is merged — her data never left the phone.

## What you can do

1. **Perfil** — Name, city (defaults to Jundiaí), education, experience, courses, skills, languages, and work constraints. Saved automatically on the phone.
2. **Mapa (quiz)** — Eight questions. Maps to six directions for the Jundiaí / inland-SP market.
3. **Currículo** — Brazilian-style résumé, two templates, one-tap PDF.
4. **LinkedIn** — Headline, about, bullets, skills, and a setup checklist, in PT and EN.
5. **Vagas** — Curated boards, training, and a personal tracker.
6. **Plano** — A four-week checklist.

Also included: interview practice, a cover-letter generator, and a short WhatsApp text under Compartilhar.

## Privacy

Day-to-day edits stay under the `localStorage` key `novo-capitulo-jundiai-v1`. The share link, if she creates one, is stored separately under `novo-capitulo-share-v1` (code + secret used only to update that link). Snapshot contents live in the private Blob store, readable only through `/ver/XXXXXXXX`.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · React 19 · Vercel Blob

See `SUMMARY.md` for what shipped and ideas still open.
