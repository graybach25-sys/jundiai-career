# Novo Capítulo — Jundiaí

A warm, mobile-friendly career companion for **Andrea Bach**: explore a career change and look for work in **Jundiaí, São Paulo**, at an easy pace. Built as a single Next.js frontend. Nothing is uploaded — everything stays in the browser (`localStorage`). No login.

Primary language is **Portuguese (Brazil)**, with a **PT / EN** toggle.

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

## What you can do

1. **Perfil** — Name, city (defaults to Jundiaí), education, experience, courses, skills, languages, and work constraints (hybrid/remote, travel to São Paulo, schedule). Saved automatically.
2. **Mapa (quiz)** — Eight thoughtful questions (values, interests, strengths, energy drains, lifestyle, retraining). Maps to six realistic directions for the Jundiaí / inland-SP market. Redo anytime.
3. **Currículo** — Brazilian-style one-page résumé, two templates (classic / contemporary). Print or save as PDF from the browser print dialog.
4. **LinkedIn** — Headline, about, experience bullets, skills, featured ideas, in PT and EN, plus an account setup checklist.
5. **Vagas** — Curated links (Catho, InfoJobs, LinkedIn Jobs, Vagas.com, Indeed BR, SINE/Emprega Brasil, SENAI, SEBRAE, Fatec, Prefeitura, Hospital São Vicente, malls, logistics corridor) and a personal opportunity tracker.
6. **Plano** — A four-week checklist (LinkedIn, currículo, applications, interview practice, networking). Progress is saved locally.

Nice-to-haves included:

- Interview Q&A practice cards (common Brazilian questions)
- Cover letter / carta de apresentação generator (PT + EN)
- “Tell Gray” summary you can copy to WhatsApp or email
- Sample data button so you can explore once, then clear

## Privacy

All data lives under the `localStorage` key `novo-capitulo-jundiai-v1` on this device. Clearing site data or using **Limpar dados** in Perfil resets the app. There is no backend, no account, and no job-board scraping.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · React 19

See `SUMMARY.md` for what shipped in v1 and ideas for v2.
