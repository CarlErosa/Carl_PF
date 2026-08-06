'use client';

import { motion } from 'motion/react';
import VisitorCounter from './VisitorCounter';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/CarlErosa' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/carl-melvin-erosa-4805b4304/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@devwcarl' },
  { label: 'Email', href: 'mailto:carlmelvinerosa3@gmail.com' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-fit items-center bg-background px-6 pt-24 pb-10 sm:px-8"
    >
      <div className="mx-auto w-full max-w-2xl text-left">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          ~/carl <span className="text-accent">$</span> whoami
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mt-6 text-4xl font-light leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Carl Erosa<span className="text-accent"></span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          I build systems that scale — cloud infrastructure, CI/CD pipelines,
          and full-stack apps that hold up under real load.
          <span className="caret blink" aria-hidden="true" />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="group text-muted-foreground transition-colors duration-200 hover:text-accent"
            >
              {link.label.toLowerCase()}
              <span
                aria-hidden="true"
                className="inline-block transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="mt-10 font-mono text-xs text-faint-foreground"
        >
          {`4+ orgs led · 8+ projects shipped · 2+ hackathon wins`}
        </motion.p>

        <div className="mt-6 flex font-mono text-xs text-faint-foreground">
          <VisitorCounter />
        </div>
      </div>
    </section>
  );
}
