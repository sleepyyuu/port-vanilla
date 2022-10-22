import { useThree, useFrame, ThreeElements } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { useGLTF, CubeCamera, MeshRefractionMaterial, Instances, Instance } from "@react-three/drei";
import * as THREE from "three";
import gemUrl from "../../assets/diamond.glb";
import { MathUtils } from "three";

function Dia({ factor, speed, xFactor, yFactor, zFactor }) {
  const ref = useRef();
  useFrame((state, delta) => {
    const t = factor + state.clock.elapsedTime * (speed / 2);
    ref.current.scale.setScalar(Math.max(1.5, Math.cos(t) * 5));
    ref.current.position.set(
      Math.cos(t) + Math.sin(t * 1) / 10 + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
      Math.sin(t) + Math.cos(t * 2) / 10 + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
      Math.sin(t) + Math.cos(t * 2) / 10 + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
    );
  });
  return <Instance ref={ref}></Instance>;
}

export default function Gems() {
  const count = 40;
  const { viewport, clock } = useThree();
  const model = useRef(null);
  const { nodes } = useGLTF(gemUrl);

  // Create random position data
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const diamonds = Array.from({ length: 150 }, () => ({
    factor: MathUtils.randInt(20, 100),
    speed: MathUtils.randFloat(0.01, 1),
    xFactor: MathUtils.randFloatSpread(80),
    yFactor: MathUtils.randFloatSpread(40),
    zFactor: MathUtils.randFloatSpread(40),
  }));

  // Render-loop
  // useFrame((state, delta) => {
  //   model.current.matrixAutoUpdate = false;
  //   // Update instanced diamonds
  //   const t = clock.getElapsedTime();
  //   diamonds.map((data, i) => {
  //     data.position[1] -= data.factor * 1 * delta * data.direction;
  //     if (data.direction === 1 ? data.position[1] < -20 : data.position[1] > 20)
  //       data.position = [viewport.width / 2 - Math.random() * viewport.width, 50 * data.direction, data.position[2]];
  //     const { position, rotation, factor } = data;
  //     dummy.position.set(position[0], position[1], position[2]);
  //     dummy.rotation.set(rotation[0] + (t * factor) / 10, rotation[1] + (t * factor) / 10, rotation[2] + (t * factor) / 10);
  //     dummy.scale.setScalar(1 + factor);
  //     dummy.updateMatrix();
  //     model.current.setMatrixAt(i, dummy.matrix);
  //   });
  //   model.current.instanceMatrix.needsUpdate = true;
  // });

  //probably since multiple cameras?
  return (
    <CubeCamera>
      {(texture) => (
        <Instances limit={count} geometry={nodes.Diamond_1_0.geometry}>
          <MeshRefractionMaterial bounces={3} aberrationStrength={0} envMap={texture} toneMapped={false} fastChroma={false} />
          {diamonds.map((props, i) => (
            <Dia {...props} key={i}></Dia>
          ))}
        </Instances>
      )}
    </CubeCamera>
  );
}
