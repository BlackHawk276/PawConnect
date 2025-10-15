// Authentication context provider with mock user data and auth methods
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, AuthUser, UserRole, SignupData, ShelterRegistrationData } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS = {
  user: {
    id: 'user-1',
    email: 'user@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    state: 'Maharashtra',
    role: 'user' as const
  },
  shelter: {
    id: 'shelter-1',
    email: 'shelter@example.com',
    password: 'password123',
    name: 'Mumbai Street Dogs Care',
    phone: '+91 98765 43211',
    city: 'Mumbai',
    state: 'Maharashtra',
    description: 'Rescuing and rehabilitating street dogs in Mumbai since 2015.',
    verificationStatus: 'approved' as const,
    isPublished: true,
    role: 'shelter' as const,
    themeColor: '#4F46E5',
    establishedYear: 2015
  },
  admin: {
    id: 'admin-1',
    email: 'admin@pawconnect.org',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin' as const
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('pawconnect_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUser = MOCK_USERS[role];

    if (mockUser.email === email && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword as AuthUser);
      localStorage.setItem('pawconnect_user', JSON.stringify(userWithoutPassword));
    } else {
      throw new Error('Invalid credentials');
    }

    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pawconnect_user');
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      city: data.city,
      state: data.state,
      role: 'user'
    };

    setUser(newUser);
    localStorage.setItem('pawconnect_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const registerShelter = async (data: ShelterRegistrationData) => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const newShelter: AuthUser = {
      id: `shelter-${Date.now()}`,
      email: data.email,
      name: data.name,
      phone: data.phone,
      city: data.city,
      state: data.state,
      description: data.description,
      verificationStatus: 'pending',
      isPublished: false,
      role: 'shelter',
      website: data.website,
      registrationNumber: data.registrationNumber,
      establishedYear: data.establishedYear
    };

    setUser(newShelter);
    localStorage.setItem('pawconnect_user', JSON.stringify(newShelter));
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        registerShelter,
        isAuthenticated: !!user,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
