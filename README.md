# ByteByByte - Platform E-Learning Coding

![ByteByByte Banner](public/images/banner.jpg)

ByteByByte adalah platform pembelajaran coding interaktif yang memungkinkan pengguna untuk belajar programming melalui kursus-kursus terstruktur dengan antarmuka yang modern. Platform ini dibangun dengan teknologi web terkini dan menggunakan pendekatan component-based untuk UI yang konsisten dan mudah dikelola.

## Fitur Utama

- **Antarmuka Dark Mode** - Dioptimalkan untuk kenyamanan mata dengan dark mode permanen
- **Kursus Terstruktur** - Materi pembelajaran disusun secara bertahap dan terorganisir
- **Pencarian & Filter** - Temukan kursus dengan mudah menggunakan pencarian dan filter
- **Responsif** - Tampilan yang optimal di semua ukuran perangkat
- **Halaman Kursus Interaktif** - Termasuk kuis interaktif untuk evaluasi pembelajaran
- **Markdown-based Content** - Konten kursus ditulis dalam format MDX yang mudah dikelola

## Teknologi yang Digunakan

- **Next.js 14** - Framework React untuk server-side rendering, routing, dan optimisasi
- **React 18** - Library untuk membangun user interface yang interaktif
- **TypeScript** - Untuk type-safety dan developer experience yang lebih baik
- **Tailwind CSS** - Framework utility-first CSS untuk styling
- **MDX** - Format untuk menulis konten dengan dukungan JSX
- **Lucide React** - Library ikon yang konsisten dengan tema dark
- **shadcn/ui** - Komponen UI yang dapat dikustomisasi
- **Next Themes** - Manajemen tema meskipun saat ini hanya menggunakan dark mode

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- **Node.js** - v18.0.0 atau lebih tinggi
- **npm** - v8.0.0 atau lebih tinggi

## Instalasi dan Penggunaan

```bash
# Clone repository
git clone https://github.com/bimadevs/byte-by-byte.git
cd byte-by-byte

# Instalasi dependensi
npm install

# Mode development
npm run dev

# Build untuk production
npm run build

# Menjalankan versi production
npm start
```

Server development akan berjalan di http://localhost:3000

## Struktur Proyek

```
byte-by-byte/
├── public/              # Aset statis (gambar, favicon, dll)
├── src/                 # Kode sumber aplikasi
│   ├── app/             # Routing dan halaman Next.js App Router
│   │   ├── kursus/      # Halaman kursus
│   │   │   ├── [slug]/  # Detail kursus berdasarkan slug
│   │   │   │   └── pelajaran/[lessonId]/ # Halaman detail pelajaran
│   │   ├── tentang/     # Halaman tentang
│   │   ├── page.tsx     # Halaman beranda
│   │   └── layout.tsx   # Layout aplikasi (header, footer, tema)
│   ├── components/      # Komponen React yang dapat digunakan kembali
│   │   ├── ui/          # Komponen UI dasar (Quiz, Question, dll)
│   │   ├── course/      # Komponen khusus untuk kursus
│   │   ├── header.tsx   # Komponen header dengan navigasi
│   │   └── footer.tsx   # Komponen footer dengan informasi site
│   ├── content/         # Konten dalam format MDX
│   │   └── courses/     # Konten kursus
│   │       ├── html-dasar/      # Kursus HTML dasar
│   │       ├── javascript-dasar/ # Kursus JavaScript dasar
│   │       └── react-fundamental/ # Kursus React fundamental
│   ├── data/            # Data statis (courses.json)
│   └── lib/             # Fungsi dan utilitas
│       ├── courses.ts   # Helper untuk mengakses data kursus
│       ├── mdx.ts       # Utilitas untuk memproses MDX
│       └── utils.ts     # Fungsi utilitas umum
├── tailwind.config.ts   # Konfigurasi Tailwind CSS
├── tsconfig.json        # Konfigurasi TypeScript
├── package.json         # Dependensi dan script
└── README.md            # Dokumentasi proyek
```

