
'use client';

export default function VisionMission() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">
              Our Vision &
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Mission</span>
            </h2>
            
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <div className="flex items-start">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-blue-100 rounded-lg sm:rounded-xl mr-4 sm:mr-6 mt-1 flex-shrink-0">
                    <i className="ri-eye-line text-lg sm:text-2xl text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Vision</h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                      To be the leading health-tech company in the Middle East, transforming healthcare through innovative technology solutions that make quality medical care accessible, efficient, and personalized for everyone.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <div className="flex items-start">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-purple-100 rounded-lg sm:rounded-xl mr-4 sm:mr-6 mt-1 flex-shrink-0">
                    <i className="ri-compass-line text-lg sm:text-2xl text-purple-600"></i>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Mission</h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                      To seamlessly blend innovative technology with holistic wellness, providing comprehensive healthcare solutions that empower healthcare providers, improve patient outcomes, and create a sustainable healthcare ecosystem through our integrated platform and smart devices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative order-first lg:order-last">
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl blur opacity-20"></div>
            <img 
              src="https://readdy.ai/api/search-image?query=healthcare%20innovation%20concept%2C%20medical%20technology%20visualization%2C%20futuristic%20healthcare%20environment%2C%20advanced%20medical%20research%2C%20digital%20health%20transformation%2C%20clean%20professional%20medical%20setting%20with%20modern%20technology%20integration&width=600&height=600&seq=vision-mission&orientation=squarish"
              alt="Healthcare Innovation"
              className="relative w-full rounded-2xl sm:rounded-3xl shadow-2xl object-cover object-top h-64 sm:h-80 lg:h-auto"
            />
          </div>
        </div>
        
        <div className="mt-16 sm:mt-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-8 sm:p-12">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Our Impact Goals</h3>
            <p className="text-lg sm:text-xl text-gray-600 px-4">Measurable outcomes that drive our commitment to healthcare excellence</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center bg-blue-600 rounded-full mx-auto mb-4 sm:mb-6">
                <i className="ri-user-heart-line text-2xl sm:text-3xl text-white"></i>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">100K+</div>
              <div className="text-sm sm:text-base text-gray-700 font-medium">Patients by 2025</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center bg-purple-600 rounded-full mx-auto mb-4 sm:mb-6">
                <i className="ri-hospital-line text-2xl sm:text-3xl text-white"></i>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-sm sm:text-base text-gray-700 font-medium">Healthcare Facilities</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center bg-green-600 rounded-full mx-auto mb-4 sm:mb-6">
                <i className="ri-global-line text-2xl sm:text-3xl text-white"></i>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">15</div>
              <div className="text-sm sm:text-base text-gray-700 font-medium">Countries Expansion</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center bg-orange-600 rounded-full mx-auto mb-4 sm:mb-6">
                <i className="ri-innovation-line text-2xl sm:text-3xl text-white"></i>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-sm sm:text-base text-gray-700 font-medium">AI Solutions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
