import { NextResponse } from "next/server";
import { summarizeContent, analyzeSentiment, extractInsights } from "@/lib/api/openai";

export async function POST(req: Request) {
  try {
    const { content, query } = await req.json();
    
    if (!content || !query) {
      return NextResponse.json(
        { error: "Content and query are required" },
        { status: 400 }
      );
    }

    // Get detailed analysis using our OpenAI utility functions
    const [summary, sentiment, insights] = await Promise.all([
      summarizeContent(content, query),
      analyzeSentiment(content),
      extractInsights(content, query),
    ]);

    return NextResponse.json({
      summary,
      sentiment,
      insights,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze content" },
      { status: 500 }
    );
  }
} 