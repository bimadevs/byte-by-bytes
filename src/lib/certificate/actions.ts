'use server';

import { createClient } from '@/lib/supabase/server';
import { Certificate } from '@/lib/types';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

type CertificateRecord = {
  id: string;
  user_id: string;
  course_id: string;
  course_title: string;
  user_name: string;
  certificate_number: string;
  issue_date: string;
  created_at: string;
};

/**
 * Memverifikasi sertifikat berdasarkan nomor sertifikat
 * 
 * @param certificateNumber Nomor sertifikat
 * @returns Data sertifikat jika ditemukan
 */
export async function verifyCertificateByNumber(
  certificateNumber: string
): Promise<{ certificate: Certificate | null; error?: string }> {
  const supabase = createClient();
  
  try {
    // Bersihkan nomor sertifikat dari spasi
    const cleanNumber = certificateNumber.trim();
    
    // Cari sertifikat berdasarkan nomor menggunakan filter()
    const { data, error } = await supabase
      .from('certificates')
      .select('id, user_id, course_id, course_title, user_name, certificate_number, issue_date, created_at')
      .filter('certificate_number', 'eq', cleanNumber)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return { 
          certificate: null, 
          error: 'Sertifikat dengan nomor tersebut tidak ditemukan' 
        };
      }
      
      console.error('Database error:', error);
      return { 
        certificate: null, 
        error: 'Terjadi kesalahan saat memverifikasi sertifikat' 
      };
    }
    
    if (!data) {
      return { certificate: null };
    }
    
    const certificateData = data as CertificateRecord;
    
    // Konversi data ke Certificate
    const certificate: Certificate = {
      id: certificateData.id,
      user_id: certificateData.user_id,
      course_id: certificateData.course_id,
      course_title: certificateData.course_title,
      user_name: certificateData.user_name,
      certificate_number: certificateData.certificate_number,
      issue_date: certificateData.issue_date,
      created_at: certificateData.created_at
    };
    
    return { certificate };
    
  } catch (error: any) {
    console.error('Error verifying certificate:', error);
    return { 
      certificate: null, 
      error: error.message || 'Terjadi kesalahan saat memverifikasi sertifikat'
    };
  }
} 

/**
 * Mendapatkan sertifikat berdasarkan ID
 * 
 * @param certificateId ID sertifikat
 * @returns Data sertifikat jika ditemukan
 */
export async function getCertificateById(
  certificateId: string
): Promise<{ certificate: Certificate | null; error?: string }> {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('id, user_id, course_id, course_title, user_name, certificate_number, issue_date, created_at')
      .filter('id', 'eq', certificateId)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return { 
          certificate: null, 
          error: 'Sertifikat tidak ditemukan' 
        };
      }
      
      console.error('Database error:', error);
      return { 
        certificate: null, 
        error: 'Terjadi kesalahan saat mengambil data sertifikat' 
      };
    }
    
    if (!data) {
      return { certificate: null };
    }
    
    const certificateData = data as CertificateRecord;
    
    // Konversi data ke Certificate
    const certificate: Certificate = {
      id: certificateData.id,
      user_id: certificateData.user_id,
      course_id: certificateData.course_id,
      course_title: certificateData.course_title,
      user_name: certificateData.user_name,
      certificate_number: certificateData.certificate_number,
      issue_date: certificateData.issue_date,
      created_at: certificateData.created_at
    };
    
    return { certificate };
  } catch (error: any) {
    console.error('Error getting certificate:', error);
    return { 
      certificate: null, 
      error: error.message || 'Terjadi kesalahan saat mengambil data sertifikat' 
    };
  }
}

/**
 * Download URL untuk sertifikat
 * 
 * @param certificateId ID sertifikat
 * @returns URL untuk mengunduh sertifikat
 */
export async function downloadCertificateUrl(certificateId: string): Promise<string> {
  // Buat URL untuk halaman sertifikat yang nanti akan di-print di browser
  return `/sertifikat/${certificateId}`;
} 