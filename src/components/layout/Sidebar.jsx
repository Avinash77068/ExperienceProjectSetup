import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user, logout, theme, toggleTheme } = useAuth();

  const menuItems = [
    {
      id: 'overview',
      name: 'Overview',
      icon: '📊',
      permission: null
    },
    {
      id: 'shayri',
      name: 'Shayri',
      icon: '📝',
      permission: 'read'
    },
    {
      id: 'users',
      name: 'Users',
      icon: '👥',
      permission: 'manage_users'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: '📈',
      permission: 'read'
    }
  ];

  const handleMenuClick = (itemId) => {
    setActiveTab(itemId);
  };

  return (
    <div className="sidebar w-64 min-h-screen p-4 border-r border-primary">
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold">📝</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">Shayri</h1>
            <p className="text-xs text-tertiary">Dashboard</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="mb-6 p-3 bg-secondary rounded-lg border border-primary">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-tertiary truncate">{user?.email}</p>
            <span className="inline-block px-2 py-1 text-xs rounded bg-accent text-secondary mt-1">
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mb-8">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            // Check if user has permission for this item
            if (item.permission && !user?.permissions?.includes(item.permission)) {
              return null;
            }

            return (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`sidebar-item w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id ? 'active' : ''
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="flex-1">{item.name}</span>
                  {activeTab === item.id && (
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Theme Toggle */}
      <div className="mb-6">
        <button
          onClick={toggleTheme}
          className="sidebar-item w-full flex items-center justify-between px-3 py-2 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg">{theme === 'light' ? '🌙' : '☀️'}</span>
            <span className="text-sm">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
        </button>
      </div>

      {/* Logout */}
      <div className="mt-auto">
        <button
          onClick={logout}
          className="sidebar-item w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300"
        >
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