## Alur Proyek

ByteByByte memiliki struktur navigasi yang dibagi menjadi tiga area utama:

1. **Halaman Beranda** (`/`) - Menampilkan kursus unggulan, pengenalan platform, dan CTA
2. **Daftar Kursus** (`/kursus`) - Menampilkan semua kursus dengan fitur pencarian dan filter
3. **Detail Kursus** (`/kursus/[slug]`) - Menampilkan detail kursus tertentu
4. **Halaman Pelajaran** (`/kursus/[slug]/pelajaran/[lessonId]`) - Konten pelajaran spesifik

### Alur Data

1. Data kursus disimpan dalam dua format:
   - **JSON** (`src/data/courses.json`) - Untuk informasi metadata kursus
   - **MDX** (`src/content/courses/[course-id]`) - Untuk konten kursus dan pelajaran

2. Helper di `src/lib/courses.ts` menyediakan fungsi untuk:
   - Mengambil semua kursus
   - Memfilter kursus berdasarkan kategori atau level
   - Mencari kursus berdasarkan kata kunci
   - Mendapatkan kursus dan pelajaran berdasarkan ID

3. Konten MDX diproses menggunakan utilitas di `src/lib/mdx.ts` dan dirender dengan komponen khusus di `src/components/mdx-components.tsx`

## Menambahkan Kursus Baru

Untuk menambahkan kursus baru, ikuti langkah-langkah berikut:

1. **Tambahkan metadata kursus ke courses.json**:

```json
{
  "id": "id-kursus-baru",
  "title": "Judul Kursus",
  "description": "Deskripsi kursus",
  "image": "/images/courses/image.jpg",
  "level": "Pemula",
  "category": "Kategori",
  "lessons": 5,
  "featured": true,
  "content": "Ringkasan kursus yang lengkap"
}
```

2. **Buat folder untuk kursus baru**:

```
src/content/courses/id-kursus-baru/
├── index.mdx       # Metadata dan deskripsi kursus
└── lessons/        # Folder untuk pelajaran
    ├── 01-intro.mdx
    ├── 02-lesson.mdx
    └── ...
```

3. **Buat file index.mdx di folder kursus**:

```mdx
---
title: Judul Kursus
description: Deskripsi singkat kursus
image: /images/courses/image.jpg
level: Pemula | Menengah | Lanjutan
category: Kategori Kursus
lessonsCount: 5
---

# Deskripsi Kursus

Deskripsi lengkap tentang kursus...
```

4. **Buat file-file pelajaran di folder lessons**:

```mdx
---
title: Judul Pelajaran
description: Deskripsi singkat pelajaran
order: 1
---

# Judul Pelajaran

Konten pelajaran menggunakan Markdown dan komponen MDX.

## Sub Judul

Teks penjelasan...

```

## Styling dan Tema

ByteByByte menggunakan dark mode secara eksklusif untuk semua pengguna. Pengaturan tema disimpan di:

- `src/app/globals.css` - CSS variables untuk tema
- `src/app/layout.tsx` - Konfigurasi ThemeProvider
- `src/components/theme-provider.tsx` - Provider untuk manajemen tema

## Komponen UI

Proyek ini menyediakan beberapa komponen UI custom:

- **Quiz** - Komponen untuk membuat kuis interaktif
- **Question** - Komponen untuk menampilkan pertanyaan dengan opsi pilihan ganda

## Kontribusi

Kami sangat menghargai kontribusi! Jika Anda ingin berkontribusi pada proyek ini:

1. Fork repository
2. Buat branch baru (`git checkout -b fitur-baru`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## Kontak

Untuk pertanyaan atau saran, silakan hubungi [email@bytebybyte.id](mailto:email@bytebybyte.id) atau buka issue di repository ini.
