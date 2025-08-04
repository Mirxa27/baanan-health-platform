'use client';
import Link from 'next/link';
import { useTranslation } from '../../hooks/useTranslation.simple';

export default function ConsultancyHero() {
  const { t } = useTranslation('consultancy');

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-60 right-20 w-48 h-48 bg-white rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-white rounded-full blur-2xl"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center min-h-screen">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
                  <i className="ri-lightbulb-line text-2xl text-white"></i>
                </div>
                <span className="text-blue-200 font-medium text-lg">Healthcare Innovation</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Transform Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Healthcare
                </span>
                Organization
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Expert consulting services to modernize your healthcare operations through 
                strategic technology integration and digital transformation.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <i className="ri-check-line text-white font-bold"></i>
                </div>
                <span className="text-blue-100">Strategic Planning</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <i className="ri-check-line text-white font-bold"></i>
                </div>
                <span className="text-blue-100">Technology Integration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <i className="ri-check-line text-white font-bold"></i>
                </div>
                <span className="text-blue-100">Change Management</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <i className="ri-check-line text-white font-bold"></i>
                </div>
                <span className="text-blue-100">24/7 Support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105 text-center"
              >
                <i className="ri-phone-line mr-2"></i>
                Schedule Consultation
              </Link>
              <Link
                href="/consultancy/services"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105 text-center"
              >
                <i className="ri-service-line mr-2"></i>
                View Services
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-blue-800">
              <p className="text-blue-200 text-sm mb-4">Trusted by leading healthcare organizations</p>
              <div className="flex items-center space-x-6 opacity-60">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-2xl font-bold">100+</div>
                <div className="text-2xl font-bold">95%</div>
              </div>
              <div className="flex items-center space-x-6 text-blue-300 text-sm mt-1">
                <div>Healthcare Facilities</div>
                <div>Successful Projects</div>
                <div>Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Services Preview */}
          <div className="relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center">Our Consulting Services</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <i className="ri-computer-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Digital Transformation</h4>
                    <p className="text-blue-100 text-sm">Modernize healthcare operations with cutting-edge technology solutions.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <i className="ri-settings-3-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">System Integration</h4>
                    <p className="text-blue-100 text-sm">Seamlessly connect medical devices with existing healthcare systems.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <i className="ri-team-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Change Management</h4>
                    <p className="text-blue-100 text-sm">Guide your team through technological transitions effectively.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <i className="ri-shield-check-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Compliance & Security</h4>
                    <p className="text-blue-100 text-sm">Ensure healthcare regulations and data security compliance.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/consultancy/services"
                  className="text-blue-300 hover:text-white transition-colors font-medium"
                >
                  View All Services →
                </Link>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-3xl animate-pulse">
              💡
            </div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
              🚀
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-blue-200 text-sm mb-2">Discover Our Expertise</div>
        <div className="w-6 h-10 border-2 border-blue-200 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-200 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
