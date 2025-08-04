import type { Metadata } from 'next';
import AboutHero from './AboutHero';
import VisionMission from './VisionMission';
import Values from './Values';
import Leadership from './Leadership';
import Achievements from './Achievements';

export const metadata: Metadata = {
  title: 'About Us - Healthcare Technology Leaders in the GCC',
  description: 'Learn about Baanan Healthcare Solutions, the leading medical device management platform transforming healthcare across Saudi Arabia and the GCC region since 2020.',
  keywords: [
    'about baanan healthcare',
    'medical technology company',
    'healthcare innovation GCC',
    'medical device company Saudi Arabia',
    'healthcare consulting team',
    'medical technology leaders'
  ],
  openGraph: {
    title: 'About Baanan Healthcare Solutions',
    description: 'Healthcare technology leaders transforming medical device management across the GCC.',
    url: 'https://baanan.com/about',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'Baanan Healthcare Team',
      },
    ],
  },
  alternates: {
    canonical: 'https://baanan.com/about',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'mainEntity': {
      '@type': 'Organization',
      'name': 'Baanan Healthcare Solutions',
      'description': 'Leading medical device management platform in the GCC',
      'foundingDate': '2020',
      'founders': [
        {
          '@type': 'Person',
          'name': 'Healthcare Technology Leaders',
        },
      ],
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'SA',
        'addressRegion': 'Riyadh Province',
      },
      'sameAs': [
        'https://linkedin.com/company/baanan-healthcare',
        'https://twitter.com/baanan_health',
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article>
        <AboutHero />
        <VisionMission />
        <Values />
        <Leadership />
        <Achievements />
      </article>
    </>
  );
}
