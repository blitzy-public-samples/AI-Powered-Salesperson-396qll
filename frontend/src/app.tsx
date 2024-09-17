import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ChatInterface } from './components/ChatInterface';
import { AdminDashboard } from './components/AdminDashboard';
import { UserManagement } from './components/UserManagement';
import { SKUCatalogManagement } from './components/SKUCatalogManagement';
import { createApiClient } from './services/api';
import { Provider, store } from './store';

// HUMAN ASSISTANCE NEEDED
// The following code may need additional refinement for production readiness.
// Consider adding error boundaries, loading states, and authentication checks.

const App: React.FC = () => {
  // Set up API client
  const apiClient = createApiClient();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app-container">
          <header>
            {/* Add header content, navigation, etc. */}
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={ChatInterface} />
              <Route path="/admin" component={AdminDashboard} />
              <Route path="/users" component={UserManagement} />
              <Route path="/sku-catalog" component={SKUCatalogManagement} />
              {/* Add more routes as needed */}
            </Switch>
          </main>
          <footer>
            {/* Add footer content */}
          </footer>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;