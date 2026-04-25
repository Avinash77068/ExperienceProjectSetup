import React, { useState, useCallback, useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import { Menu, User, X } from 'lucide-react'
import GuestPostForm from './GuestPostForm'

/**
 * Header Component - Enterprise Architecture
 * Generic, reusable header with navigation and user actions
 * @author Senior Development Team
 * @version 2.0.0
 */

// ====================
// COMPONENT CONFIGURATION
// ====================
const HEADER_CONFIG = {
  LAYOUT: {
    HEIGHT: 'auto',
    PADDING: 'py-4',
    BORDER_WIDTH: 'border-b'
  },
  NAVIGATION: {
    MAX_VISIBLE_ITEMS: 5,
    MOBILE_BREAKPOINT: 'md',
    ANIMATION_DURATION: '300ms'
  },
  ACCESSIBILITY: {
    SKIP_LINK_TEXT: 'Skip to main content',
    NAV_ARIA_LABEL: 'Main navigation'
  }
}

// ====================
// STYLES CONSTANTS
// ====================
const HEADER_STYLES = {
  container:
    "w-full fixed top-0 left-0 right-0 z-50 py-4 border-b border-gray-200 text-gray-900",
  inner: "container mx-auto px-4",
  content: "flex items-center justify-between",
  brand: "flex-shrink-0",
  title: "font-display text-2xl font-bold",
  subtitle: "text-sm opacity-75",
  navigation: "hidden md:flex items-center space-x-6",
  navigationMobile: "md:hidden",
  userSection: "flex items-center space-x-4 cursor-pointer",
  userButton:
    "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer",
  userAvatar:
    "w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer",
  dropdown:
    "absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg",
  dropdownItem:
    "block w-full bg-black text-white text-left px-4 py-2 text-sm rounded-lg transition-colors",
  mobileMenuButton: "md:hidden p-2 rounded-lg cursor-pointer",
  mobileMenu:
    "absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg",
  mobileNavigation: "py-4 space-y-2",
};

// ====================
// UTILITY HOOKS
// ====================
const useHeaderState = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isGuestFormOpen, setIsGuestFormOpen] = useState(false)
  
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])
  
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])
  
  const toggleUserDropdown = useCallback(() => {
    setIsUserDropdownOpen(prev => !prev)
  }, [])
  
  const closeUserDropdown = useCallback(() => {
    setIsUserDropdownOpen(false)
  }, [])
  
  const toggleGuestForm = useCallback(() => {
    setIsGuestFormOpen(prev => !prev)
  }, [])
  
  const closeGuestForm = useCallback(() => {
    setIsGuestFormOpen(false)
  }, [])
  
  return {
    isMobileMenuOpen,
    isUserDropdownOpen,
    isGuestFormOpen,
    toggleMobileMenu,
    closeMobileMenu,
    toggleUserDropdown,
    closeUserDropdown,
    toggleGuestForm,
    closeGuestForm
  }
}

// ====================
// EVENT HANDLERS
// ====================
const createHeaderHandlers = (callbacks) => {
  const { onNavigationClick, onUserAction } = callbacks
  
  const handleNavigationClick = useCallback((item) => {
    if (onNavigationClick) onNavigationClick(item)
  }, [onNavigationClick])
  
  const handleUserAction = useCallback((action) => {
    if (onUserAction) onUserAction(action)
  }, [onUserAction])
  
  return {
    handleNavigationClick,
    handleUserAction
  }
}

// ====================
// SUB-COMPONENTS
// ====================
const HeaderBrand = ({ title, subtitle, className = '' }) => (
  <div className={`${HEADER_STYLES.brand} ${className}`}>
    <h1 className={HEADER_STYLES.title}>{title}</h1>
    {subtitle && <p className={HEADER_STYLES.subtitle}>{subtitle}</p>}
  </div>
)

const NavigationDesktop = ({ 
  items, 
  onItemClick, 
  className = '' 
}) => (
  <nav className={`${HEADER_STYLES.navigation} ${className}`} aria-label={HEADER_CONFIG.ACCESSIBILITY.NAV_ARIA_LABEL}>
    {items.slice(0, HEADER_CONFIG.NAVIGATION.MAX_VISIBLE_ITEMS).map((item) => (
      <button
        key={item.path || item.label}
        onClick={() => onItemClick(item)}
        className="text-sm font-medium hover:text-gray-600 transition-colors"
        aria-label={`Navigate to ${item.label}`}
      >
        {item.label}
      </button>
    ))}
  </nav>
)

