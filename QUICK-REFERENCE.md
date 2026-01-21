# Quick Reference Card - Dr. Oz Health Facts

## 🚀 Quick Start (5 Minutes)

### 1. Install Package
```bash
npm install web-vitals
```

### 2. Key Code Changes

**ArticleDetail.tsx** - Add after loading content:
```typescript
import { enhanceArticleContent } from '../utils/articleEnhancer';
const enhancedContent = enhanceArticleContent(content, article.slug);
```

**Replace images with**:
```typescript
import { OptimizedImage } from '../components/OptimizedImage';
<OptimizedImage src={url} alt={text} width={800} height={600} priority={false} />
```

### 3. Deploy & Submit
```bash
npm run build
# Deploy to production
# Submit sitemap: https://drozhealthfacts.com/sitemap.xml
```

---

## 📁 New Files Created

| File | Purpose |
|------|---------|
| `utils/webVitals.ts` | Core Web Vitals tracking |
| `utils/articleEnhancer.ts` | Internal links & citations |
| `components/OptimizedImage.tsx` | Image optimization |
| `scripts/fix-domain-sitemap.cjs` | Domain fix automation |
| `CONTENT-FRESHNESS-SCHEDULE.md` | Update schedule |
| `FINAL-IMPLEMENTATION-GUIDE.md` | Complete guide |

---

## 🔗 Internal Links (Auto-Added)

Keywords that get linked:
- intermittent fasting
- weight loss
- healthy eating
- nutrition
- exercise
- mental health
- heart health
- diabetes
- blood pressure
- cholesterol

---

## 📚 External Citations (Auto-Added)

Phrases that get cited:
- "according to research" → NIH
- "studies show" → NEJM
- "CDC recommends" → CDC
- "WHO guidelines" → WHO
- "Harvard Medical School" → Harvard
- "Mayo Clinic" → Mayo Clinic
- "American Heart Association" → AHA
- "research published" → PubMed

---

## 🖼️ Image Optimization

**Before**:
```typescript
<img src={url} alt={text} />
```

**After**:
```typescript
<OptimizedImage 
  src={url} 
  alt={text}
  width={800}
  height={600}
  priority={false} // true for above-fold
/>
```

**Features**:
- ✅ Lazy loading
- ✅ Responsive (srcset)
- ✅ Loading placeholder
- ✅ Error handling

---

## 📊 Core Web Vitals Thresholds

| Metric | Good | Needs Work | Poor |
|--------|------|------------|------|
| LCP | < 2.5s | 2.5-4s | > 4s |
| FID | < 100ms | 100-300ms | > 300ms |
| CLS | < 0.1 | 0.1-0.25 | > 0.25 |
| FCP | < 1.8s | 1.8-3s | > 3s |
| TTFB | < 800ms | 800-1.8s | > 1.8s |

---

## 📅 Content Update Schedule

- **Monthly**: Top 10 articles
- **Quarterly**: Top 20 articles
- **Annual**: All articles

**Top 10 Priority**:
1. Intermittent Fasting Guide
2. Weight Loss Tips
3. Heart Health Guide
4. Diabetes Prevention
5. Blood Pressure Management
6. Cholesterol Guide
7. Healthy Eating Habits
8. Exercise Guide
9. Mental Health Tips
10. Sleep Quality Guide

---

## 🔍 Testing Commands

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Fix domain in sitemap
node scripts/fix-domain-sitemap.cjs
```

---

## ✅ Deployment Checklist

- [ ] `npm install web-vitals`
- [ ] Integrate `enhanceArticleContent()`
- [ ] Replace images with `<OptimizedImage>`
- [ ] Test locally
- [ ] Build production
- [ ] Deploy
- [ ] Submit sitemap to Google
- [ ] Submit sitemap to Bing
- [ ] Monitor Core Web Vitals

---

## 🐛 Quick Fixes

**Web Vitals not tracking?**
```bash
npm install web-vitals
# Check index.tsx has: import { initWebVitals } from './utils/webVitals';
```

**Internal links not working?**
```typescript
// Verify in ArticleDetail.tsx:
const enhancedContent = enhanceArticleContent(content, article.slug);
```

**Images not lazy loading?**
```typescript
// Use OptimizedImage component:
<OptimizedImage priority={false} ... />
```

**Domain still HTTP?**
```bash
node scripts/fix-domain-sitemap.cjs
# Search for remaining: grep -r "http://drozhealthfacts" .
```

---

## 📈 Success Metrics

**Week 1**: All deployed, no errors  
**Month 1**: Traffic +10%, Rankings +2  
**Month 3**: Traffic +25%, Rankings +5  
**Month 6**: Traffic +50%, Rankings +10  
**Month 12**: Traffic +100%, Ranking #1 🏆

---

## 🔗 Important URLs

- **Domain**: https://drozhealthfacts.com
- **Sitemap**: https://drozhealthfacts.com/sitemap.xml
- **Robots**: https://drozhealthfacts.com/robots.txt
- **Search Console**: https://search.google.com/search-console
- **Analytics**: https://analytics.google.com/

---

## 📞 Documentation

- Full Guide: `FINAL-IMPLEMENTATION-GUIDE.md`
- SEO Audit: `SEO-AUDIT-COMPLETE.md`
- Improvements: `SEO-IMPROVEMENTS-COMPLETE.md`
- Schedule: `CONTENT-FRESHNESS-SCHEDULE.md`

---

**Last Updated**: Jan 9, 2025  
**Version**: 1.0
