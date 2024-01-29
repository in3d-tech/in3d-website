import { useMemo, useEffect } from "react";
import { Stars, useFBX, useTexture, Environment } from "@react-three/drei";
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
  logo,
} from "./catergories/models/modelContent";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { getCameraCoords } from "../common/getCameraCoords";

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
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520636/assets/medical/Doctor_Body_Diffuse_copy_onzv4n.webp",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520634/assets/medical/Doctor_Head_Diffuse_mhyyha.webp",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520631/assets/medical/Heart_Diffuse_emissive_xnlkzx.webp",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520640/assets/medical/Heart_Opacity_d1ve6y.webp",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520632/assets/medical/Hololens_Diffuse_sqvytx.webp",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520626/assets/medical/Hololens_opacity_sohu4x.webp",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520629/assets/medical/Human_Body_wgyvm6.webp",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520627/assets/medical/Pedestel_Diffuse_wqj9db.webp",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520638/assets/medical/Pedestel_Emissive_daz9h5.webp",
    ],
  },
  {
    modelPath: "/assets/in3d-soldier-new/Soldier_Statue.fbx",
    processModel: soldierModel,
    position: [110, 5, 150],
    scale: [0.4, 0.4, 0.4],
    textures: [
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520080/assets/soilder/Circle_Opcity_trgrai.webp",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520075/assets/soilder/Rifle_Opcity_g5fnbn.webp",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520076/assets/soilder/Soldeir_UI_opctiy_w1y3wi.webp",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520076/assets/soilder/Soldeir_UI_e815v1.webp",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520078/assets/soilder/Soldier_Body_btg7js.webp",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520078/assets/soilder/Soldier_Face_vmtnft.webp",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520080/assets/soilder/Soldier_Vest_slaukj.webp",
    ],
  },
  {
    modelPath: "/assets/in3d-customize/Costumize_Model.fbx",
    processModel: customizeModel,
    position: [-30, 5, 100],
    scale: [0.3, 0.3, 0.3],
    textures: [
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520194/assets/customize/cone_opacity_e6o1kq.png",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520195/assets/customize/cone_dofc3e.png",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520194/assets/customize/cone_opacity_e6o1kq.png",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520192/assets/customize/Untitled-33_lw0jqt.png",

      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520985/assets/customize/iPad_Material_AlbedoTransparency_rfioob.png",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520983/assets/customize/iPad_Material_EmissionMask_k6lnhy.png",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520955/assets/customize/iPad_Material_MetallicSmoothness_qljihx.png",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520973/assets/customize/iPad_Material_Normal_ntnapd.png",

      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520183/assets/customize/rp_luisa_rigged_003_dif_yi4qw3.jpg",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520172/assets/customize/rp_luisa_rigged_003_gloss_wko588.jpg",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520394/assets/customize/rp_luisa_rigged_003_norm-min_pvdgfh.jpg",
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
    position: [-120, 5, 130],
    textures: [
      // "/assets/in3d-ai/textures/Hologram_HumanTexture.webp",
      // "/assets/in3d-ai/textures/Plane&Shape_Emission&Opacity_Texture.webp",
      // "/assets/in3d-ai/textures/Real_Man_Texture.webp",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520102/assets/ai/Hologram_HumanTexture_v7js4n.webp",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520103/assets/ai/Plane_Shape_Emission_Opacity_Texture_spghnm.webp",
      "https://res.cloudinary.com/dxminwnb3/image/upload/v1706520111/assets/ai/Real_Man_Texture_bpzumz.webp",
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
    modelPath: "/assets/Logo_in3d_v3_2.fbx",
    processModel: logo,
    position: [100, 70, -100],
    scale: [5, 5, 5],
  },
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
  idx,
  setPosition,
  setTarget,
}) {
  let texturesMap;
  if (textures) {
    texturesMap = useTexture(textures);
  }

  let fbx = useFBX(modelPath);
  fbx = useAnimations(fbx);

  useEffect(() => {
    if (fbx) {
      processModel(fbx, texturesMap, idx);
    }
  }, [fbx, processModel]);

  return fbx ? (
    <primitive
      onClick={(e) => {
        e.stopPropagation();
        if (idx == 5) {
          return;
        }
        if (e.object?.parent?.position) {
          MODELS_DATA.map((model) => {
            if (model.position == position) {
              getCameraCoords({ setPosition, setTarget, idx });
            }
          });
        }
      }}
      object={fbx}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  ) : null;
}

export function HomePage({
  position,
  target,
  selectedIsland,
  setPosition,
  setTarget,
}) {
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
      <Environment preset="forest" background blur={0.3} />
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
          idx={i}
          setPosition={setPosition}
          setTarget={setTarget}
        />
      ))}
      {/* <Ocean position={[0, -10, 0]} /> */}
    </>
  );
}
