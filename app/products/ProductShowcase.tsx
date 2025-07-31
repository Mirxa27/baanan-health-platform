'use client';
import Link from 'next/link';

export default function ProductShowcase() {
  const featuredProducts = [
    {
      name: 'BaananCare Pro Monitor',
      category: 'Smart Monitoring',
      description: 'Advanced multi-parameter patient monitor with AI-powered early warning system and seamless EMR integration.',
      features: ['Real-time Vitals Tracking', 'AI Predictive Analytics', 'Cloud Connectivity', 'Mobile Alerts'],
      price: 'Starting at SAR 15,000',
      image: 'https://readdy.ai/api/search-image?query=professional%20medical%20patient%20monitor%20with%20digital%20display%2C%20modern%20healthcare%20monitoring%20device%2C%20clean%20white%20background%2C%20medical%20grade%20equipment%2C%20hospital%20bedside%20monitor%2C%20sleek%20modern%20design&width=500&height=400&seq=baanan-monitor&orientation=landscape',
      color: 'blue'
    },
    {
      name: 'RoboTherapy Assistant',
      category: 'Robotic Physiotherapy',
      description: 'Intelligent robotic physiotherapy system with personalized treatment protocols and progress tracking.',
      features: ['Automated Therapy Sessions', 'Progress Analytics', 'Customizable Programs', 'Safety Systems'],
      price: 'Starting at SAR 45,000',
      image: 'https://readdy.ai/api/search-image?query=advanced%20robotic%20physiotherapy%20machine%2C%20medical%20rehabilitation%20robot%2C%20automated%20therapy%20equipment%2C%20clean%20clinical%20environment%2C%20modern%20robotic%20medical%20device%2C%20professional%20healthcare%20robotics&width=500&height=400&seq=robotic-therapy&orientation=landscape',
      color: 'purple'
    },
    {
      name: 'SmartPosture Guardian',
      category: 'Posture Correction',
      description: 'Wearable posture monitoring device with real-time feedback and personalized correction programs.',
      features: ['Real-time Posture Alerts', 'Mobile App Integration', 'Progress Reports', 'Comfortable Design'],
      price: 'Starting at SAR 1,200',
      image: 'https://readdy.ai/api/search-image?query=smart%20posture%20correction%20wearable%20device%2C%20ergonomic%20posture%20monitor%2C%20sleek%20wearable%20technology%2C%20modern%20health%20tracker%2C%20clean%20white%20background%2C%20professional%20medical%20wearable&width=500&height=400&seq=posture-device&orientation=landscape',
      color: 'green'
    },
    {
      name: 'VitalTrack Wearable',
      category: 'Health Monitoring',
      description: 'Comprehensive health tracking device with continuous monitoring and emergency alert capabilities.',
      features: ['24/7 Health Monitoring', 'Emergency Alerts', 'Fitness Tracking', 'Long Battery Life'],
      price: 'Starting at SAR 800',
      image: 'https://readdy.ai/api/search-image?query=modern%20health%20tracking%20smartwatch%2C%20medical%20grade%20wearable%20device%2C%20fitness%20and%20health%20monitor%2C%20sleek%20wearable%20technology%2C%20clean%20white%20background%2C%20professional%20healthcare%20wearable&width=500&height=400&seq=health-tracker&orientation=landscape',
      color: 'red'
    },
    {
      name: 'AI Diagnostic Suite',
      category: 'AI Analytics',
      description: 'Comprehensive AI-powered diagnostic platform with machine learning algorithms for accurate health assessments.',
      features: ['AI Image Analysis', 'Predictive Diagnostics', 'Clinical Decision Support', 'Integration Ready'],
      price: 'Custom Pricing',
      image: 'https://readdy.ai/api/search-image?query=AI%20diagnostic%20software%20interface%20display%2C%20medical%20artificial%20intelligence%20system%2C%20healthcare%20data%20analytics%20dashboard%2C%20modern%20medical%20technology%20screen%2C%20clean%20professional%20interface&width=500&height=400&seq=ai-diagnostics&orientation=landscape',
      color: 'indigo'
    },
    {
      name: 'ConnectCare Platform',
      category: 'Integrated Solutions',
      description: 'Unified healthcare platform connecting all devices and providing comprehensive patient management.',
      features: ['Device Integration', 'Patient Management', 'Data Analytics', 'Telehealth Support'],
      price: 'Enterprise Solution',
      image: 'https://readdy.ai/api/search-image?query=integrated%20healthcare%20platform%20interface%2C%20connected%20medical%20devices%20dashboard%2C%20healthcare%20management%20system%2C%20modern%20medical%20technology%20interface%2C%20clean%20professional%20design&width=500&height=400&seq=connect-platform&orientation=landscape',
      color: 'teal'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      green: 'bg-green-100 text-green-600',
      red: 'bg-red-100 text-red-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      teal: 'bg-teal-100 text-teal-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Featured
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our flagship healthcare technology products, each engineered to deliver exceptional performance and improve patient outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              <div className="relative">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover object-top"
                />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(product.color)}`}>
                  {product.category}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-bold text-blue-600">{product.price}</span>
                </div>
                
                <div className="flex flex-col gap-3">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
                    Request Quote
                  </button>
                  <Link 
                    href="/halol"
                    className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all text-center cursor-pointer whitespace-nowrap"
                  >
                    View in Halol App
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/halol"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            Browse All Products in Halol App
          </Link>
        </div>
      </div>
    </section>
  );
}