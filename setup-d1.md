# 🚀 Setup Cloudflare D1 Database

## 1. Install Wrangler CLI
```bash
npm install -g wrangler
```

## 2. Login to Cloudflare
```bash
wrangler login
```

## 3. Create D1 Database
```bash
wrangler d1 create droz-affiliate-db
```

**Copy the database ID from output and update `wrangler.toml`**

## 4. Run Migration
```bash
wrangler d1 migrations apply droz-affiliate-db --local
wrangler d1 migrations apply droz-affiliate-db --remote
```

## 5. Test Database
```bash
# Local testing
wrangler d1 execute droz-affiliate-db --local --command "SELECT * FROM affiliate_links"

# Remote testing  
wrangler d1 execute droz-affiliate-db --command "SELECT * FROM affiliate_links"
```

## 6. Deploy to Cloudflare Pages
```bash
# Connect your GitHub repo to Cloudflare Pages
# Set environment variables in Cloudflare Pages dashboard:

REACT_APP_API_ENDPOINT=https://drozhealthfacts.com/api
REACT_APP_API_KEY=droz-health-facts-api-key-2026
REACT_APP_PROJECT_ID=droz-health-facts
REACT_APP_ENABLE_CLOUD_SYNC=true
REACT_APP_FALLBACK_TO_LOCAL=false
REACT_APP_DB_PROVIDER=d1
```

## 7. Test Endpoints After Deploy
- Health: `https://drozhealthfacts.com/api/health`
- Links: `https://drozhealthfacts.com/api/affiliate-links`
- Stats: `https://drozhealthfacts.com/api/affiliate-stats`

## 8. Access Affiliate Dashboard
- URL: `https://drozhealthfacts.com/affiliate`
- Password: `@DRsuperZ6`

## Commands Reference
```bash
# Create database
wrangler d1 create droz-affiliate-db

# List databases
wrangler d1 list

# Execute SQL
wrangler d1 execute droz-affiliate-db --command "SELECT COUNT(*) FROM affiliate_links"

# Backup database
wrangler d1 export droz-affiliate-db --output backup.sql

# Deploy functions
wrangler pages deploy dist
```