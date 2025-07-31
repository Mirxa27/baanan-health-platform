'use client';

export default function ProductsHero() {
  return (
    <section 
      className="relative py-32 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.1), rgba(147, 51, 234, 0.1)), url('https://readdy.ai/api/search-image?query=advanced%20medical%20technology%20showcase%2C%20smart%20healthcare%20devices%20display%2C%20modern%20medical%20equipment%20exhibition%2C%20professional%20healthcare%20technology%20laboratory%20with%20clean%20white%20background%2C%20innovative%20medical%20devices%20arrangement%2C%20futuristic%20healthcare%20setting&width=1920&height=800&seq=products-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/95"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center">
          <span className="inline-block px-6 py-3 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-8">
            🏥 Products & Services
          </span>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Advanced Healthcare
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Technology</span>
          </h1>
          
          <p className="text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
            Discover our comprehensive range of smart medical devices, AI-powered diagnostics, and integrated healthcare solutions designed to transform patient care.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-6">
                <i className="ri-smartphone-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Devices</h3>
              <p className="text-gray-600">IoT-enabled medical equipment</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-6">
                <i className="ri-robot-line text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Robotics</h3>
              <p className="text-gray-600">Automated physiotherapy systems</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-6">
                <i className="ri-brain-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI Analytics</h3>
              <p className="text-gray-600">Intelligent diagnostic tools</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-orange-100 rounded-full mx-auto mb-6">
                <i className="ri-heart-pulse-line text-2xl text-orange-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Monitoring</h3>
              <p className="text-gray-600">24/7 health tracking</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}