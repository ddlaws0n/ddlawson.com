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

const CONFIG: Config = {
  // Basics
  name: 'David D Lawson',
  origin: 'https://ddlawson.com',
  basePathname: '/',
  trailingSlash: false,

  // SEO
  title: 'David D Lawson',
  description:
    '🚀 Customer Experience professional with a passion for people & tech (among other things). Welcome to my little corner of the internet.',
  language: 'en',

  // Appearance
  defaultTheme: 'system',

  // Analytics
  umamiId: 'a42e4c62-cd7c-48db-84c7-037290ac367c',

  // Blog
  words_per_minute: 200,
  dateFormatter: new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'GMT',
  }),

  // Navigation & Social
  navItems: [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'About',
      href: '/about',
    },
    // {
    //   name: 'Projects',
    //   href: '/projects',
    // },
    {
      name: 'Blog',
      href: '/blog',
    },
  ],

  socialShares: [
    {
      name: 'tabler:brand-linkedin',
      link: 'https://www.linkedin.com/in/ddlawson/',
      ariaLabel: 'LinkedIn',
    },
    {
      name: 'tabler:brand-github',
      link: 'https://www.github.com/ddlaws0n',
      ariaLabel: 'GitHub',
    },
    {
      name: 'tabler:brand-twitter',
      link: 'https://twitter.com/ddlaws0n',
      ariaLabel: 'Twitter',
    },
  ],
};

export const SITE = { ...CONFIG };
export const NAV = CONFIG.navItems;
export const SOCIAL = CONFIG.socialShares;
export const DATE_FORMATTER = CONFIG.dateFormatter;
