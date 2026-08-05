export interface ExperienceRole {
  slug: string;
  org: string;
  title: string;
  period: string;
  duration?: string;
  points?: string[];
}

export const experiences: ExperienceRole[] = [
  {
    slug: 'director-of-engineering',
    org: 'CyberPH',
    title: 'Director of Engineering',
    period: '2026–Present',
    points: [
      'Led architecture planning and execution of multidisciplinary software and hardware projects.',
      'Standardized development workflows, improving code maintainability and scalability across teams.',
    ],
  },
  {
    slug: 'research-and-development-team-member',
    org: 'CyberPH',
    title: 'Research and Development Team Member',
    period: 'Sep 2025 – Present',
    duration: '3 mos',
  },
  {
    slug: 'web-infrastructure-specialist',
    org: 'Arduino Day Philippines National',
    title: 'Web Infrastructure Specialist',
    period: '2025–2026',
    points: [
      'Engineered and deployed a national registration platform handling 25,000+ requests and 1,000+ concurrent users.',
      'Designed CI/CD pipelines including staging and production environments for controlled releases.',
    ],
  },
  {
    slug: 'vice-president-for-technology',
    org: 'ICPEP Student Edition – PUP Manila',
    title: 'Vice President For Technology',
    period: 'Sep 2025 – Present',
    duration: '3 mos',
    points: [
      "Oversaw the organization's technological initiatives and digital projects, ensuring that technology solutions effectively supported organizational goals.",
      'Led technical teams, coordinated development efforts, and promoted innovation among Computer Engineering students through technology-driven programs and activities.',
    ],
  },
  {
    slug: 'head-of-technology-department',
    org: 'ICPEP Student Edition – PUP Manila',
    title: 'Head of Technology Department',
    period: 'Apr 2024 – Sep 2025',
    duration: '1 yr 6 mos',
    points: [
      'Managed technology-related projects and supervised the execution of technical initiatives within the organization.',
      "Worked closely with department members to develop digital solutions, organize technical events, and strengthen the organization's technological capabilities.",
    ],
  },
  {
    slug: 'iot-co-head',
    org: 'Google Developer Groups on Campus PUP',
    title: 'IoT Co-head',
    period: 'Jan 2026 – Present',
    points: [
      'Helped lead the Internet of Things (IoT) community by organizing learning sessions, workshops, and technical activities.',
      'Collaborated with student developers and industry professionals to promote hands-on learning and encourage innovation through connected technologies.',
    ],
  },
  {
    slug: 'iot-learning-head',
    org: 'Google Developer Groups on Campus PUP',
    title: 'IoT Learning Head',
    period: 'Sep 2025 – Present',
    duration: '3 mos',
    points: [
      'Designed and facilitated educational initiatives focused on IoT concepts, embedded systems, and smart technologies.',
      'Supported members in developing technical skills through workshops, mentorship, and project-based learning experiences.',
    ],
  },
  {
    slug: 'cybersecurity-cadet',
    org: 'Google Developer Groups on Campus PUP',
    title: 'Cybersecurity Cadet',
    period: 'Oct 2024 – Sep 2025',
    duration: '1 yr',
    points: [
      'Actively participated in cybersecurity training programs and technical activities focused on network security, ethical hacking, and security best practices.',
      'Strengthened practical skills through hands-on exercises, collaborative learning, and continuous exploration of cybersecurity concepts.',
    ],
  },
];
