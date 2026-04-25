/**
 * ShayriCard Hooks - Enterprise Architecture
 * Custom hooks for state management
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useState, useMemo, useCallback } from 'react'
import { PoetryUtils } from '../../../data/shayriData'

/**
 * Hook for ShayriCard state management
 * @param {Object} post - Shayri post data
 * @returns {Object} - State and handlers
 */
export const useShayriCardState = (post) => {
  const [imageFailed, setImageFailed] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  
  const handleImageError = useCallback(() => {
    setImageFailed(true)
  }, [])
  
  const resetCopyState = useCallback(() => {
    setTimeout(() => setIsCopied(false), 2000)
  }, [])
  
  return {
    imageFailed,
    isLiked,
    isCopied,
    handleImageError,
    setIsLiked,
    setIsCopied,
    resetCopyState
  }
}

/**
 * Hook for processing ShayriCard data
 * @param {Object} post - Shayri post data
 * @returns {Object} - Processed data
 */
export const useShayriCardData = (post) => {
  const encodedMessage = useMemo(() => 
    encodeURIComponent(`${post.text}\n\n- ${post.author}\n#${post.category} #Shayri`),
    [post.text, post.author, post.category]
  )
  
  const gradientClass = useMemo(() => 
    PoetryUtils.getCategoryGradient(post.category),
    [post.category]
  )
  
  const showImage = useMemo(() => 
    post.imageUrl && !post.imageFailed,
    [post.imageUrl, post.imageFailed]
  )
  
  const whatsappUrl = useMemo(() => 
    `https://wa.me/?text=${encodedMessage}`,
    [encodedMessage]
  )
  
  return {
    encodedMessage,
    gradientClass,
    showImage,
    whatsappUrl
  }
}

/**
 * Hook for ShayriCard action handlers
 * @param {Object} post - Shayri post data
 * @param {Object} state - Component state
 * @param {Object} callbacks - Callback functions
 * @returns {Object} - Action handlers
 */
export const useShayriCardActions = (post, state, callbacks) => {
  const { isCopied, setIsCopied, resetCopyState } = state
  const { onCopy, onLike } = callbacks
  
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(post.text)
      setIsCopied(true)
      resetCopyState()
      if (onCopy) onCopy(post.text, post.id)
    } catch (error) {
      console.error('Copy failed:', error)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = post.text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setIsCopied(true)
      resetCopyState()
      if (onCopy) onCopy(post.text, post.id)
    }
  }, [post.text, post.id, onCopy, setIsCopied, resetCopyState])
  
  const handleLike = useCallback(() => {
    if (onLike) onLike(post.id)
  }, [post.id, onLike])
  
  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: `${post.category} Shayri`,
        text: `${post.text}\n\n- ${post.author}`,
        url: window.location.href
      })
    }
  }, [post.text, post.author, post.category])
  
  return {
    handleCopy,
    handleLike,
    handleShare
  }
}
