/**
 * ShayriCard Styles - Enterprise Architecture
 * Component styling constants
 * @author Senior Development Team
 * @version 2.0.0
 */

export const CARD_STYLES = {
  container: 'shayri-card fade-in relative overflow-hidden rounded-2xl border border-amber-200/15 bg-zinc-900/80 p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl',
  background: 'absolute inset-0',
  gradient: 'absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/95 via-[#0a0a0f]/75 to-[#0a0a0f]/45',
  content: 'relative z-10',
  categoryBadge: 'mb-4 inline-block rounded-full border border-amber-100/30 bg-black/35 px-3 py-1 text-xs text-amber-100 backdrop-blur-sm',
  shayriText: 'mb-4 whitespace-pre-line font-urdu text-xl max-h-[100px] text-ellipsis overflow-y-auto leading-relaxed text-zinc-100',
  metadata: 'mb-4 flex items-center justify-between text-sm',
  categoryTag: 'rounded-full bg-amber-400/10 px-3 py-1 text-amber-200',
  dateText: 'text-zinc-400',
  author: 'mb-5 text-sm text-zinc-300',
  actions: 'flex flex-wrap gap-2',
  button: 'rounded-md border border-zinc-700 bg-zinc-900/40 px-3 py-2 text-sm transition-all duration-200 hover:border-amber-300 hover:text-amber-200 disabled:opacity-50 disabled:cursor-not-allowed',
  buttonActive: 'border-pink-400 hover:border-pink-400 hover:text-pink-300',
  buttonSuccess: 'border-green-400 hover:border-green-400 hover:text-green-300',
  buttonIcon: 'h-4 w-4'
}
