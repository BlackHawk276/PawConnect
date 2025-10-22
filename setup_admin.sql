-- Admin Account Setup SQL Script
-- This script should be run AFTER creating the auth user in Supabase Dashboard
--
-- Instructions:
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Create a new user with email: pawconnect2025@gmail.com and password: Test1234
-- 3. Copy the UUID of the created user
-- 4. Replace 'REPLACE_WITH_USER_UUID' below with the actual UUID
-- 5. Run this script in the Supabase SQL Editor

-- REPLACE THIS UUID with the actual user UUID from Supabase Auth
DO $$
DECLARE
  admin_user_id uuid := 'REPLACE_WITH_USER_UUID';
BEGIN
  -- Check if UUID was replaced
  IF admin_user_id = 'REPLACE_WITH_USER_UUID' THEN
    RAISE EXCEPTION 'Please replace REPLACE_WITH_USER_UUID with the actual user UUID from Supabase Auth';
  END IF;

  -- Insert profile
  INSERT INTO profiles (id, email, role)
  VALUES (admin_user_id, 'pawconnect2025@gmail.com', 'admin')
  ON CONFLICT (id) DO UPDATE SET role = 'admin';

  -- Insert admin record
  INSERT INTO admins (id, first_name, last_name)
  VALUES (admin_user_id, 'Admin', 'User')
  ON CONFLICT (id) DO NOTHING;

  RAISE NOTICE 'Admin account setup completed successfully!';
  RAISE NOTICE 'Email: pawconnect2025@gmail.com';
  RAISE NOTICE 'You can now log in using the Admin tab on the login page';
END $$;
