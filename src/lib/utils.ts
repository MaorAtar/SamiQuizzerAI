import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function roundIfNumber(value: string | number | null) {
  if (typeof value === "number") {
    return parseFloat(value.toFixed(2));
  } else if (typeof value === "string") {
    const num = parseFloat(value);
    const rounded = parseFloat(num.toFixed(2));
    return rounded;
  }
  return value;
}

export function convertDateToString(date: Date) : string {
  const timestampData = new Date(date);
  const year = timestampData.getFullYear();
  const month = timestampData.getMonth() + 1;
  const day = timestampData.getDay();

  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
}

export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = "Something went wrong"
) => {
  console.error(error);
  let errorMessage = defaultMessage;
  if (error instanceof Error && error.message.length < 100) {
    errorMessage = error.message;
  }
  return errorMessage;
};

export const PRICE_ID: string = "price_1Pda01JOxUcx6jSsHcgEYBFK";