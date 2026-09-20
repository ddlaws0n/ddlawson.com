import favicon52weeks from "@/assets/img/favicon-52weeks.svg";
import faviconClaudeAteMyJob from "@/assets/img/favicon-claudeatemyjob.svg";
import faviconCsg from "@/assets/img/favicon-csg.png";
import faviconWhoNeedsYou from "@/assets/img/favicon-whoneedsyou.svg";

type Project = {
	tag: string;
	title: string;
	desc: string;
	href?: string;
	faviconUrl?: string;
	invertFavicon?: boolean;
};

export const projects: Project[] = [
	{
		tag: "Project",
		title: "customersuccess.guide",
		desc: "AI tools for people working in customer success.",
		href: "https://customersuccess.guide",
		faviconUrl: faviconCsg.src,
	},
	{
		tag: "Register",
		title: "claudeatemyjob",
		desc: "Tracking layoffs publicly linked to AI, with original sources and notes on how strong the evidence is.",
		href: "https://claudeatemyjob.com",
		faviconUrl: faviconClaudeAteMyJob.src,
	},
	{
		tag: "Experiment",
		title: "52weeks",
		desc: "A simple planner with one row for each week of the year.",
		href: "https://52weeks.lawson.dev",
		faviconUrl: favicon52weeks.src,
	},
	{
		tag: "Experiment",
		title: "Who Needs You",
		desc: "Which customers need your attention? An experiment with Jev and 1,000 synthetic accounts.",
		href: "https://whoneedsyou.vercel.app/",
		faviconUrl: faviconWhoNeedsYou.src,
	},
	// {
	//   tag: "Dashboard",
	//   title: "Security Posture",
	//   desc: "Customer-facing security metrics visualization.",
	// },
	// {
	//   tag: "Experiment",
	//   title: "AI Workflows",
	//   desc: "Exploring LLM-powered automation for customer success.",
	// },
];
