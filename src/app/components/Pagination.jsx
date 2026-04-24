import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 12,
  totalItems,
  className = ''
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)
  
  const getVisiblePages = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const start = Math.max(1, currentPage - 2)
      const end = Math.min(totalPages, start + maxVisible - 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (start > 1) {
        if (start > 2) pages.unshift('...')
        pages.unshift(1)
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (totalPages <= 1) return null

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="text-sm text-zinc-400">
        Showing {startItem}-{endItem} of {totalItems} shayris
      </div>
      
      <div className="flex items-center gap-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border border-zinc-700 bg-zinc-900/40 p-2 text-sm hover:border-amber-300 hover:text-amber-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-2 text-zinc-400">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                  currentPage === page
                    ? 'border-amber-300 bg-amber-300 text-zinc-950'
                    : 'border-zinc-700 bg-zinc-900/40 text-zinc-300 hover:border-amber-300/70 hover:text-amber-100'
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )
          ))}
        </div>
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-zinc-700 bg-zinc-900/40 p-2 text-sm hover:border-amber-300 hover:text-amber-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default Pagination
