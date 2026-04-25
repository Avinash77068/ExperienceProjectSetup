/**
 * AdminSidebar Component - Enterprise Architecture
 * Sidebar navigation for admin dashboard
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useState } from 'react'
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  BarChart3, 
  Heart,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { ADMIN_STYLES } from './styles'

export default function AdminSidebar({ 
  activeTab, 
  onTabChange, 
  statistics, 
  onLogout 
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      description: 'Dashboard overview'
    },
    {
      id: 'shayris',
      label: 'Shayris',
      icon: FileText,
      description: 'Manage shayri content'
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      description: 'User management'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      description: 'View analytics'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'System settings'
    }
  ]

  const handleTabChange = (tabId) => {
    onTabChange(tabId)
  }

  return (
    <aside className={`
      ${ADMIN_STYLES.sidebar} 
      ${isCollapsed ? 'w-20' : 'w-64'}
      transition-all duration-300 ease-in-out
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        {!isCollapsed && (
          <div>
            <h2 className="text-lg font-bold text-amber-200">Admin Panel</h2>
            <p className="text-xs text-zinc-400">Management System</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-amber-400/10 text-amber-200 border border-amber-400/20' 
                    : 'hover:bg-zinc-800 text-zinc-300'
                  }
                `}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && (
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-zinc-400">{item.description}</div>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Statistics Summary */}
      {!isCollapsed && (
        <div className="p-4 border-t absolute bottom-16 left-0 w-auto border-zinc-800">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-200" />
                <span className="text-sm text-zinc-300">Total Shayris</span>
              </div>
              <span className="text-sm font-bold text-amber-200">{statistics?.total}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-200" />
                <span className="text-sm text-zinc-300">Categories</span>
              </div>
              <span className="text-sm font-bold text-blue-200">{statistics.categories}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-200" />
                <span className="text-sm text-zinc-300">Total Likes</span>
              </div>
              <span className="text-sm font-bold text-red-200">{statistics.totalLikes}</span>
            </div>
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="p-4 border-t absolute bottom-0 border-zinc-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-900/20 text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  )
}
