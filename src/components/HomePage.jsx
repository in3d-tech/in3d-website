import { useState, useMemo, useEffect, useRef, memo } from "react";
import { Stars, useFBX } from "@react-three/drei";
import { Lights } from "./ornaments/Lights";
import { Camera } from "./Camera";
import { CameraControls } from "../common/CameraControls";
import { MappedModels } from "../common/Models";
import { Ocean } from "./ornaments/Water";
import { useFrame } from "@react-three/fiber";
import { TextureLoader, AnimationMixer } from "three";
import * as THREE from "three";

export function HomePage({
  position,
  setPosition,
  target,
  setTarget,
  selectedIsland,
  tankModel,
}) {
  const [animate, setAnimate] = useState(false);

  const cameraRef = useRef();
  const islandGroupRef = useRef();
  const tl = useRef();
  const meshRef = useRef();

  function clone(fbx, texture) {
    const clone = fbx.clone(true);
    clone.traverse((node) => {
      if (node.isMesh) {
        node.geometry = node.geometry.clone();
        node.material = node.material.clone();
        node.material.map = texture;
      }
    });
    return clone;
  }

  const TileModel = memo((props) => {
    // const fbx = useFBX("/assets/Hexagon Tile long animation.fbx");
    // const fbx = useFBX("/assets/Hexagon Tile Scale.fbx");
    let fbx;
    try {
      console.log("in catch 1");
      fbx = useFBX("/assets/as1.fbx");
      console.log("in catch 2");
    } catch {
      console.log("we got caught");
      fbx = useFBX("/assets/Hexagon Tile long animation.fbx");
    }

    // clone the fbx model
    const fbxClone = useMemo(() => clone(fbx), [fbx]);

    const [mixer] = useState(() => new AnimationMixer(fbxClone));
    const [action] = useState(() => mixer.clipAction(fbxClone.animations[0]));

    useEffect(() => {
      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;
      action.play();

      // Cleanup function to stop animation when component unmounts
      return () => action.stop();
    }, []); // Empty dependency array ensures this runs once on mount

    useFrame((state, delta) => mixer.update(delta));

    console.log({ fbxClone });

    // console.log(fbxClone.children[0]);
    // console.log("color:", fbxClone.children[1]);
    // fbxClone.children[24].position.y = 8;
    // fbxClone.children[24].material.color = {
    //   isColor: true,
    //   r: 155,
    //   g: 195,
    //   b: 200,
    // };
    // fbxClone.children[24].material.emissive = {
    //   isColor: true,
    //   r: 155,
    //   g: 195,
    //   b: 200,
    // };

    return (
      <group>
        <primitive
          object={fbxClone}
          {...props}
          scale={10} //{30}
          position={[0, -6, 0]}
          rotation={[0, 0, 0]} //{[-0.1, -0.05, 3]} //{[Math.PI / 2, 0, 0]}
        />
      </group>
    );
  });
  return (
    <>
      <Stars
        count={5000}
        depth={150}
        factor={4}
        saturation={5}
        radius={50}
        fade={true}
        speed={0.7}
      />
      <Lights />
      {/* <Preload /> */}
      <Camera cameraRef={cameraRef} tl={tl} islandGroupRef={islandGroupRef} />
      <CameraControls
        position={position}
        target={target}
        idx={selectedIsland}
      />
      <TileModel />
      <MappedModels
        position={position}
        setPosition={setPosition}
        setTarget={setTarget}
        target={target}
        selectedIsland={selectedIsland}
        tankModel={tankModel}
        islandGroupRef={islandGroupRef}
        meshRef={meshRef}
        clone={clone}
      />
      <Ocean position={[0, -10, 0]} />
    </>
  );
}
