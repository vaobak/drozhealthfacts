# 🎭 Debug Scenarios Playbook - Common Issues & Solutions

## 📋 Overview

This playbook provides step-by-step solutions for common issues encountered in the Dr. Oz Health Facts affiliate system. Each scenario includes symptoms, diagnosis steps, and resolution procedures.

---

## 🚨 Scenario 1: "Links Don't Work on Other Devices"

### Symptoms:
- Links work on your browser/device
- Same links show "Product Not Found" on other devices
- Cross-device testing fails

### Diagnosis Steps:

#### Step 1: Check Cloud Database Connection
```
1. Go to affiliate dashboard
2. Look at Cloud Database Debug Panel
3. Click "Test Connection"
```

**Expected Result**: "Connected" status with latency < 500ms

#### Step 2: Verify Data Storage
```
1. Use Field Mapping Debug Panel
2. Click "Test Direct API"
3. Check if links exist in response
```

**Expected Result**: API returns list of links with correct data

#### Step 3: Test Link Retrieval
```
1. Use Field Mapping Debug Panel
2. Click "Test Field Mapping"
3. Check if created link can be retrieved
```

**Expected Result**: "ALL FIELDS SAVED CORRECTLY!"

### Resolution:

#### If Database Disconnected:
```
1. Check environment variables in Cloudflare Pages:
   - REACT_APP_API_ENDPOINT = https://drozhealthfacts.com/api
   - REACT_APP_ENABLE_CLOUD_SYNC = true
   - REACT_APP_DB_PROVIDER = d1

2. Verify D1 database binding in Cloudflare Pages Functions:
   - Go to Settings → Functions
   - Add D1 binding: DB → droz-affiliate-db

3. Redeploy if needed
```

#### If Data Not Found:
```
1. Run database migration:
   wrangler d1 migrations apply droz-affiliate-db --remote

2. Check database has data:
   wrangler d1 execute droz-affiliate-db --command "SELECT COUNT(*) FROM affiliate_links"

3. If empty, recreate test links using debug panels
```

---

## 🚨 Scenario 2: "HTTP 405 Error When Editing Links"

### Symptoms:
- Can create new links successfully
- Editing existing links fails with HTTP 405 error
- Browser console shows "Method not allowed"

### Diagnosis Steps:

#### Step 1: Check Authentication
```
1. Open browser console
2. Try to edit a link
3. Look for authentication logs
```

**Expected Logs**:
```
Making PUT request to: https://drozhealthfacts.com/api/affiliate-links/[id]
Request headers: {Authorization: "Bearer droz-health-facts-api-key-2026", ...}
Authentication check: true
Response status: 200 OK
```

#### Step 2: Verify API Endpoint
```
1. Check Cloudflare Functions logs
2. Look for PUT request handling
3. Verify method routing
```

**Expected Logs**:
```
Authentication check:
- Received API Key: droz-health-facts-api-key-2026
- Authentication result: true
Update result: {changes: 1}
```

### Resolution:

#### If Authentication Fails:
```
1. Check environment variables:
   - REACT_APP_API_KEY = droz-health-facts-api-key-2026
   - REACT_APP_PROJECT_ID = droz-health-facts

2. Verify API endpoint configuration:
   - REACT_APP_API_ENDPOINT = https://drozhealthfacts.com/api

3. Redeploy Cloudflare Pages if variables changed
```

#### If Method Not Allowed:
```
1. Check API function deployment:
   - Verify functions/api/affiliate-links.ts is deployed
   - Check function routing in Cloudflare Pages

2. Test API directly:
   curl -X PUT https://drozhealthfacts.com/api/affiliate-links/test-id \
   -H "Authorization: Bearer droz-health-facts-api-key-2026" \
   -H "X-Project-ID: droz-health-facts"

3. Redeploy functions if needed
```

---

## 🚨 Scenario 3: "Form Fields Not Saving (destinationUrl, redirectType)"

### Symptoms:
- Form submits successfully
- Some fields appear empty in dashboard
- destinationUrl or redirectType missing

### Diagnosis Steps:

