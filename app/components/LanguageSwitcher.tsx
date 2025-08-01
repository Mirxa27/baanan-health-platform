'use client';

import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useRouter, usePathname } from 'next/navigation';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useTranslation('common');
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    setLocale(newLocale);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors ${className}`}
      aria-label={`Switch to ${locale === 'en' ? 'Arabic' : 'English'}`}
    >
      <span className="text-sm font-medium">
        {locale === 'en' ? 'العربية' : 'English'}
      </span>
      <i className="ri-translate-2 text-lg"></i>
    </button>
  );
}

export function LanguageDropdown({ className = '' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useTranslation('common');
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
  ];

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale as 'en' | 'ar');
  };

  return (
    <div className={`relative ${className}`}>
      <select
        value={locale}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.nativeName}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <i className="ri-arrow-down-s-line text-gray-400"></i>
      </div>
    </div>
  );
}
