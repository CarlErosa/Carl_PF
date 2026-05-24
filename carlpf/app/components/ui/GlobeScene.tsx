'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { label: 'React', icon: '/assets/icons/react.svg' },
  { label: 'Next.js', icon: '/assets/icons/nextjs.svg' },
  { label: 'Figma', icon: '/assets/icons/figma.svg' },
  { label: 'Tailwind', icon: '/assets/icons/tailwind.svg' },
  { label: 'JavaScript', icon: '/assets/icons/javascript.svg' },
  { label: 'Python', icon: '/assets/icons/python.svg' },
  { label: 'SQL', icon: '/assets/icons/sql.svg' },
  { label: 'HTML', icon: '/assets/icons/html.svg' },
  { label: 'CSS', icon: '/assets/icons/css.svg' },
  { label: 'Node.js', icon: '/assets/icons/nodejs.svg' },
  { label: 'Supabase', icon: '/assets/icons/supabase.svg' },
  { label: 'Git', icon: '/assets/icons/git.svg' },
  { label: 'Photoshop', icon: '/assets/icons/photoshop.svg' },
  { label: 'Canva', icon: '/assets/icons/canva.svg' },
  { label: 'TypeScript', icon: '/assets/icons/typescript.svg' },
];

const GLOBE_RADIUS = 1.35;
const LOGO_RADIUS = 2.0;

function useFibonacciSphere(count: number, radius: number) {
  return useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      positions.push(
        new THREE.Vector3(
          Math.cos(theta) * r * radius,
          y * radius,
          Math.sin(theta) * r * radius
        )
      );
    }
    return positions;
  }, [count, radius]);
}

function WireGlobe() {
  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
      <meshBasicMaterial
        color="#3A5E3D"
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

function Atmosphere() {
  return (
    <>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.05, 32, 32]} />
        <meshBasicMaterial
          color="#3A5E3D"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.18, 32, 32]} />
        <meshBasicMaterial
          color="#3A5E3D"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
}

function SurfaceLogos() {
  const positions = useFibonacciSphere(skills.length, LOGO_RADIUS);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      {skills.map((skill, i) => {
        const pos = positions[i];
        return (
          <group key={skill.label} position={pos}>
            <Html
              center
              distanceFactor={7}
              style={{ pointerEvents: 'auto' }}
              zIndexRange={[50, 0]}
            >
              <div
                className="relative select-none"
                onMouseEnter={() => setHovered(skill.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border backdrop-blur-sm transition-all duration-300 ${
                    hovered === skill.label
                      ? 'bg-white/95 border-[#6FCF7C]/50 shadow-lg shadow-[#6FCF7C]/30 scale-125'
                      : 'bg-white/80 border-[#1F2D22]/60 shadow-md shadow-black/5'
                  }`}
                >
                  <img
                    src={skill.icon}
                    alt={skill.label}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    draggable={false}
                  />
                </div>
                <div
                  className={`absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#1F2D22] text-[#E8EDE9] text-[10px] font-medium rounded whitespace-nowrap pointer-events-none transition-opacity duration-200 ${
                    hovered === skill.label ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {skill.label}
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </>
  );
}

function Stars({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      siz[i] = 0.02 + Math.random() * 0.04;
    }
    return [pos, siz];
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#3A5E3D"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.4}
      />
    </points>
  );
}

function NearParticles({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#3A5E3D"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.3}
      />
    </points>
  );
}

function Scene({ onDragChange }: { onDragChange: (dragging: boolean) => void }) {
  const controlsRef = useRef<any>(null);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />

      <Stars count={200} />
      <NearParticles count={60} />

      <WireGlobe />
      <Atmosphere />

      <SurfaceLogos />

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        dampingFactor={0.08}
        rotateSpeed={0.6}
        onStart={() => onDragChange(true)}
        onEnd={() => onDragChange(false)}
      />
    </>
  );
}

export default function GlobeScene() {
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] md:w-[600px] md:h-[600px] lg:w-[680px] lg:h-[680px] transition-opacity duration-1000 ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <Canvas
        camera={{ position: [0, 0.3, 6], fov: 40 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene onDragChange={setIsDragging} />
      </Canvas>
    </div>
  );
}
