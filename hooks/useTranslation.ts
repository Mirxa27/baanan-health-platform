import { useContext } from 'react';
import { I18nContext } from '../app/components/I18nProvider';
import { I18nContextType } from '../lib/i18n';

/**
 * Custom hook for accessing translations and i18n functionality
 * 
 * @param namespace Optional namespace for translations (defaults to 'common')
 * @returns Object containing locale, translation function, setLocale function, and RTL status
 */
export function useTranslation(namespace: string = 'common') {
  const context = useContext(I18nContext);
  
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  
  const { locale, setLocale, t, isRTL } = context;
  
  // Create a namespaced translation function
  const translate = (key: string): string => {
    return t(key, namespace);
  };
  
  return {
    locale,
    t: translate,
    setLocale,
    isRTL
  };
}

export default useTranslation;