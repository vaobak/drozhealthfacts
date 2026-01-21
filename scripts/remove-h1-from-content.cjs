const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '../public/articles');

// Get all JSON files
const files = fs.readdirSync(articlesDir).filter(file => file.endsWith('.json'));

console.log(`Found ${files.length} article files to process...\n`);

let processedCount = 0;
let skippedCount = 0;

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  
  try {
    // Read JSON file
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (!jsonData.content) {
      console.log(`⚠️  Skipped ${file}: No content field`);
      skippedCount++;
      return;
    }
    
    // Remove first H1 heading from content
    // Pattern: # Title followed by \r\n\r\n or \n\n
    const originalContent = jsonData.content;
    
    // Remove H1 (# Title) and the following blank lines
    const updatedContent = originalContent
      .replace(/^#\s+[^\r\n]+(\r\n|\n){2,}/, '') // Remove H1 + blank lines
      .trim();
    
    // Check if content was modified
    if (originalContent !== updatedContent) {
      jsonData.content = updatedContent;
      
      // Write back to file with proper formatting
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
      
      console.log(`✅ Processed: ${file}`);
      console.log(`   - Removed H1 heading from content`);
      console.log(`   - Old length: ${originalContent.length} chars`);
      console.log(`   - New length: ${updatedContent.length} chars\n`);
      
      processedCount++;
    } else {
      console.log(`⏭️  Skipped ${file}: No H1 found at start of content\n`);
      skippedCount++;
    }
    
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
    skippedCount++;
  }
});

console.log('\n' + '='.repeat(60));
console.log('SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Successfully processed: ${processedCount} files`);
console.log(`⏭️  Skipped: ${skippedCount} files`);
console.log(`📁 Total files: ${files.length}`);
console.log('\n✨ H1 removal complete! Your articles now have better SEO structure.');
console.log('💡 Each article will use only the <h1> tag from ArticleDetail.tsx');
