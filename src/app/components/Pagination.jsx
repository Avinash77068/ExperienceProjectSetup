/**
 * Pagination Component - Enterprise Architecture
 * Advanced pagination with smart page display and accessibility
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useMemo, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ChevronFirst, ChevronLast } from 'lucide-react'

// ====================
// COMPONENT CONFIGURATION
// ====================
const PAGINATION_CONFIG = {
  DISPLAY: {
    MAX_VISIBLE_PAGES: 5,
    MIN_ITEMS_FOR_PAGINATION: 2,
    ELLIPSIS_THRESHOLD: 7
  },
  ANIMATION: {
    TRANSITION_DURATION: '200ms',
    HOVER_SCALE: 1.05
  },
  ACCESSIBILITY: {
    ARIA_LIVE_REGION: 'polite',
    SKIP_LINK_TEXT: 'Skip to content'
  }
}

// ====================
// STYLES CONSTANTS
// ====================
const PAGINATION_STYLES = {
  container: 'flex flex-col items-center gap-4',
  info: 'text-sm text-zinc-400',
  controls: 'flex items-center gap-1',
  button: 'rounded-lg border border-zinc-700 bg-zinc-900/40 p-2 text-sm transition-all duration-200 hover:border-amber-300 hover:text-amber-200 disabled:opacity-50 disabled:cursor-not-allowed',
  buttonPage: 'rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200',
  buttonActive: 'border-amber-300 bg-amber-300 text-zinc-950',
  buttonInactive: 'border-zinc-700 bg-zinc-900/40 text-zinc-300 hover:border-amber-300/70 hover:text-amber-100',
  buttonIcon: 'w-4 h-4',
  ellipsis: 'px-2 text-zinc-400',
  mobileInfo: 'md:hidden text-xs text-zinc-500'
}

// ====================
// UTILITY FUNCTIONS
// ====================
const generatePageRange = (currentPage, totalPages, maxVisible) => {
  const pages = []
  const halfVisible = Math.floor(maxVisible / 2)
  
  if (totalPages <= maxVisible) {
    // Show all pages if total is less than max visible
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Smart range calculation
    let start = Math.max(1, currentPage - halfVisible)
    let end = Math.min(totalPages, start + maxVisible - 1)
    
    // Adjust range if we're near the end
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }
    
    // Add ellipsis and first/last pages as needed
    if (start > 1) {
      pages.push(1)
      if (start > 2) {
        pages.push('...')
      }
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...')
      }
      pages.push(totalPages)
    }
  }
  
  return pages
}

const calculateItemRange = (currentPage, itemsPerPage, totalItems) => {
  const start = (currentPage - 1) * itemsPerPage + 1
  const end = Math.min(currentPage * itemsPerPage, totalItems)
  return { start, end }
}

// ====================
// HOOKS
// ====================
const usePaginationState = (currentPage, totalPages, onPageChange) => {
  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentPage, totalPages, onPageChange])
  
  const handlePrevious = useCallback(() => {
    handlePageChange(currentPage - 1)
  }, [currentPage, handlePageChange])
  
  const handleNext = useCallback(() => {
    handlePageChange(currentPage + 1)
  }, [currentPage, handlePageChange])
  
  const handleFirst = useCallback(() => {
    handlePageChange(1)
  }, [handlePageChange])
  
  const handleLast = useCallback(() => {
    handlePageChange(totalPages)
  }, [totalPages, handlePageChange])
  
  return {
    handlePageChange,
    handlePrevious,
    handleNext,
    handleFirst,
    handleLast
  }
}

// ====================
// SUB-COMPONENTS
// ====================
const PaginationInfo = ({ currentPage, itemsPerPage, totalItems, className = '' }) => {
  const { start, end } = calculateItemRange(currentPage, itemsPerPage, totalItems)
  
  return (
    <div className={`${PAGINATION_STYLES.info} ${className}`}>
      Showing {start}-{end} of {totalItems} items
    </div>
  )
}

const PaginationButton = ({ 
  onClick, 
  disabled, 
  children, 
  isActive = false, 
  ariaLabel,
  className = '' 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${
      isActive 
        ? PAGINATION_STYLES.buttonActive
        : PAGINATION_STYLES.buttonInactive
    } ${className}`}
    aria-label={ariaLabel}
    aria-current={isActive ? 'page' : undefined}
  >
    {children}
  </button>
)

const NavigationButton = ({ 
  onClick, 
  disabled, 
  icon, 
  ariaLabel,
  direction 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={PAGINATION_STYLES.button}
    aria-label={ariaLabel}
    title={ariaLabel}
  >
    {icon}
  </button>
)

const PageNumbers = ({ 
  pages, 
  currentPage, 
  onPageChange 
}) => (
  <div className="flex items-center gap-1">
    {pages.map((page, index) => (
      page === '...' ? (
        <span key={`ellipsis-${index}`} className={PAGINATION_STYLES.ellipsis}>
          ...
        </span>
      ) : (
        <PaginationButton
          key={page}
          onClick={() => onPageChange(page)}
          isActive={currentPage === page}
          ariaLabel={`Go to page ${page}`}
        >
          {page}
        </PaginationButton>
      )
    ))}
  </div>
)

const MobilePaginationInfo = ({ currentPage, totalPages }) => (
  <div className={PAGINATION_STYLES.mobileInfo}>
    Page {currentPage} of {totalPages}
  </div>
)

// ====================
// MAIN COMPONENT
// ====================
export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  itemsPerPage = 12,
  totalItems = 0,
  showInfo = true,
  showFirstLast = true,
  maxVisiblePages = PAGINATION_CONFIG.DISPLAY.MAX_VISIBLE_PAGES,
  className = ''
}) {
  // Don't render pagination if not needed
  if (totalPages <= 1 || totalItems <= PAGINATION_CONFIG.DISPLAY.MIN_ITEMS_FOR_PAGINATION) {
    return null
  }
  
  // Generate page numbers
  const visiblePages = useMemo(() => 
    generatePageRange(currentPage, totalPages, maxVisiblePages),
    [currentPage, totalPages, maxVisiblePages]
  )
  
  // Pagination handlers
  const {
    handlePageChange,
    handlePrevious,
    handleNext,
    handleFirst,
    handleLast
  } = usePaginationState(currentPage, totalPages, onPageChange)
  
  // Button states
  const isPreviousDisabled = currentPage === 1
  const isNextDisabled = currentPage === totalPages
  const isFirstDisabled = currentPage === 1
  const isLastDisabled = currentPage === totalPages
  
  return (
    <nav 
      className={`${PAGINATION_STYLES.container} ${className}`}
      aria-label="Pagination navigation"
      role="navigation"
    >
      {showInfo && (
        <>
          <PaginationInfo
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            className="hidden md:block"
          />
          <MobilePaginationInfo
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
      
      <div className={PAGINATION_STYLES.controls}>
        {showFirstLast && (
          <>
            <NavigationButton
              onClick={handleFirst}
              disabled={isFirstDisabled}
              icon={<ChevronFirst className={PAGINATION_STYLES.buttonIcon} />}
              ariaLabel="Go to first page"
              direction="first"
            />
            <NavigationButton
              onClick={handlePrevious}
              disabled={isPreviousDisabled}
              icon={<ChevronLeft className={PAGINATION_STYLES.buttonIcon} />}
              ariaLabel="Go to previous page"
              direction="previous"
            />
          </>
        )}
        
        <PageNumbers
          pages={visiblePages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        
        {showFirstLast && (
          <>
            <NavigationButton
              onClick={handleNext}
              disabled={isNextDisabled}
              icon={<ChevronRight className={PAGINATION_STYLES.buttonIcon} />}
              ariaLabel="Go to next page"
              direction="next"
            />
            <NavigationButton
              onClick={handleLast}
              disabled={isLastDisabled}
              icon={<ChevronLast className={PAGINATION_STYLES.buttonIcon} />}
              ariaLabel="Go to last page"
              direction="last"
            />
          </>
        )}
      </div>
      
      {/* Screen reader announcements */}
      <div 
        className="sr-only" 
        aria-live={PAGINATION_CONFIG.ACCESSIBILITY.ARIA_LIVE_REGION}
        aria-atomic="true"
      >
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  )
}

// ====================
// PROP TYPES & VALIDATION
// ====================
Pagination.propTypes = {
  currentPage: 'number',
  totalPages: 'number',
  onPageChange: 'function',
  itemsPerPage: 'number',
  totalItems: 'number',
  showInfo: 'boolean',
  showFirstLast: 'boolean',
  maxVisiblePages: 'number',
  className: 'string'
}

// ====================
// DEFAULT PROPS
// ====================
Pagination.defaultProps = {
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 12,
  totalItems: 0,
  showInfo: true,
  showFirstLast: true,
  maxVisiblePages: PAGINATION_CONFIG.DISPLAY.MAX_VISIBLE_PAGES,
  className: ''
}
