// Shelter dashboard overview with verification status
import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { StatsCard } from '../components/StatsCard';
import { StatusBadge } from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { ShelterUser } from '../types/auth';
import { Eye, AlertCircle } from 'lucide-react';

export const ShelterDashboard: React.FC = () => {
  const { user } = useAuth();
  const shelterData = user as ShelterUser;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-600 mt-2">Welcome back, {shelterData?.name}</p>
        </div>

        {shelterData?.verificationStatus === 'pending' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">Verification Pending</h3>
              <p className="text-sm text-yellow-800 mb-3">
                Your shelter application is under review. We'll notify you once it's approved.
                This process typically takes 2-3 business days.
              </p>
              <StatusBadge status="pending" />
            </div>
          </div>
        )}

        {shelterData?.verificationStatus === 'approved' && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-green-900 mb-2">Shelter Approved!</h3>
                <p className="text-sm text-green-800">
                  Your shelter is verified and {shelterData.isPublished ? 'published' : 'ready to publish'}.
                </p>
              </div>
              <StatusBadge status="approved" />
            </div>
          </div>
        )}

        {shelterData?.verificationStatus === 'approved' && (
          <div className="grid md:grid-cols-2 gap-6">
            <StatsCard
              title="Profile Views"
              value={shelterData.isPublished ? "234" : "0"}
              icon={Eye}
              color="blue"
            />
            <StatsCard
              title="Verification Status"
              value="Approved"
              icon={AlertCircle}
              color="green"
            />
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/shelter/dashboard/profile"
              className="block p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <h3 className="font-semibold text-neutral-900">Edit Profile</h3>
              <p className="text-sm text-neutral-600">Update your shelter information and details</p>
            </a>
            <a
              href="/shelter/dashboard/preview"
              className="block p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <h3 className="font-semibold text-neutral-900">Preview Profile</h3>
              <p className="text-sm text-neutral-600">See how your profile appears to users</p>
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
