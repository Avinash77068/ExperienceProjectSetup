/**
 * AdminDashboard Hooks - Enterprise Architecture
 * Custom hooks for state management
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useState, useEffect, useCallback, useMemo } from 'react'
import { ADMIN_CONFIG } from './config'

/**
 * Hook for AdminDashboard form state
 * @param {Object} initialData - Initial form data
 * @returns {Object} - Form state and handlers
 */
export const useAdminFormState = (initialData = {}) => {
  const [formData, setFormData] = useState({
    text: '',
    author: '',
    category: 'Ishq',
    imageUrl: '',
    ...initialData
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }, [errors])
  
  const validateForm = useCallback(() => {
    const newErrors = {}
    
    if (!formData.text.trim()) {
      newErrors.text = 'Shayri text required है'
    } else if (formData.text.length < ADMIN_CONFIG.VALIDATION.MIN_TEXT_LENGTH) {
      newErrors.text = `कम से कम ${ADMIN_CONFIG.VALIDATION.MIN_TEXT_LENGTH} characters required हैं`
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author name required है'
    } else if (formData.author.length < ADMIN_CONFIG.VALIDATION.MIN_AUTHOR_LENGTH) {
      newErrors.author = `कम से कम ${ADMIN_CONFIG.VALIDATION.MIN_AUTHOR_LENGTH} characters required हैं`
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])
  
  const resetForm = useCallback(() => {
    setFormData({
      text: '',
      author: '',
      category: 'Ishq',
      imageUrl: ''
    })
    setErrors({})
  }, [])
  
  return {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleInputChange,
    validateForm,
    resetForm
  }
}

/**
 * Hook for AdminDashboard data management
 * @param {Array} posts - Posts array
 * @returns {Object} - Processed data and handlers
 */
export const useAdminData = (posts) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState(posts)
  const [currentPage, setCurrentPage] = useState(1)
  
  // Filter posts based on search
  useEffect(() => {
    const query = searchTerm.trim().toLowerCase()
    const filtered = posts.filter(post => 
      post.text.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    )
    setFilteredPosts(filtered)
    setCurrentPage(1)
  }, [posts, searchTerm])
  
  // Pagination
  const itemsPerPage = ADMIN_CONFIG.TABLE.ITEMS_PER_PAGE
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredPosts.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredPosts, currentPage])
  
  // Statistics
  const statistics = useMemo(() => {
    const categoryStats = {}
    posts.forEach(post => {
      categoryStats[post.category] = (categoryStats[post.category] || 0) + 1
    })
    
    return {
      total: posts.length,
      categories: Object.keys(categoryStats).length,
      thisMonth: posts.filter(post => {
        const postDate = new Date(post.date)
        const now = new Date()
        return postDate.getMonth() === now.getMonth() && 
               postDate.getFullYear() === now.getFullYear()
      }).length
    }
  }, [posts])
  
  const handleSearch = useCallback((value) => {
    setSearchTerm(value)
  }, [])
  
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page)
  }, [])
  
  return {
    searchTerm,
    filteredPosts,
    paginatedPosts,
    currentPage,
    totalPages,
    statistics,
    handleSearch,
    handlePageChange
  }
}
