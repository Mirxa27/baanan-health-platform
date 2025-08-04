import type { Metadata } from 'next';
import ProductsHero from './ProductsHero';
import ProductCategories from './ProductCategories';
import ProductShowcase from './ProductShowcase';
import TechnicalSpecs from './TechnicalSpecs';
import ProductCTA from './ProductCTA';

export const metadata: Metadata = {
  title: 'Medical Device Catalog - 10,000+ Certified Medical Equipment',
  description: 'Browse our comprehensive catalog of medical devices and equipment. From imaging systems to respiratory devices, find certified medical equipment with warranty and professional installation.',
  keywords: [
    'medical devices catalog',
    'medical equipment',
    'MRI scanners',
    'ultrasound machines',
    'patient monitors',
    'respiratory equipment',
    'surgical instruments',
    'medical device marketplace',
    'certified medical equipment'
  ],
  openGraph: {
    title: 'Medical Device Catalog - Baanan Healthcare',
    description: 'Browse 10,000+ certified medical devices with warranty and professional installation.',
    url: 'https://baanan.com/products',
    images: [
      {
        url: '/og-products.jpg',
        width: 1200,
        height: 630,
        alt: 'Medical Device Catalog',
      },
    ],
  },
  alternates: {
    canonical: 'https://baanan.com/products',
  },
};

export default function ProductsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Medical Device Catalog',
    'description': 'Comprehensive catalog of medical devices and equipment',
    'provider': {
      '@type': 'Organization',
      'name': 'Baanan Healthcare Solutions',
    },
    'mainEntity': {
      '@type': 'ItemList',
      'numberOfItems': '10000+',
      'itemListElement': [
        {
          '@type': 'Product',
          'category': 'Medical Imaging Equipment',
          'name': 'MRI Scanners',
        },
        {
          '@type': 'Product',
          'category': 'Patient Monitoring',
          'name': 'Vital Signs Monitors',
        },
        {
          '@type': 'Product',
          'category': 'Respiratory Equipment',
          'name': 'Ventilators',
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main>
        <ProductsHero />
        <ProductCategories />
        <ProductShowcase />
        <TechnicalSpecs />
        <ProductCTA />
      </main>
    </>
  );
}
