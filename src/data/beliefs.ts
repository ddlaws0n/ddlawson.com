export interface TitlePart {
  text: string;
  accent?: boolean;
}

export interface Belief {
  number: string;
  titleParts: TitlePart[];
  body: string;
}

export const beliefs: Belief[] = [
  {
    number: '01',
    titleParts: [{ text: 'Technology is only as good as the ' }, { text: 'human who wields it', accent: true }],
    body: "The best security platform in the world fails if the team using it doesn't trust it. My job is that trust layer — helping real teams adopt real tools that keep real companies safe.",
  },
  {
    number: '02',
    titleParts: [{ text: "AI won't replace curiosity. It will " }, { text: 'amplify it', accent: true }],
    body: "We're in the most interesting moment in software history. I experiment with LLMs constantly — not to automate, but to think faster and build weirder, better things.",
  },
  {
    number: '03',
    titleParts: [{ text: 'Sharing openly', accent: true }, { text: ' is a compounding advantage' }],
    body: 'Every post, every project, every half-baked idea written down creates a trail that compounds. The internet is the most leveraged writing desk ever built.',
  },
  {
    number: '04',
    titleParts: [{ text: 'The best customer success is ' }, { text: 'genuinely caring', accent: true }],
    body: 'Not playbooks, not QBRs. Radical investment in understanding what the customer is actually trying to do — and removing every obstacle between here and there.',
  },
];
