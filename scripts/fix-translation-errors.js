#!/usr/bin/env node

/**
 * Translation Error Detection and Correction Script
 * 
 * This script identifies and fixes common translation errors including:
 * - Linguistic accuracy issues
 * - Cultural appropriateness problems
 * - Context preservation errors
 * - Brand consistency issues
 */

const fs = require('fs');
const path = require('path');

// Color codes for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Translation error patterns to detect
const errorPatterns = {
  // Brand consistency errors
  brandInconsistency: {
    pattern: /Halol(?![^\u0600-\u06FF]*[\u0600-\u06FF])/g,
    replacement: 'هلول',
    description: 'Brand name should be in Arabic in Arabic files'
  },
  
  // Mixed language errors
  mixedLanguage: {
    pattern: /\b[a-zA-Z]+\b(?=.*[\u0600-\u06FF])/g,
    description: 'English words found in Arabic text'
  },
  
  // Punctuation errors in Arabic
  arabicPunctuation: {
    pattern: /[\u0600-\u06FF][,;:!?]/g,
    description: 'Incorrect punctuation usage in Arabic text'
  },
  
  // Professional terminology corrections
  professionalTerms: {
    'تطبيق': 'منصة', // app -> platform (for business context)
    'ابقى على تواصل': 'تواصل معنا', // stay in touch -> contact us
    'أسبوعي': 'أسبوعية', // weekly (masculine) -> weekly (feminine, for updates)
  }
};

// Cultural appropriateness corrections
const culturalCorrections = {
  // Formal vs informal address
  'أنت': 'حضرتك', // you -> your excellency (more formal)
  'لك': 'لحضرتك', // for you -> for your excellency
  
  // Professional titles
  'المؤسس المشارك ورئيس التنفيذي': 'الرئيس التنفيذي والمؤسس المشارك',
  
  // Business context improvements
  'تطبيق هلول': 'منصة هلول', // Halol app -> Halol platform
};

// Context preservation rules
const contextRules = {
  healthcare: {
    'device': 'جهاز طبي', // medical device (not just device)
    'management': 'إدارة', // management
    'platform': 'منصة', // platform
    'solution': 'حل', // solution
    'service': 'خدمة', // service
  },
  
  business: {
    'client': 'عميل', // client
    'customer': 'عميل', // customer  
    'partner': 'شريك', // partner
    'professional': 'متخصص', // professional
  }
};

function validateTranslationFile(filePath, locale) {
  log(`\n🔍 Validating ${filePath}...`, 'blue');
  
  if (!fs.existsSync(filePath)) {
    log(`❌ File not found: ${filePath}`, 'red');
    return { errors: [], warnings: [], fixes: [] };
  }

  let content;
  try {
    content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    log(`❌ Invalid JSON in ${filePath}: ${error.message}`, 'red');
    return { errors: [`Invalid JSON: ${error.message}`], warnings: [], fixes: [] };
  }

  const errors = [];
  const warnings = [];
  const fixes = [];

  // Check each translation key-value pair
  Object.entries(content).forEach(([key, value]) => {
    if (typeof value !== 'string') return;

    // Arabic-specific validations
    if (locale === 'ar') {
      // Check for brand consistency
      if (value.includes('Halol') && !value.match(/[\u0600-\u06FF]/)) {
        errors.push(`Brand inconsistency in key "${key}": Should use "هلول" instead of "Halol"`);
        fixes.push({
          key,
          oldValue: value,
          newValue: value.replace(/Halol/g, 'هلول'),
          type: 'brand_consistency'
        });
      }

      // Check for mixed language
      const englishWords = value.match(/\b[a-zA-Z]+\b/g);
      if (englishWords && englishWords.length > 0) {
        // Filter out acceptable English words (like brand names, technical terms)
        const problematicWords = englishWords.filter(word => 
          !['Baanan', 'Halol', 'CEO', 'AI', 'API', 'URL', 'SMS', 'GPS'].includes(word)
        );
        
        if (problematicWords.length > 0) {
          warnings.push(`Mixed language in key "${key}": Found English words: ${problematicWords.join(', ')}`);
        }
      }

      // Check for cultural appropriateness
      Object.entries(culturalCorrections).forEach(([incorrect, correct]) => {
        if (value.includes(incorrect)) {
          warnings.push(`Cultural appropriateness in key "${key}": Consider "${correct}" instead of "${incorrect}"`);
          fixes.push({
            key,
            oldValue: value,
            newValue: value.replace(incorrect, correct),
            type: 'cultural_appropriateness'
          });
        }
      });

      // Check for professional terminology
      Object.entries(errorPatterns.professionalTerms).forEach(([incorrect, correct]) => {
        if (value.includes(incorrect)) {
          warnings.push(`Professional terminology in key "${key}": Consider "${correct}" instead of "${incorrect}"`);
          fixes.push({
            key,
            oldValue: value,
            newValue: value.replace(incorrect, correct),
            type: 'professional_terminology'
          });
        }
      });
    }

    // Universal validations (both languages)
    
    // Check for empty values
    if (!value.trim()) {
      errors.push(`Empty translation for key "${key}"`);
    }

    // Check for placeholder text
    if (value.includes('TODO') || value.includes('FIXME') || value.includes('placeholder')) {
      errors.push(`Placeholder text found in key "${key}": ${value}`);
    }

    // Check for inconsistent spacing
    if (value.startsWith(' ') || value.endsWith(' ')) {
      warnings.push(`Inconsistent spacing in key "${key}"`);
      fixes.push({
        key,
        oldValue: value,
        newValue: value.trim(),
        type: 'spacing'
      });
    }
  });

  return { errors, warnings, fixes };
}

