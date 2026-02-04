import React, { useState } from 'react';
import { CloudAffiliateManager } from '../utils/cloudAffiliateManager';
import { Button } from './Button';

export const AffiliateFormTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const testFormSubmission = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const testData = {
        slug: `test-form-${Date.now()}`,
        title: 'Test Form Submission',
        description: 'This is a test to verify form data is saved correctly',
        destinationUrl: 'https://example.com/test-destination',
        productImage: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop',
        category: 'Test Category',
        price: '$29.99',
        originalPrice: '$49.99',
        discount: '40% OFF',
        tags: ['test', 'form', 'verification'],
        trustBadges: ['Test Badge', 'Verified'],
        isActive: true,
        redirectType: 'landing' as const,
        autoRedirect: false
      };

      console.log('Testing form submission with data:', testData);
      
      const result = await CloudAffiliateManager.addAffiliateLink(testData);
      
      if (result) {
        setResult(`✅ SUCCESS: Link created with ID ${result.id}
        
Saved Data:
- Slug: ${result.slug}
- Title: ${result.title}
- Destination URL: ${result.destinationUrl}
- Redirect Type: ${result.redirectType}
- Auto Redirect: ${result.autoRedirect}
- Category: ${result.category}
- Price: ${result.price}
- Tags: ${result.tags.join(', ')}
        
Test URL: https://drozhealthfacts.com/${result.slug}`);
      } else {
        setResult('❌ FAILED: No result returned from API');
      }
    } catch (error) {
      console.error('Test failed:', error);
      setResult(`❌ ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testDataRetrieval = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      console.log('Testing data retrieval...');
      const links = await CloudAffiliateManager.getAffiliateLinks();
      
      setResult(`✅ RETRIEVAL SUCCESS: Found ${links.length} links
      
Recent Links:
${links.slice(0, 3).map(link => `
- ${link.title} (/${link.slug})
  Destination: ${link.destinationUrl}
  Redirect Type: ${link.redirectType}
  Auto Redirect: ${link.autoRedirect}
`).join('')}`);
    } catch (error) {
      console.error('Retrieval test failed:', error);
      setResult(`❌ RETRIEVAL ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4">
        🧪 Form Data Test Panel
      </h3>
      
      <div className="flex gap-3 mb-4">
        <Button
          onClick={testFormSubmission}
          disabled={isLoading}
          size="sm"
          variant="outline"
        >
          {isLoading ? 'Testing...' : 'Test Form Submission'}
        </Button>
        
        <Button
          onClick={testDataRetrieval}
          disabled={isLoading}
          size="sm"
          variant="outline"
        >
          {isLoading ? 'Testing...' : 'Test Data Retrieval'}
        </Button>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-800 border rounded p-4">
          <pre className="text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};