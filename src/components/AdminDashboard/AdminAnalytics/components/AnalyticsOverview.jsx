/**
 * AnalyticsOverview Component - Enterprise Architecture
 * Overview cards displaying key metrics
 * @author Senior Development Team
 * @version 2.0.0
 */

import { FileText, Users, Eye, Share2, Star, TrendingUp } from 'lucide-react'
import { ADMIN_STYLES } from '../../styles'

export default function AnalyticsOverview({ data }) {
  const overviewCards = [
    {
      title: 'Total Shayris',
      value: data.totalShayris,
      icon: FileText,
      color: 'border-l-blue-400',
      bgGradient: 'from-blue-500/10 to-blue-600/10',
      trend: '+12%',
      trendColor: 'text-blue-400'
    },
    {
      title: 'Total Users',
      value: data.totalUsers,
      icon: Users,
      color: 'border-l-green-400',
      bgGradient: 'from-green-500/10 to-green-600/10',
      trend: '+8%',
      trendColor: 'text-green-400'
    },
    {
      title: 'Total Views',
      value: data.totalViews.toLocaleString(),
      icon: Eye,
      color: 'border-l-purple-400',
      bgGradient: 'from-purple-500/10 to-purple-600/10',
      trend: '+23%',
      trendColor: 'text-purple-400'
    },
    {
      title: 'Total Shares',
      value: data.totalShares.toLocaleString(),
      icon: Share2,
      color: 'border-l-amber-400',
      bgGradient: 'from-amber-500/10 to-amber-600/10',
      trend: '+15%',
      trendColor: 'text-amber-400'
    },
    {
      title: 'Featured Content',
      value: data.featuredShayris,
      icon: Star,
      color: 'border-l-pink-400',
      bgGradient: 'from-pink-500/10 to-pink-600/10',
      trend: '+5%',
      trendColor: 'text-pink-400'
    },
    {
      title: 'Growth Rate',
      value: '18.5%',
      icon: TrendingUp,
      color: 'border-l-cyan-400',
      bgGradient: 'from-cyan-500/10 to-cyan-600/10',
      trend: '+3%',
      trendColor: 'text-cyan-400'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {overviewCards.map((card, index) => (
        <div key={index} className={`${ADMIN_STYLES.statCard} ${card.color} ${card.bgGradient} p-6 relative overflow-hidden group`}>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-10 -mt-10" />
          
          <div className="relative z-10">
            {/* Icon */}
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.bgGradient} flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              {card.trend && (
                <div className={`flex items-center gap-1 text-sm font-medium ${card.trendColor}`}>
                  <TrendingUp className="w-4 h-4" />
                  {card.trend}
                </div>
              )}
            </div>
            
            {/* Content */}
            <div>
              <h3 className="text-zinc-400 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-2xl font-bold text-white">{card.value}</p>
            </div>
          </div>

          {/* Hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      ))}
    </div>
  )
}
