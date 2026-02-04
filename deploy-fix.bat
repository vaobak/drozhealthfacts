@echo off
echo 🚀 Deploying Cloudflare Pages Fix...
echo ===================================

echo 📦 Building project locally first...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Local build failed! Please fix build errors first.
    pause
    exit /b 1
)

echo ✅ Local build successful!

echo 📤 Committing and pushing changes...
git add .
git commit -m "Fix: Cloudflare Pages configuration

- Simplified wrangler.toml for Pages compatibility
- Removed unsupported build configuration
- Added functions/_routes.json for proper API routing
- Updated _redirects for SPA routing
- Fixed D1 database binding configuration"

git push origin main

if %errorlevel% neq 0 (
    echo ❌ Git push failed! Please check your repository.
    pause
    exit /b 1
)

echo ✅ Code pushed to GitHub!
echo 🎉 Cloudflare Pages deployment should now succeed!
echo.
echo 📋 What was fixed:
echo - Simplified wrangler.toml (removed unsupported Pages config)
echo - Added functions/_routes.json for API routing
echo - Updated _redirects for proper SPA routing
echo - Kept D1 database binding for affiliate system
echo.
echo 🔧 Manual steps in Cloudflare Pages Dashboard:
echo 1. Go to Pages dashboard
echo 2. Select your project
echo 3. Go to Settings → Environment Variables
echo 4. Add these variables:
echo    - REACT_APP_API_ENDPOINT = https://drozhealthfacts.com/api
echo    - REACT_APP_API_KEY = droz-health-facts-api-key-2026
echo    - REACT_APP_PROJECT_ID = droz-health-facts
echo    - REACT_APP_ENABLE_CLOUD_SYNC = true
echo    - REACT_APP_FALLBACK_TO_LOCAL = false
echo    - REACT_APP_DB_PROVIDER = d1
echo.
echo 5. Go to Settings → Functions
echo 6. Add D1 binding: DB → droz-affiliate-db
echo.
echo 🔗 Check deployment status at:
echo https://dash.cloudflare.com/pages
pause