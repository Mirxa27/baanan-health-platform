'use client';
import { useTranslation } from '../../hooks/useTranslation';

export default function ResourcesHero() {
  const { t } = useTranslation('resources');

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.1), rgba(147, 51, 234, 0.1)), url('https://readdy.ai/api/search-image?query=modern%20healthcare%20research%20and%20information%20center%2C%20medical%20knowledge%20hub%20with%20digital%20displays%2C%20professional%20healthcare%20library%20and%20research%20facility%2C%20clean%20academic%20environment%20with%20medical%20technology%2C%20bright%20educational%20setting&width=1920&height=800&seq=resources-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/95"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center">
          <span className="inline-block px-6 py-3 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-8">
            {t('healthcare_knowledge_hub')}
          </span>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            {t('healthcare_technology_resources_part1')}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> {t('healthcare_technology_resources_part2')}</span>
          </h1>
          
          <p className="text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
            {t('resources_description')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-6">
                <i className="ri-article-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">{t('articles_insights')}</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-6">
                <i className="ri-file-text-line text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">150+</h3>
              <p className="text-gray-600">{t('research_papers')}</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-6">
                <i className="ri-newspaper-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">{t('industry_reports')}</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-orange-100 rounded-full mx-auto mb-6">
                <i className="ri-calendar-event-line text-2xl text-orange-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('weekly')}</h3>
              <p className="text-gray-600">{t('updates')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}