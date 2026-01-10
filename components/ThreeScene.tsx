import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Environment } from '@react-three/drei';
import * as THREE from 'three';

const MATH_ITEMS = [
  // Numbers
  '0', '1', '2', '3', '5', '7', '8', '9',
  // Basic Operators
  '+', '-', '×', '÷', '=', '≈', '≠', '±',
  // Greek & Math Symbols
  '∑', '∫', 'π', '√', '∞', '∂', '∆', '∇', '∀', '∃', '∈',
  // Variables & Trig
  'x', 'y', 'z', 'θ', 'sin', 'cos', 'tan', 'log', 'lim',
  // Formulas
  'E=mc²', 'a²+b²=c²', 'F=ma', 'e^{iπ}+1=0', 'A=πr²', 'V=IR'
];

interface MathParticleProps {
  isDarkMode: boolean;
  count?: number;
}

const MathParticles: React.FC<MathParticleProps> = ({ isDarkMode, count = 150 }) => {
  const group = useRef<THREE.Group>(null);
  
  // Generate random data for particles once
  const particles = useMemo(() => {
    return new Array(count).fill(0).map(() => {
      const symbol = MATH_ITEMS[Math.floor(Math.random() * MATH_ITEMS.length)];
      
      // Assembled Position (Sphere in center)
      // Radius distribution to make a solid core
      const r = 3 * Math.pow(Math.random(), 0.5); 
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      // Exploded Position (Scattered outwards)
      // We push them towards the camera (+Z) and out to sides
      const spread = 20 + Math.random() * 30;
      const ex = x * spread; 
      const ey = y * spread;
      const ez = z * spread + 20; // Bias towards camera

      return {
        symbol,
        assembled: new THREE.Vector3(x, y, z),
        exploded: new THREE.Vector3(ex, ey, ez),
        scale: (symbol.length > 1 ? 0.8 : 1.2) * (0.5 + Math.random() * 0.5),
        rotation: [Math.random() * 0.5, Math.random() * 0.5, 0] as [number, number, number],
      };
    });
  }, [count]);

  useFrame((state) => {
    if (!group.current) return;

    // Calculate scroll progress (0 to 1 range roughly)
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight * 1.0; // Fully explode by 1 viewport height
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    
    // Smooth easing
    const ease = 1 - Math.pow(1 - progress, 3); // Cubic out

    // Update each child (Text mesh) position
    group.current.children.forEach((child, i) => {
      const p = particles[i];
      
      // Interpolate position
      child.position.lerpVectors(p.assembled, p.exploded, ease);
      
      // Add a gentle float animation that continues even when stopped
      const t = state.clock.elapsedTime;
      child.position.y += Math.sin(t * 1 + p.assembled.x * 10) * 0.005;
      
      // Rotate slowly
      child.rotation.x = p.rotation[0] + t * 0.1;
      child.rotation.y = p.rotation[1] + t * 0.1;

      // Opacity fade based on distance (hack using scale or just keep visible)
      // If close to camera, maybe fade out? 
      // For now, simple lerp is fine.
    });
  });

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <Text
          key={i}
          position={[p.assembled.x, p.assembled.y, p.assembled.z]}
          fontSize={p.scale}
          color={isDarkMode ? "#22d3ee" : "#1d4ed8"} // Cyan-400 (Dark) / Blue-700 (Light)
          anchorX="center"
          anchorY="middle"
          fillOpacity={isDarkMode ? 0.9 : 0.7}
        >
          {p.symbol}
        </Text>
      ))}
    </group>
  );
};

const ThreeScene = ({ isDarkMode }: { isDarkMode?: boolean }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 transition-opacity duration-1000 pointer-events-none">
      {/* Background Gradient Layer */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${
        isDarkMode 
        ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-black' 
        : 'bg-gradient-to-b from-slate-50 via-white to-blue-50'
      }`} />

      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <MathParticles isDarkMode={!!isDarkMode} />
        <Environment preset={isDarkMode ? "night" : "city"} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
