import { fetchSurah } from "@/lib/quran";
import SurahView from "@/components/SurahView";
import SurahAudioPlayer from "@/components/SurahAudioPlayer";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const surah = await fetchSurah(Number(id));
  return { title: `${surah.englishName} (${surah.name}) - Digital Quran` };
}

export default async function SurahPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const surah = await fetchSurah(Number(id));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-6 text-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All Surahs
      </Link>

      <div className="text-center mb-8 p-6 rounded-2xl bg-gradient-to-b from-emerald-900/30 to-slate-800/30 border border-emerald-700/20">
        <p className="text-4xl arabic-text text-emerald-300 mb-2" style={{ fontFamily: "Amiri" }}>
          {surah.name}
        </p>
        <h1 className="text-2xl font-bold text-white">{surah.englishName}</h1>
        <p className="text-slate-400 mt-1">{surah.englishNameTranslation}</p>
        <div className="flex items-center justify-center gap-4 mt-3 text-sm text-slate-500">
          <span>Surah {surah.number}</span>
          <span>·</span>
          <span>{surah.numberOfAyahs} Ayahs</span>
          <span>·</span>
          <span>{surah.revelationType}</span>
        </div>
      </div>

      {surah.number !== 1 && surah.number !== 9 && (
        <p className="text-center text-3xl arabic-text text-slate-300 mb-8" style={{ fontFamily: "Amiri" }}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      )}

      {/* Full Surah audio player */}
      <SurahAudioPlayer surahNumber={surah.number} totalAyahs={surah.numberOfAyahs} />

      <SurahView surah={surah} />
    </div>
  );
}
