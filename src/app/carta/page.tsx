"use client";

import { CopyButton } from "@/components/CopyButton";
import { Button, Card, EmptyState, Field, PageHeader, TextArea, TextInput } from "@/components/ui";
import { generateCoverLetter } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { topDirection } from "@/lib/share";
import { useStore } from "@/lib/store";
import { uid } from "@/lib/types";
import { useMemo, useState } from "react";

export default function LetterPage() {
  const { t, locale } = useT();
  const { data, setData } = useStore();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const top = topDirection(data);
  const bodyPt = useMemo(
    () => generateCoverLetter(data.profile, company, role, top, "pt"),
    [data.profile, company, role, top],
  );
  const bodyEn = useMemo(
    () => generateCoverLetter(data.profile, company, role, top, "en"),
    [data.profile, company, role, top],
  );
  function save() {
    setData((d) => ({
      ...d,
      coverLetters: [
        {
          id: uid(),
          company: company || (locale === "pt" ? "Empresa" : "Company"),
          role: role || (locale === "pt" ? "Vaga" : "Role"),
          bodyPt,
          bodyEn,
          createdAt: new Date().toISOString(),
        },
        ...d.coverLetters,
      ],
    }));
  }

  return (
    <div>
      <PageHeader title={t("letter.title")} lead={t("letter.lead")} />
      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t("letter.company")}>
            <TextInput value={company} onChange={(e) => setCompany(e.target.value)} />
          </Field>
          <Field label={t("letter.role")}>
            <TextInput value={role} onChange={(e) => setRole(e.target.value)} />
          </Field>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-terra">PT</p>
              <CopyButton text={bodyPt} />
            </div>
            <TextArea readOnly value={bodyPt} className="min-h-72" />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-terra">EN</p>
              <CopyButton text={bodyEn} />
            </div>
            <TextArea readOnly value={bodyEn} className="min-h-72" />
          </div>
        </div>
        <Button className="mt-4" onClick={save}>
          {t("letter.save")}
        </Button>
      </Card>

      <h2 className="mt-8 font-serif text-2xl">{t("letter.saved")}</h2>
      {data.coverLetters.length === 0 ? (
        <div className="mt-4">
          <EmptyState title={t("letter.title")} body={t("letter.empty")} />
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {data.coverLetters.map((letter) => (
            <li key={letter.id}>
              <Card>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-serif text-xl">{letter.role}</p>
                    <p className="text-sm text-ink-soft">{letter.company}</p>
                  </div>
                  <CopyButton text={locale === "pt" ? letter.bodyPt : letter.bodyEn} />
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
