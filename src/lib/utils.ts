import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Menggabungkan class name dari Tailwind CSS dan memastikan tidak ada konflik
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 