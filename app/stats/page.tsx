'use client';

import { useState } from 'react';

interface StatsResponse {
  platform: string;
  query: string;
  stats: {
    totalResults: number;
    averageEngagement: number;
    engagementBreakdown: {
      views: number;
      likes: number;
      retweets: number;
      comments: number;
      replies: number;
      quotes: number;
    };
    topAuthors: Array<{
      author: string;
      count: number;
    }>;
  };
}

export default function StatsPage() {
  const [platform, setPlatform] = useState<'youtube' | 'twitter'>('youtube');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<StatsResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/stats?platform=${platform}&query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Platform Statistics</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col space-y-4 max-w-md">
          <div>
            <label htmlFor="platform" className="block text-sm font-medium mb-2">
              Platform
            </label>
            <select
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value as 'youtube' | 'twitter')}
              className="w-full p-2 border rounded-md"
            >
              <option value="youtube">YouTube</option>
              <option value="twitter">Twitter</option>
            </select>
          </div>

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
            {loading ? 'Loading...' : 'Get Stats'}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {stats && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Results for {stats.platform} - "{stats.query}"
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Overview</h3>
                <p>Total Results: {stats.stats.totalResults}</p>
                <p>Average Engagement: {Math.round(stats.stats.averageEngagement)}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Engagement Breakdown</h3>
                <div className="space-y-2">
                  {stats.platform === 'youtube' ? (
                    <>
                      <p>Views: {stats.stats.engagementBreakdown.views}</p>
                      <p>Likes: {stats.stats.engagementBreakdown.likes}</p>
                      <p>Comments: {stats.stats.engagementBreakdown.comments}</p>
                    </>
                  ) : (
                    <>
                      <p>Retweets: {stats.stats.engagementBreakdown.retweets}</p>
                      <p>Likes: {stats.stats.engagementBreakdown.likes}</p>
                      <p>Replies: {stats.stats.engagementBreakdown.replies}</p>
                      <p>Quotes: {stats.stats.engagementBreakdown.quotes}</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Top Authors</h3>
              <div className="space-y-2">
                {stats.stats.topAuthors.map((author, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{author.author}</span>
                    <span className="text-gray-600">{author.count} posts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 