# 📊 Debug Tools Monitoring & Maintenance Guide

## 📋 Overview

This guide provides comprehensive monitoring and maintenance procedures for the debug tools system. It includes health checks, performance monitoring, and preventive maintenance tasks.

---

## 🔍 Daily Health Checks

### 1. **System Status Dashboard**

**URL**: `https://drozhealthfacts.com/affiliate`  
**Password**: `@DRsuperZ6`

#### Quick Health Check (2 minutes):
```
✅ Login successful
✅ All debug panels load without errors
✅ Cloud Database Debug Panel shows "Connected"
✅ No JavaScript errors in browser console
✅ Response times < 500ms
```

#### Health Check Script:
```javascript
// Run in browser console for automated health check
const healthCheck = async () => {
  console.log('🔍 Starting health check...');
  
  // Check if debug panels are loaded
  const panels = [
    'Cloud Database Debug Panel',
    'Field Mapping Debug Panel', 
    'Redirect Test Panel',
    'Manual Form Test Guide',
    'Affiliate Form Test Panel'
  ];
  
  panels.forEach(panel => {
    const element = document.querySelector(`[data-testid="${panel}"]`);
    console.log(`${panel}: ${element ? '✅ Loaded' : '❌ Missing'}`);
  });
  
  console.log('🎉 Health check complete');
};

healthCheck();
```

### 2. **Performance Metrics**

#### Response Time Benchmarks:
- **Database Connection**: < 500ms (Good), < 1000ms (Acceptable), > 1000ms (Investigate)
- **API Calls**: < 300ms (Good), < 800ms (Acceptable), > 800ms (Investigate)
- **Form Submission**: < 2s (Good), < 5s (Acceptable), > 5s (Investigate)
- **Page Load**: < 3s (Good), < 7s (Acceptable), > 7s (Investigate)

#### Performance Monitoring:
```bash
# Check Cloudflare Analytics
# Go to: Cloudflare Dashboard → Analytics & Logs → Web Analytics

# Monitor key metrics:
- Page views
- Unique visitors
- Response time
- Error rate
- Geographic distribution
```

---

## 📈 Weekly Monitoring Tasks

### 1. **Database Health Check**

#### Database Size Monitoring:
```bash
# Check database size and record count
wrangler d1 execute droz-affiliate-db --command "
SELECT 
  COUNT(*) as total_links,
  COUNT(CASE WHEN is_active = 1 THEN 1 END) as active_links,
  COUNT(CASE WHEN created_at > datetime('now', '-7 days') THEN 1 END) as new_this_week
FROM affiliate_links"

# Check click analytics growth
wrangler d1 execute droz-affiliate-db --command "
SELECT 
  COUNT(*) as total_clicks,
  COUNT(CASE WHEN timestamp > datetime('now', '-7 days') THEN 1 END) as clicks_this_week
FROM click_analytics"
```

#### Database Performance:
```bash
# Check for slow queries (if any custom indexes needed)
wrangler d1 execute droz-affiliate-db --command "
SELECT sql FROM sqlite_master WHERE type='index' AND tbl_name='affiliate_links'"

# Verify data integrity
wrangler d1 execute droz-affiliate-db --command "
SELECT 
  COUNT(*) as total,
  COUNT(destination_url) as has_destination,
  COUNT(redirect_type) as has_redirect_type
FROM affiliate_links"
```

### 2. **API Endpoint Health**

#### Endpoint Testing:
```bash
# Test all main endpoints
curl -s -o /dev/null -w "%{http_code}" https://drozhealthfacts.com/api/health
curl -s -o /dev/null -w "%{http_code}" https://drozhealthfacts.com/api/affiliate-links
curl -s -o /dev/null -w "%{http_code}" https://drozhealthfacts.com/api/affiliate-stats
curl -s -o /dev/null -w "%{http_code}" https://drozhealthfacts.com/api/click-analytics

# Expected: All return 200
```

#### Response Time Testing:
```bash
# Test response times
curl -w "@curl-format.txt" -o /dev/null -s https://drozhealthfacts.com/api/affiliate-links

# curl-format.txt content:
#     time_namelookup:  %{time_namelookup}\n
#        time_connect:  %{time_connect}\n
#     time_appconnect:  %{time_appconnect}\n
#    time_pretransfer:  %{time_pretransfer}\n
#       time_redirect:  %{time_redirect}\n
#  time_starttransfer:  %{time_starttransfer}\n
#                     ----------\n
#          time_total:  %{time_total}\n
```

### 3. **Error Rate Monitoring**

#### Cloudflare Functions Logs:
```
1. Go to Cloudflare Dashboard
2. Select Pages project
3. Go to Functions → Logs
4. Check for error patterns:
   - Authentication failures
   - Database connection errors
   - 500 internal server errors
   - Timeout errors
```

