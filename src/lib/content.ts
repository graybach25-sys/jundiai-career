import { DIRECTIONS } from "./quiz";
import type { DirectionId, ExperienceItem, Locale, Profile } from "./types";

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "";
}

export function defaultObjective(profile: Profile, top: DirectionId | null, locale: Locale) {
  const dir = top ? DIRECTIONS[top].title[locale] : locale === "pt" ? "uma nova área" : "a new field";
  const city = profile.city || "Jundiaí";
  if (locale === "pt") {
    return `Busco oportunidade em ${dir.toLowerCase()} na região de ${city}, onde eu possa contribuir com organização, comunicação e vontade de aprender.`;
  }
  return `Looking for an opportunity in ${dir.toLowerCase()} in the ${city} area, where I can contribute with organization, communication, and a willingness to learn.`;
}

export function experienceBullets(item: ExperienceItem, locale: Locale) {
  const raw = item.description
    .split(/[\n•\-]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (raw.length) return raw.slice(0, 4);
  if (locale === "pt") {
    return [`Atuação como ${item.role || "profissional"} em ${item.company || "empresa"}.`];
  }
  return [`Worked as ${item.role || "professional"} at ${item.company || "company"}.`];
}

export function generateLinkedIn(
  profile: Profile,
  top: DirectionId | null,
  skills: string[],
  locale: Locale,
) {
  const name = firstName(profile.name) || (locale === "pt" ? "Profissional" : "Professional");
  const city = profile.city || "Jundiaí, SP";
  const dirTitle = top ? DIRECTIONS[top].title[locale] : locale === "pt" ? "transição de carreira" : "career transition";
  const skillLine = (profile.skills.length ? profile.skills : skills).slice(0, 5).join(" · ");
  const work =
    profile.workMode === "remoto"
      ? locale === "pt"
        ? "aberta a remoto"
        : "open to remote"
      : profile.workMode === "presencial"
        ? locale === "pt"
          ? "presencial na região"
          : "on-site in the region"
        : locale === "pt"
          ? "híbrido ou presencial na região"
          : "hybrid or on-site in the region";

  if (locale === "pt") {
    const headline = `${dirTitle} | ${city} | ${skillLine || "organização · comunicação"}`;
    const about = [
      `Olá, eu sou ${name}. Estou em um novo capítulo profissional, com base em ${city}.`,
      profile.summary ||
        `Tenho experiência em ${profile.experience[0]?.role || "atendimento e organização"} e quero crescer em ${dirTitle.toLowerCase()}.`,
      `Busco um ambiente respeitoso, com espaço para aprender, ${work}.`,
      skillLine ? `Habilidades que trago: ${skillLine}.` : "",
      `Aberta a conversas sobre oportunidades na região de Jundiaí e interior de São Paulo.`,
    ]
      .filter(Boolean)
      .join("\n\n");
    return { headline, about };
  }

  const headline = `${dirTitle} | ${city} | ${skillLine || "organization · communication"}`;
  const about = [
    `Hi, I’m ${name}. I’m starting a new professional chapter, based in ${city}.`,
    profile.summary ||
      `I bring experience in ${profile.experience[0]?.role || "service and organization"} and want to grow in ${dirTitle.toLowerCase()}.`,
    `I’m looking for a respectful environment with room to learn, ${work}.`,
    skillLine ? `Skills I bring: ${skillLine}.` : "",
    `Open to conversations about opportunities in the Jundiaí area and inland São Paulo.`,
  ]
    .filter(Boolean)
    .join("\n\n");
  return { headline, about };
}

export function generateCoverLetter(
  profile: Profile,
  company: string,
  role: string,
  top: DirectionId | null,
  locale: Locale,
) {
  const name = profile.name || (locale === "pt" ? "Andrea" : "Andrea");
  const city = profile.city || "Jundiaí, SP";
  const dir = top ? DIRECTIONS[top].title[locale] : "";
  const companyName = company || (locale === "pt" ? "[Nome da empresa]" : "[Company name]");
  const roleName = role || (locale === "pt" ? "[Nome da vaga]" : "[Role title]");
  const exp = profile.experience[0];

  if (locale === "pt") {
    return `Prezados responsáveis pela vaga,

Meu nome é ${name} e moro em ${city}. Escrevo para me candidatar à vaga de ${roleName} na ${companyName}.

Estou em uma transição de carreira consciente${dir ? `, com interesse especial em ${dir.toLowerCase()}` : ""}. ${
      exp
        ? `Trouxe da minha experiência como ${exp.role} em ${exp.company} o cuidado com pessoas, a organização do dia a dia e a responsabilidade de cumprir o que combinamos.`
        : "Trago organização, comunicação clara e seriedade com combinados."
    }

Gostaria de contribuir com o time da ${companyName} e continuar aprendendo. Tenho disponibilidade para ${
      profile.workMode === "remoto" ? "trabalho remoto" : profile.workMode === "presencial" ? "atuação presencial" : "formato híbrido ou presencial"
    } na região de Jundiaí${profile.travelToSP === "sim" ? ", inclusive com deslocamento pontual até a capital" : ""}.

Agradeço o tempo e fico à disposição para uma conversa.

Atenciosamente,
${name}
${profile.phone ? profile.phone + "\n" : ""}${profile.email || ""}`.trim();
  }

  return `Dear hiring team,

My name is ${name} and I live in ${city}. I am writing to apply for the ${roleName} role at ${companyName}.

I am making a thoughtful career change${dir ? `, with a particular interest in ${dir.toLowerCase()}` : ""}. ${
    exp
      ? `From my experience as ${exp.role} at ${exp.company}, I bring care for people, day-to-day organization, and a habit of following through.`
      : "I bring organization, clear communication, and reliability."
  }

I would like to contribute to the ${companyName} team and keep learning. I am available for ${
    profile.workMode === "remoto" ? "remote work" : profile.workMode === "presencial" ? "on-site work" : "hybrid or on-site work"
  } in the Jundiaí area${profile.travelToSP === "sim" ? ", including occasional travel to São Paulo city" : ""}.

Thank you for your time. I would welcome a conversation.

Kind regards,
${name}
${profile.phone ? profile.phone + "\n" : ""}${profile.email || ""}`.trim();
}

export const LINKEDIN_CHECKLIST: { id: string; title: Record<Locale, string>; hint: Record<Locale, string> }[] = [
  {
    id: "photo",
    title: { pt: "Foto de rosto, clara e recente", en: "A clear, recent headshot" },
    hint: { pt: "Fundo simples, sorriso leve, ombros visíveis.", en: "Simple background, easy smile, shoulders visible." },
  },
  {
    id: "banner",
    title: { pt: "Banner calmo (opcional, mas ajuda)", en: "A calm banner (optional, but helpful)" },
    hint: {
      pt: "Uma foto de Jundiaí, uma cor sólida ou algo que não grite “marketing”.",
      en: "A Jundiaí photo, a solid color, or anything that does not shout “marketing”.",
    },
  },
  {
    id: "headline",
    title: { pt: "Título com cidade e direção", en: "Headline with city and direction" },
    hint: { pt: "Evite só “à procura de emprego”. Diga o que você quer fazer.", en: "Avoid only “looking for a job”. Say what you want to do." },
  },
  {
    id: "about",
    title: { pt: "Sobre em 1ª pessoa", en: "About in the first person" },
    hint: { pt: "3 a 5 parágrafos curtos. Humano, não robô.", en: "3–5 short paragraphs. Human, not robotic." },
  },
  {
    id: "experience",
    title: { pt: "Experiências com bullets", en: "Experience with bullets" },
    hint: { pt: "Mesmo trabalho informal conta se você descrever o que fez.", en: "Even informal work counts if you describe what you did." },
  },
  {
    id: "skills",
    title: { pt: "5 a 10 habilidades", en: "5 to 10 skills" },
    hint: { pt: "Peça a 2 pessoas para confirmar. O Gray pode ser um.", en: "Ask 2 people to endorse. Gray can be one." },
  },
  {
    id: "open",
    title: { pt: "Open to work: Jundiaí e arredores", en: "Open to work: Jundiaí and nearby" },
    hint: { pt: "Visível para recrutadores. Inclua híbrido se for o caso.", en: "Visible to recruiters. Include hybrid if that fits." },
  },
  {
    id: "custom",
    title: { pt: "URL personalizada", en: "Custom URL" },
    hint: { pt: "linkedin.com/in/seu-nome — mais fácil de colocar no currículo.", en: "linkedin.com/in/your-name — easier to put on the résumé." },
  },
  {
    id: "featured",
    title: { pt: "Destaques (featured)", en: "Featured section" },
    hint: {
      pt: "PDF do currículo, certificado SENAI/SEBRAE, ou uma nota curta sobre sua transição.",
      en: "Résumé PDF, a SENAI/SEBRAE certificate, or a short note about your transition.",
    },
  },
];

export const FEATURED_IDEAS: Record<Locale, string[]> = {
  pt: [
    "PDF do currículo com nome no arquivo (Andrea-Curriculo.pdf)",
    "Certificado de um curso curto (Office, atendimento, logística, informática)",
    "Uma publicação simples: “Estou começando um novo capítulo em Jundiaí — aberta a conversas.”",
    "Link para o portfólio de um curso, mesmo que pequeno",
  ],
  en: [
    "Résumé PDF with your name in the file (Andrea-Resume.pdf)",
    "A short-course certificate (Office, service, logistics, IT)",
    "A simple post: “I’m starting a new chapter in Jundiaí — open to conversations.”",
    "A link to a small course project, even if modest",
  ],
};
