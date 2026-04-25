/**
 * ShayriCard Component - Enterprise Architecture
 * Main component with modular structure
 * @author Senior Development Team
 * @version 2.0.0
 */

import { CARD_STYLES } from './config/styles'
import { useShayriCardState, useShayriCardData, useShayriCardActions } from './hook/hooks'
import ShayriCardBackground from './component/ShayriCardBackground'
import ShayriCardHeader from './component/ShayriCardHeader'
import ShayriCardContent from './component/ShayriCardContent'
import ShayriCardActions from './component/ShayriCardActions'

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
  const { gradientClass, showImage, whatsappUrl } = useShayriCardData({
    ...post,
    imageFailed
  })
  
  // Action handlers
  const { handleCopy, handleLike, handleShare } = useShayriCardActions(
    post, 
    { isCopied, setIsCopied: () => {}, resetCopyState: () => {} },
    { onCopy, onLike }
  )
  
  // Determine copy state
  const isCurrentlyCopied = copiedId === post.id || isCopied
  
  return (
    <article 
      className={`${CARD_STYLES.container} ${className}`}
      data-category={post.category}
      data-post-id={post.id}
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
          date={post.date}
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
  post: 'object',
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
