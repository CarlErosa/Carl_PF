'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/stack', label: 'Stack' },
  { href: '/experience', label: 'Experience' },
  { href: '/hackathons', label: 'Hackathons' },
  { href: '/projects', label: 'Projects' },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/CarlErosa', icon: Github },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/carl-melvin-erosa-4805b4304/',
    icon: Linkedin,
  },
  { label: 'Email', href: 'mailto:carlmelvinerosa3@gmail.com', icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-72 flex-col border-r border-line bg-white px-7 py-8 md:flex">
      <Link
        href="/"
        className="text-left text-lg font-light tracking-tight text-foreground"
      >
        Carl<span className="text-accent">.</span>
      </Link>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint-foreground">
        Software &amp; Cloud Enthusiast
      </p>

      <nav className="mt-10 flex flex-col gap-1" aria-label="Sidebar navigation">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-lg px-3 py-2 text-xs transition-colors duration-200 ${
                active
                  ? 'bg-surface text-foreground'
                  : 'text-muted-foreground hover:bg-surface hover:text-foreground'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="flex flex-col gap-2.5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="flex items-center gap-2.5 text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <link.icon size={14} aria-hidden="true" />
              {link.label}
            </a>
          ))}
        </div>
        <p className="mt-8 font-mono text-[10px] text-faint-foreground">
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </aside>
  );
}
