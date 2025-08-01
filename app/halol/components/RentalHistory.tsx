'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface RentalItem {
  id: string;
  quantity: number;
  dailyRate: number;
  device: {
    id: string;
    name: string;
    brand: string;
    model: string;
    imageUrl: string;
  };
}

interface Rental {
  id: string;
  status: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  createdAt: string;
  rentalItems: RentalItem[];
}

export default function RentalHistory() {
  const { data: session } = useSession();
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchRentals();
    }
  }, [session]);

  const fetchRentals = async () => {
    try {
      const response = await fetch('/api/rentals');
      if (response.ok) {
        const data = await response.json();
        setRentals(data);
      }
    } catch (error) {
      console.error('Error fetching rentals:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Rental History</h2>
      
      {rentals.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔄</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No rentals yet</h3>
          <p className="text-gray-500">Your rental history will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {rentals.map((rental) => (
            <div key={rental.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Rental #{rental.id.slice(-8)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                  </p>
                  {rental.status === 'ACTIVE' && (
                    <p className="text-sm text-blue-600">
                      {getDaysRemaining(rental.endDate)} days remaining
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(rental.status)}`}>
                    {rental.status}
                  </span>
                  <p className="text-lg font-bold text-gray-900 mt-2">
                    ${rental.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {rental.rentalItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      {item.device.imageUrl ? (
                        <img
                          src={item.device.imageUrl}
                          alt={item.device.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-2xl">🏥</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.device.name}</h4>
                      <p className="text-sm text-gray-500">
                        {item.device.brand} - {item.device.model}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity} × ${item.dailyRate.toFixed(2)}/day
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}