'use client';

import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

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
      rotation: '-4deg',
      image: '/assets/lanyard/icto.jpg'
    },
    {
      name: 'BPI Datawave',
      year: '2025',
      role: 'Developer & Researcher',
      placement: 'Participant',
      rotation: '3deg',
      image: '/assets/lanyard/bpi.png'
    },
    {
      name: 'Uthak',
      year: '2025',
      role: 'Frontend Developer',
      placement: 'Finalist',
      rotation: '-2deg',
      image: '/assets/lanyard/uthak.jpg'
    }
  ];

  const experiences = [
    {
      organization: 'ICPEP Student Edition - PUP Manila',
      logo: '/assets/lanyard/icpep.jpg',
      positions: [
        { title: 'Vice President For Technology', period: 'Sep 2025 - Present', duration: '3 mos' },
        { title: 'Head of Technology Department', period: 'Apr 2024 - Sep 2025', duration: '1 yr 6 mos' }
      ],
      type: 'Full-time',
      totalDuration: '1 yr 8 mos'
    },
    {
      organization: 'Cisco NetConnect PUP - Manila',
      logo: '/assets/lanyard/cisco.jpg',
      positions: [
        { title: 'Chief Administrative Officer (CAO)', period: 'Nov 2025 - Present', duration: '1 mo' }
      ],
      type: 'Full-time'
    },
    {
      organization: 'CyberPH',
      logo: '/assets/lanyard/cyberph.jpg',
      positions: [
        { title: 'Research and Development Team Member', period: 'Sep 2025 - Present', duration: '3 mos' }
      ],
      type: 'Full-time'
    },
    {
      organization: 'Google Developer Groups on Campus PUP',
      logo: '/assets/lanyard/gdg.jpg',
      positions: [
        { title: 'IoT Learning Head', period: 'Sep 2025 - Present', duration: '3 mos' },
        { title: 'Cybersecurity Cadet', period: 'Oct 2024 - Sep 2025', duration: '1 yr' }
      ],
      type: 'Full-time',
      totalDuration: '1 yr 2 mos'
    },
    {
      organization: 'PUP Hygears',
      logo: '/assets/lanyard/hygears.jpg',
      positions: [
        { title: 'Technical Team Member', period: 'Nov 2025 - Present', duration: '1 mo' }
      ],
      type: 'Full-time'
    }
  ];

  return (
    <section id="hackathons" ref={ref} className="bg-[#F7F5EF] px-8 md:px-16 lg:px-24 py-20 md:py-24 relative">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none bg-noise"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-4xl md:text-5xl font-bold text-[#3A4F2D] mb-8">Achievements & Experience</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Showcasing my competitive achievements and professional journey in tech.
          </p>

          {/* Tabs */}
          <div className="inline-flex bg-white/60 backdrop-blur-sm rounded-full p-1.5 shadow-md border border-gray-200">
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === 'achievements'
                ? 'bg-[#334B35] text-white shadow-md'
                : 'text-gray-600 hover:text-[#334B35]'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Achievements
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === 'experience'
                ? 'bg-[#334B35] text-white shadow-md'
                : 'text-gray-600 hover:text-[#334B35]'
                }`}
            >
              <span className="text-base font-bold">&lt;/&gt;</span>
              Experience
            </button>
          </div>
        </div>

        {/* Achievements Tab (Hackathons) */}
        {activeTab === 'achievements' && (
          <div className="flex flex-wrap justify-center items-end gap-8 md:gap-12">
            {hackathons.map((hackathon, index) => (
              <div
                key={index}
                className={`group flex flex-col items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200 + 200}ms` }}
              >
                <div
                  className="w-56 h-72 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:rotate-0 cursor-pointer"
                  style={{ transform: `rotate(${hackathon.rotation})` }}
                  onClick={() => setSelectedImage(hackathon.image)}
                >
                  <div className="w-full h-full relative">
                    <img
                      src={hackathon.image}
                      alt={hackathon.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-6 text-center max-w-xs">
                  <h4 className="text-lg font-semibold text-[#3A4F2D] mb-1">{hackathon.name}</h4>
                  <p className="text-sm text-gray-600">
                    {hackathon.role} • {hackathon.year}
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 bg-[#F5D86E] text-black text-xs font-semibold rounded-full">
                    {hackathon.placement}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience Tab */}
        {
          activeTab === 'experience' && (
            <div className="max-w-4xl mx-auto space-y-4">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-xl hover:border-[#F5D86E]/50 hover:-translate-y-1 transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    {exp.logo && (
                      <div className="shrink-0 w-14 h-14 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                        <img src={exp.logo} alt={exp.organization} className="w-10 h-10 object-contain" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-[#3A4F2D] mb-1 group-hover:text-[#334B35] transition-colors">{exp.organization}</h4>
                      {exp.totalDuration && (
                        <p className="text-sm text-gray-500 mb-3">{exp.type} • {exp.totalDuration}</p>
                      )}
                      <div className="space-y-3">
                        {exp.positions.map((pos, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-[#F5D86E] rounded-full mt-1.5 shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                            <div>
                              <p className="font-semibold text-[#334B35]">{pos.title}</p>
                              <p className="text-sm text-gray-600">{pos.period} • {pos.duration}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </div >

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-16 right-4 p-3 bg-white hover:bg-gray-100 rounded-full text-[#334B35] transition-all shadow-lg border-2 border-[#334B35]/20 z-10 hover:scale-110"
                aria-label="Close image"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
              <img
                src={selectedImage}
                alt="Selected achievement"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section >
  );
}
