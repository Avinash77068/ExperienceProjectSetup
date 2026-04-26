import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

// Query keys
export const shayriKeys = {
  all: ['shayri'],
  lists: () => [...shayriKeys.all, 'list'],
  list: (filters) => [...shayriKeys.lists(), filters],
  details: () => [...shayriKeys.all, 'detail'],
  detail: (id) => [...shayriKeys.details(), id],
};

// Get all shayri
export const useShayri = (filters = {}) => {
  return useQuery({
    queryKey: shayriKeys.list(filters),
    queryFn: () => api.shayri.getAll(filters),
    select: (data) => data.data || [],
    enabled: true,
  });
};

// Get shayri by ID
export const useShayriById = (id) => {
  return useQuery({
    queryKey: shayriKeys.detail(id),
    queryFn: () => api.shayri.getById(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

// Create shayri
export const useCreateShayri = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => api.shayri.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shayriKeys.lists() });
    },
  });
};

// Update shayri
export const useUpdateShayri = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => api.shayri.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: shayriKeys.lists() });
      queryClient.invalidateQueries({ queryKey: shayriKeys.detail(id) });
    },
  });
};

// Delete shayri
export const useDeleteShayri = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => api.shayri.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shayriKeys.lists() });
    },
  });
};
