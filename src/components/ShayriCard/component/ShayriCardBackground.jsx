/**
 * ShayriCardBackground Component - Enterprise Architecture
 * Background component with image or gradient fallback
 * @author Senior Development Team
 * @version 2.0.0
 */

import { CARD_STYLES } from '../config/styles'

export default function ShayriCardBackground({ showImage, imageUrl, gradientClass, onImageError }) {
  return (
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
        <div className={`h-full w-full bg-linear-to-br ${gradientClass}`} />
      )}
      <div className={CARD_STYLES.gradient} />
    </div>
  )
}
