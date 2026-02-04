# ⚡ Debug Tools Quick Reference - Dr. Oz Health Facts

## 🚀 Quick Access

**URL**: `https://drozhealthfacts.com/affiliate`  
**Password**: `@DRsuperZ6`

---

## 🛠️ Debug Tools Overview

| Tool | Color | Purpose | When to Use |
|------|-------|---------|-------------|
| **Cloud Database Debug Panel** | Blue | Test database connection | Connection issues, data not loading |
| **Field Mapping Debug Panel** | Red | Verify field mapping | Fields not saving, data corruption |
| **Redirect Test Panel** | Purple | Test redirect functionality | Links not redirecting, cross-device issues |
| **Manual Form Test Guide** | Blue | Manual testing instructions | Step-by-step form testing |
| **Affiliate Form Test Panel** | Yellow | Automated form testing | Quick automated verification |

---

## 🔥 Emergency Quick Fixes

### 🚨 Links Don't Work on Other Devices
```
1. Cloud Database Debug Panel → Test Connection
2. If disconnected: Check environment variables
3. If connected: Field Mapping Debug Panel → Test Direct API
4. If no data: Run database migration
```

### 🚨 HTTP 405 Error (Can't Edit Links)
```
1. Check browser console for authentication logs
2. Verify environment variables:
   - REACT_APP_API_KEY = droz-health-facts-api-key-2026
   - REACT_APP_PROJECT_ID = droz-health-facts
3. Redeploy if variables changed
```

### 🚨 Form Fields Not Saving
```
1. Field Mapping Debug Panel → Test Field Mapping
2. Should show "ALL FIELDS SAVED CORRECTLY!"
3. If not: Check database schema and API mapping
```

### 🚨 Dashboard Shows 0 Links
```
1. Field Mapping Debug Panel → Test Direct API
2. Check if API returns data
3. If empty: Check database directly
4. If has data: Check authentication
```

---

## 🧪 Testing Workflow

### New Issue Diagnosis:
```
1. Cloud Database Debug Panel (connection)
   ↓
2. Field Mapping Debug Panel (data integrity)
   ↓
3. Redirect Test Panel (functionality)
   ↓
4. Manual Form Test (user experience)
   ↓
5. Check logs and resolve
```

### Before Deployment:
```
1. All debug panels show green/success status
2. Manual form test passes
3. Cross-device redirect test passes
4. No errors in browser console
```

---

## 📊 Health Check Commands

### Database Health:
```bash
# Quick connection test
wrangler d1 execute droz-affiliate-db --command "SELECT COUNT(*) FROM affiliate_links"

# Data integrity check
wrangler d1 execute droz-affiliate-db --command "SELECT COUNT(destination_url), COUNT(redirect_type) FROM affiliate_links"
```

### API Health:
```bash
# Test endpoints
curl https://drozhealthfacts.com/api/health
curl https://drozhealthfacts.com/api/affiliate-links
```

### Environment Variables:
```
Required in Cloudflare Pages:
- REACT_APP_API_ENDPOINT = https://drozhealthfacts.com/api
- REACT_APP_API_KEY = droz-health-facts-api-key-2026
- REACT_APP_PROJECT_ID = droz-health-facts
- REACT_APP_ENABLE_CLOUD_SYNC = true
- REACT_APP_FALLBACK_TO_LOCAL = false
- REACT_APP_DB_PROVIDER = d1
```

---

## 🔍 Console Log Patterns

### ✅ Success Patterns:
```javascript
"Cloud affiliate links loaded: X links"
"Successfully added affiliate link: [id]"
"Authentication result: true"
"ALL FIELDS SAVED CORRECTLY!"
"Connected" (with latency < 500ms)
```

### ❌ Error Patterns:
```javascript
"HTTP 405: Method not allowed"
"Cloud database error:"
"Authentication result: false"
"Product Not Found"
"Failed to load resource"
```

---

## 🎯 Success Indicators

### System Healthy:
- ✅ Cloud Database Debug Panel: "Connected"
- ✅ Field Mapping Debug Panel: All field matches ✅
- ✅ Redirect Test Panel: Links work cross-device
- ✅ Manual Form Test: Success alerts
- ✅ Console: No errors, successful operations

### Performance Good:
- ✅ Database latency < 500ms
- ✅ API responses < 300ms
- ✅ Form submission < 2s
- ✅ Page load < 3s

---

## 🚨 Escalation Triggers

### Immediate Action Required:
- Database connection fails for > 5 minutes
- All API endpoints return 5xx errors
- Main website inaccessible
- Data loss detected

### Action Within 24 Hours:
- Response times > 2x baseline
- Error rate > 5% for 1 hour
- Debug tools show consistent failures

---

## 📱 Mobile Testing

### Cross-Device Test URLs:
```
1. Use Redirect Test Panel → Create Test Redirect Links
2. Copy generated URLs
3. Test on:
   - Different browsers (Chrome, Safari, Firefox)
   - Different devices (phone, tablet, desktop)
   - Different networks (WiFi, mobile data)
```

### Expected Behavior:
- **Direct Redirect**: Immediate redirect to destination
- **Landing Page**: Product page first, then redirect
- **No Errors**: No "Product Not Found" messages

---

## 🔧 Common Fixes

### Redeploy Trigger:
```bash
git add .
git commit -m "Trigger redeploy"
git push origin main
```

### Database Migration:
```bash
wrangler d1 migrations apply droz-affiliate-db --remote
```

### Clear Cache:
```javascript
// In browser console
localStorage.clear();
sessionStorage.clear();
location.reload(true);
```

### Reset Test Data:
```bash
# Remove test links
wrangler d1 execute droz-affiliate-db --command "DELETE FROM affiliate_links WHERE title LIKE '%Test%'"
```

---

## 📞 Support Checklist

### Before Reporting Issues:
- [ ] Tried all relevant debug tools
- [ ] Checked browser console for errors
- [ ] Verified environment variables
- [ ] Tested on multiple devices/browsers
- [ ] Checked Cloudflare status page
- [ ] Reviewed recent deployments

### Information to Provide:
- Specific error messages from console
- Debug tool results (screenshots)
- Steps to reproduce
- Browser/device information
- Timestamp of issue occurrence

---

## 🎉 Quick Win Tests

### 30-Second Health Check:
```
1. Login to affiliate dashboard ✅
2. Cloud Database Debug Panel shows "Connected" ✅
3. No JavaScript errors in console ✅
4. Can create new affiliate link ✅
```

### 2-Minute Full Test:
```
1. All debug panels load without errors ✅
2. Field Mapping Debug Panel: "ALL FIELDS SAVED CORRECTLY!" ✅
3. Create test redirect link and verify it works ✅
4. Edit existing link successfully ✅
5. Cross-device test passes ✅
```

This quick reference covers 90% of common debug scenarios! 🚀