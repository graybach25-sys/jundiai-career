"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { buildDemoData } from "./demo";
import { DEFAULT_DATA } from "./defaults";
import { I18nProvider } from "./i18n";
import { clearData, saveData, loadData } from "./storage";
import type { AppData } from "./types";

type Store = {
  data: AppData;
  ready: boolean;
  setData: (updater: (prev: AppData) => AppData) => void;
  loadDemo: () => void;
  resetAll: () => void;
};

const StoreContext = createContext<Store | null>(null);

let memory: AppData = structuredClone(DEFAULT_DATA);
let didLoad = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function snapshot(): AppData {
  if (!didLoad) {
    memory = loadData();
    didLoad = true;
  }
  return memory;
}

function serverSnapshot(): AppData {
  return DEFAULT_DATA;
}

function clientReady(): boolean {
  return true;
}

function serverReady(): boolean {
  return false;
}

function write(next: AppData) {
  memory = next;
  saveData(next);
  emit();
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const data = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);

  const setData = useCallback((updater: (prev: AppData) => AppData) => {
    write(updater(snapshot()));
  }, []);

  const loadDemo = useCallback(() => {
    const demo = buildDemoData();
    demo.locale = snapshot().locale;
    write(demo);
  }, []);

  const resetAll = useCallback(() => {
    const locale = snapshot().locale;
    clearData();
    const next = structuredClone(DEFAULT_DATA);
    next.locale = locale;
    write(next);
  }, []);

  const store = useMemo(
    () => ({ data, ready, setData, loadDemo, resetAll }),
    [data, ready, setData, loadDemo, resetAll],
  );

  return (
    <StoreContext.Provider value={store}>
      <I18nProvider locale={data.locale}>{children}</I18nProvider>
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within AppStoreProvider");
  return ctx;
}
