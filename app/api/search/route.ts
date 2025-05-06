import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { searchYoutube } from "@/lib/api/youtube";
import { searchTwitter } from "@/lib/api/twitter";
import { summarizeContent, analyzeSentiment } from "@/lib/api/openai";
import { Sentiment } from "@prisma/client";

interface SearchResult {
  platform: string;
  originalId: string;
  title?: string;
  content: string;
  author: string;
  publishedAt: Date;
  url: string;
  engagement: {
    views?: number;
    likes?: number;
    comments?: number;
    retweets?: number;
  };
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // Create search record
    const search = await prisma.search.create({
      data: {
        query,
        userId: session.user.email || undefined,
      },
    });

    // Search across platforms
    const [youtubeResults, twitterResults] = await Promise.all([
      searchYoutube(query),
      searchTwitter(query),
    ]);

    // Process and store results
    const results = await Promise.all([
      ...youtubeResults.map(async (result: SearchResult) => {
        const summary = await summarizeContent(result.content, query);
        const sentiment = await analyzeSentiment(result.content) as Sentiment;
        
        return prisma.result.create({
          data: {
            searchId: search.id,
            platform: "YOUTUBE",
            originalId: result.originalId,
            title: result.title || null,
            content: result.content,
            url: result.url,
            author: result.author,
            publishedAt: result.publishedAt,
            engagement: {
              views: result.engagement.views,
              likes: result.engagement.likes,
            },
            summary,
            sentiment,
          },
        });
      }),
      ...twitterResults.map(async (result: SearchResult) => {
        const summary = await summarizeContent(result.content, query);
        const sentiment = await analyzeSentiment(result.content) as Sentiment;
        
        return prisma.result.create({
          data: {
            searchId: search.id,
            platform: "TWITTER",
            originalId: result.originalId,
            content: result.content,
            url: result.url,
            author: result.author,
            publishedAt: result.publishedAt,
            engagement: {
              retweets: result.engagement.retweets,
              likes: result.engagement.likes,
            },
            summary,
            sentiment,
          },
        });
      }),
    ]);

    return NextResponse.json({ search, results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
}