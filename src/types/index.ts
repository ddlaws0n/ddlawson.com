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

export interface MetaSEO {
	title?: string;
	description?: string;
	image?: string;
	canonical?: string | URL;
	noindex?: boolean;
	nofollow?: boolean;
	ogTitle?: string;
	ogType?: "website" | "article" | "profile" | "book";
}
