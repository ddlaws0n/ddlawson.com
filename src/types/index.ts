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
    Content: () => astroHTML.JSX.Element;
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

// Define interface for individual roles within a company
export interface Role {
  title: string;
  start_date: string; // Keep as string for now, parsing handled in component
  end_date: string; // Keep as string for now, parsing handled in component
  responsibilities?: string[]; // Optional array of key responsibilities
  achievements?: string[]; // Optional array of key achievements/highlights
}

// Define interface for the work experience entries
export interface WorkExperience {
  company: string;
  companyId: string; // Unique ID for targeting elements (e.g., 'wiz', 'veracode')
  location: string;
  logoUrl?: string | null; // Allow string URL or null.
  // summary: string; // Company-level summary might become less prominent or removed
  roles: Role[]; // Use the Role interface
}
