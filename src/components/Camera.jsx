import { useThree } from "@react-three/fiber";

export function Camera() {
  const { camera } = useThree();

  camera.position.set(-30, 70, 220);
  // console.log(camera.position);

  // useFrame(({ clock }) => {

  // });

  return null;
}
