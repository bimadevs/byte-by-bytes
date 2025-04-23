export enum UserRole {
  USER = "user",
  ADMIN = "admin"
}

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at?: string;
  role: UserRole;
  phone_number: string | null;
  birth_place: string | null;
  birth_date: string | null;
  address: string | null;
}

export interface UserProgress {
  id: string;
  user_id: string;
  course_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string;
  created_at: string;
  updated_at: string;
}

export interface CourseProgress {
  course_id: string;
  completed_lessons: number;
  total_lessons: number;
  percentage: number;
  last_completed_lesson_id: string | null;
}

export interface LessonProgress {
  user_id: string;
  course_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at?: string;
  updated_at?: string;
}

export interface UserSession {
  id: string;
  email: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
} 