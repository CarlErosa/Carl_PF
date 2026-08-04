'use client';

import { motion } from 'motion/react';
import NextImage from 'next/image';
import { useState } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { skillCategories } from './Skills';
import VisitorCounter from './VisitorCounter';

const nameLetters = 'CARL.'.split('');

export default function Hero() {
  const { displayed, isDone } = useTypewriter('Builder with a passion for scaling', 80);
  const [isFlipped, setIsFlipped] = useState(false);

  const statusStats = [
    { label: 'STR', value: '48' },
    { label: 'VIT', value: '27' },
    { label: 'AGI', value: '27' },
    { label: 'INT', value: '27' },
    { label: 'PER', value: '27' },
    { label: 'AP', value: '12' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-background px-6 pb-20 pt-28 flex items-start sm:px-8 md:px-12 md:pb-24 md:pt-32 lg:px-16"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_16%,rgba(63,214,255,0.14),transparent_28%),radial-gradient(circle_at_84%_34%,rgba(76,47,143,0.24),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.018),transparent_24%)]" />
      <div className="absolute inset-0 pointer-events-none dot-grid opacity-12" />
      <div className="absolute inset-0 pointer-events-none bg-noise opacity-70" />

      <div className="relative z-10 mx-auto w-full max-w-[92rem]">
        <div className="grid min-h-[calc(100svh-9rem)] grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="flex min-h-[calc(100svh-12rem)] flex-col justify-between gap-10 lg:col-span-7 xl:col-span-6 lg:gap-16">
            <div className="max-w-4xl pt-2 lg:pt-8">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="mb-5 text-[0.72rem] font-mono font-medium uppercase tracking-[0.42em] text-[#3fd6ff] sm:text-xs md:text-sm"
              >
                Software & Cloud Enthusiast
              </motion.p>

              <h1 className="max-w-[10ch] text-balance font-display text-[4.5rem] font-bold leading-[0.82] tracking-[-0.05em] text-foreground text-glow sm:text-[6.75rem] sm:leading-[0.82] md:text-[8.5rem] lg:text-[10rem] xl:text-[11.75rem]">
                {nameLetters.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.18 + i * 0.05,
                      ease: 'easeOut',
                    }}
                    className="inline-block"
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </h1>
            </div>

            <div className="max-w-2xl pb-6 pl-1 lg:pb-10 lg:pl-2">
              <p className="mb-4 h-6 font-mono text-[0.92rem] uppercase tracking-[0.28em] text-muted-foreground sm:text-base">
                {displayed}
                {!isDone && <span className="blink text-[#3fd6ff]">|</span>}
              </p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-[1.05rem] lg:text-[1.1rem]"
              >
                I build and ship systems that scale — from cloud infrastructure
                and CI/CD pipelines to full-stack applications handling thousands
                of concurrent users. I&#39;m driven by engineering at scale and
                reliability under pressure.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-7 flex flex-wrap gap-3 sm:gap-4"
              >
                <a
                  href="#projects"
                  className="group relative inline-flex items-center gap-2.5 rounded-full bg-[#6d3fd6] px-5 py-3 text-sm font-medium text-[#e8e8f2] transition-all duration-300 hover:bg-[#7a4be8] hover:shadow-[0_0_24px_rgba(109,63,214,0.42)] sm:text-base"
                >
                  View Projects
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/carl-melvin-erosa-4805b4304/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2.5 rounded-full border border-[#3fd6ff]/35 px-5 py-3 text-sm font-medium text-[#e8e8f2] transition-all duration-300 hover:border-[#3fd6ff]/70 hover:bg-[#3fd6ff]/10 hover:shadow-[0_0_20px_rgba(63,214,255,0.22)] sm:text-base"
                >
                  Get in Touch
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex min-h-[34rem] items-center justify-center lg:col-span-5 lg:min-h-[calc(100svh-12rem)] xl:col-span-6 lg:justify-end"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(63,214,255,0.36)_0%,rgba(63,214,255,0.16)_26%,rgba(76,47,143,0.2)_48%,transparent_74%)] blur-3xl sm:h-[30rem] sm:w-[30rem] lg:h-[40rem] lg:w-[40rem]" />
            </div>

            <button
              type="button"
              onClick={() => setIsFlipped((value) => !value)}
              className="group absolute right-[-0.5rem] top-1/2 h-[30rem] w-[22rem] -translate-y-1/2 cursor-pointer select-none sm:h-[38rem] sm:w-[28rem] lg:h-[48rem] lg:w-[34rem] xl:right-0"
              aria-label={isFlipped ? 'Show portrait front' : 'Show logo back'}
            >
              <div className="absolute -inset-8 rounded-[3.25rem] bg-[radial-gradient(circle_at_50%_40%,rgba(63,214,255,0.34),rgba(76,47,143,0.22)_34%,transparent_70%)] opacity-90 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 rounded-[2.75rem] bg-[radial-gradient(circle_at_50%_22%,rgba(63,214,255,0.18),transparent_44%),linear-gradient(135deg,rgba(12,12,18,0.18),rgba(12,12,18,0.95))] opacity-95 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_70px_rgba(63,214,255,0.14)]" />

              <div className="absolute inset-0 rounded-[2.75rem] border border-white/8 [perspective:1800px]">
                <div
                  className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]"
                  style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-[2.75rem] [backface-visibility:hidden]">
                    <NextImage
                      src="/assets/lanyard/photo.jpg"
                      alt="Carl Erosa portrait visual anchor"
                      fill
                      priority
                      sizes="(max-width: 1024px) 80vw, 38vw"
                      className="object-contain object-bottom object-center scale-[0.88] brightness-[1.05] contrast-[1.08] saturate-[0.98]"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(63,214,255,0.24),transparent_34%),linear-gradient(180deg,rgba(9,9,14,0.42),rgba(9,9,14,0.94))]" />
                    <div className="absolute inset-x-8 top-10 h-px bg-gradient-to-r from-transparent via-[#3fd6ff]/70 to-transparent" />
                    <div className="absolute inset-x-10 bottom-10 h-px bg-gradient-to-r from-transparent via-[#6d3fd6]/60 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_34%,rgba(63,214,255,0.12),transparent_24%),radial-gradient(circle_at_20%_78%,rgba(109,63,214,0.12),transparent_24%)]" />
                    <div className="absolute bottom-8 right-8 h-16 w-16 rounded-full border border-[#3fd6ff]/20 bg-[radial-gradient(circle,rgba(63,214,255,0.18),transparent_68%)] blur-sm" />
                  </div>

                  <div className="absolute inset-0 overflow-hidden rounded-[2.75rem] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(63,214,255,0.18),transparent_34%),linear-gradient(180deg,rgba(8,10,16,0.9),rgba(8,10,16,0.98))]" />
                    <div className="absolute inset-4 border border-white/10" />

                    <div className="absolute left-1/2 top-5 w-[60%] -translate-x-1/2 rounded-sm border border-white/10 bg-white/[0.02] px-3 py-2 text-center font-mono text-[0.8rem] uppercase tracking-[0.42em] text-[#e8e8f2] shadow-[0_0_24px_rgba(63,214,255,0.08)]">
                      Status
                    </div>

                    <div className="absolute left-8 right-8 top-16">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <div className="text-[0.72rem] font-mono uppercase tracking-[0.36em] text-[#3fd6ff]">
                            Level
                          </div>
                          <div className="mt-1 text-5xl font-display font-bold leading-none text-[#e8e8f2] text-glow">
                            19
                          </div>
                        </div>
                        <div className="pb-1 text-right">
                          <div className="text-[0.72rem] font-mono uppercase tracking-[0.36em] text-[#3fd6ff]">
                            Job: Student
                          </div>
                          <div className="mt-1 text-xs font-mono uppercase tracking-[0.28em] text-muted-foreground">
                            Title: Software & Cloud Enthusiast
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#e8e8f2]">
                            <span className="text-[#3fd6ff]">HP</span>
                            <span className="text-muted-foreground">2220 / 2220</span>
                          </div>
                          <div className="h-2 rounded-full border border-white/10 bg-[#12121a] p-0.5">
                            <div className="h-full w-full rounded-full bg-[linear-gradient(90deg,#3fd6ff,#6d3fd6)] shadow-[0_0_12px_rgba(63,214,255,0.35)]" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#e8e8f2]">
                            <span className="text-[#3fd6ff]">MP</span>
                            <span className="text-muted-foreground">350 / 350</span>
                          </div>
                          <div className="h-2 rounded-full border border-white/10 bg-[#12121a] p-0.5">
                            <div className="h-full w-full rounded-full bg-[linear-gradient(90deg,#8aa7ff,#3fd6ff)] shadow-[0_0_12px_rgba(109,63,214,0.3)]" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm font-mono text-[#e8e8f2] sm:grid-cols-3">
                          {statusStats.map((stat) => (
                            <div key={stat.label} className="flex items-center justify-between gap-2">
                              <span className="tracking-[0.24em] text-[#3fd6ff]">{stat.label}</span>
                              <span className="text-base text-[#e8e8f2]">{stat.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                          <p className="text-xs font-mono uppercase tracking-[0.34em] text-[#3fd6ff]">
                            Tools
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {skillCategories[0].skills.slice(0, 4).map((skill) => (
                              <span
                                key={skill.name}
                                className="rounded-full border border-[#1f1f2e] bg-[#181826] px-3 py-1 text-[0.68rem] font-mono text-[#e8e8f2]"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                          <p className="text-xs font-mono uppercase tracking-[0.34em] text-[#3fd6ff]">
                            Development
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {skillCategories[1].skills.slice(0, 4).map((skill) => (
                              <span
                                key={skill.name}
                                className="rounded-full border border-[#1f1f2e] bg-[#181826] px-3 py-1 text-[0.68rem] font-mono text-[#e8e8f2]"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                          <p className="text-xs font-mono uppercase tracking-[0.34em] text-[#3fd6ff]">
                            More tools & libraries
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {skillCategories[2].skills.map((skill) => (
                              <span
                                key={skill.name}
                                className="rounded-full border border-[#1f1f2e] bg-[#181826] px-3 py-1 text-[0.68rem] font-mono text-[#e8e8f2]"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] border border-[#3fd6ff]/10 shadow-[inset_0_0_60px_rgba(0,0,0,0.5)]" />
              <div className="pointer-events-none absolute -left-7 top-8 bottom-10 w-px bg-gradient-to-b from-transparent via-[#3fd6ff]/60 to-transparent opacity-60" />
              <div className="pointer-events-none absolute left-0 top-10 h-[78%] w-16 bg-[linear-gradient(90deg,rgba(63,214,255,0.42),transparent)] blur-2xl opacity-80" />
              <div className="pointer-events-none absolute right-5 top-8 h-[72%] w-px bg-gradient-to-b from-transparent via-[#6d3fd6]/70 to-transparent opacity-55" />
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-6 z-20 origin-left scale-90 opacity-90 sm:bottom-8 sm:left-8 sm:scale-95 md:left-12 lg:left-16">
          <VisitorCounter />
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-sm text-muted-foreground">scroll</span>
        <div className="animate-bounce">
          <svg
            width="22"
            height="22"
            viewBox="0 0 16 16"
            fill="none"
            className="text-[#3fd6ff]"
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
