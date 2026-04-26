import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('user');
      const savedTheme = localStorage.getItem('theme') || 'light';
      
      if (token && savedUser) {
        setUser(JSON.parse(savedUser));
      }
      
      setTheme(savedTheme);
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      
      // Mock API call - replace with real API
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        const { user: userData, token } = data.data;
        
        setUser(userData);
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message };
      }
    } catch (error) {
      // Fallback to mock login for demo
      if (credentials.email === 'admin@shayri.com' && credentials.password === 'admin123') {
        const mockUser = {
          id: 1,
          name: 'आरिज़ खान',
          email: 'admin@shayri.com',
          role: 'admin',
          status: 'active',
          permissions: ['read', 'write', 'delete', 'manage_users']
        };
        
        setUser(mockUser);
        localStorage.setItem('authToken', 'mock-token');
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        return { success: true };
      } else if (credentials.email === 'avinash@example.com' && credentials.password === 'avinash123') {
        const mockUser = {
          id: 11,
          name: 'Avinash',
          email: 'avinash@example.com',
          role: 'user',
          status: 'active',
          permissions: ['read', 'write']
        };
        
        setUser(mockUser);
        localStorage.setItem('authToken', 'mock-token');
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        return { success: true };
      }
      
      return { success: false, error: 'Invalid credentials' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  // Check if user has permission
  const hasPermission = (permission) => {
    if (!user) return false;
    return user.permissions?.includes(permission) || false;
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    loading,
    theme,
    login,
    logout,
    toggleTheme,
    hasPermission,
    isAdmin,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
