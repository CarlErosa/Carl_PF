'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'hackathons', 'projects'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 96;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'hackathons', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-md shadow-sm border-b border-border'
            : 'bg-transparent border-b border-transparent'
        }`}
        style={
          isScrolled
            ? { boxShadow: '0 0 16px rgba(63, 214, 255, 0.12)' }
            : undefined
        }
      >
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-5 flex items-center justify-between">
          <button
            onClick={() => scrollToSection('home')}
            className="text-2xl md:text-3xl font-bold tracking-tight text-foreground font-display"
          >
            CARL.
            <span className="text-glow-cyan text-[#3fd6ff]">|</span>
          </button>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-sm font-medium tracking-[0.2em] uppercase transition-all duration-200 group ${
                  activeSection === item.id
                    ? 'text-[#3fd6ff] text-glow-cyan'
                    : 'text-[#a0a0b0] hover:text-[#e8e8f2]'
                }`}
              >
                {item.label}
                <span
                  className="nav-glow-underline absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-300"
                  style={{ width: activeSection === item.id ? '85%' : '0%', opacity: activeSection === item.id ? 1 : 0 }}
                />
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 rounded-lg text-foreground hover:bg-[#1a1a26] transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav
            className="absolute top-[76px] left-5 right-5 bg-[#12121a] rounded-xl shadow-xl border border-border p-5 flex flex-col gap-1.5"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-5 py-4 rounded-lg text-base font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-[#3fd6ff] bg-[#1a1a26]'
                    : 'text-[#e8e8f2] hover:bg-[#1a1a26]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
