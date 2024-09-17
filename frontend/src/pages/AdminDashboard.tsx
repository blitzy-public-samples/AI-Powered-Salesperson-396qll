import React, { useState, useEffect } from 'react';
import { UserManagement } from '../components/UserManagement';
import { SKUCatalogManagement } from '../components/SKUCatalogManagement';
import { QuoteHistory } from '../components/QuoteHistory';
import { SystemConfig } from '../components/SystemConfig';
import { fetchAdminData } from '../services/adminService';

// HUMAN ASSISTANCE NEEDED
// The confidence level is below 0.8, and the component might need additional features or improvements for production readiness.
// Please review and enhance the following areas:
// 1. Error handling for data fetching
// 2. Loading state management
// 3. Responsive design considerations
// 4. Accessibility improvements
// 5. State management for larger scale (consider using Context API or Redux)

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('users');
  const [adminData, setAdminData] = useState<any>(null);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const data = await fetchAdminData();
        setAdminData(data);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
        // TODO: Implement proper error handling
      }
    };

    loadAdminData();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'catalog':
        return <SKUCatalogManagement />;
      case 'quotes':
        return <QuoteHistory />;
      case 'config':
        return <SystemConfig />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><button onClick={() => setActiveTab('users')}>User Management</button></li>
          <li><button onClick={() => setActiveTab('catalog')}>SKU Catalog Management</button></li>
          <li><button onClick={() => setActiveTab('quotes')}>Quote History</button></li>
          <li><button onClick={() => setActiveTab('config')}>System Configuration</button></li>
        </ul>
      </nav>
      <main>
        {renderTabContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;