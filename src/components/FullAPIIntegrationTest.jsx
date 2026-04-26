/**
 * Full API Integration Test Component
 * Tests complete frontend-backend integration
 */

import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

export default function FullAPIIntegrationTest() {
  const [testResults, setTestResults] = useState({});
  const [overallStatus, setOverallStatus] = useState('idle');

  const updateTestResult = (testName, status, data = null, error = null) => {
    setTestResults(prev => ({
      ...prev,
      [testName]: {
        status,
        data,
        error,
        timestamp: new Date().toLocaleTimeString()
      }
    }));
  };

  const runFullTest = async () => {
    setOverallStatus('running');
    setTestResults({});

    try {
      // Test 1: Health Check
      updateTestResult('health', 'loading');
      try {
        const health = await apiService.checkConnection();
        updateTestResult('health', health.status === 'OK' ? 'success' : 'error', health);
      } catch (error) {
        updateTestResult('health', 'error', null, error.message);
      }

      // Test 2: Get Shayri Data
      updateTestResult('shayri', 'loading');
      try {
        const shayriData = await apiService.getShayri({ limit: 3 });
        if (shayriData.success && shayriData.data) {
          updateTestResult('shayri', 'success', {
            count: shayriData.data.length,
            sample: shayriData.data[0]?.text?.substring(0, 50) + '...'
          });
        } else {
          updateTestResult('shayri', 'error', null, shayriData.error || 'No data');
        }
      } catch (error) {
        updateTestResult('shayri', 'error', null, error.message);
      }

      // Test 3: Get User Statistics
      updateTestResult('users', 'loading');
      try {
        const userStats = await apiService.getUserStats();
        if (userStats.success && userStats.data) {
          updateTestResult('users', 'success', {
            total: userStats.data.total,
            active: userStats.data.active,
            admins: userStats.data.admins
          });
        } else {
          updateTestResult('users', 'error', null, userStats.error || 'No data');
        }
      } catch (error) {
        updateTestResult('users', 'error', null, error.message);
      }

      // Test 4: Get Analytics Data
      updateTestResult('analytics', 'loading');
      try {
        const analytics = await apiService.getAnalytics();
        if (analytics.success && analytics.data) {
          updateTestResult('analytics', 'success', {
            totalShayris: analytics.data.overview?.totalShayris,
            totalUsers: analytics.data.overview?.totalUsers,
            totalViews: analytics.data.overview?.totalViews
          });
        } else {
          updateTestResult('analytics', 'error', null, analytics.error || 'No data');
        }
      } catch (error) {
        updateTestResult('analytics', 'error', null, error.message);
      }

      // Test 5: Check for Avinash User
      updateTestResult('avinash', 'loading');
      try {
        const usersData = await apiService.getShayri({ limit: 20 }); // Get more data to find Avinash
        if (usersData.success && usersData.data) {
          const avinashShayri = usersData.data.find(s => s.user?.name === 'Avinash');
          if (avinashShayri) {
            updateTestResult('avinash', 'success', {
              found: true,
              userId: avinashShayri.user.id,
              userRole: avinashShayri.user.role,
              userStatus: avinashShayri.user.status,
              shayriId: avinashShayri.id
            });
          } else {
            updateTestResult('avinash', 'warning', { found: false });
          }
        } else {
          updateTestResult('avinash', 'error', null, 'Could not fetch data');
        }
      } catch (error) {
        updateTestResult('avinash', 'error', null, error.message);
      }

      setOverallStatus('completed');

    } catch (error) {
      console.error('Full test error:', error);
      setOverallStatus('error');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'error': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'loading': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'loading': return '⏳';
      default: return '⏸️';
    }
  };

  const getOverallStatus = () => {
    const results = Object.values(testResults);
    if (results.length === 0) return overallStatus;
    
    const hasErrors = results.some(r => r.status === 'error');
    const hasSuccess = results.some(r => r.status === 'success');
    
    if (overallStatus === 'running') return 'running';
    if (hasErrors && hasSuccess) return 'partial';
    if (hasErrors) return 'failed';
    if (hasSuccess) return 'success';
    return 'idle';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🔗 Full API Integration Test</h1>
        <p className="text-gray-600">Complete frontend-backend API connection test</p>
      </div>

      {/* Overall Status */}
      <div className={`p-4 rounded-lg mb-6 ${getStatusColor(getOverallStatus())}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getStatusIcon(getOverallStatus())}</span>
            <div>
              <div className="font-semibold">
                Overall Status: {getOverallStatus().toUpperCase()}
              </div>
              <div className="text-sm opacity-75">
                {getOverallStatus() === 'success' && 'All API calls working perfectly!'}
                {getOverallStatus() === 'partial' && 'Some API calls failed, but basic functionality works'}
                {getOverallStatus() === 'failed' && 'API calls are failing'}
                {getOverallStatus() === 'running' && 'Running tests...'}
                {getOverallStatus() === 'idle' && 'Ready to run tests'}
              </div>
            </div>
          </div>
          <button
            onClick={runFullTest}
            disabled={overallStatus === 'running'}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {overallStatus === 'running' ? 'Running...' : 'Run Full Test'}
          </button>
        </div>
      </div>

      {/* Individual Test Results */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Test Results:</h2>
        
        {[
          { key: 'health', name: 'Health Check', description: 'Backend server connectivity' },
          { key: 'shayri', name: 'Shayri API', description: 'Poetry data retrieval' },
          { key: 'users', name: 'Users API', description: 'User statistics' },
          { key: 'analytics', name: 'Analytics API', description: 'Comprehensive analytics' },
          { key: 'avinash', name: 'Avinash User', description: 'Your user data verification' }
        ].map(test => {
          const result = testResults[test.key];
          return (
            <div key={test.key} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getStatusIcon(result?.status)}</span>
                  <div>
                    <div className="font-semibold">{test.name}</div>
                    <div className="text-sm text-gray-600">{test.description}</div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(result?.status)}`}>
                  {result?.status?.toUpperCase() || 'PENDING'}
                </div>
              </div>
              
              {result?.data && (
                <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                  <div className="font-medium text-gray-700 mb-1">Result Data:</div>
                  <pre className="text-gray-600 whitespace-pre-wrap">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              )}
              
              {result?.error && (
                <div className="mt-3 p-3 bg-red-50 rounded text-sm text-red-700">
                  <div className="font-medium mb-1">Error:</div>
                  <div>{result.error}</div>
                </div>
              )}
              
              {result?.timestamp && (
                <div className="mt-2 text-xs text-gray-500">
                  Last tested: {result.timestamp}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* API Info */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">📡 API Configuration:</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <div className="font-medium">Backend URL:</div>
            <div>http://localhost:5001</div>
          </div>
          <div>
            <div className="font-medium">API Base:</div>
            <div>http://localhost:5001/api</div>
          </div>
          <div>
            <div className="font-medium">CORS:</div>
            <div>Enabled for all origins</div>
          </div>
          <div>
            <div className="font-medium">Method:</div>
            <div>Simple fetch calls</div>
          </div>
        </div>
      </div>
    </div>
  );
}
