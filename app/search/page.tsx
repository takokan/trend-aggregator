import { Suspense } from "react";
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Social Media</h1>
      <SearchForm />
      <Suspense fallback={<div>Loading results...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
} 