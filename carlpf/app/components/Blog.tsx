'use client';

import Link from 'next/link';
import { posts } from '../lib/posts';
import SectionHeading from './SectionHeading';

export default function Blog() {
  return (
    <section id="blog" className="bg-background px-6 py-8 sm:px-8 md:py-12">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          index="01"
          title="Blog"
          tag="Columns"
          description="Notes on systems, scale, and shipping."
        />

        <div className="divide-y divide-line border-y border-line">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group grid grid-cols-1 gap-3 py-6 transition-colors duration-200 hover:bg-surface sm:grid-cols-12 sm:gap-8"
            >
              <span className="font-mono text-xs text-faint-foreground sm:col-span-1">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="sm:col-span-11">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-normal tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent">
                    {post.title}
                  </h3>
                  {post.published ? (
                    <span className="font-mono text-xs text-faint-foreground">
                      {post.date}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-background px-3 py-1 font-mono text-xs text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Draft
                    </span>
                  )}
                </div>

                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>

                <div className="mt-3">
                  {post.published ? (
                    <span className="font-mono text-xs text-faint-foreground">
                      read post
                    </span>
                  ) : (
                    <span className="font-mono text-xs text-faint-foreground">
                      coming soon
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
