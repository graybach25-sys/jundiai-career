import { DEFAULT_DATA } from "./defaults";
import type { AppData } from "./types";

export const STORAGE_KEY = "novo-capitulo-jundiai-v1";

export function loadData(): AppData {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_DATA);
    const parsed = JSON.parse(raw) as Partial<AppData>;
    return {
      ...structuredClone(DEFAULT_DATA),
      ...parsed,
      profile: { ...DEFAULT_DATA.profile, ...parsed.profile },
      quiz: { ...DEFAULT_DATA.quiz, ...parsed.quiz },
      resume: { ...DEFAULT_DATA.resume, ...parsed.resume },
      linkedinOverrides: {
        ...DEFAULT_DATA.linkedinOverrides,
        ...parsed.linkedinOverrides,
      },
      savedJobs: parsed.savedJobs ?? [],
      plan: parsed.plan ?? [],
      interviewAnswers: parsed.interviewAnswers ?? {},
      coverLetters: parsed.coverLetters ?? [],
      linkedinChecklist: parsed.linkedinChecklist ?? {},
    };
  } catch {
    return structuredClone(DEFAULT_DATA);
  }
}

export function saveData(data: AppData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearData() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
