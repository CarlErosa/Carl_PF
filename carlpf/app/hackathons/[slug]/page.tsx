import { ArrowLeft } from 'lucide-react';
import NextImage from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { hackathons } from '../../lib/hackathons';

export function generateStaticParams() {
  return hackathons.map((h) => ({ slug: h.slug }));
}

export default async function HackathonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hackathon = hackathons.find((h) => h.slug === slug);
  if (!hackathon) notFound();

  return (
    <>
      <Sidebar />
      <Header />
      <main>
        <article className="border-t border-line bg-background px-6 py-16 sm:px-8 md:py-24">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/hackathons"
              className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft
                size={12}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              back to hackathons
            </Link>

            <div className="relative mt-10 h-52 overflow-hidden rounded-xl border border-line">
              <NextImage
                src={hackathon.image}
                alt={`${hackathon.name} - ${hackathon.result}, ${hackathon.year}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 42rem"
              />
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-2.5 py-0.5 font-mono text-[11px] text-accent">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {hackathon.result}
              </span>
              <span className="font-mono text-[11px] text-faint-foreground">
                {hackathon.year}
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
              {hackathon.name}
            </h1>
            <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {hackathon.role}
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
