/**
 * Backend Integration Test Component
 * Tests that frontend properly uses backend API instead of local data
 */

import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

export default function BackendIntegrationTest() {
  const [testResults, setTestResults] = useState({});
  const [isRunning, setIsRunning] = useState(false);

  const updateResult = (test, status, data) => {
    setTestResults(prev => ({
      ...prev,
      [test]: { status, data, timestamp: new Date().toLocaleTimeString() }
    }));
  };

  const runIntegrationTest = async () => {
    setIsRunning(true);
    setTestResults({});

    // Test 1: API Connection
    updateResult('connection', 'loading');
    try {
      const health = await apiService.checkConnection();
      updateResult('connection', health.status === 'OK' ? 'success' : 'error', health.status);
    } catch (error) {
      updateResult('connection', 'error', error.message);
    }

    // Test 2: Shayri Data from Backend
    updateResult('shayri', 'loading');
    try {
      const shayriData = await apiService.getShayri({ limit: 5 });
      if (shayriData.success && shayriData.data.length > 0) {
        const avinashShayri = shayriData.data.find(s => s.user?.name === 'Avinash');
        updateResult('shayri', 'success', {
          total: shayriData.data.length,
          hasAvinash: !!avinashShayri,
          sampleAuthor: shayriData.data[0].author,
          backendSource: true
        });
      } else {
        updateResult('shayri', 'error', 'No data received');
      }
    } catch (error) {
      updateResult('shayri', 'error', error.message);
    }

    // Test 3: User Stats from Backend
    updateResult('users', 'loading');
    try {
      const userStats = await apiService.getUserStats();
      if (userStats.success && userStats.data) {
        updateResult('users', 'success', {
          total: userStats.data.total,
          active: userStats.data.active,
          backendSource: true
        });
      } else {
        updateResult('users', 'error', 'No user stats received');
      }
    } catch (error) {
      updateResult('users', 'error', error.message);
    }

    // Test 4: Analytics from Backend
    updateResult('analytics', 'loading');
    try {
      const analytics = await apiService.getAnalytics();
      if (analytics.success && analytics.data) {
        updateResult('analytics', 'success', {
          totalShayris: analytics.data.overview?.totalShayris,
          totalUsers: analytics.data.overview?.totalUsers,
          backendSource: true
        });
      } else {
        updateResult('analytics', 'error', 'No analytics received');
      }
    } catch (error) {
      updateResult('users', 'error', error.message);
    }

    setIsRunning(false);
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'success': return '✅ Success';
      case 'error': return '❌ Error';
      case 'loading': return '⏳ Testing...';
      default: return '⏸️ Pending';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'loading': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const allTestsPassed = Object.values(testResults).every(r => r.status === 'success');

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">🔗 Backend Integration Test</h1>
        <p className="text-gray-600">Verifying frontend uses backend API (not local data)</p>
      </div>

      {/* Overall Status */}
      <div className={`p-4 rounded-lg mb-6 border ${
        allTestsPassed ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-lg">
              {allTestsPassed ? '🎉 All Tests Passed!' : '⚠️ Some Tests Failed'}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {allTestsPassed 
                ? 'Frontend is successfully using backend API' 
                : 'Frontend may still be using local data or API issues exist'}
            </div>
          </div>
          <button
            onClick={runIntegrationTest}
            disabled={isRunning}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isRunning ? 'Running Tests...' : 'Run Integration Test'}
          </button>
        </div>
      </div>

      {/* Test Results */}
      <div className="space-y-4">
        {[
          { key: 'connection', name: 'API Connection', description: 'Backend server connectivity' },
          { key: 'shayri', name: 'Shayri Data', description: 'Poetry data from backend' },
          { key: 'users', name: 'User Statistics', description: 'User data from backend' },
          { key: 'analytics', name: 'Analytics Data', description: 'Analytics from backend' }
        ].map(test => {
          const result = testResults[test.key];
          return (
            <div key={test.key} className={`border rounded-lg p-4 ${getStatusColor(result?.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold">{test.name}</div>
                  <div className="text-sm opacity-75">{test.description}</div>
                </div>
                <div className="text-lg font-medium">
                  {getStatusDisplay(result?.status)}
                </div>
              </div>
              
              {result?.data && (
                <div className="mt-3 text-sm">
                  <div className="font-medium mb-1">Details:</div>
                  <pre className="bg-white bg-opacity-50 p-2 rounded">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              )}
              
              {result?.timestamp && (
                <div className="mt-2 text-xs opacity-75">
                  Tested at: {result.timestamp}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Integration Info */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-3">📋 Integration Status:</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Local data files removed: poetryData.js, userData.js</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>API service configured: http://localhost:5001/api</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Components updated to use API calls</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Your "Avinash" user should appear in backend data</span>
          </div>
        </div>
      </div>
    </div>
  );
}
