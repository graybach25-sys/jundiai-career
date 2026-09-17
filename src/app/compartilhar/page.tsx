"use client";

import { CopyButton } from "@/components/CopyButton";
import { Card, PageHeader } from "@/components/ui";
import { useT } from "@/lib/i18n";
import { buildShareSummary } from "@/lib/share";
import { useStore } from "@/lib/store";

export default function SharePage() {
  const { t, locale } = useT();
  const { data } = useStore();
  const summary = buildShareSummary(data, locale);

  return (
    <div>
      <PageHeader title={t("share.title")} lead={t("share.lead")} />
      <Card>
        <div className="mb-4 flex justify-end">
          <CopyButton text={summary} label={t("share.copy")} />
        </div>
        <pre className="whitespace-pre-wrap rounded-2xl bg-cream p-4 font-sans text-sm leading-relaxed text-ink">
          {summary}
        </pre>
        <p className="mt-4 text-sm text-ink-soft">{t("share.note")}</p>
      </Card>
    </div>
  );
}
