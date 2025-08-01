
'use client';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

export default function NotFound() {
  const { t } = useTranslation('not-found'); // Assuming 'not-found' namespace for this page

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t('page_not_found')}
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          {t('page_not_found_description')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            {t('back_to_home')}
          </Link>
          
          <Link
            href="/halol"
            className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            {t('explore_halol_app')}
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/products" className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-lg transition-all cursor-pointer">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <i className="ri-heart-pulse-line text-2xl text-blue-600"></i>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('products_title')}</h3>
            <p className="text-sm text-gray-600">{t('smart_medical_devices')}</p>
          </Link>
          
          <Link href="/about" className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-lg transition-all cursor-pointer">
            <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
              <i className="ri-team-line text-2xl text-purple-600"></i>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('about_us_title')}</h3>
            <p className="text-sm text-gray-600">{t('our_mission_team')}</p>
          </Link>
          
          <Link href="/contact" className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-lg transition-all cursor-pointer">
            <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <i className="ri-customer-service-line text-2xl text-green-600"></i>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('contact_title')}</h3>
            <p className="text-sm text-gray-600">{t('get_in_touch')}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
