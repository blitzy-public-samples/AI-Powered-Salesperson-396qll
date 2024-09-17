from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class QuoteItem(BaseModel):
    sku: str
    description: str
    quantity: int
    unit_price: float
    total_price: float

class Quote(BaseModel):
    quote_id: str
    user_id: str
    items: List[QuoteItem]
    total_price: float
    created_at: datetime
    expires_at: Optional[datetime]
    status: str

# HUMAN ASSISTANCE NEEDED
# The following classes have a confidence level of 0.8, which is below the threshold.
# Please review and adjust as necessary for production readiness.

class QuoteRequest(BaseModel):
    user_id: str
    requirements: List[dict]
    session_id: Optional[str]

class QuoteResponse(BaseModel):
    quote: Quote
    warnings: Optional[List[str]]
    suggestions: Optional[List[str]]