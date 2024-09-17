from celery import Celery
from app.core.config import get_settings
from app.services.rag_service import RAGService
from app.services.quote_generation_service import QuoteGenerationService
from app.db.models import Quote, SKU
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from google.cloud import storage

celery_app = Celery('ai_salesperson', broker=get_settings().CELERY_BROKER_URL)

@celery_app.task
def update_rag_index(document_ids: List[str]) -> bool:
    # HUMAN ASSISTANCE NEEDED
    # This function needs more implementation details and error handling
    rag_service = RAGService()
    storage_client = storage.Client()
    bucket = storage_client.bucket(get_settings().GCS_BUCKET_NAME)

    for doc_id in document_ids:
        blob = bucket.blob(doc_id)
        content = blob.download_as_text()
        # Process document content and extract relevant information
        # Update RAG index with new information
        rag_service.update_index(doc_id, content)

    # Log the update operation
    print(f"Updated RAG index with {len(document_ids)} documents")
    return True

@celery_app.task
def generate_bulk_quotes(quote_requests: List[Dict]) -> List[Dict]:
    # HUMAN ASSISTANCE NEEDED
    # This function needs more error handling and validation
    quote_service = QuoteGenerationService()
    db = SessionLocal()
    generated_quotes = []

    try:
        for request in quote_requests:
            quote = quote_service.generate_quote(request)
            db_quote = Quote(**quote)
            db.add(db_quote)
            generated_quotes.append(quote)

        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error generating bulk quotes: {str(e)}")
    finally:
        db.close()

    return generated_quotes

@celery_app.task
def update_sku_catalog(catalog_file_path: str) -> Dict:
    # HUMAN ASSISTANCE NEEDED
    # This function needs more implementation details, error handling, and data validation
    storage_client = storage.Client()
    bucket = storage_client.bucket(get_settings().GCS_BUCKET_NAME)
    blob = bucket.blob(catalog_file_path)
    
    # Download and parse the catalog file (assuming it's a CSV for this example)
    content = blob.download_as_text()
    catalog_data = content.splitlines()
    
    db = SessionLocal()
    update_summary = {"created": 0, "updated": 0, "errors": 0}
    
    try:
        for row in catalog_data[1:]:  # Skip header row
            sku_data = row.split(',')
            # Implement proper parsing and validation of SKU data
            sku = db.query(SKU).filter(SKU.sku_id == sku_data[0]).first()
            if sku:
                # Update existing SKU
                sku.name = sku_data[1]
                sku.price = float(sku_data[2])
                update_summary["updated"] += 1
            else:
                # Create new SKU
                new_sku = SKU(sku_id=sku_data[0], name=sku_data[1], price=float(sku_data[2]))
                db.add(new_sku)
                update_summary["created"] += 1
        
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error updating SKU catalog: {str(e)}")
        update_summary["errors"] += 1
    finally:
        db.close()
    
    return update_summary