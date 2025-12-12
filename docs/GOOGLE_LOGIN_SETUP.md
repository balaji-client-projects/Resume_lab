# How to Enable Google Sign-In

You have successfully added the **"Continue with Google"** buttons to your Login and Signup pages. However, for them to actually work, you need to provide **Google API Credentials**.

### Step 1: Get Google Credentials
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a **New Project** (e.g., "JobFit Pro").
3. Go to **APIs & Services** > **Credentials**.
4. Click **Create Credentials** > **OAuth Client ID**.
5. Select **Web Application**.
6. **Authorized JavaScript Origins:**
   - `http://localhost:3000`
   - `https://your-domain.com` (Add your Vercel/Hostinger domain later)
7. **Authorized Redirect URIs:**
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-domain.com/api/auth/callback/google`
8. Copy the **Client ID** and **Client Secret**.

### Step 2: Add Keys to Environment Variables
Open your `.env` (or `.env.local`) file and add:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=any_random_long_string_here
```

### Step 3: Restart Server
Stop your server (`Ctrl + C`) and run `npm run dev` again to load the new keys.

---
**Note:** Until you do this, clicking the Google button will likely show a "Configuration Error" or 404.
