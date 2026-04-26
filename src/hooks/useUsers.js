import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

// Query keys
export const userKeys = {
  all: ['users'],
  lists: () => [...userKeys.all, 'list'],
  list: (filters) => [...userKeys.lists(), filters],
  details: () => [...userKeys.all, 'detail'],
  detail: (id) => [...userKeys.details(), id],
  stats: () => [...userKeys.all, 'stats'],
};

// Get all users
export const useUsers = (filters = {}) => {
  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: () => api.users.getAll(filters),
    select: (data) => data.data || [],
    enabled: true,
  });
};

// Get user by ID
export const useUserById = (id) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => api.users.getById(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

// Get user stats
export const useUserStats = () => {
  return useQuery({
    queryKey: userKeys.stats(),
    queryFn: () => api.users.getStats(),
    select: (data) => data.data,
    enabled: true,
  });
};

// Create user
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => api.users.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
  });
};

// Update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => api.users.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
  });
};

// Delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => api.users.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
  });
};
