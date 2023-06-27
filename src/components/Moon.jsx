import React from "react";

export function Moon({ moonTexture, DoubleSide }) {
  return (
    <mesh position={[22, 12, 41]}>
      <sphereGeometry args={[5, 24, 24]} />
      <meshBasicMaterial
        side={DoubleSide}
        map={moonTexture}
      ></meshBasicMaterial>
    </mesh>
  );
}
