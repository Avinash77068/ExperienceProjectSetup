/**
 * AdminOverview Component - Enterprise Architecture
 * Overview dashboard with statistics and charts
 * @author Senior Development Team
 * @version 2.0.0
 */

import { 
  FileText, 
  Users, 
  TrendingUp, 
  Heart, 
  Eye,
  Calendar,
  BarChart3 
} from 'lucide-react'
import { ADMIN_STYLES } from './styles'

export default function AdminOverview({ statistics, posts }) {
  const recentPosts = posts.slice(0, 5)
  const thisMonthPosts = posts.filter(post => {
    const postDate = new Date(post.date)
    const now = new Date()
    return postDate.getMonth() === now.getMonth() && 
           postDate.getFullYear() === now.getFullYear()
  })

  const topCategories = Object.entries(statistics.byCategory || {})
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`${ADMIN_STYLES.statCard} border-l-4 border-l-amber-400`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={ADMIN_STYLES.statValue}>{statistics.total}</div>
              <div className={ADMIN_STYLES.statLabel}>Total Shayris</div>
            </div>
            <div className="p-3 bg-amber-400/10 rounded-lg">
              <FileText className="w-6 h-6 text-amber-200" />
            </div>
          </div>
          <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +{thisMonthPosts.length} this month
          </div>
        </div>

        <div className={`${ADMIN_STYLES.statCard} border-l-4 border-l-blue-400`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={ADMIN_STYLES.statValue}>{statistics.categories}</div>
              <div className={ADMIN_STYLES.statLabel}>Categories</div>
            </div>
            <div className="p-3 bg-blue-400/10 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-200" />
            </div>
          </div>
        </div>

        <div className={`${ADMIN_STYLES.statCard} border-l-4 border-l-red-400`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={ADMIN_STYLES.statValue}>{statistics.totalLikes}</div>
              <div className={ADMIN_STYLES.statLabel}>Total Likes</div>
            </div>
            <div className="p-3 bg-red-400/10 rounded-lg">
              <Heart className="w-6 h-6 text-red-200" />
            </div>
          </div>
        </div>

        <div className={`${ADMIN_STYLES.statCard} border-l-4 border-l-green-400`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={ADMIN_STYLES.statValue}>{thisMonthPosts.length}</div>
              <div className={ADMIN_STYLES.statLabel}>This Month</div>
            </div>
            <div className="p-3 bg-green-400/10 rounded-lg">
              <Calendar className="w-6 h-6 text-green-200" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className={ADMIN_STYLES.statCard}>
          <h3 className="text-lg font-semibold text-amber-200 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Recent Shayris
          </h3>
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-zinc-100 line-clamp-2">
                    {post.text}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className={ADMIN_STYLES.statCard}>
          <h3 className="text-lg font-semibold text-amber-200 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Top Categories
          </h3>
          <div className="space-y-3">
            {topCategories.map(([category, count]) => {
              const percentage = (count / statistics.total) * 100
              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-100">{category}</span>
                    <span className="text-sm text-zinc-400">{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-zinc-700 rounded-full h-2">
                    <div 
                      className="bg-linear-to-r from-amber-400 to-amber-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={ADMIN_STYLES.statCard}>
        <h3 className="text-lg font-semibold text-amber-200 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors text-left">
            <FileText className="w-6 h-6 text-amber-200 mb-2" />
            <div className="font-medium text-zinc-100">Add New Shayri</div>
            <div className="text-xs text-zinc-400">Create new shayri content</div>
          </button>
          
          <button className="p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors text-left">
            <Users className="w-6 h-6 text-blue-200 mb-2" />
            <div className="font-medium text-zinc-100">Manage Users</div>
            <div className="text-xs text-zinc-400">View user statistics</div>
          </button>
          
          <button className="p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors text-left">
            <BarChart3 className="w-6 h-6 text-green-200 mb-2" />
            <div className="font-medium text-zinc-100">View Analytics</div>
            <div className="text-xs text-zinc-400">Detailed analytics</div>
          </button>
        </div>
      </div>
    </div>
  )
}
