import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { projectStacks, projects } from '../../lib/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Sidebar />
      <Header />
      <main>
        <article className="border-t border-line bg-background px-6 py-16 sm:px-8 md:py-24">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft
                size={12}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              back to projects
            </Link>

            <span className="mt-10 block font-mono text-xs text-accent">// 05</span>
            <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
              {project.title}
            </h1>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {project.role}
            </p>

            <div className="mt-8 h-px w-8 bg-accent" />

            <p className="mt-8 max-w-prose text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-1.5">
              {(projectStacks[project.key] || []).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-6 border-t border-line pt-6">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-normal text-foreground transition-colors hover:text-accent"
              >
                <ExternalLink size={14} aria-hidden="true" />
                View live
              </a>
              {project.githubUrl !== '#' && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Github size={14} aria-hidden="true" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
