import enCommon from '../locales/en/common.json';
import enHome from '../locales/en/home.json';
import enAbout from '../locales/en/about.json';
import enHalol from '../locales/en/halol.json';
import enProducts from '../locales/en/products.json';
import enConsultancy from '../locales/en/consultancy.json';
import enContact from '../locales/en/contact.json';
import enResources from '../locales/en/resources.json';
import enSignin from '../locales/en/signin.json';
import enSignup from '../locales/en/signup.json';
import enDashboard from '../locales/en/dashboard.json';
import enNotFound from '../locales/en/not-found.json';

import arCommon from '../locales/ar/common.json';
import arHome from '../locales/ar/home.json';
import arAbout from '../locales/ar/about.json';
import arHalol from '../locales/ar/halol.json';
import arProducts from '../locales/ar/products.json';
import arConsultancy from '../locales/ar/consultancy.json';
import arContact from '../locales/ar/contact.json';
import arResources from '../locales/ar/resources.json';
import arSignin from '../locales/ar/signin.json';
import arSignup from '../locales/ar/signup.json';
import arDashboard from '../locales/ar/dashboard.json';
import arNotFound from '../locales/ar/not-found.json';

export const translations = {
  en: {
    common: enCommon,
    home: enHome,
    about: enAbout,
    halol: enHalol,
    products: enProducts,
    consultancy: enConsultancy,
    contact: enContact,
    resources: enResources,
    signin: enSignin,
    signup: enSignup,
    dashboard: enDashboard,
    'not-found': enNotFound
  },
  ar: {
    common: arCommon,
    home: arHome,
    about: arAbout,
    halol: arHalol,
    products: arProducts,
    consultancy: arConsultancy,
    contact: arContact,
    resources: arResources,
    signin: arSignin,
    signup: arSignup,
    dashboard: arDashboard,
    'not-found': arNotFound
  }
};

export type Locale = 'en' | 'ar';
export type Namespace = keyof typeof translations.en;

export function getTranslation(locale: Locale, namespace: Namespace, key: string): string {
  const namespaceTranslations = translations[locale]?.[namespace];
  return namespaceTranslations?.[key as keyof typeof namespaceTranslations] || key;
}

export function getTranslations(locale: Locale, namespace: Namespace): Record<string, string> {
  return translations[locale]?.[namespace] || {};
}
