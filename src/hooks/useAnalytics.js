import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

// Query keys
export const analyticsKeys = {
  all: ['analytics'],
  overview: () => [...analyticsKeys.all, 'overview'],
  engagement: () => [...analyticsKeys.all, 'engagement'],
  trends: () => [...analyticsKeys.all, 'trends'],
};

// Get analytics overview
export const useAnalyticsOverview = () => {
  return useQuery({
    queryKey: analyticsKeys.overview(),
    queryFn: () => api.analytics.getOverview(),
    select: (data) => data.data,
    enabled: true,
  });
};

// Get engagement analytics
export const useAnalyticsEngagement = () => {
  return useQuery({
    queryKey: analyticsKeys.engagement(),
    queryFn: () => api.analytics.getEngagement(),
    select: (data) => data.data,
    enabled: true,
  });
};

// Get trends analytics
export const useAnalyticsTrends = () => {
  return useQuery({
    queryKey: analyticsKeys.trends(),
    queryFn: () => api.analytics.getTrends(),
    select: (data) => data.data,
    enabled: true,
  });
};
