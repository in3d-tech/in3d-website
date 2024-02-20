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
}) {
  const [isRotating, setIsRotating] = useState(false);
  const [rotationDirection, setRotationDirection] = useState(1);

  // if (idx == 1 || idx == 2) return;
  const group = useRef();
  const { scene, animations } = useGLTF(modelPath);
  const mixer = useGLTFAnimations(scene, animations);

  useFrame(() => {
    if (isRotating) {
      group.current.rotation.y -= 0.01; // Adjust the rotation speed as needed
      // console.log(group.current.rotation.y);

      if (idx === 1 || idx === 6) {
        if (group.current.rotation.y <= getRotationAmount(idx)) {
          console.log("less than");
          setIsRotating(false);
        }
      }

      if (idx === 2) {
        if (group.current.rotation.y >= -1.6) {
          console.log("greater than");
        }
      }
    }
  });

  // useFrame(() => {
  // trying to get it to change directions
  //   if (isRotating) {
  //     rotationDirection > 1
  //       ? (group.current.rotation.y -= 0.01)
  //       : (group.current.rotation.y += 0.01); // Adjust the rotation speed as needed
  //     // console.log(group.current.rotation.y);

  //     if (rotationDirection > 1) {
  //       if (idx === 1 || idx === 6) {
  //         if (group.current.rotation.y <= getRotationAmount(idx)) {
  //           console.log("less than");
  //           setIsRotating(false);
  //         }
  //       }
  //     } else if (rotationDirection < 1) {
  //       if (idx === 1 || idx === 6) {
  //         if (group.current.rotation.y >= 0) {
  //           console.log("less than");
  //           setIsRotating(false);
  //         }
  //       }
  //     }

  //     if (idx === 2) {
  //       if (group.current.rotation.y >= -1.6) {
  //         console.log("greater than");
  //       }
  //     }
  //   }
  // });

  // useFrame(() => {
  //   if (isRotating) {
  //     group.current.rotation.y += 0.01 * rotationDirection; // Adjust the rotation speed as needed

  //     // Check if rotation reaches the target angle
  //     const targetRotation = getRotationAmount(idx);
  //     if (
  //       rotationDirection === 1 &&
  //       group.current.rotation.y >= targetRotation
  //     ) {
  //       setIsRotating(false);
  //     } else if (rotationDirection === -1 && group.current.rotation.y <= 0) {
  //       setIsRotating(false);
  //     }
  //   }
  // });

  const getRotationAmount = (idx) => {
    if (idx == 0) return;

    const rotations = {
      1: -1.6,
      2: 0.4,
      3: 0,
      4: 0,
      5: 0,
      6: -0.5,
      7: 0,
    };
    return rotations[idx];
  };

  return (
    <primitive
      ref={group}
      object={scene}
      dispose={null}
      position={position}
      scale={scale}
      rotation={rotation}
      visible={idx == 0 ? true : isSelected} //{!selectedCategory ? true : isSelected} //{isVisible}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedCategory(idx);
        if (e.object?.parent?.position) {
          GLTFModelData.map((model, i) => {
            if (model.position == position && idx != 0) {
              modelClick();
              // setRotationDirection(rotationDirection === 1 ? -1 : 1);
              setTimeout(() => setIsRotating(true), 1000);
              // setIsRotating(true);
              getCameraCoords({ setPosition, setTarget, idx });
            }
          });
        }
        // modelData;
        // setSelectedCategory(idx);
      }}
    />
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

