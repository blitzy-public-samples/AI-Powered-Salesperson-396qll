from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Message(BaseModel):
    sender: str
    content: str
    timestamp: datetime

class ChatSession(BaseModel):
    session_id: str
    user_id: str
    messages: List[Message]
    start_time: datetime
    end_time: Optional[datetime] = None

class ChatRequest(BaseModel):
    session_id: Optional[str] = None
    user_id: str
    message: str

class ChatResponse(BaseModel):
    session_id: str
    response: str
    quote_summary: Optional[dict] = None

# HUMAN ASSISTANCE NEEDED
# The ChatSession and ChatResponse models have a confidence level of 0.85.
# Please review these models to ensure they meet all requirements and are production-ready.
# Consider adding any necessary validation or additional fields that might be needed.