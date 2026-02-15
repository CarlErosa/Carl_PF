'use client';

import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation();

  const projects = [
    {
      title: 'Verde',
      description:
        'A sustainability-focused platform that helps users track eco-friendly habits and environmental impact with daily progress visualization and community challenges.',
      role: 'Fullstack Developer',
      liveUrl: 'https://verdepm.vercel.app/',
      githubUrl: 'https://github.com/marvinjameserosa/verdepm',
    },
    {
      title: 'ICPEP NCR Website',
      description:
        'A modern CRM interface for ICPEP NCR to manage member records, events, and organizational operations with an intuitive UX for non-technical users.',
      role: 'UI/UX Designer',
      liveUrl: 'https://icpepsencr.vercel.app/',
      githubUrl: 'https://github.com/icpepsepupm/ICPEP-NCR_CRM-Website',
    },
    {
      title: 'LOGISTIQ',
      description:
        'A logistics management dashboard optimizing delivery operations through real-time tracking, route insights, and automated status updates.',
      role: 'Fullstack Developer',
      liveUrl: 'https://logistiq.onrender.com/',
      githubUrl: 'https://github.com/red-sakai/LogistIQ',
    },
    {
      title: 'Weathering With Us',
      description:
        "A weather companion app that personalizes recommendations based on real-time conditions -- what to wear, when to leave, how to prepare.",
      role: 'Fullstack Developer',
      liveUrl: 'https://weatheringwithus.vercel.app/',
      githubUrl: 'https://github.com/CarlErosa/Weathering-With-Us',
    },
    {
      title: 'BatchMail',
      description:
        'A lightweight automation tool for event-triggered email messages, supporting templating, batching, and integrations for team outreach.',
      role: 'Backend Developer',
      liveUrl: 'https://batchmailbeta.vercel.app/',
      githubUrl: 'https://github.com/marvinjameserosa/batchmail',
    },
    {
      title: 'Algohub',
      description:
        'A centralized learning platform for algorithms and data structures with interactive visualizations and step-by-step animations.',
      role: 'Fullstack Developer',
      liveUrl: 'https://algohub-dsa.vercel.app/learn',
      githubUrl: 'https://github.com/red-sakai/Algohub',
    },
  ];

  return (
    <section
      id="projects"
      ref={ref}
      className="bg-background px-6 md:px-8 lg:px-16 py-20 md:py-28 relative"
    >
      <div className="absolute inset-0 pointer-events-none bg-noise" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Projects
          </h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A selection of things I've built and collaborated on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-700 flex flex-col ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="flex items-start justify-between mb-3 gap-2">
                <h4 className="text-lg font-bold text-card-foreground">
                  {project.title}
                </h4>
                <span className="shrink-0 px-2.5 py-1 bg-accent/15 text-accent-foreground text-xs font-medium rounded-md">
                  {project.role}
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>
              <div className="flex gap-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary px-4 py-2.5 rounded-lg text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                  aria-label={`View ${project.title} live site`}
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  View
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-card-foreground border border-border hover:bg-secondary transition-colors"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <Github size={14} aria-hidden="true" />
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
