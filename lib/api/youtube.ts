import axios from "axios";
import { 
  YouTubeSearchItem, 
  YouTubeSearchResponse, 
  YouTubeVideoItem, 
  YouTubeVideoResponse, 
  YouTubeCommentItem, 
  YouTubeCommentResponse 
  } from "@/types/youtube";

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.YOUTUBE_API_KEY;


export async function searchYoutube(query: string, maxResults = 10) {
  try {
    const searchResponse = await axios.get<YouTubeSearchResponse>(`${YOUTUBE_API_URL}/search`, {
      params: {
        part: "snippet",
        q: query,
        maxResults,
        type: "video",
        order: "relevance",
        key: API_KEY,
      }
    })

    const videoIds = searchResponse.data.items.map((item: YouTubeSearchItem) => item.id.videoId).join(",");

    const videoResponse = await axios.get<YouTubeVideoResponse>(`${YOUTUBE_API_URL}/videos`, {
      params: {
        part: "snippet, statistics",
        id: videoIds,
        key: API_KEY,
      }
    })

    return videoResponse.data.items.map((item: YouTubeVideoItem) => ({
      platform: "YOUTUBE",
      originalId: item.id,
      title: item.snippet.title,
      content: item.snippet.description,
      author: item.snippet.channelTitle,
      publishedAt: new Date(item.snippet.publishedAt),
      url: `https://www.youtube.com/watch?v=${item.id}`,
      engagement: {
        views: parseInt(item.statistics.viewCount, 10),
        likes: parseInt(item.statistics.likeCount, 10),
        comments: parseInt(item.statistics.commentCount, 10),
      }
    }))
  } catch (error) {
    console.error("Error searching Youtube", error);
    return [];
  }
}

export async function getYoutubeComments(videoId: string, maxResults = 10) {
    try {
      const response = await axios.get<YouTubeCommentResponse>(`${YOUTUBE_API_URL}/commentThreads`, {
        params: {
          part: "snippet",
          videoId,
          maxResults,
          order: "relevance",
          key: API_KEY
        }
      });

      return response.data.items.map((item: YouTubeCommentItem) => ({
        id: item.id,
        text: item.snippet.topLevelComment.snippet.textDisplay,
        author: item.snippet.topLevelComment.snippet.authorDisplayName,
        publishedAt: new Date(item.snippet.topLevelComment.snippet.publishedAt),
        likesCount: parseInt(item.snippet.topLevelComment.snippet.likeCount, 10),
      }))
    } catch (error) {
      console.error("Error fetching Youtube comments", error);  
      return [];
    }
}