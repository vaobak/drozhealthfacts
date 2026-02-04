# 🛠️ Debug Tools Complete Guide - Dr. Oz Health Facts Affiliate System

## 📋 Overview

This comprehensive guide covers all debug tools available in the Dr. Oz Health Facts affiliate system. These tools help diagnose, test, and troubleshoot various aspects of the system.

## 🎯 Quick Access

**Dashboard URL**: `https://drozhealthfacts.com/affiliate`  
**Password**: `@DRsuperZ6`

All debug tools are located at the top of the affiliate dashboard after login.

---

## 🔧 Debug Tools Reference

### 1. 🔗 **Redirect Test Panel** (Purple Panel)

**Purpose**: Test affiliate link redirect functionality across devices

#### Features:
- **Create Test Redirect Links**: Generates test links for both direct and landing page redirects
- **Test Existing Links**: Analyzes existing links and provides testing instructions

#### Usage:
```
1. Click "Create Test Redirect Links"
2. Copy generated URLs
3. Test on different devices/browsers
4. Verify redirect behavior matches type
```

#### Expected Results:
- **Direct Redirect**: Immediate redirect to destination URL (same tab)
- **Landing Page**: Shows product page first, then redirects (new tab or manual)

#### Troubleshooting:
- If links don't work: Check cloud database connection
- If redirect fails: Check browser console for errors
- If "Product Not Found": Verify environment variables

---

### 2. 📝 **Manual Form Test Guide** (Blue Panel)

**Purpose**: Provides step-by-step instructions for testing manual form submission

#### Features:
- **Show Manual Test Instructions**: Displays detailed testing procedure
- **Field Validation Guide**: Lists required fields and expected behavior

#### Usage:
```
1. Click "Show Manual Test Instructions"
2. Follow the step-by-step guide
3. Fill form with provided test values
4. Verify success alerts and data display
```

#### Test Values:
- **Slug**: `manual-test-[timestamp]`
- **Destination URL**: `https://manual-test-destination.com/path`
- **Redirect Type**: Direct Redirect
- **Auto Redirect**: OFF

#### Success Indicators:
- ✅ Success alert after save
- ✅ New link appears in dashboard
- ✅ Correct field values displayed

---

### 3. 🔍 **Field Mapping Debug Panel** (Red Panel)

**Purpose**: Test field mapping between frontend and database

#### Features:
- **Test Field Mapping**: Creates test link and verifies all fields are saved correctly
- **Test Direct API**: Calls API directly to inspect raw response data

#### Usage:
```
1. Click "Test Field Mapping" - Tests complete field mapping
2. Click "Test Direct API" - Shows raw API response
3. Review field comparison results
4. Check for mapping issues
```

#### Field Mapping Verification:
- `destinationUrl` ↔ `destination_url`
- `redirectType` ↔ `redirect_type`
- `autoRedirect` ↔ `auto_redirect`
- `productImage` ↔ `product_image`

#### Success Indicators:
- ✅ "ALL FIELDS SAVED CORRECTLY!"
- ✅ Field comparison shows all matches
- ✅ Raw data shows both formats

---

### 4. 🗄️ **Cloud Database Debug Panel** (Blue Panel)

**Purpose**: Test cloud database connection and operations

#### Features:
- **Test Connection**: Verifies cloud database connectivity
- **Add Test Link**: Creates test link to verify database operations
- **Environment Variables Display**: Shows current configuration

#### Usage:
```
1. Click "Test Connection" - Checks database connectivity
2. Click "Add Test Link" - Tests database write operations
3. Review connection status and latency
4. Check environment variables
```

#### Connection Status:
- ✅ **Connected**: Database accessible, shows latency
- ❌ **Disconnected**: Database unavailable, shows error

#### Environment Variables Checked:
- `REACT_APP_API_ENDPOINT`
- `REACT_APP_ENABLE_CLOUD_SYNC`
- `REACT_APP_DB_PROVIDER`
- `REACT_APP_FALLBACK_TO_LOCAL`

