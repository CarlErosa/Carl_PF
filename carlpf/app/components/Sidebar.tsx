'use client';

import {
  Briefcase,
  FileText,
  FolderGit2,
  Github,
  Home,
  Linkedin,
  Layers,
  Mail,
  Trophy,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GameLauncher from './GameLauncher';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/blog', label: 'Blog', icon: FileText },
  { href: '/stack', label: 'Stack', icon: Layers },
  { href: '/experience', label: 'Experience', icon: Briefcase },
  { href: '/hackathons', label: 'Hackathons', icon: Trophy },
  { href: '/projects', label: 'Projects', icon: FolderGit2 },
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
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-72 flex-col border-r border-line bg-background px-7 py-8 md:flex">
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
              title={item.label}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs transition-colors duration-200 ${
                active
                  ? 'bg-surface text-foreground'
                  : 'text-muted-foreground hover:bg-surface hover:text-foreground'
              }`}
            >
              <item.icon size={16} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="flex flex-row items-center gap-2.5">
          <ThemeToggle />
          <GameLauncher />
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              title={link.label}
              aria-label={link.label}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-surface hover:text-foreground"
            >
              <link.icon size={16} aria-hidden="true" />
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
