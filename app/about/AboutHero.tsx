
'use client';

export default function AboutHero() {
  return (
    <section 
      className="relative py-16 sm:py-20 lg:py-32 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.1), rgba(147, 51, 234, 0.1)), url('https://readdy.ai/api/search-image?query=modern%20healthcare%20innovation%20center%2C%20medical%20technology%20laboratory%2C%20professional%20healthcare%20environment%2C%20advanced%20medical%20research%20facility%2C%20clean%20minimalist%20design%2C%20futuristic%20healthcare%20setting%20with%20bright%20lighting&width=1920&height=800&seq=about-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/95"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            🏥 About Baanan Health Technology
          </span>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
            Pioneering the Future of
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Healthcare</span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 leading-relaxed max-w-4xl mx-auto px-4">
            Baanan is Saudi Arabia's premier health-tech company, seamlessly blending innovative technology with holistic wellness to revolutionize healthcare delivery and patient outcomes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4 sm:mb-6">
                <i className="ri-heart-pulse-line text-xl sm:text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">50,000+</h3>
              <p className="text-sm sm:text-base text-gray-600">Lives Improved</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-4 sm:mb-6">
                <i className="ri-hospital-line text-xl sm:text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">150+</h3>
              <p className="text-sm sm:text-base text-gray-600">Healthcare Partners</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4 sm:mb-6">
                <i className="ri-award-line text-xl sm:text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-sm sm:text-base text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
