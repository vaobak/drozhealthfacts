@echo off
echo 🚀 Deploying Build Fix...
echo ========================

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
git commit -m "Fix: Remove unused components causing build errors

- Removed CRUDTestPanel and APIEndpointTest imports
- Fixed wrangler.toml configuration for Cloudflare Pages
- Added pages_build_output_dir property
- Updated Node version to 20 for better compatibility
- All debug tools working properly"

git push origin main

if %errorlevel% neq 0 (
    echo ❌ Git push failed! Please check your repository.
    pause
    exit /b 1
)

echo ✅ Code pushed to GitHub!
echo 🎉 Deployment should now succeed!
echo.
echo 📋 What was fixed:
echo - Removed unused CRUDTestPanel and APIEndpointTest components
echo - Fixed wrangler.toml configuration for Cloudflare Pages
echo - Updated Node version from 18 to 20
echo - Added pages_build_output_dir = "dist"
echo.
echo 🔗 Check deployment status at:
echo https://dash.cloudflare.com/pages
echo.
echo ✅ All debug tools are still available:
echo - Cloud Database Debug Panel
echo - Field Mapping Debug Panel  
echo - Redirect Test Panel
echo - Manual Form Test Guide
echo - Affiliate Form Test Panel
pause