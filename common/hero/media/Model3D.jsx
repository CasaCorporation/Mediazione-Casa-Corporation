"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function GLTFModel({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function Primitive({ type = "torusKnot" }) {
  switch (type) {
    case "box":
      return (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial metalness={0.3} roughness={0.25} color="#C9A86E" />
        </mesh>
      );
    case "sphere":
      return (
        <mesh>
          <sphereGeometry args={[0.8, 48, 48]} />
          <meshStandardMaterial metalness={0.35} roughness={0.2} color="#C9A86E" />
        </mesh>
      );
    default:
      return (
        <mesh>
          <torusKnotGeometry args={[0.6, 0.22, 220, 44]} />
          <meshStandardMaterial metalness={0.5} roughness={0.2} color="#C9A86E" />
        </mesh>
      );
  }
}

export default function Model3D({ modelUrl, autoRotate = true, primitive = "torusKnot" }) {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [2.2, 1.6, 2.2], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 6, 3]} intensity={1.1} />
        <Suspense fallback={null}>
          {modelUrl ? <GLTFModel url={modelUrl} /> : <Primitive type={primitive} />}
        </Suspense>
        <OrbitControls enablePan={false} autoRotate={autoRotate} autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
