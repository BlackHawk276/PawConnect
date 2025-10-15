// Filter sidebar component for shelter search and filtering
import React from 'react';
import { Search, X } from 'lucide-react';

export interface FilterState {
  searchQuery: string;
  state: string;
  city: string;
  establishedYear: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  resultCount: number;
}

const INDIAN_STATES = [
  'All States',
  'Andhra Pradesh',
  'Delhi',
  'Gujarat',
  'Karnataka',
  'Kerala',
  'Maharashtra',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal'
];

const YEAR_RANGES = [
  'All Years',
  '2020-2024',
  '2015-2019',
  '2010-2014',
  'Before 2010'
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  resultCount
}) => {
  const updateFilter = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      searchQuery: '',
      state: 'All States',
      city: '',
      establishedYear: 'All Years'
    });
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.state !== 'All States' ||
    filters.city !== '' ||
    filters.establishedYear !== 'All Years';

  return (
    <aside className="w-full lg:w-80 bg-white rounded-2xl shadow-lg p-6 sticky top-24 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-neutral-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="mb-6 pb-6 border-b border-neutral-200">
        <p className="text-neutral-600">
          <span className="font-semibold text-neutral-900">{resultCount}</span> shelters found
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-neutral-900 mb-2">
          Search by Name
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Shelter name..."
            value={filters.searchQuery}
            onChange={(e) => updateFilter('searchQuery', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-neutral-900 mb-2">
          State
        </label>
        <select
          value={filters.state}
          onChange={(e) => updateFilter('state', e.target.value)}
          className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white cursor-pointer"
        >
          {INDIAN_STATES.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-neutral-900 mb-2">
          City
        </label>
        <input
          type="text"
          placeholder="Enter city name..."
          value={filters.city}
          onChange={(e) => updateFilter('city', e.target.value)}
          className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-neutral-900 mb-2">
          Established
        </label>
        <select
          value={filters.establishedYear}
          onChange={(e) => updateFilter('establishedYear', e.target.value)}
          className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white cursor-pointer"
        >
          {YEAR_RANGES.map(range => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>
    </aside>
  );
};
