/*
  # Initial Database Schema for Animal Shelter Platform

  ## Overview
  This migration creates the complete database schema for a platform connecting users, animal shelters, and administrators.

  ## New Tables

  ### 1. `profiles`
  Extends Supabase auth.users with additional profile information for all user types
  - `id` (uuid, primary key, references auth.users)
  - `email` (text, unique, not null)
  - `role` (text, not null) - Values: 'user', 'shelter', 'admin'
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

  ### 2. `users`
  Stores information specific to regular users
  - `id` (uuid, primary key, references profiles)
  - `first_name` (text, not null)
  - `last_name` (text, not null)
  - `phone` (text)
  - `city` (text)
  - `state` (text)
  - `created_at` (timestamptz, default now())

  ### 3. `shelters`
  Stores information specific to animal shelters
  - `id` (uuid, primary key, references profiles)
  - `name` (text, not null)
  - `phone` (text, not null)
  - `address` (text)
  - `city` (text, not null)
  - `state` (text, not null)
  - `postal_code` (text)
  - `description` (text)
  - `website` (text)
  - `registration_number` (text)
  - `established_year` (integer)
  - `verification_status` (text, default 'pending') - Values: 'pending', 'approved', 'rejected'
  - `is_published` (boolean, default false)
  - `theme_color` (text)
  - `logo_url` (text)
  - `cover_image_url` (text)
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

  ### 4. `admins`
  Stores information specific to administrators
  - `id` (uuid, primary key, references profiles)
  - `first_name` (text, not null)
  - `last_name` (text, not null)
  - `created_at` (timestamptz, default now())

  ## Security (Row Level Security)

  ### profiles table
  1. Enable RLS
  2. Users can read their own profile
  3. Users can update their own profile
  4. Admins can read all profiles

  ### users table
  1. Enable RLS
  2. Users can read their own data
  3. Users can update their own data

  ### shelters table
  1. Enable RLS
  2. Shelter owners can read and update their own data
  3. All authenticated users can read approved and published shelters
  4. Admins can read all shelters

  ### admins table
  1. Enable RLS
  2. Admins can read all admin data
  3. Only admins can manage admin data

  ## Notes
  - All tables use UUID for primary keys
  - Timestamps are automatically managed
  - RLS policies ensure data security
  - Foreign key constraints maintain referential integrity
*/

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'shelter', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  city text,
  state text,
  created_at timestamptz DEFAULT now()
);

-- Create shelters table
CREATE TABLE IF NOT EXISTS shelters (
  id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  phone text NOT NULL,
  address text,
  city text NOT NULL,
  state text NOT NULL,
  postal_code text,
  description text,
  website text,
  registration_number text,
  established_year integer,
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  is_published boolean DEFAULT false,
  theme_color text,
  logo_url text,
  cover_image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_shelters_verification_status ON shelters(verification_status);
CREATE INDEX IF NOT EXISTS idx_shelters_city_state ON shelters(city, state);
CREATE INDEX IF NOT EXISTS idx_shelters_is_published ON shelters(is_published);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE shelters ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for users table
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for shelters table
CREATE POLICY "Shelter owners can read own data"
  ON shelters FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Authenticated users can read approved published shelters"
  ON shelters FOR SELECT
  TO authenticated
  USING (verification_status = 'approved' AND is_published = true);

CREATE POLICY "Public can read approved published shelters"
  ON shelters FOR SELECT
  TO anon
  USING (verification_status = 'approved' AND is_published = true);

CREATE POLICY "Shelter owners can update own data"
  ON shelters FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Shelter owners can insert own data"
  ON shelters FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can read all shelters"
  ON shelters FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all shelters"
  ON shelters FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for admins table
CREATE POLICY "Admins can read all admin data"
  ON admins FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert admin data"
  ON admins FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shelters_updated_at
  BEFORE UPDATE ON shelters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
