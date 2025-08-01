'use client';
import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

export default function TestimonialsSection() {
  const { t } = useTranslation('common');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Dr. Sarah Al-Mansouri',
      role: 'Chief Medical Officer, Riyadh Medical Center',
      content: t('testimonial_1_content'),
      rating: 5,
      image: 'https://readdy.ai/api/search-image?query=professional%20female%20doctor%20in%20white%20coat%2C%20Middle%20Eastern%20healthcare%20professional%2C%20confident%20medical%20practitioner%2C%20clean%20clinical%20background%2C%20professional%20headshot%20portrait%2C%20modern%20hospital%20setting&width=300&height=300&seq=testimonial-doctor-1&orientation=squarish'
    },
    {
      name: 'Ahmed Al-Rashid',
      role: 'Healthcare Technology Director',
      content: t('testimonial_2_content'),
      rating: 5,
      image: 'https://readdy.ai/api/search-image?query=professional%20Middle%20Eastern%20businessman%20in%20modern%20office%2C%20healthcare%20technology%20executive%2C%20confident%20business%20professional%2C%20clean%20corporate%20background%2C%20professional%20headshot%20portrait&width=300&height=300&seq=testimonial-exec-1&orientation=squarish'
    },
    {
      name: 'Fatima Al-Zahra',
      role: 'Senior Nurse, King Faisal Specialist Hospital',
      content: t('testimonial_3_content'),
      rating: 5,
      image: 'https://readdy.ai/api/search-image?query=professional%20female%20nurse%20in%20medical%20scrubs%2C%20Middle%20Eastern%20healthcare%20worker%2C%20caring%20medical%20professional%2C%20clean%20hospital%20background%2C%20professional%20portrait%2C%20modern%20healthcare%20setting&width=300&height=300&seq=testimonial-nurse-1&orientation=squarish'
    },
    {
      name: 'Dr. Mohammed Al-Kindi',
      role: 'Physiotherapy Department Head',
      content: t('testimonial_4_content'),
      rating: 5,
      image: 'https://readdy.ai/api/search-image?query=professional%20male%20physiotherapist%20doctor%2C%20Middle%20Eastern%20medical%20professional%2C%20rehabilitation%20specialist%2C%20clean%20clinical%20background%2C%20professional%20headshot%20portrait%2C%20modern%20medical%20facility&width=300&height=300&seq=testimonial-physio-1&orientation=squarish'
    },
    {
      name: 'Layla Al-Mahmoud',
      role: 'Hospital Administrator',
      content: t('testimonial_5_content'),
      rating: 5,
      image: 'https://readdy.ai/api/search-image?query=professional%20female%20hospital%20administrator%2C%20Middle%20Eastern%20business%20professional%2C%20healthcare%20management%20executive%2C%20clean%20office%20background%2C%20professional%20portrait%2C%20modern%20healthcare%20administration&width=300&height=300&seq=testimonial-admin-1&orientation=squarish'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('what_our_partners_say_part1')}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> {t('what_our_partners_say_part2')}</span>
            {t('what_our_partners_say_part3')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('partners_say_description')}
          </p>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-8">
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
                    <div className="text-gray-600">
                      {testimonials[activeTestimonial].role}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
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
              <i className="ri-hospital-line text-2xl text-white"></i>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
            <div className="text-gray-700 font-medium">{t('healthcare_facilities')}</div>
            <div className="text-sm text-gray-600 mt-2">{t('trust_solutions_nationwide')}</div>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
            <div className="w-16 h-16 flex items-center justify-center bg-purple-600 rounded-full mx-auto mb-4">
              <i className="ri-user-heart-line text-2xl text-white"></i>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
            <div className="text-gray-700 font-medium">{t('patients_served')}</div>
            <div className="text-sm text-gray-600 mt-2">{t('improving_lives_every_day')}</div>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
            <div className="w-16 h-16 flex items-center justify-center bg-green-600 rounded-full mx-auto mb-4">
              <i className="ri-award-line text-2xl text-white"></i>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-gray-700 font-medium">{t('satisfaction_rate_short')}</div>
            <div className="text-sm text-gray-600 mt-2">{t('consistently_exceeding_expectations')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
