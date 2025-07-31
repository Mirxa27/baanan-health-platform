
'use client';

export default function Services() {
  const services = [
    {
      icon: 'ri-hospital-line',
      title: 'Digital Health Transformation',
      description: 'Complete digital transformation strategies for healthcare organizations, including EHR implementation, workflow optimization, and technology integration.',
      features: ['EHR Integration', 'Workflow Optimization', 'Staff Training', 'Data Migration'],
      color: 'blue'
    },
    {
      icon: 'ri-pulse-line',
      title: 'Medical Device Integration',
      description: 'Expert consultation on medical device selection, integration, and optimization to enhance patient care and operational efficiency.',
      features: ['Device Selection', 'System Integration', 'Compliance Check', 'Performance Monitoring'],
      color: 'purple'
    },
    {
      icon: 'ri-brain-line',
      title: 'AI & Analytics Implementation',
      description: 'Strategic implementation of AI-powered analytics and machine learning solutions for predictive healthcare and improved outcomes.',
      features: ['AI Strategy', 'Predictive Analytics', 'Data Insights', 'Performance Metrics'],
      color: 'green'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Regulatory Compliance',
      description: 'Comprehensive compliance consulting ensuring adherence to healthcare regulations, standards, and best practices.',
      features: ['HIPAA Compliance', 'Quality Standards', 'Risk Assessment', 'Audit Preparation'],
      color: 'red'
    },
    {
      icon: 'ri-team-line',
      title: 'Operational Excellence',
      description: 'Optimize healthcare operations through process improvement, resource management, and efficiency enhancement strategies.',
      features: ['Process Optimization', 'Resource Planning', 'Efficiency Analysis', 'Cost Reduction'],
      color: 'indigo'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Strategic Planning',
      description: 'Long-term strategic planning for healthcare organizations, including market analysis, growth strategies, and competitive positioning.',
      features: ['Market Analysis', 'Growth Strategy', 'Competitive Analysis', 'ROI Planning'],
      color: 'teal'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-100 to-blue-50 text-blue-600',
      purple: 'from-purple-100 to-purple-50 text-purple-600',
      green: 'from-green-100 to-green-50 text-green-600',
      red: 'from-red-100 to-red-50 text-red-600',
      indigo: 'from-indigo-100 to-indigo-50 text-indigo-600',
      teal: 'from-teal-100 to-teal-50 text-teal-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Our Consulting
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Services</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Comprehensive healthcare consulting solutions designed to transform your organization and improve patient outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${getColorClasses(service.color)} mb-4 sm:mb-6`}>
                <i className={`${service.icon} text-xl sm:text-2xl`}></i>
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                {service.description}
              </p>
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-xs sm:text-sm text-gray-600">
                      <div className="w-4 h-4 flex items-center justify-center mr-3 flex-shrink-0">
                        <i className="ri-check-line text-green-600"></i>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:opacity-90 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
            Schedule Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
