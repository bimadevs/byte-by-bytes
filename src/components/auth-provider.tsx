"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState, UserRole } from '@/lib/types';
import { createClient_browser } from '@/lib/supabase';

// Buat context untuk autentikasi
export const AuthContext = createContext<{
  authState: AuthState;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithGithub: () => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<{ error: any | null }>;
  refreshUser: () => Promise<void>;
}>({
  authState: { user: null, isLoading: true, error: null },
  signInWithGoogle: async () => ({ error: null }),
  signInWithGithub: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  updateProfile: async () => ({ error: null }),
  refreshUser: async () => {},
});

// Custom hook untuk menggunakan auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  // Inisialisasi Supabase client di sisi browser
  const supabase = createClient_browser();

  // Effect untuk mengecek dan mengupdate state autentikasi saat komponen dimount
  useEffect(() => {
    const getUser = async () => {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      try {
        // Mendapatkan session saat ini
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
            // Mendapatkan profil user dari database jika ada
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single();
            
            setAuthState({
              user: {
                id: user.id,
                email: user.email || '',
                full_name: profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name,
                avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url,
                birth_date: profile?.birth_date,
                birth_place: profile?.birth_place,
                phone_number: profile?.phone_number,
                address: profile?.address,
                created_at: user.created_at,
                updated_at: profile?.updated_at,
                role: profile?.role || UserRole.USER
              },
              isLoading: false,
              error: null,
            });
          }
        } else {
          // Tidak ada session aktif
          setAuthState({
            user: null,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error('Auth error:', error);
        setAuthState({
          user: null,
          isLoading: false,
          error: 'Terjadi kesalahan saat memeriksa autentikasi',
        });
      }
    };

    // Subscribe ke perubahan auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      getUser();
    });

    // Cek user saat pertama kali dimount
    getUser();

    // Cleanup subscription saat unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fungsi Sign In dengan Google
  const signInWithGoogle = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        setAuthState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: error.message 
        }));
        return { error };
      }
      
      return { error: null };
    } catch (error: any) {
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error.message 
      }));
      return { error };
    }
  };

  // Fungsi Sign In dengan GitHub
  const signInWithGithub = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        setAuthState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: error.message 
        }));
        return { error };
      }
      
      return { error: null };
    } catch (error: any) {
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error.message 
      }));
      return { error };
    }
  };

  // Fungsi Sign Out
  const signOut = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await supabase.auth.signOut();
      setAuthState({
        user: null,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error.message 
      }));
    }
  };

  // Fungsi untuk update profile user
  const updateProfile = async (data: Partial<User>) => {
    if (!authState.user) return { error: "Pengguna tidak terotentikasi" };
    
    try {
      // Pastikan nilai null tidak dikirim ke Supabase
      const updates: Record<string, any> = { updated_at: new Date().toISOString() };
      
      // Salin hanya properti yang tidak null/undefined
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          updates[key] = value;
        }
      });
      
      // Update data di tabel profiles
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', authState.user.id);
      
      if (error) {
        console.error('Error updating profile:', error);
        return { error };
      }
      
      // Update state lokal
      setAuthState(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, ...updates } : null,
      }));
      
      return { error: null };
    } catch (error: any) {
      console.error('Error updating profile:', error);
      return { error };
    }
  };

  // Fungsi untuk refresh data user
  const refreshUser = async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    
    try {
      const { data: userData, error } = await supabase.auth.getUser();
      
      if (error) {
        throw error;
      }
      
      if (userData.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userData.user.id)
          .single();
        
        setAuthState({
          user: {
            id: userData.user.id,
            email: userData.user.email || '',
            full_name: profile?.full_name || userData.user.user_metadata?.full_name || userData.user.user_metadata?.name,
            avatar_url: profile?.avatar_url || userData.user.user_metadata?.avatar_url,
            birth_date: profile?.birth_date,
            birth_place: profile?.birth_place,
            phone_number: profile?.phone_number,
            address: profile?.address,
            created_at: userData.user.created_at,
            updated_at: profile?.updated_at,
            role: profile?.role || UserRole.USER
          },
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          error: null,
        });
      }
    } catch (error: any) {
      console.error('Error refreshing user:', error);
      setAuthState({
        user: null,
        isLoading: false,
        error: error.message,
      });
    }
  };

  // Fungsi Sign Up (registrasi)
  const signUp = async (email: string, password: string, fullName: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Register dengan email dan password
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      
      if (error) {
        setAuthState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: error.message 
        }));
        return { error };
      }
      
      // Buat entry di tabel profiles jika user berhasil dibuat
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: fullName,
            email: email,
            role: UserRole.USER
          });
          
        if (profileError) {
          console.error('Error creating profile:', profileError);
          // Tetap lanjutkan meskipun ada error saat buat profil
        }
      }
      
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { error: null };
    } catch (error: any) {
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error.message 
      }));
      return { error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        signInWithGoogle,
        signInWithGithub,
        signUp,
        signOut,
        updateProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 