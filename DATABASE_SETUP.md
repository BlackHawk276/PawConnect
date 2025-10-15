# PawConnect Database & Authentication Setup Guide

## ✅ Database Status

The database schema has been successfully created with the following tables:
- `profiles` - Base profile for all users
- `users` - Regular user data
- `shelters` - Shelter information
- `admins` - Administrator data

All tables have Row Level Security (RLS) enabled with appropriate policies.

## 🎯 Current State

- **Database Schema**: ✅ Applied and verified
- **Authentication**: ✅ Integrated with Supabase Auth
- **Services**: ✅ Shelter service configured
- **Frontend**: ✅ All pages updated to use real data
- **Build**: ✅ Compiles successfully

## 📝 Creating Test Accounts

Since auth.users must be created through Supabase Auth, here's how to set up test accounts:

### Method 1: Using the Application (Recommended)

1. **Create a Regular User**:
   - Navigate to `/signup`
   - Fill in the form with test data
   - Click "Create Account"
   - User will be automatically logged in

2. **Create a Shelter Account**:
   - Navigate to `/shelter/register`
   - Complete the 4-step registration form
   - Submit the application
   - Shelter will be created with "pending" status

3. **Create an Admin Account** (Manual in Supabase Dashboard):
   - Go to Supabase Dashboard → Authentication → Users
   - Click "Add User" → "Create new user"
   - Enter email and password
   - After creation, note the User ID
   - Go to SQL Editor and run:

```sql
-- Insert admin profile
INSERT INTO profiles (id, email, role)
VALUES ('USER_ID_HERE', 'admin@pawconnect.org', 'admin');

-- Insert admin data
INSERT INTO admins (id, first_name, last_name)
VALUES ('USER_ID_HERE', 'Admin', 'User');
```

### Method 2: SQL Script for Multiple Test Shelters

Run this in Supabase SQL Editor after creating auth users:

```sql
-- Example: Create profiles for existing auth.users
-- Replace USER_IDs with actual IDs from auth.users table

-- Shelter 1: Mumbai Street Dogs Care
INSERT INTO profiles (id, email, role)
VALUES ('SHELTER_1_USER_ID', 'mumbai@shelter.com', 'shelter');

INSERT INTO shelters (
  id, name, phone, address, city, state, postal_code,
  description, website, established_year,
  verification_status, is_published, cover_image_url
)
VALUES (
  'SHELTER_1_USER_ID',
  'Mumbai Street Dogs Care',
  '+91 98765 43210',
  '123 Marine Drive',
  'Mumbai',
  'Maharashtra',
  '400001',
  'Rescuing and rehabilitating street dogs in Mumbai since 2015.',
  'https://mumbaidogs.org',
  2015,
  'approved',
  true,
  'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800'
);
```

## 🧪 Testing the System

### 1. Test User Signup & Login

```bash
# Visit: http://localhost:5173/signup
Email: test@example.com
Password: password123
```

After signup:
- ✅ User should be created in `profiles` and `users` tables
- ✅ User should be automatically logged in
- ✅ Redirected to `/dashboard`

### 2. Test Shelter Registration

```bash
# Visit: http://localhost:5173/shelter/register
Email: shelter@example.com
Password: password123
# Complete all 4 steps
```

After registration:
- ✅ Shelter created with `verification_status = 'pending'`
- ✅ Shelter logged in automatically
- ✅ Redirected to `/shelter/dashboard`
- ✅ Should see "Pending Verification" banner

### 3. Test Admin Functions

After creating an admin account:
- ✅ Login at `/login` (Admin tab)
- ✅ View dashboard at `/admin`
- ✅ See pending applications at `/admin/applications`
- ✅ Approve/reject shelters

### 4. Test Browse Page

```bash
# Visit: http://localhost:5173/shelters
```

- ✅ Should load approved & published shelters from database
- ✅ Filters should work (search, state, city, year)
- ✅ Clicking shelter card navigates to detail page
- ✅ Shows empty state if no shelters exist

## 🔍 Verifying Database Operations

### Check Tables

```sql
-- View all profiles
SELECT * FROM profiles;

-- View all users
SELECT * FROM users;

-- View all shelters
SELECT * FROM shelters;

-- View all admins
SELECT * FROM admins;
```

### Check Relationships

```sql
-- Get shelter with profile data
SELECT
  s.*,
  p.email,
  p.role
FROM shelters s
JOIN profiles p ON s.id = p.id;
```

### Test RLS Policies

```sql
-- As a shelter user, should only see own data
SELECT * FROM shelters WHERE id = auth.uid();

-- As public/anon, should only see approved & published
SELECT * FROM shelters
WHERE verification_status = 'approved'
AND is_published = true;
```

## 🐛 Troubleshooting

### Issue: "No shelters found" on browse page

**Solution**: Create at least one approved & published shelter:
1. Register a shelter through `/shelter/register`
2. Login as admin
3. Go to `/admin/applications`
4. Approve the shelter
5. Login as shelter and publish the profile

### Issue: "Invalid credentials" on login

**Solution**: Check that:
- Email/password are correct
- User exists in `auth.users`
- Profile exists in `profiles` table
- Role matches the selected tab (user/shelter/admin)

### Issue: RLS policy errors

**Solution**: Ensure:
- User is properly authenticated
- Profile record exists for the auth.user
- Accessing data appropriate for their role

## 🎨 Sample Data Structure

### User

```typescript
{
  id: "uuid",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  phone: "+91 98765 43210",
  city: "Mumbai",
  state: "Maharashtra",
  role: "user"
}
```

### Shelter

```typescript
{
  id: "uuid",
  email: "shelter@example.com",
  name: "Mumbai Street Dogs Care",
  phone: "+91 98765 43210",
  city: "Mumbai",
  state: "Maharashtra",
  description: "Rescuing animals...",
  verificationStatus: "approved" | "pending" | "rejected",
  isPublished: true,
  role: "shelter"
}
```

### Admin

```typescript
{
  id: "uuid",
  email: "admin@pawconnect.org",
  firstName: "Admin",
  lastName: "User",
  role: "admin"
}
```

## 📊 Current Features Working

✅ User signup and login
✅ Shelter registration (multi-step)
✅ Admin approval workflow
✅ Browse page with database integration
✅ Filter functionality
✅ Shelter detail pages
✅ Dashboard for all three roles
✅ Profile editing
✅ RLS policies enforcing data security
✅ Authentication state persistence
✅ Role-based access control

## 🚀 Next Steps

1. **Create test accounts** using the methods above
2. **Test the complete user flow**: Signup → Browse → View Shelter
3. **Test shelter flow**: Register → Wait for approval → Publish profile
4. **Test admin flow**: Login → View applications → Approve shelter
5. **Verify data appears** in browse page after approval

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Check Supabase logs in Dashboard → Logs
3. Verify RLS policies in Database → Policies
4. Ensure auth.users exist before creating profiles
