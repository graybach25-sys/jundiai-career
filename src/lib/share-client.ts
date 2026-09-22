import { STORAGE_KEY } from "./storage";
import type { AppData } from "./types";

export const SHARE_META_KEY = "novo-capitulo-share-v1";

export type ShareMeta = {
  code: string;
  writeKey: string;
};

export type PublishResult = {
  code: string;
  writeKey: string;
  updatedAt: string;
  path: string;
  created: boolean;
};

export function readShareMeta(): ShareMeta | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SHARE_META_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ShareMeta>;
    if (!parsed.code || !parsed.writeKey) return null;
    return { code: parsed.code, writeKey: parsed.writeKey };
  } catch {
    return null;
  }
}

export async function publishSnapshot(data: AppData, opts?: { forceNew?: boolean }): Promise<PublishResult> {
  const appBefore = window.localStorage.getItem(STORAGE_KEY);
  const meta = opts?.forceNew ? null : readShareMeta();
  const response = await fetch("/api/share", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      code: meta?.code,
      writeKey: meta?.writeKey,
      forceNew: opts?.forceNew === true,
    }),
  });
  const payload = (await response.json().catch(() => null)) as PublishResult & { error?: string } | null;
  if (!response.ok || !payload?.code || !payload.writeKey) {
    const error = new Error(payload?.error || "share_failed");
    throw error;
  }
  window.localStorage.setItem(SHARE_META_KEY, JSON.stringify({ code: payload.code, writeKey: payload.writeKey }));
  if (window.localStorage.getItem(STORAGE_KEY) !== appBefore) {
    if (appBefore === null) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, appBefore);
  }
  return payload;
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

export function sharePageUrl(code: string) {
  if (typeof window === "undefined") return `/ver/${code}`;
  return `${window.location.origin}/ver/${code}`;
}
