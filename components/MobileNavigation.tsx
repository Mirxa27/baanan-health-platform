'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslation } from '../hooks/useTranslation.simple';

export default function MobileNavigation() {
  const { t } = useTranslation('common');
  const { data: session } = useSession();
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

  const navigationItems = [
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
      name: 'Halol',
      href: session ? '/halol/dashboard' : '/halol',
      icon: 'ri-dashboard-line',
      activeIcon: 'ri-dashboard-fill'
    },
    {
      name: t('professional_healthcare_consulting'),
      href: '/consultancy',
      icon: 'ri-user-heart-line',
      activeIcon: 'ri-user-heart-fill'
    },
    {
      name: t('contact_title'),
      href: '/contact',
      icon: 'ri-phone-line',
      activeIcon: 'ri-phone-fill'
    }
  ];

  if (!isVisible) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href === '/halol' && pathname?.startsWith('/halol'));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <i className={`${isActive ? item.activeIcon : item.icon} text-xl`}></i>
              <span className="text-xs font-medium truncate px-1 max-w-full">
                {item.name.length > 8 ? item.name.substring(0, 6) + '...' : item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
