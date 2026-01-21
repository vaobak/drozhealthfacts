const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '../public/articles');

console.log('🔧 Converting all dates to readable format...\n');

// Correct date format (readable)
const correctDate = 'Jan 8, 2025';

// Read all JSON files
const files = fs.readdirSync(articlesDir).filter(file => file.endsWith('.json'));

let fixedCount = 0;

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(content);
  
  const oldDate = data.date;
  
  // Only update if date is different
  if (oldDate !== correctDate) {
    data.date = correctDate;
    
    // Write back to file with proper formatting
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    
    console.log(`✅ ${file}`);
    console.log(`   Old: "${oldDate}"`);
    console.log(`   New: "${correctDate}"\n`);
    
    fixedCount++;
  }
});

console.log(`📊 Fixed ${fixedCount} articles`);
console.log('✅ All dates now in readable format: Jan 8, 2025');
console.log('\n💡 Run: npm run generate-from-json');
