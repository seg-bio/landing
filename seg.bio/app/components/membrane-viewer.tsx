"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Bounds, Center } from "@react-three/drei";

// Self-hosted Draco decoder (copied from three) so the mesh has no external
// CDN runtime dependency.
const DRACO_PATH = "/draco/";

function Mesh() {
  const { scene } = useGLTF("/hero-vessel.glb", DRACO_PATH);
  return <primitive object={scene} />;
}

useGLTF.preload("/hero-vessel.glb", DRACO_PATH);

export default function MembraneViewer() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [1, 0.5, 2.5], fov: 45 }}
      style={{ width: "100%", height: "100%", display: "block" }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#0b0d10"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.1}>
          <Center>
            <Mesh />
          </Center>
        </Bounds>
      </Suspense>
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.6}
        enablePan={false}
        enableZoom={false}
        makeDefault
      />
    </Canvas>
  );
}
