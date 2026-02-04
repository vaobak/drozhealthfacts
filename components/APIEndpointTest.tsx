import React, { useState } from 'react';
import { Button } from './Button';

interface EndpointTest {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers?: Record<string, string>;
  body?: any;
  description: string;
}

export const APIEndpointTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [selectedTest, setSelectedTest] = useState<string>('');

  const endpoints: EndpointTest[] = [
    {
      name: 'Health Check',
      method: 'GET',
      url: '/api/health',
      description: 'Test if API is responding'
    },
    {
      name: 'Get All Links',
      method: 'GET',
      url: '/api/affiliate-links',
      description: 'Fetch all affiliate links'
    },
    {
      name: 'Get Link by Slug',
      method: 'GET',
      url: '/api/affiliate-links/slug/test-slug',
      description: 'Fetch specific link by slug'
    },
    {
      name: 'Create Link (Authenticated)',
      method: 'POST',
      url: '/api/affiliate-links',
      headers: {
        'Authorization': 'Bearer droz-health-facts-api-key-2026',
        'X-Project-ID': 'droz-health-facts',
        'Content-Type': 'application/json'
      },
      body: {
        slug: `api-test-${Date.now()}`,
        title: 'API Test Link',
        description: 'Testing API endpoint directly',
        destinationUrl: 'https://api-test.com',
        category: 'API Test',
        redirectType: 'direct',
        autoRedirect: true,
        isActive: true,
        tags: ['api-test'],
        trustBadges: ['API Badge']
      },
      description: 'Create new link with authentication'
    },
    {
      name: 'Update Link (Authenticated)',
      method: 'PUT',
      url: '/api/affiliate-links/test-id',
      headers: {
        'Authorization': 'Bearer droz-health-facts-api-key-2026',
        'X-Project-ID': 'droz-health-facts',
        'Content-Type': 'application/json'
      },
      body: {
        title: 'Updated API Test Link',
        description: 'Updated via API test',
        destinationUrl: 'https://updated-api-test.com'
      },
      description: 'Update existing link (requires valid ID)'
    },
    {
      name: 'Delete Link (Authenticated)',
      method: 'DELETE',
      url: '/api/affiliate-links/test-id',
      headers: {
        'Authorization': 'Bearer droz-health-facts-api-key-2026',
        'X-Project-ID': 'droz-health-facts'
      },
      description: 'Delete existing link (requires valid ID)'
    }
  ];

  const runEndpointTest = async (endpoint: EndpointTest) => {
    setIsLoading(true);
    const startTime = Date.now();

    try {
      console.log(`Testing ${endpoint.method} ${endpoint.url}`);
      
      const requestOptions: RequestInit = {
        method: endpoint.method,
        headers: endpoint.headers || {}
      };

      if (endpoint.body && (endpoint.method === 'POST' || endpoint.method === 'PUT')) {
        requestOptions.body = JSON.stringify(endpoint.body);
      }

      console.log('Request options:', requestOptions);

      const response = await fetch(`https://drozhealthfacts.com${endpoint.url}`, requestOptions);
      const duration = Date.now() - startTime;

      let responseData;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      const result = {
        endpoint: endpoint.name,
        method: endpoint.method,
        url: endpoint.url,
        status: response.status,
        statusText: response.statusText,
        success: response.ok,
        duration,
        headers: Object.fromEntries(response.headers.entries()),
        data: responseData,
        timestamp: new Date().toISOString()
      };

      console.log('API Test Result:', result);
      setResults(prev => [result, ...prev]);

    } catch (error) {
      const result = {
        endpoint: endpoint.name,
        method: endpoint.method,
        url: endpoint.url,
        status: 0,
        statusText: 'Network Error',
        success: false,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };

      console.error('API Test Error:', result);
      setResults(prev => [result, ...prev]);
    } finally {
      setIsLoading(false);
    }
  };

  const runAllTests = async () => {
    setIsLoading(true);
    setResults([]);

    for (const endpoint of endpoints) {
      await runEndpointTest(endpoint);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsLoading(false);
  };

  const clearResults = () => {
    setResults([]);
  };

  const formatResult = (result: any) => {
    const statusColor = result.success ? 'text-green-600' : 'text-red-600';
    const statusIcon = result.success ? '✅' : '❌';
    
    return (
      <div key={`${result.endpoint}-${result.timestamp}`} className="border-b border-gray-200 dark:border-gray-600 pb-4 mb-4 last:border-b-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span>{statusIcon}</span>
            <span className="font-medium">{result.endpoint}</span>
            <span className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {result.method}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {result.duration}ms
          </div>
        </div>
        
        <div className="text-sm space-y-1">
          <div>
            <span className="font-medium">Status:</span> 
            <span className={statusColor}> {result.status} {result.statusText}</span>
          </div>
          <div>
            <span className="font-medium">URL:</span> {result.url}
          </div>
          
          {result.error && (
            <div className="text-red-600">
              <span className="font-medium">Error:</span> {result.error}
            </div>
          )}
          
          {result.data && (
            <details className="mt-2">
              <summary className="cursor-pointer font-medium text-blue-600 hover:text-blue-800">
                Response Data
              </summary>
              <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs overflow-x-auto">
                {typeof result.data === 'string' ? result.data : JSON.stringify(result.data, null, 2)}
              </pre>
            </details>
          )}
          
          <details className="mt-2">
            <summary className="cursor-pointer font-medium text-gray-600 hover:text-gray-800">
              Response Headers
            </summary>
            <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs overflow-x-auto">
              {JSON.stringify(result.headers, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-200 mb-4">
        🌐 API Endpoint Test Panel
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Available Endpoints:</h4>
          <div className="space-y-2">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border">
                <div>
                  <div className="font-medium text-sm">{endpoint.name}</div>
                  <div className="text-xs text-gray-500">{endpoint.description}</div>
                  <div className="text-xs text-gray-400">
                    {endpoint.method} {endpoint.url}
                  </div>
                </div>
                <Button
                  onClick={() => runEndpointTest(endpoint)}
                  disabled={isLoading}
                  size="sm"
                  variant="outline"
                >
                  Test
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Bulk Actions:</h4>
          <div className="space-y-2">
            <Button
              onClick={runAllTests}
              disabled={isLoading}
              size="sm"
              variant="primary"
              className="w-full"
            >
              {isLoading ? 'Running All Tests...' : 'Run All Endpoint Tests'}
            </Button>
            
            <Button
              onClick={clearResults}
              disabled={isLoading}
              size="sm"
              variant="outline"
              className="w-full"
            >
              Clear Results
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
            <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Important Notes:</h5>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Health Check and Get All Links are public (no auth required)</li>
              <li>• Create, Update, Delete require authentication headers</li>
              <li>• Update and Delete need valid link IDs (replace 'test-id')</li>
              <li>• Check browser console for detailed request/response logs</li>
            </ul>
          </div>
        </div>
      </div>

      {results.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border rounded p-4">
          <h4 className="font-medium mb-4 text-gray-900 dark:text-white">
            Test Results ({results.length} tests):
          </h4>
          <div className="max-h-96 overflow-y-auto">
            {results.map((result, index) => formatResult(result))}
          </div>
        </div>
      )}

      {results.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Click "Test" on any endpoint or "Run All Endpoint Tests" to start testing
        </div>
      )}
    </div>
  );
};