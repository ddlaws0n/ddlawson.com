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
					"Leading the EMEA Technical Account Management team to deliver strategic guidance and drive platform adoption for enterprise clients. Focused on cross-functional collaboration with Sales and Product to ensure exceptional customer outcomes and retention.",
				key_achievements: [
					"Guided team to exceed adoption targets by 25% in the first year.",
					"Implemented a new reporting structure that significantly improved cross-functional visibility.",
				],
			},
			{
				title: "Senior Technical Account Manager",
				start_date: "2024-04",
				end_date: "2025-03",
				summary:
					"Managed a portfolio of strategic enterprise accounts, providing deep technical expertise on cloud security and the Wiz platform to drive meaningful risk reduction and act as a strong internal customer advocate.",
				key_achievements: [
					"Maintained a 95% customer satisfaction rating while identifying and mitigating critical security risks for 3 major clients.",
				],
			},
			{
				title: "Senior Customer Success Manager",
				start_date: "2023-11",
				end_date: "2024-04",
				summary:
					"Orchestrated the initial value realization and onboarding journey for 15+ enterprise customers, developing scalable success plans and monitoring critical engagement metrics.",
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
					"Directed the global customer community strategy and managed internal/external enablement programs. Actively analyzed customer feedback to drive cross-functional product and process improvements.",
				key_achievements: [
					"Achieved a 2x increase in community engagement through targeted programs and launched a comprehensive new partner enablement portal.",
				],
			},
			{
				title: "Team Lead, Customer Success",
				start_date: "2021-05",
				end_date: "2022-04",
				summary:
					"Mentored and led a high-performing team of Customer Success Managers, developing engagement best practices and managing complex account escalations.",
				key_achievements: [
					"Improved team efficiency by 15% through process optimization and reduced churn within the managed segment by 10%.",
				],
			},
			{
				title: "Senior Security Program Manager",
				start_date: "2021-05",
				end_date: "2021-05",
				summary:
					"Provided strategic application security guidance to enterprise customers, maximizing program maturity and facilitating seamless SDLC integrations.",
			},
			{
				title: "Security Program Manager",
				start_date: "2020-03",
				end_date: "2021-05",
				summary:
					"Managed a diverse enterprise portfolio, guiding clients through security testing, remediation efforts, and application security best practices.",
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
					"Executed a high-impact, short-term engagement focused on accelerating cloud security posture management and product adoption within strategic accounts.",
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
					"Orchestrated the end-to-end delivery of complex digital projects, acting as the primary client liaison while coordinating internal design, development, and QA teams.",
				key_achievements: [
					"Successfully delivered over 20 major website projects while improving project estimation accuracy by 10%.",
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
					"Advised on the foundational technology strategy for a bespoke travel startup, evaluating platform integrations and crafting the initial digital marketing roadmap.",
			},
			{
				title: "Co-founder, Technical Lead",
				start_date: "2017-02",
				end_date: "2018-09",
				summary:
					"Led all technical execution from concept to launch, architecting custom web platforms and managing IT infrastructure to support the company's initial growth phase.",
				key_achievements: [
					"Successfully launched the company website and booking platform on a scalable infrastructure.",
				],
			},
		],
	},
];
