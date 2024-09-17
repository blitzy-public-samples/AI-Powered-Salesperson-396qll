import { createApiClient } from './api';
import { QuoteRequest, QuoteResponse } from '../schema/quoteTypes';

export async function generateQuote(request: QuoteRequest): Promise<QuoteResponse> {
  const apiClient = createApiClient();
  const response = await apiClient.post<QuoteResponse>('/api/quote/generate', request);
  return response.data;
}

export async function getQuote(quoteId: string): Promise<QuoteResponse> {
  const apiClient = createApiClient();
  const response = await apiClient.get<QuoteResponse>(`/api/quote/${quoteId}`);
  return response.data;
}