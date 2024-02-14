export function getCameraCoords({ setPosition, setTarget, idx }) {
  console.log(idx);
  // let position = { x: 24.6, y: 25.4, z: -222 };
  let position = { x: -9.5, y: 30, z: 278 };
  let target = { x: 0, y: 0, z: 0 };
  if (idx === 0) {
    // platform
    return;
  } else if (idx === 1) {
    // medicine
    position = { x: 0, y: 16, z: 240 };
    target = { x: 0, y: 0, z: 0 };
  } else if (idx === 2) {
    // taasia
    position = { x: 40, y: 10, z: 250 };
    target = { x: -10, y: 40, z: 0 };
  } else if (idx === 3) {
    position = { x: 160, y: 25, z: -61 };
    target = { x: 0, y: 5, z: 10 };
  } else if (idx === 4) {
    position = { x: 5, y: 5, z: 205 };
    target = { x: 210, y: 0, z: 0 };
  } else if (idx === 5) {
    position = { x: -9.5, y: 30, z: 278 };
    target = { x: 0, y: 0, z: 0 };
  } else if (idx === "out") {
    position = { x: 0, y: 30, z: 278 };
    // position = { x: 0, y: 0, z: 50 };
    target = { x: 0, y: 0, z: 0 };
  }

  setPosition(position);
  setTarget(target);
}
