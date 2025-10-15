// Dashboard layout with sidebar navigation and top bar
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, User, LogOut, LayoutDashboard, FileText, Eye, Users, ClipboardList } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardHome = () => {
    if (user?.role === 'user') return '/dashboard';
    if (user?.role === 'shelter') return '/shelter/dashboard';
    if (user?.role === 'admin') return '/admin';
    return '/';
  };

  const getNavigation = () => {
    if (user?.role === 'user') {
      return [
        { name: 'Profile', href: '/dashboard', icon: User }
      ];
    }

    if (user?.role === 'shelter') {
      return [
        { name: 'Overview', href: '/shelter/dashboard', icon: LayoutDashboard },
        { name: 'Edit Profile', href: '/shelter/dashboard/profile', icon: FileText },
        { name: 'Preview', href: '/shelter/dashboard/preview', icon: Eye }
      ];
    }

    if (user?.role === 'admin') {
      return [
        { name: 'Overview', href: '/admin', icon: LayoutDashboard },
        { name: 'Applications', href: '/admin/applications', icon: ClipboardList },
        { name: 'Shelters', href: '/admin/shelters', icon: Users }
      ];
    }

    return [];
  };

  const navigation = getNavigation();

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to={getDashboardHome()} className="flex items-center gap-2 text-xl font-bold text-neutral-900">
              <Home className="w-6 h-6" />
              PawConnect
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-600">
                {user?.role === 'user' && `${(user as any).firstName} ${(user as any).lastName}`}
                {user?.role === 'shelter' && (user as any).name}
                {user?.role === 'admin' && `${(user as any).firstName} ${(user as any).lastName}`}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-lg p-4 sticky top-24">
              <ul className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;

                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-black text-white'
                            : 'text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
