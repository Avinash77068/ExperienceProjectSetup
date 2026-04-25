/**
 * Poetry Utils - Enterprise Architecture
 * Utility functions for poetry management
 * @author Senior Development Team
 * @version 2.0.0
 */

import { POETRY_CATEGORIES } from '../entities/poetryEntities'

// ====================
// CATEGORY GRADIENTS
// ====================
const CATEGORY_GRADIENTS = {
  [POETRY_CATEGORIES.ROMANTIC]: 'from-pink-500 to-rose-600',
  [POETRY_CATEGORIES.MELANCHOLY]: 'from-blue-600 to-indigo-700',
  [POETRY_CATEGORIES.LIFE]: 'from-green-500 to-emerald-600',
  [POETRY_CATEGORIES.JOY]: 'from-yellow-400 to-orange-500',
  [POETRY_CATEGORIES.SEPARATION]: 'from-purple-500 to-pink-600',
  [POETRY_CATEGORIES.MOTIVATIONAL]: 'from-amber-500 to-red-600',
  [POETRY_CATEGORIES.HEARTBREAK]: 'from-red-600 to-pink-700'
}

// ====================
// POETRY UTILS CLASS
// ====================
export class PoetryUtils {
  /**
   * Get gradient class for category
   * @param {string} category - Poetry category
   * @returns {string} - Gradient CSS classes
   */
  static getCategoryGradient(category) {
    return CATEGORY_GRADIENTS[category] || CATEGORY_GRADIENTS[POETRY_CATEGORIES.LIFE]
  }

  /**
   * Get all available categories
   * @returns {Array} - Array of categories
   */
  static getAllCategories() {
    return Object.values(POETRY_CATEGORIES).filter(cat => cat !== POETRY_CATEGORIES.ALL)
  }

  /**
   * Validate shayri text length
   * @param {string} text - Shayri text
   * @param {number} minLength - Minimum length
   * @param {number} maxLength - Maximum length
   * @returns {Object} - Validation result
   */
  static validateShayriLength(text, minLength = 10, maxLength = 500) {
    const length = text.length
    const isValid = length >= minLength && length <= maxLength
    
    return {
      isValid,
      length,
      error: isValid ? null : `Shayri must be between ${minLength} and ${maxLength} characters`
    }
  }

  /**
   * Format shayri text for display
   * @param {string} text - Raw shayri text
   * @returns {string} - Formatted text
   */
  static formatShayriText(text) {
    return text.replace(/\n/g, '<br />')
  }

  /**
   * Generate share text for social media
   * @param {Object} shayri - Shayri object
   * @returns {string} - Shareable text
   */
  static generateShareText(shayri) {
    return `${shayri.text}\n\n- ${shayri.author}\n\n#Shayri #Poetry #HindiShayri`
  }
}
