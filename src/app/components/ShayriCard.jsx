import { useState, useMemo, useCallback } from 'react'
/**
 * Poetry Card Component - Enterprise Architecture
 * Displays individual shayri with interactive features
 * @author Senior Development Team
 * @version 2.0.0
 */

import { Check, Copy, Heart, Share2, Eye } from 'lucide-react'
import { BsWhatsapp } from 'react-icons/bs'
import { CATEGORY_GRADIENTS, PoetryUtils } from '../data/shayriData'

// ====================
// COMPONENT CONFIGURATION
// ====================
const CARD_CONFIG = {
  DIMENSIONS: {
    MAX_WIDTH: '340px',
    ASPECT_RATIO: 'portrait'
  },
  ANIMATION: {
    FADE_IN_DURATION: '600ms',
    HOVER_SCALE: 1.02
  },
  CONTENT: {
    MAX_TEXT_LENGTH: 300,
    AUTHOR_MAX_LENGTH: 30
  }
}

// ====================
// STYLES CONSTANTS
// ====================
const CARD_STYLES = {
  container: 'shayri-card fade-in relative overflow-hidden rounded-2xl border border-amber-200/15 bg-zinc-900/80 p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl',
  background: 'absolute inset-0',
  gradient: 'absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/95 via-[#0a0a0f]/75 to-[#0a0a0f]/45',
  content: 'relative z-10',
  categoryBadge: 'mb-4 inline-block rounded-full border border-amber-100/30 bg-black/35 px-3 py-1 text-xs text-amber-100 backdrop-blur-sm',
  shayriText: 'mb-4 whitespace-pre-line font-urdu text-xl leading-relaxed text-zinc-100',
  metadata: 'mb-4 flex items-center justify-between text-sm',
  categoryTag: 'rounded-full bg-amber-400/10 px-3 py-1 text-amber-200',
  dateText: 'text-zinc-400',
  author: 'mb-5 text-sm text-zinc-300',
  actions: 'flex flex-wrap gap-2',
  button: 'rounded-md border border-zinc-700 bg-zinc-900/40 px-3 py-2 text-sm transition-all duration-200 hover:border-amber-300 hover:text-amber-200 disabled:opacity-50 disabled:cursor-not-allowed',
  buttonActive: 'border-pink-400 hover:border-pink-400 hover:text-pink-300',
  buttonSuccess: 'border-green-400 hover:border-green-400 hover:text-green-300',
  buttonIcon: 'h-4 w-4'
}

