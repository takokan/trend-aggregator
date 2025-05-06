
'use client';

import { useState } from 'react';

type FilterBarProps = {
  platforms: string[];
  onFilterChange: (filters: {
    platform: string | null;
    sentiment: string | null;
    sortBy: string;
  }) => void;
};

export default function FilterBar({ platforms, onFilterChange }: FilterBarProps) {
  const [platform, setPlatform] = useState<string | null>(null);
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('latest');

  const handlePlatformChange = (value: string | null) => {
    const newPlatform = platform === value ? null : value;
    setPlatform(newPlatform);
    onFilterChange({ platform: newPlatform, sentiment, sortBy });
  };

  const handleSentimentChange = (value: string | null) => {
    const newSentiment = sentiment === value ? null : value;
    setSentiment(newSentiment);
    onFilterChange({ platform, sentiment: newSentiment, sortBy });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    onFilterChange({ platform, sentiment, sortBy: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Platform</p>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => handlePlatformChange(p)}
                className={`px-3 py-1 text-sm rounded-full ${
                  platform === p
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {p}
              </button>
            ))}
            {platform && (
              <button
                onClick={() => handlePlatformChange(null)}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Sentiment</p>
          <div className="flex flex-wrap gap-2">
            {['POSITIVE', 'NEUTRAL', 'NEGATIVE'].map((s) => (
              <button
                key={s}
                onClick={() => handleSentimentChange(s)}
                className={`px-3 py-1 text-sm rounded-full ${
                  sentiment === s
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {s}
              </button>
            ))}
            {sentiment && (
              <button
                onClick={() => handleSentimentChange(null)}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Sort by</p>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="px-3 py-1 text-sm rounded border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="latest">Latest</option>
            <option value="engagement">Most engagement</option>
          </select>
        </div>
      </div>
    </div>
  );
}