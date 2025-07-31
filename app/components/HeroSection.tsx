
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroSection() {
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
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="mb-4 sm:mb-6">
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                🚀 Innovation in Healthcare Technology
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Transforming
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Healthcare</span>
              <br />Through Technology
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-lg">
              Baanan seamlessly blends innovative technology with holistic wellness, delivering comprehensive healthcare solutions through smart devices, AI analytics, and our revolutionary Halol app.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
              <Link 
                href="/halol"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:opacity-90 transition-all transform hover:scale-105 text-center cursor-pointer whitespace-nowrap"
              >
                Download Halol App
              </Link>
              <Link 
                href="/products"
                className="border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 text-center cursor-pointer whitespace-nowrap"
              >
                Explore Products
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">50K+</div>
                <div className="text-xs sm:text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">95%</div>
                <div className="text-xs sm:text-sm text-gray-600">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mb-1 sm:mb-2">24/7</div>
                <div className="text-xs sm:text-sm text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
          
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl blur opacity-20 animate-pulse"></div>
              <div className="relative bg-white/20 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/30">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all cursor-pointer">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-3 sm:mb-4">
                      <i className="ri-smartphone-line text-lg sm:text-2xl text-blue-600"></i>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">Smart Devices</h3>
                    <p className="text-xs sm:text-sm text-gray-600">AI-powered health monitoring</p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all cursor-pointer">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-3 sm:mb-4">
                      <i className="ri-brain-line text-lg sm:text-2xl text-purple-600"></i>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">AI Analytics</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Intelligent health insights</p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all cursor-pointer">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-3 sm:mb-4">
                      <i className="ri-heart-pulse-line text-lg sm:text-2xl text-green-600"></i>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">Telehealth</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Remote consultations</p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all cursor-pointer">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-orange-100 rounded-full mx-auto mb-3 sm:mb-4">
                      <i className="ri-robot-line text-lg sm:text-2xl text-orange-600"></i>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">Robotics</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Automated physiotherapy</p>
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
