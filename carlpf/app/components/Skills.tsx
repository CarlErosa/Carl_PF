'use client';

import { useScrollAnimation } from '../hooks/useScrollAnimation';

type Tier = 'Proficient' | 'Comfortable' | 'Learning';

interface SkillItem {
  name: string;
  tier: Tier;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

const tierColors: Record<Tier, string> = {
  Proficient: 'bg-primary text-primary-foreground',
  Comfortable: 'bg-accent text-accent-foreground',
  Learning: 'bg-secondary text-secondary-foreground',
};

const categories: SkillCategory[] = [
  {
    title: 'UI Design',
    skills: [
      { name: 'Figma', tier: 'Proficient' },
      { name: 'Canva', tier: 'Proficient' },
      { name: 'Photoshop', tier: 'Comfortable' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML/CSS', tier: 'Proficient' },
      { name: 'Tailwind', tier: 'Proficient' },
      { name: 'React & Next.js', tier: 'Comfortable' },
      { name: 'JavaScript', tier: 'Comfortable' },
    ],
  },
  {
    title: 'Backend & Database',
    skills: [
      { name: 'SQL', tier: 'Comfortable' },
      { name: 'Python', tier: 'Comfortable' },
      { name: 'Node.js', tier: 'Learning' },
      { name: 'Supabase', tier: 'Learning' },
    ],
  },
];

export default function Skills() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="skills"
      ref={ref}
      className="bg-background px-6 md:px-8 lg:px-16 py-20 md:py-28 relative"
    >
      <div className="absolute inset-0 pointer-events-none bg-noise" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Skills at a Glance
          </h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Grouped by proficiency -- always learning, always building.
          </p>
          {/* Tier legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {(Object.keys(tierColors) as Tier[]).map((tier) => (
              <span
                key={tier}
                className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
              >
                <span
                  className={`inline-block w-3 h-3 rounded-full ${tierColors[tier]}`}
                />
                {tier}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, catIdx) => (
            <div
              key={category.title}
              className={`bg-card p-6 md:p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${catIdx * 150 + 200}ms` }}
            >
              <h4 className="text-lg font-bold text-card-foreground mb-6">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${tierColors[skill.tier]}`}
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
