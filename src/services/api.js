// Advanced API service for React Query
const API_BASE_URL = 'http://localhost:5001/api';

// Base fetch function with error handling
const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// API endpoints
export const api = {
  // Shayri endpoints
  shayri: {
    getAll: (params = {}) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.append(key, value);
      });
      return apiFetch(`/shayri?${searchParams.toString()}`);
    },
    getById: (id) => apiFetch(`/shayri/${id}`),
    create: (data) => apiFetch('/shayri', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id, data) => apiFetch(`/shayri/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id) => apiFetch(`/shayri/${id}`, {
      method: 'DELETE',
    }),
  },

  // User endpoints
  users: {
    getAll: (params = {}) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.append(key, value);
      });
      return apiFetch(`/users?${searchParams.toString()}`);
    },
    getById: (id) => apiFetch(`/users/${id}`),
    getStats: () => apiFetch('/users/stats'),
    create: (data) => apiFetch('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id, data) => apiFetch(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id) => apiFetch(`/users/${id}`, {
      method: 'DELETE',
    }),
  },

  // Analytics endpoints
  analytics: {
    getOverview: () => apiFetch('/analytics'),
    getEngagement: () => apiFetch('/analytics/engagement'),
    getTrends: () => apiFetch('/analytics/trends'),
  },

  // Health check
  health: () => fetch('http://localhost:5001/health').then(res => res.json()),
};

export default api;
