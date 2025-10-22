// Role selection page - users choose between Volunteer or Shelter registration
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Users, Building2, ArrowRight } from 'lucide-react';

export const RoleSelection: React.FC = () => {
  const navigate = useNavigate();

  const roles = [
    {
      type: 'volunteer',
      title: 'Join as a Volunteer',
      description: 'Connect with animal shelters, support rescue efforts, and make a difference in the lives of animals in need.',
      icon: Users,
      features: [
        'Browse and discover verified animal shelters',
        'Connect with shelters in your area',
        'Stay updated on rescue efforts',
        'Support local animal welfare initiatives'
      ],
      buttonText: 'Sign Up as Volunteer',
      route: '/signup/volunteer',
      gradient: 'from-emerald-50 to-teal-50',
      iconBg: 'bg-emerald-600',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700'
    },
    {
      type: 'shelter',
      title: 'Register Your Shelter',
      description: 'Join our network of verified animal shelters and connect with volunteers who want to support your mission.',
      icon: Building2,
      features: [
        'Create and manage your shelter profile',
        'Reach volunteers in your community',
        'Showcase your rescue work and impact',
        'Build trust through verified status'
      ],
      buttonText: 'Register Shelter',
      route: '/shelter/register',
      gradient: 'from-blue-50 to-cyan-50',
      iconBg: 'bg-blue-600',
      buttonBg: 'bg-blue-600 hover:bg-blue-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <Heart className="w-7 h-7 text-white fill-white" />
            </div>
            <span className="text-3xl font-bold text-neutral-900">PawConnect</span>
          </Link>
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Join Our Community</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Choose how you'd like to contribute to animal welfare and rescue efforts
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {roles.map((role) => (
            <div
              key={role.type}
              className={`bg-gradient-to-br ${role.gradient} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-neutral-200 hover:scale-[1.02]`}
            >
              <div className={`w-16 h-16 ${role.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                <role.icon className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                {role.title}
              </h2>

              <p className="text-neutral-700 mb-6 leading-relaxed">
                {role.description}
              </p>

              <div className="space-y-3 mb-8">
                {role.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-0.5 flex-shrink-0 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-neutral-900"></div>
                    </div>
                    <p className="text-sm text-neutral-700">{feature}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate(role.route)}
                className={`w-full ${role.buttonBg} text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group`}
              >
                {role.buttonText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        <div className="text-center space-y-4">
          <p className="text-neutral-600">
            Already have an account?{' '}
            <Link to="/login" className="text-black font-semibold hover:underline">
              Sign in
            </Link>
          </p>
          <Link to="/" className="inline-block text-neutral-600 hover:text-neutral-900 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
