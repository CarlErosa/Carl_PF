import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { experiences } from '../../lib/experience';

export function generateStaticParams() {
  return experiences.map((role) => ({ slug: role.slug }));
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = experiences.find((r) => r.slug === slug);
  if (!role) notFound();

  return (
    <>
      <Sidebar />
      <Header />
      <main>
        <article className="border-t border-line bg-background px-6 py-16 sm:px-8 md:py-24">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/experience"
              className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft
                size={12}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              back to experience
            </Link>

            <span className="mt-10 block font-mono text-xs text-accent">// 03</span>
            <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
              {role.title}
            </h1>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              {role.org}
            </p>
            <p className="mt-1.5 font-mono text-xs text-faint-foreground">
              {role.period}
              {role.duration && <span> &middot; {role.duration}</span>}
            </p>

            {role.points && role.points.length > 0 && (
              <>
                <div className="mt-8 h-px w-8 bg-accent" />
                <ul className="mt-8 space-y-4">
                  {role.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-line" />
                      {point}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
