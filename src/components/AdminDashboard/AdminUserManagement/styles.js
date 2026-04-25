/**
 * AdminUserManagement Styles - Enterprise Architecture
 * Style definitions for user management interface
 * @author Senior Development Team
 * @version 2.0.0
 */

// ====================
// STYLE CONSTANTS
// ====================
export const USER_STYLES = {
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
// HELPER FUNCTIONS
// ====================
export const getRoleBadgeClass = (role) => {
  switch (role) {
    case 'admin': return `${USER_STYLES.roleBadge} ${USER_STYLES.roleAdmin}`
    case 'user': return `${USER_STYLES.roleBadge} ${USER_STYLES.roleUser}`
    case 'guest': return `${USER_STYLES.roleBadge} ${USER_STYLES.roleGuest}`
    default: return USER_STYLES.roleBadge
  }
}

export const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'active': return `${USER_STYLES.statusBadge} ${USER_STYLES.statusActive}`
    case 'suspended': return `${USER_STYLES.statusBadge} ${USER_STYLES.statusSuspended}`
    case 'inactive': return `${USER_STYLES.statusBadge} ${USER_STYLES.statusInactive}`
    default: return USER_STYLES.statusBadge
  }
}
