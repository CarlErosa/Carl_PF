'use client';

import RotatingText from './ui/RotatingText';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import NextImage from 'next/image';

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <>
      <section id="about" ref={ref} className="bg-[#8b9d8a] px-8 md:px-16 lg:px-24 py-20 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            {/* Photo - 4 columns */}
            <div className={`md:col-span-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-2xl"></div>
                <div className="relative w-full h-80 md:h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg border-2 border-white/50 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
                  <NextImage
                    src="/assets/lanyard/picture.jpg"
                    alt="Carl Erosa"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            </div>

            {/* Content - 8 columns */}
            <div className={`md:col-span-8 text-white space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-3xl md:text-5xl font-bold mb-8">
                <span className="text-white">About </span>
                <span className="inline-block">
                  <span className="inline-block bg-yellow-400 px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <RotatingText
                      texts={['Me', 'Carl', 'a Developer']}
                      rotationInterval={2500}
                      staggerDuration={0.03}
                      mainClassName="text-black font-bold"
                    />
                  </span>
                </span>
              </h3>
              <div className="space-y-4 text-base md:text-lg leading-relaxed">
                <p>
                  I am a student taking a degree of <strong className="font-semibold text-yellow-300">Bachelor of Science in Computer Engineering</strong> at <strong className="font-semibold">Polytechnic University of the Philippines - Sta Mesa Manila</strong>.
                </p>
                <p>
                  I have been very fond of <strong className="font-semibold text-yellow-300">designing</strong>, whether it is for print or UI/UX designs. Though I may not be the best, I take pride in every output I make, treating it as a <strong className="font-semibold">piece of art and a product of my creativity</strong>, a piece of me.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white/25 border border-white/10">
                  <h5 className="font-bold mb-3 text-lg text-white">🛠️ Tools</h5>
                  <p className="text-sm leading-relaxed">Figma • React • Tailwind • Next.js</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white/25 border border-white/10">
                  <h5 className="font-bold mb-3 text-lg text-white">🎯 Focus</h5>
                  <p className="text-sm leading-relaxed">Design systems • Accessibility • Interaction design</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white/25 border border-white/10">
                  <h5 className="font-bold mb-3 text-lg text-white">⚡ Quick facts</h5>
                  <p className="text-sm leading-relaxed">Problem-solver • Team player • Frontend enthusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
