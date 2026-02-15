'use client';

import { useRef, useMemo, useEffect, useState, ReactElement } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Skill data                                                         */
/* ------------------------------------------------------------------ */
interface SkillDef {
  label: string;
  icon: string;
  ring: number; // 0 = inner, 1 = mid, 2 = outer
}

const skills: SkillDef[] = [
  { label: 'React', icon: '/assets/icons/react.svg', ring: 0 },
  { label: 'Next.js', icon: '/assets/icons/nextjs.svg', ring: 0 },
  { label: 'Figma', icon: '/assets/icons/figma.svg', ring: 0 },
  { label: 'Tailwind', icon: '/assets/icons/tailwind.svg', ring: 0 },
  { label: 'JavaScript', icon: '/assets/icons/javascript.svg', ring: 1 },
  { label: 'Python', icon: '/assets/icons/python.svg', ring: 1 },
  { label: 'SQL', icon: '/assets/icons/sql.svg', ring: 1 },
  { label: 'HTML', icon: '/assets/icons/html.svg', ring: 1 },
  { label: 'CSS', icon: '/assets/icons/css.svg', ring: 1 },
  { label: 'Node.js', icon: '/assets/icons/nodejs.svg', ring: 2 },
  { label: 'Supabase', icon: '/assets/icons/supabase.svg', ring: 2 },
  { label: 'Git', icon: '/assets/icons/git.svg', ring: 2 },
  { label: 'Photoshop', icon: '/assets/icons/photoshop.svg', ring: 2 },
  { label: 'Canva', icon: '/assets/icons/canva.svg', ring: 2 },
  { label: 'TypeScript', icon: '/assets/icons/typescript.svg', ring: 2 },
];

const ringCfg = [
  { radius: 1.8, speed: 0.15, tilt: 0.3, dir: 1 },
  { radius: 2.6, speed: 0.1, tilt: -0.2, dir: -1 },
  { radius: 3.4, speed: 0.07, tilt: 0.15, dir: 1 },
];

/* ------------------------------------------------------------------ */
/*  Wireframe globe                                                    */
/* ------------------------------------------------------------------ */
function WireGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08;
      meshRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.35, 32, 32]} />
      <meshBasicMaterial
        color="#4a7c59"
        wireframe
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Atmosphere glow (two layers)                                       */
/* ------------------------------------------------------------------ */
function Atmosphere() {
  return (
    <>
      <mesh>
        <sphereGeometry args={[1.42, 32, 32]} />
        <meshBasicMaterial
          color="#5a8f6a"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial
          color="#334B35"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Latitude / longitude lines (extra detail)                          */
/* ------------------------------------------------------------------ */
function GridLines() {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.08;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  const lines = useMemo(() => {
    const items: ReactElement[] = [];
    // Latitude
    for (let i = 1; i < 6; i++) {
      const phi = (i / 6) * Math.PI;
      const r = Math.sin(phi) * 1.36;
      const y = Math.cos(phi) * 1.36;
      items.push(
        <mesh key={`lat-${i}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.003, r + 0.003, 64]} />
          <meshBasicMaterial color="#5a8f6a" transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
      );
    }
    return items;
  }, []);

  return <group ref={ref}>{lines}</group>;
}

/* ------------------------------------------------------------------ */
/*  Orbital ring track (visible ellipse)                               */
/* ------------------------------------------------------------------ */
function OrbitalTrack({ radius, tilt }: { radius: number; tilt: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * Math.sin(tilt) * radius * 0.3,
          Math.sin(angle) * radius
        )
      );
    }
    return pts;
  }, [radius, tilt]);

  const geom = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial color="#5a8f6a" transparent opacity={0.15} />
    </line>
  );
}

/* ------------------------------------------------------------------ */
/*  Single orbiting skill icon                                         */
/* ------------------------------------------------------------------ */
function OrbitingSkill({
  skill,
  ring,
  index,
  total,
}: {
  skill: SkillDef;
  ring: (typeof ringCfg)[0];
  index: number;
  total: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const offset = (index / total) * Math.PI * 2;
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * ring.speed * ring.dir + offset;
    groupRef.current.position.set(
      Math.cos(t) * ring.radius,
      Math.sin(t) * Math.sin(ring.tilt) * ring.radius * 0.3,
      Math.sin(t) * ring.radius
    );
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0} floatIntensity={0.3} floatingRange={[-0.05, 0.05]}>
        <Html
          center
          distanceFactor={6}
          style={{ pointerEvents: 'auto' }}
          zIndexRange={[50, 0]}
        >
          <div
            className="relative group cursor-default"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div
              className={`
                w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center
                border backdrop-blur-sm transition-all duration-300
                ${hovered
                  ? 'bg-white/95 border-[#5a8f6a]/50 shadow-lg shadow-[#5a8f6a]/20 scale-125'
                  : 'bg-white/80 border-[#D1CBBF]/60 shadow-md shadow-black/5'
                }
              `}
            >
              <img
                src={skill.icon}
                alt={skill.label}
                className="w-5 h-5 sm:w-6 sm:h-6"
                draggable={false}
              />
            </div>
            <div
              className={`
                absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5
                bg-[#2D3F2E] text-[#F5F1E8] text-[10px] font-medium rounded
                whitespace-nowrap pointer-events-none transition-opacity duration-200
                ${hovered ? 'opacity-100' : 'opacity-0'}
              `}
            >
              {skill.label}
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Star particles background                                          */
/* ------------------------------------------------------------------ */
function Stars({ count = 300 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  const sizes = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = 0.02 + Math.random() * 0.04;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#8aad8c"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating particles near globe                                      */
/* ------------------------------------------------------------------ */
function NearParticles({ count = 80 }: { count?: number }) {
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
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#7ba47d"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.4}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Camera rig (gentle idle sway)                                      */
/* ------------------------------------------------------------------ */
function CameraRig() {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.1) * 0.3;
    camera.position.y = Math.cos(t * 0.08) * 0.2 + 0.3;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  Scene composite                                                    */
/* ------------------------------------------------------------------ */
function Scene() {
  const rings = [0, 1, 2].map((r) => skills.filter((s) => s.ring === r));

  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />

      {/* Background particles */}
      <Stars count={300} />
      <NearParticles count={80} />

      {/* Globe */}
      <WireGlobe />
      <Atmosphere />
      <GridLines />

      {/* Orbital tracks */}
      {ringCfg.map((cfg, i) => (
        <OrbitalTrack key={i} radius={cfg.radius} tilt={cfg.tilt} />
      ))}

      {/* Orbiting skill icons */}
      {rings.map((ringSkills, ringIdx) =>
        ringSkills.map((skill, skillIdx) => (
          <OrbitingSkill
            key={skill.label}
            skill={skill}
            ring={ringCfg[ringIdx]}
            index={skillIdx}
            total={ringSkills.length}
          />
        ))
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported component                                                 */
/* ------------------------------------------------------------------ */
export default function SkillGlobe() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      className={`w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] md:w-[520px] md:h-[520px] transition-opacity duration-1000 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Canvas
        camera={{ position: [0, 0.3, 6], fov: 40 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
