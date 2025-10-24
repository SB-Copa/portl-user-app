import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculates the age from a birthdate string
 * @param birthdate - Date string in YYYY-MM-DD format
 * @returns The age in years
 */
export function calculateAge(birthdate: string): number {
  const birthDate = new Date(birthdate);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // Check if birthday hasn't occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  
  return age;
}

/**
 * Checks if a person is at least 18 years old
 * @param birthdate - Date string in YYYY-MM-DD format
 * @returns True if the person is 18 or older, false otherwise
 */
export function isAtLeast18(birthdate: string): boolean {
  return calculateAge(birthdate) >= 18;
}

