import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CloudAffiliateManager } from '../utils/cloudAffiliateManager';

export const SimpleRedirectTest: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addLog = (message: string) => {
    console.log(message);
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    const runTests = async () => {
      addLog('🧪 SIMPLE REDIRECT TEST STARTED');
      addLog(`📍 Current URL: ${window.location.href}`);
      addLog(`🔍 Slug parameter: ${slug || 'undefined'}`);
      
      // Test 1: Simple redirect without any database calls
      if (slug === 'simple-test') {
        addLog('🚀 TEST 1: Simple redirect test detected');
        addLog('⏰ Will redirect to Google in 2 seconds...');
        
        setTimeout(() => {
          addLog('🚀 EXECUTING SIMPLE REDIRECT NOW');
          window.location.href = 'https://www.google.com/search?q=simple+redirect+test+working';
        }, 2000);
        
        setIsLoading(false);
        return;
      }
      
      // Test 2: Test cloud database connection
      if (slug === 'test-cloud') {
        addLog('🌐 TEST 2: Testing cloud database connection');
        
        try {
          const testConnection = await CloudAffiliateManager.testConnection();
          addLog(`📡 Cloud connection result: ${JSON.stringify(testConnection)}`);
          
          if (testConnection.success) {
            addLog('✅ Cloud database connected successfully');
            
            // Try to fetch all links
            const links = await CloudAffiliateManager.getAffiliateLinks();
            addLog(`📊 Found ${links.length} affiliate links in database`);
            
            // Show first few links
            links.slice(0, 3).forEach((link, index) => {
              addLog(`🔗 Link ${index + 1}: ${link.slug} -> ${link.destinationUrl} (${link.redirectType})`);
            });
            
          } else {
            addLog('❌ Cloud database connection failed');
          }
        } catch (error) {
          addLog(`❌ Cloud database error: ${error}`);
        }
        
        setIsLoading(false);
        return;
      }
      
      // Test 3: Test specific affiliate link
      if (slug && slug !== 'simple-test' && slug !== 'test-cloud') {
        addLog(`🔍 TEST 3: Looking for affiliate link with slug: ${slug}`);
        
        try {
          const affiliateLink = await CloudAffiliateManager.getAffiliateLinkBySlug(slug);
          
          if (affiliateLink) {
            addLog(`✅ Affiliate link found: ${JSON.stringify(affiliateLink, null, 2)}`);
            addLog(`🎯 Redirect Type: ${affiliateLink.redirectType}`);
            addLog(`🔗 Destination URL: ${affiliateLink.destinationUrl}`);
            
            if (affiliateLink.redirectType === 'direct') {
              addLog('🚀 DIRECT REDIRECT DETECTED - Will redirect in 3 seconds');
              addLog(`🎯 Target URL: ${affiliateLink.destinationUrl}`);
              
              setTimeout(() => {
                addLog('🚀 EXECUTING DIRECT REDIRECT NOW');
                window.location.href = affiliateLink.destinationUrl;
              }, 3000);
            } else {
              addLog('🎯 Landing page redirect type - would show landing page');
            }
          } else {
            addLog(`❌ No affiliate link found for slug: ${slug}`);
            addLog('🔍 This explains why it redirects to home page');
          }
        } catch (error) {
          addLog(`❌ Error fetching affiliate link: ${error}`);
        }
        
        setIsLoading(false);
        return;
      }
      
      addLog('ℹ️ No specific test detected');
      setIsLoading(false);
    };

    runTests();
  }, [slug]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          🧪 Simple Redirect Test & Debug
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Test URLs:
          </h2>
          <div className="space-y-2 text-sm">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <strong>Simple Redirect Test:</strong><br />
              <code>https://drozhealthfacts.com/debug-redirect/simple-test</code><br />
              <span className="text-gray-600 dark:text-gray-400">Should redirect to Google in 2 seconds</span>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
              <strong>Cloud Database Test:</strong><br />
              <code>https://drozhealthfacts.com/debug-redirect/test-cloud</code><br />
              <span className="text-gray-600 dark:text-gray-400">Tests cloud database connection and shows all links</span>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <strong>Specific Link Test:</strong><br />
              <code>https://drozhealthfacts.com/debug-redirect/YOUR-SLUG</code><br />
              <span className="text-gray-600 dark:text-gray-400">Replace YOUR-SLUG with actual affiliate link slug</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Test Results:
          </h2>
          
          {isLoading && (
            <div className="flex items-center text-blue-600 dark:text-blue-400 mb-4">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Running tests...
            </div>
          )}
          
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
            {testResults.length === 0 ? (
              <div className="text-gray-500">No test results yet...</div>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="mb-1">
                  {result}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
            🚨 Debug Instructions:
          </h3>
          <ol className="text-sm text-red-700 dark:text-red-300 space-y-1">
            <li>1. First test simple redirect to rule out basic redirect issues</li>
            <li>2. Test cloud database connection to verify data access</li>
            <li>3. Test your specific affiliate link slug to see what data is returned</li>
            <li>4. Check browser console for additional error messages</li>
            <li>5. If simple redirect works but affiliate links don't, the issue is in data retrieval</li>
          </ol>
        </div>
      </div>
    </div>
  );
};