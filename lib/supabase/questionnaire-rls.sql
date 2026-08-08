-- Row Level Security Policies for questionnaire_responses table
-- Run this in Supabase SQL editor to set up RLS

-- Enable RLS on questionnaire_responses table
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert questionnaire responses (via server action)
CREATE POLICY "Allow public questionnaire insert" ON questionnaire_responses
  FOR INSERT
  WITH CHECK (true);

-- Allow updates to own questionnaire response (when adding email)
-- Note: In production, you might track user session IDs to enforce row-level access
CREATE POLICY "Allow update own questionnaire" ON questionnaire_responses
  FOR UPDATE
  USING (true)  -- Server actions use service role, so this allows updates
  WITH CHECK (true);

-- Deny all SELECT to public (data is only read via server actions with service role)
CREATE POLICY "Deny public select questionnaire" ON questionnaire_responses
  FOR SELECT
  USING (false);

-- Optional: Create index for query performance
CREATE INDEX IF NOT EXISTS idx_questionnaire_email ON questionnaire_responses(email);
CREATE INDEX IF NOT EXISTS idx_questionnaire_waitlist ON questionnaire_responses(waitlist);
CREATE INDEX IF NOT EXISTS idx_questionnaire_created ON questionnaire_responses(created_at);
