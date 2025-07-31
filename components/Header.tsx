
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const navItems = {
    en: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Products & Services', href: '/products' },
      { name: 'Halol App', href: '/halol' },
      { name: 'Consultancy', href: '/consultancy' },
      { name: 'Resources', href: '/resources' },
      { name: 'Contact', href: '/contact' }
    ],
    ar: [
      { name: 'الرئيسية', href: '/' },
      { name: 'عنا', href: '/about' },
      { name: 'المنتجات والخدمات', href: '/products' },
      { name: 'تطبيق حلول', href: '/halol' },
      { name: 'الاستشارات', href: '/consultancy' },
      { name: 'الموارد', href: '/resources' },
      { name: 'اتصل بنا', href: '/contact' }
    ]
  };

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
            {navItems[language].map((item) => (
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
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
            
            <Link
              href="/halol"
              className="hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
            >
              {language === 'en' ? 'Get Halol App' : 'حمل تطبيق حلول'}
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
              {navItems[language].map((item) => (
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
                {language === 'en' ? 'Get Halol App' : 'حمل تطبيق حلول'}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
