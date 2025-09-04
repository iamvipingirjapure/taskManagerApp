import { format } from 'date-fns';

/**
 * Centralized date formatting function
 * @param date - Date or string
 * @param pattern - date-fns format pattern
 * @returns formatted string
 */
export function fmt(date: Date | string | undefined, pattern = 'MMM dd, yyyy') {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, pattern);
}
