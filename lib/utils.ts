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

export function formatDateShortly(dateTimeString: string) {
  if (!dateTimeString) return ""; // handle case where dateTimeString is undefined or null

  const date = new Date(dateTimeString);
  const options:any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',};
  return date.toLocaleDateString('en-US', options);
}

export function formatDateTiny(dateTimeString: string) {
  if (!dateTimeString) return ""; // handle case where dateTimeString is undefined or null

  const date = new Date(dateTimeString);
  const options:any = { year: 'numeric', month: 'long', day: 'numeric',};
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

export const multiFormatDateString = (timestamp: string = ""): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date: Date = new Date(timestampNum * 1000);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;
  const diffInWeeks: number = diffInDays / 7;

  switch (true) {
    case Math.floor(diffInWeeks) >= 1:
      return `${Math.floor(diffInWeeks)} week${Math.floor(diffInWeeks) > 1 ? 's' : ''} ago`;
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} day ago`;
    case Math.floor(diffInDays) > 1 && diffInDays < 7:
      return `${Math.floor(diffInDays)} days ago`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} hour${Math.floor(diffInHours) > 1 ? 's' : ''} ago`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} minute${Math.floor(diffInMinutes) > 1 ? 's' : ''} ago`;
    default:
      return "Just now";
  }
};