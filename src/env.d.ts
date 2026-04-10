/// <reference types="astro/client" />

interface Umami {
	track(event: string, data?: Record<string, string | number | boolean>): void;
}

declare global {
	interface Window {
		umami?: Umami;
	}
}

interface ImportMetaEnv {
	readonly UMAMI_ID: string;
}

export interface ImportMeta {
	readonly env: ImportMetaEnv;
}
