import { ARTICLES_DATA, CATEGORIES } from '../constants';

/**
 * Generate sitemap.xml content dynamically
 * This can be used to create sitemap on build or server-side
 */
export const generateSitemap = (): string => {
  const baseUrl = 'http://drozhealthfacts.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/health-topics', priority: '0.9', changefreq: 'weekly' },
    { url: '/articles', priority: '0.9', changefreq: 'daily' },
    { url: '/health-tools', priority: '0.9', changefreq: 'weekly' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
  ];

  const healthTools = [
    '/bmi-calculator',
    '/blood-pressure-tracker',
    '/calorie-calculator',
    '/heart-rate-zone-calculator',
    '/water-intake-calculator',
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Static pages
  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  // Health tools
  healthTools.forEach(tool => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${tool}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += '  </url>\n';
  });

  // Categories
  CATEGORIES.forEach(category => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/category/${category.slug}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += '  </url>\n';
  });

  // Articles
  ARTICLES_DATA.forEach(article => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/article/${article.slug}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
};

/**
 * Generate BreadcrumbList schema for SEO
 */
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `http://drozhealthfacts.com${item.url}`
    }))
  };
};
