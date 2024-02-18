export function getCameraCoords({ setPosition, setTarget, idx }) {
  console.log(idx);
  // let position = { x: 24.6, y: 25.4, z: -222 };
  let position = { x: 0, y: 10, z: 278 };
  let target = { x: 0, y: -8, z: 0 };
  if (idx === 0) {
    // platform
    return;
  } else if (idx === 1) {
    console.log("yee 1");
    // medicine
    position = { x: 0, y: 16, z: 240 };
    target = { x: 0, y: 0, z: 0 };
  } else if (idx === 2) {
    console.log("yee 2");

    // taasia
    position = { x: 180, y: 10, z: 350 };
    target = { x: -20, y: 30, z: 0 };
  } else if (idx === 3) {
    // ai
    position = { x: -193, y: -0, z: 340 };

    target = { x: 40, y: 30, z: 0 };
  } else if (idx === 4) {
    position = { x: 5, y: 5, z: 205 };
    target = { x: 210, y: 0, z: 0 };
  } else if (idx === 5) {
    position = { x: -9.5, y: 30, z: 278 };
    target = { x: 0, y: 0, z: 0 };
  } else if (idx === "out") {
    position = { x: 0, y: -0, z: 580 };

    target = { x: 0, y: 60, z: 0 };
  }

  setPosition(position);
  setTarget(target);
}
