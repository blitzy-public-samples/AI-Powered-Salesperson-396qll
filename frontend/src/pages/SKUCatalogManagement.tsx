import React, { useState, useEffect } from 'react';
import { SKUList } from '../components/SKUList';
import { SKUForm } from '../components/SKUForm';
import { fetchSKUs, createSKU, updateSKU, deleteSKU } from '../services/skuService';
import { formatCurrency } from '../utils/formatters';

// HUMAN ASSISTANCE NEEDED
// This component requires additional implementation for bulk import/export functionality
// and may need refinement for production readiness.

const SKUCatalogManagement: React.FC = () => {
  const [skus, setSkus] = useState<any[]>([]);
  const [selectedSKU, setSelectedSKU] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSKUs();
  }, []);

  const loadSKUs = async () => {
    try {
      setIsLoading(true);
      const fetchedSKUs = await fetchSKUs();
      setSkus(fetchedSKUs);
    } catch (err) {
      setError('Failed to load SKUs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSKU = async (skuData: any) => {
    try {
      const newSKU = await createSKU(skuData);
      setSkus([...skus, newSKU]);
    } catch (err) {
      setError('Failed to create SKU. Please try again.');
    }
  };

  const handleUpdateSKU = async (id: string, skuData: any) => {
    try {
      const updatedSKU = await updateSKU(id, skuData);
      setSkus(skus.map(sku => sku.id === id ? updatedSKU : sku));
      setSelectedSKU(null);
    } catch (err) {
      setError('Failed to update SKU. Please try again.');
    }
  };

  const handleDeleteSKU = async (id: string) => {
    try {
      await deleteSKU(id);
      setSkus(skus.filter(sku => sku.id !== id));
    } catch (err) {
      setError('Failed to delete SKU. Please try again.');
    }
  };

  if (isLoading) {
    return <div>Loading SKUs...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="sku-catalog-management">
      <h1>SKU Catalog Management</h1>
      <SKUList
        skus={skus}
        onSelectSKU={setSelectedSKU}
        onDeleteSKU={handleDeleteSKU}
        formatCurrency={formatCurrency}
      />
      <SKUForm
        sku={selectedSKU}
        onSubmit={selectedSKU ? handleUpdateSKU : handleCreateSKU}
        onCancel={() => setSelectedSKU(null)}
      />
      {/* TODO: Implement bulk import/export functionality */}
    </div>
  );
};

export default SKUCatalogManagement;