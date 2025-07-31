'use client';

export default function ResearchPapers() {
  const researchPapers = [
    {
      title: 'Impact of AI-Powered Diagnostics on Healthcare Outcomes in Saudi Arabia',
      authors: ['Dr. Sarah Al-Mansouri', 'Dr. Ahmad Al-Kindi', 'Prof. Mohammed Al-Rashid'],
      journal: 'Journal of Middle Eastern Healthcare Technology',
      year: '2024',
      abstract: 'This comprehensive study analyzes the implementation and outcomes of AI-powered diagnostic systems across 50 healthcare facilities in Saudi Arabia, demonstrating a 45% improvement in diagnostic accuracy.',
      category: 'Artificial Intelligence',
      downloadCount: '2,847',
      citations: '156'
    },
    {
      title: 'Robotic Physiotherapy Systems: Clinical Efficacy and Patient Satisfaction',
      authors: ['Dr. Fatima Al-Zahra', 'Dr. Layla Al-Mahmoud'],
      journal: 'International Journal of Medical Robotics',
      year: '2024',
      abstract: 'A randomized controlled trial examining the effectiveness of robotic physiotherapy systems in rehabilitation settings, showing 60% faster recovery times compared to traditional methods.',
      category: 'Medical Robotics',
      downloadCount: '1,923',
      citations: '89'
    },
    {
      title: 'Telehealth Adoption in Post-Pandemic Healthcare: A Regional Analysis',
      authors: ['Dr. Ahmad Al-Kindi', 'Eng. Sultan Al Khamshi'],
      journal: 'Digital Health Quarterly',
      year: '2023',
      abstract: 'Analysis of telehealth adoption patterns across the Middle East region, identifying key success factors and barriers to implementation in healthcare systems.',
      category: 'Telehealth',
      downloadCount: '3,421',
      citations: '203'
    },
    {
      title: 'IoT-Enabled Medical Devices: Security Framework and Implementation',
      authors: ['Eng. Mohammed Al-Rashid', 'Dr. Sarah Al-Mansouri'],
      journal: 'Healthcare Cybersecurity Review',
      year: '2023',
      abstract: 'Comprehensive framework for securing IoT medical devices in healthcare environments, addressing HIPAA compliance and data protection requirements.',
      category: 'Healthcare Security',
      downloadCount: '2,156',
      citations: '124'
    },
    {
      title: 'Economic Impact of Digital Health Transformation in Healthcare Systems',
      authors: ['Dr. Layla Al-Mahmoud', 'Prof. Ahmad Al-Mansouri'],
      journal: 'Health Economics and Policy',
      year: '2023',
      abstract: 'Economic analysis of digital health transformation initiatives, demonstrating ROI improvements of 35% across implemented healthcare facilities.',
      category: 'Health Economics',
      downloadCount: '1,654',
      citations: '97'
    },
    {
      title: 'Smart Hospital Infrastructure: Design Principles and Implementation Guide',
      authors: ['Eng. Sultan Al Khamshi', 'Dr. Fatima Al-Zahra'],
      journal: 'Smart Healthcare Systems',
      year: '2023',
      abstract: 'Comprehensive guide for designing and implementing smart hospital infrastructure, covering network architecture, device integration, and workflow optimization.',
      category: 'Healthcare Infrastructure',
      downloadCount: '2,789',
      citations: '145'
    }
  ];

  const categories = ['All', 'Artificial Intelligence', 'Medical Robotics', 'Telehealth', 'Healthcare Security', 'Health Economics', 'Healthcare Infrastructure'];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Research
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Papers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our published research papers and studies on healthcare technology innovation, clinical outcomes, and industry best practices.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                index === 0 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-purple-100 hover:text-purple-600 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {researchPapers.map((paper, index) => (
            <div 
              key={index}
              className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
                      {paper.category}
                    </span>
                    <span className="text-sm text-gray-500">{paper.year}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                    {paper.title}
                  </h3>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Authors:</strong> {paper.authors.join(', ')}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Published in:</strong> {paper.journal}
                    </p>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {paper.abstract}
                  </p>
                  
                  <div className="flex items-center space-x-6">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
                      Download PDF
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">
                      View Abstract
                    </button>
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium cursor-pointer">
                      Cite Paper
                    </button>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <div className="space-y-4">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{paper.downloadCount}</div>
                        <div className="text-sm text-gray-600">Downloads</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{paper.citations}</div>
                        <div className="text-sm text-gray-600">Citations</div>
                      </div>
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-center space-x-2">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-3 h-3 flex items-center justify-center">
                              <i className="ri-star-fill text-yellow-400 text-sm"></i>
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Peer Reviewed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Contributing to Healthcare Research
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our research team continuously publishes findings to advance healthcare technology. Subscribe to receive notifications about new publications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
              Subscribe to Updates
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
              Submit Research Proposal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}