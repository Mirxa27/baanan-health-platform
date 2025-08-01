'use client';
import { useTranslation } from '../../hooks/useTranslation.simple';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export default function ArabicTestPage() {
  const { t, locale, isRTL } = useTranslation('common');
  const { t: aboutT } = useTranslation('about');

  return (
    <div className={`min-h-screen p-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">
            Arabic Language Test Page
          </h1>
          <p className="text-gray-600 mb-4">
            Current Language: <strong>{locale}</strong> | RTL: {isRTL ? 'Yes' : 'No'}
          </p>
          <LanguageSwitcher />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Common Translations */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-600">Common Translations</h2>
            <div className="space-y-2">
              <p><strong>Home:</strong> {t('home')}</p>
              <p><strong>About Us:</strong> {t('about_us')}</p>
              <p><strong>Products:</strong> {t('products')}</p>
              <p><strong>Contact:</strong> {t('contact_us')}</p>
              <p><strong>Get Started:</strong> {t('get_started')}</p>
              <p><strong>Learn More:</strong> {t('learn_more')}</p>
              <p><strong>Download App:</strong> {t('download_halol_app')}</p>
              <p><strong>Smart Devices:</strong> {t('smart_devices')}</p>
              <p><strong>AI Analytics:</strong> {t('ai_analytics')}</p>
              <p><strong>Support Available:</strong> {t('support_available')}</p>
            </div>
          </div>

          {/* About Page Translations */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-purple-600">About Page Translations</h2>
            <div className="space-y-2">
              <p><strong>Leadership Team:</strong> {aboutT('leadership_title')} {aboutT('team')}</p>
              <p><strong>CEO:</strong> {aboutT('ceo_name')}</p>
              <p><strong>CEO Title:</strong> {aboutT('ceo_title')}</p>
              <p><strong>CTO:</strong> {aboutT('cto_name')}</p>
              <p><strong>CTO Title:</strong> {aboutT('cto_title')}</p>
              <p><strong>CMO:</strong> {aboutT('cmo_name')}</p>
              <p><strong>CMO Title:</strong> {aboutT('cmo_title')}</p>
              <p><strong>COO:</strong> {aboutT('coo_name')}</p>
              <p><strong>COO Title:</strong> {aboutT('coo_title')}</p>
            </div>
          </div>

          {/* Healthcare Content */}
          <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-green-600">Healthcare Content</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{t('transforming_healthcare_title_part1')} {t('transforming_healthcare_title_part2')} {t('transforming_healthcare_title_part3')}</h3>
                <p className="text-gray-600">{t('transforming_healthcare_description')}</p>
              </div>
              <div>
                <h3 className="font-semibold">{aboutT('vision_title')}</h3>
                <p className="text-gray-600">{aboutT('vision_description')}</p>
              </div>
              <div>
                <h3 className="font-semibold">{aboutT('mission_title')}</h3>
                <p className="text-gray-600">{aboutT('mission_description')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Translation System Status</h3>
            <p>Current Locale: <code className="bg-white px-2 py-1 rounded">{locale}</code></p>
            <p>RTL Mode: <code className="bg-white px-2 py-1 rounded">{isRTL ? 'Active' : 'Inactive'}</code></p>
            <p>Body Direction: <code className="bg-white px-2 py-1 rounded">{typeof window !== 'undefined' ? document.documentElement.dir : 'N/A'}</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
