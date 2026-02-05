# HTTP 405 Error Debugging Plan

## Current Issue
- GET requests work fine (200 status)
- PUT and DELETE requests return 405 Method Not Allowed
- This suggests Cloudflare Pages deployment issue or caching

## Debugging Steps

### 1. Test Simple HTTP Methods Endpoint
**URL**: `https://drozhealthfacts.com/api/test-methods`

Test all methods:
```bash
# GET (should work)
curl -X GET "https://drozhealthfacts.com/api/test-methods"

# PUT (currently failing)
curl -X PUT "https://drozhealthfacts.com/api/test-methods" -H "Content-Type: application/json"

# DELETE (currently failing)  
curl -X DELETE "https://drozhealthfacts.com/api/test-methods" -H "Content-Type: application/json"
```

### 2. Check Function Logs
Look for these log messages in Cloudflare Functions:
- `Function Version: 2026-02-05-v2 - PUT/DELETE FIXED`
- `✅ Routing to PUT handler - SHOULD WORK NOW`
- `✅ Routing to DELETE handler - SHOULD WORK NOW`

### 3. Verify Deployment Status
- Check if latest commit `23008ee` is deployed
- Verify function version in logs matches latest

### 4. Test Main API After Deployment
Once test endpoint works, test main API:
```bash
# Test DELETE with auth
curl -X DELETE "https://drozhealthfacts.com/api/affiliate-links/test-id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer droz-health-facts-api-key-2026" \
  -H "X-Project-ID: droz-health-facts"
```

## Possible Causes

### 1. Cloudflare Pages Caching
- Old function version still cached
- Need to wait for deployment to complete
- May need to clear cache

### 2. Routing Configuration
- `functions/_routes.json` might need adjustment
- CORS preflight not handled correctly

### 3. Function Export Issue
- `onRequest` export might not be recognized properly
- TypeScript compilation issue

## Solutions Tried

### ✅ Fixed Authentication
- Added OPTIONS method to auth skip
- Enhanced CORS headers

### ✅ Added Debugging
- Version logging to verify deployment
- Enhanced method routing logs

### ✅ Created Test Endpoint
- Simple function to test HTTP methods
- Isolates issue from main function complexity

## Next Steps

1. **Wait for Deployment** (2-3 minutes)
2. **Test Simple Endpoint** - Verify PUT/DELETE work
3. **Check Function Logs** - Confirm latest version deployed
4. **Test Main API** - Verify affiliate operations work
5. **Clear Browser Cache** - Force fresh requests

## Expected Timeline
- **Deployment**: 2-3 minutes after push
- **Cache Clear**: May take 5-10 minutes
- **Full Resolution**: Should work within 10 minutes

## Fallback Plan
If HTTP methods still don't work:
1. Check Cloudflare Pages settings
2. Verify wrangler.toml configuration
3. Consider using different function structure
4. Contact Cloudflare support if needed

---

**Status**: 🔄 Waiting for deployment to complete
**Latest Commit**: `23008ee` - HTTP methods test endpoint added
**Expected Fix Time**: 5-10 minutes