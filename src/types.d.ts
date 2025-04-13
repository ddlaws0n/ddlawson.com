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
  words_per_minute: number & { __brand: 'PositiveInteger' };
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

export interface Post {
  // Core metadata
  id: string;
  slug: string;
  title: string;
  description?: string;
  author?: string;

  // Content
  Content: astro.MarkdownInstance<{}>;
  content?: string;
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
