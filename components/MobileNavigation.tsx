'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslation } from '../hooks/useTranslation.simple';

export default function MobileNavigation() {
  const { t } = useTranslation('common');
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show mobile nav only on small screens
    const checkScreenSize = () => {
      setIsVisible(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Navigation items for visitors (not logged in)
  const visitorNavigationItems = [
    {
      name: t('home'),
      href: '/',
      icon: 'ri-home-4-line',
      activeIcon: 'ri-home-4-fill'
    },
    {
      name: t('products_title'),
      href: '/products',
      icon: 'ri-hospital-line',
      activeIcon: 'ri-hospital-fill'
    },
    {
      name: t('halol_platform'),
      href: '/halol',
      icon: 'ri-computer-line',
      activeIcon: 'ri-computer-fill'
    },
    {
      name: t('professional_healthcare_consulting'),
      href: '/consultancy',
      icon: 'ri-user-heart-line',
      activeIcon: 'ri-user-heart-fill'
    },
    {
      name: 'Contact',
      href: '/contact',
      icon: 'ri-phone-line',
      activeIcon: 'ri-phone-fill'
    }
  ];

  // Navigation items for logged-in customers
  const customerNavigationItems = [
    {
      name: 'Marketplace',
      href: '/halol/dashboard',
      icon: 'ri-store-2-line',
      activeIcon: 'ri-store-2-fill'
    },
    {
      name: 'Orders',
      href: '/halol/dashboard?tab=orders',
      icon: 'ri-shopping-cart-line',
      activeIcon: 'ri-shopping-cart-fill'
    },
    {
      name: 'Rentals',
      href: '/halol/dashboard?tab=rentals',
      icon: 'ri-refresh-line',
      activeIcon: 'ri-refresh-fill'
    },
    {
      name: 'Support',
      href: '/halol/dashboard?tab=support',
      icon: 'ri-customer-service-line',
      activeIcon: 'ri-customer-service-fill'
    },
    {
      name: 'Profile',
      href: '/halol/profile',
      icon: 'ri-user-line',
      activeIcon: 'ri-user-fill'
    }
  ];

  // Navigation items for admin users
  const adminNavigationItems = [
    {
      name: 'Dashboard',
      href: '/halol/dashboard',
      icon: 'ri-dashboard-line',
      activeIcon: 'ri-dashboard-fill'
    },
    {
      name: 'Orders',
      href: '/halol/dashboard?tab=orders',
      icon: 'ri-shopping-cart-line',
      activeIcon: 'ri-shopping-cart-fill'
    },
    {
      name: 'Analytics',
      href: '/halol/dashboard?tab=analytics',
      icon: 'ri-bar-chart-line',
      activeIcon: 'ri-bar-chart-fill'
    },
    {
      name: 'Admin',
      href: '/halol/dashboard?tab=admin',
      icon: 'ri-admin-line',
      activeIcon: 'ri-admin-fill'
    },
    {
      name: 'Profile',
      href: '/halol/profile',
      icon: 'ri-user-settings-line',
      activeIcon: 'ri-user-settings-fill'
    }
  ];

  // Determine which navigation items to show
  const getNavigationItems = () => {
    if (status === 'loading') {
      return visitorNavigationItems; // Show visitor nav while loading
    }

    if (!session) {
      return visitorNavigationItems;
    }

    if (session.user?.role === 'ADMIN') {
      return adminNavigationItems;
    }

    return customerNavigationItems;
  };

  const navigationItems = getNavigationItems();

  if (!isVisible) return null;

  const isActive = (item: any) => {
    if (item.href === '/' && pathname === '/') return true;
    if (item.href !== '/' && pathname?.startsWith(item.href.split('?')[0])) return true;
    
    // Special handling for dashboard tabs
    if (item.href.includes('?tab=') && pathname?.startsWith('/halol/dashboard')) {
      const urlParams = new URLSearchParams(window.location.search);
      const currentTab = urlParams.get('tab');
      const itemTab = new URLSearchParams(item.href.split('?')[1]).get('tab');
      return currentTab === itemTab || (!currentTab && itemTab === null);
    }
    
    return false;
  };

  return (
    <>
      {/* Glassmorphic Mobile Navigation */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50 safe-area-pb">
        <div className="relative">
          {/* Glassmorphic background with blur effect */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl"></div>

          {/* Navigation items */}
          <div className="relative grid grid-cols-5 h-16 px-2">
            {navigationItems.map((item, index) => {
              const active = isActive(item);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center relative group"
                >
                  {/* Active background */}
                  {active && (
                    <div className="absolute inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl backdrop-blur-sm border border-white/40"></div>
                  )}

                  {/* Icon container */}
                  <div className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                    active
                      ? 'transform scale-110'
                      : 'group-hover:scale-105 group-active:scale-95'
                  }`}>
                    {/* Icon with glow effect */}
                    <i className={`${active ? item.activeIcon : item.icon} text-xl transition-all duration-300 ${
                      active
                        ? 'text-white drop-shadow-lg'
                        : 'text-gray-700 group-hover:text-blue-600'
                    }`}></i>

                    {/* Active indicator dot */}
                    {active && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg animate-pulse"></div>
                    )}

                    {/* Hover ripple effect */}
                    <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                      !active ? 'group-hover:bg-white/20 group-active:bg-white/30' : ''
                    }`}></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Floating user indicator for logged-in users */}
      {session && (
        <div className="md:hidden fixed bottom-24 right-4 z-40">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 shadow-2xl"></div>
            <div className="relative flex items-center space-x-2 px-3 py-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">
                  {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                session.user?.role === 'ADMIN'
                  ? 'bg-purple-500/20 text-purple-700 border border-purple-400/30'
                  : 'bg-blue-500/20 text-blue-700 border border-blue-400/30'
              }`}>
                {session.user?.role}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {status === 'loading' && (
        <div className="md:hidden fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 shadow-2xl"></div>
            <div className="relative p-3">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
