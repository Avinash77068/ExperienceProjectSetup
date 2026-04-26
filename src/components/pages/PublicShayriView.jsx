import React, { useState, useEffect, useMemo } from 'react';
import { useShayri, useCreateShayri } from '../../hooks/useShayri';
import { useAuth } from '../../contexts/AuthContext';
import { formatNumber, truncateText } from '../../utils/helpers';
import Loading from '../ui/Loading';

const PublicShayriView = () => {
  const { login } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: ''
  });
  const [newShayri, setNewShayri] = useState({
    text: '',
    author: '',
    category: 'Ishq'
  });
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get shayri data (public access)
  const { data: shayriData, isLoading, error, refetch } = useShayri();
  const createShayriMutation = useCreateShayri();

  // Filter shayri based on category and search
  const filteredShayri = useMemo(() => {
    if (!shayriData) return [];
    
    return shayriData.filter(shayri => {
      const matchesCategory = filterCategory === 'all' || shayri.category === filterCategory;
      const matchesSearch = searchTerm === '' || 
        shayri.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shayri.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [shayriData, filterCategory, searchTerm]);

  // Get unique categories
  const categories = useMemo(() => {
    if (!shayriData) return [];
    const uniqueCategories = [...new Set(shayriData.map(shayri => shayri.category))];
    return ['all', ...uniqueCategories];
  }, [shayriData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newShayri.text.trim() || !newShayri.author.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await createShayriMutation.mutateAsync({
        ...newShayri,
        user: {
          id: 'guest-' + Date.now(),
          name: newShayri.author,
          email: 'guest@example.com',
          role: 'guest'
        },
        date: new Date().toISOString().split('T')[0],
        metadata: {
          views: 0,
          shares: 0,
          featured: false
        }
      });

      // Reset form
      setNewShayri({
        text: '',
        author: '',
        category: 'Ishq'
      });
      setShowAddForm(false);
      
      // Refresh data
      refetch();
      
      alert('Shayri submitted successfully!');
    } catch (error) {
      alert('Failed to submit shayri. Please try again.');
    }
  };

  const ShayriCard = ({ shayri }) => (
    <div className="card hover-lift p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge badge-info">{shayri.category}</span>
            <span className="text-xs text-muted">{shayri.date}</span>
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2 whitespace-pre-line">
            {truncateText(shayri.text, 150)}
          </h3>
          <p className="text-sm text-secondary">By: {shayri.author}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-muted pt-4 border-t border-subtle">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            👁️ {formatNumber(shayri.metadata?.views || 0)}
          </span>
          <span className="flex items-center gap-1">
            🔄 {formatNumber(shayri.metadata?.shares || 0)}
          </span>
        </div>
        {shayri.metadata?.featured && (
          <span className="badge badge-warning">⭐ Featured</span>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <Loading text="Loading beautiful shayris..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-center p-8 card card-elevated max-w-md">
          <div className="text-4xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-primary mb-2">Oops!</h1>
          <p className="text-secondary mb-4">Failed to load shayris</p>
          <button 
            onClick={() => refetch()}
            className="btn"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="bg-secondary border-b border-primary sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                <span className="text-lg">📝</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Shayri Collection</h1>
                <p className="text-sm text-secondary">Beautiful poetry in Hindi & Urdu</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted">
                {filteredShayri.length} shayris
              </span>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="btn btn-outline"
              >
                ✍️ Add Shayri
              </button>
              <button
                onClick={() => setShowLoginPopup(true)}
                className="btn"
              >
                🔐 Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Add Shayri Form */}
      {showAddForm && (
        <div className="bg-secondary border-b border-primary">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="card card-elevated p-6">
              <h2 className="text-xl font-bold text-primary mb-4">Share Your Shayri</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    Your Shayri *
                  </label>
                  <textarea
                    value={newShayri.text}
                    onChange={(e) => setNewShayri({...newShayri, text: e.target.value})}
                    className="form-control w-full"
                    rows={4}
                    placeholder="Write your beautiful shayri here..."
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={newShayri.author}
                      onChange={(e) => setNewShayri({...newShayri, author: e.target.value})}
                      className="form-control w-full"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">
                      Category
                    </label>
                    <select
                      value={newShayri.category}
                      onChange={(e) => setNewShayri({...newShayri, category: e.target.value})}
                      className="form-control w-full"
                    >
                      <option value="Ishq">Ishq</option>
                      <option value="Dard">Dard</option>
                      <option value="Zindagi">Zindagi</option>
                      <option value="Khushi">Khushi</option>
                      <option value="Judai">Judai</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={createShayriMutation.isLoading}
                    className="btn"
                  >
                    {createShayriMutation.isLoading ? 'Submitting...' : 'Submit Shayri'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="btn-ghost"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-secondary border-b border-primary">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-primary">Category:</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="form-control text-sm"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search shayris or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control w-full text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shayri Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {filteredShayri.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-primary mb-2">No shayris found</h3>
            <p className="text-secondary mb-4">
              {searchTerm || filterCategory !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Be the first to share a beautiful shayri!'}
            </p>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="btn"
              >
                ✍️ Add First Shayri
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShayri.map(shayri => (
              <ShayriCard key={shayri.id} shayri={shayri} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-secondary border-t border-primary mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted text-sm">
              © 2024 Shayri Collection. Share your poetry with the world.
            </p>
            <p className="text-muted text-xs mt-2">
              Guest mode • Free to use • No login required
            </p>
          </div>
        </div>
      </footer>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-secondary rounded-lg shadow-xl p-6 w-full max-w-md mx-4 scale-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-primary">Login to Dashboard</h2>
              <button
                onClick={() => setShowLoginPopup(false)}
                className="text-muted hover:text-primary"
              >
                ✕
              </button>
            </div>

            {/* Demo Credentials */}
            <div className="bg-tertiary p-3 rounded-lg mb-4 border border-subtle">
              <h3 className="text-sm font-semibold text-primary mb-2">Demo Credentials:</h3>
              <div className="space-y-1 text-xs text-secondary">
                <div><strong>Admin:</strong> admin@shayri.com / admin123</div>
                <div><strong>User:</strong> avinash@example.com / avinash123</div>
              </div>
            </div>

            {/* Quick Login Buttons */}
            <div className="space-y-3 mb-4">
              <button
                onClick={() => {
                  login({ email: 'admin@shayri.com', password: 'admin123' });
                  setShowLoginPopup(false);
                }}
                className="btn w-full"
              >
                👑 Login as Admin
              </button>
              <button
                onClick={() => {
                  login({ email: 'avinash@example.com', password: 'avinash123' });
                  setShowLoginPopup(false);
                }}
                className="btn btn-outline w-full"
              >
                👤 Login as User
              </button>
            </div>

            {/* Manual Login Form */}
            <form onSubmit={async (e) => {
              e.preventDefault();
              const result = await login(loginCredentials);
              if (result.success) {
                setShowLoginPopup(false);
              } else {
                alert('Login failed: ' + (result.error || 'Invalid credentials'));
              }
            }} className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                value={loginCredentials.email}
                onChange={(e) => setLoginCredentials({...loginCredentials, email: e.target.value})}
                className="form-control w-full"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginCredentials.password}
                onChange={(e) => setLoginCredentials({...loginCredentials, password: e.target.value})}
                className="form-control w-full"
                required
              />
              <button type="submit" className="btn btn-ghost w-full">
                🔓 Custom Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicShayriView;
