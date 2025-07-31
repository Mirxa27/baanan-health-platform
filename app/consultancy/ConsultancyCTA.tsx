
'use client';
import { useState } from 'react';

export default function ConsultancyCTA() {
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    package: '',
    message: ''
  });

  const packages = [
    {
      name: 'Consultation Plus',
      price: '$2,500',
      duration: '1-2 weeks',
      description: 'Perfect for initial assessment and strategic recommendations',
      features: [
        'Initial assessment & analysis',
        'Strategic recommendations report',
        'Implementation roadmap',
        '2 expert consultation sessions',
        'Email support for 30 days'
      ],
      color: 'blue',
      popular: false
    },
    {
      name: 'Transformation Pro',
      price: '$15,000',
      duration: '2-3 months',
      description: 'Comprehensive transformation with hands-on implementation',
      features: [
        'Complete digital transformation',
        'Technology integration & setup',
        'Staff training & workshops',
        'Process optimization',
        '90-day support & monitoring',
        'Custom dashboard development'
      ],
      color: 'purple',
      popular: true
    },
    {
      name: 'Enterprise Elite',
      price: 'Custom',
      duration: '6+ months',
      description: 'Full-scale enterprise solution with ongoing partnership',
      features: [
        'Enterprise-wide transformation',
        'Custom solution development',
        'Dedicated project team',
        'Ongoing strategic partnership',
        'Priority support & maintenance',
        'Performance analytics & reporting',
        'Compliance & regulatory support'
      ],
      color: 'green',
      popular: false
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! We will contact you within 24 hours.');
    setShowContactForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      organization: '',
      package: '',
      message: ''
    });
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-600 to-blue-700 border-blue-200 bg-blue-50',
      purple: 'from-purple-600 to-purple-700 border-purple-200 bg-purple-50',
      green: 'from-green-600 to-green-700 border-green-200 bg-green-50'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Consulting Package</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Select the perfect consulting package for your healthcare organization's transformation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {packages.map((pkg, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                pkg.popular ? 'border-purple-200 scale-105 lg:scale-110' : 'border-gray-100'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{pkg.name}</h3>
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">{pkg.price}</div>
                <div className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4">{pkg.duration}</div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{pkg.description}</p>
              </div>
              
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-sm sm:text-base text-gray-700">
                    <div className="w-4 h-4 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <i className="ri-check-line text-green-600"></i>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => {
                  setSelectedPackage(index);
                  setFormData({...formData, package: pkg.name});
                  setShowContactForm(true);
                }}
                className={`w-full bg-gradient-to-r ${getColorClasses(pkg.color)} text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:opacity-90 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Get Started Today</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                  <input
                    type="text"
                    name="organization"
                    required
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Selected Package</label>
                  <input
                    type="text"
                    value={formData.package}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                    placeholder="Tell us about your specific needs..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        )}

        <div 
          className="relative rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.9), rgba(147, 51, 234, 0.9)), url('https://readdy.ai/api/search-image?query=healthcare%20consulting%20success%2C%20medical%20professionals%20celebrating%20achievement%2C%20successful%20healthcare%20transformation%2C%20modern%20hospital%20environment%2C%20team%20collaboration%20and%20success&width=1200&height=400&seq=consultancy-cta&orientation=landscape')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Transform Your Healthcare Organization?
            </h3>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto px-4">
              Join 200+ healthcare organizations that have successfully transformed their operations with Baanan's expert consulting services.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="text-center">
                <div className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-3 sm:mb-4">
                  <i className="ri-phone-line text-xl sm:text-2xl text-white"></i>
                </div>
                <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Call Us</h4>
                <p className="text-sm sm:text-base text-white/80">+966564406725</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-3 sm:mb-4">
                  <i className="ri-mail-line text-xl sm:text-2xl text-white"></i>
                </div>
                <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Email Us</h4>
                <p className="text-sm sm:text-base text-white/80">info@baanan.com</p>
              </div>
              
              <div className="text-center sm:col-span-1">
                <div className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-3 sm:mb-4">
                  <i className="ri-calendar-line text-xl sm:text-2xl text-white"></i>
                </div>
                <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Schedule</h4>
                <p className="text-sm sm:text-base text-white/80">Free consultation</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowContactForm(true)}
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              Start Your Transformation Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
