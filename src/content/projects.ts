type Project = {
	tag: string;
	title: string;
	desc: string;
	href?: string;
};

export const projects: Project[] = [
	{
		tag: "Project",
		title: "customersuccess.guide",
		desc: "AI-powered tools that make customer success professionals' lives easier.",
		href: "https://customersuccess.guide",
	},
	{
		tag: "Experiment",
		title: "52weeks",
		desc: "A minimal week-number planner — fifty-two rows, no clutter.",
		href: "https://52weeks.lawson.dev",
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
