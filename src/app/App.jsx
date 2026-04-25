/**
 * Main App Component - Enterprise Architecture
 * Root component with routing and state management
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useEffect } from 'react'
import AdminDashboard from './components/AdminDashboard'
import PublicShayriView from './components/PublicShayriView'
import GuestPostForm from './components/GuestPostForm'
import { useShayriData } from './hooks/useShayriData'
import { useAuth } from './hooks/useAuth'
import { AVAILABLE_CATEGORIES } from './data/shayriData'

// ====================
// MAIN COMPONENT
// ====================
export default function App() {
  // Custom hooks
  const shayriData = useShayriData()
  const auth = useAuth()
  
  const {
    posts,
    filteredPosts,
    paginatedPosts,
    likes,
    selectedCategory,
    searchTerm,
    currentPage,
    totalPages,
    copiedId,
    itemsPerPage,
    setSelectedCategory,
    setSearchTerm,
    setCurrentPage,
    handleCopy,
    handleLike,
    handleAddShayri,
    handleDeleteShayri,
    getLikeCount
  } = shayriData
  
  const {
    isAuthenticated,
    showAdmin,
    isGuestMode,
    canDeletePosts,
    canPost
  } = auth

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchTerm, setCurrentPage])

  // Handle guest post submission
  const handleGuestPostSubmit = async (shayriData) => {
    try {
      await handleAddShayri(shayriData)
      // Success feedback could be added here
    } catch (error) {
      console.error('Error posting shayri:', error)
      throw error
    }
  }

  // Render admin dashboard
  if (showAdmin) {
    return (
      <AdminDashboard
        posts={posts}
        isAuthenticated={isAuthenticated}
        categories={AVAILABLE_CATEGORIES}
        onAddPost={handleAddShayri}
        onDeletePost={handleDeleteShayri}
        canDeletePosts={canDeletePosts}
      />
    )
  }

  // Render public view with guest posting
  return (
    <>
      <PublicShayriView
        categories={AVAILABLE_CATEGORIES}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredPosts={paginatedPosts}
        copiedId={copiedId}
        likes={likes}
        onCopy={handleCopy}
        onLike={handleLike}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredPosts.length}
        itemsPerPage={itemsPerPage}
        isGuestMode={isGuestMode}
        canPost={canPost}
      />
      
      {canPost && (
        <GuestPostForm onPostSubmit={handleGuestPostSubmit} />
      )}
    </>
  )
}
