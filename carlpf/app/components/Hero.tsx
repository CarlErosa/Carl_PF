'use client';

import dynamic from 'next/dynamic';
import TextType from './ui/TextType';

const LanyardScene = dynamic(() => import('./ui/LanyardScene'), {
  ssr: false,
  loading: () => <div className="w-64 h-64 md:w-80 md:h-80 bg-[#d4c5b0] rounded-full animate-pulse"></div>
});

export default function Hero() {
  return (
    <section id="home" className="bg-[#f5f1e8] px-8 pt-32 pb-20 md:px-16 overflow-visible relative">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none bg-noise"></div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex-1">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-[#334B35]">
            Hello<br />
            I'm Carl !
          </h2>
          <p className="text-gray-600 text-sm uppercase tracking-wider mb-4">
            <TextType
              text={["UI/UX Enthusiast", "Frontend Developer", "Web Developer", "Upcoming Backend Dev"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </p>
          <p className="text-gray-700 max-w-md leading-relaxed">
            I'm an aspiring developer with a passion for creating clean, modern, and intentional digital experiences. I love exploring new tools and technologies, and I'm constantly improving my craft through hands-on projects.
          </p>
        </div>
        <div className="shrink-0 md:absolute md:right-[500px] md:-top-45">
          <LanyardScene />
        </div>
      </div>
    </section>
  );
}
