'use client';

import { motion } from 'motion/react';
import NextImage from 'next/image';

export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-white/5 bg-[#08080c] px-6 py-24 sm:px-8 md:px-12 md:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-[84rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.15, margin: '-40px' }}
          className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_50%_10%,rgba(63,214,255,0.08),transparent_30%),radial-gradient(circle_at_90%_22%,rgba(109,63,214,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_60px_rgba(63,214,255,0.06)]"
        >
          <div className="absolute inset-0 pointer-events-none bg-noise opacity-50" />

          <div className="grid min-h-[36rem] grid-cols-1 lg:grid-cols-[1.18fr_0.92fr]">
            <div className="relative min-h-[24rem] overflow-hidden border-b border-white/8 lg:min-h-full lg:border-b-0 lg:border-r lg:border-white/8">
              <NextImage
                src="/assets/lanyard/bg.png"
                alt="Carl Erosa - Software & Cloud Engineer"
                fill
                className="object-contain object-top scale-[1.9] -translate-y-14"
                sizes="(max-width: 1024px) 100vw, 34vw"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_22%,rgba(63,214,255,0.18),transparent_32%),linear-gradient(180deg,rgba(7,7,11,0.1),rgba(7,7,11,0.85))]" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_48%,rgba(255,255,255,0.08)_52%,transparent_56%,transparent_100%)] opacity-20" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(7,7,11,0.78),rgba(7,7,11,0.96))]" />
            </div>

            <div className="relative px-6 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-12 lg:py-14">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <p className="mb-4 text-xs font-mono uppercase tracking-[0.45em] text-[#3fd6ff]">
                  About
                </p>
                <h3 className="max-w-[9ch] text-balance font-display text-5xl font-bold leading-[0.9] tracking-[-0.04em] text-foreground text-glow sm:text-6xl lg:text-7xl">
                  About Me
                </h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-2xl space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-[1.05rem]"
              >
                <p>
                  I&#39;m a{' '}
                  <strong className="font-semibold text-[#3fd6ff]">
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

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
