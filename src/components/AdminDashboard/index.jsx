/**
 * AdminDashboard Component - Enterprise Architecture
 * Main dashboard component with sidebar layout
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useState } from 'react'
import { Users, BarChart3, Settings } from 'lucide-react'
import { ADMIN_STYLES } from './styles'
import { useAdminFormState, useAdminData } from './hooks'
import AdminSidebar from './AdminSidebar'
import AdminOverview from './AdminOverview'
import AdminForm from './AdminForm'
import AdminTable from './AdminTable'

export default function AdminDashboard({ 
  posts, 
  isAuthenticated, 
  categories, 
  onAddPost, 
  onUpdatePost, 
  onDeletePost, 
  canDeletePosts 
}) {
  // Tab state
  const [activeTab, setActiveTab] = useState('overview')
  
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
    startEdit
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
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return
    
    setIsSubmitting(true)
    try {
      if (isEditing && editingId) {
        await onUpdatePost(editingId, formData)
      } else {
        await onAddPost(formData)
      }
      resetForm()
    } catch (error) {
      console.error('Error saving post:', error)
    } finally {
      setIsSubmitting(false)
    }
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
    <div className={ADMIN_STYLES.container}>
      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        statistics={statistics}
        onLogout={handleLogout}
      />
      
      {/* Main Content */}
      <main className={ADMIN_STYLES.main}>
        <div className={ADMIN_STYLES.content}>
          {/* Overview Tab */}
          <div className={`${activeTab === 'overview' ? ADMIN_STYLES.tabPanelActive : ADMIN_STYLES.tabPanel}`}>
            <AdminOverview statistics={statistics} posts={posts} />
          </div>
          
          {/* Shayris Tab */}
          <div className={`${activeTab === 'shayris' ? ADMIN_STYLES.tabPanelActive : ADMIN_STYLES.tabPanel}`}>
            <div className="space-y-6">
              <div>
                <h1 className={ADMIN_STYLES.title}>Manage Shayris</h1>
                <p className={ADMIN_STYLES.subtitle}>Add, edit, and delete shayri content</p>
              </div>
              
              <AdminForm
                formData={formData}
                errors={errors}
                isSubmitting={isSubmitting}
                categories={categories}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                onReset={resetForm}
                isEditing={isEditing}
              />
              
              <div className={ADMIN_STYLES.search}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search shayris..."
                  className={ADMIN_STYLES.searchInput}
                />
              </div>
              
              <AdminTable
                posts={paginatedPosts}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onDeletePost={onDeletePost}
                onEditPost={handleEditPost}
                canDeletePosts={canDeletePosts}
              />
            </div>
          </div>
          
          {/* Users Tab */}
          <div className={`${activeTab === 'users' ? ADMIN_STYLES.tabPanelActive : ADMIN_STYLES.tabPanel}`}>
            <div>
              <h1 className={ADMIN_STYLES.title}>User Management</h1>
              <p className={ADMIN_STYLES.subtitle}>Manage user accounts and permissions</p>
            </div>
            <div className={ADMIN_STYLES.statCard}>
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                <p className="text-zinc-400">User management features coming soon...</p>
              </div>
            </div>
          </div>
          
          {/* Analytics Tab */}
          <div className={`${activeTab === 'analytics' ? ADMIN_STYLES.tabPanelActive : ADMIN_STYLES.tabPanel}`}>
            <div>
              <h1 className={ADMIN_STYLES.title}>Analytics</h1>
              <p className={ADMIN_STYLES.subtitle}>View detailed analytics and reports</p>
            </div>
            <div className={ADMIN_STYLES.statCard}>
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                <p className="text-zinc-400">Advanced analytics coming soon...</p>
              </div>
            </div>
          </div>
          
          {/* Settings Tab */}
          <div className={`${activeTab === 'settings' ? ADMIN_STYLES.tabPanelActive : ADMIN_STYLES.tabPanel}`}>
            <div>
              <h1 className={ADMIN_STYLES.title}>Settings</h1>
              <p className={ADMIN_STYLES.subtitle}>Configure system settings</p>
            </div>
            <div className={ADMIN_STYLES.statCard}>
              <div className="text-center py-8">
                <Settings className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                <p className="text-zinc-400">Settings panel coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
