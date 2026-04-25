/**
 * ShayriCardHeader Component - Enterprise Architecture
 * Header component with category badge
 * @author Senior Development Team
 * @version 2.0.0
 */

import { CARD_STYLES } from '../config/styles'

export default function ShayriCardHeader({ category, date }) {
  return (
    <div className={CARD_STYLES.metadata}>
      <span className={CARD_STYLES.categoryBadge}>{category}</span>
      <span className={CARD_STYLES.dateText}>{date}</span>
    </div>
  );
}
