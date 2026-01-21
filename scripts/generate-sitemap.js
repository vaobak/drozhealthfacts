/**
 * Auto-generate sitemap.xml from constants and routes
 * Run this script whenever you add new articles or pages
 * 
 * Usage: node scripts/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All health tool routes from App.tsx
const HEALTH_TOOLS = [
  'bmi-calculator',
  'bmr-calculator', 
  'blood-pressure-tracker',
  'body-fat-calculator',
  'caffeine-calculator',
  'calorie-calculator',
  'calorie-counter',
  'diabetes-risk-calculator',
  'drug-interaction-checker',
  'health-risk-assessment',
  'heart-rate-calculator',
  'heart-rate-zone-calculator',
  'ideal-weight-calculator',
  'lab-results-interpreter',
  'ovulation-calculator',
  'macro-calculator',
  'medication-reminder',
  'pregnancy-due-date-calculator',
  'protein-intake-calculator',
  'sleep-calculator',
  'symptom-checker',
  'tdee-calculator',
  'water-intake-calculator',
  'workout-planner'
];

// Read article slugs dynamically from constants.ts
function getArticleSlugs() {
  try {
    const constantsPath = path.join(__dirname, '..', 'constants.ts');
    const constantsContent = fs.readFileSync(constantsPath, 'utf8');
    
    // Extract slugs using regex
    const slugMatches = constantsContent.match(/slug: '([^']+)'/g);
    if (!slugMatches) return [];
    
    return slugMatches
      .map(match => match.replace(/slug: '([^']+)'/, '$1'))
      .filter(slug => !slug.includes('nutrition-diet') && !slug.includes('fitness') && !slug.includes('mental-health')); // Filter out category slugs
  } catch (error) {
    console.error('Error reading constants.ts:', error);
    return [];
  }
}

// Read categories dynamically from constants.ts
function getCategorySlugs() {
  try {
    const constantsPath = path.join(__dirname, '..', 'constants.ts');
    const constantsContent = fs.readFileSync(constantsPath, 'utf8');
    
    // Extract category slugs from CATEGORIES array
    const categoryMatches = constantsContent.match(/{ name: '[^']+', slug: '([^']+)' }/g);
    if (!categoryMatches) return [];
    
    return categoryMatches.map(match => match.replace(/{ name: '[^']+', slug: '([^']+)' }/, '$1'));
  } catch (error) {
    console.error('Error reading categories from constants.ts:', error);
    return ['nutrition-diet', 'fitness', 'mental-health', 'heart-health', 'sleep', 'prevention', 'general-health', 'health-conditions', 'lifestyle-wellness'];
  }
}

const BASE_URL = 'https://drozhealthfacts.com';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

function generateSitemap() {
  const ARTICLE_SLUGS = getArticleSlugs();
  const CATEGORIES = getCategorySlugs();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/health-topics', priority: '0.9', changefreq: 'weekly' },
    { url: '/articles', priority: '0.9', changefreq: 'daily' },
    { url: '/health-tools', priority: '0.9', changefreq: 'weekly' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
  ];

  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${CURRENT_DATE}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  // Health tools (24 calculators)
  HEALTH_TOOLS.forEach(tool => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}/${tool}</loc>\n`;
    xml += `    <lastmod>${CURRENT_DATE}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += '  </url>\n';
  });

  // Categories
  CATEGORIES.forEach(category => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}/category/${category}</loc>\n`;
    xml += `    <lastmod>${CURRENT_DATE}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += '  </url>\n';
  });

  // Articles - Dynamic from constants.ts
  ARTICLE_SLUGS.forEach(slug => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}/${slug}</loc>\n`;
    xml += `    <lastmod>${CURRENT_DATE}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

// Write sitemap to public folder
const sitemapContent = generateSitemap();
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');

const ARTICLE_SLUGS = getArticleSlugs();
const CATEGORIES = getCategorySlugs();
const totalUrls = 6 + HEALTH_TOOLS.length + CATEGORIES.length + ARTICLE_SLUGS.length;

console.log('✅ Sitemap generated successfully!');
console.log(`📁 Location: ${sitemapPath}`);
console.log(`📊 Total URLs: ${totalUrls}`);
console.log(`   - Static pages: 6`);
console.log(`   - Health tools: ${HEALTH_TOOLS.length}`);
console.log(`   - Categories: ${CATEGORIES.length}`);
console.log(`   - Articles: ${ARTICLE_SLUGS.length}`);
console.log(`🌐 Base URL: ${BASE_URL}`);
console.log(`📅 Last Modified: ${CURRENT_DATE}`);
console.log('\n💡 Tip: Run this script whenever you add new articles or pages');
console.log('   Command: npm run generate-sitemap');
console.log('\n🔗 Sample URLs generated:');
console.log(`   - Homepage: ${BASE_URL}/`);
console.log(`   - Health Tools: ${BASE_URL}/health-tools`);
console.log(`   - BMI Calculator: ${BASE_URL}/bmi-calculator`);
console.log(`   - Sample Article: ${BASE_URL}/${ARTICLE_SLUGS[0] || 'article-slug'}`);
console.log(`   - Sample Category: ${BASE_URL}/category/${CATEGORIES[0] || 'category-slug'}`);
