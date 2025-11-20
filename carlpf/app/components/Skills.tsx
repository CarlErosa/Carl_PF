'use client';

import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Skills() {
  const { ref, isVisible } = useScrollAnimation();
  
  const skills = {
    uiDesign: [
      { name: 'Figma', level: 90 },
      { name: 'Photoshop', level: 75 },
      { name: 'Canva', level: 85 }
    ],
    frontend: [
      { name: 'React & Next.js', level: 80 },
      { name: 'JavaScript', level: 70 },
      { name: 'HTML/CSS', level: 89 },
      { name: 'Tailwind', level: 83 }
    ],
    backend: [
      { name: 'SQL', level: 50 },
      { name: 'Supabase', level: 30 },
      { name: 'Node.js', level: 30 },
      { name: 'Python', level: 50 }
    ]
  };

  return (
    <section id="skills" ref={ref} className="bg-[#f5f1e8] px-8 md:px-16 lg:px-24 py-20 md:py-24 relative">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none bg-noise"></div>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-4xl md:text-5xl font-bold text-[#334B35] mb-4">Skills at a glance</h3>
          <div className="w-24 h-1 bg-yellow-400 rounded-full mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* UI Design */}
          <div className={`group bg-white/60 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-sm border border-white/20 hover:shadow-xl transition-all duration-700 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
            <h4 className="text-2xl font-bold mb-8 text-center text-[#334B35]">UI DESIGN</h4>
            <div className="space-y-6 text-[#334B35]">
              {skills.uiDesign.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm font-semibold text-[#6b8e6a]">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-[#6b8e6a] to-[#4a6b49] h-2.5 rounded-full transition-all duration-1000 ease-out animate-fill shadow-sm"
                      style={{ width: `${skill.level}%`, animationDelay: `${index * 0.1}s` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frontend */}
          <div className={`group bg-white/60 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-sm border border-white/20 hover:shadow-xl transition-all duration-700 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
            <h4 className="text-2xl font-bold mb-8 text-center text-[#334B35]">Frontend</h4>
            <div className="space-y-6 text-[#334B35]">
              {skills.frontend.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm font-semibold text-[#6b8e6a]">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-[#6b8e6a] to-[#4a6b49] h-2.5 rounded-full transition-all duration-1000 ease-out animate-fill shadow-sm"
                      style={{ width: `${skill.level}%`, animationDelay: `${index * 0.1}s` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend & Database */}
          <div className={`group bg-white/60 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-sm border border-white/20 hover:shadow-xl transition-all duration-700 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
            <h4 className="text-2xl font-bold mb-8 text-center text-[#334B35]">Backend & Database</h4>
            <div className="space-y-6 text-[#334B35]">
              {skills.backend.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm font-semibold text-[#6b8e6a]">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-[#6b8e6a] to-[#4a6b49] h-2.5 rounded-full transition-all duration-1000 ease-out animate-fill shadow-sm"
                      style={{ width: `${skill.level}%`, animationDelay: `${index * 0.1}s` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
