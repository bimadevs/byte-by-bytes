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
  bio: string | null;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
} 