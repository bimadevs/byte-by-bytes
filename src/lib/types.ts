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

export interface Course {
  id: string;
  title: string;
  description: string;
  image?: string;
  level: string;
  lessonsCount?: number;
  category: string;
  featured: boolean;
  content: {
    content: any;
    text?: string;
  };
  lessonsData: Lesson[];
  lessons: LessonData[];
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  order: number;
  courseId?: string;
  content?: {
    content: any;
    text?: string;
  };
}

export interface LessonData {
  id: string;
  title: string;
  description?: string;
  order: number;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  course_title: string;
  user_name: string;
  certificate_number: string;
  issue_date: string;
  created_at: string;
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