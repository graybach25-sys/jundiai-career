import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import { AppStoreProvider } from "@/lib/store";
import "./globals.css";

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Novo Capítulo — Jundiaí",
  description:
    "Um espaço calmo para a Andrea explorar uma mudança de carreira e encontrar trabalho em Jundiaí, SP.",
};

export const viewport: Viewport = {
  themeColor: "#faf6f1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${nunito.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full">
        <AppStoreProvider>
          <AppShell>{children}</AppShell>
        </AppStoreProvider>
      </body>
    </html>
  );
}