const GLTFModelData = [
  {
    path: "/assets/platform/concept_hadashtex (1).glb",
    scale: [130, 130, 130],
    position: [0, 0, 150],
  },
  {
    path: "/assets/medicine/medical_statue_8 (3).glb",
    scale: [25, 25, 25],
    position: [-34, 2.5, 102],
    // rotation: [0, -1.6, 0],
  },

  {
    path: "/assets/taasia/engener (1).glb",
    scale: [26, 26, 26],
    position: [102, 2.5, 210],
    // rotation: [0, 0.5, 0],
  },
  {
    path: "/assets/ai/ai_statue.glb",
    scale: [26, 26, 26],
    rotation: [0, 0.6, 0],
    position: [-110, 2.5, 194],
  },
  {
    path: "/assets/miscrosoft/microsoft_large.glb",
    scale: [23, 23, 23],
    position: [1, 2.5, 258],
  },
  {
    path: "/assets/military/soldier_statue.glb",
    scale: [42, 42, 42],
    position: [35, 2.5, 162],
  },
  {
    path: "/assets/in3d-customize/customize_large.glb",
    scale: [29, 29, 29],
    position: [-35, 2.5, 164],
    // rotation: [0, -0.5, 0],
  },
  {
    path: "/assets/military/soldy.glb",
    scale: [38, 38, 38],
    position: [79, 2.5, 110],
  },
];

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

  useEffect(() => {
    if (selectedCategory === null) {
      console.log("heyo");
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
      <Effects />
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
          />
        ))}
      </group>

      {selectedCategory && showFloat ? (
        <Float
          floatIntensity={1}
          rotationIntensity={1.2}
          position={[-30, 20, 140]}
          rotation={[0, -0.5, 0]}
        >
          <mesh position={[0, 0, -40]}>
            <boxGeometry args={[90, 90, 8]} />
            <meshStandardMaterial
              color={"rgb(99, 204, 218)"}
              opacity={0.2}
              transparent={true}
            />
          </mesh>
          <Html
            style={{ userSelect: "none" }}
            castShadow
            receiveShadow
            occlude="blending"
            transform
          >
            <div
              className="tesz show"
              style={{
                width: "3200px",
                height: "3800px",
                background: "rgba(99, 204, 218, 0.6)",
                fontSize: "100px",
                opacity: 1,
              }}
            >
              <h1 style={{ color: "rgb(255, 255, 255)" }}>hello world</h1>
              <AnimatedText />
            </div>
          </Html>
        </Float>
      ) : null}
    </>
  );
}

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

// function Model({ url }) {
//   const group = useRef();
//   const { scene, animations } = useGLTF(url);
//   const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);

//   useEffect(
//     () => animations.forEach((clip) => mixer.clipAction(clip).play()),
//     [animations, mixer]
//   );

//   useFrame((_, delta) => mixer.update(delta));

//   return (
//     <primitive
//       ref={group}
//       object={scene}
//       dispose={null}
//       scale={[40, 40, 40]}
//       rotation={[-0.1, 0, 0]}
//       position={[60, -65, 110]}
//     />
//   );
// }

// function useAnimations(fbx) {
//   const { invalidate } = useThree();
//   const [mixer, clips] = useMemo(
//     () =>
//       fbx && fbx.animations
//         ? [new THREE.AnimationMixer(fbx), fbx.animations]
//         : [null, []],
//     [fbx]
//   );

//   useEffect(() => {
//     if (!mixer || !clips) return;
//     clips.forEach((clip) => mixer.clipAction(clip).play());
//     const handler = setInterval(() => invalidate(), 1000 / 60);
//     return () => clearInterval(handler);
//   }, [clips, mixer, invalidate]);

//   useFrame((_state, delta) => mixer && mixer.update(delta));

//   return fbx;
// }

// const MODELS_DATA = [
//   {
//     modelPath: "/assets/in3d-ai/Ai_FBX.fbx",
//     processModel: ai,
//     position: [-90, -25, 145],
//     // position: [-110, -35, 125],

