// Shelter preview page showing public profile appearance
import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { ShelterDetail } from '../components/ShelterDetail';
import { useAuth } from '../context/AuthContext';
import { ShelterUser } from '../types/auth';
import { Shelter } from '../types/shelter';

export const ShelterPreview: React.FC = () => {
  const { user } = useAuth();
  const shelterData = user as ShelterUser;

  const previewShelter: Shelter = {
    id: shelterData?.id || '0',
    name: shelterData?.name || '',
    city: shelterData?.city || '',
    state: shelterData?.state || '',
    description: shelterData?.description || 'No description provided',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop',
    verified: shelterData?.verificationStatus === 'approved',
    email: shelterData?.email || '',
    phone: shelterData?.phone || '',
    website: shelterData?.website,
    establishedYear: shelterData?.establishedYear
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-50 border-b border-blue-200 p-4">
          <p className="text-sm text-blue-900 font-medium">Preview Mode - This is how your profile appears to users</p>
        </div>
        <ShelterDetail shelter={previewShelter} />
      </div>
    </DashboardLayout>
  );
};
