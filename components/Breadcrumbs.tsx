'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '../hooks/useTranslation.simple';

interface BreadcrumbItem {
  name: string;
  href: string;
}

export default function Breadcrumbs() {
  const { t } = useTranslation('common');
  const pathname = usePathname();

  // Define route mappings for better breadcrumb names
  const routeMap: Record<string, string> = {
    '/': t('home'),
    '/about': t('about_us_title'),
    '/products': t('products_title'),
    '/consultancy': t('professional_healthcare_consulting'),
    '/resources': t('healthcare_knowledge_hub'),
    '/contact': t('contact_title'),
    '/halol': 'Halol Platform',
    '/halol/dashboard': 'Dashboard',
    '/halol/profile': 'Profile',
    '/halol/auth/signin': 'Sign In',
    '/halol/auth/signup': 'Sign Up',
  };

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: t('home'), href: '/' }
    ];

    let currentPath = '';
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Get custom name from route map or format the segment
      const name = routeMap[currentPath] || 
        segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      breadcrumbs.push({
        name,
        href: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs if only home is present
  if (breadcrumbs.length <= 1) return null;

  return (
    <div className="mt-16 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
          {breadcrumbs.map((item, index) => (
            <div key={item.href} className="flex items-center">
              {index > 0 && (
                <i className="ri-arrow-right-s-line text-gray-400 mx-2"></i>
              )}
              
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900 font-medium">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
