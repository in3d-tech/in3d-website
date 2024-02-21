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
import { Lights } from "./ornaments/Lights";
import { CameraControls } from "../common/CameraControls";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getCameraCoords } from "../common/getCameraCoords";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { GLTFModelData } from "../common/getModelByIndex";

function GLTFModelComponent({
  modelPath,
  position,
  scale,
  rotation,
  // animations,
  idx,
  setPosition,
  setTarget,
  setSelectedCategory,
  modelClick,
  isSelected,
  selectedCategory,
  floatCoords,
}) {
  const [isRotating, setIsRotating] = useState(false);
  const [rotationDirection, setRotationDirection] = useState(1);

  // if (idx == 1 || idx == 2) return;
  const group = useRef();
  const { scene, animations } = useGLTF(modelPath);
  const mixer = useGLTFAnimations(scene, animations);

  // useFrame(() => {
  //   if (isRotating) {
  //     group.current.rotation.y -= 0.01; // Adjust the rotation speed as needed
  //     // console.log(group.current.rotation.y);

  //     if (idx === 1 || idx === 6) {
  //       if (group.current.rotation.y <= getRotationAmount(idx)) {
  //         console.log("less than");
  //         setIsRotating(false);
  //       }
  //     }

  //     if (idx === 2) {
  //       if (group.current.rotation.y >= -1.6) {
  //         console.log("greater than");
  //       }
  //     }
  //   }
  // });

  // useEffect(() => {
  //   if (selectedCategory === null && isSelected) {
  //     // Add isSelected to dependencies as well
  //     setIsRotating(true); // Start rotating
  //     setRotationDirection(-1); // Change rotation direction
  //   } else if (selectedCategory !== null) {
  //     setIsRotating(false); // Stop rotating when a model is selected
  //   }
  // }, [selectedCategory, isSelected]);
  // useEffect(()=> {
  //   if()
  // }, [selectedCategory])

  const getRotationAmount = (idx) => {
    if (idx == 0) return;
    console.log({ idx });
    const rotations = {
      1: -1.6,
      2: 0,
      // 2: 0.4,

      3: 0,
      4: 0,
      5: 0,
      6: -0.5,
      7: 0,
    };
    return rotations[idx];
  };

  useFrame(() => {
    if (isRotating && idx != 3) {
      rotationDirection === 1
        ? (group.current.rotation.y -= 0.01 * rotationDirection)
        : (group.current.rotation.y += 0.01 * rotationDirection);

      // Assuming original rotation is 0
      if (
        rotationDirection === 1 &&
        group.current.rotation.y <= getRotationAmount(idx)
      ) {
        console.log("in 1 way");
        setIsRotating(false);
        setRotationDirection(-1); // Set it back to rotate reversing
      } else if (rotationDirection === -1 && group.current.rotation.y >= 0) {
        console.log("in the other way");
        setIsRotating(false);
        setRotationDirection(1);
      }
      console.log("yellow", rotationDirection);
    }
  });

  return (
    <group>
      <primitive
        ref={group}
        object={scene}
        dispose={null}
        position={position}
        scale={scale}
        rotation={rotation}
        visible={idx == 0 ? true : isSelected}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedCategory(idx);
          if (e.object?.parent?.position) {
            GLTFModelData.map((model, i) => {
              if (model.position == position && idx != 0) {
                modelClick();
                setTimeout(() => setIsRotating(!isRotating), 750);
                getCameraCoords({ setPosition, setTarget, idx });
              }
            });
          }
        }}
      />
    </group>
  );
}

