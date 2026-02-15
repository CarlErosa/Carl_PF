'use client';

import dynamic from 'next/dynamic';
import TextType from './ui/TextType';
import { ArrowDown } from 'lucide-react';

const SkillGlobe = dynamic(() => import('./ui/SkillGlobe'), {
  ssr: false,
  loading: () => (
    <div className="w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] md:w-[520px] md:h-[520px] rounded-full bg-secondary/30 animate-pulse" />
  ),
});

export default function Hero() {
  return (
    <section
      id="home"
      className="bg-background px-6 md:px-8 pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden relative min-h-[90vh] flex items-center"
    >
      <div className="absolute inset-0 pointer-events-none bg-noise" />
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        <div className="flex-1 max-w-xl z-10">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Developer & Designer
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance mb-4">
            Hello, I&#39;m{' '}
            <span className="text-primary">Carl</span>
          </h2>
          <p className="text-muted-foreground text-sm uppercase tracking-wider mb-6 h-6">
            <TextType
              text={[
                'UI/UX Enthusiast',
                'Frontend Developer',
                'Web Developer',
                'Upcoming Backend Dev',
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </p>
          <p className="text-muted-foreground max-w-md leading-relaxed mb-8">
            I&#39;m an aspiring developer with a passion for creating clean,
            modern, and intentional digital experiences. I love exploring new
            tools and technologies, and I&#39;m constantly improving my craft
            through hands-on projects.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              View Projects
              <ArrowDown size={16} />
            </a>
            <a
              href="mailto:carlmelvinerosa3@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-foreground text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* 3D Skill Globe */}
        <div className="shrink-0 flex items-center justify-center -mr-4 lg:-mr-8">
          <SkillGlobe />
        </div>
      </div>
    </section>
  );
}
