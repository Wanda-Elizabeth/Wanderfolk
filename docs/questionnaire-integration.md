# Questionnaire Integration with Supabase

## Overview

The Wanderfolk questionnaire is now fully integrated with Supabase to collect and store user feedback. The flow is:

1. **User completes 5-question survey** → Questionnaire saved to `questionnaire_responses` table
2. **Shows "Thank you for your feedback!" modal** → User can enter email to join waitlist
3. **User enters email and clicks "Notify me"** → SAME questionnaire row is updated with email and waitlist flag

**Security:** All database operations are done server-side via Next.js Server Actions. The Supabase service role key is never exposed to the browser.

## Files Changed

### New Files
- **app/actions/questionnaire.ts** - Server actions for questionnaire submission and email update
- **lib/supabase/questionnaire-rls.sql** - RLS policies for security

### Modified Files
- **components/SurveyForm.tsx** - Integrated Supabase saving, error handling, loading states
- **lib/types/database.ts** - Added `QuestionnaireResponse` TypeScript interface

## Database Table Structure

Your existing `questionnaire_responses` table should have these columns:

```sql
CREATE TABLE questionnaire_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  country TEXT NOT NULL,
  interests TEXT[] NOT NULL,           -- Array of selected interests
  connection_preference TEXT NOT NULL, -- Text or Voice or Video or Group conversation
  friendship_importance INTEGER NOT NULL, -- 1-5 scale
  trust_answer TEXT,                   -- Open text response
  email TEXT,                          -- NULL until user joins waitlist
  waitlist BOOLEAN DEFAULT false       -- false until user clicks "Notify me"
);
```

## Environment Variables

Your `.env.local` should already have these. If not, add them:

```bash
# Supabase - Public keys (safe to expose in browser)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Supabase - Server-side only (NEVER expose to browser)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

Get these from **Settings → API** in your Supabase project.

## Setting Up RLS Policies

1. Go to your Supabase project → **SQL Editor**
2. Click **New Query**
3. Copy the contents of `lib/supabase/questionnaire-rls.sql`
4. Click **Run**

This creates policies that:
- ✅ Allow INSERT of new questionnaire responses
- ✅ Allow UPDATE (for adding email)
- ❌ Block SELECT from public (only server actions can read)
- 🚀 Create indexes for performance

## Server Actions

### submitQuestionnaire()

Called when user completes Question 5 and clicks "Submit".

**Parameters:**
```typescript
{
  country: string;           // Selected country
  interests: string[];       // Array of selected interests
  connectionPreference: string; // Text/Voice/Video/Group conversation
  friendshipImportance: number; // 1-5
  trustAnswer: string;       // Text response
}
```

**Returns:**
```typescript
{
  success: boolean;
  id?: string;     // Row ID (used for later email update)
  error?: string;  // Error message if failed
}
```

### updateQuestionnaireEmail()

Called when user enters email and clicks "Notify me".

**Parameters:**
```typescript
responseId: string; // ID returned from submitQuestionnaire()
email: string;      // User's email address
```

**Returns:**
```typescript
{
  success: boolean;
  error?: string; // Error message if failed
}
```

## How the Flow Works

### Step 1: User Completes Survey
```
User clicks "Submit" on Question 5
  ↓
SurveyForm calls submitQuestionnaire()
  ↓
Server action validates data
  ↓
INSERT row into questionnaire_responses
  ↓
Returns row ID stored in state (responseId)
  ↓
GA4 tracks survey_completed event
  ↓
Shows "Thank you for your feedback!" modal with email form
```

### Step 2: User Submits Email
```
User enters email and clicks "Notify me"
  ↓
SurveyForm calls updateQuestionnaireEmail(responseId, email)
  ↓
Server action validates email format
  ↓
UPDATE same questionnaire row:
  - Set email = user's email
  - Set waitlist = true
  ↓
GA4 tracks email_signup event
  ↓
Shows success message
  ↓
