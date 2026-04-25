/**
 * Poetry Entities - Enterprise Architecture
 * Domain entities and enums for poetry management
 * @author Senior Development Team
 * @version 2.0.0
 */

// ====================
// DOMAIN ENTITIES & ENUMS
// ====================
export const POETRY_CATEGORIES = {
  ALL: 'All',
  ROMANTIC: 'Ishq',
  MELANCHOLY: 'Dard', 
  LIFE: 'Zindagi',
  JOY: 'Khushi',
  SEPARATION: 'Judai',
  MOTIVATIONAL: 'Motivational',
  HEARTBREAK: 'Heartbreak',
  ATTITUDE: 'Attitude'
}

export const CATEGORY_DISPLAY_NAMES = {
  [POETRY_CATEGORIES.ALL]: 'सभी शायरी',
  [POETRY_CATEGORIES.ROMANTIC]: 'इश्क़',
  [POETRY_CATEGORIES.MELANCHOLY]: 'दर्द',
  [POETRY_CATEGORIES.LIFE]: 'ज़िन्दगी',
  [POETRY_CATEGORIES.JOY]: 'खुशी',
  [POETRY_CATEGORIES.SEPARATION]: 'जुदाई',
  [POETRY_CATEGORIES.MOTIVATIONAL]: 'प्रेरणा',
  [POETRY_CATEGORIES.HEARTBREAK]: 'दिल टूटना',
  [POETRY_CATEGORIES.ATTITUDE]: 'साहस'
}

export const AVAILABLE_CATEGORIES = Object.values(POETRY_CATEGORIES).filter(cat => cat !== POETRY_CATEGORIES.ALL)

// ====================
// HELPER FUNCTIONS
// ====================
export const getCategoryDisplayName = (category) => {
  return CATEGORY_DISPLAY_NAMES[category] || category
}

export const isValidCategory = (category) => {
  return Object.values(POETRY_CATEGORIES).includes(category)
}
