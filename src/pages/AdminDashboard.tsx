// Admin dashboard overview with statistics
import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { StatsCard } from '../components/StatsCard';
import { Users, ClipboardList, CheckCircle, Clock } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const recentApplications = [
    { id: '1', name: 'Chennai Animal Care', city: 'Chennai', date: '2024-10-05' },
    { id: '2', name: 'Kolkata Pet Rescue', city: 'Kolkata', date: '2024-10-04' },
    { id: '3', name: 'Delhi Stray Shelter', city: 'Delhi', date: '2024-10-03' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
          <p className="text-neutral-600 mt-2">Manage shelters and applications</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Shelters"
            value="42"
            icon={Users}
            color="blue"
          />
          <StatsCard
            title="Pending Applications"
            value="8"
            icon={Clock}
            color="yellow"
          />
          <StatsCard
            title="Approved Today"
            value="3"
            icon={CheckCircle}
            color="green"
          />
          <StatsCard
            title="Total Applications"
            value="156"
            icon={ClipboardList}
            color="blue"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900">Recent Applications</h2>
            <Link
              to="/admin/applications"
              className="text-sm font-semibold text-black hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-900">Shelter Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-900">City</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-900">Applied Date</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
                  <tr key={app.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-4 font-medium">{app.name}</td>
                    <td className="py-3 px-4 text-neutral-600">{app.city}</td>
                    <td className="py-3 px-4 text-neutral-600">{app.date}</td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/admin/review/${app.id}`}
                        className="text-sm font-semibold text-black hover:underline"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
