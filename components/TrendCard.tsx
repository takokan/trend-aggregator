'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

type TrendCardProps = {
  platform: string;
  title: string | null;
  content: string | null;
  author: string | null;
  publishedAt: Date | null;
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

export default function TrendCard({
  platform,
  title,
  content,
  author,
  publishedAt,
  url,
  engagement,
  summary,
  sentiment,
}: TrendCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getPlatformIcon = () => {
    switch (platform) {
      case 'YOUTUBE':
        return '🎥';
      case 'REDDIT':
        return '🔍';
      case 'TWITTER':
        return '🐦';
      default:
        return '📱';
    }
  };

  const getSentimentColor = () => {
    switch (sentiment) {
      case 'POSITIVE':
        return 'bg-green-100 text-green-800';
      case 'NEGATIVE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatEngagement = () => {
    if (!engagement) return null;

    switch (platform) {
      case 'YOUTUBE':
        return `${engagement.views?.toLocaleString() || 0} views • ${engagement.likes?.toLocaleString() || 0} likes`;
      case 'REDDIT':
        return `${engagement.score?.toLocaleString() || 0} upvotes • ${engagement.comments?.toLocaleString() || 0} comments`;
      case 'TWITTER':
        return `${engagement.likes?.toLocaleString() || 0} likes • ${engagement.comments?.toLocaleString() || 0} comments`;
      default:
        return '';
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{getPlatformIcon()}</span>
            <span className="font-medium">{platform}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${getSentimentColor()}`}>
              {sentiment}
            </span>
          </div>
          {publishedAt && (
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-2">{title || content?.substring(0, 60) || 'No title'}</h3>

        {summary && (
          <div className="bg-blue-50 p-3 rounded mb-3 text-sm">
            <p className="font-medium text-blue-800">Summary:</p>
            <p>{summary}</p>
          </div>
        )}

        {expanded && content && <p className="text-gray-700 mb-3">{content}</p>}

        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-gray-500">
            {author && <span>By {author}</span>}
            <span className="ml-2">{formatEngagement()}</span>
          </div>

          <div className="flex space-x-2">
            {content && content.length > 0 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {expanded ? 'Show less' : 'Show more'}
              </button>
            )}
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View original
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}