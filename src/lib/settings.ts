export interface Settings {
  arabicFont: string;
  arabicFontSize: number;
  translationFontSize: number;
}

export const DEFAULT_SETTINGS: Settings = {
  arabicFont: "Amiri",
  arabicFontSize: 28,
  translationFontSize: 16,
};

export const ARABIC_FONTS = [
  { value: "Amiri", label: "Amiri" },
  { value: "Scheherazade New", label: "Scheherazade New" },
  { value: "Noto Naskh Arabic", label: "Noto Naskh Arabic" },
  { value: "Lateef", label: "Lateef" },
];

export function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem("quran-settings");
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(s: Settings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("quran-settings", JSON.stringify(s));
}
