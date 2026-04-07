import { conf } from "@/site.config";

export function getReadingTime(body: string): string {
	const words = body.trim().split(/\s+/).length;
	const minutes = Math.max(1, Math.ceil(words / conf.blog.wordsPerMinute));
	return `${minutes} min read`;
}
