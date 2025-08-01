'use client';

import React, { createContext, useState, useEffect } from 'react';
import { Locale, I18nContextType, loadTranslations, getDefaultLocale, getDirection, isValidLocale } from '../../lib/i18n';

// Create context locally to avoid circular imports
const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
    children: React.ReactNode;
    initialLocale?: Locale;
}

// Translation cache
const translationCache = new Map<string, Record<string, string>>();

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
    const [locale, setLocaleState] = useState<Locale>(initialLocale || 'en');
    const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});
    const [isLoading, setIsLoading] = useState(true);

    // Load translations for a specific namespace
    const loadNamespaceTranslations = async (currentLocale: Locale, namespace: string) => {
        const cacheKey = `${currentLocale}-${namespace}`;

        if (translationCache.has(cacheKey)) {
            return translationCache.get(cacheKey)!;
        }

        const namespaceTranslations = await loadTranslations(currentLocale, namespace);
        translationCache.set(cacheKey, namespaceTranslations);
        return namespaceTranslations;
    };

    // Initialize translations
    useEffect(() => {
        const initTranslations = async () => {
            setIsLoading(true);
            try {
                // Load common translations by default
                const commonTranslations = await loadNamespaceTranslations(locale, 'common');
                setTranslations({
                    common: commonTranslations
                });
            } catch (error) {
                console.error('Failed to load initial translations:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initTranslations();
    }, [locale]);

    // Set locale with persistence
    const setLocale = (newLocale: Locale) => {
        if (isValidLocale(newLocale)) {
            setLocaleState(newLocale);
            if (typeof window !== 'undefined') {
                localStorage.setItem('locale', newLocale);
                document.documentElement.lang = newLocale;
                document.documentElement.dir = getDirection(newLocale);
            }
        }
    };

    // Translation function
    const t = (key: string, namespace: string = 'common'): string => {
        const namespaceTranslations = translations[namespace];
        if (!namespaceTranslations) {
            // Load the namespace if not loaded
            loadNamespaceTranslations(locale, namespace).then((newTranslations) => {
                setTranslations(prev => ({
                    ...prev,
                    [namespace]: newTranslations
                }));
            });
            return key; // Return key as fallback
        }

        return namespaceTranslations[key] || key;
    };

    // Initialize from localStorage on client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLocale = localStorage.getItem('locale');
            const browserLocale = getDefaultLocale();
            const finalLocale = (savedLocale && isValidLocale(savedLocale)) ? savedLocale as Locale : browserLocale;

            if (finalLocale !== locale) {
                setLocale(finalLocale);
            } else {
                document.documentElement.lang = locale;
                document.documentElement.dir = getDirection(locale);
            }
        }
    }, []);

    const contextValue: I18nContextType = {
        locale,
        setLocale,
        t,
        isRTL: getDirection(locale) === 'rtl'
    };

    if (isLoading) {
        return <div>Loading translations...</div>;
    }

    return (
        <I18nContext.Provider value={contextValue}>
            {children}
        </I18nContext.Provider>
    );
}

// Export the context for use in the hook
export { I18nContext };