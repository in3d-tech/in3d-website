import { useMemo, useEffect, useState, useRef } from "react";
import {
  Float,
  Gltf,
  Html,
  useAnimations as useAnimations2,
  // useAnimations,
  useFBX,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { Lights } from "../ornaments/Lights";
// import { CameraControls } from "../common/CameraControls";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const paths = [
  "/assets/medicine/medical_statue_8 (3).glb",
  "/assets/in3d-customize/customize_large.glb",

  "/assets/ai/ai_statue.glb",
  "/assets/miscrosoft/hologram_soldier (1).glb",
  "/assets/taasia/engener (1).glb",

  "/assets/military/soldier_statue.glb",
  "/assets/military/soldy.glb",
];

function GLTFModelComponent({
  modelPath,
  // position,
  // scale,
  // rotation,
  idx,
  setSelectedCategory,
  selectedCategory,
}) {
  if (selectedCategory != idx) return null;
  const [isRotating, setIsRotating] = useState(false);
  const [rotationDirection, setRotationDirection] = useState(1);
  const [hovered, setHovered] = useState(false);

  const group = useRef();
  const { scene, animations } = useGLTF(modelPath);
  const mixer = useGLTFAnimations(scene, animations);

  const getModelByIndex = {
    0: "platform",
    1: "medicine",
    2: "taasia",
    3: "ai",
    4: "microsoft",
    5: "military",
    6: "customize",
    7: "security",
  };
  const scale = idx == 0 ? [28, 28, 28] : [40, 40, 40];
  const position = idx == 0 ? [51, -15, 100] : [0, -15, 100];
  return (
    <group>
      <primitive
        ref={group}
        object={scene}
        dispose={null}
        position={position}
        scale={scale}
        // rotation={rotation}
      />
    </group>
  );
}

function useGLTFAnimations(scene, animations) {
  const { invalidate } = useThree();
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);

  useEffect(() => {
    if (!mixer || !animations) return;

    animations.forEach((clip) => mixer.clipAction(clip).play());

    const handler = setInterval(() => invalidate(), 1000 / 60);
    return () => clearInterval(handler);
  }, [animations, mixer, invalidate]);

  useFrame((_state, delta) => mixer && mixer.update(delta));

  return mixer;
}

export function HomePageMobile({ selectedCategory, setSelectedCategory }) {
  return (
    <>
      <Lights />
      <group>
        {paths.map((modelData, i) => (
          <GLTFModelComponent
            key={i}
            modelPath={modelData}
            // position={modelData.position}
            // scale={modelData.scale}
            // rotation={modelData.rotation}
            idx={i}
            setSelectedCategory={setSelectedCategory}
            // handleModelClick={() => handleModelClick(i)}
            selectedCategory={selectedCategory}
          />
        ))}
      </group>
    </>
  );
}

const AnimatedText = () => {
  const text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."; //"Artificial Intelligence something";
  const text2 = "Vestibulum ullamcorper nisl id arcu pulvinar,"; //"- some points";
  const text3 = "eget condimentum"; //- more basic information dsfsdf";
  const text4 = "neque ultricies."; //"- Specialties fdsdfsd";
  const text5 = "In et ligula ex."; //- This is a sentence about something cool";
  // const text6 = "She sells sea shells by the sea shore";
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    setAnimationStarted(true);
  }, []);

  const splitText = (text) => {
    return text.split(/\s+/).map((word, index) => (
      <>
        <span
          className="selected-content-span"
          key={"word" + index}
          style={{
            animationDelay: `${(index + 23) * 0.04}s`,
            fontSize: "1.5em",
            // marginInlineStart: "2.9em",
          }}
        >
          {word}
        </span>
        <span key={"space" + index}>&nbsp;</span>
      </>
    ));
  };

  return (
    <div className={animationStarted ? "selected-content-header animated" : ""}>
      {splitText(text1)}
      <br />
      {splitText(text2)}
      <br />
      {splitText(text3)}
      <br />
      {splitText(text4)}
      <br />
      {splitText(text5)}
      <br />
      {/* {splitText(text6)} */}
    </div>
  );
};
