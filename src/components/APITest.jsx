/**
 * API Test Component - Simple Testing
 * Test API calls from React components
 */

import { useState } from 'react';
import { apiService } from '../services/apiService';

export default function APITest() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test, status, data) => {
    setResults(prev => [...prev, {
      test,
      status,
      data,
      time: new Date().toLocaleTimeString()
    }]);
  };

  const runTests = async () => {
    setLoading(true);
    setResults([]);
    
    try {
      // Test 1: Health Check
      addResult('Health Check', 'loading', null);
      const health = await apiService.checkConnection();
      addResult('Health Check', health.status === 'OK' ? 'success' : 'error', health.status);
      
      // Test 2: Get Shayri
      addResult('Get Shayri', 'loading', null);
      const shayri = await apiService.getShayri({ limit: 2 });
      addResult('Get Shayri', shayri.success ? 'success' : 'error', 
        shayri.success ? `${shayri.data.length} shayris` : shayri.error);
      
      // Test 3: Get User Stats
      addResult('User Stats', 'loading', null);
      const userStats = await apiService.getUserStats();
      addResult('User Stats', userStats.success ? 'success' : 'error',
        userStats.success ? `${userStats.data.total} users` : userStats.error);
      
      // Test 4: Get Analytics
      addResult('Analytics', 'loading', null);
      const analytics = await apiService.getAnalytics();
      addResult('Analytics', analytics.success ? 'success' : 'error',
        analytics.success ? `${analytics.data.overview.totalShayris} shayris` : analytics.error);
      
    } catch (error) {
      addResult('General Error', 'error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">🔗 API Test</h1>
        <p className="text-gray-600">Test frontend-backend API connection</p>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={runTests}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Testing...' : 'Run API Tests'}
        </button>
        <button
          onClick={clearResults}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Clear Results
        </button>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {results.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Click "Run API Tests" to test API connection
          </div>
        ) : (
          results.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  result.status === 'success' ? 'bg-green-500' :
                  result.status === 'error' ? 'bg-red-500' :
                  result.status === 'loading' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`}></div>
                <span className="font-medium">{result.test}</span>
              </div>
              <div className="text-right">
                <div className={`text-sm ${
                  result.status === 'success' ? 'text-green-600' :
                  result.status === 'error' ? 'text-red-600' :
                  'text-gray-600'
                }`}>
                  {result.data}
                </div>
                <div className="text-xs text-gray-500">{result.time}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Connection Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">📡 Connection Info:</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <div>• Backend: http://localhost:5001</div>
          <div>• API: http://localhost:5001/api</div>
          <div>• Method: Simple fetch (no complex headers)</div>
          <div>• CORS: Enabled for all origins</div>
        </div>
      </div>
    </div>
  );
}
