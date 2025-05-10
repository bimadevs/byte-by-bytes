import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/lib/database.types';
import { type CookieOptions } from '@supabase/ssr';

export const createClient = () => {
  const cookieStore = cookies();
  
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => {
          return cookieStore.get(name)?.value;
        },
        set: (name: string, value: string, options: CookieOptions) => {
          cookieStore.set(name, value, options as any);
        },
        remove: (name: string, options: CookieOptions) => {
          cookieStore.set(name, '', { ...options as any, maxAge: 0 });
        }
      }
    }
  );
};

export const createClientComponentClient = () => {
  return createClient();
}; 