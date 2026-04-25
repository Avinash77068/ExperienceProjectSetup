/**
 * ShayriCard Styles - Enterprise Architecture
 * Component styling constants
 * @author Senior Development Team
 * @version 2.0.0
 */

export const CARD_STYLES = {
  container: 'shayri-card fade-in relative overflow-hidden rounded-2xl border border-amber-200/15 bg-zinc-900/80 p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer group',
  background: 'absolute inset-0',
  gradient: 'absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/95 via-[#0a0a0f]/75 to-[#0a0a0f]/45',
  content: 'relative z-10',
  categoryBadge: 'mb-4 inline-block rounded-full border border-amber-100/30 bg-black/35 px-3 py-1 text-xs text-amber-100 backdrop-blur-sm transition-all duration-200 group-hover:border-amber-300/50 group-hover:bg-amber-400/20',
  shayriText: 'mb-4 whitespace-pre-line font-urdu text-xl max-h-[100px] text-ellipsis overflow-y-auto leading-relaxed text-zinc-100 transition-colors duration-200 group-hover:text-amber-50',
  metadata: 'mb-4 flex items-start justify-between text-sm',
  categoryTag: 'rounded-full bg-amber-400/10 px-3 py-1 text-amber-200 transition-all duration-200 group-hover:bg-amber-400/20 group-hover:text-amber-100',
  dateText: 'text-zinc-400 text-red-400 transition-colors duration-200 group-hover:text-zinc-300',
  author: 'mb-5 text-sm text-zinc-300 transition-colors duration-200 group-hover:text-amber-200',
  actions: 'flex flex-wrap gap-2',
  button: 'rounded-md border border-zinc-700 bg-zinc-900/40 px-3 py-2 text-sm transition-all duration-200 hover:border-amber-300 hover:text-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105',
  buttonActive: 'border-pink-400 hover:border-pink-400 hover:text-pink-300 transform hover:scale-105',
  buttonSuccess: 'border-green-400 hover:border-green-400 hover:text-green-300 transform hover:scale-105',
  buttonIcon: 'h-4 w-4',
  clickIndicator: 'absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100 animate-pulse',
  cornerAccent: 'absolute top-0 right-0 w-0 h-0 border-t-[20px] border-t-amber-400/30 border-r-[20px] border-r-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100',
  glowEffect: 'absolute inset-0 bg-gradient-to-r from-amber-400/10 via-transparent to-pink-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none',
  shimmer: 'absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent -translate-x-full transition-transform duration-700 group-hover:translate-x-full pointer-events-none'
}
