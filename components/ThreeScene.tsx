import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Environment } from '@react-three/drei';
import * as THREE from 'three';

const MATH_ITEMS = [
  '0', '1', '2', '3', '5', '7', '8', '9',
  '+', '-', '×', '÷', '=', '≈', '≠', '±',
  '∑', '∫', 'π', '√', '∞', '∂', '∆', '∇', '∀', '∃', '∈',
  'x', 'y', 'z', 'θ', 'sin', 'cos', 'tan', 'log', 'lim',
  'E=mc²', 'a²+b²=c²', 'F=ma', 'e^{iπ}+1=0', 'A=πr²', 'V=IR'
];

interface MathParticleProps {
  isDarkMode: boolean;
  count?: number;
}

const MathParticles: React.FC<MathParticleProps> = ({ isDarkMode, count = 100 }) => {
  const group = useRef<THREE.Group>(null);
  
  const particles = useMemo(() => {
    return new Array(count).fill(0).map(() => {
      const symbol = MATH_ITEMS[Math.floor(Math.random() * MATH_ITEMS.length)];
      
      const r = 4 * Math.pow(Math.random(), 0.5); 
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      const spread = 8 + Math.random() * 10; 
      const ex = x * spread; 
      const ey = y * spread;
      const ez = z * spread + 10; 

      return {
        symbol,
        assembled: new THREE.Vector3(x, y, z),
        exploded: new THREE.Vector3(ex, ey, ez),
        scale: (symbol.length > 2 ? 0.5 : 0.8) * (0.6 + Math.random() * 0.4),
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      };
    });
  }, [count]);

  useFrame((state) => {
    if (!group.current) return;

    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight * 4.0; 
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    const ease = 1 - Math.pow(1 - progress, 3); 

    group.current.children.forEach((child, i) => {
      const p = particles[i];
      if (child instanceof THREE.Mesh) {
        child.position.lerpVectors(p.assembled, p.exploded, ease);
        const t = state.clock.elapsedTime;
        child.rotation.x = p.rotation[0] + t * 0.1;
        child.rotation.y = p.rotation[1] + t * 0.1;
      }
    });
  });

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <Text
          key={i}
          position={[p.assembled.x, p.assembled.y, p.assembled.z]}
          fontSize={p.scale}
          color={isDarkMode ? "#22d3ee" : "#1e40af"} 
          anchorX="center"
          anchorY="middle"
          fillOpacity={isDarkMode ? 0.7 : 0.5}
        >
          {p.symbol}
        </Text>
      ))}
    </group>
  );
};

const ThreeScene = ({ isDarkMode }: { isDarkMode?: boolean }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-transparent">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 45 }} 
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // Absolute transparency
        }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <MathParticles isDarkMode={!!isDarkMode} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;