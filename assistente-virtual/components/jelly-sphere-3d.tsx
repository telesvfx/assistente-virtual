import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { OrbitControls, Environment } from '@react-three/drei';
import { useMemo } from 'react';
// @ts-ignore
import * as THREE from 'three';

function JellySphere() {
  const meshRef = useRef<any>(null);
  // Salva a posição original dos vértices
  const basePositions = useRef<Float32Array | null>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      const time = clock.getElapsedTime();
      const geometry = meshRef.current.geometry;
      if (!basePositions.current) {
        basePositions.current = geometry.attributes.position.array.slice();
      }
      const positions = geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
    // @ts-ignore
    const ox = basePositions.current ? basePositions.current[i] : 0;
    // @ts-ignore
    const oy = basePositions.current ? basePositions.current[i + 1] : 0;
    // @ts-ignore
    const oz = basePositions.current ? basePositions.current[i + 2] : 0;
        // Aplica distorção tipo "gelatina" com base em ruído senoidal
        const freq = 2.5;
        const amp = 0.08;
        const jelly = Math.sin(freq * ox + time * 2) * Math.sin(freq * oy + time * 2.3) * Math.sin(freq * oz + time * 1.7);
        positions[i] = ox + amp * jelly * ox;
        positions[i + 1] = oy + amp * jelly * oy;
        positions[i + 2] = oz + amp * jelly * oz;
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  });
  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <sphereGeometry args={[1, 64, 64]} />
      {/* @ts-ignore: color é suportado pelo MeshStandardMaterial no runtime */}
      <meshStandardMaterial
        color="#8b5cf6"
        metalness={0.7}
        roughness={0.3}
        envMapIntensity={1.5}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

  return (
    <div
      className="relative w-full h-full bg-transparent items-center justify-center"
      style={{ minHeight: 0 }}
    >
      <div style={{ width: '350px', height: '350px' }}>
        <Suspense fallback={<div className="text-purple-500">Carregando esfera...</div>}>
          <Canvas shadows style={{ background: 'transparent' }} camera={{ position: [0, 0, 3], fov: 50 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[2, 2, 5]} intensity={1.2} />
            <Environment preset="studio" />
            <JellySphere />
            <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}
