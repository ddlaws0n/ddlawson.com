/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/image/client" />

interface Config {
  name: string;
  origin: string;
  basePathname: string;
  trailingSlash: boolean;
  title: string;
  description: string;
  language: string;
  textDirection: string;
  defaultTheme: string;
  umamiId: string;
  words_per_minute: number;
  dateFormatter: Intl.DateTimeFormat;
  navItems: Array<{ name: string; href: string }>;
  socialShares: Array<{ name: string; link: string; ariaLabel: string }>;
}

declare const CONFIG: Config;

declare const SITE: Config & { blog: undefined };
declare const NAV: Config['navItems'];
declare const SOCIAL: Config['socialShares'];
declare const DATE_FORMATTER: Config['dateFormatter'];

// interface ImportMetaEnv {
//     readonly : string;
//     readonly PUBLIC_POKEAPI: string;
//     // more env variables...
//   }

//   interface ImportMeta {
//     readonly env: ImportMetaEnv;
//   }
