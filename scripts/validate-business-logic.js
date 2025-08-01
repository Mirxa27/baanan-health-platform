#!/usr/bin/env node

/**
 * Business Logic Validation Script
 * 
 * This script validates the business logic consistency across the application
 * and reports any issues that need to be addressed.
 */

const fs = require('fs');
const path = require('path');

// Color codes for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Validation functions
function validateTranslationFiles() {
  log('\n📋 Validating Translation Files...', 'blue');
  
  const locales = ['en', 'ar'];
  const namespaces = ['common', 'home', 'about', 'halol', 'resources', 'consultancy', 'products', 'contact'];
  const issues = [];

  locales.forEach(locale => {
    namespaces.forEach(namespace => {
      const filePath = path.join(__dirname, '..', 'locales', locale, `${namespace}.json`);
      
      if (!fs.existsSync(filePath)) {
        issues.push(`Missing translation file: ${locale}/${namespace}.json`);
        return;
      }

      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Check for empty translations
        Object.entries(content).forEach(([key, value]) => {
          if (!value || value.trim() === '') {
            issues.push(`Empty translation in ${locale}/${namespace}.json: ${key}`);
          }
        });

        // Check for missing business-critical keys
        const criticalKeys = {
          'halol': ['medical_device_marketplace', 'equipment_rental_solutions', 'ai_health_analytics'],
          'consultancy': ['professional_healthcare_consulting', 'strategic_guidance'],
          'resources': ['healthcare_knowledge_hub']
        };

        if (criticalKeys[namespace]) {
          criticalKeys[namespace].forEach(key => {
            if (!content[key]) {
              issues.push(`Missing critical key in ${locale}/${namespace}.json: ${key}`);
            }
          });
        }

      } catch (error) {
        issues.push(`Invalid JSON in ${locale}/${namespace}.json: ${error.message}`);
      }
    });
  });

  if (issues.length === 0) {
    log('✅ All translation files are valid', 'green');
  } else {
    log(`❌ Found ${issues.length} translation issues:`, 'red');
    issues.forEach(issue => log(`  - ${issue}`, 'red'));
  }

  return issues;
}

function validateBusinessModel() {
  log('\n🏢 Validating Business Model...', 'blue');
  
  const issues = [];
  const warnings = [];

  // Check if business model file exists
  const businessModelPath = path.join(__dirname, '..', 'lib', 'business-model.ts');
  if (!fs.existsSync(businessModelPath)) {
    issues.push('Missing business-model.ts file');
    return { issues, warnings };
  }

  // Read and validate business model content
  const content = fs.readFileSync(businessModelPath, 'utf8');
  
  // Check for required exports
  const requiredExports = ['BUSINESS_SERVICES', 'COMPANY_MISSION', 'COMPANY_VISION', 'VALUE_PROPOSITIONS'];
  requiredExports.forEach(exportName => {
    if (!content.includes(`export const ${exportName}`)) {
      issues.push(`Missing required export: ${exportName}`);
    }
  });

  // Check for service categories
  const serviceCategories = ['marketplace', 'consulting', 'platform', 'support'];
  serviceCategories.forEach(category => {
    if (!content.includes(`'${category}'`)) {
      warnings.push(`Service category '${category}' might not be properly defined`);
    }
  });

  // Check for revenue models
  const revenueModels = ['commission', 'subscription', 'one-time', 'service-fee'];
  revenueModels.forEach(model => {
    if (!content.includes(`'${model}'`)) {
      warnings.push(`Revenue model '${model}' might not be used`);
    }
  });

  if (issues.length === 0) {
    log('✅ Business model structure is valid', 'green');
  } else {
    log(`❌ Found ${issues.length} business model issues:`, 'red');
    issues.forEach(issue => log(`  - ${issue}`, 'red'));
  }

  if (warnings.length > 0) {
    log(`⚠️  Found ${warnings.length} business model warnings:`, 'yellow');
    warnings.forEach(warning => log(`  - ${warning}`, 'yellow'));
  }

  return { issues, warnings };
}

