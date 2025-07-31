'use client';
import { useState } from 'react';

export default function UserTestimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Dr. Sarah Al-Mansouri',
      role: 'Chief Medical Officer',
      organization: 'Riyadh Medical Center',
      content: 'Halol has revolutionized how we manage our medical equipment. The procurement process that used to take weeks now takes just a few clicks. The app is intuitive and the support is exceptional.',
      rating: 5,
      image: 'https://readdy.ai/api/search-image?query=professional%20Middle%20Eastern%20female%20doctor%20in%20white%20coat%2C%20confident%20medical%20professional%2C%20hospital%20setting%2C%20clean%20healthcare%20background%2C%20professional%20medical%20portrait&width=300&height=300&seq=halol-user-1&orientation=squarish',
      useCase: 'Medical Equipment Procurement'
    },
    {
      name: 'Ahmed Al-Rashid',
      role: 'Hospital Administrator',
      organization: 'King Fahd Medical Complex',
      content: 'The maintenance scheduling feature in Halol has improved our equipment uptime by 40%. We can track all our devices, schedule preventive maintenance, and get instant support when needed.',
      rating: 5,
      image: 'https://readdy.ai/api/search-image?query=professional%20Middle%20Eastern%20male%20hospital%20administrator%2C%20confident%20healthcare%20executive%20in%20business%20suit%2C%20modern%20office%20background%2C%20professional%20business%20portrait&width=300&height=300&seq=halol-user-2&orientation=squarish',
      useCase: 'Equipment Maintenance Management'
    },
    {
      name: 'Nurse Fatima Al-Zahra',
      role: 'Senior Nurse',
      organization: 'Jeddah General Hospital',
      content: 'As a healthcare professional, I love how Halol integrates patient monitoring with our daily workflows. The real-time alerts and health insights help us provide better patient care.',
      rating: 5,
      image: 'https://readdy.ai/api/search-image?query=professional%20Middle%20Eastern%20female%20nurse%20in%20medical%20scrubs%2C%20caring%20healthcare%20worker%2C%20hospital%20environment%2C%20clean%20medical%20background%2C%20professional%20nursing%20portrait&width=300&height=300&seq=halol-user-3&orientation=squarish',
      useCase: 'Patient Health Monitoring'
    },
    {
      name: 'Dr. Mohammed Al-Kindi',
      role: 'Physiotherapy Director',
      organization: 'Dammam Rehabilitation Center',
      content: 'The robotic physiotherapy equipment we rent through Halol has transformed our rehabilitation programs. Patients recover faster and we can track their progress in real-time.',
      rating: 5,
      image: 'https://readdy.ai/api/search-image?query=professional%20Middle%20Eastern%20male%20physiotherapist%20doctor%2C%20confident%20rehabilitation%20specialist%2C%20clinical%20setting%2C%20clean%20medical%20background%2C%20professional%20healthcare%20portrait&width=300&height=300&seq=halol-user-4&orientation=squarish',
      useCase: 'Equipment Rental & Therapy'
    },
    {
      name: 'Layla Al-Mahmoud',
      role: 'IT Director',
      organization: 'Mecca Medical Network',
      content: 'Halol app integration with our existing systems was seamless. The API documentation is excellent and the technical support team helped us every step of the way.',
      rating: 5,
      image: 'https://readdy.ai/api/search-image?query=professional%20Middle%20Eastern%20female%20IT%20director%2C%20confident%20technology%20professional%20in%20business%20attire%2C%20modern%20office%20setting%2C%20clean%20corporate%20background%2C%20professional%20business%20portrait&width=300&height=300&seq=halol-user-5&orientation=squarish',
      useCase: 'System Integration'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Users</span>
            Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from healthcare professionals across Saudi Arabia who have transformed their operations with Halol app.
          </p>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-white/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-8">
                  <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
                    {testimonials[activeTestimonial].useCase}
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, index) => (
                      <div key={index} className="w-6 h-6 flex items-center justify-center">
                        <i className="ri-star-fill text-yellow-400 text-xl"></i>
                      </div>
                    ))}
                  </div>
                  
                  <blockquote className="text-2xl text-gray-900 font-medium leading-relaxed mb-8">
                    "{testimonials[activeTestimonial].content}"
                  </blockquote>
                  
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-blue-600 font-medium">
                      {testimonials[activeTestimonial].role}
                    </div>
                    <div className="text-gray-600">
                      {testimonials[activeTestimonial].organization}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                        activeTestimonial === index 
                          ? 'bg-blue-600 scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      onClick={() => setActiveTestimonial(index)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-20"></div>
                  <img 
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="relative w-80 h-80 object-cover object-top rounded-full shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
            <div className="w-16 h-16 flex items-center justify-center bg-blue-600 rounded-full mx-auto mb-4">
              <i className="ri-user-heart-line text-2xl text-white"></i>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-gray-700 font-medium">Active Users</div>
            <div className="text-sm text-gray-600 mt-2">Healthcare professionals nationwide</div>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
            <div className="w-16 h-16 flex items-center justify-center bg-purple-600 rounded-full mx-auto mb-4">
              <i className="ri-hospital-line text-2xl text-white"></i>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-gray-700 font-medium">Healthcare Facilities</div>
            <div className="text-sm text-gray-600 mt-2">Trust Halol for their operations</div>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
            <div className="w-16 h-16 flex items-center justify-center bg-green-600 rounded-full mx-auto mb-4">
              <i className="ri-star-line text-2xl text-white"></i>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">4.9</div>
            <div className="text-gray-700 font-medium">App Store Rating</div>
            <div className="text-sm text-gray-600 mt-2">Based on 10,000+ reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}