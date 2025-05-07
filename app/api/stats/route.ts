import { NextResponse } from "next/server";
import { searchYoutube } from "@/lib/api/youtube";
import { searchTwitter } from "@/lib/api/twitter";

interface YouTubeEngagement {
  views: number;
  likes: number;
  comments: number;
}

interface TwitterEngagement {
  retweets: number;
  likes: number;
  replies: number;
  quotes: number;
}

interface BaseResult {
  originalId: string;
  title: string;
  content: string;
  author: string;
  publishedAt: Date;
  url: string;
}

interface YouTubeResult extends BaseResult {
  platform: "youtube";
  engagement: YouTubeEngagement;
}

interface TwitterResult extends BaseResult {
  platform: "twitter";
  engagement: TwitterEngagement;
  authorName: string;
}

type SearchResult = YouTubeResult | TwitterResult;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const platform = searchParams.get("platform");
    const query = searchParams.get("query");

    if (!platform || !query) {
      return NextResponse.json(
        { error: "Platform and query are required" },
        { status: 400 }
      );
    }

    let results: SearchResult[];
    switch (platform.toUpperCase()) {
      case "YOUTUBE":
        results = await searchYoutube(query) as YouTubeResult[];
        break;
      case "TWITTER":
        results = await searchTwitter(query) as TwitterResult[];
        break;
      default:
        return NextResponse.json(
          { error: "Invalid platform" },
          { status: 400 }
        );
    }

    // Calculate statistics
    const stats = {
      totalResults: results.length,
      averageEngagement: 0,
      engagementBreakdown: {
        views: 0,
        likes: 0,
        retweets: 0,
        comments: 0,
        replies: 0,
        quotes: 0,
      },
      topAuthors: new Map<string, number>(),
    };

    results.forEach(result => {
      // Calculate engagement based on platform
      if (result.platform === "youtube") {
        const engagement = result.engagement as YouTubeEngagement;
        stats.engagementBreakdown.views += engagement.views;
        stats.engagementBreakdown.likes += engagement.likes;
        stats.engagementBreakdown.comments += engagement.comments;
      } else {
        const engagement = result.engagement as TwitterEngagement;
        stats.engagementBreakdown.retweets += engagement.retweets;
        stats.engagementBreakdown.likes += engagement.likes;
        stats.engagementBreakdown.replies += engagement.replies;
        stats.engagementBreakdown.quotes += engagement.quotes;
      }

      // Track authors
      const authorCount = stats.topAuthors.get(result.author) || 0;
      stats.topAuthors.set(result.author, authorCount + 1);
    });

    // Calculate averages
    if (results.length > 0) {
      stats.averageEngagement = (
        stats.engagementBreakdown.views +
        stats.engagementBreakdown.likes +
        stats.engagementBreakdown.retweets +
        stats.engagementBreakdown.comments +
        stats.engagementBreakdown.replies +
        stats.engagementBreakdown.quotes
      ) / results.length;
    }

    // Convert top authors to array and sort
    const topAuthors = Array.from(stats.topAuthors.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([author, count]) => ({ author, count }));

    return NextResponse.json({
      platform,
      query,
      stats: {
        ...stats,
        topAuthors,
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
} 