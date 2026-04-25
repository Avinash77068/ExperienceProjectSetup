/**
 * Guest Post Form Component - Enterprise Architecture
 * Form for guests to post new shayri cards
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useState, useCallback } from 'react'
import { Plus, Send, X } from 'lucide-react'
import { POETRY_CATEGORIES } from '../data/shayriData'

// ====================
// COMPONENT CONFIGURATION
// ====================
const FORM_CONFIG = {
  VALIDATION: {
    MIN_TEXT_LENGTH: 10,
    MAX_TEXT_LENGTH: 500,
    MIN_AUTHOR_LENGTH: 2,
    MAX_AUTHOR_LENGTH: 50
  },
  PLACEHOLDERS: {
    TEXT: 'अपनी शायरी यहाँ लिखें...',
    AUTHOR: 'अपना नाम लिखें...',
    IMAGE: 'छवी URL (optional)'
  }
}

// ====================
// STYLES CONSTANTS
// ====================
const FORM_STYLES = {
  container: 'fixed bottom-4 right-4 z-40 max-w-sm',
  toggleButton: 'bg-amber-300 text-zinc-900 rounded-full p-4 shadow-lg hover:bg-amber-400 transition-colors',
  formContainer: 'bg-zinc-900 border border-amber-300/20 rounded-lg shadow-xl p-6 mb-4',
  header: 'flex items-center justify-between mb-4',
  title: 'text-lg font-display text-amber-200',
  closeButton: 'text-zinc-400 hover:text-zinc-200 transition-colors',
  form: 'space-y-4',
  textarea: 'w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-300 focus:outline-none resize-none',
  input: 'w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-300 focus:outline-none',
  select: 'w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:border-amber-300 focus:outline-none',
  button: 'w-full bg-amber-300 text-zinc-900 rounded-lg px-4 py-2 font-medium hover:bg-amber-400 transition-colors flex items-center justify-center gap-2',
  error: 'text-red-400 text-sm mt-1',
  success: 'text-green-400 text-sm mt-1'
}

// ====================
// VALIDATION UTILITIES
// ====================
const validateShayriForm = (formData) => {
  const errors = []
  
  if (!formData.text.trim()) {
    errors.push('शायरी text required है')
  } else if (formData.text.length < FORM_CONFIG.VALIDATION.MIN_TEXT_LENGTH) {
    errors.push(`शायरी कम से कम ${FORM_CONFIG.VALIDATION.MIN_TEXT_LENGTH} characters की होनी चाहिए`)
  } else if (formData.text.length > FORM_CONFIG.VALIDATION.MAX_TEXT_LENGTH) {
    errors.push(`शायरी maximum ${FORM_CONFIG.VALIDATION.MAX_TEXT_LENGTH} characters की हो सकती है`)
  }
  
  if (!formData.author.trim()) {
    errors.push('Author name required है')
  } else if (formData.author.length < FORM_CONFIG.VALIDATION.MIN_AUTHOR_LENGTH) {
    errors.push(`Author name कम से कम ${FORM_CONFIG.VALIDATION.MIN_AUTHOR_LENGTH} characters का होना चाहिए`)
  } else if (formData.author.length > FORM_CONFIG.VALIDATION.MAX_AUTHOR_LENGTH) {
    errors.push(`Author name maximum ${FORM_CONFIG.VALIDATION.MAX_AUTHOR_LENGTH} characters का हो सकता है`)
  }
  
  if (formData.image && !formData.image.match(/^https?:\/\/.+/)) {
    errors.push('Valid image URL required है')
  }
  
  return errors
}

// ====================
// MAIN COMPONENT
// ====================
export default function GuestPostForm({ onPostSubmit }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    text: '',
    author: '',
    category: POETRY_CATEGORIES.ROMANTIC,
    image: ''
  })
  const [errors, setErrors] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([])
    }
  }, [errors.length])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    // Validate form
    const validationErrors = validateShayriForm(formData)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Submit the post
      await onPostSubmit({
        text: formData.text.trim(),
        author: formData.author.trim(),
        category: formData.category,
        imageUrl: formData.image.trim() || undefined
      })
      
      // Reset form and close
      setFormData({
        text: '',
        author: '',
        category: POETRY_CATEGORIES.ROMANTIC,
        image: ''
      })
      setErrors([])
      setIsOpen(false)
      
    } catch (error) {
      console.error('Error submitting post:', error)
      setErrors(['Post submit करने में error आई। Please try again.'])
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, onPostSubmit])

  const toggleForm = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  if (!isOpen) {
    return (
      <div className={FORM_STYLES.container}>
        <button
          onClick={toggleForm}
          className={FORM_STYLES.toggleButton}
          aria-label="Add new shayri"
          title="शायरी पोस्ट करें"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    )
  }

  return (
    <div className={FORM_STYLES.container}>
      <div className={FORM_STYLES.formContainer}>
        <div className={FORM_STYLES.header}>
          <h3 className={FORM_STYLES.title}>शायरी पोस्ट करें</h3>
          <button
            onClick={toggleForm}
            className={FORM_STYLES.closeButton}
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={FORM_STYLES.form}>
          <div>
            <textarea
              value={formData.text}
              onChange={(e) => handleInputChange('text', e.target.value)}
              placeholder={FORM_CONFIG.PLACEHOLDERS.TEXT}
              className={FORM_STYLES.textarea}
              rows={4}
              maxLength={FORM_CONFIG.VALIDATION.MAX_TEXT_LENGTH}
              aria-label="Shayri text"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              placeholder={FORM_CONFIG.PLACEHOLDERS.AUTHOR}
              className={FORM_STYLES.input}
              maxLength={FORM_CONFIG.VALIDATION.MAX_AUTHOR_LENGTH}
              aria-label="Author name"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={FORM_STYLES.select}
              aria-label="Category"
              disabled={isSubmitting}
            >
              {Object.values(POETRY_CATEGORIES).filter(cat => cat !== POETRY_CATEGORIES.ALL).map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
              placeholder={FORM_CONFIG.PLACEHOLDERS.IMAGE}
              className={FORM_STYLES.input}
              aria-label="Image URL (optional)"
              disabled={isSubmitting}
            />
          </div>

          {errors.length > 0 && (
            <div className={FORM_STYLES.error}>
              {errors.map((error, index) => (
                <div key={index}>• {error}</div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className={FORM_STYLES.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              'Posting...'
            ) : (
              <>
                <Send className="w-4 h-4" />
                पोस्ट करें
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

// ====================
// PROP TYPES & VALIDATION
// ====================
GuestPostForm.propTypes = {
  onPostSubmit: 'function'
}
