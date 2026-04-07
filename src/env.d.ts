interface ImportMetaEnv {
	readonly UMAMI_ID: string;
	readonly UMAMI_URL: string;
	readonly API_SECRET: string;
}

export interface ImportMeta {
	readonly env: ImportMetaEnv;
}
