/**
 * ShayriCardActions Component - Enterprise Architecture
 * Actions component with interactive buttons
 * @author Senior Development Team
 * @version 2.0.0
 */

import { Check, Copy, Heart, Share2, Eye } from 'lucide-react'
import { BsWhatsapp } from 'react-icons/bs'
import { CARD_STYLES } from '../config/styles'

export default function ShayriCardActions({ 
  isCopied, 
  likeCount, 
  whatsappUrl, 
  onCopy, 
  onLike, 
  onShare,
  metadata 
}) {
  return (
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
}
