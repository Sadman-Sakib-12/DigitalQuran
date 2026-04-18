import mongoose, { Schema, model, models } from "mongoose";

export interface IAyah {
  number: number;
  numberInSurah: number;
  text: string;
  translation: string;
}

export interface ISurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: IAyah[];
}

const AyahSchema = new Schema<IAyah>(
  { number: Number, numberInSurah: Number, text: String, translation: String },
  { _id: false }
);

const SurahSchema = new Schema<ISurah>(
  {
    number: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    englishName: { type: String, required: true },
    englishNameTranslation: { type: String, required: true },
    numberOfAyahs: { type: Number, required: true },
    revelationType: { type: String, required: true },
    ayahs: [AyahSchema],
  },
  { bufferCommands: false }
);

export const SurahModel =
  (models.Surah as mongoose.Model<ISurah>) ||
  model<ISurah>("Surah", SurahSchema);
