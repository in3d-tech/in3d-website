export const getModelByIndex = {
  0: "platform",
  1: "medicine",
  2: "taasia",
  3: "ai",
  4: "microsoft",
  5: "military",
  6: "customize",
  7: "security",
};

export const getLettersByModel = (modelIdx) => {
  if (!modelIdx || typeof modelIdx !== "number" || modelIdx == 0) {
    console.log("why we in here", typeof modelIdx);
    return;
  }
  //   console.log({ modelIdx });
  const modelByIndex = {
    0: "platform",
    1: "MEDICINE",
    2: "INDUSTRY",
    3: "ARTIFICAL INTELLIGENCE",
    4: "MICROSOFT",
    5: "MILITARY",
    6: "CUSTOMIZATION",
    7: "SECURITY",
  };

  return modelByIndex[modelIdx].split("");
};

export const GLTFModelData = [
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
    // rotation: [0, 0.6, 0],
    rotation: [0, 2.4, 0], // reversed

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
