from pydantic import BaseSettings
from google.cloud import secretmanager

class Settings(BaseSettings):
    PROJECT_ID: str
    GOOGLE_APPLICATION_CREDENTIALS: str
    DATABASE_URL: str
    SKU_CATALOG_BUCKET: str
    RAG_INDEX_BUCKET: str
    AI_MODEL_ENDPOINT: str
    API_RATE_LIMIT: int
    JWT_SECRET_KEY: str
    JWT_EXPIRATION_MINUTES: int

    # HUMAN ASSISTANCE NEEDED
    # The following constructor implementation might need review and adjustments
    # for production readiness and error handling
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        client = secretmanager.SecretManagerServiceClient()
        
        secrets = [
            'DATABASE_URL',
            'SKU_CATALOG_BUCKET',
            'RAG_INDEX_BUCKET',
            'AI_MODEL_ENDPOINT',
            'JWT_SECRET_KEY'
        ]
        
        for secret in secrets:
            secret_name = f"projects/{self.PROJECT_ID}/secrets/{secret}/versions/latest"
            response = client.access_secret_version(request={"name": secret_name})
            setattr(self, secret, response.payload.data.decode("UTF-8"))
        
        # Load non-secret configurations
        self.API_RATE_LIMIT = int(self.API_RATE_LIMIT)
        self.JWT_EXPIRATION_MINUTES = int(self.JWT_EXPIRATION_MINUTES)

def get_settings() -> Settings:
    return Settings()