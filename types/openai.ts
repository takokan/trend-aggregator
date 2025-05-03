export interface OpenAIChatMessage {
  role: string;
  content: string;
}

export interface OpenAIChoice {
  index: number;
  message: OpenAIChatMessage;
  finish_reason: string;
}

export interface OpenAIChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: OpenAIChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
