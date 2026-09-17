import type { DirectionId, Locale, QuizAnswers, ScoredDirection } from "./types";

export type QuestionType = "multi" | "single";

export type QuizOption = {
  id: string;
  label: Record<Locale, string>;
  weights: Partial<Record<DirectionId, number>>;
};

export type QuizQuestion = {
  id: string;
  type: QuestionType;
  max?: number;
  title: Record<Locale, string>;
  help: Record<Locale, string>;
  options: QuizOption[];
};

export const DIRECTIONS: Record<
  DirectionId,
  {
    title: Record<Locale, string>;
    tagline: Record<Locale, string>;
    market: Record<Locale, string>;
    skills: Record<Locale, string[]>;
  }
> = {
  admin: {
    title: {
      pt: "Administração e back-office",
      en: "Administration & back office",
    },
    tagline: {
      pt: "Organizar, apoiar e fazer a casa andar — em empresas, clínicas e escritórios de Jundiaí.",
      en: "Organize, support, and keep things running — in Jundiaí companies, clinics, and offices.",
    },
    market: {
      pt: "Indústrias, escritórios, clínicas, prefeitura e centros de distribuição da região precisam de pessoas organizadas para rotinas, atendimento interno e controle de documentos.",
      en: "Local industry, offices, clinics, city hall, and distribution centers need organized people for routines, internal support, and document control.",
    },
    skills: {
      pt: ["Excel / Planilhas", "Rotinas administrativas", "Atendimento interno", "Organização de arquivos", "Pacote Office"],
      en: ["Excel / spreadsheets", "Admin routines", "Internal support", "File organization", "Office suite"],
    },
  },
  atendimento: {
    title: {
      pt: "Atendimento e relacionamento",
      en: "Customer service & relationships",
    },
    tagline: {
      pt: "Cuidar de pessoas, ouvir bem e resolver — no varejo, serviços e clínicas da cidade.",
      en: "Take care of people, listen well, and solve problems — in local retail, services, and clinics.",
    },
    market: {
      pt: "Shopping, clínicas, escolas, telecom e empresas de serviço em Jundiaí e Itupeva contratam recepção, SAC e sucesso do cliente o ano todo.",
      en: "Malls, clinics, schools, telecom, and service firms in Jundiaí and Itupeva hire reception, support, and customer success year-round.",
    },
    skills: {
      pt: ["Comunicação", "Escuta ativa", "CRM básico", "Resolução de conflitos", "Português escrito"],
      en: ["Communication", "Active listening", "Basic CRM", "Conflict resolution", "Written Portuguese"],
    },
  },
  educacao: {
    title: {
      pt: "Educação e apoio pedagógico",
      en: "Education & learning support",
    },
    tagline: {
      pt: "Explicar, acompanhar e ajudar alguém a crescer — escolas, cursos e reforço na região.",
      en: "Explain, support, and help someone grow — schools, courses, and tutoring in the region.",
    },
    market: {
      pt: "Escolas particulares, Fatec, SENAI, cursos livres e reforço escolar em Jundiaí valorizam paciência, clareza e gosto de ensinar — inclusive em papéis de apoio, não só sala de aula.",
      en: "Private schools, Fatec, SENAI, short courses, and tutoring in Jundiaí value patience, clarity, and a love of teaching — including support roles, not only classroom teaching.",
    },
    skills: {
      pt: ["Didática", "Planejamento de aulas", "Paciência e escuta", "Ferramentas digitais", "Alfabetização / reforço"],
      en: ["Teaching skills", "Lesson planning", "Patience and listening", "Digital tools", "Literacy / tutoring"],
    },
  },
  saude: {
    title: {
      pt: "Apoio em saúde e bem-estar",
      en: "Healthcare support & wellness",
    },
    tagline: {
      pt: "Estar perto de quem precisa de cuidado — hospitais, clínicas, farmácias e home care.",
      en: "Be close to people who need care — hospitals, clinics, pharmacies, and home care.",
    },
    market: {
      pt: "Hospital São Vicente, clínicas, laboratórios e farmácias da região contratam recepção, auxiliar, agendamento e apoio administrativo em saúde. Cursos técnicos curtos abrem porta.",
      en: "Hospital São Vicente, clinics, labs, and pharmacies hire reception, assistants, scheduling, and healthcare admin. Short technical courses open doors.",
    },
    skills: {
      pt: ["Acolhimento", "Sigilo e ética", "Agendamento", "Noções de saúde", "Trabalho em equipe"],
      en: ["Welcoming patients", "Ethics and privacy", "Scheduling", "Health basics", "Teamwork"],
    },
  },
  operacoes: {
    title: {
      pt: "Operações, logística e varejo",
      en: "Operations, logistics & retail",
    },
    tagline: {
      pt: "Fazer o fluxo acontecer — o grande motor de Jundiaí, Louveira, Itupeva e Cajamar.",
      en: "Keep the flow moving — the engine of Jundiaí, Louveira, Itupeva, and Cajamar.",
    },
    market: {
      pt: "Jundiaí é polo logístico do interior paulista. CDs, indústrias e o varejo precisam de pessoas em conferência, atendimento de loja, qualidade e supervisão de rotina.",
      en: "Jundiaí is an inland São Paulo logistics hub. DCs, factories, and retail need people in receiving, shop floor, quality, and shift coordination.",
    },
    skills: {
      pt: ["Organização operacional", "Conferência / WMS", "Atendimento de loja", "Segurança no trabalho", "Liderança de rotina"],
      en: ["Ops organization", "Receiving / WMS", "Shop-floor service", "Workplace safety", "Shift coordination"],
    },
  },
  tech: {
    title: {
      pt: "Tecnologia adjacente",
      en: "Tech-adjacent work",
    },
    tagline: {
      pt: "Sistemas, dados e suporte — sem precisar virar programadora no primeiro dia.",
      en: "Systems, data, and support — without becoming a programmer on day one.",
    },
    market: {
      pt: "Empresas de Jundiaí e o eixo Campinas contratam suporte, cadastros, análise júnior e rotinas em sistemas. Cursos curtos (Excel avançado, Power BI, informática, no-code) já contam.",
      en: "Jundiaí and the Campinas corridor hire support, data entry quality, junior analysis, and systems routines. Short courses (advanced Excel, Power BI, IT basics, no-code) already count.",
    },
    skills: {
      pt: ["Excel avançado", "Lógica e sistemas", "Suporte ao usuário", "Power BI básico", "Aprendizado contínuo"],
      en: ["Advanced Excel", "Systems thinking", "User support", "Basic Power BI", "Continuous learning"],
    },
  },
};

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "values",
    type: "multi",
    max: 3,
    title: {
      pt: "O que mais importa para você agora?",
      en: "What matters most to you right now?",
    },
    help: {
      pt: "Escolha até 3. Não existe resposta certa — só o que combina com a sua vida.",
      en: "Pick up to 3. There is no right answer — only what fits your life.",
    },
    options: [
      {
        id: "stability",
        label: { pt: "Estabilidade e previsibilidade", en: "Stability and predictability" },
        weights: { admin: 2, operacoes: 2, saude: 1 },
      },
      {
        id: "help",
        label: { pt: "Ajudar pessoas de verdade", en: "Genuinely helping people" },
        weights: { educacao: 3, saude: 3, atendimento: 2 },
      },
      {
        id: "learning",
        label: { pt: "Aprender coisas novas", en: "Learning new things" },
        weights: { tech: 3, educacao: 2, admin: 1 },
      },
      {
        id: "autonomy",
        label: { pt: "Autonomia no dia a dia", en: "Day-to-day autonomy" },
        weights: { tech: 2, admin: 2 },
      },
      {
        id: "salary",
        label: { pt: "Crescer de salário com o tempo", en: "Growing pay over time" },
        weights: { operacoes: 2, tech: 2, admin: 1 },
      },
      {
        id: "balance",
        label: { pt: "Equilíbrio com a vida pessoal", en: "Balance with personal life" },
        weights: { educacao: 2, admin: 2, tech: 1 },
      },
      {
        id: "team",
        label: { pt: "Fazer parte de um time", en: "Being part of a team" },
        weights: { atendimento: 2, operacoes: 2, saude: 2 },
      },
    ],
  },
  {
    id: "interests",
    type: "multi",
    max: 3,
    title: {
      pt: "O que te atrai no trabalho?",
      en: "What draws you at work?",
    },
    help: {
      pt: "Pense no tipo de tarefa que te deixa mais viva — mesmo que ainda não tenha feito profissionalmente.",
      en: "Think of the kind of task that lights you up — even if you have not done it professionally yet.",
    },
    options: [
      {
        id: "organize",
        label: { pt: "Organizar processos e deixar tudo no lugar", en: "Organizing processes and putting things in order" },
        weights: { admin: 3, operacoes: 2 },
      },
      {
        id: "talk",
        label: { pt: "Conversar, receber e resolver para alguém", en: "Talking, welcoming, and solving for someone" },
        weights: { atendimento: 3, educacao: 1 },
      },
      {
        id: "teach",
        label: { pt: "Explicar até a outra pessoa entender", en: "Explaining until the other person gets it" },
        weights: { educacao: 3, atendimento: 1 },
      },
      {
        id: "care",
        label: { pt: "Cuidar, acolher, acompanhar", en: "Caring, welcoming, accompanying" },
        weights: { saude: 3, educacao: 1 },
      },
      {
        id: "sell",
        label: { pt: "Convencer, vender, apresentar", en: "Persuading, selling, presenting" },
        weights: { atendimento: 2, operacoes: 1 },
      },
      {
        id: "numbers",
        label: { pt: "Números, planilhas, conferir dados", en: "Numbers, spreadsheets, checking data" },
        weights: { admin: 2, tech: 3 },
      },
      {
        id: "hands",
        label: { pt: "Fazer com as mãos, ver o resultado no mesmo dia", en: "Hands-on work with same-day results" },
        weights: { operacoes: 3 },
      },
      {
        id: "systems",
        label: { pt: "Sistemas, aplicativos, como as coisas funcionam", en: "Systems, apps, how things work" },
        weights: { tech: 3, admin: 1 },
      },
    ],
  },
  {
    id: "strengths",
    type: "multi",
    max: 3,
    title: {
      pt: "Quais forças as pessoas reconhecem em você?",
      en: "Which strengths do people recognize in you?",
    },
    help: {
      pt: "Pode ser algo que você faz em casa, na família ou em um trabalho antigo. Força conta de todo jeito.",
      en: "It can be something you do at home, in the family, or in an old job. Strength still counts.",
    },
    options: [
      {
        id: "communication",
        label: { pt: "Comunicação clara", en: "Clear communication" },
        weights: { atendimento: 3, educacao: 2 },
      },
      {
        id: "organization",
        label: { pt: "Organização", en: "Organization" },
        weights: { admin: 3, operacoes: 2 },
      },
      {
        id: "patience",
        label: { pt: "Paciência", en: "Patience" },
        weights: { educacao: 3, saude: 2 },
      },
      {
        id: "problems",
        label: { pt: "Resolver problemas", en: "Solving problems" },
        weights: { tech: 2, admin: 2, operacoes: 2 },
      },
      {
        id: "empathy",
        label: { pt: "Empatia", en: "Empathy" },
        weights: { saude: 3, educacao: 2, atendimento: 2 },
      },
      {
        id: "details",
        label: { pt: "Olho para detalhes", en: "Eye for detail" },
        weights: { admin: 2, tech: 2, saude: 1 },
      },
      {
        id: "lead",
        label: { pt: "Puxar a fila quando precisa", en: "Stepping up when needed" },
        weights: { atendimento: 1, operacoes: 2, educacao: 1 },
      },
      {
        id: "adapt",
        label: { pt: "Se adaptar rápido", en: "Adapting quickly" },
        weights: { operacoes: 2, tech: 2, atendimento: 1 },
      },
    ],
  },
  {
    id: "drains",
    type: "multi",
    max: 2,
    title: {
      pt: "O que drena a sua energia?",
      en: "What drains your energy?",
    },
    help: {
      pt: "Escolha até 2. Vamos usar isso para afastar caminhos que pesam demais agora.",
      en: "Pick up to 2. We will use this to steer away from paths that feel too heavy right now.",
    },
    options: [
      {
        id: "sales",
        label: { pt: "Pressão de meta de venda", en: "Sales-target pressure" },
        weights: { atendimento: -3 },
      },
      {
        id: "repetitive",
        label: { pt: "Tarefa muito repetitiva, o dia inteiro igual", en: "Highly repetitive, same-all-day tasks" },
        weights: { admin: -2, operacoes: -2 },
      },
      {
        id: "nights",
        label: { pt: "Turno da noite ou madrugada", en: "Night or overnight shifts" },
        weights: { saude: -2, operacoes: -2 },
      },
      {
        id: "public",
        label: { pt: "Muita exposição ao público o tempo todo", en: "Constant public-facing work" },
        weights: { atendimento: -2, educacao: -1 },
      },
      {
        id: "solitary",
        label: { pt: "Trabalhar sozinha, sem conversa", en: "Working alone, with little conversation" },
        weights: { tech: -2, admin: -1 },
      },
      {
        id: "factory",
        label: { pt: "Ambiente de chão de fábrica pesado", en: "Heavy factory-floor environments" },
        weights: { operacoes: -3 },
      },
    ],
  },
  {
    id: "lifestyle",
    type: "single",
    title: {
      pt: "Como você gostaria de trabalhar?",
      en: "How would you like to work?",
    },
    help: {
      pt: "Pode mudar depois. Isso só ajuda a priorizar o que existe de verdade na região.",
      en: "You can change this later. It just helps us prioritize what actually exists in the region.",
    },
    options: [
      {
        id: "presencial",
        label: { pt: "Presencial em Jundiaí (ou bem perto)", en: "On-site in Jundiaí (or very nearby)" },
        weights: { operacoes: 2, saude: 2, educacao: 1, atendimento: 1 },
      },
      {
        id: "hibrido",
        label: { pt: "Híbrido — alguns dias em casa", en: "Hybrid — some days at home" },
        weights: { admin: 2, tech: 2, educacao: 1 },
      },
      {
        id: "remoto",
        label: { pt: "Remoto, se aparecer uma boa chance", en: "Remote, if a good chance appears" },
        weights: { tech: 3, admin: 2 },
      },
      {
        id: "flexivel",
        label: { pt: "Flexível — o que fizer sentido agora", en: "Flexible — whatever makes sense now" },
        weights: { admin: 1, atendimento: 1, educacao: 1, saude: 1, operacoes: 1, tech: 1 },
      },
    ],
  },
  {
    id: "travel",
    type: "single",
    title: {
      pt: "E ir até a capital (São Paulo)?",
      en: "What about going into São Paulo city?",
    },
    help: {
      pt: "Trem, ônibus e carona existem — mas o cansaço também. Seja honesta com o que cabe na sua semana.",
      en: "Train, bus, and rides exist — so does fatigue. Be honest about what fits your week.",
    },
    options: [
      {
        id: "often",
        label: { pt: "Posso ir com frequência se a vaga valer a pena", en: "I can go often if the role is worth it" },
        weights: { tech: 1, admin: 1, atendimento: 1 },
      },
      {
        id: "sometimes",
        label: { pt: "Às vezes, não todo dia", en: "Sometimes, not every day" },
        weights: { admin: 1, educacao: 1, tech: 1 },
      },
      {
        id: "local",
        label: { pt: "Prefiro ficar em Jundiaí e arredores", en: "I prefer to stay in Jundiaí and nearby" },
        weights: { operacoes: 2, saude: 1, atendimento: 1, educacao: 1 },
      },
    ],
  },
  {
    id: "retrain",
    type: "single",
    title: {
      pt: "Quanto você topa estudar para essa virada?",
      en: "How much study are you open to for this turn?",
    },
    help: {
      pt: "Nenhum caminho exige faculdade no primeiro passo. Cursos curtos do SENAI e SEBRAE já abrem porta.",
      en: "No path requires a degree as the first step. Short SENAI and SEBRAE courses already open doors.",
    },
    options: [
      {
        id: "none",
        label: { pt: "Quero usar o que eu já sei, pelo menos no começo", en: "I want to use what I already know, at least at first" },
        weights: { admin: 2, atendimento: 2, operacoes: 1 },
      },
      {
        id: "short",
        label: { pt: "Curso curto (semanas ou até 3 meses)", en: "A short course (weeks up to 3 months)" },
        weights: { admin: 1, atendimento: 1, educacao: 1, saude: 1, operacoes: 1, tech: 2 },
      },
      {
        id: "techcourse",
        label: { pt: "Curso técnico (6 a 18 meses)", en: "A technical course (6 to 18 months)" },
        weights: { tech: 3, saude: 3, educacao: 2, operacoes: 1 },
      },
      {
        id: "long",
        label: { pt: "Graduação ou pós, se fizer sentido", en: "A degree or graduate course, if it makes sense" },
        weights: { educacao: 2, tech: 2, saude: 1 },
      },
    ],
  },
  {
    id: "energy",
    type: "single",
    title: {
      pt: "No fim do dia, o que te deixa mais cheia?",
      en: "At the end of the day, what fills you up?",
    },
    help: {
      pt: "Uma escolha só. É o coração do mapa.",
      en: "Just one choice. This is the heart of the map.",
    },
    options: [
      {
        id: "people",
        label: { pt: "Pessoas — conversa, cuidado, ensinar", en: "People — conversation, care, teaching" },
        weights: { atendimento: 3, educacao: 3, saude: 3 },
      },
      {
        id: "process",
        label: { pt: "Processos — ordem, fluxo, “está pronto”", en: "Processes — order, flow, “it’s done”" },
        weights: { admin: 3, operacoes: 3 },
      },
      {
        id: "ideas",
        label: { pt: "Ideias e sistemas — entender e melhorar", en: "Ideas and systems — understanding and improving" },
        weights: { tech: 3, admin: 2, educacao: 1 },
      },
    ],
  },
];

