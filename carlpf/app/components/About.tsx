'use client';

import RotatingText from './ui/RotatingText';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import NextImage from 'next/image';
import { Palette, Target, Zap } from 'lucide-react';

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  const highlights = [
    {
      icon: Palette,
      title: 'Tools',
      description: 'Figma, React, Tailwind, Next.js',
    },
    {
      icon: Target,
      title: 'Focus',
      description: 'Design systems, Accessibility, Interaction design',
    },
    {
      icon: Zap,
      title: 'Quick Facts',
      description: 'Problem-solver, Team player, Frontend enthusiast',
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="bg-primary px-6 md:px-8 lg:px-16 py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Photo */}
          <div
            className={`md:col-span-4 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="relative w-full aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg border-2 border-primary-foreground/20">
              <NextImage
                src="/assets/lanyard/picture.jpg"
                alt="Carl Erosa - Developer and Designer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
              />
            </div>
          </div>

          {/* Content */}
          <div
            className={`md:col-span-8 text-primary-foreground transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-3xl md:text-5xl font-bold mb-8">
              <span className="text-primary-foreground">About </span>
              <span className="inline-block">
                <span className="inline-block bg-accent px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-md">
                  <RotatingText
                    texts={['Me', 'Carl', 'a Developer']}
                    rotationInterval={2500}
                    staggerDuration={0.03}
                    mainClassName="text-accent-foreground font-bold"
                  />
                </span>
              </span>
            </h3>

            <div className="space-y-4 text-base md:text-lg leading-relaxed text-primary-foreground/85">
              <p>
                I am a student taking a degree of{' '}
                <strong className="font-semibold text-accent">
                  Bachelor of Science in Computer Engineering
                </strong>{' '}
                at{' '}
                <strong className="font-semibold text-primary-foreground">
                  Polytechnic University of the Philippines - Sta Mesa Manila
                </strong>
                .
              </p>
              <p>
                I have been very fond of{' '}
                <strong className="font-semibold text-accent">designing</strong>
                , whether it is for print or UI/UX designs. Though I may not be
                the best, I take pride in every output I make, treating it as a{' '}
                <strong className="font-semibold text-primary-foreground">
                  piece of art and a product of my creativity
                </strong>
                , a piece of me.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="bg-primary-foreground/10 backdrop-blur-sm p-5 rounded-xl border border-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors duration-300"
                >
                  <item.icon
                    size={20}
                    className="text-accent mb-3"
                    aria-hidden="true"
                  />
                  <h5 className="font-semibold mb-2 text-primary-foreground">
                    {item.title}
                  </h5>
                  <p className="text-sm leading-relaxed text-primary-foreground/70">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
