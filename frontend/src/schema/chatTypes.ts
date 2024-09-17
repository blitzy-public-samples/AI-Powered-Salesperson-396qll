export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: Message[];
  startTime: Date;
  endTime: Date;
}

export interface ChatRequest {
  sessionId: string;
  userId: string;
  message: string;
}

// HUMAN ASSISTANCE NEEDED
// The QuoteSummary type is not defined in the provided specification.
// Please define the QuoteSummary type or replace it with an appropriate type.
export interface ChatResponse {
  sessionId: string;
  response: string;
  quoteSummary: QuoteSummary; // This type needs to be defined or replaced
}