// Admin review application page
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { StatusBadge } from '../components/StatusBadge';
import { CheckCircle, XCircle, MapPin, Phone, Mail, Globe, Calendar } from 'lucide-react';

export const AdminReview: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const application = {
    id: id || '1',
    name: 'Chennai Animal Care',
    email: 'contact@chennaicare.org',
    phone: '+91 98765 43210',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: '123 Main Street, Chennai',
    postalCode: '600001',
    description: 'Dedicated to rescuing and rehabilitating stray animals in Chennai. We provide medical care, shelter, and adoption services.',
    website: 'https://chennaicare.org',
    registrationNumber: 'TN/2018/123456',
    establishedYear: 2018,
    status: 'pending' as const,
    appliedDate: '2024-10-05'
  };

  const handleApprove = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/admin/applications');
  };

  const handleReject = async () => {
    if (!notes.trim()) {
      alert('Please provide rejection notes');
      return;
    }
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/admin/applications');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Review Application</h1>
          <p className="text-neutral-600 mt-2">Review shelter details and make a decision</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">{application.name}</h2>
                <p className="text-neutral-600">Applied on {application.appliedDate}</p>
              </div>
              <StatusBadge status={application.status} />
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-neutral-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-neutral-600">Email</p>
                    <p className="font-medium">{application.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-neutral-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-neutral-600">Phone</p>
                    <p className="font-medium">{application.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-neutral-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-neutral-600">Location</p>
                    <p className="font-medium">{application.address}</p>
                    <p className="font-medium">{application.city}, {application.state} - {application.postalCode}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {application.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-neutral-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-neutral-600">Website</p>
                      <a href={application.website} target="_blank" rel="noopener noreferrer" className="font-medium text-black hover:underline">
                        {application.website}
                      </a>
                    </div>
                  </div>
                )}
                {application.establishedYear && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-neutral-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-neutral-600">Established</p>
                      <p className="font-medium">{application.establishedYear}</p>
                    </div>
                  </div>
                )}
                {application.registrationNumber && (
                  <div>
                    <p className="text-sm text-neutral-600">Registration Number</p>
                    <p className="font-medium">{application.registrationNumber}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm text-neutral-600 mb-2">Description</p>
              <p className="text-neutral-900 leading-relaxed">{application.description}</p>
            </div>

            <div className="pt-6 border-t border-neutral-200">
              <label className="block text-sm font-semibold text-neutral-900 mb-2">
                Admin Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Add notes about this application..."
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleApprove}
                disabled={isProcessing}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <CheckCircle className="w-5 h-5" />
                Approve Shelter
              </button>
              <button
                onClick={handleReject}
                disabled={isProcessing}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <XCircle className="w-5 h-5" />
                Reject Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
