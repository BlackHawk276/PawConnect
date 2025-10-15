// Footer component with links, contact information, and branding
import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-neutral-900 fill-neutral-900" />
              </div>
              <span className="text-xl font-bold">PawConnect</span>
            </div>
            <p className="text-neutral-400 text-sm">
              Connecting compassion with care across India.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shelters" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Find Shelters
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Shelters</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shelter/register" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Register Your Shelter
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Shelter Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-neutral-400 text-sm">
                <Mail className="w-4 h-4" />
                hello@pawconnect.org
              </li>
              <li className="flex items-center gap-2 text-neutral-400 text-sm">
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2 text-neutral-400 text-sm">
                <MapPin className="w-4 h-4" />
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 text-center">
          <p className="text-neutral-400 text-sm">
            &copy; 2024 PawConnect. All rights reserved. Made with &hearts; for animals.
          </p>
        </div>
      </div>
    </footer>
  );
};
