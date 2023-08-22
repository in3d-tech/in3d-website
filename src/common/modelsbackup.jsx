import { Clone, useFBX, useGLTF } from "@react-three/drei";
import { memo, useEffect, useState, useContext, useMemo } from "react";
import { animated, useSpring } from "react-spring";
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
  meshRef,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [shipClone, setShipClone] = useState(null);
  // const [selectedIsland, setSelectedIsland] = useState(null);
  const appContext = useContext(AppContext);

  const { opacity } = useSpring({
    opacity: selectedIsland == null || selectedIsland == idx ? 1 : 0,
    config: { duration: 500 },
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
        appContext={appContext}
      />
    );
  }
  console.log("nav state app context: ", appContext.navState);
  const getIsModelVisible = () => {
    // if (selectedIsland == null || selectedIsland == idx) return true;
    if (appContext.navState != 2) return true;
    // if (selectedIsland == null || selectedIsland == idx) return true;
    return false;
  };
  return (
    <>
      {shipClone && (
        <group>
          <primitive
            object={shipClone}
            position={position}
            children-0-castShadow
            rotation={[0, Math.PI, 0]}
            opacity={opacity}
            visible={getIsModelVisible()}
            // visible={
            //   selectedIsland == null || selectedIsland == idx ? true : false
            // }
            // visible={appContext.navState == 2 ? false : true}
            // scale={[2.5, 2.5, 2.5]}
            scale={0.05}
            onClick={() => {
              console.log(idx);
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
  clone,
}) {
  const positions = [
    [-60, 0, 10],
    [10, 0, 30], // medicine
    [-160, 0, 60], // mil
    [80, 0, 60],
    [120, 0, 110], //military
    [-120, 0, 20],
  ];

  const RaisedTile = memo((props) => {
    const fbx = useFBX("/assets/Hexagon Tile Scale.fbx");
    // const fbx = useFBX("/assets/Hexagon Tile Scale.fbx");

    // clone the fbx model
    const fbxClone = useMemo(() => clone(fbx), [fbx]);

    const [mixer] = useState(() => new AnimationMixer(fbxClone));
    const [action] = useState(() => mixer.clipAction(fbxClone.animations[0]));

    useEffect(() => {
      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;
      action.play();

      // Cleanup function to stop animation when component unmounts
      return () => action.stop();
    }, []); // Empty dependency array ensures this runs once on mount

    useFrame((state, delta) => mixer.update(delta));

    console.log({ fbxClone: fbxClone.uuid });

    return (
      <group>
        <primitive
          object={fbxClone}
          {...props}
          scale={20} //{30}
          position={props.pos}
          // position={[0, 20, 0]}
          rotation={[0, 0, 0]} //{[-0.1, -0.05, 3]} //{[Math.PI / 2, 0, 0]}
        />
      </group>
    );
  });

  const things = positions.map((item, idx) => {
    return <RaisedTile pos={item} />;
  });

  return (
    <group dispose={null} ref={islandGroupRef}>
      {things}
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

// here starts the saved iteration where both models go up together,
// but the tanks stay up while the raised Tile re-renders/animations on everything

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
        ref={meshRef}
        opacity={opacity}
        object={medicalModel.scene}
        scale={2.5}
        position={position}
        onClick={(e) => {
          console.log(e.object.uuid);
        }}
        rotation={[0, Math.PI * 1.85, 0]}
        onPointerOver={(e) => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
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
  onClick,
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

  const handleClick = useMemo(
    () => () => {
      setStartTime(Date.now());
      setIsClicked(true);
    },
    []
  );

  useEffect(() => {
    if (onClick) {
      onClick(handleClick);
    }
  }, [onClick, handleClick]);

  const speedFactor = 26;

  useFrame(({ clock }) => {
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
  const [modelAnimation, setModelAnimation] = useState(null);
  const [tileAnimation, setTileAnimation] = useState(null);

  useEffect(() => {
    if (modelAnimation && tileAnimation) {
      modelAnimation();
      tileAnimation();
    }
  }, [modelAnimation, tileAnimation]);
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

    const [mixer] = useState(() => new AnimationMixer(fbxClone));
    const [action] = useState(() => mixer.clipAction(fbxClone.animations[0]));

    const handleClick = useMemo(
      () => () => {
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.timeScale = 0.32;
        action.play();
      },
      []
    );

    useEffect(() => {
      if (props.onClick) {
        props.onClick(handleClick);
      }
    }, [props.onClick, handleClick]);

    useFrame((state, delta) => {
      mixer.update(delta);
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
    <Fragment>
      {positions.map((p, i) => (
        <>
          <RaisedTile pos={p} onClick={setTileAnimation} />
          <Model
            key={i}
            position={p}
            idx={i}
            setPosition={setPosition}
            setTarget={setTarget}
            selectedIsland={selectedIsland}
            tankModel={tankModel}
            onClick={setModelAnimation}
          />
        </>
      ))}
    </Fragment>
  );
}

// this is where the tiles reset on every render, but the tanks stay up:
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

  const speedFactor = 26; // Adjust this value to speed up or slow down the animation.

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
      {positions.map((p, i) => {
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
        </>;
      })}
    </group>
  );
}
