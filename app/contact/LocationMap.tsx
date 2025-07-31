'use client';

export default function LocationMap() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Visit Our
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Locations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find us across Saudi Arabia with strategically located offices and service centers to serve you better.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <div className="aspect-video rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.1!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1698765432100!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Baanan Headquarters Location"
            ></iframe>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4">
                <i className="ri-building-line text-xl text-blue-600"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Riyadh Headquarters</h3>
              <p className="text-gray-600 text-sm">
                King Fahd Road, Riyadh<br/>
                Saudi Arabia 11564
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-4">
                <i className="ri-map-pin-line text-xl text-purple-600"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Jeddah Office</h3>
              <p className="text-gray-600 text-sm">
                Corniche Road, Jeddah<br/>
                Saudi Arabia 21589
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                <i className="ri-service-line text-xl text-green-600"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Service Centers</h3>
              <p className="text-gray-600 text-sm">
                Dammam, Mecca, Medina<br/>
                Nationwide Coverage
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-white/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Directions?</h3>
            <p className="text-gray-600 mb-6">
              Contact our team for detailed directions to any of our locations or to schedule an in-person consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
                Get Directions
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap">
                Schedule Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}