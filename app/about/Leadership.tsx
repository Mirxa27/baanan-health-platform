'use client';
import { useTranslation } from '../../hooks/useTranslation.simple';

export default function Leadership() {
  const { t } = useTranslation('about');
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Leadership
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Team</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Meet the visionary leaders driving Baanan's mission to revolutionize healthcare through innovative technology solutions.
          </p>
        </div>

        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="text-center lg:text-left order-2 lg:order-1">

              </div>
              
              <div className="order-1 lg:order-2">
                <div className="mb-4 sm:mb-6">
                  <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                    Co-Founder & CEO
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Eng. Sultan Al Khamshi</h3>
                  <p className="text-lg sm:text-xl text-blue-600 font-medium">Chief Executive Officer & Co-Founder</p>
                </div>
                
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
                  Eng. Sultan Al Khamshi is a visionary leader with over 15 years of experience in healthcare technology and engineering. His passion for innovation and commitment to improving healthcare accessibility has been the driving force behind Baanan's revolutionary approach to health-tech solutions.
                </p>
                
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex items-center">
                    <div className="w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center mr-3 sm:mr-4">
                      <i className="ri-graduation-cap-line text-lg sm:text-xl text-blue-600"></i>
                    </div>
                    <span className="text-sm sm:text-base text-gray-700">Master's in Biomedical Engineering</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center mr-3 sm:mr-4">
                      <i className="ri-award-line text-lg sm:text-xl text-purple-600"></i>
                    </div>
                    <span className="text-sm sm:text-base text-gray-700">Healthcare Innovation Award 2023</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center mr-3 sm:mr-4">
                      <i className="ri-global-line text-lg sm:text-xl text-green-600"></i>
                    </div>
                    <span className="text-sm sm:text-base text-gray-700">15+ Years Healthcare Technology</span>
                  </div>
                </div>
                
                <div className="flex justify-center lg:justify-start space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200 transition-colors">
                    <i className="ri-linkedin-line text-lg sm:text-xl text-blue-600"></i>
                  </div>
                  <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-purple-100 rounded-full cursor-pointer hover:bg-purple-200 transition-colors">
                    <i className="ri-twitter-line text-lg sm:text-xl text-purple-600"></i>
                  </div>
                  <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-green-100 rounded-full cursor-pointer hover:bg-green-200 transition-colors">
                    <i className="ri-mail-line text-lg sm:text-xl text-green-600"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">

            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Abdullah Mirza</h4>
            <p className="text-blue-600 font-medium mb-3 sm:mb-4 text-sm sm:text-base">Chief Technology Officer</p>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Leading our AI and machine learning initiatives with 12+ years in healthcare technology development.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">

            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Omar Al huwaid</h4>
            <p className="text-purple-600 font-medium mb-3 sm:mb-4 text-sm sm:text-base">Chief Marketing Officer</p>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Driving market expansion and strategic partnerships with 18+ years of marketing and business development expertise.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center sm:col-span-2 lg:col-span-1 max-w-sm mx-auto sm:max-w-none">

            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Bassam muhammad</h4>
            <p className="text-green-600 font-medium mb-3 sm:mb-4 text-sm sm:text-base">Chief Operations Officer</p>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Streamlining operations and scaling our healthcare solutions across the region with proven excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
