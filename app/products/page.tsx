'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useTranslation } from '../../hooks/useTranslation';

export default function ProductsPage() {
  const { t } = useTranslation('products');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products', icon: 'ri-hospital-line' },
    { id: 'vital-signs', name: 'Vital Signs', icon: 'ri-heart-pulse-line' },
    { id: 'respiratory', name: 'Respiratory', icon: 'ri-lungs-line' },
    { id: 'mobility', name: 'Mobility', icon: 'ri-wheelchair-line' },
    { id: 'diagnostic', name: 'Diagnostic', icon: 'ri-stethoscope-line' },
    { id: 'furniture', name: 'Medical Furniture', icon: 'ri-hotel-bed-line' }
  ];

  const products = [
    {
      id: 1,
      name: 'Digital Blood Pressure Monitor',
      category: 'vital-signs',
      price: '$299',
      originalPrice: '$349',
      icon: 'ri-heart-pulse-line',
      features: ['Automatic inflation', 'Memory storage', 'Large LCD display', 'Irregular heartbeat detection'],
      rating: 4.8,
      reviews: 124,
      availability: 'In Stock'
    },
    {
      id: 2,
      name: 'Pulse Oximeter Pro',
      category: 'vital-signs',
      price: '$149',
      originalPrice: '$179',
      icon: 'ri-heart-pulse-line',
      features: ['SpO2 monitoring', 'Pulse rate display', 'Low battery indicator', 'Auto power off'],
      rating: 4.9,
      reviews: 89,
      availability: 'In Stock'
    },
    {
      id: 3,
      name: 'Nebulizer Machine',
      category: 'respiratory',
      price: '$199',
      originalPrice: '$229',
      icon: 'ri-heart-pulse-line',
      features: ['Quiet operation', 'Fast nebulization', 'Easy cleaning', 'Compact design'],
      rating: 4.7,
      reviews: 156,
      availability: 'Low Stock'
    },
    {
      id: 4,
      name: 'Digital Thermometer',
      category: 'vital-signs',
      price: '$49',
      originalPrice: '$59',
      icon: 'ri-heart-pulse-line',
      features: ['Fast reading', 'Fever alarm', 'Memory recall', 'Waterproof'],
      rating: 4.6,
      reviews: 203,
      availability: 'In Stock'
    },
    {
      id: 5,
      name: 'Electric Wheelchair',
      category: 'mobility',
      price: '$1,299',
      originalPrice: '$1,499',
      icon: 'ri-heart-pulse-line',
      features: ['Long battery life', 'Comfortable seating', 'Easy controls', 'Foldable design'],
      rating: 4.8,
      reviews: 67,
      availability: 'In Stock'
    },
    {
      id: 6,
      name: 'Hospital Bed - Electric',
      category: 'furniture',
      price: '$2,299',
      originalPrice: '$2,599',
      icon: 'ri-heart-pulse-line',
      features: ['Height adjustment', 'Side rails', 'Trendelenburg position', 'Emergency backup'],
      rating: 4.9,
      reviews: 45,
      availability: 'In Stock'
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                <i className="ri-shopping-bag-line mr-2"></i>
                Medical Equipment
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Products & Services
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our comprehensive range of medical devices and equipment, available for purchase or rental through the Halol platform.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">10,000+</div>
                <div className="text-gray-600">Medical Devices</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-gray-600">Healthcare Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">99.9%</div>
                <div className="text-gray-600">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <i className={`${category.icon} mr-2`}></i>
                  {category.name}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105">
                  <div className="relative">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <i className="ri-hospital-line text-4xl text-gray-400"></i>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.availability === 'In Stock' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {product.availability}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} text-yellow-400 text-sm`}></i>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                        <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <i className="ri-check-line text-green-600 mr-2"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        <i className="ri-shopping-cart-line mr-2"></i>
                        Buy Now
                      </button>
                      <button className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                        <i className="ri-refresh-line mr-2"></i>
                        Rent
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Need Help Choosing the Right Equipment?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Our medical device experts are here to help you find the perfect solution for your healthcare facility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <i className="ri-customer-service-line mr-2"></i>
                Consult Our Experts
              </a>
              <a
                href="/halol"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                <i className="ri-dashboard-line mr-2"></i>
                Browse Halol Platform
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
