import { useState, useMemo } from 'react'
import { Check, Copy, Heart } from 'lucide-react'
import { BsWhatsapp } from 'react-icons/bs'

const CATEGORY_GRADIENTS = {
  Ishq: 'from-rose-700/80 via-pink-600/60 to-amber-500/60',
  Dard: 'from-slate-800/90 via-zinc-700/70 to-blue-900/60',
  Zindagi: 'from-indigo-700/80 via-purple-700/60 to-amber-500/60',
  Khushi: 'from-amber-600/80 via-yellow-500/60 to-orange-500/60',
  Judai: 'from-cyan-800/80 via-slate-700/70 to-zinc-900/80',
}

export default function ShayriCard({ post, copiedId, likeCount, onCopy, onLike }) {
  const [imageFailed, setImageFailed] = useState(false)
  
  const encodedMessage = useMemo(() => 
    encodeURIComponent(`${post.text}\n\n- ${post.author}\n#${post.category} #Shayri`),
    [post.text, post.author, post.category]
  )
  
  const gradientClass = CATEGORY_GRADIENTS[post.category] ?? 'from-zinc-800 via-zinc-700 to-zinc-900'
  const showImage = post.imageUrl && !imageFailed
  const isCopied = copiedId === post.id

  return (
    <article className="shayri-card fade-in  max-w-[340px] relative overflow-hidden rounded-2xl border border-amber-200/15 bg-zinc-900/80 p-5">
      <div className="absolute inset-0">
        {showImage ? (
          <img
            src={post.imageUrl}
            alt={`${post.category} shayri visual`}
            className="shayri-image h-full w-full object-cover"
            onError={() => setImageFailed(true)}
            loading="lazy"
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${gradientClass}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/95 via-[#0a0a0f]/75 to-[#0a0a0f]/45" />
      </div>

      <div className="relative z-10">
        <span className="mb-4 inline-block rounded-full border border-amber-100/30 bg-black/35 px-3 py-1 text-xs text-amber-100 backdrop-blur-sm">
          {post.category}
        </span>
        <p className="mb-4 whitespace-pre-line font-urdu text-xl leading-relaxed text-zinc-100">
          {post.text}
        </p>
        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="rounded-full bg-amber-400/10 px-3 py-1 text-amber-200">
            {post.category}
          </span>
          <span className="text-zinc-400">{post.date}</span>
        </div>
        <p className="mb-5 text-sm text-zinc-300">- {post.author}</p>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onCopy(post.text, post.id)}
            className="rounded-md border border-zinc-700 bg-zinc-900/40 px-3 py-2 text-sm hover:border-amber-300 hover:text-amber-200 transition-colors"
            aria-label={isCopied ? "Copied" : "Copy shayri"}
          >
            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
          
          <a
            href={`https://wa.me/?text=${encodedMessage}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-zinc-700 bg-zinc-900/40 px-3 py-2 text-sm hover:border-green-400 hover:text-green-300 transition-colors flex items-center justify-center"
            aria-label="Share on WhatsApp"
          >
            <BsWhatsapp className="h-4 w-4" />
          </a>
          
          <button
            type="button"
            onClick={() => onLike(post.id)}
            className="rounded-md border border-zinc-700 bg-zinc-900/40 px-3 py-2 text-sm hover:border-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1"
            aria-label="Like shayri"
          >
            <Heart className="h-4 w-4" fill={likeCount > 0 ? "red" : "none"}/>
            <span>{likeCount}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
