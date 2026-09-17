import { DIRECTIONS, scoreQuiz } from "./quiz";
import { profileCompleteness } from "./plan";
import type { AppData, DirectionId, Locale } from "./types";

export function topDirection(data: AppData): DirectionId | null {
  if (!data.quiz.completed) return null;
  const ranked = scoreQuiz(data.quiz.answers, data.locale);
  return ranked[0]?.id ?? null;
}

export function buildShareSummary(data: AppData, locale: Locale) {
  const { profile, quiz, savedJobs, plan } = data;
  const ranked = quiz.completed ? scoreQuiz(quiz.answers, locale) : [];
  const complete = profileCompleteness(profile);
  const donePlan = plan.filter((p) => p.done).length;
  const name = profile.name || "Andrea";

  if (locale === "pt") {
    const dirs = ranked
      .slice(0, 3)
      .map((d) => `• ${DIRECTIONS[d.id].title.pt} (${d.score}%)`)
      .join("\n");
    const jobs = savedJobs
      .slice(0, 8)
      .map((j) => `• ${j.title} — ${j.company} [${j.status}]`)
      .join("\n");
    return `Novo Capítulo — resumo para o Gray

Oi. Aqui vai um recado curto de como estou nesse processo.

Nome: ${name}
Cidade: ${profile.city || "Jundiaí"}
Perfil: ${complete.pct}% preenchido
Quiz: ${quiz.completed ? "concluído" : "ainda não"}
Plano: ${donePlan}/${plan.length || 12} itens

Caminhos que mais combinam:
${dirs || "Ainda vou fazer o mapa."}

Vagas que estou acompanhando:
${jobs || "Nenhuma anotada ainda."}

Restrições / ritmo:
${profile.constraints || profile.schedule || "Ainda não anotei."}

Obrigada por estar junto, mesmo de longe.`;
  }

  const dirs = ranked
    .slice(0, 3)
    .map((d) => `• ${DIRECTIONS[d.id].title.en} (${d.score}%)`)
    .join("\n");
  const jobs = savedJobs
    .slice(0, 8)
    .map((j) => `• ${j.title} — ${j.company} [${j.status}]`)
    .join("\n");
  return `Novo Capítulo — summary for Gray

Hi. A short note on where I am in this process.

Name: ${name}
City: ${profile.city || "Jundiaí"}
Profile: ${complete.pct}% complete
Quiz: ${quiz.completed ? "done" : "not yet"}
Plan: ${donePlan}/${plan.length || 12} items

Paths that fit best:
${dirs || "I still need to take the quiz."}

Roles I’m tracking:
${jobs || "None saved yet."}

Constraints / pace:
${profile.constraints || profile.schedule || "Not noted yet."}

Thank you for being in this with me, even from afar.`;
}
