import type { Locale } from "./types";

export type InterviewQ = {
  id: string;
  question: Record<Locale, string>;
  tip: Record<Locale, string>;
  starter: Record<Locale, string>;
};

export const INTERVIEW_QUESTIONS: InterviewQ[] = [
  {
    id: "about",
    question: { pt: "Fale um pouco sobre você.", en: "Tell me a bit about yourself." },
    tip: {
      pt: "2 minutos. Presente, passado curto, futuro. Sem história de vida inteira.",
      en: "Two minutes. Present, short past, future. Not your whole life story.",
    },
    starter: {
      pt: "Moro em Jundiaí e estou em uma transição de carreira. Gosto de [força]. Nos últimos anos [experiência]. Agora busco [direção] porque [motivo].",
      en: "I live in Jundiaí and I’m in a career transition. I like [strength]. In recent years [experience]. Now I’m looking for [direction] because [reason].",
    },
  },
  {
    id: "why-role",
    question: { pt: "Por que você quer esta vaga?", en: "Why do you want this role?" },
    tip: {
      pt: "Fale da empresa E de você. Evite só “preciso de emprego”.",
      en: "Talk about the company AND you. Avoid only “I need a job”.",
    },
    starter: {
      pt: "O que me chamou atenção foi [algo concreto da vaga]. Combina com o que sei fazer — [habilidade] — e com o que quero aprender.",
      en: "What caught my attention was [something concrete about the role]. It matches what I can do — [skill] — and what I want to learn.",
    },
  },
  {
    id: "career-change",
    question: { pt: "Por que está mudando de área?", en: "Why are you changing fields?" },
    tip: {
      pt: "Tom sereno. Sem reclamação do passado. Mostre escolha, não fuga.",
      en: "Calm tone. No complaining about the past. Show a choice, not an escape.",
    },
    starter: {
      pt: "Foi uma escolha consciente. Quero um trabalho que use [força] de um jeito mais alinhado com a minha vida agora, aqui na região.",
      en: "It was a conscious choice. I want work that uses [strength] in a way that fits my life now, here in this region.",
    },
  },
  {
    id: "strength",
    question: { pt: "Qual é o seu ponto forte?", en: "What is your strength?" },
    tip: {
      pt: "Um ponto + um exemplo curto. Não liste dez.",
      en: "One strength + a short example. Do not list ten.",
    },
    starter: {
      pt: "Organização (ou empatia, ou comunicação). Por exemplo, [situação] — o resultado foi [o que melhorou].",
      en: "Organization (or empathy, or communication). For example, [situation] — the result was [what improved].",
    },
  },
  {
    id: "weakness",
    question: { pt: "E um ponto a desenvolver?", en: "And a development area?" },
    tip: {
      pt: "Seja honesta e mostre o que já está fazendo. Evite “sou perfeccionista” vazio.",
      en: "Be honest and show what you are already doing. Avoid an empty “I’m a perfectionist”.",
    },
    starter: {
      pt: "Ainda estou fortalecendo [habilidade, ex.: Excel]. Por isso já [curso / prática]. Não deixo isso travar a entrega.",
      en: "I’m still strengthening [skill, e.g. Excel]. That’s why I already [course / practice]. I don’t let it block delivery.",
    },
  },
  {
    id: "pressure",
    question: { pt: "Como você lida com pressão?", en: "How do you handle pressure?" },
    tip: {
      pt: "Mostre método: priorizar, pedir ajuda, respirar, entregar.",
      en: "Show a method: prioritize, ask for help, breathe, deliver.",
    },
    starter: {
      pt: "Eu paro, listo o que é urgente de verdade e resolvo uma coisa de cada vez. Se precisar, peço ajuda cedo — não no último minuto.",
      en: "I pause, list what is truly urgent, and handle one thing at a time. If I need help, I ask early — not at the last minute.",
    },
  },
  {
    id: "team",
    question: { pt: "Você trabalha bem em equipe?", en: "Do you work well in a team?" },
    tip: {
      pt: "Exemplo de quando você apoiou alguém ou pediu apoio.",
      en: "An example of supporting someone or asking for support.",
    },
    starter: {
      pt: "Sim. Gosto de deixar claro quem faz o quê. Já [exemplo]. Prefiro ambiente de respeito — e também ofereço isso.",
      en: "Yes. I like making it clear who does what. I already [example]. I prefer a respectful environment — and I offer that too.",
    },
  },
  {
    id: "availability",
    question: { pt: "Qual sua disponibilidade de horário?", en: "What is your schedule availability?" },
    tip: {
      pt: "Seja clara. Combinado honesto evita desgaste depois.",
      en: "Be clear. An honest agreement avoids pain later.",
    },
    starter: {
      pt: "Tenho disponibilidade em horário comercial. [Sábados / híbrido / capital] combino com antecedência.",
      en: "I’m available during business hours. [Saturdays / hybrid / São Paulo city] I arrange in advance.",
    },
  },
  {
    id: "salary",
    question: { pt: "Qual sua pretensão salarial?", en: "What are your salary expectations?" },
    tip: {
      pt: "Pesquise a faixa da vaga em Jundiaí. Se não souber, devolva a pergunta com elegância.",
      en: "Research the local range in Jundiaí. If you don’t know, politely toss the question back.",
    },
    starter: {
      pt: "Estou alinhada à faixa da função na região de Jundiaí. Posso conversar com base nas responsabilidades e benefícios.",
      en: "I’m aligned with the local range for this role in the Jundiaí area. I’m open to talking based on responsibilities and benefits.",
    },
  },
  {
    id: "why-you",
    question: { pt: "Por que deveríamos te contratar?", en: "Why should we hire you?" },
    tip: {
      pt: "Três coisas: o que você entrega, como você é no time, vontade de aprender.",
      en: "Three things: what you deliver, how you are on a team, willingness to learn.",
    },
    starter: {
      pt: "Porque eu chego, faço e aprendo. Trago [habilidade], trato gente bem, e quero construir algo estável aqui na região — não só passar pela vaga.",
      en: "Because I show up, follow through, and learn. I bring [skill], I treat people well, and I want to build something stable here — not just pass through the job.",
    },
  },
];
