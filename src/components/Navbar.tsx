// Sticky navigation bar with logo and navigation links
import React from 'react';
import { Heart, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'user') return '/dashboard';
    if (user.role === 'shelter') return '/shelter/dashboard';
    if (user.role === 'admin') return '/admin';
    return '/login';
  };

  return (
    <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-black rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-2xl font-bold text-neutral-900">PawConnect</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/shelters"
              className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors"
            >
              Find Shelters
            </Link>
            <Link
              to="/about"
              className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link
                to={getDashboardLink()}
                className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-neutral-800 transition-colors shadow-md hover:shadow-lg"
              >
                <User className="w-4 h-4" />
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors hidden sm:block"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-neutral-800 transition-colors shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
