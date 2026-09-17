"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Briefcase,
  ClipboardCheck,
  FileText,
  Home,
  IdCard,
  Map,
  Menu,
  MessageCircleHeart,
  Share2,
  UserRound,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { Button } from "./ui";

const primary = [
  { href: "/", key: "nav.home", icon: Home },
  { href: "/perfil", key: "nav.profile", icon: UserRound },
  { href: "/quiz", key: "nav.quiz", icon: Map },
  { href: "/vagas", key: "nav.jobs", icon: Briefcase },
  { href: "/plano", key: "nav.plan", icon: ClipboardCheck },
];

const extra = [
  { href: "/curriculo", key: "nav.resume", icon: FileText },
  { href: "/linkedin", key: "nav.linkedin", icon: IdCard },
  { href: "/entrevista", key: "nav.interview", icon: MessageCircleHeart },
  { href: "/carta", key: "nav.letter", icon: FileText },
  { href: "/compartilhar", key: "nav.share", icon: Share2 },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { t } = useT();
  const { data, setData, ready, loadDemo, resetAll } = useStore();
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className="min-h-dvh bg-cream text-ink">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-terra focus:px-4 focus:py-2 focus:text-white"
      >
        {t("app.skip")}
      </a>

      <header className="no-print sticky top-0 z-40 border-b border-line/80 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-terra font-serif text-lg text-white">
              N
            </span>
            <span className="min-w-0">
              <span className="block truncate font-serif text-lg leading-tight">{t("app.name")}</span>
              <span className="hidden truncate text-xs text-ink-soft sm:block">{t("app.tagline")}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            {[...primary, ...extra].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium",
                  isActive(item.href) ? "bg-terra text-white" : "text-ink-soft hover:bg-cream-deep hover:text-ink",
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-line bg-paper p-0.5" role="group" aria-label={t("lang.switchTo")}>
              {(["pt", "en"] as const).map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setData((d) => ({ ...d, locale: loc }))}
                  className={cn(
                    "min-h-9 rounded-full px-3 text-xs font-bold",
                    data.locale === loc ? "bg-ink text-cream" : "text-ink-soft",
                  )}
                >
                  {t(`lang.${loc}`)}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="rounded-full p-2 text-ink lg:hidden"
              aria-expanded={moreOpen}
              aria-label={t("nav.more")}
              onClick={() => setMoreOpen((v) => !v)}
            >
              {moreOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {data.demoLoaded ? (
          <div className="border-t border-gold/30 bg-gold/20 px-4 py-2 text-center text-sm text-ink">
            {t("demo.banner")}{" "}
            <button type="button" className="font-semibold underline" onClick={resetAll}>
              {t("common.clearDemo")}
            </button>
          </div>
        ) : null}
      </header>

      {moreOpen ? (
        <div className="no-print border-b border-line bg-paper px-4 py-3 lg:hidden">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2">
            {[...primary, ...extra].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMoreOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-2xl px-3 py-3 text-sm font-medium",
                  isActive(item.href) ? "bg-terra text-white" : "bg-cream",
                )}
              >
                <item.icon size={18} />
                {t(item.key)}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <main id="conteudo" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-28 sm:py-10 lg:pb-12">
        {!ready ? (
          <div className="animate-pulse rounded-3xl bg-paper p-10 text-ink-soft">…</div>
        ) : (
          children
        )}
      </main>

      <nav
        className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-2 py-2 backdrop-blur lg:hidden"
        aria-label="Atalhos"
      >
        <ul className="mx-auto flex max-w-6xl items-stretch justify-between">
          {primary.map((item) => (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[11px] font-medium",
                  isActive(item.href) ? "text-terra" : "text-ink-soft",
                )}
              >
                <item.icon size={20} />
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {!data.demoLoaded && ready ? (
        <div className="no-print pointer-events-none fixed bottom-20 right-4 z-30 lg:bottom-6">
          <Button className="pointer-events-auto shadow-lift" variant="secondary" onClick={loadDemo}>
            {t("common.loadDemo")}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
