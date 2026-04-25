/**
 * AdminDashboard Component - Enterprise Architecture
 * Main dashboard component with sidebar layout
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useAdminDashboard } from './hooks/useAdminDashboard'
import { useAdminFormState, useAdminData } from './hooks'
import { ADMIN_STYLES } from './styles'
import DashboardLayout from './components/DashboardLayout'
import DashboardTabs from './components/DashboardTabs'

export default function AdminDashboard({ 
  posts, 
  isAuthenticated, 
  categories, 
  onAddPost, 
  onUpdatePost, 
  onDeletePost, 
  canDeletePosts 
}) {
  // Dashboard state management
  const dashboardState = useAdminDashboard()
  const { activeTab } = dashboardState
  
  // Form state management
  const formState = useAdminFormState()
  const {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    isEditing,
    editingId,
    handleInputChange,
    validateForm,
    resetForm,
    startEdit,
    handleSubmit
  } = formState
  
  // Data management
  const dataState = useAdminData(posts)
  const {
    searchTerm,
    paginatedPosts,
    currentPage,
    totalPages,
    statistics,
    handleSearch,
    handlePageChange
  } = dataState
  
  // Handle tab change
  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }
  
  // Handle logout
  const handleLogout = () => {
    window.location.hash = ''
    window.location.reload()
  }
  
    
  // Handle edit request
  const handleEditPost = (post) => {
    startEdit(post)
  }
  
  if (!isAuthenticated) {
    return (
      <div className={ADMIN_STYLES.container}>
        <div className="flex items-center justify-center min-h-screen">
          <div className={ADMIN_STYLES.error}>
            <h2 className="text-lg font-semibold mb-2">Access Denied</h2>
            <p>Please authenticate to access admin panel.</p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <DashboardLayout 
      activeTab={activeTab}
      statistics={dataState.statistics}
      onTabChange={dashboardState.handleTabChange}
      onLogout={handleLogout}
    >
      <DashboardTabs
        activeTab={activeTab}
        formState={formState}
        dataState={dataState}
        categories={categories}
        onAddPost={onAddPost}
        onUpdatePost={onUpdatePost}
        onDeletePost={onDeletePost}
        canDeletePosts={canDeletePosts}
      />
    </DashboardLayout>
  )
}