#### Step 1: Test Field Mapping
```
1. Use Field Mapping Debug Panel
2. Click "Test Field Mapping"
3. Check field comparison results
```

**Expected Result**: All field matches show ✅ YES

#### Step 2: Check Raw API Data
```
1. Use Field Mapping Debug Panel
2. Click "Test Direct API"
3. Look at raw data sample
```

**Expected Result**: Both camelCase and snake_case fields present

#### Step 3: Test Form Submission
```
1. Use Affiliate Form Test Panel
2. Click "Test Form Submission"
3. Check if all fields are saved
```

**Expected Result**: SUCCESS with all field data displayed

### Resolution:

#### If Field Mapping Fails:
```
1. Check database schema:
   wrangler d1 execute droz-affiliate-db --command ".schema affiliate_links"

2. Verify required columns exist:
   - destination_url
   - redirect_type
   - auto_redirect

3. Run migration if columns missing:
   wrangler d1 migrations apply droz-affiliate-db --remote
```

#### If API Mapping Issues:
```
1. Check API field mapping in functions/api/affiliate-links.ts
2. Verify GET endpoint maps database fields to frontend format
3. Redeploy functions if mapping incorrect
```

---

## 🚨 Scenario 4: "Redirect Not Working Properly"

### Symptoms:
- Links load but don't redirect
- Wrong redirect behavior (direct vs landing)
- Redirect opens wrong URL

### Diagnosis Steps:

#### Step 1: Test Redirect Types
```
1. Use Redirect Test Panel
2. Click "Create Test Redirect Links"
3. Test both direct and landing page links
```

**Expected Behavior**:
- Direct: Immediate redirect to destination (same tab)
- Landing: Product page first, then redirect (new tab/manual)

#### Step 2: Check Link Data
```
1. Use Field Mapping Debug Panel
2. Verify redirectType and destinationUrl are correct
3. Check autoRedirect setting
```

#### Step 3: Test Cross-Device
```
1. Copy test URLs from Redirect Test Panel
2. Test on different devices/browsers
3. Verify consistent behavior
```

### Resolution:

#### If Redirect Logic Wrong:
```
1. Check AffiliateRedirect component logic
2. Verify handleRedirect function uses correct method:
   - Direct: window.location.href (same tab)
   - Landing: window.open() (new tab)

3. Redeploy if logic incorrect
```

#### If Link Data Wrong:
```
1. Fix field mapping issues (see Scenario 3)
2. Update existing links with correct redirect settings
3. Test with newly created links
```

---

## 🚨 Scenario 5: "Dashboard Shows 0 Links But Database Has Data"

### Symptoms:
- Dashboard shows "0 links"
- Database contains affiliate links
- Debug panels show data exists

### Diagnosis Steps:

#### Step 1: Check Data Loading
```
1. Open browser console
2. Refresh dashboard
3. Look for loading logs
```

**Expected Logs**:
```
Loading data from cloud database...
Cloud affiliate links loaded: X links
Loaded from cloud: X links
```

#### Step 2: Test API Endpoint
```
1. Use Field Mapping Debug Panel
2. Click "Test Direct API"
3. Check if API returns data
```

**Expected Result**: API returns array of links

#### Step 3: Check Authentication
```
1. Look for authentication errors in console
2. Verify API calls are successful
3. Check response status codes
```

### Resolution:

#### If API Returns Empty:
```
1. Check database directly:
   wrangler d1 execute droz-affiliate-db --command "SELECT COUNT(*) FROM affiliate_links"

2. If database empty, recreate data using debug panels

3. If database has data but API empty, check API filtering logic
```

#### If Authentication Issues:
```
1. Follow Scenario 2 resolution steps
2. Verify environment variables
3. Check API key configuration
```

#### If Frontend Loading Issues:
```
1. Check AdminDashboard component state management
2. Verify loadData function is called correctly
3. Check for JavaScript errors preventing data display
```

---

## 🚨 Scenario 6: "Slow Performance / High Latency"

### Symptoms:
- Debug panels show high latency (> 1000ms)
- Form submissions take long time
- Dashboard loads slowly

