import React, { useState } from 'react';
import { Button } from './Button';

export const ManualFormTest: React.FC = () => {
  const [testResult, setTestResult] = useState<string | null>(null);

  const runManualFormTest = () => {
    setTestResult(`✅ MANUAL FORM TEST INSTRUCTIONS:

🎯 **Test Steps:**
1. Click "Add New Affiliate Link" button below
2. Fill in the form with these EXACT values:
   
   📝 **Required Fields:**
   - Slug: manual-test-${Date.now()}
   - Title: Manual Form Test
   - Description: Testing manual form submission
   - Destination URL: https://manual-test-destination.com/path
   - Category: Manual Test
   
   🔧 **Important Settings:**
   - Redirect Type: Select "Direct Redirect"
   - Auto Redirect: Toggle OFF (should be unchecked)
   
3. Click "Save Affiliate Link"
4. Look for SUCCESS alert message
5. Check if the new link appears in the list below
6. Verify the link shows:
   - ✅ Destination URL: https://manual-test-destination.com/path
   - ✅ Redirect Type: Direct
   - ✅ Auto Redirect: Manual (not Auto 5s)

🔍 **What to Look For:**
- SUCCESS alert after clicking Save
- New link appears in dashboard list immediately
- Destination URL is displayed correctly in the list
- Redirect Type shows "Direct" (purple badge)
- Auto Redirect shows "Manual" (not "Auto 5s")

❌ **If It Fails:**
- Check browser console for errors
- Look for detailed error messages
- Try the Field Mapping Debug Panel above

🎉 **If It Works:**
Your form is now saving ALL fields correctly!`);
  };

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
        📝 Manual Form Test Guide
      </h3>
      
      <Button
        onClick={runManualFormTest}
        size="sm"
        variant="primary"
      >
        Show Manual Test Instructions
      </Button>

      {testResult && (
        <div className="mt-4 bg-white dark:bg-gray-800 border rounded p-4">
          <pre className="text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200">
            {testResult}
          </pre>
        </div>
      )}
    </div>
  );
};