import * as THREE from "three";
import { useRef } from "react";
import { useControls } from "leva";
import { useHelper } from "@react-three/drei";

export function Lights({ Lightcolor }) {
  const ambientRef = useRef();
  const directionalRef = useRef();
  const directionalRefTwo = useRef();
  const pointRef = useRef();
  const spotRef = useRef();
  // const spotRef2 = useRef();
  // const spotRef3 = useRef();

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
      y: 60,
      z: 10,
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

  useControls("Directional Light Two", {
    visible: {
      value: true,
      onChange: (v) => {
        directionalRefTwo.current.visible = v;
      },
    },
    position: {
      x: -14,
      y: 20,
      z: 50,
      onChange: (v) => {
        directionalRefTwo.current?.position.copy(v);
      },
    },
    color: {
      value: "white",
      onChange: (v) => {
        directionalRefTwo.current.color = new THREE.Color(v);
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
      value: true,
      onChange: (v) => {
        if (spotRef.current) spotRef.current.visible = v;
      },
    },
    position: {
      x: -23,
      y: 180,
      z: 194,
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
    intensity: {
      value: 1,
      onChange: (v) => {
        spotRef.current.intensity = v;
      },
    },
  });

  // useControls("Spot Light 2", {
  //   visible: {
  //     value: false,
  //     onChange: (v) => {
  //       if (spotRef.current) spotRef.current.visible = v;
  //     },
  //   },
  //   position: {
  //     x: 3,
  //     y: 2.5,
  //     z: 1,
  //     onChange: (v) => {
  //       spotRef.current.position.copy(v);
  //     },
  //   },
  //   color: {
  //     value: "white",
  //     onChange: (v) => {
  //       spotRef.current.color = new THREE.Color(v);
  //     },
  //   },
  // });

  // useControls("Spot Light 3", {
  //   visible: {
  //     value: false,
  //     onChange: (v) => {
  //       if (spotRef.current) spotRef.current.visible = v;
  //     },
  //   },
  //   position: {
  //     x: 3,
  //     y: 2.5,
  //     z: 1,
  //     onChange: (v) => {
  //       spotRef.current.position.copy(v);
  //     },
  //   },
  //   color: {
  //     value: "white",
  //     onChange: (v) => {
  //       spotRef.current.color = new THREE.Color(v);
  //     },
  //   },
  // });

  function SpotLightWithHelper() {
    useHelper(spotRef, THREE.SpotLightHelper, "cyan");
    return (
      <spotLight
        ref={spotRef}
        intensity={1} //{90}
        position={[-23, 180, 194]}
        shadow-mapSize-width={64}
        shadow-mapSize-height={64}
        castShadow
        shadow-bias={-0.001}
      />
    );
  }
  // function SpotLightWithHelperTwo() {
  //   useHelper(spotRef2, THREE.SpotLightHelper, "black");
  //   return (
  //     <spotLight
  //       ref={spotRef2}
  //       intensity={0.4}
  //       position={[10, 100, 5]}
  //       shadow-mapSize-width={64}
  //       shadow-mapSize-height={64}
  //       castShadow
  //       shadow-bias={-0.001}
  //     />
  //   );
  // }
  // function SpotLightWithHelperThree() {
  //   useHelper(spotRef3, THREE.SpotLightHelper, "purple");
  //   return (
  //     <spotLight
  //       ref={spotRef3}
  //       intensity={0.4}
  //       position={[10, 100, 5]}
  //       shadow-mapSize-width={64}
  //       shadow-mapSize-height={64}
  //       castShadow
  //       shadow-bias={-0.001}
  //     />
  //   );
  // }

  function DirectionalLightWithHelper() {
    // useHelper(directionalRef, THREE.DirectionalLightHelper, 10, "green");
    return (
      <directionalLight
        ref={directionalRef}
        intensity={2}
        position={[10, 100, 5]}
        shadow-mapSize-width={64}
        shadow-mapSize-height={64}
        castShadow
        shadow-bias={-0.001}
      />
    );
  }
  function DirectionalLightWithHelperTwo() {
    // useHelper(directionalRefTwo, THREE.DirectionalLightHelper, 10, "orange");
    return (
      <directionalLight
        ref={directionalRefTwo}
        intensity={0.9}
        position={[10, 100, 5]}
        shadow-mapSize-width={64}
        shadow-mapSize-height={64}
        castShadow
        shadow-bias={-0.001}
        // color={"orange"}
      />
    );
  }

  function PointLightWithHelper() {
    // useHelper(pointRef, THREE.PointLightHelper, 5, "red");
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
      <DirectionalLightWithHelperTwo />

      {/* <directionalLight ref={directionalRef} /> */}
      <SpotLightWithHelper />
      {/* <SpotLightWithHelperTwo />
      <SpotLightWithHelperThree /> */}

      <PointLightWithHelper />
      {/* <pointLight ref={pointRef} /> */}
      {/* <spotLight ref={spotRef} /> */}
    </>
  );
}
