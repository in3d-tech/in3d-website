import { Clone, useFBX, useGLTF } from "@react-three/drei";
import {
  memo,
  useEffect,
  useState,
  useContext,
  useMemo,
  Fragment,
} from "react";
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
        // ref={meshRef}
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
  const meshRef = useRef(null);

  const { opacity } = useSpring({
    opacity: selectedIsland == null || selectedIsland == idx ? 1 : 0,
    config: { duration: 500 },
  });

  useEffect(() => {
    if (tankModel.scene) {
      setShipClone(tankModel.scene.clone());
    }
  }, [tankModel]);

  useEffect(() => {
    if (appContext.navState !== 2) {
      setAnimatedPosition((prev) => new THREE.Vector3(prev.x, 0, prev.z));
    }
  }, [appContext.navState]);

  const getIsModelVisible = () => {
    if (appContext.navState !== 2) return true;
    return false;
  };

  const handleClick = () => {
    // reset the clock, so animation starts from beginning
    setStartTime(Date.now());
    setIsClicked(true);
  };

  const speedFactor = 26; // Adjust this value to speed up or slow down the animation.

  useFrame(({ clock }) => {
    // let newY = Math.min(clock.getElapsedTime() * speedFactor, 81);
    // setAnimatedPosition((prev) => new THREE.Vector3(prev.x, newY, prev.z));
    if (appContext.navState == 2) {
      let timeElapsed = (Date.now() - startTime) / 1000;
      let newY = Math.max(0, animatedPosition.y - timeElapsed * speedFactor);
      if (newY <= 0) {
        setAnimatedPosition((prev) => new THREE.Vector3(prev.x, newY, prev.z));
      }
      setIsClicked(false); // If it's in the middle of the animation, stop it.
    }
    if (isClicked) {
      if (appContext.navState != 2) {
        let timeElapsed = (Date.now() - startTime) / 1000; // convert to seconds
        let newY = Math.min(timeElapsed * speedFactor, 81);
        setAnimatedPosition((prev) => new THREE.Vector3(prev.x, newY, prev.z));
        if (newY >= 81) setIsClicked(false);
      }
    }
  });

  if (idx == 6) {
    return (
      <MedicalModel
        position={position}
        idx={idx}
        setTarget={setTarget}
        setPosition={setPosition}
        appContext={appContext}
        // selectedIsland={selectedIsland}
        // meshRef={meshRef}
      />
    );
  }

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
    // left to right
    [-60, 0, 30], // 3
    [40, 0, 30], // 4
    [-160, 0, 80], // 1
    [90, 0, 60], // 5
    [140, 0, 110], //6
    [-110, 0, 40], // 2
    [0, 0, 80], // 7
  ];

  const RaisedTile = memo((props) => {
    const fbx = useFBX("/assets/Hexagon Tile Scale.fbx");
    const fbxClone = useMemo(() => clone(fbx), [fbx]);

    const [mixer] = useState(() => new AnimationMixer(fbxClone));
    const [action] = useState(() => mixer.clipAction(fbxClone.animations[0]));

    // remove useEffect since we want to play the animation on click
    // instead of on component mount

    useFrame((state, delta) => {
      mixer.update(delta);
    });

    const handleClick = () => {
      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;
      action.timeScale = 0.32; // Set timeScale to slow down the action.

      action.play();

      // you can stop the animation here if you want
      // using a setTimeOut or something else
    };

    return (
      <group>
        <primitive
          object={fbxClone}
          color={"white"}
          {...props}
          scale={20}
          position={props.pos}
          rotation={[0, 0, 0]}
          onClick={handleClick} // define click behavior here
        />
      </group>
    );
  });

  return (
    <group>
      {positions.map((p, i) => (
        <Fragment key={i}>
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
        </Fragment>
      ))}
    </group>
  );
}
