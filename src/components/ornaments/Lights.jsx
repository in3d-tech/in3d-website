import * as THREE from "three";
import { useRef } from "react";
import { useControls } from "leva";
import { useHelper } from "@react-three/drei";

export function Lights() {
  const ambientRef = useRef();
  const directionalRef = useRef();
  const pointRef = useRef();
  const spotRef = useRef();

  useControls("Ambient Light", {
    visible: {
      value: false,
      onChange: (v) => {
        ambientRef.current.visible = v;
      },
      position: {
        x: 3.3,
        y: 1.0,
        z: 4.4,
      },
      castShadow: true,
    },
    color: {
      value: "white",
      onChange: (v) => {
        ambientRef.current.color = new THREE.Color(v);
      },
    },
  });

  useControls("Directional Light", {
    visible: {
      value: true,
      onChange: (v) => {
        directionalRef.current.visible = v;
      },
    },
    position: {
      x: 1,
      y: 1,
      z: 1,
      onChange: (v) => {
        directionalRef.current?.position.copy(v);
      },
    },
    color: {
      value: "white",
      onChange: (v) => {
        directionalRef.current.color = new THREE.Color(v);
      },
    },
  });

  useControls("Point Light", {
    visible: {
      value: false,
      onChange: (v) => {
        pointRef.current.visible = v;
      },
    },
    position: {
      x: 2,
      y: 0,
      z: 0,
      onChange: (v) => {
        pointRef.current.position.copy(v);
      },
    },
    color: {
      value: "white",
      onChange: (v) => {
        pointRef.current.color = new THREE.Color(v);
      },
    },
  });

  useControls("Spot Light", {
    visible: {
      value: false,
      onChange: (v) => {
        if (spotRef.current) spotRef.current.visible = v;
      },
    },
    position: {
      x: 3,
      y: 2.5,
      z: 1,
      onChange: (v) => {
        spotRef.current.position.copy(v);
      },
    },
    color: {
      value: "white",
      onChange: (v) => {
        spotRef.current.color = new THREE.Color(v);
      },
    },
  });

  function SpotLightWithHelper() {
    useHelper(spotRef, THREE.SpotLightHelper, "cyan");
    return (
      <spotLight
        ref={spotRef}
        intensity={0.2}
        position={[10, 100, 5]}
        shadow-mapSize-width={64}
        shadow-mapSize-height={64}
        castShadow
        shadow-bias={-0.001}
      />
    );
  }

  function DirectionalLightWithHelper() {
    useHelper(directionalRef, THREE.DirectionalLightHelper, 10, "green");
    return (
      <directionalLight
        ref={directionalRef}
        intensity={0.7}
        position={[10, 100, 5]}
        shadow-mapSize-width={64}
        shadow-mapSize-height={64}
        castShadow
        shadow-bias={-0.001}
      />
    );
  }

  function PointLightWithHelper() {
    useHelper(pointRef, THREE.PointLightHelper, 5, "red");
    return (
      <pointLight
        ref={pointRef}
        intensity={0.2}
        position={[10, 100, 5]}
        shadow-mapSize-width={64}
        shadow-mapSize-height={64}
        castShadow
        shadow-bias={-0.001}
      />
    );
  }

  return (
    <>
      <ambientLight ref={ambientRef} />
      <DirectionalLightWithHelper />
      {/* <directionalLight ref={directionalRef} /> */}
      <SpotLightWithHelper />
      <PointLightWithHelper />
      {/* <pointLight ref={pointRef} /> */}
      {/* <spotLight ref={spotRef} /> */}
    </>
  );
}
