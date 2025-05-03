import { DATE_FORMATTER } from '@/config';
import { SITE } from '@/config.js';

const formatter =
  DATE_FORMATTER ||
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

export const getFormattedDate = (date: Date) => (date ? formatter.format(date) : '');

export const trim = (str = '', ch?: string) => {
  let start = 0,
    end = str.length || 0;
  while (start < end && (ch ? str[start] === ch : str[start].trim() === '')) ++start;
  while (end > start && (ch ? str[end - 1] === ch : str[end - 1].trim() === '')) --end;
  return start > 0 || end < str.length ? str.substring(start, end) : str;
};

export function getReadingTime(content: string) {
  if (!content) return;
  const clean = content.replace(/<\/?[^>]+(>|$)/g, '');
  const numberOfWords = clean.split(/\s/g).length;
  return Math.ceil(numberOfWords / SITE.words_per_minute);
}

// --- Timeline Item Helpers ---

// Months array for date parsing
export const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

/**
 * Parses a date string (e.g., "YYYY-MM" or "Present") into a Date object or Infinity.
 * Returns a very early date (1970-01-01) as a fallback if parsing fails.
 * @param dateStr The date string to parse.
 * @returns A Date object, Infinity (for "Present"), or a fallback Date.
 */
export function parseDate(dateStr: string): Date | typeof Infinity {
  if (dateStr.toLowerCase() === 'present') {
    return Infinity;
  }

  try {
    // Attempt to parse YYYY-MM directly. Note: new Date('YYYY-MM') creates a UTC date.
    // For consistency, we might want to ensure all dates are treated similarly (e.g., all UTC).
    const date = new Date(dateStr);
    // Check if the date is valid
    if (!isNaN(date.getTime())) {
      return date;
    }
  } catch (e) {
    console.error(`Error parsing date string "${dateStr}":`, e);
  }

  // Return a very early date as a fallback if parsing fails
  console.warn(`Could not parse date string: "${dateStr}". Using fallback.`);
  return new Date(0); // Represents 1970-01-01 UTC
}

/**
 * Generates a placeholder string (typically the first initial) for a company logo.
 * @param companyName The name of the company.
 * @returns The uppercase first letter of the company name.
 */
export function getLogoPlaceholder(companyName: string): string {
  if (!companyName) return '?'; // Handle empty string case
  return companyName.charAt(0).toUpperCase();
}
