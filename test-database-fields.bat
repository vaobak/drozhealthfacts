@echo off
echo 🔍 Testing Database Field Mapping...
echo =====================================

echo 📊 Checking table structure...
wrangler d1 execute droz-affiliate-db --command ".schema affiliate_links"

echo.
echo 📋 Checking existing data...
wrangler d1 execute droz-affiliate-db --command "SELECT id, slug, title, destination_url, redirect_type, auto_redirect FROM affiliate_links LIMIT 5"

echo.
echo 🔧 Fixing any NULL values...
wrangler d1 execute droz-affiliate-db --command "UPDATE affiliate_links SET redirect_type = 'landing' WHERE redirect_type IS NULL"
wrangler d1 execute droz-affiliate-db --command "UPDATE affiliate_links SET auto_redirect = 1 WHERE auto_redirect IS NULL"

echo.
echo ✅ Verification - Field counts...
wrangler d1 execute droz-affiliate-db --command "SELECT COUNT(*) as total_links, COUNT(destination_url) as has_destination_url, COUNT(redirect_type) as has_redirect_type, COUNT(auto_redirect) as has_auto_redirect FROM affiliate_links"

echo.
echo 🧪 Adding test record...
wrangler d1 execute droz-affiliate-db --command "INSERT INTO affiliate_links (id, slug, title, description, destination_url, category, redirect_type, auto_redirect, is_active, click_count, created_at, updated_at) VALUES ('test-field-mapping', 'test-field-mapping', 'Test Field Mapping', 'Testing field mapping', 'https://test-destination.com', 'Test', 'direct', 0, 1, 0, datetime('now'), datetime('now'))"

echo.
echo 🔍 Verifying test record...
wrangler d1 execute droz-affiliate-db --command "SELECT slug, destination_url, redirect_type, auto_redirect FROM affiliate_links WHERE slug = 'test-field-mapping'"

echo.
echo ✅ Database field mapping test complete!
pause