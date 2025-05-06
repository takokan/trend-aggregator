"use client";

import { useEffect, useState } from "react";
import { Result } from "@prisma/client";

export default function SearchResults() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("/api/results");
        if (!response.ok) throw new Error("Failed to fetch results");
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return <div>Loading results...</div>;
  }

  if (results.length === 0) {
    return <div>No results found. Try a different search query.</div>;
  }

  return (
    <div className="space-y-6">
      {results.map((result) => (
        <div
          key={result.id}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">{result.title}</h3>
              <p className="text-gray-600 mb-4">{result.content}</p>
              {result.summary && (
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <p className="text-sm text-gray-700">{result.summary}</p>
                </div>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Platform: {result.platform}</span>
                <span>Author: {result.author}</span>
                <span>
                  Published:{" "}
                  {new Date(result.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm ${
                result.sentiment === "POSITIVE"
                  ? "bg-green-100 text-green-800"
                  : result.sentiment === "NEGATIVE"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {result.sentiment}
            </div>
          </div>
          {result.url && (
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-blue-500 hover:text-blue-600"
            >
              View Original
            </a>
          )}
        </div>
      ))}
    </div>
  );
} 