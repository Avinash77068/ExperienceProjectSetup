/**
 * AdminAnalytics Component - Enterprise Architecture
 * Comprehensive analytics dashboard with charts and statistics
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useMemo } from 'react'
import { ADMIN_STYLES } from '../styles'
import { useShayriData } from '../../../hooks/useShayriData'

// ====================
// ANALYTICS COMPONENTS
// ====================
import AnalyticsOverview from './components/AnalyticsOverview'
import EngagementMetrics from './components/EngagementMetrics'
import UserAnalytics from './components/UserAnalytics'
import ContentAnalytics from './components/ContentAnalytics'
import TimeSeriesChart from './components/TimeSeriesChart'

export default function AdminAnalytics() {
  // Use shayri data hook for local storage data
  const shayriData = useShayriData()
  
  // Calculate comprehensive analytics data
  const analyticsData = useMemo(() => {
    const shayriStats = shayriData.statistics
    const allShayris = shayriData.posts
    const allUsers = [] // Users will be extracted from posts

    // Engagement metrics
    const totalEngagement = allShayris.reduce((acc, shayri) => ({
      views: acc.views + (shayri.metadata?.views || 0),
      shares: acc.shares + (shayri.metadata?.shares || 0),
      likes: acc.likes + Math.floor((shayri.metadata?.views || 0) * 0.1) // Estimated likes
    }), { views: 0, shares: 0, likes: 0 })

    // Category distribution
    const categoryDistribution = Object.entries(shayriStats.byCategory).map(([category, count]) => ({
      category,
      count,
      percentage: ((count / shayriStats.total) * 100).toFixed(1)
    }))

    // Monthly trends (last 6 months)
    const monthlyTrends = generateMonthlyTrends(allShayris)

    // Top performing content
    const topShayris = allShayris
      .sort((a, b) => (b.metadata?.views || 0) - (a.metadata?.views || 0))
      .slice(0, 5)

    // User activity metrics
    const userActivity = {
      active: userStats.active,
      total: userStats.total,
      newThisMonth: allUsers.filter(user => {
        const joinDate = new Date(user.joinDate)
        const now = new Date()
        return joinDate.getMonth() === now.getMonth() && 
               joinDate.getFullYear() === now.getFullYear()
      }).length
    }

    return {
      overview: {
        totalShayris: shayriStats.total,
        totalUsers: userStats.total,
        totalViews: totalEngagement.views,
        totalShares: totalEngagement.shares,
        featuredShayris: shayriStats.featured
      },
      engagement: {
        ...totalEngagement,
        avgViewsPerShayri: Math.round(totalEngagement.views / shayriStats.total),
        avgSharesPerShayri: Math.round(totalEngagement.shares / shayriStats.total),
        engagementRate: ((totalEngagement.shares / totalEngagement.views) * 100).toFixed(2)
      },
      categories: categoryDistribution,
      trends: monthlyTrends,
      topContent: topShayris,
      userMetrics: userActivity
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={ADMIN_STYLES.title}>Analytics Dashboard</h1>
        <p className={ADMIN_STYLES.subtitle}>Comprehensive insights and performance metrics</p>
      </div>

      {/* Overview Cards */}
      <AnalyticsOverview data={analyticsData.overview} />

      {/* Engagement Metrics */}
      <EngagementMetrics data={analyticsData.engagement} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Analytics */}
        <ContentAnalytics 
          categories={analyticsData.categories}
          topContent={analyticsData.topContent}
        />

        {/* User Analytics */}
        <UserAnalytics data={analyticsData.userMetrics} />
      </div>

      {/* Time Series Chart */}
      <TimeSeriesChart data={analyticsData.trends} />
    </div>
  )
}

// Helper function to generate monthly trends
function generateMonthlyTrends(shayris) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  const now = new Date()
  const trends = []

  for (let i = 5; i >= 0; i--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthShayris = shayris.filter(shayri => {
      const shayriDate = new Date(shayri.date)
      return shayriDate.getMonth() === monthDate.getMonth() && 
             shayriDate.getFullYear() === monthDate.getFullYear()
    })

    trends.push({
      month: months[monthDate.getMonth()],
      posts: monthShayris.length,
      views: monthShayris.reduce((acc, shayri) => acc + (shayri.metadata?.views || 0), 0),
      shares: monthShayris.reduce((acc, shayri) => acc + (shayri.metadata?.shares || 0), 0)
    })
  }

  return trends
}
