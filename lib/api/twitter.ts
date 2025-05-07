import axios from "axios";
import { TwitterSearchResponse, TwitterTweet, TwitterUser } from "@/types/twitter";
import { RawSearchResult, Platform } from "@/types/search";

const TWITTER_API_URL = "https://api.twitter.com/2";
const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

if (!BEARER_TOKEN) {
  throw new Error("TWITTER_BEARER_TOKEN is not set in environment variables");
}

export async function searchTwitter(query: string, maxResults = 10): Promise<RawSearchResult[]> {
  try {
    const response = await axios.get<TwitterSearchResponse>(`${TWITTER_API_URL}/tweets/search/recent`, {
      params: {
        query: `${query} -is:retweet`,
        "tweet.fields": "created_at, public_metrics, author_id",
        "user.fields": "username, name",
        "expansions": "author_id",
        "max_results": maxResults,
      },
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      }
    });

    const tweets = response.data.data || [];
    const users = (response.data.includes?.users || []).reduce((acc: Record<string, TwitterUser>, user: TwitterUser) => {
      acc[user.id] = user;
      return acc;
    }, {});

    return tweets.map((tweet: TwitterTweet) => ({
      platform: "TWITTER" as Platform,
      originalId: tweet.id,
      title: "",
      content: tweet.text,
      author: users[tweet.author_id]?.username || "Unknown",
      authorName: users[tweet.author_id]?.name || "Unknown",
      publishedAt: new Date(tweet.created_at),
      url: `https://x.com/${users[tweet.author_id]?.username}/status/${tweet.id}`,
      engagement: {
        retweets: tweet.public_metrics.retweet_count,
        likes: tweet.public_metrics.like_count,
        replies: tweet.public_metrics.reply_count,
        quotes: tweet.public_metrics.quote_count,
      }
    }));
  } catch (error) {
    console.error("Error searching Twitter:", error);
    return [];
  }
}