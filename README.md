# Digital Quran — Web Application

  <div><img src="https://i.ibb.co.com/xSZLFZZ9/Annotation-2026-04-19-031444.jpg" alt="" /></div>

A full-featured Quran web application built with Next.js, Tailwind CSS, and MongoDB Atlas.

---

## Live Demo

🔗 [Live Demo](https://your-vercel-url.vercel.app)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router, SSR) |
| Styling | Tailwind CSS v4 |
| Database | MongoDB Atlas (Mongoose) |
| Data Source | [semarketir/quranjson](https://github.com/semarketir/quranjson) |
| Audio | everyayah.com CDN |
| Deployment | Vercel |

---

## Features

### Surah List Page
- Displays all 114 Surahs
- Shows Arabic name, English name, meaning, revelation type, ayah count
- Responsive grid layout (1 → 2 → 3 → 4 columns)

### Ayat Page
- Full Arabic text for every Ayah
- English translation (from semarketir/quranjson)
- Bismillah shown before each Surah (except Al-Fatiha and At-Tawbah)
- Ayah number badge for each verse

### Audio Player
- Play full Surah — Ayah by Ayah automatically
- Individual Ayah play button
- 3 reciters: Abdul Basit, Mishary Alafasy, Husary
- Live Ayah counter while playing

### Search Functionality
- Search Ayahs by English translation text
- Powered by MongoDB text index
- Keyword highlighting in results
- Click result → jumps to that Ayah in the Surah

### Settings Panel (Sidebar)
- Arabic Font Selection — 4 options:
  - Amiri
  - Scheherazade New
  - Noto Naskh Arabic
  - Lateef
- Arabic Font Size adjustment (18px – 48px)
- Translation Font Size adjustment (12px – 24px)
- Live preview in sidebar
- All settings persist via **localStorage**

---

## Database

Quran data is sourced from **[semarketir/quranjson](https://github.com/semarketir/quranjson)** on GitHub:
- Arabic text from `source/surah/surah_N.json`
- English translation from `source/translation/en/en_translation_N.json`
- Surah metadata from `source/surah.json`

All 114 Surahs with 6,236 Ayahs are stored in **MongoDB Atlas** with a text index on translations for fast search.

---

## Project Structure

```
quran-app/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx                  ← Surah List
│   │   ├── search/page.tsx           ← Search Page
│   │   ├── surah/[id]/page.tsx       ← Ayat Page
│   │   └── api/search/route.ts       ← Search API (MongoDB)
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SearchResults.tsx
│   │   ├── SettingsSidebar.tsx
│   │   ├── SurahGrid.tsx
│   │   ├── SurahView.tsx
│   │   ├── AudioPlayer.tsx           ← Per-ayah audio
│   │   └── SurahAudioPlayer.tsx      ← Full surah audio
│   ├── context/
│   │   └── SettingsContext.tsx       ← localStorage settings
│   ├── lib/
│   │   ├── mongodb.ts                ← DB connection
│   │   ├── quran.ts                  ← Data fetching
│   │   └── settings.ts
│   └── models/
│       └── Surah.ts                  ← Mongoose model
├── .env.local                        ← MONGODB_URI
├── next.config.js
└── package.json
```

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/quran-app.git
cd quran-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create `.env.local`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/DigitalQuran
```

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add environment variable:
   - `MONGODB_URI` = your MongoDB Atlas connection string
4. Deploy

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
