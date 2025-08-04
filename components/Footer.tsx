'use client';
import Link from 'next/link';
import { useTranslation } from '../hooks/useTranslation.simple';

export default function Footer() {
  const { t } = useTranslation('common');

  const productCategories = [
    { name: 'Medical Imaging', href: '/products/imaging-equipment' },
    { name: 'Patient Monitoring', href: '/products/patient-monitoring' },
    { name: 'Respiratory Equipment', href: '/products/respiratory-devices' },
    { name: 'Surgical Instruments', href: '/products/surgical-instruments' },
  ];

  const services = [
    { name: 'Medical Device Marketplace', href: '/halol' },
    { name: 'Healthcare Consulting', href: '/consultancy' },
    { name: 'Equipment Rental', href: '/halol/dashboard?tab=rentals' },
    { name: 'Maintenance Services', href: '/halol/dashboard?tab=maintenance' },
  ];

  const resources = [
    { name: 'Healthcare Blog', href: '/resources/blog' },
    { name: 'Research Papers', href: '/resources/research-papers' },
    { name: 'News & Updates', href: '/resources/news-updates' },
    { name: 'Case Studies', href: '/resources/case-studies' },
  ];

  const company = [
    { name: t('about_us_title'), href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press & Media', href: '/press' },
    { name: 'Investor Relations', href: '/investors' },
  ];

  const support = [
    { name: t('contact_title'), href: '/contact' },
    { name: 'Help Center', href: '/help' },
    { name: 'API Documentation', href: '/api-docs' },
    { name: 'System Status', href: '/status' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <img
                  src="/baanan-logo-white.png"
                  alt="Baanan Healthcare Solutions"
                  className="h-12 w-auto"
                />
                <div>
                  <span className="text-2xl font-bold">Baanan</span>
                  <span className="block text-sm text-gray-400">Healthcare Solutions</span>
                </div>
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Leading healthcare technology platform in the GCC, transforming medical device management 
                through innovation, quality, and comprehensive solutions.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com/company/baanan-healthcare"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
                <a
                  href="https://twitter.com/baanan_health"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <i className="ri-twitter-fill text-lg"></i>
                </a>
                <a
                  href="https://youtube.com/@baananhealthcare"
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <i className="ri-youtube-fill text-lg"></i>
                </a>
                <a
                  href="https://instagram.com/baananhealthcare"
                  className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <i className="ri-instagram-fill text-lg"></i>
                </a>
              </div>
            </div>

            {/* Product Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Products</h3>
              <ul className="space-y-3">
                {productCategories.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3">
                {services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Resources</h3>
              <ul className="space-y-3">
                {resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3">
                {support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-center space-x-3 mb-3">
                  <i className="ri-phone-line text-blue-400"></i>
                  <a
                    href="tel:+966564406725"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +966 564 406 725
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="ri-mail-line text-blue-400"></i>
                  <a
                    href="mailto:info@baanan.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    info@baanan.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400">
                Get the latest healthcare technology insights and product updates.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Baanan Healthcare Solutions. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
