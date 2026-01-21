# 🗺️ Sitemap Auto-Generation

## 📋 Overview

Script ini akan **otomatis generate sitemap.xml** setiap kali ada perubahan artikel atau halaman baru.

## 🚀 Cara Menggunakan

### 1. Manual Generation
Jalankan script ini setiap kali menambah artikel baru:

```bash
npm run generate-sitemap
```

### 2. Auto-Generation saat Build
Sitemap akan **otomatis di-generate** setiap kali build:

```bash
npm run build
```

Script `prebuild` akan otomatis menjalankan `generate-sitemap` sebelum build.

## 📁 File Structure

```
scripts/
  ├── generate-sitemap.js    # Script generator
  └── README.md              # Dokumentasi ini

public/
  └── sitemap.xml            # Output sitemap (auto-generated)
```

## ⚙️ Konfigurasi

Edit `scripts/generate-sitemap.js` untuk:

1. **Update Base URL** (sudah diset ke `http://drozhealthfacts.com`)
2. **Tambah/Hapus Static Pages**
3. **Update Priority & Changefreq**

### Contoh: Menambah Artikel Baru

Ketika menambah artikel baru di `constants.ts`:

```typescript
// constants.ts
export const ARTICLES_DATA: Article[] = [
  // ... artikel lama
  {
    id: 'new-article',
    slug: 'new-article-slug',
    // ... data lainnya
  }
];
```

Jalankan:
```bash
npm run generate-sitemap
```

Sitemap akan otomatis update dengan artikel baru!

## 📊 Output

Sitemap akan berisi:
- ✅ Homepage
- ✅ Main Pages (6 pages)
- ✅ Health Tools (5 tools)
- ✅ Categories (6 categories)
- ✅ Articles (semua artikel dari ARTICLES_DATA)

**Total URLs**: 18+ (tergantung jumlah artikel)

## 🔄 Update Workflow

### Saat Menambah Artikel Baru:

1. Tambah artikel di `constants.ts`
2. Jalankan `npm run generate-sitemap`
3. Commit `public/sitemap.xml`
4. Deploy

### Saat Build Production:

```bash
npm run build
```

Sitemap otomatis ter-generate sebelum build! ✨

## 📝 Notes

- Sitemap menggunakan **current date** sebagai `lastmod`
- Priority: Homepage (1.0) > Main Pages (0.9) > Tools/Categories (0.8) > Articles (0.7)
- Changefreq: Daily (homepage/articles) > Weekly (topics/categories) > Monthly (tools/static)

## 🌐 Submit Sitemap

Setelah generate, submit ke:

1. **Google Search Console**: https://search.google.com/search-console
   - Property: `http://drozhealthfacts.com`
   - Sitemap URL: `http://drozhealthfacts.com/sitemap.xml`

2. **Bing Webmaster Tools**: https://www.bing.com/webmasters
   - Submit sitemap URL yang sama

## ✅ Verification

Test sitemap:
```bash
# Check if sitemap exists
curl http://drozhealthfacts.com/sitemap.xml

# Or open in browser
http://drozhealthfacts.com/sitemap.xml
```

## 🐛 Troubleshooting

**Problem**: Sitemap tidak ter-generate

**Solution**:
```bash
# Check if script exists
ls scripts/generate-sitemap.js

# Run manually
node scripts/generate-sitemap.js

# Check output
cat public/sitemap.xml
```

**Problem**: Artikel baru tidak muncul di sitemap

**Solution**:
1. Pastikan artikel sudah ditambah di `constants.ts`
2. Jalankan `npm run generate-sitemap` lagi
3. Check `public/sitemap.xml`

---

**Last Updated**: January 16, 2025
**Status**: ✅ Active & Working
