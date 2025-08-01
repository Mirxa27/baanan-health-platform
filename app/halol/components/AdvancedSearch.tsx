'use client';
import { useState, useEffect } from 'react';

interface SearchFilters {
  category: string;
  brand: string;
  priceRange: [number, number];
  availability: 'all' | 'available' | 'rental';
  sortBy: 'name' | 'price' | 'rentPrice' | 'newest';
  sortOrder: 'asc' | 'desc';
}

interface AdvancedSearchProps {
  onFiltersChange: (filters: SearchFilters) => void;
  categories: string[];
  brands: string[];
  priceRange: [number, number];
}

export default function AdvancedSearch({
  onFiltersChange,
  categories,
  brands,
  priceRange
}: AdvancedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    brand: '',
    priceRange: priceRange,
    availability: 'all',
    sortBy: 'name',
    sortOrder: 'asc',
  });

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      brand: '',
      priceRange: priceRange,
      availability: 'all',
      sortBy: 'name',
      sortOrder: 'asc',
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (typeof value === 'string') return value !== '';
    if (Array.isArray(value)) return value[0] !== priceRange[0] || value[1] !== priceRange[1];
    return value !== 'all' && value !== 'name' && value !== 'asc';
  }).length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-6">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <i className={`ri-filter-3-line text-lg ${isExpanded ? 'text-blue-600' : ''}`}></i>
              <span className="font-medium">Advanced Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            <i className={`ri-arrow-${isExpanded ? 'up' : 'down'}-s-line text-gray-400`}></i>
          </div>
          
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear All
            </button>
          )}
        </div>

        {isExpanded && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                value={filters.availability}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Items</option>
                <option value="available">Available for Purchase</option>
                <option value="rental">Available for Rental</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min={priceRange[0]}
                  max={priceRange[1]}
                  value={filters.priceRange[0]}
                  onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                  className="flex-1"
                />
                <input
                  type="range"
                  min={priceRange[0]}
                  max={priceRange[1]}
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                  className="flex-1"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <div className="flex space-x-2">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Name</option>
                  <option value="price">Purchase Price</option>
                  <option value="rentPrice">Rental Price</option>
                  <option value="newest">Newest</option>
                </select>
                <button
                  onClick={() => handleFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  title={`Sort ${filters.sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                >
                  <i className={`ri-sort-${filters.sortOrder === 'asc' ? 'asc' : 'desc'}`}></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Filters */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 mr-2">Quick filters:</span>
          {['Cardiovascular', 'Respiratory', 'Mobility'].map(category => (
            <button
              key={category}
              onClick={() => handleFilterChange('category', filters.category === category ? '' : category)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                filters.category === category
                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
          <button
            onClick={() => handleFilterChange('availability', filters.availability === 'available' ? 'all' : 'available')}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              filters.availability === 'available'
                ? 'bg-green-100 text-green-800 border-green-200'
                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
          >
            In Stock
          </button>
        </div>
      </div>
    </div>
  );
}