export default function ExpertTeam() {
  const experts = [
    {
      name: 'Dr. Ahmed Al-Rashid',
      role: 'Healthcare Technology Director',
      expertise: 'Digital Transformation & Healthcare IT',
      experience: '15+ years',
      image: '/team/ahmed.jpg',
      bio: 'Leading healthcare technology transformation across the GCC with expertise in EHR implementation and digital health strategies.'
    },
    {
      name: 'Sarah Johnson',
      role: 'System Integration Specialist',
      expertise: 'Medical Device Integration & Interoperability',
      experience: '12+ years',
      image: '/team/sarah.jpg',
      bio: 'Expert in connecting complex medical systems and ensuring seamless data flow across healthcare platforms.'
    },
    {
      name: 'Dr. Fatima Al-Zahra',
      role: 'Compliance & Security Consultant',
      expertise: 'Healthcare Regulations & Cybersecurity',
      experience: '10+ years',
      image: '/team/fatima.jpg',
      bio: 'Specializing in HIPAA compliance, healthcare data security, and regulatory framework implementation.'
    },
    {
      name: 'Michael Chen',
      role: 'Change Management Lead',
      expertise: 'Organizational Change & Training',
      experience: '14+ years',
      image: '/team/michael.jpg',
      bio: 'Guiding healthcare organizations through technology adoption with comprehensive training and support programs.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Expert Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Meet our experienced healthcare technology consultants who bring deep industry 
            knowledge and proven expertise to every project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experts.map((expert, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="h-64 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-4xl text-gray-400"></i>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {expert.name}
                </h3>
                
                <p className="text-blue-600 font-semibold mb-1">
                  {expert.role}
                </p>
                
                <p className="text-gray-600 text-sm mb-3">
                  {expert.expertise}
                </p>
                
                <div className="flex items-center mb-4">
                  <i className="ri-time-line text-gray-400 mr-2"></i>
                  <span className="text-gray-600 text-sm">{expert.experience}</span>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed">
                  {expert.bio}
                </p>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <i className="ri-linkedin-fill text-lg"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <i className="ri-mail-line text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Work with Our Experts?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our team is ready to help you navigate your healthcare technology challenges 
            and achieve your digital transformation goals.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
          >
            <i className="ri-team-line mr-2"></i>
            Meet Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
