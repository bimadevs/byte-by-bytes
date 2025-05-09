-- Create certificates table to store completed course certificates
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  course_title TEXT NOT NULL,
  user_name TEXT NOT NULL,
  certificate_number TEXT NOT NULL,
  issue_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Make sure the combination of user and course is unique
  UNIQUE(user_id, course_id)
);

-- Add RLS policies for the certificates table
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own certificates
CREATE POLICY "Users can view their own certificates" 
  ON certificates 
  FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Policy for users to insert their own certificates
CREATE POLICY "Users can insert their own certificates" 
  ON certificates 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

-- Public access policy for certificate verification via certificate_number
CREATE POLICY "Anyone can view certificates by certificate number" 
  ON certificates 
  FOR SELECT 
  TO anon, authenticated
  USING (true);

-- Create an index on certificate_number for verification lookups
CREATE INDEX IF NOT EXISTS idx_certificates_number ON certificates(certificate_number);

-- Create an index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id); 