/**
 * Local Storage Hook - Enterprise Architecture
 * Custom hook for localStorage operations with error handling
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for localStorage operations
 * @param {string} key - Storage key
 * @param {*} initialValue - Initial value if no stored value exists
 * @returns {[value, setValue, removeValue]} - Current value, setter function, remove function
 */
export const useLocalStorage = (key, initialValue) => {
  // Get stored value or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Set value to localStorage and state
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

/**
 * Custom hook for posts storage
 * @param {Array} initialPosts - Initial posts array
 * @returns {[posts, setPosts, addPost, deletePost, updatePost]} - Posts array and operations
 */
export const usePostsStorage = (initialPosts = []) => {
  const [posts, setPosts, removePosts] = useLocalStorage('shayri_posts_v2', initialPosts)

  const addPost = useCallback((newPost) => {
    setPosts(prev => [newPost, ...prev])
  }, [setPosts])

  const deletePost = useCallback((id) => {
    setPosts(prev => prev.filter(post => post.id !== id))
  }, [setPosts])

  const updatePost = useCallback((id, updates) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updates } : post
    ))
  }, [setPosts])

  return [posts, setPosts, addPost, deletePost, updatePost]
}

/**
 * Custom hook for likes storage
 * @param {Object} initialLikes - Initial likes object
 * @returns {[likes, setLikes, incrementLike, getLikeCount]} - Likes data and operations
 */
export const useLikesStorage = (initialLikes = {}) => {
  const [likes, setLikes, removeLikes] = useLocalStorage('shayri_likes_v2', initialLikes)

  const incrementLike = useCallback((id) => {
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }))
  }, [setLikes])

  const getLikeCount = useCallback((id) => {
    return likes[id] || 0
  }, [likes])

  return [likes, setLikes, incrementLike, getLikeCount]
}
