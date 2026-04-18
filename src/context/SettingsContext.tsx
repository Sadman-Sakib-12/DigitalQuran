"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Settings, DEFAULT_SETTINGS, loadSettings, saveSettings } from "@/lib/settings";

interface SettingsCtx {
  settings: Settings;
  update: (partial: Partial<Settings>) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

const Ctx = createContext<SettingsCtx>({
  settings: DEFAULT_SETTINGS,
  update: () => {},
  sidebarOpen: false,
  setSidebarOpen: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  function update(partial: Partial<Settings>) {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      saveSettings(next);
      return next;
    });
  }

  return (
    <Ctx.Provider value={{ settings, update, sidebarOpen, setSidebarOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export const useSettings = () => useContext(Ctx);
