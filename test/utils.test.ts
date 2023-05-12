import { test, expect } from 'vitest';
import { getFormattedDate, trim } from '@/utils/utils';

test('getFormattedDate', () => {
  const date = new Date(Date.UTC(2023, 4, 12)); // May 12, 2023
  const formattedDate = getFormattedDate(date);
  // Depending on your locale and date formatter configuration, the expected date format might differ
  expect(formattedDate).toBe('12 May 2023');
});

test('trim', () => {
  const str = 'xxhello worldxx';
  const ch = 'x';
  const trimmedStr = trim(str, ch);
  expect(trimmedStr).toBe('hello world');
});

test('trim with no character to trim', () => {
  const str = 'hello world';
  const ch = 'x';
  const trimmedStr = trim(str, ch);
  expect(trimmedStr).toBe(str);
});

test('trim with default parameters', () => {
  const str = ' hello world ';
  const trimmedStr = trim(str);
  expect(trimmedStr).toBe('hello world');
});
