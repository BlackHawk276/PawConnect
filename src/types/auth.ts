// Authentication type definitions for user roles and auth state
export type UserRole = 'user' | 'shelter' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
  state?: string;
  role: 'user';
}

export interface ShelterUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  description?: string;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  isPublished: boolean;
  role: 'shelter';
  themeColor?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  website?: string;
  registrationNumber?: string;
  establishedYear?: number;
}

export interface Admin {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin';
}

export type AuthUser = User | ShelterUser | Admin;

export interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  signup: (data: SignupData) => Promise<void>;
  registerShelter: (data: ShelterRegistrationData) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
  state?: string;
}

export interface ShelterRegistrationData {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  description: string;
  website?: string;
  registrationNumber?: string;
  establishedYear?: number;
}
