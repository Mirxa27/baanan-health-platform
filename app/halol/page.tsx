import type { Metadata } from 'next';
import HalolHero from './HalolHero';
import AppFeatures from './AppFeatures';
import AppInterface from './AppInterface';
import UserTestimonials from './UserTestimonials';
import DownloadSection from './DownloadSection';

export const metadata: Metadata = {
  title: 'Halol Platform - Medical Device Management & Marketplace',
  description: 'Comprehensive medical device management platform. Buy, rent, and maintain medical equipment with AI-powered insights. Join thousands of healthcare professionals using Halol.',
  keywords: [
    'halol platform',
    'medical device marketplace',
    'medical equipment rental',
    'healthcare management platform',
    'medical device management',
    'healthcare technology platform',
    'medical equipment maintenance',
    'healthcare AI platform'
  ],
  openGraph: {
    title: 'Halol Platform - Medical Device Management & Marketplace',
    description: 'Comprehensive medical device management platform for healthcare professionals.',
    url: 'https://baanan.com/halol',
    images: [
      {
        url: '/og-halol.jpg',
        width: 1200,
        height: 630,
        alt: 'Halol Platform Interface',
      },
    ],
  },
  alternates: {
    canonical: 'https://baanan.com/halol',
  },
};

export default function HalolPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Halol Platform',
    'description': 'Comprehensive medical device management platform',
    'applicationCategory': 'HealthApplication',
    'operatingSystem': 'Web',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'SAR',
      'description': 'Free to join platform',
    },
    'provider': {
      '@type': 'Organization',
      'name': 'Baanan Healthcare Solutions',
    },
    'featureList': [
      'Medical Device Marketplace',
      'Equipment Rental System',
      'Maintenance Scheduling',
      'AI-Powered Analytics',
      'Customer Support',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main>
        <HalolHero />
        <AppFeatures />
        <AppInterface />
        <UserTestimonials />
        <DownloadSection />
      </main>
    </>
  );
}
