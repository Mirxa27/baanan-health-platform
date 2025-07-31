
'use client';

export default function Values() {
  const values = [
    {
      title: 'Innovation Excellence',
      description: 'We continuously push the boundaries of healthcare technology, developing cutting-edge solutions that transform patient care and medical outcomes.',
      icon: 'ri-lightbulb-line',
      color: 'blue'
    },
    {
      title: 'Patient-Centric Approach',
      description: 'Every solution we create is designed with patients at the center, ensuring improved health outcomes and enhanced quality of life.',
      icon: 'ri-heart-pulse-line',
      color: 'red'
    },
    {
      title: 'Integrity & Trust',
      description: 'We build lasting relationships through transparency, reliability, and unwavering commitment to ethical practices in healthcare.',
      icon: 'ri-shield-check-line',
      color: 'green'
    },
    {
      title: 'Collaborative Partnership',
      description: 'We believe in the power of collaboration, working closely with healthcare providers to create comprehensive solutions.',
      icon: 'ri-team-line',
      color: 'purple'
    },
    {
      title: 'Quality Assurance',
      description: 'We maintain the highest standards of quality in all our products and services, ensuring safety and efficacy at every level.',
      icon: 'ri-medal-line',
      color: 'orange'
    },
    {
      title: 'Sustainable Impact',
      description: 'We are committed to creating sustainable healthcare solutions that benefit communities and contribute to long-term wellness.',
      icon: 'ri-leaf-line',
      color: 'teal'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-100 to-blue-50 text-blue-600',
      red: 'from-red-100 to-red-50 text-red-600',
      green: 'from-green-100 to-green-50 text-green-600',
      purple: 'from-purple-100 to-purple-50 text-purple-600',
      orange: 'from-orange-100 to-orange-50 text-orange-600',
      teal: 'from-teal-100 to-teal-50 text-teal-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Our Core
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Values</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            The fundamental principles that guide our mission to transform healthcare and drive our commitment to excellence in every aspect of our work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {values.map((value, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${getColorClasses(value.color)} mb-4 sm:mb-6`}>
                <i className={`${value.icon} text-xl sm:text-2xl`}></i>
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors">
                {value.title}
              </h3>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div 
          className="relative rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.9), rgba(147, 51, 234, 0.9)), url('https://readdy.ai/api/search-image?query=healthcare%20team%20collaboration%2C%20medical%20professionals%20working%20together%2C%20diverse%20healthcare%20workers%2C%20modern%20hospital%20environment%2C%20teamwork%20in%20healthcare%2C%20professional%20medical%20setting%20with%20advanced%20technology&width=1200&height=400&seq=values-cta&orientation=landscape')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Join Our Mission to Transform Healthcare
            </h3>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-4">
              Be part of a team that's reshaping the future of healthcare through innovation, collaboration, and unwavering commitment to patient care.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
                Explore Careers
              </button>
              <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
