/**
 * Internationalization Configuration
 * 
 * This configuration ensures consistent i18n setup across the application
 * and supports both English and Arabic languages with proper RTL support.
 */

module.exports = {
  // Supported locales
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  
  // Page-specific namespace mappings
  // This ensures only necessary translations are loaded per page
  pages: {
    '*': ['common'], // Common translations loaded on all pages
    '/': ['home'],
    '/about': ['about'],
    '/halol': ['halol'],
    '/resources': ['resources'],
    '/consultancy': ['consultancy'],
    '/products': ['products'],
    '/contact': ['contact'],
    '/halol/auth/signin': ['signin'],
    '/halol/auth/signup': ['signup'],
    '/halol/dashboard': ['dashboard'],
    '/not-found': ['not-found'],
  },
  
  // Dynamic locale loading function
  loadLocaleFrom: (lang, ns) => {
    try {
      return import(`./locales/${lang}/${ns}.json`).then((m) => m.default || m);
    } catch (error) {
      console.warn(`Failed to load locale ${lang}/${ns}:`, error);
      // Fallback to English if Arabic translation fails
      if (lang !== 'en') {
        return import(`./locales/en/${ns}.json`).then((m) => m.default || m);
      }
      return Promise.resolve({});
    }
  },
  
  // Locale detection settings
  detection: {
    // Order of locale detection methods
    order: ['localStorage', 'navigator', 'htmlTag'],
    
    // Cache user language preference
    caches: ['localStorage'],
    
    // Exclude certain paths from locale detection
    excludeFromDetection: ['/api', '/_next', '/favicon.ico'],
  },
  
  // Interpolation settings
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  
  // Fallback settings
  fallbackLng: 'en',
  
  // Debug mode (disable in production)
  debug: process.env.NODE_ENV === 'development',
  
  // Namespace separator
  nsSeparator: ':',
  
  // Key separator for nested translations
  keySeparator: '.',
};