import type { WorkExperience } from '@/types';
import wizLogo from '@/assets/icons/wiz.svg';
import veracodeLogo from '@/assets/icons/veracode.svg';
import laceworkLogo from '@/assets/icons/lacework.svg';
import finalsiteLogo from '@/assets/icons/finalsite.svg';

export const workExperienceData: WorkExperience[] = [
  {
    company: 'Wiz',
    companyId: 'wiz',
    location: 'London, United Kingdom',
    logoUrl: wizLogo.src,
    roles: [
      {
        title: 'Manager, Technical Account Management EMEA',
        start_date: '2025-02',
        end_date: 'Present',
        responsibilities: [
          'Led and mentored the EMEA TAM team.',
          'Developed strategic guidance frameworks for enterprise clients.',
          'Collaborated with Sales and Product teams to enhance customer outcomes.',
          'Ensured high levels of customer satisfaction and retention.',
        ],
        achievements: [
          'Guided team to exceed adoption targets by 25% in first year.',
          'Implemented new reporting structure improving cross-functional visibility.',
          'Recognized for leadership in driving strategic account growth.',
        ],
      },
      {
        title: 'Senior Technical Account Manager',
        start_date: '2024-04',
        end_date: '2025-03',
        responsibilities: [
          'Managed portfolio of strategic enterprise accounts.',
          'Provided deep technical expertise on cloud security & Wiz platform.',
          'Drove platform adoption and measurable risk reduction.',
          'Acted as a customer advocate internally.',
        ],
        achievements: [
          'Achieved 95% customer satisfaction rating across portfolio.',
          'Identified and mitigated critical security risks for 3 major clients.',
          'Contributed to key feature improvements based on customer feedback.',
        ],
      },
      {
        title: 'Senior Customer Success Manager',
        start_date: '2023-11',
        end_date: '2024-04',
        responsibilities: [
          'Focused on customer onboarding and initial value realization.',
          'Developed success plans for key accounts.',
          'Monitored customer health and engagement metrics.',
        ],
        achievements: ['Successfully onboarded 15+ enterprise customers.', 'Developed scalable onboarding resources.'],
      },
    ],
  },
  {
    company: 'Veracode',
    companyId: 'veracode',
    location: 'London, United Kingdom',
    logoUrl: veracodeLogo.src,
    roles: [
      {
        title: 'Manager, Customer Experience & Enablement',
        start_date: '2022-08',
        end_date: '2023-11',
        responsibilities: [
          'Directed global customer community strategy and execution.',
          'Managed internal and external enablement programs.',
          'Led cross-functional projects to improve customer journey.',
          'Analyzed customer feedback to drive product and process improvements.',
        ],
        achievements: [
          'Achieved a <strong>2x increase</strong> in community engagement through targeted programs.',
          'Launched new partner enablement portal.',
          'Streamlined customer feedback loop resulting in faster issue resolution.',
        ],
      },
      {
        title: 'Team Lead, Customer Success',
        start_date: '2021-05',
        end_date: '2022-04',
        responsibilities: [
          'Led and mentored a team of Customer Success Managers.',
          'Managed escalations and ensured timely resolution.',
          'Developed and implemented best practices for customer engagement.',
          'Reported on team performance and customer health metrics.',
        ],
        achievements: [
          'Improved team efficiency by 15% through process optimization.',
          'Reduced customer churn within managed segment by 10%.',
          'Coached team members leading to two internal promotions.',
        ],
      },
      {
        title: 'Senior Security Program Manager',
        start_date: '2021-05',
        end_date: '2021-05',
        responsibilities: [
          'Provided strategic security advice to enterprise customers.',
          'Helped customers integrate Veracode into their SDLC.',
          'Focused on maximizing customer value and security program maturity.',
        ],
        achievements: ['Completed intensive training and onboarding program.'],
      },
      {
        title: 'Security Program Manager',
        start_date: '2020-03',
        end_date: '2021-05',
        responsibilities: [
          'Managed a portfolio of enterprise customers.',
          'Guided customers on application security best practices.',
          'Facilitated security testing and remediation efforts.',
          'Conducted regular business reviews.',
        ],
        achievements: [
          'Consistently exceeded customer satisfaction targets.',
          'Helped multiple clients achieve significant risk reduction milestones.',
        ],
      },
    ],
  },
  {
    company: 'Lacework',
    companyId: 'lacework',
    location: 'London, United Kingdom',
    logoUrl: laceworkLogo.src,
    roles: [
      {
        title: 'Senior Customer Success Manager',
        start_date: '2022-04',
        end_date: '2022-05',
        responsibilities: [
          'Focused on accelerating product adoption within strategic accounts.',
          'Streamlined internal communication workflows.',
          'Provided expert guidance on cloud security posture management.',
        ],
        achievements: ['Completed high-impact, short-term engagement focused on specific customer goals.'],
      },
    ],
  },
  {
    company: 'Finalsite',
    companyId: 'finalsite',
    location: 'London, United Kingdom',
    logoUrl: finalsiteLogo.src,
    roles: [
      {
        title: 'Digital Project Manager',
        start_date: '2018-11',
        end_date: '2020-03',
        responsibilities: [
          'Managed end-to-end delivery of complex website projects for schools.',
          'Acted as primary point of contact for clients.',
          'Coordinated internal design, development, and QA teams.',
          'Managed project scope, budget, and timelines.',
        ],
        achievements: [
          'Successfully delivered over 20 major website projects.',
          'Maintained high client satisfaction scores throughout project lifecycles.',
          'Improved project estimation accuracy by 10%.',
        ],
      },
    ],
  },
  {
    company: 'Nila Expeditions',
    companyId: 'nila-expeditions',
    location: 'Turin, Italy',
    logoUrl: null,
    roles: [
      {
        title: 'Digital Consultant',
        start_date: '2018-09',
        end_date: '2018-11',
        responsibilities: [
          'Advised on technology strategy for a bespoke travel startup.',
          'Evaluated platform options and integration possibilities.',
          'Developed initial digital marketing roadmap.',
        ],
        achievements: ['Provided foundational tech strategy enabling company launch.'],
      },
      {
        title: 'Co-founder, Technical Lead',
        start_date: '2017-02',
        end_date: '2018-09',
        responsibilities: [
          'Led all technical aspects from concept to execution.',
          'Architected and developed custom web platforms (booking, CRM).',
          'Managed IT infrastructure and third-party integrations.',
          'Contributed to overall business strategy and operations.',
        ],
        achievements: [
          'Successfully launched company website and booking platform.',
          'Built scalable infrastructure supporting initial growth phase.',
        ],
      },
    ],
  },
];
