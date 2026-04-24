import React from 'react'
import { FiUser } from 'react-icons/fi'

const Header = ({
  title = 'App Title',
  subtitle = '',
  navigationItems = [],
  user = null,
  onNavigationClick = null,
  onUserAction = null,
  className = ''
}) => {
  const handleNavClick = (item) => {
    if (onNavigationClick) {
      onNavigationClick(item)
    }
  }

  const handleUserAction = (action) => {
    if (onUserAction) {
      onUserAction(action)
    }
  }

  const renderNavigation = () => (
    <nav className="hidden md:flex space-x-6">
      {navigationItems.map((item, index) => (
        <button
          key={index}
          onClick={() => handleNavClick(item)}
          className="text-inherit hover:text-inherit transition-colors duration-200 font-medium"
        >
          {item.label}
        </button>
      ))}
    </nav>
  )

  const renderUserMenu = () => {
    if (!user) return null

    return (
      <div className="relative group">
        <button className="flex items-center space-x-2 text-inherit hover:text-inherit transition-colors duration-200">
          <FiUser className="w-5 h-5" />
          <span className="hidden md:block">{user.name || 'User'}</span>
        </button>
        
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          {user.actions?.map((action, index) => (
            <button
              key={index}
              onClick={() => handleUserAction(action)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
            >
              {action.icon && <action.icon className="w-4 h-4" />}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }


  return (
    <header className={`w-full fixed top-0 left-0 right-0 z-50 py-4 border-b border-gray-200 text-gray-900 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo/Title Section */}
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-xl font-bold text-inherit">{title}</h1>
              {subtitle && (
                <p className="text-sm text-inherit/60 mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:block">
            {renderNavigation()}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {renderUserMenu()}
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header
