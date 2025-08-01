'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import DeviceCard from './DeviceCard';
import DeviceModal from './DeviceModal';
import AdvancedSearch from './AdvancedSearch';

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
  createdAt: string;
}

interface SearchFilters {
  category: string;
  brand: string;
  priceRange: [number, number];
  availability: 'all' | 'available' | 'rental';
  sortBy: 'name' | 'price' | 'rentPrice' | 'newest';
  sortOrder: 'asc' | 'desc';
}

export default function DeviceGrid() {
  const { data: session } = useSession();
  const [devices, setDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await fetch('/api/devices');
      if (response.ok) {
        const data = await response.json();
        setDevices(data);
        
        // Extract unique categories and brands
        const uniqueCategories = [...new Set(data.map((device: Device) => device.category))] as string[];
        const uniqueBrands = [...new Set(data.map((device: Device) => device.brand))] as string[];
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
        
        // Calculate price range
        const prices = data.map((device: Device) => device.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceRange([Math.floor(minPrice), Math.ceil(maxPrice)]);
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = useCallback((filters: SearchFilters) => {
    let filtered = devices.filter(device => {
      // Search term filter
      const matchesSearch = !searchTerm || 
        device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.model.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = !filters.category || device.category === filters.category;
      
      // Brand filter
      const matchesBrand = !filters.brand || device.brand === filters.brand;
      
      // Price range filter
      const matchesPrice = device.price >= filters.priceRange[0] && device.price <= filters.priceRange[1];
      
      // Availability filter
      const matchesAvailability = filters.availability === 'all' || 
        (filters.availability === 'available' && device.isAvailable && device.stock > 0) ||
        (filters.availability === 'rental' && device.isAvailable);

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesAvailability;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rentPrice':
          aValue = a.rentPrice;
          bValue = b.rentPrice;
          break;
        case 'newest':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (filters.sortOrder === 'desc') {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
    });

    setFilteredDevices(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [devices, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredDevices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDevices = filteredDevices.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-6 bg-gray-200 animate-pulse rounded-lg h-32"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search devices by name, brand, model, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
          <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
        </div>
      </div>

      {/* Advanced Search */}
      <AdvancedSearch
        onFiltersChange={applyFilters}
        categories={categories}
        brands={brands}
        priceRange={priceRange}
      />

      {/* Results Summary */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredDevices.length)} of {filteredDevices.length} devices
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">View:</span>
          <button className="p-2 text-blue-600 bg-blue-50 rounded">
            <i className="ri-grid-line"></i>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded">
            <i className="ri-list-check"></i>
          </button>
        </div>
      </div>

      {/* Device Grid */}
      {currentDevices.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No devices found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentDevices.map(device => (
              <DeviceCard
                key={device.id}
                device={device}
                onSelect={() => setSelectedDevice(device)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <i className="ri-arrow-left-s-line"></i>
              </button>
              
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const isCurrentPage = page === currentPage;
                const showPage = page === 1 || page === totalPages || 
                  (page >= currentPage - 2 && page <= currentPage + 2);
                
                if (!showPage) {
                  if (page === currentPage - 3 || page === currentPage + 3) {
                    return <span key={page} className="px-2">...</span>;
                  }
                  return null;
                }
                
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 border rounded-md ${
                      isCurrentPage
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
          )}
        </>
      )}

      {/* Device Modal */}
      {selectedDevice && (
        <DeviceModal
          device={selectedDevice}
          onClose={() => setSelectedDevice(null)}
          onSuccess={fetchDevices}
        />
      )}
    </div>
  );
}