'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import NextImage from 'next/image';

interface OrgRole {
  title: string;
  period: string;
  duration?: string;
  points?: string[];
}

interface ExperienceEntry {
  org: string;
  totalDuration?: string;
  roles: OrgRole[];
}

const experiences: ExperienceEntry[] = [
  {
    org: 'CyberPH',
    roles: [
      {
        title: 'Director of Engineering',
        period: '2026–Present',
        points: [
          'Led architecture planning and execution of multidisciplinary software and hardware projects.',
          'Standardized development workflows, improving code maintainability and scalability across teams.',
        ],
      },
      {
        title: 'Research and Development Team Member',
        period: 'Sep 2025 – Present',
        duration: '3 mos',
      },
    ],
  },
  {
    org: 'Arduino Day Philippines National',
    roles: [
      {
        title: 'Web Infrastructure Specialist',
        period: '2025–2026',
        points: [
          'Engineered and deployed a national registration platform handling 25,000+ requests and 1,000+ concurrent users.',
          'Designed CI/CD pipelines including staging and production environments for controlled releases.',
        ],
      },
    ],
  },
  {
    org: 'ICPEP Student Edition – PUP Manila',
    totalDuration: '1 yr 8 mos',
    roles: [
      {
        title: 'Vice President For Technology',
        period: 'Sep 2025 – Present',
        duration: '3 mos',
      },
      {
        title: 'Head of Technology Department',
        period: 'Apr 2024 – Sep 2025',
        duration: '1 yr 6 mos',
      },
    ],
  },

  {
    org: 'Google Developer Groups on Campus PUP',
    totalDuration: '1 yr 2 mos',
    roles: [
      {
        title: 'IoT Learning Head',
        period: 'Sep 2025 – Present',
        duration: '3 mos',
      },
      {
        title: 'Cybersecurity Cadet',
        period: 'Oct 2024 – Sep 2025',
        duration: '1 yr',
      },
    ],
  },
 
];

const achievements = [
  {
    name: 'ICTO Hackathon',
    role: 'Frontend Developer',
    year: '2025',
    result: 'Finalist',
    image: '/assets/lanyard/icto.jpg',
  },
  {
    name: 'BPI Datawave',
    role: 'Developer & Researcher',
    year: '2025',
    result: 'Participant',
    image: '/assets/lanyard/bpi.png',
  },
  {
    name: 'Uthak ang Puhunan',
    role: 'Fullstack Developer',
    year: '2025',
    result: '1st Runner Up',
    image: '/assets/lanyard/uthak.jpg',
  },
];

function ResultBadge({ result }: { result: string }) {
  let styles = '';
  if (result === '1st Runner Up') {
    styles = 'bg-[#3A2E00] text-[#F5C518]';
  } else if (result === 'Finalist') {
    styles = 'bg-[#1A2E1C] text-[#6FCF7C]';
  } else {
    styles = 'bg-[#1A1F1B] text-[#7A9180]';
  }
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-medium ${styles}`}>
      {result}
    </span>
  );
}

export default function Hackathons() {
  const [activeTab, setActiveTab] = useState<'achievements' | 'experience'>('experience');

  return (
    <section
      id="hackathons"
      className="bg-[#111714] px-8 md:px-12 lg:px-16 py-28 md:py-36 relative border-t border-[#1F2D22]"
    >
      <div className="absolute inset-0 pointer-events-none bg-noise" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            Experience
          </h3>
          <p className="text-[#7A9180] font-mono text-base max-w-lg mx-auto mb-10">
            Professional journey building at scale.
          </p>

          <div className="inline-flex items-center gap-8">
            <button
              onClick={() => setActiveTab('achievements')}
              className={`relative pb-2 text-base font-medium transition-colors duration-200 ${
                activeTab === 'achievements'
                  ? 'text-[#6FCF7C]'
                  : 'text-[#7A9180] hover:text-[#E8EDE9]'
              }`}
            >
              Achievements
              {activeTab === 'achievements' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6FCF7C]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`relative pb-2 text-base font-medium transition-colors duration-200 ${
                activeTab === 'experience'
                  ? 'text-[#6FCF7C]'
                  : 'text-[#7A9180] hover:text-[#E8EDE9]'
              }`}
            >
              Experience
              {activeTab === 'experience' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6FCF7C]" />
              )}
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            >
              {achievements.map((a, index) => (
                <motion.div
                  key={a.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.12, ease: 'easeOut' }}
                  whileHover={{ scale: 1.02 }}
                  className="group bg-[#111714] rounded-xl border border-[#1F2D22] overflow-hidden transition-all duration-300 hover:border-[#6FCF7C] hover:shadow-[0_0_12px_rgba(111,207,124,0.15)]"
                >
                  <div className="relative w-full h-40 md:h-44 overflow-hidden">
                    <NextImage
                      src={a.image}
                      alt={`${a.name} - ${a.result}, ${a.year}`}
                      fill
                      className="object-cover rounded-t-xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <h4 className="text-lg md:text-xl font-bold text-foreground mb-1">
                      {a.name}
                    </h4>
                    <p className="text-[#7A9180] text-sm md:text-base mb-3">
                      {a.role} &middot; {a.year}
                    </p>
                    <ResultBadge result={a.result} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="max-w-4xl mx-auto relative pl-10 md:pl-14">
                <div className="absolute left-[19px] md:left-[27px] top-2 bottom-2 w-px bg-[#3A5E3D]" />

                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2,
                      ease: 'easeOut',
                    }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="relative mb-12 last:mb-0 group"
                  >
                    <div
                      className="absolute -left-[29px] md:-left-[41px] top-1.5 w-[19px] h-[19px] md:w-[23px] md:h-[23px] rounded-full border-2 border-[#3A5E3D] bg-[#0D0F0E] transition-all duration-300 group-hover:shadow-[0_0_10px_#6FCF7C] group-hover:border-[#6FCF7C] z-10"
                    />

                    <div className="bg-[#0D0F0E] p-8 rounded-lg border-l-2 border-[#3A5E3D] transition-all duration-300 group-hover:border-[#6FCF7C]">
                      <div className="mb-5">
                        <h4 className="text-xl font-bold text-foreground">
                          {exp.org}
                        </h4>
                        {exp.totalDuration && (
                          <p className="text-sm font-mono text-[#7A9180] mt-0.5">
                            {exp.totalDuration}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        {exp.roles.map((role, i) => (
                          <div key={i}>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-[#3A5E3D] rounded-full mt-2 shrink-0" />
                              <div className="min-w-0">
                                <p className="font-semibold text-foreground">
                                  {role.title}
                                </p>
                                <p className="text-sm font-mono text-[#7A9180]">
                                  {role.period}
                                  {role.duration && (
                                    <span> &middot; {role.duration}</span>
                                  )}
                                </p>
                              </div>
                            </div>
                            {role.points && role.points.length > 0 && (
                              <ul className="space-y-2 mt-3 ml-4">
                                {role.points.map((point, j) => (
                                  <li
                                    key={j}
                                    className="text-base text-[#7A9180] leading-relaxed pl-5 relative"
                                  >
                                    <span className="absolute left-0 top-[8px] w-1.5 h-1.5 rounded-full bg-[#3A5E3D]" />
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
