'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CalendarBooking from './CalendarBooking';

interface MaintenanceRequest {
  id: string;
  description: string;
  status: string;
  scheduledAt: string | null;
  completedAt: string | null;
  cost: number | null;
  notes: string | null;
  createdAt: string;
  device: {
    id: string;
    name: string;
    brand: string;
    model: string;
    imageUrl: string;
  };
}

export default function MaintenanceRequests() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [devices, setDevices] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    deviceId: '',
    description: '',
    preferredDate: null as Date | null,
    urgency: 'normal' as 'low' | 'normal' | 'high' | 'emergency',
    contactMethod: 'email' as 'email' | 'phone' | 'both',
  });

  useEffect(() => {
    if (session) {
      fetchRequests();
      fetchDevices();
    }
  }, [session]);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/maintenance');
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error('Error fetching maintenance requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDevices = async () => {
    try {
      const response = await fetch('/api/devices');
      if (response.ok) {
        const data = await response.json();
        setDevices(data);
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceId: formData.deviceId,
          description: formData.description,
          preferredDate: formData.preferredDate?.toISOString(),
          urgency: formData.urgency,
          contactMethod: formData.contactMethod,
        }),
      });

      if (response.ok) {
        setShowCreateForm(false);
        setFormData({ 
          deviceId: '', 
          description: '', 
          preferredDate: null,
          urgency: 'normal',
          contactMethod: 'email'
        });
        fetchRequests();
      } else {
        alert('Failed to create maintenance request');
      }
    } catch (error) {
      console.error('Error creating maintenance request:', error);
      alert('An error occurred');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS':
        return 'bg-purple-100 text-purple-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Maintenance Requests</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Request Maintenance
        </button>
      </div>

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Request Maintenance</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device
                </label>
                <select
                  value={formData.deviceId}
                  onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a device</option>
                  {devices.map(device => (
                    <option key={device.id} value={device.id}>
                      {device.name} - {device.brand} {device.model}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the issue or maintenance needed..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low - Routine maintenance</option>
                  <option value="normal">Normal - Standard service</option>
                  <option value="high">High - Device malfunction</option>
                  <option value="emergency">Emergency - Critical failure</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Method
                </label>
                <select
                  value={formData.contactMethod}
                  onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="both">Both Email and Phone</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Appointment Date
                </label>
                <CalendarBooking
                  onDateSelect={(date) => setFormData({ ...formData, preferredDate: date })}
                  selectedDate={formData.preferredDate || undefined}
                  minDate={new Date()}
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {requests.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔧</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No maintenance requests</h3>
          <p className="text-gray-500">Your maintenance requests will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => (
            <div key={request.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Request #{request.id.slice(-8)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                  {request.scheduledAt && (
                    <p className="text-sm text-blue-600">
                      Scheduled: {new Date(request.scheduledAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(request.status)}`}>
                    {request.status.replace('_', ' ')}
                  </span>
                  {request.cost && (
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      ${request.cost.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  {request.device.imageUrl ? (
                    <img
                      src={request.device.imageUrl}
                      alt={request.device.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-2xl">🏥</span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{request.device.name}</h4>
                  <p className="text-sm text-gray-500 mb-2">
                    {request.device.brand} - {request.device.model}
                  </p>
                  <p className="text-gray-700 mb-2">{request.description}</p>
                  {request.notes && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm font-medium text-gray-700">Notes:</p>
                      <p className="text-sm text-gray-600">{request.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}