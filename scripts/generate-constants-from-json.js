import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, '../public/articles');
const outputFile = path.join(__dirname, '../constants.ts');

console.log('🚀 Generating constants.ts from JSON files...\n');

// Read all JSON files from public/articles/
const files = fs.readdirSync(articlesDir).filter(file => file.endsWith('.json'));

console.log(`📁 Found ${files.length} JSON files\n`);

const articles = [];

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  try {
    const data = JSON.parse(fileContent);
    
    // Add to articles array (metadata only, no content)
    articles.push({
      id: data.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      imageUrl: data.imageUrl,
      category: data.category,
      categorySlug: data.categorySlug,
      author: data.author,
      date: data.date,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      metaKeywords: data.metaKeywords,
      schemaType: data.schemaType,
      reviewRating: data.reviewRating,
      reviewCount: data.reviewCount,
      jsonPath: `/articles/${file}` // Path to JSON file
    });
    
    console.log(`   ✅ ${file}`);
  } catch (error) {
    console.log(`   ❌ ${file} - Error: ${error.message}`);
  }
});

console.log(`\n📊 Total articles: ${articles.length}`);

// Generate TypeScript file
let tsContent = `import { Topic, Article } from './types';

export const NAV_LINKS = [
  { label: 'Home', view: 'HOME', path: '/' },
  { label: 'Health Topics', view: 'TOPICS', path: '/health-topics' },
  { label: 'Articles', view: 'ARTICLES', path: '/articles' },
  { label: 'Health Tools', view: 'HEALTH_TOOLS', path: '/health-tools' },
  { label: 'About Us', view: 'ABOUT', path: '/about' },
];

export const CATEGORIES = [
  { name: 'Nutrition & Diet', slug: 'nutrition-diet' },
  { name: 'Fitness & Exercise', slug: 'fitness' },
  { name: 'Mental Health', slug: 'mental-health' },
  { name: 'Heart Health', slug: 'heart-health' },
  { name: 'Sleep & Wellness', slug: 'sleep' },
  { name: 'Disease Prevention', slug: 'prevention' },
  { name: 'General Health', slug: 'general-health' },
  { name: 'Health Conditions', slug: 'health-conditions' },
  { name: 'Lifestyle & Wellness', slug: 'lifestyle-wellness' },
];

// AUTO-GENERATED from JSON files
// METADATA ONLY - Content loaded from JSON on-demand
// To add new article: Just add new .json file to public/articles/
// Then run: npm run generate-from-json
export const ARTICLES_DATA: Article[] = [
`;

// Add each article
articles.forEach((article, index) => {
  tsContent += `  {
    id: '${article.id}',
    title: '${article.title.replace(/'/g, "\\'")}',
    slug: '${article.slug}',
    excerpt: '${article.excerpt.replace(/'/g, "\\'")}',
    imageUrl: '${article.imageUrl}',
    category: '${article.category}',
    categorySlug: '${article.categorySlug}',
    author: '${article.author}',
    date: '${article.date}',
    content: '', // Content loaded from JSON
    metaTitle: '${article.metaTitle?.replace(/'/g, "\\'") || ''}',
    metaDescription: '${article.metaDescription?.replace(/'/g, "\\'") || ''}',
    metaKeywords: '${article.metaKeywords?.replace(/'/g, "\\'") || ''}',
    schemaType: '${article.schemaType}',
    reviewRating: ${article.reviewRating},
    reviewCount: ${article.reviewCount},
    jsonPath: '${article.jsonPath}'
  }${index < articles.length - 1 ? ',' : ''}
`;
});

tsContent += `];

export const TOPICS_DATA: Topic[] = [
  {
    id: 'nutrition',
    title: 'Nutrition & Diet',
    description: 'Eat smart for better health',
    iconName: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
    slug: 'nutrition-diet'
  },
  {
    id: 'fitness',
    title: 'Fitness & Exercise',
    description: 'Stay active and fit',
    iconName: 'Dumbbell',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    slug: 'fitness'
  },
  {
    id: 'mental',
    title: 'Mental Health',
    description: 'Your mind matters',
    iconName: 'Brain',
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop',
    slug: 'mental-health'
  },
  {
    id: 'heart',
    title: 'Heart Health',
    description: 'Keep your heart strong',
    iconName: 'HeartPulse',
    imageUrl: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop',
    slug: 'heart-health'
  },
  {
    id: 'sleep',
    title: 'Sleep & Wellness',
    description: 'Rest and recover better',
    iconName: 'Moon',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=600&fit=crop',
    slug: 'sleep'
  },
  {
    id: 'prevention',
    title: 'Disease Prevention',
    description: 'Your armor against illness',
    iconName: 'ShieldPlus',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
    slug: 'prevention'
  },
  {
    id: 'general-health',
    title: 'General Health',
    description: 'Essential health tips for everyone',
    iconName: 'Activity',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop',
    slug: 'general-health'
  },
  {
    id: 'health-conditions',
    title: 'Health Conditions',
    description: 'Understanding common health issues',
    iconName: 'Stethoscope',
    imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop',
    slug: 'health-conditions'
  },
  {
    id: 'lifestyle-wellness',
    title: 'Lifestyle & Wellness',
    description: 'Daily habits for better living',
    iconName: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    slug: 'lifestyle-wellness'
  }
];
`;

// Write to file
fs.writeFileSync(outputFile, tsContent, 'utf-8');

const fileSize = (fs.statSync(outputFile).size / 1024).toFixed(2);

console.log(`\n✅ Successfully generated constants.ts`);
console.log(`📁 Location: constants.ts`);
console.log(`📦 File size: ${fileSize} KB (metadata only)`);
console.log(`\n💡 To add new article:`);
console.log(`   1. Create new .json file in public/articles/`);
console.log(`   2. Run: npm run generate-from-json`);
console.log(`   3. Done! No complex scripts needed.`);
console.log(`\n🎉 Ready to use!`);
