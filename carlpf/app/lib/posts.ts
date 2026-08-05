export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date?: string;
  url?: string;
  published: boolean;
}

export const posts: Post[] = [
  {
    slug: 'how-we-built-a-national-registration-platform',
    title: 'How we built a national registration platform',
    excerpt:
      'Placeholder — write about the architecture, CI/CD pipeline, and query optimization behind Arduino Day Philippines.',
    published: false,
  },
  {
    slug: 'engineering-for-real-traffic-not-demos',
    title: 'Engineering for real traffic, not demos',
    excerpt:
      'Placeholder — notes on keeping systems reliable under load and the difference between demos and production.',
    published: false,
  },
  {
    slug: 'from-hackathon-to-shipped',
    title: 'From hackathon to shipped',
    excerpt:
      'Placeholder — lessons from building and shipping and developing full-stack applications.',
    published: false,
  },
];
