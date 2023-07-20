import { useLayoutEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
export function Camera() {
  const [helper, setHelper] = useState(false);
  const [objPos, setObjPos] = useState();
  const { camera } = useThree();

  // camera.position.set(477, 158.5, -200);

  // console.log(camera.position);

  // useFrame(({ clock }) => {

  // });

  return null;
}
