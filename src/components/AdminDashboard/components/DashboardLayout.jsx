/**
 * DashboardLayout Component - Enterprise Architecture
 * Main dashboard layout with sidebar
 * @author Senior Development Team
 * @version 2.0.0
 */

import { ADMIN_STYLES } from '../styles'
import AdminSidebar from '../AdminSidebar'

// ====================
// DASHBOARD LAYOUT COMPONENT
// ====================
const DashboardLayout = ({ activeTab, statistics, onTabChange, onLogout, children }) => {
  return (
    <div className={ADMIN_STYLES.dashboard}>
      {/* Sidebar */}
      <AdminSidebar 
        activeTab={activeTab} 
        statistics={statistics}
        onTabChange={onTabChange}
        onLogout={onLogout}
      />
      
      {/* Main Content */}
      <div className={ADMIN_STYLES.mainContent}>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
