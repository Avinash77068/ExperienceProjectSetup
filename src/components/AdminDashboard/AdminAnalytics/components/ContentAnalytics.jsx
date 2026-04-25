/**
 * ContentAnalytics Component - Enterprise Architecture
 * Content performance and category analytics
 * @author Senior Development Team
 * @version 2.0.0
 */

import { PieChart, BarChart3, TrendingUp, Award, FileText } from 'lucide-react'
import { ADMIN_STYLES } from '../../styles'

export default function ContentAnalytics({ categories, topContent }) {
  return (
    <div className={`${ADMIN_STYLES.content} bg-zinc-900 rounded-lg border border-zinc-800 p-6`}>
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-blue-400" />
        Content Analytics
      </h2>

      {/* Category Distribution */}
      <div className="mb-6">
        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
          <PieChart className="w-4 h-4 text-amber-400" />
          Category Distribution
        </h3>
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getCategoryColor(category.category)}`} />
                <span className="text-zinc-300 text-sm">{category.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white font-medium">{category.count}</span>
                <span className="text-zinc-400 text-sm">{category.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Content */}
      <div>
        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-green-400" />
          Top Performing Shayris
        </h3>
        <div className="space-y-3">
          {topContent.map((shayri, index) => (
            <div key={shayri.id} className="bg-zinc-800 rounded-lg p-3 border border-zinc-700">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-amber-400 bg-amber-400/20 px-2 py-1 rounded">
                      #{index + 1}
                    </span>
                    <span className="text-xs text-zinc-400">{shayri.category}</span>
                  </div>
                  <p className="text-white text-sm font-medium mb-1 line-clamp-2">
                    {shayri.text.split('\n')[0]}
                  </p>
                  <p className="text-zinc-400 text-xs">by {shayri.author}</p>
                </div>
                <div className="text-right ml-3">
                  <div className="flex items-center gap-1 text-blue-400 text-sm">
                    <TrendingUp className="w-3 h-3" />
                    {shayri.metadata?.views?.toLocaleString() || 0}
                  </div>
                  <p className="text-zinc-400 text-xs">views</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Insights */}
      <div className="mt-6 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
        <h3 className="text-white font-medium mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-400" />
          Content Insights
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-zinc-400 text-xs mb-1">Most Popular Category</p>
            <p className="text-white font-medium">{categories[0]?.category || 'N/A'}</p>
          </div>
          <div>
            <p className="text-zinc-400 text-xs mb-1">Avg Views per Post</p>
            <p className="text-white font-medium">
              {Math.round(topContent.reduce((acc, s) => acc + (s.metadata?.views || 0), 0) / topContent.length)}
            </p>
          </div>
          <div>
            <p className="text-zinc-400 text-xs mb-1">Content Diversity</p>
            <p className="text-white font-medium">{categories.length} Categories</p>
          </div>
          <div>
            <p className="text-zinc-400 text-xs mb-1">Featured Content</p>
            <p className="text-white font-medium">
              {topContent.filter(s => s.metadata?.featured).length} Posts
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to get category colors
function getCategoryColor(category) {
  const colors = {
    'Ishq': 'from-pink-500 to-red-500',
    'Dard': 'from-blue-500 to-indigo-500',
    'Zindagi': 'from-green-500 to-emerald-500',
    'Khushi': 'from-yellow-500 to-amber-500',
    'Judai': 'from-purple-500 to-pink-500',
    'Motivational': 'from-cyan-500 to-blue-500',
    'Heartbreak': 'from-red-500 to-orange-500'
  }
  return colors[category] || 'from-gray-500 to-gray-600'
}
