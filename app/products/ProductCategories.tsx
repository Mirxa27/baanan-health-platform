'use client';
import { useState } from 'react';

export default function ProductCategories() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      title: 'Smart Medical Equipment',
      description: 'IoT-enabled devices for continuous health monitoring and real-time data collection with seamless integration into healthcare systems.',
      icon: 'ri-smartphone-line',
      color: 'blue',
      products: [
        'Smart Blood Pressure Monitors',
        'Connected Glucometers', 
        'IoT ECG Devices',
        'Intelligent Thermometers',
        'Smart Pulse Oximeters'
      ]
    },
    {
      title: 'Robotic Physiotherapy',
      description: 'AI-driven robotic systems providing precise and consistent physiotherapy treatments with personalized rehabilitation programs.',
      icon: 'ri-robot-line',
      color: 'purple',
      products: [
        'Automated Gait Trainers',
        'Robotic Arm Therapy',
        'Smart Balance Platforms',
        'Exoskeleton Systems',
        'Rehabilitation Robots'
      ]
    },
    {
      title: 'Posture Correctors',
      description: 'Intelligent posture monitoring systems with real-time feedback and personalized correction programs for spinal health.',
      icon: 'ri-user-heart-line',
      color: 'green',
      products: [
        'Smart Posture Sensors',
        'Ergonomic Support Devices',
        'Spinal Alignment Systems',
        'Workplace Posture Monitors',
        'Rehabilitation Correctors'
      ]
    },
    {
      title: 'Wearable Health Monitors',
      description: 'Comprehensive wearable devices tracking vital signs, activity levels, and health metrics with 24/7 monitoring.',
      icon: 'ri-heart-pulse-line',
      color: 'red',
      products: [
        'Continuous Health Trackers',
        'Medical Smartwatches',
        'Vital Signs Monitors',
        'Activity Tracking Devices',
        'Sleep Quality Analyzers'
      ]
    },
    {
      title: 'AI Diagnostic Tools',
      description: 'Machine learning-powered diagnostic systems providing accurate health assessments and predictive analytics.',
      icon: 'ri-brain-line',
      color: 'indigo',
      products: [
        'AI Image Analysis',
        'Predictive Health Models',
        'Diagnostic Decision Support',
        'Pattern Recognition Systems',
        'Health Risk Assessments'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      green: 'bg-green-100 text-green-600',
      red: 'bg-red-100 text-red-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Product
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Categories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of healthcare technology solutions, each designed to address specific medical needs and improve patient outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div 
                key={index}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeCategory === index 
                    ? 'bg-white shadow-lg scale-105 border-2 border-blue-200' 
                    : 'bg-white/70 hover:bg-white hover:shadow-md'
                }`}
                onClick={() => setActiveCategory(index)}
              >
                <div className="flex items-start">
                  <div className={`w-16 h-16 flex items-center justify-center rounded-2xl mr-6 ${getColorClasses(category.color)}`}>
                    <i className={`${category.icon} text-2xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{category.description}</p>
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className={`ri-arrow-right-line text-xl transition-transform duration-300 ${
                      activeCategory === index ? 'rotate-90 text-blue-600' : 'text-gray-400'
                    }`}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sticky top-32">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-white/50">
              <div className="mb-8">
                <img 
                  src="https://readdy.ai/api/search-image?query=modern%20healthcare%20technology%20devices%20showcase%2C%20smart%20medical%20equipment%20display%2C%20professional%20medical%20devices%20arrangement%2C%20clean%20white%20background%2C%20innovative%20healthcare%20technology%2C%20minimalist%20product%20photography&width=600&height=400&seq=category-showcase&orientation=landscape"
                  alt={categories[activeCategory].title}
                  className="w-full h-64 object-cover object-top rounded-2xl mb-6"
                />
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {categories[activeCategory].title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {categories[activeCategory].description}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Available Products:</h4>
                <ul className="space-y-3">
                  {categories[activeCategory].products.map((product, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{product}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
                  Request Product Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}