export type Platform = "YOUTUBE" | "TWITTER";

export interface Engagement {
  views?: number;
  likes?: number;
  comments?: number;
  retweets?: number;
  replies?: number;
  quotes?: number;
}

export interface RawSearchResult {
  platform: Platform;
  originalId: string;
  title?: string;
  content: string;
  author: string;
  authorName?: string;
  publishedAt: Date;
  url: string;
  engagement: Engagement;
}

export interface ProcessedSearchResult extends RawSearchResult {
  summary: string;
  sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  insights: string[];
} 