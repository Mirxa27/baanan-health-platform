'use client';
import { useTranslation } from '../../hooks/useTranslation.simple';

export default function ContactInfo() {
  const { t } = useTranslation('contact');

  const contactMethods = [
    {
      icon: 'ri-phone-line',
      title: 'Phone Support',
      details: ['+966 564 406 725', '+966 11 xxx xxxx'],
      description: 'Available 24/7 for urgent inquiries',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: 'ri-mail-line',
      title: 'Email Support',
      details: ['info@baanan.com', 'support@baanan.com'],
      description: 'Response within 24 hours',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'ri-map-pin-line',
      title: 'Office Location',
      details: ['Riyadh, Saudi Arabia', 'King Fahd District'],
      description: 'Visit us by appointment',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'ri-chat-3-line',
      title: 'Live Chat',
      details: ['Available on website', 'Instant responses'],
      description: 'Monday - Friday, 8 AM - 6 PM',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const departments = [
    {
      name: 'Sales & Partnerships',
      email: 'sales@baanan.com',
      phone: '+966 564 406 725',
      description: 'Medical device procurement and partnerships'
    },
    {
      name: 'Technical Support',
      email: 'support@baanan.com',
      phone: '+966 564 406 726',
      description: 'Platform support and technical assistance'
    },
    {
      name: 'Consulting Services',
      email: 'consulting@baanan.com',
      phone: '+966 564 406 727',
      description: 'Healthcare technology consulting'
    },
    {
      name: 'Customer Success',
      email: 'success@baanan.com',
      phone: '+966 564 406 728',
      description: 'Account management and success'
    }
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600">
            Multiple ways to reach our healthcare technology experts.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="space-y-6 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center`}>
                  <i className={`${method.icon} text-white text-xl`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <div className="space-y-1 mb-2">
                    {method.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-700 font-medium">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm">
                    {method.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Department Contacts */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Department Contacts
          </h3>
          <div className="space-y-6">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-500 pl-6 py-4 hover:bg-gray-50 transition-colors rounded-r-lg"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {dept.name}
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  {dept.description}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                  <a
                    href={`mailto:${dept.email}`}
                    className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <i className="ri-mail-line mr-2"></i>
                    {dept.email}
                  </a>
                  <a
                    href={`tel:${dept.phone}`}
                    className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <i className="ri-phone-line mr-2"></i>
                    {dept.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-alarm-warning-line text-white text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold text-red-900 mb-2">
            Emergency Support
          </h3>
          <p className="text-red-700 mb-4">
            For critical medical equipment emergencies requiring immediate attention
          </p>
          <div className="space-y-2">
            <a
              href="tel:+966564406725"
              className="block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <i className="ri-phone-line mr-2"></i>
              Emergency Hotline: +966 564 406 725
            </a>
            <p className="text-red-600 text-sm">
              Available 24/7 for critical support
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Follow Us
          </h3>
          <div className="flex justify-center space-x-4">
            <a
              href="https://linkedin.com/company/baanan-healthcare"
              className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
            >
              <i className="ri-linkedin-fill text-xl"></i>
            </a>
            <a
              href="https://twitter.com/baanan_health"
              className="w-12 h-12 bg-blue-400 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Twitter"
            >
              <i className="ri-twitter-fill text-xl"></i>
            </a>
            <a
              href="https://youtube.com/@baananhealthcare"
              className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="YouTube"
            >
              <i className="ri-youtube-fill text-xl"></i>
            </a>
            <a
              href="https://instagram.com/baananhealthcare"
              className="w-12 h-12 bg-pink-600 hover:bg-pink-700 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <i className="ri-instagram-fill text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
