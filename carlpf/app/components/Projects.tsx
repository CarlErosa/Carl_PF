'use client';

import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectStack {
  [key: string]: string[];
}

const projectStacks: ProjectStack = {
  Verde: ['Next.js', 'PostgreSQL', 'API Integration', 'Node.js'],
  ADPH: ['Node.js', 'PostgreSQL', 'CI/CD', 'Docker'],
  BatchMail: ['Node.js', 'Automation', 'PostgreSQL'],
  BlockBayan: ['Next.js', 'Solidity', 'Web3', 'TypeScript'],
  ICPEP: ['React', 'TypeScript', 'Tailwind'],
  LOGISTIQ: ['React', 'Node.js', 'PostgreSQL'],
  Weathering: ['Next.js', 'React', 'API Integration'],
  Algohub: ['React', 'TypeScript', 'Next.js'],
};

const projects = [
  {
    title: 'Verde',
    description:
      'ESG platform for tracking carbon emissions in construction. 1st Runner-Up, PUP Uthak Hackathon. Built real-time data processing and API integration.',
    role: 'Fullstack Engineer',
    liveUrl: 'https://verdepm.vercel.app/',
    githubUrl: 'https://github.com/marvinjameserosa/verdepm',
    key: 'Verde',
  },
  {
    title: 'ADPH Registration Platform',
    description:
      'National registration platform for Arduino Day Philippines handling 50,000+ requests and 1,000+ concurrent users. Full CI/CD lifecycle, query optimization, production rollout.',
    role: 'Infrastructure & Backend Engineer',
    liveUrl: 'https://join.arduinodayphilippines.cc/',
    githubUrl: '#',
    key: 'ADPH',
  },
  {
    title: 'BatchMail',
    description:
      'Automated bulk email system for 1,000+ users. Batch processing and automation workflows.',
    role: 'Backend Engineer',
    liveUrl: 'https://batchmailbeta.vercel.app/',
    githubUrl: 'https://github.com/marvinjameserosa/batchmail',
    key: 'BatchMail',
  },
  {
    title: 'BlockBayan',
    description:
      'Blockchain-based donation tracker for transparent transactions. Top 8, PUP ICTO Hackathon.',
    role: 'Fullstack Engineer',
    liveUrl: 'https://blockbayan.vercel.app/',
    githubUrl: '#',
    key: 'BlockBayan',
  },
  {
    title: 'ICPEP NCR Website',
    description:
      'A modern CRM interface for ICPEP NCR to manage member records, events, and organizational operations with an intuitive UX for non-technical users.',
    role: 'UI/UX Designer',
    liveUrl: 'https://icpepsencr.vercel.app/',
    githubUrl: 'https://github.com/icpepsepupm/ICPEP-NCR_CRM-Website',
    key: 'ICPEP',
  },
  {
    title: 'LOGISTIQ',
    description:
      'A logistics management dashboard optimizing delivery operations through real-time tracking, route insights, and automated status updates.',
    role: 'Fullstack Developer',
    liveUrl: 'https://logistiq.onrender.com/',
    githubUrl: 'https://github.com/red-sakai/LogistIQ',
    key: 'LOGISTIQ',
  },
  {
    title: 'Weathering With Us',
    description:
      'A weather companion app that personalizes recommendations based on real-time conditions — what to wear, when to leave, how to prepare.',
    role: 'Fullstack Developer',
    liveUrl: 'https://weatheringwithus.vercel.app/',
    githubUrl: 'https://github.com/CarlErosa/Weathering-With-Us',
    key: 'Weathering',
  },
  {
    title: 'Algohub',
    description:
      'A centralized learning platform for algorithms and data structures with interactive visualizations and step-by-step animations.',
    role: 'Fullstack Developer',
    liveUrl: 'https://algohub-dsa.vercel.app/learn',
    githubUrl: 'https://github.com/red-sakai/Algohub',
    key: 'Algohub',
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-background px-8 md:px-12 lg:px-16 py-28 md:py-36 relative border-t border-border"
    >
      <div className="absolute inset-0 pointer-events-none bg-noise" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-5 text-balance text-glow">
            Projects
          </h3>
          <p className="text-muted-foreground font-mono text-base max-w-lg mx-auto">
            Systems and platforms I&apos;ve built.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              viewport={{ once: true, margin: '-80px' }}
              whileHover={{ scale: 1.02 }}
              className="group card-glow rounded-xl transition-all duration-300 hover:shadow-[0_0_24px_rgba(109,63,214,0.2)] flex flex-col relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-[rgba(63,214,255,0.06)] to-transparent pointer-events-none" />
              <div className="p-8 flex flex-col flex-1 relative z-10">
                <div className="flex items-start justify-between mb-4 gap-3">
                  <h4 className="text-xl font-bold text-foreground group-hover:text-[#3fd6ff] transition-colors duration-300">
                    {project.title}
                  </h4>
                  <span className="shrink-0 px-3 py-1 border border-[#1f1f2e] bg-[#181826] text-[#3fd6ff] text-sm font-mono rounded-md">
                    {project.role}
                  </span>
                </div>
                <p className="text-muted-foreground text-base leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(projectStacks[project.key] || []).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm font-mono rounded-full border border-[#1f1f2e] bg-[#181826] text-[#3fd6ff]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#6d3fd6] px-6 py-3.5 min-h-[48px] rounded-full text-base font-medium text-[#e8e8f2] hover:bg-[#7a4be8] hover:shadow-[0_0_24px_rgba(109,63,214,0.5)] transition-all duration-300 group/btn"
                    aria-label={`View ${project.title} live site`}
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    View
                    <span className="inline-block opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-200">
                      →
                    </span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full text-base font-medium text-foreground border border-border hover:bg-[#1a1a26] hover:border-[#3fd6ff] hover:shadow-[0_0_20px_rgba(63,214,255,0.25)] transition-all duration-300 group/btn"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <Github size={16} aria-hidden="true" />
                    GitHub
                    <span className="inline-block opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-200">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
