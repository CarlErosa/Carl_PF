'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowUp, Check } from 'lucide-react';
import TikTokIcon from './ui/TikTokIcon';

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/carl-melvin-erosa-4805b4304/',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/CarlErosa',
    icon: Github,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@devwcarl',
    icon: TikTokIcon,
  },
  {
    label: 'Email',
    href: 'mailto:carlmelvinerosa3@gmail.com',
    icon: Mail,
  },
];

const EMAIL = 'carlmelvinerosa3@gmail.com';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-80px' }}
      className="bg-background px-6 py-8 sm:px-8 md:py-12"
    >
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-light tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Let&#39;s build something
            <br />
            that holds up.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Open to internships, hackathon teams, and engineering work. Have a
            project in mind? I&#39;d love to hear about it.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-3 rounded-lg bg-foreground px-5 py-2.5 text-xs font-normal text-background transition-colors duration-200 hover:bg-accent"
          >
            {EMAIL}
            <span className="text-background/60" aria-hidden="true">→</span>
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-background px-5 py-2.5 text-xs font-normal text-foreground transition-colors duration-200 hover:border-foreground"
          >
            {copied ? <Check size={12} aria-hidden="true" /> : null}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="group inline-flex items-center gap-2 text-xs font-normal text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                <link.icon size={13} aria-hidden="true" />
                {link.label}
                <span className="text-faint-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                  ↗
                </span>
              </a>
            ))}
          </div>

          <p className="font-mono text-xs text-faint-foreground">
            &copy; {new Date().getFullYear()} Carl Erosa &middot; Built with Next.js
          </p>
        </div>

        <p className="mt-10 text-center font-mono text-xs tracking-[0.2em] text-faint-foreground">
          — 30 —
        </p>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-faint-foreground">
          © {new Date().getFullYear()} Carl Erosa · Printed in Manila
        </p>
      </div>

      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed right-8 bottom-8 z-40 rounded-full border border-line bg-background p-2.5 text-foreground shadow-sm transition-colors duration-200 hover:border-accent hover:text-accent"
          aria-label="Back to top"
        >
          <ArrowUp size={15} />
        </motion.button>
      )}
    </motion.footer>
  );
}
