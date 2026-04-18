import { fetchAllSurahs } from "@/lib/quran";
import SurahGrid from "@/components/SurahGrid";

export default async function HomePage() {
  const surahs = await fetchAllSurahs();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <p className="text-5xl arabic-text text-emerald-400 mb-3" style={{ fontFamily: "Amiri" }}>
          ﷽
        </p>
        <h1 className="text-3xl font-bold text-white mb-2">The Holy Quran</h1>
        <p className="text-slate-400">114 Surahs · 6,236 Ayahs</p>
      </div>
      <SurahGrid surahs={surahs} />
    </div>
  );
}