### Diagnosis Steps:

#### Step 1: Check Connection Speed
```
1. Use Cloud Database Debug Panel
2. Click "Test Connection" multiple times
3. Note latency values
```

**Benchmark**: < 500ms is good, > 1000ms needs investigation

#### Step 2: Test API Performance
```
1. Use browser Network tab
2. Monitor API call response times
3. Check for slow endpoints
```

#### Step 3: Check Database Performance
```
1. Look at Cloudflare Functions logs
2. Check for slow database queries
3. Monitor D1 database metrics
```

### Resolution:

#### If Network Issues:
```
1. Check internet connection
2. Try from different network/location
3. Check Cloudflare status page
```

#### If Database Issues:
```
1. Check D1 database region/location
2. Optimize database queries if needed
3. Consider database indexing improvements
```

#### If API Issues:
```
1. Check Cloudflare Functions performance
2. Optimize API endpoint logic
3. Consider caching strategies
```

---

## 🚨 Scenario 7: "Environment Variables Not Working"

### Symptoms:
- Debug panels show "Not set" for environment variables
- API endpoints return wrong URLs
- Authentication fails

### Diagnosis Steps:

#### Step 1: Check Variable Display
```
1. Use Cloud Database Debug Panel
2. Look at "Environment Variables" section
3. Verify all required variables are shown
```

**Required Variables**:
- REACT_APP_API_ENDPOINT
- REACT_APP_API_KEY
- REACT_APP_PROJECT_ID
- REACT_APP_ENABLE_CLOUD_SYNC
- REACT_APP_FALLBACK_TO_LOCAL
- REACT_APP_DB_PROVIDER

#### Step 2: Check Cloudflare Pages Settings
```
1. Go to Cloudflare Pages dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Verify all variables are set for Production and Preview
```

#### Step 3: Test After Deployment
```
1. Make a small change to trigger redeploy
2. Wait for deployment to complete
3. Test debug panels again
```

### Resolution:

#### If Variables Missing:
```
1. Add missing variables in Cloudflare Pages:
   - Go to Settings → Environment Variables
   - Add each required variable
   - Set for both Production and Preview environments

2. Trigger redeploy:
   - Make small change to any file
   - Commit and push to trigger deployment

3. Wait for deployment and test
```

#### If Variables Wrong:
```
1. Update incorrect values in Cloudflare Pages
2. Common mistakes:
   - Wrong API endpoint URL
   - Incorrect API key
   - Wrong project ID
   - Boolean values as strings

3. Redeploy and test
```

---

## 🎯 Quick Diagnostic Checklist

### Before Starting Any Scenario:
- [ ] Can access affiliate dashboard with password @DRsuperZ6
- [ ] All debug panels load without JavaScript errors
- [ ] Browser console shows no critical errors
- [ ] Internet connection is stable

### For Each Issue:
- [ ] Identify symptoms clearly
- [ ] Follow diagnosis steps in order
- [ ] Check expected results at each step
- [ ] Apply appropriate resolution
- [ ] Verify fix with debug panels
- [ ] Test on multiple devices if applicable

### After Resolution:
- [ ] All debug panels show green/success status
- [ ] Manual testing works correctly
- [ ] Cross-device testing passes
- [ ] Performance is acceptable
- [ ] No errors in console logs

---

## 📞 Escalation Path

### If Debug Tools Don't Help:
1. **Check Cloudflare Status**: https://www.cloudflarestatus.com/
2. **Review Recent Changes**: Check git commits for recent modifications
3. **Database Direct Access**: Use wrangler CLI for direct database inspection
4. **API Direct Testing**: Use curl or Postman to test API endpoints
5. **Logs Review**: Check both browser console and Cloudflare Functions logs

### Critical System Failure:
1. **Immediate**: Check if main website is accessible
2. **Database**: Verify D1 database is accessible via wrangler
3. **Functions**: Check if Cloudflare Pages Functions are deployed
4. **DNS**: Verify domain resolution
5. **Rollback**: Consider reverting to last known good deployment

This playbook covers 95% of common issues encountered in the affiliate system! 🎉