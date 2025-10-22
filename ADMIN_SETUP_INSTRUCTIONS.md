# Admin Account Setup Instructions

This document contains instructions for setting up the initial admin account for PawConnect.

## Admin Credentials

- **Email**: pawconnect2025@gmail.com
- **Password**: Test1234

## Setup Steps

Since admin accounts require access to Supabase Auth's admin API, the account must be created through the Supabase dashboard or using the service role key.

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Navigate to Authentication > Users
3. Click "Add User" or "Invite User"
4. Enter the following details:
   - Email: pawconnect2025@gmail.com
   - Password: Test1234
   - Confirm Email: Yes (check this box)
5. Click "Create User"
6. Once the user is created, note the user's UUID
7. Go to the SQL Editor in your Supabase dashboard
8. Run the following SQL script (replace `USER_UUID` with the actual UUID from step 6):

```sql
-- Replace USER_UUID with the actual UUID of the created user
DO $$
DECLARE
  admin_user_id uuid := 'USER_UUID'; -- REPLACE THIS WITH ACTUAL UUID
BEGIN
  -- Insert profile
  INSERT INTO profiles (id, email, role)
  VALUES (admin_user_id, 'pawconnect2025@gmail.com', 'admin')
  ON CONFLICT (id) DO NOTHING;

  -- Insert admin record
  INSERT INTO admins (id, first_name, last_name)
  VALUES (admin_user_id, 'Admin', 'User')
  ON CONFLICT (id) DO NOTHING;

  RAISE NOTICE 'Admin account setup completed successfully!';
END $$;
```

### Option 2: Using Edge Function (Alternative)

If you have access to create Edge Functions, you can deploy the admin creation function:

1. The function is located in `src/scripts/createAdmin.ts`
2. Convert it to an Edge Function
3. Deploy and call it once to create the admin account

## After Setup

**IMPORTANT**: After logging in for the first time, immediately change the password to something secure!

## Verification

To verify the admin account was created successfully:

1. Go to /login in your application
2. Click on the "Admin" tab
3. Enter:
   - Email: pawconnect2025@gmail.com
   - Password: Test1234
4. You should be able to log in and access the admin dashboard

## Security Note

The default password `Test1234` is intentionally simple for initial setup. You MUST change it after your first login to maintain security.
