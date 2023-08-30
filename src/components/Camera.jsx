import { useFrame, useThree } from "@react-three/fiber";

export function Camera() {
  const { camera } = useThree();

  // camera.position.set(-30, 70, 220);
  // console.log(camera.position);

  camera.position.set(-9.5, 63, 278);

  // useFrame(({ clock }) => {
  //   console.log(camera.position);
  // });

  return null;
}
