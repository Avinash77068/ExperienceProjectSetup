/**
 * UserControls Component - Enterprise Architecture
 * User search and filter controls component
 * @author Senior Development Team
 * @version 2.0.0
 */

import { Search, Filter, Plus } from 'lucide-react'
import { USER_STYLES } from '../styles'

// ====================
// USER CONTROLS COMPONENT
// ====================
const UserControls = ({ searchTerm, filterRole, onSearchChange, onFilterChange, onAddUser }) => {
  return (
    <div className={USER_STYLES.controls}>
      <div className="flex items-center gap-4 flex-1">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`${USER_STYLES.searchInput} pl-10`}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-zinc-400" />
          <select
            value={filterRole}
            onChange={(e) => onFilterChange(e.target.value)}
            className={USER_STYLES.filterButton}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
          </select>
        </div>
      </div>
      
      <button
        onClick={onAddUser}
        className={USER_STYLES.addButton}
      >
        <Plus className="w-4 h-4" />
        Add User
      </button>
    </div>
  )
}

export default UserControls
