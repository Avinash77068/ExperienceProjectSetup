/**
 * Authentication Hook - Enterprise Architecture
 * Custom hook for authentication and routing management
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useState, useEffect, useCallback } from 'react'
import { APPLICATION_CONFIG } from '../data/shayriData'

/**
 * Custom hook for authentication management
 * @returns {Object} - Authentication state and methods
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [isGuestMode, setIsGuestMode] = useState(false)

  // Handle hash-based routing
  const handleHashRoute = useCallback(() => {
    const hash = window.location.hash
    const isAdminRoute = hash === '#admin'
    const isGuestRoute = hash === '#guest'
    
    setShowAdmin(isAdminRoute)
    setIsGuestMode(isGuestRoute)

    if (isAdminRoute) {
      // Admin authentication
      const password = window.prompt('Admin password daalein:')
      if (password === APPLICATION_CONFIG.SECURITY.ADMIN_CREDENTIALS.PASSWORD) {
        setIsAuthenticated(true)
      } else {
        window.alert('Galat password!')
        window.location.hash = ''
        setShowAdmin(false)
        setIsAuthenticated(false)
        setIsGuestMode(false)
      }
    } else if (isGuestRoute) {
      // Guest mode - no authentication required
      setIsAuthenticated(false)
    } else {
      // Default public mode
      setIsGuestMode(false)
      setIsAuthenticated(false)
    }
  }, [])

  // Initialize routing on mount
  useEffect(() => {
    handleHashRoute()
    window.addEventListener('hashchange', handleHashRoute)
    return () => window.removeEventListener('hashchange', handleHashRoute)
  }, [handleHashRoute])

  // Navigate to different routes
  const navigateTo = useCallback((route) => {
    window.location.hash = route
  }, [])

  // Logout function
  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setShowAdmin(false)
    setIsGuestMode(false)
    window.location.hash = ''
  }, [])

  // Check if user can delete posts
  const canDeletePosts = useCallback(() => {
    return isAuthenticated && showAdmin
  }, [isAuthenticated, showAdmin])

  // Check if user can post
  const canPost = useCallback(() => {
    return isAuthenticated || isGuestMode
  }, [isAuthenticated, isGuestMode])

  return {
    // State
    isAuthenticated,
    showAdmin,
    isGuestMode,
    
    // Methods
    navigateTo,
    logout,
    
    // Permissions
    canDeletePosts,
    canPost,
    
    // Constants
    adminPassword: APPLICATION_CONFIG.SECURITY.ADMIN_CREDENTIALS.PASSWORD
  }
}
