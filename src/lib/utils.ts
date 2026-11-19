import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const vndFormatter = new Intl.NumberFormat("vi-VN");

/** Định dạng số tiền VND, ví dụ 350000 → "350.000đ" */
export function formatPrice(value: number): string {
  return vndFormatter.format(value) + "đ";
}
