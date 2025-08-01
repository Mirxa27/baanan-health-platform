
'use client';
import { useTranslation } from '../../hooks/useTranslation';

export default function ExpertTeam() {
  const { t } = useTranslation('consultancy'); // Assuming 'consultancy' namespace for this component

  const experts = [
    {
      name: 'Dr. Sarah Al-Mahmoud',
      title: 'Healthcare Technology Director',
      specialization: 'Digital Health Transformation',
      experience: '18+ Years',
      certifications: ['PMP', 'HIMSS', 'Six Sigma Black Belt'],
      image: 'https://readdy.ai/api/search-image?query=professional%20Middle%20Eastern%20female%20healthcare%20consultant%2C%20confident%20medical%20technology%20expert%2C%20modern%20corporate%20portrait%2C%20clean%20professional%20background%2C%20successful%20woman%20in%20healthcare%20consulting&width=300&height=400&seq=expert-sarah&orientation=portrait'
    },
    {
      name: 'Eng. Mohammed Al-Rashid',
      title: 'Medical Device Integration Lead',
      specialization: 'IoT & Robotics Implementation',
      experience: '15+ Years',
      certifications: ['IEEE Certified', 'FDA Compliance', 'ISO 13485'],
      image: 'https://readdy.ai/api/search-image?query=professional%20Middle%20Eastern%20male%20medical%20engineer%2C%20confident%20healthcare%20technology%20specialist%2C%20modern%20corporate%20portrait%2C%20clean%20professional%20background%2C%20successful%20engineer%20in%20medical%20consulting&width=300&height=400&seq=expert-mohammed&orientation=portrait'
    },
    {
      name: 'Dr. Fatima Al-Zahra',
      title: 'AI & Analytics Consultant',
      specialization: 'Healthcare Data Science',
      experience: '12+ Years',
      certifications: ['Ph.D. Data Science', 'AWS Certified', 'Google AI'],
      image: 'https://readdy.ai/api/search-image?query=professional%20Middle%20Eastern%20female%20AI%20consultant%2C%20confident%20data%20science%20expert%2C%20modern%20corporate%20portrait%2C%20clean%20professional%20background%2C%20successful%20woman%20in%20healthcare%20analytics&width=300&height=400&seq=expert-fatima&orientation=portrait'
    },
    {
      name: 'Dr. Ahmed Al-Khatib',
      title: 'Regulatory Compliance Expert',
      specialization: 'Healthcare Standards & Compliance',
      experience: '20+ Years',
      certifications: ['JCI Surveyor', 'HIPAA Expert', 'Quality Management'],
      image: 'https://readdy.ai/api/search-image?query=professional%20Middle%20Eastern%20male%20healthcare%20compliance%20expert%2C%20confident%20regulatory%20consultant%2C%20modern%20corporate%20portrait%2C%20clean%20professional%20background%2C%20successful%20doctor%20in%20healthcare%20compliance&width=300&height=400&seq=expert-ahmed&orientation=portrait'
    },
    {
      name: 'Eng. Aisha Al-Mansouri',
      title: 'Operations Excellence Manager',
      specialization: 'Process Optimization',
      experience: '14+ Years',
      certifications: ['Lean Six Sigma', 'Change Management', 'ITIL'],
      image: 'https://readdy.ai/api/search-image?query=professional%20Middle%20Eastern%20female%20operations%20manager%2C%20confident%20process%20optimization%20expert%2C%20modern%20corporate%20portrait%2C%20clean%20professional%20background%2C%20successful%20woman%20in%20healthcare%20operations&width=300&height=400&seq=expert-aisha&orientation=portrait'
    },
    {
      name: 'Dr. Omar Al-Hashemi',
      title: 'Strategic Planning Director',
      specialization: 'Healthcare Strategy & Growth',
      experience: '16+ Years',
      certifications: ['MBA Healthcare', 'Strategy Certified', 'Leadership'],
      image: 'https://readdy.ai/api/search-image?query=professional%20Middle%20Eastern%20male%20healthcare%20strategist%2C%20confident%20strategic%20planning%20director%2C%20modern%20corporate%20portrait%2C%20clean%20professional%20background%2C%20successful%20executive%20in%20healthcare%20strategy&width=300&height=400&seq=expert-omar&orientation=portrait'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t('our_expert_team_part1')}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> {t('our_expert_team_part2')}</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t('expert_team_description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {experts.map((expert, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="text-center">
                <div className="relative mb-4 sm:mb-6">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-24 sm:w-32 h-32 sm:h-40 object-cover object-top rounded-xl mx-auto shadow-lg"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {expert.experience}
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {expert.name}
                </h3>
                
                <p className="text-sm sm:text-base text-purple-600 font-medium mb-2">
                  {expert.title}
                </p>
                
                <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                  {expert.specialization}
                </p>
                
                <div className="space-y-2 sm:space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900">{t('certifications')}</h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                    {expert.certifications.map((cert, certIndex) => (
                      <span
                        key={certIndex}
                        className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center space-x-3 mt-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200 transition-colors">
                    <i className="ri-linkedin-line text-base sm:text-lg text-blue-600"></i>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-green-100 rounded-full cursor-pointer hover:bg-green-200 transition-colors">
                    <i className="ri-mail-line text-base sm:text-lg text-green-600"></i>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-purple-100 rounded-full cursor-pointer hover:bg-purple-200 transition-colors">
                    <i className="ri-calendar-line text-base sm:text-lg text-purple-600"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="relative rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white overflow-hidden mt-16 sm:mt-20"
          style={{
            backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.9), rgba(147, 51, 234, 0.9)), url('https://readdy.ai/api/search-image?query=healthcare%20consulting%20team%20collaboration%2C%20medical%20professionals%20working%20together%2C%20diverse%20healthcare%20experts%2C%20modern%20office%20environment%2C%20teamwork%20in%20healthcare%20consulting&width=1200&height=400&seq=team-cta&orientation=landscape')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              {t('work_with_industry_leading_experts')}
            </h3>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-4">
              {t('work_with_experts_description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
                {t('schedule_consultation')}
              </button>
              <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
                {t('view_team_profiles')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
