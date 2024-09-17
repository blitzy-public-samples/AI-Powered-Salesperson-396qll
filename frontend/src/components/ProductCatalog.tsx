import React, { useState, useEffect } from 'react';
import { searchProducts } from '../services/catalogService';
import { Product } from '../schema/productTypes';

interface ProductCatalogProps {
  onProductSelect: (product: Product) => void;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ onProductSelect }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleSearch('');
  }, []);

  // HUMAN ASSISTANCE NEEDED
  // The handleSearch function needs review for production readiness.
  // Consider adding debounce for search input and error handling improvements.
  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchProducts(query);
      setProducts(results);
    } catch (err) {
      setError('An error occurred while searching for products. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-catalog">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="Search products..."
      />
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} onClick={() => onProductSelect(product)}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCatalog;