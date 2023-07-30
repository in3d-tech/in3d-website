import { useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function CategoryCamera() {
  const [helper, setHelper] = useState(true);
  const { camera } = useThree();
  //   camera.position.set(477, 158.5, -200);

  camera.position.set(0, 1, 5);

  //   if (!helper) {
  //   camera.position.set(1, 1, 1); // Adjust the z position of the camera to move it backwards
  //   // camera.position.set(477, 158.5, -200); // Adjust the z position of the cameZra to move it backwards
  //   }

  useFrame(({ clock }) => {});

  return null;
}
