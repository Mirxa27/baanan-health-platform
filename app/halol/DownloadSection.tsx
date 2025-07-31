'use client';
import Link from 'next/link';

export default function DownloadSection() {
  const downloadOptions = [
    {
      platform: 'iOS App Store',
      description: 'Download for iPhone and iPad',
      icon: 'ri-apple-line',
      color: 'bg-gray-900 hover:bg-gray-800',
      subtitle: 'Download on the'
    },
    {
      platform: 'Google Play',
      description: 'Download for Android devices',
      icon: 'ri-google-play-line',
      color: 'bg-gray-900 hover:bg-gray-800',
      subtitle: 'Get it on'
    },
    {
      platform: 'Web Portal',
      description: 'Access via web browser',
      icon: 'ri-global-line',
      color: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90',
      subtitle: 'Access via'
    }
  ];

  const features = [
    {
      title: 'Free to Download',
      description: 'Start using Halol at no cost',
      icon: 'ri-download-line'
    },
    {
      title: 'Secure Platform',
      description: 'HIPAA compliant and encrypted',
      icon: 'ri-shield-check-line'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock assistance',
      icon: 'ri-customer-service-line'
    },
    {
      title: 'Regular Updates',
      description: 'New features added monthly',
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
            Download Halol App
            <br />Start Today
          </h2>
          
          <p className="text-xl mb-12 leading-relaxed opacity-90 max-w-3xl mx-auto">
            Join thousands of healthcare professionals who trust Halol for their medical equipment needs, health monitoring, and healthcare management.
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
                Everything You Need in One App
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center mr-4">
                    <i className="ri-check-line text-xl text-green-400"></i>
                  </div>
                  <span>Medical equipment marketplace with 10,000+ devices</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center mr-4">
                    <i className="ri-check-line text-xl text-green-400"></i>
                  </div>
                  <span>Real-time health monitoring and AI analytics</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center mr-4">
                    <i className="ri-check-line text-xl text-green-400"></i>
                  </div>
                  <span>Telehealth consultations with certified doctors</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center mr-4">
                    <i className="ri-check-line text-xl text-green-400"></i>
                  </div>
                  <span>Comprehensive maintenance and support services</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center mr-4">
                    <i className="ri-check-line text-xl text-green-400"></i>
                  </div>
                  <span>Equipment rental and import services</span>
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
          <h4 className="text-2xl font-bold mb-4">Need Help Getting Started?</h4>
          <p className="text-lg mb-8 opacity-90">
            Our support team is ready to help you set up and optimize Halol for your healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              Contact Support
            </Link>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
              View Tutorial
            </button>
            <Link 
              href="/consultancy"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              Get Professional Setup
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}