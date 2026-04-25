/**
 * ShayriModal Component - Enterprise Architecture
 * Modal popup for displaying full shayri content
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useState } from 'react'
import { X, Heart, Share2, Copy } from 'lucide-react'

// ====================
// STYLES CONSTANTS
// ====================
const MODAL_STYLES = {
  overlay: 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4',
  container: 'bg-zinc-900 rounded-2xl border border-amber-300/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto',
  header: 'flex items-center justify-between p-6 border-b border-zinc-800',
  title: 'text-2xl font-bold text-amber-200',
  closeButton: 'p-2 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400',
  content: 'p-6',
  categoryBadge: 'inline-block rounded-full border border-amber-100/30 bg-black/35 px-3 py-1 text-xs text-amber-100 backdrop-blur-sm mb-4',
  shayriText: 'whitespace-pre-line font-urdu text-2xl leading-relaxed text-zinc-100 mb-6 text-center',
  metadata: 'flex items-center justify-between text-sm text-zinc-400 mb-6',
  author: 'text-lg text-amber-200 text-center mb-6',
  actions: 'flex items-center justify-center gap-4 p-6 border-t border-zinc-800',
  button: 'flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm transition-all duration-200 hover:border-amber-300 hover:text-amber-200',
  buttonActive: 'border-pink-400 hover:border-pink-400 hover:text-pink-300',
  buttonSuccess: 'border-green-400 hover:border-green-400 hover:text-green-300'
}

// ====================
// MAIN COMPONENT
// ====================
export default function ShayriModal({ 
  isOpen, 
  onClose, 
  post, 
  likeCount, 
  onCopy, 
  onLike,
  copiedId 
}) {
  const [isLiked, setIsLiked] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${post.text}\n\n- ${post.author}`)
      setIsCopied(true)
      onCopy(post.id)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike(post.id)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Shayri',
        text: `${post.text}\n\n- ${post.author}`,
        url: window.location.href
      })
    } else {
      // Fallback to WhatsApp
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${post.text}\n\n- ${post.author}`)}`
      window.open(whatsappUrl, '_blank')
    }
  }

  if (!isOpen || !post) return null

  return (
    <div className={MODAL_STYLES.overlay} onClick={onClose}>
      <div 
        className={MODAL_STYLES.container}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={MODAL_STYLES.header}>
          <h2 className={MODAL_STYLES.title}>Shayri</h2>
          <button
            onClick={onClose}
            className={MODAL_STYLES.closeButton}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className={MODAL_STYLES.content}>
          {/* Category Badge */}
          <div className={MODAL_STYLES.categoryBadge}>
            {post.category}
          </div>

          {/* Shayri Text */}
          <div className={MODAL_STYLES.shayriText}>
            {post.text}
          </div>

          {/* Metadata */}
          <div className={MODAL_STYLES.metadata}>
            <span>{post.date}</span>
            <span>{post.category}</span>
          </div>

          {/* Author */}
          <div className={MODAL_STYLES.author}>
            - {post.author}
          </div>

          {/* Background Image */}
          {post.imageUrl && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt="Shayri background" 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={MODAL_STYLES.actions}>
          <button
            onClick={handleCopy}
            className={`${MODAL_STYLES.button} ${isCopied || copiedId === post.id ? MODAL_STYLES.buttonSuccess : ''}`}
          >
            <Copy className="w-4 h-4" />
            {isCopied || copiedId === post.id ? 'Copied!' : 'Copy'}
          </button>
          
          <button
            onClick={handleLike}
            className={`${MODAL_STYLES.button} ${isLiked ? MODAL_STYLES.buttonActive : ''}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            {likeCount || 0}
          </button>
          
          <button
            onClick={handleShare}
            className={MODAL_STYLES.button}
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  )
}