//     textures: [
//       // "/assets/in3d-ai/textures/Hologram_HumanTexture.webp",
//       // "/assets/in3d-ai/textures/Plane&Shape_Emission&Opacity_Texture.webp",
//       // "/assets/in3d-ai/textures/Real_Man_Texture.webp",
//       "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520102/assets/ai/Hologram_HumanTexture_v7js4n.webp",
//       "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520103/assets/ai/Plane_Shape_Emission_Opacity_Texture_spghnm.webp",
//       "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520111/assets/ai/Real_Man_Texture_bpzumz.webp",
//     ],
//     scale: [0.2, 0.2, 0.2],
//     rotation: [-0.07, 0, 0],
//     // rotation: [-0.05, 0, 0], // distance
//   },
//   {
//     modelPath: "/assets/Hexagon Tile (1).fbx",
//     // position: [-90, -35, 150],
//     position: [-90, -35, 150],
//     rotation: [Math.PI * 1.59, Math.PI / 1.97, 1],
//     // rotation: [Math.PI * 1.6, Math.PI / 1.87, 1],//distance

//     // position: [-110, -35, 125],

//     scale: [50, 50, 50],
//     // scale: [0.2, 0.2, 0.2],
//   },
//   {
//     modelPath: "/assets/in3d-platform/source/concept_hadash+tex.fbx",

//     rotation: [-0.26, 0, 0],
//     processModel: platformModel,
//     position: [0, -110, -32],

//     scale: [0.9, 0.9, 0.9],
//     textures: [
//       "/assets/in3d-platform/textures/concept_hadash_platforma_AO.jpg",
//       "/assets/in3d-platform/textures/concept_hadash_platforma_BaseColor.jpeg",
//       "/assets/in3d-platform/textures/concept_hadash_platforma_Emissive.jpeg",
//       "/assets/in3d-platform/textures/concept_hadash_platforma_Height.jpeg",
//       "/assets/in3d-platform/textures/concept_hadash_platforma_Metallic.jpeg",
//       "/assets/in3d-platform/textures/concept_hadash_platforma_Normal.jpg",
//       "/assets/in3d-platform/textures/concept_hadash_platforma_Roughness.jpeg",
//     ],
//   },
//   // {
//   //   modelPath: "/assets/medical-model-new/Medical_Statue.fbx",
//   //   processModel: medicalModel,
//   //   position: [40, -20, 180], // [-40, 12, 140],
//   //   scale: [17, 17, 17],
//   //   rotation: [Math.PI * 1.95, 0, 0],
//   //   textures: [
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520636/assets/medical/Doctor_Body_Diffuse_copy_onzv4n.webp",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520634/assets/medical/Doctor_Head_Diffuse_mhyyha.webp",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520631/assets/medical/Heart_Diffuse_emissive_xnlkzx.webp",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520640/assets/medical/Heart_Opacity_d1ve6y.webp",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520632/assets/medical/Hololens_Diffuse_sqvytx.webp",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520626/assets/medical/Hololens_opacity_sohu4x.webp",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520629/assets/medical/Human_Body_wgyvm6.webp",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520627/assets/medical/Pedestel_Diffuse_wqj9db.webp",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520638/assets/medical/Pedestel_Emissive_daz9h5.webp",
//   //   ],
//   // },
//   // {
//   //   modelPath: "/assets/in3d-soldier-new/Soldier_Statue.fbx",
//   //   processModel: soldierModel,
//   //   position: [92, -32, 150],
//   //   scale: [0.4, 0.4, 0.4],
//   //   textures: [
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520080/assets/soilder/Circle_Opcity_trgrai.webp",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520075/assets/soilder/Rifle_Opcity_g5fnbn.webp",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520076/assets/soilder/Soldeir_UI_opctiy_w1y3wi.webp",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520076/assets/soilder/Soldeir_UI_e815v1.webp",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520078/assets/soilder/Soldier_Body_btg7js.webp",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520078/assets/soilder/Soldier_Face_vmtnft.webp",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520080/assets/soilder/Soldier_Vest_slaukj.webp",
//   //   ],
//   // },
//   // {
//   //   modelPath: "/assets/in3d-customize/Costumize_Model.fbx",
//   //   processModel: customizeModel,
//   //   position: [-30, -45, 100],
//   //   scale: [0.3, 0.3, 0.3],
//   //   textures: [
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520194/assets/customize/cone_opacity_e6o1kq.png",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520195/assets/customize/cone_dofc3e.png",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520194/assets/customize/cone_opacity_e6o1kq.png",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520192/assets/customize/Untitled-33_lw0jqt.png",

