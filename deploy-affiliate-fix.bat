@echo off
echo 🚀 Deploying Affiliate System Fix...
echo ==================================

REM Step 1: Build the project
echo 📦 Building project...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed! Please fix build errors first.
    pause
    exit /b 1
)

echo ✅ Build successful!

REM Step 2: Commit and push changes
echo 📤 Committing changes to Git...
git add .
git commit -m "Fix: Remove localStorage fallbacks, force cloud database only - Removed localStorage fallbacks from AffiliateRedirect - Updated CloudAffiliateManager to use cloud database only - Added CloudDebugPanel for troubleshooting - Enhanced error handling and logging - Added PATCH endpoint for click count increment - System now 100% cloud-based for global access"

git push origin main

if %errorlevel% neq 0 (
    echo ❌ Git push failed! Please check your repository.
    pause
    exit /b 1
)

echo ✅ Code pushed to GitHub!

REM Step 3: Check if wrangler is installed
wrangler --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Wrangler CLI not found. Installing...
    call npm install -g wrangler
)

REM Step 4: Login to Cloudflare (if not already logged in)
echo 🔐 Checking Cloudflare authentication...
wrangler whoami

if %errorlevel% neq 0 (
    echo 🔐 Please login to Cloudflare...
    wrangler login
)

REM Step 5: Create D1 database (if not exists)
echo 🗄️  Setting up D1 database...
echo Creating droz-affiliate-db database...
wrangler d1 create droz-affiliate-db

echo.
echo ⚠️  IMPORTANT: Copy the database ID from above and update wrangler.toml
pause

REM Step 6: Run database migration
echo 🔄 Running database migration...
wrangler d1 migrations apply droz-affiliate-db --remote

if %errorlevel% neq 0 (
    echo ❌ Migration failed! Please check your database configuration.
    pause
    exit /b 1
)

echo ✅ Database migration completed!

REM Step 7: Test database
echo 🧪 Testing database...
wrangler d1 execute droz-affiliate-db --command "SELECT COUNT(*) as total_links FROM affiliate_links"

REM Step 8: Deploy to Cloudflare Pages (if using CLI)
echo 🚀 Deploying to Cloudflare Pages...
wrangler pages deploy dist

echo.
echo 🎉 Deployment Complete!
echo ======================
echo.
echo 📋 Next Steps:
echo 1. Go to Cloudflare Pages dashboard
echo 2. Set environment variables:
echo    - REACT_APP_API_ENDPOINT = https://drozhealthfacts.com/api
echo    - REACT_APP_API_KEY = droz-health-facts-api-key-2026
echo    - REACT_APP_PROJECT_ID = droz-health-facts
echo    - REACT_APP_ENABLE_CLOUD_SYNC = true
echo    - REACT_APP_FALLBACK_TO_LOCAL = false
echo    - REACT_APP_DB_PROVIDER = d1
echo.
echo 3. Connect D1 database to Pages Functions:
echo    - Go to Settings → Functions
echo    - Add D1 binding: DB → droz-affiliate-db
echo.
echo 4. Test the system:
echo    - Visit: https://drozhealthfacts.com/affiliate
echo    - Password: @DRsuperZ6
echo    - Check Cloud Debug Panel
echo    - Add a test link and try from different device
echo.
echo 🔗 Test URLs after deployment:
echo - Main site: https://drozhealthfacts.com
echo - Affiliate dashboard: https://drozhealthfacts.com/affiliate
echo - Health check: https://drozhealthfacts.com/api/health
echo.
echo ✅ Your affiliate system is now 100% cloud-based!
echo    Links will work on any device globally! 🌍
pause