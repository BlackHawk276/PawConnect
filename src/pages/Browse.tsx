// Browse page with filter sidebar and shelter grid
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FilterSidebar } from '../components/FilterSidebar';
import { ShelterCard } from '../components/ShelterCard';
import { useFilters } from '../hooks/useFilters';
import { shelterService, ShelterData } from '../services/shelterService';

export const Browse: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [shelters, setShelters] = useState<ShelterData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { filters, setFilters, filteredShelters } = useFilters(shelters);

  useEffect(() => {
    const loadShelters = async () => {
      try {
        const data = await shelterService.getAllPublishedShelters();
        setShelters(data);
      } catch (error) {
        console.error('Error loading shelters:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadShelters();
  }, []);

  useEffect(() => {
    const locationParam = searchParams.get('location');
    if (locationParam) {
      setFilters(prev => ({ ...prev, city: locationParam }));
    }
  }, [searchParams, setFilters]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Find Shelters
            </h1>
            <p className="text-xl text-neutral-600">
              Discover verified animal shelters across India
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:flex-shrink-0"
          >
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              resultCount={filteredShelters.length}
            />
          </motion.div>

          <div className="flex-1">
            {isLoading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900"></div>
              </div>
            ) : filteredShelters.length > 0 ? (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
              >
                {filteredShelters.map(shelter => (
                  <motion.div key={shelter.id} variants={item}>
                    <ShelterCard
                      shelter={shelter}
                      showVerifiedBadge={true}
                      grayscale={true}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="mb-4">
                  <svg className="w-24 h-24 mx-auto text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">No shelters found</h3>
                <p className="text-neutral-600 mb-6">Try adjusting your filters to see more results</p>
                <button
                  onClick={() => setFilters({
                    searchQuery: '',
                    state: 'All States',
                    city: '',
                    establishedYear: 'All Years'
                  })}
                  className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
