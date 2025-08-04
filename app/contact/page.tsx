import type { Metadata } from 'next';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import LocationMap from './LocationMap';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with Healthcare Technology Experts',
  description: 'Contact Baanan Healthcare Solutions for medical device solutions, technology consulting, and support. Reach our experts in Riyadh, Saudi Arabia for comprehensive healthcare technology services.',
  keywords: [
    'contact baanan healthcare',
    'healthcare technology support',
    'medical device consultation',
    'healthcare consulting contact',
    'riyadh healthcare technology',
    'medical technology support saudi arabia'
  ],
  openGraph: {
    title: 'Contact Baanan Healthcare Solutions',
    description: 'Get in touch with our healthcare technology experts for comprehensive medical device solutions.',
    url: 'https://baanan.com/contact',
    images: [
      {
        url: '/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Baanan Healthcare Solutions',
      },
    ],
  },
  alternates: {
    canonical: 'https://baanan.com/contact',
  },
};

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'mainEntity': {
      '@type': 'Organization',
      'name': 'Baanan Healthcare Solutions',
      'url': 'https://baanan.com',
      'contactPoint': [
        {
          '@type': 'ContactPoint',
          'telephone': '+966564406725',
          'contactType': 'customer service',
          'availableLanguage': ['English', 'Arabic'],
          'areaServed': 'GCC',
        },
        {
          '@type': 'ContactPoint',
          'email': 'info@baanan.com',
          'contactType': 'customer service',
        },
      ],
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'SA',
        'addressRegion': 'Riyadh Province',
        'addressLocality': 'Riyadh',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main>
        <ContactHero />
        <div className="grid lg:grid-cols-2 gap-0">
          <ContactForm />
          <ContactInfo />
        </div>
        <LocationMap />
      </main>
    </>
  );
}
