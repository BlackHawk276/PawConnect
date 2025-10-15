// Authentication context provider using Supabase auth with role-based access
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, AuthUser, UserRole, SignupData, ShelterRegistrationData, User, ShelterUser, Admin } from '../types/auth';
import { supabase } from '../lib/supabase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      (async () => {
        if (session?.user) {
          await loadUserProfile(session.user.id);
        }
        setIsLoading(false);
      })();
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        if (session?.user) {
          await loadUserProfile(session.user.id);
        } else {
          setUser(null);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profile) return;

      if (profile.role === 'user') {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        if (userError) throw userError;
        if (userData) {
          const authUser: User = {
            id: profile.id,
            email: profile.email,
            firstName: userData.first_name,
            lastName: userData.last_name,
            phone: userData.phone || undefined,
            city: userData.city || undefined,
            state: userData.state || undefined,
            role: 'user'
          };
          setUser(authUser);
        }
      } else if (profile.role === 'shelter') {
        const { data: shelterData, error: shelterError } = await supabase
          .from('shelters')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        if (shelterError) throw shelterError;
        if (shelterData) {
          const authUser: ShelterUser = {
            id: profile.id,
            email: profile.email,
            name: shelterData.name,
            phone: shelterData.phone,
            city: shelterData.city,
            state: shelterData.state,
            description: shelterData.description || undefined,
            verificationStatus: shelterData.verification_status,
            isPublished: shelterData.is_published,
            role: 'shelter',
            themeColor: shelterData.theme_color || undefined,
            logoUrl: shelterData.logo_url || undefined,
            coverImageUrl: shelterData.cover_image_url || undefined,
            website: shelterData.website || undefined,
            registrationNumber: shelterData.registration_number || undefined,
            establishedYear: shelterData.established_year || undefined
          };
          setUser(authUser);
        }
      } else if (profile.role === 'admin') {
        const { data: adminData, error: adminError } = await supabase
          .from('admins')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        if (adminError) throw adminError;
        if (adminData) {
          const authUser: Admin = {
            id: profile.id,
            email: profile.email,
            firstName: adminData.first_name,
            lastName: adminData.last_name,
            role: 'admin'
          };
          setUser(authUser);
        }
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      if (!data.user) throw new Error('No user returned');

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .maybeSingle();

      if (profile?.role !== role) {
        await supabase.auth.signOut();
        throw new Error('Invalid credentials for this user type');
      }

      await loadUserProfile(data.user.id);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user returned');

      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: data.email,
          role: 'user'
        });

      if (profileError) throw profileError;

      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone || null,
          city: data.city || null,
          state: data.state || null
        });

      if (userError) throw userError;

      await loadUserProfile(authData.user.id);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerShelter = async (data: ShelterRegistrationData) => {
    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user returned');

      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: data.email,
          role: 'shelter'
        });

      if (profileError) throw profileError;

      const { error: shelterError } = await supabase
        .from('shelters')
        .insert({
          id: authData.user.id,
          name: data.name,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          postal_code: data.postalCode,
          description: data.description,
          website: data.website || null,
          registration_number: data.registrationNumber || null,
          established_year: data.establishedYear || null,
          verification_status: 'pending',
          is_published: false
        });

      if (shelterError) throw shelterError;

      await loadUserProfile(authData.user.id);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
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
