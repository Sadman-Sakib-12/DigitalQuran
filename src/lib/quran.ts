import { connectDB } from "./mongodb";
import { SurahModel, ISurah, IAyah } from "@/models/Surah";

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translation: string;
}

export interface SurahDetail extends Surah {
  ayahs: Ayah[];
}

export interface SearchResult {
  surahNumber: number;
  surahEnglishName: string;
  numberInSurah: number;
  translation: string;
  ayahNumber: number;
}

function toSurah(doc: ISurah): Surah {
  return {
    number: doc.number,
    name: doc.name,
    englishName: doc.englishName,
    englishNameTranslation: doc.englishNameTranslation,
    numberOfAyahs: doc.numberOfAyahs,
    revelationType: doc.revelationType,
  };
}

export async function fetchAllSurahs(): Promise<Surah[]> {
  await connectDB();
  const docs = await SurahModel.find({}, { ayahs: 0 }).sort({ number: 1 }).lean();
  return docs.map(toSurah);
}

export async function fetchSurah(number: number): Promise<SurahDetail> {
  await connectDB();
  const doc = await SurahModel.findOne({ number }).lean();
  if (!doc) throw new Error(`Surah ${number} not found`);
  return {
    ...toSurah(doc),
    ayahs: doc.ayahs.map((a: IAyah) => ({
      number: a.number,
      numberInSurah: a.numberInSurah,
      text: a.text,
      translation: a.translation,
    })),
  };
}

export async function searchAyahs(query: string): Promise<SearchResult[]> {
  await connectDB();

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escaped, "i");

  const docs = await SurahModel.find(
    {
      $or: [
        { "ayahs.translation": { $regex: escaped, $options: "i" } },
        { "ayahs.text": { $regex: escaped, $options: "i" } },
        { englishName: { $regex: escaped, $options: "i" } },
      ],
    },
    { number: 1, englishName: 1, name: 1, ayahs: 1 }
  )
    .limit(30)
    .lean();

  const results: SearchResult[] = [];

  for (const doc of docs) {
    if (regex.test(doc.englishName) || regex.test(doc.name)) {
      results.push({
        surahNumber: doc.number,
        surahEnglishName: doc.englishName,
        numberInSurah: 1,
        translation: `Surah ${doc.englishName} — ${doc.ayahs[0]?.translation || ""}`,
        ayahNumber: doc.ayahs[0]?.number ?? 0,
      });
      continue;
    }
    for (const ayah of doc.ayahs) {
      if (regex.test(ayah.translation) || regex.test(ayah.text)) {
        results.push({
          surahNumber: doc.number,
          surahEnglishName: doc.englishName,
          numberInSurah: ayah.numberInSurah,
          translation: ayah.translation || ayah.text,
          ayahNumber: ayah.number,
        });
      }
    }
  }
  return results;
}
