// types/youtube.ts

export interface YouTubeSearchItem {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
  };
}

export interface YouTubeSearchResponse {
  items: YouTubeSearchItem[];
}

export interface YouTubeVideoItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
}

export interface YouTubeVideoResponse {
  items: YouTubeVideoItem[];
}

export interface YouTubeCommentItem {
  id: string;
  snippet: {
    topLevelComment: {
      snippet: {
        textDisplay: string;
        authorDisplayName: string;
        publishedAt: string;
        likeCount: string;
      };
    };
  };
}

export interface YouTubeCommentResponse {
  items: YouTubeCommentItem[];
}
