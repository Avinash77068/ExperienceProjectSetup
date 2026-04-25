/**
 * Admin Dashboard Hook - Enterprise Architecture
 * Main dashboard state management
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useState } from 'react'

// ====================
// CUSTOM HOOK
// ====================
export const useAdminDashboard = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState('overview')

  // Tab navigation
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  // Tab configuration
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'posts', label: 'Posts', icon: 'FileText' },
    { id: 'users', label: 'Users', icon: 'Users' },
    { id: 'analytics', label: 'Analytics', icon: 'TrendingUp' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ]

  return {
    // State
    activeTab,
    tabs,
    
    // Actions
    handleTabChange,
    setActiveTab
  }
}
