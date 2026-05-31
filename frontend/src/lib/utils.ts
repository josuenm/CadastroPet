import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateOnly(value: string) {
  const [year, month, day] = value.split("T")[0].split("-")
  if (!year || !month || !day) return value
  return `${day}/${month}/${year}`
}
