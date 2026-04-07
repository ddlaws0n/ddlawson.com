import type { APIRoute } from "astro";
import { conf } from "@/site.config";

export const GET: APIRoute = () => {
	const body = `User-agent: *
Allow: /

Sitemap: ${conf.site.origin}/sitemap-index.xml
`;

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