function validateI18nConfiguration() {
  log('\n🌐 Validating i18n Configuration...', 'blue');
  
  const issues = [];
  const warnings = [];

  // Check i18n.js file
  const i18nPath = path.join(__dirname, '..', 'i18n.js');
  if (!fs.existsSync(i18nPath)) {
    issues.push('Missing i18n.js configuration file');
    return { issues, warnings };
  }

  const content = fs.readFileSync(i18nPath, 'utf8');

  // Check for required configurations
  const requiredConfigs = ['locales', 'defaultLocale', 'pages', 'loadLocaleFrom'];
  requiredConfigs.forEach(config => {
    if (!content.includes(config)) {
      issues.push(`Missing i18n configuration: ${config}`);
    }
  });

  // Check for supported locales
  if (!content.includes("'en'") || !content.includes("'ar'")) {
    issues.push('Missing required locales (en, ar)');
  }

  // Check lib/i18n.ts file
  const libI18nPath = path.join(__dirname, '..', 'lib', 'i18n.ts');
  if (!fs.existsSync(libI18nPath)) {
    issues.push('Missing lib/i18n.ts utility file');
  }

  if (issues.length === 0) {
    log('✅ i18n configuration is valid', 'green');
  } else {
    log(`❌ Found ${issues.length} i18n configuration issues:`, 'red');
    issues.forEach(issue => log(`  - ${issue}`, 'red'));
  }

  return { issues, warnings };
}

function validateNextConfig() {
  log('\n⚙️  Validating Next.js Configuration...', 'blue');
  
  const issues = [];
  const warnings = [];

  const configPath = path.join(__dirname, '..', 'next.config.ts');
  if (!fs.existsSync(configPath)) {
    issues.push('Missing next.config.ts file');
    return { issues, warnings };
  }

  const content = fs.readFileSync(configPath, 'utf8');

  // Check for production optimizations
  if (!content.includes('swcMinify')) {
    warnings.push('Consider enabling swcMinify for better performance');
  }

  if (!content.includes('compress')) {
    warnings.push('Consider enabling compression for better performance');
  }

  // Check for proper export configuration
  if (content.includes('output: "export"') && !content.includes('process.env.NODE_ENV')) {
    warnings.push('Static export should be conditional based on environment');
  }

  if (issues.length === 0) {
    log('✅ Next.js configuration is valid', 'green');
  } else {
    log(`❌ Found ${issues.length} Next.js configuration issues:`, 'red');
    issues.forEach(issue => log(`  - ${issue}`, 'red'));
  }

  if (warnings.length > 0) {
    log(`⚠️  Found ${warnings.length} Next.js configuration warnings:`, 'yellow');
    warnings.forEach(warning => log(`  - ${warning}`, 'yellow'));
  }

  return { issues, warnings };
}

// Main validation function
function runValidation() {
  log('🔍 Starting Business Logic Validation...', 'blue');
  log('=' .repeat(50), 'blue');

  const results = {
    translations: validateTranslationFiles(),
    businessModel: validateBusinessModel(),
    i18n: validateI18nConfiguration(),
    nextConfig: validateNextConfig()
  };

  // Summary
  log('\n📊 Validation Summary', 'blue');
  log('=' .repeat(30), 'blue');

  const totalIssues = results.translations.length + 
                     results.businessModel.issues.length + 
                     results.i18n.issues.length + 
                     results.nextConfig.issues.length;

  const totalWarnings = results.businessModel.warnings.length + 
                       results.i18n.warnings.length + 
                       results.nextConfig.warnings.length;

  if (totalIssues === 0) {
    log('🎉 All validations passed successfully!', 'green');
  } else {
    log(`❌ Found ${totalIssues} critical issues that need to be fixed`, 'red');
  }

  if (totalWarnings > 0) {
    log(`⚠️  Found ${totalWarnings} warnings for optimization`, 'yellow');
  }

  log(`\n📈 Validation completed with ${totalIssues} errors and ${totalWarnings} warnings`, 'blue');

  // Exit with error code if there are critical issues
  if (totalIssues > 0) {
    process.exit(1);
  }
}

// Run validation if script is executed directly
if (require.main === module) {
  runValidation();
}

module.exports = {
  validateTranslationFiles,
  validateBusinessModel,
  validateI18nConfiguration,
  validateNextConfig,
  runValidation
};