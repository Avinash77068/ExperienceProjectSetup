import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, theme, toggleTheme } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(credentials);
    
    if (!result.success) {
      setError(result.error || 'Login failed');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-text-primary) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-3 rounded-lg glass hover-scale"
        title="Toggle Theme"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      {/* Login Form */}
      <div className="w-full max-w-md p-8 space-y-8 card card-elevated fade-in relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 hover-scale">
            <span className="text-2xl">📝</span>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Shayri Dashboard</h1>
          <p className="text-secondary">Internal Management System</p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-tertiary p-4 rounded-lg border border-subtle">
          <h3 className="text-sm font-semibold text-primary mb-2">Demo Credentials:</h3>
          <div className="space-y-1 text-xs text-secondary">
            <div><strong>Admin:</strong> admin@shayri.com / admin123</div>
            <div><strong>User:</strong> avinash@example.com / avinash123</div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={credentials.email}
              onChange={handleChange}
              className="form-control w-full"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-primary mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={credentials.password}
              onChange={handleChange}
              className="form-control w-full"
              placeholder="Enter your password"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm fade-in">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn w-full flex justify-center py-3 px-4"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-muted">
          <p>© 2024 Shayri Dashboard. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
