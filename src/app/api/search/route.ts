import { NextRequest, NextResponse } from "next/server";
import { searchAyahs } from "@/lib/quran";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q) return NextResponse.json({ results: [] });

  try {
    const results = await searchAyahs(q);
    return NextResponse.json({ results });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ results: [], error: "Search failed" }, { status: 500 });
  }
}
