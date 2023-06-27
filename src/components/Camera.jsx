import { useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function Camera({
  setIsCardView,
  loadingAnimations,
  setLoadingAnimations,
  moveCameraToModel,
  setMoveCameraToModel,
}) {
  const [helper, setHelper] = useState(true);
  const { camera } = useThree();
  //   camera.position.set(477, 158.5, -200);

  if (!helper) {
    camera.position.set(0, 10, -20); // Adjust the z position of the camera to move it backwards
    //   // camera.position.set(477, 158.5, -200); // Adjust the z position of the cameZra to move it backwards
  }

  useFrame(({ clock }) => {
    if (!loadingAnimations) {
      const duration = 4; // Duration of the animation in seconds
      const elapsedTime = clock.elapsedTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Update the camera position based on the animation progress
      const targetPosition = new THREE.Vector3(0, 10, -20);
      const startPosition = new THREE.Vector3(477, 158.5, -200);
      const interpolatedPosition = new THREE.Vector3();
      interpolatedPosition.lerpVectors(startPosition, targetPosition, progress);
      camera.position.copy(interpolatedPosition);

      // Check if the animation is complete
      if (progress === 1) {
        setIsCardView(false);
        setHelper(false);
        setLoadingAnimations(true);
      }
    }
    if (moveCameraToModel) {
      if (camera.position.x <= moveCameraToModel.x) camera.position.x -= 0.1;
      if (camera.position.z <= -13.39) camera.position.z += 0.08;
      if (camera.position.y >= 0) camera.position.y -= 0.1;
      if (camera.position.x <= -6.0 && camera.position.z <= -10.39) {
        console.log(camera.position.x, camera.position.z, camera.position.y);
        // camera.position.set(0, 10, -20);
        setMoveCameraToModel(false);
      }
      // everything before this should be uncommented
      // console.log("heyoo");
      // camera.position.x += 0.5;
      // camera.position.z += 0.04;
    }
  });

  return null;
}