function optionById(questionId: string, optionId: string) {
  return QUESTIONS.find((q) => q.id === questionId)?.options.find((o) => o.id === optionId);
}

export function scoreQuiz(answers: QuizAnswers, locale: Locale): ScoredDirection[] {
  const totals: Record<DirectionId, number> = {
    admin: 0,
    atendimento: 0,
    educacao: 0,
    saude: 0,
    operacoes: 0,
    tech: 0,
  };
  const reasonHits: Record<DirectionId, string[]> = {
    admin: [],
    atendimento: [],
    educacao: [],
    saude: [],
    operacoes: [],
    tech: [],
  };

  for (const [questionId, selected] of Object.entries(answers)) {
    for (const optionId of selected) {
      const option = optionById(questionId, optionId);
      if (!option) continue;
      for (const [dir, weight] of Object.entries(option.weights) as [DirectionId, number][]) {
        totals[dir] += weight;
        if (weight > 0) {
          reasonHits[dir].push(option.label[locale]);
        }
      }
    }
  }

  const max = Math.max(...Object.values(totals), 1);
  const ranked = (Object.keys(totals) as DirectionId[])
    .map((id) => {
      const meta = DIRECTIONS[id];
      const uniqueReasons = [...new Set(reasonHits[id])].slice(0, 4);
      return {
        id,
        score: Math.max(0, Math.round((totals[id] / max) * 100)),
        reasons: uniqueReasons,
        skills: meta.skills[locale],
      };
    })
    .sort((a, b) => b.score - a.score);

  const positive = ranked.filter((d) => d.score >= 35);
  return (positive.length >= 3 ? positive : ranked.slice(0, 4)).slice(0, 6);
}

export function quizProgress(answers: QuizAnswers) {
  const answered = QUESTIONS.filter((q) => (answers[q.id] ?? []).length > 0).length;
  return { answered, total: QUESTIONS.length, pct: Math.round((answered / QUESTIONS.length) * 100) };
}
