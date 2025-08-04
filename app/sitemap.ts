import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://baanan.com';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/consultancy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/halol`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // Product categories (would be dynamic in real implementation)
  const productCategories = [
    'imaging-equipment',
    'patient-monitoring',
    'respiratory-devices',
    'surgical-instruments',
    'emergency-equipment',
    'mobility-aids',
    'laboratory-equipment',
    'diagnostic-tools'
  ];

  const productPages = productCategories.map(category => ({
    url: `${baseUrl}/products/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Resources sections
  const resourceSections = [
    'blog',
    'research-papers',
    'news-updates',
    'case-studies'
  ];

  const resourcePages = resourceSections.map(section => ({
    url: `${baseUrl}/resources/${section}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Consultancy services
  const consultancyServices = [
    'digital-transformation',
    'system-integration',
    'technology-assessment',
    'change-management'
  ];

  const consultancyPages = consultancyServices.map(service => ({
    url: `${baseUrl}/consultancy/${service}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...productPages,
    ...resourcePages,
    ...consultancyPages,
  ];
}