// ====================
// UTILITY HOOKS
// ====================
const useShayriCardState = (post) => {
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

// ====================
// DATA PROCESSING
// ====================
const processShayriData = (post) => {
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

// ====================
// ACTION HANDLERS
// ====================
const createActionHandlers = (post, state, callbacks) => {
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

// ====================
// SUB-COMPONENTS
// ====================
const ShayriCardBackground = ({ showImage, imageUrl, gradientClass, onImageError }) => (
  <div className={CARD_STYLES.background}>
    {showImage ? (
      <img
        src={imageUrl}
        alt={`${gradientClass} shayri visual`}
        className="shayri-image h-full w-full object-cover"
        onError={onImageError}
        loading="lazy"
      />
    ) : (
      <div className={`h-full w-full bg-gradient-to-br ${gradientClass}`} />
    )}
    <div className={CARD_STYLES.gradient} />
  </div>
)

const ShayriCardHeader = ({ category }) => (
  <span className={CARD_STYLES.categoryBadge}>
    {category}
  </span>
)

const ShayriCardContent = ({ text, category, date, author }) => (
  <>
    <p className={CARD_STYLES.shayriText}>
      {text}
    </p>
    <div className={CARD_STYLES.metadata}>
      <span className={CARD_STYLES.categoryTag}>
        {category}
      </span>
      <span className={CARD_STYLES.dateText}>{date}</span>
    </div>
    <p className={CARD_STYLES.author}>- {author}</p>
  </>
)

const ShayriCardActions = ({ 
  isCopied, 
  likeCount, 
  whatsappUrl, 
  onCopy, 
  onLike, 
  onShare,
  metadata 
}) => (
  <div className={CARD_STYLES.actions}>
    <button
      type="button"
      onClick={onCopy}
      className={`${CARD_STYLES.button} ${isCopied ? CARD_STYLES.buttonSuccess : ''}`}
      aria-label={isCopied ? "Copied" : "Copy shayri"}
    >
      {isCopied ? <Check className={CARD_STYLES.buttonIcon} /> : <Copy className={CARD_STYLES.buttonIcon} />}
    </button>
    
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className={`${CARD_STYLES.button} ${CARD_STYLES.buttonSuccess} flex items-center justify-center`}
      aria-label="Share on WhatsApp"
    >
      <BsWhatsapp className={CARD_STYLES.buttonIcon} />
    </a>
    
    <button
      type="button"
      onClick={onShare}
      className={`${CARD_STYLES.button} ${CARD_STYLES.buttonSuccess}`}
      aria-label="Share shayri"
    >
      <Share2 className={CARD_STYLES.buttonIcon} />
    </button>
    
    <button
      type="button"
      onClick={onLike}
      className={`${CARD_STYLES.button} ${CARD_STYLES.buttonActive} flex items-center gap-1`}
      aria-label="Like shayri"
    >
      <Heart 
        className={CARD_STYLES.buttonIcon} 
        fill={likeCount > 0 ? "currentColor" : "none"}
      />
      <span>{likeCount}</span>
    </button>
    
    {metadata?.views && (
      <div className="flex items-center gap-1 text-zinc-400 text-xs">
        <Eye className={CARD_STYLES.buttonIcon} />
        <span>{metadata.views}</span>
      </div>
    )}
  </div>
)

// ====================
// MAIN COMPONENT
// ====================
export default function ShayriCard({ 
  post, 
  copiedId, 
  likeCount, 
  onCopy, 
  onLike,
  className = '',
  showActions = true,
  showMetadata = true 
}) {
  // State management
  const cardState = useShayriCardState(post)
  const { imageFailed, isCopied, handleImageError } = cardState
  
  // Data processing
  const { gradientClass, showImage, whatsappUrl } = processShayriData({
    ...post,
    imageFailed
  })
  
  // Action handlers
  const { handleCopy, handleLike, handleShare } = createActionHandlers(
    post, 
    { isCopied, setIsCopied: () => {}, resetCopyState: () => {} },
    { onCopy, onLike }
  )
  
  // Determine copy state
  const isCurrentlyCopied = copiedId === post.id || isCopied
  
  return (
    <article 
      className={`${CARD_STYLES.container} ${className}`}
      style={{ maxWidth: CARD_CONFIG.DIMENSIONS.MAX_WIDTH }}
      data-category={post.category}
      data-author={post.author}
      data-featured={post.metadata?.featured || false}
    >
      <ShayriCardBackground
        showImage={showImage}
        imageUrl={post.imageUrl}
        gradientClass={gradientClass}
        onImageError={handleImageError}
      />
      
      <div className={CARD_STYLES.content}>
        <ShayriCardHeader category={post.category} />
        <ShayriCardContent
          text={post.text}
          category={post.category}
          date={PoetryUtils.formatDate(post.date)}
          author={post.author}
        />
        
        {showActions && (
          <ShayriCardActions
            isCopied={isCurrentlyCopied}
            likeCount={likeCount}
            whatsappUrl={whatsappUrl}
            onCopy={handleCopy}
            onLike={handleLike}
            onShare={handleShare}
            metadata={showMetadata ? post.metadata : null}
          />
        )}
      </div>
    </article>
  )
}

// ====================
// PROP TYPES & VALIDATION
// ====================
ShayriCard.propTypes = {
  post: {
    id: 'string',
    text: 'string', 
    category: 'string',
    author: 'string',
    date: 'string',
    imageUrl: 'string',
    metadata: 'object'
  },
  copiedId: 'string',
  likeCount: 'number',
  onCopy: 'function',
  onLike: 'function',
  className: 'string',
  showActions: 'boolean',
  showMetadata: 'boolean'
}

// ====================
// DEFAULT PROPS
// ====================
ShayriCard.defaultProps = {
  copiedId: '',
  likeCount: 0,
  className: '',
  showActions: true,
  showMetadata: true
}
