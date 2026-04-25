/**
 * DashboardTabs Component - Enterprise Architecture
 * Tab content renderer based on active tab
 * @author Senior Development Team
 * @version 2.0.0
 */

import { Users, BarChart3, Settings } from 'lucide-react'
import { ADMIN_STYLES } from '../styles'
import AdminOverview from '../AdminOverview'
import AdminForm from '../AdminForm'
import AdminTable from '../AdminTable'
import AdminUserManagement from '../AdminUserManagement'
import AdminAnalytics from '../AdminAnalytics'
import { useShayriData } from '../../../hooks/useShayriData'

// ====================
// DASHBOARD TABS COMPONENT
// ====================
const DashboardTabs = ({ 
  activeTab, 
  formState, 
  dataState, 
  categories, 
  onAddPost, 
  onUpdatePost, 
  onDeletePost, 
  canDeletePosts 
}) => {
  // Use shayri data hook for local storage data
  const shayriData = useShayriData()
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

  const {
    searchTerm,
    paginatedPosts,
    currentPage,
    totalPages,
    handleSearch,
    handlePageChange,
    handleEditPost
  } = dataState

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview posts={shayriData.posts} statistics={shayriData.statistics} />

      case 'posts':
        return (
          <div className={ADMIN_STYLES.content}>
            {/* Posts Form */}
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
            
            {/* Search */}
            <div className={ADMIN_STYLES.search}>
              <input
                type="text"
                value={shayriData.searchTerm}
                onChange={(e) => shayriData.setSearchTerm(e.target.value)}
                placeholder="Search shayris..."
                className={ADMIN_STYLES.searchInput}
              />
            </div>
            
            {/* Posts Table */}
            <AdminTable
              posts={shayriData.paginatedPosts}
              currentPage={shayriData.currentPage}
              totalPages={shayriData.totalPages}
              onPageChange={shayriData.setCurrentPage}
              onDeletePost={shayriData.handleDeleteShayri}
              onEditPost={handleEditPost}
              canDeletePosts={canDeletePosts}
            />
          </div>
        )

      case 'users':
        return <AdminUserManagement />

      case 'analytics':
        return <AdminAnalytics />

      case 'settings':
        return (
          <div className={ADMIN_STYLES.content}>
            <div>
              <h1 className={ADMIN_STYLES.title}>Settings</h1>
              <p className={ADMIN_STYLES.subtitle}>Manage application settings</p>
            </div>
            <div className={ADMIN_STYLES.statCard}>
              <div className="text-center py-8">
                <Settings className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                <p className="text-zinc-400">Settings panel coming soon...</p>
              </div>
            </div>
          </div>
        )

      default:
        return <AdminOverview posts={shayriData.posts} statistics={shayriData.statistics} />
    }
  }

  return renderTabContent()
}

export default DashboardTabs
