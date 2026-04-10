/// <reference types="@cloudflare/workers-types" />

interface Env {
	UMAMI_UPSTREAM: string;
}

const ALLOWED_PATHS = new Set(["script.js", "api/send"]);

export const onRequest: PagesFunction<Env> = async ({
	request,
	env,
	params,
}) => {
	if (!env.UMAMI_UPSTREAM) {
		return new Response("UMAMI_UPSTREAM not configured", { status: 500 });
	}

	const pathParts = Array.isArray(params.path)
		? params.path
		: [params.path ?? ""];
	const subpath = pathParts.join("/");

	if (!ALLOWED_PATHS.has(subpath)) {
		return new Response("Not Found", { status: 404 });
	}

	if (
		subpath === "script.js" &&
		request.method !== "GET" &&
		request.method !== "HEAD"
	) {
		return new Response("Method Not Allowed", { status: 405 });
	}
	if (subpath === "api/send" && request.method !== "POST") {
		return new Response("Method Not Allowed", { status: 405 });
	}

	const upstreamBase = env.UMAMI_UPSTREAM.replace(/\/$/, "");
	const url = new URL(request.url);
	const targetUrl = `${upstreamBase}/${subpath}${url.search}`;

	const clientIp = request.headers.get("cf-connecting-ip") ?? "";
	const existingXff = request.headers.get("x-forwarded-for");
	const forwardedFor =
		existingXff && clientIp
			? `${existingXff}, ${clientIp}`
			: existingXff || clientIp;

	const upstreamHeaders = new Headers();
	const copy = (name: string) => {
		const value = request.headers.get(name);
		if (value) upstreamHeaders.set(name, value);
	};
	copy("content-type");
	copy("user-agent");
	copy("accept-language");
	copy("referer");
	if (forwardedFor) upstreamHeaders.set("x-forwarded-for", forwardedFor);
	if (clientIp) upstreamHeaders.set("cf-connecting-ip", clientIp);

	const body =
		request.method === "GET" || request.method === "HEAD"
			? undefined
			: await request.arrayBuffer();

	const upstreamResponse = await fetch(targetUrl, {
		method: request.method,
		headers: upstreamHeaders,
		body,
		redirect: "follow",
	});

	const responseHeaders = new Headers();
	const resContentType = upstreamResponse.headers.get("content-type");
	if (resContentType) responseHeaders.set("content-type", resContentType);

	if (subpath === "script.js" && upstreamResponse.ok) {
		responseHeaders.set(
			"cache-control",
			"public, max-age=3600, s-maxage=86400",
		);
	} else {
		responseHeaders.set("cache-control", "no-store");
	}

	return new Response(upstreamResponse.body, {
		status: upstreamResponse.status,
		statusText: upstreamResponse.statusText,
		headers: responseHeaders,
	});
};
