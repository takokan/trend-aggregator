import { NextResponse } from "next/server";
import { searchYoutube } from "@/lib/api/youtube";
import { searchTwitter } from "@/lib/api/twitter";
import { summarizeContent, analyzeSentiment, extractInsights } from "@/lib/api/openai";
import { RawSearchResult, ProcessedSearchResult } from "@/types/search";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    console.log("Searching for query:", query);

    // Search across platforms
    let youtubeResults: RawSearchResult[] = [];
    let twitterResults: RawSearchResult[] = [];

    try {
      youtubeResults = await searchYoutube(query);
      console.log("YouTube results:", youtubeResults.length);
    } catch (error) {
      console.error("YouTube search error:", error);
    }

    try {
      twitterResults = await searchTwitter(query);
      console.log("Twitter results:", twitterResults.length);
    } catch (error) {
      console.error("Twitter search error:", error);
    }

    if (youtubeResults.length === 0 && twitterResults.length === 0) {
      return NextResponse.json({ error: "No results found" }, { status: 404 });
    }

    // Process results with OpenAI
    const processedResults = await Promise.all([
      ...youtubeResults.map(async (result) => {
        try {
          const [summary, sentiment, insights] = await Promise.all([
            summarizeContent(result.content, query),
            analyzeSentiment(result.content),
            extractInsights(result.content, query)
          ]);
          
          const processedResult: ProcessedSearchResult = {
            ...result,
            summary,
            sentiment,
            insights
          };
          return processedResult;
        } catch (error) {
          console.error("Error processing YouTube result:", error);
          const fallbackResult: ProcessedSearchResult = {
            ...result,
            summary: "Unable to generate summary",
            sentiment: "NEUTRAL",
            insights: ["Unable to extract insights"]
          };
          return fallbackResult;
        }
      }),
      ...twitterResults.map(async (result) => {
        try {
          const [summary, sentiment, insights] = await Promise.all([
            summarizeContent(result.content, query),
            analyzeSentiment(result.content),
            extractInsights(result.content, query)
          ]);
          
          const processedResult: ProcessedSearchResult = {
            ...result,
            summary,
            sentiment,
            insights
          };
          return processedResult;
        } catch (error) {
          console.error("Error processing Twitter result:", error);
          const fallbackResult: ProcessedSearchResult = {
            ...result,
            summary: "Unable to generate summary",
            sentiment: "NEUTRAL",
            insights: ["Unable to extract insights"]
          };
          return fallbackResult;
        }
      }),
    ]);

    console.log("Total processed results:", processedResults.length);
    return NextResponse.json({ results: processedResults });
  } catch (error) {
    console.error("Search error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to perform search";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 