'use client';

export default function HalolHero() {
  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.1), rgba(147, 51, 234, 0.1)), url('https://readdy.ai/api/search-image?query=modern%20smartphone%20displaying%20healthcare%20app%20interface%20in%20professional%20medical%20environment%2C%20clean%20medical%20technology%20background%2C%20healthcare%20professional%20using%20mobile%20app%2C%20medical%20device%20integration%2C%20pristine%20white%20clinical%20setting%20with%20soft%20blue%20and%20purple%20lighting&width=1920&height=1080&seq=halol-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 rounded-full text-sm font-medium mb-4">
                📱 Halol Healthcare App
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Complete
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Healthcare</span>
              <br />Ecosystem
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Halol app provides integrated solutions for buying, selling, importing, maintaining, and renting medical devices all through a single, user-friendly platform. Experience the future of healthcare management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
                Download for iOS
              </button>
              <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
                Download for Android
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                <div className="text-gray-600 text-sm">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
                <div className="text-gray-600 text-sm">Medical Devices</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">4.9★</div>
                <div className="text-gray-600 text-sm">App Store Rating</div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 animate-pulse"></div>
              <img 
                src="https://readdy.ai/api/search-image?query=modern%20smartphone%20displaying%20Halol%20healthcare%20app%20interface%2C%20medical%20marketplace%20mobile%20application%2C%20clean%20user%20interface%20with%20medical%20device%20listings%2C%20professional%20healthcare%20app%20design%2C%20intuitive%20mobile%20interface%20with%20blue%20and%20purple%20accents&width=400&height=800&seq=halol-app-screen&orientation=portrait"
                alt="Halol App Interface"
                className="relative w-80 h-auto rounded-3xl shadow-2xl object-cover object-top"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-20 h-20 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <i className="ri-play-fill text-3xl text-blue-600"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}