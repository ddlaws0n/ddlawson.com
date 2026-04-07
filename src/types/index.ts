export interface SiteConfig {
	site: {
		name: string;
		email: string;
		origin: string;
		basePathname: string;
		trailingSlash: boolean;
		language: string;
		defaultTheme?: string;
	};
	seo: {
		title: string;
		description: string;
	};
	analytics: {
		umamiId: string;
		umamiUrl: string;
	};
	blog: {
		wordsPerMinute: number;
		dateFormatter: Intl.DateTimeFormat;
	};
	nav: Array<{ name: string; href: string }>;
	social: Array<{ name: string; link: string; ariaLabel: string }>;
}

export interface Role {
	title: string;
	start_date: string;
	end_date: string;
	summary: string;
	key_achievements?: string[];
}

export interface WorkExperience {
	company: string;
	companyId: string;
	location: string;
	logoUrl: string | null;
	roles: Role[];
}
