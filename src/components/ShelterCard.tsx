// Individual shelter card component with image, details, and hover effects
import React from 'react';
import { MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shelter } from '../data/mockShelters';

interface ShelterCardProps {
  shelter: Shelter;
  showVerifiedBadge?: boolean;
  grayscale?: boolean;
}

export const ShelterCard: React.FC<ShelterCardProps> = ({
  shelter,
  showVerifiedBadge = false,
  grayscale = false
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shelter/${shelter.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={shelter.image}
          alt={shelter.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            grayscale ? 'grayscale' : ''
          }`}
        />

        {showVerifiedBadge && shelter.verified && (
          <div className="absolute top-4 right-4 bg-success-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-semibold text-sm">
            <CheckCircle className="w-4 h-4" />
            Verified
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-neutral-500 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">{shelter.city}, {shelter.state}</span>
        </div>

        <h3 className="text-2xl font-bold text-neutral-900 mb-3 font-serif leading-tight">
          {shelter.name}
        </h3>

        <p className="text-neutral-600 mb-6 leading-relaxed line-clamp-3">
          {shelter.description}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="w-full bg-black text-white py-3.5 rounded-lg font-semibold hover:bg-neutral-800 transition-colors shadow-md hover:shadow-lg"
        >
          Support This Shelter
        </button>
      </div>
    </motion.div>
  );
};
