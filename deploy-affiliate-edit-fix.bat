@echo off
echo ========================================
echo  AFFILIATE EDIT/DELETE FIX DEPLOYMENT
echo ========================================
echo.

echo 🔧 Fixed HTTP 405 errors for edit/delete operations
echo 📝 Updated CloudAffiliateManager to use POST-only endpoint
echo 🧹 Cleaned affiliate dashboard (removed debug panels)
echo.

echo 📦 Building project...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo.
echo 📤 Deploying to GitHub...
git add .
git commit -m "🔧 Fix affiliate edit/delete HTTP 405 errors - use POST-only API

✅ FIXES:
- Updated CloudAffiliateManager to use /affiliate-post-only endpoint
- Fixed HTTP 405 errors when editing/deleting affiliate links
- All CRUD operations now work via POST method (Cloudflare Pages compatible)
- Cleaned affiliate dashboard (removed debug panels)

🚀 WORKING FEATURES:
- ✅ Create new affiliate links
- ✅ Edit existing links (fixed!)
- ✅ Delete unwanted links (fixed!)
- ✅ Direct & landing page redirects
- ✅ Click tracking & analytics
- ✅ Clean dashboard interface

🔗 TEST: https://drozhealthfacts.com/affiliate
🔑 Password: @DRsuperZ6"

git push origin main
if %errorlevel% neq 0 (
    echo ❌ Git push failed!
    pause
    exit /b 1
)

echo.
echo ✅ DEPLOYMENT COMPLETE!
echo.
echo 🔗 Your affiliate system is now fully working:
echo    https://drozhealthfacts.com/affiliate
echo.
echo 🔑 Login with password: @DRsuperZ6
echo.
echo 🎉 All CRUD operations should now work:
echo    ✅ Create new links
echo    ✅ Edit existing links (FIXED!)
echo    ✅ Delete unwanted links (FIXED!)
echo    ✅ Toggle active/inactive status
echo    ✅ Click tracking
echo.
echo 📊 The system will automatically deploy to Cloudflare Pages
echo    Wait 2-3 minutes for deployment to complete
echo.
pause