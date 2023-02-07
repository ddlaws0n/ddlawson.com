const CONFIG = {
  name: 'David D Lawson',

  origin: 'https://ddlawson.com',
  basePathname: '/',
  trailingSlash: false,

  title: 'David D Lawson',
  description: '🚀 Customer Experience professional with a passion for people & tech',

  defaultTheme: 'system', // Values: "system" | "light" | "dark" | "light:only" | "dark:only"

  umamiId: 'a42e4c62-cd7c-48db-84c7-037290ac367c',

  language: 'en',
  textDirection: 'ltr',

  dateFormatter: new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'GMT',
  }),

  blog: {
    disabled: false,
    postsPerPage: 4,

    post: {
      permalink: '/%slug%', // Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
      noindex: false,
      disabled: false,
    },

    list: {
      pathname: 'blog', // Blog main path, you can change this to "articles" (/articles)
      noindex: false,
      disabled: false,
    },

    category: {
      pathname: 'category', // Category main path /category/some-category
      noindex: true,
      disabled: false,
    },

    tag: {
      pathname: 'tag', // Tag main path /tag/some-tag
      noindex: true,
      disabled: false,
    },
  },
};

export const SITE = { ...CONFIG, blog: undefined };
export const BLOG = CONFIG.blog;
export const DATE_FORMATTER = CONFIG.dateFormatter;
