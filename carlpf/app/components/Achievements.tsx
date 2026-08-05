'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import { hackathons } from '../lib/hackathons';
import SectionHeading from './SectionHeading';

export default function Achievements() {
  return (
    <section className="border-t border-line bg-surface px-6 py-10 sm:px-8 md:py-16">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          index="04"
          title="Hackathons"
          description="Ships that made it to judging — built fast, built to work."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {hackathons.map((a) => (
            <Link
              key={a.slug}
              href={`/hackathons/${a.slug}`}
              className="group overflow-hidden rounded-xl border border-line bg-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-20px_rgba(10,10,10,0.3)]"
            >
              <div className="relative h-32 overflow-hidden border-b border-line">
                <NextImage
                  src={a.image}
                  alt={`${a.name} - ${a.result}, ${a.year}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-2.5 py-0.5 font-mono text-[11px] text-accent">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {a.result}
                  </span>
                  <span className="font-mono text-[11px] text-faint-foreground">{a.year}</span>
                </div>
                <h3 className="text-base font-normal text-foreground transition-colors duration-200 group-hover:text-accent">
                  {a.name}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{a.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
