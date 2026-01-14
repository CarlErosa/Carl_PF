'use client';

import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation();

  const projects = [
    {
      title: 'Verde',
      description: 'A sustainability-focused mobile/web platform that helps users track their eco-friendly habits and environmental impact. The system visualizes daily progress, rewards consistent green actions, and encourages community-driven sustainability challenges.',
      role: 'Fullstack Developer',
      liveUrl: 'https://verdepm.vercel.app/',
      githubUrl: 'https://github.com/marvinjameserosa/verdepm'
    },
    {
      title: 'ICPEP NCR Website',
      description: 'A modern, streamlined CRM interface designed for ICPEP NCR to help them manage member records, events, and organizational operations. Built with an intuitive UX for non-technical users, the UI improves workflow efficiency and centralizes key organizational data.',
      role: 'UI/UX Designer',
      liveUrl: 'https://icpepsencr.vercel.app/',
      githubUrl: 'https://github.com/icpepsepupm/ICPEP-NCR_CRM-Website'
    },
    {
      title: 'LOGISTIQ',
      description: 'A logistics management dashboard that optimizes delivery operations through real-time tracking, route insights, and automated status updates. The platform simplifies fleet coordination, reduces delays, and provides a clean analytic view of operational performance.',
      role: 'Fullstack Developer',
      liveUrl: 'https://logistiq.onrender.com/',
      githubUrl: 'https://github.com/red-sakai/LogistIQ'
    },
    {
      title: 'Weathering With Us',
      description: 'A weather-based companion app that personalizes recommendations depending on real-time conditions — whether it\'s what to wear, when to leave, or how to prepare. It creates a friendly, humanized experience around weather forecasting.',
      role: 'Fullstack Developer',
      liveUrl: 'https://weatheringwithus.vercel.app/',
      githubUrl: 'https://github.com/CarlErosa/Weathering-With-Us'
    },
    {
      title: 'BatchMail',
      description: 'A lightweight automation tool that sends event-triggered email messages. Designed to reduce repetitive communication tasks, the system supports templating, batching, and integrations to streamline outreach for teams and organizations.',
      role: 'Backend Developer',
      liveUrl: 'https://batchmailbeta.vercel.app/',
      githubUrl: 'https://github.com/marvinjameserosa/batchmail'
    },
    {
      title: 'Algohub',
      description: 'A centralized learning platform for algorithms and data structures, offering interactive visualizations, problem walkthroughs, and step-by-step animations. Built to help beginners understand complex concepts through simplified, visual-first explanations.',
      role: 'Fullstack Developer',
      liveUrl: 'https://algohub-dsa.vercel.app/learn',
      githubUrl: 'https://github.com/red-sakai/Algohub'
    }
  ];

  return (
    <section id="projects" ref={ref} className="bg-[#f5f1e8] px-8 md:px-16 lg:px-24 py-20 md:py-24 relative">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none bg-noise"></div>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-4xl md:text-5xl font-bold text-[#334B35] mb-4">Projects</h3>
          <div className="w-24 h-1 bg-yellow-400 rounded-full mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/20 text-[#334B35] hover:shadow-xl transition-all duration-700 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-2xl font-bold">{project.title}</h4>
                <span className="inline-block px-3 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-full whitespace-nowrap ml-2">
                  {project.role}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{project.description}</p>
              <div className="flex gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#334B35] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#4a6b49] text-white transition-colors duration-300 text-center"
                >
                  View
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-transparent px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 text-[#334B35] border-2 border-[#334B35] transition-colors duration-300 text-center"
                >
                  Github
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
