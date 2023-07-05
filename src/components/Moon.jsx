import React from "react";

export function Moon({ moonTexture, DoubleSide }) {
  return (
    <mesh position={[32, 42, 41]}>
      <sphereGeometry args={[5, 24, 24]} />
      <meshBasicMaterial
        side={DoubleSide}
        map={moonTexture}
      ></meshBasicMaterial>
    </mesh>
  );
}
