/**
 * ShayriCardHeader Component - Enterprise Architecture
 * Header component with category badge
 * @author Senior Development Team
 * @version 2.0.0
 */

import { CARD_STYLES } from '../config/styles'

export default function ShayriCardHeader({ category }) {
  return (
    <span className={CARD_STYLES.categoryBadge}>
      {category}
    </span>
  )
}
