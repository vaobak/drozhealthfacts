import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, '../public/articles');
const outputDir = path.join(__dirname, '../public/articles');

console.log('🚀 Converting .md files to .json...\n');

const folders = ['general', 'listicle', 'howto', 'medical-condition'];
let totalConverted = 0;

folders.forEach(folder => {
  const folderPath = path.join(articlesDir, folder);
  
  if (!fs.existsSync(folderPath)) {
    console.log(`⚠️  Folder not found: ${folder}`);
    return;
  }
  
  const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.md'));
  
  console.log(`📁 Processing ${folder}/ (${files.length} files)`);
  
  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    try {
      const { data, content } = matter(fileContent);
      
      // Create JSON object
      const jsonData = {
        id: data.id || data.slug,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        imageUrl: data.imageUrl,
        category: data.category,
        categorySlug: data.categorySlug,
        author: data.author || 'Dr. Oz Health Team',
        date: data.date,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        schemaType: data.schemaType || 'general',
        reviewRating: data.reviewRating || 4.7,
        reviewCount: data.reviewCount || 128,
        content: content.trim()
      };
      
      // Write JSON file to public/articles/ (flat structure)
      const jsonFileName = file.replace('.md', '.json');
      const jsonFilePath = path.join(outputDir, jsonFileName);
      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');
      
      console.log(`   ✅ ${file} → ${jsonFileName}`);
      totalConverted++;
    } catch (error) {
      console.log(`   ❌ ${file} - Error: ${error.message}`);
    }
  });
});

console.log(`\n📊 Total converted: ${totalConverted} files`);
console.log(`📁 Location: public/articles/*.json`);
console.log(`\n💡 Next steps:`);
console.log(`   1. Update constants.ts to use JSON files`);
console.log(`   2. Update loadArticleContent to fetch JSON`);
console.log(`   3. Test in browser`);
console.log(`\n🎉 Conversion complete!`);
