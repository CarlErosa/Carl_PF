'use client';

import Link from 'next/link';
import { projects } from '../lib/projects';
import SectionHeading from './SectionHeading';

const featured = ['verde', 'adph-registration-platform', 'icpep-ncr-website'];

export default function Projects({ showAll = false }: { showAll?: boolean }) {
  const visible = showAll ? projects : projects.filter((p) => featured.includes(p.slug));
  return (
    <section id="projects" className="bg-background px-6 py-8 sm:px-8 md:py-12">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          index="06"
          title="Projects"
          tag="Features"
          description="Systems and platforms I've designed and shipped — built to hold up under load."
        />

        <div className="divide-y divide-line border-y border-line">
          {visible.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group grid grid-cols-1 gap-3 py-6 transition-colors duration-200 hover:bg-surface sm:grid-cols-12 sm:gap-8"
            >
              <span className="font-mono text-xs text-faint-foreground sm:col-span-1">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="sm:col-span-11">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-normal tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent">
                    {project.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-faint-foreground">
                    {project.role}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!showAll && (
          <Link
            href="/projects"
            className="mt-8 inline-block font-mono text-xs text-muted-foreground transition-colors duration-200 hover:text-accent"
          >
            See more on page 2 →
          </Link>
        )}
      </div>
    </section>
  );
}
