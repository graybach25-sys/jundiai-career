export type Locale = "pt" | "en";

export type WorkMode = "presencial" | "hibrido" | "remoto" | "flexivel";

export type EducationItem = {
  id: string;
  school: string;
  course: string;
  level: string;
  year: string;
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
};

export type CourseItem = {
  id: string;
  name: string;
  provider: string;
  year: string;
};

export type LanguageItem = {
  id: string;
  name: string;
  level: string;
};

export type Profile = {
  name: string;
  city: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  courses: CourseItem[];
  skills: string[];
  languages: LanguageItem[];
  workMode: WorkMode;
  travelToSP: "sim" | "as_vezes" | "nao";
  schedule: string;
  constraints: string;
};

export type DirectionId =
  | "admin"
  | "atendimento"
  | "educacao"
  | "saude"
  | "operacoes"
  | "tech";

export type QuizAnswers = Record<string, string[]>;

export type ScoredDirection = {
  id: DirectionId;
  score: number;
  reasons: string[];
  skills: string[];
};

export type QuizState = {
  answers: QuizAnswers;
  completed: boolean;
  completedAt: string | null;
};

export type ResumeState = {
  template: "classico" | "contemporaneo";
  objective: string;
};

export type SavedJobStatus =
  | "interessada"
  | "candidatei"
  | "entrevista"
  | "retorno"
  | "arquivada";

export type SavedJob = {
  id: string;
  title: string;
  company: string;
  link: string;
  status: SavedJobStatus;
  notes: string;
  createdAt: string;
};

export type PlanItem = {
  id: string;
  week: number;
  done: boolean;
};

export type CoverLetter = {
  id: string;
  company: string;
  role: string;
  bodyPt: string;
  bodyEn: string;
  createdAt: string;
};

export type AppData = {
  locale: Locale;
  profile: Profile;
  quiz: QuizState;
  resume: ResumeState;
  savedJobs: SavedJob[];
  plan: PlanItem[];
  interviewAnswers: Record<string, string>;
  coverLetters: CoverLetter[];
  linkedinOverrides: {
    headlinePt: string;
    headlineEn: string;
    aboutPt: string;
    aboutEn: string;
  };
  linkedinChecklist: Record<string, boolean>;
  demoLoaded: boolean;
};

export function uid() {
  return crypto.randomUUID();
}
