"use client";
import Link from "next/link";
import { Surah } from "@/lib/quran";

const REVELATION_COLORS: Record<string, string> = {
  Meccan: "text-amber-400 bg-amber-400/10",
  Medinan: "text-sky-400 bg-sky-400/10",
};

export default function SurahGrid({ surahs }: { surahs: Surah[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {surahs.map((surah) => (
        <Link
          key={surah.number}
          href={`/surah/${surah.number}`}
          className="group flex items-center gap-3 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800 transition-all duration-200"
        >
          <div className="shrink-0 w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono text-sm font-semibold">
            {surah.number}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-white text-sm truncate group-hover:text-emerald-400 transition-colors">
                {surah.englishName}
              </p>
              <p className="arabic-text text-emerald-300 text-base shrink-0" style={{ fontFamily: "Amiri" }}>
                {surah.name}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-slate-400 truncate">{surah.englishNameTranslation}</p>
              <span className={`text-xs px-1.5 py-0.5 rounded font-medium shrink-0 ${REVELATION_COLORS[surah.revelationType] ?? "text-slate-400"}`}>
                {surah.revelationType}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{surah.numberOfAyahs} ayahs</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
