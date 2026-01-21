# 🚀 Deployment Guide - GitHub + Cloudflare Pages

## 📋 Pre-Deployment Checklist

### ✅ Files Ready for GitHub
- `_redirects` - SPA routing for Cloudflare Pages
- `wrangler.toml` - Cloudflare Pages configuration
- `.github/workflows/deploy.yml` - Auto-deployment workflow
- `.gitignore` - Excludes node_modules, dist, .env.local
- All source code and assets

### ✅ Build Configuration
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18
- **Prebuild**: Generates constants and sitemap automatically

## 🔧 Step-by-Step Deployment

### 1. Push to GitHub
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Dr. Oz Health Facts website"

# Add remote repository
git remote add origin https://github.com/yourusername/drozhealthfacts.git

# Push to GitHub
git push -u origin main
```

### 2. Setup Cloudflare Pages

#### Option A: Automatic GitHub Integration (Recommended)
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project**
3. Connect to **GitHub** and select your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave empty)
   - **Node.js version**: `18`

#### Option B: GitHub Actions (Advanced)
1. Get Cloudflare API Token:
   - Go to Cloudflare → My Profile → API Tokens
   - Create token with "Cloudflare Pages:Edit" permissions
2. Add GitHub Secrets:
   - `CLOUDFLARE_API_TOKEN`: Your API token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
3. Push code - deployment will happen automatically

### 3. Configure Custom Domain
1. In Cloudflare Pages → Your project → **Custom domains**
2. Add `drozhealthfacts.com`
3. Update your domain's nameservers to Cloudflare
4. SSL certificate will be automatically provisioned

## 🔧 Environment Variables (Optional)

### For AI Features (AskQuestion component)
Add in Cloudflare Pages → Settings → Environment variables:
```
GEMINI_API_KEY = your-actual-api-key
```

## 🌐 Expected URLs After Deployment

### Main Pages
- `https://drozhealthfacts.com/` - Homepage
- `https://drozhealthfacts.com/articles` - All articles
- `https://drozhealthfacts.com/health-tools` - Health calculators
- `https://drozhealthfacts.com/health-topics` - Topic categories

### Health Tools (24 calculators)
- `https://drozhealthfacts.com/bmi-calculator`
- `https://drozhealthfacts.com/ovulation-calculator`
- `https://drozhealthfacts.com/body-fat-calculator`
- And 21 more...

### Articles (29 articles)
- `https://drozhealthfacts.com/article/boost-immune-system`
- `https://drozhealthfacts.com/article/keto-diet-complete-guide`
- And 27 more...

## 🔍 Post-Deployment Verification

### 1. Test Core Functionality
- [ ] Homepage loads correctly
- [ ] All 29 articles accessible
- [ ] All 24 health calculators work
- [ ] Navigation between pages
- [ ] Mobile responsiveness
- [ ] Dark mode toggle

### 2. SEO Verification
- [ ] `https://drozhealthfacts.com/sitemap.xml` accessible
- [ ] `https://drozhealthfacts.com/robots.txt` accessible
- [ ] Meta tags in page source
- [ ] Open Graph tags for social sharing

### 3. Performance Check
- [ ] Page load speed < 3 seconds
- [ ] Images load properly
- [ ] No console errors
- [ ] Responsive on mobile devices

## 🚨 Troubleshooting

### Common Issues & Solutions

#### 1. 404 Errors on Direct URLs
**Problem**: `/article/some-article` returns 404
**Solution**: Ensure `_redirects` file is in root directory

#### 2. Build Fails
**Problem**: Build command fails in Cloudflare
**Solution**: Check Node.js version is set to 18

#### 3. Articles Don't Load
**Problem**: Article pages show "Article not found"
**Solution**: Verify JSON files are in `public/articles/` directory

#### 4. Blank White Screen
**Problem**: Site loads but shows blank page
**Solution**: Check browser console for JavaScript errors

## 📊 Expected Performance

### Build Time
- **Local**: ~1-2 minutes
- **Cloudflare**: ~2-3 minutes

### Bundle Size
- **JavaScript**: ~2.1MB (acceptable for health site)
- **CSS**: ~81KB
- **Total**: ~2.2MB

### Page Speed
- **Desktop**: 90+ Lighthouse score expected
- **Mobile**: 85+ Lighthouse score expected

## 🎯 Success Indicators

After deployment, you should see:
- ✅ All pages load without errors
- ✅ Health calculators are functional
- ✅ Articles display with proper formatting
- ✅ SEO meta tags in page source
- ✅ Mobile-responsive design
- ✅ Fast loading times

## 📞 Support

If you encounter issues:
1. Check Cloudflare Pages build logs
2. Verify GitHub repository has all files
3. Test locally with `npm run build && npm run preview`
4. Check browser console for errors

---
**Ready to deploy!** 🚀