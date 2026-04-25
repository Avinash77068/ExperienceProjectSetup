/**
 * Application Configuration - Enterprise Architecture
 * Central configuration management
 * @author Senior Development Team
 * @version 2.0.0
 */

// ====================
// ENVIRONMENT CONFIGURATION
// ====================
export const APPLICATION_CONFIG = {
  SECURITY: {
    ADMIN_CREDENTIALS: {
      USERNAME: 'admin',
      PASSWORD: 'shayar123'
    }
  },
  STORAGE: {
    POSTS_STORAGE_KEY: 'shayri_posts_v2',
    LIKES_STORAGE_KEY: 'shayri_likes_v2',
    USER_PREFERENCES_KEY: 'shayri_user_prefs_v1'
  },
  UI: {
    ITEMS_PER_PAGE: 12,
    MAX_SHAYRI_LENGTH: 500,
    MIN_SHAYRI_LENGTH: 10
  }
}

// ====================
// LEGACY COMPATIBILITY EXPORTS
// ====================
export const ADMIN_PASSWORD = APPLICATION_CONFIG.SECURITY.ADMIN_CREDENTIALS.PASSWORD
export const STORAGE_KEY = APPLICATION_CONFIG.STORAGE.POSTS_STORAGE_KEY
export const LIKES_KEY = APPLICATION_CONFIG.STORAGE.LIKES_STORAGE_KEY
