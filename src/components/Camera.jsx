import { useLayoutEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
export function Camera() {
  const [helper, setHelper] = useState(false);
  const [objPos, setObjPos] = useState();
  const { camera } = useThree();

  // camera.position.set(477, 158.5, -200);
  // console.log(position);
  // if (helper) {
  // // camera.position.set(477, 158.5, -200); // Adjust the z position of the cameZra to move it backwards\
  // camera.position.set(62.3, 12.3, 10.9);
  // camera.position.set(62.3, 60, -100); // this is a good position for closeup
  // }
  // camera.position.set(214, 131, 77);
  console.log(camera.position);
  // camera.position.set(-11, 26.7, -78.1);
  // useFrame(({ clock }) => {
  //   if (!helper) {
  //     const duration = 4; // Duration of the animation in seconds
  //     const elapsedTime = clock.elapsedTime;
  //     const progress = Math.min(elapsedTime / duration, 1);
  //     // Update the camera position based on the animation progress
  //     const targetPosition = new THREE.Vector3(266, 112, -5);
  //     const startPosition = new THREE.Vector3(477, 158.5, -200);
  //     const interpolatedPosition = new THREE.Vector3();
  //     interpolatedPosition.lerpVectors(startPosition, targetPosition, progress);
  //     camera.position.copy(interpolatedPosition);

  //     // Check if the animation is complete
  //     if (progress === 1) {
  //       setHelper(true);
  //     }
  //   }
  // });

  return null;
}
