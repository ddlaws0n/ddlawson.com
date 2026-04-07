import type { SiteConfig } from "@/types";

const meta: SiteConfig = {
	// Basics
	name: "David D Lawson",
	origin: "https://ddlawson.com",
	basePathname: "/",
	trailingSlash: false,

	// SEO
	title: "David D Lawson | B2B SaaS Customer Experience Professional",
	description:
		"🚀 Customer Experience professional with a passion for people & tech (among other things). Welcome to my little corner of the internet.",
	language: "en-Gb",

	// Analytics
	umamiId: "9b7d8646-6556-4e06-8cb1-c6114fb4828d",

	// Blog
	words_per_minute: 200,
	dateFormatter: new Intl.DateTimeFormat("en-GB", {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "GMT",
	}),

	// Navigation & Social
	navItems: [
		{
			name: "Home",
			href: "/",
		},
		{
			name: "Work",
			href: "/work",
		},
		{
			name: "Writing",
			href: "/writing",
		},
		{
			name: "Contact",
			href: "/contact",
		},
	],

	socialShares: [
		{
			name: "tabler:mail",
			link: "mailto:work@ddlawson.com",
			ariaLabel: "Email",
		},
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
		{
			name: "tabler:brand-x",
			link: "https://x.com/ddlaws0n",
			ariaLabel: "X",
		},
	],
};

export const conf = { ...meta };
export const nav = meta.navItems;
export const social = meta.socialShares;
export const dt = meta.dateFormatter;
