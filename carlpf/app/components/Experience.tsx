'use client';

import Link from 'next/link';
import { experiences } from '../lib/experience';
import SectionHeading from './SectionHeading';

const featured = ['director-of-engineering', 'vice-president-for-technology', 'web-infrastructure-specialist'];

export default function Experience({ showAll = false }: { showAll?: boolean }) {
  const visible = showAll ? experiences : experiences.filter((e) => featured.includes(e.slug));
  return (
    <section id="experience" className="border-t border-line bg-background px-6 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          index="03"
          title="Experience"
          description="Organizations I've led and built with — engineering at national scale."
        />

        <div className="divide-y divide-line border-y border-line">
          {visible.map((role, index) => (
            <Link
              key={role.slug}
              href={`/experience/${role.slug}`}
              className="group grid grid-cols-1 gap-3 py-6 transition-colors duration-200 hover:bg-surface sm:grid-cols-12 sm:gap-8"
            >
              <span className="font-mono text-xs text-faint-foreground sm:col-span-1">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="sm:col-span-11">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-normal tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent">
                    {role.title}
                  </h3>
                  <span className="font-mono text-xs text-faint-foreground">
                    {role.period}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">{role.org}</p>
              </div>
            </Link>
          ))}
        </div>

        {!showAll && (
          <Link
            href="/experience"
            className="mt-8 inline-block font-mono text-xs text-muted-foreground transition-colors duration-200 hover:text-accent"
          >
            See more →
          </Link>
        )}
      </div>
    </section>
  );
}
