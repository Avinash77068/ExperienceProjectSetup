/**
 * Shayri Data Hook - Enterprise Architecture
 * Custom hook for shayri data management and operations
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useState, useMemo, useCallback } from 'react'
import { usePostsStorage, useLikesStorage } from './useLocalStorage'
import { MASTER_POETRY_COLLECTION, POETRY_CATEGORIES } from '../data/shayriData'

/**
 * Custom hook for shayri data management
 * @returns {Object} - Shayri data and operations
 */
export const useShayriData = () => {
  // Storage hooks
  const [posts, setPosts, addPost, deletePost, updatePost] = usePostsStorage(MASTER_POETRY_COLLECTION)
  const [likes, setLikes, incrementLike, getLikeCount] = useLikesStorage({})

  // UI state
  const [selectedCategory, setSelectedCategory] = useState(POETRY_CATEGORIES.ALL)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [copiedId, setCopiedId] = useState('')

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    return posts.filter((post) => {
      const categoryMatches = selectedCategory === POETRY_CATEGORIES.ALL || post.category === selectedCategory
      const searchMatches =
        query.length === 0 ||
        post.text.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      return categoryMatches && searchMatches
    })
  }, [posts, selectedCategory, searchTerm])

  // Pagination
  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredPosts.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredPosts, currentPage])

  // Reset page when filters change
  const resetPage = useCallback(() => {
    setCurrentPage(1)
  }, [])

  // Copy functionality
  const handleCopy = useCallback(async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(''), 1200)
      return true
    } catch (error) {
      console.error('Copy failed:', error)
      return false
    }
  }, [])

  // Like functionality
  const handleLike = useCallback((id) => {
    incrementLike(id)
  }, [incrementLike])

  // Add new shayri
  const handleAddShayri = useCallback((shayriData) => {
    const newShayri = {
      id: `shayri-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString().split('T')[0],
      ...shayriData
    }
    addPost(newShayri)
    resetPage()
    return newShayri
  }, [addPost, resetPage])

  // Delete shayri (admin only)
  const handleDeleteShayri = useCallback((id) => {
    deletePost(id)
    resetPage()
  }, [deletePost, resetPage])

  // Update shayri (admin only)
  const handleUpdateShayri = useCallback((id, updates) => {
    updatePost(id, updates)
  }, [updatePost])

  // Statistics
  const statistics = useMemo(() => {
    const categoryStats = {}
    Object.values(POETRY_CATEGORIES).forEach(category => {
      if (category !== POETRY_CATEGORIES.ALL) {
        categoryStats[category] = posts.filter(post => post.category === category).length
      }
    })
    
    return {
      total: posts.length,
      byCategory: categoryStats,
      totalLikes: Object.values(likes).reduce((sum, count) => sum + count, 0)
    }
  }, [posts, likes])

  return {
    // Data
    posts,
    filteredPosts,
    paginatedPosts,
    likes,
    statistics,
    
    // UI State
    selectedCategory,
    searchTerm,
    currentPage,
    totalPages,
    copiedId,
    itemsPerPage,
    
    // Actions
    setSelectedCategory,
    setSearchTerm,
    setCurrentPage,
    setCopiedId,
    
    // Operations
    handleCopy,
    handleLike,
    handleAddShayri,
    handleDeleteShayri,
    handleUpdateShayri,
    getLikeCount,
    
    // Utilities
    resetPage
  }
}