#### Browser Error Monitoring:
```javascript
// Add to monitoring script
window.addEventListener('error', (event) => {
  console.error('JavaScript Error:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    timestamp: new Date().toISOString()
  });
});

// Monitor unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', {
    reason: event.reason,
    timestamp: new Date().toISOString()
  });
});
```

---

## 🔧 Monthly Maintenance Tasks

### 1. **Database Cleanup**

#### Remove Old Test Data:
```bash
# Remove test links older than 30 days
wrangler d1 execute droz-affiliate-db --command "
DELETE FROM affiliate_links 
WHERE title LIKE '%Test%' 
AND created_at < datetime('now', '-30 days')"

# Remove old click analytics (keep last 90 days)
wrangler d1 execute droz-affiliate-db --command "
DELETE FROM click_analytics 
WHERE timestamp < datetime('now', '-90 days')"

# Vacuum database to reclaim space
wrangler d1 execute droz-affiliate-db --command "VACUUM"
```

#### Data Integrity Check:
```bash
# Check for orphaned records
wrangler d1 execute droz-affiliate-db --command "
SELECT COUNT(*) as orphaned_clicks
FROM click_analytics ca
LEFT JOIN affiliate_links al ON ca.link_id = al.id
WHERE al.id IS NULL"

# Check for duplicate slugs
wrangler d1 execute droz-affiliate-db --command "
SELECT slug, COUNT(*) as count
FROM affiliate_links
GROUP BY slug
HAVING COUNT(*) > 1"
```

### 2. **Performance Optimization**

#### Index Analysis:
```bash
# Check index usage
wrangler d1 execute droz-affiliate-db --command "
EXPLAIN QUERY PLAN SELECT * FROM affiliate_links WHERE slug = 'test'"

# Check if additional indexes needed
wrangler d1 execute droz-affiliate-db --command "
SELECT 
  COUNT(*) as total_queries,
  AVG(LENGTH(slug)) as avg_slug_length
FROM affiliate_links"
```

#### Cache Analysis:
```javascript
// Check browser cache effectiveness
const cacheAnalysis = () => {
  const performance = window.performance;
  const entries = performance.getEntriesByType('navigation');
  
  entries.forEach(entry => {
    console.log('Cache Analysis:', {
      url: entry.name,
      transferSize: entry.transferSize,
      encodedBodySize: entry.encodedBodySize,
      decodedBodySize: entry.decodedBodySize,
      cacheHit: entry.transferSize === 0
    });
  });
};
```

### 3. **Security Audit**

#### API Key Rotation Check:
```bash
# Verify API key is not exposed in logs
grep -r "droz-health-facts-api-key" /var/log/ 2>/dev/null || echo "No API key found in logs"

# Check for hardcoded credentials in code
grep -r "droz-health-facts-api-key" . --exclude-dir=node_modules --exclude-dir=.git
```

#### Authentication Monitoring:
```bash
# Check for failed authentication attempts in Cloudflare logs
# Look for patterns of:
# - Multiple 401 responses
# - Invalid API keys
# - Suspicious request patterns
```

---

## 🚨 Alert Thresholds

### 1. **Critical Alerts** (Immediate Action Required)

#### System Down:
- Main website returns 5xx errors
- Database connection fails for > 5 minutes
- All API endpoints return errors

#### Data Loss:
- Affiliate links count drops by > 50%
- Database becomes inaccessible
- Critical data corruption detected

### 2. **Warning Alerts** (Action Required Within 24 Hours)

#### Performance Degradation:
- Response times > 2x normal baseline
- Error rate > 5% for 1 hour
- Database queries timing out

#### Capacity Issues:
- Database size approaching limits
- API rate limits being hit
- Memory usage consistently high

### 3. **Info Alerts** (Monitor and Plan)

#### Growth Trends:
- Link creation rate increasing
- Click volume growing
- New device types accessing system

#### Usage Patterns:
- Peak usage times
- Geographic distribution changes
- Feature usage statistics

---

## 📊 Monitoring Dashboard Setup

### 1. **Cloudflare Analytics**

#### Key Metrics to Track:
```
- Total Requests
- Unique Visitors  
- Response Time (95th percentile)
- Error Rate (4xx, 5xx)
- Geographic Distribution
- Device Types
- Bandwidth Usage
```

#### Custom Events:
```javascript
// Track debug tool usage
const trackDebugToolUsage = (toolName, action) => {
  // Send to analytics
  gtag('event', 'debug_tool_usage', {
    tool_name: toolName,
    action: action,
    timestamp: new Date().toISOString()
  });
};
```

### 2. **Database Monitoring**

