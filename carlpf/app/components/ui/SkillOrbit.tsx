'use client';

import { useEffect, useState } from 'react';

interface OrbitItem {
  label: string;
  icon: string;
  ring: number;
}

const skills: OrbitItem[] = [
  // Inner ring (ring 0)
  { label: 'React', icon: '/assets/icons/react.svg', ring: 0 },
  { label: 'Next.js', icon: '/assets/icons/nextjs.svg', ring: 0 },
  { label: 'Figma', icon: '/assets/icons/figma.svg', ring: 0 },
  { label: 'Tailwind', icon: '/assets/icons/tailwind.svg', ring: 0 },
  // Middle ring (ring 1)
  { label: 'JavaScript', icon: '/assets/icons/javascript.svg', ring: 1 },
  { label: 'Python', icon: '/assets/icons/python.svg', ring: 1 },
  { label: 'SQL', icon: '/assets/icons/sql.svg', ring: 1 },
  { label: 'HTML', icon: '/assets/icons/html.svg', ring: 1 },
  { label: 'CSS', icon: '/assets/icons/css.svg', ring: 1 },
  // Outer ring (ring 2)
  { label: 'Node.js', icon: '/assets/icons/nodejs.svg', ring: 2 },
  { label: 'Supabase', icon: '/assets/icons/supabase.svg', ring: 2 },
  { label: 'Git', icon: '/assets/icons/git.svg', ring: 2 },
  { label: 'Photoshop', icon: '/assets/icons/photoshop.svg', ring: 2 },
  { label: 'Canva', icon: '/assets/icons/canva.svg', ring: 2 },
  { label: 'TypeScript', icon: '/assets/icons/typescript.svg', ring: 2 },
];

const ringConfig = [
  { radius: 90, duration: 25, direction: 1 },
  { radius: 145, duration: 35, direction: -1 },
  { radius: 205, duration: 50, direction: 1 },
];

// Pre-computed star positions to avoid hydration mismatches
const stars = Array.from({ length: 50 }, (_, i) => ({
  size: ((i * 7 + 3) % 20) / 10 + 1,
  top: ((i * 37 + 13) % 100),
  left: ((i * 53 + 29) % 100),
  duration: 2 + ((i * 11) % 30) / 10,
  delay: ((i * 17) % 30) / 10,
}));

export default function SkillOrbit() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rings = [0, 1, 2].map((ringIdx) =>
    skills.filter((s) => s.ring === ringIdx)
  );

  return (
    <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px]">
      {/* Stars background */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/30"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Orbit rings (visual tracks) */}
      {ringConfig.map((ring, i) => (
        <div
          key={`track-${i}`}
          className="absolute rounded-full border border-primary/10"
          style={{
            width: ring.radius * 2,
            height: ring.radius * 2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Center element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="text-primary-foreground font-bold text-lg sm:text-xl font-mono">
            {'CE'}
          </span>
        </div>
      </div>

      {/* Orbiting skill nodes */}
      {rings.map((ringSkills, ringIdx) => {
        const config = ringConfig[ringIdx];
        const count = ringSkills.length;

        return ringSkills.map((skill, skillIdx) => {
          const angleOffset = (360 / count) * skillIdx;

          return (
            <div
              key={skill.label}
              className="absolute top-1/2 left-1/2"
              style={{
                width: 0,
                height: 0,
                animation: mounted
                  ? `orbit-spin ${config.duration}s linear infinite ${config.direction === -1 ? 'reverse' : 'normal'}`
                  : 'none',
                animationDelay: `${-(config.duration / count) * skillIdx}s`,
                transform: `rotate(${angleOffset}deg)`,
              }}
            >
              <div
                className="absolute group"
                style={{
                  top: -config.radius,
                  left: -20,
                  width: 40,
                  height: 40,
                }}
              >
                {/* Counter-rotate to keep icons upright */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-card border border-border shadow-md flex items-center justify-center transition-transform duration-300 hover:scale-125 hover:shadow-lg cursor-default"
                  style={{
                    animation: mounted
                      ? `orbit-spin ${config.duration}s linear infinite ${config.direction === -1 ? 'normal' : 'reverse'}`
                      : 'none',
                    animationDelay: `${-(config.duration / count) * skillIdx}s`,
                  }}
                >
                  <img
                    src={skill.icon}
                    alt={skill.label}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    loading="lazy"
                  />
                </div>
                {/* Tooltip */}
                <div
                  className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-foreground text-background text-[10px] font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20"
                  style={{
                    animation: mounted
                      ? `orbit-spin ${config.duration}s linear infinite ${config.direction === -1 ? 'normal' : 'reverse'}`
                      : 'none',
                    animationDelay: `${-(config.duration / count) * skillIdx}s`,
                  }}
                >
                  {skill.label}
                </div>
              </div>
            </div>
          );
        });
      })}
    </div>
  );
}
