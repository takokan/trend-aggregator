'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchForm from '@/components/SearchForm';
import TrendCard from '@/components/TrendCard';
import FilterBar from '@/components/FilterBar';

type Result = {
  id: string;
  platform: 'YOUTUBE' | 'REDDIT' | 'TWITTER';
  title: string | null;
  content: string | null;
  author: string | null;
  publishedAt: string | null;
  url: string | null;
  engagement: {
    views: number | null;
    likes: number | null;
    comments: number | null;
    score: number | null;
  };
  summary: string | null;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
};

export default function Dashboard() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const [results, setResults] = useState<Result[]>([]);
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

// Fetch results when query changes
  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }

        const data = await response.json();
        setResults(data.results);
        setFilteredResults(data.results);
      } catch (err) {
        setError('An error occurred while fetching results. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

// Get unique platforms from results
  const platforms = [...new Set(results.map(result => result.platform))];

// Handle filter changes
  const handleFilterChange = (filters: {
    platform: string | null;
    sentiment: string | null;
    sortBy: string;
  }) => {
    let filtered = [...results];

// Filter by platform
    if (filters.platform) {
      filtered = filtered.filter(result => result.platform === filters.platform);
    }

// Filter by sentiment
    if (filters.sentiment) {
      filtered = filtered.filter(result => result.sentiment === filters.sentiment);
    }

// Sort results
    if (filters.sortBy === 'latest') {
      filtered.sort((a, b) => {
        if (!a.publishedAt) return 1;
        if (!b.publishedAt) return -1;
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
    } else if (filters.sortBy === 'engagement') {
      filtered.sort((a, b) => {
        const engagementA = getEngagementScore(a);
        const engagementB = getEngagementScore(b);
        return engagementB - engagementA;
      });
    }

    setFilteredResults(filtered);
  };

// Calculate engagement score based on platform
  const getEngagementScore = (result: Result) => {
    if (!result.engagement) return 0;

    switch (result.platform) {
      case 'YOUTUBE':
        return (result.engagement.views || 0) * 0.01 + (result.engagement.likes || 0) * 0.5;
      case 'REDDIT':
        return (result.engagement.score || 0) * 0.5 + (result.engagement.comments || 0);
      case 'TWITTER':
        return (result.engagement.likes || 0) * 0.5 + (result.engagement.comments || 0) * 2;
      default:
        return 0;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchForm />
      </div>

      {query && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Results for {query}</h1>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
              {error}
            </div>
          ) : results.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md">
              No results found for {query}. Try another search term.
            </div>
          ) : (
            <>
              <FilterBar
                platforms={platforms}
                onFilterChange={handleFilterChange}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults.map((result) => (
                  <TrendCard
                    key={result.id}
                    platform={result.platform}
                    title={result.title}
                    content={result.content}
                    author={result.author}
                    publishedAt={result.publishedAt ? new Date(result.publishedAt) : null}
                    url={result.url}
                    engagement={result.engagement}
                    summary={result.summary}
                    sentiment={result.sentiment}
                  />
                ))}
              </div>

              {filteredResults.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md mt-4">
                  No results match your filters. Try adjusting your filters.
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
