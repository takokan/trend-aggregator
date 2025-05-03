export interface TwitterPublicMetrics {
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count: number;
}

export interface TwitterTweet {
  id: string;
  text: string;
  author_id: string;
  created_at: string;
  public_metrics: TwitterPublicMetrics;
}

export interface TwitterUser {
  id: string;
  name: string;
  username: string;
}

export interface TwitterSearchResponse {
  data: TwitterTweet[];
  includes?: {
    users: TwitterUser[];
  };
}
