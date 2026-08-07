export interface Certification {
  slug: string;
  name: string;
  issuer: string;
  year: string;
  category: string;
  image: string;
}

export const certifications: Certification[] = [
  {
    slug: 'google-it-support',
    name: 'Google IT Support Professional',
    issuer: 'Google',
    year: '2025',
    category: 'IT Support',
    image: '/certs/Google_IT_Support_Professional_Cert.jpg',
  },
  {
    slug: 'google-cloud-computing-fundamentals',
    name: 'Google Cloud Computing Fundamentals',
    issuer: 'Google',
    year: '2025',
    category: 'Cloud',
    image: '/certs/Google_Cloud_Computing_Fundamentals.png',
  },
  {
    slug: 'introduction-to-cybersecurity',
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    year: '2025',
    category: 'Cybersec',
    image: '/certs/netacad-introtocybersec_page-0001.jpg',
  },
  {
    slug: 'introduction-to-zero-trust',
    name: 'Introduction to Zero Trust',
    issuer: 'Microsoft',
    year: '2025',
    category: 'Cybersec',
    image: '/certs/microsoft_introduction_to_zero_trust.png',
  },
  {
    slug: 'claude-101',
    name: 'Claude 101',
    issuer: 'Anthropic',
    year: '2026',
    category: 'AI',
    image: '/certs/Claude_101.jpg',
  },
  {
    slug: 'claude-code-101',
    name: 'Claude Code 101',
    issuer: 'Anthropic',
    year: '2026',
    category: 'AI',
    image: '/certs/Claude_Caude_101.jpg',
  },
  {
    slug: 'introduction-to-sql',
    name: 'Introduction to SQL',
    issuer: 'DataCamp',
    year: '2025',
    category: 'Data',
    image: '/certs/datacamp-introtosql_page-0001.jpg',
  },
  {
    slug: 'introduction-to-data-literacy',
    name: 'Introduction to Data Literacy',
    issuer: 'DataCamp',
    year: '2025',
    category: 'Data',
    image: '/certs/datacamp-introductiontodataliteracy_page-0001.jpg',
  },
];

export const featuredCertSlugs = [
  'google-it-support',
  'introduction-to-cybersecurity',
  'google-cloud-computing-fundamentals',
];

export const certCategories = ['Cloud', 'Cybersec', 'AI', 'Data', 'IT Support'];
