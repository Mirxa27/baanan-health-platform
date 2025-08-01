'use client';

interface Device {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  model: string;
  price: number;
  rentPrice: number;
  imageUrl: string;
  isAvailable: boolean;
  stock: number;
}

interface DeviceCardProps {
  device: Device;
  onSelect: () => void;
}

export default function DeviceCard({ device, onSelect }: DeviceCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onSelect}
    >
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        {device.imageUrl ? (
          <img
            src={device.imageUrl}
            alt={device.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-4xl">🏥</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{device.name}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            device.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {device.isAvailable ? 'Available' : 'Out of Stock'}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{device.brand} - {device.model}</p>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{device.description}</p>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-bold text-gray-900">${device.price}</p>
            <p className="text-sm text-gray-500">${device.rentPrice}/day</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Stock: {device.stock}</p>
            <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
              {device.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}