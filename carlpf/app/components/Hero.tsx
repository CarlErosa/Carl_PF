'use client';

import { Suspense } from 'react';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import { useTypewriter } from '../hooks/useTypewriter';

const GlobeScene = dynamic(() => import('./ui/GlobeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] md:w-[600px] md:h-[600px] lg:w-[680px] lg:h-[680px] rounded-full bg-[#1F2D22] animate-pulse" />
  ),
});

const nameLetters = 'CARL.'.split('');

export default function Hero() {
  const { displayed, isDone } = useTypewriter('Builder with a passion for scaling', 80);

  return (
    <section
      id="home"
      className="bg-background px-8 md:px-16 pt-36 pb-48 md:pt-44 md:pb-48 overflow-hidden relative min-h-[90vh] flex items-center"
    >
      <div className="absolute inset-0 pointer-events-none dot-grid opacity-40" />
      <div className="absolute inset-0 pointer-events-none bg-noise" />
      <div className="max-w-[90rem] mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
        <div className="flex-1 max-w-3xl z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl font-mono font-medium tracking-widest uppercase text-[#6FCF7C] mb-6"
          >
            Software & Cloud Enthusiast
          </motion.p>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9rem] font-bold text-foreground leading-[0.95] text-balance mb-6">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: 'easeOut',
                }}
                className="inline-block"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h1>

          <p className="text-muted-foreground font-mono text-lg sm:text-xl tracking-wider mb-10 h-8">
            {displayed}
            {!isDone && <span className="blink text-[#6FCF7C]">|</span>}
          </p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-[#7A9180] max-w-2xl leading-relaxed mb-12 text-xl sm:text-2xl"
          >
            I build and ship systems that scale — from cloud infrastructure
            and CI/CD pipelines to full-stack applications handling thousands
            of concurrent users. I&#39;m driven by engineering at scale and
            reliability under pressure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-5"
          >
            <a
              href="#projects"
              className="relative inline-flex items-center gap-3 px-10 py-5 bg-[#3A5E3D] text-[#E8EDE9] text-lg font-medium rounded-lg hover:bg-[#4A7A4F] transition-colors overflow-hidden group"
            >
              View Projects
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="https://www.linkedin.com/in/carl-melvin-erosa-4805b4304/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-3 px-10 py-5 border-2 border-[#3A5E3D] text-[#E8EDE9] text-lg font-medium rounded-lg hover:bg-[#111714] transition-colors overflow-hidden group"
            >
              Get in Touch
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="shrink-0 flex items-center justify-center -mr-8 lg:-mr-12"
        >
          <Suspense
            fallback={
              <div className="w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] md:w-[600px] md:h-[600px] lg:w-[680px] lg:h-[680px] rounded-full bg-[#1F2D22] animate-pulse" />
            }
          >
            <GlobeScene />
          </Suspense>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[#7A9180] text-sm font-mono">scroll</span>
        <div className="animate-bounce">
          <svg
            width="22"
            height="22"
            viewBox="0 0 16 16"
            fill="none"
            className="text-[#7A9180]"
          >
            <path
              d="M8 3v10M4 9l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
