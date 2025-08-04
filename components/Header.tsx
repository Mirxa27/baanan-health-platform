'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from '../hooks/useTranslation.simple';
import { LanguageSwitcher } from '../app/components/LanguageSwitcher';
import Breadcrumbs from './Breadcrumbs';

export default function Header() {
  const { t } = useTranslation('common');
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: t('home'), href: '/', description: 'Healthcare solutions homepage' },
    { name: t('about_us_title'), href: '/about', description: 'Learn about our company' },
    { name: t('products_title'), href: '/products', description: 'Medical device catalog' },
    { name: 'Halol Platform', href: '/halol/dashboard', description: 'Medical device marketplace' },
    { name: t('professional_healthcare_consulting'), href: '/consultancy', description: 'Expert healthcare consulting' },
    { name: t('healthcare_knowledge_hub'), href: '/resources', description: 'Healthcare resources and insights' },
    { name: t('contact_title'), href: '/contact', description: 'Get in touch with us' }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <img
                src="/baanan-logo.png"
                alt="Baanan Healthcare Solutions"
                className="w-auto object-contain transition-transform group-hover:scale-105"
                style={{
                  filter: 'brightness(1.1) contrast(1.1)',
                  imageRendering: 'crisp-edges',
                  height: '68px',
                  paddingTop: '1px',
                  margin: '24px 0 0 -3px'
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href === '/halol/dashboard' && pathname?.startsWith('/halol'));
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap relative group ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    aria-label={item.description}
                  >
                    {item.name}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher className="hidden md:block" />

              {/* Authentication Section */}
              {status === 'loading' ? (
                <div className="hidden md:block w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ) : session ? (
                <div className="hidden md:block relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 bg-white border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors shadow-sm"
                    aria-label="User menu"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium max-w-32 truncate">
                      {session.user?.name}
                    </span>
                    <i className={`ri-arrow-down-s-line transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}></i>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">{session.user?.name}</p>
                        <p className="text-sm text-gray-600">{session.user?.email}</p>
                        <span className={`inline-block px-3 py-1 text-xs rounded-full mt-2 font-medium ${
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
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <i className="ri-dashboard-line mr-3 text-blue-600"></i>
                          {t('dashboard')}
                        </Link>
                        <Link
                          href="/halol/dashboard?tab=orders"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <i className="ri-shopping-bag-line mr-3 text-green-600"></i>
                          {t('my_orders')}
                        </Link>
                        <Link
                          href="/halol/dashboard?tab=maintenance"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <i className="ri-tools-line mr-3 text-orange-600"></i>
                          {t('maintenance')}
                        </Link>
                        <Link
                          href="/halol/profile"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <i className="ri-user-settings-line mr-3 text-gray-600"></i>
                          Profile Settings
                        </Link>
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              signOut({ callbackUrl: '/' });
                            }}
                            className="flex items-center w-full px-4 py-3 text-sm text-red-700 hover:bg-red-50 transition-colors"
                          >
                            <i className="ri-logout-box-line mr-3"></i>
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
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
                  >
                    {t('sign_in')}
                  </Link>
                  <Link
                    href="/halol/auth/signup"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-all transform hover:scale-105 shadow-sm"
                  >
                    {t('sign_up')}
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <i className={`text-xl transition-transform ${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
              <nav className="py-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href === '/halol/dashboard' && pathname?.startsWith('/halol'));
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                        isActive 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                {/* Mobile Authentication Section */}
                {session ? (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3 px-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{session.user?.name}</p>
                        <p className="text-sm text-gray-500">{session.user?.role}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link
                        href="/halol/dashboard"
                        className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <i className="ri-dashboard-line mr-3"></i>
                        {t('dashboard')}
                      </Link>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          signOut({ callbackUrl: '/' });
                        }}
                        className="flex items-center w-full px-4 py-3 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors"
                      >
                        <i className="ri-logout-box-line mr-3"></i>
                        {t('sign_out')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
                    <Link
                      href="/halol/auth/signin"
                      className="block text-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('sign_in')}
                    </Link>
                    <Link
                      href="/halol/auth/signup"
                      className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('sign_up')}
                    </Link>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <LanguageSwitcher />
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Breadcrumbs - Only show on non-home pages */}
      {pathname !== '/' && <Breadcrumbs />}
    </>
  );
}
