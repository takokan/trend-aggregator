import axios, { AxiosResponse } from "axios";
import { OpenAIChatResponse } from "@/types/openai";
import { Sentiment } from "@/types/sentiment";

const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in environment variables");
}

export async function summarizeContent(content: string, topic: string) {
  try {
    const response: AxiosResponse<OpenAIChatResponse> = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes social media content and extracts key insights."
          },
          {
            role: "user",
            content: `Summarize the following content about "${topic}" in 2-3 sentences, highlighting the main opinions or insights\n\n${content}`
          }
        ],
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error Summarizing Content:", error);
    return "Unable to generate summary";
  }
}

export async function analyzeSentiment(content: string): Promise<Sentiment> {
  try {
    const response: AxiosResponse<OpenAIChatResponse> = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that analyzes sentiment of social media content"
          },
          {
            role: "user",
            content: `Analyze the sentiment of the following text and respond with only one word: "POSITIVE", "NEUTRAL", or "NEGATIVE":\n\n${content}`
          }
        ],
        max_tokens: 10,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        }
      }
    );

    const sentiment = response.data.choices[0].message.content.trim().toUpperCase();
    if (["POSITIVE", "NEUTRAL", "NEGATIVE"].includes(sentiment)) {
      return sentiment as Sentiment;
    }

    return "NEUTRAL";
  } catch (error) {
    console.error("Error Analyzing Sentiment:", error);
    return "NEUTRAL";
  }
}

export async function extractInsights(content: string, topic: string) {
  try {
    const response: AxiosResponse<OpenAIChatResponse> = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that extracts key insights from social media content."
          },
          {
            role: "user",
            content: `Extract 3 key insights from the following content about "${topic}":\n\n${content}`
          }
        ],
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        }
      }
    );

    return response.data.choices[0].message.content.trim().split("\n");
  } catch (error) {
    console.error("Error Extracting Insights:", error);
    return ["Unable to extract insights"];
  }
}