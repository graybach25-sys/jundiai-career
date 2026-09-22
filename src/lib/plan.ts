import type { DirectionId, Locale, PlanItem, Profile } from "./types";

export type PlanTemplateItem = {
  id: string;
  week: number;
  title: Record<Locale, string>;
  detail: Record<Locale, string>;
};

export function buildPlanTemplate(top: DirectionId | null): PlanTemplateItem[] {
  const focusHint: Record<Locale, string> = top
    ? {
        pt: "Use o resultado do quiz como filtro — não se candidate a tudo.",
        en: "Use your quiz result as a filter — do not apply to everything.",
      }
    : {
        pt: "Se ainda não fez o quiz, comece por ele esta semana.",
        en: "If you have not taken the quiz yet, start there this week.",
      };

  return [
    {
      id: "w1-profile",
      week: 1,
      title: { pt: "Completar o perfil com calma", en: "Finish your profile at an easy pace" },
      detail: {
        pt: "Nome, cidade, experiências e o que você não quer. 30 minutos bastam.",
        en: "Name, city, experience, and what you do not want. Thirty minutes is enough.",
      },
    },
    {
      id: "w1-quiz",
      week: 1,
      title: { pt: "Fazer (ou refazer) o mapa de caminhos", en: "Take (or retake) the career-path quiz" },
      detail: focusHint,
    },
    {
      id: "w1-photo",
      week: 1,
      title: { pt: "Separar uma foto simples e luminosa", en: "Set aside a simple, well-lit photo" },
      detail: {
        pt: "Ombros, rosto visível, fundo calmo. Não precisa ser estúdio.",
        en: "Shoulders, visible face, calm background. No studio required.",
      },
    },
    {
      id: "w2-cv",
      week: 2,
      title: { pt: "Fechar o currículo em uma página", en: "Finish a one-page résumé" },
      detail: {
        pt: "Objetivo + experiências em bullets. Exporte em PDF com seu nome no arquivo.",
        en: "Objective + experience bullets. Export PDF with your name in the filename.",
      },
    },
    {
      id: "w2-linkedin",
      week: 2,
      title: { pt: "Atualizar o LinkedIn", en: "Update LinkedIn" },
      detail: {
        pt: "Foto, título, sobre, 5 habilidades e “open to work” para Jundiaí.",
        en: "Photo, headline, about, 5 skills, and Open to Work for Jundiaí.",
      },
    },
    {
      id: "w2-alerts",
      week: 2,
      title: { pt: "Criar alertas no Catho, InfoJobs e LinkedIn", en: "Create alerts on Catho, InfoJobs, and LinkedIn" },
      detail: {
        pt: "Três palavras-chave da sua direção + cidade Jundiaí.",
        en: "Three keywords from your direction + Jundiaí.",
      },
    },
    {
      id: "w3-apply",
      week: 3,
      title: { pt: "Candidate-se a 5 vagas reais", en: "Apply to 5 real jobs" },
      detail: {
        pt: "Melhor 5 bem escolhidas do que 30 no automático. Anote cada uma em Vagas.",
        en: "Five well-chosen beats 30 spray-and-pray. Log each one in Jobs.",
      },
    },
    {
      id: "w3-interview",
      week: 3,
      title: { pt: "Ensaiar 4 respostas de entrevista", en: "Practice 4 interview answers" },
      detail: {
        pt: "Fale em voz alta. Grave no celular se quiser. O objetivo é fluir, não decorar.",
        en: "Speak out loud. Record on your phone if you like. The goal is flow, not memorizing.",
      },
    },
    {
      id: "w3-letter",
      week: 3,
      title: { pt: "Escrever uma carta-base", en: "Write a base cover letter" },
      detail: {
        pt: "Adapte o nome da empresa. Duas versões: uma curta para e-mail, uma para anexo.",
        en: "Swap in the company name. Two versions: a short email and an attachment.",
      },
    },
    {
      id: "w4-network",
      week: 4,
      title: { pt: "Conversar com 3 pessoas da região", en: "Talk to 3 people in the region" },
      detail: {
        pt: "Amiga, ex-colega, alguém do SENAI, loja, clínica. “Você conhece alguém que esteja contratando?”",
        en: "A friend, former colleague, someone at SENAI, a shop, a clinic. “Do you know anyone hiring?”",
      },
    },
    {
      id: "w4-course",
      week: 4,
      title: { pt: "Olhar um curso curto no SENAI ou SEBRAE", en: "Look at a short SENAI or SEBRAE course" },
      detail: {
        pt: "Não precisa se inscrever no mesmo dia. Só entender o que cabe na agenda.",
        en: "You do not have to enroll the same day. Just see what fits your calendar.",
      },
    },
    {
      id: "w4-share",
      week: 4,
      title: { pt: "Compartilhar o resumo com o Gray", en: "Share a summary with Gray" },
      detail: {
        pt: "Um recado curto já conta. Vocês não precisam fazer isso em silêncio.",
        en: "A short note already counts. You do not have to do this in silence.",
      },
    },
  ];
}

export function syncPlan(existing: PlanItem[], top: DirectionId | null): PlanItem[] {
  const template = buildPlanTemplate(top);
  const doneMap = new Map(existing.map((i) => [i.id, i.done]));
  return template.map((item) => ({
    id: item.id,
    week: item.week,
    done: doneMap.get(item.id) ?? false,
  }));
}

export function profileCompleteness(profile: Profile) {
  const checks = [
    profile.name.trim(),
    profile.city.trim(),
    profile.email.trim() || profile.phone.trim(),
    profile.experience.length > 0,
    profile.education.length > 0,
    profile.skills.length > 0,
    profile.languages.length > 0,
    profile.schedule.trim() || profile.constraints.trim(),
  ];
  const done = checks.filter(Boolean).length;
  return { done, total: checks.length, pct: Math.round((done / checks.length) * 100) };
}
