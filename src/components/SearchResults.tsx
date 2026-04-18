"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

interface SearchResult {
  surahNumber: number;
  surahEnglishName: string;
  numberInSurah: number;
  translation: string;
  ayahNumber: number;
}

function Results() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") ?? "";
  const { settings } = useSettings();

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState("");
  const [inputVal, setInputVal] = useState(query);

  useEffect(() => {
    setInputVal(query);
    if (!query.trim()) return;
    setLoading(true);
    setSearched(query);

    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((json) => setResults(json.results ?? []))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [query]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = inputVal.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  function highlight(text: string, q: string) {
    if (!q) return text;
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-emerald-500/30 text-emerald-300 rounded px-0.5">{part}</mark>
      ) : part
    );
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="search"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Search ayahs by translation..."
          className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
        <button type="submit" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors">
          Search
        </button>
      </form>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!loading && searched && (
        <p className="text-slate-400 text-sm mb-4">
          {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{searched}&quot;
        </p>
      )}

      {!loading && results.length === 0 && searched && (
        <div className="text-center py-16 text-slate-500">
          <p className="text-lg">No results found</p>
          <p className="text-sm mt-1">Try different keywords</p>
        </div>
      )}

      <div className="space-y-4">
        {results.map((r) => (
          <Link
            key={r.ayahNumber}
            href={`/surah/${r.surahNumber}#ayah-${r.numberInSurah}`}
            className="block rounded-xl bg-slate-800/50 border border-slate-700/40 hover:border-emerald-500/40 transition-colors p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                {r.surahEnglishName} · {r.numberInSurah}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed" style={{ fontSize: settings.translationFontSize }}>
              {highlight(r.translation, searched)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <Results />
    </Suspense>
  );
}
