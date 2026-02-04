import React, { useState } from 'react';
import { CloudAffiliateManager } from '../utils/cloudAffiliateManager';
import { Button } from './Button';

export const RedirectTestPanel: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const createTestRedirectLinks = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const timestamp = Date.now();
      
      // Create direct redirect test link
      const directLink = {
        slug: `direct-test-${timestamp}`,
        title: 'Direct Redirect Test',
        description: 'Testing direct redirect functionality',
        destinationUrl: 'https://www.google.com/search?q=direct+redirect+test',
        category: 'Test',
        redirectType: 'direct' as const,
        autoRedirect: true,
        isActive: true,
        tags: ['redirect-test', 'direct'],
        trustBadges: ['Test Badge']
      };

      // Create landing page test link
      const landingLink = {
        slug: `landing-test-${timestamp}`,
        title: 'Landing Page Test',
        description: 'Testing landing page redirect functionality',
        destinationUrl: 'https://www.google.com/search?q=landing+page+test',
        category: 'Test',
        redirectType: 'landing' as const,
        autoRedirect: false, // Manual redirect for testing
        isActive: true,
        tags: ['redirect-test', 'landing'],
        trustBadges: ['Test Badge']
      };

      console.log('Creating test redirect links...');
      
      const directResult = await CloudAffiliateManager.addAffiliateLink(directLink);
      const landingResult = await CloudAffiliateManager.addAffiliateLink(landingLink);

      if (directResult && landingResult) {
        const report = `✅ REDIRECT TEST LINKS CREATED!

🚀 **Direct Redirect Test:**
- URL: https://drozhealthfacts.com/${directResult.slug}
- Behavior: Should immediately redirect to Google search
- Test on different devices to verify global access

🎯 **Landing Page Test:**
- URL: https://drozhealthfacts.com/${landingResult.slug}
- Behavior: Shows product page, manual redirect button
- Test the redirect button functionality

📱 **Cross-Device Testing:**
1. Copy the URLs above
2. Open on different devices (phone, tablet, other computer)
3. Verify both links work correctly
4. Check redirect behavior matches the type

🔍 **What to Verify:**
- ✅ Links accessible from any device
- ✅ Direct redirect goes immediately to destination
- ✅ Landing page shows product info first
- ✅ Manual redirect button works
- ✅ No "Product Not Found" errors

⚠️ **If Links Don't Work:**
- Check if cloud database is connected
- Verify environment variables are set
- Check Cloudflare Pages deployment status
- Look for errors in browser console`;

        setResult(report);
      } else {
        setResult('❌ FAILED: Could not create test redirect links');
      }

    } catch (error) {
      console.error('Failed to create test redirect links:', error);
      setResult(`❌ ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testExistingLinks = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      console.log('Fetching existing links for redirect testing...');
      const links = await CloudAffiliateManager.getAffiliateLinks();
      
      const activeLinks = links.filter(link => link.isActive);
      const directLinks = activeLinks.filter(link => link.redirectType === 'direct');
      const landingLinks = activeLinks.filter(link => link.redirectType === 'landing');

      const report = `🔍 EXISTING LINKS REDIRECT TEST

📊 **Link Summary:**
- Total Active Links: ${activeLinks.length}
- Direct Redirect Links: ${directLinks.length}
- Landing Page Links: ${landingLinks.length}

🚀 **Direct Redirect Links:**
${directLinks.slice(0, 3).map(link => `
- ${link.title} (/${link.slug})
  URL: https://drozhealthfacts.com/${link.slug}
  Destination: ${link.destinationUrl}
  Should redirect immediately to destination
`).join('')}

🎯 **Landing Page Links:**
${landingLinks.slice(0, 3).map(link => `
- ${link.title} (/${link.slug})
  URL: https://drozhealthfacts.com/${link.slug}
  Destination: ${link.destinationUrl}
  Auto Redirect: ${link.autoRedirect ? 'Yes (5s)' : 'Manual'}
`).join('')}

📱 **Testing Instructions:**
1. Copy any URL above
2. Test on different devices/browsers
3. Verify redirect behavior matches the type
4. Check for any "Product Not Found" errors

${activeLinks.length === 0 ? '⚠️ No active links found. Create some links first!' : ''}`;

      setResult(report);

    } catch (error) {
      console.error('Failed to test existing links:', error);
      setResult(`❌ ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4">
        🔗 Redirect Test Panel
      </h3>
      
      <div className="flex gap-3 mb-4">
        <Button
          onClick={createTestRedirectLinks}
          disabled={isLoading}
          size="sm"
          variant="primary"
        >
          {isLoading ? 'Creating...' : 'Create Test Redirect Links'}
        </Button>
        
        <Button
          onClick={testExistingLinks}
          disabled={isLoading}
          size="sm"
          variant="outline"
        >
          {isLoading ? 'Testing...' : 'Test Existing Links'}
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