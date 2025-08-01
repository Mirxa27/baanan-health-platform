import { useContext } from 'react';
import { I18nContext, type I18nContextType } from '../app/components/I18nProvider.simple';
import { type Namespace } from '../lib/translations';

export function useTranslation(namespace: Namespace = 'common') {
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
