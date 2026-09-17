"use client";

import { ResumePreview } from "@/components/ResumePreview";
import { Button, ButtonLink, Card, EmptyState, Field, PageHeader, TextArea } from "@/components/ui";
import { defaultObjective } from "@/lib/content";
import { isProfileStarted } from "@/lib/defaults";
import { useT } from "@/lib/i18n";
import { topDirection } from "@/lib/share";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/cn";

export default function ResumePage() {
  const { t, locale } = useT();
  const { data, setData } = useStore();
  const top = topDirection(data);
  const objective = data.resume.objective || defaultObjective(data.profile, top, locale);

  if (!isProfileStarted(data.profile)) {
    return (
      <div>
        <PageHeader className="no-print" title={t("resume.title")} lead={t("resume.lead")} />
        <EmptyState
          title={t("resume.title")}
          body={t("resume.empty")}
          action={<ButtonLink href="/perfil">{t("empty.cta")}</ButtonLink>}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        className="no-print"
        title={t("resume.title")}
        lead={t("resume.lead")}
        actions={
          <Button className="no-print" onClick={() => window.print()}>
            {t("common.print")}
          </Button>
        }
      />

      <div className="no-print mb-6 grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card>
          <h2 className="font-serif text-xl">{t("resume.template")}</h2>
          <div className="mt-3 grid gap-2">
            {(["contemporaneo", "classico"] as const).map((tpl) => (
              <button
                key={tpl}
                type="button"
                onClick={() => setData((d) => ({ ...d, resume: { ...d.resume, template: tpl } }))}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-left text-sm font-semibold",
                  data.resume.template === tpl ? "border-terra bg-terra/10 text-terra" : "border-line",
                )}
              >
                {t(`resume.${tpl}`)}
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <Field label={t("resume.objective")}>
            <TextArea
              value={data.resume.objective}
              placeholder={objective}
              onChange={(e) => setData((d) => ({ ...d, resume: { ...d.resume, objective: e.target.value } }))}
            />
          </Field>
        </Card>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[720px]">
          <ResumePreview profile={data.profile} objective={objective} template={data.resume.template} />
        </div>
      </div>
    </div>
  );
}
