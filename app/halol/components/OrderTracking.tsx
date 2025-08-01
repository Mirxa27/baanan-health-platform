'use client';
import { useState, useEffect } from 'react';

interface OrderTrackingProps {
  orderId: string;
  onClose: () => void;
}

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  timestamp: string;
  location?: string;
  isCompleted: boolean;
}

export default function OrderTracking({ orderId, onClose }: OrderTrackingProps) {
  const [trackingData, setTrackingData] = useState<TrackingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>('');

  useEffect(() => {
    fetchTrackingData();
  }, [orderId]);

  const fetchTrackingData = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}/tracking`);
      if (response.ok) {
        const data = await response.json();
        setTrackingData(data.events);
        setEstimatedDelivery(data.estimatedDelivery);
      }
    } catch (error) {
      console.error('Error fetching tracking data:', error);
      // Mock data for demonstration
      setTrackingData([
        {
          id: '1',
          status: 'Order Confirmed',
          description: 'Your order has been confirmed and is being prepared.',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          isCompleted: true,
        },
        {
          id: '2',
          status: 'Processing',
          description: 'Your order is being processed and prepared for shipment.',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          isCompleted: true,
        },
        {
          id: '3',
          status: 'Shipped',
          description: 'Your order has been shipped and is on its way.',
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          location: 'Distribution Center',
          isCompleted: true,
        },
        {
          id: '4',
          status: 'In Transit',
          description: 'Your package is in transit to the delivery location.',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          location: 'Local Facility',
          isCompleted: false,
        },
        {
          id: '5',
          status: 'Out for Delivery',
          description: 'Your package is out for delivery and will arrive today.',
          timestamp: '',
          isCompleted: false,
        },
        {
          id: '6',
          status: 'Delivered',
          description: 'Your package has been delivered.',
          timestamp: '',
          isCompleted: false,
        },
      ]);
      setEstimatedDelivery(new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString());
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string, isCompleted: boolean) => {
    const iconClass = isCompleted ? 'text-green-600' : 'text-gray-400';
    
    switch (status) {
      case 'Order Confirmed':
        return <i className={`ri-check-line ${iconClass}`}></i>;
      case 'Processing':
        return <i className={`ri-settings-3-line ${iconClass}`}></i>;
      case 'Shipped':
        return <i className={`ri-truck-line ${iconClass}`}></i>;
      case 'In Transit':
        return <i className={`ri-roadster-line ${iconClass}`}></i>;
      case 'Out for Delivery':
        return <i className={`ri-map-pin-line ${iconClass}`}></i>;
      case 'Delivered':
        return <i className={`ri-home-line ${iconClass}`}></i>;
      default:
        return <i className={`ri-circle-line ${iconClass}`}></i>;
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Order Tracking</h2>
              <p className="text-gray-600">Order #{orderId.slice(-8)}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Estimated Delivery */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <i className="ri-calendar-line text-blue-600 text-xl mr-3"></i>
              <div>
                <h3 className="font-semibold text-blue-900">Estimated Delivery</h3>
                <p className="text-blue-700">{estimatedDelivery}</p>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="space-y-4">
            {trackingData.map((event, index) => (
              <div key={event.id} className="flex items-start space-x-4">
                {/* Status Icon */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                  event.isCompleted 
                    ? 'bg-green-100 border-2 border-green-500' 
                    : index === trackingData.findIndex(e => !e.isCompleted)
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-100 border-2 border-gray-300'
                }`}>
                  {getStatusIcon(event.status, event.isCompleted)}
                </div>

                {/* Connecting Line */}
                {index < trackingData.length - 1 && (
                  <div className={`absolute left-[31px] mt-8 w-0.5 h-12 ${
                    event.isCompleted ? 'bg-green-300' : 'bg-gray-300'
                  }`}></div>
                )}

                {/* Event Details */}
                <div className="flex-1 pb-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-semibold ${
                        event.isCompleted ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {event.status}
                      </h3>
                      <p className={`text-sm ${
                        event.isCompleted ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {event.description}
                      </p>
                      {event.location && (
                        <p className="text-xs text-gray-500 mt-1">
                          <i className="ri-map-pin-line mr-1"></i>
                          {event.location}
                        </p>
                      )}
                    </div>
                    {event.timestamp && (
                      <span className="text-xs text-gray-500">
                        {new Date(event.timestamp).toLocaleDateString()} {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
            <p className="text-sm text-gray-600 mb-3">
              If you have questions about your order or delivery, our support team is here to help.
            </p>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Contact Support
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}