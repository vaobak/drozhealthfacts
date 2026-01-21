const fs = require('fs');
const path = require('path');

// Read sitemap
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf-8');

// Replace all http:// with https://
sitemap = sitemap.replace(/http:\/\/drozhealthfacts\.com/g, 'https://drozhealthfacts.com');

// Write back
fs.writeFileSync(sitemapPath, sitemap, 'utf-8');

console.log('✅ Sitemap updated to https://drozhealthfacts.com');
