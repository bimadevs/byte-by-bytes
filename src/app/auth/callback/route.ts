import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  
  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Error exchanging code for session:', error);
      // Redirect to login page with error
      return NextResponse.redirect(new URL('/auth/login?error=auth_callback_error', request.url));
    }
  }

  // Redirect to home page or dashboard after successful authentication
  return NextResponse.redirect(new URL('/', request.url));
} 