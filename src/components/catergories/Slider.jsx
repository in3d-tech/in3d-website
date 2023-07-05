/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 phantoms.glb --transform
*/
import { MathUtils } from "three";
import * as THREE from "three";
import React, { useRef, useLayoutEffect, useState } from "react";
import { OrbitControls, useGLTF, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { TextureLoader, DoubleSide } from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getNewSliderCoords } from "./logic/getNewSliderCoords";

export function Slider(props) {
  //   const { nodes, materials } = useGLTF(s
  //     "./models/robot/phantoms-transformed.glb"
  //   );
  gsap.registerPlugin(ScrollTrigger);

  const slider = useRef();
  // const robot = useRef();
  const scroll = useScroll();
  const tl = useRef();

  const scrollTester = useScroll();

  const [hovered, setHovered] = useState(false);

  // useFrame((_, delta) => {

  // });

  let highestSlider = 2;

  // const { width: w, height: h } = useThree((state) => state.viewport);
  // console.log(w, h);

  useFrame((state, delta) => {
    if (tl?.current) tl.current?.seek(scroll?.offset * tl.current.duration());
  });
  useLayoutEffect(() => {
    tl.current = gsap.timeline({
      defaults: { duration: 3, ease: "power1.inOut" },
    });

    getNewSliderCoords(
      props.name,
      tl,
      slider,
      props.index,
      props.numberOfSliders
    );
  }, []);

  const startingRotation = (idx) => {
    // if (idx == 0) {
    //   return [0, Math.PI * 5, -0.2];
    // }
    // if (idx == 1) {
    //   return [0, -1.5, Math.PI * 5];
    // }
    // if (idx == 2) {
    //   return [0, 0, 0];
    // }
    // if (idx == 3) {
    //   return [0, Math.PI * 1.2, -0.3];
    // }
    // if (idx == 4) {
    //   return [0, Math.PI / 1.6, -0.5];
    // }
    return [0, 0, 0];
  };

  return (
    <>
      {/* <OrbitControls /> */}

      <mesh
        ref={slider}
        position={props.sp}
        rotation={[0, 0, 0]} //{startingRotation(props.index)}
        onClick={() => {
          // console.log(slider.current.position);
          // console.log(slider.current.rotation);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        name={props.name}
      >
        <planeGeometry args={[2.5, 1.4, 1]} />
        <meshBasicMaterial
          side={DoubleSide}
          map={props.texture}
          // opacity={1}
          transparent={props.isTransparent}
          // color={"black"}
        ></meshBasicMaterial>
      </mesh>
    </>
  );
}

export const Helix = () => {
  const helixRef = useRef();
  var radius = 10;
  var turns = 3;
  var objPerTurn = 30;

  var angleStep = (Math.PI * 2) / objPerTurn;
  var heightStep = 0.5;
  let position;

  const geo = new THREE.BoxGeometry(2, 3, 0.1);
  const mat = new THREE.MeshBasicMaterial({
    color: Math.random() * 0x888888 + 0x888888,
  });

  const arr = new Array(120).fill(1);

  const testArr = arr.map((item, i) => {
    const positionInHelix = [
      Math.cos(angleStep * i) * radius,
      heightStep * i - 30,
      Math.sin(angleStep * 0) * radius - 10,
    ];
    return (
      <mesh
        position={positionInHelix}
        // onClick={() => console.log(positionInHelix)}
        // rotation={[0]}
        key={i}
        geometry={geo}
        material={mat}
        ref={helixRef}
      >
        {/* <boxGeometry args={[2, 3, 0.1]} />
        <meshBasicMaterial
          color={Math.random() * 0x888888 + 0x888888}
        ></meshBasicMaterial> */}
      </mesh>
    );
  });

  return testArr;
};
