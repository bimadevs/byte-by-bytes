-- Create the user_progress table to track user learning progress
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Make sure the combination of user, course, and lesson is unique
  UNIQUE(user_id, course_id, lesson_id)
);

-- Add RLS policies for the user_progress table
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own progress
CREATE POLICY "Users can view their own progress" 
  ON user_progress 
  FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Policy for users to insert their own progress
CREATE POLICY "Users can insert their own progress" 
  ON user_progress 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own progress
CREATE POLICY "Users can update their own progress" 
  ON user_progress 
  FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Policy for users to delete their own progress
CREATE POLICY "Users can delete their own progress" 
  ON user_progress 
  FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Create an index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);

-- Create a composite index on user_id and course_id for faster filtering by course
CREATE INDEX IF NOT EXISTS idx_user_progress_user_course ON user_progress(user_id, course_id);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to update the updated_at column on update
CREATE TRIGGER update_user_progress_updated_at
BEFORE UPDATE ON user_progress
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column(); 