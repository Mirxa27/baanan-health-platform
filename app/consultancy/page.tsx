import type { Metadata } from 'next';
import ConsultancyHero from './ConsultancyHero';
import Services from './Services';
import ExpertTeam from './ExpertTeam';
import CaseStudies from './CaseStudies';
import ConsultancyCTA from './ConsultancyCTA';

export const metadata: Metadata = {
  title: 'Healthcare Technology Consulting - Expert Digital Transformation',
  description: 'Transform your healthcare organization with expert consulting services. Digital transformation, system integration, technology assessment, and change management for healthcare facilities across the GCC.',
  keywords: [
    'healthcare consulting',
    'digital transformation healthcare',
    'medical technology consulting',
    'healthcare system integration',
    'healthcare IT consulting',
    'hospital technology consulting',
    'healthcare change management',
    'medical device integration'
  ],
  openGraph: {
    title: 'Healthcare Technology Consulting - Baanan Healthcare',
    description: 'Expert consulting services for healthcare digital transformation across the GCC.',
    url: 'https://baanan.com/consultancy',
    images: [
      {
        url: '/og-consultancy.jpg',
        width: 1200,
        height: 630,
        alt: 'Healthcare Technology Consulting',
      },
    ],
  },
  alternates: {
    canonical: 'https://baanan.com/consultancy',
  },
};

export default function ConsultancyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Healthcare Technology Consulting',
    'description': 'Expert consulting services for healthcare digital transformation',
    'provider': {
      '@type': 'Organization',
      'name': 'Baanan Healthcare Solutions',
      'url': 'https://baanan.com',
    },
    'serviceType': 'Healthcare IT Consulting',
    'areaServed': {
      '@type': 'Place',
      'name': 'GCC Countries',
    },
    'offers': {
      '@type': 'Offer',
      'description': 'Comprehensive healthcare technology consulting services',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main>
        <ConsultancyHero />
        <Services />
        <ExpertTeam />
        <CaseStudies />
        <ConsultancyCTA />
      </main>
    </>
  );
}
