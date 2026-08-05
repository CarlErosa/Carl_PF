export interface Hackathon {
  slug: string;
  name: string;
  role: string;
  year: string;
  result: string;
  image: string;
}

export const hackathons: Hackathon[] = [
  {
    slug: 'uthak-ang-puhunan',
    name: 'Uthak ang Puhunan',
    role: 'Fullstack Developer',
    year: '2025',
    result: '1st Runner Up',
    image: '/assets/lanyard/uthak.jpg',
  },
  {
    slug: 'icto-hackathon',
    name: 'ICTO Hackathon',
    role: 'Frontend Developer',
    year: '2025',
    result: 'Finalist',
    image: '/assets/lanyard/icto.jpg',
  },
  {
    slug: 'bpi-datawave',
    name: 'BPI Datawave',
    role: 'Developer & Researcher',
    year: '2025',
    result: 'Participant',
    image: '/assets/lanyard/bpi.png',
  },
];
