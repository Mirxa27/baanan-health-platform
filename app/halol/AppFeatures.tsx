'use client';

export default function AppFeatures() {
  const features = [
    {
      title: 'Medical Device Marketplace',
      description: 'Browse and purchase from our extensive catalog of certified medical equipment with detailed specifications and competitive pricing.',
      icon: 'ri-shopping-cart-line',
      color: 'blue',
      benefits: ['10,000+ Certified Devices', 'Secure Payment Gateway', 'Quality Assurance', 'Fast Delivery']
    },
    {
      title: 'Equipment Import Services',
      description: 'Seamless importation of international medical devices with full regulatory compliance and customs handling.',
      icon: 'ri-global-line',
      color: 'purple',
      benefits: ['Regulatory Compliance', 'Customs Clearance', 'Quality Verification', 'Warranty Support']
    },
    {
      title: 'Maintenance & Support',
      description: '24/7 technical support and preventive maintenance services for all your medical equipment needs.',
      icon: 'ri-tools-line',
      color: 'green',
      benefits: ['24/7 Technical Support', 'Preventive Maintenance', 'Emergency Repairs', 'Parts Replacement']
    },
    {
      title: 'Equipment Rental Solutions',
      description: 'Flexible rental options for short-term and long-term medical equipment needs with competitive rates.',
      icon: 'ri-time-line',
      color: 'orange',
      benefits: ['Flexible Terms', 'Latest Equipment', 'Maintenance Included', 'Upgrade Options']
    },
    {
      title: 'AI Health Analytics',
      description: 'Advanced analytics providing insights into health patterns, trends, and predictive health assessments.',
      icon: 'ri-brain-line',
      color: 'indigo',
      benefits: ['Predictive Analytics', 'Health Insights', 'Trend Analysis', 'Risk Assessment']
    },
    {
      title: 'Telehealth Platform',
      description: 'Connect with healthcare professionals for remote consultations, follow-ups, and health monitoring.',
      icon: 'ri-video-chat-line',
      color: 'red',
      benefits: ['Video Consultations', 'Appointment Booking', 'Health Records', 'Prescription Management']
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200',
      red: 'bg-red-100 text-red-600 border-red-200'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Healthcare</span>
            Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Halol app integrates all essential healthcare services into one powerful platform, providing seamless access to medical devices, services, and health management tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-16 h-16 flex items-center justify-center rounded-2xl mb-6 ${getColorClasses(feature.color)}`}>
                <i className={`${feature.icon} text-2xl`}></i>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {feature.description}
              </p>
              
              <div className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Everything You Need in One App
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Halol simplifies healthcare management by bringing together device procurement, maintenance services, health monitoring, and telehealth consultations in a single, intuitive platform.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">50K+</div>
                  <div className="text-gray-600 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">10K+</div>
                  <div className="text-gray-600 text-sm">Medical Devices</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">500+</div>
                  <div className="text-gray-600 text-sm">Healthcare Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">24/7</div>
                  <div className="text-gray-600 text-sm">Support Available</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <img 
                src="https://readdy.ai/api/search-image?query=modern%20smartphone%20displaying%20comprehensive%20healthcare%20app%20dashboard%2C%20medical%20device%20marketplace%20interface%2C%20clean%20user%20interface%20design%20with%20multiple%20healthcare%20features%2C%20professional%20mobile%20app%20design%20with%20blue%20and%20purple%20accents%2C%20intuitive%20healthcare%20management%20platform&width=400&height=600&seq=halol-features&orientation=portrait"
                alt="Halol App Features"
                className="w-80 h-auto rounded-2xl shadow-xl object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}