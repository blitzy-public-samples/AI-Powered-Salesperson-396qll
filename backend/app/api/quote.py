from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schema.quote import QuoteRequest, QuoteResponse
from app.services.quote_generation_service import QuoteGenerationService

router = APIRouter()

@router.post('/generate')
def generate_quote(request: QuoteRequest, db: Session = Depends(get_db)) -> QuoteResponse:
    # Validate the quote request
    if not request.is_valid():
        raise HTTPException(status_code=400, detail="Invalid quote request")

    # Use QuoteGenerationService to create a quote
    quote_service = QuoteGenerationService(db)
    generated_quote = quote_service.generate_quote(request)

    # Save the generated quote to the database
    db_quote = quote_service.save_quote(generated_quote)

    # Return the quote details
    return QuoteResponse.from_orm(db_quote)

@router.get('/{quote_id}')
def get_quote(quote_id: str, db: Session = Depends(get_db)) -> QuoteResponse:
    # Query the database for the specified quote ID
    quote = db.query(Quote).filter(Quote.id == quote_id).first()

    # If found, return the quote details
    if quote:
        return QuoteResponse.from_orm(quote)
    
    # If not found, raise an HTTPException
    raise HTTPException(status_code=404, detail="Quote not found")