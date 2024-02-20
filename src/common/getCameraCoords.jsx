export function getCameraCoords({ setPosition, setTarget, idx }) {
  console.log("model clicked by index: ", idx);
  // let position = { x: 24.6, y: 25.4, z: -222 };
  let position = { x: 0, y: 10, z: 278 };
  let target = { x: 0, y: -8, z: 0 };
  if (idx === 0) {
    // platform
    return;
  } else if (idx === 1) {
    // medicine
    position = { x: -180, y: 20, z: 60 };
    target = { x: 60, y: 30, z: 70 };
  } else if (idx === 2) {
    // taasia
    position = { x: 190, y: 10, z: 370 };
    target = { x: -20, y: 30, z: 0 };
  } else if (idx === 3) {
    // ai
    position = { x: -140, y: 38, z: 370 };

    target = { x: -60, y: 35, z: 0 };
  } else if (idx === 4) {
    // microsoft
    position = { x: 0, y: 20, z: 440 };
    target = { x: 0, y: 30, z: 0 };
  } else if (idx === 5) {
    // military
    position = { x: 120, y: 20, z: 280 };
    target = { x: -60, y: 30, z: 20 };
  } else if (idx === 6) {
    position = { x: -100, y: 20, z: 300 };
    target = { x: 10, y: 30, z: 60 };
  } else if (idx === "out") {
    position = { x: 0, y: -0, z: 580 };

    target = { x: 0, y: 60, z: 0 };
  }

  setPosition(position);
  setTarget(target);
}
