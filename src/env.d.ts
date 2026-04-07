/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly UMAMI_ID: string;
	readonly UMAMI_URL: string;
}

export interface ImportMeta {
	readonly env: ImportMetaEnv;
}
