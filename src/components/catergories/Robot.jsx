/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 phantoms.glb --transform
*/

import React, { useRef, useLayoutEffect } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import gsap from "gsap";
import { getCategoryDetails } from "./logic/getCategoryDetails";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Robot(props) {
  const { nodes, materials } = useGLTF("/robot/phantoms-transformed.glb");

  const robot = useRef();
  const scroll = useScroll();
  const tl = useRef();
  const details = getCategoryDetails(props.categorySelected);
  const shipModel = useLoader(GLTFLoader, "../../../assets/health/scene.gltf");

  return (
    <group {...props} dispose={null} ref={robot}>
      <group position={[-0.21, 0.16, 0.37]} rotation={[0, 0, 0]} scale={0.15}>
        <mesh
          geometry={nodes.Cube003.geometry}
          material={materials.Metal}
          castShadow
        >
          <meshPhysicalMaterial
            color={details.color} // "#FFA500" //"#aaa"
            roughness={0.2}
            metalness={1}
            reflectivity={0.5}
            iridescence={0.3}
            iridescenceIOR={1}
            iridescenceThicknessRange={[100, 1000]}
            opacity={0.1}
          />
        </mesh>
        <mesh
          geometry={nodes.Cube003_1.geometry}
          material={materials.Metal}
          castShadow
        >
          <meshPhysicalMaterial
            color="#000000"
            roughness={1}
            emissive={"#000"}
            clearcoat={1}
            reflectivity={0.2}
            metalness={0}
            iridescence={0.1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[100, 1000]}
          />
        </mesh>
        <primitive
          object={shipModel.scene}
          position={[1.5, 0, 12]}
          children-0-castShadow
          rotation={[0, Math.PI * 2, 0]}
          scale={[1.5, 1.5, 1.5]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/robot/phantoms-transformed.glb");
