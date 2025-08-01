
'use client';
import Link from 'next/link';
import { useTranslation } from '../../hooks/useTranslation';

export default function FeaturesSection() {
  const { t } = useTranslation('common');

  const features = [
    {
      icon: 'ri-smartphone-line',
      title: t('smart_medical_equipment'),
      description: t('smart_medical_equipment_description'),
      color: 'blue',
      image: 'https://readdy.ai/api/search-image?query=modern%20smart%20medical%20monitoring%20devices%20with%20sleek%20design%2C%20wearable%20health%20technology%2C%20connected%20healthcare%20equipment%2C%20professional%20medical%20setting%20with%20clean%20white%20background%2C%20high-tech%20sensors%20and%20displays%2C%20minimalist%20aesthetic&width=400&height=300&seq=smart-devices&orientation=landscape'
    },
    {
      icon: 'ri-user-heart-line',
      title: t('posture_correctors'),
      description: t('posture_correctors_description'),
      color: 'purple',
      image: 'https://readdy.ai/api/search-image?query=ergonomic%20posture%20correction%20device%2C%20wearable%20posture%20monitor%2C%20spinal%20alignment%20technology%2C%20health%20and%20wellness%20equipment%2C%20modern%20design%20with%20clean%20white%20background%2C%20professional%20medical%20aesthetic&width=400&height=300&seq=posture-corrector&orientation=landscape'
    },
    {
      icon: 'ri-robot-line',
      title: t('robotic_physiotherapy'),
      description: t('robotic_physiotherapy_description'),
      color: 'green',
      image: 'https://readdy.ai/api/search-image?query=advanced%20robotic%20physiotherapy%20equipment%2C%20medical%20rehabilitation%20robot%2C%20automated%20therapy%20system%2C%20modern%20healthcare%20technology%2C%20clinical%20setting%20with%20white%20background%2C%20precision%20medical%20robotics&width=400&height=300&seq=robotic-therapy&orientation=landscape'
    },
    {
      icon: 'ri-heart-pulse-line',
      title: t('wearable_health_monitors'),
      description: t('wearable_health_monitors_description'),
      color: 'red',
      image: 'https://readdy.ai/api/search-image?query=sleek%20wearable%20health%20monitoring%20devices%2C%20fitness%20tracker%2C%20smartwatch%20with%20health%20sensors%2C%20modern%20wearable%20technology%2C%20clean%20white%20background%2C%20professional%20medical%20design%20aesthetic&width=400&height=300&seq=wearable-monitors&orientation=landscape'
    },
    {
      icon: 'ri-brain-line',
      title: t('ai_diagnostic_tools'),
      description: t('ai_diagnostic_tools_description'),
      color: 'indigo',
      image: 'https://readdy.ai/api/search-image?query=artificial%20intelligence%20medical%20diagnostic%20interface%2C%20AI%20healthcare%20analysis%20screen%2C%20advanced%20medical%20technology%20display%2C%20futuristic%20healthcare%20dashboard%2C%20clean%20professional%20setting%20with%20white%20background&width=400&height=300&seq=ai-diagnostics&orientation=landscape'
    },
    {
      icon: 'ri-stethoscope-line',
      title: t('integrated_healthcare'),
      description: t('integrated_healthcare_description'),
      color: 'teal',
      image: 'https://readdy.ai/api/search-image?query=integrated%20healthcare%20ecosystem%20visualization%2C%20connected%20medical%20devices%20network%2C%20healthcare%20technology%20integration%2C%20modern%20medical%20facility%20with%20clean%20white%20background%2C%20seamless%20healthcare%20coordination&width=400&height=300&seq=integrated-care&orientation=landscape'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-100 to-blue-50 text-blue-600 bg-blue-100',
      purple: 'from-purple-100 to-purple-50 text-purple-600 bg-purple-100',
      green: 'from-green-100 to-green-50 text-green-600 bg-green-100',
      red: 'from-red-100 to-red-50 text-red-600 bg-red-100',
      indigo: 'from-indigo-100 to-indigo-50 text-indigo-600 bg-indigo-100',
      teal: 'from-teal-100 to-teal-50 text-teal-600 bg-teal-100'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t('our_healthcare_solutions')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t('discover_solutions_description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="mb-4 sm:mb-6">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-36 sm:h-48 object-cover object-top rounded-lg sm:rounded-xl mb-4 sm:mb-6"
                />
                <div className={`w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${getColorClasses(feature.color)} mb-3 sm:mb-4`}>
                  <i className={`${feature.icon} text-lg sm:text-2xl ${feature.color === 'blue' ? 'text-blue-600' :
                    feature.color === 'purple' ? 'text-purple-600' :
                    feature.color === 'green' ? 'text-green-600' :
                    feature.color === 'red' ? 'text-red-600' :
                    feature.color === 'indigo' ? 'text-indigo-600' : 'text-teal-600'}`}></i>
                </div>
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                {feature.description}
              </p>
              
              <Link
                href="/products"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors cursor-pointer whitespace-nowrap text-sm sm:text-base"
              >
                {t('learn_more')}
                <div className="w-4 h-4 flex items-center justify-center ml-2">
                  <i className="ri-arrow-right-line"></i>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/products"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:opacity-90 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            {t('view_all_products_services')}
          </Link>
        </div>
      </div>
    </section>
  );
}
