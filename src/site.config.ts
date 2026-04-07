import type { SiteConfig } from "@/types";

const SITE_NAME = "David D Lawson";
const SITE_EMAIL = "work@ddlawson.com";
const SITE_DOMAIN = "https://ddlawson.com";

const isProd = import.meta.env.PROD;

const getOrigin = () => {
	if (isProd) return SITE_DOMAIN;
	return "http://localhost:4321";
};

export const conf: SiteConfig = {
	site: {
		name: SITE_NAME,
		email: SITE_EMAIL,
		origin: getOrigin(),
		basePathname: "/",
		trailingSlash: false,
		language: "en-GB",
	},
	seo: {
		title: "David D Lawson | B2B SaaS Customer Experience Professional",
		description:
			"🚀 Customer Experience professional with a passion for people & tech.",
	},
	analytics: {
		umamiId: import.meta.env.UMAMI_ID,
		umamiUrl: import.meta.env.UMAMI_URL,
	},
	blog: {
		wordsPerMinute: 200,
		dateFormatter: new Intl.DateTimeFormat("en-GB", {
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: "GMT",
		}),
	},
	nav: [
		{ name: "Home", href: "/" },
		{ name: "Work", href: "/work" },
		{ name: "Writing", href: "/writing" },
		{ name: "Contact", href: "/contact" },
	],
	social: [
		{ name: "tabler:mail", link: `mailto:${SITE_EMAIL}`, ariaLabel: "Email" },
		{
			name: "tabler:brand-linkedin",
			link: "https://www.linkedin.com/in/ddlawson/",
			ariaLabel: "LinkedIn",
		},
		{
			name: "tabler:brand-github",
			link: "https://www.github.com/ddlaws0n",
			ariaLabel: "GitHub",
		},
		{ name: "tabler:brand-x", link: "https://x.com/ddlaws0n", ariaLabel: "X" },
	],
};

export const nav = conf.nav;
export const social = conf.social;
export const dt = conf.blog.dateFormatter;
