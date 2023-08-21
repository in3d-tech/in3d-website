import { extend, useLoader, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { RepeatWrapping, TextureLoader, PlaneGeometry, Vector3 } from "three";
import { Water } from "three-stdlib";

extend({ Water });

export function Ocean({ position }) {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(TextureLoader, "/img/water-example.png");
  waterNormals.wrapS = waterNormals.wrapT = RepeatWrapping;
  const geom = useMemo(() => new PlaneGeometry(450, 420), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new Vector3(),
      sunColor: 0xffffff,
      waterColor: "#000000", // "#fff", //"#48AEA5", // "#49AE48", // 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals]
  );
  useFrame(
    (state, delta) => (ref.current.material.uniforms.time.value += delta)
  );
  return (
    <>
      <water
        ref={ref}
        args={[geom, config]}
        rotation-x={-Math.PI / 2}
        position={position}
      />
    </>
  );
}
