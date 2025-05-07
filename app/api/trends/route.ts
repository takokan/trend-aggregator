import { NextResponse } from "next/server";
import { searchYoutube } from "@/lib/api/youtube";
import { searchTwitter } from "@/lib/api/twitter";

export async function GET() {
  try {
    // Get trending topics from different platforms
    const [youtubeTrends, twitterTrends] = await Promise.all([
      searchYoutube("trending", 5),
      searchTwitter("trending", 5),
    ]);

    // Combine and process trends
    const trends = [
      ...youtubeTrends.map(result => ({
        platform: "YOUTUBE",
        title: result.title,
        content: result.content,
        engagement: result.engagement,
        url: result.url,
      })),
      ...twitterTrends.map(result => ({
        platform: "TWITTER",
        title: result.title,
        content: result.content,
        engagement: result.engagement,
        url: result.url,
      })),
    ];

    // Sort by engagement
    trends.sort((a, b) => {
      const aEngagement = (a.engagement.views || 0) + (a.engagement.likes || 0) + (a.engagement.retweets || 0);
      const bEngagement = (b.engagement.views || 0) + (b.engagement.likes || 0) + (b.engagement.retweets || 0);
      return bEngagement - aEngagement;
    });

    return NextResponse.json({ trends: trends.slice(0, 10) });
  } catch (error) {
    console.error("Trends error:", error);
    return NextResponse.json(
      { error: "Failed to fetch trends" },
      { status: 500 }
    );
  }
} 