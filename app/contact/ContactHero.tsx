'use client';

export default function ContactHero() {
  return (
    <section 
      className="relative py-32 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.1), rgba(147, 51, 234, 0.1)), url('https://readdy.ai/api/search-image?query=modern%20healthcare%20customer%20service%20center%2C%20professional%20medical%20support%20team%2C%20clean%20office%20environment%20with%20healthcare%20technology%2C%20customer%20consultation%20area%2C%20bright%20and%20welcoming%20healthcare%20facility%2C%20professional%20business%20setting&width=1920&height=800&seq=contact-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/95"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center">
          <span className="inline-block px-6 py-3 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-8">
            📞 Contact Baanan
          </span>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Get in Touch with Our
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Healthcare</span>
            Experts
          </h1>
          
          <p className="text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
            Ready to transform your healthcare operations? Our team of experts is here to help you find the perfect technology solutions for your needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-6">
                <i className="ri-phone-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">24/7 Support Available</p>
              <p className="text-blue-600 font-semibold">+966564406725</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-6">
                <i className="ri-mail-line text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">Quick Response Guaranteed</p>
              <p className="text-purple-600 font-semibold">info@baanan.com</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-6">
                <i className="ri-user-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Leadership</h3>
              <p className="text-gray-600 mb-2">CEO & Co-Founder</p>
              <p className="text-green-600 font-semibold">Eng. Sultan Al Khamshi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}