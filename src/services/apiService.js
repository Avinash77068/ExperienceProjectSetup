/**
 * API Service - Frontend Backend Integration
 * Handles all API calls to the backend server
 * @author Senior Development Team
 * @version 1.0.0
 */

// API Base URL
const API_BASE_URL = 'http://localhost:5001/api';

// ====================
// SIMPLE API CALL FUNCTION
// ====================
const apiCall = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// ====================
// POETRY API SERVICES
// ====================
export const poetryAPI = {
  // Get all shayri with optional filtering
  getAllShayri: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.category && filters.category !== 'All') {
      params.append('category', filters.category);
    }
    if (filters.author) {
      params.append('author', filters.author);
    }
    if (filters.featured) {
      params.append('featured', 'true');
    }
    if (filters.page) {
      params.append('page', filters.page);
    }
    if (filters.limit) {
      params.append('limit', filters.limit);
    }

    const endpoint = params.toString() ? `/shayri?${params.toString()}` : '/shayri';
    return await apiCall(endpoint);
  },

  // Get shayri by ID
  getShayriById: async (id) => {
    return await apiCall(`/shayri/${id}`);
  },

  // Get shayri by category
  getShayriByCategory: async (category) => {
    return await apiCall(`/shayri/category/${category}`);
  },

  // Get featured shayri
  getFeaturedShayri: async () => {
    return await apiCall('/shayri/featured');
  },

  // Search shayri
  searchShayri: async (query) => {
    return await apiCall(`/shayri/search?q=${encodeURIComponent(query)}`);
  },

  // Get poetry statistics
  getPoetryStats: async () => {
    return await apiCall('/shayri/stats');
  },
};

// ====================
// USER API SERVICES
// ====================
export const userAPI = {
  // Get all users
  getAllUsers: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.role) {
      params.append('role', filters.role);
    }
    if (filters.status) {
      params.append('status', filters.status);
    }
    if (filters.page) {
      params.append('page', filters.page);
    }
    if (filters.limit) {
      params.append('limit', filters.limit);
    }

    const endpoint = params.toString() ? `/users?${params.toString()}` : '/users';
    return await apiCall(endpoint);
  },

  // Get user by ID
  getUserById: async (id) => {
    return await apiCall(`/users/${id}`);
  },

  // Get all users
  getAllUsers: async () => {
    return await apiCall('/users');
  },

  // Get user statistics
  getUserStats: async () => {
    return await apiCall('/users/stats');
  },

  // Search users
  searchUsers: async (query) => {
    return await apiCall(`/users/search?q=${encodeURIComponent(query)}`);
  },
};

// ====================
// ANALYTICS API SERVICES
// ====================
export const analyticsAPI = {
  // Get comprehensive analytics
  getAnalytics: async () => {
    return await apiCall('/analytics');
  },
};

// ====================
// CONFIGURATION API SERVICES
// ====================
export const configAPI = {
  // Get available categories
  getCategories: async () => {
    return await apiCall('/config/categories');
  },
};

// ====================
// HEALTH CHECK
// ====================
export const healthAPI = {
  // Check server health
  checkHealth: async () => {
    try {
      const response = await fetch('http://localhost:5001/health');
      return await handleResponse(response);
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },
};


// ====================
// UNIFIED API SERVICE
// ====================
export const apiService = {
  // Poetry methods
  async getShayri(filters = {}) {
    return await poetryAPI.getAllShayri(filters);
  },

  async getShayriById(id) {
    return await poetryAPI.getShayriById(id);
  },

  // User methods
  async getAllUsers(filters = {}) {
    return await userAPI.getAllUsers(filters);
  },

  async getUserStats() {
    return await userAPI.getUserStats();
  },

  async getAnalytics() {
    return await analyticsAPI.getAnalytics();
  },

  // Health check
  async checkConnection() {
    try {
      const response = await fetch('http://localhost:5001/health');
      const data = await response.json();
      return data;
    } catch (error) {
      return {
        status: 'ERROR',
        message: 'Backend server not available',
      };
    }
  },
};

export default apiService;
