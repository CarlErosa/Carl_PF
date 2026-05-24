'use client';

import { motion } from 'motion/react';

type Proficiency = 'Proficient' | 'Comfortable';

interface SkillItem {
  name: string;
  proficiency: Proficiency;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

function ProficiencyDots({ level }: { level: Proficiency }) {
  const count = level === 'Proficient' ? 3 : 2;
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`w-2.5 h-2.5 rounded-full ${
            i < count ? 'bg-[#6FCF7C]' : 'bg-[#1F2D22]'
          }`}
        />
      ))}
      <span className="ml-2 text-xs font-mono text-[#7A9180] uppercase tracking-wider">
        {level}
      </span>
    </div>
  );
}

const categories: SkillCategory[] = [
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', proficiency: 'Proficient' },
      { name: 'Docker', proficiency: 'Proficient' },
      { name: 'GitHub Actions', proficiency: 'Proficient' },
      { name: 'CI/CD', proficiency: 'Proficient' },
      { name: 'Vercel', proficiency: 'Proficient' },
      { name: 'Linux', proficiency: 'Proficient' },
    ],
  },
  {
    title: 'Development',
    skills: [
      { name: 'Node.js', proficiency: 'Proficient' },
      { name: 'FastAPI', proficiency: 'Proficient' },
      { name: 'React & Next.js', proficiency: 'Proficient' },
      { name: 'TypeScript', proficiency: 'Proficient' },
      { name: 'PostgreSQL', proficiency: 'Proficient' },
      { name: 'Supabase', proficiency: 'Proficient' },
    ],
  },
  {
    title: 'Tools & Networking',
    skills: [
      { name: 'Postman', proficiency: 'Comfortable' },
      { name: 'Cisco Packet Tracer', proficiency: 'Comfortable' },
      { name: 'Git/GitHub', proficiency: 'Comfortable' },
      { name: 'API Integration', proficiency: 'Comfortable' },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="bg-background px-8 md:px-12 lg:px-16 py-28 md:py-36 relative border-t border-[#1F2D22]"
    >
      <div className="absolute inset-0 pointer-events-none bg-noise" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-6xl font-bold text-foreground mb-5 text-balance">
            Skills
          </h3>
          <p className="text-[#7A9180] font-mono text-base max-w-lg mx-auto">
            Technologies I work with daily.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: catIdx * 0.15, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-80px' }}
              whileHover={{ scale: 1.03 }}
              className="bg-[#111714] p-8 md:p-10 rounded-lg border border-[#1F2D22] transition-all duration-300 hover:border-[#6FCF7C] hover:shadow-[0_0_12px_rgba(111,207,124,0.15)]"
            >
              <h4 className="text-xl font-bold text-foreground mb-3 font-mono tracking-tight">
                {category.title}
              </h4>
              <ProficiencyDots level="Proficient" />
              <div className="mt-8 flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-4 py-2 rounded-full text-base font-mono bg-[#1A2E1C] text-[#6FCF7C]"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
