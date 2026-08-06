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
      className="flex min-h-fit items-center bg-background px-6 pt-8 pb-10 sm:px-8 sm:pt-10"
    >
      <div className="mx-auto w-full max-w-2xl text-left">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
        >
          <span className="text-accent">Systems Desk</span> · Manila
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mt-5 text-3xl font-light leading-[1.05] tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Carl Erosa<span className="text-accent"></span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-faint-foreground"
        >
          By Himself
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          I build systems that scale — cloud infrastructure, CI/CD pipelines,
          and full-stack apps that hold up under real{' '}
          <span className="whitespace-nowrap">
            load.
            <span className="caret blink" aria-hidden="true" />
          </span>
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
