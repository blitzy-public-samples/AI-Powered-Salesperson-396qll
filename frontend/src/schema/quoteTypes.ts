export interface QuoteItem {
  sku: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface QuoteSummary {
  quoteId: string;
  items: QuoteItem[];
  totalPrice: number;
  createdAt: Date;
  expiresAt: Date;
  status: string;
}

export interface QuoteRequest {
  userId: string;
  requirements: any[];
  sessionId: string;
}

export interface QuoteResponse {
  quote: QuoteSummary;
  warnings: string[];
  suggestions: string[];
}