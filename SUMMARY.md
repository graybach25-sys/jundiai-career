# SUMMARY — Novo Capítulo

A Next.js app for Andrea to explore a career change in Jundiaí, SP. Warm, practical, Portuguese-first, with an English toggle. No login.

Everyday edits stay in `localStorage` on her phone. A one-tap PDF downloads the currículo. A short link snapshots the whole app so Gray can read it on another device.

## What shipped

- Onboarding/profile with city default **Jundiaí, SP**, dynamic lists, and work constraints
- 8-step career quiz scored onto 6 local-market directions
- Brazilian currículo builder with two templates
- **Salvar currículo (PDF)** — real file download in one tap from Currículo (and from Início once the profile has started). **Enviar currículo** uses the Web Share API when the phone can share a PDF
- LinkedIn copy in PT and EN plus a setup checklist
- Jundiaí job hub and a personal opportunity tracker
- Four-week action plan
- Interview practice and cover-letter generator
- **Compartilhar com Gray** — **Criar link para meu marido** stores a snapshot and shows `/ver/XXXXXXXX`. **Copiar link**, **Enviar link**, and **Atualizar link**. Sharing does not clear `localStorage`
- Read-only page for Gray with her filled profile, map, currículo PDF, LinkedIn drafts (PT and EN), plan, jobs, interview notes, and letters — not a blank shell
- Sample data, empty states, mobile navigation, PT/EN toggle, basic accessibility

## Storage

Share snapshots use a private Vercel Blob store (`BLOB_READ_WRITE_TOKEN`). Locally, without that token, files go to `.data/shares/`. See `README.md` for the env var and deploy steps.

## Still open

- Real job alerts (official APIs or RSS), still without scraping
- Deeper SENAI/SEBRAE course catalog by direction
- Interview mode with timer and recorded self-review
- Salary bands for the Jundiaí / Campinas corridor
- Expire or revoke a share link from the phone
