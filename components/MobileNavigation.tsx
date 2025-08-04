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
      name: 'Products',
      href: '/products',
      icon: 'ri-hospital-line',
      activeIcon: 'ri-hospital-fill'
    },
    {
      name: 'Platform',
      href: '/halol',
      icon: 'ri-computer-line',
      activeIcon: 'ri-computer-fill'
    },
    {
      name: 'Consulting',
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg safe-area-pb">
      <div className="grid grid-cols-5 h-16">
        {navigationItems.map((item) => {
          const active = isActive(item);
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                active 
                  ? 'text-blue-600 bg-blue-50 transform scale-105' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50 active:scale-95'
              }`}
            >
              <div className="relative">
                <i className={`${active ? item.activeIcon : item.icon} text-xl`}></i>
                {active && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                )}
              </div>
              <span className="text-xs font-medium truncate px-1 max-w-full">
                {item.name.length > 8 ? item.name.substring(0, 6) + '...' : item.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Authentication indicator for logged-in users */}
      {session && (
        <div className="absolute -top-12 right-4 bg-white rounded-full shadow-lg p-2 border border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">
                {session.user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="hidden sm:block">
              <span className={`text-xs px-2 py-1 rounded-full ${
                session.user?.role === 'ADMIN'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {session.user?.role}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {status === 'loading' && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg p-2 border border-gray-200">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </nav>
  );
}
