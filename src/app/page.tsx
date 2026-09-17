"use client";

import { ArrowRight } from "lucide-react";
import { ButtonLink, Card, ProgressBar } from "@/components/ui";
import { useT } from "@/lib/i18n";
import { profileCompleteness, syncPlan } from "@/lib/plan";
import { quizProgress, scoreQuiz, DIRECTIONS } from "@/lib/quiz";
import { isProfileStarted } from "@/lib/defaults";
import { useStore } from "@/lib/store";
import { topDirection } from "@/lib/share";

export default function HomePage() {
  const { t, locale } = useT();
  const { data } = useStore();
  const name = data.profile.name.trim();
  const hello = name ? t("home.hello", { name: `, ${name.split(" ")[0]}` }) : t("home.helloEmpty");
  const profilePct = profileCompleteness(data.profile).pct;
  const quizPct = quizProgress(data.quiz.answers).pct;
  const plan = syncPlan(data.plan, topDirection(data));
  const planPct = plan.length ? Math.round((plan.filter((i) => i.done).length / plan.length) * 100) : 0;
  const ranked = data.quiz.completed ? scoreQuiz(data.quiz.answers, locale) : [];

  let nextKey = "home.next.profile";
  let nextHref = "/perfil";
  let nextCta = "home.cta.profile";
  if (isProfileStarted(data.profile) && !data.quiz.completed) {
    nextKey = "home.next.quiz";
    nextHref = "/quiz";
    nextCta = "home.cta.quiz";
  } else if (data.quiz.completed && !data.resume.objective && !data.profile.experience.length) {
    nextKey = "home.next.resume";
    nextHref = "/curriculo";
    nextCta = "home.cta.resume";
  } else if (data.quiz.completed) {
    nextKey = "home.next.plan";
    nextHref = "/plano";
    nextCta = "home.cta.plan";
  }

  const cards = [
    { href: "/perfil", title: t("home.card.profile"), value: `${profilePct}%` },
    { href: "/quiz", title: t("home.card.quiz"), value: data.quiz.completed ? `${quizPct}%` : "—" },
    { href: "/curriculo", title: t("home.card.resume"), value: data.profile.name ? "●" : "○" },
    { href: "/linkedin", title: t("home.card.linkedin"), value: data.profile.name ? "●" : "○" },
    { href: "/vagas", title: t("home.card.jobs"), value: String(data.savedJobs.length) },
    { href: "/plano", title: t("home.card.plan"), value: `${planPct}%` },
  ];

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-terra">{t("app.name")}</p>
          <h1 className="mt-2 font-serif text-4xl leading-tight text-ink sm:text-5xl">{hello}</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">{t("home.lead")}</p>
        </div>
        <Card className="bg-terra text-white">
          <p className="text-sm uppercase tracking-[0.16em] text-white/80">{t("home.next")}</p>
          <p className="mt-3 font-serif text-2xl leading-snug">{t(nextKey)}</p>
          <ButtonLink href={nextHref} variant="secondary" className="mt-6 bg-white text-terra hover:bg-cream">
            {t(nextCta)}
            <ArrowRight size={16} />
          </ButtonLink>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-2xl">{t("home.progress")}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <ButtonLink
              key={card.href}
              href={card.href}
              variant="ghost"
              className="h-auto justify-between rounded-3xl px-5 py-4 text-left"
            >
              <span>
                <span className="block text-sm text-ink-soft">{card.title}</span>
                <span className="font-serif text-2xl">{card.value}</span>
              </span>
              <ArrowRight size={18} className="text-terra" />
            </ButtonLink>
          ))}
        </div>
      </section>

      {ranked.length ? (
        <Card>
          <h2 className="font-serif text-2xl">{t("quiz.results")}</h2>
          <div className="mt-4 space-y-4">
            {ranked.slice(0, 3).map((d) => (
              <div key={d.id}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium">{DIRECTIONS[d.id].title[locale]}</span>
                  <span className="text-ink-soft">{d.score}%</span>
                </div>
                <ProgressBar value={d.score} />
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      <p className="text-center text-sm text-ink-soft">{t("home.footer")}</p>
    </div>
  );
}
