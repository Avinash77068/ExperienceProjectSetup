import Header from './Header'
import { FiHome, FiLogOut } from 'react-icons/fi'

export default function AdminDashboard({
  posts,
  isAuthenticated,
  categories,
  newText,
  setNewText,
  newCategory,
  setNewCategory,
  newAuthor,
  setNewAuthor,
  newImage,
  setNewImage,
  onAddPost,
  onDeletePost,
}) {
  const navigationItems = [
    { label: 'Dashboard', path: '#admin' },
    { label: 'Analytics', path: '#admin/analytics' },
    { label: 'Settings', path: '#admin/settings' }
  ]

  const handleNavigationClick = (item) => {
    console.log('Admin navigation to:', item.path)
  }

  const handleUserAction = (action) => {
    if (action.action === 'logout') {
      window.location.hash = ''
    }
  }

  const user = {
    name: 'Admin',
    actions: [
      { label: 'Public Site', icon: FiHome, action: 'public' },
      { label: 'Logout', icon: FiLogOut, action: 'logout' }
    ]
  }

  return (
    <>
      <Header
        title="Shayri Admin Dashboard"
        subtitle="Manage your shayri collection"
        navigationItems={navigationItems}
        user={user}
        onNavigationClick={handleNavigationClick}
        onUserAction={handleUserAction}
        className="bg-[#0a0a0f] border-amber-300/20"
      />
      
      <main className="min-h-screen bg-[#0a0a0f] px-4 py-8 text-zinc-100">
        <div className="mx-auto max-w-6xl">

        {!isAuthenticated ? (
          <div className="rounded-xl border border-red-400/40 bg-zinc-900/80 p-6 text-red-200">
            Authentication failed.
          </div>
        ) : (
          <div className="space-y-6">
            <section className="rounded-2xl border border-amber-300/30 bg-zinc-900/70 p-5">
              <p className="text-sm text-zinc-400">Total Shayris</p>
              <p className="mt-1 text-3xl font-semibold text-amber-300">{posts.length}</p>
            </section>

            <section className="rounded-2xl border border-amber-300/30 bg-zinc-900/70 p-5">
              <h2 className="mb-4 font-display text-2xl text-amber-200">Nayi Shayri Post Karein</h2>
              <form onSubmit={onAddPost} className="grid gap-4 md:grid-cols-2">
                <textarea
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Shayri text..."
                  rows={5}
                  className="md:col-span-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none ring-0 focus:border-amber-300"
                />
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-amber-300"
                >
                  {categories
                    .filter((cat) => cat !== 'All')
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
                <input
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="Author name"
                  className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-amber-300"
                />
                <input
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Image URL (optional)"
                  className="md:col-span-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-amber-300"
                />
                <button
                  type="submit"
                  className="md:col-span-2 rounded-lg bg-amber-400 px-4 py-2 font-medium text-zinc-950 transition hover:bg-amber-300"
                >
                  Publish Shayri
                </button>
              </form>
            </section>

            <section className="rounded-2xl border border-amber-300/30 bg-zinc-900/70 p-5">
              <h2 className="mb-4 font-display text-2xl text-amber-200">All Posted Shayris</h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left text-sm">
                  <thead className="text-zinc-400">
                    <tr className="border-b border-zinc-800">
                      <th className="px-2 py-3">Shayri</th>
                      <th className="px-2 py-3">Category</th>
                      <th className="px-2 py-3">Author</th>
                      <th className="px-2 py-3">Date</th>
                      <th className="px-2 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id} className="border-b border-zinc-900 align-top">
                        <td className="max-w-xl whitespace-pre-line px-2 py-3 text-zinc-200">{post.text}</td>
                        <td className="px-2 py-3 text-amber-200">{post.category}</td>
                        <td className="px-2 py-3">{post.author}</td>
                        <td className="px-2 py-3 text-zinc-400">{post.date}</td>
                        <td className="px-2 py-3">
                          <button
                            type="button"
                            onClick={() => onDeletePost(post.id)}
                            className="rounded-md border border-red-400/40 px-3 py-1 text-red-300 hover:bg-red-400/10"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
        </div>
      </main>
    </>
  )
}
