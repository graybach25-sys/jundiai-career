"use client";

import { Card, PageHeader, TextArea } from "@/components/ui";
import { INTERVIEW_QUESTIONS } from "@/lib/interview";
import { useT } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { useState } from "react";

export default function InterviewPage() {
  const { t, locale } = useT();
  const { data, setData } = useStore();
  const [openId, setOpenId] = useState(INTERVIEW_QUESTIONS[0].id);

  return (
    <div>
      <PageHeader title={t("interview.title")} lead={t("interview.lead")} />
      <div className="space-y-3">
        {INTERVIEW_QUESTIONS.map((q, index) => {
          const open = openId === q.id;
          return (
            <Card key={q.id}>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-3 text-left"
                onClick={() => setOpenId(open ? "" : q.id)}
                aria-expanded={open}
              >
                <span>
                  <span className="block text-xs font-bold uppercase tracking-widest text-terra">
                    {index + 1}/{INTERVIEW_QUESTIONS.length}
                  </span>
                  <span className="font-serif text-xl">{q.question[locale]}</span>
                </span>
                <span className="text-ink-soft">{open ? "–" : "+"}</span>
              </button>
              {open ? (
                <div className="mt-4 space-y-4 border-t border-line pt-4">
                  <p>
                    <span className="text-sm font-semibold text-terra">{t("interview.tip")}: </span>
                    <span className="text-sm text-ink-soft">{q.tip[locale]}</span>
                  </p>
                  <p className="rounded-2xl bg-sage-soft/60 p-3 text-sm text-sage">
                    <span className="font-semibold">{t("interview.starter")}: </span>
                    {q.starter[locale]}
                  </p>
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium">{t("interview.yourAnswer")}</span>
                    <TextArea
                      value={data.interviewAnswers[q.id] ?? ""}
                      onChange={(e) =>
                        setData((d) => ({
                          ...d,
                          interviewAnswers: { ...d.interviewAnswers, [q.id]: e.target.value },
                        }))
                      }
                    />
                  </label>
                </div>
              ) : null}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
