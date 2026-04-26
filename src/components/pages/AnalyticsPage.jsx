import React from 'react';
import { useAnalyticsOverview, useAnalyticsEngagement, useAnalyticsTrends } from '../../hooks/useAnalytics';
import { formatNumber } from '../../utils/helpers';
import Loading from '../ui/Loading';

const AnalyticsPage = () => {
  const { data: overview, isLoading: overviewLoading, error: overviewError } = useAnalyticsOverview();
  const { data: engagement, isLoading: engagementLoading } = useAnalyticsEngagement();
  const { data: trends, isLoading: trendsLoading } = useAnalyticsTrends();

  if (overviewLoading || engagementLoading || trendsLoading) {
    return <Loading text="Loading analytics..." />;
  }

  if (overviewError) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-xl mb-4">Error loading analytics</div>
        <p className="text-gray-600 mb-4">{overviewError.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive insights and performance metrics</p>
      </div>

      {/* Overview Cards */}
      {overview && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📝</span>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{formatNumber(overview.totalShayris)}</div>
                <div className="text-sm text-gray-600">Total Shayris</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-bold">👥</span>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{formatNumber(overview.totalUsers)}</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-bold">👁️</span>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{formatNumber(overview.totalViews)}</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-bold">🔄</span>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{formatNumber(overview.totalShares)}</div>
                <div className="text-sm text-gray-600">Total Shares</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Engagement Metrics */}
      {engagement && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Engagement Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-2xl font-bold text-blue-600">{formatNumber(engagement.avgViewsPerShayri)}</div>
              <div className="text-sm text-gray-600">Avg Views per Shayri</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{formatNumber(engagement.avgSharesPerShayri)}</div>
              <div className="text-sm text-gray-600">Avg Shares per Shayri</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{engagement.engagementRate}%</div>
              <div className="text-sm text-gray-600">Engagement Rate</div>
            </div>
          </div>
        </div>
      )}

      {/* Category Distribution */}
      {overview?.categories && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Category Distribution</h2>
          <div className="space-y-4">
            {overview.categories.map((category) => (
              <div key={category.category} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                  <span className="text-sm font-medium text-gray-900">{category.category}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-4">{category.count} shayris</span>
                  <span className="text-sm font-medium text-gray-900">{category.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Content */}
      {overview?.topContent && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Performing Shayris</h2>
          <div className="space-y-4">
            {overview.topContent.map((shayri, index) => (
              <div key={shayri.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{shayri.category}</div>
                    <div className="text-sm text-gray-600">By {shayri.author}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{formatNumber(shayri.metadata?.views || 0)} views</div>
                  <div className="text-sm text-gray-600">{formatNumber(shayri.metadata?.shares || 0)} shares</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
