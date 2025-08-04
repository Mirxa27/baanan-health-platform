'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useTranslation } from '../../hooks/useTranslation.simple';

export default function DownloadSection() {
  const { t } = useTranslation('halol');
  const { data: session } = useSession();

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Get
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Started?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed">
            Join thousands of healthcare professionals who trust Halol for their 
            medical device management needs. Access the platform now through your web browser.
          </p>

          {/* Platform Access Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-computer-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Web Platform</h3>
              <p className="text-blue-200 mb-6">
                Access the full platform features through your web browser on any device.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-blue-300">
                <i className="ri-check-line"></i>
                <span>Available Now</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-smartphone-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Mobile Experience</h3>
              <p className="text-blue-200 mb-6">
                Optimized mobile web experience for on-the-go access and management.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-blue-300">
                <i className="ri-check-line"></i>
                <span>Responsive Design</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-colors opacity-75">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-download-cloud-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Native Apps</h3>
              <p className="text-blue-200 mb-6">
                Dedicated mobile apps for iOS and Android coming soon with enhanced features.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-yellow-400">
                <i className="ri-time-line"></i>
                <span>Coming Soon</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session ? (
              <Link
                href="/halol/dashboard"
                className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105"
              >
                <i className="ri-dashboard-line mr-2"></i>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/halol/auth/signup"
                  className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <i className="ri-user-add-line mr-2"></i>
                  Create Account
                </Link>
                <Link
                  href="/halol/auth/signin"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105"
                >
                  <i className="ri-login-box-line mr-2"></i>
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Platform Statistics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-300 mb-2">10,000+</div>
              <div className="text-blue-200 text-sm">Medical Devices</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-300 mb-2">500+</div>
              <div className="text-blue-200 text-sm">Healthcare Facilities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-300 mb-2">99.9%</div>
              <div className="text-blue-200 text-sm">Platform Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">24/7</div>
              <div className="text-blue-200 text-sm">Support Available</div>
            </div>
          </div>

          {/* Security & Compliance */}
          <div className="mt-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6">Secure & Compliant</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <i className="ri-shield-check-line text-green-400 text-lg"></i>
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-lock-2-line text-blue-400 text-lg"></i>
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-cloud-line text-purple-400 text-lg"></i>
                <span>Cloud Backup</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-award-line text-yellow-400 text-lg"></i>
                <span>ISO Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
