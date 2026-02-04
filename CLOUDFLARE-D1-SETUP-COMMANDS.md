# 🚀 Cloudflare D1 Setup Commands

## 1. Install Wrangler CLI (if not installed)
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

**IMPORTANT**: Copy the database ID from the output and update `wrangler.toml`

## 4. Update wrangler.toml with your actual database ID
Replace the database_id in wrangler.toml with the ID from step 3

## 5. Run Database Migration
```bash
# Apply migration to remote D1 database
wrangler d1 migrations apply droz-affiliate-db --remote
```

## 6. Test Database
```bash
# Test if tables were created
wrangler d1 execute droz-affiliate-db --command "SELECT COUNT(*) FROM affiliate_links"
```

## 7. Deploy to Cloudflare Pages
```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages (if using CLI)
wrangler pages deploy dist
```

## 8. Set Environment Variables in Cloudflare Pages Dashboard
Go to your Cloudflare Pages dashboard and set these variables:

- `REACT_APP_API_ENDPOINT` = `https://drozhealthfacts.com/api`
- `REACT_APP_API_KEY` = `droz-health-facts-api-key-2026`
- `REACT_APP_PROJECT_ID` = `droz-health-facts`
- `REACT_APP_ENABLE_CLOUD_SYNC` = `true`
- `REACT_APP_FALLBACK_TO_LOCAL` = `false`
- `REACT_APP_DB_PROVIDER` = `d1`

## 9. Test Your Live System
After deployment, test these URLs:
- Health Check: `https://drozhealthfacts.com/api/health`
- Affiliate Dashboard: `https://drozhealthfacts.com/affiliate`
- Test Redirect: `https://drozhealthfacts.com/formula99`

## 10. Add Sample Data (Optional)
The migration already includes sample data, but you can add more:
```bash
wrangler d1 execute droz-affiliate-db --command "INSERT INTO affiliate_links (id, slug, title, description, destination_url, category, is_active) VALUES ('test-1', 'test-product', 'Test Product', 'Test Description', 'https://example.com', 'Health', 1)"
```