'use client';

import { motion } from 'motion/react';
import NextImage from 'next/image';
import { Wrench, Target, Zap } from 'lucide-react';

const highlights = [
  {
    icon: Wrench,
    title: 'Tools',
    description: 'Node.js, Docker, AWS, Next.js, PostgreSQL, GitHub Actions',
  },
  {
    icon: Target,
    title: 'Focus',
    description: 'Cloud infrastructure, Backend systems, CI/CD & DevOps',
  },
  {
    icon: Zap,
    title: 'Quick Facts',
    description: 'Systems thinker, Backend-first, Scales under pressure',
  },
];

export default function About() {
  return (
    <section id="about" className="bg-[#111714] px-8 md:px-12 lg:px-16 py-28 md:py-36 border-t border-[#1F2D22]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.1, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start"
        >
          <div className="md:col-span-4">
            <div className="relative w-full aspect-[3/4] max-w-sm md:max-w-md mx-auto rounded-2xl overflow-hidden border border-[#1F2D22]">
              <NextImage
                src="/assets/lanyard/picture.jpg"
                alt="Carl Erosa - Software & Cloud Engineer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 500px"
              />
            </div>
          </div>

          <div className="md:col-span-8">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-10"
            >
              About{' '}
              <span className="inline-block bg-[#3A5E3D] px-5 md:px-8 py-2.5 md:py-4 rounded-xl text-[#E8EDE9] font-mono text-3xl md:text-5xl">
                Me
              </span>
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-5 text-lg md:text-xl leading-relaxed text-[#7A9180]"
            >
              <p>
                I&#39;m a{' '}
                <strong className="font-semibold text-[#6FCF7C]">
                  Computer Engineering
                </strong>{' '}
                student at{' '}
                <strong className="font-semibold text-foreground">
                  Polytechnic University of the Philippines
                </strong>
                . I specialize in developing systems, cloud deployment, and
                full-stack development — building platforms that hold up
                under real-world load.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              viewport={{ once: true }}
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="bg-[#0D0F0E] p-6 rounded-xl border border-[#1F2D22] hover:border-[#3A5E3D] transition-colors duration-300"
                >
                  <item.icon
                    size={24}
                    className="text-[#6FCF7C] mb-4"
                    aria-hidden="true"
                  />
                  <h5 className="font-semibold mb-2 text-foreground font-mono text-base tracking-wider uppercase">
                    {item.title}
                  </h5>
                  <p className="text-base leading-relaxed text-[#7A9180]">
                    {item.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
