export function getCameraCoords({ setPosition, setTarget, idx = 0 }) {
  // let position = { x: 24.6, y: 25.4, z: -222 };
  let position = { x: -9.5, y: 30, z: 278 };
  let target = { x: 0, y: 0, z: 0 };
  if (idx === 0) {
    // ai
    position = { x: -120, y: -10, z: 190 };
    // position: [-110, -35, 125]
    target = { x: 0, y: 0, z: 60 };
  } else if (idx === 1) {
    // security
    position = { x: 5, y: 5, z: 205 };
    //position = { x: 4, y: 24, z: 80 }; // { x: 30, y: 10, z: 34 };
    target = { x: 0, y: 0, z: 0 };
  } else if (idx === 2) {
    // customization
    position = { x: -224, y: 102.6, z: 55 };
    target = { x: -110, y: 100, z: 140 };
  } else if (idx === 3) {
    // microsoft
    position = { x: 160, y: 25, z: -61 };
    target = { x: 0, y: 5, z: 10 };
  } else if (idx === 4) {
    //med
    // position: [40, -20, 180],
    position = { x: 5, y: 5, z: 205 };
    target = { x: 210, y: 0, z: 0 };
  } else if (idx === 5) {
    // military
    position = { x: -9.5, y: 30, z: 278 };
    target = { x: 0, y: 0, z: 0 };
  }

  setPosition(position);
  setTarget(target);
}
