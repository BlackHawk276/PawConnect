// Custom hook for managing shelter filtering logic
import { useState, useMemo } from 'react';
import { Shelter } from '../data/mockShelters';
import { FilterState } from '../components/FilterSidebar';

export const useFilters = (shelters: Shelter[]) => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    state: 'All States',
    city: '',
    establishedYear: 'All Years'
  });

  const filteredShelters = useMemo(() => {
    return shelters.filter(shelter => {
      if (filters.searchQuery && !shelter.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }

      if (filters.state !== 'All States' && shelter.state !== filters.state) {
        return false;
      }

      if (filters.city && !shelter.city.toLowerCase().includes(filters.city.toLowerCase())) {
        return false;
      }

      if (filters.establishedYear !== 'All Years' && shelter.establishedYear) {
        const year = shelter.establishedYear;
        switch (filters.establishedYear) {
          case '2020-2024':
            if (year < 2020 || year > 2024) return false;
            break;
          case '2015-2019':
            if (year < 2015 || year > 2019) return false;
            break;
          case '2010-2014':
            if (year < 2010 || year > 2014) return false;
            break;
          case 'Before 2010':
            if (year >= 2010) return false;
            break;
        }
      }

      return true;
    });
  }, [shelters, filters]);

  return {
    filters,
    setFilters,
    filteredShelters
  };
};
