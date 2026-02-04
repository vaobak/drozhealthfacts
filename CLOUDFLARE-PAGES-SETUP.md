# 🚀 Cloudflare Pages Setup Guide

## 📋 Overview

This guide provides the correct configuration for deploying the Dr. Oz Health Facts affiliate system to Cloudflare Pages.

## 🔧 Configuration Files

### 1. wrangler.toml (Simplified for Pages)
```toml
# Cloudflare Pages Configuration
name = "drozhealthfacts"
compatibility_date = "2024-01-01"

# D1 Database binding
[[d1_databases]]
binding = "DB"
database_name = "droz-affiliate-db"
database_id = "1c2a47cf-1aa5-4f96-b6eb-a93c907678ad"
```

### 2. functions/_routes.json (API Routing)
```json
{
  "version": 1,
  "include": [
    "/api/*"
  ],
  "exclude": [
    "/assets/*",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml"
  ]
}
```

### 3. public/_redirects (SPA Routing)
```
# Cloudflare Pages Redirects
# API routes should be handled by Functions
/api/*  /api/:splat  200

# Affiliate routes should serve the SPA
/affiliate/*  /index.html  200

# All other routes serve the SPA
/*  /index.html  200
```

## 🔧 Cloudflare Pages Dashboard Setup

### 1. Environment Variables
Go to: **Pages Dashboard → Your Project → Settings → Environment Variables**

Add these variables for **both Production and Preview**:
```
REACT_APP_API_ENDPOINT = https://drozhealthfacts.com/api
REACT_APP_API_KEY = droz-health-facts-api-key-2026
REACT_APP_PROJECT_ID = droz-health-facts
REACT_APP_ENABLE_CLOUD_SYNC = true
REACT_APP_FALLBACK_TO_LOCAL = false
REACT_APP_DB_PROVIDER = d1
```

### 2. Build Settings
Go to: **Pages Dashboard → Your Project → Settings → Builds & deployments**

**Build Configuration:**
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/` (leave empty)
- Node.js version: `20` (or latest)

### 3. Functions Settings
Go to: **Pages Dashboard → Your Project → Settings → Functions**

**D1 Database Binding:**
- Variable name: `DB`
- D1 database: `droz-affiliate-db`

### 4. Custom Domain (Optional)
Go to: **Pages Dashboard → Your Project → Custom domains**

Add: `drozhealthfacts.com`

## 🚨 Common Issues & Solutions

### Issue: "Configuration file for Pages projects does not support 'build'"
**Solution**: Remove `[build]` section from wrangler.toml (already fixed)

### Issue: "Unexpected fields found"
**Solution**: Use simplified wrangler.toml without Pages-specific fields

### Issue: API routes not working
**Solution**: Ensure functions/_routes.json includes `/api/*`

### Issue: SPA routing not working
**Solution**: Verify _redirects file in public/ directory

### Issue: Environment variables not working
**Solution**: Set variables in Pages Dashboard, not in wrangler.toml

## 📊 Deployment Process

### Automatic Deployment (Recommended)
1. Push code to GitHub
2. Cloudflare Pages automatically builds and deploys
3. Check deployment status in Pages Dashboard

### Manual Deployment (Alternative)
```bash
# Build locally
npm run build

# Deploy using Wrangler CLI
wrangler pages deploy dist
```

## ✅ Verification Steps

After deployment:

### 1. Basic Functionality
- [ ] Main site loads: `https://drozhealthfacts.com`
- [ ] Health tools work: `https://drozhealthfacts.com/health-tools`
- [ ] Articles load: `https://drozhealthfacts.com/10-sleep-hygiene-tips-better-rest-recovery`

### 2. API Endpoints
- [ ] Health check: `https://drozhealthfacts.com/api/health`
- [ ] Affiliate links: `https://drozhealthfacts.com/api/affiliate-links`

### 3. Affiliate System
- [ ] Dashboard loads: `https://drozhealthfacts.com/affiliate`
- [ ] Login works with password: `@DRsuperZ6`
- [ ] Debug panels show "Connected" status
- [ ] Can create and test affiliate links

### 4. Cross-Device Testing
- [ ] Links work on different devices
- [ ] Redirect functionality works
- [ ] No "Product Not Found" errors

## 🔍 Troubleshooting

### Check Deployment Logs
Go to: **Pages Dashboard → Your Project → Deployments → View details**

Look for:
- Build success/failure
- Function deployment status
- Error messages

### Check Function Logs
Go to: **Pages Dashboard → Your Project → Functions → View logs**

Look for:
- API request logs
- Database connection status
- Authentication errors

### Test API Directly
```bash
# Test health endpoint
curl https://drozhealthfacts.com/api/health

# Test affiliate links (should return JSON)
curl https://drozhealthfacts.com/api/affiliate-links
```

## 📞 Support

If deployment still fails:
1. Check Cloudflare status: https://www.cloudflarestatus.com/
2. Review deployment logs in Pages Dashboard
3. Verify all configuration files are correct
4. Ensure D1 database exists and is bound correctly

## 🎉 Success Indicators

Deployment is successful when:
- ✅ Build completes without errors
- ✅ Functions deploy successfully
- ✅ Main site loads correctly
- ✅ API endpoints respond
- ✅ Affiliate dashboard works
- ✅ Debug tools show "Connected" status

This configuration should resolve all Cloudflare Pages deployment issues! 🚀