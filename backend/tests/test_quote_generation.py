import unittest
from unittest.mock import patch
from services.quote_generation import QuoteGenerationService
from models.item import Item
from models.quote import Quote

class TestQuoteGeneration(unittest.TestCase):

    def setUp(self):
        self.quote_service = QuoteGenerationService()

    def test_single_item_quote_generation(self):
        item = Item(id=1, name="Test Item", base_price=100)
        quote = self.quote_service.generate_quote([item])
        
        self.assertIsInstance(quote, Quote)
        self.assertEqual(len(quote.items), 1)
        self.assertEqual(quote.total_price, 100)

    def test_multi_item_quote_generation(self):
        items = [
            Item(id=1, name="Item 1", base_price=100),
            Item(id=2, name="Item 2", base_price=150),
            Item(id=3, name="Item 3", base_price=200)
        ]
        quote = self.quote_service.generate_quote(items)
        
        self.assertIsInstance(quote, Quote)
        self.assertEqual(len(quote.items), 3)
        self.assertEqual(quote.total_price, 450)

    @patch('services.quote_generation.BulkDiscountService')
    def test_bulk_order_discounts(self, mock_bulk_discount_service):
        mock_bulk_discount_service.get_discount.return_value = 0.1
        
        items = [Item(id=1, name="Bulk Item", base_price=100)] * 10
        quote = self.quote_service.generate_quote(items)
        
        self.assertEqual(quote.total_price, 900)  # 10% discount applied
        mock_bulk_discount_service.get_discount.assert_called_once_with(10)

    @patch('services.quote_generation.DynamicPricingService')
    def test_dynamic_pricing_rules(self, mock_dynamic_pricing_service):
        mock_dynamic_pricing_service.apply_dynamic_pricing.return_value = 110
        
        item = Item(id=1, name="Dynamic Item", base_price=100)
        quote = self.quote_service.generate_quote([item])
        
        self.assertEqual(quote.total_price, 110)
        mock_dynamic_pricing_service.apply_dynamic_pricing.assert_called_once_with(item)

    # HUMAN ASSISTANCE NEEDED
    # Additional test cases might be needed for edge cases, error handling, and specific business rules.
    # Consider adding tests for:
    # - Invalid input handling
    # - Minimum order quantity rules
    # - Maximum order quantity rules
    # - Seasonal pricing adjustments
    # - Customer-specific pricing rules

if __name__ == '__main__':
    unittest.main()