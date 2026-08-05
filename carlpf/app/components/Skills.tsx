'use client';

import SectionHeading from './SectionHeading';

interface SkillItem {
  name: string;
  proficiency: 'Proficient' | 'Comfortable';
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
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
    <section id="stack" className="border-t border-line bg-background px-6 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          index="02"
          title="Stack"
          description="Technologies I work with daily — from infrastructure to interfaces."
        />

        <div className="space-y-10">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center rounded-lg border border-line bg-surface px-3 py-1.5 text-xs text-foreground transition-colors duration-200 hover:border-accent"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
