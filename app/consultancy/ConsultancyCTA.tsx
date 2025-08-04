export default function ConsultancyCTA() {
  const benefits = [
    {
      icon: 'ri-time-line',
      title: 'Fast Implementation',
      description: 'Get results in weeks, not months'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Risk-Free Consultation',
      description: 'No commitment initial assessment'
    },
    {
      icon: 'ri-customer-service-line',
      title: '24/7 Support',
      description: 'Ongoing support throughout your journey'
    },
    {
      icon: 'ri-award-line',
      title: 'Proven Expertise',
      description: '100+ successful implementations'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'We assess your current technology landscape and identify opportunities for improvement.'
    },
    {
      number: '02',
      title: 'Strategic Planning',
      description: 'Develop a comprehensive roadmap tailored to your organization\'s specific needs and goals.'
    },
    {
      number: '03',
      title: 'Implementation',
      description: 'Execute the plan with our expert team, ensuring minimal disruption to your operations.'
    },
    {
      number: '04',
      title: 'Ongoing Support',
      description: 'Provide continuous support and optimization to ensure long-term success.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Section */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Healthcare Future
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
            Partner with us to revolutionize your healthcare technology infrastructure 
            and deliver exceptional patient care in the digital age.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a
              href="/contact"
              className="bg-white text-blue-900 px-10 py-5 rounded-full font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-110"
            >
              <i className="ri-phone-line mr-3"></i>
              Schedule Free Consultation
            </a>
            <a
              href="/resources/case-studies"
              className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-blue-900 transition-all transform hover:scale-110"
            >
              <i className="ri-presentation-line mr-3"></i>
              View Success Stories
            </a>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-colors"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className={`${benefit.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-blue-200 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Proven Process
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                )}
                
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  
                  <h4 className="text-xl font-bold mb-4">{step.title}</h4>
                  <p className="text-blue-200 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold mb-6">
            Ready to Get Started?
          </h3>
          
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact our healthcare technology experts today for a free consultation 
            and discover how we can transform your organization.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <i className="ri-phone-line text-2xl text-yellow-400"></i>
              <div>
                <p className="font-semibold">Call Us</p>
                <a href="tel:+966564406725" className="text-blue-200 hover:text-white transition-colors">
                  +966 564 406 725
                </a>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <i className="ri-mail-line text-2xl text-yellow-400"></i>
              <div>
                <p className="font-semibold">Email Us</p>
                <a href="mailto:consulting@baanan.com" className="text-blue-200 hover:text-white transition-colors">
                  consulting@baanan.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <i className="ri-calendar-line text-2xl text-yellow-400"></i>
              <div>
                <p className="font-semibold">Schedule Online</p>
                <a href="/contact" className="text-blue-200 hover:text-white transition-colors">
                  Book Meeting
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <a
              href="/contact"
              className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <i className="ri-arrow-right-line mr-2"></i>
              Start Your Transformation Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
