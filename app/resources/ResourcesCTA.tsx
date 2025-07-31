'use client';
import Link from 'next/link';

export default function ResourcesCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div 
          className="relative rounded-3xl p-16 text-white overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.9), rgba(147, 51, 234, 0.9)), url('https://readdy.ai/api/search-image?query=healthcare%20knowledge%20sharing%2C%20medical%20professionals%20collaborating%2C%20healthcare%20research%20and%20education%20environment%2C%20modern%20medical%20library%20and%20learning%20center%2C%20professional%20healthcare%20education%20setting&width=1200&height=400&seq=resources-cta&orientation=landscape')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              Looking for Specific Healthcare Information?
            </h2>
            
            <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
              Can't find what you're looking for? Our team of healthcare technology experts is here to help with personalized information and consultation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link 
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                Contact Our Experts
              </Link>
              
              <Link 
                href="/consultancy"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                Schedule Consultation
              </Link>
              
              <Link 
                href="/halol"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                Try Halol Platform
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4">
                  <i className="ri-customer-service-line text-2xl text-white"></i>
                </div>
                <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
                <p className="text-white/80 text-sm">24/7 healthcare technology assistance</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4">
                  <i className="ri-book-open-line text-2xl text-white"></i>
                </div>
                <h3 className="text-lg font-semibold mb-2">Knowledge Base</h3>
                <p className="text-white/80 text-sm">Comprehensive healthcare resources</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4">
                  <i className="ri-graduation-cap-line text-2xl text-white"></i>
                </div>
                <h3 className="text-lg font-semibold mb-2">Training Programs</h3>
                <p className="text-white/80 text-sm">Professional development courses</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4">
                  <i className="ri-shield-check-line text-2xl text-white"></i>
                </div>
                <h3 className="text-lg font-semibold mb-2">Compliance Guidance</h3>
                <p className="text-white/80 text-sm">Regulatory compliance support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-blue-600 rounded-full mx-auto mb-6">
              <i className="ri-download-line text-2xl text-white"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Download Resources</h3>
            <p className="text-gray-600 mb-6">
              Access our library of whitepapers, case studies, and implementation guides
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
              Browse Downloads
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-purple-600 rounded-full mx-auto mb-6">
              <i className="ri-calendar-event-line text-2xl text-white"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Webinars</h3>
            <p className="text-gray-600 mb-6">
              Join our educational webinars on healthcare technology trends and best practices
            </p>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
              View Schedule
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-green-600 rounded-full mx-auto mb-6">
              <i className="ri-community-line text-2xl text-white"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Join Community</h3>
            <p className="text-gray-600 mb-6">
              Connect with healthcare professionals and technology experts in our community forum
            </p>
            <button className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}