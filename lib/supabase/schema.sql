-- Wanderfolk MVP Database Schema
-- Run this in Supabase SQL editor to set up the database

-- Create waitlist_signups table
CREATE TABLE IF NOT EXISTS waitlist_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(254) NOT NULL UNIQUE,
  country VARCHAR(100) NOT NULL,
  consent BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create validation_sessions table
CREATE TABLE IF NOT EXISTS validation_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET
);

-- Create survey_responses table
CREATE TABLE IF NOT EXISTS survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES validation_sessions(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  question_type VARCHAR(50) NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create connection_preferences table
CREATE TABLE IF NOT EXISTS connection_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES validation_sessions(id) ON DELETE CASCADE,
  preference VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create country_interests table
CREATE TABLE IF NOT EXISTS country_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES validation_sessions(id) ON DELETE CASCADE,
  country VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_signups(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created ON waitlist_signups(created_at);
CREATE INDEX IF NOT EXISTS idx_survey_session ON survey_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_pref_session ON connection_preferences(session_id);
CREATE INDEX IF NOT EXISTS idx_country_session ON country_interests(session_id);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE validation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE connection_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE country_interests ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated inserts
-- Allow anyone to insert into waitlist_signups (public signup)
CREATE POLICY "Allow public waitlist signup" ON waitlist_signups
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to insert into validation_sessions
CREATE POLICY "Allow public session creation" ON validation_sessions
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to insert survey data
CREATE POLICY "Allow public survey insert" ON survey_responses
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public preference insert" ON connection_preferences
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public country interest insert" ON country_interests
  FOR INSERT
  WITH CHECK (true);

-- Deny all selects to public (data is read via server actions only)
CREATE POLICY "Deny public select" ON waitlist_signups
  FOR SELECT
  USING (false);

CREATE POLICY "Deny public select" ON validation_sessions
  FOR SELECT
  USING (false);

CREATE POLICY "Deny public select" ON survey_responses
  FOR SELECT
  USING (false);

CREATE POLICY "Deny public select" ON connection_preferences
  FOR SELECT
  USING (false);

CREATE POLICY "Deny public select" ON country_interests
  FOR SELECT
  USING (false);
