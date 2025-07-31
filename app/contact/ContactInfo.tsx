'use client';

export default function ContactInfo() {
  const contactMethods = [
    {
      title: '24/7 Phone Support',
      description: 'Call us anytime for immediate assistance with your healthcare technology needs.',
      icon: 'ri-phone-line',
      contact: '+966564406725',
      color: 'blue'
    },
    {
      title: 'Email Support',
      description: 'Send us detailed inquiries and receive comprehensive responses within 24 hours.',
      icon: 'ri-mail-line',
      contact: 'info@baanan.com',
      color: 'purple'
    },
    {
      title: 'Emergency Support',
      description: 'Critical healthcare equipment issues receive priority response and immediate attention.',
      icon: 'ri-alarm-warning-line',
      contact: 'emergency@baanan.com',
      color: 'red'
    }
  ];

  const officeInfo = [
    {
      title: 'Headquarters',
      address: 'Riyadh, Saudi Arabia',
      details: 'Main office and innovation center',
      icon: 'ri-building-line'
    },
    {
      title: 'Operations Center',
      address: 'Jeddah, Saudi Arabia', 
      details: 'Regional operations and logistics',
      icon: 'ri-map-pin-line'
    },
    {
      title: 'Service Centers',
      address: 'Multiple Locations',
      details: 'Nationwide service and support',
      icon: 'ri-service-line'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      red: 'bg-red-100 text-red-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Contact Information
          </h2>
          
          <div className="space-y-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-start">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl mr-4 ${getColorClasses(method.color)}`}>
                    <i className={`${method.icon} text-xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 mb-3 leading-relaxed">{method.description}</p>
                    <div className="text-blue-600 font-semibold">{method.contact}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Locations</h3>
          
          <div className="grid grid-cols-1 gap-6">
            {officeInfo.map((office, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full mr-4">
                    <i className={`${office.icon} text-lg text-gray-600`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{office.title}</h4>
                    <p className="text-gray-600">{office.address}</p>
                    <p className="text-sm text-gray-500">{office.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-white/50">
          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6">
              <i className="ri-user-line text-2xl text-white"></i>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">Meet Our CEO</h3>
            <p className="text-gray-600 mb-4">
              <strong>Eng. Sultan Al Khamshi</strong><br/>
              Co-Founder & Chief Executive Officer
            </p>
            <p className="text-gray-600 leading-relaxed">
              Visionary leader with 15+ years in healthcare technology, driving innovation and excellence in medical device solutions across Saudi Arabia.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h4>
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-gray-900">Sunday - Thursday</div>
                <div className="text-gray-600">8:00 AM - 6:00 PM</div>
              </div>
              <div>
                <div className="font-medium text-gray-900">Emergency Support</div>
                <div className="text-gray-600">24/7 Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}