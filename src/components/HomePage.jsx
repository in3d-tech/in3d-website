import { useMemo, useEffect } from "react";
import { Stars, useFBX, useTexture } from "@react-three/drei";
import { Lights } from "./ornaments/Lights";
import { CameraControls } from "../common/CameraControls";
import { Ocean } from "./ornaments/Water";
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
} from "./catergories/models/modelContent";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function Effects() {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0} luminanceSmoothing={0.1} height={300} />
    </EffectComposer>
  );
}

function useAnimations(fbx) {
  const { invalidate } = useThree();
  const [mixer, clips] = useMemo(
    () =>
      fbx && fbx.animations
        ? [new THREE.AnimationMixer(fbx), fbx.animations]
        : [null, []],
    [fbx]
  );

  useEffect(() => {
    if (!mixer || !clips) return;
    clips.forEach((clip) => mixer.clipAction(clip).play());
    const handler = setInterval(() => invalidate(), 1000 / 60);
    return () => clearInterval(handler);
  }, [clips, mixer, invalidate]);

  useFrame((_state, delta) => mixer && mixer.update(delta));

  return fbx;
}

const MODELS_DATA = [
  {
    modelPath: "/assets/medical-model-new/Medical_Statue.fbx",
    processModel: medicalModel,
    position: [40, 5, 200], // [-40, 12, 140],
    scale: [17, 17, 17],
    textures: [
      "/assets/medical-model-new/webp/Doctor_Body_Diffuse copy.webp",
      "/assets/medical-model-new/webp/Doctor_Head_Diffuse.webp",
      "/assets/medical-model-new/webp/Heart_Diffuse_emissive.webp",
      "/assets/medical-model-new/webp/Heart_Opacity.webp",
      "/assets/medical-model-new/webp/Hololens_Diffuse.webp",
      "/assets/medical-model-new/webp/Hololens_opacity.webp",
      "/assets/medical-model-new/webp/Human_Body.webp",
      "/assets/medical-model-new/webp/Pedestel_Diffuse.webp",
      "/assets/medical-model-new/webp/Pedestel_Emissive.webp",
    ],
  },
  {
    modelPath: "/assets/in3d-soldier-new/Soldier_Statue.fbx",
    processModel: soldierModel,
    position: [80, 5, 140],
    scale: [0.4, 0.4, 0.4],
    textures: [
      "/assets/in3d-soldier-new/optimized/Circle Opcity.webp",
      "/assets/in3d-soldier-new/optimized/Rifle Opcity.webp",
      "/assets/in3d-soldier-new/optimized/Soldeir UI opctiy.webp",
      "/assets/in3d-soldier-new/optimized/Soldeir UI.webp",
      "/assets/in3d-soldier-new/optimized/Soldier Body.webp",
      "/assets/in3d-soldier-new/optimized/Soldier Face.webp",
      "/assets/in3d-soldier-new/optimized/Soldier Vest.webp",
    ],
  },
  {
    modelPath: "/assets/in3d-customize/Costumize_Model.fbx",
    processModel: customizeModel,
    position: [0, 5, 140],
    scale: [0.3, 0.3, 0.3],
    textures: [
      "/assets/in3d-customize/textures/Group_1-2/Hologram_Rays_Opacity.png",
      "/assets/in3d-customize/textures/Group_1-2/Hologram_Rays.png",
      "/assets/in3d-customize/textures/Group_1-2/Untitled-33_Opacity.png",
      "/assets/in3d-customize/textures/Group_1-2/Untitled-33.png",

      "/assets/in3d-customize/textures/Tablet/iPad_Material_AlbedoTransparency.png",
      "/assets/in3d-customize/textures/Tablet/iPad_Material_EmissionMask.png",
      "/assets/in3d-customize/textures/Tablet/iPad_Material_MetallicSmoothness.png",
      "/assets/in3d-customize/textures/Tablet/iPad_Material_Normal.png",

      "/assets/in3d-customize/textures/rp-luisia_Rigged/rp_luisa_rigged_003_dif.jpg",
      "/assets/in3d-customize/textures/rp-luisia_Rigged/rp_luisa_rigged_003_gloss.jpg",
      "/assets/in3d-customize/textures/rp-luisia_Rigged/rp_luisa_rigged_003_norm.jpg",
    ],
  },
  // {
  //   modelPath: "/assets/in3d-miscrosoft/Microsoft.fbx",
  //   processModel: microsoftModel,
  //   position: [40, 5, 80],
  //   scale: [0.5, 0.5, 0.5],
  // },
  {
    modelPath: "/assets/in3d-ai/Ai_FBX.fbx",
    processModel: ai,
    position: [-80, 5, 170],
    textures: [
      "/assets/in3d-ai/textures/Hologram_HumanTexture.webp",
      "/assets/in3d-ai/textures/Plane&Shape_Emission&Opacity_Texture.webp",
      "/assets/in3d-ai/textures/Real_Man_Texture.webp",
    ],
    scale: [0.2, 0.2, 0.2],
  },
  // {
  //   modelPath: "/assets/in3d-taasia/Enginer.fbx",
  //   processModel: taasia,
  //   position: [-180, 12, 140],
  //   scale: [0.15, 0.15, 0.15],
  //   rotation: [Math.PI * 1.34, 0, 0],
  // },
  {
    modelPath: "/assets/Hexagon Tile long animation.fbx",
    processModel: hexagons,
    position: [0, 0, 0],
    scale: [10, 10, 10],
  },
];

function ModelComponent({
  modelPath,
  processModel,
  position,
  scale,
  rotation,
  textures,
}) {
  let texturesMap;
  if (textures) {
    texturesMap = useTexture(textures);
  }

  let fbx = useFBX(modelPath);
  fbx = useAnimations(fbx);

  useEffect(() => {
    if (fbx) {
      processModel(fbx, texturesMap);
    }
  }, [fbx, processModel]);

  return fbx ? (
    <primitive
      object={fbx}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  ) : null;
}

export function HomePage({ position, target, selectedIsland }) {
  return (
    <>
      <Stars
        count={5000}
        depth={150}
        factor={4}
        saturation={5}
        radius={50}
        fade={true}
        speed={0.7}
      />
      <Lights />
      <CameraControls
        position={position}
        target={target}
        idx={selectedIsland}
      />
      {/* <Effects /> */}
      {MODELS_DATA.map((modelData, i) => (
        <ModelComponent
          key={i}
          modelPath={modelData.modelPath}
          processModel={modelData.processModel}
          position={modelData.position}
          scale={modelData.scale}
          rotation={modelData.rotation}
          textures={modelData.textures}
        />
      ))}
      {/* <Ocean position={[0, -10, 0]} /> */}
    </>
  );
}
