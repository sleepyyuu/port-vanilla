import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, Suspense, useRef } from "react";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import styles from "../styles/MainCanvas.module.css";
import { useTexture, OrbitControls, Environment, Cloud, Sky, PerspectiveCamera } from "@react-three/drei";
import textureUrl from "../assets/233.jpg";
import Gems from "./Objects/Gems";

export default function MainCanvas() {
  function Background() {
    const texture = useTexture(textureUrl);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    return (
      <mesh rotation={[0, 0, 0]} scale={50}>
        <sphereGeometry />
        <meshBasicMaterial map={texture} depthTest={false} side={THREE.BackSide} />
      </mesh>
    );
  }

  return (
    <div className={styles.canvasContainer}>
      <Canvas gl={{ logarithmicDepthBuffer: true }}>
        <color attach="background" args={["white"]} />
        <Background></Background>
        <Gems></Gems>
        <EffectComposer>
          <DepthOfField target={[0, 0, -10]} focalLength={0.1} bokehScale={10} height={700} />
          <Bloom luminanceThreshold={0.8} intensity={10} levels={9} mipmapBlur />
        </EffectComposer>
        <OrbitControls></OrbitControls>
      </Canvas>
    </div>
  );
}
