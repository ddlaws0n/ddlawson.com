const CONFIG = {
  name: 'David D Lawson',

  origin: 'https://ddlawson.com',
  basePathname: '/',
  trailingSlash: false,

  title: 'David D Lawson',
  description: '🚀 Customer Experience professional with a passion for people & tech',

  defaultTheme: 'system',

  umamiId: 'a42e4c62-cd7c-48db-84c7-037290ac367c',

  language: 'en',
  textDirection: 'ltr',

  dateFormatter: new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'GMT',
  }),

  navItems: [
    {
      name: 'Home',
      href: '/',
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
      link: 'https://www.github.com/DDiran',
      ariaLabel: 'GitHub',
    },
    {
      name: 'tabler:brand-twitter',
      link: 'https://twitter.com/ddlaws0n',
      ariaLabel: 'Twitter',
    },
  ],
};

export const SITE = { ...CONFIG, blog: undefined };
export const NAV = CONFIG.navItems;
export const SOCIAL = CONFIG.socialShares;
export const DATE_FORMATTER = CONFIG.dateFormatter;
