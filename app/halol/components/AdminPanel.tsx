'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AnalyticsDashboard from './AnalyticsDashboard';
import useTranslation from '../../../hooks/useTranslation';

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

interface Agent {
  id: string;
  name: string;
  email: string;
  type: string;
  isActive: boolean;
}

export default function AdminPanel() {
  const { data: session } = useSession();
  const { t } = useTranslation('dashboard');
  const [activeTab, setActiveTab] = useState('analytics');
  const [devices, setDevices] = useState<Device[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeviceForm, setShowDeviceForm] = useState(false);
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);

  const [deviceForm, setDeviceForm] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    model: '',
    price: 0,
    rentPrice: 0,
    imageUrl: '',
    stock: 0,
    isAvailable: true,
  });

  const [agentForm, setAgentForm] = useState({
    name: '',
    email: '',
    type: 'HUMAN',
  });

  useEffect(() => {
    if (session?.user.role === 'ADMIN') {
      fetchDevices();
      fetchAgents();
    }
  }, [session]);

  const fetchDevices = async () => {
    try {
      const response = await fetch('/api/devices');
      if (response.ok) {
        const data = await response.json();
        setDevices(data);
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/admin/agents');
      if (response.ok) {
        const data = await response.json();
        setAgents(data);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeviceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingDevice ? `/api/admin/devices/${editingDevice.id}` : '/api/devices';
      const method = editingDevice ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deviceForm),
      });

      if (response.ok) {
        setShowDeviceForm(false);
        setEditingDevice(null);
        setDeviceForm({
          name: '',
          description: '',
          category: '',
          brand: '',
          model: '',
          price: 0,
          rentPrice: 0,
          imageUrl: '',
          stock: 0,
          isAvailable: true,
        });
        fetchDevices();
      } else {
        alert(t('failed_to_save_device'));
      }
    } catch (error) {
      console.error('Error saving device:', error);
      alert(t('error_occurred'));
    }
  };

  const handleAgentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/admin/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agentForm),
      });

      if (response.ok) {
        setShowAgentForm(false);
        setAgentForm({
          name: '',
          email: '',
          type: 'HUMAN',
        });
        fetchAgents();
      } else {
        alert(t('failed_to_create_agent'));
      }
    } catch (error) {
      console.error('Error creating agent:', error);
      alert(t('error_occurred'));
    }
  };

  const editDevice = (device: Device) => {
    setEditingDevice(device);
    setDeviceForm({
      name: device.name,
      description: device.description || '',
      category: device.category,
      brand: device.brand,
      model: device.model,
      price: device.price,
      rentPrice: device.rentPrice,
      imageUrl: device.imageUrl || '',
      stock: device.stock,
      isAvailable: device.isAvailable,
    });
    setShowDeviceForm(true);
  };

  const deleteDevice = async (deviceId: string) => {
    if (!confirm(t('confirm_delete_device'))) return;

    try {
      const response = await fetch(`/api/admin/devices/${deviceId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchDevices();
      } else {
        alert(t('failed_to_delete_device'));
      }
    } catch (error) {
      console.error('Error deleting device:', error);
      alert(t('error_occurred'));
    }
  };

  const toggleAgentStatus = async (agentId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/agents/${agentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (response.ok) {
        fetchAgents();
      } else {
        alert(t('failed_to_update_agent_status'));
      }
    } catch (error) {
      console.error('Error updating agent:', error);
      alert(t('error_occurred'));
    }
  };

  if (session?.user.role !== 'ADMIN') {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500 text-6xl mb-4">🚫</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{t('access_denied')}</h3>
        <p className="text-gray-500">{t('access_denied_message')}</p>
      </div>
    );
  }

  const tabs = [
    { id: 'analytics', label: t('analytics'), icon: '📊' },
    { id: 'devices', label: t('manage_devices'), icon: '🏥' },
    { id: 'agents', label: t('customer_service_agents'), icon: '👥' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('admin_panel')}</h2>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
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

      {/* Analytics Tab */}
      {activeTab === 'analytics' && <AnalyticsDashboard />}

      {/* Devices Tab */}
      {activeTab === 'devices' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{t('device_management')}</h3>
            <button
              onClick={() => setShowDeviceForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {t('add_device')}
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('device')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('category')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('price')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('stock')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {devices.map((device) => (
                    <tr key={device.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                            {device.imageUrl ? (
                              <img
                                src={device.imageUrl}
                                alt={device.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <span className="text-lg">🏥</span>
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{device.name}</div>
                            <div className="text-sm text-gray-500">{device.brand} - {device.model}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {device.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>${device.price}</div>
                        <div className="text-xs text-gray-500">${device.rentPrice}/day</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {device.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          device.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {device.isAvailable ? t('available') : t('out_of_stock')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => editDevice(device)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          {t('edit')}
                        </button>
                        <button
                          onClick={() => deleteDevice(device.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          {t('delete')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Agents Tab */}
      {activeTab === 'agents' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{t('customer_service_agents')}</h3>
            <button
              onClick={() => setShowAgentForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {t('add_agent')}
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('name')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('email')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('type')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {agents.map((agent) => (
                    <tr key={agent.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {agent.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {agent.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          agent.type === 'AI' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {agent.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          agent.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {agent.isActive ? t('active') : t('inactive')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => toggleAgentStatus(agent.id, agent.isActive)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {agent.isActive ? t('deactivate') : t('activate')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Device Form Modal */}
      {showDeviceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingDevice ? t('edit_device') : t('add_new_device')}
            </h3>
            <form onSubmit={handleDeviceSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('name')}</label>
                  <input
                    type="text"
                    value={deviceForm.name}
                    onChange={(e) => setDeviceForm({ ...deviceForm, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('category')}</label>
                  <input
                    type="text"
                    value={deviceForm.category}
                    onChange={(e) => setDeviceForm({ ...deviceForm, category: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('brand')}</label>
                  <input
                    type="text"
                    value={deviceForm.brand}
                    onChange={(e) => setDeviceForm({ ...deviceForm, brand: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('model')}</label>
                  <input
                    type="text"
                    value={deviceForm.model}
                    onChange={(e) => setDeviceForm({ ...deviceForm, model: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('price')} ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={deviceForm.price}
                    onChange={(e) => setDeviceForm({ ...deviceForm, price: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('rent_price')}</label>
                  <input
                    type="number"
                    step="0.01"
                    value={deviceForm.rentPrice}
                    onChange={(e) => setDeviceForm({ ...deviceForm, rentPrice: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('stock')}</label>
                  <input
                    type="number"
                    value={deviceForm.stock}
                    onChange={(e) => setDeviceForm({ ...deviceForm, stock: parseInt(e.target.value) || 0 })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isAvailable"
                      checked={deviceForm.isAvailable}
                      onChange={(e) => setDeviceForm({ ...deviceForm, isAvailable: e.target.checked })}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-900">
                      {t('available_for_purchase_rent')}
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('image_url')}</label>
                  <input
                    type="url"
                    value={deviceForm.imageUrl}
                    onChange={(e) => setDeviceForm({ ...deviceForm, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('description')}</label>
                <textarea
                  value={deviceForm.description}
                  onChange={(e) => setDeviceForm({ ...deviceForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeviceForm(false);
                    setEditingDevice(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingDevice ? t('update_device') : t('add_device')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Agent Form Modal */}
      {showAgentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">{t('add_new_agent')}</h3>
            <form onSubmit={handleAgentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('name')}</label>
                <input
                  type="text"
                  value={agentForm.name}
                  onChange={(e) => setAgentForm({ ...agentForm, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('email')}</label>
                <input
                  type="email"
                  value={agentForm.email}
                  onChange={(e) => setAgentForm({ ...agentForm, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('type')}</label>
                <select
                  value={agentForm.type}
                  onChange={(e) => setAgentForm({ ...agentForm, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="HUMAN">{t('human')}</option>
                  <option value="AI">{t('ai')}</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAgentForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {t('add_agent')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}