---

### 5. 🧪 **Affiliate Form Test Panel** (Yellow Panel)

**Purpose**: Automated testing of form submission and data retrieval

#### Features:
- **Test Form Submission**: Automated form submission with sample data
- **Test Data Retrieval**: Verifies data can be retrieved from database

#### Usage:
```
1. Click "Test Form Submission" - Automated form test
2. Click "Test Data Retrieval" - Automated retrieval test
3. Review success/failure results
4. Check detailed data output
```

#### Test Data Used:
- **Title**: "Ultimate Weight Loss Supplement"
- **Destination URL**: Test affiliate URL
- **Redirect Type**: Landing page
- **Auto Redirect**: Disabled

#### Success Indicators:
- ✅ "SUCCESS" message with link ID
- ✅ All field data displayed correctly
- ✅ Test URL provided for verification

---

## 🔍 Console Logging Guide

### Browser Console Logs

#### Authentication Logs:
```javascript
// CloudAffiliateManager
"Making PUT request to: https://drozhealthfacts.com/api/affiliate-links/[id]"
"Request headers: {Authorization: 'Bearer ...', ...}"
"API Response data: {...}"

// API Authentication
"Authentication check:"
"- Received API Key: droz-health-facts-api-key-2026"
"- Authentication result: true"
```

#### Database Operation Logs:
```javascript
// Data Loading
"Loading data from cloud database..."
"Cloud affiliate links loaded: 11 links"

// Form Submission
"Submitting form data: {slug: '...', title: '...', ...}"
"Successfully added affiliate link: [id]"

// Field Mapping
"Cloud affiliate link loaded: {destinationUrl: '...', redirectType: '...'}"
```

#### Redirect Logs:
```javascript
// Redirect Operations
"Looking for affiliate link by slug: test-123"
"Redirecting to: https://example.com Direct: true"
"Cloud affiliate link loaded: {...}"
```

### Cloudflare Functions Logs

Access via: **Cloudflare Dashboard → Pages → Functions → Logs**

#### API Request Logs:
```javascript
// Incoming Requests
"Received affiliate link data: {slug: '...', destinationUrl: '...'}"
"Inserting affiliate link with data: {...}"
"Database insert result: {success: true, meta: {...}}"

// Authentication
"Authentication check: true"
"Update query fields: ['title = ?', 'destination_url = ?', ...]"
"Update result: {changes: 1}"
```

---

## 🚨 Troubleshooting Guide

### Common Issues & Solutions

#### 1. **HTTP 405 Error (Method Not Allowed)**
**Symptoms**: Edit links fail with 405 error
**Debug Steps**:
1. Check browser console for authentication logs
2. Verify API key in environment variables
3. Check Cloudflare Functions logs
4. Ensure D1 database binding is correct

**Expected Fix**: Authentication logs show successful auth

#### 2. **"Product Not Found" Errors**
**Symptoms**: Links show "Product Not Found" on other devices
**Debug Steps**:
1. Use Cloud Database Debug Panel → Test Connection
2. Check Field Mapping Debug Panel → Test Direct API
3. Verify environment variables are set
4. Check D1 database has data

**Expected Fix**: Debug panels show connected status and data

#### 3. **Form Data Not Saving**
**Symptoms**: Form submits but data missing/incorrect
**Debug Steps**:
1. Use Field Mapping Debug Panel → Test Field Mapping
2. Check browser console for form submission logs
3. Use Affiliate Form Test Panel → Test Form Submission
4. Verify API endpoint responses

**Expected Fix**: Field mapping shows all green checkmarks

#### 4. **Redirect Not Working**
**Symptoms**: Links don't redirect properly
**Debug Steps**:
1. Use Redirect Test Panel → Create Test Redirect Links
2. Check browser console for redirect logs
3. Test on multiple devices/browsers
4. Verify link data in database

**Expected Fix**: Test links work across all devices

