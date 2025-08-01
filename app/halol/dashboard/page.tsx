'use client';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '../../../hooks/useTranslation.simple';
import DeviceGrid from '../components/DeviceGrid';
import OrderHistory from '../components/OrderHistory';
import RentalHistory from '../components/RentalHistory';
import MaintenanceRequests from '../components/MaintenanceRequests';
import CustomerService from '../components/CustomerService';
import AdminPanel from '../components/AdminPanel';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import NotificationCenter from '../components/NotificationCenter';

export default function HalolDashboard() {
  const { t } = useTranslation('dashboard');
  const [activeTab, setActiveTab] = useState('catalog');
  const [showNotifications, setShowNotifications] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/halol/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const tabs = [
    { id: 'catalog', name: t('device_catalog'), icon: 'ri-hospital-line' },
    { id: 'orders', name: t('purchase_orders'), icon: 'ri-shopping-cart-line' },
    { id: 'rentals', name: t('equipment_rentals'), icon: 'ri-refresh-line' },
    { id: 'maintenance', name: t('maintenance'), icon: 'ri-tools-line' },
    { id: 'support', name: t('customer_support'), icon: 'ri-customer-service-line' },
    ...(session?.user?.role === 'ADMIN' 
      ? [
          { id: 'admin', name: t('admin_panel'), icon: 'ri-admin-line' },
          { id: 'analytics', name: t('analytics'), icon: 'ri-bar-chart-line' }
        ] 
      : []
    )
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {t('halol_dashboard')}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <i className="ri-notification-line mr-2"></i>
                  {t('notifications')}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 z-50">
                    <NotificationCenter 
                      isOpen={showNotifications} 
                      onClose={() => setShowNotifications(false)} 
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-600 hidden sm:inline">
                  {session.user?.name}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/halol/auth/signin' })}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title={t('sign_out')}
                >
                  <i className="ri-logout-box-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'catalog' && <DeviceGrid />}
        {activeTab === 'orders' && <OrderHistory />}
        {activeTab === 'rentals' && <RentalHistory />}
        {activeTab === 'maintenance' && <MaintenanceRequests />}
        {activeTab === 'support' && <CustomerService />}
        {activeTab === 'admin' && session?.user?.role === 'ADMIN' && <AdminPanel />}
        {activeTab === 'analytics' && session?.user?.role === 'ADMIN' && <AnalyticsDashboard />}
      </div>
    </div>
  );
}
