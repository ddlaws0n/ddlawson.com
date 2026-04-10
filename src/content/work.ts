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
					"Built and led the EMEA TAM function from scratch — hired the team, defined the engagement model, and aligned it with Sales and Product to grow platform adoption across enterprise accounts.",
				key_achievements: [
					"Grew team adoption targets by 25% in the first year.",
					"Introduced a shared reporting cadence that gave Sales and Product direct visibility into account health and expansion signals.",
				],
			},
			{
				title: "Senior Technical Account Manager",
				start_date: "2024-04",
				end_date: "2025-03",
				summary:
					"Ran a portfolio of enterprise accounts, translating cloud security risks into actionable remediation plans and feeding product gaps back to engineering.",
				key_achievements: [
					"Held a 95% satisfaction rating across the portfolio while identifying and resolving critical security risks for 3 major accounts.",
				],
			},
			{
				title: "Senior Customer Success Manager",
				start_date: "2023-11",
				end_date: "2024-04",
				summary:
					"Onboarded 17 enterprise customers in the first five months — built repeatable success plans, tracked activation milestones, and got teams to first value faster.",
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
					"Owned the global customer community and enablement programmes. Analysed support and feedback data to identify recurring pain points, then worked with Product to fix them.",
				key_achievements: [
					"Doubled community engagement through targeted content and events; launched a partner enablement portal that cut onboarding time for new partners.",
				],
			},
			{
				title: "Team Lead, Customer Success",
				start_date: "2021-05",
				end_date: "2022-04",
				summary:
					"Led a team of CSMs — set engagement playbooks, handled escalations, and focused on reducing churn in the mid-market segment.",
				key_achievements: [
					"Cut team admin overhead by 15% through process changes; reduced churn in the managed segment by 10%.",
				],
			},
			{
				title: "Senior Security Program Manager",
				start_date: "2021-05",
				end_date: "2021-05",
				summary:
					"Helped enterprise customers embed application security testing into their SDLCs — scoping rollout plans, configuring integrations, and tracking coverage improvements.",
			},
			{
				title: "Security Program Manager",
				start_date: "2020-03",
				end_date: "2021-05",
				summary:
					"Managed a portfolio of enterprise accounts through security testing cycles — ran programme reviews, tracked remediation progress, and pushed adoption of new scanning tools.",
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
					"Made redundant after one month when the role was cut — but walked away with a deep-dive in cloud security posture management.",
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
					"Ran website builds end-to-end for international school clients — scoped work, managed design and dev teams, and kept projects on time and budget.",
				key_achievements: [
					"Delivered 20+ website projects; improved estimation accuracy by 10% by introducing lightweight post-mortems.",
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
					"Brief consulting engagement after stepping back from the co-founder role — helped pick tooling and mapped out initial marketing channels.",
			},
			{
				title: "Co-founder, Technical Lead",
				start_date: "2017-02",
				end_date: "2018-09",
				summary:
					"Built the tech side of a travel startup from zero — designed and shipped the website and booking platform, set up hosting, and handled all infrastructure.",
				key_achievements: [
					"Launched the booking platform and public site on infrastructure that ran without incident through the first two travel seasons.",
				],
			},
		],
	},
];