#### 5. **Cloud Database Connection Issues**
**Symptoms**: "Disconnected" status in debug panels
**Debug Steps**:
1. Check environment variables in Cloudflare Pages
2. Verify D1 database binding in Functions
3. Check Cloudflare Pages deployment status
4. Test API endpoints directly

**Expected Fix**: Debug panel shows "Connected" with latency

---

## 📊 Debug Tools Workflow

### For New Issues:
```
1. Start with Cloud Database Debug Panel
   ↓
2. If connected, use Field Mapping Debug Panel
   ↓
3. If field mapping OK, use Redirect Test Panel
   ↓
4. If redirects OK, use Manual Form Test Guide
   ↓
5. Check browser console and Functions logs
```

### For Performance Issues:
```
1. Cloud Database Debug Panel → Check latency
   ↓
2. Affiliate Form Test Panel → Test response times
   ↓
3. Check Cloudflare Functions logs for slow queries
   ↓
4. Monitor database query performance
```

### For Cross-Device Issues:
```
1. Redirect Test Panel → Create test links
   ↓
2. Test on multiple devices
   ↓
3. Field Mapping Debug Panel → Verify data consistency
   ↓
4. Check environment variables across deployments
```

---

## 🎯 Success Metrics

### All Systems Working:
- ✅ Cloud Database Debug Panel: "Connected" status
- ✅ Field Mapping Debug Panel: "ALL FIELDS SAVED CORRECTLY!"
- ✅ Redirect Test Panel: Links work on all devices
- ✅ Manual Form Test: Success alerts and correct data display
- ✅ Affiliate Form Test Panel: Automated tests pass
- ✅ Console logs: No errors, successful operations
- ✅ Functions logs: Successful API calls and database operations

### Performance Benchmarks:
- **Database Connection**: < 500ms latency
- **Form Submission**: < 2s response time
- **Link Redirect**: < 1s load time
- **Cross-Device Access**: Consistent behavior

---

## 🔧 Advanced Debugging

### Direct Database Testing:
```bash
# Test database structure
wrangler d1 execute droz-affiliate-db --command ".schema affiliate_links"

# Check field data
wrangler d1 execute droz-affiliate-db --command "SELECT slug, destination_url, redirect_type FROM affiliate_links LIMIT 5"

# Test API endpoints
curl https://drozhealthfacts.com/api/health
curl https://drozhealthfacts.com/api/affiliate-links
```

### Environment Variable Verification:
```bash
# Check Cloudflare Pages environment variables
# Go to: Cloudflare Dashboard → Pages → Settings → Environment Variables

Required Variables:
- REACT_APP_API_ENDPOINT = https://drozhealthfacts.com/api
- REACT_APP_API_KEY = droz-health-facts-api-key-2026
- REACT_APP_PROJECT_ID = droz-health-facts
- REACT_APP_ENABLE_CLOUD_SYNC = true
- REACT_APP_FALLBACK_TO_LOCAL = false
- REACT_APP_DB_PROVIDER = d1
```

---

## 📞 Support Information

### Debug Tools Location:
**URL**: `https://drozhealthfacts.com/affiliate`  
**Password**: `@DRsuperZ6`

### Tool Order (Top to Bottom):
1. 🔧 Critical Issues Status (Orange)
2. 🔗 Redirect Test Panel (Purple)
3. 📝 Manual Form Test Guide (Blue)
4. 🔍 Field Mapping Debug Panel (Red)
5. 🗄️ Cloud Database Debug Panel (Blue)
6. 🧪 Affiliate Form Test Panel (Yellow)

### Quick Health Check:
```
1. Login to affiliate dashboard
2. All debug panels should load without errors
3. Cloud Database Debug Panel should show "Connected"
4. Field Mapping Debug Panel should show successful field mapping
5. Redirect Test Panel should create working test links
```

This comprehensive debug toolkit ensures the affiliate system can be thoroughly tested and troubleshot at every level! 🎉