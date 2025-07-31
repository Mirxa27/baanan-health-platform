'use client';

export default function TechnicalSpecs() {
  const specifications = [
    {
      category: 'Connectivity & Integration',
      specs: [
        { feature: 'Wireless Protocols', value: 'Wi-Fi 6, Bluetooth 5.2, LoRaWAN' },
        { feature: 'Cloud Integration', value: 'AWS, Azure, Google Cloud' },
        { feature: 'EMR Compatibility', value: 'HL7 FHIR, Epic, Cerner' },
        { feature: 'Mobile Apps', value: 'iOS, Android, Web Portal' }
      ],
      icon: 'ri-wifi-line',
      color: 'blue'
    },
    {
      category: 'Security & Compliance',
      specs: [
        { feature: 'Data Encryption', value: 'AES-256, End-to-End' },
        { feature: 'Compliance', value: 'HIPAA, GDPR, FDA Approved' },
        { feature: 'Authentication', value: 'Multi-Factor, Biometric' },
        { feature: 'Data Storage', value: 'Local & Cloud Backup' }
      ],
      icon: 'ri-shield-check-line',
      color: 'green'
    },
    {
      category: 'Performance & Reliability',
      specs: [
        { feature: 'Uptime Guarantee', value: '99.9% SLA' },
        { feature: 'Response Time', value: '<100ms Real-time' },
        { feature: 'Battery Life', value: '7-30 days (device dependent)' },
        { feature: 'Operating Temp', value: '-10°C to +50°C' }
      ],
      icon: 'ri-speed-up-line',
      color: 'purple'
    },
    {
      category: 'AI & Analytics',
      specs: [
        { feature: 'AI Models', value: 'TensorFlow, PyTorch' },
        { feature: 'Prediction Accuracy', value: '>95% Clinical Validation' },
        { feature: 'Data Processing', value: 'Real-time Edge Computing' },
        { feature: 'Learning Capability', value: 'Continuous Model Updates' }
      ],
      icon: 'ri-brain-line',
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Technical
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Specifications</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our healthcare technology solutions meet the highest industry standards with enterprise-grade performance and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {specifications.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 flex items-center justify-center rounded-2xl mr-6 ${getColorClasses(category.color)}`}>
                  <i className={`${category.icon} text-2xl`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
              </div>
              
              <div className="space-y-4">
                {category.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-700 font-medium">{spec.feature}</span>
                    <span className="text-gray-900 font-semibold text-right max-w-xs">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div 
          className="relative rounded-3xl p-16 text-center text-white overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.9), rgba(147, 51, 234, 0.9)), url('https://readdy.ai/api/search-image?query=modern%20healthcare%20technology%20laboratory%2C%20medical%20research%20facility%20with%20advanced%20equipment%2C%20professional%20healthcare%20innovation%20center%2C%20clean%20scientific%20environment%2C%20medical%20technology%20development%2C%20futuristic%20healthcare%20setting&width=1200&height=400&seq=tech-specs-cta&orientation=landscape')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Need Custom Specifications?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Our engineering team can customize any solution to meet your specific healthcare facility requirements and integration needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
                Request Custom Quote
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
                Technical Documentation
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4">
              <i className="ri-award-line text-2xl text-blue-600"></i>
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-2">ISO 13485</div>
            <div className="text-gray-700 font-medium">Medical Device Quality</div>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
              <i className="ri-shield-check-line text-2xl text-green-600"></i>
            </div>
            <div className="text-2xl font-bold text-green-600 mb-2">FDA</div>
            <div className="text-gray-700 font-medium">Approved Devices</div>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-4">
              <i className="ri-security-scan-line text-2xl text-purple-600"></i>
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-2">HIPAA</div>
            <div className="text-gray-700 font-medium">Compliant Security</div>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 flex items-center justify-center bg-orange-100 rounded-full mx-auto mb-4">
              <i className="ri-global-line text-2xl text-orange-600"></i>
            </div>
            <div className="text-2xl font-bold text-orange-600 mb-2">CE Mark</div>
            <div className="text-gray-700 font-medium">European Compliance</div>
          </div>
        </div>
      </div>
    </section>
  );
}