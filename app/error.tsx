'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-2xl w-full text-center px-6">
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <i className="ri-error-warning-line text-5xl text-white"></i>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We encountered an unexpected error while loading the Halol platform. Our team has been notified and is working to resolve this issue.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button
            onClick={reset}
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 px-8 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center"
          >
            <i className="ri-refresh-line mr-2"></i>
            Try Again
          </button>
          <Link
            href="/"
            className="border-2 border-red-500 text-red-500 py-4 px-8 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
          >
            <i className="ri-home-line mr-2"></i>
            Go Home
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Need immediate assistance?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="tel:+966564406725"
              className="flex items-center justify-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <i className="ri-phone-line text-blue-600 mr-2"></i>
              <span className="text-blue-600 font-medium">+966564406725</span>
            </a>
            <a
              href="mailto:support@baanan.com"
              className="flex items-center justify-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <i className="ri-mail-line text-green-600 mr-2"></i>
              <span className="text-green-600 font-medium">support@baanan.com</span>
            </a>
          </div>
        </div>

        {error.digest && (
          <div className="text-sm text-gray-500">
            <p>Error ID: {error.digest}</p>
            <p className="mt-2">Please include this ID when contacting support.</p>
          </div>
        )}
      </div>
    </div>
  );
}