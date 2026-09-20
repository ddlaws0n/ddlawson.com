import finalsiteLogo from "@/assets/svg/finalsite.svg";
import laceworkLogo from "@/assets/svg/lacework.svg";
import nilaLogo from "@/assets/svg/nila.svg";
import veracodeLogo from "@/assets/svg/veracode.svg";
import wizLogo from "@/assets/svg/wiz.svg";
import type { WorkExperience } from "@/types";

export const workExperienceData: WorkExperience[] = [
	{
		company: "Wiz",
		companyId: "wiz",
		location: "London, United Kingdom",
		logoUrl: wizLogo.src,
		roles: [
			{
				title: "Manager, Technical Account Management EMEA",
				start_date: "2025-02",
				end_date: "Present",
				summary:
					"I built Wiz's EMEA technical account management team, hired the first team members, and set up how we worked with customers, Sales, and Product.",
				key_achievements: [
					"Consistently grew our NRR quarter-over-quarter.",
					"Put systems and tools in place to prioritise 80% of our work on the 20% of customers who need us most.",
					"Designed a cross-functional recurring account health reporting cadence, improving visibility into customer needs and enabling faster, more targeted support.",
				],
			},
			{
				title: "Senior Technical Account Manager",
				start_date: "2024-04",
				end_date: "2025-03",
				summary:
					"I worked with our most strategic enterprise customers in region to understand their cloud security risks and plan how to fix them. When the product fell short, I took that feedback to engineering.",
				key_achievements: [
					"Drove our fastest onboarding and adoption cycles, mentored teammates, and contributed to team best practices.",
				],
			},
			{
				title: "Senior Customer Success Manager",
				start_date: "2023-11",
				end_date: "2024-04",
				summary:
					"I helped 17 enterprise customers get started in my first five months, putting together plans for each team and tracking their progress through setup and early use.",
			},
		],
	},
	{
		company: "Veracode",
		companyId: "veracode",
		location: "London, United Kingdom",
		logoUrl: veracodeLogo.src,
		roles: [
			{
				title: "Manager, Customer Experience & Enablement",
				start_date: "2022-08",
				end_date: "2023-11",
				summary:
					"I ran the global customer community and training programmes. I used support requests and customer feedback to find recurring problems, then worked with Product to address them.",
				key_achievements: [
					"Doubled community engagement through content and events, and launched a training portal that helped new partners get started faster.",
				],
			},
			{
				title: "Team Lead, Customer Success",
				start_date: "2021-05",
				end_date: "2022-04",
				summary:
					"I led a customer success team working with mid-market customers. I helped the team plan their account work, handled escalations, and focused on why customers were leaving.",
				key_achievements: [
					"Reduced the team's admin work by 15% and customer churn in our segment by 10%.",
				],
			},
			{
				title: "Senior Security Program Manager",
				start_date: "2021-05",
				end_date: "2021-05",
				summary:
					"I helped enterprise customers add security testing to their development process, from planning the rollout and setting up integrations to checking what was being tested.",
			},
			{
				title: "Security Program Manager",
				start_date: "2020-03",
				end_date: "2021-05",
				summary:
					"I worked with enterprise customers on their security testing programmes, reviewing progress, tracking fixes, and helping teams use new scanning tools.",
			},
		],
	},
	{
		company: "Lacework",
		companyId: "lacework",
		location: "London, United Kingdom",
		logoUrl: laceworkLogo.src,
		roles: [
			{
				title: "Senior Customer Success Manager",
				start_date: "2022-04",
				end_date: "2022-05",
				summary:
					"My role was cut after one month as part of a redundancy round.",
			},
		],
	},
	{
		company: "Finalsite",
		companyId: "finalsite",
		location: "London, United Kingdom",
		logoUrl: finalsiteLogo.src,
		roles: [
			{
				title: "Digital Project Manager",
				start_date: "2018-11",
				end_date: "2020-03",
				summary:
					"I managed website projects for international schools, agreeing the scope, coordinating designers and developers, and keeping track of budgets and deadlines.",
				key_achievements: [
					"Delivered more than 20 websites and improved estimation accuracy by 10% by reviewing what went well and what took longer than expected.",
				],
			},
		],
	},
	{
		company: "Nila Expeditions",
		companyId: "nila-expeditions",
		location: "Turin, Italy",
		logoUrl: nilaLogo.src,
		roles: [
			{
				title: "Digital Consultant",
				start_date: "2018-09",
				end_date: "2018-11",
				summary:
					"After stepping back as co-founder, I stayed on briefly to help choose tools and plan where to focus the initial marketing.",
			},
			{
				title: "Co-founder, Technical Lead",
				start_date: "2017-02",
				end_date: "2018-09",
				summary:
					"I co-founded a travel business and built its website and booking platform. I also set up the hosting and looked after the infrastructure.",
				key_achievements: [
					"The website and booking platform ran without an infrastructure incident through our first two travel seasons.",
				],
			},
		],
	},
];
