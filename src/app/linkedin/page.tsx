"use client";

import { CopyButton } from "@/components/CopyButton";
import { Button, ButtonLink, Card, EmptyState, PageHeader, TextArea } from "@/components/ui";
import { experienceBullets, FEATURED_IDEAS, generateLinkedIn, LINKEDIN_CHECKLIST } from "@/lib/content";
import { isProfileStarted } from "@/lib/defaults";
import { useT } from "@/lib/i18n";
import { DIRECTIONS, scoreQuiz } from "@/lib/quiz";
import { topDirection } from "@/lib/share";
import { useStore } from "@/lib/store";
import { useMemo } from "react";

export default function LinkedInPage() {
  const { t, locale } = useT();
  const { data, setData } = useStore();
  const top = topDirection(data);
  const skills = top ? DIRECTIONS[top].skills[locale] : data.profile.skills;
  const generatedPt = useMemo(
    () => generateLinkedIn(data.profile, top, skills, "pt"),
    [data.profile, top, skills],
  );
  const generatedEn = useMemo(
    () => generateLinkedIn(data.profile, top, skills, "en"),
    [data.profile, top, skills],
  );
  const openChecks = data.linkedinChecklist;

  const headlinePt = data.linkedinOverrides.headlinePt || generatedPt.headline;
  const headlineEn = data.linkedinOverrides.headlineEn || generatedEn.headline;
  const aboutPt = data.linkedinOverrides.aboutPt || generatedPt.about;
  const aboutEn = data.linkedinOverrides.aboutEn || generatedEn.about;

  if (!isProfileStarted(data.profile)) {
    return (
      <div>
        <PageHeader title={t("linkedin.title")} lead={t("linkedin.lead")} />
        <EmptyState
          title={t("linkedin.title")}
          body={t("linkedin.empty")}
          action={<ButtonLink href="/perfil">{t("empty.cta")}</ButtonLink>}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={t("linkedin.title")} lead={t("linkedin.lead")} />

      <div className="space-y-6">
        <Card>
          <h2 className="font-serif text-2xl">{t("linkedin.headline")}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <LangBlock
              label="PT"
              value={headlinePt}
              onChange={(headlinePt) =>
                setData((d) => ({ ...d, linkedinOverrides: { ...d.linkedinOverrides, headlinePt } }))
              }
            />
            <LangBlock
              label="EN"
              value={headlineEn}
              onChange={(headlineEn) =>
                setData((d) => ({ ...d, linkedinOverrides: { ...d.linkedinOverrides, headlineEn } }))
              }
            />
          </div>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl">{t("linkedin.about")}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <LangBlock
              label="PT"
              value={aboutPt}
              multiline
              onChange={(aboutPt) =>
                setData((d) => ({ ...d, linkedinOverrides: { ...d.linkedinOverrides, aboutPt } }))
              }
            />
            <LangBlock
              label="EN"
              value={aboutEn}
              multiline
              onChange={(aboutEn) =>
                setData((d) => ({ ...d, linkedinOverrides: { ...d.linkedinOverrides, aboutEn } }))
              }
            />
          </div>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl">{t("linkedin.bullets")}</h2>
          <div className="mt-4 space-y-4">
            {data.profile.experience.map((item) => {
              const bullets = experienceBullets(item, locale);
              return (
                <div key={item.id} className="rounded-2xl bg-cream p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold">
                      {item.role} — {item.company}
                    </p>
                    <CopyButton text={bullets.map((b) => `• ${b}`).join("\n")} />
                  </div>
                  <ul className="mt-2 list-disc pl-5 text-sm text-ink-soft">
                    {bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-serif text-2xl">{t("linkedin.skills")}</h2>
            <CopyButton text={[...data.profile.skills, ...(top ? DIRECTIONS[top].skills[locale] : [])].filter((v, i, a) => a.indexOf(v) === i).join("\n")} />
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {[...data.profile.skills, ...(top ? DIRECTIONS[top].skills[locale] : [])]
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((s) => (
                <li key={s} className="rounded-full bg-sage-soft px-3 py-1 text-sm text-sage">
                  {s}
                </li>
              ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl">{t("linkedin.featured")}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-soft">
            {FEATURED_IDEAS[locale].map((idea) => (
              <li key={idea}>{idea}</li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl">{t("linkedin.checklist")}</h2>
          <ul className="mt-4 space-y-2">
            {LINKEDIN_CHECKLIST.map((item) => (
              <li key={item.id}>
                <label className="flex items-start gap-3 rounded-2xl bg-cream p-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-terra"
                    checked={Boolean(openChecks[item.id])}
                    onChange={(e) =>
                      setData((d) => ({
                        ...d,
                        linkedinChecklist: { ...d.linkedinChecklist, [item.id]: e.target.checked },
                      }))
                    }
                  />
                  <span>
                    <span className="block font-medium">{item.title[locale]}</span>
                    <span className="text-sm text-ink-soft">{item.hint[locale]}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </Card>

        {data.quiz.completed ? (
          <p className="text-sm text-ink-soft">
            {DIRECTIONS[scoreQuiz(data.quiz.answers, locale)[0].id].tagline[locale]}
          </p>
        ) : null}

        <Button
          variant="ghost"
          onClick={() =>
            setData((d) => ({
              ...d,
              linkedinOverrides: { headlinePt: "", headlineEn: "", aboutPt: "", aboutEn: "" },
            }))
          }
        >
          {t("common.redo")}
        </Button>
      </div>
    </div>
  );
}

function LangBlock({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-widest text-terra">{label}</p>
        <CopyButton text={value} />
      </div>
      {multiline ? (
        <TextArea value={value} onChange={(e) => onChange(e.target.value)} className="min-h-48" />
      ) : (
        <TextArea value={value} onChange={(e) => onChange(e.target.value)} className="min-h-24" />
      )}
    </div>
  );
}
