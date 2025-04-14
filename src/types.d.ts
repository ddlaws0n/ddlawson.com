export interface Config {
  name: string;
  origin: string;
  basePathname: string;
  trailingSlash: boolean;
  title: string;
  description: string;
  language: string;
  defaultTheme: string;
  umamiId: string;
  words_per_minute: number;
  dateFormatter: Intl.DateTimeFormat;
  navItems: Array<{ name: string; href: string }>;
  socialShares: Array<{ name: string; link: string; ariaLabel: string }>;
}

export interface ImportMetaEnv {
  readonly NODE_ENV: 'development' | 'production' | 'test';
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Define interface for the blog collection schema that matches content/config.ts
export interface BlogSchema {
  title: string;
  author: string;
  description: string;
  publishDate: Date;
  lastUpdatedDate?: Date;
  image?: string;
  draft: boolean;
}

// Define interface for Astro content collection entries
export interface ContentEntryType<T> {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: T;
  render: () => Promise<{
    Content: () => astroHTML;
    headings: Array<{ depth: number; slug: string; text: string }>;
  }>;
}

// Define BlogPost type based on the content collection entry
export type BlogPost = ContentEntryType<BlogSchema>;

// Legacy Post interface (keeping for backward compatibility)
export interface Post {
  // Core metadata
  id: string;
  slug: string;
  title: string;
  description?: string;
  author?: string;

  // Content
  body?: string;
  excerpt?: string;

  // Publishing metadata
  publishDate: Date;
  draft?: boolean;
  readingTime?: number;

  // Categorization
  category?: string;
  tags?: Array<string>;

  // SEO/URLs
  image?: string;
  canonical?: string | URL;
  permalink?: string;

  status?: 'published' | 'draft' | 'archived';
  lastUpdatedDate?: Date;
  lastUpdatedBy?: string;
  lastUpdatedByName?: string;
}

export interface MetaSEO {
  title?: string;
  description?: string;
  image?: string;

  canonical?: string | URL;
  noindex?: boolean;
  nofollow?: boolean;

  ogTitle?: string;
  ogType?: 'website' | 'article' | 'profile' | 'book';
}
