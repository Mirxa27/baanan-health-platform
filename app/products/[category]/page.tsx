import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductsHero from '../ProductsHero';
import ProductCategories from '../ProductCategories';

// Define valid product categories
const PRODUCT_CATEGORIES = {
  'imaging-equipment': {
    name: 'Medical Imaging Equipment',
    description: 'Advanced imaging systems including MRI, CT, X-ray, and ultrasound machines for accurate diagnosis.',
    keywords: ['MRI scanners', 'CT machines', 'X-ray equipment', 'ultrasound systems', 'medical imaging'],
  },
  'patient-monitoring': {
    name: 'Patient Monitoring Systems',
    description: 'Comprehensive patient monitoring solutions for vital signs, cardiac monitoring, and critical care.',
    keywords: ['patient monitors', 'vital signs monitors', 'cardiac monitors', 'ICU equipment'],
  },
  'respiratory-devices': {
    name: 'Respiratory Equipment',
    description: 'Ventilators, oxygen concentrators, and respiratory support devices for patient care.',
    keywords: ['ventilators', 'oxygen concentrators', 'CPAP machines', 'respiratory therapy'],
  },
  'surgical-instruments': {
    name: 'Surgical Instruments',
    description: 'Precision surgical tools and equipment for various medical procedures and operations.',
    keywords: ['surgical tools', 'operating room equipment', 'surgical instruments', 'minimally invasive surgery'],
  },
  'emergency-equipment': {
    name: 'Emergency Medical Equipment',
    description: 'Critical care equipment for emergency departments and ambulance services.',
    keywords: ['defibrillators', 'emergency monitors', 'resuscitation equipment', 'trauma care'],
  },
  'mobility-aids': {
    name: 'Mobility and Rehabilitation',
    description: 'Wheelchairs, mobility aids, and rehabilitation equipment for patient mobility.',
    keywords: ['wheelchairs', 'mobility aids', 'rehabilitation equipment', 'patient transport'],
  },
  'laboratory-equipment': {
    name: 'Laboratory Equipment',
    description: 'Diagnostic laboratory equipment and instruments for medical testing and analysis.',
    keywords: ['lab equipment', 'diagnostic instruments', 'analyzers', 'laboratory automation'],
  },
  'diagnostic-tools': {
    name: 'Diagnostic Tools',
    description: 'Portable and point-of-care diagnostic devices for accurate medical diagnosis.',
    keywords: ['diagnostic devices', 'point of care testing', 'portable diagnostics', 'medical testing'],
  },
} as const;

type CategoryKey = keyof typeof PRODUCT_CATEGORIES;

interface PageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(PRODUCT_CATEGORIES).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const categoryData = PRODUCT_CATEGORIES[params.category as CategoryKey];
  
  if (!categoryData) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${categoryData.name} - Medical Device Catalog | Baanan Healthcare`,
    description: categoryData.description,
    keywords: categoryData.keywords,
    openGraph: {
      title: `${categoryData.name} - Baanan Healthcare`,
      description: categoryData.description,
      url: `https://baanan.com/products/${params.category}`,
      images: [
        {
          url: `/og-products-${params.category}.jpg`,
          width: 1200,
          height: 630,
          alt: categoryData.name,
        },
      ],
    },
    alternates: {
      canonical: `https://baanan.com/products/${params.category}`,
    },
  };
}

export default function ProductCategoryPage({ params }: PageProps) {
  const categoryData = PRODUCT_CATEGORIES[params.category as CategoryKey];
  
  if (!categoryData) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': categoryData.name,
    'description': categoryData.description,
    'url': `https://baanan.com/products/${params.category}`,
    'provider': {
      '@type': 'Organization',
      'name': 'Baanan Healthcare Solutions',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main>
        {/* Hero Section with Category Focus */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <nav className="flex justify-center mb-6" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-blue-200">
                  <li>
                    <a href="/products" className="hover:text-white transition-colors">
                      Products
                    </a>
                  </li>
                  <li>
                    <i className="ri-arrow-right-s-line mx-2"></i>
                  </li>
                  <li className="text-white font-medium">
                    {categoryData.name}
                  </li>
                </ol>
              </nav>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {categoryData.name}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                {categoryData.description}
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/halol/dashboard"
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Browse {categoryData.name}
                </a>
                <a
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all"
                >
                  Request Quote
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories Grid */}
        <ProductCategories highlightCategory={params.category} />
        
        {/* Featured Products Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured {categoryData.name}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our most popular and advanced {categoryData.name.toLowerCase()} solutions.
              </p>
            </div>
            
            {/* This would be replaced with actual product grid component */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <i className="ri-hospital-line text-4xl text-blue-600"></i>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Sample Device {item}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Professional-grade medical equipment with advanced features and reliability.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-blue-600">
                        SAR {(50000 + item * 10000).toLocaleString()}
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
