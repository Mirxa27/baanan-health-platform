'use client';
import Link from 'next/link';
import { useTranslation } from '../../hooks/useTranslation.simple';

export default function DownloadSection() {
  const { t } = useTranslation('halol'); // Assuming 'halol' namespace for this component

  const downloadOptions = [
    {
      platform: t('ios_app_store'),
      description: t('download_for_iphone_ipad'),
      icon: 'ri-apple-line',
      color: 'bg-gray-900 hover:bg-gray-800',
      subtitle: t('download_on_the')
    },
    {
      platform: t('google_play'),
      description: t('download_for_android_devices'),
      icon: 'ri-google-play-line',
      color: 'bg-gray-900 hover:bg-gray-800',
      subtitle: t('get_it_on')
    },
    {
      platform: t('web_portal'),
      description: t('access_via_web_browser'),
      icon: 'ri-global-line',
      color: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90',
      subtitle: t('access_via')
    }
  ];

  const features = [
    {
      title: t('free_to_download'),
      description: t('start_using_halol_no_cost'),
      icon: 'ri-download-line'
    },
    {
      title: t('secure_platform'),
      description: t('hipaa_compliant_encrypted'),
      icon: 'ri-shield-check-line'
    },
    {
      title: t('support_24_7_short'),
      description: t('round_the_clock_assistance'),
      icon: 'ri-customer-service-line'
    },
    {
      title: t('regular_updates'),
      description: t('new_features_added_monthly'),
      icon: 'ri-refresh-line'
    }
  ];

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.9), rgba(147, 51, 234, 0.9)), url('https://readdy.ai/api/search-image?query=modern%20healthcare%20professionals%20using%20mobile%20technology%2C%20medical%20team%20with%20smartphones%20and%20tablets%2C%20hospital%20environment%20with%20digital%20healthcare%20solutions%2C%20collaborative%20healthcare%20technology%20use%2C%20professional%20medical%20setting&width=1920&height=600&seq=download-cta&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        <div className="mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            {t('download_halol_app_start_today')}
          </h2>

          <p className="text-xl mb-12 leading-relaxed opacity-90 max-w-3xl mx-auto">
            {t('download_halol_description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            {downloadOptions.map((option, index) => (
              <button
                key={index}
                className={`flex items-center justify-center ${option.color} text-white px-8 py-4 rounded-2xl font-semibold transition-all transform hover:scale-105 cursor-pointer`}
              >
                <i className={`${option.icon} text-3xl mr-4`}></i>
                <div className="text-left">
                  <div className="text-sm opacity-80">{option.subtitle}</div>
                  <div className="text-lg">{option.platform}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4">
                <i className={`${feature.icon} text-2xl text-white`}></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/80 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h3 className="text-3xl font-bold mb-6">
                {t('everything_you_need_one_app')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center mr-4">
                    <i className="ri-check-line text-xl text-green-400"></i>
                  </div>
                  <span>{t('medical_equipment_marketplace')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center mr-4">
                    <i className="ri-check-line text-xl text-green-400"></i>
                  </div>
                  <span>{t('real_time_health_monitoring')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center mr-4">
                    <i className="ri-check-line text-xl text-green-400"></i>
                  </div>
                  <span>{t('telehealth_consultations')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center mr-4">
                    <i className="ri-check-line text-xl text-green-400"></i>
                  </div>
                  <span>{t('comprehensive_maintenance_services')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center mr-4">
                    <i className="ri-check-line text-xl text-green-400"></i>
                  </div>
                  <span>{t('equipment_rental_import_services')}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <img
                src="https://readdy.ai/api/search-image?query=modern%20smartphone%20displaying%20Halol%20healthcare%20app%20interface%2C%20comprehensive%20healthcare%20management%20app%2C%20clean%20mobile%20app%20design%20with%20multiple%20features%2C%20professional%20healthcare%20mobile%20application%2C%20intuitive%20medical%20app%20interface&width=300&height=600&seq=final-app-screen&orientation=portrait"
                alt="Halol App Final Screen"
                className="w-64 h-auto mx-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h4 className="text-2xl font-bold mb-4">{t('need_help_getting_started')}</h4>
          <p className="text-lg mb-8 opacity-90">
            {t('support_team_ready_to_help')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              {t('contact_support')}
            </Link>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
              {t('view_tutorial')}
            </button>
            <Link
              href="/consultancy"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              {t('get_professional_setup')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
