/**
 * Public Poetry View Component - Enterprise Architecture
 * Main public interface for browsing shayri collection
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useState, useMemo, useCallback } from 'react'
import ShayriCard from './ShayriCard'
import Header from './Header'
import Pagination from './Pagination'
import { FiHome, FiSettings, FiSearch, FiFilter } from 'react-icons/fi'
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
  const { onNavigationClick, onUserAction, onPageChange } = callbacks
  
  const handleNavigation = useCallback((item) => {
    if (onNavigationClick) onNavigationClick(item)
  }, [onNavigationClick])
  
  const handleUserAction = useCallback((action) => {
    if (action.action === 'admin') {
      window.location.hash = '#admin'
    }
    if (onUserAction) onUserAction(action)
  }, [onUserAction])
  
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
const PoetryHeader = ({ onNavigationClick, onUserAction }) => {
  const navigationItems = [
    { label: 'Home', path: '/', icon: FiHome },
    { label: 'Categories', path: '/categories', icon: FiFilter },
    { label: 'About', path: '/about', icon: FiHome }
  ]
  
  const user = {
    name: 'Guest',
    actions: [
      { label: 'Admin Panel', icon: FiSettings, action: 'admin' }
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
  itemsPerPage
}) {
  // State management
  const poetryState = usePublicPoetryState(selectedCategory, searchTerm)
  
  // Data processing
  const { categoryStats } = processPoetryData(categories, selectedCategory, searchTerm)
  
  // Event handlers
  const { handleNavigation, handleUserAction, handlePageChange } = createEventHandlers({
    onNavigationClick: () => {},
    onUserAction: () => {},
    onPageChange
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
      />
      
      <main className={VIEW_STYLES.container}>
        <div className={VIEW_STYLES.wrapper}>
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
