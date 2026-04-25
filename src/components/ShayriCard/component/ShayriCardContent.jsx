/**
 * ShayriCardContent Component - Enterprise Architecture
 * Content component with text and metadata
 * @author Senior Development Team
 * @version 2.0.0
 */

import { CARD_STYLES } from '../config/styles'

export default function ShayriCardContent({ text, author, handleCardClick }) {
  return (
    <>
      <p className={CARD_STYLES.shayriText} onClick={handleCardClick}>
        {text}
      </p>
      <p className={CARD_STYLES.author}>- {author}</p>
    </>
  )
}