#### D1 Metrics:
```bash
# Create monitoring script
#!/bin/bash
# monitor-d1.sh

echo "=== D1 Database Monitoring ==="
echo "Date: $(date)"

# Connection test
echo "Testing connection..."
wrangler d1 execute droz-affiliate-db --command "SELECT 1" > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "✅ Database connection: OK"
else
  echo "❌ Database connection: FAILED"
fi

# Record counts
echo "Record counts:"
wrangler d1 execute droz-affiliate-db --command "
SELECT 
  'affiliate_links' as table_name, COUNT(*) as count 
FROM affiliate_links
UNION ALL
SELECT 
  'click_analytics' as table_name, COUNT(*) as count 
FROM click_analytics"

# Recent activity
echo "Recent activity (last 24h):"
wrangler d1 execute droz-affiliate-db --command "
SELECT COUNT(*) as new_links
FROM affiliate_links 
WHERE created_at > datetime('now', '-1 day')"

echo "=== End Monitoring ==="
```

### 3. **Application Health**

#### Health Check Endpoint:
```typescript
// functions/api/health.ts
export async function onRequest(context: any): Promise<Response> {
  const { env } = context;
  const { DB } = env;
  
  try {
    // Test database connection
    const dbTest = await DB.prepare('SELECT 1').first();
    
    // Test basic functionality
    const linkCount = await DB.prepare('SELECT COUNT(*) as count FROM affiliate_links').first();
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      totalLinks: linkCount.count,
      version: '1.0.0'
    };
    
    return new Response(JSON.stringify(health), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

---

## 🔄 Backup and Recovery

### 1. **Database Backup**

#### Daily Backup:
```bash
# Export database
wrangler d1 export droz-affiliate-db --output backup-$(date +%Y%m%d).sql

# Compress backup
gzip backup-$(date +%Y%m%d).sql

# Store in secure location
# (Configure based on your backup storage solution)
```

#### Backup Verification:
```bash
# Test backup integrity
gunzip -t backup-$(date +%Y%m%d).sql.gz
echo "Backup integrity: $?"

# Test restore process (on test database)
wrangler d1 create test-restore-db
wrangler d1 execute test-restore-db --file backup-$(date +%Y%m%d).sql
wrangler d1 execute test-restore-db --command "SELECT COUNT(*) FROM affiliate_links"
```

### 2. **Configuration Backup**

#### Environment Variables:
```bash
# Document current environment variables
echo "=== Environment Variables Backup ===" > env-backup-$(date +%Y%m%d).txt
echo "REACT_APP_API_ENDPOINT=$REACT_APP_API_ENDPOINT" >> env-backup-$(date +%Y%m%d).txt
echo "REACT_APP_API_KEY=***REDACTED***" >> env-backup-$(date +%Y%m%d).txt
echo "REACT_APP_PROJECT_ID=$REACT_APP_PROJECT_ID" >> env-backup-$(date +%Y%m%d).txt
# ... other variables
```

#### Code Backup:
```bash
# Git repository is primary backup
git tag -a "backup-$(date +%Y%m%d)" -m "Daily backup tag"
git push origin --tags

# Additional backup to external location if needed
```

---

## 📈 Performance Baselines

### 1. **Response Time Baselines**

#### Established Benchmarks:
```
Database Connection: 200-400ms (normal), 400-800ms (acceptable)
API Calls: 100-300ms (normal), 300-600ms (acceptable)
Form Submission: 500ms-1.5s (normal), 1.5s-3s (acceptable)
Page Load: 1-2s (normal), 2-4s (acceptable)
```

#### Trend Analysis:
```javascript
// Track performance trends
const performanceTracker = {
  measurements: [],
  
  record(metric, value) {
    this.measurements.push({
      metric,
      value,
      timestamp: Date.now()
    });
  },
  
  getAverage(metric, timeframe = 24 * 60 * 60 * 1000) {
    const cutoff = Date.now() - timeframe;
    const recent = this.measurements.filter(m => 
      m.metric === metric && m.timestamp > cutoff
    );
    
    return recent.reduce((sum, m) => sum + m.value, 0) / recent.length;
  }
};
```

### 2. **Usage Baselines**

#### Traffic Patterns:
```
Peak Hours: 9-11 AM, 2-4 PM, 7-9 PM (local time)
Peak Days: Tuesday-Thursday
Seasonal: Higher during health awareness months
Geographic: Primary US, secondary international
```

#### Feature Usage:
```
Most Used Debug Tools:
1. Cloud Database Debug Panel (daily)
2. Field Mapping Debug Panel (weekly)
3. Redirect Test Panel (weekly)
4. Manual Form Test Guide (monthly)
5. Affiliate Form Test Panel (monthly)
```

This comprehensive monitoring guide ensures the debug tools system remains healthy and performant! 🎉