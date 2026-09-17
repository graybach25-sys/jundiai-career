# SUMMARY — Novo Capítulo v1

A single-page-style Next.js app for Andrea to explore a career change in Jundiaí, SP. Warm, practical, Portuguese-first, with an English toggle. No login and no server database: profile, quiz, résumé choices, LinkedIn drafts, saved jobs, weekly plan, interview answers, and cover letters persist in `localStorage`.

## What shipped

- Onboarding/profile with city default **Jundiaí, SP**, dynamic lists (education, experience, courses, languages, skills), and work constraints
- 8-step career quiz scored onto 6 local-market directions: admin/back-office, customer relationships, education support, healthcare support, operations/logistics/retail, tech-adjacent
- Brazilian currículo builder with two print-friendly templates and PDF via the browser print dialog
- LinkedIn copy in PT and EN (headline, about, bullets, skills, featured ideas) plus a setup checklist
- Jundiaí job hub: curated boards, training (SENAI/SEBRAE/Fatec), public options (SINE, Prefeitura), major local employers, Portuguese keyword tips, and a personal tracker
- Four-week action plan with persisted checkboxes
- Interview practice cards, cover-letter generator, and a “share with Gray” plain-text summary
- Sample/demo data, empty states with CTAs, mobile bottom navigation, PT/EN toggle, basic accessibility (labels, skip link, focus rings, contrast)

## Suggested v2

- Optional cloud backup / share link so Gray can follow along without screenshots
- Real job alerts (official APIs or RSS), still without scraping
- Deeper SENAI/SEBRAE course catalog by direction
- Interview mode with timer and recorded self-review
- Salary bands for Jundiaí / Campinas corridor by role
- WhatsApp-friendly weekly recap
- Export a ZIP (PDF currículo + LinkedIn text + plan)
- More languages only if needed; keep PT as home