function Effects() {
  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={1}
        focalLength={0.1}
        bokehScale={0}
        height={480}
      />
      <Bloom
        luminanceThreshold={0}
        luminanceSmoothing={0.9}
        height={300}
        opacity={1}
        bloomLayers={[1]}
        intensity={0.3}
      />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
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

export function HomePage({
  position,
  target,
  selectedCategory,
  setPosition,
  setTarget,
  setSelectedCategory,
  showFloat,
}) {
  const [modelVisibility, setModelVisibility] = useState(
    Array(GLTFModelData.length).fill(true)
  );

  const [floatCoords, setFloatCoords] = useState(null);

  useEffect(() => {
    if (selectedCategory == null) {
      // console.log("back to null");
      return;
    }

    setFloatCoords(getFloatCoords(selectedCategory));
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory === null) {
      setTimeout(
        () => setModelVisibility(Array(GLTFModelData.length).fill(true)),
        2500
      );
    }
  }, [selectedCategory]);

  const handleModelClick = (idx) => {
    const newVisibility = Array(GLTFModelData.length).fill(false);
    newVisibility[idx] = true;
    setModelVisibility(newVisibility);
  };

  return (
    <>
      <Lights />
      {/* <Bloom mipmapBlur luminanceThreshold={1} /> */}
      {/* <Effects /> */}
      <group>
        {GLTFModelData.map((modelData, i) => (
          <GLTFModelComponent
            key={i}
            modelPath={modelData.path}
            position={modelData.position}
            scale={modelData.scale}
            rotation={modelData.rotation}
            idx={i}
            setPosition={setPosition}
            setTarget={setTarget}
            setSelectedCategory={setSelectedCategory}
            isSelected={modelVisibility[i]}
            modelClick={() => handleModelClick(i)}
            floatCoords={floatCoords}
            selectedCategory={selectedCategory}
          />
        ))}
      </group>

      {/*  */}
    </>
  );
}

const getFloatCoords = (modelIdx) => {
  const floatCoords = {
    1: "",
    2: { position: [-100, 40, 260], rotation: [0, -0.5, 0] },
    3: { position: [-90, 40, 260], rotation: [0, -0.4, 0] },
    4: { position: [40, 40, 260], rotation: [0, -0.5, 0] },
    5: "",
    6: "",
  };

  return (
    floatCoords[modelIdx] || {
      position: [-100, 40, 260],
      rotation: [0, -0.5, 0],
    }
  );

  return { position: [-100, 40, 260], rotation: [0, -0.5, 0] };
};

const AnimatedText = () => {
  const text1 = "Artificial Intelligence something";
  const text2 = "- some points";
  const text3 = "- more basic information dsfsdf";
  const text4 = "- Specialties fdsdfsd";
  const text5 = "- This is a sentence about something cool";
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

// possible float idea

// {selectedCategory && selectedCategory == 99 ? (
//   <Float
//     // floatIntensity={1}
//     // rotationIntensity={1.2}
//     position={floatCoords?.position}
//     rotation={floatCoords?.rotation}
//     onClick={() => console.log("OOOK")}
//     preve
//   >
//     {selectedCategory && selectedCategory == 99 && (
//       <Html
//         style={{
//           userSelect: "none",
//           // border: "3px solid red",
//           width: "82vw",
//           height: "160vh",
//           pointerEvents: selectedCategory == idx ? "auto" : "none",
//         }}
//         onClick={() => console.log("whats this I see")}
//         // castShadow
//         // receiveShadow
//         occlude="blending"
//         transform
//       >
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             border: "5px solid black",
//             height: "100%",
//             justifyContent: "space-between",
//           }}
//           onClick={() => console.log("does this work at least")}
//         >
//           <div
//             style={{
//               // border: "1px solid yellow",
//               display: "flex",
//               justifyContent: "space-between",
//               // height: "10%",
//               flex: 1,
//             }}
//           >
//             <div
//               className="tesz show"
//               style={{
//                 width: "40%",
//                 // width: "3200px",
//                 // height: "3800px",
//                 background: "rgba(99, 204, 218, 0.6)",
//                 fontSize: "100px",
//                 opacity: 1,
//               }}
//             >
//               sds
//               {/* <h1 style={{ color: "rgb(255, 255, 255)" }}>hello world</h1> */}
//               {/* <AnimatedText /> */}
//             </div>
//             <div
//               className="tesz show"
//               style={{
//                 width: "40%",

//                 // width: "3200px",
//                 // height: "3800px",
//                 background: "rgba(0, 0, 0, 0.6)",
//                 fontSize: "100px",
//                 opacity: 1,
//               }}
//             ></div>
//           </div>

//           <div
//             style={{
//               background: "orange",
//               width: "100%",
//               flex: 1,
//               height: "96%",
//               opacity: 0.6,
//             }}
//           >
//             dfsdsasddsdssda
//           </div>
//         </div>
//       </Html>
//     )}
//   </Float>
// ) : null}
