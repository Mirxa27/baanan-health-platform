import type { Metadata } from 'next';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

export const metadata: Metadata = {
  title: 'Baanan Healthcare Solutions - Leading Medical Device Management Platform',
  description: 'Transform your healthcare facility with our comprehensive medical device management platform. Buy, rent, and maintain medical equipment with AI-powered insights across the GCC region.',
  keywords: [
    'medical device management',
    'healthcare technology',
    'medical equipment marketplace',
    'healthcare consulting GCC',
    'medical device rental',
    'hospital equipment Saudi Arabia'
  ],
  openGraph: {
    title: 'Baanan Healthcare Solutions - Medical Device Management Platform',
    description: 'Transform your healthcare facility with our comprehensive medical device management platform.',
    url: 'https://baanan.com',
    siteName: 'Baanan Healthcare Solutions',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Baanan Healthcare Solutions Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baanan Healthcare Solutions',
    description: 'Transform your healthcare facility with our comprehensive medical device management platform.',
    images: ['/og-home.jpg'],
  },
  alternates: {
    canonical: 'https://baanan.com',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
