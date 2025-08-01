export type Locale = 'en' | 'ar';

export interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, namespace?: string) => string;
  isRTL: boolean;
}

export const locales: Locale[] = ['en', 'ar'];
export const defaultLocale: Locale = 'en';

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getDefaultLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  
  const browserLang = navigator.language.split('-')[0];
  return isValidLocale(browserLang) ? browserLang : defaultLocale;
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export async function loadTranslations(locale: Locale, namespace: string): Promise<Record<string, string>> {
  try {
    const translations = await import(`../locales/${locale}/${namespace}.json`);
    return translations.default || translations;
  } catch (error) {
    console.warn(`Failed to load translations for ${locale}/${namespace}:`, error);
    return {};
  }
}

// Page-specific namespace mapping
export const pageNamespaces: Record<string, string[]> = {
  '/': ['common', 'home'],
  '/about': ['common', 'about'],
  '/halol': ['common', 'halol'],
  '/resources': ['common', 'resources'],
  '/consultancy': ['common', 'consultancy'],
  '/products': ['common', 'products'],
  '/contact': ['common', 'contact'],
  '/halol/auth/signin': ['common', 'signin'],
  '/halol/auth/signup': ['common', 'signup'],
  '/halol/dashboard': ['common', 'dashboard'],
  '/not-found': ['common', 'not-found'],
};

export function getNamespacesForPage(pathname: string): string[] {
  return pageNamespaces[pathname] || ['common'];
}