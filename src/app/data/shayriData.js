/**
 * Poetry Management System - Configuration & Data Layer
 * Enterprise-grade architecture for Shayri application
 * @author Senior Developer
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
// DOMAIN ENTITIES & ENUMS
// ====================
export const POETRY_CATEGORIES = {
  ALL: 'All',
  ROMANTIC: 'Ishq',
  MELANCHOLY: 'Dard', 
  LIFE: 'Zindagi',
  JOY: 'Khushi',
  SEPARATION: 'Judai'
}

export const CATEGORY_DISPLAY_NAMES = {
  [POETRY_CATEGORIES.ALL]: 'सभी शायरी',
  [POETRY_CATEGORIES.ROMANTIC]: 'इश्क़',
  [POETRY_CATEGORIES.MELANCHOLY]: 'दर्द',
  [POETRY_CATEGORIES.LIFE]: 'ज़िन्दगी',
  [POETRY_CATEGORIES.JOY]: 'खुशी',
  [POETRY_CATEGORIES.SEPARATION]: 'जुदाई'
}

export const CATEGORY_GRADIENTS = {
  [POETRY_CATEGORIES.ROMANTIC]: 'from-rose-700/80 via-pink-600/60 to-amber-500/60',
  [POETRY_CATEGORIES.MELANCHOLY]: 'from-slate-800/90 via-zinc-700/70 to-blue-900/60',
  [POETRY_CATEGORIES.LIFE]: 'from-indigo-700/80 via-purple-700/60 to-amber-500/60',
  [POETRY_CATEGORIES.JOY]: 'from-amber-600/80 via-yellow-500/60 to-orange-500/60',
  [POETRY_CATEGORIES.SEPARATION]: 'from-cyan-800/80 via-slate-700/70 to-zinc-900/80'
}

export const AVAILABLE_CATEGORIES = Object.values(POETRY_CATEGORIES)

// ====================
// DATA VALIDATION SCHEMAS
// ====================
export const ShayriValidationSchema = {
  id: { required: true, type: 'string', pattern: /^[a-zA-Z0-9-]+$/ },
  text: { required: true, type: 'string', minLength: 10, maxLength: 500 },
  category: { required: true, type: 'string', enum: AVAILABLE_CATEGORIES },
  author: { required: true, type: 'string', minLength: 2, maxLength: 50 },
  date: { required: true, type: 'string', pattern: /^\d{4}-\d{2}-\d{2}$/ },
  imageUrl: { required: false, type: 'string', pattern: /^https?:\/\/.+/ }
}

// ====================
// UTILITY FUNCTIONS
// ====================
export const PoetryUtils = {
  /**
   * Validates shayri data against schema
   */
  validateShayri(shayri) {
    const errors = []
    Object.entries(ShayriValidationSchema).forEach(([field, rules]) => {
      if (rules.required && !shayri[field]) {
        errors.push(`${field} is required`)
      }
      if (shayri[field] && rules.type && typeof shayri[field] !== rules.type) {
        errors.push(`${field} must be ${rules.type}`)
      }
      if (shayri[field] && rules.minLength && shayri[field].length < rules.minLength) {
        errors.push(`${field} must be at least ${rules.minLength} characters`)
      }
      if (shayri[field] && rules.maxLength && shayri[field].length > rules.maxLength) {
        errors.push(`${field} must not exceed ${rules.maxLength} characters`)
      }
      if (shayri[field] && rules.enum && !rules.enum.includes(shayri[field])) {
        errors.push(`${field} must be one of: ${rules.enum.join(', ')}`)
      }
    })
    return errors
  },

  /**
   * Generates unique ID for new shayri
   */
  generateShayriId() {
    return `shayri-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  },

  /**
   * Formats date for display
   */
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  },

  /**
   * Gets category gradient class
   */
  getCategoryGradient(category) {
    return CATEGORY_GRADIENTS[category] || CATEGORY_GRADIENTS[POETRY_CATEGORIES.LIFE]
  }
}

// ====================
// MASTER POETRY COLLECTION
// ====================
export const MASTER_POETRY_COLLECTION = [
  {
    id: 'shayri-001',
    text: 'तेरी मुस्कुराहट से रोशन मेरी शाम होती है,\nइश्क़ के इस सफ़र में हर रात गुलज़ार होती है।',
    category: POETRY_CATEGORIES.ROMANTIC,
    author: 'आरिज़ खान',
    date: '2026-01-07',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
    metadata: {
      views: 1250,
      shares: 89,
      featured: true
    }
  },
  {
    id: 'shayri-002',
    text: 'दर्द इतना था कि अल्फाज़ भी खामोश रहे,\nदिल के शहर में बस आँसुओं के मौसम रहे।',
    category: POETRY_CATEGORIES.MELANCHOLY,
    author: 'नूर फातिमा',
    date: '2026-01-12',
    imageUrl: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1200&q=80',
    metadata: {
      views: 980,
      shares: 67,
      featured: false
    }
  },
  {
    id: 'shayri-003',
    text: 'ज़िन्दगी ने हर मोड़ पर नई दास्ताँ लिख दी,\nकभी जीत का गीत, कभी इम्तिहाँ लिख दी।',
    category: POETRY_CATEGORIES.LIFE,
    author: 'रिज़वान अली',
    date: '2026-01-16',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    metadata: {
      views: 1450,
      shares: 112,
      featured: true
    }
  },
  {
    id: 'shayri-004',
    text: 'खुशी की बारिश में भीगता रहा दिल आज,\nदुआओं ने सजाया हर ख़्वाब का महफ़िल आज।',
    category: POETRY_CATEGORIES.JOY,
    author: 'सना परवीन',
    date: '2026-01-20',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    metadata: {
      views: 1100,
      shares: 78,
      featured: false
    }
  },
  {
    id: 'shayri-005',
    text: 'जुदाई का पल था मगर उम्मीद ज़िंदा रही,\nतेरी याद की रोशनी से रात भी चमकती रही।',
    category: POETRY_CATEGORIES.SEPARATION,
    author: 'फ़ैज़ान कुरैशी',
    date: '2026-01-24',
    imageUrl: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1200&q=80',
    metadata: {
      views: 890,
      shares: 56,
      featured: false
    }
  },
  {
    id: 'shayri-006',
    text: 'इश्क़ में हर लम्हा एक नई कहानी होती है,\nदिल की धड़कन भी जैसे ज़ुबानी होती है।',
    category: POETRY_CATEGORIES.ROMANTIC,
    author: 'अली रज़ा',
    date: '2026-01-26',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    metadata: {
      views: 1320,
      shares: 95,
      featured: true
    }
  },
  {
    id: 'shayri-007',
    text: 'दर्द को छुपा के मुस्कुराना सीख लिया,\nहर ग़म को दिल में बसाना सीख लिया।',
    category: POETRY_CATEGORIES.MELANCHOLY,
    author: 'ज़ोया खान',
    date: '2026-01-28',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    metadata: {
      views: 760,
      shares: 43,
      featured: false
    }
  },
  {
    id: 'shayri-008',
    text: 'ज़िन्दगी एक किताब है, हर दिन नया पन्ना,\nकभी खुशी लिखी, कभी ग़म का फ़साना।',
    category: POETRY_CATEGORIES.LIFE,
    author: 'इमरान शेख',
    date: '2026-01-30',
    imageUrl: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7',
    metadata: {
      views: 1180,
      shares: 87,
      featured: false
    }
  },
  {
    id: 'shayri-009',
    text: 'खुशी के पल भी कितने अजीब होते हैं,\nआते हैं चुपके से और याद बन जाते हैं।',
    category: POETRY_CATEGORIES.JOY,
    author: 'मेहक अली',
    date: '2026-02-01',
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    metadata: {
      views: 920,
      shares: 61,
      featured: false
    }
  },
  {
    id: 'shayri-010',
    text: 'जुदाई का दर्द दिल में बस गया है,\nतेरा नाम ही अब दुआ बन गया है।',
    category: POETRY_CATEGORIES.SEPARATION,
    author: 'अरमान मलिक',
    date: '2026-02-03',
    imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
    metadata: {
      views: 1050,
      shares: 72,
      featured: false
    }
  },
  {
    id: 'shayri-011',
    text: 'तेरी आँखों में जो नशा है,\nवही मेरी ज़िन्दगी का सहारा है।',
    category: POETRY_CATEGORIES.ROMANTIC,
    author: 'समीर खान',
    date: '2026-02-05',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    metadata: {
      views: 1680,
      shares: 134,
      featured: true
    }
  },
  {
    id: 'shayri-012',
    text: 'दर्द भी एक अजीब मेहमान है,\nआता है बिना बुलाए और रुक जाता है।',
    category: POETRY_CATEGORIES.MELANCHOLY,
    author: 'निदा शेख',
    date: '2026-02-07',
    imageUrl: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4',
    metadata: {
      views: 840,
      shares: 58,
      featured: false
    }
  },
  {
    id: 'shayri-013',
    text: 'ज़िन्दगी का सफ़र कभी आसान नहीं होता,\nहर मोड़ पर एक इम्तिहाँ होता है।',
    category: POETRY_CATEGORIES.LIFE,
    author: 'फ़हीम अंसारी',
    date: '2026-02-09',
    imageUrl: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833',
    metadata: {
      views: 1290,
      shares: 98,
      featured: false
    }
  },
  {
    id: 'shayri-014',
    text: 'खुशी को ज़ोंदते ज़ोंदते ख़ुद को पा लिया,\nदिल ने आज फिर मुस्कुराना सीख लिया।',
    category: POETRY_CATEGORIES.JOY,
    author: 'आयशा नूर',
    date: '2026-02-11',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    metadata: {
      views: 1150,
      shares: 83,
      featured: false
    }
  },
  {
    id: 'shayri-015',
    text: 'जुदाई का ग़म भी एक कहानी बन गया,\nतेरा नाम ही मेरी ज़िन्दगी बन गया।',
    category: POETRY_CATEGORIES.SEPARATION,
    author: 'साद कुरैशी',
    date: '2026-02-13',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2',
    metadata: {
      views: 970,
      shares: 69,
      featured: false
    }
  },
  {
    id: 'shayri-016',
    text: 'इश्क़ में हर चीज़ ख़ूबसूरत लगती है,\nतेरी याद भी एक इबादत लगती है।',
    category: POETRY_CATEGORIES.ROMANTIC,
    author: 'हसन अली',
    date: '2026-02-15',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    metadata: {
      views: 1420,
      shares: 108,
      featured: true
    }
  },
  {
    id: 'shayri-017',
    text: 'दर्द को लफज़ों में बयाँ करना मुश्किल है,\nदिल का हर राज़ छुपाना मुश्किल है।',
    category: POETRY_CATEGORIES.MELANCHOLY,
    author: 'इक़रा खान',
    date: '2026-02-17',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    metadata: {
      views: 880,
      shares: 62,
      featured: false
    }
  },
  {
    id: 'shayri-018',
    text: 'ज़िन्दगी में कभी हार मत मानना,\nहर रात के बाद सुबह ज़रूर आती है।',
    category: POETRY_CATEGORIES.LIFE,
    author: 'राहुल वर्मा',
    date: '2026-02-19',
    imageUrl: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7',
    metadata: {
      views: 1580,
      shares: 126,
      featured: true
    }
  },
  {
    id: 'shayri-019',
    text: 'खुशी बाँटने से बढ़ती है,\nऔर ग़म बाँटने से कम होता है।',
    category: POETRY_CATEGORIES.JOY,
    author: 'नेहा शर्मा',
    date: '2026-02-21',
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    metadata: {
      views: 1380,
      shares: 102,
      featured: false
    }
  },
  {
    id: 'shayri-020',
    text: 'जुदाई भी एक इम्तिहाँ होती है,\nसच्चा प्यार वही होता है जो इससे पार हो।',
    category: POETRY_CATEGORIES.SEPARATION,
    author: 'बिलाल शेख',
    date: '2026-02-23',
    imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
    metadata: {
      views: 1120,
      shares: 85,
      featured: false
    }
  }
]

// ====================
// DATA ACCESS LAYER
// ====================
export const PoetryRepository = {
  /**
   * Get all shayri with optional filtering
   */
  getAllShayri(filters = {}) {
    let filtered = [...MASTER_POETRY_COLLECTION]
    
    if (filters.category && filters.category !== POETRY_CATEGORIES.ALL) {
      filtered = filtered.filter(shayri => shayri.category === filters.category)
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(shayri => 
        shayri.text.toLowerCase().includes(searchTerm) ||
        shayri.author.toLowerCase().includes(searchTerm) ||
        shayri.category.toLowerCase().includes(searchTerm)
      )
    }
    
    if (filters.featured) {
      filtered = filtered.filter(shayri => shayri.metadata?.featured)
    }
    
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
  },
  
  /**
   * Get shayri by ID
   */
  getShayriById(id) {
    return MASTER_POETRY_COLLECTION.find(shayri => shayri.id === id)
  },
  
  /**
   * Get featured shayri
   */
  getFeaturedShayri(limit = 5) {
    return MASTER_POETRY_COLLECTION
      .filter(shayri => shayri.metadata?.featured)
      .sort((a, b) => b.metadata.views - a.metadata.views)
      .slice(0, limit)
  },
  
  /**
   * Get statistics
   */
  getStatistics() {
    const stats = {
      total: MASTER_POETRY_COLLECTION.length,
      byCategory: {},
      totalViews: 0,
      totalShares: 0,
      featuredCount: 0
    }
    
    MASTER_POETRY_COLLECTION.forEach(shayri => {
      // Category stats
      stats.byCategory[shayri.category] = (stats.byCategory[shayri.category] || 0) + 1
      
      // Engagement stats
      stats.totalViews += shayri.metadata?.views || 0
      stats.totalShares += shayri.metadata?.shares || 0
      
      // Featured count
      if (shayri.metadata?.featured) stats.featuredCount++
    })
    
    return stats
  }
}

// ====================
// LEGACY COMPATIBILITY EXPORTS
// ====================
export const ADMIN_PASSWORD = APPLICATION_CONFIG.SECURITY.ADMIN_CREDENTIALS.PASSWORD
export const STORAGE_KEY = APPLICATION_CONFIG.STORAGE.POSTS_STORAGE_KEY
export const LIKES_KEY = APPLICATION_CONFIG.STORAGE.LIKES_STORAGE_KEY
export const CATEGORIES = AVAILABLE_CATEGORIES
export const SAMPLE_SHAYRIS = MASTER_POETRY_COLLECTION
