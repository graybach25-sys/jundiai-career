"use client";

import { defaultObjective, experienceBullets, generateLinkedIn, LINKEDIN_CHECKLIST } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { INTERVIEW_QUESTIONS } from "@/lib/interview";
import { buildPlanTemplate, profileCompleteness, syncPlan } from "@/lib/plan";
import { DIRECTIONS, scoreQuiz } from "@/lib/quiz";
import { topDirection } from "@/lib/share";
import { useStore } from "@/lib/store";
import type { AppData } from "@/lib/types";
import { ResumeActions } from "./ResumeActions";
import { ResumePreview } from "./ResumePreview";
import { Card, ProgressBar } from "./ui";

function EmptyLine({ text }: { text: string }) {
  return <p className="text-ink-soft">{text}</p>;
}

export function SnapshotView({ data, updatedAt }: { data: AppData; updatedAt: string }) {
  const { t, locale } = useT();
  const { setData } = useStore();
  const profile = data.profile;
  const top = topDirection(data);
  const ranked = data.quiz.completed ? scoreQuiz(data.quiz.answers, locale) : [];
  const plan = syncPlan(data.plan, top);
  const template = buildPlanTemplate(top);
  const byId = new Map(template.map((item) => [item.id, item]));
  const objective = data.resume.objective || defaultObjective(profile, top, locale);
  const generatedPt = generateLinkedIn(profile, top, top ? DIRECTIONS[top].skills.pt : profile.skills, "pt");
  const generatedEn = generateLinkedIn(profile, top, top ? DIRECTIONS[top].skills.en : profile.skills, "en");
  const when = new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(updatedAt));
  const complete = profileCompleteness(profile);
  const answered = INTERVIEW_QUESTIONS.filter((item) => (data.interviewAnswers[item.id] || "").trim());

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-terra">{t("view.kicker")}</p>
        <h1 className="font-serif text-4xl leading-tight">{profile.name.trim() || t("view.unnamed")}</h1>
        <p className="text-lg text-ink-soft">{locale === "pt" ? "For Gray — read only. This is what she saved on her phone." : "Para o Gray — só leitura. É o que ela salvou no celular."}</p>
        <p className="text-base text-ink">{t("view.updated", { when })}</p>
        <p className="text-sm text-ink-soft">{t("view.readonly")}</p>
        <div className="flex rounded-full border border-line bg-paper p-0.5" role="group" aria-label={t("lang.switchTo")}>
          {(["pt", "en"] as const).map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => setData((current) => ({ ...current, locale: loc }))}
              className={loc === locale ? "min-h-11 rounded-full bg-ink px-4 text-sm font-bold text-cream" : "min-h-11 rounded-full px-4 text-sm font-bold text-ink-soft"}
            >
              {t(`lang.${loc}`)}
            </button>
          ))}
        </div>
      </header>

      {data.demoLoaded ? <p className="rounded-3xl bg-gold/20 px-4 py-3 text-sm">{t("view.demo")}</p> : null}

      <ResumeActions source={data} />

      <Card>
        <h2 className="font-serif text-2xl">{t("profile.title")}</h2>
        <p className="mt-1 text-sm text-ink-soft">{t("view.profilePct", { pct: complete.pct })}</p>
        <div className="mt-4 space-y-2 text-base">
          <p>{profile.city}</p>
          {profile.email ? <p>{profile.email}</p> : null}
          {profile.phone ? <p>{profile.phone}</p> : null}
          {profile.linkedin ? <p>{profile.linkedin}</p> : null}
          {profile.summary ? <p className="leading-relaxed">{profile.summary}</p> : <EmptyLine text={t("view.empty")} />}
          <p>
            {t(`profile.work.${profile.workMode}`)} · {t(`profile.travel.${profile.travelToSP}`)}
          </p>
          {profile.schedule ? <p>{profile.schedule}</p> : null}
          {profile.constraints ? <p>{profile.constraints}</p> : null}
        </div>
        {profile.experience.length ? (
          <div className="mt-4 space-y-3">
            <h3 className="font-semibold">{t("profile.experience")}</h3>
            {profile.experience.map((item) => (
              <div key={item.id}>
                <p className="font-medium">
                  {item.role}
                  {item.company ? ` — ${item.company}` : ""} {item.period ? `· ${item.period}` : ""}
                </p>
                {item.description ? <p className="text-ink-soft">{item.description}</p> : null}
              </div>
            ))}
          </div>
        ) : null}
        {profile.education.length ? (
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">{t("profile.education")}</h3>
            {profile.education.map((item) => (
              <p key={item.id}>
                {item.course || item.school} {item.level ? `(${item.level})` : ""} {item.year}
              </p>
            ))}
          </div>
        ) : null}
        {profile.skills.length ? <p className="mt-4">{profile.skills.join(" · ")}</p> : null}
        {profile.languages.length ? (
          <p className="mt-2 text-ink-soft">{profile.languages.map((item) => `${item.name} (${item.level})`).join(" · ")}</p>
        ) : null}
      </Card>

      <Card>
        <h2 className="font-serif text-2xl">{t("quiz.title")}</h2>
        {ranked.length ? (
          <div className="mt-4 space-y-4">
            {ranked.slice(0, 3).map((item) => (
              <div key={item.id}>
                <div className="mb-1 flex justify-between gap-3 text-sm">
                  <span className="font-medium">{DIRECTIONS[item.id].title[locale]}</span>
                  <span>{item.score}%</span>
                </div>
                <ProgressBar value={item.score} />
                <p className="mt-2 text-sm text-ink-soft">{DIRECTIONS[item.id].tagline[locale]}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-3">
            <EmptyLine text={t("view.empty")} />
          </div>
        )}
      </Card>

      <Card>
        <h2 className="font-serif text-2xl">{t("resume.title")}</h2>
        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[720px]">
            <ResumePreview profile={profile} objective={objective} template={data.resume.template} />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="font-serif text-2xl">{t("linkedin.title")}</h2>
        {profile.name.trim() ? (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-terra">PT</p>
              <p className="mt-2 font-medium">{data.linkedinOverrides.headlinePt || generatedPt.headline}</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">{data.linkedinOverrides.aboutPt || generatedPt.about}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-terra">EN</p>
              <p className="mt-2 font-medium">{data.linkedinOverrides.headlineEn || generatedEn.headline}</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">{data.linkedinOverrides.aboutEn || generatedEn.about}</p>
            </div>
          </div>
        ) : (
          <div className="mt-3">
            <EmptyLine text={t("view.empty")} />
          </div>
        )}
        {profile.experience.length ? (
          <div className="mt-4 space-y-3">
            {profile.experience.map((item) => (
              <div key={item.id}>
                <p className="font-medium">
                  {item.role} — {item.company}
                </p>
                <ul className="mt-1 list-disc pl-5 text-sm text-ink-soft">
                  {experienceBullets(item, locale).map((bullet, index) => (
                    <li key={`${item.id}-${index}`}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
        <ul className="mt-4 space-y-2">
          {LINKEDIN_CHECKLIST.map((item) => (
            <li key={item.id} className="text-sm">
              {data.linkedinChecklist[item.id] ? "☑" : "☐"} {item.title[locale]}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-serif text-2xl">{t("plan.title")}</h2>
        <div className="mt-4 space-y-4">
          {[1, 2, 3, 4].map((week) => (
            <div key={week}>
              <h3 className="font-semibold">{t("plan.week", { n: week })}</h3>
              <ul className="mt-2 space-y-2">
                {plan
                  .filter((item) => item.week === week)
                  .map((item) => (
                    <li key={item.id} className="text-sm leading-relaxed">
                      {item.done ? "☑" : "☐"} {byId.get(item.id)?.title[locale]}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="font-serif text-2xl">{t("jobs.tracker")}</h2>
        {data.savedJobs.length ? (
          <ul className="mt-4 space-y-4">
            {data.savedJobs.map((job) => (
              <li key={job.id}>
                <p className="font-medium">
                  {job.title || t("jobs.jobTitle")}
                  {job.company ? ` — ${job.company}` : ""}
                </p>
                <p className="text-sm text-ink-soft">{t(`jobs.status.${job.status}`)}</p>
                {job.notes ? <p className="mt-1 text-sm leading-relaxed">{job.notes}</p> : null}
                {job.link ? (
                  <a className="mt-1 inline-block text-sm font-semibold text-terra underline" href={job.link} target="_blank" rel="noreferrer">
                    {t("view.openLink")}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-3">
            <EmptyLine text={t("view.empty")} />
          </div>
        )}
      </Card>

      {answered.length ? (
        <Card>
          <h2 className="font-serif text-2xl">{t("interview.title")}</h2>
          <div className="mt-4 space-y-4">
            {answered.map((item) => (
              <div key={item.id}>
                <p className="font-medium">{item.question[locale]}</p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">{data.interviewAnswers[item.id]}</p>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {data.coverLetters.length ? (
        <Card>
          <h2 className="font-serif text-2xl">{t("letter.title")}</h2>
          <div className="mt-4 space-y-5">
            {data.coverLetters.map((letter) => (
              <div key={letter.id}>
                <p className="font-medium">
                  {letter.role} — {letter.company}
                </p>
                {letter.bodyPt ? <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{letter.bodyPt}</p> : null}
                {letter.bodyEn ? <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">{letter.bodyEn}</p> : null}
              </div>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
