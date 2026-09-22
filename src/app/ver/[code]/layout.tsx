import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Para o Gray — Novo Capítulo",
  description: "Versão só leitura do progresso salvo no celular.",
  robots: { index: false, follow: false },
};

export default function ViewerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
