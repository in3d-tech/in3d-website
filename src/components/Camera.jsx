import { useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function Camera({ moveCameraToModel, setMoveCameraToModel }) {
  const [helper, setHelper] = useState(false);
  const { camera } = useThree();
  //   camera.position.set(477, 158.5, -200);

  // if (!helper) {
  //   camera.position.set(0, 35, -75); // Adjust the z position of the camera to move it backwards
  //   //   // camera.position.set(477, 158.5, -200); // Adjust the z position of the cameZra to move it backwards
  // }

  useFrame(({ clock }) => {
    if (!helper) {
      const duration = 4; // Duration of the animation in seconds
      const elapsedTime = clock.elapsedTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Update the camera position based on the animation progress
      const targetPosition = new THREE.Vector3(0, 35, -75);
      const startPosition = new THREE.Vector3(477, 158.5, -200);
      const interpolatedPosition = new THREE.Vector3();
      interpolatedPosition.lerpVectors(startPosition, targetPosition, progress);
      camera.position.copy(interpolatedPosition);

      // Check if the animation is complete
      if (progress === 1) {
        console.log("wgatttttt");
        setHelper(true);
      }
    }
  });

  return null;
}
