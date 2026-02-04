import React, { useState, useEffect } from 'react';
import { CloudAffiliateManager } from '../utils/cloudAffiliateManager';
import { Button } from './Button';
import { AlertCircle, CheckCircle, Database, Wifi, WifiOff } from 'lucide-react';

export const CloudDebugPanel: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<{
    success: boolean;
    message: string;
    latency?: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [links, setLinks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Testing cloud connection...');
      const result = await CloudAffiliateManager.testConnection();
      setConnectionStatus(result);
      
      if (result.success) {
        // If connection works, try to fetch links
        const affiliateLinks = await CloudAffiliateManager.getAffiliateLinks();
        setLinks(affiliateLinks);
        console.log('Fetched links:', affiliateLinks);
      }
    } catch (error) {
      console.error('Connection test failed:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
      setConnectionStatus({
        success: false,
        message: 'Connection test failed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addTestLink = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const testLink = {
        slug: `test-${Date.now()}`,
        title: 'Test Product',
        description: 'This is a test product for debugging',
        destinationUrl: 'https://example.com',
        category: 'Test',
        isActive: true,
        tags: ['test'],
        trustBadges: ['Test Badge'],
        redirectType: 'landing' as const,
        autoRedirect: true
      };
      
      console.log('Adding test link:', testLink);
      const result = await CloudAffiliateManager.addAffiliateLink(testLink);
      console.log('Test link added:', result);
      
      // Refresh links
      await testConnection();
    } catch (error) {
      console.error('Failed to add test link:', error);
      setError(error instanceof Error ? error.message : 'Failed to add test link');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <Database className="w-5 h-5 mr-2 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Cloud Database Debug Panel
        </h3>
      </div>

      {/* Connection Status */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          {connectionStatus?.success ? (
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          )}
          <span className="font-medium">
            Connection Status: {connectionStatus?.success ? 'Connected' : 'Disconnected'}
          </span>
          {connectionStatus?.latency && (
            <span className="ml-2 text-sm text-gray-500">
              ({connectionStatus.latency}ms)
            </span>
          )}
        </div>
        
        {connectionStatus && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {connectionStatus.message}
          </p>
        )}
        
        {error && (
          <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mb-4">
        <Button
          onClick={testConnection}
          disabled={isLoading}
          size="sm"
        >
          {isLoading ? 'Testing...' : 'Test Connection'}
        </Button>
        
        <Button
          onClick={addTestLink}
          disabled={isLoading || !connectionStatus?.success}
          variant="outline"
          size="sm"
        >
          Add Test Link
        </Button>
      </div>

      {/* Environment Info */}
      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
        <h4 className="font-medium mb-2">Environment Variables:</h4>
        <div className="text-sm space-y-1">
          <div>API Endpoint: {process.env.REACT_APP_API_ENDPOINT || 'Not set'}</div>
          <div>Cloud Sync: {process.env.REACT_APP_ENABLE_CLOUD_SYNC || 'Not set'}</div>
          <div>DB Provider: {process.env.REACT_APP_DB_PROVIDER || 'Not set'}</div>
          <div>Fallback to Local: {process.env.REACT_APP_FALLBACK_TO_LOCAL || 'Not set'}</div>
        </div>
      </div>

      {/* Links Data */}
      {links.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Affiliate Links in Database ({links.length}):</h4>
          <div className="max-h-40 overflow-y-auto">
            {links.map((link, index) => (
              <div key={index} className="text-sm p-2 border-b border-gray-200 dark:border-gray-600">
                <div className="font-medium">{link.title}</div>
                <div className="text-gray-500">/{link.slug}</div>
                <div className="text-xs text-gray-400">
                  Clicks: {link.clickCount} | Active: {link.isActive ? 'Yes' : 'No'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};