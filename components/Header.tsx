'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from '../hooks/useTranslation';
import { LanguageSwitcher } from '../app/components/LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navItems = [
    { name: t('home'), href: '/' },
    { name: t('about_us_title'), href: '/about' },
    { name: t('products_title'), href: '/products' },
    { name: 'Halol Platform', href: '/halol' },
    { name: t('professional_healthcare_consulting'), href: '/consultancy' },
    { name: t('healthcare_knowledge_hub'), href: '/resources' },
    { name: t('contact_title'), href: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center cursor-pointer">
            <img
              src="/baanan-logo.png"
              alt="Baanan Logo"
              className="h-10 w-auto object-contain object-left"
              style={{
                filter: 'brightness(1.1) contrast(1.1)',
                imageRendering: 'crisp-edges'
              }}
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher className="hidden md:block" />
            
            <Link
              href="/halol"
              className="hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
            >
              {t('halol_platform')}
            </Link>

            <button
              className="lg:hidden w-6 h-6 flex items-center justify-center cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className="ri-menu-line text-xl"></i>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-3 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/halol"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium text-center mt-4 cursor-pointer whitespace-nowrap"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('halol_platform')}
              </Link>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
