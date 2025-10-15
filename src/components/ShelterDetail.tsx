// Detailed shelter profile component with cover image and contact information
import React from 'react';
import { MapPin, Phone, Mail, Globe, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ShelterData } from '../services/shelterService';
import { Button } from './Button';

interface ShelterDetailProps {
  shelter: ShelterData;
}

export const ShelterDetail: React.FC<ShelterDetailProps> = ({ shelter }) => {
  const handleContact = (type: 'email' | 'phone' | 'website') => {
    switch (type) {
      case 'email':
        window.location.href = `mailto:${shelter.email}`;
        break;
      case 'phone':
        window.location.href = `tel:${shelter.phone}`;
        break;
      case 'website':
        if (shelter.website) {
          window.open(shelter.website, '_blank');
        }
        break;
    }
  };

  return (
    <div>
      <div className="relative h-80 md:h-96 bg-neutral-200">
        <img
          src={shelter.image}
          alt={shelter.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute -bottom-16 left-8 md:left-12">
          <div className="w-32 h-32 rounded-2xl bg-white shadow-2xl overflow-hidden border-4 border-white">
            <img
              src={shelter.image}
              alt={`${shelter.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 font-serif">
              {shelter.name}
            </h1>
            {shelter.verified && (
              <div className="flex items-center gap-2 bg-success-500 text-white px-6 py-3 rounded-full shadow-lg w-fit">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Verified</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-neutral-600 text-lg mb-6">
            <MapPin className="w-5 h-5" />
            <span>{shelter.city}, {shelter.state}</span>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => handleContact('email')}
            icon={Mail}
          >
            Contact to Donate
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 space-y-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">About</h2>
              <p className="text-neutral-700 leading-relaxed text-lg">
                {shelter.description}
              </p>
            </div>

            {shelter.establishedYear && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">History</h2>
                <div className="flex items-center gap-3 text-neutral-700">
                  <Calendar className="w-5 h-5 text-neutral-500" />
                  <span className="text-lg">Established in {shelter.establishedYear}</span>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Contact Information</h3>

              <div className="space-y-4">
                <button
                  onClick={() => handleContact('email')}
                  className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-neutral-50 transition-colors text-left group"
                >
                  <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                    <Mail className="w-5 h-5 text-neutral-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-500 mb-1">Email</p>
                    <p className="text-neutral-900 font-medium truncate">{shelter.email}</p>
                  </div>
                </button>

                <button
                  onClick={() => handleContact('phone')}
                  className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-neutral-50 transition-colors text-left group"
                >
                  <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                    <Phone className="w-5 h-5 text-neutral-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-500 mb-1">Phone</p>
                    <p className="text-neutral-900 font-medium">{shelter.phone}</p>
                  </div>
                </button>

                {shelter.website && (
                  <button
                    onClick={() => handleContact('website')}
                    className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-neutral-50 transition-colors text-left group"
                  >
                    <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                      <Globe className="w-5 h-5 text-neutral-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-neutral-500 mb-1">Website</p>
                      <p className="text-neutral-900 font-medium truncate">{shelter.website}</p>
                    </div>
                  </button>
                )}

                <div className="flex items-start gap-3 p-4 rounded-lg bg-neutral-50">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-neutral-700" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-neutral-500 mb-1">Location</p>
                    <p className="text-neutral-900 font-medium">{shelter.city}, {shelter.state}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
