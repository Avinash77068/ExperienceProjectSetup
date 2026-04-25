/**
 * AdminStats Component - Enterprise Architecture
 * Statistics component for dashboard
 * @author Senior Development Team
 * @version 2.0.0
 */

import { FileText, Layers, Calendar } from 'lucide-react'
import { ADMIN_STYLES } from './styles'

export default function AdminStats({ statistics }) {
  return (
    <div className={ADMIN_STYLES.stats}>
      <div className={ADMIN_STYLES.statCard}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-400/10 rounded-lg">
            <FileText className="w-6 h-6 text-amber-200" />
          </div>
          <div>
            <div className={ADMIN_STYLES.statValue}>{statistics.total}</div>
            <div className={ADMIN_STYLES.statLabel}>Total Shayris</div>
          </div>
        </div>
      </div>
      
      <div className={ADMIN_STYLES.statCard}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-400/10 rounded-lg">
            <Layers className="w-6 h-6 text-blue-200" />
          </div>
          <div>
            <div className={ADMIN_STYLES.statValue}>{statistics.categories}</div>
            <div className={ADMIN_STYLES.statLabel}>Categories</div>
          </div>
        </div>
      </div>
      
      <div className={ADMIN_STYLES.statCard}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-400/10 rounded-lg">
            <Calendar className="w-6 h-6 text-green-200" />
          </div>
          <div>
            <div className={ADMIN_STYLES.statValue}>{statistics.thisMonth}</div>
            <div className={ADMIN_STYLES.statLabel}>This Month</div>
          </div>
        </div>
      </div>
    </div>
  )
}
