import React, { useState } from 'react';
import { CloudAffiliateManager } from '../utils/cloudAffiliateManager';
import { Button } from './Button';

export const DirectRedirectDebug: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const testDirectRedirect = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const timestamp = Date.now();
      
      // Create direct redirect test link with specific settings
      const directTestLink = {
        slug: `direct-debug-${timestamp}`,
        title: 'Direct Redirect Debug Test',
        description: 'Testing direct redirect functionality with debug logging',
        destinationUrl: 'https://www.google.com/search?q=direct+redirect+test+working',
        category: 'Debug Test',
        redirectType: 'direct' as const,
        autoRedirect: true, // This should be ignored for direct redirects
        isActive: true,
        tags: ['debug', 'direct-redirect'],
        trustBadges: ['Debug Test']
      };

      console.log('🧪 Creating direct redirect test link:', directTestLink);
      
      const createdLink = await CloudAffiliateManager.addAffiliateLink(directTestLink);
      
      if (!createdLink) {
        setResult('❌ FAILED: Could not create direct redirect test link');
        return;
      }

      console.log('✅ Direct redirect link created:', createdLink);

      // Verify the link was saved with correct redirect type
      const retrievedLink = await CloudAffiliateManager.getAffiliateLinkBySlug(createdLink.slug);
      
      if (!retrievedLink) {
        setResult('❌ FAILED: Could not retrieve created direct redirect link');
        return;
      }

      console.log('🔍 Retrieved link data:', retrievedLink);

      // Test the redirect URL
      const testUrl = `https://drozhealthfacts.com/${createdLink.slug}`;
      
      const report = `✅ DIRECT REDIRECT TEST CREATED!

🎯 **Test Link Details:**
- Slug: ${createdLink.slug}
- Title: ${createdLink.title}
- Destination URL: ${createdLink.destinationUrl}
- Redirect Type: ${retrievedLink.redirectType}
- Auto Redirect: ${retrievedLink.autoRedirect}

🔗 **Test URL:** 
${testUrl}

📱 **CRITICAL TESTING INSTRUCTIONS:**
1. ⚠️ **IMPORTANT**: Copy the test URL above
2. ⚠️ **IMPORTANT**: Open in a NEW BROWSER TAB or INCOGNITO MODE
3. ⚠️ **IMPORTANT**: Open browser console (F12) BEFORE navigating
4. Navigate to the test URL
5. Should see immediate redirect to Google search (NOT home page)

🔍 **Expected Console Logs (FIXED VERSION):**
✅ 🔄 Starting loadAffiliateLink for slug: ${createdLink.slug}
✅ 📡 Fetching link from cloud database...
✅ ✅ Cloud affiliate link loaded: {redirectType: "direct", ...}
✅ 🔍 Link data loaded: {redirectType: "direct", destinationUrl: "..."}
✅ 🚀 DIRECT REDIRECT DETECTED - Processing immediate redirect to: ...
✅ 🔒 Setting hasRedirected flag to prevent duplicate redirects
✅ 🚀 EXECUTING DIRECT REDIRECT NOW to: ...
✅ 🔄 REDIRECT FUNCTION CALLED: {isDirect: true}
✅ 🚀 EXECUTING DIRECT REDIRECT (same tab) to: ...
✅ 🚀 REDIRECTING NOW to: ...

❌ **If You See These Logs (STILL BROKEN):**
❌ 🏠 Navigating to home due to cloud error
❌ 🏠 Navigating to home - link not found
❌ navigate('/', { replace: true })
❌ Multiple useEffect calls
❌ Component unmounted messages

🔍 **Expected Behavior (FIXED):**
- ✅ Immediate redirect to: ${createdLink.destinationUrl}
- ✅ No landing page shown
- ✅ No "Product Not Found" error
- ✅ Works on all devices and browsers
- ✅ Same tab redirect (not new tab)
- ✅ No navigation to home page

🚨 **If Direct Redirect STILL Goes to Home Page:**
1. Check console for "🏠 Navigating to home" messages
2. Verify link exists: Use "Analyze Existing Direct Links" button
3. Check Field Mapping Debug Panel for data integrity
4. Try creating a new test link with different slug
5. Test in completely different browser

🔧 **Debug Information:**
- Link ID: ${createdLink.id}
- Created: ${new Date().toISOString()}
- Redirect Type Saved: ${retrievedLink.redirectType}
- Destination URL Saved: ${retrievedLink.destinationUrl}
- Expected Redirect: Immediate to Google search

⚠️ **FIXED ISSUES:**
- ✅ Removed race conditions in useEffect
- ✅ Added isMounted flag to prevent state updates after unmount
- ✅ Improved redirect validation and error handling
- ✅ Removed hasRedirected from useEffect dependencies
- ✅ Enhanced direct redirect detection and execution
- ✅ Prevented navigation to home page on successful redirects

🎯 **SUCCESS CRITERIA:**
- Direct redirect should work immediately after clicking test URL
- Should redirect to Google search, NOT home page
- Should work consistently across all devices and browsers
- Console should show "DIRECT REDIRECT DETECTED" and "REDIRECTING NOW"`;

      setResult(report);

    } catch (error) {
      console.error('Direct redirect test failed:', error);
      setResult(`❌ ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testExistingDirectLinks = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      console.log('🔍 Fetching existing links to check direct redirect settings...');
      const links = await CloudAffiliateManager.getAffiliateLinks();
      
      const directLinks = links.filter(link => link.redirectType === 'direct' && link.isActive);
      
      if (directLinks.length === 0) {
        setResult(`📊 NO DIRECT REDIRECT LINKS FOUND

Current links analysis:
- Total active links: ${links.filter(l => l.isActive).length}
- Landing page links: ${links.filter(l => l.redirectType === 'landing' && l.isActive).length}
- Direct redirect links: 0

💡 Create a direct redirect link first, then test it.`);
        return;
      }

      const report = `📊 EXISTING DIRECT REDIRECT LINKS ANALYSIS

Found ${directLinks.length} direct redirect link(s):

${directLinks.map((link, index) => `
🔗 **Link ${index + 1}:**
- Title: ${link.title}
- Slug: ${link.slug}
- Destination URL: ${link.destinationUrl}
- Test URL: https://drozhealthfacts.com/${link.slug}
- Redirect Type: ${link.redirectType}
- Auto Redirect: ${link.autoRedirect}
- Active: ${link.isActive}
`).join('')}

🧪 **Testing Instructions:**
1. Copy any test URL above
2. Open in new browser tab/incognito mode
3. Should immediately redirect to destination URL
4. Test on different devices

⚠️ **If Links Don't Work:**
- Check if destinationUrl is valid and accessible
- Verify redirect type is exactly "direct"
- Test with browser console open to see errors
- Try different browsers/devices`;

      setResult(report);

    } catch (error) {
      console.error('Failed to analyze existing direct links:', error);
      setResult(`❌ ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
        🚨 Direct Redirect Debug Panel
      </h3>
      
      <div className="flex gap-3 mb-4">
        <Button
          onClick={testDirectRedirect}
          disabled={isLoading}
          size="sm"
          variant="primary"
        >
          {isLoading ? 'Creating...' : 'Create Direct Redirect Test'}
        </Button>
        
        <Button
          onClick={testExistingDirectLinks}
          disabled={isLoading}
          size="sm"
          variant="outline"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Existing Direct Links'}
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