import ShayriCard from './ShayriCard'

export default function PublicShayriView({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  filteredPosts,
  copiedId,
  likes,
  onCopy,
  onLike,
}) {
  return (
    <main className="min-h-screen bg-[#0a0a0f] px-4 py-8 text-zinc-100">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-2xl border border-amber-300/20 bg-zinc-900/55 px-4 py-8 text-center shadow-[0_0_35px_rgba(251,191,36,0.08)]">
          <p className="mb-2 text-sm uppercase tracking-[0.22em] text-amber-300/80">Rooh-e-Shayri</p>
          <h1 className="font-display text-4xl text-amber-200 md:text-5xl">Alfaaz ki Mehfil</h1>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
            Ishq, dard aur zindagi ke ehsaas - dil se nikli shayriyaan ek jagah.
          </p>
        </header>

        <section className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    isActive
                      ? 'border-amber-300 bg-amber-300 text-zinc-950'
                      : 'border-zinc-700 text-zinc-300 hover:border-amber-300/70 hover:text-amber-100'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>

          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search shayri, author, category..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 md:w-80 focus:border-amber-300 focus:outline-none"
          />
        </section>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <ShayriCard
              key={post.id}
              post={post}
              copiedId={copiedId}
              likeCount={likes[post.id] ?? 0}
              onCopy={onCopy}
              onLike={onLike}
            />
          ))}
        </section>

        {filteredPosts.length === 0 && (
          <p className="mt-10 text-center text-zinc-400">Koi shayri nahi mili. Dusra keyword try karein.</p>
        )}
      </div>
    </main>
  )
}
