
'use client';
import { useState } from 'react';

export default function CaseStudies() {
  const [activeCase, setActiveCase] = useState(0);

  const caseStudies = [
    {
      title: 'King Fahd Medical City - Digital Transformation',
      client: 'Major Healthcare System',
      challenge: 'Legacy systems hampering patient care efficiency and data management across 1,200 beds and 15 specialized departments.',
      solution: 'Implemented comprehensive EHR system, integrated medical devices, and developed AI-powered analytics dashboard for real-time patient monitoring.',
      results: [
        '45% reduction in patient wait times',
        '60% improvement in data accuracy',
        '30% increase in operational efficiency',
        '$2.8M annual cost savings'
      ],
      timeline: '18 months',
      image: 'https://readdy.ai/api/search-image?query=modern%20hospital%20digital%20transformation%2C%20advanced%20medical%20technology%20implementation%2C%20healthcare%20professionals%20using%20digital%20systems%2C%20clean%20professional%20medical%20environment%20with%20integrated%20technology&width=600&height=400&seq=case-study-1&orientation=landscape'
    },
    {
      title: 'National Guard Health Affairs - AI Implementation',
      client: 'Military Healthcare Network',
      challenge: 'Need for predictive analytics to improve patient outcomes and reduce readmission rates across multiple facilities.',
      solution: 'Deployed machine learning algorithms for early risk detection, integrated wearable devices, and created predictive dashboards for clinical staff.',
      results: [
        '35% reduction in readmission rates',
        '25% faster diagnosis accuracy',
        '40% improvement in resource allocation',
        '95% clinician adoption rate'
      ],
      timeline: '12 months',
      image: 'https://readdy.ai/api/search-image?query=AI%20medical%20analytics%20dashboard%2C%20healthcare%20data%20visualization%2C%20predictive%20healthcare%20technology%2C%20medical%20professionals%20analyzing%20patient%20data%2C%20modern%20clinical%20setting%20with%20advanced%20technology&width=600&height=400&seq=case-study-2&orientation=landscape'
    },
    {
      title: 'Riyadh Care Hospital - Robotic Integration',
      client: 'Private Healthcare Provider',
      challenge: 'Expanding physiotherapy services with consistent quality while managing increasing patient volume and staffing constraints.',
      solution: 'Integrated robotic physiotherapy systems with personalized treatment protocols and staff training programs for optimal patient care delivery.',
      results: [
        '50% increase in patient capacity',
        '80% improvement in treatment consistency',
        '90% patient satisfaction rate',
        '25% reduction in therapy duration'
      ],
      timeline: '8 months',
      image: 'https://readdy.ai/api/search-image?query=robotic%20physiotherapy%20equipment%20in%20modern%20rehabilitation%20center%2C%20automated%20medical%20therapy%20devices%2C%20patients%20receiving%20robotic%20assisted%20treatment%2C%20clean%20professional%20medical%20setting&width=600&height=400&seq=case-study-3&orientation=landscape'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Success
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Stories</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Discover how we've helped healthcare organizations transform their operations and improve patient outcomes.
          </p>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="flex flex-col sm:hidden mb-8">
          <div className="flex overflow-x-auto pb-2">
            {caseStudies.map((study, index) => (
              <button
                key={index}
                onClick={() => setActiveCase(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap mr-2 transition-all ${
                  activeCase === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Case {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Tab Navigation */}
        <div className="hidden sm:flex justify-center mb-12">
          <div className="flex bg-gray-100 rounded-full p-1">
            {caseStudies.map((study, index) => (
              <button
                key={index}
                onClick={() => setActiveCase(index)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all whitespace-nowrap ${
                  activeCase === index
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {study.client}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="mb-4 sm:mb-6">
                <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium mb-4">
                  {caseStudies[activeCase].client}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {caseStudies[activeCase].title}
                </h3>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Challenge</h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {caseStudies[activeCase].challenge}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Solution</h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {caseStudies[activeCase].solution}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Results</h4>
                  <ul className="space-y-2">
                    {caseStudies[activeCase].results.map((result, index) => (
                      <li key={index} className="flex items-start text-sm sm:text-base text-gray-600">
                        <div className="w-4 h-4 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <i className="ri-check-line text-green-600"></i>
                        </div>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center text-sm sm:text-base text-gray-500">
                  <div className="w-4 h-4 flex items-center justify-center mr-3 flex-shrink-0">
                    <i className="ri-time-line"></i>
                  </div>
                  Project Timeline: {caseStudies[activeCase].timeline}
                </div>
              </div>
            </div>
            
            <div className="mt-6 lg:mt-0">
              <div className="relative">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl blur opacity-20"></div>
                <img 
                  src={caseStudies[activeCase].image}
                  alt={caseStudies[activeCase].title}
                  className="relative w-full rounded-2xl sm:rounded-3xl shadow-2xl object-cover object-top h-64 sm:h-80"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:opacity-90 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
            View More Case Studies
          </button>
        </div>
      </div>
    </section>
  );
}
