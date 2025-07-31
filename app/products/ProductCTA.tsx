'use client';
import Link from 'next/link';

export default function ProductCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-white/50">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Healthcare Facility?</span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Experience the power of Baanan's integrated healthcare technology solutions. From smart devices to AI analytics, we provide everything you need to deliver exceptional patient care.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/halol"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              Explore Halol Platform
            </Link>
            
            <Link 
              href="/consultancy"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              Get Expert Consultation
            </Link>
            
            <Link 
              href="/contact"
              className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              Request Demo
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4">
                <i className="ri-customer-service-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Dedicated technical support and maintenance services</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-4">
                <i className="ri-graduation-cap-line text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Training Included</h3>
              <p className="text-gray-600">Comprehensive staff training and certification programs</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                <i className="ri-shield-check-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Warranty Protection</h3>
              <p className="text-gray-600">Extended warranty and replacement guarantees</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}