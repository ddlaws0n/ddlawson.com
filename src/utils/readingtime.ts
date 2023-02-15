import { SITE } from '@/config.mjs';

export function getReadingTime(content: string) {
  if (!content) return;
  const clean = content.replace(/<\/?[^>]+(>|$)/g, '');
  const numberOfWords = clean.split(/\s/g).length;
  return Math.ceil(numberOfWords / SITE.words_per_minute);
}
