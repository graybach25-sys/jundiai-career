"use client";

import { useState, useSyncExternalStore } from "react";
import { CopyButton } from "@/components/CopyButton";
import { Button, Card, PageHeader } from "@/components/ui";
import { useT } from "@/lib/i18n";
import { buildShareSummary } from "@/lib/share";
import { copyText, publishSnapshot, readShareMeta, sharePageUrl } from "@/lib/share-client";
import { formatShareCode } from "@/lib/share-code";
import { useStore } from "@/lib/store";

type Notice = "created" | "updated" | "copied" | "fail" | "forbidden" | null;

function subscribeNoop() {
  return () => {};
}

function storedCode() {
  return readShareMeta()?.code ?? null;
}

function clientOrigin() {
  return window.location.origin;
}

function clientCanShareLink() {
  return typeof navigator.share === "function";
}

export default function SharePage() {
  const { t, locale } = useT();
  const { data } = useStore();
  const summary = buildShareSummary(data, locale);
  const savedCode = useSyncExternalStore(subscribeNoop, storedCode, () => null);
  const origin = useSyncExternalStore(subscribeNoop, clientOrigin, () => "");
  const canNativeShare = useSyncExternalStore(subscribeNoop, clientCanShareLink, () => false);
  const [freshCode, setFreshCode] = useState<string | null>(null);
  const [busy, setBusy] = useState<"create" | "update" | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const code = freshCode || savedCode;

  const url = code ? `${origin || ""}/ver/${code}` : "";

  async function publish(forceNew = false) {
    setBusy(forceNew || !code ? "create" : "update");
    setNotice(null);
    try {
      const result = await publishSnapshot(data, { forceNew });
      setFreshCode(result.code);
      setNotice(result.created ? "created" : "updated");
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      setNotice(message === "forbidden" ? "forbidden" : "fail");
    } finally {
      setBusy(null);
    }
  }

  async function onCopy() {
    const copied = await copyText(sharePageUrl(code || ""));
    setNotice(copied ? "copied" : "fail");
  }

  async function onSend() {
    const link = sharePageUrl(code || "");
    if (typeof navigator.share !== "function") {
      await onCopy();
      return;
    }
    try {
      await navigator.share({ title: "Novo Capítulo", text: t("share.created"), url: link });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setNotice("fail");
    }
  }

  const noticeText =
    notice === "created"
      ? t("share.created")
      : notice === "updated"
        ? t("share.updated")
        : notice === "copied"
          ? t("common.copied")
          : notice === "forbidden"
            ? t("share.forbidden")
            : notice === "fail"
              ? t("share.fail")
              : "";

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <PageHeader title={t("share.title")} lead={t("share.lead")} />

      {!code ? (
        <Button type="button" size="lg" onClick={() => publish(false)} disabled={busy !== null}>
          {busy === "create" ? t("share.creating") : t("share.create")}
        </Button>
      ) : (
        <div className="space-y-3">
          <Button type="button" size="lg" onClick={onCopy}>
            {t("share.copyLink")}
          </Button>
          {canNativeShare ? (
            <Button type="button" size="lg" variant="secondary" onClick={onSend}>
              {t("share.sendLink")}
            </Button>
          ) : null}
          <Button type="button" size="lg" variant="ghost" onClick={() => publish(false)} disabled={busy !== null}>
            {busy === "update" ? t("share.updating") : t("share.update")}
          </Button>
        </div>
      )}

      <p role="status" className={notice === "fail" || notice === "forbidden" ? "text-center text-base font-medium text-terra-deep" : "text-center text-base font-medium text-sage"}>
        {noticeText}
      </p>

      {code ? (
        <Card>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-terra">{t("share.linkLabel")}</p>
          <p className="mt-2 font-serif text-3xl tracking-wide">{formatShareCode(code)}</p>
          <label className="mt-4 block text-sm font-medium" htmlFor="link-do-gray">
            {t("share.linkLabel")}
          </label>
          <input
            id="link-do-gray"
            readOnly
            value={url || `/ver/${code}`}
            onFocus={(event) => event.currentTarget.select()}
            className="mt-2 w-full rounded-2xl border border-line bg-cream px-3 py-4 text-base text-ink"
          />
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t("share.note")}</p>
        </Card>
      ) : (
        <p className="text-center text-sm leading-relaxed text-ink-soft">{t("share.note")}</p>
      )}

      {notice === "forbidden" ? (
        <Button type="button" size="lg" onClick={() => publish(true)} disabled={busy !== null}>
          {t("share.newLink")}
        </Button>
      ) : null}

      <details className="rounded-3xl border border-line bg-paper p-5">
        <summary className="cursor-pointer text-base font-semibold">{t("share.textToggle")}</summary>
        <div className="mt-4 flex justify-end">
          <CopyButton text={summary} label={t("share.copy")} />
        </div>
        <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink">{summary}</pre>
      </details>
    </div>
  );
}
