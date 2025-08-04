import type { Metadata } from 'next';
import ResourcesHero from './ResourcesHero';
import BlogArticles from './BlogArticles';
import ResearchPapers from './ResearchPapers';
import NewsUpdates from './NewsUpdates';
import ResourcesCTA from './ResourcesCTA';

export const metadata: Metadata = {
  title: 'Healthcare Resources & Knowledge Hub - Medical Technology Insights',
  description: 'Access comprehensive healthcare resources, research papers, industry insights, and expert analysis on medical technology trends, device management, and healthcare innovation.',
  keywords: [
    'healthcare resources',
    'medical technology insights',
    'healthcare research papers',
    'medical device trends',
    'healthcare innovation',
    'medical technology news',
    'healthcare knowledge base',
    'medical industry analysis'
  ],
  openGraph: {
    title: 'Healthcare Resources & Knowledge Hub - Baanan Healthcare',
    description: 'Access comprehensive healthcare resources and expert insights on medical technology.',
    url: 'https://baanan.com/resources',
    images: [
      {
        url: '/og-resources.jpg',
        width: 1200,
        height: 630,
        alt: 'Healthcare Resources and Knowledge Hub',
      },
    ],
  },
  alternates: {
    canonical: 'https://baanan.com/resources',
  },
};

export default function ResourcesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'Healthcare Resources & Knowledge Hub',
    'description': 'Comprehensive healthcare resources and medical technology insights',
    'publisher': {
      '@type': 'Organization',
      'name': 'Baanan Healthcare Solutions',
    },
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': [
        {
          '@type': 'Article',
          'headline': 'Healthcare Technology Blog',
          'description': 'Latest insights and trends in medical technology',
        },
        {
          '@type': 'ScholarlyArticle',
          'headline': 'Research Papers',
          'description': 'Academic research on healthcare innovation',
        },
        {
          '@type': 'NewsArticle',
          'headline': 'Industry News',
          'description': 'Latest healthcare industry news and updates',
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
        <ResourcesHero />
        <BlogArticles />
        <ResearchPapers />
        <NewsUpdates />
        <ResourcesCTA />
      </main>
    </>
  );
}
