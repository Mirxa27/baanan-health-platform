'use client';
import { useTranslation } from '../../hooks/useTranslation.simple';

export default function ContactHero() {
  const { t } = useTranslation('contact');

  return (
    <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <i className="ri-customer-service-line text-2xl text-blue-200"></i>
            <span className="text-blue-200 font-medium">24/7 Support Available</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Get In
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Touch
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-12">
            Ready to transform your healthcare operations? Our experts are here to help you 
            find the perfect medical technology solutions.
          </p>

          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-colors">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-phone-line text-white text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-blue-200 text-sm mb-3">Speak with our experts directly</p>
              <a
                href="tel:+966564406725"
                className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
              >
                +966 564 406 725
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-colors">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-mail-line text-white text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-blue-200 text-sm mb-3">Get detailed support via email</p>
              <a
                href="mailto:info@baanan.com"
                className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
              >
                info@baanan.com
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-colors">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-chat-3-line text-white text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="text-blue-200 text-sm mb-3">Instant support available</p>
              <button className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                Start Chat
              </button>
            </div>
          </div>

          {/* Business Hours */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-200">Sunday - Thursday:</span>
                <span className="font-medium">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Friday:</span>
                <span className="font-medium">2:00 PM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Saturday:</span>
                <span className="font-medium">Closed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Emergency Support:</span>
                <span className="font-medium text-green-400">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
