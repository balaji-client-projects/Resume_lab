# 🔐 Authentication Setup Guide (Clerk)

This guide will help you set up authentication for JobFit Pro using Clerk.

---

## 📝 Step 1: Create a Clerk Account

1. Go to [https://dashboard.clerk.com/sign-up](https://dashboard.clerk.com/sign-up)
2. Sign up for a free account (no credit card required)
3. You'll be redirected to the Clerk Dashboard

---

## 🔑 Step 2: Create a New Application

1. Click **"Create Application"** button
2. Enter application name: **"JobFit Pro"**
3. Choose sign-in options (recommended):
   - ✅ **Email address**
   - ✅ **Google** (optional but recommended)
   - ✅ **GitHub** (optional)
4. Click **"Create Application"**

---

## 🔧 Step 3: Get Your API Keys

After creating the application, you'll see an **"API Keys"** page with:

### **Publishable Key** (starts with `pk_test_...`)
Example: `pk_test_am9iZml0LXByby5jbGVyay5hY2NvdW50cy5kZXYk`

### **Secret Key** (starts with `sk_test_...`)
Example: `sk_test_MTIzNDU2Nzg5MGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6`

---

## 📋 Step 4: Configure Environment Variables

1. **Create `.env.local` file** in your project root (if not exists):
   ```bash
   # In the project directory
   c:\Users\hp\OneDrive\Desktop\staffarc\job management tool\.env.local
   ```

2. **Add your Clerk keys**:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
   CLERK_SECRET_KEY=sk_test_your_actual_secret_key_here

   # Optional: Customize redirect URLs (defaults shown)
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   # OpenAI API Key (add yours)
   OPENAI_API_KEY=sk-your-openai-api-key
   ```

3. **Replace the placeholder values** with your actual keys from Clerk Dashboard

---

## 🎨 Step 5: Customize Sign-In/Sign-Up Appearance (Optional)

In the Clerk Dashboard:

1. Go to **"Customization"** → **"Theme"**
2. Choose **"Dark"** theme to match JobFit Pro
3. Customize colors:
   - **Primary color**: `#6366f1` (Indigo)
   - **Success color**: `#22c55e` (Green)
   - **Danger color**: `#ef4444` (Red)

---

## ✅ Step 6: Test Authentication

1. **Restart your development server**:
   ```bash
   # Stop the current server (Ctrl+C)
   # Start it again
   npm run dev
   ```

2. **Open your browser**: [http://localhost:3000](http://localhost:3000)

3. **Test the flow**:
   - Click **"Get Started"** or **"Sign Up"**
   - Create a new account (use your email)
   - Verify your email (check inbox)
   - You should be redirected to `/dashboard`
   - Check the sidebar - your name and avatar should appear!

---

## 🔄 Step 7: Test Sign Out

1. In the dashboard, scroll to the bottom of the sidebar
2. Click **"Sign Out"**
3. You should be redirected to the home page
4. Try **"Sign In"** to log back in

---

## 🌐 Step 8: Configure Allowed Domains (Production)

When you're ready to deploy:

1. Go to Clerk Dashboard → **"Domains"**
2. Add your production domain: `jobfitpro.com` (or your domain)
3. Add your Vercel deployment URL: `your-app.vercel.app`
4. Save changes

---

## 🔍 Troubleshooting

### **Issue: "Invalid publishable key"**
- ✅ Make sure you copied the **FULL key** including `pk_test_` prefix
- ✅ Check for extra spaces in `.env.local`
- ✅ Restart your dev server after adding keys

### **Issue: "Clerk is not defined"**
- ✅ Make sure `@clerk/nextjs` is installed: `npm install @clerk/nextjs`
- ✅ Check that `.env.local` exists in the project root
- ✅ Verify you didn't commit `.env.local` to Git (it should be in `.gitignore`)

### **Issue: Redirect loops**
- ✅ Clear your browser cookies
- ✅ Check middleware.ts to ensure public routes are correct
- ✅ Verify redirect URLs in `.env.local`

### **Issue: User name not showing**
- ✅ Wait a moment - Clerk syncs user data asynchronously
- ✅ Refresh the page
- ✅ Check browser console for errors

---

## 📊 Features Now Available

After authentication is set up, you'll have:

- ✅ **Sign Up**: Email + password or social login
- ✅ **Sign In**: Email + password or social login
- ✅ **Email Verification**: Automatic email confirmation
- ✅ **Password Reset**: "Forgot password" flow
- ✅ **Protected Routes**: Dashboard requires login
- ✅ **User Profile**: Name, email, avatar in sidebar
- ✅ **Sign Out**: Secure logout functionality
- ✅ **Session Management**: JWT-based authentication

---

## 🎯 Next Steps

Now that authentication is working:

1. **Test the full user flow**:
   - Sign up → Verify email → Dashboard → Create resume → Sign out

2. **Customize user profile**:
   - Go to Clerk Dashboard → **"User & Authentication"** → **"Email, Phone, Username"**
   - Choose which fields to collect

3. **Add social logins** (optional):
   - Clerk Dashboard → **"User & Authentication"** → **"Social Connections"**
   - Enable Google, GitHub, Facebook, etc.

4. **Set up webhooks** (for database sync - future):
   - Clerk Dashboard → **"Webhooks"**
   - Create endpoint: `https://your-domain.com/api/webhooks/clerk`

---

## 💰 Clerk Pricing

- **Free tier**: Up to 10,000 monthly active users
- **Pro tier**: $25/month for unlimited users
- For JobFit Pro: Free tier is more than enough to start!

---

## 🔗 Helpful Links

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Dashboard](https://dashboard.clerk.com)
- [Clerk Component Reference](https://clerk.com/docs/components/overview)

---

## 🆘 Need Help?

If you encounter issues:

1. Check [Clerk Status Page](https://status.clerk.com)
2. Read [Clerk Docs](https://clerk.com/docs)
3. Ask in [Clerk Discord](https://clerk.com/discord)
4. Check your browser console for error messages

---

**Once you've completed these steps, authentication is fully working! 🎉**
