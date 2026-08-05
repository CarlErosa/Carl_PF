export interface Project {
  slug: string;
  title: string;
  description: string;
  role: string;
  liveUrl: string;
  githubUrl: string;
  key: string;
}

export const projectStacks: Record<string, string[]> = {
  Verde: ['Next.js', 'PostgreSQL', 'API Integration', 'Node.js'],
  ADPH: ['Node.js', 'PostgreSQL', 'CI/CD', 'Docker'],
  BatchMail: ['Node.js', 'Automation', 'PostgreSQL'],
  BlockBayan: ['Next.js', 'Solidity', 'Web3', 'TypeScript'],
  ICPEP: ['React', 'TypeScript', 'Tailwind'],
  LOGISTIQ: ['React', 'Node.js', 'PostgreSQL'],
  Weathering: ['Next.js', 'React', 'API Integration'],
  Algohub: ['React', 'TypeScript', 'Next.js'],
};

export const projects: Project[] = [
  {
    slug: 'verde',
    title: 'Verde',
    description:
      'ESG platform for tracking carbon emissions in construction. 1st Runner-Up, PUP Uthak Hackathon. Built real-time data processing and API integration.',
    role: 'Fullstack Engineer',
    liveUrl: 'https://verdepm.vercel.app/',
    githubUrl: 'https://github.com/marvinjameserosa/verdepm',
    key: 'Verde',
  },
  {
    slug: 'adph-registration-platform',
    title: 'ADPH Registration Platform',
    description:
      'National registration platform for Arduino Day Philippines handling 50,000+ requests and 1,000+ concurrent users. Full CI/CD lifecycle, query optimization, production rollout.',
    role: 'Infrastructure & Backend Engineer',
    liveUrl: 'https://join.arduinodayphilippines.cc/',
    githubUrl: '#',
    key: 'ADPH',
  },
  {
    slug: 'batchmail',
    title: 'BatchMail',
    description:
      'Automated bulk email system for 1,000+ users. Batch processing and automation workflows.',
    role: 'Backend Engineer',
    liveUrl: 'https://batchmailbeta.vercel.app/',
    githubUrl: 'https://github.com/marvinjameserosa/batchmail',
    key: 'BatchMail',
  },
  {
    slug: 'blockbayan',
    title: 'BlockBayan',
    description:
      'Blockchain-based donation tracker for transparent transactions. Top 8, PUP ICTO Hackathon.',
    role: 'Fullstack Engineer',
    liveUrl: 'https://blockbayan.vercel.app/',
    githubUrl: '#',
    key: 'BlockBayan',
  },
  {
    slug: 'icpep-ncr-website',
    title: 'ICPEP NCR Website',
    description:
      'A modern CRM interface for ICPEP NCR to manage member records, events, and organizational operations with an intuitive UX for non-technical users.',
    role: 'UI/UX Designer',
    liveUrl: 'https://icpepsencr.vercel.app/',
    githubUrl: 'https://github.com/icpepsepupm/ICPEP-NCR_CRM-Website',
    key: 'ICPEP',
  },
  {
    slug: 'logistiq',
    title: 'LOGISTIQ',
    description:
      'A logistics management dashboard optimizing delivery operations through real-time tracking, route insights, and automated status updates.',
    role: 'Fullstack Developer',
    liveUrl: 'https://logistiq.onrender.com/',
    githubUrl: 'https://github.com/red-sakai/LogistIQ',
    key: 'LOGISTIQ',
  },
  {
    slug: 'weathering-with-us',
    title: 'Weathering With Us',
    description:
      'A weather companion app that personalizes recommendations based on real-time conditions — what to wear, when to leave, how to prepare.',
    role: 'Fullstack Developer',
    liveUrl: 'https://weatheringwithus.vercel.app/',
    githubUrl: 'https://github.com/CarlErosa/Weathering-With-Us',
    key: 'Weathering',
  },
  {
    slug: 'algohub',
    title: 'Algohub',
    description:
      'A centralized learning platform for algorithms and data structures with interactive visualizations and step-by-step animations.',
    role: 'Fullstack Developer',
    liveUrl: 'https://algohub-dsa.vercel.app/learn',
    githubUrl: 'https://github.com/red-sakai/Algohub',
    key: 'Algohub',
  },
];
