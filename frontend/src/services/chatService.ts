import { createApiClient } from './api';
import { ChatRequest, ChatResponse } from '../schema/chatTypes';

export async function sendMessage(request: ChatRequest): Promise<ChatResponse> {
  const apiClient = createApiClient();
  const response = await apiClient.post<ChatResponse>('/api/chat/message', request);
  return response.data;
}

export async function startChatSession(): Promise<string> {
  const apiClient = createApiClient();
  const response = await apiClient.post<{ sessionId: string }>('/api/chat/start');
  return response.data.sessionId;
}