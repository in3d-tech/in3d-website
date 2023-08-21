import { Clone, useFBX, useGLTF } from "@react-three/drei";
import { memo, useEffect, useState, useContext, useMemo } from "react";
import { animated, useSpring, a } from "react-spring";
import { useRef } from "react";
import { useControls } from "leva";
import { getCameraCoords } from "./getCameraCoords";
import AppContext from "../context/context";
import { AnimationMixer } from "three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function MedicalModel({
  position,
  idx,
  setPosition,
  setTarget,
  meshRef,
  selectedIsland,
  appContext,
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
        // visible={selectedIsland == null || selectedIsland == 1 ? true : false}
        visible={appContext.navState == 2 ? false : true}
      />
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
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [shipClone, setShipClone] = useState(null);
  const appContext = useContext(AppContext);
  const [animatedPosition, setAnimatedPosition] = useState(
    new THREE.Vector3(...position)
  );
  const [selectedStatue, setSelectedStatue] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [startTime, setStartTime] = useState(0);

  const { opacity } = useSpring({
    opacity: selectedIsland == null || selectedIsland == idx ? 1 : 0,
    config: { duration: 500 },
  });

  useEffect(() => {
    if (tankModel.scene) {
      setShipClone(tankModel.scene.clone());
    }
  }, [tankModel]);

  const getIsModelVisible = () => {
    if (appContext.navState !== 2) return true;
    return false;
  };

  const handleClick = () => {
    // reset the clock, so animation starts from beginning
    setStartTime(Date.now());
    setIsClicked(true);
  };

  const speedFactor = 40; // Adjust this value to speed up or slow down the animation.

  useFrame(({ clock }) => {
    // let newY = Math.min(clock.getElapsedTime() * speedFactor, 81);
    // setAnimatedPosition((prev) => new THREE.Vector3(prev.x, newY, prev.z));
    if (isClicked) {
      let timeElapsed = (Date.now() - startTime) / 1000; // convert to seconds
      let newY = Math.min(timeElapsed * speedFactor, 81);
      setAnimatedPosition((prev) => new THREE.Vector3(prev.x, newY, prev.z));
      if (newY >= 81) setIsClicked(false);
    }
  });

  return (
    <>
      {shipClone && (
        <group position={animatedPosition.toArray()}>
          <primitive
            object={shipClone}
            // position={position}
            rotation={[0, 0, 0]}
            opacity={opacity}
            visible={getIsModelVisible()}
            scale={0.05}
            onClick={handleClick}
            onPointerOver={(e) => {
              setIsHovered(true);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "auto";
              setIsHovered(false);
            }}
          />
        </group>
      )}
    </>
  );
}

export function MappedModels({
  setPosition,
  setTarget,
  selectedIsland,
  tankModel,
  clone,
}) {
  const positions = [
    [-60, 0, 10],
    [10, 0, 30],
    [-160, 0, 60],
    [80, 0, 60],
    [120, 0, 110],
    [-120, 0, 20],
  ];

  const RaisedTile = memo((props) => {
    const fbx = useFBX("/assets/Hexagon Tile Scale.fbx");
    const fbxClone = useMemo(() => clone(fbx), [fbx]);

    console.log({ fbxAnimations: fbxClone.animations[0] });

    const [mixer] = useState(() => new AnimationMixer(fbxClone));
    const [action] = useState(() => mixer.clipAction(fbxClone.animations[0]));

    useEffect(() => {
      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;
      action.timeScale = 0.32; // Set timeScale to slow down the action.

      action.play();

      return () => action.stop();
    }, []);

    useFrame((state, delta) => {
      mixer.update(delta);
      // positions[0];
    });

    return (
      <group>
        <primitive
          object={fbxClone}
          {...props}
          scale={20}
          position={props.pos}
          rotation={[0, 0, 0]}
          onClick={(e) => console.log(e.object)}
        />
      </group>
    );
  });

  return (
    <group>
      {positions.map((p, i) => (
        <>
          <RaisedTile pos={p} />
          <Model
            key={i}
            position={p}
            idx={i}
            setPosition={setPosition}
            setTarget={setTarget}
            selectedIsland={selectedIsland}
            tankModel={tankModel}
          />
        </>
      ))}
    </group>
  );
}