const NavigationMobile = ({ 
  items, 
  onItemClick, 
  isOpen, 
  onClose 
}) => (
  <div className={`${HEADER_STYLES.mobileMenu} ${isOpen ? 'block' : 'hidden'}`}>
    <div className={HEADER_STYLES.mobileNavigation}>
      {items.map((item) => (
        <button
          key={item.path || item.label}
          onClick={() => {
            onItemClick(item)
            onClose()
          }}
          className="block w-full text-left px-6 py-2 text-sm hover:bg-gray-100 transition-colors"
          aria-label={`Navigate to ${item.label}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  </div>
)

const UserSection = ({ 
  user, 
  onUserAction, 
  isDropdownOpen, 
  onToggleDropdown,
  onCloseDropdown 
}) => {
  const userInitial = user?.name?.charAt(0).toUpperCase() || 'G'
  
  // Always show user section even if user is null
  return (
    <div className={HEADER_STYLES.userSection} data-user-dropdown>
      <button
        onClick={onToggleDropdown}
        className={HEADER_STYLES.userButton}
        aria-label="User menu"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        <div className={HEADER_STYLES.userAvatar}>
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <User className="w-4 h-4" />
          )}
        </div>
        <span className="text-sm font-medium">{user?.name || 'Guest'}</span>
      </button>
      
      {isDropdownOpen && (
        <div className={HEADER_STYLES.dropdown}>
          {user?.actions?.map((action) => {
            const Icon = action.icon || Settings
            return (
              <button
                key={action.action || action.label}
                onClick={() => {
                  onUserAction(action)
                  onCloseDropdown()
                }}
                className={HEADER_STYLES.dropdownItem}
                aria-label={action.label}
              >
                <Icon className="inline w-4 h-4 mr-2" />
                {action.label}
              </button>
            )
          })}
          
          {user?.name && (
            <button
              onClick={() => {
                onUserAction({ action: 'logout' })
                onCloseDropdown()
              }}
              className={`${HEADER_STYLES.dropdownItem} text-red-600 hover:bg-red-50`}
              aria-label="Logout"
            >
              <LogOut className="inline w-4 h-4 mr-2" />
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  )
}


const MobileMenuButton = ({ 
  isOpen, 
  onToggle 
}) => (
  <button
    onClick={onToggle}
    className={HEADER_STYLES.mobileMenuButton}
    aria-label="Toggle mobile menu"
    aria-expanded={isOpen}
  >
    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
  </button>
)

const SkipLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md"
    aria-label={HEADER_CONFIG.ACCESSIBILITY.SKIP_LINK_TEXT}
  >
    {HEADER_CONFIG.ACCESSIBILITY.SKIP_LINK_TEXT}
  </a>
)

// ====================
// MAIN COMPONENT
// ====================
export default function Header({
  title,
  subtitle,
  navigationItems = [],
  user = null,
  onNavigationClick,
  onUserAction,
  className = '',
  showSkipLink = true,
  variant = 'default'
}) {
  // State management
  const headerState = useHeaderState()
  const {
    isMobileMenuOpen,
    isUserDropdownOpen,
    isGuestFormOpen,
    toggleMobileMenu,
    closeMobileMenu,
    toggleUserDropdown,
    closeUserDropdown,
    toggleGuestForm,
    closeGuestForm
  } = headerState
  
  // Event handlers
  const { handleNavigationClick, handleUserAction } = createHeaderHandlers({
    onNavigationClick,
    onUserAction
  })
  
  // Close dropdowns when clicking outside
  useMemo(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('[data-user-dropdown]')) {
        closeUserDropdown()
      }
      if (!event.target.closest('[data-mobile-menu]')) {
        closeMobileMenu()
      }
    }
    
    if (isUserDropdownOpen || isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isUserDropdownOpen, isMobileMenuOpen, closeUserDropdown, closeMobileMenu])
  
  return (
    <>
      {showSkipLink && <SkipLink />}
      
      <header className={`${HEADER_STYLES.container} ${className}`} data-header-variant={variant}>
        <div className={HEADER_STYLES.inner}>
          <div className={HEADER_STYLES.content}>
            <HeaderBrand title={title} subtitle={subtitle} />
            
            <NavigationDesktop
              items={navigationItems}
              onItemClick={handleNavigationClick}
            />
            
            <div className="flex items-center space-x-4">
              {/* Add Shayri Button */}
              {user?.actions?.some(action => action.action === 'post') && (
                <button
                  onClick={toggleGuestForm}
                  className="flex items-center gap-2 rounded-lg bg-amber-300 text-zinc-900 px-4 py-2 text-sm font-medium hover:bg-amber-400 transition-colors"
                  aria-label="Add new shayri"
                >
                  <FiPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Shayri</span>
                </button>
              )}
              
              <UserSection
                user={user}
                onUserAction={handleUserAction}
                isDropdownOpen={isUserDropdownOpen}
                onToggleDropdown={toggleUserDropdown}
                onCloseDropdown={closeUserDropdown}
                data-user-dropdown
              />
              
              <MobileMenuButton
                isOpen={isMobileMenuOpen}
                onToggle={toggleMobileMenu}
                data-mobile-menu
              />
            </div>
          </div>
          
          <NavigationMobile
            items={navigationItems}
            onItemClick={handleNavigationClick}
            isOpen={isMobileMenuOpen}
            onClose={closeMobileMenu}
          />
        </div>
      </header>
      
      {/* Guest Post Form Popup */}
      {isGuestFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-zinc-900 rounded-2xl border border-amber-300/30 p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-amber-200">Add New Shayri</h2>
              <button
                onClick={closeGuestForm}
                className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label="Close form"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
            
            <GuestPostForm 
              isPopup={true}
              onPostSubmit={(data) => {
                // Handle form submission
                if (onUserAction) {
                  onUserAction({ action: 'post', data })
                }
                closeGuestForm()
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}

// ====================
// PROP TYPES & VALIDATION
// ====================
Header.propTypes = {
  title: 'string',
  subtitle: 'string',
  navigationItems: 'array',
  user: 'object',
  onNavigationClick: 'function',
  onUserAction: 'function',
  className: 'string',
  showSkipLink: 'boolean',
  variant: 'string'
}

// ====================
// DEFAULT PROPS
// ====================
Header.defaultProps = {
  title: 'Application',
  subtitle: '',
  navigationItems: [],
  user: null,
  className: '',
  showSkipLink: true,
  variant: 'default'
}
