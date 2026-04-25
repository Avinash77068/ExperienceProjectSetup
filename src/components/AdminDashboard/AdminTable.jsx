/**
 * AdminTable Component - Enterprise Architecture
 * Table component for displaying posts
 * @author Senior Development Team
 * @version 2.0.0
 */

import { Trash2, Edit, Eye } from 'lucide-react'
import { ADMIN_STYLES } from './styles'

export default function AdminTable({ 
  posts, 
  currentPage, 
  totalPages, 
  onPageChange, 
  onDeletePost, 
  canDeletePosts 
}) {
  const handleDelete = (id, text) => {
    const confirmed = window.confirm(`Is shayri ko delete karna hai?\n\n"${text.substring(0, 50)}..."`)
    if (confirmed) {
      onDeletePost(id)
    }
  }
  
  return (
    <div className={ADMIN_STYLES.table}>
      <div className={ADMIN_STYLES.tableHeader}>
        <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-medium text-zinc-400 uppercase tracking-wider">
          <div className="col-span-5">Shayri</div>
          <div className="col-span-2">Author</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1">Actions</div>
        </div>
      </div>
      
      <div className="divide-y divide-zinc-800">
        {posts.map((post) => (
          <div key={post.id} className={ADMIN_STYLES.tableRow}>
            <div className="grid grid-cols-12 gap-4 px-4 py-3">
              <div className="col-span-5">
                <div className="text-sm font-medium text-zinc-100 truncate">
                  {post.text}
                </div>
                {post.imageUrl && (
                  <div className="flex items-center gap-1 mt-1">
                    <Eye className="w-3 h-3 text-zinc-400" />
                    <span className="text-xs text-zinc-400">Has Image</span>
                  </div>
                )}
              </div>
              
              <div className="col-span-2">
                <div className="text-sm text-zinc-300">{post.author}</div>
              </div>
              
              <div className="col-span-2">
                <span className="inline-flex items-center rounded-full bg-amber-400/10 px-2 py-1 text-xs font-medium text-amber-200">
                  {post.category}
                </span>
              </div>
              
              <div className="col-span-2">
                <div className="text-sm text-zinc-400">{post.date}</div>
              </div>
              
              <div className="col-span-1">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDelete(post.id, post.text)}
                    className={`p-1 rounded ${canDeletePosts ? 'hover:bg-red-900/20 text-red-400' : 'opacity-50 cursor-not-allowed text-zinc-600'}`}
                    title={canDeletePosts ? 'Delete' : 'Delete not allowed'}
                    disabled={!canDeletePosts}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800">
          <div className="text-sm text-zinc-400">
            Page {currentPage} of {totalPages}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-zinc-700 rounded hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-zinc-700 rounded hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
