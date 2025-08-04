'use client';
import { useState } from 'react';

export default function LocationMap() {
  const [activeOffice, setActiveOffice] = useState(0);

  const offices = [
    {
      name: 'Riyadh Headquarters',
      address: 'King Fahd District, Riyadh 12345, Saudi Arabia',
      phone: '+966 564 406 725',
      email: 'riyadh@baanan.com',
      hours: 'Sunday - Thursday: 8 AM - 6 PM',
      coordinates: { lat: 24.7136, lng: 46.6753 }
    },
    {
      name: 'Jeddah Office',
      address: 'Al Hamra District, Jeddah 21414, Saudi Arabia',
      phone: '+966 564 406 726',
      email: 'jeddah@baanan.com',
      hours: 'Sunday - Thursday: 8 AM - 6 PM',
      coordinates: { lat: 21.4858, lng: 39.1925 }
    },
    {
      name: 'Dammam Office',
      address: 'Al Faisaliyah District, Dammam 32412, Saudi Arabia',
      phone: '+966 564 406 727',
      email: 'dammam@baanan.com',
      hours: 'Sunday - Thursday: 8 AM - 6 PM',
      coordinates: { lat: 26.4282, lng: 50.1044 }
    }
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Locations
          </h2>
          <p className="text-xl text-gray-600">
            Visit us at any of our offices across Saudi Arabia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Office Cards */}
          <div className="lg:col-span-1 space-y-4">
            {offices.map((office, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg border-2 cursor-pointer transition-all transform hover:scale-105 ${
                  activeOffice === index 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setActiveOffice(index)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {office.name}
                    </h3>
                    {activeOffice === index && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <i className="ri-map-pin-line text-gray-400 mt-1"></i>
                      <p className="text-gray-600 text-sm">{office.address}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <i className="ri-phone-line text-gray-400"></i>
                      <a 
                        href={`tel:${office.phone}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {office.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <i className="ri-mail-line text-gray-400"></i>
                      <a 
                        href={`mailto:${office.email}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {office.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <i className="ri-time-line text-gray-400"></i>
                      <p className="text-gray-600 text-sm">{office.hours}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                      <i className="ri-navigation-line mr-2"></i>
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-96 lg:h-full">
              <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                {/* Map placeholder - would integrate with Google Maps or similar */}
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-map-2-line text-4xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {offices[activeOffice].name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {offices[activeOffice].address}
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    <i className="ri-external-link-line mr-2"></i>
                    Open in Maps
                  </button>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <i className="ri-map-pin-fill text-white"></i>
                </div>
                <div className="absolute top-12 right-8 w-6 h-6 bg-green-500 rounded-full"></div>
                <div className="absolute bottom-8 left-12 w-4 h-4 bg-yellow-500 rounded-full"></div>
                <div className="absolute bottom-12 right-4 w-5 h-5 bg-purple-500 rounded-full"></div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Need directions to {offices[activeOffice].name}?
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Google Maps
                    </button>
                    <span className="text-gray-300">|</span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Apple Maps
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-car-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Parking Available</h3>
              <p className="text-gray-600 text-sm">
                Free parking available at all locations. Visitor spaces clearly marked.
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-wheelchair-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3>
              <p className="text-gray-600 text-sm">
                All offices are wheelchair accessible with elevators and ramps.
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-calendar-check-line text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Appointments</h3>
              <p className="text-gray-600 text-sm">
                Schedule a visit in advance for personalized consultation and demos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
