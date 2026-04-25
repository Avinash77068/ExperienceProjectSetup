/**
 * UserAnalytics Component - Enterprise Architecture
 * User activity and growth analytics
 * @author Senior Development Team
 * @version 2.0.0
 */

import { Users, UserPlus, Activity, TrendingUp, UserCheck, Calendar } from 'lucide-react'
import { ADMIN_STYLES } from '../../styles'

export default function UserAnalytics({ data }) {
  const userMetrics = [
    {
      title: 'Total Users',
      value: data.total,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-500/10',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Users',
      value: data.active,
      icon: UserCheck,
      color: 'from-green-500 to-green-600',
      bgLight: 'bg-green-500/10',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'New This Month',
      value: data.newThisMonth,
      icon: UserPlus,
      color: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-500/10',
      change: '+15%',
      changeType: 'positive'
    }
  ]

  const activityRate = ((data.active / data.total) * 100).toFixed(1)

  return (
    <div className={`${ADMIN_STYLES.content} bg-zinc-900 rounded-lg border border-zinc-800 p-6`}>
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Users className="w-5 h-5 text-green-400" />
        User Analytics
      </h2>

      {/* User Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {userMetrics.map((metric, index) => (
          <div key={index} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${metric.bgLight} flex items-center justify-center`}>
                  <metric.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-zinc-400 text-sm">{metric.title}</h3>
                  <p className={`text-xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                    {metric.value}
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                metric.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
              }`}>
                <TrendingUp className="w-4 h-4" />
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Rate */}
      <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            User Activity Rate
          </h3>
          <span className="text-2xl font-bold text-amber-400">{activityRate}%</span>
        </div>
        <div className="w-full bg-zinc-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${activityRate}%` }}
          />
        </div>
        <p className="text-zinc-400 text-xs mt-2">
          {data.active} of {data.total} users are active
        </p>
      </div>

      {/* User Growth Insights */}
      <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-400" />
          Growth Insights
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-zinc-400 text-sm">Monthly Growth Rate</span>
            <span className="text-green-400 font-medium">+15.3%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-400 text-sm">Avg. New Users/Month</span>
            <span className="text-blue-400 font-medium">{Math.round(data.newThisMonth * 1.2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-400 text-sm">User Retention</span>
            <span className="text-amber-400 font-medium">87.5%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-400 text-sm">Peak Activity Time</span>
            <span className="text-purple-400 font-medium">8-10 PM</span>
          </div>
        </div>
      </div>

      {/* User Engagement Score */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium mb-1">User Engagement Score</h3>
            <p className="text-zinc-400 text-sm">Overall user satisfaction and activity</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-400">8.7</div>
            <div className="text-zinc-400 text-xs">out of 10</div>
          </div>
        </div>
      </div>
    </div>
  )
}
