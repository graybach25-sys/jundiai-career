"use client";

import { Button, Card, Field, PageHeader, Select, TextArea, TextInput } from "@/components/ui";
import { useT } from "@/lib/i18n";
import { profileCompleteness } from "@/lib/plan";
import { useStore } from "@/lib/store";
import type { CourseItem, EducationItem, ExperienceItem, LanguageItem, Profile, WorkMode } from "@/lib/types";
import { uid } from "@/lib/types";
import { KeyboardEvent, useState } from "react";

export default function ProfilePage() {
  const { t } = useT();
  const { data, setData, resetAll } = useStore();
  const profile = data.profile;
  const complete = profileCompleteness(profile);

  function patch(partial: Partial<Profile>) {
    setData((d) => ({ ...d, profile: { ...d.profile, ...partial } }));
  }

  return (
    <div>
      <PageHeader
        title={t("profile.title")}
        lead={`${t("profile.lead")} ${complete.pct}%`}
        actions={
          <Button
            variant="danger"
            onClick={() => {
              if (window.confirm(t("profile.clearConfirm"))) resetAll();
            }}
          >
            {t("common.clear")}
          </Button>
        }
      />

      <div className="space-y-6">
        <Card>
          <h2 className="font-serif text-2xl">{t("profile.personal")}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label={t("profile.name")}>
              <TextInput value={profile.name} onChange={(e) => patch({ name: e.target.value })} autoComplete="name" />
            </Field>
            <Field label={t("profile.city")}>
              <TextInput value={profile.city} onChange={(e) => patch({ city: e.target.value })} />
            </Field>
            <Field label={t("profile.email")}>
              <TextInput type="email" value={profile.email} onChange={(e) => patch({ email: e.target.value })} />
            </Field>
            <Field label={t("profile.phone")}>
              <TextInput value={profile.phone} onChange={(e) => patch({ phone: e.target.value })} />
            </Field>
            <Field label={t("profile.linkedin")}>
              <TextInput value={profile.linkedin} onChange={(e) => patch({ linkedin: e.target.value })} />
            </Field>
            <div className="sm:col-span-2">
              <Field label={t("profile.summary")}>
                <TextArea value={profile.summary} onChange={(e) => patch({ summary: e.target.value })} />
              </Field>
            </div>
          </div>
        </Card>

        <ListCard
          title={t("profile.education")}
          empty={t("profile.emptyEdu")}
          onAdd={() =>
            patch({
              education: [
                ...profile.education,
                { id: uid(), school: "", course: "", level: "", year: "" },
              ],
            })
          }
        >
          {profile.education.map((item, index) => (
            <EduRow
              key={item.id}
              item={item}
              onChange={(next) =>
                patch({ education: profile.education.map((e, i) => (i === index ? next : e)) })
              }
              onRemove={() => patch({ education: profile.education.filter((_, i) => i !== index) })}
            />
          ))}
        </ListCard>

        <ListCard
          title={t("profile.experience")}
          empty={t("profile.emptyExp")}
          onAdd={() =>
            patch({
              experience: [
                ...profile.experience,
                { id: uid(), company: "", role: "", period: "", description: "" },
              ],
            })
          }
        >
          {profile.experience.map((item, index) => (
            <ExpRow
              key={item.id}
              item={item}
              onChange={(next) =>
                patch({ experience: profile.experience.map((e, i) => (i === index ? next : e)) })
              }
              onRemove={() => patch({ experience: profile.experience.filter((_, i) => i !== index) })}
            />
          ))}
        </ListCard>

        <ListCard
          title={t("profile.courses")}
          empty={t("profile.emptyCourses")}
          onAdd={() =>
            patch({
              courses: [...profile.courses, { id: uid(), name: "", provider: "", year: "" }],
            })
          }
        >
          {profile.courses.map((item, index) => (
            <CourseRow
              key={item.id}
              item={item}
              onChange={(next) =>
                patch({ courses: profile.courses.map((e, i) => (i === index ? next : e)) })
              }
              onRemove={() => patch({ courses: profile.courses.filter((_, i) => i !== index) })}
            />
          ))}
        </ListCard>

        <Card>
          <h2 className="font-serif text-2xl">{t("profile.skills")}</h2>
          <p className="mt-1 text-sm text-ink-soft">{t("profile.skillsHelp")}</p>
          <TagInput
            values={profile.skills}
            onChange={(skills) => patch({ skills })}
          />
        </Card>

        <ListCard
          title={t("profile.languages")}
          empty=""
          onAdd={() =>
            patch({
              languages: [...profile.languages, { id: uid(), name: "", level: "" }],
            })
          }
        >
          {profile.languages.map((item, index) => (
            <LangRow
              key={item.id}
              item={item}
              onChange={(next) =>
                patch({ languages: profile.languages.map((e, i) => (i === index ? next : e)) })
              }
              onRemove={() => patch({ languages: profile.languages.filter((_, i) => i !== index) })}
            />
          ))}
        </ListCard>

        <Card>
          <h2 className="font-serif text-2xl">{t("profile.constraints")}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label={t("profile.workMode")}>
              <Select
                value={profile.workMode}
                onChange={(e) => patch({ workMode: e.target.value as WorkMode })}
              >
                {(["presencial", "hibrido", "remoto", "flexivel"] as const).map((mode) => (
                  <option key={mode} value={mode}>
                    {t(`profile.work.${mode}`)}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label={t("profile.travel")}>
              <Select
                value={profile.travelToSP}
                onChange={(e) => patch({ travelToSP: e.target.value as Profile["travelToSP"] })}
              >
                {(["sim", "as_vezes", "nao"] as const).map((mode) => (
                  <option key={mode} value={mode}>
                    {t(`profile.travel.${mode}`)}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label={t("profile.schedule")}>
              <TextInput value={profile.schedule} onChange={(e) => patch({ schedule: e.target.value })} />
            </Field>
            <Field label={t("profile.notes")}>
              <TextArea value={profile.constraints} onChange={(e) => patch({ constraints: e.target.value })} />
            </Field>
          </div>
        </Card>

      </div>
    </div>
  );
}

function ListCard({
  title,
  empty,
  onAdd,
  children,
}: {
  title: string;
  empty: string;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  const { t } = useT();
  const hasKids = Array.isArray(children) ? children.length > 0 : Boolean(children);
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-serif text-2xl">{title}</h2>
        <Button type="button" variant="secondary" onClick={onAdd}>
          {t("common.add")}
        </Button>
      </div>
      {hasKids ? <div className="space-y-4">{children}</div> : empty ? <p className="text-ink-soft">{empty}</p> : null}
    </Card>
  );
}

function EduRow({
  item,
  onChange,
  onRemove,
}: {
  item: EducationItem;
  onChange: (item: EducationItem) => void;
  onRemove: () => void;
}) {
  const { t } = useT();
  return (
    <div className="grid gap-3 rounded-2xl bg-cream p-3 sm:grid-cols-2">
      <Field label={t("profile.school")}>
        <TextInput value={item.school} onChange={(e) => onChange({ ...item, school: e.target.value })} />
      </Field>
      <Field label={t("profile.course")}>
        <TextInput value={item.course} onChange={(e) => onChange({ ...item, course: e.target.value })} />
      </Field>
      <Field label={t("profile.level")}>
        <TextInput value={item.level} onChange={(e) => onChange({ ...item, level: e.target.value })} />
      </Field>
      <Field label={t("profile.year")}>
        <TextInput value={item.year} onChange={(e) => onChange({ ...item, year: e.target.value })} />
      </Field>
      <div className="sm:col-span-2">
        <Button type="button" variant="ghost" onClick={onRemove}>
          {t("common.remove")}
        </Button>
      </div>
    </div>
  );
}

function ExpRow({
  item,
  onChange,
  onRemove,
}: {
  item: ExperienceItem;
  onChange: (item: ExperienceItem) => void;
  onRemove: () => void;
}) {
  const { t } = useT();
  return (
    <div className="grid gap-3 rounded-2xl bg-cream p-3 sm:grid-cols-2">
      <Field label={t("profile.role")}>
        <TextInput value={item.role} onChange={(e) => onChange({ ...item, role: e.target.value })} />
      </Field>
      <Field label={t("profile.company")}>
        <TextInput value={item.company} onChange={(e) => onChange({ ...item, company: e.target.value })} />
      </Field>
      <Field label={t("profile.period")}>
        <TextInput value={item.period} onChange={(e) => onChange({ ...item, period: e.target.value })} />
      </Field>
      <div className="sm:col-span-2">
        <Field label={t("profile.description")}>
          <TextArea value={item.description} onChange={(e) => onChange({ ...item, description: e.target.value })} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Button type="button" variant="ghost" onClick={onRemove}>
          {t("common.remove")}
        </Button>
      </div>
    </div>
  );
}

function CourseRow({
  item,
  onChange,
  onRemove,
}: {
  item: CourseItem;
  onChange: (item: CourseItem) => void;
  onRemove: () => void;
}) {
  const { t } = useT();
  return (
    <div className="grid gap-3 rounded-2xl bg-cream p-3 sm:grid-cols-3">
      <Field label={t("profile.courseName")}>
        <TextInput value={item.name} onChange={(e) => onChange({ ...item, name: e.target.value })} />
      </Field>
      <Field label={t("profile.provider")}>
        <TextInput value={item.provider} onChange={(e) => onChange({ ...item, provider: e.target.value })} />
      </Field>
      <Field label={t("profile.year")}>
        <TextInput value={item.year} onChange={(e) => onChange({ ...item, year: e.target.value })} />
      </Field>
      <div className="sm:col-span-3">
        <Button type="button" variant="ghost" onClick={onRemove}>
          {t("common.remove")}
        </Button>
      </div>
    </div>
  );
}

function LangRow({
  item,
  onChange,
  onRemove,
}: {
  item: LanguageItem;
  onChange: (item: LanguageItem) => void;
  onRemove: () => void;
}) {
  const { t } = useT();
  return (
    <div className="grid gap-3 rounded-2xl bg-cream p-3 sm:grid-cols-[1fr_1fr_auto]">
      <Field label={t("profile.language")}>
        <TextInput value={item.name} onChange={(e) => onChange({ ...item, name: e.target.value })} />
      </Field>
      <Field label={t("profile.langLevel")}>
        <TextInput value={item.level} onChange={(e) => onChange({ ...item, level: e.target.value })} />
      </Field>
      <div className="flex items-end">
        <Button type="button" variant="ghost" onClick={onRemove}>
          {t("common.remove")}
        </Button>
      </div>
    </div>
  );
}

function TagInput({ values, onChange }: { values: string[]; onChange: (values: string[]) => void }) {
  const [draft, setDraft] = useState("");
  function add() {
    const next = draft.trim();
    if (!next) return;
    if (!values.includes(next)) onChange([...values, next]);
    setDraft("");
  }
  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    }
  }
  return (
    <div className="mt-3">
      <div className="mb-3 flex flex-wrap gap-2">
        {values.map((skill) => (
          <button
            key={skill}
            type="button"
            className="rounded-full bg-sage-soft px-3 py-1 text-sm text-sage"
            onClick={() => onChange(values.filter((s) => s !== skill))}
          >
            {skill} ×
          </button>
        ))}
      </div>
      <TextInput value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={onKey} />
    </div>
  );
}
