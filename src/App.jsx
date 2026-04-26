import React, { useState } from 'react';
import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ShayriPage from './components/pages/ShayriPage';
import UsersPage from './components/pages/UsersPage';
import AnalyticsPage from './components/pages/AnalyticsPage';
import InternalDashboard from './components/pages/InternalDashboard';
import PublicShayriView from './components/pages/PublicShayriView';
import Sidebar from './components/layout/Sidebar';
import Button from './components/ui/Button';
import { useAnalyticsOverview } from './hooks/useAnalytics';
import Loading from './components/ui/Loading';

// Navigation Component
const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'internal', name: 'Internal Dashboard', icon: '🏢' },
    { id: 'shayri', name: 'Shayri', icon: '📝' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'analytics', name: 'Analytics', icon: '📊' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">Shayri Dashboard</h1>
          </div>
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Main Dashboard Component
function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { data: quickStats, isLoading } = useAnalyticsOverview();

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <InternalDashboard activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'shayri':
        return <ShayriPage />;
      case 'users':
        return <UsersPage />;
      case 'analytics':
        return <AnalyticsPage />;
      default:
        return <InternalDashboard activeTab={activeTab} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-primary">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-secondary border-b border-primary px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Internal Dashboard</h1>
              <p className="text-sm text-secondary">Shayri Management System</p>
            </div>
            
            {/* Quick Stats */}
            {quickStats && !isLoading && (
              <div className="flex items-center space-x-6 text-sm">
                <span className="text-secondary">
                  📝 <strong className="text-primary">{quickStats.totalShayris}</strong> Shayris
                </span>
                <span className="text-secondary">
                  👥 <strong className="text-primary">{quickStats.totalUsers}</strong> Users
                </span>
                <span className="text-secondary">
                  👁️ <strong className="text-primary">{quickStats.totalViews}</strong> Views
                </span>
                <span className="text-secondary">
                  🔄 <strong className="text-primary">{quickStats.totalShares}</strong> Shares
                </span>
                <div className="flex items-center text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  API Connected
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <Loading text="Loading..." />
      </div>
    );
  }

  // If user is not authenticated, show public shayri view
  if (!user) {
    return <PublicShayriView />;
  }

  // If user is authenticated, show protected dashboard
  return (
    <div className="min-h-screen bg-primary">
      <ProtectedRoute requiredPermission="read">
        <Dashboard />
      </ProtectedRoute>
    </div>
  );
}

// Wrapped App with Query Provider
function AppWithQuery() {
  return (
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  );
}

export default AppWithQuery;