/**
 * User Management Hook - Enterprise Architecture
 * Custom hook for user management operations
 * @author Senior Development Team
 * @version 2.0.0
 */

import { useState, useMemo } from 'react'
import { UserRepository } from '../../../data/shayriData'

// ====================
// CUSTOM HOOK
// ====================
export const useUserManagement = () => {
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

  // Calculate user statistics
  const userStats = useMemo(() => {
    return UserRepository.getUserStats()
  }, [users])

  // User action handlers
  const handleEditUser = (userId) => {
    console.log('Edit user:', userId)
    // TODO: Implement edit functionality
  }

  const handleSuspendUser = (userId) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
          : user
      )
    )
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId))
    }
  }

  const handleAddUser = () => {
    console.log('Add new user')
    // TODO: Implement add user functionality
  }

  return {
    // State
    users,
    searchTerm,
    filterRole,
    filteredUsers,
    userStats,
    
    // Actions
    setSearchTerm,
    setFilterRole,
    handleEditUser,
    handleSuspendUser,
    handleDeleteUser,
    handleAddUser
  }
}
