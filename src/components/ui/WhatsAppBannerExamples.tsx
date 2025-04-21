"use client";

import React, { useState } from "react";
import { WhatsAppBanner } from "./WhatsAppBanner";
import { CommunityBanner } from "./CommunityBanner";
import { WhatsAppModal } from "./WhatsAppModal";

export function WhatsAppBannerExamples() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Link WhatsApp yang akan digunakan (ganti dengan link grup WhatsApp yang sebenarnya)
  const whatsappLink = "https://chat.whatsapp.com/KtmCgWg4E26Dc0Wtt1Ao1l";
  
  return (
    <div className="space-y-10 py-8">
      <div>
        <h2 className="mb-4 text-xl font-bold">WhatsApp Banner (Default)</h2>
        <WhatsAppBanner whatsappLink={whatsappLink} />
      </div>
      
      <div>
        <h2 className="mb-4 text-xl font-bold">WhatsApp Banner (Compact)</h2>
        <WhatsAppBanner 
          whatsappLink={whatsappLink} 
          variant="compact" 
        />
      </div>
      
      <div>
        <h2 className="mb-4 text-xl font-bold">WhatsApp Banner (Floating)</h2>
        <div className="relative h-60 w-full border border-dashed border-slate-300 dark:border-slate-700">
          <div className="p-4 text-center text-sm text-muted-foreground">
            Banner akan muncul di pojok kanan bawah (fixed position)
          </div>
          <WhatsAppBanner 
            whatsappLink={whatsappLink} 
            variant="floating" 
          />
        </div>
      </div>
      
      <div>
        <h2 className="mb-4 text-xl font-bold">Community Banner (Hero)</h2>
        <CommunityBanner 
          whatsappLink={whatsappLink}
          memberCount={400}
        />
      </div>
      
      <div>
        <h2 className="mb-4 text-xl font-bold">Community Banner (Sidebar)</h2>
        <div className="max-w-xs">
          <CommunityBanner 
            whatsappLink={whatsappLink}
            variant="sidebar"
            memberCount={400}
            showBadge={true}
          />
        </div>
      </div>
      
      <div>
        <h2 className="mb-4 text-xl font-bold">Community Banner (Inline)</h2>
        <CommunityBanner 
          whatsappLink={whatsappLink}
          variant="inline"
          memberCount={400}
        />
      </div>
      
      <div>
        <h2 className="mb-4 text-xl font-bold">WhatsApp Modal</h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Modal popup yang akan muncul secara otomatis atau dapat dibuka dengan tombol.
        </p>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600"
        >
          Buka WhatsApp Modal
        </button>
        
        <WhatsAppModal 
          whatsappLink={whatsappLink}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
      
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/20">
        <h3 className="mb-2 font-bold text-amber-800 dark:text-amber-500">Catatan Penggunaan</h3>
        <ul className="list-inside list-disc space-y-2 text-sm text-amber-700 dark:text-amber-400">
          <li>Ganti <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs dark:bg-amber-900/50">whatsappLink</code> dengan link grup WhatsApp yang sebenarnya</li>
          <li>Untuk modal otomatis, tambahkan <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs dark:bg-amber-900/50">&lt;WhatsAppModal whatsappLink="{whatsappLink}" /&gt;</code> ke layout atau halaman utama</li>
          <li>Banner floating cocok untuk ditampilkan di bawah halaman untuk mendorong pengguna bergabung</li>
          <li>Gunakan banner sidebar di area sidebar pada halaman kursus atau materi</li>
        </ul>
      </div>
    </div>
  );
} 