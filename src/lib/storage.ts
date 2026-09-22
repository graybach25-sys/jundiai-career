import { DEFAULT_DATA } from "./defaults";
import { normalizeData } from "./normalize";
import type { AppData } from "./types";

export const STORAGE_KEY = "novo-capitulo-jundiai-v1";

export function loadData(): AppData {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_DATA);
    return normalizeData(JSON.parse(raw));
  } catch {
    return structuredClone(DEFAULT_DATA);
  }
}

export function saveData(data: AppData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearData() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
