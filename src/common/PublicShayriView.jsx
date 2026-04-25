/**
 * Public Poetry View Component - Enterprise Architecture
 * Main public interface for browsing shayri collection
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useState, useMemo, useCallback } from 'react'
import ShayriCard from '../components/ShayriCard'
import Header from './Header'
import Pagination from './Pagination'
import { FiHome, FiSettings, FiSearch, FiFilter, FiPlus } from 'react-icons/fi'
import { AVAILABLE_CATEGORIES, PoetryRepository } from '../data/shayriData'

// ====================
// COMPONENT CONFIGURATION
// ====================
const VIEW_CONFIG = {
  LAYOUT: {
    GRID_COLS: {
      DEFAULT: 'grid-cols-1',
      SM: 'sm:grid-cols-2',
      LG: 'lg:grid-cols-3',
      XL: 'xl:grid-cols-4'
    },
    GAP: 'gap-5',
    CONTAINER_MAX_WIDTH: '7xl'
  },
  SEARCH: {
    DEBOUNCE_DELAY: 300,
    MIN_SEARCH_LENGTH: 2,
    PLACEHOLDER: 'Search shayri, author, category...'
  },
  ANIMATION: {
    FADE_IN_DURATION: '500ms',
    STAGGER_DELAY: '100ms'
  }
}

// ====================
// STYLES CONSTANTS
// ====================
const VIEW_STYLES = {
  container: 'min-h-screen bg-[#0a0a0f] px-4 py-8 text-zinc-100',
  wrapper: 'mx-auto max-w-7xl mt-20',
  headerSection: 'mb-8',
  controlsSection: 'mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
  categoryFilters: 'flex flex-wrap gap-2',
  categoryButton: 'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
  categoryButtonActive: 'border-amber-300 bg-amber-300 text-zinc-950',
  categoryButtonInactive: 'border-zinc-700 text-zinc-300 hover:border-amber-300/70 hover:text-amber-100',
  searchInput: 'w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 focus:border-amber-300 focus:outline-none md:w-80',
  shayriGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5',
  emptyState: 'mt-10 text-center text-zinc-400',
  paginationSection: 'mt-8'
}

// ====================
// UTILITY HOOKS
// ====================
const usePublicPoetryState = (initialCategory = 'All', initialSearch = '') => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category)
  }, [])
  
  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value)
  }, [])
  
  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true)
  }, [])
  
  const handleSearchBlur = useCallback(() => {
    setIsSearchFocused(false)
  }, [])
  
  return {
    selectedCategory,
    searchTerm,
    isSearchFocused,
    handleCategoryChange,
    handleSearchChange,
    handleSearchFocus,
    handleSearchBlur
  }
}

// ====================
// DATA PROCESSING
// ====================
const processPoetryData = (categories, selectedCategory, searchTerm) => {
  const filteredPosts = useMemo(() => {
    return PoetryRepository.getAllShayri({
      category: selectedCategory,
      search: searchTerm
    })
  }, [selectedCategory, searchTerm])
  
  const categoryStats = useMemo(() => {
    const stats = PoetryRepository.getStatistics()
    return categories.map(category => ({
      name: category,
      count: category === 'All' ? stats.total : (stats.byCategory[category] || 0)
    }))
  }, [categories])
  
  return {
    filteredPosts,
    categoryStats
  }
}

// ====================
// EVENT HANDLERS
// ====================
const createEventHandlers = (callbacks) => {
  const { onNavigationClick, onUserAction, onPageChange, onPostSubmit } = callbacks
  
  const handleNavigation = useCallback((item) => {
    if (onNavigationClick) onNavigationClick(item)
  }, [onNavigationClick])
  
  const handleUserAction = useCallback((action) => {
    if (action.action === 'admin') {
      window.location.hash = '#admin'
    } else if (action.action === 'guest') {
      window.location.hash = '#guest'
    } else if (action.action === 'post' && action.data) {
      // Handle post submission from popup
      if (onPostSubmit) {
        onPostSubmit(action.data)
      }
    }
    if (onUserAction) onUserAction(action)
  }, [onUserAction, onPostSubmit])
  
  const handlePageChange = useCallback((page) => {
    if (onPageChange) onPageChange(page)
  }, [onPageChange])
  
  return {
    handleNavigation,
    handleUserAction,
    handlePageChange
  }
}

// ====================
// SUB-COMPONENTS
// ====================
const PoetryHeader = ({ onNavigationClick, onUserAction, isGuestMode, canPost }) => {
  const navigationItems = [
    { label: 'Home', path: '/', icon: FiHome },
    { label: 'Categories', path: '/categories', icon: FiFilter },
    { label: 'About', path: '/about', icon: FiHome }
  ]
  
  const user = {
    name: isGuestMode ? 'Guest Mode' : 'Login',
    actions: [
      { label: 'Admin Panel', icon: FiSettings, action: 'admin' },
      { label: 'Guest Mode', icon: FiFilter, action: 'guest' },
      ...(canPost ? [{ label: 'Post Shayri', icon: FiPlus, action: 'post' }] : [])
    ]
  }
  
  return (
    <Header
      title="Rooh-e-Shayri"
      subtitle="Alfaaz ki Mehfil - Ishq, dard aur zindagi ke ehsaas"
      navigationItems={navigationItems}
      user={user}
      onNavigationClick={onNavigationClick}
      onUserAction={onUserAction}
      className="bg-[#0a0a0f] text-white border-amber-300/20"
    />
  )
}

const SEOContent = () => (
  <section className="max-w-4xl mx-auto px-6 py-8 text-zinc-300">
    <h2 className="text-4xl font-bold text-white mb-6 text-center">
      AllShayri - हिंदी उर्दू शायरी का बेहतरीन संग्रह
    </h2>
    
    <div className="prose prose-invert max-w-none mb-8">
      <h3 className="text-2xl font-semibold text-white mb-4">शायरी की दुनिया में आपका स्वागत</h3>
      
      <p className="text-lg leading-relaxed mb-4">
        AllShayri.info पर आपका स्वागत है। यहाँ मिलेगी हर जज़्बात की शायरी —
        मोहब्बत की, दर्द की, दोस्ती की और ज़िंदगी की।
        हमारे पास हज़ारों बेहतरीन हिंदी और उर्दू शायरियों का संग्रह है।
      </p>
      
      <h3 className="text-2xl font-semibold text-white mb-4 mt-6">हर जज़्बात की शायरी</h3>
      
      <p className="text-lg leading-relaxed mb-6">
        चाहे आप <strong>Love Shayari</strong> ढूंढ रहे हों अपने प्यार के लिए,
        या <strong>Sad Shayari</strong> अपने दर्द को बयां करने के लिए —
        AllShayri.info पर सब कुछ मिलेगा। रोज़ नई शायरियाँ अपडेट होती हैं।
      </p>
    </div>
    
    <nav aria-label="Shayri Categories" className="mb-8">
      <h3 className="text-2xl font-bold text-white mb-4">शायरी की श्रेणियाँ</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <a href="#love" className="block p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-center">
          <span className="text-amber-400">❤️</span> Love Shayari
        </a>
        <a href="#sad" className="block p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-center">
          <span className="text-blue-400">💔</span> Sad Shayri
        </a>
        <a href="#dard" className="block p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-center">
          <span className="text-purple-400">😢</span> Dard Shayri
        </a>
        <a href="#dosti" className="block p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-center">
          <span className="text-green-400">🤝</span> Dosti Shayri
        </a>
        <a href="#mohabbat" className="block p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-center">
          <span className="text-red-400">💕</span> Mohabbat Shayri
        </a>
        <a href="#attitude" className="block p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-center">
          <span className="text-amber-400">😎</span> Attitude Shayri
        </a>
        <a href="#bewafa" className="block p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-center">
          <span className="text-gray-400">😞</span> Bewafa Shayri
        </a>
        <a href="#2line" className="block p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-center">
          <span className="text-cyan-400">📝</span> 2 Line Shayri
        </a>
        <a href="#romantic" className="block p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-center">
          <span className="text-pink-400">🌹</span> Romantic Shayri
        </a>
        <a href="#ishq" className="block p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-center">
          <span className="text-red-500">🔥</span> Ishq Shayari
        </a>
      </div>
    </nav>
    
    <div className="text-center">
      <p className="text-sm text-zinc-400 mb-4">
        हमारी शायरी collection में 10,000+ shayri हैं और हर दिन नई शायरियाँ जुड़ती हैं।
      </p>
      <a 
        href="https://github.com/Avinash77068/ExperienceProjectSetup" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-zinc-900 rounded-lg hover:bg-amber-400 transition-colors font-medium"
      >
        <span>⭐</span> GitHub पर Star करें
      </a>
    </div>
  </section>
)

const PoetryFilters = ({ 
  categories, 
  selectedCategory, 
  searchTerm, 
  onCategoryChange, 
  onSearchChange,
  categoryStats 
}) => (
  <section className={VIEW_STYLES.controlsSection}>
    <div className={VIEW_STYLES.categoryFilters}>
      {categories.map((category) => {
        const isActive = selectedCategory === category
        const stat = categoryStats.find(s => s.name === category)
        const count = stat?.count || 0
        
        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`${VIEW_STYLES.categoryButton} ${
              isActive ? VIEW_STYLES.categoryButtonActive : VIEW_STYLES.categoryButtonInactive
            }`}
            aria-label={`Filter by ${category}`}
            aria-pressed={isActive}
          >
            {category} {count > 0 && `(${count})`}
          </button>
        )
      })}
    </div>

    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={VIEW_CONFIG.SEARCH.PLACEHOLDER}
        className={`${VIEW_STYLES.searchInput} pl-10`}
        aria-label="Search shayri"
      />
    </div>
  </section>
)

const PoetryGrid = ({ posts, copiedId, likes, onCopy, onLike }) => (
  <section className={VIEW_STYLES.shayriGrid}>
    {posts.map((post, index) => (
      <ShayriCard
        key={post.id}
        post={post}
        copiedId={copiedId}
        likeCount={likes[post.id] ?? 0}
        onCopy={onCopy}
        onLike={onLike}
        style={{
          animationDelay: `${index * parseInt(VIEW_CONFIG.ANIMATION.STAGGER_DELAY)}ms`
        }}
      />
    ))}
  </section>
)

const PoetryEmptyState = ({ searchTerm, selectedCategory }) => {
  const isSearchActive = searchTerm.trim().length > 0
  const isCategoryFiltered = selectedCategory !== 'All'
  
  let message = 'Koi shayri nahi mili.'
  if (isSearchActive && isCategoryFiltered) {
    message = `"${searchTerm}" ke liye ${selectedCategory} category mein koi shayri nahi mili.`
  } else if (isSearchActive) {
    message = `"${searchTerm}" ke liye koi shayri nahi mili.`
  } else if (isCategoryFiltered) {
    message = `${selectedCategory} category mein koi shayri nahi mili.`
  }
  
  return (
    <div className={VIEW_STYLES.emptyState}>
      <FiSearch className="w-12 h-12 mx-auto mb-4 text-zinc-500" />
      <p className="text-lg mb-2">{message}</p>
      <p className="text-sm">Dusra keyword ya category try karein.</p>
    </div>
  )
}

// ====================
// MAIN COMPONENT
// ====================
export default function PublicShayriView({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  filteredPosts,
  copiedId,
  likes,
  onCopy,
  onLike,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  isGuestMode = false,
  canPost = false,
  onPostSubmit
}) {
  // State management
  const poetryState = usePublicPoetryState(selectedCategory, searchTerm)
  
  // Data processing
  const { categoryStats } = processPoetryData(categories, selectedCategory, searchTerm)
  
  // Event handlers
  const { handleNavigation, handleUserAction, handlePageChange } = createEventHandlers({
    onNavigationClick: () => {},
    onUserAction: () => {},
    onPageChange,
    onPostSubmit: onPostSubmit || (() => {})
  })
  
  // Memoized handlers
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category)
  }, [setSelectedCategory])
  
  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value)
  }, [setSearchTerm])
  
  return (
    <>
      <PoetryHeader 
        onNavigationClick={handleNavigation}
        onUserAction={handleUserAction}
        isGuestMode={isGuestMode}
        canPost={canPost}
      />
      
      <main className={VIEW_STYLES.container}>
        <div className={VIEW_STYLES.wrapper}>
          {/* SEO Content - Only show on home page when no filters are applied */}
          {selectedCategory === 'All' && !searchTerm && (
            <SEOContent />
          )}
          
          <PoetryFilters
            categories={categories}
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            onCategoryChange={handleCategoryChange}
            onSearchChange={handleSearchChange}
            categoryStats={categoryStats}
          />

          {filteredPosts.length > 0 ? (
            <>
              <PoetryGrid
                posts={filteredPosts}
                copiedId={copiedId}
                likes={likes}
                onCopy={onCopy}
                onLike={onLike}
              />
              
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                className={VIEW_STYLES.paginationSection}
              />
            </>
          ) : (
            <PoetryEmptyState
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
            />
          )}
        </div>
      </main>
    </>
  )
}

// ====================
// PROP TYPES & VALIDATION
// ====================
PublicShayriView.propTypes = {
  categories: 'array',
  selectedCategory: 'string',
  setSelectedCategory: 'function',
  searchTerm: 'string',
  setSearchTerm: 'function',
  filteredPosts: 'array',
  copiedId: 'string',
  likes: 'object',
  onCopy: 'function',
  onLike: 'function',
  currentPage: 'number',
  totalPages: 'number',
  onPageChange: 'function',
  totalItems: 'number',
  itemsPerPage: 'number'
}
