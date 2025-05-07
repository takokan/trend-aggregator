'use client';

import { useState } from 'react';

interface AnalysisResult {
  summary: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  insights: string[];
}

export default function AnalyzePage() {
  const [content, setContent] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, query }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze content');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
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
      <h1 className="text-3xl font-bold mb-8">Content Analysis</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col space-y-4 max-w-2xl">
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content to Analyze
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded-md h-32"
              placeholder="Enter the content you want to analyze"
              required
            />
          </div>

          <div>
            <label htmlFor="query" className="block text-sm font-medium mb-2">
              Context Query
            </label>
            <input
              type="text"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter the context or topic for analysis"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Analyzing...' : 'Analyze Content'}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {analysis && (
        <div className="bg-white shadow rounded-lg p-6 max-w-2xl">
          <h2 className="text-2xl font-semibold mb-6">Analysis Results</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Summary</h3>
              <p className="text-gray-600">{analysis.summary}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Sentiment</h3>
              <p className={`font-medium ${getSentimentColor(analysis.sentiment)}`}>
                {analysis.sentiment}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Key Insights</h3>
              <ul className="list-disc list-inside space-y-2">
                {analysis.insights.map((insight, index) => (
                  <li key={index} className="text-gray-600">
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 