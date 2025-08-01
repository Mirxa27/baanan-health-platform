#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌐 Validating translations across the application...\n');

// Get all translation files
const localesDir = path.join(__dirname, '../locales');
const languages = ['en', 'ar'];
const translationFiles = [
  'common.json',
  'home.json',
  'about.json',
  'products.json',
  'consultancy.json',
  'contact.json',
  'resources.json',
  'halol.json',
  'dashboard.json',
  'signin.json',
  'signup.json',
  'profile.json',
  'notifications.json',
  'errors.json',
  'not-found.json'
];

console.log('📊 Translation Coverage Report:');
console.log('================================\n');

let totalKeys = 0;
let translatedKeys = 0;
const missingTranslations = [];

// Check each translation file
for (const file of translationFiles) {
  console.log(`📁 ${file}:`);
  
  const enPath = path.join(localesDir, 'en', file);
  const arPath = path.join(localesDir, 'ar', file);
  
  if (!fs.existsSync(enPath)) {
    console.log(`   ❌ English file missing: ${file}`);
    continue;
  }
  
  if (!fs.existsSync(arPath)) {
    console.log(`   ❌ Arabic file missing: ${file}`);
    continue;
  }
  
  try {
    const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));
    
    const enKeys = Object.keys(enData);
    const arKeys = Object.keys(arData);
    
    totalKeys += enKeys.length;
    
    // Check for missing Arabic translations
    const missingInArabic = enKeys.filter(key => !arKeys.includes(key));
    const missingInEnglish = arKeys.filter(key => !enKeys.includes(key));
    
    if (missingInArabic.length === 0 && missingInEnglish.length === 0) {
      console.log(`   ✅ Complete (${enKeys.length} keys)`);
      translatedKeys += enKeys.length;
    } else {
      console.log(`   ⚠️  Partial (${enKeys.length - missingInArabic.length}/${enKeys.length} keys)`);
      translatedKeys += (enKeys.length - missingInArabic.length);
      
      if (missingInArabic.length > 0) {
        console.log(`      Missing Arabic keys: ${missingInArabic.join(', ')}`);
        missingTranslations.push(...missingInArabic.map(key => `${file}:${key} (Arabic)`));
      }
      
      if (missingInEnglish.length > 0) {
        console.log(`      Missing English keys: ${missingInEnglish.join(', ')}`);
        missingTranslations.push(...missingInEnglish.map(key => `${file}:${key} (English)`));
      }
    }
  } catch (error) {
    console.log(`   ❌ Error reading file: ${error.message}`);
  }
  
  console.log('');
}

// Overall statistics
const completionPercentage = Math.round((translatedKeys / totalKeys) * 100);

console.log('\n📈 Summary:');
console.log('==========');
console.log(`Total translation keys: ${totalKeys}`);
console.log(`Translated keys: ${translatedKeys}`);
console.log(`Missing translations: ${missingTranslations.length}`);
console.log(`Completion rate: ${completionPercentage}%\n`);

if (completionPercentage >= 95) {
  console.log('🎉 Excellent! Translation coverage is very high.');
} else if (completionPercentage >= 80) {
  console.log('👍 Good translation coverage. A few missing translations remain.');
} else {
  console.log('⚠️  Translation coverage needs improvement.');
}

// Check for hardcoded strings in React components
console.log('\n🔍 Checking for potential hardcoded strings...\n');

const componentDirs = [
  'app',
  'components'
];

let potentialHardcodedStrings = [];

function scanDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      scanDirectory(fullPath);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Look for potential hardcoded strings (very basic check)
      const hardcodedMatches = content.match(/[>]{1}[^<]*[a-zA-Z]{3,}[^<]*[<]/g);
      if (hardcodedMatches) {
        const filtered = hardcodedMatches
          .filter(match => 
            !match.includes('className') && 
            !match.includes('useState') &&
            !match.includes('useEffect') &&
            !match.includes('console.') &&
            !match.includes('ri-') &&
            !match.includes('t(') &&
            match.length > 5 &&
            /[a-zA-Z]/.test(match)
          )
          .map(match => match.replace(/[><]/g, '').trim())
          .filter(str => str.length > 2 && !str.startsWith('{') && !str.includes('='));
        
        if (filtered.length > 0) {
          potentialHardcodedStrings.push({
            file: fullPath.replace(__dirname + '/../', ''),
            strings: filtered.slice(0, 3) // Limit to first 3 to avoid noise
          });
        }
      }
    }
  }
}

for (const dir of componentDirs) {
  const fullDir = path.join(__dirname, '..', dir);
  if (fs.existsSync(fullDir)) {
    scanDirectory(fullDir);
  }
}

if (potentialHardcodedStrings.length > 0) {
  console.log('⚠️  Potential hardcoded strings found:');
  potentialHardcodedStrings.slice(0, 10).forEach(item => {
    console.log(`   📄 ${item.file}: ${item.strings.join(', ')}`);
  });
  if (potentialHardcodedStrings.length > 10) {
    console.log(`   ... and ${potentialHardcodedStrings.length - 10} more files`);
  }
} else {
  console.log('✅ No obvious hardcoded strings detected.');
}

console.log('\n🎯 Recommendations:');
console.log('==================');

if (missingTranslations.length > 0) {
  console.log('1. Complete missing translations:');
  missingTranslations.slice(0, 5).forEach(item => {
    console.log(`   - ${item}`);
  });
  if (missingTranslations.length > 5) {
    console.log(`   ... and ${missingTranslations.length - 5} more`);
  }
}

console.log('2. Test translation switching in the application');
console.log('3. Verify right-to-left (RTL) layout for Arabic');
console.log('4. Check date/number formatting for different locales');
console.log('5. Validate translation context and accuracy');

console.log('\n✨ Translation validation complete!\n');
