'use client';
import { useState } from 'react';

interface DeviceSpecification {
  category: string;
  specs: { [key: string]: string };
}

interface DeviceSpecificationsProps {
  deviceId: string;
  specifications: DeviceSpecification[];
  images: string[];
  manuals?: { name: string; url: string }[];
  warranty?: {
    duration: string;
    coverage: string;
    terms: string;
  };
}

export default function DeviceSpecifications({
  deviceId,
  specifications,
  images,
  manuals = [],
  warranty
}: DeviceSpecificationsProps) {
  const [activeTab, setActiveTab] = useState('specifications');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const tabs = [
    { id: 'specifications', label: 'Specifications', icon: '📋' },
    { id: 'images', label: 'Images', icon: '🖼️' },
    { id: 'manuals', label: 'Manuals', icon: '📖' },
    { id: 'warranty', label: 'Warranty', icon: '🛡️' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Specifications Tab */}
        {activeTab === 'specifications' && (
          <div className="space-y-6">
            {specifications.map((category, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(category.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">{key}:</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Images Tab */}
        {activeTab === 'images' && (
          <div>
            <div className="mb-4">
              <img
                src={images[selectedImageIndex]}
                alt={`Device image ${selectedImageIndex + 1}`}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index
                      ? 'border-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Manuals Tab */}
        {activeTab === 'manuals' && (
          <div>
            {manuals.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">📖</div>
                <p className="text-gray-500">No manuals available for this device.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {manuals.map((manual, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <i className="ri-file-pdf-line text-blue-600"></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{manual.name}</h4>
                        <p className="text-sm text-gray-500">PDF Document</p>
                      </div>
                    </div>
                    <a
                      href={manual.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Warranty Tab */}
        {activeTab === 'warranty' && (
          <div>
            {warranty ? (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="ri-shield-check-line text-green-600 text-xl mr-2"></i>
                    <h3 className="text-lg font-semibold text-green-800">Warranty Coverage</h3>
                  </div>
                  <p className="text-green-700">This device is covered by our comprehensive warranty program.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
                    <p className="text-gray-700">{warranty.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Coverage</h4>
                    <p className="text-gray-700">{warranty.coverage}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Terms & Conditions</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-line">{warranty.terms}</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Need Warranty Service?</h4>
                  <p className="text-blue-700 mb-3">
                    Contact our support team to initiate a warranty claim or schedule service.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">🛡️</div>
                <p className="text-gray-500">No warranty information available for this device.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}