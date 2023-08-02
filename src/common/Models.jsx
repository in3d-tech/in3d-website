import { Clone, useGLTF } from "@react-three/drei";
import { memo, useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { useRef } from "react";
import { useControls } from "leva";
import { getCameraCoords } from "./getCameraCoords";

function MedicalModel({
  position,
  idx,
  setPosition,
  setTarget,
  meshRef,
  selectedIsland,
}) {
  const { opacity } = useSpring({
    opacity: selectedIsland == null || selectedIsland == idx ? 1 : 0,
    config: { duration: 500 }, // Optional: set duration of the animation
  });
  const medicalModel = useGLTF("/assets/in3d-medical/Medical_Island.gltf");
  if (medicalModel.materials)
    medicalModel.materials.Medical_Hearty.transparent = true;

  const posRef = useRef();

  //   useControls("medical island", {
  //     visible: {
  //       value: true,
  //       onChange: (v) => {
  //         posRef.current.visible = v;
  //       },
  //     },
  //     position: {
  //       x: 1,
  //       y: 10,
  //       z: 10,
  //       onChange: (v) => {
  //         posRef.current?.position.copy(v);
  //       },
  //     },
  //   });

  return (
    <>
      <Clone
        ref={meshRef}
        opacity={opacity}
        object={medicalModel.scene}
        scale={2.5}
        position={position}
        onClick={(e) => {
          // getCameraCoords({ idx: 1, setPosition, setTarget });
          console.log(e.object.uuid);
        }}
        rotation={[0, Math.PI * 1.85, 0]}
        onPointerOver={(e) => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
        visible={selectedIsland == null || selectedIsland == 1 ? true : false}
      />
      {/* <RotatingThing
          position={position} //{[2, 50, -2]}
          color="blue"
          intensity={2}
          distance={80}
          orbitalSpeed={1}
        /> */}
    </>
  );
}

function Model({
  position,
  idx,
  setPosition,
  setTarget,
  selectedIsland,
  tankModel,
  meshRef,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [shipClone, setShipClone] = useState(null);
  // const [selectedIsland, setSelectedIsland] = useState(null);

  const { opacity } = useSpring({
    opacity: selectedIsland == null || selectedIsland == idx ? 1 : 0,
    config: { duration: 500 }, // Optional: set duration of the animation
  });

  useEffect(() => {
    if (tankModel.scene) {
      setShipClone(tankModel.scene.clone());
    }
  }, [tankModel]);

  if (idx == 1) {
    return (
      <MedicalModel
        position={position}
        idx={idx}
        setTarget={setTarget}
        setPosition={setPosition}
        selectedIsland={selectedIsland}
        meshRef={meshRef}
      />
    );
  }

  return (
    <>
      {/* {isHovered && (
          <pointLight color={"red"} intensity={0.5} position={position} />
        )} */}
      {shipClone && (
        <group>
          <primitive
            object={shipClone}
            position={position}
            children-0-castShadow
            rotation={[0, Math.PI, 0]}
            opacity={opacity}
            // visible={false}
            visible={
              selectedIsland == null || selectedIsland == idx ? true : false
            }
            scale={[2.5, 2.5, 2.5]}
            onClick={() => {
              console.log(idx);
              // onChange(idx);
            }}
            onPointerOver={(e) => {
              setIsHovered(true);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "auto";
              setIsHovered(false);
            }}
          />
          {/* {selectedIsland && <Camera />} */}
        </group>
      )}
    </>
  );
}

export function MappedModels({
  setPosition,
  setTarget,
  selectedIsland,
  islandGroupRef,
  tankModel,
  meshRef,
}) {
  const positions = [
    [-60, 10, 10],
    [10, 10, 30], // medicine
    [-160, 10, 60], // mil
    [80, 10, 60],
    [120, 10, 110], //military
    [-120, 10, 20],
  ];
  return (
    <group dispose={null} ref={islandGroupRef}>
      {positions.map((p, i) => (
        <Model
          setPosition={setPosition}
          setTarget={setTarget}
          selectedIsland={selectedIsland}
          key={i}
          position={p}
          idx={i}
          tankModel={tankModel}
        />
      ))}
    </group>
  );
}
