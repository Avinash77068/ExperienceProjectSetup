import React, { useState, useMemo } from 'react';
import { useShayri } from '../../hooks/useShayri';
import { useAnalyticsOverview } from '../../hooks/useAnalytics';
import { useUsers, useUserStats } from '../../hooks/useUsers';
import { formatNumber, truncateText, getStatusColor, getRoleColor } from '../../utils/helpers';
import Loading from '../ui/Loading';
import Button from '../ui/Button';

// Advanced Card Component
const MetricCard = ({ title, value, icon, trend, color = "blue" }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </p>
          )}
        </div>
        <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center text-white text-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Shayri Card Component
const ShayriCard = ({ shayri }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-600">
        <img 
          src={shayri.imageUrl} 
          alt={shayri.category}
          className="w-full h-full object-cover opacity-80"
        />
        {shayri.metadata.featured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            ⭐ Featured
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
            {shayri.category}
          </span>
          <span className="text-xs text-gray-500">{shayri.date}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 whitespace-pre-line">
          {truncateText(shayri.text, 100)}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span className="font-medium">By: {shayri.author}</span>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              👁️ {formatNumber(shayri.metadata.views)}
            </span>
            <span className="flex items-center gap-1">
              🔄 {formatNumber(shayri.metadata.shares)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <span className="text-xs text-gray-600">{shayri.user.name}</span>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full bg-${getRoleColor(shayri.user.role)}-100 text-${getRoleColor(shayri.user.role)}-800`}>
            {shayri.user.role}
          </span>
        </div>
      </div>
    </div>
  );
};

// Category Chart Component
const CategoryChart = ({ categories }) => {
  const maxCount = Math.max(...categories.map(cat => cat.count));
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.category} className="flex items-center">
            <div className="w-20 text-sm font-medium text-gray-700">{category.category}</div>
            <div className="flex-1 mx-3">
              <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(category.count / maxCount) * 100}%` }}
                >
                  <span className="text-xs text-white font-medium flex items-center justify-center h-full">
                    {category.count}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-12 text-sm text-gray-600 text-right">{category.percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Top Content Component
const TopContent = ({ content }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Content</h3>
      <div className="space-y-4">
        {content.map((item, index) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{item.category}</div>
                <div className="text-xs text-gray-600">By {item.author}</div>
                <div className="text-xs text-gray-500 mt-1">{truncateText(item.text, 50)}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">{formatNumber(item.metadata.views)}</div>
              <div className="text-xs text-gray-500">views</div>
              <div className="text-xs text-blue-600 mt-1">{formatNumber(item.metadata.shares)} shares</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Dashboard Component
const InternalDashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Real API calls using React Query hooks
  const { data: shayriData, isLoading: shayriLoading, error: shayriError } = useShayri();
  const { data: analyticsData, isLoading: analyticsLoading, error: analyticsError } = useAnalyticsOverview();
  const { data: usersData, isLoading: usersLoading, error: usersError } = useUsers();
  const { data: userStatsData, isLoading: statsLoading } = useUserStats();

  // Filter shayri based on search and category
  const filteredShayri = useMemo(() => {
    if (!shayriData) return [];
    
    return shayriData.filter(shayri => {
      const matchesSearch = searchTerm === '' || 
        shayri.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shayri.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || shayri.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [shayriData, searchTerm, selectedCategory]);

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Loading State */}
            {(shayriLoading || analyticsLoading) && (
              <div className="flex justify-center py-12">
                <Loading text="Loading dashboard data..." />
              </div>
            )}

            {/* Error State */}
            {(shayriError || analyticsError) && (
              <div className="text-center py-12">
                <div className="text-red-500 text-xl mb-4">Error loading dashboard</div>
                <p className="text-gray-600 mb-4">{shayriError?.message || analyticsError?.message}</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </div>
            )}

            {/* Dashboard Content */}
            {!shayriLoading && !analyticsLoading && !shayriError && !analyticsError && (
              <>
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <MetricCard 
                    title="Total Shayris" 
                    value={analyticsData?.overview?.totalShayris || 0} 
                    icon="📝" 
                    color="blue"
                    trend={12}
                  />
                  <MetricCard 
                    title="Total Users" 
                    value={analyticsData?.overview?.totalUsers || 0} 
                    icon="👥" 
                    color="green"
                    trend={8}
                  />
                  <MetricCard 
                    title="Total Views" 
                    value={formatNumber(analyticsData?.overview?.totalViews || 0)} 
                    icon="👁️" 
                    color="purple"
                    trend={15}
                  />
                  <MetricCard 
                    title="Total Shares" 
                    value={formatNumber(analyticsData?.overview?.totalShares || 0)} 
                    icon="🔄" 
                    color="yellow"
                    trend={-3}
                  />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CategoryChart categories={analyticsData?.categories || []} />
                  <TopContent content={analyticsData?.topContent || []} />
                </div>

                {/* Recent Shayris */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Shayris</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredShayri.slice(0, 6).map(shayri => (
                      <ShayriCard key={shayri.id} shayri={shayri} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case 'shayri':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">All Shayris</h3>
              
              {/* Loading State */}
              {shayriLoading && (
                <div className="flex justify-center py-12">
                  <Loading text="Loading shayris..." />
                </div>
              )}

              {/* Error State */}
              {shayriError && (
                <div className="text-center py-12">
                  <div className="text-red-500 text-xl mb-4">Error loading shayris</div>
                  <p className="text-gray-600 mb-4">{shayriError.message}</p>
                  <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
              )}

              {/* Content */}
              {!shayriLoading && !shayriError && (
                <>
                  {/* Filters */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <input
                      type="text"
                      placeholder="Search shayris..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      <option value="Ishq">Ishq</option>
                      <option value="Dard">Dard</option>
                      <option value="Zindagi">Zindagi</option>
                      <option value="Khushi">Khushi</option>
                      <option value="Judai">Judai</option>
                    </select>
                    
                    <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
                      Clear Filters
                    </Button>
                  </div>

                  {/* Shayri Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredShayri.map(shayri => (
                      <ShayriCard key={shayri.id} shayri={shayri} />
                    ))}
                  </div>

                  {filteredShayri.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-gray-500 text-xl mb-4">No shayris found</div>
                      <p className="text-gray-600">Try adjusting your filters</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Overview</h3>
              
              {/* Loading State */}
              {analyticsLoading && (
                <div className="flex justify-center py-12">
                  <Loading text="Loading analytics..." />
                </div>
              )}

              {/* Error State */}
              {analyticsError && (
                <div className="text-center py-12">
                  <div className="text-red-500 text-xl mb-4">Error loading analytics</div>
                  <p className="text-gray-600 mb-4">{analyticsError.message}</p>
                  <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
              )}

              {/* Content */}
              {!analyticsLoading && !analyticsError && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                      <div className="text-sm text-blue-600 font-medium">Engagement Rate</div>
                      <div className="text-2xl font-bold text-blue-900">{analyticsData?.engagement?.engagementRate || 0}%</div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                      <div className="text-sm text-green-600 font-medium">Avg Views per Shayri</div>
                      <div className="text-2xl font-bold text-green-900">{formatNumber(analyticsData?.engagement?.avgViewsPerShayri || 0)}</div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                      <div className="text-sm text-purple-600 font-medium">Avg Shares per Shayri</div>
                      <div className="text-2xl font-bold text-purple-900">{formatNumber(analyticsData?.engagement?.avgSharesPerShayri || 0)}</div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {!analyticsLoading && !analyticsError && (
              <>
                <CategoryChart categories={analyticsData?.categories || []} />
                <TopContent content={analyticsData?.topContent || []} />
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Internal Dashboard</h1>
              <p className="text-gray-600">Comprehensive analytics and content management</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                🟢 Live Data
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {filteredShayri.length} Shayris
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'shayri', name: 'Shayri', icon: '📝' },
              { id: 'analytics', name: 'Analytics', icon: '📈' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeView === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default InternalDashboard;
