"use client";

import { useState, useSyncExternalStore } from "react";
import { defaultObjective } from "@/lib/content";
import { isProfileStarted } from "@/lib/defaults";
import { useT } from "@/lib/i18n";
import { topDirection } from "@/lib/share";
import { useStore } from "@/lib/store";
import type { AppData } from "@/lib/types";
import { Button } from "./ui";

function subscribeNoop() {
  return () => {};
}

function clientCanSharePdf() {
  if (typeof navigator.canShare !== "function") return false;
  const file = new File([new Blob(["%PDF-1.3"])], "curriculo.pdf", { type: "application/pdf" });
  return navigator.canShare({ files: [file] });
}

function useCanSharePdf() {
  return useSyncExternalStore(subscribeNoop, clientCanSharePdf, () => false);
}

export function ResumeActions({ source, compact = false }: { source?: AppData; compact?: boolean }) {
  const { t, locale } = useT();
  const { data: stored } = useStore();
  const data = source ?? stored;
  const canShare = useCanSharePdf();
  const [status, setStatus] = useState<"idle" | "working" | "saved" | "shared" | "error">("idle");
  const started = isProfileStarted(data.profile);

  async function buildFile() {
    const pdf = await import("@/lib/resume-pdf");
    const objective = data.resume.objective || defaultObjective(data.profile, topDirection(data), locale);
    const blob = await pdf.buildResumePdfBlob({
      profile: data.profile,
      objective,
      template: data.resume.template,
      labels: {
        objective: t("resume.section.objective"),
        experience: t("resume.section.experience"),
        education: t("resume.section.education"),
        courses: t("resume.section.courses"),
        languages: t("resume.section.languages"),
        skills: t("resume.section.skills"),
      },
    });
    return { pdf, blob, filename: pdf.resumeFilename(data.profile.name) };
  }

  async function onSave() {
    setStatus("working");
    try {
      const { pdf, blob, filename } = await buildFile();
      pdf.triggerDownload(blob, filename);
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  async function onSend() {
    setStatus("working");
    try {
      const { pdf, blob, filename } = await buildFile();
      const result = await pdf.sharePdfFile(blob, filename, t("resume.savePdf"));
      if (result === "cancelled") {
        setStatus("idle");
        return;
      }
      if (result === "unsupported") {
        pdf.triggerDownload(blob, filename);
        setStatus("saved");
        return;
      }
      setStatus("shared");
    } catch {
      setStatus("error");
    }
  }

  const message = status === "saved" ? t("resume.saved") : status === "shared" ? t("resume.shared") : status === "error" ? t("resume.fail") : "";

  return (
    <div className="no-print space-y-3">
      <Button type="button" size="lg" onClick={onSave} disabled={!started || status === "working"}>
        {status === "working" ? t("resume.saving") : t("resume.savePdf")}
      </Button>
      {!compact && canShare ? (
        <Button type="button" size="lg" variant="secondary" onClick={onSend} disabled={!started || status === "working"}>
          {t("resume.sendPdf")}
        </Button>
      ) : null}
      <p role="status" className={status === "error" ? "text-center text-base font-medium text-terra-deep" : "text-center text-base font-medium text-sage"}>
        {message}
      </p>
    </div>
  );
}
