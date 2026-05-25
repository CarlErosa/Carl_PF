'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

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
  const [showBackToTop, setShowBackToTop] = useState(false);

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

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-80px' }}
      className="bg-[#111714] px-8 md:px-12 py-20 md:py-28 border-t border-[#1F2D22]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          <div className="md:col-span-2">
            <h4 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Building systems that scale.
            </h4>
            <p className="text-[#7A9180] font-mono text-base mb-8">
              Software & Cloud Enthusiast 
            </p>
            <a
              href="https://www.linkedin.com/in/carl-melvin-erosa-4805b4304/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#3A5E3D] text-[#E8EDE9] text-base font-medium rounded-lg hover:bg-[#4A7A4F] transition-colors"
            >
              Get in Touch →
            </a>
          </div>

          <div>
            <h4 className="text-base font-mono font-semibold uppercase tracking-wider text-[#7A9180] mb-5">
              Connect
            </h4>
            <div className="flex flex-col gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="flex items-center gap-3 text-[#7A9180] hover:text-[#6FCF7C] transition-all duration-200 hover:-translate-y-0.5 group"
                  aria-label={`Connect via ${link.label}`}
                >
                  <link.icon size={20} aria-hidden="true" />
                  <span className="text-base font-medium">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#1F2D22] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#7A9180] font-mono">
            &copy; {new Date().getFullYear()} Carl Erosa. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </div>

      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-4 bg-[#3A5E3D] text-[#E8EDE9] rounded-full hover:bg-[#4A7A4F] transition-colors shadow-lg"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </motion.footer>
  );
}
