// Service layer for shelter-related database operations
import { supabase } from '../lib/supabase';

export interface ShelterData {
  id: string;
  name: string;
  city: string;
  state: string;
  description: string | null;
  image: string | null;
  verified: boolean;
  email: string;
  phone: string;
  website?: string | null;
  establishedYear?: number | null;
}

export const shelterService = {
  async getAllPublishedShelters(): Promise<ShelterData[]> {
    const { data: shelters, error } = await supabase
      .from('shelters')
      .select(`
        id,
        name,
        city,
        state,
        description,
        cover_image_url,
        phone,
        website,
        established_year,
        verification_status,
        is_published
      `)
      .eq('verification_status', 'approved')
      .eq('is_published', true);

    if (error) throw error;

    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, email')
      .in('id', shelters?.map(s => s.id) || []);

    const emailMap = new Map(profiles?.map(p => [p.id, p.email]) || []);

    return (shelters || []).map(shelter => ({
      id: shelter.id,
      name: shelter.name,
      city: shelter.city,
      state: shelter.state,
      description: shelter.description,
      image: shelter.cover_image_url,
      verified: shelter.verification_status === 'approved',
      email: emailMap.get(shelter.id) || '',
      phone: shelter.phone,
      website: shelter.website,
      establishedYear: shelter.established_year
    }));
  },

  async getShelterById(id: string): Promise<ShelterData | null> {
    const { data: shelter, error } = await supabase
      .from('shelters')
      .select(`
        id,
        name,
        city,
        state,
        description,
        cover_image_url,
        phone,
        website,
        established_year,
        verification_status,
        is_published
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!shelter) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', shelter.id)
      .maybeSingle();

    return {
      id: shelter.id,
      name: shelter.name,
      city: shelter.city,
      state: shelter.state,
      description: shelter.description,
      image: shelter.cover_image_url,
      verified: shelter.verification_status === 'approved',
      email: profile?.email || '',
      phone: shelter.phone,
      website: shelter.website,
      establishedYear: shelter.established_year
    };
  },

  async getPendingShelters() {
    const { data: shelters, error } = await supabase
      .from('shelters')
      .select(`
        id,
        name,
        city,
        state,
        description,
        phone,
        verification_status,
        created_at
      `)
      .eq('verification_status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, email')
      .in('id', shelters?.map(s => s.id) || []);

    const emailMap = new Map(profiles?.map(p => [p.id, p.email]) || []);

    return (shelters || []).map(shelter => ({
      ...shelter,
      email: emailMap.get(shelter.id) || ''
    }));
  },

  async updateVerificationStatus(shelterId: string, status: 'approved' | 'rejected') {
    const { error } = await supabase
      .from('shelters')
      .update({ verification_status: status })
      .eq('id', shelterId);

    if (error) throw error;
  },

  async updateShelter(shelterId: string, updates: Partial<{
    name: string;
    phone: string;
    city: string;
    state: string;
    description: string;
    website: string;
    is_published: boolean;
  }>) {
    const { error } = await supabase
      .from('shelters')
      .update(updates)
      .eq('id', shelterId);

    if (error) throw error;
  }
};
