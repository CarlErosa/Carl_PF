'use client';

import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Briefcase } from 'lucide-react';
import NextImage from 'next/image';

export default function Hackathons() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState('achievements');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const hackathons = [
    {
      name: 'ICTO Hackathon',
      year: '2025',
      role: 'Frontend Developer',
      placement: 'Finalist',
      rotation: '-3deg',
      image: '/assets/lanyard/icto.jpg',
    },
    {
      name: 'BPI Datawave',
      year: '2025',
      role: 'Developer & Researcher',
      placement: 'Participant',
      rotation: '2deg',
      image: '/assets/lanyard/bpi.png',
    },
    {
      name: 'Uthak',
      year: '2025',
      role: 'Fullstack Developer',
      placement: '1st Runner Up',
      rotation: '-2deg',
      image: '/assets/lanyard/uthak.jpg',
    },
  ];

  const experiences = [
    {
      organization: 'ICPEP Student Edition - PUP Manila',
      logo: '/assets/lanyard/icpep.jpg',
      positions: [
        {
          title: 'Vice President For Technology',
          period: 'Sep 2025 - Present',
          duration: '3 mos',
        },
        {
          title: 'Head of Technology Department',
          period: 'Apr 2024 - Sep 2025',
          duration: '1 yr 6 mos',
        },
      ],
      totalDuration: '1 yr 8 mos',
    },
    {
      organization: 'Cisco NetConnect PUP - Manila',
      logo: '/assets/lanyard/cisco.jpg',
      positions: [
        {
          title: 'Chief Administrative Officer (CAO)',
          period: 'Nov 2025 - Present',
          duration: '1 mo',
        },
      ],
    },
    {
      organization: 'CyberPH',
      logo: '/assets/lanyard/cyberph.jpg',
      positions: [
        {
          title: 'Research and Development Team Member',
          period: 'Sep 2025 - Present',
          duration: '3 mos',
        },
      ],
    },
    {
      organization: 'Google Developer Groups on Campus PUP',
      logo: '/assets/lanyard/gdg.jpg',
      positions: [
        {
          title: 'IoT Learning Head',
          period: 'Sep 2025 - Present',
          duration: '3 mos',
        },
        {
          title: 'Cybersecurity Cadet',
          period: 'Oct 2024 - Sep 2025',
          duration: '1 yr',
        },
      ],
      totalDuration: '1 yr 2 mos',
    },
    {
      organization: 'PUP Hygears',
      logo: '/assets/lanyard/hygears.jpg',
      positions: [
        {
          title: 'Technical Team Member',
          period: 'Nov 2025 - Present',
          duration: '1 mo',
        },
      ],
    },
  ];

  return (
    <section
      id="hackathons"
      ref={ref}
      className="bg-secondary px-6 md:px-8 lg:px-16 py-20 md:py-28 relative"
    >
      <div className="absolute inset-0 pointer-events-none bg-noise" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Achievements & Experience
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Showcasing my competitive achievements and professional journey in
            tech.
          </p>

          {/* Tabs */}
          <div className="inline-flex bg-card rounded-full p-1 shadow-sm border border-border">
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'achievements'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Award size={16} aria-hidden="true" />
              Achievements
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'experience'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Briefcase size={16} aria-hidden="true" />
              Experience
            </button>
          </div>
        </div>

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="flex flex-wrap justify-center items-end gap-8 md:gap-12">
            {hackathons.map((hackathon, index) => (
              <div
                key={index}
                className={`group flex flex-col items-center transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200 + 200}ms` }}
              >
                <button
                  className="w-52 h-68 bg-card rounded-xl shadow-md border border-border overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:rotate-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{ transform: `rotate(${hackathon.rotation})` }}
                  onClick={() => setSelectedImage(hackathon.image)}
                  aria-label={`View ${hackathon.name} photo`}
                >
                  <div className="w-full h-full relative">
                    <NextImage
                      src={hackathon.image}
                      alt={`${hackathon.name} - ${hackathon.placement}, ${hackathon.year}`}
                      fill
                      className="object-cover"
                      sizes="208px"
                    />
                  </div>
                </button>
                <div className="mt-5 text-center max-w-xs">
                  <h4 className="text-base font-semibold text-foreground mb-1">
                    {hackathon.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {hackathon.role} &middot; {hackathon.year}
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                    {hackathon.placement}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`bg-card rounded-xl p-5 shadow-sm border border-border hover:shadow-md hover:border-accent/40 transition-all duration-300 ${
                  isVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  {exp.logo && (
                    <div className="shrink-0 w-12 h-12 bg-secondary rounded-lg border border-border flex items-center justify-center overflow-hidden">
                      <NextImage
                        src={exp.logo}
                        alt={`${exp.organization} logo`}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-card-foreground mb-1">
                      {exp.organization}
                    </h4>
                    {exp.totalDuration && (
                      <p className="text-xs text-muted-foreground mb-3">
                        {exp.totalDuration}
                      </p>
                    )}
                    <div className="flex flex-col gap-2">
                      {exp.positions.map((pos, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-accent rounded-full mt-1.5 shrink-0" />
                          <div>
                            <p className="font-medium text-sm text-card-foreground">
                              {pos.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {pos.period} &middot; {pos.duration}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-card hover:bg-secondary rounded-full text-card-foreground transition-all shadow-lg z-10"
                aria-label="Close image"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage}
                alt="Selected achievement"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
