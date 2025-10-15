// Section displaying featured shelters in a responsive grid layout
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShelterCard } from './ShelterCard';
import { shelterService, ShelterData } from '../services/shelterService';

export const FeaturedShelters: React.FC = () => {
  const [featuredShelters, setFeaturedShelters] = useState<ShelterData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadShelters = async () => {
      try {
        const data = await shelterService.getAllPublishedShelters();
        setFeaturedShelters(data.slice(0, 3));
      } catch (error) {
        console.error('Error loading shelters:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadShelters();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Featured Shelters
          </h2>
          <p className="text-xl text-neutral-600">
            Verified organizations making a difference
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900"></div>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {featuredShelters.map(shelter => (
              <motion.div key={shelter.id} variants={item}>
                <ShelterCard shelter={shelter} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
