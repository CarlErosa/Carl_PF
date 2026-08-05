import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { posts } from '../../lib/posts';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <Sidebar />
      <Header />
      <main>
        <article className="border-t border-line bg-background px-6 py-16 sm:px-8 md:py-24">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft
                size={12}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              back to blog
            </Link>

            <span className="mt-10 block font-mono text-xs text-accent">// 01</span>
            <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
              {post.title}
            </h1>

            {post.published && post.date ? (
              <p className="mt-3 font-mono text-xs text-faint-foreground">{post.date}</p>
            ) : (
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 font-mono text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Draft
              </span>
            )}

            <div className="mt-8 h-px w-8 bg-accent" />

            <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>{post.excerpt}</p>
              {!post.published && (
                <p className="font-mono text-xs text-faint-foreground">
                  coming soon
                </p>
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
