'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from '../hooks/useTranslation';
import { LanguageSwitcher } from '../app/components/LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation('common');
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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

            {/* Authentication Section */}
            {status === 'loading' ? (
              <div className="hidden md:block w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : session ? (
              <div className="hidden md:block relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-white border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">{session.user?.name}</span>
                  <i className={`ri-arrow-down-s-line transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{session.user?.name}</p>
                      <p className="text-sm text-gray-500">{session.user?.email}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                        session.user?.role === 'ADMIN'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {session.user?.role}
                      </span>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/halol/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <i className="ri-dashboard-line mr-2"></i>
                        {t('dashboard')}
                      </Link>
                      <Link
                        href="/halol/dashboard?tab=orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <i className="ri-shopping-bag-line mr-2"></i>
                        {t('my_orders')}
                      </Link>
                      <Link
                        href="/halol/dashboard?tab=maintenance"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <i className="ri-tools-line mr-2"></i>
                        {t('maintenance')}
                      </Link>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            signOut({ callbackUrl: '/' });
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
                        >
                          <i className="ri-logout-box-line mr-2"></i>
                          {t('sign_out')}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  href="/halol/auth/signin"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer"
                >
                  {t('sign_in')}
                </Link>
                <Link
                  href="/halol/auth/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
                >
                  {t('sign_up')}
                </Link>
              </div>
            )}

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

              {/* Mobile Authentication Section */}
              {session ? (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{session.user?.name}</p>
                      <p className="text-sm text-gray-500">{session.user?.role}</p>
                    </div>
                  </div>
                  <Link
                    href="/halol/dashboard"
                    className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium text-center mb-3 cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="ri-dashboard-line mr-2"></i>
                    {t('dashboard')}
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="block w-full text-center px-6 py-2 border border-red-300 text-red-700 rounded-full font-medium hover:bg-red-50 transition-colors"
                  >
                    <i className="ri-logout-box-line mr-2"></i>
                    {t('sign_out')}
                  </button>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                  <Link
                    href="/halol/auth/signin"
                    className="block text-center px-6 py-2 border border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('sign_in')}
                  </Link>
                  <Link
                    href="/halol/auth/signup"
                    className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium text-center cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('sign_up')}
                  </Link>
                </div>
              )}

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
