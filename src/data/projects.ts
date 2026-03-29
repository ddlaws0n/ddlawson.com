export interface Project {
  title: string;
  tag: string;
  description: string;
  url?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    tag: 'AI / Tooling',
    title: 'LLM Prompt Patterns for B2B Teams',
    description:
      'A living reference for Customer Success and Solutions teams learning to get real work done with AI — beyond the hype, into the practical.',
    featured: true,
  },
  {
    tag: 'Cloud Security',
    title: 'CSPM Evaluation Playbook',
    description: 'How enterprise security teams should actually evaluate cloud posture tools.',
  },
  {
    tag: 'Writing System',
    title: 'The Daily 500',
    description: '500 words every day for a year. Tracking what changes when you write consistently.',
  },
];
