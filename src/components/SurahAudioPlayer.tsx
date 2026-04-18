"use client";
import { useState, useRef, useEffect } from "react";

interface Props {
  surahNumber: number;
  totalAyahs: number;
}

const RECITERS = [
  { id: "Abdul_Basit_Murattal_64kbps", label: "Abdul Basit" },
  { id: "Alafasy_64kbps", label: "Mishary Alafasy" },
  { id: "Husary_64kbps", label: "Husary" },
];

function getUrl(reciter: string, surah: number, ayah: number) {
  return `https://everyayah.com/data/${reciter}/${String(surah).padStart(3, "0")}${String(ayah).padStart(3, "0")}.mp3`;
}

export default function SurahAudioPlayer({ surahNumber, totalAyahs }: Props) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentAyah, setCurrentAyah] = useState(1);
  const [reciter, setReciter] = useState(RECITERS[0].id);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRef = useRef(1);
  const playingRef = useRef(false);

  useEffect(() => { return () => { audioRef.current?.pause(); }; }, []);

  function playAyah(ayah: number) {
    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;
    ayahRef.current = ayah;
    setCurrentAyah(ayah);
    setLoading(true);
    audio.src = getUrl(reciter, surahNumber, ayah);
    audio.oncanplay = () => setLoading(false);
    audio.onended = () => {
      if (!playingRef.current) return;
      const next = ayahRef.current + 1;
      if (next <= totalAyahs) {
        playAyah(next);
      } else {
        setPlaying(false);
        playingRef.current = false;
        setCurrentAyah(1);
      }
    };
    audio.onerror = () => { setLoading(false); setPlaying(false); playingRef.current = false; };
    audio.play().catch(() => { setLoading(false); setPlaying(false); playingRef.current = false; });
  }

  function handlePlay() { playingRef.current = true; setPlaying(true); playAyah(1); }

  function handlePause() { audioRef.current?.pause(); setPlaying(false); playingRef.current = false; }

  function handleStop() {
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.src = "";
    setPlaying(false);
    playingRef.current = false;
    setCurrentAyah(1);
    ayahRef.current = 1;
  }

  function changeReciter(r: string) { handleStop(); setReciter(r); }

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-slate-800/60 border border-slate-700/40 mb-6">
      <div className="flex items-center gap-2">
        {!playing ? (
          <button onClick={handlePlay} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            Play Surah
          </button>
        ) : (
          <>
            <button onClick={handlePause} className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm font-medium transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
              Pause
            </button>
            <button onClick={handleStop} className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h12v12H6z" /></svg>
              Stop
            </button>
          </>
        )}
      </div>

      <select
        value={reciter}
        onChange={(e) => changeReciter(e.target.value)}
        className="text-sm bg-slate-700 border border-slate-600 text-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
      >
        {RECITERS.map((r) => (
          <option key={r.id} value={r.id}>{r.label}</option>
        ))}
      </select>

      {playing && (
        <div className="flex items-center gap-2 text-sm text-emerald-400">
          {loading
            ? <div className="w-3 h-3 border border-emerald-400 border-t-transparent rounded-full animate-spin" />
            : <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          }
          <span>Ayah {currentAyah} / {totalAyahs}</span>
        </div>
      )}
    </div>
  );
}
