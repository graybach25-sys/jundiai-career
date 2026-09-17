"use client";

import { useState } from "react";
import { Button, ButtonLink, Card, Chip, EmptyState, PageHeader, ProgressBar } from "@/components/ui";
import { useT } from "@/lib/i18n";
import { DIRECTIONS, QUESTIONS, scoreQuiz } from "@/lib/quiz";
import { useStore } from "@/lib/store";

export default function QuizPage() {
  const { t, locale } = useT();
  const { data, setData } = useStore();
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"intro" | "quiz" | "results">(
    data.quiz.completed ? "results" : "intro",
  );

  const question = QUESTIONS[step];
  const selected = data.quiz.answers[question?.id] ?? [];
  const ranked = scoreQuiz(data.quiz.answers, locale);

  function toggle(optionId: string) {
    if (!question) return;
    const max = question.type === "single" ? 1 : question.max ?? 99;
    setData((d) => {
      const current = d.quiz.answers[question.id] ?? [];
      let next: string[];
      if (question.type === "single") next = [optionId];
      else if (current.includes(optionId)) next = current.filter((id) => id !== optionId);
      else if (current.length >= max) next = [...current.slice(1), optionId];
      else next = [...current, optionId];
      return { ...d, quiz: { ...d.quiz, answers: { ...d.quiz.answers, [question.id]: next } } };
    });
  }

  function finish() {
    setData((d) => ({
      ...d,
      quiz: { ...d.quiz, completed: true, completedAt: new Date().toISOString() },
    }));
    setMode("results");
  }

  function redo() {
    setData((d) => ({
      ...d,
      quiz: { answers: {}, completed: false, completedAt: null },
    }));
    setStep(0);
    setMode("quiz");
  }

  if (mode === "intro") {
    return (
      <div>
        <PageHeader title={t("quiz.title")} lead={t("quiz.lead")} />
        <EmptyState
          title={t("quiz.title")}
          body={t("quiz.empty")}
          action={
            <Button onClick={() => setMode("quiz")}>
              {t("quiz.start")}
            </Button>
          }
        />
      </div>
    );
  }

  if (mode === "results") {
    return (
      <div>
        <PageHeader
          title={t("quiz.results")}
          lead={t("quiz.resultsLead")}
          actions={
            <>
              <Button variant="ghost" onClick={redo}>
                {t("common.redo")}
              </Button>
              <ButtonLink href="/plano">{t("home.cta.plan")}</ButtonLink>
            </>
          }
        />
        <div className="space-y-4">
          {ranked.map((dir) => {
            const meta = DIRECTIONS[dir.id];
            return (
              <Card key={dir.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-2xl">{meta.title[locale]}</h2>
                    <p className="mt-1 text-ink-soft">{meta.tagline[locale]}</p>
                  </div>
                  <span className="rounded-full bg-terra/10 px-3 py-1 text-sm font-semibold text-terra">
                    {dir.score}%
                  </span>
                </div>
                <div className="mt-4">
                  <ProgressBar value={dir.score} />
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-terra">{t("quiz.why")}</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
                      {dir.reasons.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-terra">{t("quiz.market")}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{meta.market[locale]}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-terra">{t("quiz.skills")}</h3>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {dir.skills.map((s) => (
                        <li key={s} className="rounded-full bg-sage-soft px-3 py-1 text-sm text-sage">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={t("quiz.title")}
        lead={t("quiz.step", { n: step + 1, total: QUESTIONS.length })}
      />
      <ProgressBar value={Math.round((step / QUESTIONS.length) * 100)} />
      <Card className="mt-6">
        <h2 className="font-serif text-2xl">{question.title[locale]}</h2>
        <p className="mt-2 text-ink-soft">{question.help[locale]}</p>
        <p className="mt-1 text-sm text-terra">
          {question.type === "single" ? t("quiz.pickOne") : t("quiz.pickMax", { n: question.max ?? 3 })}
        </p>
        <div className="mt-5 flex flex-col gap-2">
          {question.options.map((option) => (
            <Chip
              key={option.id}
              selected={selected.includes(option.id)}
              onClick={() => toggle(option.id)}
            >
              {option.label[locale]}
            </Chip>
          ))}
        </div>
        <div className="mt-6 flex justify-between gap-3">
          <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
            {t("common.back")}
          </Button>
          {step < QUESTIONS.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!selected.length}>
              {t("common.continue")}
            </Button>
          ) : (
            <Button onClick={finish} disabled={!selected.length}>
              {t("common.finish")}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
