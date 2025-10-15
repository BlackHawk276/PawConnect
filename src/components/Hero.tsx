// Hero section with background image, search bar, and call-to-action buttons
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './Button';

export const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/shelters?location=${searchQuery}`);
  };

  return (
    <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1920&h=1080&fit=crop&q=80"
          alt="Person with dog"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Every Paw Deserves<br />A Helping Hand
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-3 font-light">
          Connect with verified animal shelters across India and make a direct impact.
        </p>
        <p className="text-lg md:text-xl text-white/80 mb-12">
          100% of your donation goes to the animals that need it most.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="bg-white rounded-full shadow-2xl p-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-neutral-400 ml-4" />
            <input
              type="text"
              placeholder="Search shelters by location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-4 py-3 md:py-3.5 outline-none text-base md:text-lg"
            />
            <button
              onClick={handleSearch}
              className="bg-black text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/shelters')}
          >
            Browse Shelters
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/about')}
          >
            Learn More
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};
