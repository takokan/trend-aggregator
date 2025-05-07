'use client';

import { useState } from 'react';

interface SearchResult {
  platform: string;
  originalId: string;
  title?: string;
  content: string;
  author: string;
  publishedAt: Date;
  url: string;
  engagement: {
    views?: number;
    likes?: number;
    comments?: number;
    retweets?: number;
  };
  summary: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log('Submitting search query:', query);

    try {
      console.log('Making API request to /api/search');
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.error || 'Failed to fetch results');
      }

      const data = await response.json();
      console.log('Received data:', data);
      setResults(data.results);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'POSITIVE':
        return 'text-green-600';
      case 'NEGATIVE':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Social Media</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col space-y-4 max-w-2xl">
          <div>
            <label htmlFor="query" className="block text-sm font-medium mb-2">
              Search Query
            </label>
            <input
              type="text"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your search query"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <div className="text-gray-600">Searching...</div>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
          {results.map((result, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
                    {result.platform}
                  </span>
                  <h3 className="text-xl font-semibold mb-2">
                    {result.title || result.content.substring(0, 100)}...
                  </h3>
                </div>
                <span className={`font-medium ${getSentimentColor(result.sentiment)}`}>
                  {result.sentiment}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{result.summary}</p>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <div>
                  <span className="font-medium">Author:</span> {result.author}
                </div>
                <div className="flex space-x-4">
                  {result.engagement.views && (
                    <span>👁️ {result.engagement.views} views</span>
                  )}
                  {result.engagement.likes && (
                    <span>❤️ {result.engagement.likes} likes</span>
                  )}
                  {result.engagement.comments && (
                    <span>💬 {result.engagement.comments} comments</span>
                  )}
                  {result.engagement.retweets && (
                    <span>🔄 {result.engagement.retweets} retweets</span>
                  )}
                </div>
              </div>

              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-500 hover:text-blue-600"
              >
                View Original →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 