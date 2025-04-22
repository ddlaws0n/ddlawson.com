// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro/astro-jsx" />
/// <reference types="@astrojs/image/client" />
/// <reference types="vite/client" />
/// <reference types="../vendor/integration/types.d.ts" />

declare namespace App {
  interface Locals {
    errors?: Record<string, string>; // Add errors property for Astro Actions
  }
}
