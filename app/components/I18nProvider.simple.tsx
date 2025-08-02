'use client';

import React, { createContext, useState, useEffect } from 'react';
import { translations, type Locale, type Namespace } from '../../lib/translations';

export interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, namespace?: Namespace) => string;
  isRTL: boolean;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: React.ReactNode;
  initialLocale?: Locale;
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || 'en');

  // Set locale with persistence
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
      document.documentElement.lang = newLocale;
      document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';

      // Add body class for Arabic styling
      if (newLocale === 'ar') {
        document.body.classList.add('rtl', 'arabic');
        document.body.style.fontFamily = '"Tajawal", "Arial", sans-serif';
      } else {
        document.body.classList.remove('rtl', 'arabic');
        document.body.style.fontFamily = '';
      }
    }
  };

  // Translation function
  const t = (key: string, namespace: Namespace = 'common'): string => {
    const namespaceTranslations = translations[locale]?.[namespace];
    return namespaceTranslations?.[key as keyof typeof namespaceTranslations] || key;
  };

  // Initialize from localStorage on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as Locale;
      const browserLocale = navigator.language.split('-')[0] as Locale;
      const finalLocale = (savedLocale && (savedLocale === 'en' || savedLocale === 'ar')) 
        ? savedLocale 
        : (browserLocale === 'ar' ? 'ar' : 'en');

      if (finalLocale !== locale) {
        setLocale(finalLocale);
      } else {
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
      }
    }
  }, []);

  const contextValue: I18nContextType = {
    locale,
    setLocale,
    t,
    isRTL: locale === 'ar'
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}
