import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateTimeString: string) {
  if (!dateTimeString) return ""; // handle case where dateTimeString is undefined or null

  const date = new Date(dateTimeString);
  const options:any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',};
  return date.toLocaleDateString('en-US', options);
}

export function generateOTP(): string {
  const digits = '0123456789';
  let OTP = '';

  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  return OTP;
}