import { useLayoutEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";

export function Camera({
  position,
  isFromIslands,
  selectedIsland,
  setSelectedIsland,
  cameraRef,
  tl,
  islandGroupRef,
}) {
  const [helper, setHelper] = useState(false);
  const { camera } = useThree();

  // useFrame(() => {
  //   if (tl?.current) tl.current?.seek(scroll?.offset * tl.current.duration());
  // });

  // useLayoutEffect(() => {
  //   tl.current = gsap.timeline({
  //     defaults: { duration: 3, ease: "power1.inOut" },
  //   });

  //   tl.current
  //     .fromTo(
  //       islandGroupRef.current?.position,
  //       { x: -1.5, y: 100, z: 1.7 },
  //       ">"
  //     )
  //     .fromTo(
  //       islandGroupRef.current?.position,
  //       { x: -2.8, y: 200, z: 0.8 },
  //       ">"
  //     );

  //   // 1
  // }, []);

  //   camera.position.set(477, 158.5, -200);
  // console.log(position);
  // if (helper) {
  //   // camera.position.set(477, 158.5, -200); // Adjust the z position of the cameZra to move it backwards\
  // camera.position.set(62.3, 12.3, 10.9);
  // camera.position.set(62.3, 60, -100); // this is a good position for closeup
  // }

  camera.position.set(214, 131, 77);
  // console.log(camera.position);
  // camera.position.set(-11, 26.7, -78.1);

  useFrame(({ clock }) => {
    // if (!helper) {
    //   const duration = 4; // Duration of the animation in seconds
    //   const elapsedTime = clock.elapsedTime;
    //   const progress = Math.min(elapsedTime / duration, 1);
    //   // Update the camera position based on the animation progress
    //   const targetPosition = new THREE.Vector3(62.3, 12.3, 10.9);
    //   const startPosition = new THREE.Vector3(477, 158.5, -200);
    //   const interpolatedPosition = new THREE.Vector3();
    //   interpolatedPosition.lerpVectors(startPosition, targetPosition, progress);
    //   camera.position.copy(interpolatedPosition);
    //   // Check if the animation is complete
    //   if (progress === 1) {
    //     setHelper(true);
    //   }
    // }
    // if (isFromIslands && selectedIsland && position && !helper) {
    //   const duration = 4; // Duration of the animation in seconds
    //   const elapsedTime = clock.elapsedTime;
    //   const progress = Math.min(elapsedTime / duration, 1);
    //   // Update the camera position based on the animation progress
    //   // const targetPosition = new THREE.Vector3(62.3, 12.3, 10.9);
    //   // const startPosition = new THREE.Vector3(477, 158.5, -200);
    //   const targetPosition = new THREE.Vector3(
    //     position[0],
    //     position[1] + 75,
    //     position[2]
    //   );
    //   const startPosition = new THREE.Vector3(62.3, 60, -100);
    //   const interpolatedPosition = new THREE.Vector3();
    //   interpolatedPosition.lerpVectors(startPosition, targetPosition, progress);
    //   camera.position.copy(interpolatedPosition);
    //   if (progress === 1) {
    //     setHelper(true);
    //     setSelectedIsland(null);
    //   }
    // }

    if (isFromIslands) {
      const duration = 4; // Duration of the animation in seconds
      const elapsedTime = clock.elapsedTime;
      const progress = Math.min(elapsedTime / duration, 1);
      // Update the camera position based on the animation progress
      // const targetPosition = new THREE.Vector3(62.3, 12.3, 10.9);
      // const startPosition = new THREE.Vector3(477, 158.5, -200);
      const targetPosition = new THREE.Vector3(
        position[0],
        position[1] + 75,
        position[2]
      );
      const startPosition = new THREE.Vector3(62.3, 60, -100);
      const interpolatedPosition = new THREE.Vector3();
      interpolatedPosition.lerpVectors(startPosition, targetPosition, progress);
      camera.position.copy(interpolatedPosition);
      if (progress === 1) {
        setHelper(true);
        setSelectedIsland(null);
      }
    }
  });

  return null;
}
