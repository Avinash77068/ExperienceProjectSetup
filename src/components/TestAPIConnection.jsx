/**
 * Test API Connection Component
 * Simple component to test frontend-backend connection
 * @author Senior Development Team
 * @version 1.0.0
 */

import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

export default function TestAPIConnection() {
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        setStatus('checking');
        setMessage('Testing API connection...');

        // Test health endpoint
        const healthCheck = await apiService.checkConnection();
        
        if (healthCheck.status === 'OK') {
          setStatus('connected');
          setMessage('✅ Backend API is connected and working!');
          
          // Test getting some data
          try {
            const shayriResponse = await apiService.getShayri({ limit: 3 });
            if (shayriResponse.success) {
              setData(shayriResponse.data.slice(0, 3));
              setMessage('✅ API connection successful! Data loaded.');
            }
          } catch (dataError) {
            console.warn('Data fetch failed, but connection is OK:', dataError);
            setMessage('✅ API connected, but data fetch failed');
          }
        } else {
          setStatus('fallback');
          setMessage(`🟡 Using fallback mode: ${healthCheck.fallback || 'Local data'}`);
        }
      } catch (error) {
        setStatus('error');
        setMessage(`❌ Connection failed: ${error.message}`);
        
        // Try fallback data
        try {
          const fallbackData = await apiService.getShayri();
          if (fallbackData.success) {
            setData(fallbackData.data.slice(0, 3));
            setMessage('⚠️ API failed, using local data fallback');
          }
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
        }
      }
    };

    testConnection();
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">API Connection Test</h1>
        <p className="text-gray-600">Testing frontend-backend integration</p>
      </div>

      {/* Status Display */}
      <div className={`p-4 rounded-lg mb-6 ${
        status === 'connected' 
          ? 'bg-green-50 border border-green-200'
          : status === 'fallback'
          ? 'bg-yellow-50 border border-yellow-200'
          : status === 'error'
          ? 'bg-red-50 border border-red-200'
          : 'bg-blue-50 border border-blue-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-sm font-medium ${
              status === 'connected' 
                ? 'text-green-800'
                : status === 'fallback'
                ? 'text-yellow-800'
                : status === 'error'
                ? 'text-red-800'
                : 'text-blue-800'
            }`}>
              Status: {status.toUpperCase()}
            </div>
            <div className="text-gray-700 mt-1">{message}</div>
          </div>
          {status === 'error' && (
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          )}
        </div>
      </div>

      {/* Data Display */}
      {data && data.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Sample Data from API:</h2>
          <div className="space-y-4">
            {data.map((shayri) => (
              <div key={shayri.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800">{shayri.text}</h3>
                  <span className="text-sm text-gray-500">ID: {shayri.id}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Author: {shayri.author}</span>
                  <span>Category: {shayri.category}</span>
                  <span>Views: {shayri.metadata?.views || 0}</span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  User: {shayri.user?.name} ({shayri.user?.role})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* API Endpoints Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-800 mb-2">Available API Endpoints:</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <div>• GET http://localhost:5001/health - Health check</div>
          <div>• GET http://localhost:5001/api/shayri - Get all shayri</div>
          <div>• GET http://localhost:5001/api/shayri/:id - Get shayri by ID</div>
          <div>• GET http://localhost:5001/api/users - Get all users</div>
          <div>• GET http://localhost:5001/api/analytics - Get analytics</div>
        </div>
      </div>
    </div>
  );
}
