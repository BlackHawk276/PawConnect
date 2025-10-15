// Admin applications list page
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { StatusBadge } from '../components/StatusBadge';
import { Search } from 'lucide-react';

export const AdminApplications: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const applications = [
    { id: '1', name: 'Chennai Animal Care', city: 'Chennai', state: 'Tamil Nadu', status: 'pending' as const, date: '2024-10-05' },
    { id: '2', name: 'Kolkata Pet Rescue', city: 'Kolkata', state: 'West Bengal', status: 'pending' as const, date: '2024-10-04' },
    { id: '3', name: 'Delhi Stray Shelter', city: 'Delhi', state: 'Delhi', status: 'pending' as const, date: '2024-10-03' },
    { id: '4', name: 'Mumbai Dogs', city: 'Mumbai', state: 'Maharashtra', status: 'approved' as const, date: '2024-10-02' },
    { id: '5', name: 'Bangalore Pet Home', city: 'Bangalore', state: 'Karnataka', status: 'approved' as const, date: '2024-10-01' },
  ];

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Applications</h1>
          <p className="text-neutral-600 mt-2">Review and manage shelter applications</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search shelters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-900">Shelter Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-900">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-900">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-900">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((app) => (
                  <tr key={app.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-4 px-4 font-medium">{app.name}</td>
                    <td className="py-4 px-4 text-neutral-600">{app.city}, {app.state}</td>
                    <td className="py-4 px-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="py-4 px-4 text-neutral-600">{app.date}</td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        to={`/admin/review/${app.id}`}
                        className="inline-block px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApps.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-600">No applications found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
