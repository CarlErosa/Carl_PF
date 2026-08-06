'use client';

import { useState } from 'react';
import Link from 'next/link';
import { certifications, certCategories, featuredCertSlugs } from '../lib/certifications';
import SectionHeading from './SectionHeading';
import BrandLogo from './ui/BrandLogo';

export default function Certifications({ showAll = false }: { showAll?: boolean }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const visible = showAll
    ? activeCategory === 'All'
      ? certifications
      : certifications.filter((c) => c.category === activeCategory)
    : featuredCertSlugs
        .map((slug) => certifications.find((c) => c.slug === slug)!)
        .filter(Boolean);

  return (
    <section id="certifications" className="bg-background px-6 py-8 sm:px-8 md:py-12">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          index="04"
          title="Certifications"
          tag="Credentials"
          description="Credentials that back the work."
        />

        {showAll && (
          <div className="mb-8 flex flex-wrap gap-2">
            {['All', ...certCategories].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`inline-flex items-center rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors duration-200 ${
                  activeCategory === category
                    ? 'border-accent text-accent'
                    : 'border-line bg-surface text-foreground hover:border-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {visible.map((cert) => {
            const card = (
              <div className="flex w-full flex-1 flex-col items-center justify-center rounded-xl border border-line/70 p-6 text-center dark:border-white/10">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-line bg-background/60 backdrop-blur-sm dark:border-white/10 dark:bg-white/10">
                  <BrandLogo issuer={cert.issuer} size="sm" />
                </div>
                <h3 className="mt-4 text-base font-bold leading-snug text-foreground">
                  {cert.name}
                </h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {cert.issuer}
                </p>
              </div>
            );

            const wrapper =
              'group flex flex-col items-center rounded-2xl border border-line bg-surface/60 p-1 text-center backdrop-blur-md transition-colors duration-200 hover:border-accent/40 dark:border-white/10 dark:bg-white/5';

            return showAll ? (
              <a key={cert.slug} href={cert.image} target="_blank" rel="noopener noreferrer" className={wrapper}>
                {card}
              </a>
            ) : (
              <Link key={cert.slug} href="/certifications" className={wrapper}>
                {card}
              </Link>
            );
          })}
        </div>

        {!showAll && (
          <Link
            href="/certifications"
            className="mt-8 inline-block font-mono text-xs text-muted-foreground transition-colors duration-200 hover:text-accent"
          >
            See more on page 2 →
          </Link>
        )}
      </div>
    </section>
  );
}
