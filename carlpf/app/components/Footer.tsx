'use client';

import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import RotatingText from './ui/RotatingText';

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
    label: 'Email',
    href: 'mailto:carlmelvinerosa3@gmail.com',
    icon: Mail,
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary px-6 md:px-8 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* CTA Column */}
          <div className="md:col-span-2">
            <h4 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3 text-balance">
              Like what you see?
            </h4>
            <div className="text-primary-foreground/70 mb-6 flex items-center gap-2 text-lg">
              <RotatingText
                texts={[
                  "Let's work together!",
                  "Let's build something!",
                  "Let's create magic!",
                ]}
                mainClassName="bg-accent text-accent-foreground px-2 py-0.5 rounded-lg overflow-hidden"
                staggerFrom="last"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>
            <a
              href="mailto:carlmelvinerosa3@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Get in Touch
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/50 mb-4">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors group"
                  aria-label={`Connect via ${link.label}`}
                >
                  <link.icon size={18} aria-hidden="true" />
                  <span className="text-sm font-medium">{link.label}</span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">
            &copy; {new Date().getFullYear()} Carl Erosa. Built with Next.js &
            Tailwind CSS.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
