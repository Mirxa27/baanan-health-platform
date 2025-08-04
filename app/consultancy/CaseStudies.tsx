export default function CaseStudies() {
  const caseStudies = [
    {
      title: 'King Fahd Medical City Digital Transformation',
      client: 'King Fahd Medical City',
      category: 'Digital Transformation',
      challenge: 'Modernize paper-based processes and integrate 15+ medical systems',
      solution: 'Implemented comprehensive EHR system with seamless device integration',
      results: [
        '60% reduction in patient wait times',
        '40% improvement in data accuracy',
        '85% staff satisfaction with new system',
        'SAR 2.5M annual cost savings'
      ],
      image: '/cases/kfmc.jpg',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'National Guard Hospital Security Enhancement',
      client: 'National Guard Hospital',
      category: 'Cybersecurity',
      challenge: 'Strengthen cybersecurity posture and achieve HIPAA compliance',
      solution: 'Deployed advanced security frameworks and staff training programs',
      results: [
        '100% HIPAA compliance achieved',
        '90% reduction in security incidents',
        'Zero data breaches post-implementation',
        'Enhanced staff security awareness'
      ],
      image: '/cases/ngh.jpg',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Specialized Medical Center Integration',
      client: 'Specialized Medical Center',
      category: 'System Integration',
      challenge: 'Connect 25+ medical devices with existing hospital information system',
      solution: 'Custom API development and real-time data synchronization platform',
      results: [
        '100% device connectivity achieved',
        '50% faster diagnosis times',
        'Real-time patient monitoring',
        'Improved clinical decision making'
      ],
      image: '/cases/smc.jpg',
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how we've helped leading healthcare organizations across the GCC 
            transform their operations and improve patient care.
          </p>
        </div>

        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 items-center`}
            >
              {/* Image */}
              <div className="lg:w-1/2">
                <div className={`h-96 bg-gradient-to-br ${study.color} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                  <div className="text-center text-white">
                    <i className="ri-hospital-line text-6xl mb-4 opacity-80"></i>
                    <h3 className="text-2xl font-bold">{study.client}</h3>
                    <p className="text-lg opacity-90">{study.category}</p>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full"></div>
                  <div className="absolute top-8 right-8 w-6 h-6 bg-white/20 rounded-full"></div>
                  <div className="absolute bottom-8 left-8 w-4 h-4 bg-white/20 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 rounded-full"></div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-1/2 space-y-6">
                <div>
                  <div className={`inline-block px-4 py-2 bg-gradient-to-r ${study.color} text-white rounded-full text-sm font-semibold mb-4`}>
                    {study.category}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {study.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Challenge</h4>
                    <p className="text-gray-600">{study.challenge}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Solution</h4>
                    <p className="text-gray-600">{study.solution}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Results</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <i className="ri-check-line text-white text-xs"></i>
                          </div>
                          <span className="text-gray-700 text-sm">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href="/contact"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Learn more about this project
                    <i className="ri-arrow-right-line ml-2"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Join the growing list of healthcare organizations that have transformed 
              their operations with our expert consulting services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105"
              >
                <i className="ri-rocket-line mr-2"></i>
                Start Your Transformation
              </a>
              <a
                href="/resources/case-studies"
                className="inline-flex items-center border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors"
              >
                <i className="ri-book-open-line mr-2"></i>
                View All Case Studies
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
