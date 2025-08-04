import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import Providers from './components/Providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileNavigation from '../components/MobileNavigation';

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://baanan.com'),
  title: {
    default: 'Baanan Healthcare Solutions - Medical Device Management Platform',
    template: '%s | Baanan Healthcare'
  },
  description: 'Leading healthcare technology platform in the GCC. Medical device marketplace, consultancy services, and comprehensive healthcare solutions for hospitals and clinics.',
  keywords: [
    'medical devices',
    'healthcare technology',
    'medical equipment',
    'healthcare consulting',
    'hospital equipment',
    'medical device marketplace',
    'healthcare solutions',
    'GCC healthcare',
    'Saudi Arabia medical devices'
  ],
  authors: [{ name: 'Baanan Healthcare Solutions' }],
  creator: 'Baanan Healthcare Solutions',
  publisher: 'Baanan Healthcare Solutions',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
    url: 'https://baanan.com',
    siteName: 'Baanan Healthcare Solutions',
    title: 'Baanan Healthcare Solutions - Medical Device Management Platform',
    description: 'Leading healthcare technology platform in the GCC. Medical device marketplace, consultancy services, and comprehensive healthcare solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Baanan Healthcare Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baanan Healthcare Solutions',
    description: 'Leading healthcare technology platform in the GCC',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://baanan.com',
    languages: {
      'en-US': 'https://baanan.com',
      'ar-SA': 'https://baanan.com/ar',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Baanan Healthcare Solutions",
              "url": "https://baanan.com",
              "logo": "https://baanan.com/baanan-logo.png",
              "description": "Leading healthcare technology platform in the GCC",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "SA",
                "addressRegion": "Riyadh"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+966564406725",
                "contactType": "customer service",
                "availableLanguage": ["English", "Arabic"]
              },
              "sameAs": [
                "https://linkedin.com/company/baanan-healthcare",
                "https://twitter.com/baanan_health"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased bg-gray-50`}
      >
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-20">
              {children}
            </main>
            <Footer />
            <MobileNavigation />
          </div>
        </Providers>
      </body>
    </html>
  );
}
