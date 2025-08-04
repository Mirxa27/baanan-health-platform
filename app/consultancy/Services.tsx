export default function Services() {
  const services = [
    {
      icon: 'ri-computer-line',
      title: 'Digital Transformation',
      description: 'Modernize your healthcare operations with cutting-edge technology solutions and strategic digital initiatives.',
      features: ['Electronic Health Records', 'Digital Workflow Automation', 'Cloud Migration', 'Data Analytics'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'ri-settings-3-line',
      title: 'System Integration',
      description: 'Seamlessly connect medical devices, software systems, and healthcare platforms for optimal efficiency.',
      features: ['API Development', 'Device Connectivity', 'Data Synchronization', 'Workflow Integration'],
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Compliance & Security',
      description: 'Ensure your healthcare technology meets regulatory requirements and maintains the highest security standards.',
      features: ['HIPAA Compliance', 'Data Encryption', 'Security Audits', 'Risk Assessment'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'ri-team-line',
      title: 'Change Management',
      description: 'Guide your organization through technology transitions with comprehensive training and support.',
      features: ['Staff Training', 'Process Optimization', 'User Adoption', 'Ongoing Support'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Performance Analytics',
      description: 'Leverage data-driven insights to optimize healthcare operations and improve patient outcomes.',
      features: ['KPI Dashboards', 'Predictive Analytics', 'Performance Metrics', 'Business Intelligence'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: 'ri-customer-service-line',
      title: 'Strategic Consulting',
      description: 'Develop comprehensive technology strategies aligned with your healthcare organization\'s goals.',
      features: ['Technology Roadmap', 'Vendor Selection', 'Budget Planning', 'ROI Analysis'],
      color: 'from-gray-600 to-gray-800'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Consulting Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive healthcare technology consulting services designed to transform 
            your organization and improve patient care outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
              <div className="p-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <i className={`${service.icon} text-2xl text-white`}></i>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <i className="ri-check-line text-white text-xs"></i>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/contact"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105"
          >
            <i className="ri-phone-line mr-2"></i>
            Schedule a Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