//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520985/assets/customize/iPad_Material_AlbedoTransparency_rfioob.png",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520983/assets/customize/iPad_Material_EmissionMask_k6lnhy.png",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520955/assets/customize/iPad_Material_MetallicSmoothness_qljihx.png",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520973/assets/customize/iPad_Material_Normal_ntnapd.png",

//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520183/assets/customize/rp_luisa_rigged_003_dif_yi4qw3.jpg",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520172/assets/customize/rp_luisa_rigged_003_gloss_wko588.jpg",
//   //     "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520394/assets/customize/rp_luisa_rigged_003_norm-min_pvdgfh.jpg",
//   //   ],
//   // },
//   // {
//   //   modelPath: "/assets/in3d-miscrosoft/Microsoft.fbx",
//   //   processModel: microsoftModel,
//   //   position: [40, 5, 80],
//   //   scale: [0.5, 0.5, 0.5],
//   // },

//   // {
//   //   modelPath: "/assets/in3d-taasia/Enginer.fbx",
//   //   processModel: taasia,
//   //   position: [-180, 12, 140],
//   //   scale: [0.15, 0.15, 0.15],
//   //   rotation: [Math.PI * 1.34, 0, 0],
//   // },
//   // {
//   //   modelPath: "/assets/Logo_in3d_v3_2.fbx",
//   //   processModel: logo,
//   //   position: [100, 10, -160],
//   //   scale: [5, 5, 5],
//   // },
//   // {
//   //   modelPath: "/assets/Hexagon Tile long animation.fbx",
//   //   processModel: hexagons,
//   //   position: [0, -80, 30],
//   //   scale: [8, 8, 8],
//   //   rotation: [Math.PI * 1.89, 0, 0],
//   // },
// ];

// // const TileModel = () => {
// //   const tileFbx = useMemo(() => useFBX("/assets/Hexagon Tile (1).fbx"), []);

// //   return (
// //     <primitive
// //       object={tileFbx}
// //       scale={[5, 5, 5]}
// //       // rotation={rotation}
// //     />
// //   );
// // };

// function ModelComponent({
//   modelPath,
//   processModel,
//   position,
//   scale,
//   rotation,
//   textures,
//   idx,
//   setPosition,
//   setTarget,
//   setSelectedCategory,
// }) {
//   let texturesMap;
//   if (textures) {
//     texturesMap = useTexture(textures);
//   }

//   let fbx = useFBX(modelPath);
//   if (processModel) fbx = useAnimations(fbx);

//   useEffect(() => {
//     if (fbx && processModel) {
//       processModel(fbx, texturesMap, idx);
//     }
//   }, [fbx, processModel]);

//   return fbx ? (
//     <primitive
//       // onClick={(e) => {
//       //   e.stopPropagation();
//       //   if (e.object?.parent?.position) {
//       //     MODELS_DATA.map((model) => {
//       //       if (model.position == position && idx != 5) {
//       //         getCameraCoords({ setPosition, setTarget, idx });
//       //       }
//       //     });
//       //   }
//       //   setSelectedCategory(idx);
//       // }}
//       object={fbx}
//       position={position}
//       scale={scale}
//       rotation={rotation}
//       // visible={idx == 0 ? true : false}
//     />
//   ) : null;
// }

// const GLTFModelData = [
//   {
//     path: "/assets/medical_glb_new/medical_statue_large.glb",
//     scale: [40, 40, 40],
//     rotation: [-0.1, 0, 0],
//     position: [60, -65, 110],
//   },
// ];

// export function HomePage({
//   position,
//   target,
//   selectedCategory,
//   setPosition,
//   setTarget,
//   setSelectedCategory,
// }) {
//   return (
//     <>
//       <Lights />
//       <CameraControls
//         position={position}
//         target={target}
//         idx={selectedCategory}
//       />
//       {/* <Model url="/assets/medical_glb_new/medical_statue_large.glb" /> */}

