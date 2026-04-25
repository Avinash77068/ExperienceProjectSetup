/**
 * TimeSeriesChart Component - Enterprise Architecture
 * Time series chart showing trends over time
 * @author Senior Development Team
 * @version 2.0.0
 */

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { TrendingUp, Calendar, BarChart3, Activity } from 'lucide-react'
import { ADMIN_STYLES } from '../../styles'

export default function TimeSeriesChart({ data }) {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-zinc-300">{entry.name}:</span>
              <span className="text-white font-medium">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className={`${ADMIN_STYLES.content} bg-zinc-900 rounded-lg border border-zinc-800 p-6`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-400" />
          Monthly Trends
        </h2>
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <Calendar className="w-4 h-4" />
          Last 6 months
        </div>
      </div>

      {/* Chart Tabs */}
      <div className="flex gap-2 mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">
          Posts & Views
        </button>
        <button className="px-4 py-2 bg-zinc-800 text-zinc-400 rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors">
          Engagement
        </button>
        <button className="px-4 py-2 bg-zinc-800 text-zinc-400 rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors">
          Growth
        </button>
      </div>

      {/* Main Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="posts" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="views" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ fill: '#10B981', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Secondary Chart - Shares */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="shares" 
              fill="#F59E0B"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-zinc-400 text-sm">Avg Posts/Month</span>
          </div>
          <p className="text-xl font-bold text-white">
            {Math.round(data.reduce((acc, d) => acc + d.posts, 0) / data.length)}
          </p>
        </div>
        <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-zinc-400 text-sm">Growth Rate</span>
          </div>
          <p className="text-xl font-bold text-green-400">+23.5%</p>
        </div>
        <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span className="text-zinc-400 text-sm">Peak Month</span>
          </div>
          <p className="text-xl font-bold text-white">
            {data.reduce((max, d) => d.posts > max.posts ? d : max).month}
          </p>
        </div>
      </div>
    </div>
  )
}
