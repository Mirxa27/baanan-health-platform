'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import useTranslation from '../../../hooks/useTranslation';

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalRentals: number;
  totalDevices: number;
  revenueGrowth: number;
  orderGrowth: number;
  monthlyRevenue: { month: string; revenue: number; orders: number }[];
  topDevices: { name: string; sales: number; revenue: number }[];
  categoryDistribution: { name: string; value: number; color: string }[];
  maintenanceRequests: { status: string; count: number }[];
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const { t } = useTranslation('dashboard');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?range=${timeRange}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        // Mock data for demonstration
        setAnalytics({
          totalRevenue: 125430.50,
          totalOrders: 342,
          totalRentals: 89,
          totalDevices: 156,
          revenueGrowth: 12.5,
          orderGrowth: 8.3,
          monthlyRevenue: [
            { month: 'Jan', revenue: 8500, orders: 45 },
            { month: 'Feb', revenue: 9200, orders: 52 },
            { month: 'Mar', revenue: 11800, orders: 68 },
            { month: 'Apr', revenue: 10500, orders: 58 },
            { month: 'May', revenue: 13200, orders: 72 },
            { month: 'Jun', revenue: 15800, orders: 89 },
          ],
          topDevices: [
            { name: 'Blood Pressure Monitor', sales: 45, revenue: 4049.55 },
            { name: 'Pulse Oximeter', sales: 38, revenue: 1747.62 },
            { name: 'Digital Thermometer', sales: 67, revenue: 1339.33 },
            { name: 'Nebulizer Machine', sales: 12, revenue: 1559.88 },
            { name: 'Wheelchair', sales: 8, revenue: 2399.92 },
          ],
          categoryDistribution: [
            { name: 'Cardiovascular', value: 35, color: '#3B82F6' },
            { name: 'Respiratory', value: 28, color: '#10B981' },
            { name: 'General', value: 20, color: '#F59E0B' },
            { name: 'Mobility', value: 12, color: '#EF4444' },
            { name: 'Diabetes', value: 5, color: '#8B5CF6' },
          ],
          maintenanceRequests: [
            { status: 'PENDING', count: 15 },
            { status: 'SCHEDULED', count: 8 },
            { status: 'IN_PROGRESS', count: 3 },
            { status: 'COMPLETED', count: 42 },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-24"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{t('analytics')}</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="7d">{t('last_7_days')}</option>
          <option value="30d">{t('last_30_days')}</option>
          <option value="90d">{t('last_90_days')}</option>
          <option value="1y">{t('last_year')}</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('total_revenue')}</p>
              <p className="text-2xl font-bold text-gray-900">
                ${analytics.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-green-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm ${analytics.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <i className={`ri-arrow-${analytics.revenueGrowth >= 0 ? 'up' : 'down'}-line mr-1`}></i>
              {Math.abs(analytics.revenueGrowth)}%
            </span>
            <span className="text-sm text-gray-500 ml-2">{t('vs_last_period')}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('total_orders')}</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-shopping-bag-line text-blue-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm ${analytics.orderGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <i className={`ri-arrow-${analytics.orderGrowth >= 0 ? 'up' : 'down'}-line mr-1`}></i>
              {Math.abs(analytics.orderGrowth)}%
            </span>
            <span className="text-sm text-gray-500 ml-2">{t('vs_last_period')}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('active_rentals')}</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalRentals}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-refresh-line text-purple-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">{t('rental_utilization')}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('total_devices')}</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalDevices}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-hospital-line text-orange-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">{t('in_inventory')}</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('revenue_trend')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Selling Devices */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('top_selling_devices')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.topDevices}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Sales']} />
              <Bar dataKey="sales" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('sales_by_category')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.categoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analytics.categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Maintenance Requests */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('maintenance_requests')}</h3>
          <div className="space-y-4">
            {analytics.maintenanceRequests.map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    item.status === 'PENDING' ? 'bg-yellow-400' :
                    item.status === 'SCHEDULED' ? 'bg-blue-400' :
                    item.status === 'IN_PROGRESS' ? 'bg-orange-400' :
                    'bg-green-400'
                  }`}></div>
                  <span className="text-sm text-gray-700 capitalize">
                    {item.status.toLowerCase().replace('_', ' ')}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('recent_activity')}</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <i className="ri-check-line text-green-600"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{t('new_order_completed')}</p>
              <p className="text-xs text-gray-500">{t('order_details')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="ri-tools-line text-blue-600"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{t('maintenance_request_scheduled')}</p>
              <p className="text-xs text-gray-500">{t('maintenance_details')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <i className="ri-user-add-line text-purple-600"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{t('new_customer_registered')}</p>
              <p className="text-xs text-gray-500">{t('customer_details')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}