'use client';
import Link from 'next/link';

export default function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Comprehensive Medical Device Management
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Complete solution for purchasing, renting, and maintaining medical devices with professional support and advanced analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="ri-shopping-cart-line text-2xl sm:text-3xl text-blue-600"></i>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Device Purchasing</h3>
            <p className="text-sm sm:text-base text-gray-600">Secure online purchasing of medical devices with comprehensive warranty coverage and professional installation support.</p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="ri-refresh-line text-2xl sm:text-3xl text-green-600"></i>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Equipment Rental</h3>
            <p className="text-sm sm:text-base text-gray-600">Flexible rental options for medical equipment with transparent pricing and easy booking through our calendar system.</p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="ri-tools-line text-2xl sm:text-3xl text-purple-600"></i>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Maintenance Services</h3>
            <p className="text-sm sm:text-base text-gray-600">Professional maintenance scheduling with certified technicians and real-time status tracking for all your devices.</p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="ri-customer-service-line text-2xl sm:text-3xl text-orange-600"></i>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Customer Support</h3>
            <p className="text-sm sm:text-base text-gray-600">24/7 customer support with AI-powered chat assistance and human agents for complex technical issues.</p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="ri-line-chart-line text-2xl sm:text-3xl text-red-600"></i>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Analytics Dashboard</h3>
            <p className="text-sm sm:text-base text-gray-600">Comprehensive analytics and reporting tools for administrators to track sales, inventory, and maintenance metrics.</p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="ri-truck-line text-2xl sm:text-3xl text-teal-600"></i>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Order Tracking</h3>
            <p className="text-sm sm:text-base text-gray-600">Real-time order tracking with detailed delivery updates and notifications for all purchases and rentals.</p>
          </div>
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/halol"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            <i className="ri-hospital-line mr-2"></i>
            Access Halol Platform
          </Link>
        </div>
      </div>
    </section>
  );
}