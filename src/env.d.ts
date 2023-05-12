/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/image/client" />

// export interface ImportMetaEnv {
//     readonly : string;
//     readonly PUBLIC_POKEAPI: string;
//     // more env variables...
//   }

//   export interface ImportMeta {
//     readonly env: ImportMetaEnv;
//   }

export interface Post {
  id: string;
  slug: string;

  publishDate: Date;
  title: string;
  description?: string;

  image?: string;

  canonical?: string | URL;
  permalink?: string;

  draft?: boolean;

  excerpt?: string;
  category?: string;
  tags?: Array<string>;
  author?: string;

  Content: unknown;
  content?: string;

  readingTime?: number;
}

export interface MetaSEO {
  title?: string;
  description?: string;
  image?: string;

  canonical?: string | URL;
  noindex?: boolean;
  nofollow?: boolean;

  ogTitle?: string;
  ogType?: string;
}
