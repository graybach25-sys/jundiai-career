import { DEFAULT_PROFILE } from "./defaults";
import type {
  AppData,
  CourseItem,
  CoverLetter,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  PlanItem,
  Profile,
  ResumeState,
  SavedJob,
  SavedJobStatus,
  WorkMode,
} from "./types";

const WORK_MODES: WorkMode[] = ["presencial", "hibrido", "remoto", "flexivel"];
const JOB_STATUSES: SavedJobStatus[] = ["interessada", "candidatei", "entrevista", "retorno", "arquivada"];

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

function str(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function education(value: unknown): EducationItem[] {
  return asArray(value).map((item, index) => {
    const row = asRecord(item);
    return {
      id: str(row.id, `edu-${index}`),
      school: str(row.school),
      course: str(row.course),
      level: str(row.level),
      year: str(row.year),
    };
  });
}

function experience(value: unknown): ExperienceItem[] {
  return asArray(value).map((item, index) => {
    const row = asRecord(item);
    return {
      id: str(row.id, `exp-${index}`),
      company: str(row.company),
      role: str(row.role),
      period: str(row.period),
      description: str(row.description),
    };
  });
}

function courses(value: unknown): CourseItem[] {
  return asArray(value).map((item, index) => {
    const row = asRecord(item);
    return {
      id: str(row.id, `course-${index}`),
      name: str(row.name),
      provider: str(row.provider),
      year: str(row.year),
    };
  });
}

function languages(value: unknown): LanguageItem[] {
  return asArray(value).map((item, index) => {
    const row = asRecord(item);
    return {
      id: str(row.id, `lang-${index}`),
      name: str(row.name),
      level: str(row.level),
    };
  });
}

function skills(value: unknown): string[] {
  return asArray(value).filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function profile(value: unknown): Profile {
  const row = asRecord(value);
  const workMode = WORK_MODES.includes(row.workMode as WorkMode) ? (row.workMode as WorkMode) : DEFAULT_PROFILE.workMode;
  const travel = row.travelToSP === "sim" || row.travelToSP === "nao" || row.travelToSP === "as_vezes" ? row.travelToSP : DEFAULT_PROFILE.travelToSP;
  return {
    name: str(row.name),
    city: str(row.city, DEFAULT_PROFILE.city),
    email: str(row.email),
    phone: str(row.phone),
    linkedin: str(row.linkedin),
    summary: str(row.summary),
    education: education(row.education),
    experience: experience(row.experience),
    courses: courses(row.courses),
    skills: skills(row.skills),
    languages: languages(row.languages),
    workMode,
    travelToSP: travel,
    schedule: str(row.schedule),
    constraints: str(row.constraints),
  };
}

function quiz(value: unknown): AppData["quiz"] {
  const row = asRecord(value);
  const answers: AppData["quiz"]["answers"] = {};
  const rawAnswers = asRecord(row.answers);
  for (const [key, answer] of Object.entries(rawAnswers)) {
    if (Array.isArray(answer)) {
      answers[key] = answer.filter((item): item is string => typeof item === "string");
    }
  }
  return {
    answers,
    completed: row.completed === true,
    completedAt: typeof row.completedAt === "string" ? row.completedAt : null,
  };
}

function resume(value: unknown): ResumeState {
  const row = asRecord(value);
  return {
    template: row.template === "classico" ? "classico" : "contemporaneo",
    objective: str(row.objective),
  };
}

function savedJobs(value: unknown): SavedJob[] {
  return asArray(value).map((item, index) => {
    const row = asRecord(item);
    const status = JOB_STATUSES.includes(row.status as SavedJobStatus) ? (row.status as SavedJobStatus) : "interessada";
    return {
      id: str(row.id, `job-${index}`),
      title: str(row.title),
      company: str(row.company),
      link: str(row.link),
      status,
      notes: str(row.notes),
      createdAt: str(row.createdAt),
    };
  });
}

function plan(value: unknown): PlanItem[] {
  return asArray(value).flatMap((item) => {
    const row = asRecord(item);
    const id = str(row.id);
    if (!id) return [];
    const week = typeof row.week === "number" && Number.isFinite(row.week) ? row.week : 1;
    return [{ id, week, done: row.done === true }];
  });
}

function stringRecord(value: unknown): Record<string, string> {
  const row = asRecord(value);
  const out: Record<string, string> = {};
  for (const [key, item] of Object.entries(row)) {
    if (typeof item === "string") out[key] = item;
  }
  return out;
}

function boolRecord(value: unknown): Record<string, boolean> {
  const row = asRecord(value);
  const out: Record<string, boolean> = {};
  for (const [key, item] of Object.entries(row)) {
    if (typeof item === "boolean") out[key] = item;
  }
  return out;
}

function coverLetters(value: unknown): CoverLetter[] {
  return asArray(value).map((item, index) => {
    const row = asRecord(item);
    return {
      id: str(row.id, `letter-${index}`),
      company: str(row.company),
      role: str(row.role),
      bodyPt: str(row.bodyPt),
      bodyEn: str(row.bodyEn),
      createdAt: str(row.createdAt),
    };
  });
}

export function normalizeData(parsed: unknown): AppData {
  const row = asRecord(parsed);
  const overrides = asRecord(row.linkedinOverrides);
  return {
    locale: row.locale === "en" ? "en" : "pt",
    profile: profile(row.profile),
    quiz: quiz(row.quiz),
    resume: resume(row.resume),
    savedJobs: savedJobs(row.savedJobs),
    plan: plan(row.plan),
    interviewAnswers: stringRecord(row.interviewAnswers),
    coverLetters: coverLetters(row.coverLetters),
    linkedinOverrides: {
      headlinePt: str(overrides.headlinePt),
      headlineEn: str(overrides.headlineEn),
      aboutPt: str(overrides.aboutPt),
      aboutEn: str(overrides.aboutEn),
    },
    linkedinChecklist: boolRecord(row.linkedinChecklist),
    demoLoaded: row.demoLoaded === true,
  };
}
