-- Membuat bucket untuk foto profil
INSERT INTO storage.buckets (id, name)
VALUES ('profile-images', 'profile-images')
ON CONFLICT DO NOTHING;

-- Mengubah bucket menjadi public agar gambar bisa diakses
UPDATE storage.buckets SET public = true WHERE id = 'profile-images';

-- Set kebijakan RLS untuk bucket profile-images
-- Kebijakan SELECT (semua user bisa melihat foto profil)
CREATE POLICY "Public Access Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-images');

-- Kebijakan INSERT (user bisa menambahkan foto)
CREATE POLICY "Users Can Upload Avatar"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'profile-images');

-- Kebijakan UPDATE (user bisa mengubah foto)
CREATE POLICY "Users Can Update Avatar"
ON storage.objects FOR UPDATE
USING (bucket_id = 'profile-images');

-- Kebijakan DELETE (user bisa menghapus foto)
CREATE POLICY "Users Can Delete Avatar"
ON storage.objects FOR DELETE
USING (bucket_id = 'profile-images'); 