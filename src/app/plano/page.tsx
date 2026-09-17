"use client";

import { Card, PageHeader, ProgressBar } from "@/components/ui";
import { useT } from "@/lib/i18n";
import { buildPlanTemplate, syncPlan } from "@/lib/plan";
import { topDirection } from "@/lib/share";
import { useStore } from "@/lib/store";
import { useMemo } from "react";

export default function PlanPage() {
  const { t, locale } = useT();
  const { data, setData } = useStore();
  const top = topDirection(data);
  const items = useMemo(() => syncPlan(data.plan, top), [data.plan, top]);
  const template = buildPlanTemplate(top);
  const done = items.filter((i) => i.done).length;

  function toggle(id: string) {
    setData((d) => {
      const synced = syncPlan(d.plan, top).map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      );
      return { ...d, plan: synced };
    });
  }

  const weeks = [1, 2, 3, 4];

  return (
    <div>
      <PageHeader
        title={t("plan.title")}
        lead={`${t("plan.lead")} ${t("plan.progress", { done, total: items.length })}`}
      />
      <div className="mb-6">
        <ProgressBar value={items.length ? Math.round((done / items.length) * 100) : 0} />
      </div>
      <div className="space-y-6">
        {weeks.map((week) => (
          <Card key={week}>
            <h2 className="font-serif text-2xl">{t("plan.week", { n: week })}</h2>
            <ul className="mt-4 space-y-3">
              {template
                .filter((item) => item.week === week)
                .map((item) => {
                  const state = items.find((i) => i.id === item.id);
                  return (
                    <li key={item.id}>
                      <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-cream p-3">
                        <input
                          type="checkbox"
                          className="mt-1 h-5 w-5 accent-terra"
                          checked={Boolean(state?.done)}
                          onChange={() => toggle(item.id)}
                        />
                        <span>
                          <span className="block font-medium">{item.title[locale]}</span>
                          <span className="text-sm text-ink-soft">{item.detail[locale]}</span>
                        </span>
                      </label>
                    </li>
                  );
                })}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
