import { DATE_FORMATTER } from '@/config';

const formatter =
  DATE_FORMATTER ||
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

/* eslint-disable no-mixed-spaces-and-tabs */
export const getFormattedDate = (date: Date) => (date ? formatter.format(date) : '');

export const trim = (str = '', ch?: string) => {
  let start = 0,
    end = str.length || 0;
  while (start < end && (ch ? str[start] === ch : str[start].trim() === '')) ++start;
  while (end > start && (ch ? str[end - 1] === ch : str[end - 1].trim() === '')) --end;
  return start > 0 || end < str.length ? str.substring(start, end) : str;
};
