import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | ByteByByte",
  description: "Kebijakan privasi dan perlindungan data di platform ByteByByte",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Kebijakan Privasi</h1>
          <p className="text-muted-foreground mb-4">Terakhir diperbarui: 12 April 2023</p>

          <div className="prose prose-blue dark:prose-invert max-w-none">
            <p>
              Selamat datang di ByteByByte. Kami menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. 
              Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda 
              saat Anda menggunakan platform kami.
            </p>

            <h2>1. Informasi yang Kami Kumpulkan</h2>
            <p>Kami dapat mengumpulkan informasi berikut:</p>
            <ul>
              <li>
                <strong>Informasi Pribadi</strong>: Nama, alamat email, dan detail kontak lainnya yang Anda berikan saat mendaftar.
              </li>
              <li>
                <strong>Informasi Profil</strong>: Foto profil, biografi, preferensi pembelajaran, dan informasi lain yang Anda berikan.
              </li>
              <li>
                <strong>Data Pembelajaran</strong>: Kemajuan kursus, hasil kuis, dan aktivitas pembelajaran lainnya.
              </li>
              <li>
                <strong>Informasi Teknis</strong>: Alamat IP, tipe browser, perangkat, lokasi, dan data penggunaan platform.
              </li>
            </ul>

            <h2>2. Bagaimana Kami Menggunakan Informasi Anda</h2>
            <p>Kami menggunakan informasi Anda untuk:</p>
            <ul>
              <li>Menyediakan dan meningkatkan layanan pembelajaran kami</li>
              <li>Personalisasi pengalaman belajar Anda</li>
              <li>Berkomunikasi dengan Anda tentang pembaruan kursus, fitur baru, dan informasi penting lainnya</li>
              <li>Memberikan dukungan pelanggan</li>
              <li>Menganalisis penggunaan platform untuk meningkatkan layanan kami</li>
              <li>Melindungi keamanan platform kami</li>
            </ul>

            <h2>3. Penyimpanan dan Keamanan Data</h2>
            <p>
              Kami mengimplementasikan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data Anda 
              dari akses yang tidak sah, penggunaan, atau pengungkapan yang tidak sah. Namun, tidak ada metode transmisi internet 
              atau metode penyimpanan elektronik yang 100% aman, dan kami tidak dapat menjamin keamanan mutlak.
            </p>

            <h2>4. Pembagian Data</h2>
            <p>Kami tidak akan menjual data pribadi Anda kepada pihak ketiga. Kami dapat membagikan informasi Anda dengan:</p>
            <ul>
              <li>Penyedia layanan yang membantu kami dalam pengoperasian platform (hosting, analitik, dll.)</li>
              <li>Mitra pendidikan yang membantu menyediakan konten kursus</li>
              <li>Otoritas hukum jika diwajibkan oleh hukum</li>
            </ul>

            <h2>5. Hak Privasi Anda</h2>
            <p>Anda memiliki hak untuk:</p>
            <ul>
              <li>Mengakses data pribadi Anda yang kami simpan</li>
              <li>Meminta koreksi data pribadi Anda yang tidak akurat</li>
              <li>Meminta penghapusan data pribadi Anda dalam kondisi tertentu</li>
              <li>Membatasi atau keberatan atas pemrosesan data Anda</li>
              <li>Meminta salinan data Anda dalam format yang dapat dibaca mesin</li>
            </ul>

            <h2>6. Cookie dan Teknologi Serupa</h2>
            <p>
              Kami menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman pengguna, menganalisis penggunaan platform, 
              dan meningkatkan layanan kami. Anda dapat mengontrol cookie melalui pengaturan browser Anda.
            </p>

            <h2>7. Perubahan pada Kebijakan Privasi</h2>
            <p>
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan 
              signifikan dengan menampilkan pemberitahuan pada platform kami atau mengirimkan email kepada Anda.
            </p>

            <h2>8. Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau praktik privasi kami, silakan hubungi kami di:{" "}
              <a href="mailto:privacy@bytebybyte.com" className="text-primary hover:underline">
                privacy@bytebybyte.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 