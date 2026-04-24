import { useEffect, useMemo, useState } from 'react'
import AdminDashboard from './components/AdminDashboard'
import PublicShayriView from './components/PublicShayriView'
import {
  ADMIN_PASSWORD,
  CATEGORIES,
  LIKES_KEY,
  SAMPLE_SHAYRIS,
  STORAGE_KEY,
} from './data/shayriData'

function getTodayDate() {
  return new Date().toISOString().split('T')[0]
}

function loadPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return SAMPLE_SHAYRIS
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SAMPLE_SHAYRIS
  } catch {
    return SAMPLE_SHAYRIS
  }
}

function loadLikes() {
  try {
    const raw = localStorage.getItem(LIKES_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch {
    return {}
  }
}

export default function App() {
  const [posts, setPosts] = useState(() =>
    loadPosts().sort((a, b) => new Date(b.date) - new Date(a.date)),
  )
  const [likes, setLikes] = useState(() => loadLikes())
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [copiedId, setCopiedId] = useState('')
  const [showAdmin, setShowAdmin] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [newText, setNewText] = useState('')
  const [newCategory, setNewCategory] = useState('Ishq')
  const [newAuthor, setNewAuthor] = useState('')
  const [newImage, setNewImage] = useState('')

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    }
  }, [posts])

  useEffect(() => {
    localStorage.setItem(LIKES_KEY, JSON.stringify(likes))
  }, [likes])

  useEffect(() => {
    const handleHashRoute = () => {
      const adminHash = window.location.hash === '#admin'
      setShowAdmin(adminHash)
      if (!adminHash) {
        setIsAuthenticated(false)
        return
      }
      const password = window.prompt('Admin password daalein:')
      if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true)
      } else {
        window.alert('Galat password!')
        window.location.hash = ''
        setShowAdmin(false)
        setIsAuthenticated(false)
      }
    }

    handleHashRoute()
    window.addEventListener('hashchange', handleHashRoute)
    return () => window.removeEventListener('hashchange', handleHashRoute)
  }, [])

  const filteredPosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    return posts.filter((post) => {
      const categoryMatches = selectedCategory === 'All' || post.category === selectedCategory
      const searchMatches =
        query.length === 0 ||
        post.text.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      return categoryMatches && searchMatches
    })
  }, [posts, selectedCategory, searchTerm])

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(''), 1200)
    } catch {
      window.alert('Copy failed. Please try again.')
    }
  }

  const handleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }))
  }

  const handleAddPost = (event) => {
    event.preventDefault()
    const text = newText.trim()
    const author = newAuthor.trim()
    if (!text || !author) {
      window.alert('Shayri text aur author dono required hain.')
      return
    }

    const newPost = {
      id: `post-${Date.now()}`,
      text,
      category: newCategory,
      author,
      date: getTodayDate(),
      imageUrl: newImage.trim(),
    }

    setPosts((prev) => [newPost, ...prev])
    setNewText('')
    setNewCategory('Ishq')
    setNewAuthor('')
    setNewImage('')
  }

  const handleDeletePost = (id) => {
    const ok = window.confirm('Is shayri ko delete karna hai?')
    if (!ok) return
    setPosts((prev) => prev.filter((post) => post.id !== id))
  }

  if (showAdmin) {
    return (
      <AdminDashboard
        posts={posts}
        isAuthenticated={isAuthenticated}
        categories={CATEGORIES}
        newText={newText}
        setNewText={setNewText}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        newAuthor={newAuthor}
        setNewAuthor={setNewAuthor}
        newImage={newImage}
        setNewImage={setNewImage}
        onAddPost={handleAddPost}
        onDeletePost={handleDeletePost}
      />
    )
  }

  return (
    <PublicShayriView
      categories={CATEGORIES}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filteredPosts={filteredPosts}
      copiedId={copiedId}
      likes={likes}
      onCopy={handleCopy}
      onLike={handleLike}
    />
  )
}
