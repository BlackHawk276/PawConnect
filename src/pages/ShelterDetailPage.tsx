// Individual shelter detail page with back navigation
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ShelterDetail } from '../components/ShelterDetail';
import { mockShelters } from '../data/mockShelters';

export const ShelterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const shelter = mockShelters.find(s => s.id === id);

  if (!shelter) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Shelter Not Found</h1>
          <p className="text-neutral-600 mb-8">The shelter you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/shelters')}
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
          >
            Back to Shelters
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/shelters')}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Shelters
          </button>
        </div>
      </div>

      <ShelterDetail shelter={shelter} />

      <Footer />
    </div>
  );
};
