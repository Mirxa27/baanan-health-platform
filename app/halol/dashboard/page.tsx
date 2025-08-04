'use client';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get initial tab from URL params or default to 'catalog'
  const initialTab = searchParams.get('tab') || 'catalog';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/halol/auth/signin');
    }
  }, [status, router]);

  // Update URL when tab changes
  useEffect(() => {
    const newUrl = activeTab === 'catalog' 
      ? '/halol/dashboard' 
      : `/halol/dashboard?tab=${activeTab}`;
    window.history.replaceState(null, '', newUrl);
  }, [activeTab]);

  // Update active tab when URL params change
  useEffect(() => {
    const urlTab = searchParams.get('tab') || 'catalog';
    if (urlTab !== activeTab) {
      setActiveTab(urlTab);
    }
  }, [searchParams]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const tabs = [
    { 
      id: 'catalog', 
      name: t('device_catalog'), 
      icon: 'ri-hospital-line',
      description: 'Browse and manage medical devices'
    },
    { 
      id: 'orders', 
      name: t('purchase_orders'), 
      icon: 'ri-shopping-cart-line',
      description: 'View and manage your orders'
    },
    { 
      id: 'rentals', 
      name: t('equipment_rentals'), 
      icon: 'ri-refresh-line',
      description: 'Manage equipment rentals'
    },
    { 
      id: 'maintenance', 
      name: t('maintenance'), 
      icon: 'ri-tools-line',
      description: 'Schedule and track maintenance'
    },
    { 
      id: 'support', 
      name: t('customer_support'), 
      icon: 'ri-customer-service-line',
      description: 'Get help and support'
    },
    ...(session?.user?.role === 'ADMIN' 
      ? [
          { 
            id: 'admin', 
            name: t('admin_panel'), 
            icon: 'ri-admin-line',
            description: 'System administration'
          },
          { 
            id: 'analytics', 
            name: t('analytics'), 
            icon: 'ri-bar-chart-line',
            description: 'Business analytics and reports'
          }
        ] 
      : []
    )
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <i className="ri-dashboard-fill text-white text-xl"></i>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {t('halol_dashboard')}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {activeTabData?.description || 'Medical device management platform'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                  aria-label="Notifications"
                >
                  <i className="ri-notification-line mr-2"></i>
                  {t('notifications')}
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
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

              {/* User Profile */}
              <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-sm font-medium text-gray-900">
                    {session.user?.name}
                  </span>
                  <p className="text-xs text-gray-500">
                    {session.user?.role}
                  </p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/halol/auth/signin' })}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  title={t('sign_out')}
                  aria-label="Sign out"
                >
                  <i className="ri-logout-box-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-2 overflow-x-auto pb-2" aria-label="Dashboard navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 bg-white shadow-sm'
                }`}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                <i className={`${tab.icon} mr-3 text-lg`}></i>
                <span>{tab.name}</span>
                {activeTab === tab.id && (
                  <div className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area with Animation */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === 'catalog' && <DeviceGrid />}
          {activeTab === 'orders' && <OrderHistory />}
          {activeTab === 'rentals' && <RentalHistory />}
          {activeTab === 'maintenance' && <MaintenanceRequests />}
          {activeTab === 'support' && <CustomerService />}
          {activeTab === 'admin' && session?.user?.role === 'ADMIN' && <AdminPanel />}
          {activeTab === 'analytics' && session?.user?.role === 'ADMIN' && <AnalyticsDashboard />}
        </div>
      </div>

      {/* Quick Actions Floating Button */}
      <div className="fixed bottom-20 right-6 md:bottom-6 md:right-6 z-40">
        <div className="relative group">
          <button className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center">
            <i className="ri-add-line text-xl"></i>
          </button>
          
          {/* Quick Actions Menu */}
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
            <button 
              onClick={() => setActiveTab('orders')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded whitespace-nowrap"
            >
              <i className="ri-shopping-cart-line mr-2"></i>
              New Order
            </button>
            <button 
              onClick={() => setActiveTab('maintenance')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded whitespace-nowrap"
            >
              <i className="ri-tools-line mr-2"></i>
              Schedule Maintenance
            </button>
            <button 
              onClick={() => setActiveTab('support')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded whitespace-nowrap"
            >
              <i className="ri-customer-service-line mr-2"></i>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
