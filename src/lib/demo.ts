import type { AppData } from "./types";
import { DEFAULT_DATA } from "./defaults";

export function buildDemoData(): AppData {
  return {
    ...structuredClone(DEFAULT_DATA),
    demoLoaded: true,
    locale: "pt",
    profile: {
      name: "Andrea",
      city: "Jundiaí, SP",
      email: "andrea@exemplo.com",
      phone: "(11) 90000-0000",
      linkedin: "linkedin.com/in/andrea",
      summary:
        "Profissional em transição de carreira, organizada e comunicativa, buscando um próximo passo estável em Jundiaí. Gosto de cuidar de pessoas, deixar processos claros e aprender com calma.",
      education: [
        {
          id: "edu-1",
          school: "Escola Estadual (exemplo)",
          course: "Ensino Médio",
          level: "Completo",
          year: "2005",
        },
      ],
      experience: [
        {
          id: "exp-1",
          company: "Comércio local (exemplo)",
          role: "Atendimento ao cliente",
          period: "2018 — 2021",
          description:
            "Recebia clientes, organizava o caixa e resolvia dúvidas com paciência. Apoiei a equipe em épocas de movimento.",
        },
        {
          id: "exp-2",
          company: "Projetos pessoais e família",
          role: "Organização e cuidado",
          period: "2021 — atual",
          description:
            "Coordenei rotinas, comunicação e logística do dia a dia. Experiência real de responsabilidade, prazos e empatia — mesmo fora de um crachá.",
        },
      ],
      courses: [
        {
          id: "c-1",
          name: "Informática básica e Pacote Office",
          provider: "Curso livre (exemplo)",
          year: "2023",
        },
      ],
      skills: ["Comunicação", "Organização", "Excel básico", "Atendimento", "Português"],
      languages: [
        { id: "lang-1", name: "Português", level: "Nativo" },
        { id: "lang-2", name: "Inglês", level: "Intermediário" },
      ],
      workMode: "hibrido",
      travelToSP: "as_vezes",
      schedule: "Horário comercial, com abertura para alguns sábados se combinado.",
      constraints:
        "Prefiro Jundiaí e arredores. Posso ir à capital de vez em quando. Busco um ambiente respeitoso e com espaço para aprender.",
    },
    quiz: {
      completed: true,
      completedAt: new Date().toISOString(),
      answers: {
        values: ["help", "balance", "learning"],
        interests: ["talk", "organize", "teach"],
        strengths: ["communication", "empathy", "organization"],
        drains: ["nights", "factory"],
        lifestyle: ["hibrido"],
        travel: ["sometimes"],
        retrain: ["short"],
        energy: ["people"],
      },
    },
    resume: {
      template: "contemporaneo",
      objective:
        "Busco oportunidade em atendimento, apoio administrativo ou educação na região de Jundiaí, onde eu possa usar comunicação, organização e vontade de aprender.",
    },
    savedJobs: [
      {
        id: "job-1",
        title: "Assistente administrativo",
        company: "Clínica no centro de Jundiaí",
        link: "https://www.catho.com.br/vagas/jundiai-sp/",
        status: "interessada",
        notes: "Exemplo: vaga híbrida, pedir sobre horário.",
        createdAt: new Date().toISOString(),
      },
    ],
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
  };
}
