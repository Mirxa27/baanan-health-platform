'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '../../hooks/useTranslation.simple';

export default function HeroSection() {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.1), rgba(147, 51, 234, 0.1)), url('https://readdy.ai/api/search-image?query=modern%20healthcare%20technology%20innovation%20laboratory%20with%20advanced%20medical%20equipment%2C%20clean%20minimalist%20environment%2C%20soft%20blue%20and%20purple%20lighting%2C%20professional%20medical%20setting%20with%20holistic%20wellness%20atmosphere%2C%20futuristic%20design%20elements%2C%20pristine%20white%20background%20blending%20seamlessly%20with%20technology&width=1920&height=1080&seq=baanan-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/90 to-purple-50/80"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="mb-4 sm:mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium mb-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <i className="ri-lightbulb-line mr-2"></i>
                {t('innovation_tag')}
              </span>
            </div>

            <h1 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {t('transforming_healthcare_title_part1')}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x"> {t('transforming_healthcare_title_part2')}</span>
              <br />
              <span className="text-gray-700">{t('transforming_healthcare_title_part3')}</span>
            </h1>

            <p className={`text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-lg transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {t('transforming_healthcare_description')}
            </p>

            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link
                href="/halol"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-1 text-center cursor-pointer whitespace-nowrap relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <i className="ri-rocket-line mr-2"></i>
                  {t('download_halol_app')}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
              <Link
                href="/products"
                className="border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl text-center cursor-pointer whitespace-nowrap relative overflow-hidden group"
              >
                <span className="flex items-center justify-center">
                  <i className="ri-search-line mr-2"></i>
                  {t('explore_products')}</span>
              </Link>
            </div>

            <div className={`grid grid-cols-3 gap-4 sm:gap-8 transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="text-center group">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 hover:shadow-xl transition-all transform hover:scale-105 group-hover:bg-blue-50">
                  <i className="ri-user-heart-line text-2xl text-blue-600 mb-2"></i>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">50K+</div>
                  <div className="text-xs sm:text-sm text-gray-600">{t('active_users')}</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 hover:shadow-xl transition-all transform hover:scale-105 group-hover:bg-purple-50">
                  <i className="ri-heart-pulse-line text-2xl text-purple-600 mb-2"></i>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">95%</div>
                  <div className="text-xs sm:text-sm text-gray-600">{t('satisfaction_rate')}</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 hover:shadow-xl transition-all transform hover:scale-105 group-hover:bg-green-50">
                  <i className="ri-customer-service-2-line text-2xl text-green-600 mb-2"></i>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mb-1 sm:mb-2">24/7</div>
                  <div className="text-xs sm:text-sm text-gray-600">{t('support_available')}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="transform transition-all duration-1000 delay-300 translate-x-0 opacity-100 animate-fade-in-right">
            <div className="relative">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl blur opacity-20 animate-pulse"></div>
              <div className="relative bg-white/20 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/30">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all cursor-pointer">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-3 sm:mb-4">
                      <i className="ri-smartphone-line text-lg sm:text-2xl text-blue-600"></i>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">{t('smart_devices')}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{t('ai_powered_health_monitoring')}</p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all cursor-pointer">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-3 sm:mb-4">
                      <i className="ri-brain-line text-lg sm:text-2xl text-purple-600"></i>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">{t('ai_analytics')}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{t('intelligent_health_insights')}</p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all cursor-pointer">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-3 sm:mb-4">
                      <i className="ri-heart-pulse-line text-lg sm:text-2xl text-green-600"></i>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">{t('telehealth')}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{t('remote_consultations')}</p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all cursor-pointer">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-orange-100 rounded-full mx-auto mb-3 sm:mb-4">
                      <i className="ri-robot-line text-lg sm:text-2xl text-orange-600"></i>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">{t('robotics')}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{t('automated_physiotherapy')}</p>
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
