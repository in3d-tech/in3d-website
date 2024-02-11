export const customizeModel = (fbx, textures, idx) => {
  // return;

  fbx.traverse((child) => {
    if (child.isMesh) {
      switch (child.name) {
        case "Group001":
          // child.material.map = texture1;
          // child.material.metalnessMap = metalTexture;
          // child.material.normalMap = normalTexture;
          break;
        case "Atom001":
          child.material.map = textures[2];
          child.material.normalMap = textures[3];
          child.material.transparent = true;
          child.material.opacity = 0.8;
          break;
        case "Cone_Hologram126":
          child.material.map = textures[0];
          child.material.normalMap = textures[1];
          child.material.transparent = true;
          child.material.opacity = 0.8;

          break;
        case "Tablet":
          child.material.map = textures[4]; // AlbedoTransparency
          child.material.emissiveMap = textures[5];
          child.material.metalnessMap = textures[6];
          child.material.emissiveIntensity = 1;

          child.material.normalMap = textures[7];
          break;
        case "rp_luisa_rigged_003_geo":
          child.material.map = textures[8];

          child.material.transparent = true;
          child.material.opacity = 0.8;

          child.material.specularMap = textures[9];
          child.material.normalMap = textures[10];
          break;
        default:
          break;
      }
    }
  });
};

export const platformModel = (fbx, textures) => {
  fbx.traverse((child) => {
    if (child.isMesh) {
      child.material.map = textures[1]; // AlbedoTransparency
      child.material.emissiveMap = textures[2];
      child.material.metalnessMap = textures[4];
      child.material.emissiveIntensity = 1;
      child.material.normalMap = textures[5];
      child.material.aoMap = textures[0];
    }
  });
};

export const soldierModel = (fbx, textures, idx) => {
  // return;
  fbx.traverse((child) => {
    if (child.isMesh) {
      switch (child.name) {
        case "Soldier_Vest":
          child.material.map = textures[6];
          // child.material.transparent = true;
          // child.material.opacity = 0.4;
          break;
        case "Soldier_Body":
          child.material.map = textures[4];
          break;
        case "Soldier_Face":
          child.material.map = textures[5];
          break;
        case "UI_Box":
          child.material.map = textures[3];
          break;
        case "Rifle":
          child.material.map = textures[1];
          child.material.transparent = false;
          child.material.opacity = 0.4;
        // child.material.wireframe = true;

        default:
          break;
      }
    }
  });
};

export const taasia = (fbx, textures, idx) => {
  return;
};

export const microsoftModel = (fbx, textures, idx) => {
  return;
};

export const ai = (fbx, textures, idx) => {
  // return;
  fbx.traverse((child) => {
    if (child.isMesh) {
      switch (child.name) {
        case "Real_Human":
          child.material.map = textures[2];
          break;

        case "Hologram_Humen":
          child.material.map = textures[0];
          child.material.transparent = true;
          child.material.opacity = 0.6;
          // child.material.wireframe = false;
          // child.layers.enable(BLOOM_SCENE);

          break;

        case "Shape":
          child.material.map = textures[1];
          child.material.transparent = true;
          child.material.opacity = 0.4;
        // child.material.wireframe = true;
        default:
          break;
      }
    }
  });
};

export const medicalModel = (fbx, textures, idx) => {
  // return;

  fbx.traverse((child) => {
    if (child.isMesh) {
      if (child.name == "Pedestel") {
      }
      switch (child.name) {
        case "Heart":
          child.material.map = textures[2];
          child.material.transparent = true;
          child.material.opacity = 0.6;
          break;
        case "Hololens":
          child.material.map = textures[4];
          break;
        case "Male_Body_No_Genitals_Geo005":
          child.material.map = textures[6];
          break;
        case "Pedestel":
          child.material.map = textures[7];
          break;
        case "Ch16_Body1":
        // child.material.map = textures[0];
        //...similarly for more parts
        default:
          break;
      }
    }
  });
};

export const hexagons = (fbx, textures, idx) => {
  return;
};

export const logo = (fbx, textures, idx) => {
  return;
};
