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
import {
  customizeModel,
  medicalModel,
  soldierModel,
  microsoftModel,
  taasia,
  ai,
  hexagons,
  logo,
  platformModel,
} from "./catergories/models/modelContent";
import { getCameraCoords } from "../common/getCameraCoords";

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
}) {
  // if (idx == 1 || idx == 2) return;
  const group = useRef();
  const { scene, animations } = useGLTF(modelPath);
  const mixer = useGLTFAnimations(scene, animations);

  return (
    <primitive
      ref={group}
      object={scene}
      dispose={null}
      position={position}
      scale={scale}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        if (e.object?.parent?.position) {
          GLTFModelData.map((model) => {
            console.log(position, idx, "SOME DATA", model.position);

            if (model.position == position && idx != 0) {
              getCameraCoords({ setPosition, setTarget, idx });
            }
          });
        }
        // setSelectedCategory(idx);
      }}
    />
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

const GLTFModelData = [
  {
    path: "/assets/platform/concept_hadashtex (1).glb",
    scale: [78, 78, 78],
    rotation: [-0.38, 0, 0],
    position: [0, -40, 157],
  },
  {
    path: "/assets/medicine/medical_statue_large.glb",
    // scale: [40, 40, 40],
    // rotation: [-0.1, 0, 0],
    // position: [60, -65, 110],
    scale: [9, 9, 9],
    // rotation: [-0.2, 0, 0],
    position: [14, -3, 231.3],
  },

  {
    path: "/assets/taasia/engener (1).glb",
    scale: [9, 9, 9],
    // rotation: [-0.2, 0, 0],
    position: [33, -15, 210],
  },
  {
    path: "/assets/ai/ai_statue (1).glb",
    scale: [9, 9, 9],
    // rotation: [-0.2, 0, 0],
    position: [-33, -15, 210],
  },
  {
    path: "/assets/miscrosoft/microsoft_large.glb",
    scale: [9, 9, 9],
    // rotation: [-0.2, 0, 0],
    position: [-33, -15, 160],
  },
];

export function HomePage({
  position,
  target,
  selectedCategory,
  setPosition,
  setTarget,
  setSelectedCategory,
}) {
  return (
    <>
      <Lights />
      <CameraControls
        position={position}
        target={target}
        idx={selectedCategory}
      />
      {/* <Model url="/assets/platform/concept_hadashtex (1).glb" /> */}
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
          />
        ))}
      </group>

      {/* <MyModel url={"/assets/medical_newest/scene.gltf"} /> */}
      {/* <group>
        {MODELS_DATA.map((modelData, i) => (
          <ModelComponent
            key={i}
            modelPath={modelData.modelPath}
            processModel={modelData.processModel}
            position={modelData.position}
            scale={modelData.scale}
            rotation={modelData.rotation}
            textures={modelData.textures}
            idx={i}
            setPosition={setPosition}
            setTarget={setTarget}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </group> */}
      {/* {selectedCategory ? (
        <Float
          floatIntensity={10}
          rotationIntensity={2}
          position={[80, 50, -70]}
        >
          <Html
            style={{ userSelect: "none" }}
            castShadow
            receiveShadow
            occlude="blending"
            transform
          >
            <iframe
              title="embed"
              width={7000}
              height={5000}
              src="https://in3d-tech.com//"
            />
          </Html>
        </Float>
      ) : null} */}
      {/* <Float
        floatIntensity={10}
        // rotationIntensity={1}
        position={[-250, 10, -30]}
        rotation={null}
      >
        <Html
          style={{ userSelect: "none" }}
          castShadow
          receiveShadow
          occlude="blending"
          transform
        >
          <div
            style={{
              color: "black",
              fontSize: "800px",
              height: "500px",
              position: "relative",
              top: "500px",
              left: "100px",
              fontFamily: "Gotham",
            }}
          >
            Chat with ChatGPT
          </div>
          <iframe
            title="embed"
            width={8000}
            height={6000}
            src="https://in3d-tech.com//"
            style={{ background: "white", opacity: 0.6 }}
          />
        </Html>
      </Float> */}
      {/* <Float
        floatIntensity={10}
        rotationIntensity={2}
        position={[-250, 10, -30]}
        // rotation={null}
      >
        <Html
          style={{ userSelect: "none" }}
          castShadow
          receiveShadow
          occlude="blending"
          transform
        >
          <iframe
            title="embed"
            width={8000}
            height={6000}
            style={{
              backgroundImage: "linear-gradient(145deg, #145da0, #941dc8)",
              opacity: 0.6,
              backgroundSize: "cover",
            }}
          />
        </Html>
          </Float> */}
    </>
  );
}

const AnimatedText = () => {
  const text1 = "Artificial Intelligence something";
  const text2 = "some points";
  const text3 = "more basic information dsfsdf";
  const text4 = "Specialties fdsdfsd";
  const text5 = "This is a sentence about something cool";
  const text6 = "She sells sea shells by the sea shore";
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
            fontSize: "2em",
            marginInlineStart: "2.9em",
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
      {splitText(text6)}
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
