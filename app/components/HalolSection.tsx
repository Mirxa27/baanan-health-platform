'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function HalolSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: 'Buy & Sell Medical Devices',
      description: 'Browse and purchase from our extensive catalog of certified medical equipment with secure transactions.',
      icon: 'ri-shopping-cart-line',
      color: 'blue'
    },
    {
      title: 'Import Services',
      description: 'Seamless importation of international medical devices with full regulatory compliance support.',
      icon: 'ri-global-line',
      color: 'purple'
    },
    {
      title: 'Maintenance & Support',
      description: '24/7 technical support and preventive maintenance services for all your medical equipment.',
      icon: 'ri-tools-line',
      color: 'green'
    },
    {
      title: 'Equipment Rental',
      description: 'Flexible rental options for short-term and long-term medical equipment needs with competitive rates.',
      icon: 'ri-time-line',
      color: 'orange'
    },
    {
      title: 'Health Analytics',
      description: 'Advanced AI-powered analytics providing insights into your health patterns and trends.',
      icon: 'ri-bar-chart-line',
      color: 'teal'
    },
    {
      title: 'Telehealth Consultations',
      description: 'Connect with healthcare professionals for remote consultations and follow-up appointments.',
      icon: 'ri-video-chat-line',
      color: 'red'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 rounded-full text-sm font-medium mb-4">
                📱 Introducing Halol App
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Your Complete
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Healthcare</span>
                <br />Platform
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Halol app provides integrated solutions for buying, selling, importing, maintaining, and renting medical devices all through a single, user-friendly platform.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index 
                      ? 'bg-white shadow-lg scale-105' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-center">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full mr-4 ${
                      feature.color === 'blue' ? 'bg-blue-100' :
                      feature.color === 'purple' ? 'bg-purple-100' :
                      feature.color === 'green' ? 'bg-green-100' :
                      feature.color === 'orange' ? 'bg-orange-100' :
                      feature.color === 'teal' ? 'bg-teal-100' : 'bg-red-100'
                    }`}>
                      <i className={`${feature.icon} text-xl ${
                        feature.color === 'blue' ? 'text-blue-600' :
                        feature.color === 'purple' ? 'text-purple-600' :
                        feature.color === 'green' ? 'text-green-600' :
                        feature.color === 'orange' ? 'text-orange-600' :
                        feature.color === 'teal' ? 'text-teal-600' : 'text-red-600'
                      }`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/halol"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 text-center cursor-pointer whitespace-nowrap"
              >
                Download Halol App
              </Link>
              <Link 
                href="/halol"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 text-center cursor-pointer whitespace-nowrap"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 animate-pulse"></div>
            <div className="relative">
              <img 
                src="https://readdy.ai/api/search-image?query=modern%20smartphone%20displaying%20healthcare%20app%20interface%2C%20medical%20device%20marketplace%20mobile%20application%2C%20clean%20user%20interface%20design%2C%20professional%20healthcare%20technology%2C%20intuitive%20app%20design%20with%20medical%20icons%20and%20features%2C%20white%20background%2C%20sleek%20mobile%20design&width=600&height=800&seq=halol-app-mockup&orientation=portrait"
                alt="Halol App Interface"
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl object-cover object-top"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <i className="ri-play-fill text-2xl text-blue-600"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Devices Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Healthcare Partners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Technical Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}