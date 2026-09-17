import type { Locale } from "./types";

export type JobHub = {
  id: string;
  name: string;
  url: string;
  kind: "board" | "training" | "employer" | "public";
  blurb: Record<Locale, string>;
};

export const JOB_HUBS: JobHub[] = [
  {
    id: "catho",
    name: "Catho",
    url: "https://www.catho.com.br/vagas/jundiai-sp/",
    kind: "board",
    blurb: {
      pt: "Um dos classificados mais usados no Brasil. Filtre por Jundiaí e salve buscas.",
      en: "One of Brazil’s most used job boards. Filter by Jundiaí and save searches.",
    },
  },
  {
    id: "infojobs",
    name: "InfoJobs",
    url: "https://www.infojobs.com.br/vagas-de-emprego-jundiai.aspx",
    kind: "board",
    blurb: {
      pt: "Muitas vagas de administração, atendimento e operações no interior paulista.",
      en: "Many admin, service, and operations roles in inland São Paulo.",
    },
  },
  {
    id: "linkedin",
    name: "LinkedIn Vagas",
    url: "https://www.linkedin.com/jobs/search/?location=Jundia%C3%AD%2C%20S%C3%A3o%20Paulo%2C%20Brazil",
    kind: "board",
    blurb: {
      pt: "Ative “Open to work”, filtre por Jundiaí / Itupeva / Campinas e use palavras-chave em português.",
      en: "Turn on Open to Work, filter Jundiaí / Itupeva / Campinas, and search with Portuguese keywords.",
    },
  },
  {
    id: "vagas",
    name: "Vagas.com",
    url: "https://www.vagas.com.br/vagas-de-jundiai",
    kind: "board",
    blurb: {
      pt: "Empresas médias e grandes anunciam aqui. Vale criar alerta de e-mail.",
      en: "Mid-size and large companies post here. Worth creating an email alert.",
    },
  },
  {
    id: "indeed",
    name: "Indeed Brasil",
    url: "https://br.indeed.com/jobs?q=&l=Jundia%C3%AD%2C+SP",
    kind: "board",
    blurb: {
      pt: "Agrega vários anúncios. Leia com calma: nem todo post é recente.",
      en: "Aggregates many listings. Read carefully — not every post is fresh.",
    },
  },
  {
    id: "sine",
    name: "SINE / Emprega Brasil",
    url: "https://empregabrasil.mte.gov.br/",
    kind: "public",
    blurb: {
      pt: "Rede pública de emprego. Leve RG e currículo. Também busque o posto SINE de Jundiaí.",
      en: "Public employment network. Bring ID and a résumé. Also look up the Jundiaí SINE office.",
    },
  },
  {
    id: "senai",
    name: "SENAI Jundiaí",
    url: "https://jundiai.sp.senai.br/",
    kind: "training",
    blurb: {
      pt: "Cursos técnicos e rápidos ligados à indústria e operações da região.",
      en: "Technical and short courses tied to local industry and operations.",
    },
  },
  {
    id: "sebrae",
    name: "SEBRAE-SP",
    url: "https://sebrae.com.br/sites/PortalSebrae/ufs/sp",
    kind: "training",
    blurb: {
      pt: "Capacitação gratuita ou acessível em gestão, atendimento e empreender com calma.",
      en: "Free or affordable training in management, service, and small business.",
    },
  },
  {
    id: "fatec",
    name: "Fatec Jundiaí",
    url: "https://www.fatecjd.edu.br/",
    kind: "training",
    blurb: {
      pt: "Graduação tecnológica pública. Útil se você topar um passo maior daqui a um tempo.",
      en: "Public technology college. Useful if you want a bigger step later.",
    },
  },
  {
    id: "prefeitura",
    name: "Prefeitura de Jundiaí",
    url: "https://jundiai.sp.gov.br/",
    kind: "public",
    blurb: {
      pt: "Concursos e processos seletivos municipais. Estabilidade, mas o ritmo é outro.",
      en: "Municipal contests and selections. Stability, with a different pace.",
    },
  },
  {
    id: "hsv",
    name: "Hospital São Vicente de Paulo",
    url: "https://www.hsvicente.org.br/",
    kind: "employer",
    blurb: {
      pt: "Grande empregador de saúde na cidade. Olhe “Trabalhe conosco” e recepção / apoio.",
      en: "A major local health employer. Check careers for reception and support roles.",
    },
  },
  {
    id: "shopping",
    name: "Maxi Shopping / Shopping Jundiaí",
    url: "https://www.maxishoppingjundiai.com.br/",
    kind: "employer",
    blurb: {
      pt: "Varejo e operações de loja. Caminhe nos shoppings e pergunte ao RH das lojas âncora.",
      en: "Retail and store operations. Walk the malls and ask anchor stores about hiring.",
    },
  },
  {
    id: "logistica",
    name: "Eixo logístico (Louveira, Itupeva, Cajamar)",
    url: "https://www.linkedin.com/jobs/search/?keywords=log%C3%ADstica&location=Jundia%C3%AD%2C%20S%C3%A3o%20Paulo%2C%20Brazil",
    kind: "employer",
    blurb: {
      pt: "CDs de grandes marcas na região. Busque “conferente”, “assistente de logística”, “qualidade”.",
      en: "Big-brand distribution centers nearby. Search conferente, logistics assistant, quality.",
    },
  },
];

export const SEARCH_TIPS: { title: Record<Locale, string>; body: Record<Locale, string>; keywords: string[] }[] = [
  {
    title: { pt: "Administração", en: "Administration" },
    body: {
      pt: "Use títulos reais do mercado brasileiro, não traduções literais.",
      en: "Use real Brazilian job titles, not literal translations.",
    },
    keywords: [
      "assistente administrativo",
      "auxiliar administrativo",
      "assistente de escritório",
      "secretaria",
      "controle de documentos",
    ],
  },
  {
    title: { pt: "Atendimento", en: "Customer service" },
    body: {
      pt: "Inclua recepção e relacionamento — não só “vendas”.",
      en: "Include reception and relationship roles — not only “sales”.",
    },
    keywords: ["recepcionista", "atendente", "SAC", "customer success", "relacionamento com cliente"],
  },
  {
    title: { pt: "Educação", en: "Education" },
    body: {
      pt: "Há papéis de apoio, não só professor titular.",
      en: "There are support roles, not only lead teacher.",
    },
    keywords: ["auxiliar de sala", "monitor", "reforço escolar", "secretaria escolar", "instrutor"],
  },
  {
    title: { pt: "Saúde", en: "Healthcare" },
    body: {
      pt: "Mesmo sem curso técnico, recepção de clínica já é um pé na porta.",
      en: "Even without a technical course, clinic reception is a foot in the door.",
    },
    keywords: ["recepcionista clínica", "agendamento", "auxiliar de farmácia", "secretaria de consultório"],
  },
  {
    title: { pt: "Operações", en: "Operations" },
    body: {
      pt: "Jundiaí vive de logística. Vale Itupeva, Louveira e Cajamar na busca.",
      en: "Jundiaí runs on logistics. Include Itupeva, Louveira, and Cajamar.",
    },
    keywords: ["conferente", "assistente de logística", "operador de loja", "qualidade", "estoque"],
  },
  {
    title: { pt: "Tecnologia adjacente", en: "Tech-adjacent" },
    body: {
      pt: "Comece em suporte e dados. “Desenvolvedora” pode ser o passo 3, não o 1.",
      en: "Start in support and data. “Developer” can be step 3, not step 1.",
    },
    keywords: ["suporte técnico", "assistente de sistemas", "analista júnior", "cadastro", "Excel"],
  },
];
