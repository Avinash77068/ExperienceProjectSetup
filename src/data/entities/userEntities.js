/**
 * User Entities - Enterprise Architecture
 * Domain entities and enums for user management
 * @author Senior Development Team
 * @version 2.0.0
 */

// ====================
// USER ENTITIES & ENUMS
// ====================
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
}

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended'
}

export const USER_PERMISSIONS = {
  READ: 'read',
  WRITE: 'write',
  DELETE: 'delete',
  MANAGE_USERS: 'manage_users'
}

// ====================
// HELPER FUNCTIONS
// ====================
export const getUserRoleDisplayName = (role) => {
  const roleNames = {
    [USER_ROLES.ADMIN]: 'Administrator',
    [USER_ROLES.USER]: 'User',
    [USER_ROLES.GUEST]: 'Guest'
  }
  return roleNames[role] || role
}

export const getUserStatusDisplayName = (status) => {
  const statusNames = {
    [USER_STATUS.ACTIVE]: 'Active',
    [USER_STATUS.INACTIVE]: 'Inactive',
    [USER_STATUS.SUSPENDED]: 'Suspended'
  }
  return statusNames[status] || status
}

export const hasPermission = (user, permission) => {
  return user.permissions && user.permissions.includes(permission)
}

export const isAdmin = (user) => {
  return user.role === USER_ROLES.ADMIN
}