//       {/* <MyModel url={"/assets/medical_newest/scene.gltf"} /> */}
//       <group>
//         {MODELS_DATA.map((modelData, i) => (
//           <ModelComponent
//             key={i}
//             modelPath={modelData.path}
//             processModel={modelData.processModel}
//             position={modelData.position}
//             scale={modelData.scale}
//             rotation={modelData.rotation}
//             textures={modelData.textures}
//             idx={i}
//             setPosition={setPosition}
//             setTarget={setTarget}
//             setSelectedCategory={setSelectedCategory}
//           />
//         ))}
//       </group>
//       {/* {selectedCategory ? (
//         <Float
//           floatIntensity={10}
//           rotationIntensity={2}
//           position={[80, 50, -70]}
//         >
//           <Html
//             style={{ userSelect: "none" }}
//             castShadow
//             receiveShadow
//             occlude="blending"
//             transform
//           >
//             <iframe
//               title="embed"
//               width={7000}
//               height={5000}
//               src="https://in3d-tech.com//"
//             />
//           </Html>
//         </Float>
//       ) : null} */}
//       {/* <Float
//         floatIntensity={10}
//         // rotationIntensity={1}
//         position={[-250, 10, -30]}
//         rotation={null}
//       >
//         <Html
//           style={{ userSelect: "none" }}
//           castShadow
//           receiveShadow
//           occlude="blending"
//           transform
//         >
//           <div
//             style={{
//               color: "black",
//               fontSize: "800px",
//               height: "500px",
//               position: "relative",
//               top: "500px",
//               left: "100px",
//               fontFamily: "Gotham",
//             }}
//           >
//             Chat with ChatGPT
//           </div>
//           <iframe
//             title="embed"
//             width={8000}
//             height={6000}
//             src="https://in3d-tech.com//"
//             style={{ background: "white", opacity: 0.6 }}
//           />
//         </Html>
//       </Float> */}
//       {/* <Float
//         floatIntensity={10}
//         rotationIntensity={2}
//         position={[-250, 10, -30]}
//         // rotation={null}
//       >
//         <Html
//           style={{ userSelect: "none" }}
//           castShadow
//           receiveShadow
//           occlude="blending"
//           transform
//         >
//           <iframe
//             title="embed"
//             width={8000}
//             height={6000}
//             style={{
//               backgroundImage: "linear-gradient(145deg, #145da0, #941dc8)",
//               opacity: 0.6,
//               backgroundSize: "cover",
//             }}
//           />
//         </Html>
//           </Float> */}
//     </>
//   );
// }

// const AnimatedText = () => {
//   const text1 = "Artificial Intelligence something";
//   const text2 = "some points";
//   const text3 = "more basic information dsfsdf";
//   const text4 = "Specialties fdsdfsd";
//   const text5 = "This is a sentence about something cool";
//   const text6 = "She sells sea shells by the sea shore";
//   const [animationStarted, setAnimationStarted] = useState(false);

//   useEffect(() => {
//     setAnimationStarted(true);
//   }, []);

//   const splitText = (text) => {
//     return text.split(/\s+/).map((word, index) => (
//       <>
//         <span
//           className="selected-content-span"
//           key={"word" + index}
//           style={{
//             animationDelay: `${(index + 23) * 0.04}s`,
//             fontSize: "2em",
//             marginInlineStart: "2.9em",
//           }}
//         >
//           {word}
//         </span>
//         <span key={"space" + index}>&nbsp;</span>
//       </>
//     ));
//   };

//   return (
//     <div className={animationStarted ? "selected-content-header animated" : ""}>
//       {splitText(text1)}
//       <br />
//       {splitText(text2)}
//       <br />
//       {splitText(text3)}
//       <br />
//       {splitText(text4)}
//       <br />
//       {splitText(text5)}
//       <br />
//       {splitText(text6)}
//     </div>
//   );
// };
