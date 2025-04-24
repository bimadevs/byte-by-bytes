"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useAuth } from "@/components/auth-provider";
import { User } from "@/lib/types";
import { createClient_browser } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  User as UserIcon,
  Camera,
  Calendar,
  MapPin,
  Phone,
  Home as HomeIcon,
  Mail,
  Loader2,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const profileSchema = z.object({
  full_name: z.string().min(2, {
    message: "Nama lengkap harus minimal 2 karakter.",
  }),
  email: z.string().email({
    message: "Email tidak valid.",
  }).readonly(),
  phone_number: z.string().min(10, {
    message: "Nomor telepon harus minimal 10 digit.",
  }).optional().nullable(),
  birth_place: z.string().optional().nullable(),
  birth_date: z.string().optional().nullable(),
  address: z.string().max(500, {
    message: "Alamat tidak boleh lebih dari 500 karakter.",
  }).optional().nullable(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { toast } = useToast();
  const { authState, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const supabase = createClient_browser();
  
  useEffect(() => {
    // Update avatar URL when user data changes
    if (authState.user?.avatar_url) {
      setAvatarUrl(authState.user.avatar_url);
      setAvatarError(false);
    }
  }, [authState.user]);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: authState.user?.full_name || "",
      email: authState.user?.email || "",
      phone_number: authState.user?.phone_number || "",
      birth_place: authState.user?.birth_place || "",
      birth_date: authState.user?.birth_date || "",
      address: authState.user?.address || "",
    },
    mode: "onChange",
  });
  
  // Update form values when user data changes
  useEffect(() => {
    if (authState.user) {
      form.reset({
        full_name: authState.user.full_name || "",
        email: authState.user.email || "",
        phone_number: authState.user.phone_number || "",
        birth_place: authState.user.birth_place || "",
        birth_date: authState.user.birth_date || "",
        address: authState.user.address || "",
      });
    }
  }, [authState.user, form]);

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    
    try {
      // Konversi data form ke format yang sesuai dengan tipe Partial<User>
      const userData: Partial<User> = {
        full_name: data.full_name,
        phone_number: data.phone_number,
        birth_place: data.birth_place,
        birth_date: data.birth_date,
        address: data.address,
      };
      
      let avatarPublicUrl = null;
      
      if (avatar) {
        avatarPublicUrl = await handleAvatarUpload();
        if (avatarPublicUrl) {
          userData.avatar_url = avatarPublicUrl;
        }
      }
      
      const { error } = await updateProfile(userData);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Gagal memperbarui profil",
          description: error.message || "Terjadi kesalahan saat menyimpan informasi profil",
        });
      } else {
        toast({
          title: "Profil berhasil diperbarui",
          description: "Informasi profil Anda telah disimpan",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Gagal memperbarui profil",
        description: error.message || "Terjadi kesalahan saat menyimpan informasi profil",
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !authState.user) {
      return;
    }
    
    setIsUploading(true);
    
    try {
      const file = e.target.files[0];
      setAvatar(file);
      
      const fileExt = file.name.split('.').pop() || 'jpg';
      const randomId = Math.random().toString(36).substring(2);
      const fileName = `${randomId}.${fileExt}`;
      
      // Upload file ke Supabase Storage tanpa prefix folder
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Dapatkan URL publik dari file yang diupload
      const { data } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);
      
      // Update avatar_url di database
      const newAvatarUrl = data.publicUrl;
      
      console.log("New avatar URL:", newAvatarUrl);
      
      // Update avatar di UI
      setAvatarUrl(newAvatarUrl);
      
      const { error: updateError } = await updateProfile({ 
        avatar_url: newAvatarUrl 
      });
      
      if (updateError) {
        throw updateError;
      }
      
      toast({
        title: "Foto profil berhasil diperbarui",
        description: "Foto profil Anda telah disimpan",
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      setAvatarError(true);
      toast({
        variant: "destructive",
        title: "Gagal mengunggah foto",
        description: error.message || "Terjadi kesalahan saat mengunggah foto profil",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  const handleAvatarUpload = async (): Promise<string | null> => {
    if (!avatar) return null;
    
    const fileExt = avatar.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    
    setUploadProgress(0);
    
    try {
      const { error } = await supabase.storage
        .from('profile-images')
        .upload(fileName, avatar, {
          upsert: true
        });
        
      if (error) {
        console.error('Error uploading avatar:', error);
        toast({
          title: "Error",
          description: `Failed to upload avatar: ${error.message}`,
          variant: "destructive",
        });
        return null;
      }
      
      // Mendapatkan URL publik setelah upload
      const { data } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Unexpected error during upload:', error);
      return null;
    }
  };

  if (authState.isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!authState.user) {
    return (
      <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
        <p className="text-center text-slate-600 dark:text-slate-400">
          Silakan login untuk mengakses halaman profil.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <div className="relative w-32 h-32">
          <Avatar className="w-full h-full border-4 border-slate-100 dark:border-slate-700">
            {!avatarError && avatarUrl ? (
              <AvatarImage 
                src={avatarUrl} 
                alt={authState.user.full_name || "Pengguna"} 
                onError={handleAvatarError}
              />
            ) : (
              <AvatarFallback className="bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 text-2xl">
                {authState.user.full_name?.charAt(0) || "U"}
              </AvatarFallback>
            )}
          </Avatar>
          
          <label 
            htmlFor="avatar-upload"
            className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
          >
            {isUploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Camera className="w-5 h-5" />
            )}
            <input 
              id="avatar-upload" 
              type="file" 
              accept="image/*" 
              className="hidden"
              onChange={handleAvatarChange}
              disabled={isUploading}
            />
          </label>
        </div>
        
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
            {authState.user.full_name || "Pengguna"}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {authState.user.email}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Bergabung pada {new Date(authState.user.created_at || "").toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <UserIcon className="h-5 w-5 text-slate-400" />
                      </div>
                      <Input 
                        placeholder="Masukkan nama lengkap" 
                        className="pl-10 border-white " 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400" />
                      </div>
                      <Input 
                        placeholder="Email" 
                        className="pl-10 border-white" 
                        disabled
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Email tidak dapat diubah
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone className="h-5 w-5 text-slate-400" />
                      </div>
                      <Input 
                        placeholder="Masukkan nomor telepon" 
                        className="pl-10 border-white" 
                        {...field} 
                        value={field.value || ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="birth_place"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempat Lahir</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MapPin className="h-5 w-5 text-slate-400" />
                      </div>
                      <Input 
                        placeholder="Masukkan tempat lahir" 
                        className="pl-10 border-white" 
                        {...field} 
                        value={field.value || ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="birth_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Calendar className="h-5 w-5 text-slate-400" />
                      </div>
                      <Input 
                        type="date" 
                        className="pl-10 border-white" 
                        {...field} 
                        value={field.value || ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute top-3 left-0 flex items-start pl-3 pointer-events-none">
                      <HomeIcon className="h-5 w-5 text-slate-400" />
                    </div>
                    <Textarea
                      placeholder="Masukkan alamat lengkap"
                      className="pl-10 min-h-24 border-white"
                      {...field}
                      value={field.value || ""}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 