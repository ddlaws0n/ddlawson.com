// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro/astro-jsx" />
/// <reference types="@astrojs/image/client" />
/// <reference types="vite/client" />
/// <reference types="../vendor/integration/types.d.ts" />

// Define the possible shapes for errors returned by the contact form action
type ContactFormErrors =
  | {
      name?: string[] | undefined;
      email?: string[] | undefined;
      message?: string[] | undefined;
      captcha?: string[] | undefined; // Added captcha here for Zod validation
      form?: undefined; // Ensure 'form' is not present in this case
    }
  | { form: string; name?: undefined; email?: undefined; message?: undefined; captcha?: undefined } // General form error
  | { captcha: string; name?: undefined; email?: undefined; message?: undefined; form?: undefined }; // Specific captcha error (outside Zod)

declare namespace App {
  interface Locals {
    // Used by Astro Actions to pass validation errors back to the page
    errors?: ContactFormErrors;
    // Define the runtime property which holds server-side environment variables
    runtime: {
      env: ProcessEnv; // Use the ProcessEnv interface defined below
    };
  }
}

// Define types for environment variables accessed via import.meta.env (client-side)
// Only variables prefixed with PUBLIC_ are exposed here by Vite/Astro
interface ImportMetaEnv {
  readonly PUBLIC_CAPTCHA_SITE_KEY: string;

  // Standard Vite/Astro variables
  readonly BASE_URL: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly SSR: boolean;
}

// Define types for environment variables accessed via Astro.locals.runtime.env or process.env (server-side)
// Note: Astro recommends Astro.locals.runtime.env for accessing server-side variables
// These types help ensure variables are correctly accessed in server-side code (e.g., actions)
interface ProcessEnv {
  readonly NODE_ENV: 'development' | 'production' | 'test';

  // Server-side secrets and config
  readonly CAPTCHA_SECRET_KEY: string;
  readonly N8N_WEBHOOK_URL: string;
  readonly N8N_WEBHOOK_SECRET: string;
  readonly UPSTASH_REDIS_REST_URL: string;
  readonly UPSTASH_REDIS_REST_TOKEN: string;
}

// Augment ProcessEnv interface for Node.js environment
// This merges the ProcessEnv definition above with the global NodeJS.ProcessEnv
declare namespace NodeJS {
  // The interface merging happens automatically in TypeScript
}

// Augment ImportMeta interface for client-side environment variables
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
