const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '../public/articles');

console.log('🔧 Fixing category slugs...\n');

// Mapping of old slugs to new slugs
const slugMapping = {
  'nutrition': 'nutrition-diet',
  'fitness-exercise': 'fitness',
  'weight-loss': 'lifestyle-wellness' // lose-belly-fat-fast will go to lifestyle
};

// Read all JSON files
const files = fs.readdirSync(articlesDir).filter(file => file.endsWith('.json'));

let fixedCount = 0;

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(content);
  
  const oldSlug = data.categorySlug;
  
  // Check if slug needs to be fixed
  if (slugMapping[oldSlug]) {
    data.categorySlug = slugMapping[oldSlug];
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    
    console.log(`✅ ${file}: ${oldSlug} → ${data.categorySlug}`);
    fixedCount++;
  }
});

console.log(`\n📊 Fixed ${fixedCount} articles`);
console.log('✅ Done! Run: npm run generate-from-json');
