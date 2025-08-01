'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslation } from '../../hooks/useTranslation';

export default function HeroSection() {
  const { t } = useTranslation('common');
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div className="transform transition-all duration-1000 translate-x-0 opacity-100 animate-fade-in-left">
            <div className="mb-4 sm:mb-6">
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                {t('innovation_tag')}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {t('transforming_healthcare_title_part1')}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Medical Device</span>
              <br />Management
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-lg">
              {t('transforming_healthcare_description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
              <Link
                href="/halol"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:opacity-90 transition-all transform hover:scale-105 text-center cursor-pointer whitespace-nowrap"
              >
                {t('download_halol_app')}
              </Link>
              <Link
                href="/about"
                className="border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 text-center cursor-pointer whitespace-nowrap"
              >
                {t('learn_more')}
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">10K+</div>
                <div className="text-xs sm:text-sm text-gray-600">{t('smart_medical_devices')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">95%</div>
                <div className="text-xs sm:text-sm text-gray-600">{t('satisfaction_rate')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mb-1 sm:mb-2">24/7</div>
                <div className="text-xs sm:text-sm text-gray-600">{t('support_available')}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all cursor-pointer">
                <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-3 sm:mb-4">
                  <i className="ri-shopping-cart-line text-lg sm:text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">{t('purchase_medical_devices')}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{t('secure_online_purchasing')}</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all cursor-pointer">
                <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-3 sm:mb-4">
                  <i className="ri-refresh-line text-lg sm:text-2xl text-purple-600"></i>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">{t('rent_medical_devices')}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{t('flexible_rental_options')}</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all cursor-pointer">
                <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-3 sm:mb-4">
                  <i className="ri-tools-line text-lg sm:text-2xl text-green-600"></i>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">{t('maintenance_services')}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{t('scheduled_professional_maintenance')}</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all cursor-pointer">
                <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-orange-100 rounded-full mx-auto mb-3 sm:mb-4">
                  <i className="ri-customer-service-line text-lg sm:text-2xl text-orange-600"></i>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">{t('support_24_7')}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{t('ai_human_support_agents')}</p>
              </div>
            </div>
          </div>

          <div className="transform transition-all duration-1000 delay-300 translate-x-0 opacity-100 animate-fade-in-right">
            <div className="relative">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl blur opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Halol Platform</h3>
                  <p className="text-gray-600">{t('comprehensive_medical_device_solution')}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">Blood Pressure Monitor</span>
                    <span className="text-sm text-green-600">Available</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">Pulse Oximeter</span>
                    <span className="text-sm text-green-600">Available</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">Nebulizer Machine</span>
                    <span className="text-sm text-orange-600">Rented</span>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Link
                    href="/halol/dashboard"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-all"
                  >
                    <i className="ri-dashboard-line mr-2"></i>
                    {t('admin_dashboard')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
