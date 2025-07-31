'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      {/* Desktop Footer */}
      <footer className="hidden md:block bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Pacifico, serif' }}>
                Baanan
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Premier health-tech company seamlessly blending innovative technology with holistic wellness.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <i className="ri-twitter-line text-lg"></i>
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <i className="ri-linkedin-line text-lg"></i>
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <i className="ri-instagram-line text-lg"></i>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors cursor-pointer">About Us</Link></li>
                <li><Link href="/products" className="text-gray-300 hover:text-white transition-colors cursor-pointer">Products</Link></li>
                <li><Link href="/consultancy" className="text-gray-300 hover:text-white transition-colors cursor-pointer">Consultancy</Link></li>
                <li><Link href="/resources" className="text-gray-300 hover:text-white transition-colors cursor-pointer">Resources</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                <li><Link href="/halol" className="text-gray-300 hover:text-white transition-colors cursor-pointer">Halol App</Link></li>
                <li><Link href="/products" className="text-gray-300 hover:text-white transition-colors cursor-pointer">Smart Devices</Link></li>
                <li><Link href="/products" className="text-gray-300 hover:text-white transition-colors cursor-pointer">AI Analytics</Link></li>
                <li><Link href="/consultancy" className="text-gray-300 hover:text-white transition-colors cursor-pointer">Healthcare Solutions</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-3">
                    <i className="ri-mail-line text-blue-400"></i>
                  </div>
                  <span className="text-gray-300">info@baanan.com</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-3">
                    <i className="ri-phone-line text-blue-400"></i>
                  </div>
                  <span className="text-gray-300">+966564406725</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-3">
                    <i className="ri-map-pin-line text-blue-400"></i>
                  </div>
                  <span className="text-gray-300">Saudi Arabia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 Baanan. All rights reserved. | Eng. Sultan Al Khamshi - Co-Founder, CEO
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">Privacy Policy</Link>
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Footer Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          <Link href="/" className="flex flex-col items-center p-2 cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-home-line text-xl text-gray-600"></i>
            </div>
            <span className="text-xs text-gray-600 mt-1">Home</span>
          </Link>
          <Link href="/products" className="flex flex-col items-center p-2 cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-heart-pulse-line text-xl text-gray-600"></i>
            </div>
            <span className="text-xs text-gray-600 mt-1">Products</span>
          </Link>
          <Link href="/halol" className="flex flex-col items-center p-2 cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <i className="ri-smartphone-line text-lg text-white"></i>
            </div>
            <span className="text-xs text-blue-600 mt-1 font-medium">Halol</span>
          </Link>
          <Link href="/consultancy" className="flex flex-col items-center p-2 cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-user-heart-line text-xl text-gray-600"></i>
            </div>
            <span className="text-xs text-gray-600 mt-1">Consult</span>
          </Link>
          <Link href="/contact" className="flex flex-col items-center p-2 cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-customer-service-line text-xl text-gray-600"></i>
            </div>
            <span className="text-xs text-gray-600 mt-1">Contact</span>
          </Link>
        </div>
      </nav>
    </>
  );
}