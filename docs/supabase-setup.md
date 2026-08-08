# Supabase Setup Guide for Wanderfolk MVP

## Overview

Wanderfolk uses Supabase to store:
- Waitlist signups (email, country, consent)
- Survey responses
- Connection preferences
- Country interests

All sensitive data is kept server-side. Email addresses are NEVER sent to Google Analytics.

## Setup Steps

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Name it "wanderfolk-mvp"
5. Set a strong database password
6. Choose your region
7. Click "Create new project"

### 2. Get Your API Keys

Once your project is created:

1. Go to **Settings → API**
2. Copy `Project URL` → Add to `NEXT_PUBLIC_SUPABASE_URL`
3. Copy `anon public` key → Add to `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Copy `service_role` key → Add to `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

Update `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (KEEP SECRET!)
```

### 3. Create Database Tables

1. Go to **SQL Editor** in Supabase
2. Click **New Query**
3. Paste the contents of `lib/supabase/schema.sql`
4. Click **Run**

This creates:
- `waitlist_signups` - Email addresses (stored server-side only)
- `validation_sessions` - User sessions
- `survey_responses` - Survey answers
- `connection_preferences` - Connection method preferences
- `country_interests` - Countries user is interested in

### 4. Set Row Level Security (RLS)

The schema.sql file sets up RLS automatically:
- ✅ Public can **INSERT** new data
- ❌ Public cannot **SELECT** any data (read-only via server actions)
- 🔒 Service role can read all data (for admin dashboard later)

### 5. Configure Environment Variables

Add to Vercel deployment:

**Public (visible in browser):**
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Secret (server-side only):**
```
SUPABASE_SERVICE_ROLE_KEY
```

## Database Schema

### waitlist_signups
```
id (UUID, primary key)
email (VARCHAR, unique)
country (VARCHAR)
consent (BOOLEAN)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### survey_responses
```
id (UUID, primary key)
session_id (UUID, references validation_sessions)
question_number (INTEGER)
question_type (VARCHAR)
answer (TEXT)
created_at (TIMESTAMP)
```

### connection_preferences
```
id (UUID, primary key)
session_id (UUID, references validation_sessions)
preference (VARCHAR)
created_at (TIMESTAMP)
```

### country_interests
```
id (UUID, primary key)
session_id (UUID, references validation_sessions)
country (VARCHAR)
created_at (TIMESTAMP)
```

## Privacy & Security

✅ **What we do:**
- Store email addresses in Supabase (encrypted at rest)
- Use service role key only server-side
- Anon key has INSERT/DELETE only, no SELECT
- Never send emails to GA4
- Hash emails if needed for duplicate checking

❌ **What we don't do:**
- Expose service role key to browser
- Send PII to Google Analytics
- Store passwords
- Store sensitive personal information
- Log emails in analytics

## Testing the Connection

```typescript
// In a server action or API route
import { getSupabaseServerClient } from '@/lib/supabase/server';

const supabase = getSupabaseServerClient();
const { data, error } = await supabase
  .from('waitlist_signups')
  .insert({ email: 'test@example.com', country: 'USA', consent: true });
```

## Admin Dashboard (Future)

The service role key enables a future private admin dashboard to view:
- Total signups
- Recent signups
- Countries represented
- Survey responses
- Conversion metrics

Only the backend should use the service role key.

## Troubleshooting

### "SUPABASE_SERVICE_ROLE_KEY is not set"
- Check `.env.local` has the service role key
- Restart Next.js dev server
- In production, add to Vercel project settings

### "Anon key does not have INSERT permission"
- Check RLS policies in Supabase
- Run schema.sql again
- Verify policies allow INSERT

### "Email already exists"
- Duplicate check is by design (prevents spam)
- Users can retry after 24 hours

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase JavaScript Library](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
