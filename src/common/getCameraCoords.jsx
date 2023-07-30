export function getCameraCoords({ setPosition, setTarget, idx = 0 }) {
  let position = { x: 24.6, y: 25.4, z: -222 };
  let target = { x: 0, y: 0, z: 0 };
  if (idx === 1) {
    position = { x: 4, y: 24, z: 80 }; // { x: 30, y: 10, z: 34 };
    target = { x: 44, y: 26, z: 33 };
  } else if (idx === 2) {
    position = { x: -224, y: 22.6, z: 55 };
    target = { x: -110, y: 20, z: 140 };
  } else if (idx === 3) {
    position = { x: 160, y: 25, z: -61 };
    target = { x: 0, y: 5, z: 10 };
  } else if (idx === 4) {
    position = { x: 0, y: 0, z: 0 };
    target = { x: 0, y: 0, z: 0 };
  } else if (idx === 5) {
    position = { x: -30, y: 70, z: 195 };
    target = { x: 0, y: 0, z: 0 };
  }
  setPosition(position);
  setTarget(target);
}
