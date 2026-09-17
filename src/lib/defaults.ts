import type { AppData, Profile } from "./types";

export const DEFAULT_PROFILE: Profile = {
  name: "",
  city: "Jundiaí, SP",
  email: "",
  phone: "",
  linkedin: "",
  summary: "",
  education: [],
  experience: [],
  courses: [],
  skills: [],
  languages: [],
  workMode: "hibrido",
  travelToSP: "as_vezes",
  schedule: "",
  constraints: "",
};

export const DEFAULT_DATA: AppData = {
  locale: "pt",
  profile: DEFAULT_PROFILE,
  quiz: {
    answers: {},
    completed: false,
    completedAt: null,
  },
  resume: {
    template: "contemporaneo",
    objective: "",
  },
  savedJobs: [],
  plan: [],
  interviewAnswers: {},
  coverLetters: [],
  linkedinOverrides: {
    headlinePt: "",
    headlineEn: "",
    aboutPt: "",
    aboutEn: "",
  },
  linkedinChecklist: {},
  demoLoaded: false,
};

export function isProfileStarted(profile: Profile) {
  return Boolean(
    profile.name.trim() ||
      profile.email.trim() ||
      profile.skills.length ||
      profile.experience.length ||
      profile.education.length,
  );
}
