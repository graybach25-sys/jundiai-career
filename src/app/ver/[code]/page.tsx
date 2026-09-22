"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SnapshotView } from "@/components/SnapshotView";
import { useT } from "@/lib/i18n";
import { isShareCode, normalizeCode } from "@/lib/share-code";
import type { AppData } from "@/lib/types";

type ViewState =
  | { status: "loading" }
  | { status: "error"; code: string }
  | { status: "ready"; code: string; data: AppData; updatedAt: string };

export default function SharedViewPage() {
  const params = useParams<{ code: string }>();
  const raw = typeof params.code === "string" ? params.code : "";
  const code = normalizeCode(raw);
  const valid = isShareCode(code);
  const { t } = useT();
  const [state, setState] = useState<ViewState>({ status: "loading" });

  useEffect(() => {
    if (!valid) return;
    let cancel = false;
    fetch(`/api/share/${code}`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("missing");
        return (await response.json()) as { data: AppData; updatedAt: string };
      })
      .then((payload) => {
        if (!cancel) setState({ status: "ready", code, data: payload.data, updatedAt: payload.updatedAt });
      })
      .catch(() => {
        if (!cancel) setState({ status: "error", code });
      });
    return () => {
      cancel = true;
    };
  }, [code, valid]);

  if (!valid || (state.status === "error" && state.code === code)) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-terra">Para o Gray</p>
        <h1 className="mt-3 font-serif text-4xl">Novo Capítulo</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t("view.missing")}</p>
        <p className="mt-3 text-base text-ink-soft">For Gray — this link did not open her saved progress. Ask her to tap Atualizar link.</p>
      </div>
    );
  }

  if (state.status !== "ready" || state.code !== code) {
    return <p className="py-16 text-center font-serif text-3xl text-ink-soft">{t("view.loading")}</p>;
  }

  return <SnapshotView data={state.data} updatedAt={state.updatedAt} />;
}
