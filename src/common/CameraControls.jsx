import { OrbitControls, useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import { Vector3, SpotLight, DirectionalLightHelper } from "three";

const CameraControls = ({ position, target, idx }) => {
  const directionalRef3 = useRef();

  function DirectionalLightWithHelper() {
    useHelper(directionalRef3, DirectionalLightHelper, 10, "green");
    return (
      <directionalLight
        ref={directionalRef3}
        intensity={1}
        position={[-10, 30, 80]}
        shadow-mapSize-width={64}
        shadow-mapSize-height={64}
        castShadow
        shadow-bias={-0.001}
      />
    );
  }

  //Initialize camera controls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const ref = useRef(null);
  // Determines camera up Axis
  camera.up = new Vector3(0, 1, 0);
  function cameraAnimate() {
    gsap.timeline().to(camera.position, {
      duration: 2.5,
      repeat: 0,
      x: position.x,
      y: position.y,
      z: position.z,
      ease: "power3.inOut",
    });
    gsap.timeline().to(
      ref.current.target,
      {
        duration: 2.5,
        repeat: 0,
        x: target.x,
        y: target.y,
        z: target.z,
        ease: "power3.inOut",
      },
      "<"
    );
  }
  useEffect(() => {
    cameraAnimate();
  }, [target, position]);

  // return the controls object
  return (
    <>
      <OrbitControls
        ref={ref}
        args={[camera, domElement]}
        panSpeed={1}
        maxPolarAngle={Math.PI / 2}
        // enabled={false}
      />
      {idx == 1 && <DirectionalLightWithHelper />}
    </>
  );
};
export { CameraControls };
