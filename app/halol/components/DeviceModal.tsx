'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

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

interface DeviceModalProps {
  device: Device;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeviceModal({ device, onClose, onSuccess }: DeviceModalProps) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'buy' | 'rent'>('buy');
  const [quantity, setQuantity] = useState(1);
  const [rentalDays, setRentalDays] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    if (!session) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceId: device.id,
          quantity,
          type: 'purchase',
        }),
      });

      if (response.ok) {
        const { sessionUrl } = await response.json();
        window.location.href = sessionUrl;
      } else {
        alert('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRental = async () => {
    if (!session) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/rentals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceId: device.id,
          quantity,
          days: calculatedDays,
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        }),
      });

      if (response.ok) {
        const { sessionUrl } = await response.json();
        window.location.href = sessionUrl;
      } else {
        alert('Failed to create rental');
      }
    } catch (error) {
      console.error('Error creating rental:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const calculatedDays = startDate && endDate
    ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    : rentalDays;

  const totalPrice = activeTab === 'buy'
    ? device.price * quantity
    : device.rentPrice * quantity * calculatedDays;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{device.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Device Image */}
          <div className="mb-6">
            {device.imageUrl ? (
              <img
                src={device.imageUrl}
                alt={device.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-6xl">🏥</span>
              </div>
            )}
          </div>

          {/* Device Details */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Brand</p>
                <p className="font-medium">{device.brand}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Model</p>
                <p className="font-medium">{device.model}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{device.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Stock</p>
                <p className="font-medium">{device.stock} available</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Description</p>
              <p className="text-gray-700">{device.description}</p>
            </div>
            
            {/* Key Features */}
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-blue-900 mb-2">Key Features</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• FDA approved medical device</li>
                <li>• Professional grade accuracy</li>
                <li>• Easy to use interface</li>
                <li>• Comprehensive warranty included</li>
              </ul>
            </div>

            {/* Availability Status */}
            <div className={`rounded-lg p-3 ${
              device.isAvailable && device.stock > 0
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center">
                <i className={`ri-${device.isAvailable && device.stock > 0 ? 'check' : 'close'}-circle-line text-lg mr-2 ${
                  device.isAvailable && device.stock > 0 ? 'text-green-600' : 'text-red-600'
                }`}></i>
                <span className={`font-medium ${
                  device.isAvailable && device.stock > 0 ? 'text-green-800' : 'text-red-800'
                }`}>
                  {device.isAvailable && device.stock > 0 
                    ? `In Stock (${device.stock} available)` 
                    : 'Currently Out of Stock'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Action Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('buy')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'buy'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Purchase (${device.price})
              </button>
              <button
                onClick={() => setActiveTab('rent')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'rent'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Rent (${device.rentPrice}/day)
              </button>
            </nav>
          </div>

          {/* Action Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max={device.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {activeTab === 'rent' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate ? startDate.toISOString().split('T')[0] : ''}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : null;
                        setStartDate(date);
                        if (!endDate && date) {
                          const defaultEnd = new Date(date);
                          defaultEnd.setDate(date.getDate() + rentalDays - 1);
                          setEndDate(defaultEnd);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate ? endDate.toISOString().split('T')[0] : ''}
                      min={startDate ? startDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : null;
                        setEndDate(date);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {startDate && endDate && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Rental Duration:</strong> {calculatedDays} day{calculatedDays !== 1 ? 's' : ''}
                      <br />
                      <strong>From:</strong> {startDate.toLocaleDateString()}
                      <br />
                      <strong>To:</strong> {endDate.toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quick Select (days)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 3, 7, 14].map(days => (
                      <button
                        key={days}
                        type="button"
                        onClick={() => {
                          const start = startDate || new Date();
                          const end = new Date(start);
                          end.setDate(start.getDate() + days - 1);
                          setStartDate(start);
                          setEndDate(end);
                          setRentalDays(days);
                        }}
                        className="py-2 px-3 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                      >
                        {days} day{days !== 1 ? 's' : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-2xl font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={activeTab === 'buy' ? handlePurchase : handleRental}
                disabled={loading || !device.isAvailable}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Processing...' : `${activeTab === 'buy' ? 'Purchase' : 'Rent'} Now`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
