// Database type definitions generated from Supabase schema
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: 'user' | 'shelter' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role: 'user' | 'shelter' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'user' | 'shelter' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          first_name: string
          last_name: string
          phone: string | null
          city: string | null
          state: string | null
          created_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          phone?: string | null
          city?: string | null
          state?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          phone?: string | null
          city?: string | null
          state?: string | null
          created_at?: string
        }
      }
      shelters: {
        Row: {
          id: string
          name: string
          phone: string
          address: string | null
          city: string
          state: string
          postal_code: string | null
          description: string | null
          website: string | null
          registration_number: string | null
          established_year: number | null
          verification_status: 'pending' | 'approved' | 'rejected'
          is_published: boolean
          theme_color: string | null
          logo_url: string | null
          cover_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          phone: string
          address?: string | null
          city: string
          state: string
          postal_code?: string | null
          description?: string | null
          website?: string | null
          registration_number?: string | null
          established_year?: number | null
          verification_status?: 'pending' | 'approved' | 'rejected'
          is_published?: boolean
          theme_color?: string | null
          logo_url?: string | null
          cover_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          address?: string | null
          city?: string
          state?: string
          postal_code?: string | null
          description?: string | null
          website?: string | null
          registration_number?: string | null
          established_year?: number | null
          verification_status?: 'pending' | 'approved' | 'rejected'
          is_published?: boolean
          theme_color?: string | null
          logo_url?: string | null
          cover_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      admins: {
        Row: {
          id: string
          first_name: string
          last_name: string
          created_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          created_at?: string
        }
      }
    }
  }
}
