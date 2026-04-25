/**
 * AdminUserManagement Component - Enterprise Architecture
 * User management interface for admin dashboard
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useState, useMemo } from 'react'
import { Users, Shield, Ban, Mail, Calendar, Search, Filter, Plus, Edit, Trash2 } from 'lucide-react'
import { ADMIN_STYLES } from './styles'
import { MOCK_USERS, UserRepository } from '../../data/shayriData'

// ====================
// STYLES CONSTANTS
// ====================
const USER_STYLES = {
  container: 'space-y-6',
  header: 'flex items-center justify-between mb-6',
  title: 'text-2xl font-bold text-amber-200',
  subtitle: 'text-zinc-400',
  controls: 'flex items-center gap-4 mb-6',
  searchInput: 'rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-300 focus:outline-none w-64',
  filterButton: 'flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-300 hover:border-amber-300 transition-colors',
  addButton: 'flex items-center gap-2 rounded-lg bg-amber-300 text-zinc-900 px-4 py-2 font-medium hover:bg-amber-400 transition-colors',
  statsGrid: 'grid grid-cols-1 md:grid-cols-4 gap-4 mb-6',
  statCard: 'bg-zinc-800 border border-zinc-700 rounded-lg p-4',
  statValue: 'text-2xl font-bold text-amber-200',
  statLabel: 'text-sm text-zinc-400',
  tableContainer: 'bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden',
  table: 'w-full',
  tableHeader: 'bg-zinc-900 border-b border-zinc-700',
  tableHeaderCell: 'px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider',
  tableRow: 'border-b border-zinc-700 hover:bg-zinc-700/50 transition-colors',
  tableCell: 'px-6 py-4 text-sm text-zinc-100',
  roleBadge: 'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
  roleAdmin: 'bg-red-400/20 text-red-300 border border-red-400/30',
  roleUser: 'bg-blue-400/20 text-blue-300 border border-blue-400/30',
  roleGuest: 'bg-green-400/20 text-green-300 border border-green-400/30',
  statusBadge: 'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
  statusActive: 'bg-green-400/20 text-green-300',
  statusSuspended: 'bg-red-400/20 text-red-300',
  statusInactive: 'bg-zinc-600/20 text-zinc-400',
  actionButton: 'p-2 rounded-lg hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-amber-300',
  actionButtonDanger: 'p-2 rounded-lg hover:bg-red-400/20 transition-colors text-zinc-400 hover:text-red-300'
}

// ====================
// COMPONENTS
// ====================
const UserStats = ({ users }) => {
  const stats = useMemo(() => ({
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    admins: users.filter(u => u.role === 'admin').length,
    suspended: users.filter(u => u.status === 'suspended').length
  }), [users])

  return (
    <div className={USER_STYLES.statsGrid}>
      <div className={USER_STYLES.statCard}>
        <div className={USER_STYLES.statValue}>{stats.total}</div>
        <div className={USER_STYLES.statLabel}>Total Users</div>
      </div>
      <div className={USER_STYLES.statCard}>
        <div className={USER_STYLES.statValue}>{stats.active}</div>
        <div className={USER_STYLES.statLabel}>Active Users</div>
      </div>
      <div className={USER_STYLES.statCard}>
        <div className={USER_STYLES.statValue}>{stats.admins}</div>
        <div className={USER_STYLES.statLabel}>Admins</div>
      </div>
      <div className={USER_STYLES.statCard}>
        <div className={USER_STYLES.statValue}>{stats.suspended}</div>
        <div className={USER_STYLES.statLabel}>Suspended</div>
      </div>
    </div>
  )
}

const RoleBadge = ({ role }) => {
  const getRoleStyles = () => {
    switch (role) {
      case 'admin':
        return USER_STYLES.roleAdmin
      case 'user':
        return USER_STYLES.roleUser
      case 'guest':
        return USER_STYLES.roleGuest
      default:
        return USER_STYLES.roleUser
    }
  }

  return (
    <span className={`${USER_STYLES.roleBadge} ${getRoleStyles()}`}>
      <Shield className="w-3 h-3" />
      {role}
    </span>
  )
}

const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'active':
        return USER_STYLES.statusActive
      case 'suspended':
        return USER_STYLES.statusSuspended
      case 'inactive':
        return USER_STYLES.statusInactive
      default:
        return USER_STYLES.statusInactive
    }
  }

  return (
    <span className={`${USER_STYLES.statusBadge} ${getStatusStyles()}`}>
      {status}
    </span>
  )
}

const UserTable = ({ users, onEdit, onDelete, onSuspend }) => {
  return (
    <div className={USER_STYLES.tableContainer}>
      <table className={USER_STYLES.table}>
        <thead className={USER_STYLES.tableHeader}>
          <tr>
            <th className={USER_STYLES.tableHeaderCell}>User</th>
            <th className={USER_STYLES.tableHeaderCell}>Role</th>
            <th className={USER_STYLES.tableHeaderCell}>Status</th>
            <th className={USER_STYLES.tableHeaderCell}>Posts</th>
            <th className={USER_STYLES.tableHeaderCell}>Last Active</th>
            <th className={USER_STYLES.tableHeaderCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={USER_STYLES.tableRow}>
              <td className={USER_STYLES.tableCell}>
                <div>
                  <div className="font-medium text-zinc-100">{user.name}</div>
                  <div className="text-zinc-400">{user.email}</div>
                  <div className="text-xs text-zinc-500">Joined {user.joinDate}</div>
                </div>
              </td>
              <td className={USER_STYLES.tableCell}>
                <RoleBadge role={user.role} />
              </td>
              <td className={USER_STYLES.tableCell}>
                <StatusBadge status={user.status} />
              </td>
              <td className={USER_STYLES.tableCell}>
                {user.postsCount}
              </td>
              <td className={USER_STYLES.tableCell}>
                {user.lastActive}
              </td>
              <td className={USER_STYLES.tableCell}>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className={USER_STYLES.actionButton}
                    title="Edit user"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  {user.status === 'active' ? (
                    <button
                      onClick={() => onSuspend(user)}
                      className={USER_STYLES.actionButtonDanger}
                      title="Suspend user"
                    >
                      <Ban className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onSuspend(user)}
                      className={USER_STYLES.actionButton}
                      title="Activate user"
                    >
                      <Shield className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(user)}
                    className={USER_STYLES.actionButtonDanger}
                    title="Delete user"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ====================
// MAIN COMPONENT
// ====================
export default function AdminUserManagement() {
  const [users, setUsers] = useState(UserRepository.getAllUsers())
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')

  // Filter users based on search and role
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRole = filterRole === 'all' || user.role === filterRole
      return matchesSearch && matchesRole
    })
  }, [users, searchTerm, filterRole])

  const handleEdit = (user) => {
    console.log('Edit user:', user)
    // TODO: Implement edit user functionality
  }

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      setUsers(prev => prev.filter(u => u.id !== user.id))
    }
  }

  const handleSuspend = (user) => {
    const newStatus = user.status === 'active' ? 'suspended' : 'active'
    setUsers(prev => prev.map(u => 
      u.id === user.id ? { ...u, status: newStatus } : u
    ))
  }

  return (
    <div className={USER_STYLES.container}>
      <div className={USER_STYLES.header}>
        <div>
          <h1 className={USER_STYLES.title}>User Management</h1>
          <p className={USER_STYLES.subtitle}>Manage user accounts and permissions</p>
        </div>
        <button className={USER_STYLES.addButton}>
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <UserStats users={users} />

      <div className={USER_STYLES.controls}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search users..."
            className={`${USER_STYLES.searchInput} pl-10`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          className={USER_STYLES.filterButton}
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="guest">Guest</option>
        </select>
      </div>

      <UserTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSuspend={handleSuspend}
      />
    </div>
  )
}
