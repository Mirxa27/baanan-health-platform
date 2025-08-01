'use client';
import { useTranslation } from '../../hooks/useTranslation';
import Link from 'next/link';

export default function HalolShowcase() {
  const { t } = useTranslation('common');

  const features = [
    {
      icon: 'ri-search-line',
      title: t('browse_10000_devices'),
      description: t('device_catalog'),
      color: 'blue'
    },
    {
      icon: 'ri-secure-payment-line',
      title: t('secure_payments'),
      description: t('stripe_powered_checkout'),
      color: 'green'
    },
    {
      icon: 'ri-calendar-check-line',
      title: t('maintenance_scheduling'),
      description: t('professional_device_maintenance'),
      color: 'purple'
    },
    {
      icon: 'ri-customer-service-2-line',
      title: t('support_24_7'),
      description: t('ai_human_support_agents'),
      color: 'orange'
    }
  ];

  const stats = [
    { number: '10,000+', label: t('smart_medical_devices') },
    { number: '500+', label: t('healthcare_facilities') },
    { number: '24/7', label: t('customer_support') },
    { number: '99.9%', label: 'Uptime Guarantee' }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <i className="ri-hospital-line mr-2"></i>
            Halol Platform
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('comprehensive_medical_device_solution')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('comprehensive_healthcare_description')}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                <i className={`${feature.icon} text-2xl text-${feature.color}-600`}></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Platform Preview */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                {t('halol_platform_features')}
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <i className="ri-check-line text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('device_purchasing')}</h4>
                    <p className="text-gray-600 text-sm">{t('secure_online_purchasing')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <i className="ri-check-line text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('device_rental')}</h4>
                    <p className="text-gray-600 text-sm">{t('flexible_rental_options')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <i className="ri-check-line text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('maintenance_services')}</h4>
                    <p className="text-gray-600 text-sm">{t('scheduled_professional_maintenance')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <i className="ri-check-line text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('admin_dashboard')}</h4>
                    <p className="text-gray-600 text-sm">{t('comprehensive_analytics_management')}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/halol" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all text-center">
                  {t('download_halol_app')}
                </Link>
                <Link href="/about" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all text-center">
                  {t('learn_more')}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="absolute top-4 right-10 w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="absolute top-4 right-16 w-3 h-3 bg-red-400 rounded-full"></div>
                
                <div className="bg-white rounded-xl p-6 mb-4 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Device Dashboard</h4>
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="ri-hospital-line text-blue-600"></i>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Blood Pressure Monitor</span>
                      <span className="text-sm font-medium text-green-600">Available</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Pulse Oximeter</span>
                      <span className="text-sm font-medium text-green-600">Available</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Nebulizer Machine</span>
                      <span className="text-sm font-medium text-orange-600">Rented</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Recent Orders</h4>
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className="ri-shopping-bag-line text-green-600"></i>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Order #12345 - Delivered</div>
                    <div className="text-sm text-gray-600">Order #12346 - In Transit</div>
                    <div className="text-sm text-gray-600">Order #12347 - Processing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
