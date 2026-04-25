/**
 * UserStats Component - Enterprise Architecture
 * User statistics display component
 * @author Senior Development Team
 * @version 2.0.0
 */

import { Users, Shield, Ban, Activity } from 'lucide-react'
import { USER_STYLES } from '../styles'

// ====================
// USER STATS COMPONENT
// ====================
const UserStats = ({ userStats }) => {
  const stats = [
    {
      label: 'Total Users',
      value: userStats.total,
      icon: Users,
      color: 'text-amber-200'
    },
    {
      label: 'Active Users',
      value: userStats.active,
      icon: Activity,
      color: 'text-green-300'
    },
    {
      label: 'Admins',
      value: userStats.admins,
      icon: Shield,
      color: 'text-red-300'
    },
    {
      label: 'Suspended',
      value: userStats.suspended,
      icon: Ban,
      color: 'text-zinc-400'
    }
  ]

  return (
    <div className={USER_STYLES.statsGrid}>
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className={USER_STYLES.statCard}>
            <div className="flex items-center justify-between">
              <div>
                <p className={USER_STYLES.statValue}>{stat.value}</p>
                <p className={USER_STYLES.statLabel}>{stat.label}</p>
              </div>
              <Icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default UserStats
