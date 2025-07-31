
'use client';

export default function ConsultancyHero() {
  return (
    <section 
      className="relative py-16 sm:py-20 lg:py-32 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.1), rgba(147, 51, 234, 0.1)), url('https://readdy.ai/api/search-image?query=healthcare%20consulting%20professionals%20in%20modern%20office%20environment%2C%20medical%20consultation%20meeting%2C%20professional%20healthcare%20advisors%2C%20clean%20business%20setting%20with%20medical%20technology%20displays%2C%20collaborative%20healthcare%20planning&width=1920&height=800&seq=consultancy-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/95"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            🏥 Professional Healthcare Consulting
          </span>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight px-2">
            Expert Healthcare
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Consulting Services</span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 leading-relaxed max-w-4xl mx-auto px-4">
            Transform your healthcare organization with our expert consulting services. We provide strategic guidance, technology integration, and operational excellence to enhance patient care and drive business growth.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4 sm:mb-6">
                <i className="ri-user-star-line text-xl sm:text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">200+</h3>
              <p className="text-sm sm:text-base text-gray-600">Healthcare Clients</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-4 sm:mb-6">
                <i className="ri-award-line text-xl sm:text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-sm sm:text-base text-gray-600">Years Experience</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4 sm:mb-6">
                <i className="ri-line-chart-line text-xl sm:text-2xl text-green-600"></i>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-sm sm:text-base text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
