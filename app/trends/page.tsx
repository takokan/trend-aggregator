'use client';

import { useState, useEffect } from 'react';

interface Trend {
  platform: string;
  title: string;
  content: string;
  engagement: {
    views?: number;
    likes?: number;
    retweets?: number;
    comments?: number;
  };
  url: string;
}

export default function TrendsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trends, setTrends] = useState<Trend[]>([]);

  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    try {
      const response = await fetch('/api/trends');
      if (!response.ok) {
        throw new Error('Failed to fetch trends');
      }
      const data = await response.json();
      setTrends(data.trends);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading trends...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Trending Topics</h1>
        <button
          onClick={fetchTrends}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trends.map((trend, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {trend.platform}
              </span>
              <div className="flex space-x-2 text-sm text-gray-500">
                {trend.engagement.views && (
                  <span>👁️ {formatNumber(trend.engagement.views)}</span>
                )}
                {trend.engagement.likes && (
                  <span>❤️ {formatNumber(trend.engagement.likes)}</span>
                )}
                {trend.engagement.retweets && (
                  <span>🔄 {formatNumber(trend.engagement.retweets)}</span>
                )}
                {trend.engagement.comments && (
                  <span>💬 {formatNumber(trend.engagement.comments)}</span>
                )}
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-2">{trend.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{trend.content}</p>

            <a
              href={trend.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              View Original →
            </a>
          </div>
        ))}
      </div>

      {trends.length === 0 && !error && (
        <div className="text-center text-gray-600 py-8">
          No trending topics found
        </div>
      )}
    </div>
  );
} 