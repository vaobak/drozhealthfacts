import React, { useState } from 'react';
import { CloudAffiliateManager } from '../utils/cloudAffiliateManager';
import { Button } from './Button';

export const FieldMappingDebug: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const testFieldMapping = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      // Step 1: Create a test link with specific destinationUrl and redirectType
      const testData = {
        slug: `field-test-${Date.now()}`,
        title: 'Field Mapping Test',
        description: 'Testing if destinationUrl and redirectType are saved correctly',
        destinationUrl: 'https://test-destination-url.com/specific-path',
        category: 'Test',
        redirectType: 'direct' as const,
        autoRedirect: false,
        isActive: true,
        tags: ['field-test'],
        trustBadges: ['Test Badge']
      };

      console.log('🧪 STEP 1: Creating test link with data:', testData);
      
      const createdLink = await CloudAffiliateManager.addAffiliateLink(testData);
      
      if (!createdLink) {
        setResult('❌ FAILED: Could not create test link');
        return;
      }

      console.log('✅ STEP 1 RESULT: Created link:', createdLink);

      // Step 2: Retrieve the link by slug to check if data is saved correctly
      console.log('🧪 STEP 2: Retrieving link by slug:', createdLink.slug);
      
      const retrievedLink = await CloudAffiliateManager.getAffiliateLinkBySlug(createdLink.slug);
      
      if (!retrievedLink) {
        setResult('❌ FAILED: Could not retrieve created link');
        return;
      }

      console.log('✅ STEP 2 RESULT: Retrieved link:', retrievedLink);

      // Step 3: Compare the data
      const comparison = {
        originalDestinationUrl: testData.destinationUrl,
        savedDestinationUrl: retrievedLink.destinationUrl,
        destinationUrlMatch: testData.destinationUrl === retrievedLink.destinationUrl,
        
        originalRedirectType: testData.redirectType,
        savedRedirectType: retrievedLink.redirectType,
        redirectTypeMatch: testData.redirectType === retrievedLink.redirectType,
        
        originalAutoRedirect: testData.autoRedirect,
        savedAutoRedirect: retrievedLink.autoRedirect,
        autoRedirectMatch: testData.autoRedirect === retrievedLink.autoRedirect
      };

      console.log('🧪 STEP 3: Field comparison:', comparison);

      // Step 4: Get all links to check the list view
      console.log('🧪 STEP 4: Getting all links to check list view');
      const allLinks = await CloudAffiliateManager.getAffiliateLinks();
      const linkInList = allLinks.find(link => link.slug === createdLink.slug);

      console.log('✅ STEP 4 RESULT: Link in list:', linkInList);

      // Generate result report
      const report = `🧪 FIELD MAPPING TEST RESULTS

📝 Test Data Sent:
- Destination URL: ${testData.destinationUrl}
- Redirect Type: ${testData.redirectType}
- Auto Redirect: ${testData.autoRedirect}

💾 Data Retrieved by Slug:
- Destination URL: ${retrievedLink.destinationUrl}
- Redirect Type: ${retrievedLink.redirectType}
- Auto Redirect: ${retrievedLink.autoRedirect}

📋 Data in List View:
- Destination URL: ${linkInList?.destinationUrl || 'NOT FOUND'}
- Redirect Type: ${linkInList?.redirectType || 'NOT FOUND'}
- Auto Redirect: ${linkInList?.autoRedirect || 'NOT FOUND'}

✅ FIELD VALIDATION:
- Destination URL Match: ${comparison.destinationUrlMatch ? '✅ YES' : '❌ NO'}
- Redirect Type Match: ${comparison.redirectTypeMatch ? '✅ YES' : '❌ NO'}
- Auto Redirect Match: ${comparison.autoRedirectMatch ? '✅ YES' : '❌ NO'}

🔗 Test URL: https://drozhealthfacts.com/${createdLink.slug}

${comparison.destinationUrlMatch && comparison.redirectTypeMatch && comparison.autoRedirectMatch 
  ? '🎉 ALL FIELDS SAVED CORRECTLY!' 
  : '⚠️ SOME FIELDS NOT SAVED CORRECTLY - CHECK LOGS'}`;

      setResult(report);

    } catch (error) {
      console.error('Field mapping test failed:', error);
      setResult(`❌ TEST ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testDirectAPICall = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      // Test direct API call to see raw response
      const response = await fetch('https://drozhealthfacts.com/api/affiliate-links', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      const report = `🔍 DIRECT API CALL RESULTS

📡 API Response Status: ${response.status} ${response.statusText}
📊 Total Links: ${Array.isArray(data) ? data.length : 'Not an array'}

🔍 First 3 Links Field Check:
${Array.isArray(data) ? data.slice(0, 3).map((link: any, index: number) => `
Link ${index + 1}: ${link.title || 'No title'}
- slug: ${link.slug || 'Missing'}
- destinationUrl: ${link.destinationUrl || link.destination_url || 'Missing'}
- redirectType: ${link.redirectType || link.redirect_type || 'Missing'}
- autoRedirect: ${link.autoRedirect !== undefined ? link.autoRedirect : (link.auto_redirect !== undefined ? link.auto_redirect : 'Missing')}
`).join('') : 'No links data'}

🔧 Raw Data Sample:
${JSON.stringify(Array.isArray(data) ? data[0] : data, null, 2)}`;

      setResult(report);

    } catch (error) {
      console.error('Direct API test failed:', error);
      setResult(`❌ API TEST ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
        🔍 Field Mapping Debug Panel
      </h3>
      
      <div className="flex gap-3 mb-4">
        <Button
          onClick={testFieldMapping}
          disabled={isLoading}
          size="sm"
          variant="outline"
        >
          {isLoading ? 'Testing...' : 'Test Field Mapping'}
        </Button>
        
        <Button
          onClick={testDirectAPICall}
          disabled={isLoading}
          size="sm"
          variant="outline"
        >
          {isLoading ? 'Testing...' : 'Test Direct API'}
        </Button>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-800 border rounded p-4">
          <pre className="text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200 overflow-x-auto">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};