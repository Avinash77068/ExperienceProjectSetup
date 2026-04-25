/**
 * UserTable Component - Enterprise Architecture
 * User table display component
 * @author Senior Development Team
 * @version 2.0.0
 */

import { Mail, Calendar, Edit, Ban, Trash2 } from 'lucide-react'
import { USER_STYLES, getRoleBadgeClass, getStatusBadgeClass } from '../styles'

// ====================
// USER TABLE COMPONENT
// ====================
const UserTable = ({ filteredUsers, onEditUser, onSuspendUser, onDeleteUser }) => {
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
          {filteredUsers.map((user) => (
            <tr key={user.id} className={USER_STYLES.tableRow}>
              <td className={USER_STYLES.tableCell}>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="flex items-center gap-1 text-zinc-400">
                    <Mail className="w-3 h-3" />
                    <span className="text-xs">{user.email}</span>
                  </div>
                </div>
              </td>
              <td className={USER_STYLES.tableCell}>
                <span className={getRoleBadgeClass(user.role)}>
                  {user.role}
                </span>
              </td>
              <td className={USER_STYLES.tableCell}>
                <span className={getStatusBadgeClass(user.status)}>
                  {user.status}
                </span>
              </td>
              <td className={USER_STYLES.tableCell}>
                {user.postsCount}
              </td>
              <td className={USER_STYLES.tableCell}>
                <div className="flex items-center gap-1 text-zinc-400">
                  <Calendar className="w-3 h-3" />
                  <span className="text-xs">{user.lastActive}</span>
                </div>
              </td>
              <td className={USER_STYLES.tableCell}>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEditUser(user.id)}
                    className={USER_STYLES.actionButton}
                    title="Edit user"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onSuspendUser(user.id)}
                    className={USER_STYLES.actionButton}
                    title={user.status === 'active' ? 'Suspend user' : 'Activate user'}
                  >
                    <Ban className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteUser(user.id)}
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

export default UserTable
