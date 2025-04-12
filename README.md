# ByteByByte - Platform E-Learning Coding

ByteByByte adalah platform pembelajaran coding interaktif yang memungkinkan pengguna untuk belajar programming melalui kursus-kursus terstruktur. Platform ini dibangun dengan Next.js, React, dan MDX untuk konten.

## Teknologi yang Digunakan

- **Next.js** - Framework React untuk server-side rendering dan routing
- **React** - Library untuk membangun UI
- **Tailwind CSS** - Framework CSS untuk styling
- **MDX** - Format untuk menulis konten dengan JSX
- **next-themes** - Untuk mode terang/gelap

## Struktur Folder

```
src/
├── app/                   # Direktori utama aplikasi Next.js
│   ├── kursus/            # Halaman untuk kursus
│   │   ├── [slug]/        # Halaman detail kursus
│   │   │   ├── pelajaran/ # Halaman pelajaran kursus
│   │   │   │   └── [lessonId]/ # Halaman detail pelajaran
│   ├── kebijakan-privasi/ # Halaman kebijakan privasi
│   ├── tentang/           # Halaman tentang
│   ├── page.tsx           # Halaman utama
│   └── layout.tsx         # Layout aplikasi
├── components/            # Komponen React yang dapat digunakan kembali
│   ├── ui/                # Komponen UI dasar
│   ├── course/            # Komponen terkait kursus
│   ├── header.tsx         # Komponen header
│   ├── footer.tsx         # Komponen footer
│   └── theme-provider.tsx # Provider tema (dark/light)
├── content/               # Konten MDX untuk kursus
│   └── courses/           # Folder untuk semua kursus
│       └── [course-id]/   # Folder untuk kursus tertentu
│           ├── index.mdx  # Metadata dan deskripsi kursus
│           └── lessons/   # Folder untuk pelajaran kursus
│               └── [lesson-id].mdx # File pelajaran
└── lib/                   # Fungsi dan utilitas
    └── mdx.ts             # Utilitas untuk memproses MDX
```

## Menambahkan Kursus Baru

Untuk menambahkan kursus baru, ikuti langkah-langkah berikut:

1. Buat folder baru di `src/content/courses/[course-id]` dengan ID kursus yang unik
2. Tambahkan file `index.mdx` dengan frontmatter berikut:

```mdx
---
title: Judul Kursus
description: Deskripsi singkat kursus
image: /images/courses/your-image.jpg
level: Pemula | Menengah | Lanjutan
category: Kategori Kursus
lessonsCount: Jumlah Pelajaran
---

# Konten Kursus

Tulis konten kursus...
```

3. Buat folder `lessons` di dalam folder kursus
4. Tambahkan pelajaran sebagai file MDX di dalam folder `lessons` dengan frontmatter:

```mdx
---
title: Judul Pelajaran
description: Deskripsi singkat pelajaran
order: 1 # Menentukan urutan pelajaran
---

# Konten Pelajaran

Tulis konten pelajaran...
```

## Menjalankan Proyek

```bash
# Instalasi dependensi
npm install

# Mode development
npm run dev

# Build untuk production
npm run build

# Menjalankan versi production
npm start
```

## Akses Website

Setelah menjalankan `npm run dev`, website dapat diakses di:

- http://localhost:3000

## Mode Tema

Website mendukung mode terang dan gelap yang dapat diakses melalui tombol toggle di header.
