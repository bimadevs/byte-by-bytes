"use client";

import { useState, useEffect } from "react";
import { createClient_browser } from "@/lib/supabase";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";

export default function SupabaseDebugPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [bucketPublic, setBucketPublic] = useState<boolean | null>(null);
  const { authState } = useAuth();
  const supabase = createClient_browser();

  const checkBucketPermissions = async () => {
    const { data: bucket, error } = await supabase.storage.getBucket('profile-images');
    if (error) {
      console.error("Error fetching bucket:", error);
      return;
    }
    
    setBucketPublic(bucket.public);
  };

  const loadFiles = async () => {
    const { data, error } = await supabase.storage
      .from('profile-images')
      .list();

    if (error) {
      console.error("Error loading files:", error);
      return;
    }

    setFiles(data || []);
  };

  const makeBucketPublic = async () => {
    const { error } = await supabase.storage.updateBucket('profile-images', {
      public: true
    });

    if (error) {
      console.error("Error updating bucket:", error);
      return;
    }

    setBucketPublic(true);
    alert("Bucket set to public");
  };

  const testImageUrl = async (name: string) => {
    const { data } = supabase.storage
      .from('profile-images')
      .getPublicUrl(name);
      
    window.open(data.publicUrl, '_blank');
  };

  useEffect(() => {
    checkBucketPermissions();
    loadFiles();
  }, []);

  if (!authState.user) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Supabase Debug Page</h1>
        <p>Anda harus login untuk mengakses halaman ini.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Storage Debug</h1>
      
      <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Bucket Status</h2>
        <p>Bucket Public: {bucketPublic === null ? 'Checking...' : bucketPublic ? 'Yes' : 'No'}</p>
        {bucketPublic === false && (
          <Button 
            onClick={makeBucketPublic} 
            className="mt-2"
          >
            Make Bucket Public
          </Button>
        )}
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">User Avatar</h2>
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
            {authState.user.avatar_url ? (
              <img 
                src={authState.user.avatar_url} 
                alt="Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Image failed to load");
                  e.currentTarget.src = "";
                  e.currentTarget.className = "hidden";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                No Image
              </div>
            )}
          </div>
          <div>
            <p className="font-medium">Avatar URL:</p>
            <p className="text-xs break-all max-w-lg">{authState.user.avatar_url || 'Not set'}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Files in Storage ({files.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {files.map((file) => (
            <div key={file.id} className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-sm text-slate-500">Size: {(file.metadata?.size / 1024).toFixed(2)} KB</p>
              <p className="text-sm text-slate-500">Created: {new Date(file.created_at).toLocaleString()}</p>
              <Button 
                variant="secondary" 
                size="sm" 
                className="mt-2"
                onClick={() => testImageUrl(file.name)}
              >
                Test URL
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 