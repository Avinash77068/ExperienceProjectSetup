/**
 * EngagementMetrics Component - Enterprise Architecture
 * Engagement metrics with visual indicators
 * @author Senior Development Team
 * @version 2.0.0
 */

import { Heart, Share2, Eye, TrendingUp, Target, Activity } from 'lucide-react'
import { ADMIN_STYLES } from '../../styles'

export default function EngagementMetrics({ data }) {
  const engagementCards = [
    {
      title: 'Total Views',
      value: data.views.toLocaleString(),
      icon: Eye,
      color: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-500/10',
      description: 'Content visibility across platform'
    },
    {
      title: 'Total Shares',
      value: data.shares.toLocaleString(),
      icon: Share2,
      color: 'from-green-500 to-green-600',
      bgLight: 'bg-green-500/10',
      description: 'Social sharing interactions'
    },
    {
      title: 'Estimated Likes',
      value: data.likes.toLocaleString(),
      icon: Heart,
      color: 'from-red-500 to-red-600',
      bgLight: 'bg-red-500/10',
      description: 'User engagement and appreciation'
    },
    {
      title: 'Engagement Rate',
      value: `${data.engagementRate}%`,
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-500/10',
      description: 'Share-to-view ratio'
    },
    {
      title: 'Avg Views per Shayri',
      value: data.avgViewsPerShayri.toLocaleString(),
      icon: TrendingUp,
      color: 'from-amber-500 to-amber-600',
      bgLight: 'bg-amber-500/10',
      description: 'Average content performance'
    },
    {
      title: 'Avg Shares per Shayri',
      value: data.avgSharesPerShayri.toLocaleString(),
      icon: Activity,
      color: 'from-cyan-500 to-cyan-600',
      bgLight: 'bg-cyan-500/10',
      description: 'Average sharing behavior'
    }
  ]

  return (
    <div className={`${ADMIN_STYLES.content} bg-zinc-900 rounded-lg border border-zinc-800 p-6`}>
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-amber-400" />
        Engagement Metrics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {engagementCards.map((card, index) => (
          <div key={index} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-zinc-600 transition-colors">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg ${card.bgLight} flex items-center justify-center flex-shrink-0`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm mb-1">{card.title}</h3>
                <p className={`text-lg font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                  {card.value}
                </p>
                <p className="text-zinc-400 text-xs mt-1">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Summary */}
      <div className="mt-6 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium mb-1">Overall Engagement Health</h3>
            <p className="text-zinc-400 text-sm">Platform engagement performance metrics</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">Excellent</div>
            <div className="text-zinc-400 text-sm">Above target</div>
          </div>
        </div>
        
        {/* Progress bars */}
        <div className="mt-4 space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-400">View Rate</span>
              <span className="text-green-400">92%</span>
            </div>
            <div className="w-full bg-zinc-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-400">Share Rate</span>
              <span className="text-amber-400">78%</span>
            </div>
            <div className="w-full bg-zinc-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full" style={{ width: '78%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
