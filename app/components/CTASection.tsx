'use client';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section 
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.9), rgba(147, 51, 234, 0.9)), url('https://readdy.ai/api/search-image?query=modern%20healthcare%20technology%20collaboration%2C%20medical%20professionals%20working%20together%20with%20advanced%20technology%2C%20teamwork%20in%20healthcare%20innovation%2C%20futuristic%20medical%20environment%2C%20professional%20healthcare%20setting%20with%20clean%20aesthetic&width=1920&height=600&seq=cta-background&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          Ready to Transform Your
          <br />Healthcare Experience?
        </h2>
        
        <p className="text-xl mb-12 leading-relaxed opacity-90">
          Join thousands of healthcare professionals and patients who trust Baanan's innovative solutions. 
          Start your journey towards smarter, more efficient healthcare today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link 
            href="/halol"
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            Download Halol App
          </Link>
          
          <Link 
            href="/contact"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            Contact Our Team
          </Link>
          
          <Link 
            href="/consultancy"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            Get Consultation
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4">
              <i className="ri-phone-line text-2xl text-white"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
            <p className="text-white/80">+966564406725</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4">
              <i className="ri-mail-line text-2xl text-white"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
            <p className="text-white/80">info@baanan.com</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4">
              <i className="ri-user-line text-2xl text-white"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Leadership</h3>
            <p className="text-white/80">Eng. Sultan Al Khamshi - CEO</p>
          </div>
        </div>
      </div>
    </section>
  );
}