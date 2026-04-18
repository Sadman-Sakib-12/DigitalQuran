"use client";
import { useState, useRef, useEffect } from "react";

interface Props {
  surahNumber: number;
  ayahNumber: number;
}

const RECITERS = [
  { id: "Abdul_Basit_Murattal_64kbps", label: "Abdul Basit" },
  { id: "Alafasy_64kbps", label: "Mishary Alafasy" },
  { id: "Husary_64kbps", label: "Husary" },
];

function getAudioUrl(reciter: string, surah: number, ayah: number) {
  const s = String(surah).padStart(3, "0");
  const a = String(ayah).padStart(3, "0");
  return `https://everyayah.com/data/${reciter}/${s}${a}.mp3`;
}

export default function AudioPlayer({ surahNumber, ayahNumber }: Props) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reciter, setReciter] = useState(RECITERS[0].id);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => { return () => { audioRef.current?.pause(); }; }, []);

  function toggle() {
    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;

    if (playing) { audio.pause(); setPlaying(false); return; }

    setLoading(true);
    audio.src = getAudioUrl(reciter, surahNumber, ayahNumber);
    audio.oncanplay = () => setLoading(false);
    audio.onended = () => setPlaying(false);
    audio.onerror = () => { setLoading(false); setPlaying(false); };
    audio.play()
      .then(() => setPlaying(true))
      .catch(() => { setLoading(false); setPlaying(false); });
  }

  function changeReciter(newReciter: string) {
    audioRef.current?.pause();
    audioRef.current = null;
    setPlaying(false);
    setLoading(false);
    setReciter(newReciter);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggle}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          playing
            ? "bg-emerald-500 text-white"
            : "bg-slate-700 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400"
        }`}
        aria-label={playing ? "Pause" : "Play"}
      >
        {loading ? (
          <div className="w-3 h-3 border border-emerald-400 border-t-transparent rounded-full animate-spin" />
        ) : playing ? (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {!playing && (
        <select
          value={reciter}
          onChange={(e) => changeReciter(e.target.value)}
          className="text-xs bg-slate-700 border border-slate-600 text-slate-300 rounded px-1.5 py-0.5 focus:outline-none focus:border-emerald-500"
        >
          {RECITERS.map((r) => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </select>
      )}

      {playing && (
        <span className="text-xs text-emerald-400 animate-pulse">Playing...</span>
      )}
    </div>
  );
}
