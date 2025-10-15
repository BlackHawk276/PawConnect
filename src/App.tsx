// Main application component with router configuration and authentication
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { Browse } from './pages/Browse';
import { ShelterDetailPage } from './pages/ShelterDetailPage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ShelterRegister } from './pages/ShelterRegister';

import { UserDashboard } from './pages/UserDashboard';

import { ShelterDashboard } from './pages/ShelterDashboard';
import { ShelterProfile } from './pages/ShelterProfile';
import { ShelterPreview } from './pages/ShelterPreview';

import { AdminDashboard } from './pages/AdminDashboard';
import { AdminApplications } from './pages/AdminApplications';
import { AdminReview } from './pages/AdminReview';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shelters" element={<Browse />} />
          <Route path="/shelter/:id" element={<ShelterDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shelter/register" element={<ShelterRegister />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/shelter/dashboard"
            element={
              <ProtectedRoute allowedRoles={['shelter']}>
                <ShelterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shelter/dashboard/profile"
            element={
              <ProtectedRoute allowedRoles={['shelter']}>
                <ShelterProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shelter/dashboard/preview"
            element={
              <ProtectedRoute allowedRoles={['shelter']}>
                <ShelterPreview />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/review/:id"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/shelters"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminApplications />
              </ProtectedRoute>
            }
          />

          <Route path="/about" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">About Page - Coming Soon</h1></div>} />
          <Route path="/contact" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">Contact Page - Coming Soon</h1></div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
