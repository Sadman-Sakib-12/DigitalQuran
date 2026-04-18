"use client";
import { useSettings } from "@/context/SettingsContext";
import { ARABIC_FONTS } from "@/lib/settings";

export default function SettingsSidebar() {
  const { settings, update, sidebarOpen, setSidebarOpen } = useSettings();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-80 bg-slate-800 border-l border-slate-700 shadow-2xl transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Settings</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close settings"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-6 overflow-y-auto h-[calc(100%-73px)]">
          {/* Arabic Font */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Arabic Font</label>
            <div className="space-y-2">
              {ARABIC_FONTS.map((font) => (
                <button
                  key={font.value}
                  onClick={() => update({ arabicFont: font.value })}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-colors ${
                    settings.arabicFont === font.value
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                      : "border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <span className="text-sm">{font.label}</span>
                  <span className="text-xl arabic-text" style={{ fontFamily: font.value }}>بِسْمِ</span>
                </button>
              ))}
            </div>
          </div>

          {/* Arabic Font Size */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Arabic Font Size{" "}
              <span className="text-emerald-400 font-mono">{settings.arabicFontSize}px</span>
            </label>
            <input
              type="range" min={18} max={48} value={settings.arabicFontSize}
              onChange={(e) => update({ arabicFontSize: Number(e.target.value) })}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>18px</span><span>48px</span>
            </div>
          </div>

          {/* Translation Font Size */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Translation Font Size{" "}
              <span className="text-emerald-400 font-mono">{settings.translationFontSize}px</span>
            </label>
            <input
              type="range" min={12} max={24} value={settings.translationFontSize}
              onChange={(e) => update({ translationFontSize: Number(e.target.value) })}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>12px</span><span>24px</span>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-lg border border-slate-600 bg-slate-900/50 p-4">
            <p className="text-xs text-slate-500 mb-3">Preview</p>
            <p
              className="arabic-text text-slate-100 mb-2"
              style={{ fontFamily: settings.arabicFont, fontSize: settings.arabicFontSize }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-slate-400" style={{ fontSize: settings.translationFontSize }}>
              In the name of Allah, the Entirely Merciful, the Especially Merciful.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
