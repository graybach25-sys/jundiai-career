"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "./ui";
import { useT } from "@/lib/i18n";

export function CopyButton({ text, label }: { text: string; label?: string }) {
  const { t } = useT();
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Button type="button" variant="ghost" onClick={onCopy}>
      {copied ? <Check size={16} /> : null}
      {copied ? t("common.copied") : label || t("common.copy")}
    </Button>
  );
}
