/**
 * Shayri Data - Enterprise Architecture
 * Central data export hub for poetry application
 * @author Senior Development Team
 * @version 2.0.0
 */

// ====================
// CONFIGURATION EXPORTS
// ====================
export {
  APPLICATION_CONFIG,
  ADMIN_PASSWORD,
  STORAGE_KEY,
  LIKES_KEY
} from './config/applicationConfig'

// ====================
// ENTITY EXPORTS
// ====================
export {
  POETRY_CATEGORIES,
  CATEGORY_DISPLAY_NAMES,
  AVAILABLE_CATEGORIES,
  getCategoryDisplayName,
  isValidCategory
} from './entities/poetryEntities'

export {
  USER_ROLES,
  USER_STATUS,
  USER_PERMISSIONS,
  getUserRoleDisplayName,
  getUserStatusDisplayName,
  hasPermission,
  isAdmin
} from './entities/userEntities'

// ====================
// DATA REPOSITORY EXPORTS
// ====================
export {
  MASTER_POETRY_COLLECTION,
  PoetryRepository
} from './repositories/poetryData'

export {
  MOCK_USERS,
  UserRepository
} from './repositories/userData'

// ====================
// UTILS EXPORTS
// ====================
export {
  PoetryUtils
} from './utils/poetryUtils'

// ====================
// LEGACY COMPATIBILITY EXPORTS
// ====================
import { AVAILABLE_CATEGORIES as IMPORTED_AVAILABLE_CATEGORIES } from './entities/poetryEntities'
import { MASTER_POETRY_COLLECTION as IMPORTED_MASTER_POETRY_COLLECTION } from './repositories/poetryData'

export const CATEGORIES = IMPORTED_AVAILABLE_CATEGORIES
export const SAMPLE_SHAYRIS = IMPORTED_MASTER_POETRY_COLLECTION
