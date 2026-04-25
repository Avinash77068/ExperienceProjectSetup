/**
 * ShayriCardContent Component - Enterprise Architecture
 * Content component with text and metadata
 * @author Senior Development Team
 * @version 2.0.0
 */

import { CARD_STYLES } from '../config/styles'

export default function ShayriCardContent({ text, category, date, author }) {
  return (
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
}
