/**
 * AdminDashboard Component - Enterprise Architecture
 * Main dashboard component with modular structure
 * @author Senior Development Team
 * @version 2.0.0
 */

import { ADMIN_STYLES } from './styles'
import { useAdminFormState, useAdminData } from './hooks'
import AdminStats from './AdminStats'
import AdminForm from './AdminForm'
import AdminTable from './AdminTable'

export default function AdminDashboard({ 
  posts, 
  isAuthenticated, 
  categories, 
  onAddPost, 
  onDeletePost, 
  canDeletePosts 
}) {
  // Form state management
  const formState = useAdminFormState()
  const {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleInputChange,
    validateForm,
    resetForm
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
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return
    
    setIsSubmitting(true)
    try {
      await onAddPost(formData)
      resetForm()
    } catch (error) {
      console.error('Error adding post:', error)
    } finally {
      setIsSubmitting(false)
    }
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
      <header className={ADMIN_STYLES.header}>
        <h1 className={ADMIN_STYLES.title}>Admin Dashboard</h1>
        <p className={ADMIN_STYLES.subtitle}>Manage shayri content and settings</p>
      </header>
      
      <main className={ADMIN_STYLES.main}>
        <div className="flex-1">
          <AdminStats statistics={statistics} />
          
          <AdminForm
            formData={formData}
            errors={errors}
            isSubmitting={isSubmitting}
            categories={categories}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onReset={resetForm}
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
            canDeletePosts={canDeletePosts}
          />
        </div>
      </main>
    </div>
  )
}

// ====================
// PROP TYPES & VALIDATION
// ====================
AdminDashboard.propTypes = {
  posts: 'array',
  isAuthenticated: 'boolean',
  categories: 'array',
  onAddPost: 'function',
  onDeletePost: 'function',
  canDeletePosts: 'boolean'
}

// ====================
// DEFAULT PROPS
// ====================
AdminDashboard.defaultProps = {
  posts: [],
  isAuthenticated: false,
  categories: [],
  canDeletePosts: false
}
