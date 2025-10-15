// Individual shelter detail page with back navigation
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ShelterDetail } from '../components/ShelterDetail';
import { shelterService, ShelterData } from '../services/shelterService';

export const ShelterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shelter, setShelter] = useState<ShelterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadShelter = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await shelterService.getShelterById(id);
        setShelter(data);
      } catch (error) {
        console.error('Error loading shelter:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadShelter();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900"></div>
        </div>
        <Footer />
      </div>
    );
  }

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
