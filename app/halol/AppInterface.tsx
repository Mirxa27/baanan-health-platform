'use client';
import { useState } from 'react';

export default function AppInterface() {
  const [activeScreen, setActiveScreen] = useState(0);

  const screens = [
    {
      title: 'Medical Device Marketplace',
      description: 'Browse thousands of certified medical devices with detailed specifications, reviews, and competitive pricing.',
      features: ['Advanced Search Filters', 'Device Comparison', 'Secure Payments', 'Fast Delivery'],
      image: 'https://readdy.ai/api/search-image?query=medical%20device%20marketplace%20mobile%20app%20interface%2C%20healthcare%20equipment%20shopping%20app%2C%20clean%20user%20interface%20with%20medical%20device%20listings%2C%20professional%20mobile%20app%20design%20with%20blue%20accents%2C%20intuitive%20healthcare%20marketplace&width=300&height=600&seq=app-marketplace&orientation=portrait'
    },
    {
      title: 'Health Monitoring Dashboard',
      description: 'Real-time health data visualization with AI-powered insights and personalized health recommendations.',
      features: ['Real-time Monitoring', 'AI Health Insights', 'Trend Analysis', 'Alert System'],
      image: 'https://readdy.ai/api/search-image?query=health%20monitoring%20dashboard%20mobile%20app%2C%20medical%20data%20visualization%20interface%2C%20healthcare%20analytics%20app%20screen%2C%20professional%20health%20tracking%20app%20design%20with%20charts%20and%20graphs%2C%20clean%20medical%20app%20interface&width=300&height=600&seq=app-monitoring&orientation=portrait'
    },
    {
      title: 'Telehealth Consultations',
      description: 'Connect with healthcare professionals through secure video consultations and appointment management.',
      features: ['Video Consultations', 'Appointment Booking', 'Medical Records', 'Prescription Management'],
      image: 'https://readdy.ai/api/search-image?query=telehealth%20video%20consultation%20mobile%20app%20interface%2C%20medical%20appointment%20booking%20app%2C%20healthcare%20consultation%20app%20screen%2C%20professional%20telemedicine%20app%20design%2C%20clean%20medical%20video%20call%20interface&width=300&height=600&seq=app-telehealth&orientation=portrait'
    },
    {
      title: 'Maintenance & Support',
      description: 'Comprehensive equipment maintenance scheduling, support tickets, and service history tracking.',
      features: ['Service Scheduling', 'Support Tickets', 'Maintenance History', 'Technician Tracking'],
      image: 'https://readdy.ai/api/search-image?query=medical%20equipment%20maintenance%20app%20interface%2C%20service%20scheduling%20mobile%20app%2C%20healthcare%20support%20ticket%20system%2C%20professional%20maintenance%20management%20app%2C%20clean%20service%20app%20design&width=300&height=600&seq=app-maintenance&orientation=portrait'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Intuitive App
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Interface</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience seamless healthcare management with Halol's user-friendly interface designed for healthcare professionals and patients alike.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="space-y-6">
              {screens.map((screen, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeScreen === index 
                      ? 'bg-white shadow-lg scale-105 border-2 border-blue-200' 
                      : 'bg-white/70 hover:bg-white hover:shadow-md'
                  }`}
                  onClick={() => setActiveScreen(index)}
                >
                  <div className="flex items-start">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl mr-4 ${
                      activeScreen === index ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <span className="text-lg font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 ${
                        activeScreen === index ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {screen.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {screen.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {screen.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 animate-pulse"></div>
              <div className="relative">
                <img 
                  src={screens[activeScreen].image}
                  alt={screens[activeScreen].title}
                  className="w-80 h-auto rounded-3xl shadow-2xl object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 bg-white/50 backdrop-blur-sm rounded-3xl p-12 border border-white/30">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Available on All Platforms
            </h3>
            <p className="text-lg text-gray-600">
              Download Halol app and experience the future of healthcare management
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="flex items-center justify-center bg-gray-900 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-all transform hover:scale-105 cursor-pointer">
              <i className="ri-apple-line text-2xl mr-3"></i>
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-lg">App Store</div>
              </div>
            </button>
            
            <button className="flex items-center justify-center bg-gray-900 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-all transform hover:scale-105 cursor-pointer">
              <i className="ri-google-play-line text-2xl mr-3"></i>
              <div className="text-left">
                <div className="text-xs">Get it on</div>
                <div className="text-lg">Google Play</div>
              </div>
            </button>
            
            <button className="flex items-center justify-center bg-blue-600 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 cursor-pointer">
              <i className="ri-global-line text-2xl mr-3"></i>
              <div className="text-left">
                <div className="text-xs">Access via</div>
                <div className="text-lg">Web Portal</div>
              </div>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">4.9★</div>
              <div className="text-gray-600 text-sm">App Store Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">50K+</div>
              <div className="text-gray-600 text-sm">Downloads</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">99.9%</div>
              <div className="text-gray-600 text-sm">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600 mb-1">24/7</div>
              <div className="text-gray-600 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}