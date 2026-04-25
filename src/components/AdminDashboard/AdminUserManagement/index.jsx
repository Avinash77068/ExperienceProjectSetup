/**
 * AdminUserManagement Component - Enterprise Architecture
 * User management interface for admin dashboard
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useUserManagement } from './hooks/useUserManagement'
import { USER_STYLES } from './styles'
import UserStats from './components/UserStats'
import UserTable from './components/UserTable'
import UserControls from './components/UserControls'

// ====================
// MAIN COMPONENT
// ====================
export default function AdminUserManagement() {
  const {
    users,
    searchTerm,
    filterRole,
    filteredUsers,
    userStats,
    setSearchTerm,
    setFilterRole,
    handleEditUser,
    handleSuspendUser,
    handleDeleteUser,
    handleAddUser
  } = useUserManagement()

  return (
    <div className={USER_STYLES.container}>
      {/* Header */}
      <div className={USER_STYLES.header}>
        <div>
          <h1 className={USER_STYLES.title}>User Management</h1>
          <p className={USER_STYLES.subtitle}>Manage user accounts and permissions</p>
        </div>
      </div>

      {/* User Statistics */}
      <UserStats userStats={userStats} />

      {/* Search and Filter Controls */}
      <UserControls
        searchTerm={searchTerm}
        filterRole={filterRole}
        onSearchChange={setSearchTerm}
        onFilterChange={setFilterRole}
        onAddUser={handleAddUser}
      />

      {/* Users Table */}
      <UserTable
        filteredUsers={filteredUsers}
        onEditUser={handleEditUser}
        onSuspendUser={handleSuspendUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  )
}
