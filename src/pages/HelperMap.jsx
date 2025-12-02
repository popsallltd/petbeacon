import { useState } from 'react';
import { mockHelpers } from '../data/mockData';
import {
  MapPin,
  Filter,
  Star,
  Phone,
  Navigation,
  X,
  ChevronDown,
  Search,
  Scan,
} from 'lucide-react';

export default function HelperMap() {
  const [selectedHelper, setSelectedHelper] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    scanner: 'all',
    distance: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const helperTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'vet', label: 'Vet Clinics' },
    { value: 'featured', label: 'Featured Providers' },
    { value: 'basic', label: 'Basic Providers' },
    { value: 'community', label: 'Community Helpers' },
  ];

  const scannerTypes = [
    { value: 'all', label: 'All Scanners' },
    { value: 'Universal ISO', label: 'Universal ISO' },
    { value: 'Basic Scanner', label: 'Basic Scanner' },
    { value: 'None', label: 'No Scanner' },
  ];

  const distanceOptions = [
    { value: 'all', label: 'Any Distance' },
    { value: '2', label: 'Within 2 miles' },
    { value: '5', label: 'Within 5 miles' },
    { value: '10', label: 'Within 10 miles' },
  ];

  // Filter helpers
  const filteredHelpers = mockHelpers.filter((helper) => {
    if (filters.type !== 'all' && helper.type !== filters.type) return false;
    if (filters.scanner !== 'all' && helper.scannerType !== filters.scanner) return false;
    if (searchQuery && !helper.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'vet': return 'bg-red-100 text-red-700 border-red-200';
      case 'featured': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'basic': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'community': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-primary-100 text-primary-700 border-primary-200';
    }
  };

  const getTypeBgColor = (type) => {
    switch (type) {
      case 'vet': return 'bg-red-500';
      case 'featured': return 'bg-amber-500';
      case 'basic': return 'bg-gray-400';
      case 'community': return 'bg-blue-500';
      default: return 'bg-primary-500';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-primary-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary-900">Find Helpers Nearby</h1>
              <p className="text-sm text-primary-600">
                {filteredHelpers.length} helpers in your area
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
                <input
                  type="text"
                  placeholder="Search helpers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-48 pl-10 pr-4 py-2 rounded-xl border border-primary-100 bg-cream-50 text-sm focus:border-primary-400"
                />
              </div>

              {/* Filter button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors
                  ${showFilters
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'bg-white text-primary-700 border-primary-200 hover:border-primary-400'
                  }
                `}
              >
                <Filter className="w-4 h-4" />
                Filters
                {(filters.type !== 'all' || filters.scanner !== 'all' || filters.distance !== 'all') && (
                  <span className="w-5 h-5 rounded-full bg-accent-500 text-white text-xs flex items-center justify-center">
                    {[filters.type, filters.scanner, filters.distance].filter(f => f !== 'all').length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-cream-50 rounded-2xl border border-primary-100 animate-fade-in">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-primary-600 mb-2">
                    Helper Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-primary-100 bg-white text-sm"
                  >
                    {helperTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-primary-600 mb-2">
                    Scanner Type
                  </label>
                  <select
                    value={filters.scanner}
                    onChange={(e) => setFilters({ ...filters, scanner: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-primary-100 bg-white text-sm"
                  >
                    {scannerTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-primary-600 mb-2">
                    Distance
                  </label>
                  <select
                    value={filters.distance}
                    onChange={(e) => setFilters({ ...filters, distance: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-primary-100 bg-white text-sm"
                  >
                    {distanceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={() => setFilters({ type: 'all', scanner: 'all', distance: 'all' })}
                className="mt-3 text-xs text-primary-600 hover:text-primary-800"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map View */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-3xl shadow-soft border border-primary-100 overflow-hidden sticky top-48">
              {/* Map placeholder */}
              <div className="relative aspect-square lg:aspect-[4/3] bg-gradient-to-br from-primary-50 via-cream-50 to-primary-100">
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0f524d" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Street labels */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-xs text-primary-400 font-medium tracking-wider opacity-50">
                  DEANSGATE
                </div>
                <div className="absolute top-1/2 left-8 text-xs text-primary-400 font-medium tracking-wider opacity-50 -rotate-90">
                  OXFORD RD
                </div>
                <div className="absolute bottom-1/4 right-1/4 text-xs text-primary-400 font-medium tracking-wider opacity-50">
                  PRINCESS ST
                </div>

                {/* Helper pins */}
                {filteredHelpers.map((helper) => (
                  <button
                    key={helper.id}
                    onClick={() => setSelectedHelper(helper)}
                    className={`
                      absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200
                      hover:scale-125 hover:z-20 focus:scale-125 focus:z-20
                      ${selectedHelper?.id === helper.id ? 'scale-125 z-20' : 'z-10'}
                    `}
                    style={{
                      left: `${helper.position.x}%`,
                      top: `${helper.position.y}%`,
                    }}
                  >
                    <div className="relative">
                      {/* Pulse effect for selected */}
                      {selectedHelper?.id === helper.id && (
                        <>
                          <div
                            className="absolute inset-0 rounded-full animate-ping"
                            style={{ backgroundColor: helper.color, opacity: 0.3 }}
                          />
                        </>
                      )}
                      {/* Pin */}
                      <div
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center text-lg
                          shadow-lg border-2 border-white
                          ${getTypeBgColor(helper.type)}
                        `}
                      >
                        {helper.icon}
                      </div>
                    </div>
                  </button>
                ))}

                {/* Map legend */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3">
                  <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="text-base">📍</span>
                      <span className="text-primary-600">Vet (Safe Haven)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-base">⭐</span>
                      <span className="text-primary-600">Featured</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-base">🌟</span>
                      <span className="text-primary-600">Basic</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-base">🔵</span>
                      <span className="text-primary-600">Community</span>
                    </div>
                  </div>
                </div>

                {/* Center marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 rounded-full bg-primary-600 border-4 border-white shadow-lg" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-primary-300 rounded-full opacity-30" />
                </div>
              </div>
            </div>
          </div>

          {/* Helper List */}
          <div className="order-1 lg:order-2 space-y-4">
            {filteredHelpers.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-primary-100">
                <MapPin className="w-12 h-12 text-primary-300 mx-auto mb-4" />
                <h3 className="font-semibold text-primary-900 mb-2">No helpers found</h3>
                <p className="text-sm text-primary-600">
                  Try adjusting your filters or search query
                </p>
              </div>
            ) : (
              filteredHelpers.map((helper) => (
                <div
                  key={helper.id}
                  onClick={() => setSelectedHelper(helper)}
                  className={`
                    bg-white rounded-2xl p-4 border cursor-pointer transition-all duration-200
                    ${selectedHelper?.id === helper.id
                      ? 'border-primary-400 shadow-glow ring-2 ring-primary-200'
                      : 'border-primary-100 hover:border-primary-300 hover:shadow-soft'
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`
                        w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0
                        ${getTypeBgColor(helper.type)} bg-opacity-20
                      `}
                    >
                      {helper.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-primary-900 truncate">
                          {helper.name}
                        </h3>
                        <span
                          className={`
                            px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0
                            ${getTypeColor(helper.type)}
                          `}
                        >
                          {helper.badge}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-medium text-primary-800">
                            {helper.rating}
                          </span>
                        </div>
                        <span className="text-primary-300">•</span>
                        <span className="text-sm text-primary-600">
                          {helper.reviews} reviews
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {helper.scannerType !== 'None' && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-cream-100 rounded-lg">
                            <Scan className="w-3 h-3 text-primary-600" />
                            <span className="text-xs text-primary-700">{helper.scannerType}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 px-2 py-1 bg-cream-100 rounded-lg">
                          <Navigation className="w-3 h-3 text-primary-600" />
                          <span className="text-xs text-primary-700">{helper.reach}</span>
                        </div>
                      </div>

                      <p className="text-sm text-primary-500 mt-2 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {helper.address}
                      </p>
                    </div>
                  </div>

                  {/* Expanded details when selected */}
                  {selectedHelper?.id === helper.id && helper.phone && (
                    <div className="mt-4 pt-4 border-t border-primary-100 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <a
                          href={`tel:${helper.phone}`}
                          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          {helper.phone}
                        </a>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-xl text-sm font-medium hover:bg-primary-100 transition-colors">
                          <Navigation className="w-4 h-4" />
                          Get Directions
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Mobile Detail Modal */}
      {selectedHelper && (
        <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 animate-slide-up">
          <div className="bg-white rounded-t-3xl shadow-2xl p-6 border-t border-primary-100">
            <button
              onClick={() => setSelectedHelper(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-cream-100 transition-colors"
            >
              <X className="w-5 h-5 text-primary-600" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div
                className={`
                  w-16 h-16 rounded-xl flex items-center justify-center text-3xl
                  ${getTypeBgColor(selectedHelper.type)} bg-opacity-20
                `}
              >
                {selectedHelper.icon}
              </div>
              <div>
                <h3 className="font-bold text-primary-900 text-lg">{selectedHelper.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(selectedHelper.type)}`}>
                  {selectedHelper.badge}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center gap-2 text-primary-600">
                <MapPin className="w-4 h-4" />
                {selectedHelper.address}
              </div>
              <div className="flex items-center gap-2 text-primary-600">
                <Scan className="w-4 h-4" />
                {selectedHelper.scannerType} • {selectedHelper.reach}
              </div>
              <div className="flex items-center gap-2 text-primary-600">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                {selectedHelper.rating} ({selectedHelper.reviews} reviews)
              </div>
            </div>

            {selectedHelper.phone && (
              <div className="flex gap-3">
                <a
                  href={`tel:${selectedHelper.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 text-white rounded-xl font-medium"
                >
                  <Phone className="w-5 h-5" />
                  Call
                </a>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-50 text-primary-700 rounded-xl font-medium">
                  <Navigation className="w-5 h-5" />
                  Directions
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
