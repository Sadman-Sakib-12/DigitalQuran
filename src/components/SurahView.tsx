"use client";
import { SurahDetail } from "@/lib/quran";
import { useSettings } from "@/context/SettingsContext";
import AudioPlayer from "./AudioPlayer";

export default function SurahView({ surah }: { surah: SurahDetail }) {
  const { settings } = useSettings();

  return (
    <div className="space-y-4">
      {surah.ayahs.map((ayah) => (
        <div
          key={ayah.numberInSurah}
          id={`ayah-${ayah.numberInSurah}`}
          className="rounded-xl bg-slate-800/50 border border-slate-700/40 hover:border-slate-600/60 transition-colors p-5"
        >
          {/* Header row: ayah number + audio player */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-mono font-semibold">
              {ayah.numberInSurah}
            </div>
            <AudioPlayer
              surahNumber={surah.number}
              ayahNumber={ayah.numberInSurah}
            />
          </div>

          {/* Arabic text */}
          <p
            className="arabic-text text-slate-100 mb-4 leading-loose"
            style={{
              fontFamily: settings.arabicFont,
              fontSize: settings.arabicFontSize,
            }}
          >
            {ayah.text}
          </p>

          {/* Translation */}
          <div className="border-t border-slate-700/50 pt-4">
            <p
              className="text-slate-400 leading-relaxed"
              style={{ fontSize: settings.translationFontSize }}
            >
              {ayah.translation}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
