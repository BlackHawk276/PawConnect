# PawConnect - Quick Start Guide

## ✅ Setup Complete!

Your database and authentication system is fully configured and working!

## 🎯 What's Working

✅ **Database Tables**: profiles, users, shelters, admins (all with RLS)
✅ **Authentication**: Supabase Auth integrated
✅ **Authorization**: Role-based access control
✅ **API**: Shelter service for database operations
✅ **UI**: All pages updated to use real data

## 🚀 Test the Application

### 1. Start the Development Server

```bash
npm run dev
```

Visit: `http://localhost:5173`

### 2. Create Your First User

1. Click "Sign Up" in the navigation
2. Fill in your details
3. Submit the form
4. You'll be auto-logged in and redirected to `/dashboard`

### 3. Register a Shelter

1. Navigate to `/shelter/register`
2. Complete the 4-step form:
   - Step 1: Basic Info (name, email, password, phone)
   - Step 2: Location (address, city, state, postal code)
   - Step 3: Details (description, website, registration number)
   - Step 4: Review and submit
3. After submission, you'll see your shelter dashboard with "Pending Verification" status

### 4. Create an Admin Account

Since admins need special privileges, create them through Supabase Dashboard:

1. Go to: https://yfrmfzsazdduhykvssha.supabase.co
2. Navigate to: **Authentication → Users**
3. Click: **Add User → Create new user**
4. Enter:
   - Email: `admin@pawconnect.org`
   - Password: `your_secure_password`
   - Confirm email: Yes
5. Copy the User ID
6. Go to: **SQL Editor**
7. Run this SQL:

```sql
-- Replace YOUR_USER_ID with the actual ID from step 5
INSERT INTO profiles (id, email, role)
VALUES ('YOUR_USER_ID', 'admin@pawconnect.org', 'admin');

INSERT INTO admins (id, first_name, last_name)
VALUES ('YOUR_USER_ID', 'Admin', 'User');
```

### 5. Test Admin Approval Flow

1. Login as admin at `/login` (Admin tab)
2. Navigate to `/admin/applications`
3. You'll see the shelter application you created
4. Click "Review"
5. Click "Approve Shelter"
6. Logout and login as the shelter
7. Your shelter can now publish its profile!

### 6. Browse Shelters

1. Navigate to `/shelters`
2. You'll see all approved & published shelters
3. Use filters to search by name, state, city, or year
4. Click any shelter card to view details

## 📊 Database Verification

Run these queries in Supabase SQL Editor to check your data:

```sql
-- View all users
SELECT
  p.role,
  p.email,
  u.first_name,
  u.last_name
FROM profiles p
LEFT JOIN users u ON p.id = u.id
WHERE p.role = 'user';

-- View all shelters
SELECT
  p.email,
  s.name,
  s.city,
  s.state,
  s.verification_status,
  s.is_published
FROM profiles p
JOIN shelters s ON p.id = s.id
WHERE p.role = 'shelter';

-- View all admins
SELECT
  p.email,
  a.first_name,
  a.last_name
FROM profiles p
JOIN admins a ON p.id = a.id
WHERE p.role = 'admin';
```

## 🔐 Security Features

Your application has enterprise-grade security:

✅ **Row Level Security (RLS)**: All tables protected
✅ **Role-Based Access**: Users, shelters, and admins have different permissions
✅ **Secure Auth**: Supabase handles password hashing and session management
✅ **Protected Routes**: Frontend routes check authentication and role
✅ **API Security**: Database queries respect RLS policies

## 🎨 User Flows

### Regular User Flow
1. Signup → Auto-login → Dashboard
2. Browse shelters → View details → Contact shelter
3. Edit profile → Update info → Save

### Shelter Flow
1. Register → Pending status → Wait for approval
2. Admin approves → Login → Publish profile
3. Edit profile → Update description/images → Save
4. Preview profile → See public view

### Admin Flow
1. Manual creation → Login
2. View dashboard → See stats
3. Review applications → Approve/reject
4. Manage shelters → Update status

## 🐛 Troubleshooting

### "No shelters found" on browse page
- Create and approve at least one shelter
- Ensure shelter is published (is_published = true)
- Check that verification_status = 'approved'

### "Invalid credentials" error
- Verify email/password are correct
- Check you're using the right tab (User/Shelter/Admin)
- Ensure profile exists in database

### "Access denied" errors
- Check that user is logged in
- Verify user has correct role for the page
- Review RLS policies in Supabase Dashboard

## 📝 Environment Variables

Your `.env` file is already configured:

```env
VITE_SUPABASE_URL=https://yfrmfzsazdduhykvssha.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🎯 Next Steps

1. ✅ Create test accounts (user, shelter, admin)
2. ✅ Test complete user journey
3. ✅ Verify database operations
4. ✅ Check RLS policies work correctly
5. 🚀 Deploy to production when ready!

## 📚 Additional Resources

- **Full Setup Guide**: See `DATABASE_SETUP.md`
- **Supabase Dashboard**: https://yfrmfzsazdduhykvssha.supabase.co
- **Application URL**: http://localhost:5173

---

**Ready to go!** Start by creating a user account and exploring the platform. 🐾
