"use client";

import { useT } from "@/lib/i18n";
import type { Profile } from "@/lib/types";
import { cn } from "@/lib/cn";

export function ResumePreview({
  profile,
  objective,
  template,
}: {
  profile: Profile;
  objective: string;
  template: "classico" | "contemporaneo";
}) {
  const { t, locale } = useT();
  const classic = template === "classico";

  return (
    <article
      id="curriculo-folha"
      className={cn(
        "resume-sheet mx-auto bg-white text-[#222] shadow-lift",
        classic ? "px-10 py-10 font-serif" : "px-8 py-8",
      )}
    >
      <header className={cn(classic ? "border-b-2 border-[#222] pb-4 text-center" : "border-l-4 border-[#c45c3e] pl-4")}>
        <h1 className={cn("text-3xl tracking-tight", classic ? "uppercase" : "font-serif")}>
          {profile.name || (locale === "pt" ? "Seu nome" : "Your name")}
        </h1>
        <p className="mt-2 text-sm leading-relaxed">
          {[profile.city, profile.phone, profile.email, profile.linkedin].filter(Boolean).join("  ·  ")}
        </p>
      </header>

      {objective ? (
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#c45c3e]">
            {t("resume.section.objective")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed">{objective}</p>
        </section>
      ) : null}

      {profile.experience.length ? (
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#c45c3e]">
            {t("resume.section.experience")}
          </h2>
          <div className="mt-2 space-y-4">
            {profile.experience.map((item) => (
              <div key={item.id}>
                <div className="flex flex-wrap justify-between gap-2">
                  <p className="font-semibold">
                    {item.role}
                    {item.company ? ` — ${item.company}` : ""}
                  </p>
                  <p className="text-sm text-[#555]">{item.period}</p>
                </div>
                {item.description ? (
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                    {item.description
                      .split(/\n+/)
                      .map((line) => line.replace(/^[•\-]\s*/, "").trim())
                      .filter(Boolean)
                      .map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {profile.education.length ? (
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#c45c3e]">
            {t("resume.section.education")}
          </h2>
          <div className="mt-2 space-y-2 text-sm">
            {profile.education.map((item) => (
              <p key={item.id}>
                <span className="font-semibold">{item.course}</span>
                {item.level ? ` (${item.level})` : ""} — {item.school}
                {item.year ? `, ${item.year}` : ""}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      {profile.courses.length ? (
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#c45c3e]">
            {t("resume.section.courses")}
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {profile.courses.map((item) => (
              <li key={item.id}>
                {item.name}
                {item.provider ? ` — ${item.provider}` : ""}
                {item.year ? ` (${item.year})` : ""}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {profile.languages.length ? (
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#c45c3e]">
            {t("resume.section.languages")}
          </h2>
          <p className="mt-2 text-sm">
            {profile.languages.map((l) => `${l.name} (${l.level})`).join("  ·  ")}
          </p>
        </section>
      ) : null}

      {profile.skills.length ? (
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#c45c3e]">
            {t("resume.section.skills")}
          </h2>
          <p className="mt-2 text-sm">{profile.skills.join("  ·  ")}</p>
        </section>
      ) : null}
    </article>
  );
}
