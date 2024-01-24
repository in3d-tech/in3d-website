import * as THREE from "three";

export const customizeModel = (fbx, textures) => {
  // return;
  console.log("inside customize model!");
  //   return;

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

export const soldierModel = (fbx, textures) => {
  // return;

  fbx.traverse((child) => {
    if (child.isMesh) {
      // if (child.name == "Soldier_Vest") {
      // }
      //assign texture conditionally
      switch (child.name) {
        case "Soldier_Vest":
          // console.log(" in 1");
          child.material.map = textures[6];
          // child.material.transparent = true;
          // child.material.opacity = 0.4;
          break;
        case "Soldier_Body":
          // console.log(" in 1");
          child.material.map = textures[4];
          break;
        case "Soldier_Face":
          // console.log(" in 2");
          child.material.map = textures[5];
          break;
        case "UI_Box":
          child.material.map = textures[3];
          break;
        case "Rifle":
          console.log(child);
          child.material.map = textures[1];
          child.material.transparent = false;
          child.material.opacity = 0.4;
          child.material.wireframe = true;

        default:
          break;
      }
    }
  });
};

export const taasia = (fbx) => {
  return;
};

export const microsoftModel = (fbx) => {
  return;
};

export const ai = (fbx, textures) => {
  // return;
  fbx.traverse((child) => {
    if (child.isMesh) {
      switch (child.name) {
        case "Real_Human":
          child.material.map = textures[2];
          break;

        case "Hologram_Humen":
          // child.material = new THREE.MeshBasicMaterial({
          //   color: 0xffffff,
          //   map: textures[0],
          //   transparent: true,
          //   opacity: 0.8,
          // });
          child.material.map = textures[0];
          child.material.transparent = true;
          child.material.opacity = 0.6;
          // child.material.wireframe = false;

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

export const medicalModel = (fbx, textures) => {
  // return;

  fbx.traverse((child) => {
    if (child.isMesh) {
      if (child.name == "Pedestel") {
      }
      //assign texture conditionally
      switch (
        child.name //assumes each child has a unique name
      ) {
        case "Heart":
          // console.log(" in 1");
          child.material.map = textures[2];
          child.material.transparent = true;
          child.material.opacity = 0.6;
          break;
        case "Hololens":
          // console.log(" in 1");
          child.material.map = textures[4];
          break;
        case "Male_Body_No_Genitals_Geo005":
          // console.log(" in 2");
          child.material.map = textures[6];
          break;
        case "Pedestel":
          // console.log(" in 3");
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
