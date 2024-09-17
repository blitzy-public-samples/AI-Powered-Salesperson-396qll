from google.cloud import language_v1
from typing import List, Dict
from app.core.config import get_settings

class NLPService:
    def __init__(self):
        settings = get_settings()
        self.client = language_v1.LanguageServiceClient()

    def analyze_sentiment(self, text: str) -> Dict:
        document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)
        sentiment = self.client.analyze_sentiment(request={'document': document}).document_sentiment
        return {
            'score': sentiment.score,
            'magnitude': sentiment.magnitude
        }

    def extract_entities(self, text: str) -> List[Dict]:
        document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)
        response = self.client.analyze_entities(request={'document': document})
        entities = []
        for entity in response.entities:
            entities.append({
                'name': entity.name,
                'type': language_v1.Entity.Type(entity.type_).name,
                'salience': entity.salience,
                'mentions': [{'text': mention.text.content, 'type': language_v1.EntityMention.Type(mention.type_).name} for mention in entity.mentions]
            })
        return entities

# HUMAN ASSISTANCE NEEDED
# The following aspects may need attention:
# 1. Error handling: Add try-except blocks to handle potential API errors or connection issues.
# 2. Authentication: Ensure proper authentication is set up for Google Cloud services.
# 3. Rate limiting: Implement rate limiting to avoid exceeding API quotas.
# 4. Caching: Consider implementing caching for frequent requests to improve performance.
# 5. Logging: Add logging for better debugging and monitoring.
# 6. Testing: Create unit tests to ensure the functionality works as expected.