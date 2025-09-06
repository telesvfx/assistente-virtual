// Arquivo: components/assistant-model.tsx
"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Environment } from "@react-three/drei"
import { useRef } from "react"
import type * as THREE from "three"

// Um componente mais simples e seguro para a esfera animada
function SafeAnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Animação de rotação simples
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x += 0.002
    }
  })

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      {/* Usando um material padrão, que é mais estável */}
      <meshStandardMaterial
        color="#A855F7"
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  )
}

// Componente principal
export function AssistantModel() {
  return (
    <div className="w-full h-full min-h-[400px] md:h-[70vh] flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#A855F7" />

        <SafeAnimatedSphere />

        <Environment preset="night" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}