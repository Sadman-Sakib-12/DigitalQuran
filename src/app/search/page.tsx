import SearchResults from "@/components/SearchResults";

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SearchResults />
    </div>
  );
}