Auto-closes modal after 2 seconds
```

## Testing the Integration

### 1. Test Questionnaire Submission

1. Open the website
2. Click any CTA button → Opens survey modal
3. Complete all 5 questions:
   - Q1: Select any country
   - Q2: Check at least 1 interest
   - Q3: Select connection preference
   - Q4: Click a rating (1-5)
   - Q5: Optionally type something
4. Click "Submit"
5. **Expected:** 
   - Thank you modal appears
   - No error message
   - Loading indicator shows while saving

### 2. Verify Data in Supabase

1. Open Supabase project → **Table Editor**
2. Click `questionnaire_responses` table
3. Should see new row with:
   - `id`: auto-generated UUID
   - `created_at`: current timestamp
   - `country`: your selection
   - `interests`: array of your selections
   - `connection_preference`: your selection
   - `friendship_importance`: your rating (1-5)
   - `trust_answer`: your text (or empty)
   - **`email`: NULL** (not yet joined waitlist)
   - **`waitlist`: false** (not yet joined waitlist)

### 3. Test Email Signup

1. In the "Thank you" modal, enter your email
2. Click "Notify me"
3. **Expected:**
   - Loading indicator shows
   - Success message appears: "✓ Email saved! We'll be in touch."
   - Modal auto-closes after 2 seconds

### 4. Verify Email Update in Supabase

1. In the same row in `questionnaire_responses`:
   - **`email`: should now show your email**
   - **`waitlist`: should now be true**

### 5. Test Error Handling

Try these to verify error messages:
- **Submit with no country** → "Missing required fields"
- **Submit with no interests** → "Missing required fields"
- **Enter invalid email** → "Please provide a valid email address"
- **No network** → "An unexpected error occurred"

## Google Analytics Tracking

GA4 events are tracked **in addition to** database saves:

- **`survey_completed`** - Fired when questionnaire is submitted
  - Includes: country, interests count, connection type, friendship importance
  - **No email sent** (privacy-first)

- **`email_signup`** - Fired when user joins waitlist
  - Source: "survey"
  - **No email sent** (privacy-first)

Check your GA4 dashboard at https://analytics.google.com to verify events.

## Security

### What We Do ✅
- Store questionnaire responses in Supabase
- Server-side only database access (service role key never exposed)
- Validate email format before saving
- Enable RLS policies (even though server actions bypass them)
- Never send email addresses to Google Analytics
- Encrypt data at rest in Supabase

### What We Don't Do ❌
- Store passwords or sensitive personal info
- Expose service role key to browser
- Send PII to analytics
- Log emails in console (production)
- Allow public SELECT of responses

## Troubleshooting

### "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
- Check `.env.local` has the keys
- Restart Next.js dev server: `npm run dev`

### "Failed to save questionnaire response"
- Check Supabase status page
- Verify RLS policies are enabled: Go to **Table Editor** → `questionnaire_responses` → **RLS**
- Verify table exists with correct columns

### "Please provide a valid email address"
- Email regex pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Email must be under 254 characters

### Data not appearing in Supabase
- Check browser console for error messages
- Verify RLS policies allow INSERT (run questionnaire-rls.sql again)
- Check that SUPABASE_SERVICE_ROLE_KEY is set in `.env.local`

## Next Steps

### For Local Development
1. Create a Supabase project at https://supabase.com
2. Create the `questionnaire_responses` table (or use existing one)
3. Run `questionnaire-rls.sql` in the SQL Editor
4. Copy your API keys to `.env.local`
5. Test locally with `npm run dev`

### For Production (Vercel)
1. Go to your Vercel project settings
2. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (secret)
3. Deploy with `git push`
4. Verify in Supabase that responses are being saved

### Future Features
- Admin dashboard to view all questionnaire responses
- Export responses to CSV
- Email automation to notify on waitlist
- A/B testing different question sets
- Segmentation by country/interests

## Code Examples

### Submitting Questionnaire (server action)
```typescript
const result = await submitQuestionnaire({
  country: 'Canada',
  interests: ['One-on-one friendships', 'Cultural exchange'],
  connectionPreference: 'Voice',
  friendshipImportance: 5,
  trustAnswer: 'Verified profiles and privacy controls',
});

if (result.success) {
  console.log('Saved questionnaire:', result.id);
} else {
  console.error('Error:', result.error);
}
```

### Updating Email (server action)
```typescript
const result = await updateQuestionnaireEmail(
  'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', // responseId
  'user@example.com'
);

if (result.success) {
  console.log('Email saved!');
} else {
  console.error('Error:', result.error);
}
```

## References

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [Google Analytics Events](https://support.google.com/analytics/answer/13316687)