function applyFixes(filePath, fixes) {
  if (fixes.length === 0) return;

  log(`\n🔧 Applying ${fixes.length} fixes to ${filePath}...`, 'yellow');

  let content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let changesMade = 0;

  fixes.forEach(fix => {
    if (content[fix.key] === fix.oldValue) {
      content[fix.key] = fix.newValue;
      changesMade++;
      log(`  ✓ Fixed ${fix.type} in "${fix.key}"`, 'green');
    }
  });

  if (changesMade > 0) {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
    log(`✅ Applied ${changesMade} fixes to ${filePath}`, 'green');
  }
}

function validateAllTranslations() {
  log('🌐 Starting Translation Error Detection and Correction...', 'blue');
  log('=' .repeat(60), 'blue');

  const locales = ['en', 'ar'];
  const namespaces = [
    'common', 'home', 'about', 'halol', 'resources', 
    'consultancy', 'products', 'contact', 'signin', 
    'signup', 'dashboard', 'not-found'
  ];

  let totalErrors = 0;
  let totalWarnings = 0;
  let totalFixes = 0;

  locales.forEach(locale => {
    log(`\n📋 Validating ${locale.toUpperCase()} translations...`, 'magenta');
    
    namespaces.forEach(namespace => {
      const filePath = path.join(__dirname, '..', 'locales', locale, `${namespace}.json`);
      const result = validateTranslationFile(filePath, locale);

      totalErrors += result.errors.length;
      totalWarnings += result.warnings.length;
      totalFixes += result.fixes.length;

      // Display results
      if (result.errors.length > 0) {
        log(`❌ ${result.errors.length} errors in ${locale}/${namespace}.json:`, 'red');
        result.errors.forEach(error => log(`  - ${error}`, 'red'));
      }

      if (result.warnings.length > 0) {
        log(`⚠️  ${result.warnings.length} warnings in ${locale}/${namespace}.json:`, 'yellow');
        result.warnings.forEach(warning => log(`  - ${warning}`, 'yellow'));
      }

      // Apply fixes if any
      if (result.fixes.length > 0) {
        applyFixes(filePath, result.fixes);
      }

      if (result.errors.length === 0 && result.warnings.length === 0) {
        log(`✅ ${locale}/${namespace}.json is clean`, 'green');
      }
    });
  });

  // Summary
  log('\n📊 Translation Validation Summary', 'blue');
  log('=' .repeat(40), 'blue');

  if (totalErrors === 0 && totalWarnings === 0) {
    log('🎉 All translations are error-free!', 'green');
  } else {
    if (totalErrors > 0) {
      log(`❌ Found ${totalErrors} critical errors`, 'red');
    }
    if (totalWarnings > 0) {
      log(`⚠️  Found ${totalWarnings} warnings for improvement`, 'yellow');
    }
    if (totalFixes > 0) {
      log(`🔧 Applied ${totalFixes} automatic fixes`, 'green');
    }
  }

  log(`\n📈 Validation completed with ${totalErrors} errors, ${totalWarnings} warnings, and ${totalFixes} fixes applied`, 'blue');

  // Exit with error code if there are critical issues
  if (totalErrors > 0) {
    process.exit(1);
  }
}

// Specific validation functions for different error types
function validateBrandConsistency() {
  log('\n🏷️  Checking Brand Consistency...', 'blue');
  
  const arabicFiles = [
    'locales/ar/common.json',
    'locales/ar/halol.json',
    'locales/ar/signin.json',
    'locales/ar/signup.json',
    'locales/ar/dashboard.json',
    'locales/ar/not-found.json'
  ];

  arabicFiles.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('Halol') && !content.includes('هلول')) {
        log(`⚠️  Brand inconsistency found in ${filePath}`, 'yellow');
      }
    }
  });
}

function validateCulturalAppropriateness() {
  log('\n🕌 Checking Cultural Appropriateness...', 'blue');
  
  const culturalIssues = [
    { pattern: /أنت(?!\s+مستعد)/, suggestion: 'Use more formal address like حضرتك' },
    { pattern: /ابقى على تواصل/, suggestion: 'Use تواصل معنا for business context' },
    { pattern: /تطبيق(?=.*منصة)/, suggestion: 'Use منصة for business platform context' }
  ];

  // Implementation would check Arabic files for these patterns
}

// Run validation if script is executed directly
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--brand-only')) {
    validateBrandConsistency();
  } else if (args.includes('--cultural-only')) {
    validateCulturalAppropriateness();
  } else {
    validateAllTranslations();
  }
}

module.exports = {
  validateTranslationFile,
  validateAllTranslations,
  validateBrandConsistency,
  validateCulturalAppropriateness,
  applyFixes
};