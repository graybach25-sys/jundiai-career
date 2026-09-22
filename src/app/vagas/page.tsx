"use client";

import { Button, Card, EmptyState, Field, PageHeader, Select, TextArea, TextInput } from "@/components/ui";
import { JOB_HUBS, SEARCH_TIPS } from "@/lib/jobs";
import { useT } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import type { SavedJob, SavedJobStatus } from "@/lib/types";
import { uid } from "@/lib/types";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

const STATUSES: SavedJobStatus[] = [
  "interessada",
  "candidatei",
  "entrevista",
  "retorno",
  "arquivada",
];

export default function JobsPage() {
  const { t, locale } = useT();
  const { data, setData } = useStore();
  const [draft, setDraft] = useState({
    title: "",
    company: "",
    link: "",
    status: "interessada" as SavedJobStatus,
    notes: "",
  });

  function addJob() {
    if (!draft.title.trim()) return;
    const job: SavedJob = {
      id: uid(),
      title: draft.title.trim(),
      company: draft.company.trim(),
      link: draft.link.trim(),
      status: draft.status,
      notes: draft.notes.trim(),
      createdAt: new Date().toISOString(),
    };
    setData((d) => ({ ...d, savedJobs: [job, ...d.savedJobs] }));
    setDraft({ title: "", company: "", link: "", status: "interessada", notes: "" });
  }

  function updateJob(id: string, partial: Partial<SavedJob>) {
    setData((d) => ({
      ...d,
      savedJobs: d.savedJobs.map((j) => (j.id === id ? { ...j, ...partial } : j)),
    }));
  }

  return (
    <div>
      <PageHeader title={t("jobs.title")} lead={t("jobs.lead")} />

      <div className="space-y-8">
        <section>
          <h2 className="mb-3 font-serif text-2xl">{t("jobs.boards")}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {JOB_HUBS.map((hub) => (
              <a
                key={hub.id}
                href={hub.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl border border-line bg-paper p-5 shadow-soft transition hover:border-terra/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-terra">
                      {t(`jobs.kind.${hub.kind}`)}
                    </p>
                    <h3 className="mt-1 font-serif text-xl">{hub.name}</h3>
                  </div>
                  <ExternalLink size={16} className="text-ink-soft" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{hub.blurb[locale]}</p>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl">{t("jobs.tips")}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {SEARCH_TIPS.map((tip) => (
              <Card key={tip.title.pt}>
                <h3 className="font-serif text-xl">{tip.title[locale]}</h3>
                <p className="mt-1 text-sm text-ink-soft">{tip.body[locale]}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {tip.keywords.map((kw) => (
                    <li key={kw} className="rounded-full bg-cream-deep px-3 py-1 text-sm">
                      {kw}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-1 font-serif text-2xl">{t("jobs.tracker")}</h2>
          <p className="mb-4 text-ink-soft">{t("jobs.trackerLead")}</p>
          <Card>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={t("jobs.jobTitle")}>
                <TextInput value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
              </Field>
              <Field label={t("jobs.company")}>
                <TextInput value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} />
              </Field>
              <Field label={t("jobs.link")}>
                <TextInput value={draft.link} onChange={(e) => setDraft({ ...draft, link: e.target.value })} />
              </Field>
              <Field label={t("jobs.status")}>
                <Select
                  value={draft.status}
                  onChange={(e) => setDraft({ ...draft, status: e.target.value as SavedJobStatus })}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {t(`jobs.status.${s}`)}
                    </option>
                  ))}
                </Select>
              </Field>
              <div className="sm:col-span-2">
                <Field label={t("jobs.notes")}>
                  <TextArea value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
                </Field>
              </div>
            </div>
            <Button className="mt-4" onClick={addJob}>
              {t("jobs.add")}
            </Button>
          </Card>

          {data.savedJobs.length === 0 ? (
            <div className="mt-4">
              <EmptyState title={t("jobs.tracker")} body={t("jobs.empty")} />
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {data.savedJobs.map((job) => (
                <li key={job.id}>
                  <Card>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label={t("jobs.jobTitle")}>
                        <TextInput value={job.title} onChange={(e) => updateJob(job.id, { title: e.target.value })} />
                      </Field>
                      <Field label={t("jobs.company")}>
                        <TextInput
                          value={job.company}
                          onChange={(e) => updateJob(job.id, { company: e.target.value })}
                        />
                      </Field>
                      <Field label={t("jobs.link")}>
                        <TextInput value={job.link} onChange={(e) => updateJob(job.id, { link: e.target.value })} />
                      </Field>
                      <Field label={t("jobs.status")}>
                        <Select
                          value={job.status}
                          onChange={(e) => updateJob(job.id, { status: e.target.value as SavedJobStatus })}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {t(`jobs.status.${s}`)}
                            </option>
                          ))}
                        </Select>
                      </Field>
                      <div className="sm:col-span-2">
                        <Field label={t("jobs.notes")}>
                          <TextArea value={job.notes} onChange={(e) => updateJob(job.id, { notes: e.target.value })} />
                        </Field>
                      </div>
                    </div>
                    <Button
                      className="mt-3"
                      variant="ghost"
                      onClick={() => setData((d) => ({ ...d, savedJobs: d.savedJobs.filter((j) => j.id !== job.id) }))}
                    >
                      {t("common.remove")}
                    </Button>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
